"use client";

import { useState, useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';

import { useRouter } from "next/navigation";
import {encodePipeCharacter} from "../utils/functions"
import { createDoctor } from "../utils/dbs/doctor-db";
import { createPatient } from "../utils/dbs/patient-db";
import { DoctorData } from "../utils/models/Doctor";
import { PatientData } from "../utils/models/Patient";


export default  function UserProfile(){
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<string>("default");
    const [userId, setUserId] = useState<string>("");
    
    const [age, setAge] = useState<string>(""); // For Patient only
    const [gender, setGender] = useState<string>(""); // For Patient only


  const { user, error, isLoading } = useUser();
    const router = useRouter();
  useEffect(() => {
    if (user) {
      // Assuming the user object has a `sub` field that contains the user ID
      setUserId(user.sub || "");
    }
  }, [user]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!userId) {
      // Handle error: user ID should exist at this point
      return;
    }
    
    if (role === "rol_BgWFZ4OjEAPxhJm4") { // If Doctor
        const doctorData: DoctorData = {
          doctorId: userId,
          name,
          patientsIds: []
        };
        await createDoctor(doctorData);
      } else if (role === "rol_67XOTgEsxsUhR2U8") { // If Patient
        const patientData: PatientData = {
          patientId: userId,
          name,
          age,
          gender,
          medicationAllergies: [], 
          currentMedications: [], 
          doctorIds: []
        };
        await createPatient(patientData);
      }
    // Update Auth0 roles and user information
    const res = await fetch("/api/user_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: encodePipeCharacter(userId), name, email, role }),
      });
  
    router.push("/api/auth/login");
    //console.log(res);
    // Handle response here (e.g., redirect to dashboard)
  };

  

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-blue-300 text-gray-800">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded shadow-md w-96"
      >
        <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="default" disabled>
              Select Role
            </option>
            <option value="rol_BgWFZ4OjEAPxhJm4">Doctor</option>
            <option value="rol_67XOTgEsxsUhR2U8">Patient</option>
          </select>
        </div>

           {/* Role-based fields */}
      {role === "rol_67XOTgEsxsUhR2U8" && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Age
            </label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Gender
            </label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </>
      )}
      

        
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

