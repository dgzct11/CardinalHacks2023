"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [expandedPatient, setExpandedPatient] = useState(null);
  const [medicationName, setMedicationName] = useState('');
  const [medicationDosage, setMedicationDosage] = useState('');
  const [medicationInstructions, setMedicationInstructions] = useState('');

  useEffect(() => {
    axios.get('/api/getPatients')
      .then(response => {
        setPatients(response.data.patients);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  const toggleExpand = (patientId) => {
    if (expandedPatient === patientId) {
      setExpandedPatient(null);
    } else {
      setExpandedPatient(patientId);
    }
  };

  const handlePrescribe = (patientId) => {
    // Similar to the previous handlePrescribe, but uses patientId from the argument
    // ...
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>

      <ul>
        {patients.map((patient) => (
          <li key={patient.patientId} className="mb-4">
            <div className="flex justify-between items-center">
              <span>{patient.name}</span>
              <button onClick={() => toggleExpand(patient.patientId)}>
                {expandedPatient === patient.patientId ? (
                  <span className="material-icons">expand_less</span>
                ) : (
                  <span className="material-icons">expand_more</span>
                )}
              </button>
            </div>

            {expandedPatient === patient.patientId && (
              <div className="mt-2">
                <div className="mb-2">
                  <strong>Age:</strong> {patient.age}
                </div>
                <div className="mb-2">
                  <strong>Gender:</strong> {patient.gender}
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">Medication Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={medicationName}
                    onChange={(e) => setMedicationName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">Dosage</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={medicationDosage}
                    onChange={(e) => setMedicationDosage(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">Instructions</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    value={medicationInstructions}
                    onChange={(e) => setMedicationInstructions(e.target.value)}
                  />
                </div>

                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={() => handlePrescribe(patient.patientId)}
                >
                  Prescribe Medication
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorDashboard;
