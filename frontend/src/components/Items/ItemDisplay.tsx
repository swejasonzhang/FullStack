import { useNavigate } from "react-router-dom";
import type { Item } from "@/types";

interface ItemDisplayProps {
  item: Item;
}

export default function ItemDisplay({ item }: ItemDisplayProps) {
  const navigate = useNavigate();

  const navigateToItemPage = () => {
    window.scrollTo(0, 0);
    navigate(`/items/${item.id}`);
  };

  return (
    <div
      onClick={navigateToItemPage}
      className="group flex h-full w-full cursor-pointer flex-col rounded bg-white p-3 transition hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden">
        {item.imageUrl && (
          <img
            className="h-full w-full object-contain"
            src={item.imageUrl}
            alt={item.name}
          />
        )}
      </div>
      <div className="mt-3 line-clamp-2 text-sm text-[#0f1111] group-hover:text-amz-link md:text-base">
        {item.name}
      </div>
      <div className="mt-auto pt-2 text-lg font-bold text-amz-price">
        ${item.cost}
      </div>
    </div>
  );
}
