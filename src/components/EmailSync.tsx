import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface OAuthToken {
  id: string;
  email_account_id: string;
  access_token: string;
  refresh_token: string | null;
  expires_at: string | null;
  scope: string[];
}

export function EmailSync({ accountId, provider }: { accountId: string; provider: string }) {
  const { toast } = useToast();

  const { data: token, isLoading } = useQuery({
    queryKey: ["oauthToken", accountId],
    queryFn: async () => {
      console.log("Fetching OAuth token for account:", accountId);
      const { data, error } = await supabase
        .from("oauth_tokens")
        .select("*")
        .eq("email_account_id", accountId)
        .single();

      if (error) {
        console.error("Error fetching OAuth token:", error);
        return null;
      }

      return data as OAuthToken;
    },
  });

  const handleAuthorize = async () => {
    try {
      // Créer l'URL d'autorisation en fonction du provider
      let authUrl = "";
      const redirectUri = `${window.location.origin}/oauth/callback`;

      switch (provider) {
        case "gmail":
          authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${process.env.GOOGLE_CLIENT_ID}` +
            `&redirect_uri=${redirectUri}` +
            `&response_type=code` +
            `&scope=https://www.googleapis.com/auth/gmail.readonly` +
            `&access_type=offline` +
            `&prompt=consent` +
            `&state=${accountId}`;
          break;
        case "outlook":
          authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
            `client_id=${process.env.MICROSOFT_CLIENT_ID}` +
            `&redirect_uri=${redirectUri}` +
            `&response_type=code` +
            `&scope=offline_access Mail.Read` +
            `&state=${accountId}`;
          break;
        default:
          throw new Error("Provider non supporté");
      }

      // Ouvrir la fenêtre d'autorisation
      window.location.href = authUrl;
    } catch (error) {
      console.error("Error during authorization:", error);
      toast({
        title: "Erreur",
        description: "Impossible de lancer l'autorisation",
        variant: "destructive",
      });
    }
  };

  const handleRevoke = async () => {
    try {
      const { error } = await supabase
        .from("oauth_tokens")
        .delete()
        .eq("email_account_id", accountId);

      if (error) throw error;

      toast({
        title: "Accès révoqué",
        description: "L'accès à votre compte email a été révoqué",
      });
    } catch (error) {
      console.error("Error revoking access:", error);
      toast({
        title: "Erreur",
        description: "Impossible de révoquer l'accès",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="mt-4">
      {token ? (
        <Button
          variant="destructive"
          onClick={handleRevoke}
          className="w-full"
        >
          Révoquer l'accès
        </Button>
      ) : (
        <Button
          variant="secondary"
          onClick={handleAuthorize}
          className="w-full"
        >
          Autoriser la synchronisation
        </Button>
      )}
    </div>
  );
}