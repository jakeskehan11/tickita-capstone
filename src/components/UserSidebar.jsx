import { Link, NavLink } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import "../App.css";
import userPic from "../assets/userpic.jpg";
import { FaTicket } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";
import { IoSettings } from "react-icons/io5";

const Sidebar = () => {
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const activeLink = "flex rounded-lg bg-white text-green-950 mx-1";
  const normalLink =
    "flex text-slate-100 mx-1 hover:bg-white hover:rounded-lg hover:text-green-950 my-1.5";

  return (
    /*SIDEBAR TITLE*/
    <div className="h-screen overflow-auto pb-5">
      {/*SIDEBAR ADMIN INFO*/}
      <div className="flex flex-col items-center mt-5">
        <Avatar className="mx-auto size-20">
          <AvatarImage src={userPic} alt="user avatar" />
        </Avatar>
        <h4 className="font-semibold text-xl text-yellow-500 mt-3">
          User Name
        </h4>
        <p className="text-yellow-500 text-lg mt-1">Staff Role</p>
      </div>

      {/*SIDEBAR LINKS*/}
      <div className="mt-10">
        <NavLink
          to={`user-tickets`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
          })}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="flex ml-5">
            <FaTicket className="size-5 place-self-center" />
            <p className="ml-5 py-3">Tickets</p>
          </div>
        </NavLink>
        <NavLink
          to={`user-chat`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
          })}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="flex ml-5">
            <IoIosChatboxes className="size-5 place-self-center" />
            <p className="ml-5 py-3">Chat</p>
          </div>
        </NavLink>
        <NavLink
          to={`user-settings`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
          })}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="flex ml-5">
            <IoSettings className="size-5 place-self-center" />
            <p className="ml-5 py-3">Settings</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
export default Sidebar;
