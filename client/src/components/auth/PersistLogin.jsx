import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLazyRefreshQuery } from "../../features/authSlice/authApiSlice";
import usePersist from "../../customHooks/usePersist";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken } from "../../features/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/authSlice/authSlice";
import Spinner from "../../assets/Spinner";

const PersistLogin = () => {
  const [persist] = usePersist();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refresh, trigger] = useLazyRefreshQuery();

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        // console.log("you have token!!", token);
        setIsAuthenticated(true);
        return;
      }
      try {
        const accessToken = await refresh().unwrap();
        dispatch(setCredentials({ accessToken }));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Refresh token failed:", error);
        navigate("/login", { replace: true }); // Redirect to login
      }
    };

    // if (effectRan.current === true) {
    //   const verifyRefreshToken = async () => {
    //     console.log("verifying refresh token");
    //     try {
    //       await refresh();
    //       setTrueSuccess(true);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };

    //   if (!token && persist) verifyRefreshToken();
    // }
    verifyAuth();
    // return () => (effectRan.current = true);
  }, []);

  let content;
  if (isAuthenticated) {
    content = <Outlet />;
    return content;
  } else {
    return <Spinner />;
  }
};

export default PersistLogin;
