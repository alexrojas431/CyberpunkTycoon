import { atom } from "jotai"
import { GameStateInterface } from "../Interface/GameStateInterface"

export const gameStateAtom = atom<GameStateInterface>({
  ready: false,
  player:{
    stage: "mainGameplay",
    playerInfo:{ money: 0 }
  }
})