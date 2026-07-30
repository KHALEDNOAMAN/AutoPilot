import { GridMap, Vec2, MapCell } from '../types';

class Node {
  constructor(
    public x: number,
    public y: number,
    public g = 0,
    public h = 0,
    public f = 0,
    public parent: Node | null = null
  ) {}
}

export class AStarPathfinder {
  findPath(grid: GridMap, start: Vec2, goal: Vec2): Vec2[] {
    const openList: Node[] = [];
    const closedList: boolean[][] = Array.from({length: grid.height}, () => Array(grid.width).fill(false));
    
    const startNode = new Node(Math.floor(start.x), Math.floor(start.y));
    const goalNode = new Node(Math.floor(goal.x), Math.floor(goal.y));
    
    openList.push(startNode);
    
    const dirs = [[0,1], [1,0], [0,-1], [-1,0], [1,1], [1,-1], [-1,1], [-1,-1]];
    
    while (openList.length > 0) {
      openList.sort((a, b) => a.f - b.f);
      const curr = openList.shift()!;
      
      if (curr.x === goalNode.x && curr.y === goalNode.y) {
        const path: Vec2[] = [];
        let temp: Node | null = curr;
        while (temp) {
          path.push({x: temp.x, y: temp.y});
          temp = temp.parent;
        }
        return path.reverse();
      }
      
      closedList[curr.y][curr.x] = true;
      
      for (const [dx, dy] of dirs) {
        const nx = curr.x + dx;
        const ny = curr.y + dy;
        
        if (nx < 0 || ny < 0 || nx >= grid.width || ny >= grid.height) continue;
        if (grid.cells[ny][nx] === MapCell.WALL) continue;
        if (closedList[ny][nx]) continue;
        
        const g = curr.g + Math.hypot(dx, dy);
        const h = Math.abs(nx - goalNode.x) + Math.abs(ny - goalNode.y); // Manhattan
        
        const existingNode = openList.find(n => n.x === nx && n.y === ny);
        if (existingNode) {
          if (g < existingNode.g) {
            existingNode.g = g;
            existingNode.f = g + existingNode.h;
            existingNode.parent = curr;
          }
        } else {
          openList.push(new Node(nx, ny, g, h, g + h, curr));
        }
      }
    }
    
    return [];
  }
  
  getSmoothedPath(path: Vec2[]): Vec2[] {
    // Ramer-Douglas-Peucker would go here, simplified for now
    return path;
  }
}
