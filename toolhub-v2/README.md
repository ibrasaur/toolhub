# ToolHub

> All free tools and courses a student needs — condensed in one place.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel (30 seconds)

```bash
npx vercel
```

Or drag the folder into [vercel.com/new](https://vercel.com/new).

---

## How to Add Tools

Open `app/tools/page.tsx` and find the `TOOL_CATEGORIES` array.

To **add a tool** inside an existing category:
```ts
{
  name: "Tool Name",
  desc: "One-line description.",
  url: "https://example.com",
  free: true,       // true = free forever, false = freemium
  tags: ["tag1", "tag2"],
}
```

To **add a new category**, copy an existing category block and paste it at the end. 
Give it a unique `id`, `emoji`, `label`, and pick a `tagClass` from `globals.css`.

---

## How to Add Courses

Open `app/courses/page.tsx` and find the `COURSE_CATEGORIES` array.

To **add a course**:
```ts
{
  name: "Course Name",
  provider: "Platform / Creator",
  desc: "One-sentence description.",
  url: "https://example.com",
  level: "Beginner",   // "Beginner" | "Intermediate" | "Advanced" | "All Levels"
  free: true,
  cert: false,         // true if free certificate is available
  hours: "~20",
}
```

---

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (via `motion` package)
- Google Fonts: DM Serif Display + DM Mono
