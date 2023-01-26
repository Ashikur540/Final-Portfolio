import React, { useState } from 'react';
import { HiOutlineBars3BottomRight, HiXMark } from "react-icons/hi2";
import mylogo from "../Asset/Developer logo/ashik-low-resolution-logo-color-on-transparent-background.png";
const Navbar = ({ setSelectedPage, selectedPage }) => {
    const [isClicked, setIsclicked] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);

        // return () => window.onscroll = null;
    }

    const LINKS = [
        { name: "Home_", ref: "#HERO" }, { name: "About_", ref: "#ABOUT" }, { name: "Skills_", ref: "#SKILLS" }, { name: "Projects_", ref: "#PROJECTS" }, { name: "contact_", ref: "#CONTACT" },
    ]
    return (
        <nav className={`${isScrolled ? 'bg-white/20 backdrop-blur-md duration-500 ease-linear' : 'bg-transparent'} z-[999]  py-1 w-full fixed top-0 right-0 left-0 flex items-center justify-between pl-10 md:px-14 `}>

            <a href="/" className="w-[14%] md:w-[8%] animate-spin "><img src={mylogo} alt="" className="p-1" /></a>

            <div className='md:hidden fixed right-5 cursor-pointer z-20 top-2 text-3xl font-bold transform transition duration-300 ease-linear'>
                {
                    isClicked ? <HiXMark onClick={() => setIsclicked(!isClicked)} className="transform transition duration-300 ease-linear" />
                        :
                        <HiOutlineBars3BottomRight onClick={() => setIsclicked(!isClicked)} className="transform transition duration-300 ease-linear" />
                }
            </div>


            {/* <ul className={`${isClicked ? "bg-slate-200 " : ""}  md:pl-10 pr-28 md:static fixed duration-500 ease-linear top-0 md:h-auto h-screen z-10 ${!isClicked ? 'right-[-100%] ' : 'right-0 ]'}`}>

                {
                    LINKS?.map((link, i) =>
                        <li className=' md:inline-block py-6 ' key={i}>
                            <a href={link.ref} className={`${isClicked && "text-body"} text-center mx-10 md:mx-5 py-10 hover:text-sky-400 duration-500 active:text-sky-400`}>{link.name} </a>
                        </li>)
                }

            </ul> */}
            <ul className={`${isClicked ? "bg-slate-200 " : ""}  md:pl-10 md:pr-14 lg:pr-28 md:static fixed duration-500 ease-linear top-0 md:h-auto  z-10 ${!isClicked ? 'right-[-100%]  ' : 'right-0 '}`}>

                {
                    LINKS?.map((link, i) =>
                        <li className=' md:inline-block py-6 flex items-stretch' key={i}>
                            <a href={link.ref} className={`${isClicked && "text-body"} text-center flex items-center gap-x-2 py-2  md:px-3 lg:px-8`}>{link.name} </a>
                        </li>)
                }

            </ul>

        </nav>
    )
}

export default Navbar