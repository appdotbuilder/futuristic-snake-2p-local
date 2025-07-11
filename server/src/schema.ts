
import { z } from 'zod';

// Game session schema for potential future use
export const gameSessionSchema = z.object({
  id: z.number(),
  player1_score: z.number().int().nonnegative(),
  player2_score: z.number().int().nonnegative(),
  winner: z.enum(['player1', 'player2', 'draw']).nullable(),
  game_duration: z.number().int().nonnegative(), // Duration in seconds
  created_at: z.coerce.date()
});

export type GameSession = z.infer<typeof gameSessionSchema>;

// Input schema for creating game sessions
export const createGameSessionInputSchema = z.object({
  player1_score: z.number().int().nonnegative(),
  player2_score: z.number().int().nonnegative(),
  winner: z.enum(['player1', 'player2', 'draw']).nullable(),
  game_duration: z.number().int().nonnegative()
});

export type CreateGameSessionInput = z.infer<typeof createGameSessionInputSchema>;

// Game statistics schema
export const gameStatsSchema = z.object({
  total_games: z.number().int().nonnegative(),
  player1_wins: z.number().int().nonnegative(),
  player2_wins: z.number().int().nonnegative(),
  draws: z.number().int().nonnegative(),
  average_game_duration: z.number().nonnegative()
});

export type GameStats = z.infer<typeof gameStatsSchema>;
