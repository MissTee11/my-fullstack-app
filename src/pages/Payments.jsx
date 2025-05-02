import DataTable, {createTheme} from "react-data-table-component";
import { Link } from 'react-router-dom';
import React,{useState} from "react";
import { MdOutlinePayment } from "react-icons/md";
import Sidebar from '../components/Sidebar';
import { IoMdAdd } from "react-icons/io";
import {  useNavigate } from 'react-router-dom';
import './Pages.css';

createTheme(
  'blue',
{
  text: {
      primary: '#4C3BCF',
  },
  background: {
      default: 'white',
  },
  context: {
      background: '#cb4b16',
      text: '#FFFFFF',
  },
  divider: {
      default: '#3674B5',
  },
  sortFocus: {
      default: '#2aa198',
  },
  
},
'dark',
);


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
              selector:row =>row.date
            },
            {
              name: 'Total Amount',
              selector:row =>row.total_amount
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
              const customStyles = {
                headCells: {
                  style: {
                    fontSize: '15px', 
                    fontWeight: 'bold',
                    color: '#3674B5',
                  },
                },
                cells: {
                  style: {
                    fontSize: '15px', 
                    color: '#3674B5',
                  },
                },
              };
        

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
                    theme="blue">
                      </DataTable>
          
            </div>
            </div>
                  
          
              );
          
    
}
export default Payments;