import { createContext } from "react";
import { WishlistContextValue } from "./WishlistContextValue";

export const WishlistContext = createContext<WishlistContextValue | null>(null);