import { jwtDecode } from "jwt-decode";

export const getLoggedInUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};
