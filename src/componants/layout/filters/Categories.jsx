import { useState } from "react";
import { useCategoriesQuery } from "../../../hooks/useCategoriesQuery";
import { AnimatePresence, motion } from "motion/react";

const Categories = ({ checked, handleSelectedCategory }) => {
  // get categories data and handle openinng and closing accordion
  const [opened, setOpend] = useState(false);
  const { data: categories, isError } = useCategoriesQuery();
  const handleOpenAccordion = () => {
    setOpend(!opened);
  };

  return (
    <div>
      <div
        onClick={handleOpenAccordion}
        className="flex w-full justify-between py-3 "
      >
        <p>Category</p>
        <motion.span animate={{ rotate: opened ? 0 : 180 }}>
          <i className="fa-solid fa-chevron-down"></i>
        </motion.span>
      </div>
      <AnimatePresence>
        {opened && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {categories &&
              categories.map((category) => (
                <motion.div
                  layout
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    onClick={() => handleSelectedCategory(category.slug)}
                    checked={checked === category.slug}
                    key={category.id}
                    type="checkbox"
                    id={category.id}
                    name={category.id}
                    value={category.slug}
                  />
                  <label className="ml-1" htmlFor={category.id}>
                    {category.name}
                  </label>
                </motion.div>
              ))}
            {isError && <p>ther are no categories now</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Categories;
