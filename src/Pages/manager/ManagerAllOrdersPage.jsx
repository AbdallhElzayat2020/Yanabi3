import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { baseUrl } from "../../../utils/baseUrl";
import { toast } from "react-toastify";

const ManagerAllOrdersPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const [cookies] = useCookies(["token"]);
  const [orders, setOrders] = useState([]);
  const getOrder = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/orders?isPaid=true`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setOrders(res.data.data);
  };
  useEffect(() => {
    getOrder();
  }, []);

  function DeleteFunction(e) {
    axios
      .delete(`${baseUrl}/api/v1/orders/delete/${e}`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((res) => {
        toast.success("تمت حذف الطلب بنجاح", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        toast.error("لم يتم حذف الطلب بنجاح", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <Container>
            <div className="py-3 row d-flex  justify-content-between ">
              <div className="col-lg-4 col-sm-12 sol-md-12 mb-sm-5">
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

              <div className="col-lg-7 col-sm-12 sol-md-12 bg-dark text-white rounded-3 p-3 ">
                <div>
                  <div className="admin-content-text mb-3">
                    ادارة جميع الطلبات
                  </div>
                  <div className="row  justify-content-start">
                    {orders.length >= 1 ? (
                      orders.map((item) => (
                        <div
                          className="col-lg-12 col-md-12 col-sm-12 card mb-3"
                          key={item._id}
                        >
                          <Link
                            to={"/manager/orders/" + item._id}
                            className="cart-body my-2 px-1 d-flex"
                            style={{ textDecoration: "none" }}
                          >
                            <div>
                              <Row className="justify-content-between">
                                <Col
                                  sm="12"
                                  className=" d-flex flex-row justify-content-between"
                                >
                                  <div className="d-inline pt-2 cat-text">
                                    {item.user.name} - {item.user.email}
                                  </div>
                                </Col>
                              </Row>
                              <Row className="justify-content-between">
                                <Col
                                  sm="12"
                                  className=" d-flex flex-row justify-content-between"
                                >
                                  <div className="d-inline pt-2 cat-text">
                                    الكود: {item.code}
                                  </div>
                                </Col>
                              </Row>
                              <Row className="justify-content-between">
                                <Col
                                  sm="12"
                                  className=" d-flex flex-row justify-content-between"
                                >
                                  <div className="d-inline pt-2 barnd-text">
                                    {item.totalOrderPrice} ريال يمني
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <h6>لا توجد طلبات</h6>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
};

export default ManagerAllOrdersPage;
