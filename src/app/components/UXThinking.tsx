import { Card } from "./ui/card";
import { Separator } from "./ui/separator";
import { Lightbulb, Target, Zap } from "lucide-react";

interface UXThinkingSectionProps {
  problem: string;
  uxDecisions: string[];
  motionDecisions: string[];
}

export function UXThinkingSection({
  problem,
  uxDecisions,
  motionDecisions,
}: UXThinkingSectionProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">UX Thinking</h3>
      </div>

      <div className="space-y-6">
        {/* Problem */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-blue-600" />
            <h4 className="font-medium text-gray-900">Problem</h4>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{problem}</p>
        </div>

        <Separator className="bg-blue-200" />

        {/* UX Decisions */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">UX-beslut</h4>
          <ul className="space-y-2">
            {uxDecisions.map((decision, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="text-blue-600 mt-0.5">✓</span>
                <span>{decision}</span>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="bg-blue-200" />

        {/* Motion Decisions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-blue-600" />
            <h4 className="font-medium text-gray-900">Motion-beslut</h4>
          </div>
          <ul className="space-y-2">
            {motionDecisions.map((decision, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="text-indigo-600 mt-0.5">→</span>
                <span>{decision}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
