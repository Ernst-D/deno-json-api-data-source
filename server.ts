import { Router } from "./router.ts";
import { getTransformedTestData } from "./transform.ts";

const port = 8088;

const defaultHandler = async () => new Response("Default response");
const jsonHandler = async () =>
  new Response(JSON.stringify(await getTransformedTestData({ limit: 3 })));

const router = new Router();

router.add("GET", "/", defaultHandler);
router.add("GET", "/json", jsonHandler);

async function handler(req: Request) {
  return await router.route(req);
}

console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
Deno.serve({ port, onError: () => new Response("Not found!") }, handler);
