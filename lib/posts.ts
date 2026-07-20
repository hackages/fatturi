// Contenu éditorial du blog Fatturi. Les articles sont désormais des fichiers
// Markdown dans /content (frontmatter YAML + corps Markdown), lus au build (SSG)
// et rendus par components/article-body.tsx.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type CategorySlug = "reforme" | "guides" | "produit" | "ecommerce";
export type Theme = "navy" | "gold" | "sage";

export interface Category {
  slug: CategorySlug;
  label: string;
  accent: Theme;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  { slug: "reforme", label: "Réforme 2026", accent: "navy", blurb: "La réforme française de la facturation électronique, expliquée." },
  { slug: "guides", label: "Guides", accent: "sage", blurb: "PDP, Factur-X, TVA : les notions clés, sans jargon." },
  { slug: "produit", label: "Produit", accent: "gold", blurb: "Ce que Fatturi automatise pour vous, en détail." },
  { slug: "ecommerce", label: "E-commerce", accent: "navy", blurb: "Facturation pour ceux qui vendent en ligne." },
];

export function categoryOf(slug: CategorySlug): Category {
  return CATEGORIES.find((c) => c.slug === slug)!;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface HowTo {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration, ex. PT5M
  steps: HowToStep[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  date: string; // ISO (YYYY-MM-DD)
  author: string;
  readingMin: number;
  theme: Theme;
  featured?: boolean;
  content: string; // corps Markdown brut
  faq?: FaqItem[];
  howto?: HowTo;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

// Estimation du temps de lecture (~200 mots/min) si non fourni en frontmatter.
function estimateReadingMin(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function parseFaq(value: unknown): FaqItem[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const question = String(row.question ?? "").trim();
      const answer = String(row.answer ?? "").trim();
      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((item): item is FaqItem => item !== null);
  return items.length ? items : undefined;
}

function parseHowTo(value: unknown): HowTo | undefined {
  if (!value || typeof value !== "object") return undefined;
  const raw = value as Record<string, unknown>;
  const name = String(raw.name ?? "").trim();
  const description = String(raw.description ?? "").trim();
  const stepsRaw = Array.isArray(raw.steps) ? raw.steps : [];
  const steps = stepsRaw
    .map((step) => {
      if (!step || typeof step !== "object") return null;
      const row = step as Record<string, unknown>;
      const stepName = String(row.name ?? "").trim();
      const text = String(row.text ?? "").trim();
      if (!stepName || !text) return null;
      return { name: stepName, text };
    })
    .filter((step): step is HowToStep => step !== null);
  if (!name || !description || !steps.length) return undefined;
  const totalTime = String(raw.totalTime ?? "").trim();
  return {
    name,
    description,
    ...(totalTime ? { totalTime } : {}),
    steps,
  };
}

function loadPosts(): Post[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ""),
      title: String(data.title ?? ""),
      excerpt: String(data.excerpt ?? ""),
      category: data.category as CategorySlug,
      date: normalizeDate(data.date),
      author: String(data.author ?? ""),
      theme: (data.theme as Theme) ?? "navy",
      featured: Boolean(data.featured),
      readingMin:
        typeof data.readingMin === "number"
          ? data.readingMin
          : estimateReadingMin(content),
      content,
      faq: parseFaq(data.faq),
      howto: parseHowTo(data.howto),
    };
  });
}

export const POSTS: Post[] = loadPosts();

export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPost(): Post {
  return getAllPosts().find((p) => p.featured) ?? getAllPosts()[0];
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(slug: CategorySlug): Post[] {
  return getAllPosts().filter((p) => p.category === slug);
}

export function getRelatedPosts(post: Post, count = 3): Post[] {
  const sameCat = getAllPosts().filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = getAllPosts().filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...sameCat, ...others].slice(0, count);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
