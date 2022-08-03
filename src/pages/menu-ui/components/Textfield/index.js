import classes from "./styles";

function Textfield({ placeholder }) {
  return (
    <input
      className={`${classes.base}`}
      placeholder={placeholder}
      type="text"
    />
  );
}

export default Textfield;
