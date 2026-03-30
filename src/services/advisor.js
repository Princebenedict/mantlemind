const MANTLE_YIELD_DATA = {
  mETH_apy: 2.8,
  cmETH_apy: 5.1,
  fbtc_yield: 3.4,
  mi4_benchmark: 6.2,
  mnt_lp_agni: 8.1,
  usdy_yield: 4.9,
};

export async function getMantleAdvice(address, balances) {
  if (!address || !balances) {
    throw new Error("Missing wallet address or balances");
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Gemini API key is missing. Add VITE_GEMINI_API_KEY to your .env file and restart the dev server."
    );
  }

  const prompt = `
You are MantleMind, a specialized AI wealth co-pilot for the Mantle blockchain.

USER WALLET: ${address}

CURRENT PORTFOLIO:
- MNT: ${balances.MNT || "0"}
- mETH: ${balances.mETH || "0"}
- cmETH: ${balances.cmETH || "0"}
- FBTC: ${balances.FBTC || "0"}

CURRENT YIELD RATES:
- mETH: ${MANTLE_YIELD_DATA.mETH_apy}%
- cmETH: ${MANTLE_YIELD_DATA.cmETH_apy}%
- FBTC: ${MANTLE_YIELD_DATA.fbtc_yield}%
- MI4: ${MANTLE_YIELD_DATA.mi4_benchmark}%
- MNT LP: ${MANTLE_YIELD_DATA.mnt_lp_agni}%
- USDY: ${MANTLE_YIELD_DATA.usdy_yield}%

Analyze and respond ONLY with valid JSON:
{
  "riskScore": "Low" | "Medium" | "High",
  "riskReason": "one short sentence",
  "yieldGap": "You are earning X% but could earn up to Y%",
  "recommendations": [
    "Recommendation 1 mentioning specific Mantle product",
    "Recommendation 2 mentioning specific Mantle product",
    "Recommendation 3 mentioning specific Mantle product"
  ],
  "summary": "One concise sentence"
}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini request failed: ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error(`Failed to get AI advice from Gemini. ${error.message}`);
  }
}