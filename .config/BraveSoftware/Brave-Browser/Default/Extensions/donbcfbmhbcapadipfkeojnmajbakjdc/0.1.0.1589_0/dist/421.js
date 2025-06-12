"use strict";
(self["webpackChunkruffle_extension"] = self["webpackChunkruffle_extension"] || []).push([[421],{

/***/ 421:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  IntoUnderlyingByteSource: () => (/* binding */ IntoUnderlyingByteSource),
  IntoUnderlyingSink: () => (/* binding */ IntoUnderlyingSink),
  IntoUnderlyingSource: () => (/* binding */ IntoUnderlyingSource),
  RuffleHandle: () => (/* binding */ RuffleHandle),
  RuffleInstanceBuilder: () => (/* binding */ RuffleInstanceBuilder),
  ZipWriter: () => (/* binding */ ZipWriter),
  "default": () => (/* binding */ ruffle_web),
  global_init: () => (/* binding */ global_init),
  initSync: () => (/* binding */ initSync)
});

;// ../core/dist/ruffle-imports.js
/**
 * Functions imported from JS into Ruffle.
 *
 * @ignore
 * @internal
 */
/**
 * Copies interleaved stereo audio data into an `AudioBuffer`.
 *
 * @internal
 */
function copyToAudioBufferInterleaved(audioBuffer, interleavedData) {
    const numSamples = audioBuffer.length;
    const leftBuffer = audioBuffer.getChannelData(0);
    const rightBuffer = audioBuffer.getChannelData(1);
    let i = 0;
    let sample = 0;
    while (sample < numSamples) {
        leftBuffer[sample] = interleavedData[i];
        rightBuffer[sample] = interleavedData[i + 1];
        sample++;
        i += 2;
    }
}
/**
 * Performs the ActionScript `ExternalInterface.call(name, ...values)`
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function callExternalInterface(name, args) {
    // [NA] Yes, this is indirect eval. Yes, this is a Bad Thing when it comes to security.
    // In fact, yes this is vulnerable to an XSS attack!
    // But plot twist: Flash allowed for this and many games *rely on it*. :(
    // Flash content can do `call("eval", "....")` regardless, this doesn't enable anything that wasn't already permitted.
    // It just goes against what the documentation says, and *looks* really suspicious.
    // Content can only run this if the website has enabled `allowScriptAccess`, so it has to be enabled by the website too.
    return new Function(`return (${name})(...arguments);`)(...args);
}

;// ../core/dist/ruffle_web.js


const lAudioContext = (typeof AudioContext !== 'undefined' ? AudioContext : (typeof webkitAudioContext !== 'undefined' ? webkitAudioContext : undefined));
let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_export_2.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

let cachedFloat32ArrayMemory0 = null;

function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedInt32ArrayMemory0 = null;

function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedFloat64ArrayMemory0 = null;

function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

let cachedUint8ClampedArrayMemory0 = null;

function getUint8ClampedArrayMemory0() {
    if (cachedUint8ClampedArrayMemory0 === null || cachedUint8ClampedArrayMemory0.byteLength === 0) {
        cachedUint8ClampedArrayMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachedUint8ClampedArrayMemory0;
}

function getClampedArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ClampedArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_7.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_7.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function makeClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        try {
            return f(state.a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_7.get(state.dtor)(state.a, state.b);
                state.a = 0;
                CLOSURE_DTORS.unregister(state);
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_2.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function global_init() {
    wasm.global_init();
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
function __wbg_adapter_40(arg0, arg1, arg2) {
    wasm.closure327_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_53(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h8361a84ccf774df6(arg0, arg1, arg2);
}

function __wbg_adapter_56(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hb759e426e56d7add(arg0, arg1);
}

function __wbg_adapter_59(arg0, arg1, arg2) {
    wasm.closure1318_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_64(arg0, arg1) {
    wasm._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hfe402f2efa884b19(arg0, arg1);
}

function __wbg_adapter_69(arg0, arg1, arg2) {
    wasm.closure1346_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_74(arg0, arg1, arg2) {
    wasm.closure6652_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_1791(arg0, arg1, arg2, arg3) {
    wasm.closure8078_externref_shim(arg0, arg1, arg2, arg3);
}

const __wbindgen_enum_BinaryType = ["blob", "arraybuffer"];

const __wbindgen_enum_CanvasWindingRule = ["nonzero", "evenodd"];

const __wbindgen_enum_CodecState = ["unconfigured", "configured", "closed"];

const __wbindgen_enum_EncodedVideoChunkType = ["key", "delta"];

const __wbindgen_enum_GpuAddressMode = ["clamp-to-edge", "repeat", "mirror-repeat"];

const __wbindgen_enum_GpuBlendFactor = ["zero", "one", "src", "one-minus-src", "src-alpha", "one-minus-src-alpha", "dst", "one-minus-dst", "dst-alpha", "one-minus-dst-alpha", "src-alpha-saturated", "constant", "one-minus-constant", "src1", "one-minus-src1", "src1-alpha", "one-minus-src1-alpha"];

const __wbindgen_enum_GpuBlendOperation = ["add", "subtract", "reverse-subtract", "min", "max"];

const __wbindgen_enum_GpuBufferBindingType = ["uniform", "storage", "read-only-storage"];

const __wbindgen_enum_GpuCanvasAlphaMode = ["opaque", "premultiplied"];

const __wbindgen_enum_GpuCompareFunction = ["never", "less", "equal", "less-equal", "greater", "not-equal", "greater-equal", "always"];

const __wbindgen_enum_GpuCullMode = ["none", "front", "back"];

const __wbindgen_enum_GpuFilterMode = ["nearest", "linear"];

const __wbindgen_enum_GpuFrontFace = ["ccw", "cw"];

const __wbindgen_enum_GpuIndexFormat = ["uint16", "uint32"];

const __wbindgen_enum_GpuLoadOp = ["load", "clear"];

const __wbindgen_enum_GpuMipmapFilterMode = ["nearest", "linear"];

const __wbindgen_enum_GpuPowerPreference = ["low-power", "high-performance"];

const __wbindgen_enum_GpuPrimitiveTopology = ["point-list", "line-list", "line-strip", "triangle-list", "triangle-strip"];

const __wbindgen_enum_GpuSamplerBindingType = ["filtering", "non-filtering", "comparison"];

const __wbindgen_enum_GpuStencilOperation = ["keep", "zero", "replace", "invert", "increment-clamp", "decrement-clamp", "increment-wrap", "decrement-wrap"];

const __wbindgen_enum_GpuStorageTextureAccess = ["write-only", "read-only", "read-write"];

const __wbindgen_enum_GpuStoreOp = ["store", "discard"];

const __wbindgen_enum_GpuTextureAspect = ["all", "stencil-only", "depth-only"];

const __wbindgen_enum_GpuTextureDimension = ["1d", "2d", "3d"];

const __wbindgen_enum_GpuTextureFormat = ["r8unorm", "r8snorm", "r8uint", "r8sint", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32uint", "r32sint", "r32float", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb9e5ufloat", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rg32uint", "rg32sint", "rg32float", "rgba16uint", "rgba16sint", "rgba16float", "rgba32uint", "rgba32sint", "rgba32float", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"];

const __wbindgen_enum_GpuTextureSampleType = ["float", "unfilterable-float", "depth", "sint", "uint"];

const __wbindgen_enum_GpuTextureViewDimension = ["1d", "2d", "2d-array", "cube", "cube-array", "3d"];

const __wbindgen_enum_GpuVertexFormat = ["uint8", "uint8x2", "uint8x4", "sint8", "sint8x2", "sint8x4", "unorm8", "unorm8x2", "unorm8x4", "snorm8", "snorm8x2", "snorm8x4", "uint16", "uint16x2", "uint16x4", "sint16", "sint16x2", "sint16x4", "unorm16", "unorm16x2", "unorm16x4", "snorm16", "snorm16x2", "snorm16x4", "float16", "float16x2", "float16x4", "float32", "float32x2", "float32x3", "float32x4", "uint32", "uint32x2", "uint32x3", "uint32x4", "sint32", "sint32x2", "sint32x3", "sint32x4", "unorm10-10-10-2", "unorm8x4-bgra"];

const __wbindgen_enum_GpuVertexStepMode = ["vertex", "instance"];

const __wbindgen_enum_ReadableStreamType = ["bytes"];

const __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];

const __wbindgen_enum_VideoPixelFormat = ["I420", "I420A", "I422", "I444", "NV12", "RGBA", "RGBX", "BGRA", "BGRX"];

const IntoUnderlyingByteSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));

class IntoUnderlyingByteSource {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingByteSourceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
    }
    /**
     * @returns {ReadableStreamType}
     */
    get type() {
        const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
        return __wbindgen_enum_ReadableStreamType[ret];
    }
    /**
     * @returns {number}
     */
    get autoAllocateChunkSize() {
        const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {ReadableByteStreamController} controller
     */
    start(controller) {
        wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
    }
    /**
     * @param {ReadableByteStreamController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
        return ret;
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingbytesource_cancel(ptr);
    }
}

const IntoUnderlyingSinkFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1));

class IntoUnderlyingSink {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSinkFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsink_free(ptr, 0);
    }
    /**
     * @param {any} chunk
     * @returns {Promise<any>}
     */
    write(chunk) {
        const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
        return ret;
    }
    /**
     * @returns {Promise<any>}
     */
    close() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_close(ptr);
        return ret;
    }
    /**
     * @param {any} reason
     * @returns {Promise<any>}
     */
    abort(reason) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.intounderlyingsink_abort(ptr, reason);
        return ret;
    }
}

const IntoUnderlyingSourceFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1));

class IntoUnderlyingSource {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        IntoUnderlyingSourceFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_intounderlyingsource_free(ptr, 0);
    }
    /**
     * @param {ReadableStreamDefaultController} controller
     * @returns {Promise<any>}
     */
    pull(controller) {
        const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
        return ret;
    }
    cancel() {
        const ptr = this.__destroy_into_raw();
        wasm.intounderlyingsource_cancel(ptr);
    }
}

const RuffleHandleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rufflehandle_free(ptr >>> 0, 1));
/**
 * r" An opaque handle to a `RuffleInstance` inside the pool.
 * r"
 * r" This type is exported to JS, and is used to interact with the library.
 */
