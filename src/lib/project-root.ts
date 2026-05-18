import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const candidates = [
	path.resolve(here, '..', '..', '..'),
	process.cwd(),
	path.resolve(process.cwd(), '..'),
	path.resolve(process.cwd(), '..', '..'),
];

export const projectRoot = candidates.find((candidate) =>
	fs.existsSync(path.join(candidate, 'src', 'content', 'blog')) &&
	fs.existsSync(path.join(candidate, 'src', 'content', 'categories')),
) ?? path.resolve(here, '..', '..', '..');
