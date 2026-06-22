export default async (req, context) => {
  const apiKey = process.env.GEMINI_API_KEY;
  return new Response(
    JSON.stringify({
      status: "online",
      hasKey: !!apiKey,
      provider: "Google Gemini AI (Netlify Serverless)"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
};
