
import { useEffect, useState } from 'react'
import Loading from "../../Loading/Loading";
const ForgetPass = () => {
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
                    <section>
                        <div className="container">
                            <div className="col-lg-12">

                                <label for="inputEmail4" className="form-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" />
                            </div>
                            <a className="btn btn-primary mt-5">Send Code</a>
                        </div>
                    </section>
            }
        </>
    )
}

export default ForgetPass