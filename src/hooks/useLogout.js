import { useApi } from "./useApi";
import { apis } from "../utils/apis";

/**
 * Custom hook to handle user logout.
 * 
 * This hook calls the logout API and removes user-related data from local storage.
 * 
 * @returns {Promise<Object|null>} The response data from the logout API or null if no data is returned.
 */
export const useLogout = async () => {
  const { Get } = useApi();
  const { logout } = apis;
  let data = {};

  try {
    data = await Get(logout);
  } catch (error) {
    console.log(error, "_error_");
  }
  if (data && Object.keys(data).length > 0) {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("session_id")
    localStorage.removeItem("persona_id")
    return data;
  } else {
    return null;
  }
};
