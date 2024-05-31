import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogContent, Dialog } from "@/components/ui/dialog";
import LoginPage from "../components/Login";
import schoolImg2 from "/school2.jpg";

const Homepage = () => {
  return (
    <>
      <img
        className="absolute h-screen w-full object-cover brightness-[0.35]"
        src={schoolImg2}
        alt="school image"
      />
      <div className="60 h-screen flex flex-col items-center justify-center gap-1">
        <h1 className="text-6xl font-extrabold text-yellow-500 tracking-wider z-10 mb-2 ">
          TICKITA
        </h1>
        <h3 className="text-2xl font-semibold text-slate-200 tracking-wide z-10">
          CVSU Naic Support Ticketing Management System
        </h3>
        <h2 className="text-2xl font-semibold text-slate-200 tracking-wide z-10">
          with Task Tracking and Satisfaction Feedback
        </h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-950 hover:bg-green-900 w-96 z-10 text-slate-100">
              Need a hero?&nbsp;
              <span className="font-bold text-yellow-500">Sign in</span>
              &nbsp;to create your support ticket!
            </Button>
          </DialogTrigger>
          <DialogContent>
            <LoginPage />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Homepage;
