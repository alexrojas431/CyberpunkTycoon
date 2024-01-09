export interface GameStateInterface{
  ready: boolean
  player: PlayerStateInterface
}

interface PlayerStateInterface{
  stage: GameStage
  playerInfo: PlayerInfo
}

type GameStage = "startScreen" | "mainGameplay"

type PlayerInfo = {
  money: number
}