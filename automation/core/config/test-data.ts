import {readFileSync} from "node:fs";
import {resolve} from "node:path";

export function loadJson<T>(relativePath:string):T{
  return JSON.parse(readFileSync(resolve(process.cwd(),"automation",relativePath),"utf8")) as T;
}
