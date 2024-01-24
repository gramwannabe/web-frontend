import { streamHost } from "@/helpers/stream.config"

const ContentPosts = ({ data, setPostDetailModal, setCurrentPost }) => (
    <div className="container mt-5">
        <div className="grid grid-cols-3 gap-0.5">
            {data.length >= 0 && data.map((item, index) => {
                return item.post_media_type === "image" ?
                    (
                        <img
                            key={index}
                            src={`${streamHost}/image/${item.user_id}/${item.post_media[0]}`}
                            onClick={e => {
                                setPostDetailModal(true)
                                setCurrentPost(item)
                            }}
                            className="bg-gray-200 h-32 flex flex-row justify-center items-center text-sm cursor-pointer w-full"
                        />
                    ) : (
                        <video
                            key={index}
                            onClick={e => {
                                setPostDetailModal(true)
                                setCurrentPost(item)
                            }}
                            src={`${streamHost}/stream/${item.user_id}/${item.post_media[0]}`}
                            className="bg-gray-200 h-32 flex flex-row justify-center items-center text-sm cursor-pointer w-full"
                        />
                    )
            })}
        </div>
    </div>
)

export default ContentPosts