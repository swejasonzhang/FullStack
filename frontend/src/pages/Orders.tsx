import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import NavBar from "@/components/NavBar/NavBar";

const tabs = ["Orders", "Buy Again", "Not Yet Shipped", "Cancelled Orders"];

export default function Orders() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.session.user);

  return (
    <>
      <NavBar />

      <div className="min-h-screen w-full bg-amz-bg">
        <div className="mx-auto w-full max-w-5xl px-3 py-6 sm:px-4">
          <h1 className="text-2xl font-medium text-amz-ink">Your Orders</h1>

          <div className="mt-4 flex flex-wrap gap-4 border-b border-amz-border text-sm">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={`cursor-pointer border-none bg-transparent pb-2 ${
                  i === 0
                    ? "border-b-2 border-amz-orange font-bold text-amz-ink"
                    : "text-amz-link hover:text-amz-link-hover"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-amz-border bg-white p-8 text-center">
            <h2 className="text-lg font-bold text-amz-ink">
              {user ? "Looks like you haven't placed an order" : "Sign in to view your orders"}
            </h2>
            <p className="mt-2 text-sm text-amz-muted">
              {user
                ? "When you place an order, it will show up here so you can track and reorder."
                : "Your order history is tied to your account."}
            </p>
            <button
              onClick={() => navigate(user ? "/" : "/signin")}
              className="mt-4 cursor-pointer rounded-full bg-amz-cart px-6 py-2 text-sm font-medium text-amz-ink hover:bg-amz-cart-hover"
            >
              {user ? "Start shopping" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
