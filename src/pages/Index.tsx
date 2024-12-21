import { EmailList } from "@/components/EmailList";
import { AccountSelector } from "@/components/AccountSelector";
import { ScoreCard } from "@/components/ScoreCard";
import { UserNav } from "@/components/UserNav";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BREIYA
            </h1>
            <span className="rounded-lg bg-primary/10 px-2 py-1 text-xs text-primary">Beta</span>
          </div>
          <div className="flex items-center gap-4">
            <ScoreCard />
            <Separator orientation="vertical" className="h-8" />
            <UserNav />
          </div>
        </div>
      </header>
      
      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Gestion unifiée de vos emails
          </h2>
          <p className="text-muted-foreground mt-2">
            Gérez tous vos comptes email depuis une seule interface moderne et sécurisée.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-[350px_1fr]">
          <aside className="space-y-6">
            <AccountSelector />
          </aside>
          <EmailList />
        </div>
      </main>
    </div>
  );
};

export default Index;