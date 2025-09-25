import React from 'react';
import styles from './JobOffers.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';

const jobData=[
    {
    icon:'/images/camera.png',
    title:'Camera & Video Editing',
    description:'Bring stroies to life with your camera and edting skills - join our creative team.',
},{
    icon:'/images/promotion.png',
    title:'Marketing',
    description:'Help us reach more people with creative marketing ideas and smart strategies.',
},{
    icon:'/images/pen.png',
    title:'Graphic Design',
    description:'Turn ideas into visuals that inspire - be a part of our design team.',
},{
    icon:'/images/setting.png',
    title:'Operation',
    description:'Keep everythin running smoothly behind the scenes and make success happen.',
},{
    icon:'/images/megaphone.png',
    title:'PR',
    description:'Build strong connections and represent our brand with creativity and passion.',
},{
    icon:'/images/monitor.png',
    title:'Sales',
    description:'Turn opportunities into partnerrships - join our sales team and grow with us.',
},{
    icon:'/images/programming.png',
    title:'Web Development',
    description:'Build and improve digital experiences that people love to use.',
},{
    icon:'/images/user.png',
    title:'HR',
    description:'Lead creative campaigns and guid the team to make real impact.',
},{
    icon:'/images/line-graph.png',
    title:'Marketing Manager',
    description:"Shape our team's culture and help talents grow in the right place.",
},];

const JobCard = ({ icon, title, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/forms', { state: { jobt: title } });
  };

  return (
    <div className={styles.jobCard} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className={styles.jobIcon}>
        <img src={icon} alt={`${title} Icon`} />
      </div>
      <h3 className={styles.jobTitle}>{title}</h3>
      <p className={styles.jobDescription}>{description}</p>
    </div>
  );
};


const JobOffers = () => {
  return (
    
<div className={styles.jobOffersContainer}>
    
  <h1 className={styles.jobOffersHeading}>Job Offers</h1>
  <p className={styles.jobOffersSubheading}>Ready for your next adventure?</p>
  <p className={styles.jobOffersSubheading2}>Explore our job opportunities and be part of the team.</p>

  <div className={styles.jobOffersList} >
    {jobData.map((job, index) => (
      <JobCard key={index} {...job} />
    ))}
  </div>
  
</div>

  );
};

export default JobOffers;







