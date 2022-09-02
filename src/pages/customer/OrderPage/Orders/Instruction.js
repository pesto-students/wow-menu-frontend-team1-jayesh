import { useDispatch } from "react-redux";
import Textfield from "../../components/Textfield";
import { addInstruction } from "../../../../store/reducers/cartReducer";

function Instruction() {
  const dispatch = useDispatch();
  const handleInstuctionInput = (e) => {
    dispatch(addInstruction(e.target.value));
  };
  return (
    <Textfield
      placeholder="Write instruction for Chef"
      onInput={(e) => handleInstuctionInput(e)}
    />
  );
}

export default Instruction;
