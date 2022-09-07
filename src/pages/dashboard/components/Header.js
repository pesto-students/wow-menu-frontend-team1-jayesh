function Header({ name }) {
  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold leading-loose text-light-text1 dark:text-dark-text1">
          {name}
        </h1>
        <div className="text-slate-700 dark:text-gray-500">
          {new Date().toDateString()}
        </div>
      </header>
      <hr className="mt-3 border-gray-700 dark:border-gray-500" />
    </>
  );
}

export default Header;
