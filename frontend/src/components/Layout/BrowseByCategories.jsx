import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions/categories";

const BrowseByCategories = () => {
  const { allProperties } = useSelector((state) => state.property);
  const { allCategories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="bg-gray-200  pb-[5rem] ">
      <div className="flex justify-center flex-wrap items-center  pt-20">
        <p className="md:text-[2rem] text-[1rem] sm:tracking-wider font-Roboto font-extrabold text-gray-950">
          Listed Properties By Category
        </p>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 border-0 gap-8 border-gray-600  ml-[2rem] mr-[2rem] md:ml-[6rem] md:mr-[6rem] mt-7">
        {allCategories &&
          allCategories.map((i, index) => {
            const filterProperties =
              allProperties &&
              allProperties.filter((item) => item.category === i.categoryName);
            return (
              <div className="border-0 border-solid  rounded-xl  ">
                <div className="relative">
                  <img
                    src={i.image}
                    alt=""
                    className=" md:h-[19.6rem] h-[15rem]  w-full rounded-xl "
                  />
                </div>
                <div className="pl-2">
                  <p className="flex justify-center font-Roboto font-semibold text-lg">
                    {i.categoryName}
                  </p>
                  <p className="flex justify-center ite font-Roboto font-medium text-sm">
                    {filterProperties && filterProperties.length}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BrowseByCategories;
