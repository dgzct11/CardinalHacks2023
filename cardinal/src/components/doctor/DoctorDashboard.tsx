// DoctorDashboard.tsx

import React from 'react';
import Navbar from './Navbar';
import PatientCard from './PatientCard';
import Link from 'next/link';

interface DoctorDashboardProps {
  patients: Array<Patient>;
}

interface Patient {
  id: string; // Unique identifier for each patient, useful for routing.
  name: string;
  age: number;
  gender: string;
  currentDisease?: string;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ patients }) => {

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">Patients</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients && patients.map((patient) => (
            <Link key={patient.id} href={`/patient-profile/${patient.id}`}>
              
                <PatientCard patient={patient} />
              
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
