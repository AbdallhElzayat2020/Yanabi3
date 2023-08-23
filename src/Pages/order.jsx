import Clients from "../components/Clients/Clients";
import ProductsList from "../components/Products/Products";
import { Slider } from "../components/Slider/Slider";
import Loading from "../components/Loading/Loading";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
const Order = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const [orders, setOrders] = useState([]);
  const getOrder = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/orders?sort=-createdAt`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    const userDataRes = await axios.get(`${baseUrl}/api/v1/users/getMe`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    let data = [];
    res.data.data.map((item) => {
      if (userDataRes.data.data.email == item.user.email) {
        data.push(item);
      }
    });
    setOrders(data);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getOrder();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <Container>
            <div className="py-3 row d-flex  justify-content-between ">
              <div className="col-sm-12 sol-md-12 bg-dark text-white rounded-3 p-3 ">
                <div>
                  <div className="admin-content-text mb-3">
                    ادارة جميع الطلبات
                  </div>
                  <div className="row  justify-content-start">
                    {orders ? (
                      orders.map((item) => (
                        <div
                          className="col-lg-12 col-md-12 col-sm-12 card mb-3"
                          key={item._id}
                        >
                          <Link
                            to={"/cart/pay/" + item._id}
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

export default Order;
