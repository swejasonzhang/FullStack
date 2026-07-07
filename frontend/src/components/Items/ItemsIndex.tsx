import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchItems, selectItems } from "@/features/items/itemsSlice";
import Spinner from "@/components/Spinner";
import ItemDisplay from "./ItemDisplay";

type Status = "loading" | "ready" | "error";

export default function ItemsIndex() {
  const dispatch = useAppDispatch();
  const allItems = useAppSelector(selectItems);
  const term = useAppSelector((state) => state.nav.term);
  const category = useAppSelector((state) => state.nav.category);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    dispatch(fetchItems())
      .then(() => active && setStatus("ready"))
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [dispatch]);

  if (status === "loading") return <Spinner label="Loading products" />;

  if (status === "error") {
    return (
      <div className="py-10 text-center text-sm text-amz-price">
        We couldn&apos;t load products right now. Please try again later.
      </div>
    );
  }

  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      category === "All Departments" || item.category === category;
    const matchesTerm = item.name.toLowerCase().startsWith(term.toLowerCase());
    return matchesCategory && matchesTerm;
  });

  if (filteredItems.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-amz-muted">
        No products match your search.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
      {filteredItems.map((item) => (
        <ItemDisplay key={item.id} item={item} />
      ))}
    </div>
  );
}
