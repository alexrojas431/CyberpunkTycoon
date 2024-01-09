import { atom } from "jotai";
import { BuildingInterface } from "../Interface/BuildingInterface";

export const buildingListAtom = atom<BuildingInterface[]>([]);
export const buildingIDCounterAtom = atom<number>(0);