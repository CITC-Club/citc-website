import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getDatabaseUrl } from "@/lib/env";
import * as schema from "./schema";

const client = postgres(getDatabaseUrl(), { prepare: false });

export const db = drizzle(client, { schema });
