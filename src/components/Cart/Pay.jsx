import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
import { toast } from "react-toastify";

const CartPay = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [cookies] = useCookies(["token"]);
  const [brandData, setBrandData] = useState({});
  const [userAddress, seuUerAddress] = useState([]);

  const getMe = async () => {
    const userDataRes = await axios.get(`${baseUrl}/api/v1/orders/${id}`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    const userAddressRes = await axios.get(`${baseUrl}/api/v1/addresses`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    seuUerAddress(userAddressRes.data.data);
    setUserData(userDataRes.data.data);
  };
  const updateOrderImg = async (e) => {
    let fromdata = new FormData();
    fromdata.append("img", brandData.img);
    const userDataRes = await axios.put(
      `${baseUrl}/api/v1/orders/${id}/img`,
      fromdata,
      {
        headers: { Authorization: `Bearer ${cookies.token}` },
      }
    );

    toast.success("تمت ارسال الصوره بنجاح و سيتم التواصل معك", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  useEffect(() => {
    getMe();
  }, []);
  return (
    <>
      <div className="user bg-light">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center   gap-3">
            <h2 className="text-center mt-4">بيانات الطلب</h2>
            <h3>
              كود الطلب: {userData.code} (أحتفظ بهاذا الكود لان من سيتواصل معاك
              سيحتاجه)
            </h3>
            <h3> الدفع : {userData.isPaid ? "تم الدفع" : "لم يتم الدفع"}</h3>
            <h3>
              التوصيل : {userData.isDelivered ? "تم التوصيل" : "لم يتم التوصيل"}
            </h3>
            <h3>السعر بالريال اليمني: {userData.totalOrderPrice}</h3>
            <h3>السعر بالريال السعودي: {userData.totalOrderPriceSAR}</h3>
            <h3>السعر بالدولار: {userData.totalOrderPriceUSD}</h3>

            <h3>
              التحويل بااسم عبدالله عبدالرحمن عباس عبدالرحمن الحسني
              <br />
              <br />
              ورقم التلفون 778133390
              <br />
              <br />
              حساب جوالي رقم محفظه جوالي 778133390
              <br />
              <br />
              حسابات كريمي يمني_3047533828
              <br />
              <br />
              دولار_3047604426
              <br />
              <br />
              سعودي_3047581221
            </h3>
            <div className="dropdown">
              <select class="form-select" aria-label="Default select example">
                <option selected>شركات الشحن المتاحة</option>
                <option value="1">الجوال</option>
                <option value="2">المقطري</option>
                <option value="3">المهيوب</option>
                <option value="3">المختص</option>
              </select>
            </div>
            {userData.orderImg ? (
              <img
                src={userData.orderImg}
                style={{ maxWidth: "300px", margin: "20px auto " }}
                alt=""
              />
            ) : (
              <div>لم يتم ارسال صوره الطلب لك بعد</div>
            )}
            <div className="mb-3">
              <label className="form-label fw-bold">
                ارفع الصوره الخاصه بالحواله
              </label>
              <input
                type="file"
                className="form-control"
                placeholder="ارفع الصوره الخاصه بالحواله"
                onChange={(e) => setBrandData({ img: e.target.files[0] })}
              />
            </div>
            <button
              className="btn btn-primary mb-3 fw-bold"
              onClick={() => updateOrderImg()}
            >
              أضافه الصوره
            </button>
          </div>
          <div className="admin-content-text mb-3">العنوان</div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">العنوان مكتوب</th>
                <th scope="col">رقم الهاتف</th>
                <th scope="col">المدينه</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData?.shippingAddress?.details || "لا يوجد"}</td>
                <td>{userData?.shippingAddress?.phone || "لا يوجد"}</td>
                <td>{userData?.shippingAddress?.city || "لا يوجد"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CartPay;
