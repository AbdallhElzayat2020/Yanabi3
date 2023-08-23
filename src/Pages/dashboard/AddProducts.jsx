import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminAddProducts from "../../components/dashboard/AdminAddProducts";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import Loading from "../../components/Loading/Loading";
const AdminAddProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {
        isLoading ? <Loading /> :
          <div>
            <div className="container">
              <div className="row py-3 d-flex  justify-content-between ">
                <div className="col-lg-4 col-md-12 col-sm-12" >
                  <AdminSideBar />
                </div>

                <div className="col-lg-7 col-ms-12 col-sm-12 " >
                  <AdminAddProducts />
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default AdminAddProductsPage;