class RuffleHandle {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RuffleHandle.prototype);
        obj.__wbg_ptr = ptr;
        RuffleHandleFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RuffleHandleFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rufflehandle_free(ptr, 0);
    }
    /**
     * Stream an arbitrary movie file from (presumably) the Internet.
     *
     * This method should only be called once per player.
     *
     * `parameters` are *extra* parameters to set on the LoaderInfo -
     * parameters from `movie_url` query parameters will be automatically added.
     * @param {string} movie_url
     * @param {any} parameters
     */
    stream_from(movie_url, parameters) {
        const ptr0 = passStringToWasm0(movie_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rufflehandle_stream_from(this.__wbg_ptr, ptr0, len0, parameters);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Play an arbitrary movie on this instance.
     *
     * This method should only be called once per player.
     * @param {Uint8Array} swf_data
     * @param {any} parameters
     * @param {string} swf_name
     */
    load_data(swf_data, parameters, swf_name) {
        const ptr0 = passStringToWasm0(swf_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.rufflehandle_load_data(this.__wbg_ptr, swf_data, parameters, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    play() {
        wasm.rufflehandle_play(this.__wbg_ptr);
    }
    pause() {
        wasm.rufflehandle_pause(this.__wbg_ptr);
    }
    /**
     * @returns {boolean}
     */
    is_playing() {
        const ret = wasm.rufflehandle_is_playing(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    has_focus() {
        const ret = wasm.rufflehandle_has_focus(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    volume() {
        const ret = wasm.rufflehandle_volume(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} value
     */
    set_volume(value) {
        wasm.rufflehandle_set_volume(this.__wbg_ptr, value);
    }
    /**
     * @returns {any}
     */
    renderer_debug_info() {
        const ret = wasm.rufflehandle_renderer_debug_info(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    renderer_name() {
        const ret = wasm.rufflehandle_renderer_name(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {any}
     */
    prepare_context_menu() {
        const ret = wasm.rufflehandle_prepare_context_menu(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} index
     * @returns {Promise<void>}
     */
    run_context_menu_callback(index) {
        const ret = wasm.rufflehandle_run_context_menu_callback(this.__wbg_ptr, index);
        return ret;
    }
    /**
     * @param {boolean} is_fullscreen
     */
    set_fullscreen(is_fullscreen) {
        wasm.rufflehandle_set_fullscreen(this.__wbg_ptr, is_fullscreen);
    }
    clear_custom_menu_items() {
        wasm.rufflehandle_clear_custom_menu_items(this.__wbg_ptr);
    }
    destroy() {
        wasm.rufflehandle_destroy(this.__wbg_ptr);
    }
    /**
     * @param {string} name
     * @param {any[]} args
     * @returns {any}
     */
    call_exposed_callback(name, args) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayJsValueToWasm0(args, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.rufflehandle_call_exposed_callback(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        return ret;
    }
    /**
     * @param {any} observer
     */
    set_trace_observer(observer) {
        wasm.rufflehandle_set_trace_observer(this.__wbg_ptr, observer);
    }
    /**
     * Returns the web AudioContext used by this player.
     * Returns `None` if the audio backend does not use Web Audio.
     * @returns {AudioContext | undefined}
     */
    audio_context() {
        const ret = wasm.rufflehandle_audio_context(this.__wbg_ptr);
        return ret;
    }
    /**
     * Returns whether the `simd128` target feature was enabled at build time.
     * This is intended to discriminate between the two WebAssembly module
     * versions, one of which uses WebAssembly extensions, and the other one
     * being "vanilla". `simd128` is used as proxy for most extensions, since
     * no other WebAssembly target feature is exposed to `cfg!`.
     * @returns {boolean}
     */
    static is_wasm_simd_used() {
        const ret = wasm.rufflehandle_is_wasm_simd_used();
        return ret !== 0;
    }
}

const RuffleInstanceBuilderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_ruffleinstancebuilder_free(ptr >>> 0, 1));

class RuffleInstanceBuilder {

    toJSON() {
        return {
        };
    }

    toString() {
        return JSON.stringify(this);
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RuffleInstanceBuilderFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ruffleinstancebuilder_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.ruffleinstancebuilder_new();
        this.__wbg_ptr = ret >>> 0;
        RuffleInstanceBuilderFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {boolean} value
     */
    setAllowScriptAccess(value) {
        wasm.ruffleinstancebuilder_setAllowScriptAccess(this.__wbg_ptr, value);
    }
    /**
     * @param {number | null} [value]
     */
    setBackgroundColor(value) {
        wasm.ruffleinstancebuilder_setBackgroundColor(this.__wbg_ptr, isLikeNone(value) ? 0x100000001 : (value) >>> 0);
    }
    /**
     * @param {boolean} value
     */
    setUpgradeToHttps(value) {
        wasm.ruffleinstancebuilder_setUpgradeToHttps(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    setCompatibilityRules(value) {
        wasm.ruffleinstancebuilder_setCompatibilityRules(this.__wbg_ptr, value);
    }
    /**
     * @param {string} value
     */
    setLetterbox(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setLetterbox(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string | null} [value]
     */
    setBaseUrl(value) {
        var ptr0 = isLikeNone(value) ? 0 : passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setBaseUrl(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} value
     */
    setShowMenu(value) {
        wasm.ruffleinstancebuilder_setShowMenu(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    setAllowFullscreen(value) {
        wasm.ruffleinstancebuilder_setAllowFullscreen(this.__wbg_ptr, value);
    }
    /**
     * @param {string} value
     */
    setStageAlign(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setStageAlign(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} value
     */
    setForceAlign(value) {
        wasm.ruffleinstancebuilder_setForceAlign(this.__wbg_ptr, value);
    }
    /**
     * @param {string} value
     */
    setQuality(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setQuality(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} value
     */
    setScale(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setScale(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {boolean} value
     */
    setForceScale(value) {
        wasm.ruffleinstancebuilder_setForceScale(this.__wbg_ptr, value);
    }
    /**
     * @param {number | null} [value]
     */
    setFrameRate(value) {
        wasm.ruffleinstancebuilder_setFrameRate(this.__wbg_ptr, !isLikeNone(value), isLikeNone(value) ? 0 : value);
    }
    /**
     * @param {string | null} [value]
     */
    setWmode(value) {
        var ptr0 = isLikeNone(value) ? 0 : passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setWmode(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} value
     */
    setLogLevel(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setLogLevel(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} value
     */
    setMaxExecutionDuration(value) {
        wasm.ruffleinstancebuilder_setMaxExecutionDuration(this.__wbg_ptr, value);
    }
    /**
     * @param {number | null} [value]
     */
    setPlayerVersion(value) {
        wasm.ruffleinstancebuilder_setPlayerVersion(this.__wbg_ptr, isLikeNone(value) ? 0xFFFFFF : value);
    }
    /**
     * @param {string | null} [value]
     */
    setPreferredRenderer(value) {
        var ptr0 = isLikeNone(value) ? 0 : passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setPreferredRenderer(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} value
     */
    setOpenUrlMode(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setOpenUrlMode(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} value
     */
    setAllowNetworking(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setAllowNetworking(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} host
     * @param {number} port
     * @param {string} proxy_url
     */
    addSocketProxy(host, port, proxy_url) {
        const ptr0 = passStringToWasm0(host, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(proxy_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_addSocketProxy(this.__wbg_ptr, ptr0, len0, port, ptr1, len1);
    }
    /**
     * @param {string[]} value
     */
    setCredentialAllowList(value) {
        const ptr0 = passArrayJsValueToWasm0(value, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setCredentialAllowList(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} value
     */
    setPlayerRuntime(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setPlayerRuntime(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} value
     */
    setVolume(value) {
        wasm.ruffleinstancebuilder_setVolume(this.__wbg_ptr, value);
    }
    /**
     * @param {string} font_name
     * @param {Uint8Array} data
     */
    addFont(font_name, data) {
        const ptr0 = passStringToWasm0(font_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_addFont(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {string} default_name
     * @param {any[]} fonts
     */
    setDefaultFont(default_name, fonts) {
        const ptr0 = passStringToWasm0(default_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayJsValueToWasm0(fonts, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_setDefaultFont(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {string} button
     * @param {number} keycode
     */
    addGamepadButtonMapping(button, keycode) {
        const ptr0 = passStringToWasm0(button, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_addGamepadButtonMapping(this.__wbg_ptr, ptr0, len0, keycode);
    }
    /**
     * @param {RegExp} regexp
     * @param {string} replacement
     */
    addUrlRewriteRule(regexp, replacement) {
        const ptr0 = passStringToWasm0(replacement, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.ruffleinstancebuilder_addUrlRewriteRule(this.__wbg_ptr, regexp, ptr0, len0);
    }
    /**
     * @param {HTMLElement} parent
     * @param {any} js_player
     * @returns {Promise<Promise<any>>}
     */
    build(parent, js_player) {
        const ret = wasm.ruffleinstancebuilder_build(this.__wbg_ptr, parent, js_player);
        return ret;
    }
}

const ZipWriterFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_zipwriter_free(ptr >>> 0, 1));

class ZipWriter {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ZipWriterFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_zipwriter_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.zipwriter_new();
        this.__wbg_ptr = ret >>> 0;
        ZipWriterFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} name
     * @param {Uint8Array} bytes
     */
    addFile(name, bytes) {
        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.zipwriter_addFile(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @returns {Uint8Array}
     */
    save() {
        const ret = wasm.zipwriter_save(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_Window_2b9b35492d4b2d63 = function(arg0) {
        const ret = arg0.Window;
        return ret;
    };
    imports.wbg.__wbg_WorkerGlobalScope_b4fb13f0ba6527ab = function(arg0) {
        const ret = arg0.WorkerGlobalScope;
        return ret;
    };
    imports.wbg.__wbg_a_7d6ba6fc2be39772 = function(arg0) {
        const ret = arg0.a;
        return ret;
    };
    imports.wbg.__wbg_activeTexture_0f19d8acfa0a14c2 = function(arg0, arg1) {
        arg0.activeTexture(arg1 >>> 0);
    };
    imports.wbg.__wbg_activeTexture_460f2e367e813fb0 = function(arg0, arg1) {
        arg0.activeTexture(arg1 >>> 0);
    };
    imports.wbg.__wbg_addColorStop_165045339ad89f05 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.addColorStop(arg1, getStringFromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_addEventListener_84ae3eac6e15480a = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_addEventListener_90e553fdce254421 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
    }, arguments) };
    imports.wbg.__wbg_addPath_f4ed865891808eb5 = function(arg0, arg1, arg2) {
        arg0.addPath(arg1, arg2);
    };
    imports.wbg.__wbg_appendChild_8204974b7328bf98 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.appendChild(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_arrayBuffer_d1b44c4390db422f = function() { return handleError(function (arg0) {
        const ret = arg0.arrayBuffer();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_assign_276730d240c7d534 = function() { return handleError(function (arg0, arg1, arg2) {
        arg0.assign(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_attachShader_3d4eb6af9e3e7bd1 = function(arg0, arg1, arg2) {
        arg0.attachShader(arg1, arg2);
    };
    imports.wbg.__wbg_attachShader_94e758c8b5283eb2 = function(arg0, arg1, arg2) {
        arg0.attachShader(arg1, arg2);
    };
    imports.wbg.__wbg_b_558b204365f1ff0d = function(arg0) {
        const ret = arg0.b;
        return ret;
    };
    imports.wbg.__wbg_baseURI_240b3b82ba685e7c = function() { return handleError(function (arg0, arg1) {
        const ret = arg1.baseURI;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_beginQuery_6af0b28414b16c07 = function(arg0, arg1, arg2) {
        arg0.beginQuery(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_beginRenderPass_f36cfdd5825e0c2e = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.beginRenderPass(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_bezierCurveTo_115edcc961cfb1ad = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.bezierCurveTo(arg1, arg2, arg3, arg4, arg5, arg6);
    };
    imports.wbg.__wbg_bindAttribLocation_40da4b3e84cc7bd5 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_bindAttribLocation_ce2730e29976d230 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.bindAttribLocation(arg1, arg2 >>> 0, getStringFromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_bindBufferRange_454f90f2b1781982 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.bindBufferRange(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
    };
    imports.wbg.__wbg_bindBuffer_309c9a6c21826cf5 = function(arg0, arg1, arg2) {
        arg0.bindBuffer(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_bindBuffer_f32f587f1c2962a7 = function(arg0, arg1, arg2) {
        arg0.bindBuffer(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_bindFramebuffer_bd02c8cc707d670f = function(arg0, arg1, arg2) {
        arg0.bindFramebuffer(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_bindFramebuffer_e48e83c0f973944d = function(arg0, arg1, arg2) {
        arg0.bindFramebuffer(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_bindRenderbuffer_53eedd88e52b4cb5 = function(arg0, arg1, arg2) {
        arg0.bindRenderbuffer(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_bindRenderbuffer_55e205fecfddbb8c = function(arg0, arg1, arg2) {
        arg0.bindRenderbuffer(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_bindSampler_9f59cf2eaa22eee0 = function(arg0, arg1, arg2) {
        arg0.bindSampler(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_bindTexture_a6e795697f49ebd1 = function(arg0, arg1, arg2) {
        arg0.bindTexture(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_bindTexture_bc8eb316247f739d = function(arg0, arg1, arg2) {
        arg0.bindTexture(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_bindVertexArrayOES_da8e7059b789629e = function(arg0, arg1) {
        arg0.bindVertexArrayOES(arg1);
    };
    imports.wbg.__wbg_bindVertexArray_6b4b88581064b71f = function(arg0, arg1) {
        arg0.bindVertexArray(arg1);
    };
    imports.wbg.__wbg_blendColor_15ba1eff44560932 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.blendColor(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_blendColor_6446fba673f64ff0 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.blendColor(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_blendEquationSeparate_c1aa26a9a5c5267e = function(arg0, arg1, arg2) {
        arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
    };
    imports.wbg.__wbg_blendEquationSeparate_f3d422e981d86339 = function(arg0, arg1, arg2) {
        arg0.blendEquationSeparate(arg1 >>> 0, arg2 >>> 0);
    };
    imports.wbg.__wbg_blendEquation_c23d111ad6d268ff = function(arg0, arg1) {
        arg0.blendEquation(arg1 >>> 0);
    };
    imports.wbg.__wbg_blendEquation_cec7bc41f3e5704c = function(arg0, arg1) {
        arg0.blendEquation(arg1 >>> 0);
    };
    imports.wbg.__wbg_blendFuncSeparate_483be8d4dd635340 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
    };
    imports.wbg.__wbg_blendFuncSeparate_dafeabfc1680b2ee = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.blendFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
    };
    imports.wbg.__wbg_blendFunc_9454884a3cfd2911 = function(arg0, arg1, arg2) {
        arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
    };
    imports.wbg.__wbg_blendFunc_c3b74be5a39c665f = function(arg0, arg1, arg2) {
        arg0.blendFunc(arg1 >>> 0, arg2 >>> 0);
    };
    imports.wbg.__wbg_blitFramebuffer_7303bdff77cfe967 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        arg0.blitFramebuffer(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0);
    };
    imports.wbg.__wbg_body_0b8fd1fe671660df = function(arg0) {
        const ret = arg0.body;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_body_942ea927546a04ba = function(arg0) {
        const ret = arg0.body;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_bufferData_3261d3e1dd6fc903 = function(arg0, arg1, arg2, arg3) {
        arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
    };
    imports.wbg.__wbg_bufferData_33c59bf909ea6fd3 = function(arg0, arg1, arg2, arg3) {
        arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
    };
    imports.wbg.__wbg_bufferData_463178757784fcac = function(arg0, arg1, arg2, arg3) {
        arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
    };
    imports.wbg.__wbg_bufferData_d99b6b4eb5283f20 = function(arg0, arg1, arg2, arg3) {
        arg0.bufferData(arg1 >>> 0, arg2, arg3 >>> 0);
    };
    imports.wbg.__wbg_bufferData_e782cf0ee06c693a = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.bufferData(arg1 >>> 0, getArrayU8FromWasm0(arg2, arg3), arg4 >>> 0);
    };
    imports.wbg.__wbg_bufferSubData_4e973eefe9236d04 = function(arg0, arg1, arg2, arg3) {
        arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
    };
    imports.wbg.__wbg_bufferSubData_dcd4d16031a60345 = function(arg0, arg1, arg2, arg3) {
        arg0.bufferSubData(arg1 >>> 0, arg2, arg3);
    };
    imports.wbg.__wbg_buffer_09165b52af8c5237 = function(arg0) {
        const ret = arg0.buffer;
        return ret;
    };
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
        const ret = arg0.buffer;
        return ret;
    };
    imports.wbg.__wbg_button_f75c56aec440ea04 = function(arg0) {
        const ret = arg0.button;
        return ret;
    };
    imports.wbg.__wbg_buttons_c4b2b5a0c27f0743 = function(arg0) {
        const ret = arg0.buttons;
        return ret;
    };
    imports.wbg.__wbg_byobRequest_77d9adf63337edfb = function(arg0) {
        const ret = arg0.byobRequest;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_byteLength_e674b853d9c77e1d = function(arg0) {
        const ret = arg0.byteLength;
        return ret;
    };
    imports.wbg.__wbg_byteOffset_fd862df290ef848d = function(arg0) {
        const ret = arg0.byteOffset;
        return ret;
    };
    imports.wbg.__wbg_c_87f51397f3871a8f = function(arg0) {
        const ret = arg0.c;
        return ret;
    };
    imports.wbg.__wbg_callExternalInterface_aab2dc76bc699f1a = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        var v0 = getArrayJsValueFromWasm0(arg2, arg3).slice();
        wasm.__wbindgen_free(arg2, arg3 * 4, 4);
        const ret = callExternalInterface(getStringFromWasm0(arg0, arg1), v0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_callFSCommand_56f2863c1a42fe95 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.callFSCommand(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_672a4d21634d4a24 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_7cccdd69e0791ae2 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.call(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_cancelAnimationFrame_089b48301c362fde = function() { return handleError(function (arg0, arg1) {
        arg0.cancelAnimationFrame(arg1);
    }, arguments) };
    imports.wbg.__wbg_clearBufferfv_65ea413f7f2554a2 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.clearBufferfv(arg1 >>> 0, arg2, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_clearBufferiv_c003c27b77a0245b = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.clearBufferiv(arg1 >>> 0, arg2, getArrayI32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_clearBufferuiv_8c285072f2026a37 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.clearBufferuiv(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_clearColor_f0fa029dfbcc1982 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.clearColor(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_clearDepth_17cfee5be8476fae = function(arg0, arg1) {
        arg0.clearDepth(arg1);
    };
    imports.wbg.__wbg_clearDepth_670d19914a501259 = function(arg0, arg1) {
        arg0.clearDepth(arg1);
    };
    imports.wbg.__wbg_clearRect_8e4ba7ea0e06711a = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.clearRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_clearStencil_4323424f1acca0df = function(arg0, arg1) {
        arg0.clearStencil(arg1);
    };
    imports.wbg.__wbg_clearStencil_7addd3b330b56b27 = function(arg0, arg1) {
        arg0.clearStencil(arg1);
    };
    imports.wbg.__wbg_clear_62b9037b892f6988 = function(arg0, arg1) {
        arg0.clear(arg1 >>> 0);
    };
    imports.wbg.__wbg_clear_f8d5f3c348d37d95 = function(arg0, arg1) {
        arg0.clear(arg1 >>> 0);
    };
    imports.wbg.__wbg_click_c52d7bdb3b6dc9c3 = function(arg0) {
        arg0.click();
    };
    imports.wbg.__wbg_clientHeight_216178c194000db4 = function(arg0) {
        const ret = arg0.clientHeight;
        return ret;
    };
    imports.wbg.__wbg_clientWaitSync_6930890a42bd44c0 = function(arg0, arg1, arg2, arg3) {
        const ret = arg0.clientWaitSync(arg1, arg2 >>> 0, arg3 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_clientWidth_ce67a04dc15fce39 = function(arg0) {
        const ret = arg0.clientWidth;
        return ret;
    };
    imports.wbg.__wbg_clip_8580b4b35a2f9c21 = function(arg0, arg1, arg2) {
        arg0.clip(arg1, __wbindgen_enum_CanvasWindingRule[arg2]);
    };
    imports.wbg.__wbg_clipboardData_04bd9c1b0935d7e6 = function(arg0) {
        const ret = arg0.clipboardData;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_clipboard_93f8aa8cc426db44 = function(arg0) {
        const ret = arg0.clipboard;
        return ret;
    };
    imports.wbg.__wbg_closePath_7b191d113c863d8f = function(arg0) {
        arg0.closePath();
    };
    imports.wbg.__wbg_closeVirtualKeyboard_2bdc8fcbbcce7320 = function(arg0) {
        arg0.closeVirtualKeyboard();
    };
    imports.wbg.__wbg_close_2893b7d056a0627d = function() { return handleError(function (arg0) {
        arg0.close();
    }, arguments) };
    imports.wbg.__wbg_close_304cc1fef3466669 = function() { return handleError(function (arg0) {
        arg0.close();
    }, arguments) };
    imports.wbg.__wbg_close_3c756df9a6f53aac = function() { return handleError(function (arg0, arg1) {
        arg0.close(arg1);
    }, arguments) };
    imports.wbg.__wbg_close_5a97ef05b337f8ce = function() { return handleError(function (arg0) {
        const ret = arg0.close();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_close_5ce03e29be453811 = function() { return handleError(function (arg0) {
        arg0.close();
    }, arguments) };
    imports.wbg.__wbg_close_e1253d480ed93ce3 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.close(arg1, getStringFromWasm0(arg2, arg3));
    }, arguments) };
    imports.wbg.__wbg_code_459c120478e1ab6e = function(arg0, arg1) {
        const ret = arg1.code;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_code_f4ec1e6e2e1b0417 = function(arg0) {
        const ret = arg0.code;
        return ret;
    };
    imports.wbg.__wbg_colorMask_5e7c60b9c7a57a2e = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
    };
    imports.wbg.__wbg_colorMask_6dac12039c7145ae = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.colorMask(arg1 !== 0, arg2 !== 0, arg3 !== 0, arg4 !== 0);
    };
    imports.wbg.__wbg_compileShader_0ad770bbdbb9de21 = function(arg0, arg1) {
        arg0.compileShader(arg1);
    };
    imports.wbg.__wbg_compileShader_2307c9d370717dd5 = function(arg0, arg1) {
        arg0.compileShader(arg1);
    };
    imports.wbg.__wbg_compressedTexSubImage2D_71877eec950ca069 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8, arg9);
    };
    imports.wbg.__wbg_compressedTexSubImage2D_99abf4cfdb7c3fd8 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
    };
    imports.wbg.__wbg_compressedTexSubImage2D_d66dcfcb2422e703 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        arg0.compressedTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8);
    };
    imports.wbg.__wbg_compressedTexSubImage3D_58506392da46b927 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10);
    };
    imports.wbg.__wbg_compressedTexSubImage3D_81477746675a4017 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.compressedTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10, arg11);
    };
    imports.wbg.__wbg_configure_69aea2f2c91d2049 = function() { return handleError(function (arg0, arg1) {
        arg0.configure(arg1);
    }, arguments) };
    imports.wbg.__wbg_configure_ad5aa321838c8e3b = function() { return handleError(function (arg0, arg1) {
        arg0.configure(arg1);
    }, arguments) };
    imports.wbg.__wbg_confirm_e2474272c4d0acee = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.confirm(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_connect_b22945d106632a36 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.connect(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_contains_3361c7eda6c95afd = function(arg0, arg1) {
        const ret = arg0.contains(arg1);
        return ret;
    };
    imports.wbg.__wbg_copyBufferSubData_9469a965478e33b5 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.copyBufferSubData(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
    };
    imports.wbg.__wbg_copyBufferToBuffer_e5b6f95a75ade65d = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.copyBufferToBuffer(arg1, arg2, arg3, arg4, arg5);
    }, arguments) };
    imports.wbg.__wbg_copyBufferToTexture_352932ac2d1bdfa8 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.copyBufferToTexture(arg1, arg2, arg3);
    }, arguments) };
    imports.wbg.__wbg_copyTexSubImage2D_05e7e8df6814a705 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
    };
    imports.wbg.__wbg_copyTexSubImage2D_607ad28606952982 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        arg0.copyTexSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
    };
    imports.wbg.__wbg_copyTexSubImage3D_32e92c94044e58ca = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.copyTexSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
    };
    imports.wbg.__wbg_copyTextureToBuffer_beaf38ed0c92f265 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.copyTextureToBuffer(arg1, arg2, arg3);
    }, arguments) };
    imports.wbg.__wbg_copyTextureToTexture_d61a384c5788aaa1 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.copyTextureToTexture(arg1, arg2, arg3);
    }, arguments) };
    imports.wbg.__wbg_copyToAudioBufferInterleaved_8bc972b0b0802456 = function(arg0, arg1, arg2) {
        copyToAudioBufferInterleaved(arg0, getArrayF32FromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_copyTo_13dd3bf6a979e7e1 = function(arg0, arg1, arg2) {
        const ret = arg0.copyTo(getArrayU8FromWasm0(arg1, arg2));
        return ret;
    };
    imports.wbg.__wbg_createBindGroupLayout_b87a1f26ed22bd5d = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.createBindGroupLayout(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createBindGroup_dfdadbbcf4dcae54 = function(arg0, arg1) {
        const ret = arg0.createBindGroup(arg1);
        return ret;
    };
    imports.wbg.__wbg_createBufferSource_f7860a96f709acbd = function() { return handleError(function (arg0) {
        const ret = arg0.createBufferSource();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createBuffer_7a9ec3d654073660 = function(arg0) {
        const ret = arg0.createBuffer();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createBuffer_926beeec3ff39b5a = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.createBuffer(arg1 >>> 0, arg2 >>> 0, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createBuffer_9886e84a67b68c89 = function(arg0) {
        const ret = arg0.createBuffer();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createBuffer_fb1752eab5cb2a7f = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.createBuffer(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createCommandEncoder_92b1c283a0372974 = function(arg0, arg1) {
        const ret = arg0.createCommandEncoder(arg1);
        return ret;
    };
    imports.wbg.__wbg_createElementNS_914d752e521987da = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.createElementNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createElement_8c9931a732ee2fea = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.createElement(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createFramebuffer_7824f69bba778885 = function(arg0) {
        const ret = arg0.createFramebuffer();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createFramebuffer_c8d70ebc4858051e = function(arg0) {
        const ret = arg0.createFramebuffer();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createLinearGradient_d9f235a84f77b603 = function(arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.createLinearGradient(arg1, arg2, arg3, arg4);
        return ret;
    };
    imports.wbg.__wbg_createObjectURL_6e98d2f9c7bd9764 = function() { return handleError(function (arg0, arg1) {
        const ret = URL.createObjectURL(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_createPattern_de74e28e1f64b306 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.createPattern(arg1, getStringFromWasm0(arg2, arg3));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_createPipelineLayout_c97169a1a177450e = function(arg0, arg1) {
        const ret = arg0.createPipelineLayout(arg1);
        return ret;
    };
    imports.wbg.__wbg_createProgram_8ff56c485f3233d0 = function(arg0) {
        const ret = arg0.createProgram();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createProgram_da203074cafb1038 = function(arg0) {
        const ret = arg0.createProgram();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createQuery_5ed5e770ec1009c1 = function(arg0) {
        const ret = arg0.createQuery();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createRadialGradient_6c71dd51b548f2dd = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        const ret = arg0.createRadialGradient(arg1, arg2, arg3, arg4, arg5, arg6);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createRenderPipeline_ab453ccc40539bc0 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.createRenderPipeline(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createRenderbuffer_d88aa9403faa38ea = function(arg0) {
        const ret = arg0.createRenderbuffer();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createRenderbuffer_fd347ae14f262eaa = function(arg0) {
        const ret = arg0.createRenderbuffer();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createSampler_f76e29d7522bec9e = function(arg0) {
        const ret = arg0.createSampler();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createSampler_fdf4c92b3a0a4810 = function(arg0, arg1) {
        const ret = arg0.createSampler(arg1);
        return ret;
    };
    imports.wbg.__wbg_createShaderModule_159013272c1b4c4c = function(arg0, arg1) {
        const ret = arg0.createShaderModule(arg1);
        return ret;
    };
    imports.wbg.__wbg_createShader_4a256a8cc9c1ce4f = function(arg0, arg1) {
        const ret = arg0.createShader(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createShader_983150fb1243ee56 = function(arg0, arg1) {
        const ret = arg0.createShader(arg1 >>> 0);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createTexture_092a9cf5106b1805 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.createTexture(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_createTexture_9c536c79b635fdef = function(arg0) {
        const ret = arg0.createTexture();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createTexture_bfaa54c0cd22e367 = function(arg0) {
        const ret = arg0.createTexture();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createVertexArrayOES_991b44f100f93329 = function(arg0) {
        const ret = arg0.createVertexArrayOES();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createVertexArray_e435029ae2660efd = function(arg0) {
        const ret = arg0.createVertexArray();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_createView_e743725c577bafe5 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.createView(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_ctrlKey_1e826e468105ac11 = function(arg0) {
        const ret = arg0.ctrlKey;
        return ret;
    };
    imports.wbg.__wbg_cullFace_187079e6e20a464d = function(arg0, arg1) {
        arg0.cullFace(arg1 >>> 0);
    };
    imports.wbg.__wbg_cullFace_fbae6dd4d5e61ba4 = function(arg0, arg1) {
        arg0.cullFace(arg1 >>> 0);
    };
    imports.wbg.__wbg_currentTarget_6f3494de6b6d7897 = function(arg0) {
        const ret = arg0.currentTarget;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_currentTime_adef4d803f58eb66 = function(arg0) {
        const ret = arg0.currentTime;
        return ret;
    };
    imports.wbg.__wbg_d_ee734a5959d68cdd = function(arg0) {
        const ret = arg0.d;
        return ret;
    };
    imports.wbg.__wbg_data_432d9c3df2630942 = function(arg0) {
        const ret = arg0.data;
        return ret;
    };
    imports.wbg.__wbg_decodeQueueSize_291a870b0ca48c77 = function(arg0) {
        const ret = arg0.decodeQueueSize;
        return ret;
    };
    imports.wbg.__wbg_decode_6c36f113295ffd87 = function() { return handleError(function (arg0, arg1) {
        arg0.decode(arg1);
    }, arguments) };
    imports.wbg.__wbg_deleteBuffer_7ed96e1bf7c02e87 = function(arg0, arg1) {
        arg0.deleteBuffer(arg1);
    };
    imports.wbg.__wbg_deleteBuffer_a7822433fc95dfb8 = function(arg0, arg1) {
        arg0.deleteBuffer(arg1);
    };
    imports.wbg.__wbg_deleteFramebuffer_66853fb7101488cb = function(arg0, arg1) {
        arg0.deleteFramebuffer(arg1);
    };
    imports.wbg.__wbg_deleteFramebuffer_cd3285ee5a702a7a = function(arg0, arg1) {
        arg0.deleteFramebuffer(arg1);
    };
    imports.wbg.__wbg_deleteProgram_3fa626bbc0001eb7 = function(arg0, arg1) {
        arg0.deleteProgram(arg1);
    };
    imports.wbg.__wbg_deleteProgram_71a133c6d053e272 = function(arg0, arg1) {
        arg0.deleteProgram(arg1);
    };
    imports.wbg.__wbg_deleteQuery_6a2b7cd30074b20b = function(arg0, arg1) {
        arg0.deleteQuery(arg1);
    };
    imports.wbg.__wbg_deleteRenderbuffer_59f4369653485031 = function(arg0, arg1) {
        arg0.deleteRenderbuffer(arg1);
    };
    imports.wbg.__wbg_deleteRenderbuffer_8808192853211567 = function(arg0, arg1) {
        arg0.deleteRenderbuffer(arg1);
    };
    imports.wbg.__wbg_deleteSampler_7f02bb003ba547f0 = function(arg0, arg1) {
        arg0.deleteSampler(arg1);
    };
    imports.wbg.__wbg_deleteShader_8d42f169deda58ac = function(arg0, arg1) {
        arg0.deleteShader(arg1);
    };
    imports.wbg.__wbg_deleteShader_c65a44796c5004d8 = function(arg0, arg1) {
        arg0.deleteShader(arg1);
    };
    imports.wbg.__wbg_deleteSync_5a3fbe5d6b742398 = function(arg0, arg1) {
        arg0.deleteSync(arg1);
    };
    imports.wbg.__wbg_deleteTexture_a30f5ca0163c4110 = function(arg0, arg1) {
        arg0.deleteTexture(arg1);
    };
    imports.wbg.__wbg_deleteTexture_bb82c9fec34372ba = function(arg0, arg1) {
        arg0.deleteTexture(arg1);
    };
    imports.wbg.__wbg_deleteVertexArrayOES_1ee7a06a4b23ec8c = function(arg0, arg1) {
        arg0.deleteVertexArrayOES(arg1);
    };
    imports.wbg.__wbg_deleteVertexArray_77fe73664a3332ae = function(arg0, arg1) {
        arg0.deleteVertexArray(arg1);
    };
    imports.wbg.__wbg_delete_5ffea89592972463 = function() { return handleError(function (arg0, arg1, arg2) {
        delete arg0[getStringFromWasm0(arg1, arg2)];
    }, arguments) };
    imports.wbg.__wbg_deltaMode_9bfd9fe3f6b4b240 = function(arg0) {
        const ret = arg0.deltaMode;
        return ret;
    };
    imports.wbg.__wbg_deltaY_f9318542caea0c36 = function(arg0) {
        const ret = arg0.deltaY;
        return ret;
    };
    imports.wbg.__wbg_depthFunc_2906916f4536d5d7 = function(arg0, arg1) {
        arg0.depthFunc(arg1 >>> 0);
    };
    imports.wbg.__wbg_depthFunc_f34449ae87cc4e3e = function(arg0, arg1) {
        arg0.depthFunc(arg1 >>> 0);
    };
    imports.wbg.__wbg_depthMask_5fe84e2801488eda = function(arg0, arg1) {
        arg0.depthMask(arg1 !== 0);
    };
    imports.wbg.__wbg_depthMask_76688a8638b2f321 = function(arg0, arg1) {
        arg0.depthMask(arg1 !== 0);
    };
    imports.wbg.__wbg_depthRange_3cd6b4dc961d9116 = function(arg0, arg1, arg2) {
        arg0.depthRange(arg1, arg2);
    };
    imports.wbg.__wbg_depthRange_f9c084ff3d81fd7b = function(arg0, arg1, arg2) {
        arg0.depthRange(arg1, arg2);
    };
    imports.wbg.__wbg_destination_6400091abd6f01b3 = function(arg0) {
        const ret = arg0.destination;
        return ret;
    };
    imports.wbg.__wbg_devicePixelRatio_68c391265f05d093 = function(arg0) {
        const ret = arg0.devicePixelRatio;
        return ret;
    };
    imports.wbg.__wbg_disableVertexAttribArray_452cc9815fced7e4 = function(arg0, arg1) {
        arg0.disableVertexAttribArray(arg1 >>> 0);
    };
    imports.wbg.__wbg_disableVertexAttribArray_afd097fb465dc100 = function(arg0, arg1) {
        arg0.disableVertexAttribArray(arg1 >>> 0);
    };
    imports.wbg.__wbg_disable_2702df5b5da5dd21 = function(arg0, arg1) {
        arg0.disable(arg1 >>> 0);
    };
    imports.wbg.__wbg_disable_8b53998501a7a85b = function(arg0, arg1) {
        arg0.disable(arg1 >>> 0);
    };
    imports.wbg.__wbg_dispatchEvent_9e259d7c1d603dfb = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.dispatchEvent(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_displayClipboardModal_3fdf8527c074e477 = function(arg0, arg1) {
        arg0.displayClipboardModal(arg1 !== 0);
    };
    imports.wbg.__wbg_displayMessage_42f551c4dadda912 = function(arg0, arg1, arg2) {
        arg0.displayMessage(getStringFromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_displayRootMovieDownloadFailedMessage_d406bdac4b562cff = function(arg0, arg1) {
        arg0.displayRootMovieDownloadFailedMessage(arg1 !== 0);
    };
    imports.wbg.__wbg_displayUnsupportedVideo_d4963906866b517e = function(arg0, arg1, arg2) {
        arg0.displayUnsupportedVideo(getStringFromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_document_d249400bd7bd996d = function(arg0) {
        const ret = arg0.document;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_done_769e5ede4b31c67b = function(arg0) {
        const ret = arg0.done;
        return ret;
    };
    imports.wbg.__wbg_drawArraysInstancedANGLE_342ee6b5236d9702 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.drawArraysInstancedANGLE(arg1 >>> 0, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_drawArraysInstanced_622ea9f149b0b80c = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.drawArraysInstanced(arg1 >>> 0, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_drawArrays_6acaa2669c105f3a = function(arg0, arg1, arg2, arg3) {
        arg0.drawArrays(arg1 >>> 0, arg2, arg3);
    };
    imports.wbg.__wbg_drawArrays_6d29ea2ebc0c72a2 = function(arg0, arg1, arg2, arg3) {
        arg0.drawArrays(arg1 >>> 0, arg2, arg3);
    };
    imports.wbg.__wbg_drawBuffersWEBGL_9fdbdf3d4cbd3aae = function(arg0, arg1) {
        arg0.drawBuffersWEBGL(arg1);
    };
    imports.wbg.__wbg_drawBuffers_e729b75c5a50d760 = function(arg0, arg1) {
        arg0.drawBuffers(arg1);
    };
    imports.wbg.__wbg_drawElementsInstancedANGLE_096b48ab8686c5cf = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.drawElementsInstancedANGLE(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
    };
    imports.wbg.__wbg_drawElementsInstanced_f874e87d0b4e95e9 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.drawElementsInstanced(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
    };
    imports.wbg.__wbg_drawElements_16199ef1cc58b16a = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.drawElements(arg1 >>> 0, arg2, arg3 >>> 0, arg4);
    };
    imports.wbg.__wbg_drawImage_dfdde1887a169a24 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.drawImage(arg1, arg2, arg3);
    }, arguments) };
    imports.wbg.__wbg_drawIndexed_bf8f6537c7ff1b95 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.drawIndexed(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5 >>> 0);
    };
    imports.wbg.__wbg_drawingBufferHeight_1d398e1fc5bb18e9 = function(arg0) {
        const ret = arg0.drawingBufferHeight;
        return ret;
    };
    imports.wbg.__wbg_drawingBufferWidth_78f7e4a8892a90fe = function(arg0) {
        const ret = arg0.drawingBufferWidth;
        return ret;
    };
    imports.wbg.__wbg_e_ec6af69daaddfe41 = function(arg0) {
        const ret = arg0.e;
        return ret;
    };
    imports.wbg.__wbg_enableVertexAttribArray_607be07574298e5e = function(arg0, arg1) {
        arg0.enableVertexAttribArray(arg1 >>> 0);
    };
    imports.wbg.__wbg_enableVertexAttribArray_93c3d406a41ad6c7 = function(arg0, arg1) {
        arg0.enableVertexAttribArray(arg1 >>> 0);
    };
    imports.wbg.__wbg_enable_51114837e05ee280 = function(arg0, arg1) {
        arg0.enable(arg1 >>> 0);
    };
    imports.wbg.__wbg_enable_d183fef39258803f = function(arg0, arg1) {
        arg0.enable(arg1 >>> 0);
    };
    imports.wbg.__wbg_endQuery_17aac36532ca7d47 = function(arg0, arg1) {
        arg0.endQuery(arg1 >>> 0);
    };
    imports.wbg.__wbg_end_7ad26f2083234d67 = function(arg0) {
        arg0.end();
    };
    imports.wbg.__wbg_enqueue_bb16ba72f537dc9e = function() { return handleError(function (arg0, arg1) {
        arg0.enqueue(arg1);
    }, arguments) };
    imports.wbg.__wbg_entries_3265d4158b33e5dc = function(arg0) {
        const ret = Object.entries(arg0);
        return ret;
    };
    imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_execCommand_c818ee125e2e4f64 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.execCommand(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_f_75770c6ddafc46f2 = function(arg0) {
        const ret = arg0.f;
        return ret;
    };
    imports.wbg.__wbg_features_79e62ac35510384d = function(arg0) {
        const ret = arg0.features;
        return ret;
    };
    imports.wbg.__wbg_features_7f655fc5b99a8d35 = function(arg0) {
        const ret = arg0.features;
        return ret;
    };
    imports.wbg.__wbg_fenceSync_02d142d21e315da6 = function(arg0, arg1, arg2) {
        const ret = arg0.fenceSync(arg1 >>> 0, arg2 >>> 0);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_fetch_b7bf320f681242d2 = function(arg0, arg1) {
        const ret = arg0.fetch(arg1);
        return ret;
    };
    imports.wbg.__wbg_files_790cda07a2445fac = function(arg0) {
        const ret = arg0.files;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_fillRect_c38d5d56492a2368 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.fillRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_fill_64902335a40baa8d = function(arg0, arg1, arg2) {
        arg0.fill(arg1, __wbindgen_enum_CanvasWindingRule[arg2]);
    };
    imports.wbg.__wbg_finish_ac8e8f8408208d93 = function(arg0) {
        const ret = arg0.finish();
        return ret;
    };
    imports.wbg.__wbg_finish_b79779da004ef346 = function(arg0, arg1) {
        const ret = arg0.finish(arg1);
        return ret;
    };
    imports.wbg.__wbg_focus_7d08b55eba7b368d = function() { return handleError(function (arg0) {
        arg0.focus();
    }, arguments) };
    imports.wbg.__wbg_format_033f80946ff96653 = function(arg0) {
        const ret = arg0.format;
        return isLikeNone(ret) ? 10 : ((__wbindgen_enum_VideoPixelFormat.indexOf(ret) + 1 || 10) - 1);
    };
    imports.wbg.__wbg_framebufferRenderbuffer_2fdd12e89ad81eb9 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
    };
    imports.wbg.__wbg_framebufferRenderbuffer_8b88592753b54715 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.framebufferRenderbuffer(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4);
    };
    imports.wbg.__wbg_framebufferTexture2D_81a565732bd5d8fe = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
    };
    imports.wbg.__wbg_framebufferTexture2D_ed855d0b097c557a = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.framebufferTexture2D(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4, arg5);
    };
    imports.wbg.__wbg_framebufferTextureLayer_5e6bd1b0cb45d815 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.framebufferTextureLayer(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5);
    };
    imports.wbg.__wbg_framebufferTextureMultiviewOVR_e54f936c3cc382cb = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.framebufferTextureMultiviewOVR(arg1 >>> 0, arg2 >>> 0, arg3, arg4, arg5, arg6);
    };
    imports.wbg.__wbg_fromEntries_524679eecb0bdc2e = function() { return handleError(function (arg0) {
        const ret = Object.fromEntries(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_frontFace_289c9d7a8569c4f2 = function(arg0, arg1) {
        arg0.frontFace(arg1 >>> 0);
    };
    imports.wbg.__wbg_frontFace_4d4936cfaeb8b7df = function(arg0, arg1) {
        arg0.frontFace(arg1 >>> 0);
    };
    imports.wbg.__wbg_getAttribLocation_9db82d01924fa43d = function(arg0, arg1, arg2, arg3) {
        const ret = arg0.getAttribLocation(arg1, getStringFromWasm0(arg2, arg3));
        return ret;
    };
    imports.wbg.__wbg_getBufferSubData_8ab2dcc5fcf5770f = function(arg0, arg1, arg2, arg3) {
        arg0.getBufferSubData(arg1 >>> 0, arg2, arg3);
    };
    imports.wbg.__wbg_getContext_3ae09aaa73194801 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getContext_e9cf379449413580 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getContext_f65a0debd1e8f8e8 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.getContext(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getContext_fc19859df6331073 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.getContext(getStringFromWasm0(arg1, arg2), arg3);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getCurrentTexture_3c8710ca6e0019fc = function() { return handleError(function (arg0) {
        const ret = arg0.getCurrentTexture();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getData_84cc441a50843727 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg1.getData(getStringFromWasm0(arg2, arg3));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_getError_d749701e28a45150 = function(arg0) {
        const ret = arg0.getError();
        return ret;
    };
    imports.wbg.__wbg_getExtension_e6c97409b224b5dc = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getExtension_ff0fb1398bcf28c3 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.getExtension(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_getGamepads_1f997cef580c9088 = function() { return handleError(function (arg0) {
        const ret = arg0.getGamepads();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getIndexedParameter_f9211edc36533919 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.getIndexedParameter(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getMappedRange_86d4a434bceeb7fc = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.getMappedRange(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getObjectId_c0641fd72b770bc3 = function(arg0, arg1) {
        const ret = arg1.getObjectId();
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_getParameter_1f0887a2b88e6d19 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.getParameter(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getParameter_e3429f024018310f = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.getParameter(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getPreferredCanvasFormat_0988752050c788b0 = function(arg0) {
        const ret = arg0.getPreferredCanvasFormat();
        return (__wbindgen_enum_GpuTextureFormat.indexOf(ret) + 1 || 96) - 1;
    };
    imports.wbg.__wbg_getProgramInfoLog_631c180b1b21c8ed = function(arg0, arg1, arg2) {
        const ret = arg1.getProgramInfoLog(arg2);
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_getProgramInfoLog_a998105a680059db = function(arg0, arg1, arg2) {
        const ret = arg1.getProgramInfoLog(arg2);
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_getProgramParameter_0c411f0cd4185c5b = function(arg0, arg1, arg2) {
        const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_getProgramParameter_360f95ff07ac068d = function(arg0, arg1, arg2) {
        const ret = arg0.getProgramParameter(arg1, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_getQueryParameter_8921497e1d1561c1 = function(arg0, arg1, arg2) {
        const ret = arg0.getQueryParameter(arg1, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_getRandomValues_3c9c0d586e575a16 = function() { return handleError(function (arg0, arg1) {
        globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_getReader_48e00749fe3f6089 = function() { return handleError(function (arg0) {
        const ret = arg0.getReader();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getRootNode_f59bcfa355239af5 = function(arg0) {
        const ret = arg0.getRootNode();
        return ret;
    };
    imports.wbg.__wbg_getShaderInfoLog_7e7b38fb910ec534 = function(arg0, arg1, arg2) {
        const ret = arg1.getShaderInfoLog(arg2);
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_getShaderInfoLog_f59c3112acc6e039 = function(arg0, arg1, arg2) {
        const ret = arg1.getShaderInfoLog(arg2);
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_getShaderParameter_511b5f929074fa31 = function(arg0, arg1, arg2) {
        const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_getShaderParameter_6dbe0b8558dc41fd = function(arg0, arg1, arg2) {
        const ret = arg0.getShaderParameter(arg1, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_getSupportedExtensions_8c007dbb54905635 = function(arg0) {
        const ret = arg0.getSupportedExtensions();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_getSupportedProfiles_10d2a4d32a128384 = function(arg0) {
        const ret = arg0.getSupportedProfiles();
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_getSyncParameter_7cb8461f5891606c = function(arg0, arg1, arg2) {
        const ret = arg0.getSyncParameter(arg1, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_getTime_46267b1c24877e30 = function(arg0) {
        const ret = arg0.getTime();
        return ret;
    };
    imports.wbg.__wbg_getTimezoneOffset_6b5752021c499c47 = function(arg0) {
        const ret = arg0.getTimezoneOffset();
        return ret;
    };
    imports.wbg.__wbg_getUniformBlockIndex_288fdc31528171ca = function(arg0, arg1, arg2, arg3) {
        const ret = arg0.getUniformBlockIndex(arg1, getStringFromWasm0(arg2, arg3));
        return ret;
    };
    imports.wbg.__wbg_getUniformLocation_657a2b6d102bd126 = function(arg0, arg1, arg2, arg3) {
        const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_getUniformLocation_838363001c74dc21 = function(arg0, arg1, arg2, arg3) {
        const ret = arg0.getUniformLocation(arg1, getStringFromWasm0(arg2, arg3));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_get_123509460060ab98 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg1.get(getStringFromWasm0(arg2, arg3));
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_get_67b2ba62fc30de12 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_79e1d7592116244e = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg1[getStringFromWasm0(arg2, arg3)];
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_get_8edd839202d9f4db = function(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_get_b9b93047fe3cf45b = function(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    };
    imports.wbg.__wbg_get_e27dfaeb6f46bd45 = function(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_getdone_d47073731acd3e74 = function(arg0) {
        const ret = arg0.done;
        return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
    };
    imports.wbg.__wbg_getvalue_009dcd63692bee1f = function(arg0) {
        const ret = arg0.value;
        return ret;
    };
    imports.wbg.__wbg_gpu_051bdce6489ddf6a = function(arg0) {
        const ret = arg0.gpu;
        return ret;
    };
    imports.wbg.__wbg_has_79b2afbf87cac46a = function(arg0, arg1, arg2) {
        const ret = arg0.has(getStringFromWasm0(arg1, arg2));
        return ret;
    };
    imports.wbg.__wbg_has_a5ea9117f258a0ec = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_headers_7852a8ea641c1379 = function(arg0) {
        const ret = arg0.headers;
        return ret;
    };
    imports.wbg.__wbg_headers_9cb51cfd2ac780a4 = function(arg0) {
        const ret = arg0.headers;
        return ret;
    };
    imports.wbg.__wbg_height_1d93eb7f5e355d97 = function(arg0) {
        const ret = arg0.height;
        return ret;
    };
    imports.wbg.__wbg_height_1f8226c8f6875110 = function(arg0) {
        const ret = arg0.height;
        return ret;
    };
    imports.wbg.__wbg_height_838cee19ba8597db = function(arg0) {
        const ret = arg0.height;
        return ret;
    };
    imports.wbg.__wbg_host_166cb082dae71d08 = function(arg0) {
        const ret = arg0.host;
        return ret;
    };
    imports.wbg.__wbg_href_87d60a783a012377 = function() { return handleError(function (arg0, arg1) {
        const ret = arg1.href;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_includes_937486a108ec147b = function(arg0, arg1, arg2) {
        const ret = arg0.includes(arg1, arg2);
        return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_e14585432e3737fc = function(arg0) {
        let result;
        try {
            result = arg0 instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_CanvasRenderingContext2d_df82a4d3437bf1cc = function(arg0) {
        let result;
        try {
            result = arg0 instanceof CanvasRenderingContext2D;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Error_4d54113b22d20306 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Error;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_GamepadButton_9a90b34f41783d40 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof GamepadButton;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Gamepad_365ec8404255ce00 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Gamepad;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_GpuAdapter_aff4b0f95a6c1c3e = function(arg0) {
        let result;
        try {
            result = arg0 instanceof GPUAdapter;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_GpuCanvasContext_dc8dc7061b962990 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof GPUCanvasContext;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlAnchorElement_1ff926b551076f86 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLAnchorElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlButtonElement_0def6a01e66b1942 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLButtonElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlCanvasElement_2ea67072a7624ac5 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLCanvasElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlDocument_c2114067e0fabc29 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLDocument;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlElement_51378c201250b16c = function(arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlFormElement_339aa0fb9076db8e = function(arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLFormElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlInputElement_12d71bf2d15dd19e = function(arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLInputElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_HtmlTextAreaElement_83a92f8ba4fb63ae = function(arg0) {
        let result;
        try {
            result = arg0 instanceof HTMLTextAreaElement;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Node_fbc6b87f5ed2e230 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Node;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Response_f2cc20d9f7dfd644 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Response;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_ShadowRoot_726578bcd7fa418a = function(arg0) {
        let result;
        try {
            result = arg0 instanceof ShadowRoot;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_WebGl2RenderingContext_2b6045efeb76568d = function(arg0) {
        let result;
        try {
            result = arg0 instanceof WebGL2RenderingContext;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_WebGlRenderingContext_b9cbe798424f6d4c = function(arg0) {
        let result;
        try {
            result = arg0 instanceof WebGLRenderingContext;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Window_def73ea0955fc569 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Window;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_invalidateFramebuffer_83f643d2a4936456 = function() { return handleError(function (arg0, arg1, arg2) {
        arg0.invalidateFramebuffer(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_inverse_b42fbab58ea3f263 = function(arg0) {
        const ret = arg0.inverse();
        return ret;
    };
    imports.wbg.__wbg_isArray_a1eab7e0d067391b = function(arg0) {
        const ret = Array.isArray(arg0);
        return ret;
    };
    imports.wbg.__wbg_isVirtualKeyboardFocused_f8f9341c5a6afb0b = function(arg0) {
        const ret = arg0.isVirtualKeyboardFocused();
        return ret;
    };
    imports.wbg.__wbg_is_c7481c65e7e5df9e = function(arg0, arg1) {
        const ret = Object.is(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbg_key_7b5c6cb539be8e13 = function(arg0, arg1) {
        const ret = arg1.key;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_label_c3a930571192f18e = function(arg0, arg1) {
        const ret = arg1.label;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_language_d871ec78ee8eec62 = function(arg0, arg1) {
        const ret = arg1.language;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_lastModified_7a9e61b3961224b8 = function(arg0) {
        const ret = arg0.lastModified;
        return ret;
    };
    imports.wbg.__wbg_length_690247b2de91cea8 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_a446193dc22c12f8 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_cfc862ec0ccc7ca0 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_e2d2a49132c1b256 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_limits_12dd06e895d48466 = function(arg0) {
        const ret = arg0.limits;
        return ret;
    };
    imports.wbg.__wbg_limits_4c117fe92a378b1a = function(arg0) {
        const ret = arg0.limits;
        return ret;
    };
    imports.wbg.__wbg_lineTo_3ec82699e6eeebe1 = function(arg0, arg1, arg2) {
        arg0.lineTo(arg1, arg2);
    };
    imports.wbg.__wbg_linkProgram_067ee06739bdde81 = function(arg0, arg1) {
        arg0.linkProgram(arg1);
    };
    imports.wbg.__wbg_linkProgram_e002979fe36e5b2a = function(arg0, arg1) {
        arg0.linkProgram(arg1);
    };
    imports.wbg.__wbg_localStorage_1406c99c39728187 = function() { return handleError(function (arg0) {
        const ret = arg0.localStorage;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_location_350d99456c2f3693 = function(arg0) {
        const ret = arg0.location;
        return ret;
    };
    imports.wbg.__wbg_location_9b435486be8f98c2 = function(arg0) {
        const ret = arg0.location;
        return ret;
    };
    imports.wbg.__wbg_log_0cc1b7768397bcfe = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.log(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_log_cb9e190acc5753fb = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.log(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_mapAsync_0d9cf9d11808b275 = function(arg0, arg1, arg2, arg3) {
        const ret = arg0.mapAsync(arg1 >>> 0, arg2, arg3);
        return ret;
    };
    imports.wbg.__wbg_mark_7438147ce31e9d4b = function(arg0, arg1) {
        performance.mark(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_maxBindGroups_060f2b40f8a292b1 = function(arg0) {
        const ret = arg0.maxBindGroups;
        return ret;
    };
    imports.wbg.__wbg_maxBindingsPerBindGroup_3e4b03bbed2da128 = function(arg0) {
        const ret = arg0.maxBindingsPerBindGroup;
        return ret;
    };
    imports.wbg.__wbg_maxBufferSize_deda0fa7852420cb = function(arg0) {
        const ret = arg0.maxBufferSize;
        return ret;
    };
    imports.wbg.__wbg_maxColorAttachmentBytesPerSample_4a4a0e04d76eaf2a = function(arg0) {
        const ret = arg0.maxColorAttachmentBytesPerSample;
        return ret;
    };
    imports.wbg.__wbg_maxColorAttachments_db4883eeb9e8aeae = function(arg0) {
        const ret = arg0.maxColorAttachments;
        return ret;
    };
    imports.wbg.__wbg_maxComputeInvocationsPerWorkgroup_d050c461ebc92998 = function(arg0) {
        const ret = arg0.maxComputeInvocationsPerWorkgroup;
        return ret;
    };
    imports.wbg.__wbg_maxComputeWorkgroupSizeX_48153a1b779879ad = function(arg0) {
        const ret = arg0.maxComputeWorkgroupSizeX;
        return ret;
    };
    imports.wbg.__wbg_maxComputeWorkgroupSizeY_7f73d3d16fdea180 = function(arg0) {
        const ret = arg0.maxComputeWorkgroupSizeY;
        return ret;
    };
    imports.wbg.__wbg_maxComputeWorkgroupSizeZ_9fcad0f0dfcffb05 = function(arg0) {
        const ret = arg0.maxComputeWorkgroupSizeZ;
        return ret;
    };
    imports.wbg.__wbg_maxComputeWorkgroupStorageSize_9fe29e00c7d166a6 = function(arg0) {
        const ret = arg0.maxComputeWorkgroupStorageSize;
        return ret;
    };
    imports.wbg.__wbg_maxComputeWorkgroupsPerDimension_f8321761bc8e8feb = function(arg0) {
        const ret = arg0.maxComputeWorkgroupsPerDimension;
        return ret;
    };
    imports.wbg.__wbg_maxDynamicStorageBuffersPerPipelineLayout_55e1416c376721db = function(arg0) {
        const ret = arg0.maxDynamicStorageBuffersPerPipelineLayout;
        return ret;
    };
    imports.wbg.__wbg_maxDynamicUniformBuffersPerPipelineLayout_17ff0903196c41a7 = function(arg0) {
        const ret = arg0.maxDynamicUniformBuffersPerPipelineLayout;
        return ret;
    };
    imports.wbg.__wbg_maxSampledTexturesPerShaderStage_59e5fc159e536f0d = function(arg0) {
        const ret = arg0.maxSampledTexturesPerShaderStage;
        return ret;
    };
    imports.wbg.__wbg_maxSamplersPerShaderStage_84f119909016576b = function(arg0) {
        const ret = arg0.maxSamplersPerShaderStage;
        return ret;
    };
    imports.wbg.__wbg_maxStorageBufferBindingSize_f9c3b3d285375ee0 = function(arg0) {
        const ret = arg0.maxStorageBufferBindingSize;
        return ret;
    };
    imports.wbg.__wbg_maxStorageBuffersPerShaderStage_f84b702138ac86a4 = function(arg0) {
        const ret = arg0.maxStorageBuffersPerShaderStage;
        return ret;
    };
    imports.wbg.__wbg_maxStorageTexturesPerShaderStage_226be46cbf594437 = function(arg0) {
        const ret = arg0.maxStorageTexturesPerShaderStage;
        return ret;
    };
    imports.wbg.__wbg_maxTextureArrayLayers_a8bf77269db7b94e = function(arg0) {
        const ret = arg0.maxTextureArrayLayers;
        return ret;
    };
    imports.wbg.__wbg_maxTextureDimension1D_8e69ba5596959195 = function(arg0) {
        const ret = arg0.maxTextureDimension1D;
        return ret;
    };
    imports.wbg.__wbg_maxTextureDimension2D_5a7a17047785cba5 = function(arg0) {
        const ret = arg0.maxTextureDimension2D;
        return ret;
    };
    imports.wbg.__wbg_maxTextureDimension3D_1ea793f1095d392a = function(arg0) {
        const ret = arg0.maxTextureDimension3D;
        return ret;
    };
    imports.wbg.__wbg_maxUniformBufferBindingSize_4b41f90d6914a995 = function(arg0) {
        const ret = arg0.maxUniformBufferBindingSize;
        return ret;
    };
    imports.wbg.__wbg_maxUniformBuffersPerShaderStage_c5db04bf022a0c83 = function(arg0) {
        const ret = arg0.maxUniformBuffersPerShaderStage;
        return ret;
    };
    imports.wbg.__wbg_maxVertexAttributes_e94e6c887b993b6c = function(arg0) {
        const ret = arg0.maxVertexAttributes;
        return ret;
    };
    imports.wbg.__wbg_maxVertexBufferArrayStride_92c15a2c2f0faf82 = function(arg0) {
        const ret = arg0.maxVertexBufferArrayStride;
        return ret;
    };
    imports.wbg.__wbg_maxVertexBuffers_db05674c76ef98c9 = function(arg0) {
        const ret = arg0.maxVertexBuffers;
        return ret;
    };
    imports.wbg.__wbg_measure_fb7825c11612c823 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        let deferred0_0;
        let deferred0_1;
        let deferred1_0;
        let deferred1_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            deferred1_0 = arg2;
            deferred1_1 = arg3;
            performance.measure(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }, arguments) };
    imports.wbg.__wbg_message_5c5d919204d42400 = function(arg0, arg1) {
        const ret = arg1.message;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_message_97a2af9b89d693a3 = function(arg0) {
        const ret = arg0.message;
        return ret;
    };
    imports.wbg.__wbg_metaKey_e1dd47d709a80ce5 = function(arg0) {
        const ret = arg0.metaKey;
        return ret;
    };
    imports.wbg.__wbg_minStorageBufferOffsetAlignment_2c9fb697a4aedb8b = function(arg0) {
        const ret = arg0.minStorageBufferOffsetAlignment;
        return ret;
    };
    imports.wbg.__wbg_minUniformBufferOffsetAlignment_6357875312bfd2f0 = function(arg0) {
        const ret = arg0.minUniformBufferOffsetAlignment;
        return ret;
    };
    imports.wbg.__wbg_moveTo_4736f466f9374ab1 = function(arg0, arg1, arg2) {
        arg0.moveTo(arg1, arg2);
    };
    imports.wbg.__wbg_name_0b327d569f00ebee = function(arg0) {
        const ret = arg0.name;
        return ret;
    };
    imports.wbg.__wbg_name_28c43f147574bf08 = function(arg0, arg1) {
        const ret = arg1.name;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_navigator_0a9bf1120e24fec2 = function(arg0) {
        const ret = arg0.navigator;
        return ret;
    };
    imports.wbg.__wbg_navigator_1577371c070c8947 = function(arg0) {
        const ret = arg0.navigator;
        return ret;
    };
    imports.wbg.__wbg_new0_f788a2397c7ca929 = function() {
        const ret = new Date();
        return ret;
    };
    imports.wbg.__wbg_new_23a2665fac83c611 = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_1791(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            const ret = new Promise(cb0);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_new_31a97dac4f10fab7 = function(arg0) {
        const ret = new Date(arg0);
        return ret;
    };
    imports.wbg.__wbg_new_405e22f390576ce2 = function() {
        const ret = new Object();
        return ret;
    };
    imports.wbg.__wbg_new_46e8134c3341d05a = function() { return handleError(function () {
        const ret = new FileReader();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_49bbf669d24a0662 = function() { return handleError(function (arg0) {
        const ret = new EncodedVideoChunk(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_4b3dfb29a594e831 = function() { return handleError(function () {
        const ret = new lAudioContext();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_59a6be6d80c4dcbb = function() { return handleError(function (arg0) {
        const ret = new VideoDecoder(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_78feb108b6472713 = function() {
        const ret = new Array();
        return ret;
    };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
        const ret = new Error();
        return ret;
    };
    imports.wbg.__wbg_new_92c54fc74574ef55 = function() { return handleError(function (arg0, arg1) {
        const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_new_a24f919c8039863a = function() { return handleError(function () {
        const ret = new Path2D();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_c68d7209be747379 = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_new_de241f3874bcd58d = function() { return handleError(function () {
        const ret = new DOMMatrix();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_newwitharray64_b8169dcde789c7b4 = function() { return handleError(function (arg0, arg1) {
        const ret = new DOMMatrix(getArrayF64FromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbuffersourcesequenceandoptions_3ee2a062716a9a0a = function() { return handleError(function (arg0, arg1) {
        const ret = new Blob(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_840f3c038856d4e9 = function(arg0, arg1, arg2) {
        const ret = new Int8Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_999332a180064b59 = function(arg0, arg1, arg2) {
        const ret = new Int32Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_d4a86622320ea258 = function(arg0, arg1, arg2) {
        const ret = new Uint16Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354 = function(arg0, arg1, arg2) {
        const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212 = function(arg0, arg1, arg2) {
        const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_f254047f7e80e7ff = function(arg0, arg1, arg2) {
        const ret = new Int16Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwitheventinitdict_502dbfa1b3d2fcbc = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new CloseEvent(getStringFromWasm0(arg0, arg1), arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithstrandinit_06c535e0a867c635 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithsw_dae0a8f485014db3 = function() { return handleError(function (arg0, arg1) {
        const ret = new ImageData(arg0 >>> 0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithu8arraysequence_1e24f242a67f6fdd = function() { return handleError(function (arg0) {
        const ret = new Blob(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithu8arraysequenceandoptions_068570c487f69127 = function() { return handleError(function (arg0, arg1) {
        const ret = new Blob(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithu8clampedarray_0fcf78a036c89a97 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_next_6574e1a8a62d1055 = function() { return handleError(function (arg0) {
        const ret = arg0.next();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_now_2c95c9de01293173 = function(arg0) {
        const ret = arg0.now();
        return ret;
    };
    imports.wbg.__wbg_of_2eaf5a02d443ef03 = function(arg0) {
        const ret = Array.of(arg0);
        return ret;
    };
    imports.wbg.__wbg_of_66b3ee656cbd962b = function(arg0, arg1) {
        const ret = Array.of(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbg_offsetX_adb14e39bdd32e22 = function(arg0) {
        const ret = arg0.offsetX;
        return ret;
    };
    imports.wbg.__wbg_offsetY_e88dc24ec0418dd4 = function(arg0) {
        const ret = arg0.offsetY;
        return ret;
    };
    imports.wbg.__wbg_ok_3aaf32d069979723 = function(arg0) {
        const ret = arg0.ok;
        return ret;
    };
    imports.wbg.__wbg_onCallbackAvailable_bd945d93c9017006 = function(arg0, arg1, arg2) {
        arg0.onCallbackAvailable(getStringFromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_openVirtualKeyboard_7f85d766c82ab290 = function(arg0) {
        arg0.openVirtualKeyboard();
    };
    imports.wbg.__wbg_open_6c3f5ef5a0204c5d = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.open(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_ownKeys_3930041068756f1f = function() { return handleError(function (arg0) {
        const ret = Reflect.ownKeys(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_panic_68fe4c575d1b5a09 = function(arg0, arg1) {
        arg0.panic(arg1);
    };
    imports.wbg.__wbg_parentElement_be28a1a931f9c9b7 = function(arg0) {
        const ret = arg0.parentElement;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_performance_7a3ffd0b17f663ad = function(arg0) {
        const ret = arg0.performance;
        return ret;
    };
    imports.wbg.__wbg_pixelStorei_6aba5d04cdcaeaf6 = function(arg0, arg1, arg2) {
        arg0.pixelStorei(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_pixelStorei_c8520e4b46f4a973 = function(arg0, arg1, arg2) {
        arg0.pixelStorei(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_platform_faf02c487289f206 = function() { return handleError(function (arg0, arg1) {
        const ret = arg1.platform;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_pointerId_585e63ee80a49927 = function(arg0) {
        const ret = arg0.pointerId;
        return ret;
    };
    imports.wbg.__wbg_polygonOffset_773fe0017b2c8f51 = function(arg0, arg1, arg2) {
        arg0.polygonOffset(arg1, arg2);
    };
    imports.wbg.__wbg_polygonOffset_8c11c066486216c4 = function(arg0, arg1, arg2) {
        arg0.polygonOffset(arg1, arg2);
    };
    imports.wbg.__wbg_pressed_b3de5f0878ceb06e = function(arg0) {
        const ret = arg0.pressed;
        return ret;
    };
    imports.wbg.__wbg_preventDefault_c2314fd813c02b3c = function(arg0) {
        arg0.preventDefault();
    };
    imports.wbg.__wbg_protocol_faa0494a9b2554cb = function() { return handleError(function (arg0, arg1) {
        const ret = arg1.protocol;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_push_737cfc8c1432c2c6 = function(arg0, arg1) {
        const ret = arg0.push(arg1);
        return ret;
    };
    imports.wbg.__wbg_putImageData_4c5aa10f3b3e4924 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.putImageData(arg1, arg2, arg3);
    }, arguments) };
    imports.wbg.__wbg_quadraticCurveTo_35f0a0f2f7d36113 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.quadraticCurveTo(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_queryCounterEXT_7aed85645b7ec1da = function(arg0, arg1, arg2) {
        arg0.queryCounterEXT(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_querySelectorAll_40998fd748f057ef = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.querySelectorAll(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_querySelector_c69f8b573958906b = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_querySelector_d638ba83a95cf66a = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.querySelector(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_queueMicrotask_97d92b4fcc8a61c5 = function(arg0) {
        queueMicrotask(arg0);
    };
    imports.wbg.__wbg_queueMicrotask_d3219def82552485 = function(arg0) {
        const ret = arg0.queueMicrotask;
        return ret;
    };
    imports.wbg.__wbg_queue_1f589e8194b004a6 = function(arg0) {
        const ret = arg0.queue;
        return ret;
    };
    imports.wbg.__wbg_readAsArrayBuffer_e51cb3c4fcc962de = function() { return handleError(function (arg0, arg1) {
        arg0.readAsArrayBuffer(arg1);
    }, arguments) };
    imports.wbg.__wbg_readBuffer_1c35b1e4939f881d = function(arg0, arg1) {
        arg0.readBuffer(arg1 >>> 0);
    };
    imports.wbg.__wbg_readPixels_51a0c02cdee207a5 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
        arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
    }, arguments) };
    imports.wbg.__wbg_readPixels_a6cbb21794452142 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
        arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
    }, arguments) };
    imports.wbg.__wbg_readPixels_cd64c5a7b0343355 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
        arg0.readPixels(arg1, arg2, arg3, arg4, arg5 >>> 0, arg6 >>> 0, arg7);
    }, arguments) };
    imports.wbg.__wbg_readText_c5c32cada2022712 = function(arg0) {
        const ret = arg0.readText();
        return ret;
    };
    imports.wbg.__wbg_read_a2434af1186cb56c = function(arg0) {
        const ret = arg0.read();
        return ret;
    };
    imports.wbg.__wbg_readyState_7ef6e63c349899ed = function(arg0) {
        const ret = arg0.readyState;
        return ret;
    };
    imports.wbg.__wbg_reason_49f1cede8bcf23dd = function(arg0, arg1) {
        const ret = arg1.reason;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_rect_81e517dfad48e8d9 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.rect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_redirected_4650287f2647ef36 = function(arg0) {
        const ret = arg0.redirected;
        return ret;
    };
    imports.wbg.__wbg_relatedTarget_d245b4078428fc22 = function(arg0) {
        const ret = arg0.relatedTarget;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_releaseLock_091899af97991d2e = function(arg0) {
        arg0.releaseLock();
    };
    imports.wbg.__wbg_releasePointerCapture_e950e66cb5438c50 = function() { return handleError(function (arg0, arg1) {
        arg0.releasePointerCapture(arg1);
    }, arguments) };
    imports.wbg.__wbg_reloadWithCanvasRenderer_d9ec51d58de4b584 = function(arg0) {
        arg0.reloadWithCanvasRenderer();
    };
    imports.wbg.__wbg_removeChild_841bf1dc802c0a2c = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.removeChild(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_removeEventListener_056dfe8c3d6c58f9 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3);
    }, arguments) };
    imports.wbg.__wbg_removeEventListener_d365ee1c2a7b08f0 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.removeEventListener(getStringFromWasm0(arg1, arg2), arg3, arg4 !== 0);
    }, arguments) };
    imports.wbg.__wbg_remove_e2d2659f3128c045 = function(arg0) {
        arg0.remove();
    };
    imports.wbg.__wbg_renderbufferStorageMultisample_13fbd5e58900c6fe = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.renderbufferStorageMultisample(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
    };
    imports.wbg.__wbg_renderbufferStorage_73e01ea83b8afab4 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
    };
    imports.wbg.__wbg_renderbufferStorage_f010012bd3566942 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.renderbufferStorage(arg1 >>> 0, arg2 >>> 0, arg3, arg4);
    };
    imports.wbg.__wbg_replace_5f8f0dfb7c0efb12 = function(arg0, arg1, arg2, arg3) {
        const ret = arg0.replace(arg1, getStringFromWasm0(arg2, arg3));
        return ret;
    };
    imports.wbg.__wbg_requestAdapter_51be7e8ee7d08b87 = function(arg0, arg1) {
        const ret = arg0.requestAdapter(arg1);
        return ret;
    };
    imports.wbg.__wbg_requestAnimationFrame_d7fd890aaefc3246 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.requestAnimationFrame(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_requestDevice_338f0085866d40a2 = function(arg0, arg1) {
        const ret = arg0.requestDevice(arg1);
        return ret;
    };
    imports.wbg.__wbg_resetTransform_abe10925627cf062 = function() { return handleError(function (arg0) {
        arg0.resetTransform();
    }, arguments) };
    imports.wbg.__wbg_resolve_4851785c9c5f573d = function(arg0) {
        const ret = Promise.resolve(arg0);
        return ret;
    };
    imports.wbg.__wbg_respond_1f279fa9f8edcb1c = function() { return handleError(function (arg0, arg1) {
        arg0.respond(arg1 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_restore_cc5ae2746f7b5043 = function(arg0) {
        arg0.restore();
    };
    imports.wbg.__wbg_result_dadbdcc801180072 = function() { return handleError(function (arg0) {
        const ret = arg0.result;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_resume_35efdc4ffe13bf18 = function() { return handleError(function (arg0) {
        const ret = arg0.resume();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_revokeObjectURL_27267efebeb457c7 = function() { return handleError(function (arg0, arg1) {
        URL.revokeObjectURL(getStringFromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_rufflehandle_new = function(arg0) {
        const ret = RuffleHandle.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_sampleRate_b7a06df362a2b6b3 = function(arg0) {
        const ret = arg0.sampleRate;
        return ret;
    };
    imports.wbg.__wbg_samplerParameterf_909baf50360c94d4 = function(arg0, arg1, arg2, arg3) {
        arg0.samplerParameterf(arg1, arg2 >>> 0, arg3);
    };
    imports.wbg.__wbg_samplerParameteri_d5c292172718da63 = function(arg0, arg1, arg2, arg3) {
        arg0.samplerParameteri(arg1, arg2 >>> 0, arg3);
    };
    imports.wbg.__wbg_save_c675a7a4bbd44e4a = function(arg0) {
        arg0.save();
    };
    imports.wbg.__wbg_scissor_e917a332f67a5d30 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.scissor(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_scissor_eb177ca33bf24a44 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.scissor(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_search_db83e9563041480d = function(arg0, arg1) {
        const ret = arg0.search(arg1);
        return ret;
    };
    imports.wbg.__wbg_select_a6f799366a79c31b = function(arg0) {
        arg0.select();
    };
    imports.wbg.__wbg_send_0293179ba074ffb4 = function() { return handleError(function (arg0, arg1, arg2) {
        arg0.send(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_send_fc0c204e8a1757f4 = function() { return handleError(function (arg0, arg1, arg2) {
        arg0.send(getArrayU8FromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_setAttributeNS_e6b1d3fe34fab2a0 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.setAttributeNS(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
    }, arguments) };
    imports.wbg.__wbg_setAttribute_2704501201f15687 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.setAttribute(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_setBindGroup_306b5f43159153da = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.setBindGroup(arg1 >>> 0, arg2, getArrayU32FromWasm0(arg3, arg4), arg5, arg6 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_setBindGroup_d3cd0c65d5718e66 = function(arg0, arg1, arg2) {
        arg0.setBindGroup(arg1 >>> 0, arg2);
    };
    imports.wbg.__wbg_setFullscreen_a1107f821cc6a0c7 = function() { return handleError(function (arg0, arg1) {
        arg0.setFullscreen(arg1 !== 0);
    }, arguments) };
    imports.wbg.__wbg_setIndexBuffer_30e80db5e2d70b3f = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3, arg4);
    };
    imports.wbg.__wbg_setIndexBuffer_cf65b9a3b9ae2921 = function(arg0, arg1, arg2, arg3) {
        arg0.setIndexBuffer(arg1, __wbindgen_enum_GpuIndexFormat[arg2], arg3);
    };
    imports.wbg.__wbg_setMetadata_3864e8ad332248cc = function(arg0, arg1) {
        arg0.setMetadata(arg1);
    };
    imports.wbg.__wbg_setPipeline_f44bbc63b7455235 = function(arg0, arg1) {
        arg0.setPipeline(arg1);
    };
    imports.wbg.__wbg_setPointerCapture_c04dafaf4d00ffad = function() { return handleError(function (arg0, arg1) {
        arg0.setPointerCapture(arg1);
    }, arguments) };
    imports.wbg.__wbg_setProperty_f2cf326652b9a713 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.setProperty(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_setScissorRect_b3ae2865d79457e5 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.setScissorRect(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
    };
    imports.wbg.__wbg_setStencilReference_ef250211a9d58f7e = function(arg0, arg1) {
        arg0.setStencilReference(arg1 >>> 0);
    };
    imports.wbg.__wbg_setTimeout_461fec76662b35ea = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.setTimeout(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setTransform_840517837e2877d6 = function(arg0, arg1) {
        arg0.setTransform(arg1);
    };
    imports.wbg.__wbg_setTransform_8c4d954cafb34b75 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.setTransform(arg1, arg2, arg3, arg4, arg5, arg6);
    }, arguments) };
    imports.wbg.__wbg_setVertexBuffer_5e5ec203042c0564 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_setVertexBuffer_950908f301fc83b4 = function(arg0, arg1, arg2, arg3) {
        arg0.setVertexBuffer(arg1 >>> 0, arg2, arg3);
    };
    imports.wbg.__wbg_set_11cd83f45504cedf = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.set(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_set_37837023f3d740e8 = function(arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    };
    imports.wbg.__wbg_set_3f1d0b984ed272ed = function(arg0, arg1, arg2) {
        arg0[arg1] = arg2;
    };
    imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_set_bb8cecf6a62b9f46 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_d9a72c1550e3f2b5 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0[getStringFromWasm0(arg1, arg2)] = getStringFromWasm0(arg3, arg4);
    }, arguments) };
    imports.wbg.__wbg_seta_6ca4b80abcaa9bb0 = function(arg0, arg1) {
        arg0.a = arg1;
    };
    imports.wbg.__wbg_seta_ce08133f118447c9 = function(arg0, arg1) {
        arg0.a = arg1;
    };
    imports.wbg.__wbg_setaccept_ff32b9ffcfbd061d = function(arg0, arg1, arg2) {
        arg0.accept = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setaccess_c17e0a436ed1d78e = function(arg0, arg1) {
        arg0.access = __wbindgen_enum_GpuStorageTextureAccess[arg1];
    };
    imports.wbg.__wbg_setaction_4510e88e8ccbbc3f = function(arg0, arg1, arg2) {
        arg0.action = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setaddressmodeu_9a2648489304b6c3 = function(arg0, arg1) {
        arg0.addressModeU = __wbindgen_enum_GpuAddressMode[arg1];
    };
    imports.wbg.__wbg_setaddressmodev_911f607ff1319cf6 = function(arg0, arg1) {
        arg0.addressModeV = __wbindgen_enum_GpuAddressMode[arg1];
    };
    imports.wbg.__wbg_setaddressmodew_b7c68665b89d5500 = function(arg0, arg1) {
        arg0.addressModeW = __wbindgen_enum_GpuAddressMode[arg1];
    };
    imports.wbg.__wbg_setalpha_eb6e37beb08f6a6a = function(arg0, arg1) {
        arg0.alpha = arg1;
    };
    imports.wbg.__wbg_setalphamode_2a9be051489d8bbd = function(arg0, arg1) {
        arg0.alphaMode = __wbindgen_enum_GpuCanvasAlphaMode[arg1];
    };
    imports.wbg.__wbg_setalphatocoverageenabled_1f594c6ef9ae4caa = function(arg0, arg1) {
        arg0.alphaToCoverageEnabled = arg1 !== 0;
    };
    imports.wbg.__wbg_setarraylayercount_93d58eca9387b84c = function(arg0, arg1) {
        arg0.arrayLayerCount = arg1 >>> 0;
    };
    imports.wbg.__wbg_setarraystride_5ace211a6c31af55 = function(arg0, arg1) {
        arg0.arrayStride = arg1;
    };
    imports.wbg.__wbg_setaspect_e3aa9cad44e6338f = function(arg0, arg1) {
        arg0.aspect = __wbindgen_enum_GpuTextureAspect[arg1];
    };
    imports.wbg.__wbg_setattributes_8cfe8a349778ff6d = function(arg0, arg1) {
        arg0.attributes = arg1;
    };
    imports.wbg.__wbg_setb_52915cc78721cadb = function(arg0, arg1) {
        arg0.b = arg1;
    };
    imports.wbg.__wbg_setbasearraylayer_798dcd012d28aafd = function(arg0, arg1) {
        arg0.baseArrayLayer = arg1 >>> 0;
    };
    imports.wbg.__wbg_setbasemiplevel_ff05f0742029fbd7 = function(arg0, arg1) {
        arg0.baseMipLevel = arg1 >>> 0;
    };
    imports.wbg.__wbg_setbeginningofpasswriteindex_ad07a73147217513 = function(arg0, arg1) {
        arg0.beginningOfPassWriteIndex = arg1 >>> 0;
    };
    imports.wbg.__wbg_setbinaryType_92fa1ffd873b327c = function(arg0, arg1) {
        arg0.binaryType = __wbindgen_enum_BinaryType[arg1];
    };
    imports.wbg.__wbg_setbindgrouplayouts_9eff5e187a1db39e = function(arg0, arg1) {
        arg0.bindGroupLayouts = arg1;
    };
    imports.wbg.__wbg_setbinding_3ada8a83c514d419 = function(arg0, arg1) {
        arg0.binding = arg1 >>> 0;
    };
    imports.wbg.__wbg_setbinding_9a389db987313ca9 = function(arg0, arg1) {
        arg0.binding = arg1 >>> 0;
    };
    imports.wbg.__wbg_setblend_15fcdb6fca391aa3 = function(arg0, arg1) {
        arg0.blend = arg1;
    };
    imports.wbg.__wbg_setbody_5923b78a95eedf29 = function(arg0, arg1) {
        arg0.body = arg1;
    };
    imports.wbg.__wbg_setbuffer_10a9ee2a05c73896 = function(arg0, arg1) {
        arg0.buffer = arg1;
    };
    imports.wbg.__wbg_setbuffer_1fbf10c9c273bb39 = function(arg0, arg1) {
        arg0.buffer = arg1;
    };
    imports.wbg.__wbg_setbuffer_581ee8422928bd0d = function(arg0, arg1) {
        arg0.buffer = arg1;
    };
    imports.wbg.__wbg_setbuffer_ac25c198252221bd = function(arg0, arg1) {
        arg0.buffer = arg1;
    };
    imports.wbg.__wbg_setbuffers_4515e14c72e1bc45 = function(arg0, arg1) {
        arg0.buffers = arg1;
    };
    imports.wbg.__wbg_setbytesperrow_4c52e94a64f7b18a = function(arg0, arg1) {
        arg0.bytesPerRow = arg1 >>> 0;
    };
    imports.wbg.__wbg_setbytesperrow_dada68f168446660 = function(arg0, arg1) {
        arg0.bytesPerRow = arg1 >>> 0;
    };
    imports.wbg.__wbg_setcapture_46bd7043887eba02 = function(arg0, arg1) {
        arg0.capture = arg1 !== 0;
    };
    imports.wbg.__wbg_setclearvalue_9fd25161e3ff7358 = function(arg0, arg1) {
        arg0.clearValue = arg1;
    };
    imports.wbg.__wbg_setcode_156060465a2f8f79 = function(arg0, arg1) {
        arg0.code = arg1;
    };
    imports.wbg.__wbg_setcode_1d146372551ab97f = function(arg0, arg1, arg2) {
        arg0.code = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setcodec_4711d15b4dc250aa = function(arg0, arg1, arg2) {
        arg0.codec = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setcolor_63a788c8828014d8 = function(arg0, arg1) {
        arg0.color = arg1;
    };
    imports.wbg.__wbg_setcolorattachments_b56ec268556eb0af = function(arg0, arg1) {
        arg0.colorAttachments = arg1;
    };
    imports.wbg.__wbg_setcompare_986db63daac4c337 = function(arg0, arg1) {
        arg0.compare = __wbindgen_enum_GpuCompareFunction[arg1];
    };
    imports.wbg.__wbg_setcompare_b6bd133fd1c7206a = function(arg0, arg1) {
        arg0.compare = __wbindgen_enum_GpuCompareFunction[arg1];
    };
    imports.wbg.__wbg_setcount_6b3574238f446a02 = function(arg0, arg1) {
        arg0.count = arg1 >>> 0;
    };
    imports.wbg.__wbg_setcredentials_c3a22f1cd105a2c6 = function(arg0, arg1) {
        arg0.credentials = __wbindgen_enum_RequestCredentials[arg1];
    };
    imports.wbg.__wbg_setcullmode_f1cc439f208cf7d2 = function(arg0, arg1) {
        arg0.cullMode = __wbindgen_enum_GpuCullMode[arg1];
    };
    imports.wbg.__wbg_setd_909aae55675656bf = function(arg0, arg1) {
        arg0.d = arg1;
    };
    imports.wbg.__wbg_setdata_5aa9939c8f2f7291 = function(arg0, arg1) {
        arg0.data = arg1;
    };
    imports.wbg.__wbg_setdepthbias_0c225de07a2372b1 = function(arg0, arg1) {
        arg0.depthBias = arg1;
    };
    imports.wbg.__wbg_setdepthbiasclamp_bd34181bc74b8a65 = function(arg0, arg1) {
        arg0.depthBiasClamp = arg1;
    };
    imports.wbg.__wbg_setdepthbiasslopescale_d43ddce65f19c9be = function(arg0, arg1) {
        arg0.depthBiasSlopeScale = arg1;
    };
    imports.wbg.__wbg_setdepthclearvalue_eb76fedd34b20053 = function(arg0, arg1) {
        arg0.depthClearValue = arg1;
    };
    imports.wbg.__wbg_setdepthcompare_491947ed2f6065b9 = function(arg0, arg1) {
        arg0.depthCompare = __wbindgen_enum_GpuCompareFunction[arg1];
    };
    imports.wbg.__wbg_setdepthfailop_4983b01413b9f743 = function(arg0, arg1) {
        arg0.depthFailOp = __wbindgen_enum_GpuStencilOperation[arg1];
    };
    imports.wbg.__wbg_setdepthloadop_c7deb718c4129a2c = function(arg0, arg1) {
        arg0.depthLoadOp = __wbindgen_enum_GpuLoadOp[arg1];
    };
    imports.wbg.__wbg_setdepthorarraylayers_5686e74657700bc2 = function(arg0, arg1) {
        arg0.depthOrArrayLayers = arg1 >>> 0;
    };
    imports.wbg.__wbg_setdepthreadonly_18602250b14fa638 = function(arg0, arg1) {
        arg0.depthReadOnly = arg1 !== 0;
    };
    imports.wbg.__wbg_setdepthstencil_e6069a8b511d1004 = function(arg0, arg1) {
        arg0.depthStencil = arg1;
    };
    imports.wbg.__wbg_setdepthstencilattachment_90d13c414095197d = function(arg0, arg1) {
        arg0.depthStencilAttachment = arg1;
    };
    imports.wbg.__wbg_setdepthstoreop_55f84f2f9039c453 = function(arg0, arg1) {
        arg0.depthStoreOp = __wbindgen_enum_GpuStoreOp[arg1];
    };
    imports.wbg.__wbg_setdepthwriteenabled_e419ffe553654371 = function(arg0, arg1) {
        arg0.depthWriteEnabled = arg1 !== 0;
    };
    imports.wbg.__wbg_setdescription_d1194da3c0c55b20 = function(arg0, arg1) {
        arg0.description = arg1;
    };
    imports.wbg.__wbg_setdevice_91facdf766d51abf = function(arg0, arg1) {
        arg0.device = arg1;
    };
    imports.wbg.__wbg_setdimension_47ad758bb7805028 = function(arg0, arg1) {
        arg0.dimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
    };
    imports.wbg.__wbg_setdimension_500c3bec57e8ac12 = function(arg0, arg1) {
        arg0.dimension = __wbindgen_enum_GpuTextureDimension[arg1];
    };
    imports.wbg.__wbg_setdownload_2af133b91eb04665 = function(arg0, arg1, arg2) {
        arg0.download = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setdstfactor_abdf4d85b8f742b5 = function(arg0, arg1) {
        arg0.dstFactor = __wbindgen_enum_GpuBlendFactor[arg1];
    };
    imports.wbg.__wbg_setendofpasswriteindex_82a42f6ec7d55754 = function(arg0, arg1) {
        arg0.endOfPassWriteIndex = arg1 >>> 0;
    };
    imports.wbg.__wbg_setentries_136baaaafb25087f = function(arg0, arg1) {
        arg0.entries = arg1;
    };
    imports.wbg.__wbg_setentries_7c41d594195ebe78 = function(arg0, arg1) {
        arg0.entries = arg1;
    };
    imports.wbg.__wbg_setentrypoint_913e091cc9a07667 = function(arg0, arg1, arg2) {
        arg0.entryPoint = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setentrypoint_96944272d50efb55 = function(arg0, arg1, arg2) {
        arg0.entryPoint = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_seterror_4ce8a2ad7ee75507 = function(arg0, arg1) {
        arg0.error = arg1;
    };
    imports.wbg.__wbg_setfailop_fd94b46d0cd7c4f2 = function(arg0, arg1) {
        arg0.failOp = __wbindgen_enum_GpuStencilOperation[arg1];
    };
    imports.wbg.__wbg_setfillStyle_2205fca942c641ba = function(arg0, arg1, arg2) {
        arg0.fillStyle = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setfillStyle_42e38d3d485e9a92 = function(arg0, arg1) {
        arg0.fillStyle = arg1;
    };
    imports.wbg.__wbg_setfillStyle_463d0239de4edade = function(arg0, arg1) {
        arg0.fillStyle = arg1;
    };
    imports.wbg.__wbg_setfilter_c76060d57791e4f9 = function(arg0, arg1, arg2) {
        arg0.filter = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setformat_29126ee763612515 = function(arg0, arg1) {
        arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
    };
    imports.wbg.__wbg_setformat_450c4be578985cb4 = function(arg0, arg1) {
        arg0.format = __wbindgen_enum_GpuVertexFormat[arg1];
    };
    imports.wbg.__wbg_setformat_582f639b8a79115c = function(arg0, arg1) {
        arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
    };
    imports.wbg.__wbg_setformat_6ac892268eeef402 = function(arg0, arg1) {
        arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
    };
    imports.wbg.__wbg_setformat_a622a57e42ae23e4 = function(arg0, arg1) {
        arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
    };
    imports.wbg.__wbg_setformat_bdfc7be2aa989382 = function(arg0, arg1) {
        arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
    };
    imports.wbg.__wbg_setformat_c3ba1e26468014ae = function(arg0, arg1) {
        arg0.format = __wbindgen_enum_GpuTextureFormat[arg1];
    };
    imports.wbg.__wbg_setfragment_84f03cfa83c432b2 = function(arg0, arg1) {
        arg0.fragment = arg1;
    };
    imports.wbg.__wbg_setfrontface_1c87b2e21f85a97f = function(arg0, arg1) {
        arg0.frontFace = __wbindgen_enum_GpuFrontFace[arg1];
    };
    imports.wbg.__wbg_setg_b94c63958617b86c = function(arg0, arg1) {
        arg0.g = arg1;
    };
    imports.wbg.__wbg_setglobalAlpha_4673ca870e9d3439 = function(arg0, arg1) {
        arg0.globalAlpha = arg1;
    };
    imports.wbg.__wbg_setglobalCompositeOperation_9a7a92bac2fb7ffd = function() { return handleError(function (arg0, arg1, arg2) {
        arg0.globalCompositeOperation = getStringFromWasm0(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_sethasdynamicoffset_9dc29179158975e4 = function(arg0, arg1) {
        arg0.hasDynamicOffset = arg1 !== 0;
    };
    imports.wbg.__wbg_setheight_080fa3e226a83750 = function(arg0, arg1) {
        arg0.height = arg1 >>> 0;
    };
    imports.wbg.__wbg_setheight_433680330c9420c3 = function(arg0, arg1) {
        arg0.height = arg1 >>> 0;
    };
    imports.wbg.__wbg_setheight_da683a33fa99843c = function(arg0, arg1) {
        arg0.height = arg1 >>> 0;
    };
    imports.wbg.__wbg_sethref_5d8095525d8737d4 = function(arg0, arg1, arg2) {
        arg0.href = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setid_d1300d55a412791b = function(arg0, arg1, arg2) {
        arg0.id = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setimageSmoothingEnabled_d11427a7f069cc1d = function(arg0, arg1) {
        arg0.imageSmoothingEnabled = arg1 !== 0;
    };
    imports.wbg.__wbg_setinnerHTML_31bde41f835786f7 = function(arg0, arg1, arg2) {
        arg0.innerHTML = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setinnerText_b11978b8158639c4 = function(arg0, arg1, arg2) {
        arg0.innerText = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_034d85243342ac5c = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_1e2e0069cbf2bd78 = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_21544401e31cd317 = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_2312a64e22934a2b = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_2ed86217d97ea3d5 = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_3f988ca8291e319f = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_73d706a16d13a23c = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_81dd67dee9cd4287 = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_8f9ebe053f8da7a0 = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_bfbd23fc748f8f94 = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_d400966bd7759b26 = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_e1499888d936ca3f = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlabel_ecb2c1eab1d46433 = function(arg0, arg1, arg2) {
        arg0.label = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlayout_0770a97fe3411616 = function(arg0, arg1) {
        arg0.layout = arg1;
    };
    imports.wbg.__wbg_setlayout_0e88cce0b3d76c31 = function(arg0, arg1) {
        arg0.layout = arg1;
    };
    imports.wbg.__wbg_setlineCap_52b6d742c95a5630 = function(arg0, arg1, arg2) {
        arg0.lineCap = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlineJoin_7e005d90ef83d627 = function(arg0, arg1, arg2) {
        arg0.lineJoin = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setlineWidth_ec730c524f09baa9 = function(arg0, arg1) {
        arg0.lineWidth = arg1;
    };
    imports.wbg.__wbg_setloadop_6725bf0c5b509ae7 = function(arg0, arg1) {
        arg0.loadOp = __wbindgen_enum_GpuLoadOp[arg1];
    };
    imports.wbg.__wbg_setlodmaxclamp_3a51dd81fde72c8d = function(arg0, arg1) {
        arg0.lodMaxClamp = arg1;
    };
    imports.wbg.__wbg_setlodminclamp_f48943c1f01e12f9 = function(arg0, arg1) {
        arg0.lodMinClamp = arg1;
    };
    imports.wbg.__wbg_setmagfilter_5794fd33d3902192 = function(arg0, arg1) {
        arg0.magFilter = __wbindgen_enum_GpuFilterMode[arg1];
    };
    imports.wbg.__wbg_setmappedatcreation_e0c884a30f64323b = function(arg0, arg1) {
        arg0.mappedAtCreation = arg1 !== 0;
    };
    imports.wbg.__wbg_setmask_9094d3e3f6f3a7dc = function(arg0, arg1) {
        arg0.mask = arg1 >>> 0;
    };
    imports.wbg.__wbg_setmaxanisotropy_1377b74addad8758 = function(arg0, arg1) {
        arg0.maxAnisotropy = arg1;
    };
    imports.wbg.__wbg_setmethod_2ebc89f2a1b4664c = function(arg0, arg1, arg2) {
        arg0.method = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setmethod_3c5280fe5d890842 = function(arg0, arg1, arg2) {
        arg0.method = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setminbindingsize_4a9f4d0d9ee579af = function(arg0, arg1) {
        arg0.minBindingSize = arg1;
    };
    imports.wbg.__wbg_setminfilter_32dc39202a18cd7b = function(arg0, arg1) {
        arg0.minFilter = __wbindgen_enum_GpuFilterMode[arg1];
    };
    imports.wbg.__wbg_setmiplevel_992f82e991b163b8 = function(arg0, arg1) {
        arg0.mipLevel = arg1 >>> 0;
    };
    imports.wbg.__wbg_setmiplevelcount_1d13855f7726190c = function(arg0, arg1) {
        arg0.mipLevelCount = arg1 >>> 0;
    };
    imports.wbg.__wbg_setmiplevelcount_a5a0102e4248e5bb = function(arg0, arg1) {
        arg0.mipLevelCount = arg1 >>> 0;
    };
    imports.wbg.__wbg_setmipmapfilter_00493c30d94b571e = function(arg0, arg1) {
        arg0.mipmapFilter = __wbindgen_enum_GpuMipmapFilterMode[arg1];
    };
    imports.wbg.__wbg_setmiterLimit_9ffca64ec692501d = function(arg0, arg1) {
        arg0.miterLimit = arg1;
    };
    imports.wbg.__wbg_setmodule_882651860e912779 = function(arg0, arg1) {
        arg0.module = arg1;
    };
    imports.wbg.__wbg_setmodule_b46c4a937ee89c3b = function(arg0, arg1) {
        arg0.module = arg1;
    };
    imports.wbg.__wbg_setmultiple_1b3b3f243cda56b2 = function(arg0, arg1) {
        arg0.multiple = arg1 !== 0;
    };
    imports.wbg.__wbg_setmultisample_0a38af2e310bacc6 = function(arg0, arg1) {
        arg0.multisample = arg1;
    };
    imports.wbg.__wbg_setmultisampled_f2de771b3ad62ff3 = function(arg0, arg1) {
        arg0.multisampled = arg1 !== 0;
    };
    imports.wbg.__wbg_setname_fc436ede35bd8af1 = function(arg0, arg1, arg2) {
        arg0.name = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setoffset_2f662a67531a826b = function(arg0, arg1) {
        arg0.offset = arg1;
    };
    imports.wbg.__wbg_setoffset_31c0a660f535c545 = function(arg0, arg1) {
        arg0.offset = arg1;
    };
    imports.wbg.__wbg_setoffset_3eb0797dcc9c9464 = function(arg0, arg1) {
        arg0.offset = arg1;
    };
    imports.wbg.__wbg_setoffset_a675629849c5f3b4 = function(arg0, arg1) {
        arg0.offset = arg1;
    };
    imports.wbg.__wbg_setonce_0cb80aea26303a35 = function(arg0, arg1) {
        arg0.once = arg1 !== 0;
    };
    imports.wbg.__wbg_setonclick_d0c6e25a994463d9 = function(arg0, arg1) {
        arg0.onclick = arg1;
    };
    imports.wbg.__wbg_setonended_afec7b900a9d62d8 = function(arg0, arg1) {
        arg0.onended = arg1;
    };
    imports.wbg.__wbg_setonload_1302417ca59f658b = function(arg0, arg1) {
        arg0.onload = arg1;
    };
    imports.wbg.__wbg_setoperation_879618283d591339 = function(arg0, arg1) {
        arg0.operation = __wbindgen_enum_GpuBlendOperation[arg1];
    };
    imports.wbg.__wbg_setoptimizeforlatency_0bccf9d26e3e2224 = function(arg0, arg1) {
        arg0.optimizeForLatency = arg1 !== 0;
    };
    imports.wbg.__wbg_setorigin_11de57058b4d23fb = function(arg0, arg1) {
        arg0.origin = arg1;
    };
    imports.wbg.__wbg_setoutput_ff9dc597ad64d749 = function(arg0, arg1) {
        arg0.output = arg1;
    };
    imports.wbg.__wbg_setpassive_57a5a4c4b00a7c62 = function(arg0, arg1) {
        arg0.passive = arg1 !== 0;
    };
    imports.wbg.__wbg_setpassop_238c7cbc20505ae9 = function(arg0, arg1) {
        arg0.passOp = __wbindgen_enum_GpuStencilOperation[arg1];
    };
    imports.wbg.__wbg_setpowerpreference_f4cead100f48bab0 = function(arg0, arg1) {
        arg0.powerPreference = __wbindgen_enum_GpuPowerPreference[arg1];
    };
    imports.wbg.__wbg_setprimitive_01150af3e98fb372 = function(arg0, arg1) {
        arg0.primitive = arg1;
    };
    imports.wbg.__wbg_setqueryset_8441106911a3af36 = function(arg0, arg1) {
        arg0.querySet = arg1;
    };
    imports.wbg.__wbg_setr_08c1678b22216ee0 = function(arg0, arg1) {
        arg0.r = arg1;
    };
    imports.wbg.__wbg_setreason_d29ac0402eeeb81a = function(arg0, arg1, arg2) {
        arg0.reason = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setrequiredfeatures_e9ee2e22feba0db3 = function(arg0, arg1) {
        arg0.requiredFeatures = arg1;
    };
    imports.wbg.__wbg_setresolvetarget_d00e2ef5a7388503 = function(arg0, arg1) {
        arg0.resolveTarget = arg1;
    };
    imports.wbg.__wbg_setresource_5a4cc69a127b394e = function(arg0, arg1) {
        arg0.resource = arg1;
    };
    imports.wbg.__wbg_setrowsperimage_678794ed5e8f43cd = function(arg0, arg1) {
        arg0.rowsPerImage = arg1 >>> 0;
    };
    imports.wbg.__wbg_setrowsperimage_f456122723767189 = function(arg0, arg1) {
        arg0.rowsPerImage = arg1 >>> 0;
    };
    imports.wbg.__wbg_setsamplecount_c44a2a6eebe72dcc = function(arg0, arg1) {
        arg0.sampleCount = arg1 >>> 0;
    };
    imports.wbg.__wbg_setsampler_ab33334fb83c5a17 = function(arg0, arg1) {
        arg0.sampler = arg1;
    };
    imports.wbg.__wbg_setsampletype_89fd8e71274ee6c2 = function(arg0, arg1) {
        arg0.sampleType = __wbindgen_enum_GpuTextureSampleType[arg1];
    };
    imports.wbg.__wbg_setshaderlocation_b905e964144cc9ad = function(arg0, arg1) {
        arg0.shaderLocation = arg1 >>> 0;
    };
    imports.wbg.__wbg_setsize_a877ed6f434871bd = function(arg0, arg1) {
        arg0.size = arg1;
    };
    imports.wbg.__wbg_setsize_b2cab7e432ec25dc = function(arg0, arg1) {
        arg0.size = arg1;
    };
    imports.wbg.__wbg_setsize_c167af29ed0f618c = function(arg0, arg1) {
        arg0.size = arg1;
    };
    imports.wbg.__wbg_setsrcfactor_3bf35cc93f12e8c2 = function(arg0, arg1) {
        arg0.srcFactor = __wbindgen_enum_GpuBlendFactor[arg1];
    };
    imports.wbg.__wbg_setstencilback_6d0e3812c09eb489 = function(arg0, arg1) {
        arg0.stencilBack = arg1;
    };
    imports.wbg.__wbg_setstencilclearvalue_53b51b80af22b8a4 = function(arg0, arg1) {
        arg0.stencilClearValue = arg1 >>> 0;
    };
    imports.wbg.__wbg_setstencilfront_223b59e436e04d2d = function(arg0, arg1) {
        arg0.stencilFront = arg1;
    };
    imports.wbg.__wbg_setstencilloadop_d88ff17c1f14f3b3 = function(arg0, arg1) {
        arg0.stencilLoadOp = __wbindgen_enum_GpuLoadOp[arg1];
    };
    imports.wbg.__wbg_setstencilreadmask_f7b2d22f2682c8f6 = function(arg0, arg1) {
        arg0.stencilReadMask = arg1 >>> 0;
    };
    imports.wbg.__wbg_setstencilreadonly_6fba8956bae14007 = function(arg0, arg1) {
        arg0.stencilReadOnly = arg1 !== 0;
    };
    imports.wbg.__wbg_setstencilstoreop_9637a0cb039fc7bb = function(arg0, arg1) {
        arg0.stencilStoreOp = __wbindgen_enum_GpuStoreOp[arg1];
    };
    imports.wbg.__wbg_setstencilwritemask_fc2b202439c71444 = function(arg0, arg1) {
        arg0.stencilWriteMask = arg1 >>> 0;
    };
    imports.wbg.__wbg_setstepmode_953dbc499c2ea5db = function(arg0, arg1) {
        arg0.stepMode = __wbindgen_enum_GpuVertexStepMode[arg1];
    };
    imports.wbg.__wbg_setstoragetexture_0634dd6c87ac1132 = function(arg0, arg1) {
        arg0.storageTexture = arg1;
    };
    imports.wbg.__wbg_setstoreop_d6e36afb7a3bc15a = function(arg0, arg1) {
        arg0.storeOp = __wbindgen_enum_GpuStoreOp[arg1];
    };
    imports.wbg.__wbg_setstripindexformat_6813dd6e867de4f2 = function(arg0, arg1) {
        arg0.stripIndexFormat = __wbindgen_enum_GpuIndexFormat[arg1];
    };
    imports.wbg.__wbg_setstrokeStyle_415833f3f0eb5076 = function(arg0, arg1, arg2) {
        arg0.strokeStyle = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setstrokeStyle_7650790bed1017e2 = function(arg0, arg1) {
        arg0.strokeStyle = arg1;
    };
    imports.wbg.__wbg_setstrokeStyle_a2d0e236a696d221 = function(arg0, arg1) {
        arg0.strokeStyle = arg1;
    };
    imports.wbg.__wbg_settabIndex_31adfec3c7eafbce = function(arg0, arg1) {
        arg0.tabIndex = arg1;
    };
    imports.wbg.__wbg_settarget_91856fcff2894278 = function(arg0, arg1, arg2) {
        arg0.target = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_settargets_0ab03a33d2c15ccd = function(arg0, arg1) {
        arg0.targets = arg1;
    };
    imports.wbg.__wbg_settexture_72c4d60403590233 = function(arg0, arg1) {
        arg0.texture = arg1;
    };
    imports.wbg.__wbg_settexture_9dc3759e93cfbb84 = function(arg0, arg1) {
        arg0.texture = arg1;
    };
    imports.wbg.__wbg_settimestamp_fea9915c542831dc = function(arg0, arg1) {
        arg0.timestamp = arg1;
    };
    imports.wbg.__wbg_settimestampwrites_736aa6c2c69ccaea = function(arg0, arg1) {
        arg0.timestampWrites = arg1;
    };
    imports.wbg.__wbg_settopology_84962f44b37e8986 = function(arg0, arg1) {
        arg0.topology = __wbindgen_enum_GpuPrimitiveTopology[arg1];
    };
    imports.wbg.__wbg_settype_2a902a4a235bb64a = function(arg0, arg1, arg2) {
        arg0.type = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_settype_39ed370d3edd403c = function(arg0, arg1, arg2) {
        arg0.type = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_settype_4982e42c05ec7507 = function(arg0, arg1) {
        arg0.type = __wbindgen_enum_EncodedVideoChunkType[arg1];
    };
    imports.wbg.__wbg_settype_4ff365ea9ad896aa = function(arg0, arg1) {
        arg0.type = __wbindgen_enum_GpuBufferBindingType[arg1];
    };
    imports.wbg.__wbg_settype_b4b2fc6fbad39aeb = function(arg0, arg1) {
        arg0.type = __wbindgen_enum_GpuSamplerBindingType[arg1];
    };
    imports.wbg.__wbg_setusage_3bf7bce356282919 = function(arg0, arg1) {
        arg0.usage = arg1 >>> 0;
    };
    imports.wbg.__wbg_setusage_48c9e7b82b575c9a = function(arg0, arg1) {
        arg0.usage = arg1 >>> 0;
    };
    imports.wbg.__wbg_setusage_a102e6844c6a65de = function(arg0, arg1) {
        arg0.usage = arg1 >>> 0;
    };
    imports.wbg.__wbg_setusage_ea5e5efc19daea09 = function(arg0, arg1) {
        arg0.usage = arg1 >>> 0;
    };
    imports.wbg.__wbg_setvalue_08d17a42e5d5069d = function(arg0, arg1, arg2) {
        arg0.value = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setvalue_6ad9ef6c692ea746 = function(arg0, arg1, arg2) {
        arg0.value = getStringFromWasm0(arg1, arg2);
    };
    imports.wbg.__wbg_setvertex_96327c405a801524 = function(arg0, arg1) {
        arg0.vertex = arg1;
    };
    imports.wbg.__wbg_setview_2d2806aa6c5822ca = function(arg0, arg1) {
        arg0.view = arg1;
    };
    imports.wbg.__wbg_setview_b7216eb00b7f584a = function(arg0, arg1) {
        arg0.view = arg1;
    };
    imports.wbg.__wbg_setviewdimension_c6aedf84f79e2593 = function(arg0, arg1) {
        arg0.viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
    };
    imports.wbg.__wbg_setviewdimension_ccb64a21a1495106 = function(arg0, arg1) {
        arg0.viewDimension = __wbindgen_enum_GpuTextureViewDimension[arg1];
    };
    imports.wbg.__wbg_setviewformats_65a3ce6335913be2 = function(arg0, arg1) {
        arg0.viewFormats = arg1;
    };
    imports.wbg.__wbg_setviewformats_d7be9eae49a0933b = function(arg0, arg1) {
        arg0.viewFormats = arg1;
    };
    imports.wbg.__wbg_setvisibility_3445d21752d17ded = function(arg0, arg1) {
        arg0.visibility = arg1 >>> 0;
    };
    imports.wbg.__wbg_setwidth_660ca581e3fbe279 = function(arg0, arg1) {
        arg0.width = arg1 >>> 0;
    };
    imports.wbg.__wbg_setwidth_c5fed9f5e7f0b406 = function(arg0, arg1) {
        arg0.width = arg1 >>> 0;
    };
    imports.wbg.__wbg_setwidth_ff3dae6ae4838a9e = function(arg0, arg1) {
        arg0.width = arg1 >>> 0;
    };
    imports.wbg.__wbg_setwritemask_b94f0c67654d5b00 = function(arg0, arg1) {
        arg0.writeMask = arg1 >>> 0;
    };
    imports.wbg.__wbg_setx_cb03e4f7e9c6b588 = function(arg0, arg1) {
        arg0.x = arg1 >>> 0;
    };
    imports.wbg.__wbg_sety_ca78b7606a8f2c0c = function(arg0, arg1) {
        arg0.y = arg1 >>> 0;
    };
    imports.wbg.__wbg_setz_5389d800d9ef03b4 = function(arg0, arg1) {
        arg0.z = arg1 >>> 0;
    };
    imports.wbg.__wbg_shaderSource_72d3e8597ef85b67 = function(arg0, arg1, arg2, arg3) {
        arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_shaderSource_ad0087e637a35191 = function(arg0, arg1, arg2, arg3) {
        arg0.shaderSource(arg1, getStringFromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_shiftKey_86e737105bab1a54 = function(arg0) {
        const ret = arg0.shiftKey;
        return ret;
    };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
        const ret = arg1.stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_start_e81f89e130c3c86e = function() { return handleError(function (arg0, arg1) {
        arg0.start(arg1);
    }, arguments) };
    imports.wbg.__wbg_state_8d0b3af7cfccc67a = function(arg0) {
        const ret = arg0.state;
        return (__wbindgen_enum_CodecState.indexOf(ret) + 1 || 4) - 1;
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
        const ret = typeof __webpack_require__.g === 'undefined' ? null : __webpack_require__.g;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
        const ret = typeof globalThis === 'undefined' ? null : globalThis;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
        const ret = typeof self === 'undefined' ? null : self;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
        const ret = typeof window === 'undefined' ? null : window;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_statusText_207754230b39e67c = function(arg0, arg1) {
        const ret = arg1.statusText;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_status_f6360336ca686bf0 = function(arg0) {
        const ret = arg0.status;
        return ret;
    };
    imports.wbg.__wbg_stencilFuncSeparate_91700dcf367ae07e = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
    };
    imports.wbg.__wbg_stencilFuncSeparate_c1a6fa2005ca0aaf = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.stencilFuncSeparate(arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0);
    };
    imports.wbg.__wbg_stencilFunc_ebe594b996e772e7 = function(arg0, arg1, arg2, arg3) {
        arg0.stencilFunc(arg1 >>> 0, arg2, arg3 >>> 0);
    };
    imports.wbg.__wbg_stencilMaskSeparate_4f1a2defc8c10956 = function(arg0, arg1, arg2) {
        arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
    };
    imports.wbg.__wbg_stencilMaskSeparate_f8a0cfb5c2994d4a = function(arg0, arg1, arg2) {
        arg0.stencilMaskSeparate(arg1 >>> 0, arg2 >>> 0);
    };
    imports.wbg.__wbg_stencilMask_1e602ef63f5b4144 = function(arg0, arg1) {
        arg0.stencilMask(arg1 >>> 0);
    };
    imports.wbg.__wbg_stencilMask_cd8ca0a55817e599 = function(arg0, arg1) {
        arg0.stencilMask(arg1 >>> 0);
    };
    imports.wbg.__wbg_stencilOpSeparate_1fa08985e79e1627 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
    };
    imports.wbg.__wbg_stencilOpSeparate_ff6683bbe3838ae6 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.stencilOpSeparate(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
    };
    imports.wbg.__wbg_stencilOp_cebb850a3b4f9e4f = function(arg0, arg1, arg2, arg3) {
        arg0.stencilOp(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
    };
    imports.wbg.__wbg_stroke_1b0348380fb5a54b = function(arg0, arg1) {
        arg0.stroke(arg1);
    };
    imports.wbg.__wbg_style_fb30c14e5815805c = function(arg0) {
        const ret = arg0.style;
        return ret;
    };
    imports.wbg.__wbg_submit_522f9e0b9d7e22fd = function(arg0, arg1) {
        arg0.submit(arg1);
    };
    imports.wbg.__wbg_submit_f9a346a4ea344d6d = function() { return handleError(function (arg0) {
        arg0.submit();
    }, arguments) };
    imports.wbg.__wbg_suppressContextMenu_da9d7900608f18ab = function(arg0) {
        arg0.suppressContextMenu();
    };
    imports.wbg.__wbg_suspend_6011a41599f07de4 = function() { return handleError(function (arg0) {
        const ret = arg0.suspend();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_texImage2D_06281e677e3f6909 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9 === 0 ? undefined : getArrayU8FromWasm0(arg9, arg10));
    }, arguments) };
    imports.wbg.__wbg_texImage2D_297bb8474cd4e8b8 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9 === 0 ? undefined : getArrayU8FromWasm0(arg9, arg10));
    }, arguments) };
    imports.wbg.__wbg_texImage2D_57483314967bdd11 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texImage2D_5f2835f02b1d1077 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texImage2D_b8edcb5692f65f88 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texImage3D_921b54d09bf45af0 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        arg0.texImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
    }, arguments) };
    imports.wbg.__wbg_texImage3D_a00b7a4df48cf757 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        arg0.texImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8 >>> 0, arg9 >>> 0, arg10);
    }, arguments) };
    imports.wbg.__wbg_texParameteri_8112b26b3c360b7e = function(arg0, arg1, arg2, arg3) {
        arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
    };
    imports.wbg.__wbg_texParameteri_ef50743cb94d507e = function(arg0, arg1, arg2, arg3) {
        arg0.texParameteri(arg1 >>> 0, arg2 >>> 0, arg3);
    };
    imports.wbg.__wbg_texStorage2D_fbda848497f3674e = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.texStorage2D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
    };
    imports.wbg.__wbg_texStorage3D_fd7a7ca30e7981d1 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.texStorage3D(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5, arg6);
    };
    imports.wbg.__wbg_texSubImage2D_061605071aad9d2c = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_82670edc2c5acd35 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_aa9a084093764796 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_c7951ed97252bdff = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_d52d1a0d3654c60b = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_dd9cac68ad5fe0b6 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_e6d34f5bb062e404 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_f39ea52a2d4bd2f7 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage2D_fbdf91268228c757 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
        arg0.texSubImage2D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7 >>> 0, arg8 >>> 0, arg9);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_02bbdad14919acfc = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_04731251d7cecc83 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_37f0045d16871670 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_3a871f6405d2f183 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_66acd67f56e3b214 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_a051de089266fa1b = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_b28c55f839bbec41 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_texSubImage3D_f18bf091cd48774c = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
        arg0.texSubImage3D(arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 >>> 0, arg10 >>> 0, arg11);
    }, arguments) };
    imports.wbg.__wbg_then_44b73946d2fb3e7d = function(arg0, arg1) {
        const ret = arg0.then(arg1);
        return ret;
    };
    imports.wbg.__wbg_then_48b406749878a531 = function(arg0, arg1, arg2) {
        const ret = arg0.then(arg1, arg2);
        return ret;
    };
    imports.wbg.__wbg_toString_c813bbd34d063839 = function(arg0) {
        const ret = arg0.toString();
        return ret;
    };
    imports.wbg.__wbg_transform_bd4d08c26c833275 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.transform(arg1, arg2, arg3, arg4, arg5, arg6);
    }, arguments) };
    imports.wbg.__wbg_uniform1f_21390b04609a9fa5 = function(arg0, arg1, arg2) {
        arg0.uniform1f(arg1, arg2);
    };
    imports.wbg.__wbg_uniform1f_dc009a0e7f7e5977 = function(arg0, arg1, arg2) {
        arg0.uniform1f(arg1, arg2);
    };
    imports.wbg.__wbg_uniform1fv_b41efa3d9c5df06c = function(arg0, arg1, arg2, arg3) {
        arg0.uniform1fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform1i_5ddd9d8ccbd390bb = function(arg0, arg1, arg2) {
        arg0.uniform1i(arg1, arg2);
    };
    imports.wbg.__wbg_uniform1i_ed95b6129dce4d84 = function(arg0, arg1, arg2) {
        arg0.uniform1i(arg1, arg2);
    };
    imports.wbg.__wbg_uniform1ui_66e092b67a21c84d = function(arg0, arg1, arg2) {
        arg0.uniform1ui(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_uniform2fv_656fce9525420996 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform2fv_d8bd2a36da7ce440 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform2fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform2iv_4d39fc5a26f03f55 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform2iv_e967139a28017a99 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform2iv(arg1, getArrayI32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform2uiv_4c340c9e8477bb07 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform2uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform3fv_7d828b7c4c91138e = function(arg0, arg1, arg2, arg3) {
        arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform3fv_8153c834ce667125 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform3fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform3iv_58662d914661aa10 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform3iv_f30d27ec224b4b24 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform3iv(arg1, getArrayI32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform3uiv_38673b825dc755f6 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform3uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform4f_36b8f9be15064aa7 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
    };
    imports.wbg.__wbg_uniform4f_f7ea07febf8b5108 = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.uniform4f(arg1, arg2, arg3, arg4, arg5);
    };
    imports.wbg.__wbg_uniform4fv_8827081a7585145b = function(arg0, arg1, arg2, arg3) {
        arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform4fv_c01fbc6c022abac3 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform4fv(arg1, getArrayF32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform4iv_7fe05be291899f06 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform4iv_84fdf80745e7ff26 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform4iv(arg1, getArrayI32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniform4uiv_9de55998fbfef236 = function(arg0, arg1, arg2, arg3) {
        arg0.uniform4uiv(arg1, getArrayU32FromWasm0(arg2, arg3));
    };
    imports.wbg.__wbg_uniformBlockBinding_18117f4bda07115b = function(arg0, arg1, arg2, arg3) {
        arg0.uniformBlockBinding(arg1, arg2 >>> 0, arg3 >>> 0);
    };
    imports.wbg.__wbg_uniformMatrix2fv_98681e400347369c = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_uniformMatrix2fv_bc019eb4784a3b8c = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_uniformMatrix2x3fv_6421f8d6f7f4d144 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix2x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_uniformMatrix2x4fv_27d807767d7aadc6 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix2x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_uniformMatrix3fv_3d6ad3a1e0b0b5b6 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_uniformMatrix3fv_3df529aab93cf902 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_uniformMatrix3x2fv_79357317e9637d05 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix3x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_uniformMatrix3x4fv_9d1a88b5abfbd64b = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix3x4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_uniformMatrix4fv_da94083874f202ad = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_uniformMatrix4fv_e87383507ae75670 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix4fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_uniformMatrix4x2fv_aa507d918a0b5a62 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix4x2fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_uniformMatrix4x3fv_6712c7a3b4276fb4 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.uniformMatrix4x3fv(arg1, arg2 !== 0, getArrayF32FromWasm0(arg3, arg4));
    };
    imports.wbg.__wbg_unmap_a7fc4fb3238304a4 = function(arg0) {
        arg0.unmap();
    };
    imports.wbg.__wbg_url_ae10c34ca209681d = function(arg0, arg1) {
        const ret = arg1.url;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_useProgram_473bf913989b6089 = function(arg0, arg1) {
        arg0.useProgram(arg1);
    };
    imports.wbg.__wbg_useProgram_9b2660f7bb210471 = function(arg0, arg1) {
        arg0.useProgram(arg1);
    };
    imports.wbg.__wbg_value_cd1ffa7b1ab794f1 = function(arg0) {
        const ret = arg0.value;
        return ret;
    };
    imports.wbg.__wbg_values_99f7a68c7f313d66 = function(arg0) {
        const ret = arg0.values();
        return ret;
    };
    imports.wbg.__wbg_vertexAttribDivisorANGLE_11e909d332960413 = function(arg0, arg1, arg2) {
        arg0.vertexAttribDivisorANGLE(arg1 >>> 0, arg2 >>> 0);
    };
    imports.wbg.__wbg_vertexAttribDivisor_4d361d77ffb6d3ff = function(arg0, arg1, arg2) {
        arg0.vertexAttribDivisor(arg1 >>> 0, arg2 >>> 0);
    };
    imports.wbg.__wbg_vertexAttribIPointer_d0c67543348c90ce = function(arg0, arg1, arg2, arg3, arg4, arg5) {
        arg0.vertexAttribIPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4, arg5);
    };
    imports.wbg.__wbg_vertexAttribPointer_550dc34903e3d1ea = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
    };
    imports.wbg.__wbg_vertexAttribPointer_7a2a506cdbe3aebc = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        arg0.vertexAttribPointer(arg1 >>> 0, arg2, arg3 >>> 0, arg4 !== 0, arg5, arg6);
    };
    imports.wbg.__wbg_view_fd8a56e8983f448d = function(arg0) {
        const ret = arg0.view;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_viewport_a1b4d71297ba89af = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.viewport(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_viewport_e615e98f676f2d39 = function(arg0, arg1, arg2, arg3, arg4) {
        arg0.viewport(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__wbg_visibleRect_f7558c0cfa7dfdbf = function(arg0) {
        const ret = arg0.visibleRect;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_wasClean_605b4fd66d44354a = function(arg0) {
        const ret = arg0.wasClean;
        return ret;
    };
    imports.wbg.__wbg_width_5dde457d606ba683 = function(arg0) {
        const ret = arg0.width;
        return ret;
    };
    imports.wbg.__wbg_width_b0c1d9f437a95799 = function(arg0) {
        const ret = arg0.width;
        return ret;
    };
    imports.wbg.__wbg_width_cdaf02311c1621d1 = function(arg0) {
        const ret = arg0.width;
        return ret;
    };
    imports.wbg.__wbg_writeTexture_2f9937d7cf0d5da0 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        arg0.writeTexture(arg1, arg2, arg3, arg4);
    }, arguments) };
    imports.wbg.__wbindgen_add = function(arg0, arg1) {
        const ret = arg0 + arg1;
        return ret;
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = arg0;
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = arg0.original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper1438 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 328, __wbg_adapter_40);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper1439 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 328, __wbg_adapter_40);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper1440 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 328, __wbg_adapter_40);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper1441 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 328, __wbg_adapter_40);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper1442 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 328, __wbg_adapter_40);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper1443 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 328, __wbg_adapter_40);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper1444 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 328, __wbg_adapter_53);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper14689 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 6653, __wbg_adapter_74);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper2975 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1267, __wbg_adapter_56);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper3105 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1319, __wbg_adapter_59);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper3107 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1319, __wbg_adapter_59);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper3109 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1319, __wbg_adapter_64);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper3111 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 1319, __wbg_adapter_59);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper3156 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 1347, __wbg_adapter_69);
        return ret;
    };
    imports.wbg.__wbindgen_closure_wrapper3157 = function(arg0, arg1, arg2) {
        const ret = makeClosure(arg0, arg1, 1347, __wbg_adapter_69);
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
        const ret = arg0 in arg1;
        return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_2;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(arg0) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_is_null = function(arg0) {
        const ret = arg0 === null;
        return ret;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(arg0) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedInt32ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    cachedUint8ClampedArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL(/* asset import */ __webpack_require__(797), __webpack_require__.b);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}


/* harmony default export */ const ruffle_web = (__wbg_init);


/***/ })

}]);