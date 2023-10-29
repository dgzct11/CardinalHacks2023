"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllDoctors, getDoctor } from '@/app/utils/dbs/doctor-db';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { addDoctor, getPatientMedications } from '@/app/utils/dbs/patient-db';
import { DoctorData } from '@/app/utils/models/Doctor';
import { MedicationData } from '@/app/utils/models/Patient';

const PatientDashboard = () => {
    const [doctors, setDoctors] = useState<DoctorData[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
    const [medications, setMedications] = useState<MedicationData[]>([]);
    const [expandedDoctor, setExpandedDoctor] = useState<string | null>(null);
    const [showAddDoctor, setShowAddDoctor] = useState<boolean>(false);
  const {isLoading, user} = useUser();
  const router = useRouter();
  if(isLoading) {
    return <div>Loading</div>
  }
  if(!user){
    router.push("/");
  }
  useEffect(() => {
    // Fetch the list of doctors
    const fetchData = async () => {
        setDoctors( (await getAllDoctors()).doctors || []);
        setMedications((await getPatientMedications(user?.sub || "")).medications || []);
    }
    

    // Fetch the list of medications for the patient
   fetchData();
  }, [user]);

  const toggleExpand = (doctorId: string) => {
    if (expandedDoctor === doctorId) {
      setExpandedDoctor(null);
    } else {
      setExpandedDoctor(doctorId);
    }
  };

  const handleAddDoctor =  () => {
    // Your logic to add the selected doctor to the patient
    // You might call an API route like '/api/addDoctorToPatient'
    addDoctor(user?.sub || "", selectedDoctor || "");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1>

      <button onClick={() => setShowAddDoctor(!showAddDoctor)} className="bg-blue-500 text-white p-2 rounded mb-4">
        Add Doctor
      </button>

      {showAddDoctor && (
        <div className="mb-4">
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="" disabled selected>Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctorId} value={doctor.doctorId}>
                {doctor.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddDoctor} className="bg-green-500 text-white p-2 rounded mt-2">
            Confirm
          </button>
        </div>
      )}

      <ul>
        {medications.map((medication) => (
          <li key={medication.name} className="mb-4">
            <div className="flex justify-between items-center">
              <span>{medication.prescribingDoctor}</span>
              <button onClick={() => toggleExpand(medication.prescribingDoctor)}>
                {expandedDoctor === medication.prescribingDoctor ? (
                  <span className="material-icons">expand_less</span>
                ) : (
                  <span className="material-icons">expand_more</span>
                )}
              </button>
            </div>

            {expandedDoctor === medication.prescribingDoctor && (
              <div className="mt-2">
                <div className="mb-2">
                  <strong>Medication:</strong> {medication.name}
                </div>
                <div className="mb-2">
                  <strong>Dosage:</strong> {medication.dosage}
                </div>
                <div className="mb-2">
                  <strong>Instructions:</strong> {medication.instructions}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDashboard;
