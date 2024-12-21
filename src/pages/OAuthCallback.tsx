import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state"); // email_account_id
      const error = params.get("error");

      if (error) {
        console.error("OAuth error:", error);
        toast({
          title: "Erreur d'autorisation",
          description: "L'autorisation a échoué. Veuillez réessayer.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      if (!code || !state) {
        console.error("Missing code or state");
        toast({
          title: "Erreur",
          description: "Paramètres manquants dans la réponse",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      try {
        // Appeler la fonction Edge pour échanger le code contre un token
        const { data, error: exchangeError } = await supabase.functions.invoke("exchange-oauth-token", {
          body: { code, state },
        });

        if (exchangeError) throw exchangeError;

        toast({
          title: "Succès",
          description: "Votre compte email a été connecté avec succès",
        });
      } catch (error) {
        console.error("Error exchanging token:", error);
        toast({
          title: "Erreur",
          description: "Impossible de finaliser l'autorisation",
          variant: "destructive",
        });
      }

      navigate("/");
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Autorisation en cours...</h1>
        <p>Veuillez patienter pendant que nous finalisons la connexion.</p>
      </div>
    </div>
  );
};

export default OAuthCallback;