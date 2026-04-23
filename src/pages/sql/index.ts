import { sql, SQL} from "bun";

const db = new SQL("sqlite://database.sqlite");

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