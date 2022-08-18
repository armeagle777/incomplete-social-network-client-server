import React from 'react';
import Social from '../../../src/assets/images/social1.png';
import homeStyles from './home.module.css';

const Home = () => {
    return (
        <div className={homeStyles.homePageContainer}>
            <div className={homeStyles.homeHeader}>
                <img
                    src= { Social }
                    alt="" />
            </div>
            <div className={homeStyles.left}>
                Left
            </div>
            <div className={homeStyles.content}>
                Content
            </div>
        </div>
    )
}

export default Home;
