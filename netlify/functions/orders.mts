import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { orders } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { items, total } = await req.json();

  if (!Array.isArray(items) || items.length === 0 || typeof total !== "number") {
    return new Response("Invalid order data", { status: 400 });
  }

  const [order] = await db
    .insert(orders)
    .values({ items: JSON.stringify(items), total })
    .returning();

  return Response.json(order, { status: 201 });
};

export const config: Config = {
  path: "/api/orders",
};
