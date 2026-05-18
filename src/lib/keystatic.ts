import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config.ts';
import { projectRoot } from './project-root.ts';

export const keystaticReader = createReader(projectRoot, keystaticConfig);