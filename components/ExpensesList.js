import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpressesList({ expenses }) {
  function RenderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item} />;
  }
  return (
    <FlatList
      data={expenses}
      renderItem={RenderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpressesList;
