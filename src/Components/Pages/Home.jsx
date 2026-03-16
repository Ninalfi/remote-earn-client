import React from 'react';
import BannerSlider from './BannerSlider';
import Review from './Review';
import PostJob from './PostJob';
import ForApplicants from './ForApplicants';
import Popularcat from './Popularcat';
import Featuredjobs from './Featuredjobs';
import Workers from './Workers';
import Process from './Process';

const Home = () => {

    return (
        <div>
            <BannerSlider></BannerSlider>
             <PostJob></PostJob>
            <Popularcat></Popularcat>
           
            <ForApplicants></ForApplicants>
            <Featuredjobs></Featuredjobs>
            <Workers></Workers>
            <Process></Process>
            <Review></Review>
            
        </div>
    );
};

export default Home;