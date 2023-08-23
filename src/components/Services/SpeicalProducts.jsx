// speical-prodcut img
import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
const SpeicalProducts = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);

  const GetNewProducts = async () => {
    const getAllProducts = await axios(
      `${baseUrl}/api/v1/products?limit=8&page=1&sort=-createdAt`
    );
    setNewProducts(getAllProducts.data.data);
  };
  const GetSoldProducts = async () => {
    const getAllProducts = await axios(
      `${baseUrl}/api/v1/products?limit=8&page=1&sort=-sold`
    );
    setSoldProducts(getAllProducts.data.data);
  };
  useEffect(() => {
    GetNewProducts();
    GetSoldProducts();
  }, []);
  return (
    <>
      <section className="speical-prodcut">
        <div className="container">
          <h3 className="text-center text-primary ">المنتجات الواصلة حديثا</h3>
          <div className="row">
            {newProducts.map((product) => (
              <Link
                to={`/details/${product._id}`}
                key={product._id}
                style={{ textDecoration: "none" }}
                className="col-lg-4  col-md-6 col-sm-12 mt-4 imm"
              >
                <div className="box p-3 rounded-3">
                  <img src={product.productImg} alt="" />
                  <div className="price mt-2 d-flex justify-content-evenly align-items-center">
                    <p
                      className="btn btn-outline-dark"
                      style={{ marginBottom: 0 }}
                    >
                      وارد دبي
                    </p>
                    <button className=" btn btn-outline-dark ">
                      {product.price}ريال يمني
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <h3 className="text-center text-primary mt-4">
            المنتجات الاكثر طلبا
          </h3>
          <div className="row">
            {soldProducts.map((product) => (
              <Link
                to={`/details/${product._id}`}
                key={product._id}
                className="col-lg-4 col-md-6 col-sm-12 mt-4 imm"
                style={{ textDecoration: "none" }}
              >
                <div className="box">
                  <img src={product.productImg} alt="" />
                  <div className="price mt-2 d-flex justify-content-evenly align-items-center">
                    <p
                      className="btn btn-outline-dark"
                      style={{ marginBottom: 0 }}
                    >
                      وارد دبي
                    </p>
                    <button className=" btn btn-outline-dark ">
                      {product.price}ريال يمني
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SpeicalProducts;
