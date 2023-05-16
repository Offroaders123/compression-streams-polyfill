export type CompressionFormat = "gzip" | "deflate" | "deflate-raw";

export interface CompressionStream extends TransformStream<BufferSource, Uint8Array> {}

export interface CompressionStreamConstructor {
  new (format: CompressionFormat): CompressionStream;
  prototype: CompressionStream;
}

export interface DecompressionStream extends TransformStream<BufferSource, Uint8Array> {}

export interface DecompressionStreamConstructor {
  new (format: CompressionFormat): DecompressionStream;
  prototype: DecompressionStream;
}