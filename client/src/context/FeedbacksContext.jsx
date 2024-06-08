import { createContext, useReducer } from "react";

export const FeedbacksContext = createContext();

export const feedbacksReducer = (state, action) => {
  switch (action.type) {
    case "SET_FEEDBACKS":
      return {
        feedbacks: action.payload,
      };
    case "DELETE_FEEDBACKS":
      return {
         feedbacks: state.feedbacks.filter(
          (feedback) => feedback._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const FeedbacksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(feedbacksReducer, {
   feedbacks: [],
  });

  return (
    <FeedbacksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FeedbacksContext.Provider>
  );
};
