import Card from "../components/Card";
import Button from "../components/Button";

// style for different props
const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 pb-20 bg-light-base3 dark:bg-dark-base3",
};

function ViewCard({ className }) {
  return (
    <Card
      className={`
      ${classes.base}
      ${className}
  `}
    >
      <Button size="block" className="py-2.5" href="/bill">
        <div className="flex items-center">
          <p>Generate Bill</p>
        </div>
      </Button>
    </Card>
  );
}

export default ViewCard;
