import { Button } from "@/components/ui/button";
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
import { DialogWrapper } from "@/components/common/DialogWrapper";
import { useEmailAccountMutations } from "../hooks/useEmailAccountMutations";
import { DialogTriggerProps } from "@/types/ui";
import type { EmailProvider } from "../types";

type AddEmailAccountDialogProps = DialogTriggerProps;

export function AddEmailAccountDialog({ trigger }: AddEmailAccountDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState<EmailProvider | "">("");
  const [displayName, setDisplayName] = useState("");
  
  const { addEmailAccount } = useEmailAccountMutations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting new email account...");
    
    if (!provider) return;

    try {
      await addEmailAccount.mutateAsync({
        email,
        provider,
        displayName: displayName || undefined,
      });
      
      setOpen(false);
      setEmail("");
      setProvider("");
      setDisplayName("");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <DialogWrapper
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      title="Ajouter un compte email"
      description="Connectez votre compte email pour commencer à gérer vos emails."
    >
      <form onSubmit={handleSubmit}>
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
              onValueChange={(value) => setProvider(value as EmailProvider)}
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
        <div className="flex justify-end">
          <Button type="submit" disabled={addEmailAccount.isPending}>
            {addEmailAccount.isPending ? "Ajout en cours..." : "Ajouter le compte"}
          </Button>
        </div>
      </form>
    </DialogWrapper>
  );
}