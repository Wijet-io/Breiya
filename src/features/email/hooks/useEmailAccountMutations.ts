import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { EmailAccountFormData, ShareEmailAccountFormData } from "../types";

export function useEmailAccountMutations() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addEmailAccount = useMutation({
    mutationFn: async (data: EmailAccountFormData) => {
      console.log("Adding new email account:", data);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const colors = ["#DB4437", "#4285F4", "#0072C6", "#34A853", "#7E69AB"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      const { data: account, error } = await supabase
        .from("email_accounts")
        .insert({
          email: data.email,
          provider: data.provider,
          display_name: data.displayName,
          color: randomColor,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return account;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailAccounts"] });
      toast({
        title: "Compte ajouté",
        description: "Votre compte email a été ajouté avec succès",
      });
    },
    onError: (error) => {
      console.error("Error adding email account:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le compte email",
        variant: "destructive",
      });
    },
  });

  const shareEmailAccount = useMutation({
    mutationFn: async ({ emailAccountId, data }: { emailAccountId: string, data: ShareEmailAccountFormData }) => {
      console.log("Sharing email account:", { emailAccountId, data });
      
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", data.userEmail)
        .single();

      if (profileError || !profile) {
        throw new Error("Utilisateur non trouvé");
      }

      const { error } = await supabase
        .from("account_permissions")
        .insert({
          email_account_id: emailAccountId,
          granted_to_user_id: profile.id,
          permission_level: data.permissionLevel,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["emailAccounts"] });
      toast({
        title: "Accès partagé",
        description: "L'accès a été partagé avec succès",
      });
    },
    onError: (error) => {
      console.error("Error sharing email account:", error);
      toast({
        title: "Erreur",
        description: "Impossible de partager l'accès",
        variant: "destructive",
      });
    },
  });

  return {
    addEmailAccount,
    shareEmailAccount,
  };
}