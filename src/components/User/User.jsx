import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./User.css";
import { baseUrl } from "../../../utils/baseUrl";
const User = () => {
  const [userData, setUserData] = useState({});
  const [passwordsData, setPasswordsData] = useState({});
  const [changePasswordDone, setChangePasswordDone] = useState(false);
  const [cookies, _, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const getMe = async () => {
    const userDataRes = await axios.get(`${baseUrl}/api/v1/users/getMe`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setUserData(userDataRes.data.data);
  };
  useEffect(() => {
    getMe();
  }, []);
  const changePassword = async () => {
    const changePasswordRes = await axios.put(
      `${baseUrl}/api/v1/users/changePassword/${userData._id}`,
      passwordsData,
      { headers: { Authorization: `Bearer ${cookies.token}` } }
    );
    removeCookie("token");
    setChangePasswordDone(true);
    navigate("/login");
  };
  const LogOut = () => {
    removeCookie("token");
    window.location.href = "/#/login";
  };
  const changePasswordValue = (name, value) => {
    setPasswordsData({ ...passwordsData, [name]: value });
  };
  return (
    <>
      <div className="user bg-light">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center   gap-3">
            <h4 className="text-center mt-4">الصفحة الشخصية</h4>
            <div className="col-lg-3 side bg-white rounded-3">
              <div className="right">
                <div className="one">
                  <Link to="/user" className="fs-5 fw-bold">
                    الملف الشخصي
                  </Link>
                </div>
                <div className="one">
                  <Link to="/user/addresses" className="fs-5 fw-bold ">
                    العناوين
                  </Link>
                </div>
                <div className="one">
                  <Link to="/user/edit-data" className="fs-5 fw-bold">
                    تعديل بيانات المستخدام
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8 bg-white rounded-3 ">
              <div className="right">
                <div className="one d-flex align-items-center justify-content-between">
                  <h5>الاسم: {userData.name}</h5>
                  <div className="edit">
                    <Link
                      to="/user/edit-data"
                      className="fs-5 btn btn-primary text-white mb-2"
                    >
                      تعديل
                    </Link>
                  </div>
                </div>
                <div className="one d-flex align-items-center justify-content-between">
                  <h5>الايميل: {userData.email}</h5>
                </div>
                <div className="one d-flex align-items-center justify-content-between">
                  <h5>رقم الهاتف: {userData?.phone || "لا يوجد رقم هاتف"}</h5>
                  <div className="edit">
                    <Link
                      to="/user/edit-data"
                      className="fs-5 btn btn-primary text-white mb-2"
                    >
                      تعديل
                    </Link>
                  </div>
                </div>

                <button className="btn btn-danger mb-2" onClick={LogOut}>
                  <h6 className="">تسجيل خروج</h6>
                </button>
                <Link
                  to="/order"
                  className="btn btn-danger mb-2"
                  style={{ marginRight: "10px" }}
                >
                  <h6 className="">الطلبات</h6>
                </Link>
              </div>
            </div>

            <div className="col-lg-8  rounded-3">
              <div className="right">
                <h3 className="text-center">تغيير كلمة السر</h3>
                <div className="col-lg-12">
                  <label className="form-label">كلمة السر</label>
                  <input
                    type="password"
                    placeholder="***********"
                    className="form-control"
                    onChange={(e) =>
                      changePasswordValue("currentPassword", e.target.value)
                    }
                  />
                </div>
                <div className="col-lg-12">
                  <label className="form-label"> </label>
                  <input
                    type="password"
                    placeholder="كلمة السر الجديدة"
                    className="form-control"
                    onChange={(e) =>
                      changePasswordValue("password", e.target.value)
                    }
                  />
                </div>
                <div className="col-lg-12">
                  <label className="form-label"> </label>
                  <input
                    type="password"
                    placeholder="تاكيد كلمة السر الجديدة"
                    className="form-control"
                    onChange={(e) =>
                      changePasswordValue("passwordConfirm", e.target.value)
                    }
                  />
                </div>
                <button
                  className="btn btn-dark mt-3"
                  onClick={() => changePassword()}
                >
                  حفظ كلمة السر
                </button>
              </div>
              {changePasswordDone && <div>لقد تم تغير كلمه المرور بنجاح</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
