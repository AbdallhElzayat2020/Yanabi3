import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { baseUrl } from "../../../utils/baseUrl";
import { Row } from "react-bootstrap";

const ManagerOrderDetalisPage = () => {
  const [isLoading, setIsLoading] = useState(true);
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
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getOrder();
  }, []);
  const { id } = useParams();
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
  if (!loaded) {
    return;
  }
  console.log(orders);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="container">
            <div className=" row py-3">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="sidebar bg-dark ">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <Link
                        to="/manager/allorders"
                        className="text-decoration-none"
                      >
                        <div className="admin-side-text text-white mt-3 border-bottom p-2 mx-auto text-center">
                          اداره الطلبات
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-7 col-md-12 col-sm-12">
                <div>
                  <div className="admin-content-text mb-3">
                    ادارة جميع الطلبات
                  </div>
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
                              <th scope="col">وصل</th>
                              {!orders.isDelivered && (
                                <th scope="col">تم التوصيل</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>
                                {orders.user.name || "لا يوجد"} -{" "}
                                {orders.user.email || "لا يوجد"}
                              </td>
                              <td>
                                {orders.user.phone || "لايوجد رقم هاتف للحساب"}
                              </td>
                              <td>{orders.totalOrderPrice} ريال يمني</td>
                              <td>{orders.totalOrderPriceSAR} ريال سعودي</td>
                              <td>{orders.totalOrderPriceUSD} دولار</td>

                              <td>{orders.code}</td>
                              <td>
                                {orders.isDelivered
                                  ? "تم التوصيل"
                                  : "لم يتم التوصيل بعد"}
                              </td>
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
                    <Row className="justify-content-start">
                      {orders.cartItems.length >= 1 ? (
                        orders.cartItems.map((item) => (
                          <div key={item._id} className="card mb-3">
                            <div className="card-body">
                              <h5 className="card-title">
                                {item.product?.title || "لا يوجد عنوان"}
                              </h5>
                              <p className="card-text">
                                الماركه:{" "}
                                {item.product?.brand?.name || "لا يوجد ماركة"}
                              </p>
                              <p className="card-text">
                                القسم:{" "}
                                {item.product?.category?.name || "لا يوجد قسم"}
                              </p>
                              <p className="card-text">
                                السعر: {item.price} ريال يمني
                              </p>
                              <p className="card-text">
                                السعر: {item.priceSAR} ريال سعودي
                              </p>
                              <p className="card-text">
                                السعر: {item.priceUSD} دولار
                              </p>
                              <p className="card-text">
                                الكمية: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h6>لا يوجد منتجات </h6>
                      )}
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagerOrderDetalisPage;
