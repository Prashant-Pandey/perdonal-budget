import Axios from 'axios';
import { getCookie } from "../commons/cookie";
const BUDGET_URL = "http://localhost:3000"+"/budget";
export class BudgetService {
  async getAllBudgetBetweenDates(startDate, endDate) {
    console.log(getCookie('token'));
    const res = await Axios.get(BUDGET_URL + `?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`,
        "Content-Type": "application/json",
      }
    });
    return res.data;
  }

  async createBudgets(budgetJSON) {
    const res = await Axios.post(BUDGET_URL, budgetJSON, {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return res.data;
  }



}