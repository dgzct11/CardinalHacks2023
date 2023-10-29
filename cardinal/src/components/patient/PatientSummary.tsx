import React from "react";
import { getPatientSummary } from "@/app/utils/dbs/patient-db";

const PatientSummary: React.FC<{ patientId: string }> = ({ patientId }) => {
    const [summary, setSummary] = React.useState<string | null>(null);
  
    // Fetch the patient summary on component mount.
    React.useEffect(() => {
      async function fetchData() {
        const { summary, error } = await getPatientSummary(patientId);
        if (!error) {
          setSummary(summary);
        } else {
          // Handle error (e.g., show a notification to the user).
        }
      }
  
      fetchData();
    }, [patientId]);
  
    return (
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl m-auto mt-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Patient Summary</h2>
        <pre className="mt-4 whitespace-pre-wrap">{summary || 'Loading...'}</pre>
      </div>
    );
  };
  
  export default PatientSummary;
  