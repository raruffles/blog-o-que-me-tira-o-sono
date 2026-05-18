import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config.ts';

const projectRoot = process.cwd();

export const keystaticReader = createReader(projectRoot, keystaticConfig);