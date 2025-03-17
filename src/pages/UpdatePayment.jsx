import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';

function UpdatePayment(){

    const paymentStatus=["Paid","Unpaid","Pending"];
     const navigate = useNavigate();

    const [values, setValues] = useState({
            patient_id: '',
            total_amount: '',
            billing_date: '',
            payment_status: '',
        });

    const resetInfo=() =>{
            setValues({patient_id: '', total_amount: '', billing_date: '',payment_status:'',})
        }

    const handleChanges = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        navigate('/Payments');
    };

    return(
        <div>
            <Sidebar/>
            <div className="MainContent">
                <div className="Form">
                <h1> Payment Update Form</h1>
                <form onSubmit={handleSubmit}>
                <label htmlFor="patient_id">Select Patient</label>
                <select
                name="patient_id"
                id="patient_id"
                onChange={handleChanges}
                required
                value={values.patient_id}
                >
                <option value="" disabled>Select Patient</option>
                <option value="john">John</option>
                <option value="mary">Mary</option>
                </select>

                <label htmlFor="total_amount" >Total Amount</label>
                <input type="number" placeholder='Enter total amount'name='total_amount' 
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.total_amount}/>

                <label htmlFor="billing_date" >Billing Date</label>
                <input type="date" placeholder='Enter date'name='billing_date' 
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.billing_date}/>

                <label htmlFor="payment_status" >Status</label>
                <select 
                name="payment_status" 
                id="payment_status" 
                onChange={(e) => handleChanges(e)} 
                required 
                value={values.payment_status}>

                <option value="" disabled>Select status</option>
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

            </form>
                </div>
             
        </div>
        </div>
       
    );


}
export default UpdatePayment;