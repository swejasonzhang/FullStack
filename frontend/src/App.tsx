import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignUp from "@/pages/SignUp";
import ItemShow from "@/pages/ItemShow";
import Cart from "@/pages/Cart";
import Orders from "@/pages/Orders";
import Review from "@/pages/Review";
import EditReview from "@/pages/EditReview";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/items/:itemId" element={<ItemShow />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/items/:itemId/review" element={<Review />} />
      <Route path="/items/:itemId/editreview" element={<EditReview />} />
    </Routes>
  );
}
