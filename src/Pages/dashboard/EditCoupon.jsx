import React, { useRef, useState, useEffect } from "react";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { baseUrl } from "../../../utils/baseUrl";
import { useParams } from "react-router-dom";

const EditCouponPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const dateRef = useRef();
  const [products, setProducts] = useState([]);

  const [cookies] = useCookies(["token"]);
  const [brandData, setBrandData] = useState({});
  const editBrand = async () => {
    try {
      await axios.put(`${baseUrl}/api/v1/coupons/${id}`, brandData, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      toast.success("تمت تعديل الكوبون بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error("لم يتم تعديل الكوبون بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const getProductsBrands = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/coupons/${id}`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setProducts(res.data.data);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getProductsBrands();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <div className="container">
            <div className="row py-3">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <AdminSideBar />
              </div>

              <div className="col-lg-7 col-md-12 col-sm-12">
                <div>
                  <div className="row justify-content-start ">
                    <div className="admin-content-text pb-4 fw-bold">
                      تعديل الكوبون{" "}
                    </div>
                    <div className="col-lg-7 col-md-12 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          اسم الكوبون
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="اسم الكوبون"
                          defaultValue={products.name}
                          onChange={(e) =>
                            setBrandData({ ...brandData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">
                          موعد انتهاء الكوبون
                        </label>
                        <input
                          ref={dateRef}
                          className="form-control"
                          type="text"
                          defaultValue={products.expire}
                          placeholder="موعد انتهاء الكوبون"
                          onFocus={() => (dateRef.current.type = "date")}
                          onBlur={() => (dateRef.current.type = "text")}
                          onChange={(e) =>
                            setBrandData({
                              ...brandData,
                              expire: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">نسبة الخصم</label>
                        <input
                          className="form-control"
                          type="number"
                          defaultValue={products.discount}
                          placeholder="نسبة الخصم"
                          onChange={(e) =>
                            setBrandData({
                              ...brandData,
                              discount: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-7 col-md-12 col-sm-12 d-flex justify-content-end ">
                      <button
                        className="btn btn-primary mb-3 fw-bold"
                        onClick={() => editBrand()}
                      >
                        تعديل كوبون
                      </button>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EditCouponPage;
