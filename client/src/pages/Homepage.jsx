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
      <div className="h-screen flex flex-col items-center justify-center gap-6">
        <h1 className="text-7xl font-black text-yellow-500 tracking-wider z-10">
          TICKITA
        </h1>
        <h3 className="text-2xl font-medium text-slate-100 tracking-wide text-center w-[32.5rem] z-10">
          CvSU Naic Support Ticketing Management System with Task Tracking and
          Satisfaction Feedback Integration
        </h3>
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
