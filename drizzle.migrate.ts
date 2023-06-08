import postgres from "postgres";
import { type PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const clinet = postgres({ ssl: "require" });
const db: PostgresJsDatabase = drizzle(clinet);

const main = async () => {
  console.log("migrating...");
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
  } catch (error) {
    console.log(error);
  }
  console.log("completed");
};

main();
