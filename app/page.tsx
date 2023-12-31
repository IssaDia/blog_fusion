"use client";
import Homepage from "./components/homepage/Homepage";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Home() {
  return (
    <div>
      <Homepage />
    </div>
  );
}
