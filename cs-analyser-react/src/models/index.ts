export const Team = {
  Unassigned: 0,
  Spectators: 1,
  Terrorists: 2,
  CounterTerrorists: 3,
} as const;

export type Team = (typeof Team)[keyof typeof Team];

export interface Player {
  userID: number;
  steamID: number;
  name: string;
}

export interface Round {
  round: number;
  tScore: number;
  ctScore: number;
  winner: Team;
  startTick: number;
  endTick: number;
}

export interface Game {
  map: string;
  tickRate: number;
  players: Player[];
  rounds: Round[];
  ticks: Tick[];
}

export type PlayerTick = [
  userID: number,
  team: Team,
  position: [x: number, y: number, z: number],
  viewDirectionX: number,
  hp: number,
  armor: number,
  money: number,
];

export type Tick = [tick: number, players: PlayerTick[]];

export const getPlayerPosition = (p: PlayerTick) => ({
  x: p[2][0],
  y: p[2][1],
  z: p[2][2],
});

export const getPlayerHP = (p: PlayerTick) => p[4];

export const getPlayerArmor = (p: PlayerTick) => p[5];

export const getPlayerMoney = (p: PlayerTick) => p[6];

export const getPlayerTeam = (p: PlayerTick) => p[1];

export const getPlayerViewAngle = (p: PlayerTick) => p[3];

export const getPlayerUserID = (p: PlayerTick) => p[0];

export const getTickNumber = (t: Tick) => t[0];

export const getTickPlayers = (t: Tick) => t[1];

export interface PlayerTickObj {
  userID: number;
  team: Team;
  position: { x: number; y: number; z: number };
  viewDirectionX: number;
  hp: number;
  armor: number;
  money: number;
}

export const normalizePlayerTick = (p: PlayerTick): PlayerTickObj => ({
  userID: p[0],
  team: p[1],
  position: {
    x: p[2][0],
    y: p[2][1],
    z: p[2][2],
  },
  viewDirectionX: p[3],
  hp: p[4],
  armor: p[5],
  money: p[6],
});

// Optional: normalize full tick
export const normalizeTick = (t: Tick) => ({
  tick: t[0],
  players: t[1].map(normalizePlayerTick),
});
