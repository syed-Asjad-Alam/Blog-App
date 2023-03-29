import react, { useState } from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'



function Login() {

    const [email,setemail] = useState()
    const [password,setpassword] = useState()

    const navigate = useNavigate()


    const login = async(e) => {
        e.preventDefault()
        await axios.post(`${process.env.REACT_APP_API_URL}/users/login`,{
            email:email,
            password:password
        })
        .then((res) =>  {
            if (res.data.token) {
                localStorage.setItem('user_id',res.data._id)
                localStorage.setItem('token',res.data.token)
                navigate("/blogs")

            }
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className="grid h-screen place-items-center fixed top-0 left-0 right-0 bg-black bg-opacity-80">
            <div className="bg-white p-10 border-8 rounded-xl border-neutral-300 shadow-2xl">
                <div className="min-w-0 flex-1">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Login</h1>
                </div>
                <form>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <input type='text' value={email} className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(text) => setemail(text.target.value)}></input>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <input type='password' value={password} className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(text) => setpassword(text.target.value)}></input>
                    </div>
                    <div className="flex justify-end">
                        <div>
                            <button className="mt-8 ml-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={(e) => login(e)}>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
    
}


export default Login;