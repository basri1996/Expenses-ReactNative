import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload }, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableExpanceIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpance = state[updatableExpanceIndex];
      const updateditem = { ...updatableExpance, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpanceIndex] = updateditem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpenseContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function AddExpense(expensesData) {
    dispatch({ type: "ADD", payload: expensesData });
  }
  function SetExpenses(expanses) {
    dispatch({ type: "SET", payload: expanses });
  }
  function DeleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function UpdateExpense(id, expensesData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expensesData } });
  }

  return (
    <ExpensesContext.Provider
      value={{
        AddExpense,
        DeleteExpense,
        UpdateExpense,
        SetExpenses,
        expensesState,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpenseContextProvider;
