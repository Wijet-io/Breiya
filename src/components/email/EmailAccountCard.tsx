import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2 } from "lucide-react";
import { EmailSync } from "@/components/EmailSync";
import { ShareEmailAccountDialog } from "@/components/ShareEmailAccountDialog";
import type { EmailAccount } from "@/hooks/useEmailAccounts";

interface EmailAccountCardProps {
  account: EmailAccount;
  variant?: "compact" | "full";
}

export function EmailAccountCard({ account, variant = "full" }: EmailAccountCardProps) {
  return (
    <Card
      key={account.id}
      className={`p-4 transition-all hover:shadow-md ${
        variant === "compact" ? "hover:scale-102" : ""
      }`}
      style={{ borderLeft: `4px solid ${account.color}` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <span className="font-medium">
            {account.display_name || account.email}
          </span>
          <span className="text-sm text-muted-foreground capitalize">
            {account.provider}
          </span>
          {variant === "full" && account.account_permissions && account.account_permissions[0] && (
            <Badge variant="secondary" className="mt-1">
              Partagé ({account.account_permissions[0].permission_level})
            </Badge>
          )}
        </div>
        <ShareEmailAccountDialog
          emailAccountId={account.id}
          emailAddress={account.email}
          trigger={
            <Button variant="ghost" size="sm">
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