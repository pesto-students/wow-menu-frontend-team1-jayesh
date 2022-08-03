import BackButton from "./BackButton";

function PageHeader({ name }) {
  return (
    <>
      <BackButton />
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-light-text1 dark:text-dark-text1">
          {name}
        </h2>
      </div>
    </>
  );
}

export default PageHeader;
