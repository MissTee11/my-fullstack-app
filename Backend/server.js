const express= require("express");
const cors = require("cors");
require("dotenv").config();
const {Pool}= require('pg');

const app=express();
const PORT = process.env.PORT || 5000;

const pool= new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

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
  
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
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
          doctor.specialty
      FROM doctor
      JOIN person ON doctor.person_id = person.id `;

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
//Get speacialty
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



      


