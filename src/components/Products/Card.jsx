import axios from "axios";
import "../Products/Product.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../../utils/baseUrl";
import { useEffect } from "react";

const Card = (props) => {
  const [cookies] = useCookies(["token"]);

  const addProductToCart = async () => {
    if (props.product.active) {
      try {
        await axios.post(
          `${baseUrl}/api/v1/cart`,
          { productId: props.product._id },
          { headers: { Authorization: `Bearer ${cookies.token}` } }
        );
        toast.success("تمت أضافه المنتج بنجاح الي السله", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (err) {
        toast.error("لم يتم أضافه المنتج بنجاح الي السله", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error("المنتج غير متوفر");
    }
  };

  return (
    <div className="card shadow-sm">
      <img src={props.product.productImg} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.product.title}</h5>
        <span className="fs-4 py-4">ريال يمني {props.product.price}</span>
        <div className="icons d-flex justify-content-between align-items-center mt-3 ">
          <Link
            className="btn btn-primary bg-primary"
            to={`/details/${props.product._id}`}
          >
            المزيد
          </Link>
          <button
            className="btn btn-primary bg-primary"
            onClick={() => addProductToCart()}
          >
            <i className="fa-solid fa-cart-shopping fs-4"></i>
          </button>
          <button className="btn btn-primary bg-primary ">
            <p className="p-0 m-0">
              {props.product.active ? "متوفر" : "غير متوفر"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
