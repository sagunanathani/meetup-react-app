export async function hello(event) {
  const name = event.queryStringParameters?.name || "Guest";
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Hello, ${name}!` }),
  };
}
