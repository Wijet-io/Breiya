import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface Account {
  id: string;
  email: string;
  provider: "gmail" | "outlook" | "other";
  color: string;
}

const mockAccounts: Account[] = [
  {
    id: "1",
    email: "pro@breiya.com",
    provider: "gmail",
    color: "#DB4437",
  },
  {
    id: "2",
    email: "perso@breiya.com",
    provider: "outlook",
    color: "#0072C6",
  },
];

export function AccountSelector() {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold mb-4">Comptes Email</h2>
      <div className="space-y-2">
        {mockAccounts.map((account) => (
          <Card
            key={account.id}
            className="p-3 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
            style={{ borderLeft: `4px solid ${account.color}` }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex flex-col">
                <span className="font-medium">{account.email}</span>
                <span className="text-sm text-gray-500 capitalize">
                  {account.provider}
                </span>
              </div>
            </div>
            <Check className="h-4 w-4 text-green-500" />
          </Card>
        ))}
        <Button className="w-full" variant="outline">
          Ajouter un compte
        </Button>
      </div>
    </div>
  );
}