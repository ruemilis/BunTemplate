import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);


import { sql, SQL} from "bun";

const db = new SQL("BunTemplate\src\database.sqlite");

await db`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEST NOT NULL,
    email TEXT NOT NULL UNIQUE
)
`;

async function createUser(name, emailas) {
    const[newUser] = await db`
    INSERT INTO users ${sql({
        name,
        email: emailas
    })}
    RETURNING *
    `;

    return newUser;
}

const user = await createUser("Alice", "alice2@example.com");

console.log(user);