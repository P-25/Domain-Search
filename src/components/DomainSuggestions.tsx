import { DomainSuggestionsProps } from "@/interfaces";
import React from "react";
import DomainAvailability from "./DomainAvailability";
import { Button } from "./ui/button";
import { useCurrency } from "@/hooks/useCurrency";

export const DomainSuggestions: React.FC<DomainSuggestionsProps> = ({
  suggestions,
  cart,
  toggleCart,
  removeFromCart,
  searchedDomain,
  domainAvailability,
  isLoading,
}) => {
  const { formatPrice } = useCurrency();
  if (isLoading) return <div>Loading...</div>;
  if (suggestions.length === 0) return null;

  const mainDomain = suggestions.find(
    (suggestion) => suggestion.name === searchedDomain
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <DomainAvailability
        searchedDomain={searchedDomain}
        isAvailable={domainAvailability}
        toggleCart={toggleCart}
        cart={cart}
        suggestion={mainDomain}
        removeFromCart={removeFromCart}
      />
      <div className="bg-white border border-gray-200 rounded-xl shadow p-0 mb-8">
        <div className="px-4 sm:px-6 pt-6 pb-2 font-semibold text-gray-800 text-lg">
          Suggested domain names
        </div>
        <div className="px-4 sm:px-6 pb-4 text-gray-500 text-sm">
          The following is a list of suggestions that may be available.
        </div>
        <div className="divide-y divide-gray-100">
          {suggestions.map((suggestion) => {
            const isSearchedDomain = suggestion.name === searchedDomain;
            const isAlreadyInCart = cart.find(
              (d) => d.name === suggestion.name
            );
            if (isSearchedDomain) return;
            return (
              <div
                key={suggestion.name}
                className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 px-4 sm:px-6 hover:bg-orange-50 transition gap-2 sm:gap-0 `}
              >
                <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base text-gray-900">
                      {suggestion.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Renews at {formatPrice(suggestion.renewal || "0")}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between sm:justify-start sm:gap-4">
                  <span className="font-semibold text-base text-gray-900">
                    {formatPrice(suggestion.price || "0")}
                  </span>
                  {isAlreadyInCart ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-orange-500 border-orange-500 text-white hover:bg-orange-400 hover:text-white px-6 font-semibold uppercase tracking-wide w-[150px]"
                      onClick={() => removeFromCart(suggestion.name)}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-orange-50 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 font-semibold uppercase tracking-wide"
                      onClick={() => {
                        toggleCart(suggestion);
                      }}
                    >
                      ADD TO CART
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
