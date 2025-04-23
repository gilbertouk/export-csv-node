import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";
import { sql } from "./db/client.ts";
import { stringify } from "csv-stringify";

const query = sql`
  SELECT id, name
  FROM products
  WHERE price_in_cents >= 1000`;

const cursor = query.cursor(500);

const exampleStream = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    for (const item of chunk) {
      // Convert the item to a JSON string and push it to the stream
      // this.push(JSON.stringify(item).concat("\n"));
      this.push(item);
    }

    callback();
  },
});

await pipeline(
  cursor,
  exampleStream,
  // create a jsonl stream
  // createWriteStream("./export.jsonl", "utf-8")
  stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "id", header: "ID" },
      { key: "name", header: "Name" },
    ],
  }),
  createWriteStream("./export.csv", "utf-8")
);

await sql.end();
