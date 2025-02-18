import { IncomingMessage, ServerResponse } from "http";
import { database } from "./model";

/**
 * TODO: Copy the route handling logic from the previous exercise
 * into these functions. You will need to use the party array from
 * the model.ts file to handle the requests.
 */

// GET /
export const getHome = (req: IncomingMessage, res: ServerResponse) => {};

// GET /pokemon
export const getAllPokemon = (req: IncomingMessage, res: ServerResponse) => {};

// GET /pokemon/:id
export const getOnePokemon = (req: IncomingMessage, res: ServerResponse) => {};

// POST /pokemon
export const createPokemon = (req: IncomingMessage, res: ServerResponse) => {};

// PUT /pokemon/:id
export const updatePokemon = (req: IncomingMessage, res: ServerResponse) => {};

// DELETE /pokemon/:id
export const deletePokemon = (req: IncomingMessage, res: ServerResponse) => {};
