import { Link, NavLink } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import "../App.css";
import adminPic from "../assets/adminpic.jpg";
import { AiFillDashboard } from "react-icons/ai";
import { FaTicket } from "react-icons/fa6";
import { IoIosChatboxes, IoIosHappy } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

const Sidebar = () => {
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const activeLink = "flex rounded-lg bg-white text-green-950 mx-1";
  const normalLink =
    "flex text-slate-100 mx-1 hover:bg-white hover:rounded-lg hover:text-green-950 my-1.5";

  return (
    /*SIDEBAR TITLE*/
    <div className="h-screen overflow-auto pb-5">
      <div className="flex justify-center items-center">
        <Link
          to={`dashboard`}
          className="text-white text-4xl font-extrabold tracking-wider mt-5"
        >
          TICKITA
        </Link>
      </div>

      {/*SIDEBAR ADMIN INFO*/}
      <div className="flex flex-col items-center mt-10">
        <Avatar className="mx-auto size-20">
          <AvatarImage src={adminPic} alt="admin avatar" />
        </Avatar>
        <h4 className="font-semibold text-xl text-yellow-500 mt-3">
          Admin Name
        </h4>
        <p className="text-yellow-500 text-lg mt-1">Computer Technician</p>
      </div>

      {/*SIDEBAR LINKS*/}
      <div className="mt-10">
        <NavLink
          to={`dashboard`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
          })}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="flex ml-5">
            <AiFillDashboard className="size-5 place-self-center" />
            <p className="ml-5 py-3">Dashboard</p>
          </div>
        </NavLink>
        <NavLink
          to={`tickets`}
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
          to={`chat`}
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
          to={`users`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
          })}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="flex ml-5">
            <FaUserAlt className="size-5 place-self-center" />
            <p className="ml-5 py-3">Users</p>
          </div>
        </NavLink>
        <NavLink
          to={`teams`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
          })}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="flex ml-5">
            <MdGroups className="size-5 place-self-center" />
            <p className="ml-5 py-3">Teams</p>
          </div>
        </NavLink>
        <NavLink
          to={`feedbacks`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
          })}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="flex ml-5">
            <IoIosHappy className="size-5 place-self-center" />
            <p className="ml-5 py-3">Feedbacks</p>
          </div>
        </NavLink>
        <NavLink
          to={`settings`}
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
