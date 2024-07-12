import React, { useState } from "react";
import SignUp from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signup, signupGoogle } from "../../../redux/actions/auth";

const InitState = {
    firstName: "",
    lastName: "",
    userName: "", // Added userName field
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // Default role is set to 'user'
    phoneNumber: ''
};

function Signup() {
    const currentPath = window.location.pathname;
    console.log(currentPath);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sForm, setsForm] = useState(InitState);
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "firstName" || name === "lastName") {
            const firstName = name === "firstName" ? value : sForm.firstName;
            const lastName = name === "lastName" ? value : sForm.lastName;
            const userName = `${firstName}${lastName}`;
            setsForm({
                ...sForm,
                [name]: value,
                userName: userName.toLowerCase() // Optionally convert to lowercase
            });
        } else {
            const updatedValue = type === 'checkbox' ? (checked ? 'owner' : 'user') : value;
            setsForm({
                ...sForm,
                [name]: updatedValue
            });
        }
    };

    function handleGoogleLoginSuccess(tokenResponse) {
        const accessToken = tokenResponse.access_token;
        dispatch(signupGoogle(accessToken, navigate));
        setShowModal(true); // Open modal on successful Google login
    }

    function handleModalSubmit() {
        setShowModal(false); // Close modal
        // Validate form inputs if needed
        login();
       // Dispatch signup action with all form data
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        
        // Check form validation conditions
        if (sForm.userName !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" && sForm.phoneNumber !== ""
            && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
            setShowModal(true); // Open modal to collect additional data
        }
    }

    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

    return (
        <div className={SignUp.loginContainer}>
            <div className={SignUp.loginContainerv2}>
                <h1>Create your account</h1>

                <div className={SignUp.inputContainer}>
                    <label>Username</label>
                    <input name="userName" value={sForm.userName} onChange={handleChange} placeholder="Enter your username" type="text"/>
                </div>
                <div className={SignUp.inputContainer}>
                    <label>Email</label>
                    <input name="email" onChange={handleChange} placeholder="Enter your email" type="email"/>
                </div>

                <div className={SignUp.inputContainer}>
                    <label>Password</label>
                    <input name="password" onChange={handleChange} placeholder="Enter your password" type="password"/>
                </div>

                <div className={SignUp.inputContainer}>
                    <label>Confirm Password</label>
                    <input name="confirmPassword" onChange={handleChange} placeholder="Retype your password" type="password"/>
                </div>

                <div className={SignUp.inputContainer}>
                    <label>Phone Number</label>
                    <input name="phoneNumber" onChange={handleChange} placeholder="Enter your phone number" type="number"/>
                </div>

                <div className={SignUp.inputContainer}>
                    <label>Role</label>
                    <input
                        name="role"
                        type="checkbox"
                        onChange={handleChange}
                    />    
                </div>

                <div className={SignUp.footerContainer}>
                    <div>
                        Already Signed Up? <Link to="/account/login">Login</Link>
                    </div>
                    <div>
                        <Link to="/account/forgotpassword">Forgot Password?</Link>
                    </div>
                </div>

                <button onClick={handleOnSubmit} className={SignUp.loginBTN}>REGISTER</button>
                <span className={SignUp.or}>or</span>
                <button onClick={() => handleOpenModal()} className={SignUp.googleBTN}>
                    <i className="fa-brands fa-google"></i>  Sign up with Google
                </button>
            </div>

            {showModal && (
                <div className={SignUp.modalOverlay}>
                    <div className={SignUp.modalContainer}>
                        <div className={SignUp.modalContent}>
                            <h2>Additional Information</h2>
                            <div className={SignUp.inputContainer}>
                            <label>magazine owner ?</label>
                            <input
                                name="role"
                                type="checkbox"
                                onChange={handleChange}
                                required
                            />    
                        </div>
                            <div className={SignUp.inputContainer}>
                                <label>Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    value={sForm.phoneNumber}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                            <div className={SignUp.modalButtonContainer}>
                                <button onClick={handleModalSubmit}>Sign up with Google</button>
                                <br></br>
                                <button onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signup;
