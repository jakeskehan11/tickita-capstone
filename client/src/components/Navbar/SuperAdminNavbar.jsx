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
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLogout } from "@/hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="py-2 content-center text-slate-100 flex justify-end mr-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="size-10 !border-none">
                  <AvatarImage src={defaultPic} alt="admin avatar" />
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-950">
                <p>Account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-10 p-4 flex flex-col bg-green-950 text-slate-200">
          <DropdownMenuLabel className="flex items-center text-base mb-auto">
            <Avatar className="size-10 mr-2">
              <AvatarImage src={defaultPic} alt="admin avatar" />
            </Avatar>
            Tickita Admin
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-500" />
          <Link to={`settings`}>
            <DropdownMenuItem className="cursor-pointer text-lg hover:!bg-green-900 hover:!text-slate-200 pr-32">
              <div className="flex items-center">
                <IoSettings className="mr-2" />
                Settings
              </div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer text-lg hover:!bg-green-900 hover:!text-slate-200">
            <div className="flex items-center">
              <FaMoon className="mr-2" />
              Display
            </div>
          </DropdownMenuItem>
          <Link to={`/`} onClick={handleLogout}>
            <DropdownMenuItem className="cursor-pointer text-lg hover:!bg-green-900 hover:!text-slate-200">
              <div className="flex items-center">
                <RiLogoutBoxRFill className="mr-2 " />
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
