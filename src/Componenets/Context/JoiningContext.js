import React, { createContext, useContext, useState } from 'react';

export const JoiningContext = createContext();

export const JoiningProvider = ({ children }) => {
    const [joiningData, setJoiningData] = useState({});
  
    const updateFormData = (values) => {
        console.log('Updating form data with values:', values);
      
        localStorage.setItem("employeeName", values.employeeName);
        localStorage.setItem("employeeDesignation", values.employeeDesignation);
        localStorage.setItem("joiningdate", values.joiningdate);
      
        if ('employeePhoto' in values && values.employeePhoto) {
          convertFileToBase64(values.employeePhoto, (base64String) => {
            localStorage.setItem("employeePhoto", base64String);
          });
        }
      
        setJoiningData(values);
        console.log('Form data updated successfully:', joiningData);
      };
      
    const convertFileToBase64 = (file, callback) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result.split(',')[1]); 
      };
      reader.readAsDataURL(file);
    };
  
    return (
      <JoiningContext.Provider value={{ joiningData, updateFormData }}>
        {children}
      </JoiningContext.Provider>
    );
  };
  
  

export const useJoiningContext = () => {
  return useContext(JoiningContext);
};
