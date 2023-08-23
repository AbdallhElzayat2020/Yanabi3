import { Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";

const AdminAllProducts = () => {
  const [cookies] = useCookies(["token"]);
  const [cartData, setCartData] = useState([]);
  const [cartId, setCartId] = useState("");
  const getCart = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/products`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setCartData(res.data.data);
  };
  const deleteProductFromCart = async (id) => {
    await axios.delete(`${baseUrl}/api/v1/products/${id}`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    toast.success("تم حذف المنتج بنجاح", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">حذف المنتج</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>هل تريد حذف المنتج؟</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                تراجع
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => deleteProductFromCart(cartId)}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-content-text">ادارة جميع المنتجات</div>
      <Row className="justify-content-start">
        {cartData.length >= 1 ? (
          cartData.map((item) => (
            <div key={item._id} className="card mb-3">
              <img
                src={item.productImg}
                className="card-img-top"
                alt="Cart Img"
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setCartId(item._id)}
                >
                  حذف المنتج
                </button>
                <Link
                  to={`/admin/editproduct/${item._id}`}
                  className="btn btn-info m-3"
                >
                  تعديل المنتج
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h6>لا يوجد منتجات </h6>
        )}
      </Row>
    </div>
  );
};

export default AdminAllProducts;
