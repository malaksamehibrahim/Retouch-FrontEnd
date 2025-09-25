import React, { useState } from 'react';
import styles from './Forms.module.css';
import { IoIosContact } from 'react-icons/io';
import { MdOutlineMail } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import { FaUniversity } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Forms = () => {
  const universitys = ['MSA', 'MUST', 'CSC', 'AUC', 'Other'];
  const [values, setValues] = useState({
    name:'',
    email:'',
    phone:'',
    university:'',
    cv:''
  })
  const handelChanges = (e) =>{
     setValues({ ...values, [e.target.name]: e.target.value });
  }
  const handelSubmit = (e) =>{
    e.preventDefault()
    console.log(values)
  }
  // const filteredUniversitys = universitys.filter(opt =>
  //   opt.toLowerCase().includes(search.toLowerCase())
  // );
const location = useLocation();
const jobt = location.state?.jobt;

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handelSubmit}>

        {/* <h1>{jobt ? `Apply for ${jobt} intern` : "Apply for a jobt"}</h1> */}

        <h1 className={styles.headingWord}>
          {jobt ? (
            <>
              Apply for <span className={styles.jobTitle}>{jobt}</span> job
            </>
          ) : (
            "Apply for a Job"
          )}
        </h1>
        <div className={styles.nameInput}>
          <div className={styles.inputHeader}>
            {/* <img src="" alt="contact-icon" /> */}
            <IoIosContact className={styles.lableIcon}/>
            <label htmlFor='name'>Full Name:</label>
          </div>
          <input type="text" placeholder='Name' name="name" id="name" 
          onChange={(e) => handelChanges(e)} required value={values.name}/>
        </div>

        <div className={styles.emailInput}>
          <div className={styles.inputHeader}>
            {/* <img src="" alt='email-icon'/> */}
              <MdOutlineMail className={styles.BsTelephonelableIcon}/>
            <label htmlFor='email'>Email Address:</label>
          </div>
          <input type="email" placeholder='EX: example@gmail.com' name='email' id='email' 
          onChange={(e) => handelChanges(e)} required value={values.email}/>
        </div> 

        <div className={styles.phoneInput}>
          <div className={styles.inputHeader}>
            {/* <img src="" alt='phone-icon'/> */}
            <BsTelephone className={styles.lableIcon}/>
            <label htmlFor='phone'>Phone Number:</label>
          </div>
          <input type='text' placeholder='Phone Number' name="phone" id="phone" 
          onChange={(e) => handelChanges(e)} required value={values.phone}/>
        </div>

        <div className={styles.universityInput}>
          <div className={styles.inputHeader}>
            {/* <img src="" alt='university-icon'/> */}
            <FaUniversity className={styles.lableIcon}/>
            <label htmlFor='university'>Select Your University:</label>
          </div>
          <input type="email" placeholder='University' name="university" id="university" 
          onChange={(e) => handelChanges(e)}/>
        </div>

        <div className={styles.cvInput}>
          <div className={styles.inputHeader}>
            {/* <img src="" alt='phone-icon'/> */}
            <BsTelephone className={styles.lableIcon}/>
            <label htmlFor='cv'>Upload Your CV</label>
          </div>
          <input type='file' placeholder='CV' name="cv" id="cv" 
          onChange={(e) => handelChanges(e)}/>
        </div>
        <button className={styles.submitButton}>Submit</button>
        <button className={styles.cancelButton}>Cancel</button>
        </form>
      </div> 
  );
};

export default Forms;