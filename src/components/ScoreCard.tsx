import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ScoreCard() {
  const currentScore = 75;
  const level = Math.floor(currentScore / 20) + 1;

  return (
    <Card className="p-6 max-w-sm mx-auto bg-gradient-to-br from-primary to-secondary text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Level {level}</h2>
          <p className="text-sm opacity-90">Productivity Master</p>
        </div>
        <Trophy className="h-8 w-8" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Reactivity Score</span>
          <span>{currentScore}/100</span>
        </div>
        <Progress value={currentScore} className="h-2 bg-white/20" />
      </div>
      <p className="mt-4 text-sm text-center opacity-90">
        Keep going! Only 25 points until next level
      </p>
    </Card>
  );
}