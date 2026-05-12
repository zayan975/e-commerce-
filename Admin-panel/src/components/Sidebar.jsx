import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    IoAddCircleOutline,
    IoListOutline,
    IoBagCheckOutline,
    IoShirtOutline
} from "react-icons/io5";

const Sidebar = () => {
    const Links = [
        { name: "Add Items", link: "/add", icon: <IoAddCircleOutline size={22} /> },
        { name: "List Items", link: "/list", icon: <IoListOutline size={22} /> },
        { name: "Orders", link: "/orders", icon: <IoBagCheckOutline size={22} /> },
    ];

    return (
        <aside className="w-[18%] min-h-screen border-r border-gray-300">
           
            <nav className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                {Links.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.link}
                        className={({ isActive }) => `
              flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200
              ${isActive
                                ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}
            `}
                    >
                        <span className="min-w-6">{item.icon}</span>
                        <span className="hidden md:block font-medium text-sm">
                            {item.name}
                        </span>
                    </NavLink>
                ))}
            </nav>

         
         
        </aside>
    );
};

export default Sidebar;