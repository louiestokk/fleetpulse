import { GoogleGenerativeAI } from "@google/generative-ai";

export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "GEMINI_API_KEY is not configured on Netlify. Please add it to your environment variables." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { route, distance, salaryRate, tolls, ferries, risk } = await req.json();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const prompt = `
Role: B2B Transport Pricing Analyst.
We need to bid on a freight contract:
- Route: ${route}
- Distance: ${distance} km
- Driver salary: ${salaryRate} SEK/hour
- Estimated tolls: ${tolls} SEK
- Estimated ferries: ${ferries} SEK
- Delay risk profile: ${risk}

Generate a JSON object representing the bid calculation. Use this exact JSON structure:
{
  "distance": ${distance},
  "fuelCost": <number representing suggested 4.5 SEK/km>,
  "wages": <number representing salary rate multiplied by estimated hours at avg speed of 70 km/h>,
  "tollsAndFerries": ${tolls + ferries},
  "riskReserve": <risk buffer, e.g. 1000-3000 SEK based on risk level>,
  "totalCost": <sum of fuel, wages, tolls, ferries, and risk reserve>,
  "recommendedPricePerKm": <recommended price per km (target margin is 14.3%, so totalBid = totalCost / (1 - 0.143). RecommendedPricePerKm = totalBid / distance)>,
  "totalBid": <total bid price>,
  "margin": <expected margin percentage value, e.g., 14.3>,
  "profit": <expected profit totalBid - totalCost>
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    return new Response(text, {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Tender calculation failed." }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
