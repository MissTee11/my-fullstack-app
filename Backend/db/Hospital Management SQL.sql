CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(50) UNIQUE NOT NULL,
password_hash TEXT NOT NULL,
role Varchar(20) CHECK(role IN('admin','doctor','receptionist'))
);

CREATE TABLE person(
id SERIAL PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
gender VARCHAR(10) CHECK(gender IN('Male','Female'))
);

CREATE TABLE patient(
id SERIAL PRIMARY KEY,
person_id INT UNIQUE REFERENCES person(id) ON DELETE CASCADE,
date_of_birth DATE NOT NULL,
contact_number VARCHAR(20),
city VARCHAR(50)
);

CREATE TABLE doctor(
id SERIAL PRIMARY KEY,
person_id INT UNIQUE REFERENCES person(id) ON DELETE CASCADE,
specialty VARCHAR(50)
);

CREATE TABLE staff(
id SERIAL PRIMARY KEY,
person_id INT UNIQUE REFERENCES person(id) ON DELETE CASCADE,
role_id INT REFERENCES roles(id) ON DELETE SET NULL,
department_id INT REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE roles(
id SERIAL PRIMARY KEY,
role_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE department(
id SERIAL PRIMARY KEY,
department VARCHAR(100)
);

CREATE TABLE appointments(
id SERIAL PRIMARY KEY,
patient_id INT REFERENCES patient(id)ON DELETE CASCADE,
doctor_id INT REFERENCES doctor(id)ON DELETE SET NULL,
appointment_date DATE NOT NULL,
time TIME NOT NULL,
status VARCHAR(20) CHECK(status IN('Scheduled','Completed','Cancelled')) DEFAULT 'Scheduled'
);

CREATE TABLE admissions(
id SERIAL PRIMARY KEY,
patient_id INT REFERENCES patient(id) ON DELETE CASCADE,
room_id INT REFERENCES rooms(id) ON DELETE SET NULL,
admission_date DATE NOT NULL,
discharge_date DATE
);

CREATE TABLE rooms(
id SERIAL PRIMARY KEY,
room_number VARCHAR(50) UNIQUE NOT NULL,
room_type VARCHAR(50) CHECK(room_type IN('General', 'Private', 'ICU', 'Surgery')),
availability_status VARCHAR(20) CHECK(availability_status IN('Available','Occupied')) DEFAULT 'Available'
);

CREATE TABLE payments(
id SERIAL PRIMARY KEY,
patient_id INT REFERENCES patient(id) ON DELETE CASCADE,
date DATE NOT NULL,
total_amount DECIMAL(10,2) NOT NULL,
amount_paid DECIMAL(10,2) DEFAULT 0.00,
status VARCHAR(20) CHECK (status IN('Paid','Unpaid','Pending')) DEFAULT 'Pending'
);

CREATE TABLE medical_records(
id SERIAL PRIMARY KEY,
appointment_id INT REFERENCES appointments(id) ON DELETE SET NULL,
doctor_id INT REFERENCES doctor(id) ON DELETE SET NULL,
patient_id INT REFERENCES patient(id) ON DELETE CASCADE,
diagnosis TEXT
);

INSERT INTO roles (role_name) VALUES
('Nurse'),
('Receptionist'),
('Pharmacist'),
('Lab Technician'),
('Radiologist'),
('Surgeon'),
('Therapist'),
('Medical Assistant'),
('Janitor'),
('Security Guard'),
('IT Support'),
('Accountant');

INSERT INTO department (department) VALUES
('Emergency'),
('Cardiology'),
('Neurology'),
('Pediatrics'),
('Orthopedics'),
('Oncology'),
('Radiology'),
('Gynecology'),
('Urology'),
('Dermatology'),
('Psychiatry'),
('Anesthesiology');

INSERT INTO rooms (room_number, room_type, availability_status) VALUES
('A1', 'General', 'Available'),
('A2', 'General', 'Available'),
('A3', 'Private', 'Available'),
('A4', 'Private', 'Available'),
('A5', 'ICU', 'Available'),
('A6', 'ICU', 'Available'),
('A7', 'Surgery', 'Available'),
('A8', 'Surgery', 'Available'),
('A9', 'General', 'Available'),
('A10', 'Private', 'Available'),
('A11', 'ICU', 'Available'),
('A12', 'Surgery', 'Available'),

('B1', 'General', 'Available'),
('B2', 'General', 'Available'),
('B3', 'Private', 'Available'),
('B4', 'Private', 'Available'),
('B5', 'ICU', 'Available'),
('B6', 'ICU', 'Available'),
('B7', 'Surgery', 'Available'),
('B8', 'Surgery', 'Available'),
('B9', 'General', 'Available'),
('B10', 'Private', 'Available'),
('B11', 'ICU', 'Available'),
('B12', 'Surgery', 'Available'),

('C1', 'General', 'Available'),
('C2', 'General', 'Available'),
('C3', 'Private', 'Available'),
('C4', 'Private', 'Available'),
('C5', 'ICU', 'Available'),
('C6', 'ICU', 'Available'),
('C7', 'Surgery', 'Available'),
('C8', 'Surgery', 'Available'),
('C9', 'General', 'Available'),
('C10', 'Private', 'Available'),
('C11', 'ICU', 'Available'),
('C12', 'Surgery', 'Available');
/**********************************************************************************/
CREATE OR REPLACE FUNCTION update_room_status_combined()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        IF NEW.discharge_date IS NOT NULL THEN
            UPDATE rooms SET availability_status = 'Available' WHERE id = NEW.room_id;
        ELSIF NEW.admission_date IS NOT NULL THEN
            UPDATE rooms SET availability_status = 'Occupied' WHERE id = NEW.room_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_room_status ON admissions;

CREATE TRIGGER trigger_update_room_status
AFTER INSERT OR UPDATE ON admissions
FOR EACH ROW
EXECUTE FUNCTION update_room_status_combined();
/*************************************************************************************/
CREATE OR REPLACE FUNCTION update_payment_status()
RETURNS TRIGGER AS $$
BEGIN
IF NEW.amount_paid>= NEW.total_amount THEN
NEW.status='Paid';
ELSEIF NEW.amount_paid>0 THEN
NEW.status:='Pending';
ELSE
NEW.status := 'Unpaid';
END IF;

RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_payment_status
BEFORE INSERT OR UPDATE OF amount_paid ON payments
FOR EACH ROW
EXECUTE FUNCTION update_payment_status();

/***************************************************************************/

CREATE OR REPLACE FUNCTION update_room_status_on_admission_deletion()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE rooms
  SET availability_status = 'Available'
  WHERE id = OLD.room_id;

  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_room_available_on_delete
AFTER DELETE ON admissions
FOR EACH ROW
EXECUTE FUNCTION update_room_status_on_admission_deletion();

/**************************************************************************************/


CREATE TABLE specialty(
id SERIAL PRIMARY KEY,
specialty VARCHAR(100)
);

INSERT INTO specialty (specialty) VALUES
('Emergency'),
('Cardiology'),
('Neurology'),
('Pediatrics'),
('Orthopedics'),
('Oncology'),
('Radiology'),
('Gynecology'),
('Urology'),
('Dermatology'),
('Psychiatry'),
('Anesthesiology');

ALTER TABLE admissions
ADD CONSTRAINT unique_room_id UNIQUE (room_id);

DROP TRIGGER trigger_update_room_status2 ON admissions;










