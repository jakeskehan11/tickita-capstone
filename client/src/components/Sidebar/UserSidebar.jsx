import { NavLink, Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import defaultPic from "../../assets/defaultpic.jpg";
import { FaTicket } from "react-icons/fa6";
import { IoIosChatboxes, IoIosHappy } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
import { useAuthContext } from "@/hooks/useAuthContext";


const Sidebar = () => {
  const { user } = useAuthContext();

  const [currentColor, setCurrentColor] = useState("rgb(20 83 45)");
  const activeLink = "flex rounded-lg text-slate-200 mx-2";
  const normalLink =
    "flex text-slate-200 mx-2 hover:bg-green-900 hover:rounded-lg hover:text-slate-200 my-0.5";

  return (
    /*SIDEBAR TITLE*/
    <div className="h-screen overflow-auto pb-5">
      <Link
        to={`tickets`}
        className="text-slate-100 text-4xl font-extrabold tracking-wider flex justify-center mt-2"
      >
        TICKITA
      </Link>
      {/*SIDEBAR USER INFO*/}
      <div className="flex flex-col items-center mt-5">
        <Avatar className="mx-auto size-20">
          <AvatarImage src={defaultPic} alt="user avatar" />
        </Avatar>
        <h4 className="font-semibold text-xl capitalize text-yellow-500 mt-3">
          {user.firstname} {user.lastname}
        </h4>
      </div>

      {/*SIDEBAR LINKS*/}
      <div className="mt-10">
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
          to={`faq`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
          })}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="flex ml-5">
            <FaQuestionCircle className="size-5 place-self-center" />
            <p className="ml-5 py-3">FAQ</p>
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
