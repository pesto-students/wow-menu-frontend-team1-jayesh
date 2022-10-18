function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col w-auto px-4 pt-4 pb-4 bg-white rounded-lg shadow-md cursor-pointer h-max opacity-60 dark:bg-gray-800 gap-y-3">
      <div className="animate-pulse">
        <div className="self-center w-3/4 mx-auto mt-4 rounded h-7 bg-slate-300 dark:bg-slate-700" />
        <div className="h-6 mx-auto mt-3 rounded bg-slate-300 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export default CategoryCardSkeleton;
