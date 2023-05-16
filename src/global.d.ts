import type { CompressionStreamConstructor, DecompressionStreamConstructor } from "./types.js";

declare global {
  var CompressionStream: CompressionStreamConstructor;
  var DecompressionStream: DecompressionStreamConstructor;
}