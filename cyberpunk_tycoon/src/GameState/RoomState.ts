import { atom, useAtom } from 'jotai';
import { RoomInterface } from '../Interface/RoomInterface';

export const roomsListAtom = atom<RoomInterface[]>([]);

export const roomIDCounterAtom = atom<number>(0);

export const roomSelectors = {
  // Maintance cost for room. TODO Revisit and gradually increase with each room added
  getRoomMaintance: (id: number) => (state: RoomInterface) => state.baseMaintanceModifier,
  // How long a task will take to complete. If two employees in room, reduce task time by 25%
  getTaskCompletionTime: (id: number) => (state: RoomInterface) =>
    state.baseTimeTaskCompletion - (state.baseTimeTaskCompletion * 0.25 * (state.numOfEmployees - 1)),
  // Room Income will come in once the task is completed on customer. 
  // Income will increase based on upgrade level of room
  getRoomIncome: (id: number) => (state: RoomInterface, baseIncome: number) => baseIncome * (state.baseIncome * state.upgradeLevel),
  getTotalEmployeesInRooms: (state: RoomInterface[]) => {
    let totalEmployeesInRooms = 0;
    state.forEach(room => {
        totalEmployeesInRooms += room.numOfEmployees;
    });
    return totalEmployeesInRooms;
}
};