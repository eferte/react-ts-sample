import { isFunction } from "_common/type/util";

export function getUrlParams(search: string) {
  return `${search}?`
    .split("?")[1]
    .split("&")
    .reduce((params: object, pair: string) => {
      const [key, value] = `${pair}=`.split("=").map(decodeURIComponent);
      return key.length > 0 ? { ...params, [key]: value } : params;
    }, {});
}

export const tryDecodeUri = (uri: string, defaultValue: string = uri): string => {
  try {
    return decodeURI(uri);
  } catch (e) {
    return defaultValue;
  }
};

export function later(durationMsOrPredicat: (number | (()=>boolean)) = 10) {
  if (isFunction(durationMsOrPredicat)) {
    return new Promise(async (resolve, reject) => {
      let cpt = 0;
      
      while (!durationMsOrPredicat()) {
        cpt++;
        await later(500);
        if (cpt > 1000) {
          reject();
        }
      }
      resolve();
    });
   
  } else {
    return new Promise((resolve) => {
      setTimeout(resolve, durationMsOrPredicat);
    });
  }
  
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function guid() {
  // source : https://blogs.cozi.com/tech/2010/04/generating-uuids-in-javascript.html
  // avec ajout de la date en plus :-)
  let uuid = new Array(36);
  const data = [
    Math.floor(0x100000000 * Math.random()) & 0xffffffff,
    (Math.floor(0x100000000 * Math.random()) & 0xffff0fff) | (4 << 12), // version (1-5)
    (Math.floor(0x100000000 * Math.random()) & 0x3fffffff) | 0x80000000, // rfc 4122 variant
    Math.floor(0x100000000 * Math.random()) & 0xffffffff,
    new Date().getTime(),
  ];
  for (let i = 0, k = 0; i < 5; i++) {
    var rnd = data[i];
    for (let j = 0; j < 8; j++) {
      if (k === 8 || k === 13 || k === 18 || k === 23) {
        uuid[k++] = "-";
      }
      let r = (rnd >>> 28) & 0xf; // Take the high-order nybble
      rnd = (rnd & 0x0fffffff) << 4;
      uuid[k++] = "0123456789abcdef".charAt(r);
    }
  }
  return uuid.join("");
}
export function randomInt() {
  return Math.floor(0x100000000 * Math.random());
}

export function isUndefinedOrEmpty(value: any) {
  return value === undefined || value === null || value === "";
}

export function escapeRegExp(s: string): string {
  return s.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
}
export function replaceAll(str: string, toFind: string, toReplace: string): string {
  return str.replace(new RegExp(escapeRegExp(toFind), "g"), toReplace);
}
export function truncate(str: string, length?: number, ending?: string): string {
  // source : https://www.w3resource.com/javascript-exercises/javascript-string-exercise-16.php
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}

export function parseIntOrElse(value: string, defaultValue: number): number {
  const res = parseInt(value);
  if (isNaN(res)) {
    return defaultValue;
  }
  return res;
}
