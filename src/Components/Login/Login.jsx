import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../firebase.init';
import { Link } from 'react-router';

const Login = () => {
    const [success, setSuccess]=useState(false);
    const [errorMassage, setErrorMassage]=useState('')
    const emailRef=useRef()

    const handleLogin=e=>{
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password)

        //reset
        setErrorMassage('')
        setSuccess(false)

        //user login
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user)
            if(!result.user.emailVerified){
                alert('please verify your email address')
            }
            else{
                setSuccess(true)
            }
           
            
        })
        .catch(error=>{
            console.log(error)
            setErrorMassage(error.message)
        })
    }

    const handleForgetPassword=()=>{
        console.log(emailRef.current.value)
        const email=emailRef.current.value
        setErrorMassage('')

        //send password reset email

        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('a password reset email is sent.Please reset your password')
        })
        .catch(error=>{
            setErrorMassage(error.message)
        })
    }

    return (

                <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                        <form onSubmit={handleLogin} className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input" name='email' ref={emailRef} placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" className="input" name='password' placeholder="Password" />
                            <div><a onClick={handleForgetPassword}  className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </form>
                        <p>New to this website .Please go <Link className='text-blue-400' to='/signup'>SignUp</Link> </p>
                        {
                            errorMassage && <p className='text-red-400'>{errorMassage}</p>
                        }
                        {
                            success && <p className='text-green-500'>User logged in succeessfully</p>
                        }
                    </div>
                </div>
    );
};

export default Login;