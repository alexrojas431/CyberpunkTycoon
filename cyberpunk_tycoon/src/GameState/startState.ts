import { atom } from "jotai"
import { GameStateInterface } from "../Interface/GameStateInterface"

export const gameStateAtom = atom<GameStateInterface>({
  ready: false,
  player:{
    stage: "startScreen",
    playerInfo:{ money: 0 }
  }
})