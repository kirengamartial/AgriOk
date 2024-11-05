import React from "react";
import { useSelector } from "react-redux";

const AppHeader = () => {
    const {userInfo} = useSelector(state => state.auth)
    return (
        <> 
             <h1></h1>
            <div className="flex items-center space-x-4 mr-16">
            <h1 className="text-xl font-semibold">{userInfo && userInfo.first_name}</h1>
            </div>
        </>
    )
}

export default AppHeader;