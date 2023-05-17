declare global {
  type CompressionFormat = "deflate" | "deflate-raw" | "gzip";

  interface CompressionStream {
    readable: ReadableStream<Uint8Array>;
    writable: WritableStream<BufferSource>;
  }

  interface CompressionStreamConstructor {
    new (format: CompressionFormat): CompressionStream;
    prototype: CompressionStream;
  }

  var CompressionStream: CompressionStreamConstructor;

  interface DecompressionStream {
    readable: ReadableStream<Uint8Array>;
    writable: WritableStream<BufferSource>;
  }

  interface DecompressionStreamConstructor {
    new (format: CompressionFormat): DecompressionStream;
    prototype: DecompressionStream;
  }

  var DecompressionStream: DecompressionStreamConstructor;
}

export {};