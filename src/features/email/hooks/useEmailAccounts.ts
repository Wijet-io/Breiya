import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { EmailAccount } from "../types";

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

        // First fetch owned accounts
        const { data: ownedAccounts, error: ownedError } = await supabase
          .from("email_accounts")
          .select(`
            *,
            account_permissions (
              permission_level
            )
          `)
          .eq('user_id', user.id);

        if (ownedError) {
          console.error("Error fetching owned accounts:", ownedError);
          throw ownedError;
        }

        // Then fetch shared accounts
        const { data: sharedAccounts, error: sharedError } = await supabase
          .from("email_accounts")
          .select(`
            *,
            account_permissions (
              permission_level
            )
          `)
          .neq('user_id', user.id)
          .eq('account_permissions.granted_to_user_id', user.id);

        if (sharedError) {
          console.error("Error fetching shared accounts:", sharedError);
          throw sharedError;
        }

        // Combine and return all accounts
        const allAccounts = [...(ownedAccounts || []), ...(sharedAccounts || [])];
        console.log("Fetched accounts:", allAccounts);
        
        return allAccounts as EmailAccount[];
      } catch (error) {
        console.error("Error fetching accounts:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos comptes email",
          variant: "destructive",
        });
        return [];
      }
    },
  });
}