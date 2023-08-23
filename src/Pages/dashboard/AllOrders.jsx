import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import AdminAllOrder from "../../components/dashboard/AdminAllOrder";
import Loading from "../../components/Loading/Loading";

const AdminAllOrdersPage = () => {
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
          <section>
            <Container>
              <div className="py-3 row d-flex  justify-content-between ">
                <div className="col-lg-4 col-sm-12 sol-md-12 mb-sm-5">
                  <AdminSideBar />
                </div>

                <div className="col-lg-7 col-sm-12 sol-md-12 bg-dark text-white rounded-3 p-3 ">
                  <AdminAllOrder />
                </div>
              </div>
            </Container>
          </section>
      }
    </>
  );
};

export default AdminAllOrdersPage;
