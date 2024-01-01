import { atom } from "jotai";
import { BuildingInterface } from "../interface/BuildingInterface";

export const buildingListAtom = atom<BuildingInterface[]>([]);
export const buildingShapeListAtom = atom<any[]>([]);
export const buildingIDCounterAtom = atom<number>(1);