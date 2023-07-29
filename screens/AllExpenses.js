import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

export default function AllExpenses() {
  const { expensesState } = useContext(ExpensesContext);
  console.log(expensesState);
  return (
    <ExpensesOutput
      expenses={expensesState}
      expensesPeriod="All Expenses"
      Infotext="No registered expenses found ! "
    />
  );
}
