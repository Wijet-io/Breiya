import { UserNav } from "@/components/UserNav";
import { Separator } from "@/components/ui/separator";
import { ScoreCard } from "@/components/ScoreCard";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
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
      <main className="container py-8">{children}</main>
    </div>
  );
}