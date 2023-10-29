"use client";
import React, { useState } from "react";

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    gender: "",
    pastDiseases: "",
    pastSurgicalProcedures: "",
    currentDiseases: "",
    currentMedication: "",
    knownFamilyRisk: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send formData to your API or state management
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <div className="patient-form__personal-info">
        <div className="mb-4">
          <label htmlFor="name" className="patient-form__label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="patient-form__label">
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="gender"
            className="patient-form__label"
          >
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-black text-black"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="patient-form__medical-history">
        <div className="mb-4">
          <label
            htmlFor="pastDiseases"
            className="patient-form__label"
          >
            Past Diseases:
          </label>
          <textarea
            id="pastDiseases"
            name="pastDiseases"
            value={formData.pastDiseases}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-black"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="pastSurgicalProcedures"
            className="patient-form__label"
          >
            Past Surgical Procedures:
          </label>
          <textarea
            id="pastSurgicalProcedures"
            name="pastSurgicalProcedures"
            value={formData.pastSurgicalProcedures}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-black"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="currentMedication"
            className="patient-form__label"
          >
            Past Medication:
          </label>
          <textarea
            id="currentMedication"
            name="currentMedication"
            value={formData.currentMedication}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-black"
          />
        </div>

        
      

      
      <div className="mb-4">
        <label
          htmlFor="knownFamilyRisk"
          className="patient-form__label"
        >
          Known Family Risk Factors:
        </label>
        <textarea
          id="knownFamilyRisk"
          name="knownFamilyRisk"
          value={formData.knownFamilyRisk}
          onChange={handleInputChange}
          className="border rounded w-full py-2 px-3 text-black"
        />
      </div>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
