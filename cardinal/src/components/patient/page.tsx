import React, { useState } from 'react';
import Image from 'next/image';
import PatientForm from './PatientForm';
import PatientData from './PatientData';

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

export default function Patient() {
  const [edit, setEdit] = useState(false); // State to determine if in edit mode

  return (
    <div className="container mx-auto mt-4">
      {edit ? (
        <PatientForm />
      ) : (
        <PatientData
          // Add any required props for PatientData here. 
          // This is just an example, adjust accordingly.
          name="John Doe"
          age={32}
          gender="Male"
          // ... other props
        />
      )}
      <button 
        onClick={() => setEdit(!edit)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {edit ? 'View Data' : 'Edit Data'}
      </button>
    </div>
  );
}
