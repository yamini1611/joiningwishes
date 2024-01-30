import React, { useState } from "react";
import { Form, Row, FloatingLabel, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Style/MainContent.css";
import { ToastContainer, toast } from "react-toastify";
import { useJoiningContext } from "./Context/JoiningContext";
import { useNavigate } from "react-router-dom";
import MailwithPhoto from "./MailwithPhoto";

const MainContent = () => {
  const [employeePhoto, setEmployeePhoto] = useState(null);
  const [fileSizeError, setFileSizeError] = useState(null);
  const { updateFormData } = useJoiningContext();
  const [FormSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size <= 2 * 1024 * 1024) {
        setEmployeePhoto(file);
        setFileSizeError(null);
        const reader = new FileReader();
        reader.onload = (e) => {};
        reader.readAsDataURL(file);
        setFieldValue("employeePhoto", file);
      } else {
        setFileSizeError(
          "File size exceeds 2 MB. Please choose a smaller file."
        );
      }
    }
  };
  const validationSchema = Yup.object().shape({
    employeeName: Yup.string().required("Employee Name is required"),
    employeeDesignation: Yup.string().required(
      "Employee Designation is required"
    ),
    joiningdate: Yup.string().required("Joining Date is required"),
  });
  const handleSubmit = async (values) => {
    
    try {
      updateFormData(values);
      setFormSubmitted(true);
      toast.success("Submitted Successfully, Mail will be sent shortly", {
        position: "top-right",
        autoClose: 3000,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const employeeName = localStorage.getItem("employeeName");
      const employeeDesignation = localStorage.getItem("employeeDesignation");
      const joiningdate = localStorage.getItem("joiningdate");
      const mailWithPhotoInstance = new MailwithPhoto();
  
      await mailWithPhotoInstance.postHtmlToImage(employeeName ,employeeDesignation ,joiningdate);
  
      setFormSubmitted(false);
      console.log(values);
      
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };
  
  return (
    <div className="bg-container">
      <div className="container-fluid vh-100">
        <div className="row h-100 justify-content-center">
          <div className="col-12 pt-4 text-center">
            <img
              src="https://egj2dd.p3cdn1.secureserver.net/wp-content/uploads/2017/06/logo-white.png"
              alt="CGVAK LOGO"
            ></img>
          </div>
          <div className="center-form p-5  mx-auto" id="form">
            <div className="col-12 ">
              <Formik
                initialValues={{
                  employeeName: "",
                  employeeDesignation: "",
                  employeeID: "",
                  employeePhoto: null,
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleBlur, setFieldValue, handleSubmit }) => (
                  <Form className="mt-2" onSubmit={handleSubmit}>
                    <h3 className="text-center" id="new-Joinee">
                      New Joinee Detail
                    </h3>
                    <Row className="mb-3">
                      <FloatingLabel
                        label="Enter Employee Name"
                        className="ps-1 mb-3"
                      >
                        <Field
                          type="text"
                          name="employeeName"
                          as={Form.Control}
                          placeholder="Name"
                        />
                        <ErrorMessage
                          id="error"
                          name="employeeName"
                          component="div"
                          className="error-message"
                        />
                      </FloatingLabel>
                    </Row>
                    <Row className="mb-3">
                      <FloatingLabel
                        label="Enter Employee Designation"
                        className="ps-1 mb-3"
                      >
                        <Field
                          type="text"
                          name="employeeDesignation"
                          as={Form.Control}
                          placeholder="Designation"
                        />
                        <ErrorMessage
                          id="error"
                          name="employeeDesignation"
                          component="div"
                          className="error-message"
                        />
                      </FloatingLabel>
                    </Row>
                    <Row className="mb-3">
                      <FloatingLabel
                        label="Select Joining Date"
                        className="ps-1 mb-4"
                      >
                        <Field
                          type="date"
                          name="joiningdate"
                          as={Form.Control}
                        />
                        <ErrorMessage
                          id="error"
                          name="joiningdate"
                          component="div"
                          className="error-message"
                        />
                      </FloatingLabel>
                    </Row>
                    <Row className="mb-3">
                      <FloatingLabel
                        label="Upload Employee Photo (optional)"
                        className="ps-1 mb-3"
                      >
                        <Form.Control
                          type="file"
                          placeholder="Employee Photo (optional)"
                          id="employeePhotoInput"
                          onChange={(event) =>
                            handleFileChange(event, setFieldValue)
                          }
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          id="error"
                          name="employeePhoto"
                          component="div"
                          className="error-message"
                        />
                      </FloatingLabel>
                      {fileSizeError && (
                        <div style={{ color: "red", marginTop: "5px" }}>
                          {fileSizeError}
                        </div>
                      )}
                    </Row>
                    <div className="text-center">
                      <Button variant="danger" type="submit" name="Submit">
                        {FormSubmitted ? "Send Email" : "Submit"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
