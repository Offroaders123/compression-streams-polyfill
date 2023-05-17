import { AsyncDeflate, AsyncGzip, AsyncZlib, AsyncInflate, AsyncGunzip, AsyncUnzlib, AsyncFlateStreamHandler } from "fflate";

const COMPRESSORS = {
  "gzip": AsyncGzip,
  "deflate": AsyncZlib,
  "deflate-raw": AsyncDeflate
} as const;

const DECOMPRESSORS = {
  "gzip": AsyncGunzip,
  "deflate": AsyncUnzlib,
  "deflate-raw": AsyncInflate
} as const;

interface BaseStream {
  ondata: AsyncFlateStreamHandler;
  push(chunk: Uint8Array, final?: boolean): void;
}

interface BaseStreamConstructor {
  new (): BaseStream;
}

function makeMulti(TransformStreamBase: typeof TransformStream, processors: Record<CompressionFormat, BaseStreamConstructor>, name: string): CompressionStreamConstructor {
  class BaseCompressionStream extends TransformStreamBase<BufferSource, Uint8Array> {
    constructor(format: CompressionFormat) {
      if (!arguments.length) {
        throw new TypeError(`Failed to construct '${name}': 1 argument required, but only 0 present.`);
      }

      const Processor = processors[format];
      if (!Processor) {
        throw new TypeError(`Failed to construct '${name}': Unsupported compression format: '${format}'`)
      }

      let compressor = new Processor();

      super({
        start(controller) {
          compressor.ondata = (error,data,final) => {
            if (error){
              controller.error(error);
            } else if (data){
              controller.enqueue(data);
              if (final) controller.terminate();
            }
          }
        },
        transform(chunk) {
          if (chunk instanceof ArrayBuffer){
            chunk = new Uint8Array(chunk);
          } else if (ArrayBuffer.isView(chunk)){
            chunk = new Uint8Array(chunk.buffer,chunk.byteOffset,chunk.byteLength);
          } else {
            throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
          }
          compressor.push(chunk as Uint8Array);
        },
        flush() {
          compressor.push(new Uint8Array(0),true);
        }
      },
      {
        size(chunk) {
          return chunk.byteLength | 0;
        },
        highWaterMark: 65536
      })
    }
  }

  return BaseCompressionStream;
}

export function makeCompressionStream(TransformStreamBase: typeof TransformStream): CompressionStreamConstructor {
  return class CompressionStream extends makeMulti(TransformStreamBase,COMPRESSORS,"CompressionStream") {}
}

export function makeDecompressionStream(TransformStreamBase: typeof TransformStream): DecompressionStreamConstructor {
  return class DeompressionStream extends makeMulti(TransformStreamBase,DECOMPRESSORS,"DecompressionStream") {}
}