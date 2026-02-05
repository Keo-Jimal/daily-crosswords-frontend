// Mock API data for development and demo deployment
// Remove this file once you have a real backend API

export const mockPuzzles = {
  'board-games': {
    id: 'bg-001',
    puzzle_date: '2026-02-05',
    theme: 'board-games',
    difficulty: 'medium',
    grid: [
      ['C', 'A', 'T', 'A', 'N', null, 'C', 'L', 'U', 'E'],
      ['H', null, 'I', null, null, null, 'H', null, null, null],
      ['E', null, 'C', null, 'M', 'O', 'N', 'O', 'P', 'O', 'L', 'Y'],
      ['S', null, 'K', null, null, null, 'E', null, null, null],
      ['S', null, 'E', null, 'R', 'I', 'S', 'K', null, null],
      [null, null, 'T', null, null, null, 'S', null, null, null]
    ],
    solution: [
      ['C', 'A', 'T', 'A', 'N', null, 'C', 'L', 'U', 'E'],
      ['H', null, 'I', null, null, null, 'H', null, null, null],
      ['E', null, 'C', null, 'M', 'O', 'N', 'O', 'P', 'O', 'L', 'Y'],
      ['S', null, 'K', null, null, null, 'E', null, null, null],
      ['S', null, 'E', null, 'R', 'I', 'S', 'K', null, null],
      [null, null, 'T', null, null, null, 'S', null, null, null]
    ],
    clues_across: [
      { number: 1, clue: 'Popular resource trading island game', answer: 'CATAN' },
      { number: 7, clue: 'Detective mystery board game', answer: 'CLUE' },
      { number: 9, clue: 'Property trading game with hotels', answer: 'MONOPOLY' },
      { number: 11, clue: 'World domination strategy game', answer: 'RISK' }
    ],
    clues_down: [
      { number: 1, clue: 'King, queen, or rook game', answer: 'CHESS' },
      { number: 2, clue: 'Railroad building game (_____ to Ride)', answer: 'TICKET' },
      { number: 3, clue: 'Ancient game with black and white stones', answer: 'CHESS' }
    ]
  },
  'cats': {
    id: 'cat-001',
    puzzle_date: '2026-02-05',
    theme: 'cats',
    difficulty: 'medium',
    grid: [
      ['K', 'I', 'T', 'T', 'E', 'N', null, 'M', 'E', 'O', 'W'],
      ['null', null, 'A', null, null, null, null, 'A', null, null, null],
      ['W', 'H', 'I', 'S', 'K', 'E', 'R', 'S', null, null, null],
      [null, null, 'B', null, null, null, null, 'N', null, null, null],
      ['P', 'U', 'R', 'R', null, null, null, 'X', null, null, null],
      [null, null, 'Y', null, null, null, null, null, null, null, null]
    ],
    solution: [
      ['K', 'I', 'T', 'T', 'E', 'N', null, 'M', 'E', 'O', 'W'],
      [null, null, 'A', null, null, null, null, 'A', null, null, null],
      ['W', 'H', 'I', 'S', 'K', 'E', 'R', 'S', null, null, null],
      [null, null, 'B', null, null, null, null, 'N', null, null, null],
      ['P', 'U', 'R', 'R', null, null, null, 'X', null, null, null],
      [null, null, 'Y', null, null, null, null, null, null, null, null]
    ],
    clues_across: [
      { number: 1, clue: 'Baby cat', answer: 'KITTEN' },
      { number: 8, clue: 'Sound a cat makes', answer: 'MEOW' },
      { number: 9, clue: 'Cat facial hair', answer: 'WHISKERS' },
      { number: 12, clue: 'Happy cat sound', answer: 'PURR' }
    ],
    clues_down: [
      { number: 2, clue: 'Orange striped cat pattern', answer: 'TABBY' },
      { number: 3, clue: 'Fancy Persian or ______', answer: 'MANX' },
      { number: 4, clue: 'Cat with no tail breed', answer: 'MANX' }
    ]
  }
};

// Simulate API fetch
export const fetchPuzzle = async (theme) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!mockPuzzles[theme]) {
    throw new Error(`No puzzle found for theme: ${theme}`);
  }
  
  return mockPuzzles[theme];
};
