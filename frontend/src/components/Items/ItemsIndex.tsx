import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchItems, selectItems } from "@/features/items/itemsSlice";
import ItemDisplay from "./ItemDisplay";

export default function ItemsIndex() {
  const dispatch = useAppDispatch();
  const allItems = useAppSelector(selectItems);
  const term = useAppSelector((state) => state.nav.term);
  const category = useAppSelector((state) => state.nav.category);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      category === "All Departments" || item.category === category;
    const matchesTerm = item.name
      .toLowerCase()
      .startsWith(term.toLowerCase());
    return matchesCategory && matchesTerm;
  });

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
      {filteredItems.map((item) => (
        <ItemDisplay key={item.id} item={item} />
      ))}
    </div>
  );
}
