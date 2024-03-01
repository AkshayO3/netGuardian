"use client"
import Link from "next/link";
import axiosInstance from '../../api/post';

const Delete = () => {
    const handleClick = async () => {
        try {
            const response = await axiosInstance.get('/finish');
            console.log(response.data);
        } catch (err) {
            console.error('Error hitting the finish endpoint:', err);
        }
    }
    return (
        <div className={`flex flex-col items-center gap-y-4`}>
        <Link href={`/`}>
        <button onClick={handleClick} className="animation text-[22px] bg-red-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-white hover:border-4 hover:border-solid hover:border-red-600 hover:text-red-600">
            Purge
        </button>
        </Link>
            <div className={`w-[300px] text-center font-light text-red-500 underline`}>
                All files and reports will be deleted. <br/> This action can not be undone!
            </div>
        </div>
    )
}
export default Delete;