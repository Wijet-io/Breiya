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
import { Share2 } from "lucide-react";

interface ShareEmailAccountDialogProps {
  emailAccountId: string;
  emailAddress: string;
}

export function ShareEmailAccountDialog({ emailAccountId, emailAddress }: ShareEmailAccountDialogProps) {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [permissionLevel, setPermissionLevel] = useState<string>("read");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Vérifier si l'utilisateur existe
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", userEmail)
        .single();

      if (profileError || !profiles) {
        toast({
          title: "Erreur",
          description: "Utilisateur non trouvé",
          variant: "destructive",
        });
        return;
      }

      // Ajouter la permission
      const { error } = await supabase.from("account_permissions").insert({
        email_account_id: emailAccountId,
        granted_to_user_id: profiles.id,
        permission_level: permissionLevel,
      });

      if (error) throw error;

      toast({
        title: "Accès partagé",
        description: `L'accès a été partagé avec ${userEmail}`,
      });
      
      setOpen(false);
      setUserEmail("");
      setPermissionLevel("read");
    } catch (error: any) {
      console.error("Error sharing email account:", error);
      toast({
        title: "Erreur",
        description: "Impossible de partager l'accès",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Partager
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Partager l'accès</DialogTitle>
            <DialogDescription>
              Partagez l'accès à {emailAddress} avec d'autres utilisateurs.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="userEmail">Email de l'utilisateur</Label>
              <Input
                id="userEmail"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="utilisateur@exemple.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="permissionLevel">Niveau d'accès</Label>
              <Select
                value={permissionLevel}
                onValueChange={setPermissionLevel}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un niveau d'accès" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="read">Lecture seule</SelectItem>
                  <SelectItem value="write">Lecture et écriture</SelectItem>
                  <SelectItem value="admin">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Partager l'accès</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}