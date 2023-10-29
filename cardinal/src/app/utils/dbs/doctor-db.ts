import { Doctor, DoctorData } from '../models/Doctor';  // Replace with the actual path to your Doctor model file
import { Patient, MedicationData } from '../models/Patient';  // Replace with the actual path to your Patient model file

// Connect to MongoDB (Replace this with your actual MongoDB connection logic)
async function connectDB() {
  // Your MongoDB connection logic here
}

// Retrieve a Doctor by their ID
export async function getDoctor(doctorId: string) {
  try {
    await connectDB();
    const doctor = await Doctor.findOne({ doctorId });
    if (!doctor) {
      return { error: 'Doctor not found' };
    }
    return { doctor };
  } catch (error) {
    return { error };
  }
}

// Add a new patient to a specific doctor
export async function addPatient(doctorId: string, patientId: string) {
  try {
    await connectDB();
    const doctor = await Doctor.findOne({ doctorId });
    if (!doctor) {
      return { error: 'Doctor not found' };
    }
  
    doctor.patientsIds.push(patientId);
    await doctor.save();
    return { doctor };
  } catch (error) {
    return { error };
  }
}

// Retrieve all patients for a specific doctor
export async function getPatients(doctorId: string) {
  try {
    await connectDB();
    const doctor = await Doctor.findOne({ doctorId });
    if (!doctor || !doctor.patientsIds) {
      return { error: 'Doctor not found or no patients found' };
    }

    const patients = await Patient.find({ 'patientId': { $in: doctor.patientsIds } });
    return { patients };
  } catch (error) {
    return { error };
  }
}

// Add medication to a specific patient for a specific doctor
export async function addMedicationToPatient(doctorId: string, patientId: string, medicationData: MedicationData) {
  try {
    await connectDB();
    const doctor = await Doctor.findOne({ doctorId });
    if (!doctor) {
      return { error: 'Doctor not found' };
    }

    if (!doctor.patientsIds.includes(patientId)) {
      return { error: 'Patient not associated with this doctor' };
    }

    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return { error: 'Patient not found' };
    }

    patient.currentMedications.push(medicationData);
    await patient.save();
    return { patient };
  } catch (error) {
    return { error };
  }
}


export async function getAllDoctors() {
  try {
    await connectDB();
    const doctors = await Doctor.find({}); // Empty filter to get all doctors
    if (!doctors || doctors.length === 0) {
      return { error: 'No doctors found' };
    }
    return { doctors };
  } catch (error) {
    return { error };
  }
}