import axios from "axios";

const BACKEND_URL = "https://expanses-backend-default-rtdb.firebaseio.com";

export async function storeExpense(expensesData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expensesData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expanses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expanses.push(expenseObj);
  }
  return expanses;
}

export function updatedExpenses(id, expensesData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expensesData);
}

export async function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
