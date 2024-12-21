import { EmailList } from "@/components/EmailList";
import { AccountSelector } from "@/components/AccountSelector";
import { ScoreCard } from "@/components/ScoreCard";
import { UserNav } from "@/components/UserNav";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">BREIYA</h1>
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
          <h2 className="text-3xl font-bold tracking-tight">Gestion unifiée de vos emails</h2>
          <p className="text-muted-foreground">Gérez tous vos comptes email depuis une seule interface.</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
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