import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ShareEmailAccountDialog } from "./ShareEmailAccountDialog";
import { EmailSync } from "./EmailSync";

interface EmailAccount {
  id: string;
  email: string;
  provider: string;
  color: string;
  display_name: string | null;
  user_id: string;
  account_permissions?: {
    permission_level: string;
  }[];
}

export function EmailList() {
  const { toast } = useToast();
  
  const { data: emailAccounts, isLoading: isLoadingAccounts } = useQuery({
    queryKey: ["emailAccounts"],
    queryFn: async () => {
      try {
        console.log("Fetching email accounts...");
        
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error("Error fetching user:", userError);
          throw userError;
        }
        
        if (!user?.id) {
          console.error("No user ID found");
          return [];
        }

        // Fetch both owned and shared accounts in a single query
        const { data, error } = await supabase
          .from("email_accounts")
          .select("*, account_permissions(permission_level)")
          .or(`user_id.eq.${user.id},account_permissions.granted_to_user_id.eq.${user.id}`);
        
        if (error) {
          console.error("Error fetching accounts:", error);
          toast({
            title: "Erreur",
            description: "Impossible de charger vos comptes email",
            variant: "destructive",
          });
          return [];
        }

        console.log("Fetched accounts:", data);
        return data as EmailAccount[];
      } catch (error) {
        console.error("Unexpected error:", error);
        toast({
          title: "Erreur",
          description: "Une erreur inattendue s'est produite",
          variant: "destructive",
        });
        return [];
      }
    },
  });

  if (isLoadingAccounts) {
    return <div>Chargement des comptes...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Boîte de réception unifiée</h1>
        <Button variant="outline">
          <Mail className="mr-2 h-4 w-4" />
          Composer
        </Button>
      </div>
      
      {emailAccounts?.map((account) => (
        <Card
          key={account.id}
          className="p-4 hover:shadow-lg transition-shadow"
          style={{ borderLeft: `4px solid ${account.color}` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">{account.email}</h3>
              <div className="flex gap-2">
                <Badge variant="outline">
                  {account.display_name || "Sans nom"}
                </Badge>
                {account.account_permissions && account.account_permissions[0] && (
                  <Badge variant="secondary">
                    Partagé ({account.account_permissions[0].permission_level})
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ShareEmailAccountDialog 
                emailAccountId={account.id}
                emailAddress={account.email}
              />
            </div>
          </div>
          
          <EmailSync 
            accountId={account.id}
            provider={account.provider}
          />
        </Card>
      ))}
    </div>
  );
}