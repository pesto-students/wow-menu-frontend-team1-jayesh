import moment from "moment";

function Header({ name, theme = "light" }) {
  return (
    <div>
      <h1 className={`text-2xl font-semibold text-${theme}-text1`}>{name}</h1>
      <p className={`text-${theme}-text2`}>
        {moment().format("dddd, Do YYYY")}
      </p>
    </div>
  );
}

export default Header;
