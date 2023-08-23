import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../../images/login.jpeg";
import "./Login.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { baseUrl } from "../../../utils/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const [cookies, setCookie] = useCookies(["token"]);
  const [userData, setUserData] = useState({});
  const changeInputValue = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post(
        `${baseUrl}/api/v1/auth/login`,
        userData
      );
      setCookie("token", loginRes.data.token, {
        path: "/",
        maxAge: 90 * 60 * 1000,
      });
      if (loginRes.data.token) {
        navigate("/user");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response?.data?.message);
      }
      err?.response?.data?.errors?.map((error) => {
        toast.error(error.msg);
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <section className="login">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <form className="row g-3" onSubmit={login}>
                    <div className="col-md-12">
                      <label htmlFor="inputEmail4" className="form-label">
                        الايميل
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="inputEmail4"
                        onChange={(e) =>
                          changeInputValue(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="inputPassword4" className="form-label">
                        كلمة السر
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        name="password"
                        onChange={(e) =>
                          changeInputValue(e.target.name, e.target.value)
                        }
                      />
                    </div>

                    <a
                      href={`${baseUrl}/api/v1/auth/google`}
                      className="btn btn-primary col-5 "
                    >
                      <i className="fa-brands fa-google fs-4 ms-2"></i> سجل
                      باستخدام google
                    </a>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary">
                        تسجيل الدخول
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 image">
                  <img src={LoginImg} className=" img-fluid" alt="" />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Login;
