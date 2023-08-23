import { useCookies } from "react-cookie";
import "./Cart.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import queryParams from "../../../utils/queryParams";
import { baseUrl } from "../../../utils/baseUrl";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const { type } = queryParams();
  const [cookies] = useCookies(["token"]);
  const [cartData, setCartData] = useState([]);
  const [cartId, setCartId] = useState("");
  const [price, setPtice] = useState(0);

  const getCart = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/cart`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setPtice(res.data.data);
    setCartData(res.data.data.cartItems);
  };
  const deleteProductFromCart = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/v1/cart/${id}`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      toast.success("تم حذف المنتج بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      console.error(err.response.data);
    }
  };
  const createOrder = async () => {
    // let res = await axios.post(
    //   `${baseUrl}/api/v1/orders/${price._id}`,
    //   {},
    //   {
    //     headers: { Authorization: `Bearer ${cookies.token}` },
    //   }
    // );
    navigate(`/cart/order/${price._id}`);
  };
  const clearCart = async () => {
    await axios.delete(`${baseUrl}/api/v1/cart`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    toast.success("تم حذف المنتجات بنجاح", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    if (type == "success") {
      toast.success("تم الشراء بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type == "cancel") {
      toast.error("حصلت مشكله في عملية الشراء", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [type]);

  return (
    <>
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
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deleteProductFromCart(cartId)}
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="cart-title mt-4">عربة التسوق</div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-xs-12 col-md-9 mt-3">
            {cartData.length >= 1 ? (
              cartData.map((item) => (
                <div key={item._id} className="card mb-3">
                  <img
                    src={
                      typeof item.product.image == "string"
                        ? item.product.image
                        : item.product.image[0]
                    }
                    className="card-img-top"
                    alt="Cart Img"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.product.title}</h5>
                    <p className="card-text">{item.product.description}</p>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => setCartId(item._id)}
                    >
                      حذف المنتج من السله
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h6>لا يوجد منتجات فى العربة</h6>
            )}
          </div>
          <div className="col-xs-6 col-md-3">
            <div className="row my-1 d-flex justify-content-center cart-checkout pt-3">
              <div className="col-xs-12 d-flex flex-column">
                <input
                  className="form-control text-center"
                  type="text"
                  value={`${price.totalCartPrice || 0} ريال يمني`}
                  aria-label={`${price.totalCartPrice || 0} ريال يمني`}
                  disabled
                  readOnly
                ></input>
                <input
                  className="form-control text-center"
                  type="text"
                  value={`${price.totalCartPriceSAR || 0} ريال سعودي`}
                  aria-label={`${price.totalCartPriceSAR || 0} ريال سعودي`}
                  disabled
                  readOnly
                ></input>
                <input
                  className="form-control text-center"
                  type="text"
                  value={`${price.totalCartPriceUSD || 0} دولار`}
                  aria-label={`${price.totalCartPriceUSD || 0} دولار`}
                  disabled
                  readOnly
                ></input>
                <p className="text-center mt-2">
                  السعر باليمني  ب عملة محافظة صنعاء
                  محافظات الجنوب بالعمله السعودي أو الدولار
                </p>
                <div
                  onClick={() => createOrder()}
                  className="form-control text-center mt-2"
                  style={{ textDecoration: "none", cursor: "pointer" }}
                >
                  أتمام الشراء
                </div>
                <button
                  className="form-control text-center mt-2"
                  onClick={() => clearCart()}
                >
                  حذف كل المنتجات في السله
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
