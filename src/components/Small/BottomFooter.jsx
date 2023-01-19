import React from 'react';
import { FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi";
import logo from "../../Asset/Developer logo/ashik-low-resolution-logo-color-on-transparent-background.png";
const BottomFooter = () => {
    return (
        <div className="w-full">
            <hr className="w-full mb-2 opacity-30 h-[.6px]" />
            <div className="block md:flex justify-between items-center px-10  ">
                <img src={logo} alt="" className="w-[6%] mt-2" />
                <div className="flex flex-col">
                    <p className="text-para text-sm leading-loosed text-font-semibold">meashik1000@gmail.com</p>
                    <div className="flex space-x-2  mt-1 ">

                        <a href="https://www.facebook.com/ashik.201.35.540/"><FiFacebook className="text-xl hover:text-sky-400 duration-200" /></a>
                        <a href="https://github.com/Ashikur540"><FiGithub className="text-xl hover:text-sky-400 duration-200" /></a>
                        <a href="https://www.linkedin.com/in/md-ashikurrahman/"><FiLinkedin className="text-xl hover:text-sky-400 duration-200" /></a>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottomFooter