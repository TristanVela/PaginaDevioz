import { atom } from "jotai";
import { DataPageI } from "../interfaces/data";

export const dataPageAtom = atom<DataPageI>({} as DataPageI);
