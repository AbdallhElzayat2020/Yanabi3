import axios from "axios";
import React, { useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/baseUrl";
const AdminAddCoupon = () => {
  const dateRef = useRef();

  const [cookies] = useCookies(["token"]);
  const [brandData, setBrandData] = useState({});
  const addBrand = async () => {
    try {
      await axios.post(`${baseUrl}/api/v1/coupons`, brandData, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      toast.success("تمت أضافه الكوبون بنجاح", {
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
      <div className="row justify-content-start ">
        <div className="admin-content-text pb-4 fw-bold">اضف تصنيف جديد</div>
        <div className="col-lg-7 col-md-12 col-sm-12">
          <div className="mb-3">
            <label className="form-label fw-bold">اسم الكوبون</label>
            <input
              type="text"
              className="form-control"
              placeholder="اسم الكوبون"
              onChange={(e) =>
                setBrandData({ ...brandData, name: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">موعد انتهاء الكوبون</label>
            <input
              ref={dateRef}
              className="form-control"
              type="text"
              placeholder="موعد انتهاء الكوبون"
              onFocus={() => (dateRef.current.type = "date")}
              onBlur={() => (dateRef.current.type = "text")}
              onChange={(e) =>
                setBrandData({ ...brandData, expire: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">نسبة الخصم</label>
            <input
              className="form-control"
              type="number"
              placeholder="نسبة الخصم"
              onChange={(e) =>
                setBrandData({ ...brandData, discount: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12 d-flex justify-content-end ">
          <button className="btn btn-primary mb-3" onClick={() => addBrand()}>
            أضافه كوبون جديد
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCoupon;
