import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

import "./User.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
import { toast } from "react-toastify";
const EditAddress = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const [addressData, setAddressData] = useState({});
  const [changeAddressDone, setChangeAddressDone] = useState(false);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const getMe = async () => {
    const userDataRes = await axios.get(`${baseUrl}/api/v1/addresses`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });

    userDataRes.data.data.map((address) => {
      if (address._id === id) {
        setUserData(address);
      }
    });
  };
  useEffect(() => {
    getMe();
  }, []);
  const changePassword = async () => {
    await axios.put(
      `${baseUrl}/api/v1/addresses/${id}`,
      { ...userData, ...addressData },
      {
        headers: { Authorization: `Bearer ${cookies.token}` },
      }
    );
    navigate("/user/addresses");
  };
  const changeAddressValue = (name, value) => {
    setAddressData({ ...addressData, [name]: value });
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
            <div className="col-lg-8  rounded-3">
              <div className="right">
                <h3 className="text-center">تعديل عنوان</h3>
                <div className="col-lg-12">
                  <label className="form-label">الاسم المستعار</label>
                  <input
                    type="text"
                    placeholder="Home"
                    className="form-control"
                    defaultValue={userData.alias}
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
                    defaultValue={userData.details}
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
                    defaultValue={userData.phone}
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
                    defaultValue={userData.city}
                    placeholder="Cairo"
                    onChange={(e) => changeAddressValue("city", e.target.value)}
                  />
                </div>
                <div className="col-lg-12">
                  <label className="form-label">postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={userData.postalCode}
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
                  تعديل العنوان
                </button>
              </div>
              {changeAddressDone && <div>لقد تم تعديل عنوان بنجاح</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAddress;
