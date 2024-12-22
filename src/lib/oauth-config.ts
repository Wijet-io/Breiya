import { supabase } from "@/integrations/supabase/client";

export type OAuthProvider = "gmail" | "outlook";

interface OAuthConfig {
  clientId: string;
  clientSecret: string;
}

const OAUTH_CONFIGS: Record<OAuthProvider, OAuthConfig> = {
  gmail: {
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  },
  outlook: {
    clientId: process.env.MICROSOFT_CLIENT_ID || "",
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
  },
};

export async function getOAuthConfig(provider: OAuthProvider): Promise<OAuthConfig> {
  try {
    // Appeler une fonction Edge Supabase pour récupérer la config
    const { data, error } = await supabase.functions.invoke("get-oauth-config", {
      body: { provider },
    });

    if (error) throw error;
    return data as OAuthConfig;
  } catch (error) {
    console.error("Error fetching OAuth config:", error);
    throw new Error("Impossible de récupérer la configuration OAuth");
  }
}