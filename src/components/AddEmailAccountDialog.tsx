import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export function AddEmailAccountDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState<string>("");
  const [displayName, setDisplayName] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting new email account...");
    
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("No user found");
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour ajouter un compte email",
          variant: "destructive",
        });
        return;
      }

      const colors = ["#DB4437", "#4285F4", "#0072C6", "#34A853", "#7E69AB"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      console.log("Adding email account to database...");
      const { error } = await supabase.from("email_accounts").insert({
        email,
        provider,
        display_name: displayName,
        color: randomColor,
        user_id: user.id,
      });

      if (error) {
        console.error("Error adding email account:", error);
        throw error;
      }

      console.log("Email account added successfully");
      await queryClient.invalidateQueries({ queryKey: ["emailAccounts"] });

      toast({
        title: "Compte ajouté",
        description: "Votre compte email a été ajouté avec succès",
      });
      
      setOpen(false);
      setEmail("");
      setProvider("");
      setDisplayName("");
    } catch (error: any) {
      console.error("Error adding email account:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le compte email",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un compte
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Ajouter un compte email</DialogTitle>
            <DialogDescription>
              Connectez votre compte email pour commencer à gérer vos emails.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="provider">Fournisseur</Label>
              <Select
                value={provider}
                onValueChange={setProvider}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un fournisseur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmail">Gmail</SelectItem>
                  <SelectItem value="outlook">Outlook</SelectItem>
                  <SelectItem value="imap">IMAP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="displayName">Nom d'affichage (optionnel)</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ex: Email Pro"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Ajouter le compte</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}