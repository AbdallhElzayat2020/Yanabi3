import "../Navside/SideNav";

const SideNav = () => {
  return (
    <>
      <div className="top black shadow-lg ">
        <div className="container d-flex align-items-center justify-content-between">
          <div className=" text-white p-2 head">
            <span>967778133390</span>
            <i className="fa-solid fa-phone me-2"></i>
          </div>
          <div className=" text-white p-2 head ">
            <span>info@yanabieperfumes.com</span>
            <i className="fa-solid fa-envelope me-2"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
