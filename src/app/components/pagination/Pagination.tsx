import { useSelector, useDispatch } from "react-redux";
import { selectProducts } from "@/redux/selectors/selectors";
import { setPage } from "@/redux/features/product-slice";

const Pagination = () => {
  const { products, selectedPage } = useSelector(selectProducts);
  const dispatch = useDispatch();

  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleClickPage = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className="my-4 text-center">
      <ul className="flex justify-center list-none">
        {[...Array(totalPages)].map((_, index) => (
          <li key={index} className="mx-1">
            <button
              type="button"
              onClick={() => handleClickPage(index + 1)}
              className={`px-4 py-2 ${
                selectedPage === index + 1
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-700"
              } rounded`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;