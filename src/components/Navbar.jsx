import { useNavigate } from "react-router-dom";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Link } from "react-router-dom";

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
    <div className="flex justify-between py-1 content-center text-slate-100 mx-5">
      <Link
        to={`dashboard`}
        className="text-white text-4xl font-extrabold tracking-wider ml-7"
      >
        TICKITA
      </Link>

      <div className="flex justify-center items-center">
        <RiLogoutBoxRFill className=" h-6 w-6 mr-2" />
        <button onClick={handleLogout} className="">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
