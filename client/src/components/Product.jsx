import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosPerson } from "react-icons/io";
import { BsPlusSquare } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { logout } from '../firebase/auth';
import Carousel from 'react-bootstrap/Carousel';
import { addProduct, uploadImages } from '../firebase/api';


export default function Product({ setUser, user }) {
    const navigate = useNavigate()
    const [imgs, setImgs] = useState([])
    const [imgUrls, setImgUrls] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    return (
        <div className='h-[100vh] m-auto flex flex-col font-mono'>
            <div className='h-[15%] w-[95%] flex justify-between items-center m-auto'>
                <span className='text-3xl font-bold'>Bandage</span>
                <div className='w-[30%] flex items-center justify-around'>
                    <IoIosPerson className='text-2xl' />
                    <Link to={'/'} className='text-lg no-underline text-black'>{user?.email || 'Login'}</Link>
                    <FiLogOut className='text-lg w-[15%] cursor-pointer' onClick={() => {
                        setUser(null)
                        logout()
                        navigate('/')
                    }} />
                </div>
            </div>
            <div className='h-[85%] bg-[#fafafa]'>
                <div className='h-[15%] w-[95%] content-center m-auto'>Home &gt; shop</div>
                <div className='h-[85%] flex '>
                    <div className='h-[100%] w-[50%] content-center'>
                        <Carousel interval={null} className='h-[90%] w-[90%] m-auto border-2 overflow-hidden'>
                            {imgUrls?.map((imgUrl) => <Carousel.Item as={'img'} src={imgUrl} />)}
                            <div className='h-[30rem] w-[100%] bg-[#eeeeee] flex justify-center items-center'>
                                <label htmlFor="actual-btn"><BsPlusSquare className='text-9xl m-auto cursor-pointer hover:text-[#23a6f0]' /></label>
                                <input type="file" multiple id='actual-btn' className='hidden' onChange={(e) => setImgs(e.target.files)} />
                            </div>
                        </Carousel>
                    </div>
                    <div className='w-[50%] flex flex-col justify-center px-5'>
                        <form action="#" className='flex flex-col gap-3'>
                            <label htmlFor="" className='labels'>Product Name</label>
                            <input type="text" placeholder='Enter your product name' className='inputBox' onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="" className='labels'>Product Price</label>
                            <input type="text" placeholder='Enter your product price' className='inputBox' onChange={(e) => setPrice(e.target.value)} />
                            <label htmlFor="" className='labels'>Description</label>
                            <input type="text" placeholder='Enter your description' className='inputBox' onChange={(e) => setDescription(e.target.value)} />
                            <div className='h-[30%] w-[100%] flex gap-2 py-2'>
                                <span className='circle bg-[#23a6f0]'></span>
                                <span className='circle bg-[#2dc071]'></span>
                                <span className='circle bg-[#e77c40]'></span>
                                <span className='circle bg-[#252b42]'></span>
                            </div>
                            <button className='rounded-md bg-sky-500 p-2 text-white'
                                onClick={(e) => {
                                    e.preventDefault()
                                    uploadImages(imgs)
                                        .then((res) => {
                                            setImgUrls(res)
                                            addProduct(name, price, description)
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                    setName('')
                                    setPrice('')
                                    setDescription('')
                                    setImgs([])
                                }}>
                                save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
