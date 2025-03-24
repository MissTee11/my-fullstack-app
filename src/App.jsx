import './App.css'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from "react";
import { fetchMessage } from "./api";
import LoginPage from './pages/LoginPage';



function App() {
  const[message, setMessage]=useState("");

  useEffect(()=>{
    const getMessage = async ()=>{
      const data= await fetchMessage();
      if(data) setMessage(data.message);
    };
    getMessage();
  }, []);

  return (
   <div>
    <LoginPage/>
   
   

   </div>
  )
}

export default App
