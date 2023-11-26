import React, { useEffect, useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router";

const Form = () => {
  const Navigate=useNavigate();
  const [formData, SetFormData] = useState({
    Name: "",
    UserName: "",
    Email: "",
    Mobile: "",
    Check: false,
  }
);

  const [errorHandle, setErrorHandler] = useState({});
  const [formValues, setFormValues] = useState([]);
 
  

  const submitHandler = (event) => {
    event.preventDefault();
    setFormValues((prevFormValues) => [...prevFormValues, formData.Name]);
    const validationError = {};

    if (!formData.Name.trim()) {
      validationError.Name = "Name Is Required";
    }
    if (!formData.UserName.trim()) {
      validationError.UserName = "Username Is Required";
    }
    if (!formData.Email.trim()) {
      validationError.Email = "Email Is Required";
    } else if (!/\S+@\S\S\S\S\S\.\S\S\S+/.test(formData.Email)) {
      validationError.Email = "Email Is not valid";
    }
    if (!formData.Mobile.trim()) {
      validationError.Mobile = "Mobile No Required";
    } else if (formData.Mobile.length < 10) {
      validationError.Mobile = "Mobile No is less than 10";
    }
    console.log(formData.Check);
    if (!formData.Check) {
      validationError.Check = "check box is not checke";
    }
    setErrorHandler(validationError);

    if (Object.keys(validationError).length === 0) {

      Navigate('/Page2')
      localStorage.setItem('formData', JSON.stringify(formData));

      
    }
  };

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    if (storedFormData) {
      SetFormData(storedFormData);
    }
  }, []);

    

  
  const changeHandler = (event) => {
    SetFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  };




  return (
    <form className="formDetail" onSubmit={submitHandler}>
      <div>
        <input
          type="text"
          name="Name"
          placeholder="Name"
          value={formData.Name}
          className= 'Ip'  
          onChange={changeHandler}
        />
        <div className="er">
          {errorHandle.Name && <p>{errorHandle.Name}</p>}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={formData.UserName}
          name="UserName"
          placeholder="UserName"
          className="Ip"
          onChange={changeHandler}
          
        />
        <div className="er">
          {errorHandle.UserName && <p>{errorHandle.UserName}</p>}
        </div>
      </div>
      <div>
        <input
          type="email"
          name="Email"
          placeholder="Email"
          className="Ip"
          value={formData.Email}
          onChange={changeHandler}
          
        />
        <div className="er">
          {errorHandle.Email && <p>{errorHandle.Email}</p>}
        </div>
      </div>
      <div>
        <input
          type="number"
          name="Mobile"
          value={formData.Mobile}
          placeholder="Mobile"
          className="Ip"
          onChange={changeHandler}
          
        />
        <div className="er">
          {errorHandle.Mobile && <p>{errorHandle.Mobile}</p>}
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          name="Check"
          placeholder="Check"
          value={formData.Check}
          onChange={changeHandler}
          
        />
        <span className="sp">Share my registration data with Superapp</span>
        <div className="er">
          {errorHandle.Check && <p style={{color:'red'}}>{errorHandle.Check}</p>}
        </div>
      </div>
      <button className="btn">SIGN UP</button>
    </form>
  );
};

export default Form;
