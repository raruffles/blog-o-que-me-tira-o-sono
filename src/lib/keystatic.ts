import { createReader } from '@keystatic/core/reader';
import { fileURLToPath } from 'node:url';
import keystaticConfig from '../../keystatic.config.ts';

const projectRoot = fileURLToPath(new URL('../../', import.meta.url));

export const keystaticReader = createReader(projectRoot, keystaticConfig);