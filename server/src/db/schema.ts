
import { serial, integer, pgTable, timestamp, text } from 'drizzle-orm/pg-core';

export const gameSessionsTable = pgTable('game_sessions', {
  id: serial('id').primaryKey(),
  player1_score: integer('player1_score').notNull(),
  player2_score: integer('player2_score').notNull(),
  winner: text('winner'), // Nullable - can be 'player1', 'player2', 'draw', or null
  game_duration: integer('game_duration').notNull(), // Duration in seconds
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type GameSession = typeof gameSessionsTable.$inferSelect;
export type NewGameSession = typeof gameSessionsTable.$inferInsert;

// Export all tables for proper query building
export const tables = { gameSessions: gameSessionsTable };
