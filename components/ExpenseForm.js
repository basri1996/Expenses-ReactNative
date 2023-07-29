import { View, StyleSheet, Text, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../components/UI/Buton";
import { getFormattedDate } from "../util/date";
import { GlobalStyles } from "../constants/styles";

function ExpenseForm({
  CancelHandler,
  ConfirmHandler,
  isEditing,
  selectedExpence,
}) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: selectedExpence ? selectedExpence.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: selectedExpence ? getFormattedDate(selectedExpence.date) : "",
      isValid: true,
    },
    description: {
      value: selectedExpence ? selectedExpence.description : "",
      isValid: true,
    },
  });
  console.log(inputValues);
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((prev) => {
      return {
        ...prev,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function SubmitHandler() {
    const expensesData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };
    const amountIsValid =
      !isNaN(expensesData.amount) && expensesData.amount > 0;
    const dateIsValid = expensesData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expensesData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((prev) => {
        return {
          amount: { value: prev.amount.value, isValid: amountIsValid },
          date: { value: prev.date.value, isValid: dateIsValid },
          description: {
            value: prev.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    ConfirmHandler(expensesData);
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            KeyboardType: "decimal-pad",
            onChangeText: (enteredValue) => {
              inputChangedHandler("amount", enteredValue);
            },
            value: inputValues.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (enteredValue) => {
              inputChangedHandler("date", enteredValue);
            },
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (enteredValue) => {
            inputChangedHandler("description", enteredValue);
          },
          value: inputValues.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data !
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={CancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={SubmitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;
const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
