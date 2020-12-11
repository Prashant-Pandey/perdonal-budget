// import {connect} from "react-redux";
// export const getBudgetSumDataAction = (budgets) => (dispatch)=> {
//   const budgetSum = {}
//   props.budgets.forEach(budget => {
//     if(budgetSum[budget["type"]]){
//       budgetSum[budget["type"]] += budget["cost"]
//     }else{
//       budgetSum[budget["type"]] = budget["cost"]
//     }
//   });
//   const chartData = []
//   props.types.forEach((type) => {
//     chartData.push({
//       cost: type["cost"],
//       sum: budgetSum[type["name"]]
//     })
//   });

//   return budgetSum
// };