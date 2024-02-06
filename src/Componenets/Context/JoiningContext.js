import React, { createContext, useContext, useState } from 'react';

export const JoiningContext = createContext();

export const JoiningProvider = ({ children }) => {
  const [joiningData, setJoiningData] = useState({});

  const updateFormData = (values) => {
    console.log('Updating form data with values:', values);

    const updatedData = { ...values };

    localStorage.setItem("employeeName", updatedData.employeeName);
    localStorage.setItem("employeeDesignation", updatedData.employeeDesignation);
    localStorage.setItem("joiningdate", updatedData.joiningdate);

    if ('employeePhoto' in values && values.employeePhoto) {
      convertFileToBase64(values.employeePhoto, (base64String) => {
        updatedData.employeePhoto = base64String; 
        localStorage.setItem("employeePhoto", base64String);
        console.log('employeePhoto in context', base64String);
      });
    }
    
    setJoiningData(updatedData);
    console.log('Form data updated successfully:', updatedData);
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
