import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Homepage() {
  const [articles, setArticles] = useState([]);
  const [visitedArticles, setVisitedArticles] = useState(
    JSON.parse(
      typeof window !== "undefined"
        ? localStorage.getItem("visitedArticles")
        : false
    ) || {}
  );

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/get_articles");
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
      localStorage.setItem("visitedArticles", JSON.stringify(visitedArticles));
    };

    fetchArticles();
  }, []);

  const markArticleAsVisited = (articleId, event) => {
    setVisitedArticles((prevVisited) => ({
      ...prevVisited,
      [articleId]: true,
    }));
    console.log("Article visited:", articleId);
    localStorage.setItem(
      "visitedArticles",
      JSON.stringify({
        ...visitedArticles,
        [articleId]: true,
      })
    );
    console.log("Article visited:", articleId);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article.id}
            className="border border-gray-300 p-4 rounded-md mb-4"
          >
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <Link
              href={`/article/${article.slug}`}
              className="text-blue-500 hover:underline block mt-2"
              onClick={(event) => markArticleAsVisited(article.id, event)}
            >
              Lire l'article
            </Link>
            {visitedArticles[article.id] && (
              <span className="text-green-500 block mt-2">
                {" "}
                ✓ Article visité
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
