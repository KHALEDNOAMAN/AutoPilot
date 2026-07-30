import { GridMap, MapCell, Vec2 } from '../types';

const createGrid = (w: number, h: number, defaultCell: MapCell = MapCell.ROAD): MapCell[][] => {
  return Array.from({ length: h }, () => Array.from({ length: w }, () => defaultCell));
};

// Map 1: City Circuit
const map1Cells = createGrid(40, 30, MapCell.GRASS);
for(let y=5; y<25; y++) {
  for(let x=5; x<35; x++) {
    if(y===5 || y===24 || x===5 || x===34) map1Cells[y][x] = MapCell.ROAD;
    else map1Cells[y][x] = MapCell.WALL;
  }
}
map1Cells[5][5] = MapCell.START;
map1Cells[24][34] = MapCell.GOAL;

// Map 2: Highway
const map2Cells = createGrid(40, 30, MapCell.ROAD);
for(let y=0; y<30; y++) {
  map2Cells[y][0] = MapCell.WALL;
  map2Cells[y][39] = MapCell.WALL;
  map2Cells[y][15] = MapCell.GRASS;
}
map2Cells[28][20] = MapCell.START;
map2Cells[2][20] = MapCell.GOAL;

// Map 3: Maze
const map3Cells = createGrid(40, 30, MapCell.WALL);
for(let x=2; x<38; x++) map3Cells[15][x] = MapCell.ROAD;
for(let y=2; y<28; y++) map3Cells[y][20] = MapCell.ROAD;
map3Cells[15][2] = MapCell.START;
map3Cells[27][20] = MapCell.GOAL;

export const MAP_DATA: GridMap[] = [
  { cells: map1Cells, width: 40, height: 30, cellSize: 20, start: {x: 5, y: 5}, goal: {x: 34, y: 24}, checkpoints: [] },
  { cells: map2Cells, width: 40, height: 30, cellSize: 20, start: {x: 20, y: 28}, goal: {x: 20, y: 2}, checkpoints: [] },
  { cells: map3Cells, width: 40, height: 30, cellSize: 20, start: {x: 2, y: 15}, goal: {x: 20, y: 27}, checkpoints: [] }
];
