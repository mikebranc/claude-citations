# Claude Citations Demo

A simple demo showcasing Claude's new citation capabilities. Built with Next.js and Tailwind CSS.

Claude Citations documentation: https://docs.anthropic.com/en/docs/build-with-claude/citations

## Demo
https://x.com/mike_branc/status/1882565176018546699

## Features

- Chat with Claude about provided documents
- View inline citations with direct links to source documents
- See highlighted text in source documents for each citation

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your Anthropic API key to `.env.local`:

   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. The app maintains a set of documents in `src/data/documents.ts`
2. When a user sends a message, it's forwarded to Claude along with the document context
3. Claude processes the query and returns responses with precise citations
4. Citations are displayed inline and link to the source documents
5. Clicking a citation opens the source document with the cited text highlighted

If you'd like to test on your own documents, simply update the content of `src/data/documents.ts`

## Project Structure

Built using Next.js, Tailwind CSS, and Anthropic's Claude API.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
