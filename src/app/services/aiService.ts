export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface TenderResult {
  distance: number;
  fuelCost: number;
  wages: number;
  tollsAndFerries: number;
  riskReserve: number;
  totalCost: number;
  recommendedPricePerKm: number;
  totalBid: number;
  margin: number;
  profit: number;
}

const BACKEND_URL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:3001"
    : "";

export const aiService = {
  // Check if local Gemini Express server is active
  async checkBackendStatus(): Promise<{ online: boolean; hasKey: boolean }> {
    try {
      const res = await fetch(`${BACKEND_URL}/api/status`, { signal: AbortSignal.timeout(800) });
      if (res.ok) {
        const data = await res.json();
        return { online: true, hasKey: data.hasKey };
      }
    } catch {
      // Server is offline
    }
    return { online: false, hasKey: false };
  },

  // Hybrid chat dispatcher (Gemini API vs client-side fallback)
  async getReplies(query: string, history: ChatMessage[]): Promise<string> {
    const status = await this.checkBackendStatus();
    
    if (status.online && status.hasKey) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: [...history, { sender: "user", text: query }] })
        });
        if (res.ok) {
          const data = await res.json();
          return data.text;
        }
      } catch (err) {
        console.warn("Gemini API call failed, falling back to mock:", err);
      }
    }
    
    // Client-side fallback
    return this.getPresetReplies(query);
  },

  // Hybrid tender calculator (Gemini API vs client-side fallback)
  async getTenderCalculation(
    route: string,
    distance: number,
    salaryRate: number,
    tolls: number,
    ferries: number,
    risk: "low" | "medium" | "high"
  ): Promise<TenderResult> {
    const status = await this.checkBackendStatus();
    const fallback = this.simulateTender(route, distance, salaryRate, tolls, ferries, risk);

    if (status.online && status.hasKey) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/tender`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ route, distance, salaryRate, tolls, ferries, risk })
        });
        if (res.ok) {
          const raw = await res.json();
          return this.normalizeTenderResult(raw, fallback);
        }
      } catch (err) {
        console.warn("Gemini Tender API failed, falling back to mock calculations:", err);
      }
    }

    // Client-side fallback
    return fallback;
  },

  // Normalizer to protect the frontend from casing/key variances returned by AI
  normalizeTenderResult(raw: any, fallback: TenderResult): TenderResult {
    if (!raw || typeof raw !== "object") return fallback;

    const getVal = (keys: string[], defaultVal: number): number => {
      for (const key of keys) {
        if (key in raw && raw[key] !== undefined && raw[key] !== null) {
          const val = Number(raw[key]);
          if (!isNaN(val)) return val;
        }
      }
      const lowerKeys = keys.map(k => k.toLowerCase());
      for (const rawKey of Object.keys(raw)) {
        const normalizedRawKey = rawKey.toLowerCase().replace(/[^a-z0-9]/g, "");
        for (const lk of lowerKeys) {
          const normalizedLk = lk.replace(/[^a-z0-9]/g, "");
          if (normalizedRawKey === normalizedLk) {
            const val = Number(raw[rawKey]);
            if (!isNaN(val)) return val;
          }
        }
      }
      return defaultVal;
    };

    return {
      distance: getVal(["distance", "avstånd", "avstand"], fallback.distance),
      fuelCost: getVal(["fuelCost", "fuel_cost", "bränslekostnad", "branslekostnad", "fuel"], fallback.fuelCost),
      wages: getVal(["wages", "wage", "förarlön", "forarlon", "driverWages", "driver_wages"], fallback.wages),
      tollsAndFerries: getVal(["tollsAndFerries", "tolls_and_ferries", "tollsAndFerriesCost", "vägavgifter", "vagavgifter"], fallback.tollsAndFerries),
      riskReserve: getVal(["riskReserve", "risk_reserve", "riskReserveCost", "riskpott", "riskmarginal"], fallback.riskReserve),
      totalCost: getVal(["totalCost", "total_cost", "totalkostnad"], fallback.totalCost),
      recommendedPricePerKm: getVal(["recommendedPricePerKm", "recommended_price_per_km", "pricePerKm", "price_per_km", "rekommenderatPrisPerKm", "rekommenderat_pris_per_km"], fallback.recommendedPricePerKm),
      totalBid: getVal(["totalBid", "total_bid", "anbud", "offert", "totalBidPrice", "total_bid_price"], fallback.totalBid),
      margin: getVal(["margin", "margin_percentage", "vinstmarginal", "marginal"], fallback.margin),
      profit: getVal(["profit", "vinst", "expected_profit", "expectedProfit"], fallback.profit)
    };
  },

  // Synchronous client mock responses
  getPresetReplies(query: string): string {
    const cleanQuery = query.toLowerCase().trim();

    if (cleanQuery.includes("kostar mest") || cleanQuery.includes("fordon kostar")) {
      return `### 🚨 Fordonsanalys: Högsta kostnadsbärare just nu

**Fordon: VLV-003 (Volvo FMX Electric)**

Här är en sammanställning av de avvikande kostnaderna för detta fordon under de senaste 30 dagarna:

*   **Service & reparationer:** **+42 %** jämfört med flottans snitt (diagnostik pågår för batteritemperatur).
*   **Energiförbrukning:** **+18 %** (orsakas primärt av körstil och ruttens kupering).
*   **Tomgångskörning:** **+31 %** (motsvarar i snitt 45 minuter per skift där kompressorer körs i onödan).
*   **Haveririsk (60 dagar):** **HÖG** (AI-modellen rekommenderar akut översyn av kylsystemet).

**Rekommenderad åtgärd:** Schemalägg service direkt i underhållspanelen för kontroll av temperaturgivare och uppdatering av styrsystemet för tomgång.`;
    }

    if (cleanQuery.includes("customer a") || cleanQuery.includes("kund a")) {
      return `### 📊 Lönsamhetsanalys: Customer A AB

**Ekonomisk översikt:**
*   **Omsättning:** 500 000 kr
*   **Faktisk kostnad:** 470 000 kr
*   **Vinst:** 30 000 kr
*   **Marginal:** **6 %** (Flottans mål är min. 15 %)

**Huvudorsaker till den låga marginalen:**
1.  **Orimliga väntetider:** **38 %** av alla leveranser till deras terminaler hade en registrerad väntetid på över 90 minuter. Detta äter upp förarlöner utan att generera intäkt.
2.  **Tomkörning efter leverans:** **22 %** av rörlig distans körs tom tillbaka på grund av bristande returorder på rutten Göteborg–Oslo.
3.  **Bränsle/Energi-avvikelse:** **+17 %** högre förbrukning jämfört med övriga rutter, orsakat av hög tomgång under väntetiden samt tung last på returen.

**Rekommenderad åtgärd:** Inled förhandling om debitering för väntetid över 45 minuter, alternativt flytta leveransfönstret till kl. 04:00–06:00 då terminalbelastningen är 70 % lägre.`;
    }

    if (cleanQuery.includes("spara 500") || cleanQuery.includes("spara pengar") || cleanQuery.includes("hur sparar vi")) {
      return `### 💡 AI-handlingsplan: Spara 500 000+ kr nästa år

Genom att analysera Transport Intelligence-grafen har AI identifierat följande optimeringar:

1.  **Minska tomgång på 12 fordon:** 
    *   *Åtgärd:* Implementera automatisk motoravstängning efter 5 minuter tomgång och utbilda de 3 förare som ligger i riskzonen.
    *   *Besparing:* **142 000 kr** (minskad energiförbrukning och mindre slitage).
2.  **Byt leveransfönster för Customer A AB:** 
    *   *Åtgärd:* Flytta lossningsfönster från eftermiddagar till tidig morgon.
    *   *Besparing:* **215 000 kr** (minskad väntetid med ca 45 timmar per månad).
3.  **Optimera fordonsfördelning:** 
    *   *Åtgärd:* Flytta 14 % av uppdragen på rutten Malmö-Köpenhamn från Fordonsgrupp A till Fordonsgrupp B (optimera batterikapacitet vs. räckvidd).
    *   *Besparing:* **170 000 kr** (lägre laddningskostnader under rusningstid).

**Total potentiell besparing: 527 000 kr**
*Vill du att jag genererar ett utkast till avtalsändring för Customer A AB?*`;
    }

    return `Jag har analyserat din data. Baserat på Transport Intelligence-grafen kan jag svara på frågor om dina fordonskostnader, rutter, marginaler per kund samt ge råd inför upphandlingar. 

Prova att fråga:
*   *"Vilka fordon kostar mest just nu?"*
*   *"Varför är Customer A olönsam?"*
*   *"Hur sparar vi 500 000 kr nästa år?"*`;
  },

  simulateTender(
    route: string,
    distance: number,
    salaryRate: number,
    tolls: number,
    ferries: number,
    risk: "low" | "medium" | "high"
  ): TenderResult {
    const speedAvg = 70;
    const drivingHours = distance / speedAvg;
    const fuelCost = Math.round(distance * 4.5);
    const totalWages = Math.round(drivingHours * salaryRate);
    const baseRisk = 1200;
    const riskMultiplier = risk === "high" ? 2.5 : risk === "medium" ? 1.5 : 1.0;
    const riskReserve = Math.round(baseRisk * riskMultiplier);
    const totalCost = fuelCost + totalWages + tolls + ferries + riskReserve;
    const targetMargin = 0.143;
    const totalBid = Math.round(totalCost / (1 - targetMargin));
    
    const recommendedPricePerKm = Math.round((totalBid / distance) * 100) / 100;
    const profit = totalBid - totalCost;
    const margin = Math.round((profit / totalBid) * 1000) / 10;

    return {
      distance,
      fuelCost,
      wages: totalWages,
      tollsAndFerries: tolls + ferries,
      riskReserve,
      totalCost,
      recommendedPricePerKm,
      totalBid,
      margin,
      profit
    };
  }
};
