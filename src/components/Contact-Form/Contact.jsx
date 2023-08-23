import "./Contact.css"
import { useEffect, useState } from 'react'
import Loading from "../Loading/Loading";
const Contact = () => {
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
          <div>
            <div className="contact bg-dark pt-4">
              <div className="container">
                <h3 className="text-center my-4 text-white fw-bold"> للتواصل معنا </h3>
                <div className="row d-flex align-items-center justify-content-center  text-center">
                  <div className="col-lg-4  my-md-2  onee">
                    <div className="facebook d-flex align-items-center justify-content-center   ">
                      <a className="text-center fs-5 text-decoration-none " href="https://m.facebook.com/groups/1239016770086851/?ref=share&mibextid=NSMWBT" target='blank'>
                        <span className="text-white">
                          تواصل علي  الفيس بوك
                        </span>
                        <i className="fa-brands fa-facebook fs-2 text-primary me-1 "></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4  my-md-2 onee">
                    <div className="facebook d-flex align-items-center justify-content-center ">
                      <a className="text-center fs-5 text-decoration-none " href="https://www.instagram.com/yanabea_perfumes_and_beauty_/" target='blank'>
                        <span className="text-white">
                          تواصل علي  الانستجرام
                        </span>
                        <i className="fa-brands fa-instagram fs-2 text-warning me-1 "></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 my-md-2 onee">
                    <div className="facebook d-flex align-items-center justify-content-center ">
                      <a className="text-center fs-5 text-decoration-none " href="https://wa.me/message/6CIXDFJJ6O7UK1" target='blank'>
                        <span className="text-white">
                          تواصل علي  الواتساب
                        </span>
                        <i className="fa-brands fa-whatsapp fs-2 text-success me-1"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 my-md-2 onee">
                    <div className="facebook d-flex align-items-center justify-content-center ">
                      <a className="text-center fs-5 text-decoration-none " href="https://t.me/yanabea_perfumes" target='blank'>
                        <span className="text-white">
                          تواصل علي  التلجرام
                        </span>
                        <i className="fa-brands fa-telegram fs-2 text-info me-1"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 mt-3 onee">
                    <div className="facebook d-flex align-items-center justify-content-center ">
                      <a className="text-center fs-5 text-decoration-none  " href="https://vm.tiktok.com/ZSennfTa" target='blank'>
                        <span className="text-white">
                          تواصل علي  التيك توك
                        </span>
                        <i className="fa-brands fa-tiktok fs-2 text-black me-1"></i>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-5">
                    <h4 className="text-white">تواصل معنا علي رقم+967778133390
                    </h4>
                  </div>
                  <div className="col-lg-6 mt-5">
                    <h4 className="text-white">راسلنا علي الايمال الخاص بنا <span className="text-info">nfo@yanabieperfumes.com</span>
                    </h4>
                  </div>
                  <div className="col-lg-6 mt-5">
                    <h4 className="text-info">
                      خدمة توصيل للمنازل
                      واسعار مناسبة
                      ومنتجات اصلية توريد دبي
                    </h4>
                  </div>
                </div>
              </div>

            </div>
          </div>
      }
    </>
  );
};

export default Contact;
