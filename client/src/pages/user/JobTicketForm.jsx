import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useTicketsContext } from "@/hooks/useTicketsContext";
import { useAuthContext } from "@/hooks/useAuthContext";

const JobTicketForm = ({ ticketType, setIsOpen }) => {
  const { dispatch } = useTicketsContext();
  const { user } = useAuthContext();

  // Job Ticket Form
  const [department, setDepartment] = useState("");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [ticketId, setTicketId] = useState(null);

  const JobTickethandleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Error");
      return;
    }

    setIsLoading(true);

    const jobTicket = {
      department,
      building,
      room,
      description,
      ticketType,
    };

    const response = await fetch("/api/job-ticket/", {
      method: "POST",
      body: JSON.stringify(jobTicket),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
      setIsLoading(false);
    }

    if (response.ok) {
      setDepartment("");
      setBuilding("");
      setRoom("");
      setDescription("");
      setError(null);
      setEmptyFields([]);
      setIsLoading(false);
      dispatch({ type: "CREATE_TICKET", payload: json });
      setIsAlertOpen(true);
      setTicketId(json._id);
    }
  };

  return (
    <form className="space-y-4 py-4" onSubmit={JobTickethandleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="department">Department</Label>
        <Select
          id="department"
          onValueChange={(value) => setDepartment(value)}
          value={department}
          className={emptyFields.includes("department") ? "error" : ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ASD">Arts and Sciences Department</SelectItem>
            <SelectItem value="FASD">
              Fisheries and Aquatic Sciences Department
            </SelectItem>
            <SelectItem value="ITD">
              Information Technology Department
            </SelectItem>
            <SelectItem value="MD">Management Department </SelectItem>
            <SelectItem value="TED">Teacher Education Department</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="building">Building</Label>
        <Select
          id="building"
          onValueChange={(value) => setBuilding(value)}
          value={building}
          className={emptyFields.includes("building") ? "error" : ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Building" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Star">Star</SelectItem>
            <SelectItem value="Aqua Best">Aqua Best</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="OSAS">OSAS</SelectItem>
            <SelectItem value="Library">Library</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="room">Room #</Label>
        <Input
          id="room"
          placeholder="Enter room number"
          type="number"
          onChange={(e) => setRoom(e.target.value)}
          value={room}
          className={emptyFields.includes("room") ? "error" : ""}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          className={`min-h-[100px] max-h-[250px] ${
            emptyFields.includes("description") ? "error" : ""
          }`}
          id="description"
          placeholder="Description of the Work Request"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button
        className="w-full bg-green-950 hover:bg-green-900"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold mb-4">
              Your Ticket request has been submitted!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black text-md font-semibold">{`JOB TICKET ID: ${ticketId}`}</AlertDialogDescription>
            <AlertDialogDescription>
              {new Date().toLocaleString("en-US", {
                timeZone: "Asia/Manila",
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setIsAlertOpen(false);
                setIsOpen(false);
              }}
              className="bg-green-950 hover:bg-green-900 w-full"
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};

export default JobTicketForm;
