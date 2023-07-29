import { useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ExpenseForm";
import { storeExpense, updatedExpenses, deleteExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

export default function ManageExpenses({ route, navigation }) {
  const { AddExpense, DeleteExpense, UpdateExpense, expensesState } =
    useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editedExpensesId = route.params?.expenseId;
  const isEditing = !!editedExpensesId;
  const selectedExpence = expensesState.find(
    (expense) => expense.id === editedExpensesId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [isEditing, navigation]);
  async function DeleteExpenseHandler() {
    setIsSubmitting(true);
    await deleteExpense(editedExpensesId);
    DeleteExpense(editedExpensesId);
    navigation.goBack();
  }
  function CancelHandler() {
    navigation.goBack();
  }
  async function ConfirmHandler(expensesData) {
    setIsSubmitting(true);
    if (isEditing) {
      UpdateExpense(editedExpensesId, expensesData);
      await updatedExpenses(editedExpensesId, expensesData);
    } else {
      const id = await storeExpense(expensesData);
      AddExpense({ ...expensesData, id: id });
    }
    navigation.goBack();
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        ConfirmHandler={ConfirmHandler}
        CancelHandler={CancelHandler}
        isEditing={isEditing}
        selectedExpence={selectedExpence}
      />

      {isEditing && (
        <View style={styles.deletContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={24}
            onPress={DeleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },

  deletContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
