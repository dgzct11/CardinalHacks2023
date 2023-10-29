"use server";
import { Patient, PatientData, MedicationData } from '../models/Patient'; // Replace with the actual path to your model file
import mongoose from 'mongoose';
import connectDB from './connect-db'
// Connect to MongoDB (Replace this with your actual MongoDB connection logic)

// Add a new doctor to a specific patient
export async function addDoctor(patientId: string, doctorId: string) {
  try {
    await connectDB();
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return { error: 'Patient not found' };
    }

    patient.doctorIds.push(doctorId);
    await patient.save();
    return { patient };
  } catch (error) {
    return { error };
  }
}

// Create a new Patient
export async function createPatient(patientData: PatientData) {
  try {
    await connectDB();
    const patient = await Patient.create(patientData);
    return { result: true };
  } catch (error) {
    return { result: false };
  }
}

// Retrieve a Patient by their ID
export async function getPatient(patientId: string) {
  try {
    await connectDB();
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return { error: 'Patient not found' };
    }

    return { patient };
  } catch (error) {
    return { error };
  }
}

// Add medication to a specific patient
export async function addMedication(patientId: string, medicationData: MedicationData) {
  try {
    await connectDB();
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

// Update a Patient's information
export async function updateInformation(patientId: string, updatedData: Partial<PatientData>) {
  try {
    await connectDB();
    const patient = await Patient.findOneAndUpdate({ patientId }, updatedData, { new: true });
    if (!patient) {
      return { error: 'Patient not found' };
    }

    return { patient };
  } catch (error) {
    return { error };
  }
}

// Add medical allergies to a specific patient
export async function addMedicalAllergy(patientId: string, allergy: string) {
  try {
    await connectDB();
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return { error: 'Patient not found' };
    }

    patient.medicationAllergies.push(allergy);
    await patient.save();
    return { patient };
  } catch (error) {
    return { error };
  }
}

export async function getPatientMedications(patientId: string) {
  try {
    await connectDB();
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return { error: 'Patient not found' };
    }

    const medications: MedicationData[] = patient.currentMedications; // Assuming `currentMedications` is the field in your model
    if (!medications || medications.length === 0) {
      return { error: 'No medications found for this patient' };
    }

    return { medications };
  } catch (error) {
    return { error };
  }
}