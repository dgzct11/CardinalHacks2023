import { Doctor, DoctorData } from './YourDoctorModelFile';  // Replace with the actual path to your Doctor model file
import { Patient, MedicationData } from './YourPatientModelFile';  // Replace with the actual path to your Patient model file

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

    doctor.patientIds.push(patientId);
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
    if (!doctor || !doctor.patientIds) {
      return { error: 'Doctor not found or no patients found' };
    }

    const patients = await Patient.find({ 'patientId': { $in: doctor.patientIds } });
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

    if (!doctor.patientIds.includes(patientId)) {
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
