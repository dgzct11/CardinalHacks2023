// PatientCard.tsx

import React from 'react';

interface PatientCardProps {
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    currentDisease?: string;
  };
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  return (
    <div className="border rounded-md p-4 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2">{patient.name}</h2>
      <div className="grid grid-cols-2 gap-2">
        <span className="text-sm font-medium text-gray-500">Age:</span>
        <span>{patient.age}</span>

        <span className="text-sm font-medium text-gray-500">Gender:</span>
        <span>{patient.gender}</span>

        {patient.currentDisease && (
          <>
            <span className="text-sm font-medium text-gray-500">Current Disease:</span>
            <span>{patient.currentDisease}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
