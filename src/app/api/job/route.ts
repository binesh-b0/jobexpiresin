import { NextResponse } from 'next/server';

const GEMINI_API_URL = process.env.GEMINI_API_URL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-1.5-flash';
const JOB_PROMPT_STRUCTURE = process.env.JOB_PROMPT_STRUCTURE;

function resolveGeminiEndpoint() {
  const defaultUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  if (!GEMINI_API_URL) {
    return defaultUrl;
  }

  const trimmedUrl = GEMINI_API_URL.replace(/\/+$/, '');

  if (trimmedUrl.includes(':generateContent')) {
    return trimmedUrl;
  }

  if (trimmedUrl.includes('/models/')) {
    return `${trimmedUrl}:generateContent`;
  }

  return `${trimmedUrl}/models/${GEMINI_MODEL}:generateContent`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobTitle = searchParams.get('jobTitle');

  if (!jobTitle) {
    return NextResponse.json({ error: 'Job title is required.' }, { status: 400 });
  }

  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not configured.');
    return NextResponse.json({ error: 'Gemini API key is not configured.' }, { status: 500 });
  }

  try {
    const geminiEndpoint = resolveGeminiEndpoint();
    const requestUrl = new URL(geminiEndpoint);
    requestUrl.searchParams.set('key', GEMINI_API_KEY);

    // Call the Gemini API with the job title
    const geminiResponse = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${JOB_PROMPT_STRUCTURE} "${jobTitle}"~ in **valid JSON format** with the following structure:
                {
                  "title": "string",
                  "similarJobs": ["string", "string", "string"],
                  "importantResponsibilities": ["string", "string", "string"],
                  "replacedIn": "string",
                  "reason": ["string", "string", "string"]
                }. 
                Only output JSON. No explanations, no formatting.`
              }
            ]
          }
        ]
      }),
    });

    const responseData = await geminiResponse.json();

    if (!geminiResponse.ok) {
      const errorMessage =
        responseData?.error?.message || `Gemini API error: ${geminiResponse.statusText}`;
      throw new Error(errorMessage);
    }

    // Log the full response to check what is being returned
    console.log('Full Gemini API Response:', JSON.stringify(responseData, null, 2));

    // Extract the generated content from the Gemini API response
    let generatedText = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No content generated from Gemini API');
    }

    // Remove the code block formatting (```json ... ```)
    generatedText = generatedText.replace(/```json|```/g, '').trim();

    // Use regex to extract only the JSON part from the response
    const jsonMatch = generatedText.match(/{[\s\S]*}/);

    if (!jsonMatch) {
      throw new Error('Failed to extract valid JSON from the response');
    }

    const jsonText = jsonMatch[0];

    // Attempt to parse the extracted JSON
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonText);
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
