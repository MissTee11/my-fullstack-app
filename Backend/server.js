const express = require('express');
const { json } = express;
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const pool = require('./db');
const path = require('path'); 



const app=express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:'https://hospital-system-frontend-k3np.onrender.com',
}));

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is live!' });
});

app.use(json());

/*LOGIN*/
app.use('/api/auth', authRoutes);

/*PATIENTS*/

//Get all patients
app.get('/api/patients', async(req,res)=>{

    try{
       // const result = await pool.query('SELECT*FROM patients')

       const query= `SELECT patient.id AS patient_id,
        person.first_name, 
        person.last_name, 
        person.gender,
        patient.date_of_birth, 
        patient.contact_number, 
        patient.city
      FROM patient
      JOIN person ON patient.person_id = person.id `;

      const result = await pool.query(query);
      res.json(result.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Server Error'});
    }
});

//Get one patient
app.get('/api/patients/:id', async(req,res)=>{

    const { id } = req.params;

    try{
    const query= `SELECT patient.id AS patient_id,
        person.first_name,
        person.last_name,
        person.gender,
        patient.date_of_birth, 
        patient.contact_number,
        patient.city
    FROM patient
    JOIN person ON patient.person_id = person.id
    WHERE patient.id = $1; `;

    const result = await pool.query(query,[id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(result.rows[0]);
    }
    
    catch(err){
        console.error(err);
        res.status(500).json({error:'Server Error'});
    }
});

//Add new patient
app.post('/api/patients', async(req,res)=>{
    const {first_name, last_name, gender,date_of_birth, contact_number, city}= req.body;

    try{
        const personResult = await pool.query(
        `INSERT INTO person (first_name, last_name, gender) VALUES ($1, $2, $3) RETURNING id`,
        [first_name, last_name, gender]
        ); 

        const personId=personResult.rows[0].id;

        const patientResult = await pool.query(
        `INSERT INTO patient (person_id, date_of_birth, contact_number, city)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [personId, date_of_birth, contact_number, city]
        );
        res.status(201).json(patientResult.rows[0]);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to add patient'});
    }
});

//update patient
app.put('/api/patients/:id', async (req, res) => {
    const patientId = req.params.id;
    const { first_name, last_name, gender, date_of_birth, contact_number, city } = req.body;

    try {
        // Get person_id from patient
        const personIdResult = await pool.query(
          `SELECT person_id FROM patient WHERE id = $1`,
          [patientId]
        );

        const personId = personIdResult.rows[0]?.person_id;
        if 
        (!personId) return res.status(404).json({ error: 'Patient not found' });

        await pool.query(
            `UPDATE person SET first_name=$1, last_name=$2, gender=$3 WHERE id=$4`,
            [first_name, last_name, gender, personId]
          );
        
        await pool.query(
            `UPDATE patient SET date_of_birth=$1, contact_number=$2, city=$3 WHERE id=$4`,
            [date_of_birth, contact_number, city, patientId]
          );
          res.json({ message: 'Patient updated successfully' });
    } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Could not update patient' });
    }
});

//delete a patient
app.delete('/api/patients/:id', async (req, res) => {
    const patientId = req.params.id;
  
    try {
      const personResult = await pool.query(
        `SELECT person_id FROM patient WHERE id = $1`,
        [patientId]
      );
  
      const personId = personResult.rows[0]?.person_id;
      if (!personId) return res.status(404).json({ error: 'Patient not found' });
  
      await pool.query(`DELETE FROM person WHERE id = $1`, [personId]); // cascades to patient
      res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not delete patient' });
    }
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*DOCTORS*/

//Get all doctors
app.get('/api/doctors', async(req,res)=>{

    try{

       const query= `SELECT doctor.id AS doctor_id, 
          person.first_name,
          person.last_name,
          person.gender,
          specialty.specialty AS specialty_name
      FROM doctor
      JOIN person ON doctor.person_id = person.id 
      JOIN specialty ON doctor.specialty::int = specialty.id`;

      const result = await pool.query(query);
      res.json(result.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Server Error'});
    }
});

//Get one doctor
app.get('/api/doctors/:id', async(req,res)=>{

  const{id} = req.params;

    try{

       const query= `SELECT doctor.id AS doctor_id, 
          person.first_name,
          person.last_name,
          person.gender,
          doctor.specialty
      FROM doctor
      JOIN person ON doctor.person_id = person.id
      WHERE doctor.id= $1 `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(result.rows[0]);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Server Error'});
    }
});

//Add new doctor
app.post('/api/doctors', async(req,res)=>{
    const {first_name, last_name, gender, specialty}= req.body;

    try{
        const personResult = await pool.query(
        `INSERT INTO person (first_name, last_name, gender) VALUES ($1, $2, $3) RETURNING id`,
        [first_name, last_name, gender]
        ); 

        const personId=personResult.rows[0].id;

        const doctorResult = await pool.query(
        `INSERT INTO doctor (person_id, specialty)
        VALUES ($1, $2) RETURNING *`,
        [personId, specialty]
        );
        res.status(201).json(doctorResult.rows[0]);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to add doctor'});
    }
});

//Update doctor
app.put('/api/doctors/:id', async (req, res) => {
    const doctorId = req.params.id;
    const { first_name, last_name, gender, specialty } = req.body;

    try {
        const personIdResult = await pool.query(
          `SELECT person_id FROM doctor WHERE id = $1`,
          [doctorId]
        );

        const personId = personIdResult.rows[0]?.person_id;
        if 
        (!personId) return res.status(404).json({ error: 'Doctor not found' });

        await pool.query(
            `UPDATE person SET first_name=$1, last_name=$2, gender=$3 WHERE id=$4`,
            [first_name, last_name, gender, personId]
          );
        
        await pool.query(
            `UPDATE doctor SET specialty=$1 WHERE id=$2`,
            [specialty, doctorId]
          );
          res.json({ message: 'Doctor updated successfully' });
    } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Could not update doctor' });
    }
});

//Delete a doctor
app.delete('/api/doctor/:id', async (req, res) => {
    const doctorId = req.params.id;
  
    try {
      const personResult = await pool.query(
        `SELECT person_id FROM doctor WHERE id = $1`,
        [doctorId]
      );
  
      const personId = personResult.rows[0]?.person_id;
      if (!personId) return res.status(404).json({ error: 'Doctor not found' });
  
      await pool.query(`DELETE FROM person WHERE id = $1`, [personId]); 
      res.json({ message: 'Doctor deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not delete doctor' });
    }
  });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Get specialty
app.get('/api/specialty',async(req, res) =>{
  try{
    const result = await pool.query('SELECT id, specialty FROM specialty');
   res.json(result.rows);
  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Could not get specialties'});
  }
  
});

//Get department
app.get('/api/department',async(req, res) =>{
  try{
    const result = await pool.query('SELECT id, department FROM department ORDER BY id');
   res.json(result.rows);
  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Could not get departments'});
  }
  
});

//Get role
app.get('/api/roles',async(req, res) =>{
  try{
    const result = await pool.query('SELECT id, role_name FROM roles ORDER BY id');
   res.json(result.rows);
  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Could not get roles'});
  }
  
});

//Get rooms
app.get('/api/rooms',async(req, res) =>{
  try{
    const result = await pool.query('SELECT id, room_number, room_type, availability_status FROM rooms ORDER BY room_number');
   res.json(result.rows);
  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Could not get rooms'});
  }
  
});

//Get Single Room
app.get('/api/rooms/:room_number', async (req, res) => {
  const { room_number } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, room_number, room_type, availability_status FROM rooms WHERE room_number = $1',
      [room_number]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not get room' });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*STAFF MEMBERS*/

//get all staff
app.get('/api/staff', async(req,res)=>{

    try{

       const query= `SELECT staff.id AS staff_id, 
          person.first_name,
          person.last_name,
          person.gender,
          department.department AS department_name,
          roles.role_name AS role_name
      FROM staff
      JOIN person ON staff.person_id = person.id 
      JOIN department ON staff.department_id = department.id
      JOIN roles ON staff.role_id = roles.id`;

      const result = await pool.query(query);
      res.json(result.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Server Error'});
    }
});

//get one staff member
app.get('/api/staff/:id', async(req,res)=>{

  const{id} = req.params;

    try{

       const query= `SELECT staff.id AS staff_id, 
          person.first_name,
          person.last_name,
          person.gender,
          department.id AS department_id,
          department.department AS department_name,
          roles.id AS role_id,
          roles.role_name AS role_name
          
      FROM staff
      JOIN person ON staff.person_id = person.id
      JOIN department ON staff.department_id = department.id
      JOIN roles ON staff.role_id = roles.id
      WHERE staff.id= $1 `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Staff member not found' });
    }
    res.json(result.rows[0]);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Server Error'});
    }
});

//add new staff member
app.post('/api/staff', async(req,res)=>{
    const {first_name, last_name, gender, role_id ,department_id}= req.body;

    try{
        const personResult = await pool.query(
        `INSERT INTO person (first_name, last_name, gender) VALUES ($1, $2, $3) RETURNING id`,
        [first_name, last_name, gender]
        ); 

        const personId=personResult.rows[0].id;

        const staffResult = await pool.query(
        `INSERT INTO staff (person_id, role_id, department_id)
        VALUES ($1, $2, $3) RETURNING *`,
        [personId, role_id, department_id]
        );
        res.status(201).json(staffResult.rows[0]);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to add staff member'});
    }
});

//update staff member
app.put('/api/staff/:id', async (req, res) => {
    const staffId = req.params.id;
    const { first_name, last_name, gender, role_id, department_id } = req.body;

    try {
        const personIdResult = await pool.query(
          `SELECT person_id FROM staff WHERE id = $1`,
          [staffId]
        );

        const personId = personIdResult.rows[0]?.person_id;
        if 
        (!personId) return res.status(404).json({ error: 'Staff member not found' });

        await pool.query(
            `UPDATE person SET first_name=$1, last_name=$2, gender=$3 WHERE id=$4`,
            [first_name, last_name, gender, personId]
          );
        
        await pool.query(
            `UPDATE staff SET role_id=$1, department_id=$2 WHERE id=$3`,
            [role_id, department_id, staffId]
          );
          res.json({ message: 'Staff member updated successfully' });
    } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Could not update staff member' });
    }
});

//delete staff member
app.delete('/api/staff/:id', async (req, res) => {
    const staffId = req.params.id;
  
    try {
      const personResult = await pool.query(
        `SELECT person_id FROM staff WHERE id = $1`,
        [staffId]
      );
  
      const personId = personResult.rows[0]?.person_id;
      if (!personId) return res.status(404).json({ error: 'Staff not found' });
  
      await pool.query(`DELETE FROM person WHERE id = $1`, [personId]); 
      res.json({ message: 'Staff member deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not delete staff member' });
    }
  });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*APPOINTMENTS*/
//Add appointment
app.post('/api/appointments', async(req,res)=>{
    const {patient_id, doctor_id, appointment_date, time ,status}= req.body;

    try{
        const result = await pool.query(
          `INSERT INTO appointments (patient_id, doctor_id, appointment_date, time,status) 
          VALUES ($1, $2, $3, $4, COALESCE($5, 'Scheduled')) RETURNING *`,
          [patient_id, doctor_id, appointment_date, time, status]
        );
        res.status(201).json(result.rows[0]);
    }
    catch(err){
        console.error(err);

        if(err.code === '23505'){
          if(err.constraint === 'unique_doctor_datetime'){
            return res.status(400).json({ error: 'Doctor already has an appointment at this date and time.'})
          }
          else if( err.constraint ==='unique_patient_datetime'){
            return res.status(400).json({error: 'Patient already has an appointment at this date and time.'})
          }
        }
        
        res.status(500).json({error: 'Failed to add appointment'});
    }
});

//Get all appointments
app.get('/api/appointments', async(req,res)=>{
  try{
    const query= `SELECT appointments.id AS appointment_id,
    appointments.patient_id,
    appointments.doctor_id,
    patient_person.first_name AS patient_first_name,
    patient_person.last_name AS patient_last_name,
    doctor_person.first_name AS doctor_first_name,
    doctor_person.last_name AS doctor_last_name,
    appointments.appointment_date,
    appointments.time,
    appointments.status
    FROM appointments
    JOIN patient ON appointments.patient_id = patient.id
    JOIN person AS patient_person ON patient.person_id = patient_person.id
    JOIN doctor ON appointments.doctor_id = doctor.id
    JOIN person AS doctor_person ON doctor.person_id = doctor_person.id`;

      const result = await pool.query(query);
      res.json(result.rows);
      

  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to fetch appointments'});
  }
});

//Get Today's Appointments
  app.get('/api/appointments/today', async (req,res)=>{
    try{
     const today = new Date().toISOString().split('T')[0];

      const result= await pool.query(
        `SELECT * FROM appointments WHERE appointment_date = $1`,
        [today]
      );
      res.json(result.rows);
    }
    catch(err){
      console.error(err.message);
      res.status(500).json({message:'Server error'});
    }
  });

  //Get appointments by date
  app.get('/api/appointments/date/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT
        appointments.id,
        patient_person.first_name AS patient_first_name,
        patient_person.last_name AS patient_last_name,
        doctor_person.first_name AS doctor_first_name,
        doctor_person.last_name AS doctor_last_name,
        appointments.appointment_date,
        appointments.time
      FROM appointments
      LEFT JOIN patient ON appointments.patient_id = patient.id
      LEFT JOIN person AS patient_person ON patient.person_id = patient_person.id
      LEFT JOIN doctor ON appointments.doctor_id = doctor.id
      LEFT JOIN person AS doctor_person ON doctor.person_id = doctor_person.id
      WHERE appointments.appointment_date = $1
      ORDER BY appointments.time ASC;
      `,
      [date]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch appointments for date" });
  }
});




//Get one appointment
app.get('/api/appointments/:id', async(req,res)=>{

  const{id} = req.params;
  try{

    const query= `SELECT * FROM appointments where id=$1`;

    const result = await pool.query(query,[id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(result.rows[0]);

  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to fetch appointment'});
  }
});

//Update Appointment
app.put('/api/appointments/:id', async(req,res)=>{
    const{id}= req.params;
    const {patient_id, doctor_id, appointment_date, time ,status}= req.body;

    try{
        const result = await pool.query(
          `UPDATE appointments SET patient_id=$1, doctor_id=$2, appointment_date=$3, time=$4,status=$5
          WHERE id=$6
          RETURNING *;
         `,
          [patient_id, doctor_id, appointment_date, time, status,id]
        );

        if (result.rowCount === 0) {//check if any rows were actually updated
          return res.status(404).json({ error: 'Appointment not found' });
          }

       res.json({ message: 'Appointment updated successfully' });
    } catch (err) {
          console.error(err);
          if(err.code === '23505'){
          if(err.constraint === 'unique_doctor_datetime'){
            return res.status(400).json({ error: 'Doctor already has an appointment at this date and time.'})
          }
          else if( err.constraint ==='unique_patient_datetime'){
            return res.status(400).json({error: 'Patient already has an appointment at this date and time.'})
          }
        }
        
        res.status(500).json({ error: 'Could not update appointment' });
    }
});

//Delete appointment
app.delete('/api/appointments/:id', async (req, res) => {
    const {id} = req.params;
  
    try {
      const result=await pool.query(
        `DELETE FROM appointments WHERE id = $1 RETURNING*`, 
        [id]); 
      if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json({ message: 'Appointment deleted successfully' });
    }

    catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not delete appointment' });
    }
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*ADMISSIONS */

  //Add admission
app.post('/api/admissions', async(req,res)=>{
    let {patient_id, room_id, admission_date, discharge_date}= req.body;//const cannot be reassigned

    if(discharge_date===""){
      discharge_date=null;
    }

    try{
        const result = await pool.query(
          `INSERT INTO admissions (patient_id, room_id, admission_date, discharge_date) 
          VALUES ($1, $2, $3, $4) RETURNING *`,
          [patient_id, room_id, admission_date, discharge_date]
        );
        res.status(201).json(result.rows[0]);
    }
    catch(err){
        console.error(err);

        if(err.code === '23505'){
        const errorText = err.message;

        if (errorText.includes('unique_active_admission_per_patient')) {
        return res.status(400).json({ error: 'Patient is already admitted to a room' });
      }

        if (errorText.includes('unique_active_patient_per_room')) {
        return res.status(400).json({ error: 'Room is currently occupied by another patient.' });
    }
  }
         
        
        res.status(500).json({error: 'Failed to add admission'});
    }
});

//Get all admissions
app.get('/api/admissions', async(req,res)=>{
  try{
    const query= `SELECT admissions.id AS admission_id,
    admissions.patient_id,
    person.first_name,
    person.last_name,
    rooms.room_number AS room_number,
    admissions.admission_date,
    admissions.discharge_date
    FROM admissions
    JOIN rooms ON admissions.room_id = rooms.id
    JOIN patient ON admissions.patient_id = patient.id
    JOIN person ON patient.person_id = person.id
    `;


    const result = await pool.query(query);
    res.json(result.rows);

  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to fetch admissions'});
  }
});

//Get one admission
app.get('/api/admissions/:id', async(req,res)=>{

  const{id} = req.params;
  try{

    const query= `SELECT * FROM admissions where id=$1`;

    const result = await pool.query(query,[id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admission record not found' });
    }

    res.json(result.rows[0]);

  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to fetch admission record'});
  }
});

//Update Admission Record
app.put('/api/admissions/:id', async(req,res)=>{
    const{id}= req.params;
    let {patient_id, room_id, admission_date, discharge_date }= req.body;//const cannot be reassigned

    if(discharge_date===""){
      discharge_date=null;
    }

    try{
        const result = await pool.query(
          `UPDATE admissions SET patient_id=$1, room_id=$2, admission_date=$3, discharge_date=$4
          WHERE id=$5
          RETURNING *;
         `,
          [patient_id, room_id, admission_date, discharge_date,id]
        );
       res.json({ message: 'Admission record updated successfully' });
    } catch (err) {
          console.error(err);

        if(err.code === '23505'){
        const errorText = err.message;

        if (errorText.includes('unique_active_admission_per_patient')) {
        return res.status(400).json({ error: 'Patient is already admitted to a room' });
        }

        if (errorText.includes('unique_active_patient_per_room')) {
        return res.status(400).json({ error: 'Room is currently occupied by another patient.' });
        }
    }
         
          res.status(500).json({ error: 'Could not update admission record' });
    }
});

//Delete admission record
app.delete('/api/admissions/:id', async (req, res) => {
    const {id} = req.params;
  
    try {
      const result=await pool.query(
        `DELETE FROM admissions WHERE id = $1 RETURNING*`, 
        [id]); 
      if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Admission record not found' });
      }
      res.json({ message: 'Admission record deleted successfully' });
    }

    catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not delete admission record' });
    }
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*PAYMENTS*/

//Add Payments
app.post('/api/payments', async(req,res)=>{
    let {patient_id, date, total_amount, amount_paid, status}= req.body;//const cannot be reassigned

    if(amount_paid===""){
      amount_paid=null;
    }

    try{
        const result = await pool.query(
          `INSERT INTO payments (patient_id, date, total_amount, amount_paid, status) 
          VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [patient_id, date, total_amount, amount_paid, status]
        );
        res.status(201).json(result.rows[0]);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to add staff member'});
    }
});

//Get all payments
app.get('/api/payments', async(req,res)=>{
  try{
    const query= `SELECT
    payments.id AS payment_id,
    payments.patient_id,
    person.first_name,
    person.last_name,
    payments.date AS billing_date,
    payments.total_amount,
    payments.amount_paid,
    payments.status
    FROM payments
    JOIN patient ON payments.patient_id = patient.id
    JOIN person ON patient.person_id = person.id`;
    const result = await pool.query(query);
    res.json(result.rows);

  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to fetch payments'});
  }
});

//Get one payment
app.get('/api/payments/:id', async(req,res)=>{

  const{id} = req.params;
  try{

    const query= `SELECT * FROM payments where id=$1`;

    const result = await pool.query(query,[id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment record not found' });
    }

    res.json(result.rows[0]);

  }
  catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to fetch payment record'});
  }
});

//Update Payment
app.put('/api/payments/:id', async(req,res)=>{
    const{id}= req.params;
    let {patient_id, date, total_amount, amount_paid,status }= req.body;

    if(amount_paid===""){
      amount_paid=null;
    }

    try{
        const result = await pool.query(
          `UPDATE payments SET patient_id=$1, date=$2, total_amount=$3, amount_paid=$4, status=$5
          WHERE id=$6
          RETURNING *;
         `,
          [patient_id, date, total_amount, amount_paid,status, id]
        );
       res.json({ message: 'Payment record updated successfully' });
    }  catch(err){
    console.error(err);
    res.status(500).json({error: 'Failed to update payments'});
  }
});

//Delete payments
app.delete('/api/payments/:id', async (req, res) => {
    const {id} = req.params;
  
    try {
      const result=await pool.query(
        `DELETE FROM payments WHERE id = $1 RETURNING*`, 
        [id]); 
      if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment record not found' });
      }
      res.json({ message: 'Payment record deleted successfully' });
    }

    catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not delete payment record' });
    }
  });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*MEDICAL RECORD*/

//Add medical record
app.post('/api/medical_records', async (req, res) => {
  const { doctor_id, diagnosis,date, patient_id } = req.body;

  try {
    const result = await pool.query(
    `INSERT INTO medical_records (doctor_id, diagnosis,date,patient_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;`,
      [doctor_id, diagnosis, date, patient_id]
    );
    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add medical record' });
  }
});

//Get medical records
app.get('/api/medical_records/patient/:id', async (req, res)=>{
  const {id} = req.params;
  try{
    const query = `
      SELECT 
        medical_records.id AS record_id,
        medical_records.doctor_id,
        person.first_name,
        person.last_name,
        medical_records.diagnosis,
        medical_records.date,
        medical_records.patient_id
      FROM medical_records
      LEFT JOIN doctor ON medical_records.doctor_id = doctor.id
      LEFT JOIN person ON doctor.person_id = person.id
      WHERE patient_id = $1
    `;
      const result = await pool.query(query, [id]);
     res.json(result.rows);
     } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch medical records' });
  }
});

//Update medical record
app.put('/api/medical_records/:id', async (req, res) => {
  const { id } = req.params;
  const {doctor_id, diagnosis, date, patient_id} = req.body;

  try {
    const result = await pool.query(
 `    UPDATE medical_records
      SET doctor_id = $1,
          diagnosis = $2,
          date = $3,
          patient_id=$4
      WHERE id = $5
      RETURNING *; `,
  [doctor_id, diagnosis,date, patient_id, id]
  );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Medical record not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update medical record' });
  }
});
///Delete medical record
app.delete('/api/medical_records/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM medical_records WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Medical record not found' });
    }

    res.json({ message: 'Medical record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete medical record' });
  }
});

//Get one medical record
app.get('/api/medical_records/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT 
        medical_records.id AS record_id,
        medical_records.doctor_id,
        person.first_name,
        person.last_name,
        medical_records.diagnosis,
        medical_records.date,
        medical_records.patient_id
      FROM medical_records
      LEFT JOIN doctor ON medical_records.doctor_id = doctor.id
      LEFT JOIN person ON doctor.person_id = person.id
      WHERE medical_records.id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Medical record not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch medical record' });
  }
});
/******************************************************************** */
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

















      


