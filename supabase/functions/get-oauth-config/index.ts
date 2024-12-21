import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { provider } = await req.json()
    console.log("Fetching OAuth config for provider:", provider)

    let clientId = ""
    let clientSecret = ""

    switch (provider) {
      case "gmail":
        clientId = Deno.env.get("GOOGLE_CLIENT_ID") || ""
        clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET") || ""
        break
      case "outlook":
        clientId = Deno.env.get("MICROSOFT_CLIENT_ID") || ""
        clientSecret = Deno.env.get("MICROSOFT_CLIENT_SECRET") || ""
        break
      default:
        throw new Error("Provider non supporté")
    }

    if (!clientId || !clientSecret) {
      throw new Error("Configuration OAuth manquante")
    }

    return new Response(
      JSON.stringify({ clientId, clientSecret }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      },
    )
  } catch (error) {
    console.error("Error in get-oauth-config:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      },
    )
  }
})