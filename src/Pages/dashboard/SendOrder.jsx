import React, { useState } from "react";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/baseUrl";

const SendOrder = () => {
  const [cookies] = useCookies(["token"]);
  const [brandData, setBrandData] = useState({});
  const addBrand = async () => {
    const formdata = new FormData();
    formdata.append("email", brandData.email);
    formdata.append("image", brandData.image);

    try {
      await axios.post(`${baseUrl}/api/v1/emails/email`, formdata, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      toast.success("تم ارسال الايميل بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      // err.response.data.errors.map((error) => {
      //   toast.error(error.msg);
      // });
    }
  };
  return (
    <>
      <section className="send-order">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <AdminSideBar />
            </div>
            <div className="col-lg-7">
              <div className="mb-4">
                <label className="form-label fw-bold">اختر الصورة</label>
                <input
                  required
                  type="file"
                  className="form-control"
                  onChange={(e) =>
                    setBrandData({ ...brandData, image: e.target.files[0] })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">الايمال</label>
                <input
                  type="email"
                  required
                  className="form-control"
                  placeholder="ايمال العميل"
                  onChange={(e) =>
                    setBrandData({ ...brandData, email: e.target.value })
                  }
                />
              </div>
              <button className="btn btn-primary" onClick={() => addBrand()}>
                ارسال الصورة
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SendOrder;
