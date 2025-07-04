// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v3.19.1
// source: slash.proto

/* eslint-disable */
import { Empty, StringRequest } from "./common";

/** SlashService provides methods for managing slash */
export type SlashServiceDefinition = typeof SlashServiceDefinition;
export const SlashServiceDefinition = {
  name: "SlashService",
  fullName: "codai.SlashService",
  methods: {
    /** Sends button click message */
    reportBug: {
      name: "reportBug",
      requestType: StringRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
    condense: {
      name: "condense",
      requestType: StringRequest,
      requestStream: false,
      responseType: Empty,
      responseStream: false,
      options: {},
    },
  },
} as const;
