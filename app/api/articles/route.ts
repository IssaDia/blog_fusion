import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import axios from "axios";

import { PrismaClient, Article } from "@prisma/client";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const prisma = new PrismaClient();
    for (let i = 1; i < 4; i++) {
      const response = await axios.get(
        `${process.env.BLOG_URL}/wp-json/wp/v2/posts/?per_page=100&page=${i}`
      );

      const articles = response.data;
      for (let article of articles) {
        await prisma.article.create({
          data: {
            title: article.title.rendered,
            content: article.content.rendered,
            url: article.link,
            slug: article.slug,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
