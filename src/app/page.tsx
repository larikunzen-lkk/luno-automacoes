export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Luno Automações
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          A geração imediatista não espera. Sua operação também não deveria.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          Site em construção — em breve
        </div>
      </div>
    </main>
  );
}
