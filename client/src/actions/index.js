export const actions = {
  login: 'LOGIN_USER',
  loginFail: 'LOGIN_FAIL',
  loginSuccess: 'LOGIN_SUCCESS',
  signup: 'SIGNUP_USER',
  signupFail: 'SIGNUP_SUCCESS',
  signupSuccess: 'SIGNUP_SUCCESS',
  logout: 'LOGOUT_USER',
  refresh: 'REFRESH_TOKEN',
  refreshFail: 'REFRESH_TOKEN_FAIL',
  decreaseTTL: 'TOKEN_TIME_DECREASE',
  openPopup: 'OPEN_POPUP',
  closePopup: 'CLOSE_POPUP',

  setMessage: 'SET_MESSAGE',
  clearMessage: 'CLEAR MESSAGE',

  getBudgetsBetweenTwoDate: 'GET_BUDGETS_BETWEEN_TWO_DATES',
  getBudgetsBetweenTwoDateFailed: 'GET_BUDGETS_BETWEEN_TWO_DATES_FAILED',


  getAllBudgets: 'GET_ALL_BUDGETS',
  getAllBudgetsFailed: 'GET_ALL_BUDGETS_FAILED',
  createBudget: 'CREATE_BUDGET',
  createBudgetFailed: 'CREATE_BUDGET_FAILED',
  updateBudget: 'UPDATE_BUDGET',
  updateBudgetFailed: 'UPDATE_BUDGET_FAILED',
  deleteBudget: 'DELETE_BUDGET',
  deleteBudgetFailed: 'DELETE_BUDGET_FAILED',

  getBudgetTypes: 'GET_BUDGET_TYPES',
  getBudgetTypesFailed: 'GET_BUDGET_TYPES_FAILED',
  createBudgetType: 'CREATE_BUDGET_TYPE',
  createBudgetTypeFailed: 'CREATE_BUDGET_TYPE_FAILED',
  updateBudgetType: 'UPDATE_BUDGET_TYPE',
  updateBudgetTypeFailed: 'UPDATE_BUDGET_TYPE_FAILED',
  deleteBudgetType: 'DELETE_BUDGET_TYPE',
  deleteBudgetTypeFailed: 'DELETE_BUDGET_TYPE_FAILED',
}