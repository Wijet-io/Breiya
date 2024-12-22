// @ts-ignore
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Gérer les requêtes OPTIONS pour CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { provider } = await req.json();

    // Récupérer les variables d'environnement en fonction du provider
    let config;
    switch (provider) {
      case "gmail":
        config = {
          clientId: Deno.env.get("GOOGLE_CLIENT_ID"),
          clientSecret: Deno.env.get("GOOGLE_CLIENT_SECRET"),
        };
        break;
      case "outlook":
        config = {
          clientId: Deno.env.get("MICROSOFT_CLIENT_ID"),
          clientSecret: Deno.env.get("MICROSOFT_CLIENT_SECRET"),
        };
        break;
      default:
        throw new Error(`Provider non supporté: ${provider}`);
    }

    // Vérifier que la configuration est complète
    if (!config.clientId || !config.clientSecret) {
      throw new Error(`Configuration OAuth manquante pour ${provider}`);
    }

    return new Response(JSON.stringify(config), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in get-oauth-config:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});