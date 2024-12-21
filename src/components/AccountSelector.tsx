import { Check } from "lucide-react";
import { Card } from "./ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AddEmailAccountDialog } from "./AddEmailAccountDialog";

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
      const { data, error } = await supabase
        .from("email_accounts")
        .select("*");
      
      if (error) {
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
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold mb-4">Comptes Email</h2>
      <div className="space-y-2">
        {accounts?.map((account) => (
          <Card
            key={account.id}
            className="p-3 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
            style={{ borderLeft: `4px solid ${account.color}` }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex flex-col">
                <span className="font-medium">
                  {account.display_name || account.email}
                </span>
                <span className="text-sm text-gray-500 capitalize">
                  {account.provider}
                </span>
              </div>
            </div>
            <Check className="h-4 w-4 text-green-500" />
          </Card>
        ))}
        <AddEmailAccountDialog />
      </div>
    </div>
  );
}