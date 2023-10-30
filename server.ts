const port = 8088;

const handler = (request: Request): Response => {
  switch (request.url) {
    default:
      return new Response("Default response");
  }
};

console.log(`HTTP server running. Access it at: http://localhost:8080/`);
Deno.serve({ port }, handler);
