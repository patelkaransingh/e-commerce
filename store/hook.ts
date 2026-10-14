import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector<RootState>(selector);
