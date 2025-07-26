import { useCurrency } from "@/hooks/useCurrency";
import { CartDrawerProps } from "@/interfaces";
import React from "react";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";

export const CartDrawer: React.FC<CartDrawerProps> = ({
  cart,
  removeFromCart,
  drawerOpen,
  setDrawerOpen,
}) => {
  const { formatPrice, getNumericPrice } = useCurrency();
  const subtotal = cart.reduce(
    (sum, d) => sum + getNumericPrice(d.price || "0"),
    0
  );

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
      <DrawerContent className="max-w-sm w-full ml-auto rounded-l-2xl shadow-2xl bg-white/95 border-l-4 border-orange-200 h-screen flex flex-col">
        <DrawerHeader className="pb-2 border-b border-orange-100">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-2xl font-bold text-gray-900">
              {cart.length} item added to cart
            </DrawerTitle>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none cursor-pointer"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close cart"
            >
              &times;
            </button>
          </div>
        </DrawerHeader>
        <div className="flex-1 flex flex-col gap-3 p-4 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No domains in cart.
            </p>
          ) : (
            cart.map((d) => (
              <div key={d.name} className="flex items-center w-full border p-4">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between text-gray-900">
                      <p>{d.name}</p>
                      <span className="font-semibold text-gray-900">
                        {formatPrice(d.price || "0")}
                      </span>
                    </div>
                    <div className="flex flex-row justify-between text-sm text-gray-500">
                      <p>Domain Name Registration</p>
                      <button
                        className="text-orange-400 hover:text-orange-500 cursor-pointer"
                        onClick={() => removeFromCart(d.name)}
                      >
                        remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
