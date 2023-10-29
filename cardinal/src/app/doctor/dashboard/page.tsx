"use client";
import React, { useState, useEffect } from 'react';
import { PlusIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { getPatients } from '@/app/utils/dbs/doctor-db';
import { PatientData, MedicationData } from '@/app/utils/models/Patient';
import { addMedication } from '@/app/utils/dbs/patient-db';

const DoctorDashboard = () => {
    const [patients, setPatients] = useState<PatientData[]>([]);
    const [expandedPatient, setExpandedPatient] = useState<string | null>(null);
    const [medicationName, setMedicationName] = useState<string>('');
    const [medicationDosage, setMedicationDosage] = useState<string>('');
    const [medicationInstructions, setMedicationInstructions] = useState<string>('');
    
    const { isLoading, user } = useUser();
    const router = useRouter();
  
    useEffect(() => {
      if (!user || isLoading) return;
      
      const fetchData = async () => {
        const fetchedPatients = await getPatients(user?.sub || '');
        setPatients(fetchedPatients?.patients || []);
      };
      console.log("patients: ", patients)
  
      fetchData();
    }, [user, isLoading]);
  
    const toggleExpand = (patientId: string) => {
      setExpandedPatient(expandedPatient === patientId ? null : patientId);
    };
  
    const handlePrescribe = async (patientId: string) => {
        const medicationData: MedicationData = {
          name: medicationName,
          dosage: medicationDosage,
          instructions: medicationInstructions,
          prescribingDoctor: user?.sub || 'Unknown Doctor'
        };
        
        await addMedication(patientId, medicationData);
        alert('Medication prescribed');
      
        // Reset the form
        setMedicationName('');
        setMedicationDosage('');
        setMedicationInstructions('');
      
        // Manually update the state to reflect the new medication
        const updatedPatients = patients.map((patient) => {
          if (patient.patientId === patientId) {
            return {
              ...patient,
              currentMedications: [...patient.currentMedications, medicationData]
            };
          }
          return patient;
        });
      
        setPatients(updatedPatients);
      };
  
    if (isLoading) {
      return <div>Loading</div>;
    }
  
    if (!user) {
      router.push('/');
    }


  return (
    <div className="p-8 bg-blue-50 text-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        {patients.map((patient) => (
          <div key={patient.patientId} className="p-4 rounded-md bg-white shadow">
            <div className="flex justify-between items-center">
              <span className="text-blue-800 text-lg font-semibold">{patient.name}</span>
              <button 
                onClick={() => toggleExpand(patient.patientId)} 
                className="text-blue-600 hover:text-blue-800">
                {expandedPatient === patient.patientId ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
              </button>
            </div>
            {expandedPatient === patient.patientId && (
              <div className="mt-4 space-y-4">
                <div>
                  <strong>Age:</strong> {patient.age}
                  <br />
                  <strong>Gender:</strong> {patient.gender}
                </div>
                <div>
                  <h3 className="text-md font-semibold mb-2">Medications</h3>
                  {patient.currentMedications.map((medication, index) => (
                    <div key={index} className="p-2 rounded-md bg-gray-100 mb-2">
                      <strong>Name:</strong> {medication.name}
                      <div><strong>Dosage:</strong> {medication.dosage}</div>
                      <div><strong>Instructions:</strong> {medication.instructions}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Medication Name"
                    value={medicationName}
                    onChange={(e) => setMedicationName(e.target.value)}
                    className="w-full p-2 rounded-md border border-blue-300"
                  />
                  <input
                    type="text"
                    placeholder="Dosage"
                    value={medicationDosage}
                    onChange={(e) => setMedicationDosage(e.target.value)}
                    className="w-full p-2 rounded-md border border-blue-300"
                  />
                  <input
                    type="text"
                    placeholder="Instructions"
                    value={medicationInstructions}
                    onChange={(e) => setMedicationInstructions(e.target.value)}
                    className="w-full p-2 rounded-md border border-blue-300"
                  />
                  <button 
                    onClick={() => handlePrescribe(patient.patientId)}
                    className="flex items-center justify-center w-full p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                    <PlusIcon className="h-5 w-5 mr-1" />
                    Prescribe
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default DoctorDashboard;
