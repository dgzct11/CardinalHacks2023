import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { getPatientMedications } from '@/app/utils/dbs/patient-db';
import { Session } from '@auth0/nextjs-auth0';
import { getSession } from '@auth0/nextjs-auth0';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});


export async function POST(req) {
  const { messages } = await req.json();

  const initialPrompt = { role: 'system', content: `Read the patient's information, double check, and give them instructions` };

  const session = getSession(req);
  const patientId = session.patientId;

  
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

  
  if ( PatientMedications.medications.length === 0) {
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
    model: 'gpt-4',
    messages: messagesWithPrompt,
    stream: true,
  });


  const stream = OpenAIStream(response);
  console.log(stream);
  return new StreamingTextResponse(stream);

  

}