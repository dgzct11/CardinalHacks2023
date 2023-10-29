import React, { useState } from 'react';
import Image from 'next/image';
import PatientForm from './PatientForm';
import PatientData from './PatientData';
import CustomButton from '../CustomButton';
import Navbar from './Navbar';
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
  const [edit, setEdit] = useState(true); // State to determine if in edit mode
  
  return (
    
    <div className="container mx-auto mt-4">
      {!edit ? (
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
      {edit && (
        <CustomButton 
          handleClick={() => setEdit(!edit)}
          title="Edit Info"
          btnType="button"
          containerStyles='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300'
        >
          {edit ? 'View Data' : 'Edit Data'}
        </CustomButton>
      )}
    </div>
  );
}
