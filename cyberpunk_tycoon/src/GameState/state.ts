import { atom, createStore } from "jotai"

export const store = createStore()

export const $state = atom<{
  ready: boolean
 // game: GameState
}>({
  ready: false,
  /*
  game: {
    stage: "gettingReady",
    collisionGrid: {},
    players: [],
    snakes: {},
    countdownTimer: 0,
    timerStartedAt: 0,
    lastRoundWinnerId: undefined,
  },*/
})

export const $ready = atom((get) => get($state).ready)

export const $stage = atom((get) => get($game).stage)
