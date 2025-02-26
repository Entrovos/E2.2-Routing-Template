import { Url } from "url";
import { IncomingMessage, ServerResponse } from "http";
import { Pokemon } from "./model";
import { database } from "./model";

/**
 * TODO: Copy the route handling logic from the previous exercise
 * into these functions. You will need to use the party array from
 * the model.ts file to handle the requests.
 */

// GET /
export const getHome = (req: IncomingMessage, res: ServerResponse) => {
	// Request handling will come later!
	// Inside createServer(...)

	res.statusCode = 200;
	res.setHeader("Content-Type", "application/json");

	res.end(
		JSON.stringify({ message: "Hello from the Pokemon Server!" }, null, 2),
	);
};

// GET /pokemon
export const getAllPokemon = (req: IncomingMessage, res: ServerResponse) => {
	// Existing: Get all Pokemon ...
	const url = new URL(req.url!, `http://${req.headers.host}`);
	const queryParams = url.searchParams;

	if (queryParams.size > 0) {
		const typeFilter = queryParams.get("type");
		const sortBy = queryParams.get("sortBy");

		let result: Pokemon[] = [];

		if (typeFilter) {
			result = database.filter((pokemon) => pokemon.type === typeFilter);
		}

		if (sortBy) {
			result = database.sort((pokemon1, pokemon2) =>
				pokemon1.name < pokemon2.name ? -1 : 1,
			);
		}

		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");

		res.end(
			JSON.stringify(
				{ message: "All Pokemon:", payload: result },
				null,
				2,
			),
		);
	} else {
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");

		res.end(
			JSON.stringify(
				{ message: "All Pokemon:", payload: database },
				null,
				2,
			),
		);
	}
};

// GET /pokemon/:id
export const getOnePokemon = (req: IncomingMessage, res: ServerResponse) => {
	// Find Pokemon by ID
	const urlParts = req.url.split("/");
	const pokemonId = parseInt(urlParts[2]);

	const foundPokemon = database.find((pokemon) => pokemon.id === pokemonId);

	if (foundPokemon) {
		res.statusCode = 200;
		res.setHeader("Content-Type", "application/json");
		res.end(
			JSON.stringify(
				{ message: "Pokemon found", payload: foundPokemon },
				null,
				2,
			),
		);
	} else {
		res.statusCode = 404;
		res.end(JSON.stringify({ message: "Pokemon not found" }, null, 2));
	}
};

// POST /pokemon
export const createPokemon = (req: IncomingMessage, res: ServerResponse) => {
	let body = ""; // To store incoming data
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		const newPokemon = JSON.parse(body);
		// Add basic data logic (you'd likely use a database in a real application)
		newPokemon.id = database.length + 1; // Simple ID assignment
		database.push(newPokemon);
		res.statusCode = 201; // 'Created'
		res.setHeader("Content-Type", "application/json");
		res.end(
			JSON.stringify(
				{ message: "Pokemon created!", payload: newPokemon },
				null,
				2,
			),
		);
	});
};

// PUT /pokemon/:id
export const updatePokemon = (req: IncomingMessage, res: ServerResponse) => {
	// Find Pokemon by ID
	const urlParts = req.url.split("/");
	const pokemonId = parseInt(urlParts[2]);

	let body = ""; // To store incoming data
	req.on("data", (chunk) => {
		body += chunk.toString();
	});

	req.on("end", () => {
		let pokemonToUpdate = database.find(
			(pokemon) => pokemon.id === pokemonId,
		);
		let pokemonIndex = database.findIndex(
			(pokemon) => pokemon.id === pokemonId,
		);

		if (pokemonToUpdate) {
			const pokemonUpdates: Partial<Pokemon> = JSON.parse(body);

			res.statusCode = 204;
			database[pokemonIndex] = {
				...pokemonToUpdate,
				...pokemonUpdates,
			};
			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify({ message: "Pokemon updated" }, null, 2));
		} else {
			res.statusCode = 404;
			res.end(JSON.stringify({ message: "Pokemon not found" }, null, 2));
		}
	});
};

// DELETE /pokemon/:id
export const deletePokemon = (req: IncomingMessage, res: ServerResponse) => {
	// Find Pokemon by ID
	const urlParts = req.url.split("/");
	const pokemonId = parseInt(urlParts[2]);

	let pokemonIndex = database.findIndex(
		(pokemon) => pokemon.id === pokemonId,
	);

	// let pokemonIndex = database.findIndex(pokemon => pokemon.id === pokemonId);
	// console.log(pokemonIndex)

	if (pokemonIndex != -1) {
		res.statusCode = 204;
		database.splice(pokemonIndex, 1);
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify({ message: "Pokemon deleted" }, null, 2));
	} else {
		res.statusCode = 404;
		res.end(JSON.stringify({ message: "Pokemon not found" }, null, 2));
	}
};
