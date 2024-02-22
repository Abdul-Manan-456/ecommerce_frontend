import React from 'react';

const LoadingComp = () => {

    return (
        <div className="flex items-center justify-center h-[90vh]">
            <div className="lds-ripple w-48 h-48">
                <div></div>
                <div></div>
            </div>
        </div>

    );
};

export default LoadingComp;
