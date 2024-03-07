import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchCategoryApi } from "@/lib/redux/slices/category/categoryApi";
import { useFormikContext } from "formik";
import { useEffect } from "react";
const CategorySelector = () => {
  const { category } = useAppSelector((state) => state.category);
  const formik = useFormikContext();
  const handleValue = (_id: string) => {
    formik.setFieldValue("category", _id);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategoryApi());
  }, [dispatch]);
  return (
    <Select required onValueChange={handleValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        {category &&
          category.map((item) => (
            <SelectItem
              onChange={() => handleValue(item._id)}
              key={item._id}
              value={item._id}
            >
              {item.category}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
