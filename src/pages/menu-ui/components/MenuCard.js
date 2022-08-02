import { BiRupee } from "react-icons/bi";
import { AiOutlineClockCircle, AiOutlinePlus } from "react-icons/ai";
import Card from "./Card";
import Button from "./Button";
import QtyButton from "./QtyButton";

function MenuCard({
  className,
  name,
  price,
  waitingTime,
  desc,
  qty,
  img,
  onInc,
  onDec,
  theme,
}) {
  return (
    <Card className={`bg-${theme}-base2 ${className}`}>
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-2">
          <h2 className={`text-${theme}-text1 font-medium`}>{name}</h2>
          <div className="flex items-center">
            <div className="flex items-center">
              <BiRupee className={`text-${theme}-text1 text-sm mr-1`} />
              <p className={`text-${theme}-text1 text-sm`}>{price}</p>
            </div>
            <div className="flex items-center ml-3">
              <AiOutlineClockCircle
                className={`text-${theme}-text1 text-sm mr-1`}
              />
              <p className={`text-${theme}-text1 text-sm`}>{waitingTime}</p>
            </div>
          </div>
          <p
            className={`line-clamp-2 overflow-hidden text-${theme}-text2 text-sm`}
          >
            {desc}
          </p>
        </div>
        <div className="relative">
          <img className="mx-auto rounded-full" src={img} alt={name} />
          <div className="absolute inset-x-0 bottom-0">
            {qty === 0 ? (
              <Button
                variant="outline"
                size="block"
                theme={theme}
                onClick={onInc}
              >
                <AiOutlinePlus className="mr-2" />
                ADD
              </Button>
            ) : (
              <QtyButton qty={1} onInc={onInc} onDec={onDec} />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default MenuCard;
