import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import "./User.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
const User = () => {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState({});
  const [changePasswordDone, setChangePasswordDone] = useState(false);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const getMe = async () => {
    const userDataRes = await axios.get(`${baseUrl}/api/v1/users/getMe`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setUserId(userDataRes.data.data);
  };
  useEffect(() => {
    getMe();
  }, []);
  const changePassword = async () => {
    const changePasswordRes = await axios.put(
      `${baseUrl}/api/v1/users/${userId._id}`,
      userData,
      { headers: { Authorization: `Bearer ${cookies.token}` } }
    );
    setChangePasswordDone(true);
    navigate("/user");
  };
  const changeUserValue = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };
  return (
    <>
      <div className="user bg-light">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center   gap-3">
            <h3 className="text-center mt-4">تعديل بيانات المستخدام</h3>
            <div className="col-lg-3 side bg-white rounded-3">
              <div className="right">
                <div className="one">
                  <Link to="/user" className="fs-4">
                    الملف الشخصي
                  </Link>
                </div>
                <div className="one">
                  <Link to="/user/addresses" className="fs-4">
                    العناوين
                  </Link>
                </div>
                <div className="one">
                  <Link to="/user/edit-data" className="fs-4">
                    تعديل بيانات المستخدام
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8 rounded-3">
              <div className="right">
                <div className="col-lg-12">
                  <label className="form-label">اسمك</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => changeUserValue("name", e.target.value)}
                  />
                </div>

                <div className="col-lg-12">
                  <label className="form-label">رقم الهاتف</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => changeUserValue("phone", e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-dark my-3"
                  onClick={() => changePassword()}
                >
                  تعديل الحساب
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
