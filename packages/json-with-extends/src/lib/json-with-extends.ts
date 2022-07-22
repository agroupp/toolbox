import { readFile } from 'fs/promises';
import { dirname, join } from 'path';

// eslint-disable-next-line no-useless-escape
const COMMENTS_REMOVAL_REGEX = new RegExp(/((?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:\/\/.*))/, 'ig');
const DEFAULT_EXTENDS_SCHEMA_KEY = 'extends';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ParsedJSON = Record<string, any>;

export async function parseJson(
  path: string,
  child?: ParsedJSON,
  extendsKey = DEFAULT_EXTENDS_SCHEMA_KEY,
): Promise<ParsedJSON> {
  try {
    let jsonString = await readFile(path, { encoding: 'utf8' });
    jsonString = jsonString.replace(COMMENTS_REMOVAL_REGEX, '');
    let parsedJson = JSON.parse(jsonString) as ParsedJSON;

    if (child) {
      parsedJson = Object.assign(parsedJson, child);
    }

    if (extendsKey in parsedJson) {
      const parentPath = join(dirname(path), parsedJson[extendsKey]);

      delete parsedJson[extendsKey];
      return await parseJson(parentPath, parsedJson);
    }

    return parsedJson;
  } catch (err) {
    throw new Error(`Hardhat config file ${path} corrupted or doesn't exist. Error: ${err}`);
  }
}
