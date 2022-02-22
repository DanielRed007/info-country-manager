import { createContext } from "react";

export interface IInfoContentManagerContext {
    mode: string;
    toggleColorMode?(mode) : void
}

export const infoManagerDefaultState = {
    mode: "light"
};

export const InfoContentManagerContext = createContext<IInfoContentManagerContext>(infoManagerDefaultState);