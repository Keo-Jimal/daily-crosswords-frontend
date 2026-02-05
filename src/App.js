import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';

// ===========================
// MAIN APP COMPONENT
// ===========================

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/puzzle/:theme" element={<CrosswordPuzzle />} />
        </Routes>
      </div>
    </Router>
  );
}

// ===========================
// LANDING PAGE COMPONENT
// ===========================

function LandingPage() {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>🎯 Daily Crosswords</h1>
        <p className="date">{today}</p>
      </header>

      <div className="puzzle-selection">
        <div className="puzzle-card board-games">
          <div className="puzzle-icon">🎲</div>
          <h2>Game Night</h2>
          <p>Board game themed crossword</p>
          <button 
            className="play-button"
            onClick={() => navigate('/puzzle/board-games')}
          >
            Play Now
          </button>
        </div>

        <div className="puzzle-card cats">
          <div className="puzzle-icon">🐱</div>
          <h2>Kitty Corner</h2>
          <p>Cat themed crossword</p>
          <button 
            className="play-button"
            onClick={() => navigate('/puzzle/cats')}
          >
            Play Now
          </button>
        </div>
      </div>

      <footer className="landing-footer">
        <p>Complete both puzzles daily for bonus points!</p>
      </footer>
    </div>
  );
}

// ===========================
// CROSSWORD PUZZLE COMPONENT
// ===========================

