import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { baseUrl } from "../../../utils/baseUrl";
import { toast } from "react-toastify";

const AdminOrderDetalis = ({ id }) => {
  const [cookies] = useCookies(["token"]);
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const getOrder = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/orders/${id}`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setOrders(res.data.data);
    setLoaded(true);
  };
  const makeOrderPaid = async () => {
    await axios.put(
      `${baseUrl}/api/v1/orders/${id}/pay`,
      {},
      {
        headers: { Authorization: `Bearer ${cookies.token}` },
      }
    );

    toast.success("تم التعديل بنجاح", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const makeOrderDelivered = async () => {
    await axios.put(
      `${baseUrl}/api/v1/orders/${id}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${cookies.token}` },
      }
    );

    toast.success("تم التعديل بنجاح", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const [brandData, setBrandData] = useState({});
  const sendEmail = async () => {
    const formdata = new FormData();
    let fromdata = new FormData();
    fromdata.append("orderImg", brandData.orderImg);

    try {
      await axios.put(`${baseUrl}/api/v1/orders/${id}/orderImg`, fromdata, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });

      toast.success("تمت ارسال الصوره بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      console.log(err);
      toast.error("لم يتم ارسال الصوره بنجاح");
      // err.response.data.errors.map((error) => {
      //   toast.error(error.msg);
      // });
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  if (!loaded) {
    return;
  }
  return (
    <div>
      <div className="admin-content-text mb-3">ادارة جميع الطلبات</div>
      <div className=" row justify-content-start ">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="table-responsive">
            <table className="table table-bordered table-responsive">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">أسم - البريد الالكتروني</th>
                  <th scope="col">رقم الهاتف</th>
                  <th scope="col">السعر بالريال اليمني</th>
                  <th scope="col">السعر بالريال السعودي</th>
                  <th scope="col">السعر بالدولار </th>
                  <th scope="col">الكود</th>
                  <th scope="col">دفع</th>
                  <th scope="col">وصل</th>
                  {!orders.isPaid && <th scope="col">تم الدفع</th>}
                  {!orders.isDelivered && <th scope="col">تم التوصيل</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    {orders.user.name} - {orders.user.email}
                  </td>
                  <td>{orders.user.phone || "لايوجد رقم هاتف للحساب"}</td>
                  <td>{orders.totalOrderPrice} ريال يمني</td>
                  <td>{orders.totalOrderPriceSAR} ريال سعودي</td>
                  <td>{orders.totalOrderPriceUSD} دولار</td>{" "}
                  <td>{orders.code}</td>
                  <td>{orders.isPaid ? "دفع" : "لم يدفع"}</td>
                  <td>
                    {orders.isDelivered ? "تم التوصيل" : "لم يتم التوصيل بعد"}
                  </td>
                  {!orders.isPaid && (
                    <td>
                      <button
                        onClick={() => makeOrderPaid()}
                        className="fs-5 btn btn-primary text-white mb-2"
                      >
                        تم الدفع
                      </button>
                    </td>
                  )}
                  {!orders.isDelivered && (
                    <td>
                      <button
                        onClick={() => makeOrderDelivered()}
                        className="fs-5 btn btn-primary text-white mb-2"
                      >
                        تم التوصيل
                      </button>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {orders.img ? (
          <img
            src={orders.img}
            style={{ maxWidth: "300px", margin: "20px auto " }}
            alt=""
          />
        ) : (
          <div>لم يتم أضافه صوره الحوالة بعد</div>
        )}
        <Row className="justify-content-start">
          {orders.cartItems.length >= 1 ? (
            orders.cartItems.map((item) => (
              <div key={item._id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">
                    {item.product?.title || "لا يوجد عنوان"}
                  </h5>
                  <p className="card-text">
                    الماركه: {item.product?.brand?.name || "لا يوجد ماركة"}
                  </p>
                  <p className="card-text">
                    القسم: {item.product?.category?.name || "لا يوجد قسم"}
                  </p>
                  <p className="card-text">السعر: {item.price} ريال يمني</p>
                  <p className="card-text">السعر: {item.priceSAR} ريال سعودي</p>
                  <p className="card-text">السعر: {item.priceUSD} دولار</p>
                  <p className="card-text">الكمية: {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <h6>لا يوجد منتجات </h6>
          )}
        </Row>
      </div>
      <div className="admin-content-text mb-3">ارسال ايميل بصوره التوصيل</div>
      <div className="col-lg-7">
        <div className="mb-4">
          <label className="form-label fw-bold">اختر الصورة</label>
          <input
            required
            type="file"
            className="form-control"
            onChange={(e) => setBrandData({ orderImg: e.target.files[0] })}
          />
        </div>
        <button className="btn btn-primary" onClick={() => sendEmail()}>
          ارسال البريد للمستخدم
        </button>
      </div>
      <br />
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
            <td>{orders.shippingAddress.details || "لا يوجد"}</td>
            <td>{orders.shippingAddress.phone || "لا يوجد"}</td>
            <td>{orders.shippingAddress.city || "لا يوجد"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderDetalis;
