import Image from "next/image"
import { bg } from "../../../public"
import Link from "next/link"
const Login = () => {
  return (
    <section className="flex items-center justify-center ">
      <div className="form flex flex-col">
        <p className="font-outfit text-[25px] mb-5">Login to your account</p>
        <form method="post" className="flex flex-col">
          <input type="text" name="userid" id="userid" placeholder="Admin Email" className="bg-white"/>
          <input type="text" name="pwd" id="pwd" placeholder="Admin Password" />
          <div className="btn flex justify-between mt-6">
          <button className="text-gray-600 hover:text-black">Forgot your password?</button>
          <Link href='/upload'>
            <button className="signin bg-[#4F96FB] rounded-full text-white px-8 py-1 hover:bg-[#73adff]">Sign in</button>
          </Link>
          </div>
        </form>
      </div>

      <div className="img">
        <Image src={bg} width={744} height={760}  />
      </div>
    </section>
  )
}

export default Login
