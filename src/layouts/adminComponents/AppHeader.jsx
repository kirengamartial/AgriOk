import React from "react";
import { useSelector } from "react-redux";

const AppHeader = () => {
    const {userInfo} = useSelector(state => state.auth)
    
    return (
        <header className="w-full">
            <div className="flex items-center px-4 sm:px-6 py-2 sm:py-4">
                <div className="flex-1 min-w-0">
                    <h1 className="text-lg sm:text-xl font-semibold truncate">
                        {userInfo && userInfo.first_name}
                    </h1>
                </div>
                {/* If you want to add additional items to the right */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {/* Add any additional header items here */}
                </div>
            </div>
        </header>
    );
};

export default AppHeader;