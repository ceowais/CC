// Plain config object (no `drizzle-kit` import) so the config loads even when
// project dependencies are not installed locally, e.g. when run via npx.
export default {
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "sqlite",
};
