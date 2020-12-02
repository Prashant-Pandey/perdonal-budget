import { getCookie } from "../commons/cookie";

export default function authHeader() {
  const user = getCookie("token");
  if (user) {
    return `Bearer ${user}`;
  } else {
    return {};
  }
}