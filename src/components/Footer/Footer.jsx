import "./Footer.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <section className="footer ">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center  text-center">
            <div className="col-lg-4 mb-md-3 ">
              <Link className="navbar-brand" to="/">
                <img className="ms-2" src={logo} alt="" />
                <p className="text-white text-center fs-6">
                  الرقم الرسمي  بالطلبات والاستفسار 778133390
                </p>
              </Link>
              <p className="text-white mt-3 fw-bold fs-6">
                الرقم الخاص بتوصيل الطلبات داخل صنعاء فقط    773000563
              </p>
            </div>
            <div className="col-lg-4 mt-md-2 links-main">
              <div className="head">
                <h5 className="text-white text-center pragraph ">للتواصل معنا</h5>
              </div>
              <div className="links">
                <a
                  href="https://www.facebook.com/fountainofperfumesandbeauty/"
                  target="blank"
                >
                  <i className="fa-brands fa-facebook fs-2 text-white ms-3 "></i>
                </a>
                <a href="https://m.facebook.com/groups/1239016770086851/?ref=share&mibextid=NSMWBT" target="blank">
                  <i className="fa-brands fa-facebook fs-2 text-white ms-3"></i>
                </a>
                <a
                  href="https://www.facebook.com/yanabie11?mibextid=ZbWKwL"
                  target="blank"
                >
                  <i className="fa-brands fa-facebook fs-2 text-white ms-3 "></i>
                </a>
                <a
                  href="https://www.instagram.com/yanabea_perfumes_and_beauty_/"
                  target="blank"
                >
                  <i className="fa-brands fa-instagram fs-2 text-white ms-3"></i>
                </a>
                <a href="https://t.me/yanabea_perfumes" target="blank">
                  <i className="fa-brands fa-telegram fs-2 text-white ms-3"></i>
                </a>
                <a href="https://wa.me/message/6CIXDFJJ6O7UK1" target="blank">
                  <i className="fa-brands fa-whatsapp fs-2 text-white ms-3"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-4 mt-sm-3">
              <div className="accounts">
                <div className="accounts">
                  <h5 className="text-white text-center text-foot">سجل الان</h5>
                  <div className="buttons d-flex align-items-center justify-content-center">
                    <Link
                      to="/login"
                      className="btn button btn-outline-light ms-2  "
                    >
                      سجل الان
                    </Link>
                    <Link
                      to="/newAccount"
                      className="btn button btn-outline-light me-2"
                    >
                      حساب جديد
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
