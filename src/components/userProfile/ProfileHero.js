import { streamHost } from "@/helpers/stream.config"

const ProfileHero = ({ data }) => (
    <div id="profileHero" className="flex flex-row justify-between items-center w-full mt-12">
        <div id="profileBriefInfo" className="flex flex-col p-2 justify-between items-center space-y-3 w-1/3">
            <img
                id="profilePicture"
                src={`${streamHost}/image/${data.user_id}/${data.user_profile_picture}`}
                className="border shadow rounded-full h-28 w-28 bg-gray-200"
            />
            <p className="text-sm">{data.user_fullname}</p>
            <p className="text-sm">{data.user_bio_profile}</p>
        </div>
        <div id="profileEngagement" className="flex flex-row justify-between w-2/3 p-5 pb-16">
            <div className="flex flex-col justify-center items-center">
                <p>{data.user_post_number === null ? 0 : data.user_post_number}</p>
                <p className="text-sm">Posts</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <p>{data.user_follower_number === null ? 0 : data.user_follower_number}</p>
                <p className="text-sm">Followers</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <p>{data.user_following_number === null ? 0 : data.user_following_number}</p>
                <p className="text-sm">Following</p>
            </div>
        </div>
    </div>
)

export default ProfileHero