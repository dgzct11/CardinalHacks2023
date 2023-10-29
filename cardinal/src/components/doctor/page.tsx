import React, { useState } from 'react';
import Image from 'next/image';
import DoctorDashboard from './DoctorDashboard';
import PatientProfile from './PatientProfile';

// Sample data type for patients. Modify as per your data model.
interface Patient {
  name: string;
  age: number;
  gender: string;
  pastDiseases?: string;
  pastSurgicalProcedures?: string;
  currentMedication?: string;
  currentDisease?: string;
  knownFamilyRisk?: string;
}

export default function Doctor() {
  // This will hold the selected patient's data when a card is clicked.
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Click handler when a patient card is clicked
  const onPatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  return (
    <main className="p-4">
    
      {/* If there's no selected patient, render the dashboard */}
      {!selectedPatient && <DoctorDashboard onPatientClick={onPatientClick} />}

      {/* If a patient card is clicked, render the patient's profile */}
      {selectedPatient && <PatientProfile patient={selectedPatient} />}
    </main>
  );
}
