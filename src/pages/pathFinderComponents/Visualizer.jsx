import React, { useState, useEffect } from 'react';
import { dijkstra } from './algorithms/dijkstra.js';
import { AStar } from './algorithms/aStar';
import { dfs } from './algorithms/dfs';
import { bfs } from './algorithms/bfs';
import './Visualizer.css';
import Node from './Node/Node.jsx';
import "../App.css";
import {Github, Slack} from 'lucide-react';  

const Visualizer = () => {
  // State variables
  const [grid, setGrid] = useState([]);
  const [START_NODE_ROW, setStartNodeRow] = useState(1);
  const [FINISH_NODE_ROW, setFinishNodeRow] = useState(10);
  const [START_NODE_COL, setStartNodeCol] = useState(5);
  const [FINISH_NODE_COL, setFinishNodeCol] = useState(15);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [ROW_COUNT] = useState(25);  // 25
  const [COLUMN_COUNT] = useState(45);  
  const [MOBILE_ROW_COUNT] = useState(10);
  const [MOBILE_COLUMN_COUNT] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [isStartNode, setIsStartNode] = useState(false);
  const [isFinishNode, setIsFinishNode] = useState(false);
  const [isWallNode, setIsWallNode] = useState(false);
  const [currRow, setCurrRow] = useState(0);
  const [currCol, setCurrCol] = useState(0);
  const [isDesktopView, setIsDesktopView] = useState(true);

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  // const toggleIsRunning = () => {
  //   setIsRunning(prevState => !prevState);
  // };

  // const toggleView = () => {
  //   if (!isRunning) {
  //     clearGrid();
  //     const newIsDesktopView = !isDesktopView;
  //     let newGrid;
  //     if (newIsDesktopView) {
  //       newGrid = getInitialGrid(ROW_COUNT, COLUMN_COUNT);
  //       setIsDesktopView(true);
  //     } else {
  //       if (
  //         START_NODE_ROW > MOBILE_ROW_COUNT ||
  //         FINISH_NODE_ROW > MOBILE_ROW_COUNT ||
  //         START_NODE_COL > MOBILE_COLUMN_COUNT ||
  //         FINISH_NODE_COL > MOBILE_COLUMN_COUNT
  //       ) {
  //         alert('Start & Finish Nodes Must Be within 10 Rows x 20 Columns');
  //       } else {
  //         newGrid = getInitialGrid(MOBILE_ROW_COUNT, MOBILE_COLUMN_COUNT);
  //         setIsDesktopView(false);
  //       }
  //     }
  //     setGrid(newGrid);
  //   }
  // };


  // Functions to handle grid creation and interactions
  const getInitialGrid = (rowCount = ROW_COUNT, colCount = COLUMN_COUNT) => {
    const initialGrid = [];
    for (let row = 0; row < rowCount; row++) {
      const currentRow = [];
      for (let col = 0; col < colCount; col++) {
        currentRow.push(createNode(row, col));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      distanceToFinishNode: Math.abs(FINISH_NODE_ROW - row) + Math.abs(FINISH_NODE_COL - col),
      isVisited: false,
      isWall: false,
      previousNode: null,
      isNode: true,
    };
  };

  const handleMouseDown = (row, col) => {
    if (!isRunning) {
      if (isGridClear()) {
        if (document.getElementById(`node-${row}-${col}`).className === 'node node-start') {
          setMouseIsPressed(true);
          setIsStartNode(true);
          setCurrRow(row);
          setCurrCol(col);
        } else if (document.getElementById(`node-${row}-${col}`).className === 'node node-finish') {
          setMouseIsPressed(true);
          setIsFinishNode(true);
          setCurrRow(row);
          setCurrCol(col);
        } else {
          const newGrid = getNewGridWithWallToggled(grid, row, col);
          setGrid(newGrid);
          setMouseIsPressed(true);
          setIsWallNode(true);
          setCurrRow(row);
          setCurrCol(col);
        }
      } else {
        clearGrid();
      }
    }
  };

  const isGridClear = () => {
    for (const row of grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
        if (nodeClassName === 'node node-visited' || nodeClassName === 'node node-shortest-path') {
          return false;
        }
      }
    }
    return true;
  };

  const handleMouseEnter = (row, col) => {
    if (!isRunning) {
      if (mouseIsPressed) {
        const nodeClassName = document.getElementById(`node-${row}-${col}`).className;
        if (isStartNode) {
          if (nodeClassName !== 'node node-wall') {
            const prevStartNode = grid[currRow][currCol];
            prevStartNode.isStart = false;
            document.getElementById(`node-${currRow}-${currCol}`).className = 'node';

            setCurrRow(row);
            setCurrCol(col);
            const currStartNode = grid[row][col];
            currStartNode.isStart = true;
            document.getElementById(`node-${row}-${col}`).className = 'node node-start';
          }
          setStartNodeRow(row);
          setStartNodeCol(col);
        } else if (isFinishNode) {
          if (nodeClassName !== 'node node-wall') {
            const prevFinishNode = grid[currRow][currCol];
            prevFinishNode.isFinish = false;
            document.getElementById(`node-${currRow}-${currCol}`).className = 'node';

            setCurrRow(row);
            setCurrCol(col);
            const currFinishNode = grid[row][col];
            currFinishNode.isFinish = true;
            document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
          }
          setFinishNodeRow(row);
          setFinishNodeCol(col);
        } else if (isWallNode) {
          const newGrid = getNewGridWithWallToggled(grid, row, col);
          setGrid(newGrid);
        }
      }
    }
  };

  const handleMouseUp = (row, col) => {
    if (!isRunning) {
      setMouseIsPressed(false);
      if (isStartNode) {
        setIsStartNode(false);
        setStartNodeRow(row);
        setStartNodeCol(col);
      } else if (isFinishNode) {
        setIsFinishNode(false);
        setFinishNodeRow(row);
        setFinishNodeCol(col);
      }
      getInitialGrid();
    }
  };

  const handleMouseLeave = () => {
    if (isStartNode) {
      setIsStartNode(false);
      setMouseIsPressed(false);
    } else if (isFinishNode) {
      setIsFinishNode(false);
      setMouseIsPressed(false);
    } else if (isWallNode) {
      setIsWallNode(false);
      setMouseIsPressed(false);
      getInitialGrid();
    }
  };

  const clearGrid = () => {
    if (!isRunning) {
      const newGrid = grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
          if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish' && nodeClassName !== 'node node-wall') {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode = Math.abs(FINISH_NODE_ROW - node.row) + Math.abs(FINISH_NODE_COL - node.col);
          }
          if (nodeClassName === 'node node-finish') {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode = 0;
          }
          if (nodeClassName === 'node node-start') {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode = Math.abs(FINISH_NODE_ROW - node.row) + Math.abs(FINISH_NODE_COL - node.col);
            node.isStart = true;
            node.isWall = false;
            node.previousNode = null;
            node.isNode = true;
          }
        }
      }
    }
  };

  const clearWalls = () => {
    if (!isRunning) {
      const newGrid = grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
          if (nodeClassName === 'node node-wall') {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
            node.isWall = false;
          }
        }
      }
    }
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (!node.isStart && !node.isFinish && node.isNode) {
      const newNode = { ...node, isWall: !node.isWall };
      newGrid[row][col] = newNode;
    }
    return newGrid;
  };

  const visualize = (algo) => {
    if (!isRunning) {
      clearGrid();
      setIsRunning(true);
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      let visitedNodesInOrder;
      switch (algo) {
        case 'Dijkstra':
          visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
          break;
        case 'AStar':
          visitedNodesInOrder = AStar(grid, startNode, finishNode);
          break;
        case 'BFS':
          visitedNodesInOrder = bfs(grid, startNode, finishNode);
          break;
        case 'DFS':
          visitedNodesInOrder = dfs(grid, startNode, finishNode);
          break;
        default:
          break;
      }
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      nodesInShortestPathOrder.push('end');
      animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  };

  const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
        if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish') {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (nodesInShortestPathOrder[i] === 'end') {
        setTimeout(() => {
          setIsRunning(false);
        }, i * 50);
      } else {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
          if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish') {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
          }
        }, i * 40);
      }
    }
  };

  // Helper function to backtrack the shortest path
  const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  };


  const styles ={
    disabledButton: {
    backgroundColor: "#1F1F1F",
    color: "#E2E2E2",
    border: "none",
    outline: "none",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    margin: "0 10px",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  enabledButton: {
    backgroundColor: "#E2E2E2",
    color: "#1F1F1F",
    border: "none",
    outline: "none",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    margin: "0 10px",
    padding: "5px 10px",
    borderRadius: "5px",
  },
  }

//--------------------------------------------------------------

  return (
    <div>
      <nav className='container'>
        <div className='left'>
        <Slack  size={55} color='#c45050'/><p style={{"fontWeight":900, "fontSize":"35px"}}>PathFinder</p> 
        </div>
        {/* <div className='mid'>
              <a className="nav-link" href="#"><Github size={30} /></a>
              <a className="nav-link" href="#"> Check Out my Profile </a>
        </div> */}
      
      <div className='right controller'>
        <button
        style={isRunning ? styles.disabledButton : styles.enabledButton}
          type="button"
          className="btn"
          onClick={clearGrid}> Clear Grid </button>

        <button
        style={isRunning ? styles.disabledButton : styles.enabledButton}
          type="button"
          className="btn"
          onClick={clearWalls} > Clear Walls </button>

      <button
      style={isRunning ? styles.disabledButton : styles.enabledButton}
        type="button"
        className="btn"
        onClick={() => visualize('Dijkstra')} > Dijkstra's </button>

      <button
      style={isRunning ? styles.disabledButton : styles.enabledButton}
        type="button"
        className="btn"
        onClick={() => visualize('AStar')} > A* </button>

      <button
      style={isRunning ? styles.disabledButton : styles.enabledButton}
        type="button"
        className="btn"
        onClick={() => visualize('BFS')} > BFS </button>

      <button
      style={isRunning ? styles.disabledButton : styles.enabledButton}
        type="button"
        className="btn"
        onClick={() => visualize('DFS')} > DFS </button>
      

      {/* {isDesktopView ? (
        <button
          type="button"
          className="btn btn-light"
          onClick={() => toggleView()}
        >
          Mobile View
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => toggleView()}
        >
          Desktop View
        </button>
      )} */}
      </div>
      </nav>


      <table
        className="grid-container"
        onMouseLeave={handleMouseLeave}
      >
        <tbody className="grid">
          {grid.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={() => handleMouseDown(row, col)}
                    onMouseEnter={() => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp(row, col)}
                    row={row}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
     

    </div>
  );
};

export default Visualizer;
