import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import React,{useState} from "react";
import { MdOutlinePayment } from "react-icons/md";
import Sidebar from '../components/Sidebar';
import { IoMdAdd } from "react-icons/io";
import { customStyles } from "../utilities/dataTableCustomStyles";
import { myCustomTheme } from "../utilities/dataTableTheme";
import { formatDateInput } from '../utilities/DateFormat';
import './Pages.css';

function Payments(){

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
              name: 'Payment Date',
              selector:row =>formatDateInput(row.date)
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
                    <Link to='/UpdatePayment'>
                    <button className="UpdateBtn"><MdOutlinePayment/>Make Payment</button>
                    </Link>
                    </div>         
              ),
            },
        
          ];

           return(

            <div>
                <Sidebar/>
            <div className="MainContent">
                    <Link to="/AddPayment">
                    <button className="AddBtn"><IoMdAdd />Record New Payment </button>
                    </Link>
          
                    <DataTable
                    columns={columns}
                    data={columns}
                    customStyles={customStyles}
                    theme="myCustomTheme">
                      </DataTable>
          
            </div>
            </div>
                  
          
              );
          
    
}
export default Payments;