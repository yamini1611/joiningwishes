import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ApiPath } from "./Context/utility";

class PostContent extends Component {
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
      const API = ApiPath;
      const response = await axios.post(
        `${API}/HtmlContent?EmployeeName=${employeeName}&EmployeeDesignation=${employeeDesignation}&JoiningDate=${joiningdate}`,
        
        { withCredentials: true, headers: { "Content-Type": "text/plain" } }
      );
      console.log("Successfully posting HTML to image:", response.data);
      if(response.status ===200)
      {
        toast.success("Email Send Successfully");
        localStorage.clear();
        window.location.reload()
      }
    } catch (error) {
      console.error("Error posting HTML to image:", error);
    }
  };
  postHtmlToImagewithImage = async () => {
    try {
      const employeeName = localStorage.getItem("employeeName");
      const employeeDesignation = localStorage.getItem("employeeDesignation");
      const joiningdate = localStorage.getItem("joiningdate");
      const employeePhoto = localStorage.getItem("employeePhoto");
      const API = ApiPath;
      console.log("employeePhoto in postHtmlToImagewithImage" ,employeePhoto);
      const details = {
        EmployeeName: employeeName,
        EmployeeDesignation: employeeDesignation,
        JoiningDate: joiningdate,
        EmployeePhoto: employeePhoto,
      };
  
      const response = await axios.post(
          `${API}/HtmlContentWithImage`,
        details,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }, 
        }
      );
  
      console.log("Successfully posting HTML to image:", response.data);
      if (response.status === 200) {
        toast.success("Email Send Successfully");
        localStorage.clear();
        window.location.reload()
      }
    } catch (error) {
      console.error("Error posting HTML to image:", error);
    }
  }  
}

export default PostContent;
