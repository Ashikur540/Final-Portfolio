import React from 'react';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const SkillBlob = ({ skill }) => {
    return (
        <div>
            <div id={skill.name} className="flex items-center gap-2 p-3 w-48 sm:w-fit whitespace-nowrap  shadow-[#070608] shadow-lg bg-[#1E1A27] rounded-lg hover:scale-105 duration-300 ease-in-out" >
                <div className="p-2 bg-[#33303ad5] rounded-md border-[#ffffff2a] border-2">
                    <img src={skill.img} className="w-10 z-10" alt="" /></div>
                <h2 class="text-white font-medium  border-gray-300 pl-4 text-lg">{skill.name}</h2>
                <ReactTooltip
                    anchorId={skill.name}
                    place="top"
                    content={skill.level}
                />
            </div>
        </div>
    )
}

export default SkillBlob