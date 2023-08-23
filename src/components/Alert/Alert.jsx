import { useState, useEffect } from 'react';
function AlertComponent() {
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        setShowAlert(true);
    }, []);
    return (
        <div>
            {showAlert && (
                <div className="alert bg-dark text-white ">
                    <span className="close fs-1 d-flex align-items-center justify-content-center" onClick={() => setShowAlert(false)}>
                        &times;
                    </span>
                    <h3 className='text-center '>خصومات خصم خاص لتجار الجملة</h3>
                </div>
            )}

        </div>
    );
}
export default AlertComponent;