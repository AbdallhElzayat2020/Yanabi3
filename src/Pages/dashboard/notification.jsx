import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminAddCategory from "../../components/dashboard/AdminAddCategory";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { baseUrl } from "../../../utils/baseUrl";
const AdminNotification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cookies] = useCookies(["token"]);
  const getProductsBrands = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/notification`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setProducts(res.data.data);
  };
  const deleteCategory = async (id) => {
    await axios.delete(`${baseUrl}/api/v1/notification/${id}`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    toast.success("تم حذف الاشعار بنجاح", {
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
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="container">
            <div className="py-3 row d-flex align-items-center  justify-content-between">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <AdminSideBar />
              </div>

              <div className="col-lg-8 mt-sm-5">
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="bg-dark text-white fw-bold " scope="col">
                          أسم القسم
                        </th>
                        <th className="bg-dark text-white fw-bold " scope="col">
                          الوصف
                        </th>
                        <th className="bg-dark text-white fw-bold " scope="col">
                          حذف
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((brand) => (
                        <tr>
                          <td className=" fw-bold ">{brand.name}</td>
                          <td className=" fw-bold ">{brand.desc}</td>
                          <td>
                            <button
                              className=" btn btn-danger"
                              onClick={() => deleteCategory(brand._id)}
                            >
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
        </div>
      )}
    </>
  );
};

export default AdminNotification;
