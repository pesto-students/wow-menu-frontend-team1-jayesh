function PageNotFound() {
  return (
    <main className="flex flex-col flex-1 h-screen gap-6 p-4 py-8 bg-gray-100">
      <header>
        <h1 className="text-5xl font-bold text-center">:/</h1>
        <h1 className="mt-4 text-5xl font-bold text-center text-primary">
          404
        </h1>
        <h3 className="mb-4 text-2xl font-semibold text-center text-primary">
          Page not found
        </h3>
        <p className="text-lg font-semibold text-center text-slate-500">
          The page you are looking for doesn&apos;t exist or an other error
          occured.
        </p>
      </header>
    </main>
  );
}

export default PageNotFound;
