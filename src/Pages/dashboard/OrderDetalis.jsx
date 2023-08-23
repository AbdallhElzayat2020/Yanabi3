import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import { useParams } from "react-router-dom";
import AdminOrderDetalis from "../../components/dashboard/AdminOrderDetalis";
import Loading from "../../components/Loading/Loading";

const AdminOrderDetalisPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const { id } = useParams();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="container">
            <div className=" row py-3">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <AdminSideBar />
              </div>

              <div className="col-lg-7 col-md-12 col-sm-12">
                <AdminOrderDetalis id={id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminOrderDetalisPage;
