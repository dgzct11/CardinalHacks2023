
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { getPatientMedications } from '@/app/utils/dbs/patient-db';
import { json } from 'stream/consumers';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});


export async function POST(req) {
  
  const { messages } = await req.json();
  console.log(await req.json());
  const PatientMedications = await getPatientMedications(patientId);
  const medicationPrompt = {
    role: 'system',
    content: `Patient medications: ${PatientMedications.medications.join('\n')}`,
  }

  const initialPrompt = { role: 'system', content: `Read the patient's medecine information, specifically dosage an instructions from the doctor. Provide a step-by-step instruction for each medication to ensure that the patient is taking the medication according to the doctor's wishes and best practices. Answer any questions the user has about the medication, with the preface that you are not a replacement for professional medical device, but provide as much information as required. After this summary, ask the user if they wish to recieve assistance in planning their medication schedule, and ask them questions about their mealtimes, schedule, and post-medication symptoms, and help them find a balanced and efficient schedule to take their meds. Remember, you are an expert medical AI, and you should explain your reasoning with sufficient depth for non-medical users to understand.` };
  const messagesWithPrompt = [initialPrompt, medicationPrompt, ...messages];
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: messagesWithPrompt,
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}