import { useNavigate } from "react-router-dom";
import { RiLogoutBoxRFill } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user credentials or session data
    localStorage.removeItem("authToken");
    localStorage.setItem("isLoggedIn", "false");

    // Redirect the user to the login page
    navigate("/", { replace: true });
  };

  return (
    <div className="flex justify-end text-slate-100 mt-7 mr-5">
      <RiLogoutBoxRFill className="size-5" />
      <button onClick={handleLogout} className="mx-3 ">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
