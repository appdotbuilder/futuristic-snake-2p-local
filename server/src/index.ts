
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

import { createGameSessionInputSchema } from './schema';
import { createGameSession } from './handlers/create_game_session';
import { getGameStats } from './handlers/get_game_stats';
import { getRecentGames } from './handlers/get_recent_games';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  
  // Create a new game session record
  createGameSession: publicProcedure
    .input(createGameSessionInputSchema)
    .mutation(({ input }) => createGameSession(input)),
  
  // Get aggregated game statistics
  getGameStats: publicProcedure
    .query(() => getGameStats()),
  
  // Get recent game sessions with optional limit
  getRecentGames: publicProcedure
    .input(z.object({ limit: z.number().int().positive().optional().default(10) }))
    .query(({ input }) => getRecentGames(input.limit)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
