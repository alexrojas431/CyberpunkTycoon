import { atom, Getter, /*AtomReadonly*/ } from 'jotai';
import { Room } from './../interface/Room';

// Atom for the list of rooms
export const roomsListAtom = atom<Room[]>([]);

export const roomSelectors = {
  getRoomMaintance: (id: number) => (state: Room) => state.baseMaintanceModifier * state.cost,
  getTaskCompletionTime: (id: number) => (state: Room) =>
    state.baseTimeTaskCompletion - (state.baseTimeTaskCompletion * 0.25 * (state.numOfEmployees - 1)),
  getRoomIncome: (id: number) => (state: Room, baseIncome: number) => baseIncome * (state.baseIncome * state.upgradeLevel),
};