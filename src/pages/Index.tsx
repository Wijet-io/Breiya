import { EmailList } from "@/components/EmailList";
import { ScoreCard } from "@/components/ScoreCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">BREIYA</h1>
          <p className="text-gray-600">Your intelligent email assistant</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <EmailList />
          <aside className="space-y-6">
            <ScoreCard />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;