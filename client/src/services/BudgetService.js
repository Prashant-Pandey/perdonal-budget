import Axios from 'axios';
import { getCookie } from "../commons/cookie";
import connectAPI from './commonService';
const service = 'budget';
export class BudgetService {
  async getAllBudgets() {
    const withCredentials = false, method = 'get', params = {}, body = {}, headers = {
      'Authorization': `Bearer ${getCookie('token')}`
    }
    return connectAPI({ method, service, headers, params, body, withCredentials });
  }
  async getAllBudgetBetweenDates(startDate, endDate) {
    const withCredentials = false, method = 'get', params = {
      startDate,
      endDate
    }, body = {}, headers = {
      'Authorization': `Bearer ${getCookie('token')}`
    }
    return connectAPI({ method, service, headers, params, body, withCredentials });
  }

  async createBudgets(budgetJSON) {
    const withCredentials = false, method = 'post', params = {}, body = budgetJSON, headers = {
      'Authorization': `Bearer ${getCookie('token')}`
    }
    return connectAPI({ method, service, headers, params, body, withCredentials });
  }

  async updateBudget(budgetId, budgetJSON) {
    const withCredentials = false, method = 'put', params = {}, body = budgetJSON, headers = {
      'Authorization': `Bearer ${getCookie('token')}`
    }
    return connectAPI({ method, service: service+`/${budgetId}`, headers, params, body, withCredentials });
  }

  async deleteBudgets(budgetId) {
    const withCredentials = false, method = 'delete', params = {}, body = {}, headers = {
      'Authorization': `Bearer ${getCookie('token')}`
    }
    return connectAPI({ method, service: service+`/${budgetId}`, headers, params, body, withCredentials });
  }
}