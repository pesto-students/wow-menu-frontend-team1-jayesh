import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function QtyButton({ qty, onInc, onDec }) {
  return (
    <div className="flex items-center justify-between w-full rounded justify-among bg-primary shadow-glow ">
      <button
        type="button"
        className="flex items-center justify-center p-2 grow"
        onClick={onDec}
      >
        <AiOutlineMinus size={20} className="text-white" />
      </button>
      <p className="text-lg font-semibold text-white">{qty}</p>
      <button
        type="button"
        className="flex items-center justify-center p-2 grow"
        onClick={onInc}
      >
        <AiOutlinePlus size={20} className="text-white " />
      </button>
    </div>
  );
}

export default QtyButton;
