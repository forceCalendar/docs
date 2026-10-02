import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// The built-in search dialog requests /api/search. Index only public docs.
export const { GET } = createFromSource(source);
