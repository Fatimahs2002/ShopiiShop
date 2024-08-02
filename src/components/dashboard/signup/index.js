import React, { useState } from "react";
import SignUp from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signup, signupGoogle } from "../../../redux/actions/auth";

const InitState = {
    firstName: "",
    lastName: "",
    email: '',
    password: '',
    confirmPassword: '',
    userName: '' // Ensure this is initialized in state
};
<<<<<<< HEAD
  


=======
>>>>>>> 526bf28c527e0a0f5978f10cb14ae4843ea39ee4

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
<<<<<<< HEAD
    const [sForm,
        setsForm] = useState(InitState)

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }
=======
    const [sForm, setsForm] = useState(InitState);
    const [showModal, setShowModal] = useState(false);
>>>>>>> 526bf28c527e0a0f5978f10cb14ae4843ea39ee4

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "firstName" || name === "lastName") {
            const firstName = name === "firstName" ? value : sForm.firstName;
            const lastName = name === "lastName" ? value : sForm.lastName;
            const userName = `${firstName}${lastName}`;
            setsForm({
                ...sForm,
                [name]: value,
                userName: userName.toLowerCase()
            });
        } else {
            setsForm({
                ...sForm,
                [name]: value
            });
        }
    };
<<<<<<< HEAD
    const handleChange = (e) => setsForm({
        ...sForm,
        [e.target.name]: e.target.value
    });
=======
>>>>>>> 526bf28c527e0a0f5978f10cb14ae4843ea39ee4

    function handleGoogleLoginSuccess(tokenResponse) {
        const accessToken = tokenResponse.access_token;
        dispatch(signupGoogle(accessToken, navigate));
    }

    function handleOnSubmit(e) {
        e.preventDefault();
<<<<<<< HEAD
        
        // Check form validation conditions
        if (sForm.userName !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" 
            && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
            setShowModal(true); // Open modal to collect additional data
        if (sForm.firstName !== "" && sForm.lastName !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
            dispatch(signup(sForm,nagivate))
=======

        if (sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
            if (sForm.firstName && sForm.lastName && sForm.email) {
                // Here you might want to add more validation if needed
                setShowModal(true); // Open modal to collect additional data
            }
>>>>>>> 526bf28c527e0a0f5978f10cb14ae4843ea39ee4
        }
    }

    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

    return (
        <div className={SignUp.loginContainer}>
            <div className={SignUp.loginContainerv2}>
                <h1>Create your account</h1>

                <div className={SignUp.inputContainer}>
                    <label>FIRST NAME</label>
                    <input onChange={handleChange} name="firstName" placeholder="Enter your first name" type="text"/>
                </div>
                <div className={SignUp.inputContainer}>
                    <label>LAST NAME</label>
                    <input onChange={handleChange} name="lastName" placeholder="Enter your last name" type="text"/>
                </div>
                <div className={SignUp.inputContainer}>
                    <label>EMAIL</label>
                    <input onChange={handleChange} name="email" placeholder="Enter your email" type="email"/>
                </div>
                <div className={SignUp.inputContainer}>
                    <label>PASSWORD</label>
                    <input onChange={handleChange} name="password" placeholder="Enter your password" type="password"/>
                </div>
                <div className={SignUp.inputContainer}>
<<<<<<< HEAD
                    <label>Confirm Password</label>
                    <input name="confirmPassword" onChange={handleChange} placeholder="Retype your password" type="password"/>
                    <label>CONFIRM PASSWORD</label>
                    <input name="confirmPassword" onChange={handleChange} placeholder="retype your password" type="password"/>
=======
                    <label>CONFIRM PASSWORD</label>
                    <input onChange={handleChange} name="confirmPassword" placeholder="Retype your password" type="password"/>
>>>>>>> 526bf28c527e0a0f5978f10cb14ae4843ea39ee4
                </div>

                <div className={SignUp.footerContainer}>
                    <div>
                        Already Signed Up? <Link to="/login">Login</Link>
                    </div>
                    <div>
                        <Link to="/account/forgotpassword">Forgot Password?</Link>
                    </div>
                </div>

                <button onClick={handleOnSubmit} className={SignUp.loginBTN}>REGISTER</button>
                <span className={SignUp.or}>or</span>
                <button onClick={() => login()} className={SignUp.googleBTN}>
                    <i className="fa-brands fa-google"></i> Sign up with Google
                </button>

<<<<<<< HEAD
                 
            </div>

            {showModal && (
                <div className={SignUp.modalOverlay}>
                    <div className={SignUp.modalContainer}>
                        <div className={SignUp.modalContent}>
                            <h2>Additional Information</h2>
                            <div className={SignUp.modalButtonContainer}>
                                <button onClick={handleModalSubmit}>Sign up with Google</button>
                                <br></br>
                                <button onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
=======
                {showModal && (
                    <div className={SignUp.modalOverlay}>
                        <div className={SignUp.modalContainer}>
                            <div className={SignUp.modalContent}>
                                <h2>Additional Information</h2>
                                <div className={SignUp.modalButtonContainer}>
                                    <button onClick={() => dispatch(signup(sForm, navigate))}>Sign Up</button>
                                    <br />
                                    <button onClick={() => setShowModal(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
>>>>>>> 526bf28c527e0a0f5978f10cb14ae4843ea39ee4
        </div>
    );
}

export default Signup;
