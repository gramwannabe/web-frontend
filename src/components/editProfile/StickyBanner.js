const StickyBanner = () => (
    <div id="stickyBanner" className="flex items-center justify-start border rounded shadow p-2 fixed top-0 w-full md:w-3/5 bg-white">
        <a href="/profile">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
        </a>
    </div>
)

export default StickyBanner