/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.15.6
 * source: common/state.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export namespace common.state {
    export class Meta extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            protocol?: Meta.Protocol;
            timestamp?: string;
            proof_type?: string;
            serialization_format?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("protocol" in data && data.protocol != undefined) {
                    this.protocol = data.protocol;
                }
                if ("timestamp" in data && data.timestamp != undefined) {
                    this.timestamp = data.timestamp;
                }
                if ("proof_type" in data && data.proof_type != undefined) {
                    this.proof_type = data.proof_type;
                }
                if ("serialization_format" in data && data.serialization_format != undefined) {
                    this.serialization_format = data.serialization_format;
                }
            }
        }
        get protocol() {
            return pb_1.Message.getFieldWithDefault(this, 1, Meta.Protocol.BITCOIN) as Meta.Protocol;
        }
        set protocol(value: Meta.Protocol) {
            pb_1.Message.setField(this, 1, value);
        }
        get timestamp() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set timestamp(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get proof_type() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set proof_type(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get serialization_format() {
            return pb_1.Message.getFieldWithDefault(this, 4, "") as string;
        }
        set serialization_format(value: string) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            protocol?: Meta.Protocol;
            timestamp?: string;
            proof_type?: string;
            serialization_format?: string;
        }): Meta {
            const message = new Meta({});
            if (data.protocol != null) {
                message.protocol = data.protocol;
            }
            if (data.timestamp != null) {
                message.timestamp = data.timestamp;
            }
            if (data.proof_type != null) {
                message.proof_type = data.proof_type;
            }
            if (data.serialization_format != null) {
                message.serialization_format = data.serialization_format;
            }
            return message;
        }
        toObject() {
            const data: {
                protocol?: Meta.Protocol;
                timestamp?: string;
                proof_type?: string;
                serialization_format?: string;
            } = {};
            if (this.protocol != null) {
                data.protocol = this.protocol;
            }
            if (this.timestamp != null) {
                data.timestamp = this.timestamp;
            }
            if (this.proof_type != null) {
                data.proof_type = this.proof_type;
            }
            if (this.serialization_format != null) {
                data.serialization_format = this.serialization_format;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.protocol != Meta.Protocol.BITCOIN)
                writer.writeEnum(1, this.protocol);
            if (this.timestamp.length)
                writer.writeString(2, this.timestamp);
            if (this.proof_type.length)
                writer.writeString(3, this.proof_type);
            if (this.serialization_format.length)
                writer.writeString(4, this.serialization_format);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Meta {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Meta();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.protocol = reader.readEnum();
                        break;
                    case 2:
                        message.timestamp = reader.readString();
                        break;
                    case 3:
                        message.proof_type = reader.readString();
                        break;
                    case 4:
                        message.serialization_format = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): Meta {
            return Meta.deserialize(bytes);
        }
    }
    export namespace Meta {
        export enum Protocol {
            BITCOIN = 0,
            ETHEREUM = 1,
            FABRIC = 3,
            CORDA = 4
        }
    }
    export class View extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            meta?: Meta;
            data?: Uint8Array;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("meta" in data && data.meta != undefined) {
                    this.meta = data.meta;
                }
                if ("data" in data && data.data != undefined) {
                    this.data = data.data;
                }
            }
        }
        get meta() {
            return pb_1.Message.getWrapperField(this, Meta, 1) as Meta;
        }
        set meta(value: Meta) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_meta() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get data() {
            return pb_1.Message.getFieldWithDefault(this, 2, new Uint8Array(0)) as Uint8Array;
        }
        set data(value: Uint8Array) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data: {
            meta?: ReturnType<typeof Meta.prototype.toObject>;
            data?: Uint8Array;
        }): View {
            const message = new View({});
            if (data.meta != null) {
                message.meta = Meta.fromObject(data.meta);
            }
            if (data.data != null) {
                message.data = data.data;
            }
            return message;
        }
        toObject() {
            const data: {
                meta?: ReturnType<typeof Meta.prototype.toObject>;
                data?: Uint8Array;
            } = {};
            if (this.meta != null) {
                data.meta = this.meta.toObject();
            }
            if (this.data != null) {
                data.data = this.data;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_meta)
                writer.writeMessage(1, this.meta, () => this.meta.serialize(writer));
            if (this.data.length)
                writer.writeBytes(2, this.data);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): View {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new View();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.meta, () => message.meta = Meta.deserialize(reader));
                        break;
                    case 2:
                        message.data = reader.readBytes();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): View {
            return View.deserialize(bytes);
        }
    }
    export class ViewPayload extends pb_1.Message {
        #one_of_decls: number[][] = [[2, 3]];
        constructor(data?: any[] | ({
            request_id?: string;
        } & (({
            view?: View;
            error?: never;
        } | {
            view?: never;
            error?: string;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("request_id" in data && data.request_id != undefined) {
                    this.request_id = data.request_id;
                }
                if ("view" in data && data.view != undefined) {
                    this.view = data.view;
                }
                if ("error" in data && data.error != undefined) {
                    this.error = data.error;
                }
            }
        }
        get request_id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set request_id(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get view() {
            return pb_1.Message.getWrapperField(this, View, 2) as View;
        }
        set view(value: View) {
            pb_1.Message.setOneofWrapperField(this, 2, this.#one_of_decls[0], value);
        }
        get has_view() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get error() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set error(value: string) {
            pb_1.Message.setOneofField(this, 3, this.#one_of_decls[0], value);
        }
        get has_error() {
            return pb_1.Message.getField(this, 3) != null;
        }
        get state() {
            const cases: {
                [index: number]: "none" | "view" | "error";
            } = {
                0: "none",
                2: "view",
                3: "error"
            };
            return cases[pb_1.Message.computeOneofCase(this, [2, 3])];
        }
        static fromObject(data: {
            request_id?: string;
            view?: ReturnType<typeof View.prototype.toObject>;
            error?: string;
        }): ViewPayload {
            const message = new ViewPayload({});
            if (data.request_id != null) {
                message.request_id = data.request_id;
            }
            if (data.view != null) {
                message.view = View.fromObject(data.view);
            }
            if (data.error != null) {
                message.error = data.error;
            }
            return message;
        }
        toObject() {
            const data: {
                request_id?: string;
                view?: ReturnType<typeof View.prototype.toObject>;
                error?: string;
            } = {};
            if (this.request_id != null) {
                data.request_id = this.request_id;
            }
            if (this.view != null) {
                data.view = this.view.toObject();
            }
            if (this.error != null) {
                data.error = this.error;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.request_id.length)
                writer.writeString(1, this.request_id);
            if (this.has_view)
                writer.writeMessage(2, this.view, () => this.view.serialize(writer));
            if (this.has_error)
                writer.writeString(3, this.error);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ViewPayload {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ViewPayload();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.request_id = reader.readString();
                        break;
                    case 2:
                        reader.readMessage(message.view, () => message.view = View.deserialize(reader));
                        break;
                    case 3:
                        message.error = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): ViewPayload {
            return ViewPayload.deserialize(bytes);
        }
    }
    export class RequestState extends pb_1.Message {
        #one_of_decls: number[][] = [[3, 4]];
        constructor(data?: any[] | ({
            request_id?: string;
            status?: RequestState.STATUS;
        } & (({
            view?: View;
            error?: never;
        } | {
            view?: never;
            error?: string;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("request_id" in data && data.request_id != undefined) {
                    this.request_id = data.request_id;
                }
                if ("status" in data && data.status != undefined) {
                    this.status = data.status;
                }
                if ("view" in data && data.view != undefined) {
                    this.view = data.view;
                }
                if ("error" in data && data.error != undefined) {
                    this.error = data.error;
                }
            }
        }
        get request_id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set request_id(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get status() {
            return pb_1.Message.getFieldWithDefault(this, 2, RequestState.STATUS.PENDING_ACK) as RequestState.STATUS;
        }
        set status(value: RequestState.STATUS) {
            pb_1.Message.setField(this, 2, value);
        }
        get view() {
            return pb_1.Message.getWrapperField(this, View, 3) as View;
        }
        set view(value: View) {
            pb_1.Message.setOneofWrapperField(this, 3, this.#one_of_decls[0], value);
        }
        get has_view() {
            return pb_1.Message.getField(this, 3) != null;
        }
        get error() {
            return pb_1.Message.getFieldWithDefault(this, 4, "") as string;
        }
        set error(value: string) {
            pb_1.Message.setOneofField(this, 4, this.#one_of_decls[0], value);
        }
        get has_error() {
            return pb_1.Message.getField(this, 4) != null;
        }
        get state() {
            const cases: {
                [index: number]: "none" | "view" | "error";
            } = {
                0: "none",
                3: "view",
                4: "error"
            };
            return cases[pb_1.Message.computeOneofCase(this, [3, 4])];
        }
        static fromObject(data: {
            request_id?: string;
            status?: RequestState.STATUS;
            view?: ReturnType<typeof View.prototype.toObject>;
            error?: string;
        }): RequestState {
            const message = new RequestState({});
            if (data.request_id != null) {
                message.request_id = data.request_id;
            }
            if (data.status != null) {
                message.status = data.status;
            }
            if (data.view != null) {
                message.view = View.fromObject(data.view);
            }
            if (data.error != null) {
                message.error = data.error;
            }
            return message;
        }
        toObject() {
            const data: {
                request_id?: string;
                status?: RequestState.STATUS;
                view?: ReturnType<typeof View.prototype.toObject>;
                error?: string;
            } = {};
            if (this.request_id != null) {
                data.request_id = this.request_id;
            }
            if (this.status != null) {
                data.status = this.status;
            }
            if (this.view != null) {
                data.view = this.view.toObject();
            }
            if (this.error != null) {
                data.error = this.error;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.request_id.length)
                writer.writeString(1, this.request_id);
            if (this.status != RequestState.STATUS.PENDING_ACK)
                writer.writeEnum(2, this.status);
            if (this.has_view)
                writer.writeMessage(3, this.view, () => this.view.serialize(writer));
            if (this.has_error)
                writer.writeString(4, this.error);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RequestState {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RequestState();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.request_id = reader.readString();
                        break;
                    case 2:
                        message.status = reader.readEnum();
                        break;
                    case 3:
                        reader.readMessage(message.view, () => message.view = View.deserialize(reader));
                        break;
                    case 4:
                        message.error = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): RequestState {
            return RequestState.deserialize(bytes);
        }
    }
    export namespace RequestState {
        export enum STATUS {
            PENDING_ACK = 0,
            PENDING = 1,
            ERROR = 2,
            COMPLETED = 3
        }
    }
}
