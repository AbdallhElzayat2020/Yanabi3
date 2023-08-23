import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/baseUrl";
const AdminAddProducts = () => {
  const [cookies] = useCookies(["token"]);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productsData, setProductsData] = useState({});
  const getAllCategories = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/categories`);
    setCategories(res.data.data);
  };
  const getAllBrands = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/brands`);
    setBrands(res.data.data);
  };
  useEffect(() => {
    getAllCategories();
    getAllBrands();
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
      await axios.post(`${baseUrl}/api/v1/products`, formData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "content-type": "multipart/form-data",
        },
      });
      toast.success("تمت أضافه المنتج بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      console.log(err);
      if (
        err.response.data.message ==
        "Product validation failed: description: Too short product description"
      ) {
        toast.error("الوصف قصير");
      } else {
        err.response.data.errors.map((error) => {
          toast.error(error.msg);
        });
      }
    }
  };
  return (
    <div>
      <div className="row justify-content-start ">
        <div className="admin-content-text pb-4  fs-5"> اضافه منتج جديد</div>
        <div className="col-lg-8">
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
              onBlur={(e) => onChangeData("title", e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <textarea
              className="form-control"
              placeholder="وصف المنتج"
              rows="4"
              cols="50"
              onBlur={(e) => onChangeData("description", e.target.value)}
            ></textarea>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="نوع الخط العطري"
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
              onBlur={(e) => onChangeData("product_size", e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="نوع العطر"
              onBlur={(e) => onChangeData("type", e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="السعر بالريال اليمني"
              onBlur={(e) => onChangeData("price", e.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="السعر بالريال السعودي"
              onBlur={(e) => onChangeData("priceSAR", e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="السعر بالدولار"
              onBlur={(e) => onChangeData("priceUSD", e.target.value)}
            />
          </div>
          <select
            className="form-select mb-3 fw-bold"
            aria-label="Default select example"
            onBlur={(e) => onChangeData("category", e.target.value)}
          >
            <option className=" fw-bold" selected>
              أختر التصنيف
            </option>
            {categories
              ? categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))
              : null}
          </select>
          <select
            className="form-select mb-3 fw-bold"
            aria-label="Default select example"
            onBlur={(e) => onChangeData("brand", e.target.value)}
          >
            <option selected>أخترالماركة</option>
            {brands
              ? brands.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))
              : null}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="d-flex col-lg-6 justify-content-end ">
          <button
            className="btn btn-success fw-bold mb-3"
            onClick={() => addProduct()}
          >
            أضافه منتج جديد
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProducts;
