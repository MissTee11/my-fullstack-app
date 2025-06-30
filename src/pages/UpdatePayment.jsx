import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate, useParams} from 'react-router-dom';
import { formatDateInput } from '../utilities/DateFormat';
import { updatePayment, getPatients,getSinglePayment } from '../api';


function UpdatePayment(){

    const paymentStatus=["Paid","Unpaid","Pending"];
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [messageText, setMessageText] = useState("");
    const {id} = useParams();
          

    const [values, setValues] = useState({
            patient_id: '',
            date: '',
            total_amount: '',
            amount_paid: '',
            status: '',
        });
    
    useEffect (()=>{
            const fetchData = async ()=>{
                try{
                    const patientRes= await getPatients();
                    setPatients(patientRes.data);

                    const singlePayment= await getSinglePayment(id);
                    setValues(singlePayment.data)
                    }
                catch (err) {
                    console.error("Error fetching data:", err);
                    }
              };
              fetchData();
    },[]);

    const resetInfo=() =>{
            setValues({patient_id: '',date: '', total_amount: '',amount_paid:'',status:'',})
        }

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

   const handleSubmit =  async (e) => {
           e.preventDefault();
           try{
                  await updatePayment(id, values);
                  setMessageText("Payment record updated successfully!");
                     
                  setTimeout(() => {
                  setMessageText("");
                  navigate('/Payments');
                  }, 3000)
                     
                  }
                  catch(error){
                  console.error("Error updating payment record!", error);
          
                  const message = error.response?.data?.error || "Failed to update payment record. Please try again.";
                  setMessageText(message);
                  
                     
                  setTimeout(() => {
                  setMessageText("");
                  }, 3000)
                  }     
       };

    return(
        <div>
            <Sidebar/>
            <div className="MainContent">
                <div className="Form">
                <h1> Payment Update Form</h1>
                <form onSubmit={handleSubmit} className="DetailForm">
            <div>
              <label htmlFor="patient_id">Select Patient</label>
              <select
              name="patient_id"
              id="patient_id"
              onChange={handleChanges}
              value={values.patient_id}
              required
              >
              <option value="" disabled>Select Patient</option>
              {patients.map((patient)=> (
              <option key={patient.patient_id} value={patient.patient_id}>{patient.first_name} {patient.last_name}
              </option>
              ))}
              </select>
            </div>

            <div>
                <label htmlFor="total_amount" >Total Amount</label>
                <input type="number" placeholder='Enter total amount'name='total_amount' id='total_amount'
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.total_amount}/>
            </div>
            <div>
                <label htmlFor="amount_paid" >Amount Paid</label>
                <input type="number" placeholder='Enter amount_paid'name='amount_paid' id='amount_paid'
                 onChange={(e)=> handleChanges(e)} 
                 value={values.amount_paid}/>
            </div>
            <div>
                <label htmlFor="date" >Billing Date</label>
                <input type="date" placeholder='Enter date'name='date' id='date'
                 onChange={(e)=> handleChanges(e)} 
               required value={formatDateInput(values.date)}/>
            </div>
            <div>
                <label htmlFor="status" >Status</label>
                <select 
                name="status" 
                id="status" 
                onChange={(e) => handleChanges(e)} 
                required 
                value={values.status}
                disabled>

                <option value="" >Select status</option>
                {paymentStatus.map((status) => (
                <option key={status} value={status}>
                {status}
                 </option>
                ))}
                </select>
                <div className="Buttons">
                <button className="SaveBtn"type="submit">Save</button>
                <button className="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
            </div>
            </div>
                
            </form>

            {messageText && (
            <div className="popup">
            <p>{messageText}</p>
            </div>
           )}
            
            </div>
           
             
        </div>
        </div>
       
    );


}
export default UpdatePayment;