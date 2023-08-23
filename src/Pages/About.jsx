import ServicesSlider from "../components/Services/ServicesSlider";
import about from "../../src/images/img-2.jpg";
import about_1 from "../../src/images/img-3.jpg";
import about_2 from "../../src/images/img-4.jpg";
import about_3 from "../../src/images/img-7.jpg";
import speical from '../images/par-6.jpg';
import speical1 from '../images/parfan-1.jpeg';
import speical2 from '../images/par-1.jpg';
import speical3 from '../images/par-10.jpg';
import speical4 from '../images/par-3.jpg';
import speical5 from '../images/par-9.jpg';
import speical6 from '../images/par-8.jpg';
import logo1 from '../images/img-6.jpg'
import '../App.css';
import Loading from "../components/Loading/Loading";
import { useEffect, useState } from "react";
import AboutSlider from "./AboutSlider";
const About = () => {
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
            <AboutSlider />
            <div className="about bg-black p-2">
              <div className="head bg-dark p-2">
                <h3 className="text-center text-warning my-2 ">من نحن</h3>
                <p className="text-white pragraph d-flex align-items-center justify-content-center  text-center">
                  ينابيع العطور والتجميل هو متجر الكتروني متخصص في بيع العطور والتجميل للماركات والبراندات العالمية، حيث يوفر لعملائه تجربة فريدة ومتميزة في عالم العطور والتجميل. يسعى متجر ينابيع العطور والتجميل إلى توفير مجموعة واسعة من العطور الفاخرة والنادرة والمفضلة لدى العديد من الناس، بما في ذلك العطور العربية والعصريه  والعطور الغربية الحديثة. كما يوفر المتجر أيضًا مجموعة من المستحضرات الجمالية الفاخرة، مثل مستحضرات العناية بالبشرة والشعر والمكياج والعناية بالجسم. يتميز متجر ينابيع العطور والتجميل بتجربة تسوق مريحة وممتعة، حيث يتم تصميم المتجر بشكل جذاب وفخم ليوفر للعملاء جوًا من الرفاهية والاسترخاء. كما يوفر المتجر خدمات الاستشارة المخصصة للعملاء، حيث يمكن للعملاء الحصول تفاصيل المنتجات اسفلها
                  والمستحضرات الجمالية التي تناسب أسلوب حياتهم واحتياجاتهم الفريدة. يولي متجر ينابيع العطور والتجميل اهتمامًا كبيرًا بجودة وسعر  المنتجات التي يقدمها، حيث يتم اختيار المنتجات بعناية من بين أفضل الماركات العالمية، وذلك لضمان السعر  الجودة والمتانة والأداء المطلوب للمنتجات. #عطرك_ماركه_بااقل_سعر
                  كما يتم توفير المنتجات بأسعار تنافسية ومعقولة، حيث يسعى المتجر إلى توفير قيمة عالية للعملاء دون المساومة على الجودة. بشكل عام، يعد متجر ينابيع العطور والتجميل وجهة مثالية للعملاء الذين يبحثون عن تجربة تسوق مميزة وفريدة في عالم العطور والتجميل، حيث يوفر المتجر مجموعة واسعة من المنتجات الفاخرة
                  وجميع منتجات المتجر وارد دبي +
                  وارد السعودية  وكل منتج موضح اسفله جميع تفاصيله
                  بجودات ممتازه واسعار مناسبه
                  وهنالك رابط منشور في الاعلى يوضح تفاصيل المنتج وجودته بي التفصيل
                  وهنالك  منشور خاص
                  🤩 بأاراء زبائننا
                </p>
              </div>
              <div className="text bg-dark p-4 ">
                <div className="container">
                  <div className="row  ">
                    <div className="col-lg-6 bg-black  rounded-3 d-flex align-items-center justify-content-center">
                      <p className='text-white'>
                        <h3 className="text-center text-warning ">
                          مايمزنا
                        </h3>
                        <br />
                        توصيل الطلب بنفس اليوم داخل صنعاء وبأسرع وقت

                        توصيل لجميع للمحافظات

                        <br />
                        طرق دفع عديده
                        <br />
                        جديدنا وعروضنا مستمره طوال السنه
                        <br />
                        عطرك ماركه بأقل سعر
                        <br />
                        مصداقيه  بالعمل وتوضيح تفاصيل كل منتج تحته
                        <br />
                        خمسه اعوام خبره في العمل
                        وتحسينه
                        <br />
                        لسنا الوحدون ولكننا متميزن                            </p>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center justify-content-center">
                      <img src={logo1} alt="" className='img-about my-md-2' />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text bg-dark p-4 ">
                <div className="container">
                  <div className="row  ">
                    <div className="col-lg-6 d-flex align-items-center justify-content-center">
                      <img src={about} alt="" className='img-about my-md-2' />
                    </div>
                    <div className="col-lg-6 bg-black  rounded-3 d-flex align-items-center justify-content-center">
                      <p className='text-white'>
                        ينابيع العطور والتجميل هو متجر الكتروني متخصص في بيع العطور والتجميل للماركات والبراندات العالمية، حيث يوفر لعملائه تجربة فريدة ومتميزة في عالم العطور والتجميل. يسعى متجر ينابيع العطور والتجميل إلى توفير مجموعة واسعة من العطور الفاخرة والنادرة والمفضلة لدى العديد من الناس، بما في ذلك العطور العربية والعصريه  والعطور الغربية الحديثة. كما يوفر المتجر أيضًا مجموعة من المستحضرات الجمالية الفاخرة، مثل مستحضرات العناية بالبشرة والشعر والمكياج والعناية بالجسم. يتميز متجر ينابيع العطور والتجميل بتجربة تسوق مريحة وممتعة، حيث يتم تصميم المتجر بشكل جذاب وفخم ليوفر للعملاء جوًا من الرفاهية والاسترخاء. كما يوفر المتجر خدمات الاستشارة المخصصة للعملاء، حيث يمكن للعملاء الحصول تفاصيل المنتجات اسفلها
                        والمستحضرات الجمالية التي تناسب أسلوب حياتهم واحتياجاتهم الفريدة. يولي متجر ينابيع العطور والتجميل اهتمامًا كبيرًا بجودة وسعر  المنتجات التي يقدمها، حيث يتم اختيار المنتجات بعناية من بين أفضل الماركات العالمية، وذلك لضمان السعر  الجودة والمتانة والأداء المطلوب للمنتجات. #عطرك_ماركه_بااقل_سعر
                        كما يتم توفير المنتجات بأسعار تنافسية ومعقولة، حيث يسعى المتجر إلى توفير قيمة عالية للعملاء دون المساومة على الجودة. بشكل عام، يعد متجر ينابيع العطور والتجميل وجهة مثالية للعملاء الذين يبحثون عن تجربة تسوق مميزة وفريدة في عالم العطور والتجميل، حيث يوفر المتجر مجموعة واسعة من المنتجات الفاخرة
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default About;
