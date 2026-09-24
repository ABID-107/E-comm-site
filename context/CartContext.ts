import { createContext } from "react";
import { CartContextValue } from "./CartContextValue";

export const CartContext = createContext<CartContextValue | null>(null);