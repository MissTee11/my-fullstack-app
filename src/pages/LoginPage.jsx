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
    const[username,setUsername] = useState('');
    const[password, setPassword]= useState('');
    const[messageText, setMessageText]= useState('');

    const [values, setValues]=useState({
        role:'',
        username:'',
        password:'',
    });

    const handleSubmit= async(e)=>{
        e.preventDefault();

         try{
            const res = await login({username, password});

            localStorage.setItem('token', res.data.token);
            setMessageText("Login successful!");
                   
            setTimeout(() => {
            setMessageText("");
            navigate('/Dashboard');
            }, 3000)
                   
            }
            catch(error){
            console.error("login failed!", error);
        
            const message = error.response?.data?.error || "Login failed.";
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

    return(
    
            <div className="LogIn">
            <form onSubmit ={handleSubmit} className="LoginForm">
                <h1>LogIn</h1>

                <label htmlFor='username'>Username:</label>
                <input type='text'
                placeholder="Enter username"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                required/>

                <label htmlFor='password'>Password:</label>
                <input type='text' 
                placeholder="Enter password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                />

                 <div className="Buttons">
                <button className="SaveBtn"type="submit">Save</button>
                <button className="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
                </div>

                
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