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
import { toast } from "sonner";
import { useState } from "react";
import { useTicketsContext } from "@/hooks/useTicketsContext";
import { useAuthContext } from "@/hooks/useAuthContext";

const JobTicketForm = ({ ticketType }) => {
  const { dispatch } = useTicketsContext();
  const { user } = useAuthContext();

  // Job Ticket Form
  const [requesterName, setRequesterName] = useState("");
  const [department, setDepartment] = useState("");
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const JobTickethandleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Error");
      return;
    }

    const formData = new FormData(e.target);
    formData.append("ticketType", ticketType);

    const jobTicket = {
      requesterName,
      department,
      building,
      room,
      description,
    };

    const response = await fetch("/api/job/ticket", {
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
    }

    if (response.ok) {
      setRequesterName("");
      setDepartment("");
      setBuilding("");
      setRoom("");
      setDescription("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_TICKETS", payload: json });

      try {
        const currentDate = new Date();
        const formattedTime = currentDate.toLocaleString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        toast("Request Job Ticket has been created", {
          description: formattedTime,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form className="space-y-4 py-4" onSubmit={JobTickethandleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="name">Requester's Name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          onChange={(e) => setRequesterName(e.target.value)}
          value={requesterName}
          className={emptyFields.includes("requesterName") ? "error" : ""}
        />
      </div>
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
        <Label htmlFor="building">Buiding</Label>
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
      <Button className="w-full bg-green-950 hover:bg-green-900" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default JobTicketForm;
