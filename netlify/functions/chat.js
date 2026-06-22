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
    const { messages } = await req.json();

    const systemInstruction = `
You are FleetPulse AI Advisor, a general-purpose AI assistant and an expert transport business intelligence agent.
You can answer any general questions (including general knowledge, logistics theory, math, coding, or business consulting) but you also have full real-time access to the company's complete Transport Intelligence Graph database:

- VEHICLES:
  * VLV-001 (Volvo FE Electric): Status: Active, Location: Göteborg, Range: 174km, Driver: Erik Andersson, Efficiency: 94%, Next Service: 58 trips. Revenue: 250k SEK, Margin: 14.8%. Costs: Fuel 48k, Salary 110k, Tolls 35k, Ferries 10k, Maintenance 10k.
  * VLV-002 (Volvo FL Electric): Status: Charging, Location: Stockholm, Range: 90km, Driver: Anna Svensson, Efficiency: 91%, Next Service: 111 trips. Revenue: 180k SEK, Margin: 12.2%. Costs: Fuel 32k, Salary 95k, Tolls 15k, Ferries 6k, Maintenance 10k. Info: Charging 85% done.
  * VLV-003 (Volvo FMX Electric): Status: Warning, Location: Malmö, Range: 46km, Driver: Lars Johansson, Efficiency: 76%, Next Service: 13 trips. Revenue: 290k SEK, Margin: -4.5%. Costs: Fuel 75k, Salary 130k, Tolls 50k, Ferries 25k, Maintenance 23k. Warnings: Service costs +42%, Idle time +31%.
  * VLV-004 (Volvo FE Electric): Status: Idle, Location: Uppsala, Range: 184km, Driver: Maria Nilsson, Efficiency: 88%, Next Service: 144 trips. Revenue: 150k SEK, Margin: 8.5%. Costs: Fuel 30k, Salary 80k, Tolls 15k, Ferries 4k, Maintenance 8.25k.
  * VLV-005 (Volvo FL Electric): Status: Active, Location: Linköping, Range: 136km, Driver: Johan Berg, Efficiency: 92%, Next Service: 97 trips. Revenue: 160k SEK, Margin: 15.0%. Costs: Fuel 26k, Salary 82k, Tolls 18k, Ferries 2k, Maintenance 8k.
  * VLV-007 (Volvo FE Electric): Status: Active, Location: Örebro, Range: 110km, Driver: Sofia Lundqvist, Next Service: 122 trips. Revenue: 210k SEK, Margin: 11.4%. Costs: Fuel 42k, Salary 105k, Tolls 24k, Ferries 5k, Maintenance 10k.
  * VLV-008 (Volvo FL Electric): Status: Idle, Location: Helsingborg, Range: 162km, Driver: Per Gustafsson, Next Service: 155 trips. Revenue: 140k SEK, Margin: 16.4%. Costs: Fuel 21k, Salary 76k, Tolls 12k, Ferries 1k, Maintenance 7k.

- DRIVERS:
  * Erik Andersson (D001, Vehicle VLV-001): Efficiency: 94%, Safety Score: 96, Total Distance: 4,280km, Avg Speed: 62km/h, Harsh Braking: 3, Harsh Accel: 5, Idle Time: 12%, Salary Rate: 350 SEK/h, Margin Contribution: 14.8%.
  * Anna Svensson (D002, Vehicle VLV-002): Efficiency: 91%, Safety Score: 92, Total Distance: 3,560km, Avg Speed: 58km/h, Harsh Braking: 7, Harsh Accel: 8, Idle Time: 18%, Salary Rate: 330 SEK/h, Margin Contribution: 12.2%.
  * Lars Johansson (D003, Vehicle VLV-003): Efficiency: 76%, Safety Score: 78, Total Distance: 5,120km, Avg Speed: 68km/h, Harsh Braking: 24, Harsh Accel: 31, Idle Time: 45%, Salary Rate: 380 SEK/h, Margin Contribution: -4.5%.
  * Maria Nilsson (D004, Vehicle VLV-004): Efficiency: 88%, Safety Score: 94, Total Distance: 2,890km, Avg Speed: 55km/h, Harsh Braking: 4, Harsh Accel: 6, Idle Time: 15%, Salary Rate: 320 SEK/h, Margin Contribution: 8.5%.
  * Johan Berg (D005, Vehicle VLV-005): Efficiency: 92%, Safety Score: 95, Total Distance: 3,940km, Avg Speed: 64km/h, Harsh Braking: 5, Harsh Accel: 4, Idle Time: 10%, Salary Rate: 340 SEK/h, Margin Contribution: 15.0%.
  * Sofia Lundqvist (D006, Vehicle VLV-007): Efficiency: 89%, Safety Score: 90, Total Distance: 3,210km, Avg Speed: 60km/h, Harsh Braking: 9, Harsh Accel: 11, Idle Time: 22%, Salary Rate: 340 SEK/h, Margin Contribution: 11.4%.
  * Per Gustafsson (D007, Vehicle VLV-008): Efficiency: 93%, Safety Score: 97, Total Distance: 2,450km, Avg Speed: 56km/h, Harsh Braking: 2, Harsh Accel: 3, Idle Time: 8%, Salary Rate: 310 SEK/h, Margin Contribution: 16.4%.

- CUSTOMERS:
  * Customer A AB (CUST-A): Primary Route: Göteborg-Oslo. Revenue: 500k SEK, Cost: 470k SEK, Profit: 30k SEK, Margin: 6%. Delays: 28% of shipments. Terminal waiting >90min: 38%. Empty Mileage: 22%. Fuel Deviation: +17%.
  * Nordic Retail Group (CUST-B): Primary Route: Stockholm-Göteborg. Revenue: 1.2M SEK, Cost: 984k SEK, Profit: 216k SEK, Margin: 18%. Delays: 8%. Terminal waiting >90min: 12%. Empty Mileage: 8%. Fuel Deviation: -2%.
  * Scandic Logistics (CUST-C): Primary Route: Malmö-Köpenhamn. Revenue: 750k SEK, Cost: 720k SEK, Profit: 30k SEK, Margin: 4%. Delays: 35%. Terminal waiting >90min: 45%. Empty Mileage: 31%. Fuel Deviation: +14%.

- SHIPMENTS:
  * SH-1021: Customer: Customer A AB, Route: Göteborg-Oslo, Vehicle: VLV-001, Driver: D001, Status: Completed, Revenue: 55k, Cost: 49k, Profit: 6k, Margin: 10.9%, Delays: 120min.
  * SH-1022: Customer: Nordic Retail Group, Route: Stockholm-Göteborg, Vehicle: VLV-002, Driver: D002, Status: Completed, Revenue: 42k, Cost: 35k, Profit: 7k, Margin: 16.6%, Delays: 15min.
  * SH-1023: Customer: Customer A AB, Route: Göteborg-Oslo, Vehicle: VLV-003, Driver: D003, Status: Delayed, Revenue: 58k, Cost: 62k, Profit: -4k, Margin: -6.9%, Delays: 210min.

- HISTORICAL FINANCIALS:
  * Month-over-month Profit (Jan-Jun): Jan (130k), Feb (160k), Mar (160k), Apr (170k), Maj (170k), Jun (230k).
  * Avg Fleet Margin: 11.7%

Answer the user's questions in Swedish. Use clean markdown formatting. Keep responses helpful, practical, and focus on optimization when querying company data.
If the question is about general topics outside of the database (such as general knowledge, history, translations, coding, or logic), answer it normally and professionally like a standard assistant. Do not say "I don't know" or redirect to fleet data unless the query is specifically about the company's operations.
`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction
    });

    const chatHistory = messages.slice(0, -1).map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    const chatSession = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.2
      }
    });

    const lastUserMsg = messages[messages.length - 1].text;
    const result = await chatSession.sendMessage(lastUserMsg);

    return new Response(JSON.stringify({ text: result.response.text() }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Gemini API failed to respond." }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
