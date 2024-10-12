import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../firebase/auth'

export default function Register({setUser}) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='box'>
            <div className='w-[70%] h-[100%]'>
                <img src="/register.jpeg" alt="register" className='h-[100vh]' />
            </div>
            <div className='w-[50%] h-[100%] flex flex-col justify-center items-center absolute right-0 font-mono bg-white rounded-[20%] gap-8'>
                <h1 className='text-3xl font-bold'>Create an Account</h1>
                <form className='flex flex-col w-[80%] gap-3'>
                    <label htmlFor="" className='labels'>Email Address</label>
                    <input type="email" placeholder="Enter your email address" className='inputBox' onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="" className='labels'>Full Name</label>
                    <input type="text" placeholder="Enter your name" className='inputBox' onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="" className='labels'>Password</label>
                    <input type="password" placeholder="Enter your password" className='inputBox' onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="" className='labels'>Confirm Password</label>
                    <input type="password" placeholder="Confirm your password" className='inputBox' onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button onClick={(e) => {
                        e.preventDefault()
                        if (!isRegistering) {
                            setIsRegistering(true)
                            register(email, password, confirmPassword).then((res) => {
                                setUser(res.user)
                                navigate('/home')
                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                        setIsRegistering(false)
                    }}
                        type="submit"
                        className='rounded-md bg-sky-500 p-2 text-white'>
                        Create an Account
                    </button>
                </form>
                <span>Already have an account?
                    <Link to={"/"} className='underline text-sky-500'>Login</Link>
                </span>
            </div>
        </div>
    )
}
