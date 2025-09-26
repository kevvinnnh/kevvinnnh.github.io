import { defineCollection, z } from "astro:content";

const news = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),              // ISO
    tags: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    pinned: z.boolean().default(false)
  })
});

// allow http(s) OR site-relative (/files/paper.pdf), and ignore empty strings
const urlish = z.union([z.string().url(), z.string().regex(/^\/\S+$/)]);
const optUrlish = z.preprocess(v => (typeof v === "string" && v.trim() === "" ? undefined : v), urlish.optional());

const author = z.object({
  name: z.string(),
  url: optUrlish,
  me: z.boolean().default(false), // highlight you
});

const resource = z.object({
  type: z.enum(["pdf","video","project","code","tweetorial","demo","bibtex","slides","data"]),
  url: urlish,
  label: z.string().optional() // optional custom label
});


export const research = defineCollection({
  schema: z.object({
    emoji: z.string().optional(),     // keep supporting emoji
                     // NEW: tiny animated icon
    title: z.string(),
    authors: z.array(z.object({ name: z.string(), url: optUrlish, me: z.boolean().default(false) })),
    venue: z.string().optional(),
    year: z.number().optional(),
    status: z.enum(["published","under review","in submission","preprint"]).optional(),
    teaser: z.string().optional(),
    thumbnail: optUrlish,
    gif: z.string().optional(),
    resources: z.array(z.object({
      type: z.enum(["pdf","video","project","code","tweetorial","demo","bibtex","slides","data"]),
      url: urlish, label: z.string().optional()
    })).default([]),
    pinned: z.boolean().default(false)
  })
});

const teaching = defineCollection({
  schema: z.object({
    term: z.string(),
    course: z.string(),
    role: z.string(),
    with: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([])
  })
});

const misc = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    link: z.string().url().optional(),
    note: z.string().optional()
  })
});

export const collections = { news, research, teaching, misc };
