import Sidebar from '../components/Sidebar';
import './Pages.css';
import React,{useState,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';

function UpdatePayment(){

    const paymentStatus=["Paid","Unpaid","Pending"];
     const navigate = useNavigate();

    const [values, setValues] = useState({
            patient_ID: '',
            total_amount: '',
            billing_date: '',
            status: '',
        });

    const resetInfo=() =>{
            setValues({patient_ID: '', total_amount: '', billing_date: '',status:'',})
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
                <form onSubmit={handleSubmit} className="DetailForm">
                <div>
                    <label htmlFor="patient_ID">Select Patient</label>
                    <select
                    name="patient_ID"
                    id="patient_ID"
                    onChange={handleChanges}
                    required
                    value={values.patient_ID}
                    >
                    <option value="" disabled>Select Patient</option>
                    <option value="john">John</option>
                     <option value="mary">Mary</option>
                    </select>
                </div>
                <div>
                <label htmlFor="total_amount" >Total Amount</label>
                <input type="number" placeholder='Enter total amount'name='total_amount' 
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.total_amount}/>
                </div>
                <div>
                <label htmlFor="billing_date" >Billing Date</label>
                <input type="date" placeholder='Enter date'name='billing_date' 
                 onChange={(e)=> handleChanges(e)} 
                 required value={values.billing_date}/>
                </div>
                <div>
                <label htmlFor="status" >Status</label>
                <select 
                name="status" 
                id="status" 
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
                </div>
            </form>
            </div>
            <div className="Buttons">
                <button className="SaveBtn"type="submit">Save</button>
                <button className="ResetBtn" type="button" onClick={resetInfo}>Reset</button>
            </div>
             
        </div>
        </div>
       
    );


}
export default UpdatePayment;