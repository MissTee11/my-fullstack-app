import Sidebar from "../components/Sidebar";

function Dashboard(){
    return(

        <div>
            <Sidebar/>
            <div className='Cards'>

                <div className='patientCard'>
                    <p>Total Patients</p>
                    
                </div>

            </div>
          
        </div>
    )

}
export default Dashboard;