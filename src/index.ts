import { makeCompressionStream, makeDecompressionStream } from "./ponyfill.js";

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