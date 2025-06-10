import { useApi } from "./useApi";
import { apis } from "../utils/apis";
import { useDispatch } from "react-redux";
import { AddAuth } from "../redux/AuthReducer";
import { useRouter } from "next/router";

/**
 * Custom hook to handle user logout.
 *
 * This hook calls the logout API and removes user-related data from local storage.
 *
 * @returns {Promise<Object|null>} The response data from the logout API or null if no data is returned.
 */
export const useLogout = ({final}) => {

  const { Get } = useApi();
  const { logout } = apis;
  let data = {};

  const doLogOut = async () => {
    try {
      data = await Get(logout);
      if (data && Object.keys(data).length > 0) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("session_id");
        localStorage.removeItem("persona_id");
        localStorage.removeItem("persona_data");
        localStorage.removeItem("mode_id");
        final
        return data;
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("session_id");
        localStorage.removeItem("persona_id");
        localStorage.removeItem("persona_data");
        localStorage.removeItem("mode_id");
        final
      }
    } catch (error) {
      console.log(error, "_error_");
    }
  };

  return doLogOut();
};
