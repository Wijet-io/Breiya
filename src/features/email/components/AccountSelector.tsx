import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddEmailAccountDialog } from "./AddEmailAccountDialog";
import { EmailAccountCard } from "./EmailAccountCard";
import { useEmailAccounts } from "../hooks/useEmailAccounts";

export function AccountSelector() {
  const { data: accounts, isLoading } = useEmailAccounts();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Comptes Email</h2>
          <Button variant="outline" size="sm" disabled>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="p-3 animate-pulse bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Comptes Email</h2>
        <AddEmailAccountDialog
          trigger={
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          }
        />
      </div>
      
      <div className="space-y-3">
        {accounts?.map((account) => (
          <EmailAccountCard key={account.id} account={account} variant="compact" />
        ))}

        {accounts?.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed">
            <h3 className="font-medium mb-2">Aucun compte email</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Commencez par ajouter votre premier compte email
            </p>
            <AddEmailAccountDialog
              trigger={
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un compte
                </Button>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}