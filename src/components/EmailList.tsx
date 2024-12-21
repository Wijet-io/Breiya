import { Mail, Star, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Email {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  date: string;
  isStarred: boolean;
}

const mockEmails: Email[] = [
  {
    id: "1",
    subject: "Welcome to BREIYA",
    sender: "team@breiya.com",
    preview: "Get started with your email management journey...",
    date: "2024-02-20",
    isStarred: false,
  },
  {
    id: "2",
    subject: "Your first achievement!",
    sender: "achievements@breiya.com",
    preview: "Congratulations! You've earned your first badge...",
    date: "2024-02-20",
    isStarred: true,
  },
];

export function EmailList() {
  const { toast } = useToast();

  const handleStar = (emailId: string) => {
    console.log("Starring email:", emailId);
    toast({
      title: "Email starred",
      description: "Email has been added to your favorites",
    });
  };

  const handleDelete = (emailId: string) => {
    console.log("Deleting email:", emailId);
    toast({
      title: "Email deleted",
      description: "Email has been moved to trash",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4 p-4 max-w-4xl mx-auto">
      {mockEmails.map((email) => (
        <Card key={email.id} className="p-4 hover:shadow-lg transition-shadow animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{email.subject}</h3>
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