function CrosswordPuzzle() {
  const { theme } = useParams();
  const navigate = useNavigate();
  const [puzzleData, setPuzzleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userGrid, setUserGrid] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [direction, setDirection] = useState('across');
  const [checkMode, setCheckMode] = useState(false);

  // Fetch puzzle data from API
  useEffect(() => {
    async function fetchPuzzle() {
      try {
        setLoading(true);
        
        // Check if API URL is configured
        const apiUrl = process.env.REACT_APP_API_URL;
        
        let data;
        if (apiUrl) {
          // Use real API
          const response = await fetch(`${apiUrl}/api/crossword/today?theme=${theme}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch puzzle');
          }
          
          data = await response.json();
        } else {
          // Use mock data for demo/development
          const { fetchPuzzle: getMockPuzzle } = await import('./mockApi');
          data = await getMockPuzzle(theme);
        }
        
        setPuzzleData(data);
        
        // Initialize empty user grid
        const emptyGrid = data.grid.map(row => 
          row.map(() => '')
        );
        setUserGrid(emptyGrid);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchPuzzle();
  }, [theme]);

  // Reset grid when theme changes
  useEffect(() => {
    if (puzzleData) {
      const emptyGrid = puzzleData.grid.map(row => 
        row.map(() => '')
      );
      setUserGrid(emptyGrid);
      setSelectedCell(null);
      setCheckMode(false);
    }
  }, [theme, puzzleData]);

  // Handle cell selection
  const handleCellClick = (row, col) => {
    if (!puzzleData.grid[row][col]) return; // Don't select black cells

    // If clicking the same cell, toggle direction
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      setDirection(direction === 'across' ? 'down' : 'across');
    } else {
      setSelectedCell({ row, col });
    }
  };

  // Handle keyboard input
  const handleKeyDown = (e) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;

    if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
      // Type letter
      const newGrid = [...userGrid];
      newGrid[row][col] = e.key.toUpperCase();
      setUserGrid(newGrid);

      // Move to next cell
      moveToNextCell(row, col);
    } else if (e.key === 'Backspace') {
      // Delete letter
      const newGrid = [...userGrid];
      newGrid[row][col] = '';
      setUserGrid(newGrid);

      // Move to previous cell
      moveToPreviousCell(row, col);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveInDirection(row, col, -1, 0);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveInDirection(row, col, 1, 0);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveInDirection(row, col, 0, -1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveInDirection(row, col, 0, 1);
    }
  };

  const moveToNextCell = (row, col) => {
    if (direction === 'across') {
      // Move right
      for (let c = col + 1; c < puzzleData.grid[0].length; c++) {
        if (puzzleData.grid[row][c]) {
          setSelectedCell({ row, col: c });
          return;
        }
      }
    } else {
      // Move down
      for (let r = row + 1; r < puzzleData.grid.length; r++) {
        if (puzzleData.grid[r][col]) {
          setSelectedCell({ row: r, col });
          return;
        }
      }
    }
  };

  const moveToPreviousCell = (row, col) => {
    if (direction === 'across') {
      // Move left
      for (let c = col - 1; c >= 0; c--) {
        if (puzzleData.grid[row][c]) {
          setSelectedCell({ row, col: c });
          return;
        }
      }
    } else {
      // Move up
      for (let r = row - 1; r >= 0; r--) {
        if (puzzleData.grid[r][col]) {
          setSelectedCell({ row: r, col });
          return;
        }
      }
    }
  };

  const moveInDirection = (row, col, rowDelta, colDelta) => {
    let newRow = row + rowDelta;
    let newCol = col + colDelta;

    while (
      newRow >= 0 && 
      newRow < puzzleData.grid.length && 
      newCol >= 0 && 
      newCol < puzzleData.grid[0].length
    ) {
      if (puzzleData.grid[newRow][newCol]) {
        setSelectedCell({ row: newRow, col: newCol });
        return;
      }
      newRow += rowDelta;
      newCol += colDelta;
    }
  };

  // Get cell class names
  const getCellClassName = (row, col) => {
    const classes = ['cell'];
    
    if (!puzzleData.grid[row][col]) {
      classes.push('black-cell');
      return classes.join(' ');
    }

    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      classes.push('selected');
    }

    if (checkMode) {
      if (userGrid[row][col]) {
        if (userGrid[row][col] === puzzleData.solution[row][col]) {
          classes.push('correct');
        } else {
          classes.push('incorrect');
        }
      }
    }

    return classes.join(' ');
  };

  // Calculate stats
  const calculateStats = () => {
    let correct = 0;
    let incorrect = 0;
    let filled = 0;
    let total = 0;

    for (let row = 0; row < puzzleData.grid.length; row++) {
      for (let col = 0; col < puzzleData.grid[0].length; col++) {
        if (puzzleData.grid[row][col]) {
          total++;
          if (userGrid[row][col]) {
            filled++;
            if (userGrid[row][col] === puzzleData.solution[row][col]) {
              correct++;
            } else {
              incorrect++;
            }
          }
        }
      }
    }

    return { correct, incorrect, filled, total };
  };

  // Get theme info
  const getThemeInfo = () => {
    if (theme === 'board-games') {
      return {
        title: 'Game Night 🎲',
        icon: '🎲',
        otherTheme: 'cats',
        otherTitle: 'Kitty Corner 🐱'
      };
    } else {
      return {
        title: 'Kitty Corner 🐱',
        icon: '🐱',
        otherTheme: 'board-games',
        otherTitle: 'Game Night 🎲'
      };
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="puzzle-container">
        <div className="loading">Loading puzzle...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="puzzle-container">
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      </div>
    );
  }

  const themeInfo = getThemeInfo();
  const stats = checkMode ? calculateStats() : null;

  return (
    <div className="puzzle-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <header className="puzzle-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1>{themeInfo.title}</h1>
        <div className="header-actions">
          <button 
            className={`check-button ${checkMode ? 'active' : ''}`}
            onClick={() => setCheckMode(!checkMode)}
          >
            {checkMode ? 'Hide Check' : 'Check Answers'}
          </button>
        </div>
      </header>

      {checkMode && stats && (
        <div className="stats-bar">
          <span className="stat correct">✓ {stats.correct} correct</span>
          <span className="stat incorrect">✗ {stats.incorrect} wrong</span>
          <span className="stat total">{stats.filled}/{stats.total} filled</span>
        </div>
      )}

      <div className="puzzle-content">
        <div className="grid-container">
          <div 
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${puzzleData.grid[0].length}, 40px)`,
              gridTemplateRows: `repeat(${puzzleData.grid.length}, 40px)`
            }}
          >
            {puzzleData.grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={getCellClassName(rowIndex, colIndex)}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell && (
                    <>
                      {/* Cell number would go here if we had numbering data */}
                      <input
                        type="text"
                        maxLength={1}
                        value={userGrid[rowIndex][colIndex]}
                        readOnly
                        className="cell-input"
                      />
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="clues-container">
          <div className="clues-section">
            <h3>Across</h3>
            <ul className="clues-list">
              {puzzleData.clues_across.map((clue) => (
                <li key={clue.number}>
                  <strong>{clue.number}.</strong> {clue.clue}
                </li>
              ))}
            </ul>
          </div>

          <div className="clues-section">
            <h3>Down</h3>
            <ul className="clues-list">
              {puzzleData.clues_down.map((clue) => (
                <li key={clue.number}>
                  <strong>{clue.number}.</strong> {clue.clue}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="cross-promo">
        <p>Ready for another challenge?</p>
        <button 
          className="promo-button"
          onClick={() => navigate(`/puzzle/${themeInfo.otherTheme}`)}
        >
          Try {themeInfo.otherTitle} →
        </button>
      </div>
    </div>
  );
}

export default App;
