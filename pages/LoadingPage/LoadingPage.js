import React from 'react';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../public/Loading/Animation - 1699433640858";

const LoadingPage = () => {
    return (
        <div className='h-screen'>
            <Lottie className='h-full' animationData={groovyWalkAnimation} loop={true} />
        </div>
    );
};

export default LoadingPage;