import { atom } from "jotai"
import { GameState } from "./GameState"

export const $state = atom<{
  ready: boolean
  game: GameState
}>({
  ready: false,
  game: {
    stage: "startScreen",
    player: [],
  },
})

export const $ready = atom((get) => get($state).ready)

export const $game = atom((get) => get($state).game)

export const $stage = atom((get) => get($game).stage)

export const $player = atom((get) => get($game).player)