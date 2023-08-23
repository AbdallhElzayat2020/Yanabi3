import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyLinkButton = () => {
    const currentURL = window.location.href;
    const [isCopied, setIsCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(currentURL.replace("/#/", "/"))
        console.log(currentURL)
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };
    return (
        <>
            <button className='btn btn-danger mt-2' onClick={handleCopy}>انسخ الرابط</button>
            {isCopied && <div className="alert text-danger">تم نسخ الرابط بنجاح!</div>}
        </>
    );
};

export default CopyLinkButton;