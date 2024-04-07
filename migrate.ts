import { migrate  } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.DIRECT_DATABASE_URL;
if (!connectionString) throw new Error("Missing DATABASE_URL")
console.log(`Migrating database at ${connectionString}`)
// Disable prefetch as it is not supported for "Transaction" pool mode
export const migrationClient = postgres(connectionString, { prepare: false });
export const migrationDb = drizzle(migrationClient);

(async () => {
    // This will run migrations on the database, skipping the ones already applied
    await migrate(migrationDb, { migrationsFolder: './migrations' });
    // Don't forget to close the connection, otherwise the script will hang
    await migrationClient.end();
})();
