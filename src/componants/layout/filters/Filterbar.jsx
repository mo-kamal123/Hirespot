import { useRef } from "react";
import Categories from "./Categories";
import Button from "../../UI/Button";

const Filterbar = ({
  checked,
  handleSelectedCategory,
  filtering,
  onFiltering,
}) => {
  // get and change location info
  const locatoinRef = useRef();
  const handleChangeLocation = () => {
    onFiltering("location", locatoinRef.current.value);
  };

  return (
    <div className="hidden lg:block border-[1px] border-[#b7b7b7] w-1/4 max-h-fit px-4 py-3 bg-white dark:bg-[#2d2d2d] dark:text-white">
      <div className="border-b-[1px] pb-4">
        <p className="font-bold">Filters</p>
      </div>
      <Categories
        checked={checked}
        handleSelectedCategory={handleSelectedCategory}
      />
      <div className="flex gap-3 border-y-[1px] border-[#b7b7b7] py-4">
        <Button
          onClick={() => onFiltering("type", "full_time")}
          className={`${
            filtering.type === "full_time"
              ? "bg-blue-500"
              : "bg-gray-200 dark:bg-neutral-600"
          } p-1 rounded text-sm`}
        >
          Full-Time
        </Button>
        <Button
          onClick={() => onFiltering("type", "part_time")}
          className={`${
            filtering.type === "part_time"
              ? "bg-blue-500"
              : "bg-gray-200 dark:bg-neutral-600"
          } p-1  rounded text-sm`}
        >
          Part-Time
        </Button>
      </div>
      <div className="flex flex-col gap-2 border-b-[1px] border-[#b7b7b7] py-4">
        <label>Location</label>
        <div className="flex  gap-2">
          <input
            ref={locatoinRef}
            className="p-2 bg-neutral-200 focus:outline-0 dark:bg-neutral-600"
            type="text"
            name="location"
            id="location"
            placeholder="Type your location"
          />
          <Button
            className="m-auto bg-blue-600 text-white px-2 py-1 text-lg w-full rounded"
            onClick={handleChangeLocation}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filterbar;
