import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import AdminAddCoupon from "../../components/dashboard/AdminAddCoupon";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { baseUrl } from "../../../utils/baseUrl";

const AdminAddCouponPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);

  const [cookies] = useCookies(["token"]);
  const getProductsBrands = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/coupons`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setProducts(res.data?.data);
  };
  const deleteCategory = async (id) => {
    await axios.delete(`${baseUrl}/api/v1/coupons/${id}`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    toast.success("تم حذف القسم بنجاح", {
      position: toast.POSITION.TOP_RIGHT,
    });
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
          <div>

            <div className="container">
              <div className="row py-3">
                <div className="col-lg-4 col-md-12 col-sm-12" >
                  <AdminSideBar />
                </div>

                <div className="col-lg-7 col-md-12 col-sm-12">
                  <div >
                    <table className="table">
                      <thead>
                        <tr className="">
                          <th className=" fw-bold bg-dark text-white" scope="col">أسم الكوبون</th>
                          <th className=" fw-bold bg-dark text-white" scope="col">نسبة الكوبون</th>
                          <th className=" fw-bold bg-dark text-white" scope="col">تعديل</th>
                          <th className=" fw-bold bg-dark text-white" scope="col">حذف</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((brand) => (
                          <tr>
                            <td className="fw-bold">{brand.name}</td>
                            <td className="fw-bold">{brand.discount}</td>
                            <td className="fw-bold">
                              <Link className=" text-decoration-none btn btn-primary" to={`/admin/editcoupon/${brand._id}`}>تعديل</Link>
                            </td>
                            <td>
                              <button className="btn btn-danger" onClick={() => deleteCategory(brand._id)}>
                                حذف
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <AdminAddCoupon />
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default AdminAddCouponPage;
