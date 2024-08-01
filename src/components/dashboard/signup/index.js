import React, {useState} from "react";
import SignUp from "./Signup.module.css"
import {Link,useNavigate} from "react-router-dom"

import {useGoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import {signup, signupGoogle} from "../../../redux/actions/auth";


const InitState = {
    firstName: "",
    lastName: "",
    email: '',
    password: '',
<<<<<<< HEAD
    confirmPassword: '',
};
=======
    confirmPassword: ''
}

>>>>>>> adel

function Signup() {
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const [sForm,
        setsForm] = useState(InitState)

<<<<<<< HEAD
    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

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
            setsForm({
                ...sForm,
                [name]: value
            });
        }
    };
=======
    const handleChange = (e) => setsForm({
        ...sForm,
        [e.target.name]: e.target.value
    });
>>>>>>> adel

    function handleGoogleLoginSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;

        dispatch(signupGoogle(accessToken,nagivate))
    }

    function handleOnSubmit(e) {
        e.preventDefault();
<<<<<<< HEAD
        
        // Check form validation conditions
        if (sForm.userName !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" 
            && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
            setShowModal(true); // Open modal to collect additional data
=======
        if (sForm.firstName !== "" && sForm.lastName !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
            dispatch(signup(sForm,nagivate))
>>>>>>> adel
        }
    }

    const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});
    return (
        <div className={SignUp.loginContainer}>
            <div className={SignUp.loginContainerv2}>
                <h1>Create your account</h1>

                <div className={SignUp.inputContainer}>
                    <label>FRIST NAME</label>
                    <input onChange={handleChange} name="firstName" placeholder="enter your first name" type="text"/>
                </div>
                <div className={SignUp.inputContainer}>
                    <label>LAST NAME</label>
                    <input name="lastName" onChange={handleChange} placeholder="enter your last name" type="text"/>
                </div>
                <div className={SignUp.inputContainer}>
                    <label>EMAIL</label>
                    <input name="email" onChange={handleChange} placeholder="enter your email" type="email"/>
                </div>

                <div className={SignUp.inputContainer}>
                    <label>PASSWORD</label>
                    <input name="password" onChange={handleChange} placeholder="enter your password" type="password"/>
                </div>

                <div className={SignUp.inputContainer}>
<<<<<<< HEAD
                    <label>Confirm Password</label>
                    <input name="confirmPassword" onChange={handleChange} placeholder="Retype your password" type="password"/>
=======
                    <label>CONFIRM PASSWORD</label>
                    <input name="confirmPassword" onChange={handleChange} placeholder="retype your password" type="password"/>
>>>>>>> adel
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
                 <button  onClick={() => login()}  className={SignUp.googleBTN}>
                    <i class="fa-brands fa-google"></i>  Sign up with google</button>

                 
            </div>

<<<<<<< HEAD
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
>>>>>>> adel
        </div>
    )
}

export default Signup;