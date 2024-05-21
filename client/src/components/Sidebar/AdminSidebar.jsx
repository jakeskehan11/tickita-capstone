import { NavLink, Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import defaultPic from "../../assets/defaultpic.jpg";
import { AiFillDashboard } from "react-icons/ai";
import { FaTicket } from "react-icons/fa6";
import { IoIosChatboxes, IoIosHappy } from "react-icons/io";
import { useAuthContext } from "@/hooks/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();

  const userRole = user.role;

  const [currentColor, setCurrentColor] = useState("rgb(20 83 45)");
  const activeLink = "flex rounded-lg text-slate-200 mx-2";
  const normalLink =
    "flex text-slate-200 mx-2 hover:bg-green-900 hover:rounded-lg my-0.5";

  const getNavLinkDestination = (role) => {
    switch (role) {
      case "PPSS":
        return "job-tickets";
      case "Computer Technician":
        return "technical-job-tickets";
      default:
        return null;
    }
  };
  const destination = getNavLinkDestination(userRole);

  return (
    /*SIDEBAR TITLE*/
    <div className="h-screen overflow-auto pb-5">
      <Link
        to={`dashboard`}
        className="text-slate-100 text-4xl font-extrabold tracking-wider flex justify-center mt-2"
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
            <p className="ml-5 py-3">Ticket</p>
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
      </div>
    </div>
  );
};
export default Sidebar;
