import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogContent,
  Dialog,
} from "@/components/ui/dialog";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import JobTicketForm from "./JobTicketForm";
import TechnicalTicketForm from "./TechnicalJobTicketForm";

const CreateTicket = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-950 hover:bg-green-900">
          Request Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle className="py-4">Request a Ticket</DialogTitle>
        </DialogHeader>
        <Tabs className="w-full" defaultValue="Job Ticket">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Job Ticket">Job Request Form</TabsTrigger>
            <TabsTrigger value="Technical Job Ticket">
              Technical Job Request Form
            </TabsTrigger>
          </TabsList>

          {/* Job Request Form */}
          <TabsContent value="Job Ticket">
            <JobTicketForm />
          </TabsContent>

          {/* Technical Job Request Form */}
          <TabsContent value="Technical Job Ticket">
            <TechnicalTicketForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
      <Toaster className="text-white" />
    </Dialog>
  );
};

export default CreateTicket;
