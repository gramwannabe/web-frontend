const Modal = ({ show, setShow, children }) => {
    return (<>
        {show && <div id="modalOverlay" onClick={e => setShow(!show)} className="flex flex-col justify-center items-center w-full md:w-3/5 h-full p-2 bg-gray-500 absolute bg-opacity-50 cursor-pointer">
            <div id="modalContainer" onClick={e => e.stopPropagation()} className="flex flex-col justify-center items-center w-full bg-white rounded-md shadow border p-2 relative cursor-default">
                <div id="modalClose" onClick={e => setShow(!show)} className="flex bg-white rounded-full p-2 border cursor-pointer absolute -right-2 -top-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <div id="modalContent" className="min-h-12 w-full">
                    {children}
                </div>
            </div>
        </div>}</>)
}

export default Modal