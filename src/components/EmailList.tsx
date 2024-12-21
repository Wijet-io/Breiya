import { Mail, Star, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Email {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  date: string;
  isStarred: boolean;
  accountId: string;
  accountColor: string;
}

const mockEmails: Email[] = [
  {
    id: "1",
    subject: "Welcome to BREIYA",
    sender: "team@breiya.com",
    preview: "Get started with your email management journey...",
    date: "2024-02-20",
    isStarred: false,
    accountId: "1",
    accountColor: "#DB4437",
  },
  {
    id: "2",
    subject: "Your first achievement!",
    sender: "achievements@breiya.com",
    preview: "Congratulations! You've earned your first badge...",
    date: "2024-02-20",
    isStarred: true,
    accountId: "2",
    accountColor: "#0072C6",
  },
];

export function EmailList() {
  const { toast } = useToast();

  const handleStar = (emailId: string) => {
    console.log("Starring email:", emailId);
    toast({
      title: "Email marqué",
      description: "L'email a été ajouté à vos favoris",
    });
  };

  const handleDelete = (emailId: string) => {
    console.log("Deleting email:", emailId);
    toast({
      title: "Email supprimé",
      description: "L'email a été déplacé vers la corbeille",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Boîte de réception unifiée</h1>
        <Button variant="outline">
          <Mail className="mr-2 h-4 w-4" />
          Composer
        </Button>
      </div>
      
      {mockEmails.map((email) => (
        <Card
          key={email.id}
          className="p-4 hover:shadow-lg transition-shadow animate-fade-in"
          style={{ borderLeft: `4px solid ${email.accountColor}` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{email.subject}</h3>
                <Badge variant="outline" className="text-xs">
                  {email.accountId === "1" ? "Pro" : "Perso"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{email.sender}</p>
              <p className="text-sm mt-2">{email.preview}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleStar(email.id)}
                className={email.isStarred ? "text-yellow-400" : ""}
              >
                <Star className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(email.id)}
                className="text-red-400"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400">{email.date}</div>
        </Card>
      ))}
    </div>
  );
}