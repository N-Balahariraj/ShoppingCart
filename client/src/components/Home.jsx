import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch } from "react-icons/fi";
import { IoIosPerson } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { logout } from '../firebase/auth';
import { getProducts } from '../firebase/api';

export default function Home({ setUser, user }) {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        getProducts().then((res) => {
            setProducts(res)
        }).catch((err) => {
            console.log(err)
        })
    },[])
    return (
        <div className='h-[100vh] w-[95%] flex flex-col content-center font-mono margin-auto'>
            <div className='h-[5%] w-[100%] flex justify-between m-2 items-center box-border'>
                <div className='w-[75%] h-[100%] flex items-center border-2 p-2 rounded-md'>
                    <input type="text" className='h-[100%] w-[95%] outline-none' />
                    <FiSearch className='text-xl' />
                </div>
                <div className='h-[90%] flex items-center justify-around'>
                    <IoIosPerson className='text-2xl ' />
                    <Link to={'/'} className='text-lg no-underline text-black'>{user?.email || 'Login'}</Link>
                    <FiLogOut className='text-lg cursor-pointer' onClick={() => {
                        setUser(null)
                        logout()
                        navigate('/')
                    }} />
                </div>
            </div>
            <div className='h-[80%] w-[100%] flex flex-wrap overflow-auto'>
                {products.map((product) => {
                    return (
                        <div className='h-[50%] w-[20%] m-2 border-2 rounded-md'>
                            <img src={product.Images[0]} alt={product['Product Name']} className='h-[80%] w-[100%]' />
                            <div className='h-[20%] w-[100%] flex flex-col justify-between p-2'>
                                <span className='text-lg '>{product['Product Name']}</span>
                                <span className='text-lg '>rs.{product['Product Price']}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='h-[10%] w-[100%] flex items-center absolute bottom-0 bg-slate-300'>
                <span className='m-auto'>copyrights reserved ⓒ</span>
                <Link to={user?'/home/shop':'/'} className='bg-sky-500 text-white mr-2 rounded-md p-2 no-underline'>Add products</Link>
            </div>
        </div>
    )
}
