import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
function GetToken() {
  const URL = useParams();
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    setCookie("token", URL.token, {
      path: "/",
      maxAge: 90 * 60 * 1000,
    });
    if (URL.token) {
      navigate("/user");
    }
  }, []);
  return <></>;
}

export default GetToken;
