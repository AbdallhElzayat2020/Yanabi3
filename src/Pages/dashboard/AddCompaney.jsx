import React from "react";
import AdminSideBar from "../../components/dashboard/AdminSideBar";

const AddCompaney = () => {
  return (
    <>
      <section className="add_company">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <AdminSideBar />
            </div>
            <div className="col-7"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddCompaney;
