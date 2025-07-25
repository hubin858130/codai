// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v3.19.1
// source: checkpoints.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Empty, Int64Request, Metadata } from "./common";

export interface CheckpointRestoreRequest {
  metadata?: Metadata | undefined;
  number: number;
  restoreType: string;
  offset?: number | undefined;
}

function createBaseCheckpointRestoreRequest(): CheckpointRestoreRequest {
  return { metadata: undefined, number: 0, restoreType: "", offset: undefined };
}

export const CheckpointRestoreRequest: MessageFns<CheckpointRestoreRequest> = {
  encode(message: CheckpointRestoreRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(10).fork()).join();
    }
    if (message.number !== 0) {
      writer.uint32(16).int64(message.number);
    }
    if (message.restoreType !== "") {
      writer.uint32(26).string(message.restoreType);
    }
    if (message.offset !== undefined) {
      writer.uint32(32).int64(message.offset);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CheckpointRestoreRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckpointRestoreRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.metadata = Metadata.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.number = longToNumber(reader.int64());
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.restoreType = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }

          message.offset = longToNumber(reader.int64());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CheckpointRestoreRequest {
    return {
      metadata: isSet(object.metadata) ? Metadata.fromJSON(object.metadata) : undefined,
      number: isSet(object.number) ? globalThis.Number(object.number) : 0,
      restoreType: isSet(object.restoreType) ? globalThis.String(object.restoreType) : "",
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : undefined,
    };
  },

  toJSON(message: CheckpointRestoreRequest): unknown {
    const obj: any = {};
    if (message.metadata !== undefined) {
      obj.metadata = Metadata.toJSON(message.metadata);
    }
    if (message.number !== 0) {
      obj.number = Math.round(message.number);
    }
    if (message.restoreType !== "") {
      obj.restoreType = message.restoreType;
    }
    if (message.offset !== undefined) {
      obj.offset = Math.round(message.offset);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CheckpointRestoreRequest>, I>>(base?: I): CheckpointRestoreRequest {
    return CheckpointRestoreRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CheckpointRestoreRequest>, I>>(object: I): CheckpointRestoreRequest {
    const message = createBaseCheckpointRestoreRequest();
    message.metadata = (object.metadata !== undefined && object.metadata !== null)
      ? Metadata.fromPartial(object.metadata)
      : undefined;
    message.number = object.number ?? 0;
    message.restoreType = object.restoreType ?? "";
    message.offset = object.offset ?? undefined;
    return message;
  },
};

export type CheckpointsServiceDefinition = typeof CheckpointsServiceDefinition;
export const CheckpointsServiceDefinition = {
  name: "CheckpointsService",
  fullName: "codai.CheckpointsService",
  methods: {
    checkpointDiff: {
      name: "checkpointDiff",
      requestType: Int64Request,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    checkpointRestore: {
      name: "checkpointRestore",
      requestType: CheckpointRestoreRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
