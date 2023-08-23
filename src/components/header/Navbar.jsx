import "../header/Navbar.css";
import logo from "../../images/logo.png";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
const Navbar = () => {
  const navigate = useNavigate();

  const [cookies] = useCookies(["token"]);
  const [numberCart, setNumberCart] = useState(0);
  const [roleUser, setRoleUser] = useState("");
  const [searchText, setSearchText] = useState("");
  const [show, setShow] = useState(true);

  const getNumberCart = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/cart`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    setNumberCart(res.data?.numOfCartItems);
  };
  const getRoleOfUser = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/users/getMe`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
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
    if (cookies.token) {
      getNumberCart();
      getRoleOfUser();
    }
    getShowBlog();
  }, []);
  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg sticky-top  ">
        <div className="container text-center">
          <Link className="navbar-brand fw-bold " to="/">
            <img className="" src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item dropdown text-center">
                <a
                  className="nav-link  dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  الصفحات
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item  text-center" to="/prodcuts">
                      كل المنتجات
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item  text-center" to="/roquah">
                      رؤيتنا
                    </Link>
                  </li>
                  {show && (
                    <li>
                      <Link className="dropdown-item  text-center" to="/blog">
                        المدونة
                      </Link>
                    </li>
                  )}

                  {/* <li>
                    <Link className="dropdown-item text-center" to="/woman">
                    </Link>
                  </li> */}
                  <li>
                    <Link className="dropdown-item  text-center" to="/contact">
                      تواصل معنا
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="about">
                  من نحن
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/services">
                  الخدمات
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/navgaite">
                  <i className="fa-regular fa-bell fs-5"></i>
                </Link>
              </li>
              <div className="d-flex former">
                <input
                  className="form-control text-white lable ms-2"
                  type="text"
                  placeholder="ابحث هنا"
                  onBlur={(e) => setSearchText(e.target.value)}
                />
                <Link
                  to={`/prodcuts?search=${searchText}`}
                  className="btn butt btn-secondary  my-2 my-sm-0"
                  type="submit"
                >
                  ابحث
                </Link>
              </div>
            </ul>

            <div className="buttons">
              {roleUser == "admin" && (
                <Link
                  to="/admin/addbrand"
                  className="btn button btn-outline-light"
                >
                  <i className="fa-solid fa-chart-line"></i> لوحة التحكم
                </Link>
              )}
              {roleUser == "manager" && (
                <Link
                  to="/manager/allorders"
                  className="btn button btn-outline-light"
                >
                  <i className="fa-solid fa-chart-line"></i> لوحة التحكم
                </Link>
              )}
              {cookies.token ? (
                <>
                  <Link to="/user" className="btn button btn-outline-light">
                    <i className="fa-solid fa-user"></i>
                    ملفك الشخصي
                  </Link>
                  <Link to="/cart" className="btn button btn-outline-light">
                    <i className="fa-solid fa-cart-shopping"></i>
                    السلة <span className="text-danger">({numberCart})</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn button btn-outline-light">
                    <i className="fa-solid fa-right-to-bracket "></i>
                    سجل
                  </Link>
                  <Link
                    to="/newAccount"
                    className="btn button btn-outline-light"
                  >
                    <i className="fa-solid fa-user"></i>
                    حساب جديد
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
