import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import Loading from "../../components/Loading/Loading";
import { baseUrl } from "../../../utils/baseUrl";

const AdminAddUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const [brandData, setBrandData] = useState({});
  const addBrand = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/v1/users`,
        { ...brandData, role: "admin", passwordConfirm: brandData.password },
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      toast.success("تمت أضافه المستخدم بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      err.response.data.errors.map((error) => {
        toast.error(error.msg);
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {
        isLoading ? <Loading /> :
          <section>

            <div className="container">
              <div className="row py-3">
                <div className="col-lg-4 col-md-12 col-sm-12" >
                  <AdminSideBar />
                </div>

                <div className="col-lg-7 col-md-12 col-sm-12" >
                  <div>
                    <div className="alert alert-info" role="alert">
                      المستخدم الذي ستنشئه سيكون بصالحيه الادمن
                    </div>

                    <div className="row justify-content-start ">
                      <div className="admin-content-text pb-4 fw-bold">اضف مستخدم</div>
                      <div className="col-lg-12 col-md-12 col-sm-12" >
                        <div className="mb-3 ">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="اسم الحساب"
                            onChange={(e) =>
                              setBrandData({ ...brandData, name: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg- col-md-12 col-sm-12" >
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="الايميل"
                            onChange={(e) =>
                              setBrandData({ ...brandData, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12" sm="8">
                        <div className="mb-3">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="كلمه المرور"
                            onChange={(e) =>
                              setBrandData({ ...brandData, password: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <Row>
                      <Col sm="8" className="d-flex justify-content-end ">
                        <button
                          className="btn btn-primary mb-3"
                          onClick={() => addBrand()}
                        >
                          أضافه المستخدم
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </section>
      }
    </>
  );
};

export default AdminAddUser;
