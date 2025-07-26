import { CartDrawer } from "@/components/CartDrawer";
import { DomainSuggestions } from "@/components/DomainSuggestions";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import { DomainSuggestion } from "@/interfaces";
import { useState, useEffect } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<DomainSuggestion[]>([]);
  const [cart, setCart] = useState<DomainSuggestion[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartData");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [domainAvailability, setDomainAvailability] = useState<boolean | null>(
    null
  );
  const [formattedSearchedDomain, setFormattedSearchedDomain] = useState<
    string | null
  >(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartData");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("cartData");
      }
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /^[a-zA-Z0-9-.]+$/.test(search) && search.length > 1;
    if (!isValid) {
      setError("Please enter a valid domain name!");
      setSuggestions([]);
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/search-domain?domain=${encodeURIComponent(search)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to search domains");
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
      setDomainAvailability(data.isAvailable);
      setFormattedSearchedDomain(data.searchedDomain);
    } catch (error) {
      console.error("Error searching domains:", error);
      setError(
        error instanceof Error ? error.message : "Failed to search domains"
      );
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCart = (domain: DomainSuggestion) => {
    setCart((prev) => {
      const newCart = prev.find((d) => d.name === domain.name)
        ? prev.filter((d) => d.name !== domain.name)
        : [...prev, domain];

      if (typeof window !== "undefined") {
        localStorage.setItem("cartData", JSON.stringify(newCart));
      }

      if (!prev.find((d) => d.name === domain.name)) {
        setDrawerOpen(true);
      }

      return newCart;
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => {
      const newCart = prev.filter((d) => d.name !== name);

      if (typeof window !== "undefined") {
        localStorage.setItem("cartData", JSON.stringify(newCart));
      }

      return newCart;
    });
  };

  const openCartDrawer = () => {
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header setDrawerOpen={setDrawerOpen} cart={cart} />
      <main className="flex-1 flex flex-col items-center justify-start p-4">
        <div className="w-full max-w-2xl mx-auto text-center mt-8 mb-8">
          <h2 className="text-4xl font-bold mb-2 text-gray-900">
            Search available domain names
          </h2>
          <SearchForm
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            error={error}
            isLoading={isLoading}
          />
          {/* {!isLoading && !formattedSearchedDomain && ( */}
          <div className="border-gray-200 pt-4">
            <div className="bg-orange-100 text-orange-500 text-sm sm:text-base font-semibold w-full px-4 py-2 text-center rounded">
              🎁 <span className="font-bold">Bundle & Save!</span> Get{" "}
              <span className="underline">20% off</span> when you buy{" "}
              <span className="font-bold">3+ domains</span>.
            </div>
          </div>
          {/* )} */}
        </div>
        <DomainSuggestions
          suggestions={suggestions}
          cart={cart}
          toggleCart={toggleCart}
          searchedDomain={formattedSearchedDomain}
          domainAvailability={domainAvailability}
          isLoading={isLoading}
          removeFromCart={removeFromCart}
        />
      </main>
      <CartDrawer
        cart={cart}
        removeFromCart={removeFromCart}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </div>
  );
}
