import { NavLink, Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { FaTicket } from "react-icons/fa6";
import { useAuthContext } from "@/hooks/useAuthContext";
import schoolStatue from "/cvsu-statue.png";
import defaultPic from "/defaultpic.jpg";

const SuperAdminSidebar = () => {
  const { user } = useAuthContext();

  const [currentColor, setCurrentColor] = useState("rgb(20 83 45)");
  const activeLink = "flex text-yellow-500";
  const normalLink = "flex text-slate-100 hover:bg-green-900";

  return (
    // SIDEBAR TITLE
    <div className="h-screen overflow-auto pb-5">
      <Link
        to={`create-account`}
        className="text-yellow-500 text-4xl font-extrabold tracking-wider flex justify-center mt-2"
      >
        TICKITA
      </Link>
      {/*SIDEBAR SUPER ADMIN INFO*/}
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
          to={`create-account`}
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentColor : "",
          })}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="flex ml-5">
            <FaTicket className="size-5 place-self-center" />
            <p className="ml-5 py-3">Create Account</p>
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
export default SuperAdminSidebar;
