'use client'
import {useState } from "react"
import ForgetPass from "@/apis/user/forgetpass"
export default function changePass(){
    const[email, setEmail]=useState('');
    const[message, setMessage] = useState('');
    const[loading, setLoading] = useState(false);
    async function handleSubmit(e: any){
        e.preventDefault();
        setLoading(true);
        setMessage('')
        try {
            const data = await ForgetPass({email});
            const rs = await data.json()
            setMessage(rs.message || 'OK')
            alert(`Mail đã được gửi vào ${email}`)
        } catch (error) {
            setMessage("Error occurred while sending request");
        } finally {
        setLoading(false);
        }
    }
    
    return(
        <div className="font-[sans-serif] bg-slate-950">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className=" bg-white grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full px-4 py-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-gray-800 text-3xl font-extrabold">Change your password</h3>
                
              </div>

              <div>
                <label className="text-gray-800 text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} name="email" type="text" required className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none" placeholder="Enter email" />

                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                      <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                    </g>
                  </svg>
                </div>
              </div>
                
                        {loading ?  (
                            <p className="text-cyan-400">Đang gửi....</p>
                        ):(
                            <div></div>
                        )}
                
              <div className="mt-12">
                <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    Submit
                </button>
              </div>
 
            </form>
          </div>

          <div className="md:h-full bg-[#000842] rounded-xl lg:p-12 p-8">
            <img src="https://readymadeui.com/signin-image.webp" className="w-full h-full object-contain" alt="login-image" />
          </div>
        </div>
      </div>
    </div>
    )
}