import { create } from "zustand";

export interface PlayerMatchState {
  playerId: string;
  name: string;
  squadNumber: number;
  position: string;
  isOnPitch: boolean;
  minutesPlayed: number;
}

interface MatchStore {
  matchTimeSeconds: number;
  isClockRunning: boolean;
  players: PlayerMatchState[];
  startMatchClock: () => void;
  pauseMatchClock: () => void;
  substitutePlayer: (playerOffId: string, playerOnId: string) => void;
  tickSecond: () => void;
  loadSquad: (players: PlayerMatchState[]) => void;
  resetMatch: () => void;
}

export const useMatchStore = create<MatchStore>((set, get) => ({
  matchTimeSeconds: 0,
  isClockRunning: false,
  players: [],
  startMatchClock: () => set({ isClockRunning: true }),
  pauseMatchClock: () => set({ isClockRunning: false }),
  substitutePlayer: (playerOffId, playerOnId) => {
    if (!playerOffId || !playerOnId || playerOffId === playerOnId) return;
    const { players } = get();
    const off = players.find((player) => player.playerId === playerOffId);
    const on = players.find((player) => player.playerId === playerOnId);
    if (!off?.isOnPitch || !on || on.isOnPitch) return;
    set((state) => ({
      players: state.players.map((player) => {
        if (player.playerId === playerOffId) return { ...player, isOnPitch: false };
        if (player.playerId === playerOnId) return { ...player, isOnPitch: true };
        return player;
      }),
    }));
  },
  tickSecond: () =>
    set((state) => ({
      matchTimeSeconds: state.matchTimeSeconds + 1,
      players: state.players.map((player) =>
        player.isOnPitch ? { ...player, minutesPlayed: player.minutesPlayed + 1 / 60 } : player,
      ),
    })),
  loadSquad: (players) =>
    set({
      matchTimeSeconds: 0,
      isClockRunning: false,
      players,
    }),
  resetMatch: () =>
    set((state) => ({
      matchTimeSeconds: 0,
      isClockRunning: false,
      players: state.players.map((player) => ({ ...player, minutesPlayed: 0 })),
    })),
}));
