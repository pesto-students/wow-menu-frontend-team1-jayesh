function FilterDropdown({ theme }) {
  return (
    <div
      className={`absolute z-10 w-48 mt-2 origin-top-right bg-${theme}-base3 rounded-md shadow-lg right-3`}
    >
      <div className="py-1">
        <div className="flex items-center justify-between p-2 form-check">
          <p className={`text-${theme}-text1`}>Veg</p>
          <input
            className="w-6 h-6 rounded cursor-pointer accent-primary"
            type="checkbox"
            name="veg"
          />
        </div>
        <div className="flex items-center justify-between p-2 form-check">
          <p className={`text-${theme}-text1`}>Non Veg</p>
          <input
            className="w-6 h-6 rounded cursor-pointer accent-primary"
            type="checkbox"
            name="nonveg"
          />
        </div>
        <hr className={`my-2 border-${theme}-base2`} />
        <p className={`text-lg font-semibold pl-2 text-${theme}-text1`}>
          Spicy
        </p>
        <div className="flex items-center justify-between p-2 form-check">
          <p className={`pl-2 text-${theme}-text1`}>Low</p>
          <input
            className="w-6 h-6 rounded cursor-pointer accent-primary"
            type="checkbox"
            name="spicyLow"
          />
        </div>
        <div className="flex items-center justify-between p-2 form-check">
          <p className={`pl-2 text-${theme}-text1`}>Medium</p>
          <input
            className="w-6 h-6 rounded cursor-pointer accent-primary"
            type="checkbox"
            name="spicyMedium"
          />
        </div>
        <div className="flex items-center justify-between p-2 form-check">
          <p className={`pl-2 text-${theme}-text1`}>High</p>
          <input
            className="w-6 h-6 rounded cursor-pointer accent-primary"
            type="checkbox"
            name="spicyHigh"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterDropdown;
