import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export interface EmailAccount {
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

export function useEmailAccounts() {
  const { toast } = useToast();

  return useQuery({
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

        const { data, error } = await supabase
          .from("email_accounts")
          .select(`
            *,
            account_permissions (
              permission_level
            )
          `);
        
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
}