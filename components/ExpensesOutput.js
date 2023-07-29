import { StyleSheet, View, Text } from "react-native";
import ExpressesList from "./ExpensesList";
import ExpressesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../constants/styles";

export default function ExpensesOutput({ expenses, Infotext, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpressesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
      {expenses.length > 0 ? (
        <ExpressesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}>{Infotext}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
    paddingBottom: 0,
    gap: 20,
  },

  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
