import { Base64 } from 'js-base64';
import { MetaContentParam } from '../generated/graphql';

export type Params = MetaContentParam[] | undefined | null;

export default (params: Params, name: string): string => Base64
  .fromBase64(params?.find((i) => i.name === name)?.value || '')
  .replace(/^"(.+(?="$))"$/, '$1')
  .replace(/\\"/g, '"')
  .replace(/\\n|\\r/g, ' ');
