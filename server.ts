import { Router } from "./router.ts";

const port = 8088;

const defaultHandler = async () => new Response("Default response");

const getUser = async (
  req: Request,
  params: Record<string, string>,
): Promise<Response> => new Response("get user handler ");

const addUser = async (
  req: Request,
  params: Record<string, string>,
): Promise<Response> => new Response("add user handler ");

const updateUser = async (
  req: Request,
  params: Record<string, string>,
): Promise<Response> => new Response("update user handler");

const addImage = async (
  req: Request,
  params: Record<string, string>,
): Promise<Response> => new Response("add image handler");

const router = new Router();

router.add("GET", "/", defaultHandler);
router.add("GET", "/api/users/:userid", getUser);
router.add("POST", "/api/users/:userid", updateUser);
router.add("PUT", "/api/users/", addUser);
router.add("GET", "/api/users/:userid/images/:imageid", addImage);

async function handler(req: Request) {
  return await router.route(req);
}

console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
Deno.serve({ port }, handler);
