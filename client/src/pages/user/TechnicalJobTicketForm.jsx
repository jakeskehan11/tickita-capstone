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

const TechnicalTicketForm = ({ ticketType }) => {
  const { dispatch } = useTicketsContext();
  const { user } = useAuthContext();

  // Job Ticket Form
  const [department, setDepartment] = useState("");
  const [typeOfService, setTypeOfService] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const TechnicalJobTickethandleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Error");
      return;
    }

    setIsLoading(true);

    const technicalJobTicket = {
      department,
      typeOfService,
      description,
      ticketType,
    };

    const response = await fetch(
      "https://tickita-api.vercel.app/api/technical-job-ticket/",
      {
        method: "POST",
        body: JSON.stringify(technicalJobTicket),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
      setIsLoading(false);
    }

    if (response.ok) {
      setDepartment("");
      setTypeOfService("");
      setDescription("");
      setError(null);
      setEmptyFields([]);
      setIsLoading(false);
      dispatch({ type: "CREATE_TICKET", payload: json });

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

        toast("Request Technical Job Ticket has been created", {
          description: formattedTime,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form className="space-y-4 py-4" onSubmit={TechnicalJobTickethandleSubmit}>
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
        <Label htmlFor="typeOfService">Type of Service</Label>
        <Select
          id="typeOfService"
          onValueChange={(value) => setTypeOfService(value)}
          value={typeOfService}
          className={emptyFields.includes("typeOfService") ? "error" : ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Type of Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Software Installation and Assistance">
              Software Installation and Assistance
            </SelectItem>
            <SelectItem value="Hardware Troubleshooting and Repair">
              Hardware Troubleshooting and Repair
            </SelectItem>
            <SelectItem value="Internet Connection Troubleshooting">
              Internet Connection Troubleshooting
            </SelectItem>
            <SelectItem value="Network Setup and Configuration">
              Network Setup and Configuration
            </SelectItem>
            <SelectItem value="Event Technical Assistance">
              Event Technical Assistance
            </SelectItem>
            <SelectItem value="File Backup and Restoration">
              File Backup and Restoration
            </SelectItem>
            <SelectItem value="Hardware Cleaning and Maintenance">
              Hardware Cleaning and Maintenance
            </SelectItem>
            <SelectItem value="Other Technical Assistance">
              Other Technical Assistance
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          className="min-h-[100px] max-h-[250px]"
          id="description"
          placeholder="Description of the work request and other details"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button className="w-full bg-green-950 hover:bg-green-900" type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default TechnicalTicketForm;
