import axios from "axios";
import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/baseUrl";
const AdminAddBrand = () => {
  const [cookies] = useCookies(["token"]);
  const [brandData, setBrandData] = useState({});
  const addBrand = async () => {
    try {
      await axios.post(`${baseUrl}/api/v1/brands`, brandData, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      toast.success("تمت أضافه الماركة بنجاح", {
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
        <div className="admin-content-text pb-4">اضف ماركه جديده</div>
        <Col sm="12">
          <div className="mb-3">
            <label className="form-label">اسم الماركه</label>
            <input
              type="text"
              className="form-control"
              placeholder="اسم الماركه"
              onChange={(e) => setBrandData({ name: e.target.value })}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12" className="d-flex justify-content-end ">
          <button className="btn btn-primary mb-3" onClick={() => addBrand()}>
            أضافه ماركة جديده
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default AdminAddBrand;
