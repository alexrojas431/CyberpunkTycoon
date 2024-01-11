import { atom } from 'jotai';
import { RoomInterface } from '../Interface/RoomInterface';

/**
 * RoomState.ts
 *
 * const roomSelectors: Collection of easy to get calculated variables
 *
 *  getRoomMaintance: Maintance cost for room. TODO Revisit and gradually increase with each room added
 *
 *  getTaskCompletionTime: How long a task will take to complete. If two employees in room, reduce task time by 25%
 *
 *  getRoomIncome: Room Income will come in once the task is completed on customer.
 *                  Income will increase based on upgrade level of room
 *
**/

export const roomsListAtom = atom<RoomInterface[]>([]);

export const roomIDCounterAtom = atom<number>(0);

export const roomSelectors = {
  getRoomMaintance: (id: number) => (state: RoomInterface) => state.baseMaintanceModifier,
  getTaskCompletionTime: (id: number) => (state: RoomInterface) =>
    state.baseTimeTaskCompletion - (state.baseTimeTaskCompletion * 0.25 * (state.numOfEmployees - 1)),
  getRoomIncome: (id: number) => (state: RoomInterface, baseIncome: number) => baseIncome * (state.baseIncome * state.upgradeLevel),
  
  getTotalEmployeesInRooms: (state: RoomInterface[]) => {
    let totalEmployeesInRooms = 0;
    state.forEach(room => {
      totalEmployeesInRooms += room.numOfEmployees;
    });
    return totalEmployeesInRooms;
  }
};