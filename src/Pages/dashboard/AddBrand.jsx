import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import AdminAddBrand from "../../components/dashboard/AdminAddBrand";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Loading from "../../components/Loading/Loading";
import { baseUrl } from "../../../utils/baseUrl";
const AdminAddBrandPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);

  const [cookies] = useCookies(["token"]);
  const getProductsBrands = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/brands`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setProducts(res.data.data);
  };
  const deleteCategory = async (id) => {
    await axios.delete(`${baseUrl}/api/v1/brands/${id}`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    toast.success("تم حذف ماركة بنجاح", {
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
      {isLoading ? <Loading /> :
        <div>

          <div className="container">
            <div className="py-3 row d-flex  justify-content-between my-sm-5">
              <div className="col-lg-4 mb-sm-5 col-md-12 col-sm-12">
                <AdminSideBar />
              </div>

              <div className="col-lg-8  text-dark fw-bold">
                <div className="col-lg-12">
                  <AdminAddBrand />
                </div>
                <table className="table shadow-sm">
                  <thead >
                    <tr className="  " >
                      <th className="bg-dark text-white fw-bold " >أسم الماركة</th>
                      <th className="bg-dark text-white fw-bold " >تعديل</th>
                      <th className="bg-dark text-white fw-bold " >حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((brand) => (
                      <tr>
                        <td className=" fw-bold">{brand.name}</td>
                        <td>
                          <Link className=" text-decoration-none btn btn-primary fw-bold" to={`/admin/editbrand/${brand._id}`}>تعديل</Link>
                        </td>
                        <td>
                          <button className="btn btn-danger fw-bold" onClick={() => deleteCategory(brand._id)}>
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default AdminAddBrandPage;
