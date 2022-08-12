import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { getBill } from "../../../redux/reducers/billReducer";

// style for different props
const classes = {
  base: "absolute inset-x-0 bottom-0 pt-10 pb-20 bg-light-base3 dark:bg-dark-base3",
};

function GenerateBillCard({ className }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGenerateBill = () => {
    dispatch(getBill());
    navigate("/bill");
  };

  return (
    <Card
      className={`
      ${classes.base}
      ${className}
  `}
    >
      <Button size="block" className="py-2.5" onClick={handleGenerateBill}>
        <div className="flex items-center">
          <p>Generate Bill</p>
        </div>
      </Button>
    </Card>
  );
}

export default GenerateBillCard;
