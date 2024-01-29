import { JWT_KEY } from "@/helpers/common.constant"
import axios from "axios"

const StickyFooter = ({
    setProgressModal,
    setProgress,
    setErrorMessage,
    setSuccessMessage,
    setFilename,
    setPostId
}) => {
    return (<div id="stickyFooter" className="flex items-center justify-center border rounded shadow p-2 fixed bottom-0 w-full md:w-3/5 bg-white min-h-12" >
        <div id="postContainer" className="border shadow rounded-full p-2 bg-white absolute -top-4 cursor-pointer">
            <label htmlFor="file-upload">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </label>
            <input id="file-upload" type="file" className="hidden" onChange={async e => {
                e.preventDefault()
                setProgressModal(true)
                setErrorMessage(null)
                setSuccessMessage(null)
                try {
                    const file = e.target.files[0]
                    const data = new FormData();
                    data.append('file', file);
                    const response = await axios.request({
                        method: 'post',
                        maxBodyLength: Infinity,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
                        },
                        url: '/api/upload',
                        onUploadProgress: function (progressEvent) {
                            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setProgress(percentCompleted)
                        },
                        data: data
                    })
                    setSuccessMessage(response.data.message)
                    setFilename(response.data.content.filename)
                    setPostId(response.data.content.postId)
                } catch (error) {
                    console.error(error)
                    setErrorMessage(error.response.data.message)
                }
            }} />
        </div>
    </div>)
}

export default StickyFooter