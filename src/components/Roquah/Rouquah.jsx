import './Rouquah.css'
import slide from '../../images/slide-2.png'
import slide1 from '../../images/sss.png'
import slide2 from '../../images/sss-2.png'
import logo from '../../images/img-4.jpg'
import logo1 from '../../images/img-6.jpg'
import Loading from '../Loading/Loading'
import { useEffect, useState } from 'react'
const Rouquah = () => {
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
                        <div id="carouselExampleCaptions" className="carousel slide roquah">
                            <div className="carousel-indicators">
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleCaptions"
                                    data-bs-slide-to="0"
                                    className="active"
                                    aria-current="true"
                                    aria-label="Slide 1"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleCaptions"
                                    data-bs-slide-to="1"
                                    aria-label="Slide 2"
                                ></button>
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleCaptions"
                                    data-bs-slide-to="2"
                                    aria-label="Slide 3"
                                ></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={slide} className="d-block w-100" alt="..." />
                                    <div className="carousel-caption d-none d-md-block"></div>
                                </div>
                                <div className="carousel-item">
                                    <img src={slide1} className="d-block w-100" alt="..." />
                                    <div className="carousel-caption d-none d-md-block"></div>
                                </div>
                                <div className="carousel-item">
                                    <img src={slide2} className="d-block w-100" alt="..." />
                                    <div className="carousel-caption d-none d-md-block"></div>
                                </div>
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon bg-primary"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon bg-primary"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="text bg-dark p-4 ">
                            <div className="container">
                                <h3 className='text-center  text-white my-3 '>رؤيتنا </h3>
                                <div className="row  ">
                                    <div className="col-lg-6 bg-black p-2 text-center rounded-3 d-flex align-items-center justify-content-center">
                                        <p className='text-white'>
                                            يعمل متجر ينابيع العطور والتجميل على توفير العديد من العروض الخاصة والتخفيضات على المنتجات الفاخرة التي يقدمها، وذلك بهدف توفير قيمة عالية للعملاء.
                                            يمكن للعملاء الاطلاع على العروض الحالية والتخفيضات  من خلال الاتصال بفريق خدمة العملاء. وتشمل العروض الخاصة عادةً تخفيضات على المنتجات المحددة، أو عروض شراء واحد والحصول على المنتج الثاني بسعر مخفض، أو عروض الهدايا الخاصة بالمناسبات الخاصة.
                                            يعتبر التسوق خلال فترات العروض الخاصة فرصة رائعة للعملاء للحصول على المنتجات الفاخرة بأسعار مخفضة، والتمتع بخدمة عملاء مميزة واستشارة مخصصة لتحديد العطور والمستحضرات التي تناسب احتياجاتهم الفريدة.
                                            يمكن للعملاء الاطلاع على العروض الحالية والتخفيضات  عند التواصل مع فريق خدمة العملاء، ويمكنهم الاستفادة من هذه الفرص لتحديث مجموعتهم من العطور والمستحضرات الفاخرة بأسعار مخفضة.
                                        </p>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center justify-content-center">
                                        <img src={logo} alt="" className=' my-md-2' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text bg-dark p-4 ">
                            <div className="container">
                                <h3 className='text-center  text-white my-3 '>مايمزنا </h3>

                                <div className="row  ">
                                    <div className="col-lg-6 d-flex align-items-center justify-content-center">
                                        <img src={logo1} alt="" className=' my-md-2' />
                                    </div>
                                    <div className="col-lg-6 bg-black p-2 text-center rounded-3 d-flex align-items-center justify-content-center">
                                        <p className='text-white'>
                                            يعمل متجر ينابيع العطور والتجميل بخبرات عاليه
                                            على توفير العديد من العروض الخاصة  والتخفيضات على المنتجات  والماركات الفاخرة التي يقدمها، وذلك بهدف توفير قيمة عالية للعملاء.

                                            يمكن للعملاء الاطلاع على العروض الحالية والتخفيضات  من خلال الاتصال بفريق خدمة العملاء. وتشمل العروض الخاصة عادةً تخفيضات على المنتجات المحددة، أو عروض شراء واحد والحصول على المنتج الثاني بسعر مخفض، أو عروض الهدايا الخاصة بالمناسبات الخاصة.

                                            يعتبر التسوق خلال فترات العروض الخاصة فرصة رائعة للعملاء للحصول على المنتجات الفاخرة بأسعار مخفضة، والتمتع بخدمة عملاء مميزة واستشارة مخصصة لتحديد العطور والمستحضرات التي تناسب احتياجاتهم الفريدة.

                                            يمكن للعملاء الاطلاع على العروض الحالية والتخفيضات  عند التواصل مع فريق خدمة العملاء، ويمكنهم الاستفادة من هذه الفرص لتحديث مجموعتهم من العطور والمستحضرات الفاخرة بأسعار مخفضة.


                                            #مايمزنا
                                            <br />
                                            <br />
                                            1 توصيل الطلب بنفس اليوم داخل صنعاء وبااسرع وقت

                                            <br />
                                            <br />
                                            2 توصيل لجميع للمحافظات
                                            <br />
                                            <br />
                                            3 طرق دفع عديده
                                            <br />
                                            <br />
                                            4 لوحة التحكم سهله وسلسه
                                            <br />
                                            <br />
                                            5 جديدنا وعروضنا مستمره طوال السنه
                                            <br />
                                            <br />
                                            6 عطرك ماركه بأقل سعر
                                            <br />
                                            <br />
                                            7 مصداقيه بي العمل وتوضيح تفاصيل كل منتج تحته
                                            <br />
                                            <br />
                                            8   خمسه اعوام خبره في العمل
                                            وتحسينه
                                            <br />
                                            <br />
                                            لسنا الوحدون ولكننا متميزن
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
};

export default Rouquah;