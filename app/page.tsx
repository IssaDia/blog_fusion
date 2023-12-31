"use client";
import Homepage from "./components/homepage/homepage";
import { PrismaClient } from "@prisma/client";
import type { InferGetStaticPropsType, GetServerSideProps } from "next";

const prisma = new PrismaClient();

export default function Home() {
  return (
    <div>
      <Homepage />
    </div>
  );
}
