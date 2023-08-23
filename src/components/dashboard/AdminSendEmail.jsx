import axios from "axios";
import React, { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/baseUrl";
const AdminSendEmail = () => {
  const dateRef = useRef();

  const [cookies] = useCookies(["token"]);
  const [brandData, setBrandData] = useState({});
  const addBrand = async () => {
    try {
      await axios.post(`${baseUrl}/api/v1/emails`, brandData, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      toast.success("تم ارسال الايميل بنجاح", {
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
        <div className="admin-content-text pb-4">
          ارساله ايميل الي كل المستخدمين
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12">
          <div className="mb-3">
            <label className="form-label">العنوان</label>
            <input
              type="text"
              className="form-control"
              placeholder="العنوان"
              onChange={(e) =>
                setBrandData({ ...brandData, subject: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">محتوي الرساله</label>
            <textarea
              className="form-control"
              placeholder="محتوي الرساله"
              rows="4"
              cols="50"
              onChange={(e) =>
                setBrandData({ ...brandData, message: e.target.value })
              }
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12 d-flex justify-content-end ">
          <button className="btn btn-primary mb-3" onClick={() => addBrand()}>
            ارسال الايميل
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSendEmail;
