function UserListSkeleton() {
  return (
    <div className="flex flex-col w-auto px-0 pt-4 pb-12 bg-white rounded-lg shadow-md cursor-pointer h-max opacity-60 dark:bg-gray-800 gap-y-3">
      <div className="mt-2 overflow-x-auto animate-pulse">
        <div className="mx-auto mt-0 rounded h-7 bg-slate-300 dark:bg-slate-700" />
        <div className="mx-auto mt-6 rounded h-7 bg-slate-300 dark:bg-slate-700" />
        <div className="mx-auto mt-6 rounded h-7 bg-slate-300 dark:bg-slate-700" />
        <div className="mx-auto mt-6 rounded h-7 bg-slate-300 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export default UserListSkeleton;
