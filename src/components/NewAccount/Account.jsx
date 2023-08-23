import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Loading";

const Account = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const [_cookies, setCookie] = useCookies(["token"]);
  const [userData, setUserData] = useState({});
  const changeInputValue = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post(
        `${baseUrl}/api/v1/auth/signup`,
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
      err.response.data.errors.map((error) => {
        toast.error(error.msg);
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="login">
          <h3 className=" text-center mb-4 fw-bold">Create New Account</h3>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <form className="row g-3" onSubmit={signup}>
                  <div className="col-md-6">
                    <label className="form-label">أسمك</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="أسمك"
                      onChange={(e) => changeInputValue("name", e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">الايميل</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) =>
                        changeInputValue("email", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">كلمة السر</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Your password"
                      onChange={(e) =>
                        changeInputValue("password", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">تاكيد كلمة السر </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Comform Password"
                      onChange={(e) =>
                        changeInputValue("passwordConfirm", e.target.value)
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
                  {/* <a
                  href="/api/v1/auth/facebook"
                  className="btn btn-primary col-5 me-4 "
                >
                  <i className="fa-brands fa-facebook fs-4 ms-2"></i>سجل
                  باستخدام Facebook
                </a> */}
                  <Link to="/login">
                    لديك حساب بالفعل{" "}
                    <span className="text-danger fs-5">اضغط هنا</span>
                  </Link>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      سجل الان
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Account;
