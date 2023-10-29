"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { getAllDoctors, getDoctor } from "@/app/utils/dbs/doctor-db";
import {
  addDoctor,
  getPatientDoctors,
  getPatientMedications,
} from "@/app/utils/dbs/patient-db";
import { DoctorData } from "@/app/utils/models/Doctor";
import { MedicationData } from "@/app/utils/models/Patient";

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [allDoctors, setAllDoctors] = useState<DoctorData[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [medications, setMedications] = useState<MedicationData[]>([]);

  const [expandedDoctor, setExpandedDoctor] = useState<string | null>(null);
  const [showAddDoctor, setShowAddDoctor] = useState<boolean>(false);
  const { isLoading, user } = useUser();
  const router = useRouter();

  const handleChatPrompt = () => {
    const prompt = "Can you provide instructions for my medication?";

    router.push(`/chat`);
  };

  useEffect(() => {
    if (!user || isLoading) return;
    const fetchData = async () => {
      const allDoctors = await getAllDoctors();
      setAllDoctors(allDoctors?.doctors || []);

      const patientMedications = await getPatientMedications(user?.sub || "");
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
    router.push("/");
  }

  const patientDoctors = new Set(doctors);

  const handleAddDoctor = async () => {
    await addDoctor(user?.sub || "", selectedDoctor || "");
    alert("Doctor added");
    setShowAddDoctor(false);
    setSelectedDoctor(null);

    const allDoctors = await getPatientDoctors(user?.sub || "");
    setDoctors(allDoctors?.doctors || []);
  };

  const availableDoctors = allDoctors.filter((d) => !patientDoctors.has(d));

  return (
    <div className="font-sans bg-blue-50 text-gray-900 min-h-screen">

      {/* Navbar */}
      <nav className="flex items-center justify-between bg-blue-900 p-4 text-white">
        <h1 className="text-2xl font-bold">Cardinal</h1>
      </nav>

      <h1 className="text-2xl font-bold mt-4 mb-4 pl-6 text-black">Patient Dashboard</h1>

      <div className="mt-4 pl-6 pr-6">
        <button onClick={() => setShowAddDoctor(!showAddDoctor)} className="bg-blue-500 text-white p-4 rounded mb-4">
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
      </div>

      {/* Doctor List with different background */}
      <div className="bg-blue-50 p-6 rounded">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Your Doctors</h2>
        <div className="grid grid-cols-1 gap-4">
          {doctors.length === 0 ? (
            <div className="mb-4">
              <p className="text-red-600">No doctor selected</p>
            </div>
          ) : (
            doctors.map((doctor) => (
              <div key={doctor.doctorId} className="p-4 rounded-md bg-white shadow">
                <h3 className="text-blue-800 text-lg font-semibold">{doctor.name}</h3>
                {/* Additional doctor information can be added here */}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Medication List with different background */}
      <div className="bg-blue-200 p-6 rounded">
        <h2 className="text-xl font-bold mt-2 mb-6 text-blue-900">Your Medications</h2>
        {medications.length === 0 && <p className="mb-4 text-red-600">No medication prescribed yet.</p>}
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

      {/* Chat Box */}
      <div className="pl-6">
        <button
          onClick={handleChatPrompt}
          className="bg-blue-500 text-white p-3 rounded mt-4"
        >
          Chat for Meds Instructions
        </button>
      </div>
    </div>
  )};

export default PatientDashboard;
