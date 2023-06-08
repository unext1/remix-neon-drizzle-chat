import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "../db/schema";

const clinet = postgres({ ssl: "require" });
export const db = drizzle(clinet, { schema });
