import { NavLink, Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaTicket } from "react-icons/fa6";
import { IoIosChatboxes, IoIosHappy } from "react-icons/io";
import { useAuthContext } from "@/hooks/useAuthContext";
import schoolStatue from "/cvsu-statue.png";
import defaultPic from "/defaultpic.jpg";

const AdminSidebar = () => {
  const { user } = useAuthContext();

  const userRole = user.role;

  const [currentColor, setCurrentColor] = useState("rgb(20 83 45)");
  const activeLink = "flex text-yellow-500";
  const normalLink = "flex text-slate-100 hover:bg-green-900";

  const getNavLinkDestination = (role) => {
    switch (role) {
      case "PPSS":
        return "tickets";
      case "Computer Technician":
        return "tickets";
      default:
        return null;
    }
  };
  const destination = getNavLinkDestination(userRole);

  return (
    // SIDEBAR TITLE
    <div className="h-screen overflow-auto">
      <Link
        to={`dashboard`}
        className="text-yellow-500 text-4xl font-extrabold tracking-wider flex justify-center mt-2"
      >
        TICKITA
      </Link>
      {/*SIDEBAR ADMIN INFO*/}
      <div className="flex flex-col items-center mt-5">
        <Avatar className="mx-auto size-20">
          <AvatarImage src={defaultPic} alt="admin avatar" />
        </Avatar>
        <p className="font-semibold text-xl capitalize text-yellow-500 mt-3">
          {user.firstname} {user.lastname}
        </p>
        <p className="font-medium text-lg capitalize text-yellow-500 mt-1">
          {user.role}
        </p>
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
          to={destination}
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
      </div>
      <img
        src={schoolStatue}
        alt="school statue pic"
        className="absolute inset-x-0 bottom-0 object-contain -z-10 w-60 h-80"
      />
    </div>
  );
};
export default AdminSidebar;
