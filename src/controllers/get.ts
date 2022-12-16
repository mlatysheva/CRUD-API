export const get = (request, response) => {
  switch (request.url) {
    default:
      response.statusCode = 404;
      response.write(`Cannot GET ${request.url}`);
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end(`Page ${request.url} not found`);
  }
}
