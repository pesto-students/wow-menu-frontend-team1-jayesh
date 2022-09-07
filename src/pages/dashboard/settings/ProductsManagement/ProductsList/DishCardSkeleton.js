function DishCardSkeleton() {
  return (
    <div className="flex flex-col w-auto px-4 pt-4 pb-12 bg-white rounded-lg shadow-md cursor-pointer h-max opacity-60 dark:bg-gray-800 gap-y-3">
      <div className="animate-pulse">
        <div className="w-24 h-24 mx-auto rounded-full bg-slate-300 dark:bg-slate-700" />
        <div className="self-center w-3/4 h-5 mx-auto mt-4 rounded bg-slate-300 dark:bg-slate-700" />
        <div className="w-1/5 h-5 mx-auto mt-4 rounded bg-slate-300 dark:bg-slate-700" />
        <div className="h-4 mx-auto mt-4 rounded bg-slate-300 dark:bg-slate-700" />
        <div className="h-4 mx-auto mt-3 rounded bg-slate-300 dark:bg-slate-700" />
        <div className="h-4 mx-auto mt-3 rounded bg-slate-300 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export default DishCardSkeleton;
