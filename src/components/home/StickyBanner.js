import { streamHost } from "@/helpers/stream.config"

const StickyBanner = ({ title, profile }) => (
    <div id="stickyBanner" className="flex items-center justify-between border rounded shadow p-2 fixed top-0 w-full md:w-3/5 bg-white">
        <div id="logoContainer">
            <a href="/home">{title}</a>
        </div>
        <div id="profileContainer">
            <a href="/profile">
                {profile.user_profile_picture !== null ?
                    <img src={`${streamHost}/image/${profile.user_id}/${profile.user_profile_picture}`} className="w-8 h-8 rounded-full border shadow" />
                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                }
            </a>
        </div>
    </div>
)

export default StickyBanner