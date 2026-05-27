import { schema } from '../db/index.js';
import { makeListHandler } from './_lib/list.js';
export default makeListHandler(schema.properties);
