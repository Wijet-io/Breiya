import { Check, Plus, Share2 } from "lucide-react";
import { Card } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AddEmailAccountDialog } from "./AddEmailAccountDialog";
import { Button } from "./ui/button";
import { ShareEmailAccountDialog } from "./ShareEmailAccountDialog";
import { EmailSync } from "./EmailSync";

interface EmailAccount {
  id: string;
  email: string;
  provider: string;
  color: string;
  display_name: string | null;
}

export function AccountSelector() {
  const { toast } = useToast();
  
  const { data: accounts, isLoading } = useQuery({
    queryKey: ["emailAccounts"],
    queryFn: async () => {
      console.log("Fetching email accounts...");
      const { data, error } = await supabase
        .from("email_accounts")
        .select("*");
      
      if (error) {
        console.error("Error fetching email accounts:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos comptes email",
          variant: "destructive",
        });
        throw error;
      }
      
      return data as EmailAccount[];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Comptes Email</h2>
          <Button variant="outline" size="sm" disabled>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <Card key={i} className="p-3 animate-pulse bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Comptes Email</h2>
        <AddEmailAccountDialog
          trigger={
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          }
        />
      </div>
      
      <div className="space-y-3">
        {accounts?.map((account) => (
          <Card
            key={account.id}
            className="p-4 transition-all hover:shadow-md"
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
        ))}

        {accounts?.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed">
            <h3 className="font-medium mb-2">Aucun compte email</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Commencez par ajouter votre premier compte email
            </p>
            <AddEmailAccountDialog
              trigger={
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un compte
                </Button>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}