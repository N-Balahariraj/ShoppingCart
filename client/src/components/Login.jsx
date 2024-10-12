import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../firebase/auth'

export default function Login({ setUser }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [islogingIn, setIsLogingIn] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='box items-center justify-center'>
            <div className='w-[50%] h-[100%] flex flex-col items-center text-left font-mono bg-white gap-10'>
                <div className='w-[80%]'>
                    <h1 className='text-3xl font-bold'>Welcome Back!</h1>
                    <span className='text-gray-500'>Login to access all your data</span>
                </div>
                <form className='flex flex-col w-[80%] gap-4'>
                    <label htmlFor="" className='labels'>Email Address</label>
                    <input type="email" placeholder="Enter your email address" className='inputBox' onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="" className='labels'>Password</label>
                    <input type="password" placeholder="Enter your password" className='inputBox' onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={(e) => {
                        e.preventDefault()
                        if (!islogingIn) {
                            setIsLogingIn(true)
                            login(email, password).then((res) => {
                                setUser(res.user)
                                navigate('/home')
                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                        setIsLogingIn(false)
                    }}
                        type="submit"
                        className='rounded-md bg-sky-500 p-2 text-white'>
                        Login
                    </button>
                </form>
                <span>Don't have an account?
                    <Link to={"/register"} className='underline text-sky-500'>Register</Link>
                </span>
            </div>
            <div className='h-[100vh] w-[40%] p-2 content-center'>
                <img src="/login.jpeg" alt="login" className='h-[90vh] rounded-3xl' />
            </div>
        </div>
    )
}
