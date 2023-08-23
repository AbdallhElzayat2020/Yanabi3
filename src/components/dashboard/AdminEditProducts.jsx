import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/baseUrl";
const AdminEditProducts = ({ id }) => {
  const [cookies] = useCookies(["token"]);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState({});
  const getAllCategories = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/categories`);
    setCategories(res.data.data);
  };
  const getAllBrands = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/brands`);
    setBrands(res.data.data);
  };
  const getProductsBrands = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/products/${id}`);
    setProducts(res.data.data);
  };
  useEffect(() => {
    getAllCategories();
    getAllBrands();
    getProductsBrands();
  }, []);
  const onChangeData = (name, value) => {
    setProductsData({ ...productsData, [name]: value });
  };
  const addProduct = async () => {
    try {
      let formData = new FormData();
      for (const [key, value] of Object.entries(productsData)) {
        if (key == "image") {
          value.map((item) => {
            formData.append("image", item);
          });
        } else {
          formData.append(key, value);
        }
      }
      await axios.put(`${baseUrl}/api/v1/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "content-type": "multipart/form-data",
        },
      });
      toast.success("تمت تعديل المنتج بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      console.log(err);
      err.response.data.errors.map((error) => {
        toast.error(error.msg);
      });
    }
  };
  const makeActive = async () => {
    try {
      await axios.put(
        `${baseUrl}/api/v1/products/${
          products.active ? "unactive" : "active"
        }/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "content-type": "multipart/form-data",
          },
        }
      );
      toast.success("تمت تعديل المنتج بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      err.response.data.errors.map((error) => {
        toast.error(error.msg);
      });
    }
  };
  return (
    <div>
      <Row className="justify-content-start ">
        <div className="admin-content-text pb-4"> تعديل منتج</div>
        <Col sm="8">
          <div className="input-group mb-3" dir="ltr">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => onChangeData("productImg", e.target.files[0])}
            />
            <label className="input-group-text">صوره المنتج</label>
          </div>
          <div className="input-group mb-3" dir="ltr">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              multiple
              onChange={(e) => onChangeData("image", [...e.target.files])}
            />
            <label className="input-group-text">صور المنتج</label>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="اسم المنتج"
              defaultValue={products.title}
              onBlur={(e) => onChangeData("title", e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <textarea
              className="form-control"
              placeholder="وصف المنتج"
              rows="4"
              cols="50"
              defaultValue={products.description}
              onBlur={(e) => onChangeData("description", e.target.value)}
            ></textarea>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="نوع الخط العطري"
              defaultValue={products.aromatic_line_classification}
              onBlur={(e) =>
                onChangeData("aromatic_line_classification", e.target.value)
              }
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="مده ثبات العطر"
              defaultValue={products.fragrance_stability}
              onBlur={(e) =>
                onChangeData("fragrance_stability", e.target.value)
              }
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="حجم العطر"
              defaultValue={products.product_size}
              onBlur={(e) => onChangeData("product_size", e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="نوع العطر"
              defaultValue={products.type}
              onBlur={(e) => onChangeData("type", e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              defaultValue={products.price}
              placeholder="السعر بالريال اليمني"
              onBlur={(e) => onChangeData("price", e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              defaultValue={products.priceSAR}
              placeholder="السعر بالريال السعودي"
              onBlur={(e) => onChangeData("priceSAR", e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              defaultValue={products.priceUSD}
              placeholder="السعر بالدولار"
              onBlur={(e) => onChangeData("priceUSD", e.target.value)}
            />
          </div>
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            defaultValue={products.category}
            onBlur={(e) => onChangeData("category", e.target.value)}
          >
            {categories
              ? categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))
              : null}
          </select>
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            defaultValue={products.brand}
            onBlur={(e) => onChangeData("brand", e.target.value)}
          >
            {brands
              ? brands.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))
              : null}
          </select>
        </Col>
      </Row>
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button className="btn btn-success m-3" onClick={() => addProduct()}>
            تعديل المنتج
          </button>
          <button className="btn btn-primary m-3" onClick={() => makeActive()}>
            {products.active ? "جعله غير متوفر" : "جعله متوفر"}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default AdminEditProducts;
