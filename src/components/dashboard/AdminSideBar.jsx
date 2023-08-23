import React from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div className="sidebar bg-dark ">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Link to="/admin/allorders " className="text-decoration-none">
            <div className="admin-side-text text-white mt-3 border-bottom p-2 mx-auto text-center">
              اداره الطلبات
            </div>
          </Link>
          <Link to="/admin/allproducts " className="text-decoration-none">
            <div className="admin-side-text text-white  my-1 border-bottom p-2 mx-auto text-center">
              اداره المنتجات
            </div>
          </Link>
          <Link to="/admin/addbrand" className="text-decoration-none">
            <div className="admin-side-text text-white my-1 border-bottom p-2 mx-auto text-center">
              اضف ماركه
            </div>
          </Link>
          <Link to="/admin/addstar" className="text-decoration-none">
            <div className="admin-side-text text-white my-1 border-bottom p-2 mx-auto text-center">
              اضف رأي
            </div>
          </Link>
          <Link to="/admin/addcategory" className="text-decoration-none">
            <div className="admin-side-text text-white my-1 border-bottom p-2 mx-auto text-center">
              اضف تصنيف
            </div>
          </Link>
          <Link to="/admin/addproduct" className="text-decoration-none">
            <div className="admin-side-text text-white my-1 border-bottom p-2 mx-auto text-center">
              اضف منتج
            </div>
          </Link>
          <Link to="/admin/sendemail" className="text-decoration-none">
            <div className="admin-side-text text-white my-1 border-bottom p-2 mx-auto text-center">
              ارسال ايميل لكل المستخدمين
            </div>
          </Link>
          <Link to="/admin/adduser" className="text-decoration-none">
            <div className="admin-side-text text-white mt-1 border-bottom p-2 mx-auto text-center">
              أضف مستخدم
            </div>
          </Link>
          <Link to="/admin/addshow" className="text-decoration-none">
            <div className="admin-side-text text-white mt-1 border-bottom p-2 mx-auto text-center">
              اضافة اعلان
            </div>
          </Link>
          <Link to="/admin/blog" className="text-decoration-none">
            <div className="admin-side-text text-white mt-1 border-bottom p-2 mx-auto text-center">
              صفحة المدونة
            </div>
          </Link>
          <Link to="/admin/notification" className="text-decoration-none">
            <div className="admin-side-text text-white mt-1 border-bottom p-2 mx-auto text-center">
              حذف اشعار
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
