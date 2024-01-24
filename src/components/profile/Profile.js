import { useEffect, useState } from "react";
import ProfileSetting from "./ProfileSetting";
import ContentPosts from "./ContentPosts";
import StickyBanner from "./StickyBanner";
import ProfileHero from "./ProfileHero";
import StickyFooter from "../commons/StickyFooter";
import Modal from "../commons/Modal";
import Head from "next/head";
import { onCreateComment, onDeletePost, onGetComments, onGetPostsMe, onGetProfileMe } from "@/components/profile/profile.service";
import { useRouter } from "next/router";
import { streamHost } from "@/helpers/stream.config";
import { refreshToken } from "@/helpers/jwt.service";
import { JWT_KEY } from "@/helpers/common.constant";
import Comment from "./Comment";

const Profile = () => {

    const [postDetailModal, setPostDetailModal] = useState(false);
    const [currentPost, setCurrentPost] = useState({});
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState({});
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([])

    const router = useRouter()

    async function onValidateToken() {
        try {
            const jwt = localStorage.getItem(JWT_KEY)
            const refreshTokenResponse = await refreshToken(jwt)
            localStorage.setItem(JWT_KEY, refreshTokenResponse.token)
        } catch (error) {
            console.error(error);
            router.push("/logout")
        }
    }

    async function onLoadProfileMe() {
        try {
            const { user } = await onGetProfileMe()
            setProfile(user)
        } catch (error) {
            console.error(error);
            router.push("/logout")
        }
    }

    async function onLoadPostsMe() {
        try {
            const { posts } = await onGetPostsMe()
            setPosts(posts)
        } catch (error) {
            console.error(error)
        }
    }

    async function onLoadComments(postId) {
        try {
            const { comments } = await onGetComments(postId)
            setComments(comments)
        } catch (error) {
            console.error(error);
            router.push("/logout")
        }
    }

    useEffect(() => {
        onLoadProfileMe()
        onLoadPostsMe()
        onValidateToken()
    }, [])

    return (
        <div className="flex flex-row justify-center items-center">
            <div id="profileContainer" className="flex flex-col w-screen items-center h-screen md:w-3/5">
                <Head>
                    <title>{profile !== undefined ? profile.user_fullname : ''}</title>
                </Head>
                <StickyBanner />
                <ProfileHero data={profile != undefined ? profile : {}} />
                <ProfileSetting />
                {posts.length > 0 ? <ContentPosts
                    data={posts}
                    setPostDetailModal={setPostDetailModal}
                    setCurrentPost={setCurrentPost}
                    onLoadComments={onLoadComments}
                /> : <div className="flex flex-col justify-center items-center h-96 text-sm">No posts</div>}
                <StickyFooter />
                <Modal show={postDetailModal} setShow={setPostDetailModal}>
                    <div className="flex flex-col space-y-2 w-full">
                        {
                            currentPost.post_media_type === "image" &&
                            <img
                                src={`${streamHost}/image/${currentPost.user_id}/${currentPost.post_media[0]}`}
                                className="bg-gray-200 flex flex-row justify-center items-center text-sm w-full"
                                controls
                            />
                        }<img src={currentPost.src} />
                        {
                            currentPost.post_media_type === "video" &&
                            <video
                                src={`${streamHost}/stream/${currentPost.user_id}/${currentPost.post_media[0]}`}
                                className="bg-gray-200 flex flex-row justify-center items-center text-sm w-full"
                                controls
                            />
                        }
                        <div className="flex flex-row justify-end items-center">
                            <button
                                className="rounded shadow border px-4 py-1 text-sm text-white bg-red-500"
                                onClick={async e => {
                                    await onDeletePost(currentPost.post_id)
                                    onLoadPostsMe()
                                    setPostDetailModal(false)
                                }}
                            >Delete</button>
                        </div>
                        <textarea
                            className="flex flex-row justify-center items-center border rounded-md w-full resize-none text-sm p-2"
                            id="commentInput"
                            placeholder="Your comment..."
                            onChange={e => setComment(e.target.value)}
                            value={comment}
                        ></textarea>
                        <div className="flex flex-row justify-end items-center w-full">
                            <button
                                onClick={e => {
                                    onCreateComment(currentPost.post_id, comment)
                                    setTimeout(() => {
                                        onLoadComments(currentPost.post_id)
                                    }, 500)
                                }}
                                className="border shadow rounded-md bg-blue-500 text-white text-sm px-4 py-2"
                            >Comment</button>
                        </div>
                        <div id="commentListContainer" className="space-y-4 h-60 w-full overflow-scroll">
                            {comments.length === 0 && <div className="flex flex-row items-center justify-center text-sm">No Comments</div>}
                            {comments.length > 0 && comments.map(comment => (
                                <Comment item={comment} onLoadComments={onLoadComments} />
                            ))}
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Profile;