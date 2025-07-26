import { useCurrency } from "@/hooks/useCurrency";
import { CartDrawerProps } from "@/interfaces";
import React from "react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";

export const CartDrawer: React.FC<CartDrawerProps> = ({
  cart,
  removeFromCart,
  drawerOpen,
  setDrawerOpen,
}) => {
  const { formatPrice, getNumericPrice } = useCurrency();
  const subtotal = cart.reduce(
    (sum, domain) => sum + getNumericPrice(domain.price || "0"),
    0
  );

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="right">
      <DrawerContent className="max-w-sm w-full ml-auto bg-white h-screen flex flex-col">
        <DrawerHeader className="pb-2 border-b border-orange-100">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-2xl font-bold text-gray-900">
              <DrawerDescription>
                {cart.length ? `${cart.length} item in cart` : "Cart"}
              </DrawerDescription>
            </DrawerTitle>
            <button
              className="text-gray-500 hover:text-gray-800 text-2xl font-bold focus:outline-none cursor-pointer"
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
            cart.map((domain) => (
              <div
                key={domain.name}
                className="flex items-center w-full border p-4"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between text-gray-900 relative">
                      <p className="font-semibold text-orange-500">
                        {domain.name}
                      </p>
                      <span className="font-semibold text-gray-900">
                        {formatPrice(domain.price || "0")}
                      </span>
                      <button
                        className="absolute top-[-17px] right-[-10px] text-gray-500 font-bold focus:outline-none sm:hidden"
                        onClick={() => removeFromCart(domain.name)}
                        aria-label="remove-from-cart"
                      >
                        &times;
                      </button>
                    </div>
                    <div className="flex flex-row justify-between text-sm text-gray-500">
                      <p>Domain Name Registration</p>
                      <button
                        className="text-orange-400 hover:text-orange-500 cursor-pointer hidden sm:block"
                        onClick={() => removeFromCart(domain.name)}
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

        {cart.length > 0 && (
          <div className="border-t pt-4 mt-4 flex flex-col gap-3 px-4 pb-6">
            <div>
              <div className="flex justify-between font-semibold text-lg text-black">
                <span>Subtotal:</span>
                {cart.length >= 3 ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="line-through text-gray-500 text-sm">
                      {formatPrice(subtotal)}
                    </span>
                    <span>{formatPrice(subtotal * 0.8)}</span>
                  </div>
                ) : (
                  <span>{formatPrice(subtotal * 0.8)}</span>
                )}
              </div>
              <div>
                {cart.length < 3 ? (
                  <p className="text-yellow-700 text-xs sm:text-md mt-1">
                    Add {3 - cart.length} more domain
                    {3 - cart.length !== 1 ? "s" : ""} to get 20% off
                  </p>
                ) : (
                  <span className="text-green-700 text-sm mt-1">
                    You&apos;re saving {formatPrice(subtotal * 0.2)} with 20%
                    off
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="w-full border-orange-300 text-white hover:bg-text-white hover:bg-orange-400 font-semibold rounded-lg bg-orange-500"
                onClick={() => setDrawerOpen(false)}
              >
                CONTINUE SHOPPING
              </Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
