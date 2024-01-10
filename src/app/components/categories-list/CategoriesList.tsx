import { useSelector } from "react-redux";
import { selectCategories } from "@/redux/selectors/selectors";
import ButtonCategory from "../button-category/ButtonCategory";
import { CategorySingle } from "@/app/types/types";

const CategoriesList = () => {
    const { categories } = useSelector(selectCategories);
    
    return (
        <ul className="flex flex-col justify-around gap-y-10">
            {categories &&
                categories.map((category: CategorySingle) => (
                    <li
                        key={category}
                        className="hover:text-gray-300 transition cursor-pointer"
                    >
                        <ButtonCategory category={category} />
                    </li>
                ))}
        </ul>
    )
};

export default CategoriesList;