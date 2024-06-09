import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import ReactStars from "react-rating-stars-component";

const FeedbackForm = ({ isOpen, onClose, ticketId, ticketType }) => {
  const { user } = useAuthContext();

  const [purposeOfVisit, setPurposeOfVisit] = useState("");
  const [courtesy, setCourtesy] = useState(0);
  const [quality, setQuality] = useState(0);
  const [timeliness, setTimeliness] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [comments, setComments] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Error");
      return;
    }

    setIsLoading(true);

    const feedback = {
      purposeOfVisit,
      courtesy,
      quality,
      timeliness,
      efficiency,
      cleanliness,
      comfort,
      comments,
    };

    const endpoint =
      ticketType === "Technical Job Ticket"
        ? `/api/technical-job-ticket/feedback/${ticketId}`
        : `/api/job-ticket/feedback/${ticketId}`;

    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(feedback),
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
      setPurposeOfVisit("");
      setCourtesy(0);
      setQuality(0);
      setTimeliness(0);
      setEfficiency(0);
      setCleanliness(0);
      setComfort(0);
      setComments("");
      setError(null);
      setEmptyFields([]);
      setIsLoading(false);
      setShowSuccessAlert(true);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-xl max-h-[45rem] overflow-y-scroll scrollbar-custom">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold text-center text-2xl mb-2">
            STAKEHOLDER'S FEEDBACK FORM
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please let us know how we can improve our service by giving your
            honest feedback. We value our stakeholders, hencen your comments and
            suggestions will be highly appreciated.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form className="space-y-4" onSubmit={handleFeedbackSubmit}>
          <div className="space-y-2">
            <Label htmlFor="purposeOfVisit">Purpose of Visit</Label>
            <Input
              placeholder="Purpose of Visit"
              required
              type="text"
              onChange={(e) => setPurposeOfVisit(e.target.value)}
              value={purposeOfVisit}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label>Area of Concern</Label>
            <Label>5 Star = Highly Satisfied</Label>
            <Label>4 Star = Very Satisfied</Label>
            <Label>3 Star = Moderately Satisfied</Label>
            <Label>2 Star = Barely Satisfied</Label>
            <Label>1 Star = Not Satisfied</Label>
          </div>
          <div className="flex items-center">
            <Label htmlFor="courtesy" className="w-32">
              A. Courtesy
            </Label>
            <ReactStars
              count={5}
              onChange={(value) => setCourtesy(value)}
              size={24}
              activeColor="#eab308"
              value={courtesy}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label className="">B. Service</Label>
            <div className="flex items-center">
              <Label htmlFor="quality" className="w-32 indent-4">
                1. Quality
              </Label>
              <ReactStars
                count={5}
                onChange={(value) => setQuality(value)}
                size={24}
                activeColor="#eab308"
                value={quality}
              />
            </div>
            <div className="flex items-center">
              <Label htmlFor="timeliness" className="w-32 indent-4">
                2. Timeliness
              </Label>
              <ReactStars
                count={5}
                onChange={(value) => setTimeliness(value)}
                size={24}
                activeColor="#eab308"
                value={timeliness}
              />
            </div>
            <div className="flex items-center">
              <Label htmlFor="efficiency" className="w-32 indent-4">
                3. Efficiency
              </Label>
              <ReactStars
                count={5}
                onChange={(value) => setEfficiency(value)}
                size={24}
                activeColor="#eab308"
                value={efficiency}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Label>C. Physical condition of office/work space</Label>
            <div className="flex items-center">
              <Label htmlFor="cleanliness" className="w-32 indent-4">
                1. Cleanliness
              </Label>
              <ReactStars
                count={5}
                onChange={(value) => setCleanliness(value)}
                size={24}
                activeColor="#eab308"
                value={cleanliness}
              />
            </div>
            <div className="flex items-center">
              <Label htmlFor="comfort" className="w-32 indent-4">
                2. Comfort
              </Label>
              <ReactStars
                count={5}
                onChange={(value) => setComfort(value)}
                size={24}
                activeColor="#eab308"
                value={comfort}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="comments">Comments/Suggestions:</Label>
            <Textarea
              className={`min-h-[100px] max-h-[250px] overflow-auto scrollbar-custom ${
                emptyFields.includes("comments") ? "error" : ""
              }`}
              id="comments"
              placeholder="Comments/Suggestions"
              onChange={(e) => setComments(e.target.value)}
              value={comments}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <AlertDialogFooter>
            <AlertDialogCancel>No thanks</AlertDialogCancel>
            <Button
              className="w-40 bg-green-900 hover:bg-green-800"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>

      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thank you for your feedback!</AlertDialogTitle>
            <AlertDialogDescription>
              We appreciate you taking the time to share your thoughts with us.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowSuccessAlert(false);
                onClose(); // Close the feedback form after success
              }}
              className="bg-green-950 hover:bg-green-900 w-full"
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialog>
  );
};

export default FeedbackForm;
