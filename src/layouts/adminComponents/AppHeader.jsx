import React from "react";
import {IoNotifications, IoSearch} from "react-icons/io5";

const AppHeader = () => {
    return (
        <>
            <h1 className="text-xl font-semibold">Martial</h1>
            <div className="flex items-center space-x-4">
                {/* <div className=" px-4 py-1 border border-app-border rounded-xl bg-white">
                    <IoNotifications className="w-[2rem] h-[2rem] text-black-second/40"/>
                </div> */}
                {/* <div className="relative w-[16rem]">
                    <input type="text" placeholder="Search" className="w-full px-4 py-2 pl-10 inputForm border
                        border-app-border"/>
                    <IoSearch className="absolute left-3 top-1/2 h-6 w-6 transform -translate-y-1/2 text-black-accent"/>
                </div> */}
            </div>
        </>
    )
}

export default AppHeader;