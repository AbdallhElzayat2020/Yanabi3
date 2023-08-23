import React, { useEffect, useState } from "react";

import AdminSideBar from "../../components/dashboard/AdminSideBar";
import AdminSendEmail from "../../components/dashboard/AdminSendEmail";
import Loading from "../../components/Loading/Loading";


const AdminSendEmailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {
        isLoading ? <Loading /> : <section>
          <div className="container">
            <div className="row py-3 d-flex  justify-content-between">
              <div className="col-lg-4 col-md-12 col-sm-12" >
                <AdminSideBar />
              </div>

              <div className="col-lg-7 col-md-12 col-sm-12" >
                <AdminSendEmail />
              </div>
            </div>
          </div>
        </section>
      }
    </>
  );
};

export default AdminSendEmailPage;
