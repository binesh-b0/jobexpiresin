import { NextResponse } from 'next/server';

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobTitle = searchParams.get('jobTitle');

  if (!jobTitle) {
    return NextResponse.json({ error: 'Job title is required.' }, { status: 400 });
  }

  try {
    // Call the Gemini API with the job title
    const geminiResponse = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Generate a detailed job description for the job title "${jobTitle}" in JSON format with the following structure:
                {
                  "title": "string",
                  "similarJobs": ["string", "string", "string"],
                  "importantResponsibilities": ["string", "string", "string"],
                  "replacedIn": "string",
                  "reason": ["string", "string", "string"]
                }. 
                Include the job title, similar jobs, key responsibilities, replacement timeframe, and reasons for replacement.`
              }
            ]
          }
        ]
      }),
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.statusText}`);
    }

    const responseData = await geminiResponse.json();

    // Log the full response to check what is being returned
    console.log('Full Gemini API Response:', JSON.stringify(responseData, null, 2));

    // Extract the generated content from the Gemini API response
    let generatedText = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No content generated from Gemini API');
    }

    // Remove the code block formatting (```json ... ```)
    generatedText = generatedText.replace(/```json|```/g, '').trim();

    // Attempt to parse the response directly as JSON
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(generatedText); // Assuming the content is now valid JSON
    } catch (e) {
      console.error('Error parsing generated content:', e);
      throw new Error('Failed to parse JSON from generated text');
    }

    return NextResponse.json(parsedResponse);

  } catch (error) {
    console.error('Error generating job description:', error);
    return NextResponse.json({ error: 'Failed to generate job description.' }, { status: 500 });
  }
}
