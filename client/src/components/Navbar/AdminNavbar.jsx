import { useNavigate } from "react-router-dom";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import defaultPic from "../../assets/defaultpic.jpg";
import { Link, NavLink } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLogout } from "@/hooks/useLogout";
import { useAuthContext } from "@/hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-between py-2 content-center text-slate-100 mx-5">
      <Link
        to={`dashboard`}
        className="text-slate-100 text-4xl font-extrabold tracking-wider ml-7"
      >
        TICKITA
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="size-10 !border-none mr-4">
                  <AvatarImage src={defaultPic} alt="admin avatar" />
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-950">
                <p>Account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-10 py-5 px-5 flex flex-col bg-green-950 text-slate-200">
          <DropdownMenuLabel className="flex items-center text-base mb-auto">
            <Avatar className="size-10 mr-2">
              <AvatarImage src={defaultPic} alt="admin avatar" />
            </Avatar>
            <p className="capitalize">
              {user.firstname} {user.lastname}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <NavLink to={`settings`}>
            <DropdownMenuItem className="cursor-pointer text-lg hover:!bg-green-900 hover:!text-slate-200 pr-16">
              <div className="flex items-center">
                <IoSettings className="mr-2" />
                Settings
              </div>
            </DropdownMenuItem>
          </NavLink>
          <DropdownMenuItem className="cursor-pointer text-lg hover:!bg-green-900 hover:!text-slate-200">
            <div className="flex items-center">
              <FaMoon className="mr-2" />
              Display
            </div>
          </DropdownMenuItem>
          <Link to={`/`} onClick={handleLogout}>
            <DropdownMenuItem className="cursor-pointer text-lg hover:!bg-green-900 hover:!text-slate-200">
              <div className="flex items-center">
                <RiLogoutBoxRFill className="mr-2" />
                Logout
              </div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
