import { useEffect, useState } from "react";
import OptionMenu from "./OptionMenu";
import Comment from "./Comment";
import Modal from "../commons/Modal";
import StickyFooter from "../commons/StickyFooter";
import Feed from "./Feed.js";
import StickyBanner from "./StickyBanner.js";
import Head from "next/head";
import axios from "axios";
import { JWT_KEY, LOAD_MORE_INTERVAL } from "@/helpers/common.constant.js";
import { onCreateComment, onGetComments, onLoadFeeds, onValidateToken } from "@/components/home/home.service.js";
import { refreshToken, validateToken } from "@/helpers/jwt.service";
import { useRouter } from "next/router";
import { onGetProfileMe } from "@/components/profile/profile.service";

const Home = () => {
    const [feedOptionModal, setfeedOptionModal] = useState(false);
    const [progressModal, setProgressModal] = useState(false);
    const [progress, setProgress] = useState(0);
    const [commentModal, setCommentModal] = useState(false);
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("");
    const [feed, setFeed] = useState({});
    const [feeds, setFeeds] = useState([])
    const [filename, setFilename] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [postId, setPostId] = useState(null);
    const [page, setPage] = useState(1);
    const [profile, setProfile] = useState({});
    const [isMoreData, setIsMoreData] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

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

    async function onLoadComments(postId){
        try {
            const { comments } = await onGetComments(postId)
            setComments(comments)
        } catch (error) {
            console.error(error);
            router.push("/logout")
        }
    }

    useEffect(() => {
        onLoadFeeds(setFeeds, page, setIsMoreData)
        onLoadProfileMe()
        onValidateToken()
    }, [])

    return (<>
        <div className="flex flex-row justify-center items-center">
            <div id="feedContainer" className="flex flex-col w-screen h-screen md:w-3/5">
                <Head>
                    <title>Home</title>
                </Head>
                <StickyBanner
                    title="GramWannabe"
                    profile={profile}
                />
                <div
                    id="feedList" onScroll={e => {
                        const offset = 200
                        const { scrollHeight, scrollTop, clientHeight } = e.target
                        if ((scrollHeight - offset) <= (scrollTop + clientHeight)) {
                            isMoreData && setTimeout(() => {
                                onLoadFeeds(setFeeds, (page + 1), setIsMoreData)
                                setPage(page + 1)
                            }, LOAD_MORE_INTERVAL)
                        }
                    }}
                    className="flex flex-col w-full p-2 space-y-3 my-12 overflow-scroll"
                >
                    {feeds.map((feed, index) => (
                        <Feed
                            key={`${index}-${feed.post_id}`}
                            item={feed}
                            setFeed={setFeed}
                            setCommentModal={setCommentModal}
                            setfeedOptionModal={setfeedOptionModal}
                            setComments={setComments}
                            onLoadComments={onLoadComments}
                        />
                    ))}
                    {/* TODO: load more function */}
                    <div className="flex flex-row justify-center items-center py-5">
                        {isMoreData ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 animate-spin infinite">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg> : <p>No more posts.</p>}
                    </div>
                </div>
                <StickyFooter
                    setProgressModal={setProgressModal}
                    setProgress={setProgress}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                    setFilename={setFilename}
                    setPostId={setPostId}
                    setFeeds={setFeeds}
                />
                <Modal id="feedOption" show={feedOptionModal} setShow={setfeedOptionModal} >
                    {/* <p>This is my feed id {feed.id}</p> */}
                    <div id="optionMenuTitle" className="flex flex-row justify-center items-center">
                        Menu
                    </div>
                    <div className="border w-full my-4"></div>
                    <div id="menuListContainer" className="space-y-4">
                        <OptionMenu />
                    </div>
                </Modal>
                <Modal id="commentModal" show={commentModal} setShow={setCommentModal}>
                    <div id="commentTitle" className="flex flex-row justify-center items-center">
                        Comment
                    </div>
                    <div className="border w-full my-4"></div>
                    <div className="flex flex-col justify-center items-center space-y-2">
                        <textarea
                            className="flex flex-row justify-center items-center border rounded-md w-full resize-none text-sm p-2"
                            id="commentInput"
                            onChange={e => setComment(e.target.value)}
                            value={comment}
                        ></textarea>
                        <div className="flex flex-row justify-end items-center w-full">
                            <button 
                                onClick={e => {
                                    onCreateComment(feed.post_id, comment)
                                    setTimeout(() => {
                                        onLoadComments(feed.post_id)
                                    }, 500)
                                }}
                                className="border shadow rounded-md bg-blue-500 text-white p-2"
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
                <Modal id="uploadProgressModal" show={progressModal} setShow={setProgressModal}>
                    <div id="uploadProgressContainer" className="flex flex-col justify-center items-center space-y-5 w-full">
                        {progress > 0 && <div id="progress-container" className="mt-4 w-full">
                            <div id="progress-bar" className="bg-blue-300 text-xs font-bold text-center p-0.5 leading-none border border-blue-700 rounded-md text-blue-800" style={{ width: `${progress}%` }}>{progress}%</div>
                        </div>}
                        {errorMessage &&
                            <div className="flex flex-row items-center justify-center border border-red-800 bg-red-100 shadow rounded-md p-2 text-red-800 w-full">
                                {errorMessage}
                            </div>}
                        {successMessage &&
                            <div className="flex flex-row items-center justify-center border border-green-800 bg-green-100 shadow rounded-md p-2 text-green-800 w-full ">
                                {successMessage}
                            </div>}
                        <div className="flex flex-col items-center justify-center w-full space-y-3">
                            <textarea
                                className="w-full border shadow rounded-md p-2 resize-none h-32 text-sm text-gray-600"
                                placeholder="Caption"
                                onChange={e => setPostDescription(e.target.value)}
                            >{postDescription}</textarea>
                            <button
                                className="w-full border shadow rounded-md bg-blue-500 text-white text-sm p-2"
                                onClick={async e => {
                                    e.preventDefault();
                                    setSuccessMessage(null)
                                    setErrorMessage(null)

                                    try {
                                        const response = await axios.request({
                                            url: `/api/post?postId=${postId}`,
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
                                            },
                                            method: 'PUT',
                                            data: JSON.stringify({
                                                postId: postId,
                                                postDescription: postDescription
                                            })
                                        })
                                        setSuccessMessage(response.data.message)
                                        setProgressModal(false)
                                    } catch (error) {
                                        console.error(error)
                                        setErrorMessage(error.response.data.message)
                                    }

                                }}
                            >Post It!</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </>);
}

export default Home;
