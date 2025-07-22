import './Pages.css';
import { RiAdminFill } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { login } from '../api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function LoginPage(){
    const navigate = useNavigate();
    const[messageText, setMessageText]= useState('');


    const [values, setValues]=useState({
        username:'',
        password:'',
    });

    const handleSubmit= async(e)=>{
        e.preventDefault();

         try{
            const res = await login({username: values.username, password:values.password});

            localStorage.setItem('token', res.data.token);
            setMessageText("Login successful!");
                   
            setTimeout(() => {
            setMessageText("");
            navigate('/Dashboard');
            }, 3000)
                   
            }
            catch(error){
            console.error("login failed!", error);
        
            const message = error.response?.data?.msg || "Login failed. Please recheck the username and password and try again.";
            setMessageText(message);
                
                   
            setTimeout(() => {
            setMessageText("");
            }, 3000)
            };

    };
     const resetInfo = () => {
            setValues({
            username:'',
            password:'',
            });
        };   
    const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    };

return(
        <div className='LoginPage'>
        <h1 className='PageTitle'>Hospital Management System</h1>

        <form onSubmit ={handleSubmit} className="LoginForm">
            <h1 className='Login'>LogIn</h1>

            <label htmlFor='username'>Username:</label>
            <input type='text'
            placeholder="Enter username"
            id='username'
            name='username'
            value={values.username}
            onChange={handleChange}
            required/>

            <label htmlFor='password'>Password:</label>
            <input type='password' 
            placeholder="Enter password"
            id='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            required
            />

            <button className="LoginBtn"type="submit">LOGIN</button>
        </form>

        {messageText && (
                <div className="popup">
                    <p>{messageText}</p>
                </div>
            )}

            

      </div>
        
    )
}
export default LoginPage;