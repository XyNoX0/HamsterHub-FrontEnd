import { HINTS_PER_BOARD } from "./config";

export type CellVisibility = "hidden" | "revealed" | "flagged";

export type GameStatus = "playing" | "won" | "lost";

export type ArenaCell = {
  isMine: boolean;
  adjacent: number;
  gameId: number | null;
};

export type ArenaGameState = {
  cells: ArenaCell[];
  visibility: CellVisibility[];
  status: GameStatus;
  firstRevealDone: boolean;
  mineCount: number;
  cols: number;
  gameCount: number;
  hintsRemaining: number;
};

function neighbors(index: number, cols: number, rows: number): number[] {
  const r = Math.floor(index / cols);
  const c = index % cols;
  const out: number[] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      out.push(nr * cols + nc);
    }
  }
  return out;
}

function countAdjacentMines(cells: ArenaCell[], index: number, cols: number, rows: number): number {
  let n = 0;
  for (const j of neighbors(index, cols, rows)) {
    if (cells[j].isMine) n++;
  }
  return n;
}

function assignGameIdsToMines(cells: ArenaCell[], gameCount: number): void {
  const mineIndices: number[] = [];
  for (let i = 0; i < cells.length; i++) {
    cells[i].gameId = null;
    if (cells[i].isMine) mineIndices.push(i);
  }
  if (gameCount <= 0 || mineIndices.length === 0) return;
  const ids = Array.from({ length: gameCount }, (_, i) => i);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  for (let k = 0; k < mineIndices.length; k++) {
    cells[mineIndices[k]].gameId = ids[k % ids.length];
  }
}

export function buildCellsFromMines(
  mineIndices: Set<number>,
  size: number,
  cols: number,
  rows: number,
  gameCount: number,
): ArenaCell[] {
  const cells: ArenaCell[] = Array.from({ length: size }, (_, i) => ({
    isMine: mineIndices.has(i),
    adjacent: 0,
    gameId: null,
  }));
  for (let i = 0; i < size; i++) {
    if (!cells[i].isMine) cells[i].adjacent = countAdjacentMines(cells, i, cols, rows);
  }
  assignGameIdsToMines(cells, gameCount);
  return cells;
}

export function createMineSet(excludeIndex: number | null, mineCount: number, size: number): Set<number> {
  const exclude = new Set<number>();
  if (excludeIndex !== null) exclude.add(excludeIndex);
  const mines = new Set<number>();
  const cappedMineCount = Math.max(1, Math.min(mineCount, size - exclude.size));
  let guard = 0;
  while (mines.size < cappedMineCount && guard++ < 500) {
    const i = Math.floor(Math.random() * size);
    if (exclude.has(i) || mines.has(i)) continue;
    mines.add(i);
  }
  return mines;
}

export function createInitialState(
  mineCount: number,
  size: number,
  cols: number,
  gameCount: number,
): ArenaGameState {
  const rows = size / cols;
  const mines = createMineSet(null, mineCount, size);
  return {
    cells: buildCellsFromMines(mines, size, cols, rows, gameCount),
    visibility: Array(size).fill("hidden") as CellVisibility[],
    status: "playing",
    firstRevealDone: false,
    mineCount,
    cols,
    gameCount,
    hintsRemaining: HINTS_PER_BOARD,
  };
}

export function cloneGameState(s: ArenaGameState): ArenaGameState {
  return {
    cells: s.cells.map((c) => ({ ...c })),
    visibility: [...s.visibility],
    status: s.status,
    firstRevealDone: s.firstRevealDone,
    mineCount: s.mineCount,
    cols: s.cols,
    gameCount: s.gameCount,
    hintsRemaining: s.hintsRemaining,
  };
}

function checkWin(cells: ArenaCell[], visibility: CellVisibility[]): boolean {
  const size = cells.length;
  for (let i = 0; i < size; i++) {
    if (cells[i].isMine) continue;
    if (visibility[i] !== "revealed") return false;
  }
  return true;
}

function floodReveal(
  cells: ArenaCell[],
  visibility: CellVisibility[],
  start: number,
  cols: number
): CellVisibility[] {
  const size = cells.length;
  const rows = size / cols;
  const vis = [...visibility];
  const stack = [start];
  while (stack.length) {
    const i = stack.pop()!;
    if (vis[i] === "flagged") continue;
    if (cells[i].isMine) continue;
    if (vis[i] === "revealed") continue;
    vis[i] = "revealed";
    if (cells[i].adjacent === 0) {
      for (const j of neighbors(i, cols, rows)) {
        stack.push(j);
      }
    }
  }
  return vis;
}

export function revealCell(
  state: ArenaGameState,
  index: number,
): ArenaGameState {
  if (state.status !== "playing") return state;
  if (state.visibility[index] === "flagged") return state;
  if (state.visibility[index] === "revealed") return state;

  const size = state.cells.length;
  const cols = state.cols;
  const rows = size / cols;

  let cells = state.cells.map((c) => ({ ...c }));
  let firstRevealDone = state.firstRevealDone;

  if (!firstRevealDone) {
    if (cells[index].isMine) {
      const mines = createMineSet(index, state.mineCount, size);
      cells = buildCellsFromMines(mines, size, cols, rows, state.gameCount);
    }
    firstRevealDone = true;
  }

  if (cells[index].isMine) {
    const visibility = state.visibility.map((v, i) =>
      cells[i].isMine ? ("revealed" as CellVisibility) : v,
    );
    visibility[index] = "revealed";
    return {
      ...state,
      cells,
      visibility,
      status: "lost",
      firstRevealDone: true,
    };
  }

  let visibility = floodReveal(cells, state.visibility, index, cols);
  let status: GameStatus = "playing";
  if (checkWin(cells, visibility)) {
    status = "won";
    visibility = visibility.map((v, i) =>
      cells[i].isMine ? ("revealed" as CellVisibility) : v,
    );
  }
  return {
    ...state,
    cells,
    visibility,
    status,
    firstRevealDone,
  };
}

export function countFlags(state: ArenaGameState): number {
  return state.visibility.filter((v) => v === "flagged").length;
}

export function toggleFlag(state: ArenaGameState, index: number): ArenaGameState {
  if (state.status !== "playing") return state;
  if (state.visibility[index] === "revealed") return state;
  const visibility = [...state.visibility];
  if (visibility[index] === "hidden") {
    if (countFlags(state) >= state.mineCount) return state;
    visibility[index] = "flagged";
  } else if (visibility[index] === "flagged") {
    visibility[index] = "hidden";
  }
  return { ...state, visibility };
}

function pickHintIndex(state: ArenaGameState): number {
  const size = state.cells.length;
  const candidates: number[] = [];
  for (let i = 0; i < size; i++) {
    if (state.visibility[i] !== "hidden") continue;
    if (state.cells[i].isMine) continue;
    candidates.push(i);
  }
  if (candidates.length === 0) return -1;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function hintReveal(state: ArenaGameState): ArenaGameState {
  if (state.status !== "playing") return state;
  if (state.hintsRemaining <= 0) return state;
  const idx = pickHintIndex(state);
  if (idx < 0) return state;
  const next = revealCell(cloneGameState(state), idx);
  return { ...next, hintsRemaining: state.hintsRemaining - 1 };
}

export function numberColorClass(n: number): string {
  const map: Record<number, string> = {
    1: "arena-textBlue",
    2: "arena-textGreen",
    3: "arena-textRed",
    4: "arena-textIndigo",
    5: "arena-textAmber",
    6: "arena-textTeal",
    7: "arena-textHeadline",
    8: "arena-textMuted",
  };
  return map[n] ?? "arena-textCharcoal";
}
