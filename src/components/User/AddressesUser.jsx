import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import "./User.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
import { toast } from "react-toastify";
const User = () => {
  const [userData, setUserData] = useState([]);
  const [addressData, setAddressData] = useState({});
  const [changeAddressDone, setChangeAddressDone] = useState(false);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const getMe = async () => {
    const userDataRes = await axios.get(`${baseUrl}/api/v1/addresses`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });

    setUserData(userDataRes.data.data);
  };
  useEffect(() => {
    getMe();
  }, []);
  const changePassword = async () => {
    await axios.post(`${baseUrl}/api/v1/addresses`, addressData, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    location.reload();
  };
  const changeAddressValue = (name, value) => {
    setAddressData({ ...addressData, [name]: value });
  };
  const deleteAddress = async (id) => {
    await axios.delete(`${baseUrl}/api/v1/addresses/${id}`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    toast.success("تم حذف العنوان بنجاح");
  };
  return (
    <>
      <div className="user bg-light">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center   gap-3">
            <h3 className="text-center mt-4">العنواين</h3>
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
            <div className="col-lg-8 bg-white rounded-3 ">
              <div className="right">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">الاسم المستعار</th>
                      <th scope="col">العنوان مكتوب</th>
                      <th scope="col">رقم الهاتف</th>
                      <th scope="col">المدينه</th>
                      <th scope="col">postal Code</th>
                      <th scope="col">حذف</th>
                      <th scope="col">تعديل</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((address) => (
                      <tr key={address._id}>
                        <th>{address?.alias || "لا يوجد"}</th>
                        <td>{address?.details || "لا يوجد"}</td>
                        <td>{address?.phone || "لا يوجد"}</td>
                        <td>{address?.city || "لا يوجد"}</td>
                        <td>{address?.postalCode || "لا يوجد"}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => deleteAddress(address._id)}
                          >
                            حذف
                          </button>
                        </td>
                        <td>
                          <Link
                            to={`/user/addresses/${address._id}`}
                            className="btn btn-success"
                          >
                            تعديل
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-8  rounded-3">
              <div className="right">
                <h3 className="text-center">أضافه عنوان</h3>
                <div className="col-lg-12">
                  <label className="form-label">الاسم المستعار</label>
                  <input
                    type="text"
                    placeholder="Home"
                    className="form-control"
                    onChange={(e) =>
                      changeAddressValue("alias", e.target.value)
                    }
                  />
                </div>
                <div className="col-lg-12">
                  <label className="form-label">العنوان مكتوب</label>
                  <input
                    type="text"
                    placeholder="Egypt Cairo 12 street"
                    className="form-control"
                    onChange={(e) =>
                      changeAddressValue("details", e.target.value)
                    }
                  />
                </div>
                <div className="col-lg-12">
                  <label className="form-label">
                    رقم هاتف المنزل او رقم هاتفك
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      changeAddressValue("phone", e.target.value)
                    }
                  />
                </div>
                <div className="col-lg-12">
                  <label className="form-label">المدينة</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cairo"
                    onChange={(e) => changeAddressValue("city", e.target.value)}
                  />
                </div>
                <div className="col-lg-12">
                  <label className="form-label">postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="15612"
                    onChange={(e) =>
                      changeAddressValue("postalCode", e.target.value)
                    }
                  />
                </div>
                <button
                  className="btn btn-dark mt-3"
                  onClick={() => changePassword()}
                >
                  أضافه العنوان
                </button>
              </div>
              {changeAddressDone && <div>لقد تم اضافه عنوان بنجاح</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
