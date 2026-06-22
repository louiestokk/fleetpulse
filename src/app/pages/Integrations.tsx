import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Link2,
  Unlink,
  Terminal,
  Key,
  Globe,
  Check,
  CreditCard,
  Sparkles,
  Plug,
  RefreshCw,
  Copy
} from "lucide-react";
import { dataService, Integration } from "../services/dataService";
import { paymentService, SubscriptionPlan } from "../services/paymentService";
import { UXThinkingSection } from "../components/UXThinking";

export function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>(dataService.getIntegrations());
  const [subscription, setSubscription] = useState<SubscriptionPlan>(paymentService.getSubscription());
  
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] [System] FleetPulse integrationsnav initierat.`,
    `[${new Date().toLocaleTimeString()}] [Samsara] Lyssnar på GPS- och telematikströmmar...`,
    `[${new Date().toLocaleTimeString()}] [Fortnox] Kontrollerar obetalda fakturor för returorder...`,
    `[${new Date().toLocaleTimeString()}] [AI-Kalkyl] Synkar kostnadsdatabaser för vägavgifter...`
  ]);

  const [clientId] = useState("fp_cli_99a8b8c7d6e5f4");
  const [clientSecret, setClientSecret] = useState("fp_sec_************************");
  const [isSecretVisible, setIsSecretVisible] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("https://api.mittbolag.se/v1/fleetpulse-webhooks");
  const [copiedKey, setCopiedKey] = useState(false);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Toggle Connection
  const handleToggle = (id: string) => {
    const updated = dataService.toggleIntegration(id);
    setIntegrations(updated);
    
    const target = updated.find(i => i.id === id);
    if (target) {
      const logMsg = target.status === "connected"
        ? `[${new Date().toLocaleTimeString()}] [Integration] Anslöt system: ${target.name} (Sync rate: ${target.syncRate}%).`
        : `[${new Date().toLocaleTimeString()}] [Integration] Kopplade bort system: ${target.name}.`;
      
      setLogs(prev => [...prev, logMsg]);
    }
  };

  // Generate logs on interval
  useEffect(() => {
    const activeIntegrations = integrations.filter(i => i.status === "connected").map(i => i.id);
    if (activeIntegrations.length === 0) return;

    const interval = setInterval(() => {
      const logTemplates = [
        { id: "samsara", text: `[Samsara] Synkar GPS koordinater för VLV-001 (57.7089, 11.9746)` },
        { id: "samsara", text: `[Samsara] Odometer uppdaterad för VLV-003: 142 500 km` },
        { id: "fortnox", text: `[Fortnox] Matchar faktura INV-1021 mot rutt Göteborg–Oslo` },
        { id: "fortnox", text: `[Fortnox] Importerar bokföringspost: Förarlön D001 (350 kr/t)` },
        { id: "volvo", text: `[Volvo Connect] Laddningsstatus VLV-002 uppdaterad: 45% (charging)` },
        { id: "volvo", text: `[Volvo Connect] Diagnostikvarning VLV-003: Hög batteritemp (28°C)` },
        { id: "sap", text: `[SAP] Hämtar ordernummer ORD-9921 för Customer A AB` },
        { id: "geotab", text: `[Geotab] Synkar bränsleförbrukning för van VLV-005` }
      ];

      // filter templates to only those connected
      const allowedTemplates = logTemplates.filter(t => activeIntegrations.includes(t.id));
      if (allowedTemplates.length === 0) return;

      const randomTemplate = allowedTemplates[Math.floor(Math.random() * allowedTemplates.length)];
      const fullLog = `[${new Date().toLocaleTimeString()}] ${randomTemplate.text}`;
      
      setLogs(prev => {
        const next = [...prev, fullLog];
        return next.slice(-20); // Keep last 20 logs
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [integrations]);

  // Scroll logs to bottom
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Copy API key
  const handleCopyKey = () => {
    navigator.clipboard.writeText("fp_sec_9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  // Upgrade Subscription
  const handleUpgrade = (tier: "Starter" | "Professional" | "Enterprise") => {
    const updated = paymentService.upgradePlan(tier);
    setSubscription(updated);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [Billing] Licens uppgraderad till ${tier}.`]);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* UX Thinking */}
      {/* <UXThinkingSection
        problem="Transportbolag drar sig för att skaffa nya analyssystem eftersom de tror att integrationer med Geotab/Samsara/Fortnox kräver månader av konsulttid."
        uxDecisions={[
          "Integrationstoggles: Direkt visuell status ('Ansluten' / 'Ej ansluten') med enknapps-anslutning avmystifierar processen.",
          "Live-loggkonsol: Visar i realtid att data faktiskt strömmar. Det ger en omedelbar känsla av trygghet och bekräftar att anslutningen fungerar.",
          "Färdig struktur för abonnemangshantering: Ger kunden direkt kontroll över sin prenumerationsnivå."
        ]}
        motionDecisions={[
          "Rullande konsolloggar: Nya loggfiler rullar mjukt uppåt, vilket drar blicken till rörelsen och bevisar systemaktivitet.",
          "Smidig feedback vid anslutning: Knappen skiftar färg och text med en mjuk transition när integrationens status förändras."
        ]}
      /> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Integrations List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 bg-white border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                <Plug className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-950 text-sm">Systemintegrationer</h3>
                <p className="text-xs text-gray-500">Anslut dina telematik-, ERP- och TMS-system på några sekunder</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                    item.status === "connected"
                      ? "border-green-200 bg-green-50/20 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm shadow-sm ${
                      item.status === "connected" ? "bg-green-600 text-white" : "bg-slate-100 text-gray-400"
                    }`}>
                      {item.logo}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs">{item.name}</h4>
                      <p className="text-[10px] text-gray-500 capitalize mt-0.5">{item.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.status === "connected" && (
                      <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                        {item.syncRate}% Sync
                      </span>
                    )}
                    <Button
                      size="sm"
                      onClick={() => handleToggle(item.id)}
                      className={`h-8 text-[10px] font-bold rounded-lg shadow-sm ${
                        item.status === "connected"
                          ? "bg-white border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 border"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {item.status === "connected" ? (
                        <>
                          <Unlink className="w-3 h-3 mr-1" />
                          Koppla bort
                        </>
                      ) : (
                        <>
                          <Link2 className="w-3 h-3 mr-1" />
                          Anslut
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Web Console */}
          <Card className="p-6 bg-slate-950 border-slate-900 text-white rounded-xl shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Live Integrationskonsol</h3>
              </div>
              <Badge className="bg-slate-900 border-slate-800 text-cyan-400 text-[10px] animate-pulse">Lyssnar på data...</Badge>
            </div>
            
            <div className="bg-slate-900 border border-slate-850 p-4 rounded-lg font-mono text-[11px] text-slate-300 h-44 overflow-y-auto space-y-1.5 scrollbar-thin">
              {logs.map((log, i) => (
                <div key={i} className="whitespace-pre-wrap leading-relaxed">
                  {log.includes("[System]") ? (
                    <span className="text-cyan-400 font-semibold">{log}</span>
                  ) : log.includes("[Integration]") ? (
                    <span className="text-yellow-400 font-semibold">{log}</span>
                  ) : log.includes("[Billing]") ? (
                    <span className="text-purple-400 font-semibold">{log}</span>
                  ) : (
                    log
                  )}
                </div>
              ))}
              <div ref={consoleEndRef} />
            </div>
          </Card>
        </div>

        {/* API Details & Subscriptions */}
        <div className="space-y-6">
          {/* API Credentials */}
          <Card className="p-6 bg-white border-gray-200 shadow-sm rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-4.5 h-4.5 text-blue-600" />
              <h3 className="font-bold text-gray-900 text-sm">Utvecklare & API-nycklar</h3>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Client ID</span>
                <Input value={clientId} readOnly className="h-8 font-mono text-xs border-gray-200 bg-slate-50 text-gray-600 rounded-lg" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Client Secret</span>
                <div className="flex gap-2">
                  <Input
                    value={isSecretVisible ? "fp_sec_9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p" : clientSecret}
                    readOnly
                    className="h-8 font-mono text-xs border-gray-200 bg-slate-50 text-gray-600 rounded-lg flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsSecretVisible(!isSecretVisible)}
                    className="h-8 text-[10px] border-gray-200 font-semibold px-2.5 rounded-lg bg-white"
                  >
                    {isSecretVisible ? "Dölj" : "Visa"}
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Webhook Endpoint</span>
                <div className="flex gap-2">
                  <Input
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="h-8 text-xs border-gray-200 rounded-lg flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyKey}
                    className="h-8 text-[10px] border-gray-200 font-semibold px-2.5 rounded-lg bg-white flex items-center gap-1"
                  >
                    {copiedKey ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    Kopiera
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Subscriptions / Billing card */}
          <Card className="p-6 bg-slate-900 border-slate-800 text-white rounded-xl shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4.5 h-4.5 text-cyan-400" />
                  <h3 className="font-bold text-slate-200 text-sm">SaaS Licensstatus</h3>
                </div>
                {subscription.status === "trialing" ? (
                  <Badge className="bg-amber-500 text-slate-950 font-bold border-amber-400 text-[10px]">Testperiod</Badge>
                ) : (
                  <Badge className="bg-emerald-500 text-slate-950 font-bold border-emerald-400 text-[10px]">Aktiv</Badge>
                )}
              </div>

              <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-900">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Aktuell Plan</p>
                <p className="text-xl font-black text-white flex items-center gap-1.5 mt-0.5">
                  {subscription.name}
                  {subscription.name === "Professional" && <Sparkles className="w-4 h-4 text-cyan-400" />}
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Kostnad: <span className="font-bold text-cyan-400">{subscription.price.toLocaleString()} kr/mån</span>. Förnyas {subscription.renewalDate}.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Licenspaket</p>
                <div className="grid grid-cols-3 gap-2">
                  {(["Starter", "Professional", "Enterprise"] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => handleUpgrade(tier)}
                      className={`py-2 text-[10px] font-bold rounded-lg border transition-all ${
                        subscription.name === tier
                          ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow shadow-cyan-400/25"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:text-white"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-850 mt-6 text-center text-[10px] text-slate-500">
              Prenumeration och betalningar kan integreras med Stripe/PayPal Billing Portals i nästa fas.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
