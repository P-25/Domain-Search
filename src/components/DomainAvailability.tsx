import { DomainAvailabilityProps } from "@/interfaces";
import React from "react";
import { Button } from "./ui/button";

const DomainAvailability: React.FC<DomainAvailabilityProps> = ({
  searchedDomain,
  isAvailable,
  toggleCart,
  cart,
  suggestion,
  openCartDrawer,
}) => {
  if (!searchedDomain || isAvailable === null) return null;
  const isAlreadyInCart = cart.find((d) => d.name === suggestion?.name);
  if (isAvailable) {
    return (
      <div className="flex items-center justify-between gap-3 bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">✓</span>
          </div>
          <div className="text-left">
            <div className="font-bold text-lg text-gray-900">
              {searchedDomain}{" "}
              <span className="font-normal text-green-600">is available!</span>
            </div>
            <div className="text-gray-600 text-sm">
              Great news! {searchedDomain} is available for registration.
            </div>
          </div>
        </div>
        {suggestion && (
          <div className="">
            {isAlreadyInCart ? (
              <Button
                size="sm"
                variant="secondary"
                className="bg-orange-500 border-orange-500 text-white hover:bg-orange-400 hover:text-white px-6 font-semibold uppercase tracking-wide"
                onClick={openCartDrawer}
              >
                Open Basket
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
        )}
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <span className="text-2xl text-orange-500">⚠</span>
        <div className="text-left">
          <div className="font-bold text-lg text-gray-900">
            {searchedDomain}{" "}
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
