import React from 'react';
import { css } from '@emotion/react';
import { PropagateLoader } from 'react-spinners';;

const Loading = () => {
    const override = css`

    margin: 0 auto;
    border-color: red;
  `;

    return (
        <div className="loading  d-flex align-items-center justify-content-center " style={{ height: "100vh" }} >
            <PropagateLoader color={'#36D7B7'} css={override} size={25} />
        </div>
    );
};

export default Loading;