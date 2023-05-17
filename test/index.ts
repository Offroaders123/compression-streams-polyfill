import { gzip, gunzip } from "../src/index.js";

const data = new Uint8Array(Array.from({ length: 0x10000 },() => Math.floor(Math.random() * 10)));
console.log(data,"\n");

console.time();
const zipped = await gzip(data);
console.timeEnd();
console.log(zipped);

console.time();
const unzipped = await gunzip(zipped);
console.timeEnd();
console.log(unzipped);