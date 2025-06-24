export default function ErrorMessage({message}: {message: string}){
    return (
        <div className="mb-8 transform animate-slideInUp">
            <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-xl p-6 shadow-xl">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                        <img
                            src="./no-results-found.png"
                            alt="Error Icon"
                            className="size-52"
                            loading="lazy" 
                        />
                        <p className="text-gray-300 text-2xl">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}