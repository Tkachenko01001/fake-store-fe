import { ButtonCategoryProps } from "@/app/types/types";

const ButtonCategory: React.FC<ButtonCategoryProps> = ({ category }) => {

  return (
    <button className="hover:text-yellow-500 transition cursor-pointer">
      {category}
    </button>
  );
};

export default ButtonCategory;