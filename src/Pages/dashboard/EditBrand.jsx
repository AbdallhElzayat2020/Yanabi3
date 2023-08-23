import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { baseUrl } from "../../../utils/baseUrl";

const EditBrandPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const [cookies] = useCookies(["token"]);
  const [brandData, setBrandData] = useState({});
  const editBrand = async () => {
    try {
      await axios.put(`${baseUrl}/api/v1/brands/${id}`, brandData, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      toast.success("تمت تعديل ماركة بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error("لم يتم تعديل ماركة بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const getProductsBrands = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/brands/${id}`, {
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
      {
        isLoading ? <Loading /> :
          <section>
            <div className="container">
              <div className="row d-flex  justify-content-between py-3">
                <div className="col-lg-4 col-md-12 col-sm-12" >
                  <AdminSideBar />
                </div>

                <div className="col-lg-7 col-sm-12 col-sm-12" >
                  <div>
                    <div className="row justify-content-start ">
                      <div className="admin-content-text pb-4 fw-bold">تعديل ماركة</div>
                      <div className="col-lg-7 col-sm-12 sol-sm-12">
                        <div className="mb-3 ">
                          <label className="form-label fw-bold">اسم ماركة</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="اسم ماركة"
                            defaultValue={products.name}
                            onChange={(e) =>
                              setBrandData({ ...brandData, name: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-7 col-md-12 col-sm-12 d-flex justify-content-end ">
                        <button
                          className="btn btn-success mb-3 fw-bold"
                          onClick={() => editBrand()}
                        >
                          تعديل ماركة
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      }
    </>
  );
};

export default EditBrandPage;
