// Proper mini crosswords with complete clue lists

export const mockPuzzles = {
  'board-games': {
    id: 'bg-001',
    puzzle_date: '2026-02-05',
    theme: 'board-games',
    difficulty: 'medium',
    grid: [
      ['C', 'H', 'E', 'S', 'S', null, null],
      ['A', null, null, null, null, null, null],
      ['R', 'I', 'S', 'K', null, 'G', 'O'],
      ['D', null, null, null, null, 'A', null],
      ['S', null, 'D', 'I', 'C', 'E', null],
      [null, null, null, null, 'L', null, null],
      [null, null, null, null, 'U', 'N', 'O']
    ],
    solution: [
      ['C', 'H', 'E', 'S', 'S', null, null],
      ['A', null, null, null, null, null, null],
      ['R', 'I', 'S', 'K', null, 'G', 'O'],
      ['D', null, null, null, null, 'A', null],
      ['S', null, 'D', 'I', 'C', 'E', null],
      [null, null, null, null, 'L', null, null],
      [null, null, null, null, 'U', 'N', 'O']
    ],
    clues_across: [
      { number: 1, clue: 'Game with kings, queens, and checkmate', answer: 'CHESS' },
      { number: 6, clue: 'World domination strategy game', answer: 'RISK' },
      { number: 7, clue: 'Ancient Asian board game', answer: 'GO' },
      { number: 9, clue: 'Cubes rolled to move in games', answer: 'DICE' },
      { number: 11, clue: 'Card game that means "one" in Spanish', answer: 'UNO' }
    ],
    clues_down: [
      { number: 1, clue: 'Deck used in poker and blackjack', answer: 'CARDS' },
      { number: 2, clue: 'Checkers opponent', answer: 'HUMAN' },
      { number: 3, clue: 'Board game winner\'s emotion', answer: 'ELATION' },
      { number: 4, clue: 'Scrabble or Monopoly', answer: 'GAME' },
      { number: 5, clue: 'Backgammon playing surface', answer: 'BOARD' },
      { number: 8, clue: 'Detective mystery game', answer: 'CLUE' }
    ]
  },
  'cats': {
    id: 'cat-001',
    puzzle_date: '2026-02-05',
    theme: 'cats',
    difficulty: 'medium',
    grid: [
      ['M', 'E', 'O', 'W', null, null, null],
      ['I', null, null, 'H', null, null, null],
      ['T', 'A', 'B', 'B', 'Y', null, null],
      ['T', null, null, 'I', null, null, null],
      ['S', null, 'P', 'U', 'R', 'R', null],
      [null, null, 'A', null, null, null, null],
      [null, null, 'W', 'S', null, null, null]
    ],
    solution: [
      ['M', 'E', 'O', 'W', null, null, null],
      ['I', null, null, 'H', null, null, null],
      ['T', 'A', 'B', 'B', 'Y', null, null],
      ['T', null, null, 'I', null, null, null],
      ['S', null, 'P', 'U', 'R', 'R', null],
      [null, null, 'A', null, null, null, null],
      [null, null, 'W', 'S', null, null, null]
    ],
    clues_across: [
      { number: 1, clue: 'Sound a cat makes', answer: 'MEOW' },
      { number: 5, clue: 'Striped orange cat breed', answer: 'TABBY' },
      { number: 8, clue: 'Happy cat rumbling sound', answer: 'PURR' },
      { number: 10, clue: 'Cat feet', answer: 'PAWS' }
    ],
    clues_down: [
      { number: 1, clue: 'Warm hand coverings', answer: 'MITTS' },
      { number: 2, clue: 'Feline eyes do this in the dark', answer: 'GLOW' },
      { number: 3, clue: 'Hairball sound', answer: 'HACK' },
      { number: 4, clue: 'Cat facial sensory hairs', answer: 'WHISKERS' },
      { number: 6, clue: 'Cat grooming body part', answer: 'TONGUE' },
      { number: 7, clue: 'House cat, scientifically', answer: 'FELIS' },
      { number: 9, clue: 'Soft cat foot bottom', answer: 'PAD' }
    ]
  }
};

// Simulate API fetch
export const fetchPuzzle = async (theme) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (!mockPuzzles[theme]) {
    throw new Error(`No puzzle found for theme: ${theme}`);
  }
  
  return mockPuzzles[theme];
};
