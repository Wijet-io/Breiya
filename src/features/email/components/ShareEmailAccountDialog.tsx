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
import type { PermissionLevel } from "../types";

interface ShareEmailAccountDialogProps {
  emailAccountId: string;
  emailAddress: string;
  trigger: React.ReactNode;
}

export function ShareEmailAccountDialog({
  emailAccountId,
  emailAddress,
  trigger,
}: ShareEmailAccountDialogProps) {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [permissionLevel, setPermissionLevel] = useState<PermissionLevel>("read");
  
  const { shareEmailAccount } = useEmailAccountMutations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Attempting to share email account...");
    
    try {
      await shareEmailAccount.mutateAsync({
        emailAccountId,
        data: {
          userEmail,
          permissionLevel,
        },
      });
      
      setOpen(false);
      setUserEmail("");
      setPermissionLevel("read");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <DialogWrapper
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      title="Partager l'accès"
      description={`Partagez l'accès à ${emailAddress} avec d'autres utilisateurs.`}
    >
      <form onSubmit={handleSubmit}>
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
              onValueChange={(value) => setPermissionLevel(value as PermissionLevel)}
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
        <div className="flex justify-end">
          <Button type="submit" disabled={shareEmailAccount.isPending}>
            {shareEmailAccount.isPending ? "Partage en cours..." : "Partager l'accès"}
          </Button>
        </div>
      </form>
    </DialogWrapper>
  );
}