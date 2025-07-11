import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import React,{useState, useEffect} from "react";
import { MdOutlinePayment } from "react-icons/md";
import Sidebar from '../components/Sidebar';
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";
import { formatDateInput } from '../utilities/DateFormat';
import { getPayment, deletePayment } from "../api";
import './Pages.css';
import SearchBar from '../components/SearchBar';

function Payments(){

    const[payments, setPayments] = useState([]);
    const[messageText, setMessageText]= useState("");
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
      const fetchPayments = async()=>{
       try{
          const res = await getPayment();
          console.log("Fetched payment data:", res.data); 
          setPayments(res.data);
          }
        catch(err){
            console.error("Failed to fetch payment records:", err);
          }
        };
          fetchPayments();
    }, []);

    const handleDelete = async (id) => {
            if (window.confirm("Are you sure you want to delete this payment record?")) {
              try {
                    await deletePayment(id);
                    setPayments(payments.filter(p => p.payment_id !== id));
                
                    setMessageText("Payment record deleted successfully!");
                    setTimeout(() => setMessageText(""), 3000);
                    }
                    catch (err) {
                    console.error("Error deleting payment:", err);
                
                    setMessageText("Failed to delete payment record. Please try again.");
                    setTimeout(() => setMessageText(""), 3000);
                    }
                    }
                  };

     const columns =[
            {
              name: 'Payment Number',
              selector:row =>row.payment_id
            },
            {
              name: 'Patient Name',
               selector: (row) => `${row.first_name} ${row.last_name}`
            },
            {
              name: 'Billing Date',
              cell:row =>formatDateInput(row.billing_date)||"N/A",
            },
            {
              name: 'Total Amount',
              selector:row =>row.total_amount
            },
            {
              name: 'Amount Paid',
              selector:row =>row.amount_paid
            },
            {
                name: 'Status',
                selector:row =>row.status
            },
            {
              name: 'Actions',
              cell: row => (
               <div >
                    <Link to={`/UpdatePayment/${row.payment_id}`}>
                    <button className="UpdateBtn"><MdOutlinePayment/></button>
                    </Link>
                    <button onClick = {() =>handleDelete(row.payment_id)} className="DeleteBtn" ><MdDelete/></button>
                    </div>         
              ),
            },
        
          ];

           const filteredPayments = payments.filter(payment => {
        return (
          payment.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          payment.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });


           return(
            <div>
                <Sidebar/>
        <div className="MainContent">
            <Link to="/AddPayment">
            <button className="AddBtn"><IoMdAdd />Record New Payment </button>
            </Link>

            <SearchBar
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}
            placeholder='Search by Patient Name or Payment Status'
            />
          
            <DataTable
            columns={columns}
            data={filteredPayments}
            customStyles={customStyles}
            theme="myCustomTheme">
            </DataTable>
          
        </div>
          {messageText && (
          <div className="popup">
          <p>{messageText}</p>
          </div>
         )}
            </div>
                  
          
              );
          
    
}
export default Payments;