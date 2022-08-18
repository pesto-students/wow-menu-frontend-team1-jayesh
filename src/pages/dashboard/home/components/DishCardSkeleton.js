export default function DishCardSkeleton() {
  return (
    <div className="flex flex-col w-auto px-4 pt-4 pb-6 mt-16 bg-white rounded-lg shadow-md cursor-pointer dark:bg-gray-900 gap-y-3 opacity-60 h-max">
      <div className="animate-pulse">
        <div className="mx-auto -mt-16 rounded-full w-36 h-36 bg-slate-300 dark:bg-slate-700" />
        <div className="self-center w-3/4 h-5 mx-auto mt-4 rounded bg-slate-300 dark:bg-slate-700" />
        <div className="w-1/4 h-5 mx-auto mt-4 rounded bg-slate-300 dark:bg-slate-700" />
        <div className="h-4 mx-auto mt-4 rounded bg-slate-300 dark:bg-slate-700" />
        <div className="h-4 mx-auto mt-3 rounded bg-slate-300 dark:bg-slate-700" />
        <div className="h-4 mx-auto mt-3 rounded bg-slate-300 dark:bg-slate-700" />
      </div>
    </div>
  );
}
