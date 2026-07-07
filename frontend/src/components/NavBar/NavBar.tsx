import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretDown,
  faBars,
  faFlagUsa,
  faLocationDot,
  faXmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/session/sessionSlice";
import { fetchCartItems, selectCartCount } from "@/features/cart/cartSlice";
import { fetchItems, selectItems } from "@/features/items/itemsSlice";
import { setCategory, setTerm } from "@/features/nav/navSlice";
import AmazeonHome from "@/assets/images/AmazeonHome.png";

const categoryOptions = [
  { value: "All Departments", label: "All" },
  { value: "Video Games", label: "Video Games" },
  { value: "Headset", label: "Headset" },
  { value: "Mouse", label: "Mouse" },
  { value: "Keyboard", label: "Keyboard" },
  { value: "Monitor", label: "Monitor" },
  { value: "Mousepad", label: "Mousepad" },
  { value: "Virtual Reality", label: "Virtual Reality" },
  { value: "Monitor Stand", label: "Monitor Stand" },
  { value: "Mic", label: "Mic" },
  { value: "Power Strip", label: "Power Strip" },
  { value: "PlayStation", label: "PlayStation" },
  { value: "Handheld", label: "Handheld" },
  { value: "Headphones", label: "Headphones" },
  { value: "Webcam", label: "Webcam" },
];

const navExtraLinks = [
  "Medical care",
  "Groceries",
  "Best Sellers",
  "Amazeon Basics",
  "Prime",
  "New Releases",
  "Today's Deals",
  "Customer Service",
  "Music",
  "Amazeon Home",
  "Registry",
  "Books",
  "Pharmacy",
  "Gift Cards",
  "Fashion",
  "Smart Home",
  "Toys & Games",
  "Sell",
  "Luxury Stores",
];

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 4h5.2l3.4 16.6h20.6l4-11.6" />
      <circle cx="16" cy="28.5" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="30" cy="28.5" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

const NavBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.session.user);
  const cartCount = useAppSelector(selectCartCount);
  const items = useAppSelector(selectItems);
  const selectedCategory = useAppSelector((state) => state.nav.category);
  const searchTerm = useAppSelector((state) => state.nav.term);
  const [isSearchBoxFocused, setIsSearchBoxFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectWidth, setSelectWidth] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);

  const username = user?.username ?? "User";
  const displayName = username === "User" ? "sign in" : username;
  const selectedLabel =
    categoryOptions.find((o) => o.value === selectedCategory)?.label ?? "All";

  useEffect(() => {
    dispatch(fetchCartItems()).catch(() => {});
    dispatch(fetchItems()).catch(() => {});
    dispatch(setCategory("All Departments"));
    dispatch(setTerm(""));
  }, [dispatch]);

  useLayoutEffect(() => {
    if (measureRef.current) setSelectWidth(measureRef.current.offsetWidth + 26);
  }, [selectedLabel]);

  const suggestions = searchTerm.trim()
    ? items
        .filter((i) =>
          i.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
        .filter(
          (i) =>
            selectedCategory === "All Departments" ||
            i.category === selectedCategory
        )
        .slice(0, 8)
    : [];

  const signout = async () => {
    await dispatch(logout());
    setDrawerOpen(false);
    navigate("/signin");
  };

  const goToSignin = () => {
    setDrawerOpen(false);
    navigate("/signin");
  };

  const goToSignup = () => navigate("/signup");

  const redirectCart = () => navigate("/cart");

  const redirectToHomePage = () => {
    dispatch(setCategory("All Departments"));
    dispatch(setTerm(""));
    navigate("/");
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(e.target.value));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTerm(e.target.value));
  };

  const searchForItems = (term: string, category: string) => {
    dispatch(setTerm(term));
    dispatch(setCategory(category));
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchTerm === "" && selectedCategory === "All Departments")
        navigate("/");
      else searchForItems(searchTerm, selectedCategory);
      setIsSearchBoxFocused(false);
    }
  };

  const goToSuggestion = (id: number) => {
    setIsSearchBoxFocused(false);
    window.scrollTo(0, 0);
    navigate(`/items/${id}`);
  };

  const handleDrawerCategory = (value: string) => {
    dispatch(setCategory(value));
    setDrawerOpen(false);
    navigate("/");
  };

  const searchGroup = (collapsibleSelect: boolean) => (
    <div
      className={`relative flex h-10 w-full items-center rounded bg-white ${
        isSearchBoxFocused
          ? "shadow-[0_0_0_0.125rem_#f90,0_0_0_0.1875rem_rgba(255,153,0,0.5)]"
          : ""
      }`}
    >
      <div
        className={`relative h-full shrink-0 items-center rounded-l bg-[#e6e6e6] ${collapsibleSelect ? "hidden sm:flex" : "flex"}`}
      >
        <select
          className="h-10 appearance-none rounded-l border border-[#cdcdcd] bg-[#e6e6e6] pr-4 pl-2 text-xs text-amz-ink outline-none focus:z-10"
          style={{ width: selectWidth || undefined }}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <FontAwesomeIcon
          className="pointer-events-none absolute right-1 h-3 scale-75 text-[#555]"
          icon={faCaretDown}
        />
      </div>

      <input
        type="text"
        className="h-10 min-w-0 flex-1 rounded-l border-l border-l-[#cdcdcd] pl-2 text-sm text-amz-ink outline-none"
        placeholder="Search Amazeon"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setIsSearchBoxFocused(true)}
        onBlur={() => setTimeout(() => setIsSearchBoxFocused(false), 120)}
        onKeyDown={handleSearchKeyDown}
      />
      <button
        className="flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-r border-none bg-amz-yellow px-3 text-[#111] hover:bg-amz-yellow-hover"
        onClick={() => searchForItems(searchTerm, selectedCategory)}
        aria-label="Search"
      >
        <span className="text-xl">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </button>

      {isSearchBoxFocused && suggestions.length > 0 && (
        <ul className="absolute top-full right-0 left-0 z-1101 mt-0.5 overflow-hidden rounded-sm bg-white text-amz-ink shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
          {suggestions.map((item) => (
            <li key={item.id}>
              <button
                className="flex w-full items-center gap-3 border-none bg-transparent px-3 py-2 text-left hover:bg-[#f7f7f7]"
                onMouseDown={() => goToSuggestion(item.id)}
              >
                <FontAwesomeIcon className="text-[#999]" icon={faSearch} />
                <span className="truncate text-sm">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <span
        ref={measureRef}
        className="invisible fixed -left-[9999px] text-xs whitespace-nowrap"
        aria-hidden="true"
      >
        {selectedLabel}
      </span>

      <header className="hidden w-full flex-col lg:flex">
        <div className="flex w-full items-center gap-1 bg-amz-navy px-2 py-2 text-sm text-white">
          <div
            className="group relative box-border flex shrink-0 cursor-pointer items-center justify-center rounded-sm px-1 py-1"
            onClick={redirectToHomePage}
          >
            <img
              className="h-11 w-auto object-contain"
              src={AmazeonHome}
              alt="amazeonhomelogo"
            />
            <span className="pointer-events-none absolute -inset-px hidden rounded-sm border border-white group-hover:block" />
          </div>

          <div className="group relative box-border hidden shrink-0 cursor-pointer items-center gap-1 rounded-sm px-2 py-1 lg:flex">
            <FontAwesomeIcon
              className="mb-1 text-lg text-white"
              icon={faLocationDot}
            />
            <div className="leading-tight">
              <div className="text-xs text-[#ccc]">
                Deliver to {displayName}
              </div>
              <div className="text-sm font-bold text-white">
                Narnia... 98765
              </div>
            </div>
            <span className="pointer-events-none absolute -inset-px hidden rounded-sm border border-white group-hover:block" />
          </div>

          <div className="flex min-w-0 flex-1 items-center">
            {searchGroup(false)}
          </div>

          <div className="group relative hidden shrink-0 cursor-pointer items-center gap-1 rounded-sm px-2 py-1 xl:flex">
            <FontAwesomeIcon className="text-white" icon={faFlagUsa} />
            <span className="text-sm font-bold text-white">US EN</span>
            <FontAwesomeIcon
              className="scale-75 text-[#d6d6d6]"
              icon={faCaretDown}
            />
            <span className="pointer-events-none absolute -inset-px hidden rounded-sm border border-white group-hover:block" />
          </div>

          <div
            className="group relative shrink-0 cursor-pointer rounded-sm px-2 py-1"
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
          >
            <div className="text-xs leading-tight">
              {username === "User" ? "Hello, sign in" : `Hello, ${username}`}
            </div>
            <button
              className="flex cursor-pointer items-center border-none bg-transparent p-0 text-sm font-bold text-white"
              onClick={user ? undefined : goToSignin}
            >
              Account &amp; Lists
              <FontAwesomeIcon
                className="ml-1 scale-75 text-[#d6d6d6]"
                icon={faCaretDown}
              />
            </button>
            <span className="pointer-events-none absolute -inset-px hidden rounded-sm border border-white group-hover:block" />

            {showModal && (
              <div className="absolute top-full right-0 z-1100 flex w-max max-w-[90vw] flex-col items-center rounded-[0.3125rem] bg-white p-4 pt-6 text-amz-ink shadow-[0_2rem_10rem_rgba(0,0,0,0.3)]">
                {user ? (
                  <div className="w-full">
                    <div className="flex flex-row gap-6 p-2.5">
                      <div className="text-base font-bold">Your Lists</div>
                      <div className="w-px self-stretch bg-[#e0e0e0]" />
                      <div className="text-base font-bold">
                        Your Account
                        <div
                          className="cursor-pointer pt-1 text-sm font-normal text-[#444] hover:text-amz-orange hover:underline"
                          onClick={signout}
                        >
                          Logout
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex w-full flex-col items-center justify-center gap-2">
                      <button
                        className="w-full cursor-pointer rounded-lg border-none bg-amz-cart px-6 py-1 hover:bg-amz-cart-hover"
                        onClick={goToSignin}
                      >
                        Sign In
                      </button>
                      <div className="flex flex-row items-center justify-center gap-1 text-xs text-black">
                        <div>New customer?</div>
                        <div
                          className="cursor-pointer text-amz-link hover:text-amz-orange hover:underline"
                          onClick={goToSignup}
                        >
                          Start here.
                        </div>
                      </div>
                    </div>
                    <div className="my-2.5 h-px w-full bg-[#e0e0e0]" />
                    <div className="flex flex-row justify-evenly gap-6">
                      <div className="text-base font-bold">Your Lists</div>
                      <div className="w-px self-stretch bg-[#e0e0e0]" />
                      <div className="text-base font-bold">Your Account</div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            className="group relative hidden shrink-0 cursor-pointer flex-col justify-center rounded-sm border-none bg-transparent px-2 py-1 text-left text-white lg:flex"
            onClick={() => navigate("/orders")}
          >
            <div className="text-xs leading-tight">Returns</div>
            <div className="text-sm font-bold">&amp; Orders</div>
            <span className="pointer-events-none absolute -inset-px hidden rounded-sm border border-white group-hover:block" />
          </button>

          <button
            className="group relative flex shrink-0 cursor-pointer items-end gap-1 rounded-sm border-none bg-amz-navy px-2 py-1"
            onClick={redirectCart}
          >
            <div className="relative">
              <CartIcon className="h-8 w-11 text-white" />
              <span className="absolute top-0 left-[45%] -translate-x-1/2 text-[0.9375rem] leading-none font-bold text-amz-orange">
                {cartCount}
              </span>
            </div>
            <span className="text-sm font-bold text-white">Cart</span>
            <span className="pointer-events-none absolute -inset-px hidden rounded-sm border border-white group-hover:block" />
          </button>
        </div>

        <div className="hidden w-full flex-nowrap items-center gap-1 overflow-x-auto bg-amz-slate px-3 py-1 text-sm whitespace-nowrap text-white [-ms-overflow-style:none] [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden">
          <button
            className="flex shrink-0 cursor-pointer items-center gap-1 border-none bg-transparent px-2 py-1 font-bold text-white hover:bg-amz-slate-hover"
            onClick={() => setDrawerOpen(true)}
          >
            <FontAwesomeIcon className="text-base" icon={faBars} /> All
          </button>
          {navExtraLinks.map((link) => (
            <div
              key={link}
              className="flex shrink-0 cursor-pointer items-center px-3 py-1 hover:bg-amz-slate-hover"
            >
              {link}
            </div>
          ))}
        </div>
      </header>

      <header className="flex w-full flex-col bg-amz-navy text-white lg:hidden">
        <div className="flex w-full items-center gap-2 px-3 py-2">
          <button
            className="flex shrink-0 cursor-pointer items-center justify-center rounded-sm border border-transparent bg-transparent p-2 text-white hover:border-white"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <FontAwesomeIcon className="text-xl" icon={faBars} />
          </button>

          <div
            className="flex shrink-0 cursor-pointer items-center"
            onClick={redirectToHomePage}
          >
            <img
              className="h-9 w-auto object-contain"
              src={AmazeonHome}
              alt="amazeonhomelogo"
            />
          </div>

          <div className="flex-1" />

          <button
            className="flex shrink-0 cursor-pointer flex-col items-center gap-0.5 border-none bg-transparent px-1 text-white"
            onClick={user ? undefined : goToSignin}
            aria-label="Account"
          >
            <FontAwesomeIcon className="text-xl" icon={faUser} />
          </button>

          <button
            className="relative flex shrink-0 cursor-pointer items-center border-none bg-transparent px-1 text-white"
            onClick={redirectCart}
            aria-label="Cart"
          >
            <div className="relative">
              <CartIcon className="h-7 w-10 text-white" />
              <span className="absolute top-0 left-[45%] -translate-x-1/2 text-xs leading-none font-bold text-amz-orange">
                {cartCount}
              </span>
            </div>
          </button>
        </div>

        <div className="flex w-full items-center px-3 pb-2">
          {searchGroup(true)}
        </div>

        <div className="flex w-full items-center gap-1 bg-amz-slate px-3 py-1 text-xs text-white">
          <FontAwesomeIcon className="text-sm" icon={faLocationDot} />
          <span className="font-bold">
            Deliver to {displayName} - Narnia... 98765
          </span>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-1200 ${drawerOpen ? "" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setDrawerOpen(false)}
        />
        <div
          className={`fixed top-0 left-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white text-amz-ink shadow-2xl transition-transform ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center gap-3 bg-amz-slate px-4 py-4 text-white">
            <FontAwesomeIcon className="text-2xl" icon={faUser} />
            <span className="text-lg font-bold">
              {username === "User" ? "Hello, sign in" : `Hello, ${username}`}
            </span>
            <button
              className="ml-auto cursor-pointer border-none bg-transparent text-2xl text-white"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="border-b border-amz-border py-3">
            <div className="px-4 pb-2 text-lg font-bold">
              Shop by Department
            </div>
            <ul>
              {categoryOptions.map((opt) => (
                <li key={opt.value}>
                  <button
                    className="w-full cursor-pointer border-none bg-transparent px-4 py-2 text-left text-sm hover:bg-amz-bg"
                    onClick={() => handleDrawerCategory(opt.value)}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-amz-border py-3">
            <div className="px-4 pb-2 text-lg font-bold">
              Help &amp; Settings
            </div>
            <button
              className="w-full cursor-pointer border-none bg-transparent px-4 py-2 text-left text-sm hover:bg-amz-bg"
              onClick={() => {
                setDrawerOpen(false);
                navigate("/orders");
              }}
            >
              Returns &amp; Orders
            </button>
            {user ? (
              <button
                className="w-full cursor-pointer border-none bg-transparent px-4 py-2 text-left text-sm hover:bg-amz-bg"
                onClick={signout}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="w-full cursor-pointer border-none bg-transparent px-4 py-2 text-left text-sm hover:bg-amz-bg"
                onClick={goToSignin}
              >
                Sign In
              </button>
            )}
          </div>

          <div className="py-3">
            <div className="px-4 pb-2 text-lg font-bold">
              Trending &amp; More
            </div>
            <ul>
              {navExtraLinks.map((link) => (
                <li key={link}>
                  <button
                    className="w-full cursor-pointer border-none bg-transparent px-4 py-2 text-left text-sm hover:bg-amz-bg"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
