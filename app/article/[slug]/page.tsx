"use client";
import axios from "axios";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Article = {
  title: string;
  content: string;
  slug: string;
  link: string;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const response = await axios.get("/api/get_articles");
  const articles = response.data.articles;

  const article: Article | undefined = articles.find(
    (article: Article) => article.slug === params.slug
  );
  return (
    <div className="container mx-auto p-8">
      {article && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      )}
      {!article && <p>Article not found</p>}
    </div>
  );
}
