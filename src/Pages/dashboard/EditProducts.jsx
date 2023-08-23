import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import AdminEditProducts from "../../components/dashboard/AdminEditProducts";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const AdminEditProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
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
                  <AdminEditProducts id={id} />
                </div>
              </div>
            </div>
          </section>
      }
    </>
  );
};

export default AdminEditProductsPage;
