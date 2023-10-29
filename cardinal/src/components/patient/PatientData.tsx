import React from 'react';
import Link from 'next/link';
import CustomButton from '../CustomButton';
import { useRouter } from 'next/router';

interface PatientDataProps {
  name: string;
  age: number;
  gender: string;
  pastDiseases?: string;
  pastSurgicalProcedures?: string;
  currentMedication?: string;
  currentDisease?: string;
  currentTreatments?: string;
  currentSurgical?: string;
  knownFamilyRisk?: string;
}

const PatientData: React.FC<PatientDataProps> = ({
  name,
  age,
  gender,
  pastDiseases,
  pastSurgicalProcedures,
  currentMedication,
  currentDisease,
  knownFamilyRisk,
}) => {
  const router = useRouter();


  const handleEditClick = () => {
    router.push("/edit-patient-data");
  };


  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Patient Details</h2>
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-4">
        <DataField label="Name" value={name} />
        <DataField label="Age" value={age} />
        <DataField label="Gender" value={gender} />
        <DataField label="Past Diseases" value={pastDiseases} />
        <DataField label="Past Surgical Procedures" value={pastSurgicalProcedures} />
        <DataField label="Current Medication" value={currentMedication} />
        <DataField label="Current Diseases" value={currentDiseases} />
        <DataField label="Known Family Risk Factors" value={knownFamilyRisk} />
      </div>
    </div>
    <div className="mt-6">
        
        <CustomButton 
                title="Edit Info"
                btnType = "button"
                containerStyles='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300'
                onClick = {handleEditClick}
                />
      </div>
  </div>
  );
};

const DataField: React.FC<{ label: string, value: string | number }> = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-lg">
        {value || 'There is no record yet.'}
      </span>
    </div>
  );
}

export default PatientData;
