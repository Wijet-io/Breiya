interface PageHeaderProps {
    title: string;
    description?: string;
  }
  
  export function PageHeader({ title, description }: PageHeaderProps) {
    return (
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
    );
  }