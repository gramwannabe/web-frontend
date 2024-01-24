const ProfileSetting = () => (
    <div id="profileSettings" className="flex flex-row justify-between px-5 space-x-5 mt-3 w-full">
        <a href="/profile/edit" className="flex flex-row justify-center items-center border shadow rounded-md w-full py-1 text-sm">Edit Profile</a>
        <a href="/logout" className="flex flex-row justify-center items-center border shadow rounded-md w-full py-1 text-sm">Logout</a>
    </div>
)

export default ProfileSetting