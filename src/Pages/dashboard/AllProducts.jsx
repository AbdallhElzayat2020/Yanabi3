import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import AdminAllProducts from "../../components/dashboard/AdminAllProducts";
import Loading from "../../components/Loading/Loading";

const AdminAllProductsPage = () => {
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
          <section className="bg-dark">
            <div className="container bg">
              <div className="py-3 row">
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <AdminSideBar />
                </div>

                <div className="col-lg-7 col-md-12 col-sm-12">
                  <AdminAllProducts />
                </div>
              </div>
            </div>
          </section>
      }
    </>
  );
};

export default AdminAllProductsPage;
