// PatientProfile.tsx

import React from 'react';
import { useState } from 'react';

interface Patient {
    id: number;
  name: string;
  age: number;
  gender: string;
  pastDiseases?: string;
  pastSurgicalProcedures?: string;
  currentMedication?: string;
  currentDisease?: string;
  knownFamilyRisk?: string;
}

interface PatientProfileProps {
  patient: Patient;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
    const [doctorNotes, setDoctorNotes] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [medication, setMedication] = useState('');

    const handleSaveNotes = () => {
        // Here you'd typically send the data to the backend to save it
        console.log('Doctor notes:', doctorNotes);
        console.log('Diagnosis:', diagnosis);
        console.log('Medication:', medication);
      }

  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Patient Profile</h2>
      
      {/* Patient Personal Info */}
      <div className="mt-4">
        <h3 className="text-xl font-medium mb-2">Personal Information</h3>
        <DataField label="Name" value={patient.name} />
        <DataField label="Age" value={patient.age} />
        <DataField label="Gender" value={patient.gender} />
        <DataField label="Current Disease" value={patient.currentDisease} />
      </div>

      {/* Medical History */}
      <div className="mt-6">
        <h3 className="text-xl font-medium mb-2">Medical History</h3>
        <DataField label="Past Diseases" value={patient.pastDiseases} />
        <DataField label="Past Surgical Procedures" value={patient.pastSurgicalProcedures} />
        <DataField label="Current Medication" value={patient.currentMedication} />
        <DataField label="Known Family Risk Factors" value={patient.knownFamilyRisk} />
      </div>

      {/* Doctor's Notes and Medication */}
      <div className="mt-6">
        <h3 className="text-xl font-medium mb-2">Doctor's Notes</h3>
        <textarea className="w-full p-2 border rounded-md"></textarea>
        
        <h3 className="text-xl font-medium mb-2 mt-4">Diagnosis</h3>
        <textarea className="w-full p-2 border rounded-md"></textarea>

        <h3 className="text-xl font-medium mb-2 mt-4">Medication</h3>
        <textarea className="w-full p-2 border rounded-md"></textarea>
      </div>
      {/* Doctor's Notes */}
      <div className="mt-6">
        <h3 className="text-xl font-medium mb-2">Doctor's Notes</h3>
        <textarea 
          value={doctorNotes}
          onChange={(e) => setDoctorNotes(e.target.value)}
          className="w-full p-2 border rounded-md"></textarea>
      </div>

      {/* Diagnosis */}
      <div className="mt-6">
        <h3 className="text-xl font-medium mb-2">Diagnosis</h3>
        <textarea 
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="w-full p-2 border rounded-md"></textarea>
      </div>

      {/* Medication */}
      <div className="mt-6 mb-6">
        <h3 className="text-xl font-medium mb-2">Medication</h3>
        <textarea 
          value={medication}
          onChange={(e) => setMedication(e.target.value)}
          className="w-full p-2 border rounded-md"></textarea>
      </div>
      
      {/* Save Button */}
      <button 
        onClick={handleSaveNotes}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300">
        Save Changes
      </button>
      
    </div>
  );
};

const DataField: React.FC<{ label: string, value: string | number }> = ({ label, value }) => {
  return (
    <div className="flex flex-col mt-2">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-lg">
        {value || 'There is no record yet.'}
      </span>
    </div>
  );
}

export default PatientProfile;
