import React from 'react'
import { MdOutlineDashboard, MdOutlineHome, MdOutlineMailOutline, MdOutlinePersonOutline, MdTaskAlt } from "react-icons/md"
import { Link } from "react-scroll"
const Nav = () => {
    const LINKS = [
        { name: "Home_", ref: "#HERO" }, { name: "About_", ref: "#ABOUT" }, { name: "Skills_", ref: "#SKILLS" }, { name: "Projects_", ref: "#PROJECTS" }, { name: "contact_", ref: "#CONTACT" },
    ]
    return (
        <nav className="fixed bottom-2 lg:bottom-10 w-full overflow-hidden z-50">
            <div className="container mx-auto">
                <div className="w-full bg-gradient-to-b from-gray-800 to-gray-600  h-[96px] backdrop-blur-3xl rounded-2xl max-w-md mx-auto px-5 text-2xl text-para flex justify-between" >
                    <Link to="HERO" activeClass="active" spy={true} smooth={true} duration={1000} offset={-60} className="h-[60px] w-[60px] flex justify-center items-center rounded-full cursor-pointer my-auto"><MdOutlineHome className="text-xl" /></Link>
                    <Link to="ABOUT" activeClass="active" spy={true} smooth={true} duration={1000} offset={-60} className=" h-[60px] w-[60px] flex justify-center items-center rounded-full cursor-pointer my-auto"><MdOutlinePersonOutline className="text-xl" /></Link>
                    <Link to="SKILLS" activeClass="active" spy={true} smooth={true} duration={1000} offset={-60} className=" h-[60px] w-[60px] flex justify-center items-center rounded-full cursor-pointer my-auto"><MdTaskAlt className="text-xl" /></Link>
                    <Link to="PROJECTS" activeClass="active" spy={true} smooth={true} duration={1000} offset={-100} className=" h-[60px] w-[60px] flex justify-center items-center rounded-full cursor-pointer my-auto"><MdOutlineDashboard className="text-xl" /></Link>
                    <Link to="CONTACT" activeClass="active" spy={true} smooth={true} duration={1000} offset={-200}
                        className=" h-[60px] w-[60px] flex justify-center items-center rounded-full cursor-pointer my-auto"><MdOutlineMailOutline className="text-xl" /></Link>
                </div>
            </div>

        </nav >
    )
}

export default Nav