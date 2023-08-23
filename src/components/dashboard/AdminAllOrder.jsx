import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import { baseUrl } from "../../../utils/baseUrl";
import { toast } from "react-toastify";

const AdminAllOrder = () => {
  const [cookies] = useCookies(["token"]);
  const [orders, setOrders] = useState([]);
  const getOrder = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/orders?sort=-createdAt`, {
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
    <div>
      <div className="admin-content-text mb-3">ادارة جميع الطلبات</div>
      <div className="row  justify-content-start">
        {orders ? (
          orders.map((item) => (
            <div
              className="col-lg-12 col-md-12 col-sm-12 card mb-3"
              key={item._id}
            >
              <Link
                to={"/admin/orders/" + item._id}
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
              <Row className="justify-content-between">
                <Col
                  sm="12"
                  className=" d-flex flex-row justify-content-between"
                >
                  <button
                    onClick={() => {
                      DeleteFunction(item._id);
                    }}
                    className="btn bg-danger text-white mt-2 mb-2"
                  >
                    حذف
                  </button>
                </Col>
              </Row>
            </div>
          ))
        ) : (
          <h6>لا توجد طلبات</h6>
        )}
      </div>
    </div>
  );
};

export default AdminAllOrder;
