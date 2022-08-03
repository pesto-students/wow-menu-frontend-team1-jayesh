import Card from "../components/Card";
import Button from "../components/Button";

// style for different props
const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 pb-7",
  bg: {
    light: "bg-light-base2",
    dark: "bg-dark-base2",
  },
};

function ViewCard({ className, theme = "light" }) {
  return (
    <Card
      className={`
      ${classes.base}
      ${classes.bg[theme]}
      ${className}
  `}
    >
      <Button size="block">
        <div className="flex items-center">
          <p>Generate Bill</p>
        </div>
      </Button>
    </Card>
  );
}

export default ViewCard;
