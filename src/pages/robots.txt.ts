import type { APIRoute } from 'astro';

// https://docs.astro.build/en/guides/server-side-rendering/#opting-out-of-pre-rendering-in-hybrid-mode
export const prerender = false;

const env = import.meta.env;

const allowRobots = `# Allow all robots
User-agent: *
Allow: /
`;

const disallowRobots = `# Disallow all robots
User-agent: *
Disallow: /
`;

export const GET: APIRoute = async ({ url }) => {
  const { hostname } = url;
  const isNetlify = hostname.includes('netlify.app');
  const isProd = env.PROD;
  const isAllowed = isProd && !isNetlify;

  const body = isAllowed ? allowRobots : disallowRobots;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
