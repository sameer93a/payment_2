import { drizzle } from "drizzle-orm/postgres-js";
// import { migrate } from "drizzle-orm/postgres-js/migrator";
// here we getting the error
import postgres from "postgres";

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL || "");
export const db = drizzle(queryClient);
