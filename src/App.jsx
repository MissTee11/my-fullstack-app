import './App.css'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from "react";
import { fetchMessage } from "./api";



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
    <Sidebar/>
    <p className="MainContent">Message from Backend:{message}</p>
   

   </div>
  )
}

export default App
