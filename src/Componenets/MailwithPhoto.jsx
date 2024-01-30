import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

class MailwithPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSent: false,
      imageData: null,
    };
    this.componentRef = React.createRef();
  }

  
  postHtmlToImage = async () => {
    try {
      const employeeName = localStorage.getItem("employeeName");
      const employeeDesignation = localStorage.getItem("employeeDesignation");
      const joiningdate = localStorage.getItem("joiningdate");

      const response = await axios.post(
        `https://localhost:44358/api/Conversion/HtmlContent?EmployeeName=${employeeName}&EmployeeDesignation=${employeeDesignation}&JoiningDate=${joiningdate}`,
        
        { withCredentials: true, headers: { "Content-Type": "text/plain" } }
      );
      console.log("Successfully posting HTML to image:", response.data);
      if(response.status ===200)
      {
        toast.success("Email Send Successfully");
      }
    } catch (error) {
      console.error("Error posting HTML to image:", error);
    }
  };
}

export default MailwithPhoto;
