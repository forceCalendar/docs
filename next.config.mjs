import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Bound MDX prerender workers so the full reference builds on small CI runners.
  experimental: { cpus: 2 },
};

const withMDX = createMDX();

export default withMDX(config);
