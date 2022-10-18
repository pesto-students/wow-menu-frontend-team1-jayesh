const classes = {
  base: "w-full py-2 pl-2 bg-transparent text-slate-400 placeholder:italic placeholder:text-slate-400 focus:outline-none",
};

function Textfield({ placeholder, onInput }) {
  return (
    <textarea
      onInput={onInput}
      className={`${classes.base}`}
      placeholder={placeholder}
      rows="1"
    />
  );
}

export default Textfield;
