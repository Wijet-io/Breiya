import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailAccountCard } from "./EmailAccountCard";
import { useEmailAccounts } from "../hooks/useEmailAccounts";

export function EmailList() {
  const { data: emailAccounts, isLoading } = useEmailAccounts();

  if (isLoading) {
    return <div>Chargement des comptes...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Boîte de réception unifiée</h1>
        <Button variant="outline">
          <Mail className="mr-2 h-4 w-4" />
          Composer
        </Button>
      </div>
      
      <div className="space-y-4">
        {emailAccounts?.map((account) => (
          <EmailAccountCard key={account.id} account={account} variant="full" />
        ))}
      </div>
    </div>
  );
}