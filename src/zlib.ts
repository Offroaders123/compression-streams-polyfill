import { compress, decompress } from "./compression.js";

export async function deflate(data: BufferSource): Promise<Uint8Array> {
  return compress(data,"deflate");
}

export async function deflateRaw(data: BufferSource): Promise<Uint8Array> {
  return compress(data,"deflate-raw");
}

export async function gzip(data: BufferSource): Promise<Uint8Array> {
  return compress(data,"gzip");
}

export async function inflate(data: BufferSource): Promise<Uint8Array> {
  return decompress(data,"deflate");
}

export async function inflateRaw(data: BufferSource): Promise<Uint8Array> {
  return decompress(data,"deflate-raw");
}

export async function gunzip(data: BufferSource): Promise<Uint8Array> {
  return decompress(data,"gzip");
}