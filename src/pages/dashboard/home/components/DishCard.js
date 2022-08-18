function DishCard({ image, name, price, description }) {
  return (
    <div className="flex flex-col w-auto px-4 pt-4 pb-6 mt-16 bg-white rounded-lg shadow-md cursor-pointer dark:bg-gray-900 gap-y-3">
      <img
        className="mx-auto -mt-16 rounded-full w-36 h-36"
        src={image}
        alt=""
      />
      <div className="font-bold tracking-wide text-center text-md text-slate-500 dark:text-white">
        {name}
      </div>
      <div className="text-center text-primary">₹{price}</div>
      <div className="text-center text-slate-500 dark:text-gray-500 line-clamp-3">
        {description}
      </div>
    </div>
  );
}

export default DishCard;
