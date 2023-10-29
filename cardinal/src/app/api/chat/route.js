import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { getPatientMedications } from '@/app/utils/dbs/patient-db';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});


export async function POST(req) {
  const { messages } = await req.json();

  const initialPrompt = { role: 'system', content: `Read the patient's information, double check, and give them instructions` };

  const patientId = 'YOUR_PATIENT_ID';
  const PatientMedications = await getPatientMedications(patientId);

  console.log(PatientMedications)
console.log("hello")
  if (PatientMedications.error) {
    // Handle the error case when patient medications are not found
    const errorResponse = {
        status: 400, // You can choose an appropriate status code
        body: JSON.stringify({ error: PatientMedications.error }),
      };
      return errorResponse;
  }

  
  if (!PatientMedications.medications || PatientMedications.medications.length === 0) {
    const emptyResponse = {
      status: 200, // You can choose an appropriate status code
      body: JSON.stringify({ message: 'No medications found for this patient' }),
    };
    return emptyResponse;
  }
  console.log("hello")

  const medicationPrompt = {
    role: 'system',
    content: `Patient medications: ${PatientMedications.medications.join(', ')}`,
  }


  const messagesWithPrompt = [initialPrompt, medicationPrompt, ...messages];


  
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messagesWithPrompt,
    stream: true,
  });


  const stream = OpenAIStream(response);
  console.log(stream);
  return new StreamingTextResponse(stream);

  

}