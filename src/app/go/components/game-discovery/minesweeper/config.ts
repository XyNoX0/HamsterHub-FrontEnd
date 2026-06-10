/** Fixed grid: 4×5 on every breakpoint — always 20 cells. */
export function getArenaCols(): number {
  return 4;
}

export function getArenaRows(): number {
  return 5;
}

export function getArenaSize(): number {
  return getArenaCols() * getArenaRows();
}

/** Difficulty curve settings. */
export const ARENA_BASE_MINE_COUNT = 4;

/** Hints granted per board. Resets on new board / next phase. */
export const HINTS_PER_BOARD = 1;

export function getMineCountForStage(stage: number): number {
  const size = getArenaSize();
  // Always leave a handful of safe cells so the board stays playable.
  const maxMines = Math.max(1, size - 4);
  const safeStage = Math.max(1, Math.floor(stage));
  const extra = Math.floor((safeStage - 1) * 1); // +1 mine per phase
  return Math.min(ARENA_BASE_MINE_COUNT + extra, maxMines);
}
