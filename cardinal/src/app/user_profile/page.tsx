"use client";

import { useState, useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  const { user, error, isLoading } = useUser();

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

    // Update Auth0 roles and user information
    const res = await fetch("/api/updateUserRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, name, email, role }),
    });

    const data = await res.json();
    // Handle response here (e.g., redirect to dashboard)
  };

  

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-800">
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
            <option value="" disabled>
              Select Role
            </option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>
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

export default UserProfile;
