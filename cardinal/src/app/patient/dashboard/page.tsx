"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { getAllDoctors, getDoctor } from '@/app/utils/dbs/doctor-db';
import { addDoctor, getPatientDoctors, getPatientMedications } from '@/app/utils/dbs/patient-db';
import { DoctorData } from '@/app/utils/models/Doctor';
import { MedicationData } from '@/app/utils/models/Patient';

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [allDoctors, setAllDoctors] = useState<DoctorData[]>([]);
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
      setAllDoctors(allDoctors?.doctors || []);

      const patientMedications = await getPatientMedications(user?.sub || '');
      setMedications(patientMedications?.medications || []);

      const doctors = await getPatientDoctors(user.sub || "");
      setDoctors(doctors.doctors || []);
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

  const patientDoctors = new Set(doctors);

  const handleAddDoctor = async () => {
    await addDoctor(user?.sub || '', selectedDoctor || '');
    alert('Doctor added');
    setShowAddDoctor(false);
    setSelectedDoctor(null);

    const allDoctors = await getPatientDoctors(user?.sub || "");
    setDoctors(allDoctors?.doctors || []);
  };

  const availableDoctors = allDoctors.filter(d => !patientDoctors.has(d));



  return (
    <div className="p-8 bg-blue-50 text-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Patient Dashboard</h1>
      
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
      {/* Doctor List */}
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Your Doctors</h2>
      <div className="grid grid-cols-1 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor.doctorId} className="p-4 rounded-md bg-white shadow">
            <div className="flex justify-between items-center">
              <span className="text-blue-800 text-lg font-semibold">{doctor.name}</span>
              {/* Additional doctor information can be added here */}
            </div>
          </div>
        ))}
      </div>

      {/* Medication List */}
      <h2 className="text-xl font-semibold my-4 text-blue-700">Your Medications</h2>
      <div className="grid grid-cols-1 gap-4">
        {medications.map((medication, index) => (
          <div key={index} className="p-4 rounded-md bg-white shadow">
            <h3 className="text-blue-800 text-lg font-semibold">{medication.name}</h3>
            <div>
              <strong>Prescribing Doctor:</strong> {medication.prescribingDoctorName}
              <div><strong>Dosage:</strong> {medication.dosage}</div>
              <div><strong>Instructions:</strong> {medication.instructions}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


};

export default PatientDashboard;
