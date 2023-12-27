import { PlayerId, RuneClient } from "rune-games-sdk"

export type GameStage = "startScreen" | "countdown" | "playing" | "endOfRound"

export interface GameState {
  stage: GameStage
  player: PlayerInfo[]
}

export type Section = {
  start: Point
  end: Point
  endAngle: number
  gap: boolean
} & (
  | {
      turning: "none"
    }
  | {
      turning: "left" | "right"
      arc: {
        center: Point
        startAngle: number
        endAngle: number
      }
    }
)

export type PlayerInfo = {
  playerId: string
  color: string
  state: State
  score: number
  diedAt?: number
}

export type Snake = {
  gapCounter: number
  turning: "left" | "right" | "none"
  sections: [Section, ...Section[]]
  lastCollisionGridPoints: Point[]
}