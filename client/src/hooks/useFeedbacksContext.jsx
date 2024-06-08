import { FeedbacksContext } from "../context/FeedbacksContext";
import { useContext } from "react";

export const useFeedbacksContext = () => {
  const context = useContext(FeedbacksContext);

  if (!context) {
    throw Error(
      "useFeedbacksContext must be used inside a FeedbacksContextProvider"
    );
  }
  

  return context;
};
