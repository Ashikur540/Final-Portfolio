import React, { useEffect, useRef } from 'react';
const Logo = () => {

    const circleText = useRef();
    useEffect(() => {
        // console.log(circleText.current.innerHTML);
        circleText.current.innerHTML = circleText.current.innerText;
    }, [])
    return (
        <div className="circle h-[60px] w-[60px] rounded-full bg-transparent flex justify-center items-center relative">
            <div className="img h-[40px] w-[40px] bg-red-800 rounded-full  absolute bg-me bg-cover bg-center filter brightness-110 contrast-110">

            </div>
            <div className="text absolute w-full h-full">
                {/* <p ref={circleText}>Ashikur Rahman</p> */}
            </div>

        </div>
    )
}

export default Logo;

