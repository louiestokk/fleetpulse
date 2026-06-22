import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Calculator,
  Compass,
  FileCheck,
  Percent,
  Coins,
  ShieldAlert,
  Loader2,
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { aiService, TenderResult } from "../services/aiService";
import { UXThinkingSection } from "../components/UXThinking";

export function TenderAI() {
  const [route, setRoute] = useState("Stockholm → Hamburg");
  const [distance, setDistance] = useState<number>(980);
  const [salaryRate, setSalaryRate] = useState<number>(340);
  const [tolls, setTolls] = useState<number>(2500);
  const [ferries, setFerries] = useState<number>(1800);
  const [risk, setRisk] = useState<"low" | "medium" | "high">("medium");

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TenderResult | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const calculation = await aiService.getTenderCalculation(
        route,
        distance,
        salaryRate,
        tolls,
        ferries,
        risk
      );
      setResult(calculation);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* UX Thinking */}
      {/* <UXThinkingSection
        problem="Åkerier och speditörer förlorar ofta upphandlingar för att de lägger för höga anbud, eller går med förlust för att de missat rörliga kostnader (färjor, tullar, risker)."
        uxDecisions={[
          "Tvådelad struktur: Indata till vänster, resultat till höger - minskar scrollande och ger direkt kognitiv koppling.",
          "Automatisk riskreservering: AI beräknar en rörlig riskpott baserat på vald risknivå och historiska ruttstörningar.",
          "Handlingsbar prissättning: Visar rekommenderat pris per kilometer direkt, vilket är standardmåttet vid anbud."
        ]}
        motionDecisions={[
          "Laddningsspinner: Visar att AI utför komplexa simuleringar baserat på historisk transportdata.",
          "Mjuk infasning av resultat: Resultatkortet animeras fram vid lyckad kalkyl för att dra blicken till siffrorna."
        ]}
      /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Card */}
        <Card className="p-6 bg-white border-gray-200 shadow-sm rounded-xl">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-sm">Anbudskalkylator</h3>
              <p className="text-xs text-gray-500">Ange parametrar för att räkna ut rekommenderat anbudspris</p>
            </div>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Rutt / Destination</label>
              <Input
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                placeholder="T.ex. Stockholm → Hamburg"
                className="border-gray-200 text-sm rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Avstånd (km)</label>
                <Input
                  type="number"
                  value={distance || ""}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="border-gray-200 text-sm rounded-lg"
                  min={1}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Förarlön (kr/timme)</label>
                <Input
                  type="number"
                  value={salaryRate || ""}
                  onChange={(e) => setSalaryRate(Number(e.target.value))}
                  className="border-gray-200 text-sm rounded-lg"
                  min={1}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Tullar (kr)</label>
                <Input
                  type="number"
                  value={tolls || ""}
                  onChange={(e) => setTolls(Number(e.target.value))}
                  className="border-gray-200 text-sm rounded-lg"
                  min={0}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Färjor (kr)</label>
                <Input
                  type="number"
                  value={ferries || ""}
                  onChange={(e) => setFerries(Number(e.target.value))}
                  className="border-gray-200 text-sm rounded-lg"
                  min={0}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Risk för ruttförsening / väntetid</label>
              <div className="grid grid-cols-3 gap-2">
                {(["low", "medium", "high"] as const).map((level) => {
                  const labelMap = { low: "Låg (0-5%)", medium: "Medel (5-15%)", high: "Hög (15%+)" };
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setRisk(level)}
                      className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                        risk === level
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10"
                          : "bg-white hover:bg-slate-50 border-gray-200 text-gray-700"
                      }`}
                    >
                      {labelMap[level]}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-blue-500/20 text-xs mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Kör anbudssimulering...
                </>
              ) : (
                <>
                  Kör AI-anbudskalkyl
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Results Card */}
        <div className="h-full">
          {isLoading ? (
            <div className="bg-slate-50 border border-dashed border-gray-300 rounded-xl h-full min-h-[350px] flex flex-col items-center justify-center p-6 text-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
              <p className="font-semibold text-gray-900 text-sm">Simulerar ruttkostnader</p>
              <p className="text-xs text-gray-500 max-w-xs mt-1">
                Beräknar energiåtgång, tullavgifter och lön. Värderar historiska väntetider på terminaler i Hamburg...
              </p>
            </div>
          ) : result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full"
            >
              <Card className="p-6 bg-slate-950 border-slate-900 text-white shadow-xl h-full flex flex-col justify-between rounded-xl">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">AI Rekommendation</span>
                    <Badge className="bg-emerald-500 text-slate-950 border-emerald-400 font-bold">14.3% Målmarginal</Badge>
                  </div>

                  {/* Main Price Numbers */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-900 p-4 rounded-xl border border-slate-900 mb-6">
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Pris per kilometer</p>
                      <p className="text-3xl font-black text-cyan-400">{(result.recommendedPricePerKm || 0).toFixed(2)} kr</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Total anbudsoffert</p>
                      <p className="text-2xl font-bold text-white mt-1">{(result.totalBid || 0).toLocaleString()} kr</p>
                    </div>
                  </div>

                  {/* Cost breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kostnadskalkyl</h4>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-400">Beräknat bränsle/el (1.5 kWh/km)</span>
                        <span className="font-semibold text-slate-200">{(result.fuelCost || 0).toLocaleString()} kr</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-400">Förarlöner (Körtid: {Math.round((result.distance || 0) / 70)} tim)</span>
                        <span className="font-semibold text-slate-200">{(result.wages || 0).toLocaleString()} kr</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-400">Tullar & Färjeavgifter</span>
                        <span className="font-semibold text-slate-200">{(result.tollsAndFerries || 0).toLocaleString()} kr</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-400 flex items-center gap-1.5">
                          Riskreserv (AI baserad)
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                        </span>
                        <span className="font-semibold text-slate-200">{(result.riskReserve || 0).toLocaleString()} kr</span>
                      </div>
                      <div className="flex justify-between py-1.5 font-bold text-slate-100 text-sm">
                        <span>Total självkostnad</span>
                        <span>{(result.totalCost || 0).toLocaleString()} kr</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profit metrics */}
                <div className="pt-6 border-t border-slate-900 mt-6 flex justify-between items-center text-xs">
                  <div>
                    <p className="text-slate-400 font-semibold">Beräknad vinst</p>
                    <p className="text-lg font-bold text-emerald-400">+{(result.profit || 0).toLocaleString()} kr</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 font-semibold">Förväntad marginal</p>
                    <p className="text-lg font-bold text-emerald-400">{result.margin || 0}%</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-gray-300 rounded-xl h-full min-h-[350px] flex flex-col items-center justify-center p-6 text-center">
              <Compass className="w-8 h-8 text-gray-400 mb-3 animate-pulse" />
              <p className="font-semibold text-gray-900 text-sm">Kör en kalkyl för att se resultat</p>
              <p className="text-xs text-gray-500 max-w-xs mt-1">
                Fyll i formuläret till vänster och klicka på "Kör AI-anbudskalkyl" för att beräkna prissättning och marginaler.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
