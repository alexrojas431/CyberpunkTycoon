import { atom } from "jotai";
import { BuildingInterface } from "../interface/BuildingInterface";

export const buildingListAtom = atom<BuildingInterface[]>([]);
export const buildingIDCounterAtom = atom<number>(0);