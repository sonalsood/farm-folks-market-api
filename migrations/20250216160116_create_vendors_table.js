/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("vendors", (table) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("category", 100).notNullable();
    table.text("description").notNullable();
    table.string("contactInfo", 255).notNullable();
    table.string("website", 255);
    table.string("imageUrl", 255);
    table.text("updates");
    table.string("location", 255);
    table.string("availability", 255);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("vendors");
}
