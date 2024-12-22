import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2 } from "lucide-react";
import { EmailSync } from "./EmailSync";
import { ShareEmailAccountDialog } from "./ShareEmailAccountDialog";
import { cn } from "@/lib/utils";
import type { EmailAccount } from "../types";

interface EmailAccountCardProps {
  account: EmailAccount;
  variant?: "compact" | "full";
  className?: string;
}

export function EmailAccountCard({ account, variant = "full", className }: EmailAccountCardProps) {
  return (
    <Card
      key={account.id}
      className={cn(
        "p-4 transition-all hover:shadow-md",
        variant === "compact" && "hover:scale-[1.02]",
        "animate-fade-in",
        className
      )}
      style={{ borderLeft: `4px solid ${account.color}` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <span className="font-medium text-foreground">
            {account.display_name || account.email}
          </span>
          <span className="text-sm text-muted-foreground capitalize">
            {account.provider}
          </span>
          {variant === "full" && account.account_permissions && account.account_permissions[0] && (
            <Badge variant="secondary" className="mt-1 w-fit">
              Partagé ({account.account_permissions[0].permission_level})
            </Badge>
          )}
        </div>
        <ShareEmailAccountDialog
          emailAccountId={account.id}
          emailAddress={account.email}
          trigger={
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:bg-secondary/10 hover:text-secondary"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          }
        />
      </div>
      <EmailSync accountId={account.id} provider={account.provider} />
    </Card>
  );
}