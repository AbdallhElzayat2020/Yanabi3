import { Routes, Route, useNavigate } from "react-router-dom";
import SideNav from "./components/header/Navside/SideNav";
import Navbar from "./components/header/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Details from "./components/header/DetailsProducts/Details";
import Products from "./components/Products/Products";
import Contact from "./components/Contact-Form/Contact";
import Login from "./components/Login/Login";
import Account from "./components/NewAccount/Account";
import Cart from "./components/Cart/Cart";
import ForgetPass from "./components/Login/ForgetPass/ForgetPass";
import Services from "./components/Services/Services";
import Footer from "./components/Footer/Footer";
import Rouquah from "./components/Roquah/Rouquah";
import User from "./components/User/User";
import AddressesUser from "./components/User/AddressesUser";
import EditUser from "./components/User/EditUser";
import AdminAddCategoryPage from "./Pages/dashboard/AddCategory";
import AdminAddCouponPage from "./Pages/dashboard/AddCoupon";
import AdminAddProductsPage from "./Pages/dashboard/AddProducts";
import AdminAllProductsPage from "./Pages/dashboard/AllProducts";
import AdminEditProductsPage from "./Pages/dashboard/EditProducts";
import AdminAllOrdersPage from "./Pages/dashboard/AllOrders";
import AdminOrderDetalisPage from "./Pages/dashboard/OrderDetalis";
import AdminSendEmailPage from "./Pages/dashboard/AdminSendEmail";
import CartPay from "./components/Cart/Pay";
import AdminAddUser from "./Pages/dashboard/AddUserAdmin";

import { useCookies } from "react-cookie";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminAddBrandPage from "./Pages/dashboard/AddBrand";
import EditBrandPage from "./Pages/dashboard/EditBrand";
import EditCouponPage from "./Pages/dashboard/EditCoupon";
import EditCategoryPage from "./Pages/dashboard/EditCategory";
import { baseUrl } from "../utils/baseUrl";
import AdminAddStarPage from "./Pages/dashboard/addStar";
import Order from "./Pages/order";
import AddShow from "./Pages/dashboard/AddShow";
import AdminBlog from "./Pages/dashboard/Blog";
import SendOrder from "./Pages/dashboard/SendOrder";
import AddCompaney from "./Pages/dashboard/AddCompaney";
import GetToken from "./components/Login/setToken";
import Blog from "./Pages/blog";
import NavgateProducts from "./components/NavgatProduct/NavgateProducts";
import ManagerAllOrdersPage from "./Pages/manager/ManagerAllOrdersPage";
import ManagerOrderDetalisPage from "./Pages/manager/ManagerOrderDetalisPage";
import AdminNotification from "./Pages/dashboard/notification";
import CreateOrder from "./components/Cart/createOrder";
import EditAddress from "./components/User/editAddress";

const App = () => {
  const [cookies] = useCookies(["token"]);
  const [roleUser, setRoleUser] = useState("");
  const [show, setShow] = useState(false);

  // let navigate = useNavigate()
  const getRoleOfUser = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/users/getMe`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    // setRoleUser(res.data?.data?.role);
    setRoleUser(res.data.data.role);
  };
  const getShowBlog = async () => {
    let res = await axios.get(
      `${baseUrl}/api/v1/blog/64d6b5d5ad635d34a6b88b60`,
      {
        headers: { Authorization: `Bearer ${cookies.token}` },
      }
    );
    setShow(res.data.data.show);
  };
  useEffect(() => {
    getRoleOfUser();
    getShowBlog();
    console.clear();
    console.info("DONT TYPE ANY THING HERE");
  }, []);
  return (
    <>
      <SideNav />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/prodcuts" element={<Products />} />
        <Route path="/roquah" element={<Rouquah />} />
        <Route path="/services" element={<Services />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/navgaite" element={<NavgateProducts />} />

        <Route path="/order" element={<Order />} />
        {show && <Route path="/blog" element={<Blog />} />}
        {cookies.token ? (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/pay/:id" element={<CartPay />} />
            <Route path="/cart/order/:id" element={<CreateOrder />} />

            <Route path="/user" element={<User />} />
            <Route path="/user/addresses" element={<AddressesUser />} />
            <Route path="/user/addresses/:id" element={<EditAddress />} />
            <Route path="/user/edit-data" element={<EditUser />} />
          </>
        ) : (
          <>
            <Route path="/login/user/token/:token" element={<GetToken />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newAccount" element={<Account />} />
            <Route path="/forget" element={<ForgetPass />} />
          </>
        )}
        {roleUser == "admin" && (
          <>
            <Route path="/admin/notification" element={<AdminNotification />} />
            <Route path="/admin/addbrand" element={<AdminAddBrandPage />} />
            <Route path="/admin/addstar" element={<AdminAddStarPage />} />
            <Route path="/admin/addshow" element={<AddShow />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/sendorder" element={<SendOrder />} />
            <Route path="/admin/addcompany" element={<AddCompaney />} />
            <Route
              path="/admin/addcategory"
              element={<AdminAddCategoryPage />}
            />
            <Route
              path="/admin/addproduct"
              element={<AdminAddProductsPage />}
            />
            <Route
              path="/admin/allproducts"
              element={<AdminAllProductsPage />}
            />
            <Route
              path="/admin/editproduct/:id"
              element={<AdminEditProductsPage />}
            />
            <Route path="/admin/allorders" element={<AdminAllOrdersPage />} />
            <Route
              path="/admin/orders/:id"
              element={<AdminOrderDetalisPage />}
            />
            <Route path="/admin/sendemail" element={<AdminSendEmailPage />} />
            <Route path="/admin/adduser" element={<AdminAddUser />} />
            <Route path="/admin/editbrand/:id" element={<EditBrandPage />} />
            <Route
              path="/admin/editcategory/:id"
              element={<EditCategoryPage />}
            />
          </>
        )}
        {roleUser == "manager" && (
          <>
            <Route
              path="/manager/allorders"
              element={<ManagerAllOrdersPage />}
            />
            <Route
              path="/manager/orders/:id"
              element={<ManagerOrderDetalisPage />}
            />
          </>
        )}
      </Routes>
      <ToastContainer
        draggablePercent={60}
        rtl
        role="alert"
        transition={Slide}
      />
      <Footer />
    </>
  );
};

export default App;
