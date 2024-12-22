import { EmailList } from "@/features/email/components/EmailList";
import { AccountSelector } from "@/features/email/components/AccountSelector";
import { MainLayout } from "@/components/layout/MainLayout";
import { PageHeader } from "@/components/layout/PageHeader";

const Index = () => {
  return (
    <MainLayout>
      <PageHeader
        title="Gestion unifiée de vos emails"
        description="Gérez tous vos comptes email depuis une seule interface moderne et sécurisée."
      />
      <div className="animate-fade-in">
        <div className="grid gap-8 md:grid-cols-[350px_1fr]">
          <aside className="space-y-6">
            <AccountSelector />
          </aside>
          <EmailList />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;