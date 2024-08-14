import React from 'react';
import './App.css';
import profilePic from './IMG_5739.JPG';
import NavEmp from './components/navemp';


function AboutEmp(){
    return (
        <>
        <NavEmp style={{ width: '100vw' }}></NavEmp>

        <main>
        <section class="profile">
            <img src={profilePic} class="nominee-picture" />
            <div class="profile-info">
                <h1>Samantha Smith</h1>
                <p class="title">Senior Product Designer @ ITWorx Inc</p>
                <p class="followers">1.3k followers | 3.2k following</p>
            </div>
        </section>
        <section class="nomination">
            <h2>Nomination Reason</h2>
            <p>Samantha has been a key contributor to the new product launch. Her attention to detail and user-centric design approach have not only improved the overall quality of the product, but also helped the team meet the tight deadline. She is always willing to help others and has provided valuable feedback to her peers. Her positive attitude and work ethic make her an excellent role model for the team.</p>
        </section>
        <section class="achievements">
            <h2>Achievements</h2>
            <ol>
                <li>Improved the product's usability by 25% through redesigning the onboarding process.</li>
                <li>Reduced the app load time by 20% by optimizing the code.</li>
                <li>Conducted 15 user interviews and analyzed the feedback to identify the most common issues.</li>
            </ol>
        </section>







        </main>
        </>
        
        
    );
};
export default AboutEmp;