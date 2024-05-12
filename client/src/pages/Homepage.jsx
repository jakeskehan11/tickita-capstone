import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogContent, Dialog } from "@/components/ui/dialog";
import LoginPage from "../components/Login";
import schoolImg from "../../public/school.jpg";
import schoolImg2 from "../../public/school2.jpg";

const Homepage = () => {
  return (
    <>
      <img
        className="h-screen w-full object-cover brightness-[0.35]"
        src={schoolImg2}
        alt="school image"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <h1 className="text-5xl font-extrabold text-slate-100 tracking-wider">
          TICKITA
        </h1>
        <h2 className="text-3xl font-bold text-slate-200 tracking-wide">
          CVSU Naic Support Ticketing Management System
        </h2>
        <h2 className="text-3xl font-bold text-slate-200">
          with Task Tracking and Satisfaction Feedback
        </h2>
      </div>
      <div className="absolute inset-x-0 bottom-80 flex justify-center ">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-950 hover:bg-green-900 w-96">
              Need a hero? Sign in to create your support ticket!
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
