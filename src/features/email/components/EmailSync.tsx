import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import type { EmailProvider } from "../types";

interface EmailSyncProps {
  accountId: string;
  provider: EmailProvider;
}

export function EmailSync({ accountId, provider }: EmailSyncProps) {
  const [progress, setProgress] = useState(0);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (syncing) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setSyncing(false);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(timer);
    }
  }, [syncing]);

  const handleSync = () => {
    console.log("Starting sync for account:", accountId);
    setSyncing(true);
    setProgress(0);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSync}
          disabled={syncing}
        >
          {syncing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Synchroniser
        </Button>
        {syncing && (
          <span className="text-sm text-muted-foreground">
            {progress}% synchronisé
          </span>
        )}
      </div>
      {syncing && <Progress value={progress} className="h-2" />}
    </div>
  );
}