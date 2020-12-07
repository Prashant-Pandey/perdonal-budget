import { getCookie } from "../commons/cookie";
import connectAPI from './commonService';
const service = 'budget-type';
export class BudgetTypeService {
  
  async getAllBudgetTypes() {
    const withCredentials = false, method = 'get', params = {}, body = {}, headers = {
      'Authorization': `Bearer ${getCookie('token')}`
    }
    return connectAPI({ method, service, headers, params, body, withCredentials });
  }

  async createBudgetType(budgetTypeJSON) {
    const withCredentials = false, method = 'post', params = {}, body = budgetTypeJSON, headers = {
      'Authorization': `Bearer ${getCookie('token')}`
    }
    return connectAPI({ method, service, headers, params, body, withCredentials });
  }

  async updateBudgetType(id, budgetTypeJSON) {
    const withCredentials = false, method = 'put', params = {}, body = budgetTypeJSON, headers = {
      'Authorization': `Bearer ${getCookie('token')}`
    }
    return connectAPI({ method, service: service+`/${id}`, headers, params, body, withCredentials });
  }

  async deleteBudgetType(budgetTypeId) {
    const withCredentials = false, method = 'delete', params = {}, body = {}, headers = {
      'Authorization': `Bearer ${getCookie('token')}`
    }
    return connectAPI({ method, service: service+`/${budgetTypeId}`, headers, params, body, withCredentials });
  }



}