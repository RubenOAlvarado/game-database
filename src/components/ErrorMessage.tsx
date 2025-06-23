export default function ErrorMessage({message}: {message: string}){
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <img
                src="./no-results-found.png"
                alt="Error Icon"
                className="size-52"
                loading="lazy" 
            />
            <p className="text-gray-300 text-2xl">{message}</p>
        </div>
    );
}