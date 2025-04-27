import {sendEmailVerification, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router';

const SignUp = () => {
    const [success, setSuccess] = useState(false);
    const [errorMassage, setErrorMassage] = useState('');
    const [showPassword, setShowPassword] = useState(false)


    const handleSignUp = e => {
        e.preventDefault();

        const email = e.target.email.value
        const password = e.target.password.value
        const name = e.target.name.value
        const photo = e.target.photo.value
        const terms = e.target.terms.checked
        console.log(email, password,terms)
        
        setSuccess(false)
        setErrorMassage('');

        //password validation

        if(!terms){
            setErrorMassage('please accept our terms and condition');
            return;
        }

        const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if (passwordRegExp.test(password) === false) {
            setErrorMassage('password incorrect');
            return;
        }

        //create user

        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                console.log(res)
                //email verify
                sendEmailVerification(auth.currentUser)
                .then(()=>{
                    setSuccess(true)
                    alert('we sent you a verication code.please check your email')
                })
                    //update user profile

                    const profile={
                        displayName:name,
                        photoURL:photo
                    }
                    updateProfile(auth.currentUser,profile)
                    .then(()=>{
                        console.log('user profile updated')
                    })
                    .catch(error=>{
                        console.log(error)
                    })
            
                
            })
            .catch(error => {
                console.log(error)
                setErrorMassage(error.message)
            })
    }

    return (

        <div className="card bg-base-100  mx-auto mt-10 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-3xl font-bold">Please sign up now!!</h1>
                <form onSubmit={handleSignUp} className='space-y-4'>
                    <label className="label">Your name</label>
                    <input type="text" className="input" name='name' placeholder="Your name" />
                    <label className="label">Your photo</label>
                    <input type="text" className="input" name='photo' placeholder="photo url" />
                    <label className="label">Email</label>
                    <input type="email" className="input" name='email' placeholder="Email" />
                    <label className="label">Password</label>

                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="input"
                            name='password'
                            placeholder="Password" />
                        <button
                            onClick={() =>  setShowPassword(!showPassword) }
                            className='btn btn-xs absolute right-6 top-2'>
                            {
                                showPassword ? <FaEyeSlash/> :<FaEye/>
                            }
                        </button>
                    </div>
                    
                    <label className="labelm-2">
                        <input type="checkbox" name='terms'  className="checkbox" />
                        Accept terms and conditions
                    </label>
                    <br />
                    <button className="btn btn-neutral mt-4">Sign up</button>
                </form>
                <p>Already have an Account? Please <Link className='text-blue-400 underline' to='/login'>Login</Link> </p>
                {
                    errorMassage && <p className='text-red-500'>{errorMassage}</p>
                }
                {
                    success && <p className='text-green-500'>User has created successfully</p>
                }
            </div>
        </div>

    );
};

export default SignUp;