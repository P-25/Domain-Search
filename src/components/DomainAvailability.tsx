import { DomainAvailabilityProps } from "@/interfaces";
import React from "react";
import { Button } from "./ui/button";

const DomainAvailability: React.FC<DomainAvailabilityProps> = ({
  searchedDomain,
  isAvailable,
  toggleCart,
  cart,
  suggestion,
  removeFromCart,
}) => {
  if (!searchedDomain || isAvailable === null) return null;
  const isAlreadyInCart = cart.find((d) => d.name === suggestion?.name);
  if (isAvailable) {
    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="text-left">
            <div className="font-bold text-lg text-gray-900">
              {searchedDomain}{" "}
              <span className="font-normal text-green-600">is available!</span>
            </div>
            <div className="text-gray-600 text-xs md:text-md">
              Great news!{" "}
              <span className="font-normal text-green-600">
                {searchedDomain}
              </span>{" "}
              is available for registration.
            </div>
          </div>
        </div>
        {suggestion && (
          <div className="w-full sm:w-auto">
            {isAlreadyInCart ? (
              <Button
                size="sm"
                variant="secondary"
                className="w-full sm:w-[150px] bg-orange-500 border-orange-500 text-white hover:bg-orange-400 hover:text-white px-6 font-semibold uppercase tracking-wide"
                onClick={() => removeFromCart(suggestion.name)}
              >
                Remove
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="w-full sm:w-[150px] bg-orange-50 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 font-semibold uppercase tracking-wide "
                onClick={() => {
                  toggleCart(suggestion);
                }}
              >
                ADD TO CART
              </Button>
            )}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="text-left">
          <div className="font-bold text-lg text-gray-900">
            <span className="text-red-700">{searchedDomain}</span>{" "}
            <span className="font-normal">is not available</span>
          </div>
          <div className="text-gray-600 text-sm">
            {searchedDomain} is unavailable because it is registered already.
          </div>
        </div>
      </div>
    );
  }
};

export default DomainAvailability;
