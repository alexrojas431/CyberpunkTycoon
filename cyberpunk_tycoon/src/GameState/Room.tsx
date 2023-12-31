import { atom } from 'jotai';
import { Room } from './../interface/Room';

export const roomsListAtom = atom<Room[]>([]);

export const idCounterAtom = atom<number>(0);

export const roomSelectors = {
  // Maintance cost for room. TODO Revisit and gradually increase with each room added
  getRoomMaintance: (id: number) => (state: Room) => state.baseMaintanceModifier,
  // How long a task will take to complete. If two employees in room, reduce task time by 25%
  getTaskCompletionTime: (id: number) => (state: Room) =>
    state.baseTimeTaskCompletion - (state.baseTimeTaskCompletion * 0.25 * (state.numOfEmployees - 1)),
  // Room Income will come in once the task is completed on customer. 
  // Income will increase based on upgrade level of room
  getRoomIncome: (id: number) => (state: Room, baseIncome: number) => baseIncome * (state.baseIncome * state.upgradeLevel),
};