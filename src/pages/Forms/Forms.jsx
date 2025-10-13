import React, { useState } from 'react';
import Select from 'react-select';
import styles from './Forms.module.css';
import { IoIosContact } from 'react-icons/io';
import { MdOutlineMail } from 'react-icons/md';
import { BsTelephone } from 'react-icons/bs';
import { FaUniversity } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const Forms = () => {
  const universityOptions = [
    { value: 'MSA', label: 'MSA' },
    { value: 'MUST', label: 'MUST' },
    { value: 'CSC', label: 'CSC' },
    { value: 'AUC', label: 'AUC' },
    { value: 'Other', label: 'Other' },
  ];

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    otherUniversity: '',
    cv: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const jobt = location.state?.jobt;

  const handleChanges = (e) => {
    const { name, type, value, files } = e.target;
    setValues({
      ...values,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleUniversityChange = (selected) => {
    setValues({
      ...values,
      university: selected ? selected.value : '',
      otherUniversity: '',
    });
  };

  const handleOtherUniversityChange = (e) => {
    setValues({
      ...values,
      otherUniversity: e.target.value,
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setValues({
        ...values,
        cv: e.dataTransfer.files[0],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.headingWord}>
          {jobt ? (
            <>
              Apply for <span className={styles.jobTitle}>{jobt}</span> job
            </>
          ) : (
            "Apply for a Job"
          )}
        </h1>

        {/* Full Name */}
        <div className={styles.inputBlock}>
          <div className={styles.inputHeader}>
            <IoIosContact className={styles.labelIcon} />
            <label htmlFor="name">Full Name:</label>
          </div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            value={values.name}
            onChange={handleChanges}
            required
          />
        </div>

        {/* Email */}
        <div className={styles.inputBlock}>
          <div className={styles.inputHeader}>
            <MdOutlineMail className={styles.labelIcon} />
            <label htmlFor="email">Email Address:</label>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            value={values.email}
            onChange={handleChanges}
            required
          />
        </div>

        {/* Phone */}
        <div className={styles.inputBlock}>
          <div className={styles.inputHeader}>
            <BsTelephone className={styles.labelIcon} />
            <label htmlFor="phone">Phone Number:</label>
          </div>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter Your Phone Number"
            value={values.phone}
            onChange={handleChanges}
            required
          />
        </div>

        {/* University Select */}
        <div className={styles.inputBlock}>
          <div className={styles.inputHeader}>
            <FaUniversity className={styles.labelIcon} />
            <label htmlFor="university">Select your university:</label>
          </div>
          <Select
            options={universityOptions}
            placeholder="Select your university"
            value={universityOptions.find(opt => opt.value === values.university) || null}
            onChange={handleUniversityChange}
            isSearchable
            inputId="university"
            classNamePrefix="customSelect"
            styles={{
              control: (base, state) => ({
                ...base,
                width: '100%',
                height: 48,
                minHeight: 48,
                padding: 0,
                fontSize: 16,
                borderRadius: 8,
                borderColor: state.isFocused ? '#FFD600' : '#ccc',
                boxShadow: state.isFocused ? '0 0 0 1px #FFD600' : 'none',
                '&:hover': {
                  borderColor: state.isFocused ? '#FFD600' : '#ccc',
                },
              }),
              menu: (base) => ({
                ...base,
                fontSize: 16,
                borderRadius: 8,
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#FFF9E1' : '#fff',
                color: '#333',
                '&:active': {
                  backgroundColor: '#FFD600',
                },
              }),
            }}
          />
        </div>

        {/* Other University Input */}
        {values.university === 'Other' && (
          <div className={styles.inputBlock}>
            <div className={styles.inputHeader}>
              <FaUniversity className={styles.labelIcon} />
              <label htmlFor="otherUniversity">Enter your university:</label>
            </div>
            <input
              type="text"
              name="otherUniversity"
              id="otherUniversity"
              placeholder="Enter your university"
              value={values.otherUniversity}
              onChange={handleOtherUniversityChange}
              required
            />
          </div>
        )}

        {/* CV Upload */}
        <div
          className={`${styles.cvUploadSection} ${dragActive ? styles.dragActive : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <BsTelephone style={{ fontSize: 32, color: '#FFD600', marginBottom: 8 }} />
          <label htmlFor="cv" style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>
            Upload your CV:
          </label>
          <input
            type="file"
            name="cv"
            id="cv"
            accept=".pdf,.doc,.docx"
            onChange={handleChanges}
            style={{ marginBottom: 8 }}
          />
          <span style={{ fontSize: 15, color: '#888', marginBottom: 4 }}>
            Drop here to attach or upload
          </span>
          <span style={{ fontSize: 13, color: '#aaa' }}>Max size: 5GB</span>
        </div>

        {/* Buttons */}
        <button type="submit" className={styles.submitButton}>Submit</button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Forms;




// import React, { useState, useEffect } from 'react';
// import styles from './Forms.module.css';
// import { IoIosContact } from 'react-icons/io';
// import { MdOutlineMail } from 'react-icons/md';
// import { BsTelephone } from 'react-icons/bs';
// import { FaUniversity } from 'react-icons/fa';
// import { useLocation } from 'react-router-dom';
// import Select from 'react-select';

// const FormField = ({ icon: Icon, label, name, type = "text", value, onChange }) => (
//   <div className={styles.inputGroup}>
//     <div className={styles.inputHeader}>
//       <Icon className={styles.labelIcon} />
//       <label htmlFor={name}>{label}</label>
//     </div>
//     <input
//       type={type}
//       name={name}
//       id={name}
//       placeholder={label}
//       value={type === 'file' ? undefined : value}
//       onChange={onChange}
//       required={type !== 'file'}
//     />
//   </div>
// );

// const Forms = () => {
//   const [values, setValues] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     university: '',
//     otherUniversity: '',
//     cv: null,
//   });

//   const [universities, setUniversities] = useState([]);
//   const location = useLocation();
//   const jobt = location.state?.jobt;
//   const showOtherUniversity = values.university === 'Other';

//   useEffect(() => {
//     setUniversities(['MSA', 'MUST', 'CSC', 'AUC', 'Other']);
//   }, []);

//   const universityOptions = universities.map((uni) => ({
//     value: uni,
//     label: uni,
//   }));

//   const handleChanges = (e) => {
//     const { name, type, value, files } = e.target;
//     setValues({
//       ...values,
//       [name]: type === 'file' ? files[0] : value,
//     });
//   };

//   const handleUniversityChange = (selected) => {
//     setValues({
//       ...values,
//       university: selected?.value || '',
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(values);
//   };

//   const handleCancel = () => {
//     setValues({
//       name: '',
//       email: '',
//       phone: '',
//       university: '',
//       otherUniversity: '',
//       cv: null,
//     });
//   };

//   return (
//     <div className={styles.formContainer}>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <h1 className={styles.headingWord}>
//           {jobt ? (
//             <>Apply for <span className={styles.jobTitle}>{jobt}</span> job</>
//           ) : (
//             "Apply for a Job"
//           )}
//         </h1>

//         <FormField icon={IoIosContact} label="Full Name" name="name" value={values.name} onChange={handleChanges} />
//         <FormField icon={MdOutlineMail} label="Email Address" name="email" type="email" value={values.email} onChange={handleChanges} />
//         <FormField icon={BsTelephone} label="Phone Number" name="phone" value={values.phone} onChange={handleChanges} />


//         {/* University Dropdown */}
//         <div className={styles.inputGroup}>
//           <div className={styles.inputHeader}>
//             <FaUniversity className={styles.labelIcon} />
//             <label htmlFor="university">Select your university:</label>
//           </div>
//           <div className={styles.selectWrapper}>
//             <Select
//               options={universityOptions}
//               placeholder="Select your university"
//               value={universityOptions.find(opt => opt.value === values.university) || null}
//               onChange={handleUniversityChange}
//               isSearchable
//               classNamePrefix="customSelect"
//             />
//           </div>
//         </div>

//         {/* Conditional Input for Other University */}
//         {showOtherUniversity && (
//           <div className={styles.inputGroup}>
//             <div className={styles.inputHeader}>
//               <FaUniversity className={styles.labelIcon} />
//               <label htmlFor="otherUniversity">Enter your university:</label>
//             </div>
//             <input
//               type="text"
//               name="otherUniversity"
//               id="otherUniversity"
//               placeholder="Enter your university"
//               value={values.otherUniversity}
//               onChange={handleChanges}
//               required
//             />
//           </div>
//         )}

//         {/* CV Upload Section */}
//         <div className={styles.inputGroup}>
//           <div className={styles.inputHeader}>
//             <BsTelephone className={styles.labelIcon} />
//             <label htmlFor="cv">Upload Your CV:</label>
//           </div>
//           <div className={styles.uploadBox}>
//             <input
//               type="file"
//               name="cv"
//               id="cv"
//               onChange={handleChanges}
//               accept=".pdf,.doc,.docx"
//             />
//             <p className={styles.uploadText}>Drop here to attach or upload</p>
//             <p className={styles.uploadSize}>Max size: 5GB</p>
//             {values.cv && (
//               <p style={{ fontSize: '0.95rem', color: '#333', marginTop: '8px' }}>
//                 Selected file: {values.cv.name}
//               </p>
//             )}
//           </div>
//         </div>

//         <button type="submit" className={styles.submitButton}>Submit</button>
//         <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
//       </form>
//     </div>
//   );
// };

// export default Forms;

