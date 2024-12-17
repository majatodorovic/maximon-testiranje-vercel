// components/SideMenu.js

import React from 'react';


const Menuicon = () => {
    return (
        <div className="fixed top-1/3 right-0 bg-black text-white py-4 px-2 flex flex-col items-center space-y-6 rounded-l-lg">
            <div className="flex flex-col items-center cursor-pointer">

                <span className="text-sm mt-1">cart</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer">

                <span className="text-sm mt-1">wishlist</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer">

                <span className="text-sm mt-1">search</span>
            </div>
        </div>
    );
};

export default Menuicon;
