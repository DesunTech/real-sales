import { useApi } from "./useApi";
import { apis } from "../utils/apis";
import { useDispatch } from "react-redux";
import { AddAuth } from "../redux/AuthReducer";

/**
 * Custom hook to handle user logout.
 * 
 * This hook calls the logout API and removes user-related data from local storage.
 * 
 * @returns {Promise<Object|null>} The response data from the logout API or null if no data is returned.
 */
export const useLogout = () => {
  const { Get } = useApi();
  const { logout } = apis;
  let data = {};

  const doLogOut = async () => {
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
      localStorage.removeItem("persona_data")
      return data;
    } else {
      return null;
    }
  }

  return doLogOut();
};
