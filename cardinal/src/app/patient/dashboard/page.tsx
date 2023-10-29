"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { getAllDoctors, getDoctor } from '@/app/utils/dbs/doctor-db';
import { addDoctor, getPatientMedications } from '@/app/utils/dbs/patient-db';
import { DoctorData } from '@/app/utils/models/Doctor';
import { MedicationData } from '@/app/utils/models/Patient';

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [medications, setMedications] = useState<MedicationData[]>([]);
  const [expandedDoctor, setExpandedDoctor] = useState<string | null>(null);
  const [showAddDoctor, setShowAddDoctor] = useState<boolean>(false);
  const { isLoading, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || isLoading) return;
    const fetchData = async () => {
      const allDoctors = await getAllDoctors();
      setDoctors(allDoctors?.doctors || []);
      const patientMedications = await getPatientMedications(user?.sub || '');
      setMedications(patientMedications?.medications || []);
    };
    fetchData();
  }, [user, isLoading]);

  const toggleExpand = (doctorId: string) => {
    setExpandedDoctor(expandedDoctor === doctorId ? null : doctorId);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!user) {
    router.push('/');
  }

  const patientDoctors = new Set(medications.map(m => m.prescribingDoctor));

  const handleAddDoctor = async () => {
    await addDoctor(user?.sub || '', selectedDoctor || '');
    alert('Doctor added');
    setShowAddDoctor(false);
    setSelectedDoctor(null);

    const allDoctors = await getAllDoctors();
    setDoctors(allDoctors?.doctors || []);
  };

  const availableDoctors = doctors.filter(d => !patientDoctors.has(d.name));

  return (
    <div className="p-8 text-gray-800 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Patient Dashboard</h1>
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
            {availableDoctors.map((doctor) => (
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

      <h2 className="text-xl font-semibold mb-2 text-gray-900">Your Doctors</h2>
      <ul className="mb-4">
        {/* Replace this part with actual data */}
        {doctors.map((doctor) => (
          <li key={doctor.doctorId}>{doctor.name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2 text-gray-900">Your Medications</h2>
      <ul>
        {medications.map((medication, index) => (
          <li key={index} className="mb-4">
            <div className="flex justify-between items-center">
              <span>{medication.prescribingDoctor}</span>
              <button onClick={() => toggleExpand(medication.prescribingDoctor)}>
                {expandedDoctor === medication.prescribingDoctor ? 'Collapse' : 'Expand'}
              </button>
            </div>

            {expandedDoctor === medication.prescribingDoctor && (
              <div className="mt-2">
                <div><strong>Medication:</strong> {medication.name}</div>
                <div><strong>Dosage:</strong> {medication.dosage}</div>
                <div><strong>Instructions:</strong> {medication.instructions}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientDashboard;
