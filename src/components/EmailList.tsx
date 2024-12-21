import { Mail, Star, Trash, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ShareEmailAccountDialog } from "./ShareEmailAccountDialog";

interface Email {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  date: string;
  isStarred: boolean;
  accountId: string;
  accountColor: string;
}

export function EmailList() {
  const { toast } = useToast();
  
  const { data: emailAccounts, isLoading: isLoadingAccounts } = useQuery({
    queryKey: ["emailAccounts"],
    queryFn: async () => {
      // Récupérer les comptes email de l'utilisateur
      const { data: ownedAccounts, error: ownedError } = await supabase
        .from("email_accounts")
        .select("*");
      
      if (ownedError) throw ownedError;

      // Récupérer les comptes email partagés avec l'utilisateur
      const { data: sharedAccounts, error: sharedError } = await supabase
        .from("email_accounts")
        .select(`
          *,
          account_permissions!inner (
            permission_level
          )
        `)
        .neq("user_id", (await supabase.auth.getUser()).data.user?.id);
      
      if (sharedError) throw sharedError;

      return [...(ownedAccounts || []), ...(sharedAccounts || [])];
    },
  });

  const handleStar = (emailId: string) => {
    console.log("Starring email:", emailId);
    toast({
      title: "Email marqué",
      description: "L'email a été ajouté à vos favoris",
    });
  };

  const handleDelete = (emailId: string) => {
    console.log("Deleting email:", emailId);
    toast({
      title: "Email supprimé",
      description: "L'email a été déplacé vers la corbeille",
      variant: "destructive",
    });
  };

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
                {account.account_permissions && (
                  <Badge variant="secondary">
                    Partagé ({account.account_permissions.permission_level})
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
        </Card>
      ))}
    </div>
  );
}