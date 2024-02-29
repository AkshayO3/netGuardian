import Image from "next/image"
import Link from "next/link"
import { first } from "../../../public"
const Login = () => {
  return (
    <div className="flex mt-10 justify-around">

      <div className=" h-[80vh] ml-12 w-[45vw] mt-24" >
        <h1 className="text-5xl font-bold">Safeguarding Your Network with Advanced Configuration Analysis</h1>
        <p className="mt-6 text-2xl font-normal ">NetGuardian: Your comprehensive solution for advanced network configuration security analysis.</p>
        <Link href={`/upload`}>
        <button className="animation bg-[#4F96FB] text-white w-[200px] mt-6 h-[50px] rounded-full hover:bg-[#f1f1f1] hover:text-[#4F96FB] hover:border-4 hover:border-solid hover:border-[#4F96FB] font-semibold">Get Started</button>
        </Link>
      </div>

      <div className="m-10 mr-20">
        <Image src={first} height={740} width={540} />
      </div>
    </div>

  )
}

export default Login
