import React, { useState } from 'react';
import Image from 'next/image';
import whiteLogoNoBackground from "../../../public/assets/images/RealSales-official-logo/For Web/png/White logo - no background.png";
import userDummy from "../../../public/assets/images/RealSales-user-images/user-3.png";
import glow_light from "../../../public/assets/images/RealSales-abstracts/glow-light-1.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Chat = () => {
    return (
        <div className="page-container mx-auto container p-4 flex justify-between flex-col">
            <div className={`h-screen w-auto rounded-[25px] bg-[url(../../public/assets/images/RealSales-backgrounds/bg-4.png)] bg-cover bg-center bg-blend-multiply overflow-hidden relative`}>
                {/* <Image src={glow_light} alt='glow_light' className='absolute w-full h-full' /> */}
                <div class="w-full h-full bg-[linear-gradient(180deg,rgba(6,6,6,0.9)_0%,rgba(17,24,43,0.9)_62.58%)] px-8 py-4">
                    {/* header */}
                    <div className='flex items-center justify-between'>
                        <div className='w-10 h-10 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer'>
                            <ArrowBackIcon className='text-white' />
                        </div>
                        <Image
                            src={whiteLogoNoBackground}
                            alt="whiteLogoNoBackground"
                            className="h-10 w-auto"
                        />
                        <div className='flex items-center gap-2'>
                            <div className='w-10 h-10 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer'>
                                <MailIcon className='text-white' />
                            </div>
                            <div className='w-10 h-10 bg-[#FFFFFF1A] rounded-full flex items-center justify-center cursor-pointer'>
                                <NotificationsIcon className='text-white' />
                            </div>
                            <div className='flex items-center gap-2 pl-4'>
                                <div className='flex flex-col items-end'>
                                    <p className='lg:text-lg text-base m-plus-rounded-1c-regular text-[#ffffffc6]'>Logged in as:</p>
                                    <p className='lg:text-xl text-lg m-plus-rounded-1c-medium text-[#FFDE5A]'>Mr. John Doe</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <div className='w-20 h-20 rounded-full p-1 border-2 border-solid border-white overflow-hidden'>
                                        <Image src={userDummy} alt='user-image' className='w-full h-full rounded-full' />
                                    </div>
                                    <ArrowDropDownIcon className='text-white !text-4xl' />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* bordy */}
                    <div className='flex flex-row gap-4'>
                        <div className='w-[70%]'>sss</div>
                        <div className='w-[30%]'>ss</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat