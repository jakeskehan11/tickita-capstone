import { createContext, useReducer } from "react";

export const TicketsContext = createContext();

export const ticketsReducer = (state, action) => {
  switch (action.type) {
    case "SET_TICKETS":
      return {
        tickets: action.payload,
      };
    case "CREATE_TICKET":
      return {
        tickets: state.tickets
          ? [...state.tickets, action.payload]
          : [action.payload],
      };
    // new reducer to update tickets
    case "UPDATE_TICKET":
      return {
        tickets: state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? { ...ticket, ...action.payload }
            : ticket
        ),
      };
    case "DELETE_TICKET":
      return {
        tickets: state.tickets.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TicketsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketsReducer, {
    tickets: [],
  });

  return (
    <TicketsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TicketsContext.Provider>
  );
};
