import http, { IncomingMessage, ServerResponse } from "http";
import {
	createPokemon,
	deletePokemon,
	getAllPokemon,
	getHome,
	getOnePokemon,
	updatePokemon,
} from "./controller";
const hostname = "127.0.0.1";
const port = 3000;

/**
 * A blueprint defining what a route handling function looks like.
 * A route handler takes a request and response object.
 * While it does not return anything, it is expected to send a response
 * back to the client using the response object.
 */
interface RouteHandler {
	(req: IncomingMessage, res: ServerResponse): void;
}

/**
 * A blueprint defining what the routes object looks like.
 * The routes object is a dictionary of HTTP methods.
 * Each HTTP method is a dictionary of routes.
 * Each route is a string that maps to a route handling function.
 * @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types-and-index-signatures
 */
interface Routes {
	[method: string]: {
		[path: string]: RouteHandler;
	};
}

/**
 * The routes object is a dictionary of HTTP methods.
 * Each HTTP method is a dictionary of routes.
 * Each route is a string that maps to a route handling function.
 */
const routes: Routes = {
	GET: {},
	POST: {},
	PUT: {},
	DELETE: {},
};

/**
 * A function that handles all incoming requests.
 * It logs the request method and URL to the console.
 * It then checks if the request method and URL match a route handler.
 * If a route handler is found, it calls the route handler.
 * If a route handler is not found, it sends a 404 response.
 * @param req The request object.
 * @param res The response object.
 */
const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
	console.log(`${req.method} ${req.url}`);

	// TODO: Determine the route handler based on the request method and URL.
	const handler = routes["GET"]["/"];

	if (handler) {
		handler(req, res);
	} else {
		res.statusCode = 404;
		res.end(JSON.stringify({ message: "Route not found" }, null, 2));
	}
};

/**
 * Route registration is the process of adding a route to the routes object.
 * Populate the routes object by placing function references,
 * e.g., the `getAllPokemon` function you made, into these slots to establish paths.
 */
routes.GET["/"] = getHome;
routes.GET["/pokemon/:id"] = getOnePokemon;
routes.POST["/pokemon"] = createPokemon;

// TODO: Add the remaining routes to the routes object.

const server = http.createServer(handleRequest);

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
