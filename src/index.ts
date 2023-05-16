import { makeCompressionStream, makeDecompressionStream } from "./ponyfill.js";

import type { CompressionStreamConstructor, DecompressionStreamConstructor } from "./types.js";

declare global {
  var CompressionStream: CompressionStreamConstructor;
  var DecompressionStream: DecompressionStreamConstructor;
}

const CompressionStream = makeCompressionStream(TransformStream);
const DecompressionStream = makeDecompressionStream(TransformStream);

try {
  new CompressionStream("deflate-raw");
} catch {
  globalThis.CompressionStream = CompressionStream;
}

try {
  new DecompressionStream("deflate-raw");
} catch {
  globalThis.DecompressionStream = DecompressionStream;
}