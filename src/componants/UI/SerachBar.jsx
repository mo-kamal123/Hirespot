import Button from "./Button";

const SerachBar = ({ value, onChange, onClick, onKeyPress }) => {
  return (
    <form onSubmit={onClick} className="flex items-center gap-2">
      <input
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        className="p-3 lg:w-[500px] rounded   bg-white  focus:outline-none dark:bg-neutral-200"
        type="text"
        name="search"
        id="search"
        required
        placeholder="Search with title or category name"
      />
      <Button required className="bg-blue-600 text-white px-4 py-2 ">
        search
      </Button>
    </form>
  );
};

export default SerachBar;
