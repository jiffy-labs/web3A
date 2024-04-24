var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// node_modules/abitype/dist/esm/regex.js
function execTyped(regex, string) {
  const match = regex.exec(string);
  return match?.groups;
}
var init_regex = __esm(() => {
});

// node_modules/abitype/dist/esm/human-readable/formatAbiParameter.js
function formatAbiParameter(abiParameter) {
  let type = abiParameter.type;
  if (tupleRegex.test(abiParameter.type) && ("components" in abiParameter)) {
    type = "(";
    const length = abiParameter.components.length;
    for (let i = 0;i < length; i++) {
      const component = abiParameter.components[i];
      type += formatAbiParameter(component);
      if (i < length - 1)
        type += ", ";
    }
    const result = execTyped(tupleRegex, abiParameter.type);
    type += `)${result?.array ?? ""}`;
    return formatAbiParameter({
      ...abiParameter,
      type
    });
  }
  if (("indexed" in abiParameter) && abiParameter.indexed)
    type = `${type} indexed`;
  if (abiParameter.name)
    return `${type} ${abiParameter.name}`;
  return type;
}
var tupleRegex;
var init_formatAbiParameter = __esm(() => {
  init_regex();
  tupleRegex = /^tuple(?<array>(\[(\d*)\])*)$/;
});

// node_modules/abitype/dist/esm/human-readable/formatAbiParameters.js
function formatAbiParameters(abiParameters) {
  let params = "";
  const length = abiParameters.length;
  for (let i = 0;i < length; i++) {
    const abiParameter = abiParameters[i];
    params += formatAbiParameter(abiParameter);
    if (i !== length - 1)
      params += ", ";
  }
  return params;
}
var init_formatAbiParameters = __esm(() => {
  init_formatAbiParameter();
});

// node_modules/abitype/dist/esm/human-readable/formatAbiItem.js
function formatAbiItem(abiItem) {
  if (abiItem.type === "function")
    return `function ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability && abiItem.stateMutability !== "nonpayable" ? ` ${abiItem.stateMutability}` : ""}${abiItem.outputs.length ? ` returns (${formatAbiParameters(abiItem.outputs)})` : ""}`;
  else if (abiItem.type === "event")
    return `event ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
  else if (abiItem.type === "error")
    return `error ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
  else if (abiItem.type === "constructor")
    return `constructor(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability === "payable" ? " payable" : ""}`;
  else if (abiItem.type === "fallback")
    return "fallback()";
  return "receive() external payable";
}
var init_formatAbiItem = __esm(() => {
  init_formatAbiParameters();
});

// node_modules/abitype/dist/esm/exports/index.js
var init_exports = __esm(() => {
  init_formatAbiItem();
});

// node_modules/viem/_esm/utils/abi/formatAbiItem.js
function formatAbiItem2(abiItem, { includeName = false } = {}) {
  if (abiItem.type !== "function" && abiItem.type !== "event" && abiItem.type !== "error")
    throw new InvalidDefinitionTypeError(abiItem.type);
  return `${abiItem.name}(${formatAbiParams(abiItem.inputs, { includeName })})`;
}
function formatAbiParams(params, { includeName = false } = {}) {
  if (!params)
    return "";
  return params.map((param) => formatAbiParam(param, { includeName })).join(includeName ? ", " : ",");
}
var formatAbiParam;
var init_formatAbiItem2 = __esm(() => {
  init_abi();
  formatAbiParam = function(param, { includeName }) {
    if (param.type.startsWith("tuple")) {
      return `(${formatAbiParams(param.components, { includeName })})${param.type.slice("tuple".length)}`;
    }
    return param.type + (includeName && param.name ? ` ${param.name}` : "");
  };
});

// node_modules/viem/_esm/utils/data/isHex.js
function isHex(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
var init_isHex = __esm(() => {
});

// node_modules/viem/_esm/utils/data/size.js
function size(value) {
  if (isHex(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}
var init_size = __esm(() => {
  init_isHex();
});

// node_modules/viem/_esm/errors/version.js
var version;
var init_version = __esm(() => {
  version = "2.9.21";
});

// node_modules/viem/_esm/errors/utils.js
var getContractAddress, getUrl, getVersion;
var init_utils = __esm(() => {
  init_version();
  getContractAddress = (address) => address;
  getUrl = (url) => url;
  getVersion = () => `viem@${version}`;
});

// node_modules/viem/_esm/errors/base.js
class BaseError extends Error {
  constructor(shortMessage, args = {}) {
    super();
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "metaMessages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ViemError"
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: getVersion()
    });
    const details = args.cause instanceof BaseError ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
    const docsPath = args.cause instanceof BaseError ? args.cause.docsPath || args.docsPath : args.docsPath;
    this.message = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      ...docsPath ? [
        `Docs: https://viem.sh${docsPath}${args.docsSlug ? `#${args.docsSlug}` : ""}`
      ] : [],
      ...details ? [`Details: ${details}`] : [],
      `Version: ${this.version}`
    ].join("\n");
    if (args.cause)
      this.cause = args.cause;
    this.details = details;
    this.docsPath = docsPath;
    this.metaMessages = args.metaMessages;
    this.shortMessage = shortMessage;
  }
  walk(fn) {
    return walk(this, fn);
  }
}
var walk;
var init_base = __esm(() => {
  init_utils();
  walk = function(err, fn) {
    if (fn?.(err))
      return err;
    if (err && typeof err === "object" && ("cause" in err))
      return walk(err.cause, fn);
    return fn ? null : err;
  };
});

// node_modules/viem/_esm/errors/abi.js
class AbiConstructorNotFoundError extends BaseError {
  constructor({ docsPath }) {
    super([
      "A constructor was not found on the ABI.",
      "Make sure you are using the correct ABI and that the constructor exists on it."
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiConstructorNotFoundError"
    });
  }
}

class AbiConstructorParamsNotFoundError extends BaseError {
  constructor({ docsPath }) {
    super([
      "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.",
      "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiConstructorParamsNotFoundError"
    });
  }
}

class AbiDecodingDataSizeTooSmallError extends BaseError {
  constructor({ data, params, size: size3 }) {
    super([`Data size of ${size3} bytes is too small for given parameters.`].join("\n"), {
      metaMessages: [
        `Params: (${formatAbiParams(params, { includeName: true })})`,
        `Data:   ${data} (${size3} bytes)`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiDecodingDataSizeTooSmallError"
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "params", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "size", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.data = data;
    this.params = params;
    this.size = size3;
  }
}

class AbiDecodingZeroDataError extends BaseError {
  constructor() {
    super('Cannot decode zero data ("0x") with ABI parameters.');
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiDecodingZeroDataError"
    });
  }
}

class AbiEncodingArrayLengthMismatchError extends BaseError {
  constructor({ expectedLength, givenLength, type }) {
    super([
      `ABI encoding array length mismatch for type ${type}.`,
      `Expected length: ${expectedLength}`,
      `Given length: ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiEncodingArrayLengthMismatchError"
    });
  }
}

class AbiEncodingBytesSizeMismatchError extends BaseError {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size(value)}) does not match expected size (bytes${expectedSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiEncodingBytesSizeMismatchError"
    });
  }
}

class AbiEncodingLengthMismatchError extends BaseError {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding params/values length mismatch.",
      `Expected length (params): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiEncodingLengthMismatchError"
    });
  }
}

class AbiErrorSignatureNotFoundError extends BaseError {
  constructor(signature, { docsPath }) {
    super([
      `Encoded error signature "${signature}" not found on ABI.`,
      "Make sure you are using the correct ABI and that the error exists on it.",
      `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiErrorSignatureNotFoundError"
    });
    Object.defineProperty(this, "signature", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.signature = signature;
  }
}

class AbiEventSignatureEmptyTopicsError extends BaseError {
  constructor({ docsPath }) {
    super("Cannot extract event signature from empty topics.", {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiEventSignatureEmptyTopicsError"
    });
  }
}

class AbiEventSignatureNotFoundError extends BaseError {
  constructor(signature, { docsPath }) {
    super([
      `Encoded event signature "${signature}" not found on ABI.`,
      "Make sure you are using the correct ABI and that the event exists on it.",
      `You can look up the signature here: https://openchain.xyz/signatures?query=${signature}.`
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiEventSignatureNotFoundError"
    });
  }
}

class AbiEventNotFoundError extends BaseError {
  constructor(eventName, { docsPath } = {}) {
    super([
      `Event ${eventName ? `"${eventName}" ` : ""}not found on ABI.`,
      "Make sure you are using the correct ABI and that the event exists on it."
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiEventNotFoundError"
    });
  }
}

class AbiFunctionNotFoundError extends BaseError {
  constructor(functionName, { docsPath } = {}) {
    super([
      `Function ${functionName ? `"${functionName}" ` : ""}not found on ABI.`,
      "Make sure you are using the correct ABI and that the function exists on it."
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiFunctionNotFoundError"
    });
  }
}

class AbiFunctionOutputsNotFoundError extends BaseError {
  constructor(functionName, { docsPath }) {
    super([
      `Function "${functionName}" does not contain any \`outputs\` on ABI.`,
      "Cannot decode function result without knowing what the parameter types are.",
      "Make sure you are using the correct ABI and that the function exists on it."
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiFunctionOutputsNotFoundError"
    });
  }
}

class AbiItemAmbiguityError extends BaseError {
  constructor(x, y) {
    super("Found ambiguous types in overloaded ABI items.", {
      metaMessages: [
        `\`${x.type}\` in \`${formatAbiItem2(x.abiItem)}\`, and`,
        `\`${y.type}\` in \`${formatAbiItem2(y.abiItem)}\``,
        "",
        "These types encode differently and cannot be distinguished at runtime.",
        "Remove one of the ambiguous items in the ABI."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiItemAmbiguityError"
    });
  }
}

class BytesSizeMismatchError extends BaseError {
  constructor({ expectedSize, givenSize }) {
    super(`Expected bytes${expectedSize}, got bytes${givenSize}.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BytesSizeMismatchError"
    });
  }
}

class DecodeLogDataMismatch extends BaseError {
  constructor({ abiItem, data, params, size: size3 }) {
    super([
      `Data size of ${size3} bytes is too small for non-indexed event parameters.`
    ].join("\n"), {
      metaMessages: [
        `Params: (${formatAbiParams(params, { includeName: true })})`,
        `Data:   ${data} (${size3} bytes)`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "DecodeLogDataMismatch"
    });
    Object.defineProperty(this, "abiItem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "params", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "size", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.abiItem = abiItem;
    this.data = data;
    this.params = params;
    this.size = size3;
  }
}

class DecodeLogTopicsMismatch extends BaseError {
  constructor({ abiItem, param }) {
    super([
      `Expected a topic for indexed event parameter${param.name ? ` "${param.name}"` : ""} on event "${formatAbiItem2(abiItem, { includeName: true })}".`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "DecodeLogTopicsMismatch"
    });
    Object.defineProperty(this, "abiItem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.abiItem = abiItem;
  }
}

class InvalidAbiEncodingTypeError extends BaseError {
  constructor(type, { docsPath }) {
    super([
      `Type "${type}" is not a valid encoding type.`,
      "Please provide a valid ABI type."
    ].join("\n"), { docsPath });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAbiEncodingType"
    });
  }
}

class InvalidAbiDecodingTypeError extends BaseError {
  constructor(type, { docsPath }) {
    super([
      `Type "${type}" is not a valid decoding type.`,
      "Please provide a valid ABI type."
    ].join("\n"), { docsPath });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAbiDecodingType"
    });
  }
}

class InvalidArrayError extends BaseError {
  constructor(value) {
    super([`Value "${value}" is not a valid array.`].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidArrayError"
    });
  }
}

class InvalidDefinitionTypeError extends BaseError {
  constructor(type) {
    super([
      `"${type}" is not a valid definition type.`,
      'Valid types: "function", "event", "error"'
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidDefinitionTypeError"
    });
  }
}
var init_abi = __esm(() => {
  init_formatAbiItem2();
  init_size();
  init_base();
});

// node_modules/viem/_esm/errors/data.js
class SliceOffsetOutOfBoundsError extends BaseError {
  constructor({ offset, position, size: size3 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size3}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SliceOffsetOutOfBoundsError"
    });
  }
}

class SizeExceedsPaddingSizeError extends BaseError {
  constructor({ size: size3, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size3}) exceeds padding size (${targetSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SizeExceedsPaddingSizeError"
    });
  }
}

class InvalidBytesLengthError extends BaseError {
  constructor({ size: size3, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} is expected to be ${targetSize} ${type} long, but is ${size3} ${type} long.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidBytesLengthError"
    });
  }
}
var init_data = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/utils/data/pad.js
function pad(hexOrBytes, { dir, size: size3 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex(hexOrBytes, { dir, size: size3 });
  return padBytes(hexOrBytes, { dir, size: size3 });
}
function padHex(hex_, { dir, size: size3 = 32 } = {}) {
  if (size3 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size3 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size3,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size3 * 2, "0")}`;
}
function padBytes(bytes, { dir, size: size3 = 32 } = {}) {
  if (size3 === null)
    return bytes;
  if (bytes.length > size3)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size3,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size3);
  for (let i = 0;i < size3; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size3 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}
var init_pad = __esm(() => {
  init_data();
});

// node_modules/viem/_esm/errors/encoding.js
class IntegerOutOfRangeError extends BaseError {
  constructor({ max, min, signed, size: size3, value }) {
    super(`Number "${value}" is not in safe ${size3 ? `${size3 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "IntegerOutOfRangeError"
    });
  }
}

class InvalidBytesBooleanError extends BaseError {
  constructor(bytes) {
    super(`Bytes value "${bytes}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidBytesBooleanError"
    });
  }
}

class SizeOverflowError extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SizeOverflowError"
    });
  }
}
var init_encoding = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/utils/data/trim.js
function trim(hexOrBytes, { dir = "left" } = {}) {
  let data2 = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
  let sliceLength = 0;
  for (let i = 0;i < data2.length - 1; i++) {
    if (data2[dir === "left" ? i : data2.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data2 = dir === "left" ? data2.slice(sliceLength) : data2.slice(0, data2.length - sliceLength);
  if (typeof hexOrBytes === "string") {
    if (data2.length === 1 && dir === "right")
      data2 = `${data2}0`;
    return `0x${data2.length % 2 === 1 ? `0${data2}` : data2}`;
  }
  return data2;
}
var init_trim = __esm(() => {
});

// node_modules/viem/_esm/utils/encoding/fromHex.js
function assertSize(hexOrBytes, { size: size4 }) {
  if (size(hexOrBytes) > size4)
    throw new SizeOverflowError({
      givenSize: size(hexOrBytes),
      maxSize: size4
    });
}
function hexToBigInt(hex, opts = {}) {
  const { signed } = opts;
  if (opts.size)
    assertSize(hex, { size: opts.size });
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size4 = (hex.length - 2) / 2;
  const max = (1n << BigInt(size4) * 8n - 1n) - 1n;
  if (value <= max)
    return value;
  return value - BigInt(`0x${"f".padStart(size4 * 2, "f")}`) - 1n;
}
function hexToNumber(hex, opts = {}) {
  return Number(hexToBigInt(hex, opts));
}
var init_fromHex = __esm(() => {
  init_encoding();
  init_size();
});

// node_modules/viem/_esm/utils/encoding/toHex.js
function toHex(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex(value, opts);
  if (typeof value === "string") {
    return stringToHex(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex(value, opts);
  return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex(value, opts = {}) {
  let string = "";
  for (let i = 0;i < value.length; i++) {
    string += hexes[value[i]];
  }
  const hex = `0x${string}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size: size4 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size4) {
    if (signed)
      maxValue = (1n << BigInt(size4) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size4) * 8n) - 1n;
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : undefined,
      min: `${minValue}${suffix}`,
      signed,
      size: size4,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size4 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size4)
    return pad(hex, { size: size4 });
  return hex;
}
function stringToHex(value_, opts = {}) {
  const value = encoder.encode(value_);
  return bytesToHex(value, opts);
}
var hexes, encoder;
var init_toHex = __esm(() => {
  init_encoding();
  init_pad();
  init_fromHex();
  hexes = Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
  encoder = new TextEncoder;
});

// node_modules/viem/_esm/utils/encoding/toBytes.js
function toBytes(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes(value, opts);
  if (typeof value === "boolean")
    return boolToBytes(value, opts);
  if (isHex(value))
    return hexToBytes(value, opts);
  return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { size: opts.size });
  }
  return bytes;
}
function hexToBytes(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = pad(hex, { dir: "right", size: opts.size });
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j = 0;index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === undefined || nibbleRight === undefined) {
      throw new BaseError(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes = encoder2.encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}
var charCodeToBase16, encoder2, charCodeMap;
var init_toBytes = __esm(() => {
  init_base();
  init_isHex();
  init_pad();
  init_fromHex();
  init_toHex();
  charCodeToBase16 = function(char) {
    if (char >= charCodeMap.zero && char <= charCodeMap.nine)
      return char - charCodeMap.zero;
    if (char >= charCodeMap.A && char <= charCodeMap.F)
      return char - (charCodeMap.A - 10);
    if (char >= charCodeMap.a && char <= charCodeMap.f)
      return char - (charCodeMap.a - 10);
    return;
  };
  encoder2 = new TextEncoder;
  charCodeMap = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
  };
});

// node_modules/@noble/hashes/esm/_assert.js
var number, bytes, hash, exists, output;
var init__assert = __esm(() => {
  number = function(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error(`Wrong positive integer: ${n}`);
  };
  bytes = function(b, ...lengths) {
    if (!(b instanceof Uint8Array))
      throw new Error("Expected Uint8Array");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
  };
  hash = function(hash2) {
    if (typeof hash2 !== "function" || typeof hash2.create !== "function")
      throw new Error("Hash should be wrapped by utils.wrapConstructor");
    number(hash2.outputLen);
    number(hash2.blockLen);
  };
  exists = function(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  };
  output = function(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
  };
});

// node_modules/@noble/hashes/esm/_u64.js
var fromBig, split, U32_MASK64, _32n, rotlSH, rotlSL, rotlBH, rotlBL;
var init__u64 = __esm(() => {
  fromBig = function(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
    return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
  };
  split = function(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0;i < lst.length; i++) {
      const { h, l } = fromBig(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  };
  U32_MASK64 = BigInt(2 ** 32 - 1);
  _32n = BigInt(32);
  rotlSH = (h, l, s) => h << s | l >>> 32 - s;
  rotlSL = (h, l, s) => l << s | h >>> 32 - s;
  rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
  rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
});

// node_modules/@noble/hashes/esm/crypto.js
var crypto;
var init_crypto = __esm(() => {
  crypto = typeof globalThis === "object" && ("crypto" in globalThis) ? globalThis.crypto : undefined;
});

// node_modules/@noble/hashes/esm/utils.js
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes2(data2) {
  if (typeof data2 === "string")
    data2 = utf8ToBytes(data2);
  if (!u8a(data2))
    throw new Error(`expected Uint8Array, got ${typeof data2}`);
  return data2;
}
function concatBytes(...arrays) {
  const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
  let pad4 = 0;
  arrays.forEach((a) => {
    if (!u8a(a))
      throw new Error("Uint8Array expected");
    r.set(a, pad4);
    pad4 += a.length;
  });
  return r;
}
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto && typeof crypto.getRandomValues === "function") {
    return crypto.getRandomValues(new Uint8Array(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}

class Hash {
  clone() {
    return this._cloneInto();
  }
}
var u8a, u32, createView, rotr, isLE, toStr;
var init_utils2 = __esm(() => {
  init_crypto();
  /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  u8a = (a) => a instanceof Uint8Array;
  u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
  createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  rotr = (word, shift) => word << 32 - shift | word >>> shift;
  isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  if (!isLE)
    throw new Error("Non little-endian hardware is not supported");
  toStr = {}.toString;
});

// node_modules/@noble/hashes/esm/sha3.js
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds;round < 24; round++) {
    for (let x = 0;x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0;x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0;y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0;t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0;y < 50; y += 10) {
      for (let x = 0;x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0;x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  B.fill(0);
}

class Keccak extends Hash {
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    number(outputLen);
    if (0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  keccak() {
    keccakP(this.state32, this.rounds);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data2) {
    exists(this);
    const { blockLen, state } = this;
    data2 = toBytes2(data2);
    const len = data2.length;
    for (let pos = 0;pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0;i < take; i++)
        state[this.pos++] ^= data2[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    exists(this, false);
    bytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length;pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes2) {
    number(bytes2);
    return this.xofInto(new Uint8Array(bytes2));
  }
  digestInto(out) {
    output(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    this.state.fill(0);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
}
var SHA3_PI, SHA3_ROTL, _SHA3_IOTA, _0n, _1n, _2n, _7n, _256n, _0x71n, SHA3_IOTA_H, SHA3_IOTA_L, rotlH, rotlL, gen, sha3_224, sha3_256, sha3_384, sha3_512, keccak_224, keccak_256, keccak_384, keccak_512, genShake, shake128, shake256;
var init_sha3 = __esm(() => {
  init__assert();
  init__u64();
  init_utils2();
  [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];
  _0n = BigInt(0);
  _1n = BigInt(1);
  _2n = BigInt(2);
  _7n = BigInt(7);
  _256n = BigInt(256);
  _0x71n = BigInt(113);
  for (let round = 0, R = _1n, x = 1, y = 0;round < 24; round++) {
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI.push(2 * (5 * y + x));
    SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
    let t = _0n;
    for (let j = 0;j < 7; j++) {
      R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
      if (R & _2n)
        t ^= _1n << (_1n << BigInt(j)) - _1n;
    }
    _SHA3_IOTA.push(t);
  }
  [SHA3_IOTA_H, SHA3_IOTA_L] = split(_SHA3_IOTA, true);
  rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
  rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
  gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
  sha3_224 = gen(6, 144, 224 / 8);
  sha3_256 = gen(6, 136, 256 / 8);
  sha3_384 = gen(6, 104, 384 / 8);
  sha3_512 = gen(6, 72, 512 / 8);
  keccak_224 = gen(1, 144, 224 / 8);
  keccak_256 = gen(1, 136, 256 / 8);
  keccak_384 = gen(1, 104, 384 / 8);
  keccak_512 = gen(1, 72, 512 / 8);
  genShake = (suffix, blockLen, outputLen) => wrapXOFConstructorWithOpts((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
  shake128 = genShake(31, 168, 128 / 8);
  shake256 = genShake(31, 136, 256 / 8);
});

// node_modules/viem/_esm/utils/hash/keccak256.js
function keccak256(value, to_) {
  const to = to_ || "hex";
  const bytes2 = keccak_256(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes2;
  return toHex(bytes2);
}
var init_keccak256 = __esm(() => {
  init_sha3();
  init_isHex();
  init_toBytes();
  init_toHex();
});

// node_modules/viem/_esm/utils/hash/hashSignature.js
function hashSignature(sig) {
  return hash2(sig);
}
var hash2;
var init_hashSignature = __esm(() => {
  init_toBytes();
  init_keccak256();
  hash2 = (value) => keccak256(toBytes(value));
});

// node_modules/viem/_esm/utils/hash/normalizeSignature.js
function normalizeSignature(signature) {
  let active = true;
  let current = "";
  let level = 0;
  let result = "";
  let valid = false;
  for (let i = 0;i < signature.length; i++) {
    const char = signature[i];
    if (["(", ")", ","].includes(char))
      active = true;
    if (char === "(")
      level++;
    if (char === ")")
      level--;
    if (!active)
      continue;
    if (level === 0) {
      if (char === " " && ["event", "function", ""].includes(result))
        result = "";
      else {
        result += char;
        if (char === ")") {
          valid = true;
          break;
        }
      }
      continue;
    }
    if (char === " ") {
      if (signature[i - 1] !== "," && current !== "," && current !== ",(") {
        current = "";
        active = false;
      }
      continue;
    }
    result += char;
    current += char;
  }
  if (!valid)
    throw new BaseError("Unable to normalize signature.");
  return result;
}
var init_normalizeSignature = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/utils/hash/toSignature.js
var toSignature;
var init_toSignature = __esm(() => {
  init_exports();
  init_normalizeSignature();
  toSignature = (def) => {
    const def_ = (() => {
      if (typeof def === "string")
        return def;
      return formatAbiItem(def);
    })();
    return normalizeSignature(def_);
  };
});

// node_modules/viem/_esm/utils/hash/toSignatureHash.js
function toSignatureHash(fn) {
  return hashSignature(toSignature(fn));
}
var init_toSignatureHash = __esm(() => {
  init_hashSignature();
  init_toSignature();
});

// node_modules/viem/_esm/utils/hash/toEventSelector.js
var toEventSelector;
var init_toEventSelector = __esm(() => {
  init_toSignatureHash();
  toEventSelector = toSignatureHash;
});

// node_modules/viem/_esm/errors/address.js
class InvalidAddressError extends BaseError {
  constructor({ address }) {
    super(`Address "${address}" is invalid.`, {
      metaMessages: [
        "- Address must be a hex value of 20 bytes (40 hex characters).",
        "- Address must match its checksum counterpart."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAddressError"
    });
  }
}
var init_address = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/utils/lru.js
class LruMap extends Map {
  constructor(size4) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.maxSize = size4;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize)
      this.delete(this.keys().next().value);
    return this;
  }
}
var init_lru = __esm(() => {
});

// node_modules/viem/_esm/utils/address/getAddress.js
function checksumAddress(address_, chainId) {
  const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
  const hash3 = keccak256(stringToBytes(hexAddress), "bytes");
  const address2 = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
  for (let i = 0;i < 40; i += 2) {
    if (hash3[i >> 1] >> 4 >= 8 && address2[i]) {
      address2[i] = address2[i].toUpperCase();
    }
    if ((hash3[i >> 1] & 15) >= 8 && address2[i + 1]) {
      address2[i + 1] = address2[i + 1].toUpperCase();
    }
  }
  return `0x${address2.join("")}`;
}
function getAddress(address2, chainId) {
  if (!isAddress2(address2, { strict: false }))
    throw new InvalidAddressError({ address: address2 });
  return checksumAddress(address2, chainId);
}
var init_getAddress = __esm(() => {
  init_address();
  init_toBytes();
  init_keccak256();
  init_isAddress();
});

// node_modules/viem/_esm/utils/address/isAddress.js
function isAddress2(address2, options) {
  const { strict = true } = options ?? {};
  if (isAddressCache.has(address2))
    return isAddressCache.get(address2);
  const result = (() => {
    if (!addressRegex.test(address2))
      return false;
    if (address2.toLowerCase() === address2)
      return true;
    if (strict)
      return checksumAddress(address2) === address2;
    return true;
  })();
  isAddressCache.set(address2, result);
  return result;
}
var addressRegex, isAddressCache;
var init_isAddress = __esm(() => {
  init_lru();
  init_getAddress();
  addressRegex = /^0x[a-fA-F0-9]{40}$/;
  isAddressCache = new LruMap(8192);
});

// node_modules/viem/_esm/utils/data/concat.js
function concat(values) {
  if (typeof values[0] === "string")
    return concatHex(values);
  return concatBytes2(values);
}
function concatBytes2(values) {
  let length = 0;
  for (const arr of values) {
    length += arr.length;
  }
  const result = new Uint8Array(length);
  let offset = 0;
  for (const arr of values) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}
function concatHex(values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
var init_concat = __esm(() => {
});

// node_modules/viem/_esm/utils/data/slice.js
function slice(value, start, end, { strict } = {}) {
  if (isHex(value, { strict: false }))
    return sliceHex(value, start, end, {
      strict
    });
  return sliceBytes(value, start, end, {
    strict
  });
}
function sliceBytes(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = value_.slice(start, end);
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}
function sliceHex(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = `0x${value_.replace("0x", "").slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}
var assertStartOffset, assertEndOffset;
var init_slice = __esm(() => {
  init_data();
  init_isHex();
  init_size();
  assertStartOffset = function(value, start) {
    if (typeof start === "number" && start > 0 && start > size(value) - 1)
      throw new SliceOffsetOutOfBoundsError({
        offset: start,
        position: "start",
        size: size(value)
      });
  };
  assertEndOffset = function(value, start, end) {
    if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
      throw new SliceOffsetOutOfBoundsError({
        offset: end,
        position: "end",
        size: size(value)
      });
    }
  };
});

// node_modules/viem/_esm/utils/abi/encodeAbiParameters.js
function encodeAbiParameters(params, values) {
  if (params.length !== values.length)
    throw new AbiEncodingLengthMismatchError({
      expectedLength: params.length,
      givenLength: values.length
    });
  const preparedParams = prepareParams({
    params,
    values
  });
  const data3 = encodeParams(preparedParams);
  if (data3.length === 0)
    return "0x";
  return data3;
}
function getArrayComponents(type) {
  const matches = type.match(/^(.*)\[(\d+)?\]$/);
  return matches ? [matches[2] ? Number(matches[2]) : null, matches[1]] : undefined;
}
var prepareParams, prepareParam, encodeParams, encodeAddress, encodeArray, encodeBytes, encodeBool, encodeNumber, encodeString, encodeTuple;
var init_encodeAbiParameters = __esm(() => {
  init_abi();
  init_address();
  init_base();
  init_isAddress();
  init_concat();
  init_pad();
  init_size();
  init_slice();
  init_toHex();
  prepareParams = function({ params, values }) {
    const preparedParams = [];
    for (let i = 0;i < params.length; i++) {
      preparedParams.push(prepareParam({ param: params[i], value: values[i] }));
    }
    return preparedParams;
  };
  prepareParam = function({ param, value }) {
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents) {
      const [length, type] = arrayComponents;
      return encodeArray(value, { length, param: { ...param, type } });
    }
    if (param.type === "tuple") {
      return encodeTuple(value, {
        param
      });
    }
    if (param.type === "address") {
      return encodeAddress(value);
    }
    if (param.type === "bool") {
      return encodeBool(value);
    }
    if (param.type.startsWith("uint") || param.type.startsWith("int")) {
      const signed = param.type.startsWith("int");
      return encodeNumber(value, { signed });
    }
    if (param.type.startsWith("bytes")) {
      return encodeBytes(value, { param });
    }
    if (param.type === "string") {
      return encodeString(value);
    }
    throw new InvalidAbiEncodingTypeError(param.type, {
      docsPath: "/docs/contract/encodeAbiParameters"
    });
  };
  encodeParams = function(preparedParams) {
    let staticSize = 0;
    for (let i = 0;i < preparedParams.length; i++) {
      const { dynamic, encoded } = preparedParams[i];
      if (dynamic)
        staticSize += 32;
      else
        staticSize += size(encoded);
    }
    const staticParams = [];
    const dynamicParams = [];
    let dynamicSize = 0;
    for (let i = 0;i < preparedParams.length; i++) {
      const { dynamic, encoded } = preparedParams[i];
      if (dynamic) {
        staticParams.push(numberToHex(staticSize + dynamicSize, { size: 32 }));
        dynamicParams.push(encoded);
        dynamicSize += size(encoded);
      } else {
        staticParams.push(encoded);
      }
    }
    return concat([...staticParams, ...dynamicParams]);
  };
  encodeAddress = function(value) {
    if (!isAddress2(value))
      throw new InvalidAddressError({ address: value });
    return { dynamic: false, encoded: padHex(value.toLowerCase()) };
  };
  encodeArray = function(value, { length, param }) {
    const dynamic = length === null;
    if (!Array.isArray(value))
      throw new InvalidArrayError(value);
    if (!dynamic && value.length !== length)
      throw new AbiEncodingArrayLengthMismatchError({
        expectedLength: length,
        givenLength: value.length,
        type: `${param.type}[${length}]`
      });
    let dynamicChild = false;
    const preparedParams = [];
    for (let i = 0;i < value.length; i++) {
      const preparedParam = prepareParam({ param, value: value[i] });
      if (preparedParam.dynamic)
        dynamicChild = true;
      preparedParams.push(preparedParam);
    }
    if (dynamic || dynamicChild) {
      const data3 = encodeParams(preparedParams);
      if (dynamic) {
        const length2 = numberToHex(preparedParams.length, { size: 32 });
        return {
          dynamic: true,
          encoded: preparedParams.length > 0 ? concat([length2, data3]) : length2
        };
      }
      if (dynamicChild)
        return { dynamic: true, encoded: data3 };
    }
    return {
      dynamic: false,
      encoded: concat(preparedParams.map(({ encoded }) => encoded))
    };
  };
  encodeBytes = function(value, { param }) {
    const [, paramSize] = param.type.split("bytes");
    const bytesSize = size(value);
    if (!paramSize) {
      let value_ = value;
      if (bytesSize % 32 !== 0)
        value_ = padHex(value_, {
          dir: "right",
          size: Math.ceil((value.length - 2) / 2 / 32) * 32
        });
      return {
        dynamic: true,
        encoded: concat([padHex(numberToHex(bytesSize, { size: 32 })), value_])
      };
    }
    if (bytesSize !== parseInt(paramSize))
      throw new AbiEncodingBytesSizeMismatchError({
        expectedSize: parseInt(paramSize),
        value
      });
    return { dynamic: false, encoded: padHex(value, { dir: "right" }) };
  };
  encodeBool = function(value) {
    if (typeof value !== "boolean")
      throw new BaseError(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
    return { dynamic: false, encoded: padHex(boolToHex(value)) };
  };
  encodeNumber = function(value, { signed }) {
    return {
      dynamic: false,
      encoded: numberToHex(value, {
        size: 32,
        signed
      })
    };
  };
  encodeString = function(value) {
    const hexValue = stringToHex(value);
    const partsLength = Math.ceil(size(hexValue) / 32);
    const parts = [];
    for (let i = 0;i < partsLength; i++) {
      parts.push(padHex(slice(hexValue, i * 32, (i + 1) * 32), {
        dir: "right"
      }));
    }
    return {
      dynamic: true,
      encoded: concat([
        padHex(numberToHex(size(hexValue), { size: 32 })),
        ...parts
      ])
    };
  };
  encodeTuple = function(value, { param }) {
    let dynamic = false;
    const preparedParams = [];
    for (let i = 0;i < param.components.length; i++) {
      const param_ = param.components[i];
      const index = Array.isArray(value) ? i : param_.name;
      const preparedParam = prepareParam({
        param: param_,
        value: value[index]
      });
      preparedParams.push(preparedParam);
      if (preparedParam.dynamic)
        dynamic = true;
    }
    return {
      dynamic,
      encoded: dynamic ? encodeParams(preparedParams) : concat(preparedParams.map(({ encoded }) => encoded))
    };
  };
});

// node_modules/viem/_esm/utils/hash/toFunctionSelector.js
var toFunctionSelector;
var init_toFunctionSelector = __esm(() => {
  init_slice();
  init_toSignatureHash();
  toFunctionSelector = (fn) => slice(toSignatureHash(fn), 0, 4);
});

// node_modules/viem/_esm/utils/abi/getAbiItem.js
function getAbiItem(parameters) {
  const { abi: abi4, args = [], name } = parameters;
  const isSelector = isHex(name, { strict: false });
  const abiItems = abi4.filter((abiItem) => {
    if (isSelector) {
      if (abiItem.type === "function")
        return toFunctionSelector(abiItem) === name;
      if (abiItem.type === "event")
        return toEventSelector(abiItem) === name;
      return false;
    }
    return ("name" in abiItem) && abiItem.name === name;
  });
  if (abiItems.length === 0)
    return;
  if (abiItems.length === 1)
    return abiItems[0];
  let matchedAbiItem = undefined;
  for (const abiItem of abiItems) {
    if (!("inputs" in abiItem))
      continue;
    if (!args || args.length === 0) {
      if (!abiItem.inputs || abiItem.inputs.length === 0)
        return abiItem;
      continue;
    }
    if (!abiItem.inputs)
      continue;
    if (abiItem.inputs.length === 0)
      continue;
    if (abiItem.inputs.length !== args.length)
      continue;
    const matched = args.every((arg, index) => {
      const abiParameter = ("inputs" in abiItem) && abiItem.inputs[index];
      if (!abiParameter)
        return false;
      return isArgOfType(arg, abiParameter);
    });
    if (matched) {
      if (matchedAbiItem && ("inputs" in matchedAbiItem) && matchedAbiItem.inputs) {
        const ambiguousTypes = getAmbiguousTypes(abiItem.inputs, matchedAbiItem.inputs, args);
        if (ambiguousTypes)
          throw new AbiItemAmbiguityError({
            abiItem,
            type: ambiguousTypes[0]
          }, {
            abiItem: matchedAbiItem,
            type: ambiguousTypes[1]
          });
      }
      matchedAbiItem = abiItem;
    }
  }
  if (matchedAbiItem)
    return matchedAbiItem;
  return abiItems[0];
}
function isArgOfType(arg, abiParameter) {
  const argType = typeof arg;
  const abiParameterType = abiParameter.type;
  switch (abiParameterType) {
    case "address":
      return isAddress2(arg, { strict: false });
    case "bool":
      return argType === "boolean";
    case "function":
      return argType === "string";
    case "string":
      return argType === "string";
    default: {
      if (abiParameterType === "tuple" && ("components" in abiParameter))
        return Object.values(abiParameter.components).every((component, index) => {
          return isArgOfType(Object.values(arg)[index], component);
        });
      if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
        return argType === "number" || argType === "bigint";
      if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
        return argType === "string" || arg instanceof Uint8Array;
      if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
        return Array.isArray(arg) && arg.every((x) => isArgOfType(x, {
          ...abiParameter,
          type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
        }));
      }
      return false;
    }
  }
}
function getAmbiguousTypes(sourceParameters, targetParameters, args) {
  for (const parameterIndex in sourceParameters) {
    const sourceParameter = sourceParameters[parameterIndex];
    const targetParameter = targetParameters[parameterIndex];
    if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && ("components" in sourceParameter) && ("components" in targetParameter))
      return getAmbiguousTypes(sourceParameter.components, targetParameter.components, args[parameterIndex]);
    const types = [sourceParameter.type, targetParameter.type];
    const ambiguous = (() => {
      if (types.includes("address") && types.includes("bytes20"))
        return true;
      if (types.includes("address") && types.includes("string"))
        return isAddress2(args[parameterIndex], { strict: false });
      if (types.includes("address") && types.includes("bytes"))
        return isAddress2(args[parameterIndex], { strict: false });
      return false;
    })();
    if (ambiguous)
      return types;
  }
  return;
}
var init_getAbiItem = __esm(() => {
  init_abi();
  init_isHex();
  init_isAddress();
  init_toEventSelector();
  init_toFunctionSelector();
});

// node_modules/viem/_esm/accounts/utils/parseAccount.js
function parseAccount(account) {
  if (typeof account === "string")
    return { address: account, type: "json-rpc" };
  return account;
}
var init_parseAccount = __esm(() => {
});

// node_modules/viem/_esm/utils/abi/prepareEncodeFunctionData.js
function prepareEncodeFunctionData(parameters) {
  const { abi: abi6, args, functionName } = parameters;
  let abiItem = abi6[0];
  if (functionName) {
    const item = getAbiItem({
      abi: abi6,
      args,
      name: functionName
    });
    if (!item)
      throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath2 });
    abiItem = item;
  }
  if (abiItem.type !== "function")
    throw new AbiFunctionNotFoundError(undefined, { docsPath: docsPath2 });
  return {
    abi: [abiItem],
    functionName: toFunctionSelector(formatAbiItem2(abiItem))
  };
}
var docsPath2;
var init_prepareEncodeFunctionData = __esm(() => {
  init_abi();
  init_toFunctionSelector();
  init_formatAbiItem2();
  init_getAbiItem();
  docsPath2 = "/docs/contract/encodeFunctionData";
});

// node_modules/viem/_esm/utils/abi/encodeFunctionData.js
function encodeFunctionData(parameters) {
  const { args } = parameters;
  const { abi: abi6, functionName } = (() => {
    if (parameters.abi.length === 1 && parameters.functionName?.startsWith("0x"))
      return parameters;
    return prepareEncodeFunctionData(parameters);
  })();
  const abiItem = abi6[0];
  const signature = functionName;
  const data3 = ("inputs" in abiItem) && abiItem.inputs ? encodeAbiParameters(abiItem.inputs, args ?? []) : undefined;
  return concatHex([signature, data3 ?? "0x"]);
}
var init_encodeFunctionData = __esm(() => {
  init_concat();
  init_encodeAbiParameters();
  init_prepareEncodeFunctionData();
});

// node_modules/viem/_esm/constants/solidity.js
var panicReasons, solidityError, solidityPanic;
var init_solidity = __esm(() => {
  panicReasons = {
    1: "An `assert` condition failed.",
    17: "Arithmetic operation resulted in underflow or overflow.",
    18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
    33: "Attempted to convert to an invalid type.",
    34: "Attempted to access a storage byte array that is incorrectly encoded.",
    49: "Performed `.pop()` on an empty array",
    50: "Array index is out of bounds.",
    65: "Allocated too much memory or created an array which is too large.",
    81: "Attempted to call a zero-initialized variable of internal function type."
  };
  solidityError = {
    inputs: [
      {
        name: "message",
        type: "string"
      }
    ],
    name: "Error",
    type: "error"
  };
  solidityPanic = {
    inputs: [
      {
        name: "reason",
        type: "uint256"
      }
    ],
    name: "Panic",
    type: "error"
  };
});

// node_modules/viem/_esm/errors/cursor.js
class NegativeOffsetError extends BaseError {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "NegativeOffsetError"
    });
  }
}

class PositionOutOfBoundsError extends BaseError {
  constructor({ length, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PositionOutOfBoundsError"
    });
  }
}

class RecursiveReadLimitExceededError extends BaseError {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RecursiveReadLimitExceededError"
    });
  }
}
var init_cursor = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/utils/cursor.js
function createCursor(bytes2, { recursiveReadLimit = 8192 } = {}) {
  const cursor2 = Object.create(staticCursor);
  cursor2.bytes = bytes2;
  cursor2.dataView = new DataView(bytes2.buffer, bytes2.byteOffset, bytes2.byteLength);
  cursor2.positionReadCount = new Map;
  cursor2.recursiveReadLimit = recursiveReadLimit;
  return cursor2;
}
var staticCursor;
var init_cursor2 = __esm(() => {
  init_cursor();
  staticCursor = {
    bytes: new Uint8Array,
    dataView: new DataView(new ArrayBuffer(0)),
    position: 0,
    positionReadCount: new Map,
    recursiveReadCount: 0,
    recursiveReadLimit: Infinity,
    assertReadLimit() {
      if (this.recursiveReadCount >= this.recursiveReadLimit)
        throw new RecursiveReadLimitExceededError({
          count: this.recursiveReadCount + 1,
          limit: this.recursiveReadLimit
        });
    },
    assertPosition(position) {
      if (position < 0 || position > this.bytes.length - 1)
        throw new PositionOutOfBoundsError({
          length: this.bytes.length,
          position
        });
    },
    decrementPosition(offset) {
      if (offset < 0)
        throw new NegativeOffsetError({ offset });
      const position = this.position - offset;
      this.assertPosition(position);
      this.position = position;
    },
    getReadCount(position) {
      return this.positionReadCount.get(position || this.position) || 0;
    },
    incrementPosition(offset) {
      if (offset < 0)
        throw new NegativeOffsetError({ offset });
      const position = this.position + offset;
      this.assertPosition(position);
      this.position = position;
    },
    inspectByte(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position);
      return this.bytes[position];
    },
    inspectBytes(length, position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + length - 1);
      return this.bytes.subarray(position, position + length);
    },
    inspectUint8(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position);
      return this.bytes[position];
    },
    inspectUint16(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + 1);
      return this.dataView.getUint16(position);
    },
    inspectUint24(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + 2);
      return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
    },
    inspectUint32(position_) {
      const position = position_ ?? this.position;
      this.assertPosition(position + 3);
      return this.dataView.getUint32(position);
    },
    pushByte(byte) {
      this.assertPosition(this.position);
      this.bytes[this.position] = byte;
      this.position++;
    },
    pushBytes(bytes2) {
      this.assertPosition(this.position + bytes2.length - 1);
      this.bytes.set(bytes2, this.position);
      this.position += bytes2.length;
    },
    pushUint8(value) {
      this.assertPosition(this.position);
      this.bytes[this.position] = value;
      this.position++;
    },
    pushUint16(value) {
      this.assertPosition(this.position + 1);
      this.dataView.setUint16(this.position, value);
      this.position += 2;
    },
    pushUint24(value) {
      this.assertPosition(this.position + 2);
      this.dataView.setUint16(this.position, value >> 8);
      this.dataView.setUint8(this.position + 2, value & ~4294967040);
      this.position += 3;
    },
    pushUint32(value) {
      this.assertPosition(this.position + 3);
      this.dataView.setUint32(this.position, value);
      this.position += 4;
    },
    readByte() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectByte();
      this.position++;
      return value;
    },
    readBytes(length, size6) {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectBytes(length);
      this.position += size6 ?? length;
      return value;
    },
    readUint8() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint8();
      this.position += 1;
      return value;
    },
    readUint16() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint16();
      this.position += 2;
      return value;
    },
    readUint24() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint24();
      this.position += 3;
      return value;
    },
    readUint32() {
      this.assertReadLimit();
      this._touch();
      const value = this.inspectUint32();
      this.position += 4;
      return value;
    },
    get remaining() {
      return this.bytes.length - this.position;
    },
    setPosition(position) {
      const oldPosition = this.position;
      this.assertPosition(position);
      this.position = position;
      return () => this.position = oldPosition;
    },
    _touch() {
      if (this.recursiveReadLimit === Infinity)
        return;
      const count = this.getReadCount();
      this.positionReadCount.set(this.position, count + 1);
      if (count > 0)
        this.recursiveReadCount++;
    }
  };
});

// node_modules/viem/_esm/utils/encoding/fromBytes.js
function bytesToBigInt(bytes2, opts = {}) {
  if (typeof opts.size !== "undefined")
    assertSize(bytes2, { size: opts.size });
  const hex = bytesToHex(bytes2, opts);
  return hexToBigInt(hex, opts);
}
function bytesToBool(bytes_, opts = {}) {
  let bytes2 = bytes_;
  if (typeof opts.size !== "undefined") {
    assertSize(bytes2, { size: opts.size });
    bytes2 = trim(bytes2);
  }
  if (bytes2.length > 1 || bytes2[0] > 1)
    throw new InvalidBytesBooleanError(bytes2);
  return Boolean(bytes2[0]);
}
function bytesToNumber(bytes2, opts = {}) {
  if (typeof opts.size !== "undefined")
    assertSize(bytes2, { size: opts.size });
  const hex = bytesToHex(bytes2, opts);
  return hexToNumber(hex, opts);
}
function bytesToString(bytes_, opts = {}) {
  let bytes2 = bytes_;
  if (typeof opts.size !== "undefined") {
    assertSize(bytes2, { size: opts.size });
    bytes2 = trim(bytes2, { dir: "right" });
  }
  return new TextDecoder().decode(bytes2);
}
var init_fromBytes = __esm(() => {
  init_encoding();
  init_trim();
  init_fromHex();
  init_toHex();
});

// node_modules/viem/_esm/utils/abi/decodeAbiParameters.js
function decodeAbiParameters(params, data3) {
  const bytes2 = typeof data3 === "string" ? hexToBytes(data3) : data3;
  const cursor3 = createCursor(bytes2);
  if (size(bytes2) === 0 && params.length > 0)
    throw new AbiDecodingZeroDataError;
  if (size(data3) && size(data3) < 32)
    throw new AbiDecodingDataSizeTooSmallError({
      data: typeof data3 === "string" ? data3 : bytesToHex(data3),
      params,
      size: size(data3)
    });
  let consumed = 0;
  const values = [];
  for (let i = 0;i < params.length; ++i) {
    const param = params[i];
    cursor3.setPosition(consumed);
    const [data4, consumed_] = decodeParameter(cursor3, param, {
      staticPosition: 0
    });
    consumed += consumed_;
    values.push(data4);
  }
  return values;
}
var decodeParameter, decodeAddress, decodeArray, decodeBool, decodeBytes, decodeNumber, decodeTuple, decodeString, hasDynamicChild, sizeOfLength, sizeOfOffset;
var init_decodeAbiParameters = __esm(() => {
  init_abi();
  init_getAddress();
  init_cursor2();
  init_size();
  init_slice();
  init_trim();
  init_fromBytes();
  init_toBytes();
  init_toHex();
  init_encodeAbiParameters();
  decodeParameter = function(cursor3, param, { staticPosition }) {
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents) {
      const [length, type] = arrayComponents;
      return decodeArray(cursor3, { ...param, type }, { length, staticPosition });
    }
    if (param.type === "tuple")
      return decodeTuple(cursor3, param, { staticPosition });
    if (param.type === "address")
      return decodeAddress(cursor3);
    if (param.type === "bool")
      return decodeBool(cursor3);
    if (param.type.startsWith("bytes"))
      return decodeBytes(cursor3, param, { staticPosition });
    if (param.type.startsWith("uint") || param.type.startsWith("int"))
      return decodeNumber(cursor3, param);
    if (param.type === "string")
      return decodeString(cursor3, { staticPosition });
    throw new InvalidAbiDecodingTypeError(param.type, {
      docsPath: "/docs/contract/decodeAbiParameters"
    });
  };
  decodeAddress = function(cursor3) {
    const value = cursor3.readBytes(32);
    return [checksumAddress(bytesToHex(sliceBytes(value, -20))), 32];
  };
  decodeArray = function(cursor3, param, { length, staticPosition }) {
    if (!length) {
      const offset = bytesToNumber(cursor3.readBytes(sizeOfOffset));
      const start = staticPosition + offset;
      const startOfData = start + sizeOfLength;
      cursor3.setPosition(start);
      const length2 = bytesToNumber(cursor3.readBytes(sizeOfLength));
      const dynamicChild = hasDynamicChild(param);
      let consumed2 = 0;
      const value2 = [];
      for (let i = 0;i < length2; ++i) {
        cursor3.setPosition(startOfData + (dynamicChild ? i * 32 : consumed2));
        const [data3, consumed_] = decodeParameter(cursor3, param, {
          staticPosition: startOfData
        });
        consumed2 += consumed_;
        value2.push(data3);
      }
      cursor3.setPosition(staticPosition + 32);
      return [value2, 32];
    }
    if (hasDynamicChild(param)) {
      const offset = bytesToNumber(cursor3.readBytes(sizeOfOffset));
      const start = staticPosition + offset;
      const value2 = [];
      for (let i = 0;i < length; ++i) {
        cursor3.setPosition(start + i * 32);
        const [data3] = decodeParameter(cursor3, param, {
          staticPosition: start
        });
        value2.push(data3);
      }
      cursor3.setPosition(staticPosition + 32);
      return [value2, 32];
    }
    let consumed = 0;
    const value = [];
    for (let i = 0;i < length; ++i) {
      const [data3, consumed_] = decodeParameter(cursor3, param, {
        staticPosition: staticPosition + consumed
      });
      consumed += consumed_;
      value.push(data3);
    }
    return [value, consumed];
  };
  decodeBool = function(cursor3) {
    return [bytesToBool(cursor3.readBytes(32), { size: 32 }), 32];
  };
  decodeBytes = function(cursor3, param, { staticPosition }) {
    const [_, size7] = param.type.split("bytes");
    if (!size7) {
      const offset = bytesToNumber(cursor3.readBytes(32));
      cursor3.setPosition(staticPosition + offset);
      const length = bytesToNumber(cursor3.readBytes(32));
      if (length === 0) {
        cursor3.setPosition(staticPosition + 32);
        return ["0x", 32];
      }
      const data3 = cursor3.readBytes(length);
      cursor3.setPosition(staticPosition + 32);
      return [bytesToHex(data3), 32];
    }
    const value = bytesToHex(cursor3.readBytes(parseInt(size7), 32));
    return [value, 32];
  };
  decodeNumber = function(cursor3, param) {
    const signed = param.type.startsWith("int");
    const size7 = parseInt(param.type.split("int")[1] || "256");
    const value = cursor3.readBytes(32);
    return [
      size7 > 48 ? bytesToBigInt(value, { signed }) : bytesToNumber(value, { signed }),
      32
    ];
  };
  decodeTuple = function(cursor3, param, { staticPosition }) {
    const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
    const value = hasUnnamedChild ? [] : {};
    let consumed = 0;
    if (hasDynamicChild(param)) {
      const offset = bytesToNumber(cursor3.readBytes(sizeOfOffset));
      const start = staticPosition + offset;
      for (let i = 0;i < param.components.length; ++i) {
        const component = param.components[i];
        cursor3.setPosition(start + consumed);
        const [data3, consumed_] = decodeParameter(cursor3, component, {
          staticPosition: start
        });
        consumed += consumed_;
        value[hasUnnamedChild ? i : component?.name] = data3;
      }
      cursor3.setPosition(staticPosition + 32);
      return [value, 32];
    }
    for (let i = 0;i < param.components.length; ++i) {
      const component = param.components[i];
      const [data3, consumed_] = decodeParameter(cursor3, component, {
        staticPosition
      });
      value[hasUnnamedChild ? i : component?.name] = data3;
      consumed += consumed_;
    }
    return [value, consumed];
  };
  decodeString = function(cursor3, { staticPosition }) {
    const offset = bytesToNumber(cursor3.readBytes(32));
    const start = staticPosition + offset;
    cursor3.setPosition(start);
    const length = bytesToNumber(cursor3.readBytes(32));
    if (length === 0) {
      cursor3.setPosition(staticPosition + 32);
      return ["", 32];
    }
    const data3 = cursor3.readBytes(length, 32);
    const value = bytesToString(trim(data3));
    cursor3.setPosition(staticPosition + 32);
    return [value, 32];
  };
  hasDynamicChild = function(param) {
    const { type } = param;
    if (type === "string")
      return true;
    if (type === "bytes")
      return true;
    if (type.endsWith("[]"))
      return true;
    if (type === "tuple")
      return param.components?.some(hasDynamicChild);
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents && hasDynamicChild({ ...param, type: arrayComponents[1] }))
      return true;
    return false;
  };
  sizeOfLength = 32;
  sizeOfOffset = 32;
});

// node_modules/viem/_esm/utils/abi/decodeErrorResult.js
function decodeErrorResult(parameters) {
  const { abi: abi8, data: data3 } = parameters;
  const signature = slice(data3, 0, 4);
  if (signature === "0x")
    throw new AbiDecodingZeroDataError;
  const abi_ = [...abi8 || [], solidityError, solidityPanic];
  const abiItem = abi_.find((x) => x.type === "error" && signature === toFunctionSelector(formatAbiItem2(x)));
  if (!abiItem)
    throw new AbiErrorSignatureNotFoundError(signature, {
      docsPath: "/docs/contract/decodeErrorResult"
    });
  return {
    abiItem,
    args: ("inputs" in abiItem) && abiItem.inputs && abiItem.inputs.length > 0 ? decodeAbiParameters(abiItem.inputs, slice(data3, 4)) : undefined,
    errorName: abiItem.name
  };
}
var init_decodeErrorResult = __esm(() => {
  init_solidity();
  init_abi();
  init_slice();
  init_toFunctionSelector();
  init_decodeAbiParameters();
  init_formatAbiItem2();
});

// node_modules/viem/_esm/utils/stringify.js
var stringify;
var init_stringify = __esm(() => {
  stringify = (value, replacer, space) => JSON.stringify(value, (key, value_) => {
    const value2 = typeof value_ === "bigint" ? value_.toString() : value_;
    return typeof replacer === "function" ? replacer(key, value2) : value2;
  }, space);
});

// node_modules/viem/_esm/utils/abi/formatAbiItemWithArgs.js
function formatAbiItemWithArgs({ abiItem, args, includeFunctionName = true, includeName = false }) {
  if (!("name" in abiItem))
    return;
  if (!("inputs" in abiItem))
    return;
  if (!abiItem.inputs)
    return;
  return `${includeFunctionName ? abiItem.name : ""}(${abiItem.inputs.map((input, i) => `${includeName && input.name ? `${input.name}: ` : ""}${typeof args[i] === "object" ? stringify(args[i]) : args[i]}`).join(", ")})`;
}
var init_formatAbiItemWithArgs = __esm(() => {
  init_stringify();
});

// node_modules/viem/_esm/constants/unit.js
var etherUnits, gweiUnits;
var init_unit = __esm(() => {
  etherUnits = {
    gwei: 9,
    wei: 18
  };
  gweiUnits = {
    ether: -9,
    wei: 9
  };
});

// node_modules/viem/_esm/utils/unit/formatUnits.js
function formatUnits(value, decimals) {
  let display = value.toString();
  const negative = display.startsWith("-");
  if (negative)
    display = display.slice(1);
  display = display.padStart(decimals, "0");
  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals)
  ];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
}
var init_formatUnits = __esm(() => {
});

// node_modules/viem/_esm/utils/unit/formatEther.js
function formatEther(wei, unit2 = "wei") {
  return formatUnits(wei, etherUnits[unit2]);
}
var init_formatEther = __esm(() => {
  init_unit();
  init_formatUnits();
});

// node_modules/viem/_esm/utils/unit/formatGwei.js
function formatGwei(wei, unit3 = "wei") {
  return formatUnits(wei, gweiUnits[unit3]);
}
var init_formatGwei = __esm(() => {
  init_unit();
  init_formatUnits();
});

// node_modules/viem/_esm/errors/stateOverride.js
function prettyStateMapping(stateMapping) {
  return stateMapping.reduce((pretty, { slot, value }) => {
    return `${pretty}        ${slot}: ${value}\n`;
  }, "");
}
function prettyStateOverride(stateOverride) {
  return stateOverride.reduce((pretty, { address: address3, ...state }) => {
    let val = `${pretty}    ${address3}:\n`;
    if (state.nonce)
      val += `      nonce: ${state.nonce}\n`;
    if (state.balance)
      val += `      balance: ${state.balance}\n`;
    if (state.code)
      val += `      code: ${state.code}\n`;
    if (state.state) {
      val += "      state:\n";
      val += prettyStateMapping(state.state);
    }
    if (state.stateDiff) {
      val += "      stateDiff:\n";
      val += prettyStateMapping(state.stateDiff);
    }
    return val;
  }, "  State Override:\n").slice(0, -1);
}

class AccountStateConflictError extends BaseError {
  constructor({ address: address3 }) {
    super(`State for account "${address3}" is set multiple times.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AccountStateConflictError"
    });
  }
}

class StateAssignmentConflictError extends BaseError {
  constructor() {
    super("state and stateDiff are set on the same account.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "StateAssignmentConflictError"
    });
  }
}
var init_stateOverride = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/errors/transaction.js
function prettyPrint(args) {
  const entries = Object.entries(args).map(([key, value]) => {
    if (value === undefined || value === false)
      return null;
    return [key, value];
  }).filter(Boolean);
  const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
  return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
}

class FeeConflictError extends BaseError {
  constructor() {
    super([
      "Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.",
      "Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others."
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "FeeConflictError"
    });
  }
}

class InvalidLegacyVError extends BaseError {
  constructor({ v }) {
    super(`Invalid \`v\` value "${v}". Expected 27 or 28.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidLegacyVError"
    });
  }
}

class InvalidSerializableTransactionError extends BaseError {
  constructor({ transaction }) {
    super("Cannot infer a transaction type from provided transaction.", {
      metaMessages: [
        "Provided Transaction:",
        "{",
        prettyPrint(transaction),
        "}",
        "",
        "To infer the type, either provide:",
        "- a `type` to the Transaction, or",
        "- an EIP-1559 Transaction with `maxFeePerGas`, or",
        "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
        "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
        "- a Legacy Transaction with `gasPrice`"
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidSerializableTransactionError"
    });
  }
}

class InvalidStorageKeySizeError extends BaseError {
  constructor({ storageKey }) {
    super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Math.floor((storageKey.length - 2) / 2)} bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidStorageKeySizeError"
    });
  }
}

class TransactionNotFoundError extends BaseError {
  constructor({ blockHash, blockNumber, blockTag, hash: hash3, index }) {
    let identifier = "Transaction";
    if (blockTag && index !== undefined)
      identifier = `Transaction at block time "${blockTag}" at index "${index}"`;
    if (blockHash && index !== undefined)
      identifier = `Transaction at block hash "${blockHash}" at index "${index}"`;
    if (blockNumber && index !== undefined)
      identifier = `Transaction at block number "${blockNumber}" at index "${index}"`;
    if (hash3)
      identifier = `Transaction with hash "${hash3}"`;
    super(`${identifier} could not be found.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionNotFoundError"
    });
  }
}

class TransactionReceiptNotFoundError extends BaseError {
  constructor({ hash: hash3 }) {
    super(`Transaction receipt with hash "${hash3}" could not be found. The Transaction may not be processed on a block yet.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionReceiptNotFoundError"
    });
  }
}

class WaitForTransactionReceiptTimeoutError extends BaseError {
  constructor({ hash: hash3 }) {
    super(`Timed out while waiting for transaction with hash "${hash3}" to be confirmed.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WaitForTransactionReceiptTimeoutError"
    });
  }
}
var init_transaction = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/errors/contract.js
class CallExecutionError extends BaseError {
  constructor(cause, { account: account_, docsPath: docsPath3, chain, data: data3, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride: stateOverride2 }) {
    const account = account_ ? parseAccount(account_) : undefined;
    let prettyArgs = prettyPrint({
      from: account?.address,
      to,
      value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
      data: data3,
      gas,
      gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
      maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
      maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
      nonce
    });
    if (stateOverride2) {
      prettyArgs += `\n${prettyStateOverride(stateOverride2)}`;
    }
    super(cause.shortMessage, {
      cause,
      docsPath: docsPath3,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Raw Call Arguments:",
        prettyArgs
      ].filter(Boolean)
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "CallExecutionError"
    });
    this.cause = cause;
  }
}

class ContractFunctionExecutionError extends BaseError {
  constructor(cause, { abi: abi9, args, contractAddress, docsPath: docsPath3, functionName, sender }) {
    const abiItem = getAbiItem({ abi: abi9, args, name: functionName });
    const formattedArgs = abiItem ? formatAbiItemWithArgs({
      abiItem,
      args,
      includeFunctionName: false,
      includeName: false
    }) : undefined;
    const functionWithParams = abiItem ? formatAbiItem2(abiItem, { includeName: true }) : undefined;
    const prettyArgs = prettyPrint({
      address: contractAddress && getContractAddress(contractAddress),
      function: functionWithParams,
      args: formattedArgs && formattedArgs !== "()" && `${[...Array(functionName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}`,
      sender
    });
    super(cause.shortMessage || `An unknown error occurred while executing the contract function "${functionName}".`, {
      cause,
      docsPath: docsPath3,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Contract Call:",
        prettyArgs
      ].filter(Boolean)
    });
    Object.defineProperty(this, "abi", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "args", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "contractAddress", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "formattedArgs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "functionName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "sender", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ContractFunctionExecutionError"
    });
    this.abi = abi9;
    this.args = args;
    this.cause = cause;
    this.contractAddress = contractAddress;
    this.functionName = functionName;
    this.sender = sender;
  }
}

class ContractFunctionRevertedError extends BaseError {
  constructor({ abi: abi9, data: data3, functionName, message }) {
    let cause;
    let decodedData = undefined;
    let metaMessages;
    let reason;
    if (data3 && data3 !== "0x") {
      try {
        decodedData = decodeErrorResult({ abi: abi9, data: data3 });
        const { abiItem, errorName, args: errorArgs } = decodedData;
        if (errorName === "Error") {
          reason = errorArgs[0];
        } else if (errorName === "Panic") {
          const [firstArg] = errorArgs;
          reason = panicReasons[firstArg];
        } else {
          const errorWithParams = abiItem ? formatAbiItem2(abiItem, { includeName: true }) : undefined;
          const formattedArgs = abiItem && errorArgs ? formatAbiItemWithArgs({
            abiItem,
            args: errorArgs,
            includeFunctionName: false,
            includeName: false
          }) : undefined;
          metaMessages = [
            errorWithParams ? `Error: ${errorWithParams}` : "",
            formattedArgs && formattedArgs !== "()" ? `       ${[...Array(errorName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}` : ""
          ];
        }
      } catch (err) {
        cause = err;
      }
    } else if (message)
      reason = message;
    let signature;
    if (cause instanceof AbiErrorSignatureNotFoundError) {
      signature = cause.signature;
      metaMessages = [
        `Unable to decode signature "${signature}" as it was not found on the provided ABI.`,
        "Make sure you are using the correct ABI and that the error exists on it.",
        `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`
      ];
    }
    super(reason && reason !== "execution reverted" || signature ? [
      `The contract function "${functionName}" reverted with the following ${signature ? "signature" : "reason"}:`,
      reason || signature
    ].join("\n") : `The contract function "${functionName}" reverted.`, {
      cause,
      metaMessages
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ContractFunctionRevertedError"
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "reason", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "signature", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.data = decodedData;
    this.reason = reason;
    this.signature = signature;
  }
}

class ContractFunctionZeroDataError extends BaseError {
  constructor({ functionName }) {
    super(`The contract function "${functionName}" returned no data ("0x").`, {
      metaMessages: [
        "This could be due to any of the following:",
        `  - The contract does not have the function "${functionName}",`,
        "  - The parameters passed to the contract function may be invalid, or",
        "  - The address is not a contract."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ContractFunctionZeroDataError"
    });
  }
}

class RawContractError extends BaseError {
  constructor({ data: data3, message }) {
    super(message || "");
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 3
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RawContractError"
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.data = data3;
  }
}
var init_contract = __esm(() => {
  init_parseAccount();
  init_solidity();
  init_decodeErrorResult();
  init_formatAbiItem2();
  init_formatAbiItemWithArgs();
  init_getAbiItem();
  init_formatEther();
  init_formatGwei();
  init_abi();
  init_base();
  init_stateOverride();
  init_transaction();
  init_utils();
});

// node_modules/viem/_esm/errors/request.js
class HttpRequestError extends BaseError {
  constructor({ body, details, headers, status, url }) {
    super("HTTP request failed.", {
      details,
      metaMessages: [
        status && `Status: ${status}`,
        `URL: ${getUrl(url)}`,
        body && `Request body: ${stringify(body)}`
      ].filter(Boolean)
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "HttpRequestError"
    });
    Object.defineProperty(this, "body", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "headers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "status", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "url", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.body = body;
    this.headers = headers;
    this.status = status;
    this.url = url;
  }
}

class RpcRequestError extends BaseError {
  constructor({ body, error, url }) {
    super("RPC Request failed.", {
      cause: error,
      details: error.message,
      metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcRequestError"
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.code = error.code;
  }
}

class TimeoutError extends BaseError {
  constructor({ body, url }) {
    super("The request took too long to respond.", {
      details: "The request timed out.",
      metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TimeoutError"
    });
  }
}
var init_request = __esm(() => {
  init_stringify();
  init_base();
  init_utils();
});

// node_modules/viem/_esm/errors/rpc.js
class RpcError extends BaseError {
  constructor(cause, { code, docsPath: docsPath3, metaMessages, shortMessage }) {
    super(shortMessage, {
      cause,
      docsPath: docsPath3,
      metaMessages: metaMessages || cause?.metaMessages
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcError"
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.name = cause.name;
    this.code = cause instanceof RpcRequestError ? cause.code : code ?? unknownErrorCode;
  }
}

class ProviderRpcError extends RpcError {
  constructor(cause, options) {
    super(cause, options);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ProviderRpcError"
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.data = options.data;
  }
}

class ParseRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: ParseRpcError.code,
      shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ParseRpcError"
    });
  }
}

class InvalidRequestRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: InvalidRequestRpcError.code,
      shortMessage: "JSON is not a valid request object."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidRequestRpcError"
    });
  }
}

class MethodNotFoundRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: MethodNotFoundRpcError.code,
      shortMessage: "The method does not exist / is not available."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "MethodNotFoundRpcError"
    });
  }
}

class InvalidParamsRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: InvalidParamsRpcError.code,
      shortMessage: [
        "Invalid parameters were provided to the RPC method.",
        "Double check you have provided the correct parameters."
      ].join("\n")
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidParamsRpcError"
    });
  }
}

class InternalRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: InternalRpcError.code,
      shortMessage: "An internal error was received."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InternalRpcError"
    });
  }
}

class InvalidInputRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: InvalidInputRpcError.code,
      shortMessage: [
        "Missing or invalid parameters.",
        "Double check you have provided the correct parameters."
      ].join("\n")
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidInputRpcError"
    });
  }
}

class ResourceNotFoundRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: ResourceNotFoundRpcError.code,
      shortMessage: "Requested resource not found."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ResourceNotFoundRpcError"
    });
  }
}

class ResourceUnavailableRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: ResourceUnavailableRpcError.code,
      shortMessage: "Requested resource not available."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ResourceUnavailableRpcError"
    });
  }
}

class TransactionRejectedRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: TransactionRejectedRpcError.code,
      shortMessage: "Transaction creation failed."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionRejectedRpcError"
    });
  }
}

class MethodNotSupportedRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: MethodNotSupportedRpcError.code,
      shortMessage: "Method is not implemented."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "MethodNotSupportedRpcError"
    });
  }
}

class LimitExceededRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: LimitExceededRpcError.code,
      shortMessage: "Request exceeds defined limit."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "LimitExceededRpcError"
    });
  }
}

class JsonRpcVersionUnsupportedError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: JsonRpcVersionUnsupportedError.code,
      shortMessage: "Version of JSON-RPC protocol is not supported."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "JsonRpcVersionUnsupportedError"
    });
  }
}

class UserRejectedRequestError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: UserRejectedRequestError.code,
      shortMessage: "User rejected the request."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UserRejectedRequestError"
    });
  }
}

class UnauthorizedProviderError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: UnauthorizedProviderError.code,
      shortMessage: "The requested method and/or account has not been authorized by the user."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnauthorizedProviderError"
    });
  }
}

class UnsupportedProviderMethodError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: UnsupportedProviderMethodError.code,
      shortMessage: "The Provider does not support the requested method."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnsupportedProviderMethodError"
    });
  }
}

class ProviderDisconnectedError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: ProviderDisconnectedError.code,
      shortMessage: "The Provider is disconnected from all chains."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ProviderDisconnectedError"
    });
  }
}

class ChainDisconnectedError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: ChainDisconnectedError.code,
      shortMessage: "The Provider is not connected to the requested chain."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ChainDisconnectedError"
    });
  }
}

class SwitchChainError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: SwitchChainError.code,
      shortMessage: "An error occurred when attempting to switch chain."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SwitchChainError"
    });
  }
}

class UnknownRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      shortMessage: "An unknown RPC error occurred."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnknownRpcError"
    });
  }
}
var unknownErrorCode;
var init_rpc = __esm(() => {
  init_base();
  init_request();
  unknownErrorCode = -1;
  Object.defineProperty(ParseRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32700
  });
  Object.defineProperty(InvalidRequestRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32600
  });
  Object.defineProperty(MethodNotFoundRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32601
  });
  Object.defineProperty(InvalidParamsRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32602
  });
  Object.defineProperty(InternalRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32603
  });
  Object.defineProperty(InvalidInputRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32000
  });
  Object.defineProperty(ResourceNotFoundRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32001
  });
  Object.defineProperty(ResourceUnavailableRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32002
  });
  Object.defineProperty(TransactionRejectedRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32003
  });
  Object.defineProperty(MethodNotSupportedRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32004
  });
  Object.defineProperty(LimitExceededRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32005
  });
  Object.defineProperty(JsonRpcVersionUnsupportedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32006
  });
  Object.defineProperty(UserRejectedRequestError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4001
  });
  Object.defineProperty(UnauthorizedProviderError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4100
  });
  Object.defineProperty(UnsupportedProviderMethodError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4200
  });
  Object.defineProperty(ProviderDisconnectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4900
  });
  Object.defineProperty(ChainDisconnectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4901
  });
  Object.defineProperty(SwitchChainError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4902
  });
});

// node_modules/viem/_esm/errors/node.js
class ExecutionRevertedError extends BaseError {
  constructor({ cause, message } = {}) {
    const reason = message?.replace("execution reverted: ", "")?.replace("execution reverted", "");
    super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ExecutionRevertedError"
    });
  }
}

class FeeCapTooHighError extends BaseError {
  constructor({ cause, maxFeePerGas } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "FeeCapTooHigh"
    });
  }
}

class FeeCapTooLowError extends BaseError {
  constructor({ cause, maxFeePerGas } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)}` : ""} gwei) cannot be lower than the block base fee.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "FeeCapTooLow"
    });
  }
}

class NonceTooHighError extends BaseError {
  constructor({ cause, nonce } = {}) {
    super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, { cause });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "NonceTooHighError"
    });
  }
}

class NonceTooLowError extends BaseError {
  constructor({ cause, nonce } = {}) {
    super([
      `Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`,
      "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
    ].join("\n"), { cause });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "NonceTooLowError"
    });
  }
}

class NonceMaxValueError extends BaseError {
  constructor({ cause, nonce } = {}) {
    super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, { cause });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "NonceMaxValueError"
    });
  }
}

class InsufficientFundsError extends BaseError {
  constructor({ cause } = {}) {
    super([
      "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
    ].join("\n"), {
      cause,
      metaMessages: [
        "This error could arise when the account does not have enough funds to:",
        " - pay for the total gas fee,",
        " - pay for the value to send.",
        " ",
        "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
        " - `gas` is the amount of gas needed for transaction to execute,",
        " - `gas fee` is the gas fee,",
        " - `value` is the amount of ether to send to the recipient."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InsufficientFundsError"
    });
  }
}

class IntrinsicGasTooHighError extends BaseError {
  constructor({ cause, gas } = {}) {
    super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "IntrinsicGasTooHighError"
    });
  }
}

class IntrinsicGasTooLowError extends BaseError {
  constructor({ cause, gas } = {}) {
    super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "IntrinsicGasTooLowError"
    });
  }
}

class TransactionTypeNotSupportedError extends BaseError {
  constructor({ cause }) {
    super("The transaction type is not supported for this chain.", {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionTypeNotSupportedError"
    });
  }
}

class TipAboveFeeCapError extends BaseError {
  constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
    super([
      `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}).`
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TipAboveFeeCapError"
    });
  }
}

class UnknownNodeError extends BaseError {
  constructor({ cause }) {
    super(`An error occurred while executing: ${cause?.shortMessage}`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnknownNodeError"
    });
  }
}
var init_node = __esm(() => {
  init_formatGwei();
  init_base();
  Object.defineProperty(ExecutionRevertedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 3
  });
  Object.defineProperty(ExecutionRevertedError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /execution reverted/
  });
  Object.defineProperty(FeeCapTooHighError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
  });
  Object.defineProperty(FeeCapTooLowError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
  });
  Object.defineProperty(NonceTooHighError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /nonce too high/
  });
  Object.defineProperty(NonceTooLowError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /nonce too low|transaction already imported|already known/
  });
  Object.defineProperty(NonceMaxValueError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /nonce has max value/
  });
  Object.defineProperty(InsufficientFundsError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /insufficient funds/
  });
  Object.defineProperty(IntrinsicGasTooHighError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /intrinsic gas too high|gas limit reached/
  });
  Object.defineProperty(IntrinsicGasTooLowError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /intrinsic gas too low/
  });
  Object.defineProperty(TransactionTypeNotSupportedError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /transaction type not valid/
  });
  Object.defineProperty(TipAboveFeeCapError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
  });
});

// node_modules/viem/_esm/utils/errors/getNodeError.js
function getNodeError(err, args) {
  const message = (err.details || "").toLowerCase();
  const executionRevertedError = err instanceof BaseError ? err.walk((e) => e.code === ExecutionRevertedError.code) : err;
  if (executionRevertedError instanceof BaseError) {
    return new ExecutionRevertedError({
      cause: err,
      message: executionRevertedError.details
    });
  }
  if (ExecutionRevertedError.nodeMessage.test(message))
    return new ExecutionRevertedError({
      cause: err,
      message: err.details
    });
  if (FeeCapTooHighError.nodeMessage.test(message))
    return new FeeCapTooHighError({
      cause: err,
      maxFeePerGas: args?.maxFeePerGas
    });
  if (FeeCapTooLowError.nodeMessage.test(message))
    return new FeeCapTooLowError({
      cause: err,
      maxFeePerGas: args?.maxFeePerGas
    });
  if (NonceTooHighError.nodeMessage.test(message))
    return new NonceTooHighError({ cause: err, nonce: args?.nonce });
  if (NonceTooLowError.nodeMessage.test(message))
    return new NonceTooLowError({ cause: err, nonce: args?.nonce });
  if (NonceMaxValueError.nodeMessage.test(message))
    return new NonceMaxValueError({ cause: err, nonce: args?.nonce });
  if (InsufficientFundsError.nodeMessage.test(message))
    return new InsufficientFundsError({ cause: err });
  if (IntrinsicGasTooHighError.nodeMessage.test(message))
    return new IntrinsicGasTooHighError({ cause: err, gas: args?.gas });
  if (IntrinsicGasTooLowError.nodeMessage.test(message))
    return new IntrinsicGasTooLowError({ cause: err, gas: args?.gas });
  if (TransactionTypeNotSupportedError.nodeMessage.test(message))
    return new TransactionTypeNotSupportedError({ cause: err });
  if (TipAboveFeeCapError.nodeMessage.test(message))
    return new TipAboveFeeCapError({
      cause: err,
      maxFeePerGas: args?.maxFeePerGas,
      maxPriorityFeePerGas: args?.maxPriorityFeePerGas
    });
  return new UnknownNodeError({
    cause: err
  });
}
var init_getNodeError = __esm(() => {
  init_base();
  init_node();
});

// node_modules/viem/_esm/utils/formatters/extract.js
function extract(value_, { format }) {
  if (!format)
    return {};
  const value = {};
  function extract_(formatted2) {
    const keys = Object.keys(formatted2);
    for (const key of keys) {
      if (key in value_)
        value[key] = value_[key];
      if (formatted2[key] && typeof formatted2[key] === "object" && !Array.isArray(formatted2[key]))
        extract_(formatted2[key]);
    }
  }
  const formatted = format(value_ || {});
  extract_(formatted);
  return value;
}
var init_extract = __esm(() => {
});

// node_modules/viem/_esm/utils/formatters/transactionRequest.js
function formatTransactionRequest(request2) {
  const rpcRequest = {};
  if (typeof request2.accessList !== "undefined")
    rpcRequest.accessList = request2.accessList;
  if (typeof request2.blobVersionedHashes !== "undefined")
    rpcRequest.blobVersionedHashes = request2.blobVersionedHashes;
  if (typeof request2.blobs !== "undefined") {
    if (typeof request2.blobs[0] !== "string")
      rpcRequest.blobs = request2.blobs.map((x) => bytesToHex(x));
    else
      rpcRequest.blobs = request2.blobs;
  }
  if (typeof request2.data !== "undefined")
    rpcRequest.data = request2.data;
  if (typeof request2.from !== "undefined")
    rpcRequest.from = request2.from;
  if (typeof request2.gas !== "undefined")
    rpcRequest.gas = numberToHex(request2.gas);
  if (typeof request2.gasPrice !== "undefined")
    rpcRequest.gasPrice = numberToHex(request2.gasPrice);
  if (typeof request2.maxFeePerBlobGas !== "undefined")
    rpcRequest.maxFeePerBlobGas = numberToHex(request2.maxFeePerBlobGas);
  if (typeof request2.maxFeePerGas !== "undefined")
    rpcRequest.maxFeePerGas = numberToHex(request2.maxFeePerGas);
  if (typeof request2.maxPriorityFeePerGas !== "undefined")
    rpcRequest.maxPriorityFeePerGas = numberToHex(request2.maxPriorityFeePerGas);
  if (typeof request2.nonce !== "undefined")
    rpcRequest.nonce = numberToHex(request2.nonce);
  if (typeof request2.to !== "undefined")
    rpcRequest.to = request2.to;
  if (typeof request2.type !== "undefined")
    rpcRequest.type = rpcTransactionType[request2.type];
  if (typeof request2.value !== "undefined")
    rpcRequest.value = numberToHex(request2.value);
  return rpcRequest;
}
var rpcTransactionType;
var init_transactionRequest = __esm(() => {
  init_toHex();
  rpcTransactionType = {
    legacy: "0x0",
    eip2930: "0x1",
    eip1559: "0x2",
    eip4844: "0x3"
  };
});

// node_modules/viem/_esm/utils/transaction/assertRequest.js
function assertRequest(args) {
  const { account: account_, gasPrice, maxFeePerGas, maxPriorityFeePerGas, to } = args;
  const account = account_ ? parseAccount(account_) : undefined;
  if (account && !isAddress2(account.address))
    throw new InvalidAddressError({ address: account.address });
  if (to && !isAddress2(to))
    throw new InvalidAddressError({ address: to });
  if (typeof gasPrice !== "undefined" && (typeof maxFeePerGas !== "undefined" || typeof maxPriorityFeePerGas !== "undefined"))
    throw new FeeConflictError;
  if (maxFeePerGas && maxFeePerGas > 2n ** 256n - 1n)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
var init_assertRequest = __esm(() => {
  init_parseAccount();
  init_address();
  init_node();
  init_transaction();
  init_isAddress();
});

// node_modules/@noble/hashes/esm/_sha2.js
class SHA2 extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data3) {
    exists(this);
    const { view, buffer, blockLen } = this;
    data3 = toBytes2(data3);
    const len = data3.length;
    for (let pos = 0;pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data3);
        for (;blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data3.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data3.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    exists(this);
    output(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    this.buffer.subarray(pos).fill(0);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i = pos;i < blockLen; i++)
      buffer[i] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i = 0;i < outLen; i++)
      oview.setUint32(4 * i, state[i], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor);
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.length = length;
    to.pos = pos;
    to.finished = finished;
    to.destroyed = destroyed;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
}
var setBigUint64;
var init__sha2 = __esm(() => {
  init__assert();
  init_utils2();
  setBigUint64 = function(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n2 = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n2 & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  };
});

// node_modules/@noble/hashes/esm/sha256.js
class SHA256 extends SHA2 {
  constructor() {
    super(64, 32, 8, false);
    this.A = IV[0] | 0;
    this.B = IV[1] | 0;
    this.C = IV[2] | 0;
    this.D = IV[3] | 0;
    this.E = IV[4] | 0;
    this.F = IV[5] | 0;
    this.G = IV[6] | 0;
    this.H = IV[7] | 0;
  }
  get() {
    const { A, B, C, D, E, F, G, H } = this;
    return [A, B, C, D, E, F, G, H];
  }
  set(A, B, C, D, E, F, G, H) {
    this.A = A | 0;
    this.B = B | 0;
    this.C = C | 0;
    this.D = D | 0;
    this.E = E | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H | 0;
  }
  process(view, offset) {
    for (let i = 0;i < 16; i++, offset += 4)
      SHA256_W[i] = view.getUint32(offset, false);
    for (let i = 16;i < 64; i++) {
      const W15 = SHA256_W[i - 15];
      const W2 = SHA256_W[i - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
    }
    let { A, B, C, D, E, F, G, H } = this;
    for (let i = 0;i < 64; i++) {
      const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
      const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
      const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
      const T2 = sigma0 + Maj(A, B, C) | 0;
      H = G;
      G = F;
      F = E;
      E = D + T1 | 0;
      D = C;
      C = B;
      B = A;
      A = T1 + T2 | 0;
    }
    A = A + this.A | 0;
    B = B + this.B | 0;
    C = C + this.C | 0;
    D = D + this.D | 0;
    E = E + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H = H + this.H | 0;
    this.set(A, B, C, D, E, F, G, H);
  }
  roundClean() {
    SHA256_W.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    this.buffer.fill(0);
  }
}
var Chi, Maj, SHA256_K, IV, SHA256_W, sha256;
var init_sha256 = __esm(() => {
  init__sha2();
  init_utils2();
  Chi = (a, b, c) => a & b ^ ~a & c;
  Maj = (a, b, c) => a & b ^ a & c ^ b & c;
  SHA256_K = new Uint32Array([
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ]);
  IV = new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  SHA256_W = new Uint32Array(64);
  sha256 = wrapConstructor(() => new SHA256);
});

// node_modules/viem/_esm/utils/abi/decodeFunctionResult.js
function decodeFunctionResult(parameters) {
  const { abi: abi12, args, functionName, data: data3 } = parameters;
  let abiItem = abi12[0];
  if (functionName) {
    const item = getAbiItem({ abi: abi12, args, name: functionName });
    if (!item)
      throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath4 });
    abiItem = item;
  }
  if (abiItem.type !== "function")
    throw new AbiFunctionNotFoundError(undefined, { docsPath: docsPath4 });
  if (!abiItem.outputs)
    throw new AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath: docsPath4 });
  const values = decodeAbiParameters(abiItem.outputs, data3);
  if (values && values.length > 1)
    return values;
  if (values && values.length === 1)
    return values[0];
  return;
}
var docsPath4;
var init_decodeFunctionResult = __esm(() => {
  init_abi();
  init_decodeAbiParameters();
  init_getAbiItem();
  docsPath4 = "/docs/contract/decodeFunctionResult";
});

// node_modules/viem/_esm/constants/abis.js
var multicall3Abi, universalResolverErrors, universalResolverResolveAbi, universalResolverReverseAbi, textResolverAbi, addressResolverAbi, universalSignatureValidatorAbi;
var init_abis = __esm(() => {
  multicall3Abi = [
    {
      inputs: [
        {
          components: [
            {
              name: "target",
              type: "address"
            },
            {
              name: "allowFailure",
              type: "bool"
            },
            {
              name: "callData",
              type: "bytes"
            }
          ],
          name: "calls",
          type: "tuple[]"
        }
      ],
      name: "aggregate3",
      outputs: [
        {
          components: [
            {
              name: "success",
              type: "bool"
            },
            {
              name: "returnData",
              type: "bytes"
            }
          ],
          name: "returnData",
          type: "tuple[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
  ];
  universalResolverErrors = [
    {
      inputs: [],
      name: "ResolverNotFound",
      type: "error"
    },
    {
      inputs: [],
      name: "ResolverWildcardNotSupported",
      type: "error"
    },
    {
      inputs: [],
      name: "ResolverNotContract",
      type: "error"
    },
    {
      inputs: [
        {
          name: "returnData",
          type: "bytes"
        }
      ],
      name: "ResolverError",
      type: "error"
    },
    {
      inputs: [
        {
          components: [
            {
              name: "status",
              type: "uint16"
            },
            {
              name: "message",
              type: "string"
            }
          ],
          name: "errors",
          type: "tuple[]"
        }
      ],
      name: "HttpError",
      type: "error"
    }
  ];
  universalResolverResolveAbi = [
    ...universalResolverErrors,
    {
      name: "resolve",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes" },
        { name: "data", type: "bytes" }
      ],
      outputs: [
        { name: "", type: "bytes" },
        { name: "address", type: "address" }
      ]
    },
    {
      name: "resolve",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes" },
        { name: "data", type: "bytes" },
        { name: "gateways", type: "string[]" }
      ],
      outputs: [
        { name: "", type: "bytes" },
        { name: "address", type: "address" }
      ]
    }
  ];
  universalResolverReverseAbi = [
    ...universalResolverErrors,
    {
      name: "reverse",
      type: "function",
      stateMutability: "view",
      inputs: [{ type: "bytes", name: "reverseName" }],
      outputs: [
        { type: "string", name: "resolvedName" },
        { type: "address", name: "resolvedAddress" },
        { type: "address", name: "reverseResolver" },
        { type: "address", name: "resolver" }
      ]
    },
    {
      name: "reverse",
      type: "function",
      stateMutability: "view",
      inputs: [
        { type: "bytes", name: "reverseName" },
        { type: "string[]", name: "gateways" }
      ],
      outputs: [
        { type: "string", name: "resolvedName" },
        { type: "address", name: "resolvedAddress" },
        { type: "address", name: "reverseResolver" },
        { type: "address", name: "resolver" }
      ]
    }
  ];
  textResolverAbi = [
    {
      name: "text",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes32" },
        { name: "key", type: "string" }
      ],
      outputs: [{ name: "", type: "string" }]
    }
  ];
  addressResolverAbi = [
    {
      name: "addr",
      type: "function",
      stateMutability: "view",
      inputs: [{ name: "name", type: "bytes32" }],
      outputs: [{ name: "", type: "address" }]
    },
    {
      name: "addr",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes32" },
        { name: "coinType", type: "uint256" }
      ],
      outputs: [{ name: "", type: "bytes" }]
    }
  ];
  universalSignatureValidatorAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_signer",
          type: "address"
        },
        {
          internalType: "bytes32",
          name: "_hash",
          type: "bytes32"
        },
        {
          internalType: "bytes",
          name: "_signature",
          type: "bytes"
        }
      ],
      stateMutability: "nonpayable",
      type: "constructor"
    }
  ];
});

// node_modules/viem/_esm/constants/contract.js
var aggregate3Signature;
var init_contract2 = __esm(() => {
  aggregate3Signature = "0x82ad56cb";
});

// node_modules/viem/_esm/errors/chain.js
class ChainDoesNotSupportContract extends BaseError {
  constructor({ blockNumber, chain, contract: contract2 }) {
    super(`Chain "${chain.name}" does not support contract "${contract2.name}".`, {
      metaMessages: [
        "This could be due to any of the following:",
        ...blockNumber && contract2.blockCreated && contract2.blockCreated > blockNumber ? [
          `- The contract "${contract2.name}" was not deployed until block ${contract2.blockCreated} (current block ${blockNumber}).`
        ] : [
          `- The chain does not have the contract "${contract2.name}" configured.`
        ]
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ChainDoesNotSupportContract"
    });
  }
}

class ClientChainNotConfiguredError extends BaseError {
  constructor() {
    super("No chain was provided to the Client.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ClientChainNotConfiguredError"
    });
  }
}

class InvalidChainIdError extends BaseError {
  constructor({ chainId }) {
    super(typeof chainId === "number" ? `Chain ID "${chainId}" is invalid.` : "Chain ID is invalid.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidChainIdError"
    });
  }
}
var init_chain = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/utils/chain/getChainContractAddress.js
function getChainContractAddress({ blockNumber, chain: chain2, contract: name }) {
  const contract2 = chain2?.contracts?.[name];
  if (!contract2)
    throw new ChainDoesNotSupportContract({
      chain: chain2,
      contract: { name }
    });
  if (blockNumber && contract2.blockCreated && contract2.blockCreated > blockNumber)
    throw new ChainDoesNotSupportContract({
      blockNumber,
      chain: chain2,
      contract: {
        name,
        blockCreated: contract2.blockCreated
      }
    });
  return contract2.address;
}
var init_getChainContractAddress = __esm(() => {
  init_chain();
});

// node_modules/viem/_esm/utils/errors/getCallError.js
function getCallError(err, { docsPath: docsPath5, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new CallExecutionError(cause, {
    docsPath: docsPath5,
    ...args
  });
}
var init_getCallError = __esm(() => {
  init_contract();
  init_node();
  init_getNodeError();
});

// node_modules/viem/_esm/utils/promise/createBatchScheduler.js
function createBatchScheduler({ fn, id, shouldSplitBatch, wait = 0, sort }) {
  const exec = async () => {
    const scheduler = getScheduler();
    flush();
    const args = scheduler.map(({ args: args2 }) => args2);
    if (args.length === 0)
      return;
    fn(args).then((data3) => {
      if (sort && Array.isArray(data3))
        data3.sort(sort);
      for (let i = 0;i < scheduler.length; i++) {
        const { pendingPromise } = scheduler[i];
        pendingPromise.resolve?.([data3[i], data3]);
      }
    }).catch((err) => {
      for (let i = 0;i < scheduler.length; i++) {
        const { pendingPromise } = scheduler[i];
        pendingPromise.reject?.(err);
      }
    });
  };
  const flush = () => schedulerCache.delete(id);
  const getBatchedArgs = () => getScheduler().map(({ args }) => args);
  const getScheduler = () => schedulerCache.get(id) || [];
  const setScheduler = (item) => schedulerCache.set(id, [...getScheduler(), item]);
  return {
    flush,
    async schedule(args) {
      const pendingPromise = {};
      const promise = new Promise((resolve, reject) => {
        pendingPromise.resolve = resolve;
        pendingPromise.reject = reject;
      });
      const split2 = shouldSplitBatch?.([...getBatchedArgs(), args]);
      if (split2)
        exec();
      const hasActiveScheduler = getScheduler().length > 0;
      if (hasActiveScheduler) {
        setScheduler({ args, pendingPromise });
        return promise;
      }
      setScheduler({ args, pendingPromise });
      setTimeout(exec, wait);
      return promise;
    }
  };
}
var schedulerCache;
var init_createBatchScheduler = __esm(() => {
  schedulerCache = new Map;
});

// node_modules/viem/_esm/errors/ccip.js
class OffchainLookupError extends BaseError {
  constructor({ callbackSelector, cause, data: data3, extraData, sender, urls }) {
    super(cause.shortMessage || "An error occurred while fetching for an offchain result.", {
      cause,
      metaMessages: [
        ...cause.metaMessages || [],
        cause.metaMessages?.length ? "" : [],
        "Offchain Gateway Call:",
        urls && [
          "  Gateway URL(s):",
          ...urls.map((url) => `    ${getUrl(url)}`)
        ],
        `  Sender: ${sender}`,
        `  Data: ${data3}`,
        `  Callback selector: ${callbackSelector}`,
        `  Extra data: ${extraData}`
      ].flat()
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "OffchainLookupError"
    });
  }
}

class OffchainLookupResponseMalformedError extends BaseError {
  constructor({ result, url }) {
    super("Offchain gateway response is malformed. Response data must be a hex value.", {
      metaMessages: [
        `Gateway URL: ${getUrl(url)}`,
        `Response: ${stringify(result)}`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "OffchainLookupResponseMalformedError"
    });
  }
}

class OffchainLookupSenderMismatchError extends BaseError {
  constructor({ sender, to }) {
    super("Reverted sender address does not match target contract address (`to`).", {
      metaMessages: [
        `Contract address: ${to}`,
        `OffchainLookup sender address: ${sender}`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "OffchainLookupSenderMismatchError"
    });
  }
}
var init_ccip = __esm(() => {
  init_stringify();
  init_base();
  init_utils();
});

// node_modules/viem/_esm/utils/address/isAddressEqual.js
function isAddressEqual(a, b) {
  if (!isAddress2(a, { strict: false }))
    throw new InvalidAddressError({ address: a });
  if (!isAddress2(b, { strict: false }))
    throw new InvalidAddressError({ address: b });
  return a.toLowerCase() === b.toLowerCase();
}
var init_isAddressEqual = __esm(() => {
  init_address();
  init_isAddress();
});

// node_modules/viem/_esm/utils/ccip.js
var exports_ccip = {};
__export(exports_ccip, {
  offchainLookupSignature: () => {
    {
      return offchainLookupSignature;
    }
  },
  offchainLookupAbiItem: () => {
    {
      return offchainLookupAbiItem;
    }
  },
  offchainLookup: () => {
    {
      return offchainLookup;
    }
  },
  ccipRequest: () => {
    {
      return ccipRequest;
    }
  }
});
async function offchainLookup(client, { blockNumber, blockTag, data: data3, to }) {
  const { args } = decodeErrorResult({
    data: data3,
    abi: [offchainLookupAbiItem]
  });
  const [sender, urls, callData, callbackSelector, extraData] = args;
  const { ccipRead } = client;
  const ccipRequest_ = ccipRead && typeof ccipRead?.request === "function" ? ccipRead.request : ccipRequest;
  try {
    if (!isAddressEqual(to, sender))
      throw new OffchainLookupSenderMismatchError({ sender, to });
    const result = await ccipRequest_({ data: callData, sender, urls });
    const { data: data_ } = await call2(client, {
      blockNumber,
      blockTag,
      data: concat([
        callbackSelector,
        encodeAbiParameters([{ type: "bytes" }, { type: "bytes" }], [result, extraData])
      ]),
      to
    });
    return data_;
  } catch (err) {
    throw new OffchainLookupError({
      callbackSelector,
      cause: err,
      data: data3,
      extraData,
      sender,
      urls
    });
  }
}
async function ccipRequest({ data: data3, sender, urls }) {
  let error = new Error("An unknown error occurred.");
  for (let i = 0;i < urls.length; i++) {
    const url = urls[i];
    const method = url.includes("{data}") ? "GET" : "POST";
    const body = method === "POST" ? { data: data3, sender } : undefined;
    try {
      const response = await fetch(url.replace("{sender}", sender).replace("{data}", data3), {
        body: JSON.stringify(body),
        method
      });
      let result;
      if (response.headers.get("Content-Type")?.startsWith("application/json")) {
        result = (await response.json()).data;
      } else {
        result = await response.text();
      }
      if (!response.ok) {
        error = new HttpRequestError({
          body,
          details: result?.error ? stringify(result.error) : response.statusText,
          headers: response.headers,
          status: response.status,
          url
        });
        continue;
      }
      if (!isHex(result)) {
        error = new OffchainLookupResponseMalformedError({
          result,
          url
        });
        continue;
      }
      return result;
    } catch (err) {
      error = new HttpRequestError({
        body,
        details: err.message,
        url
      });
    }
  }
  throw error;
}
var offchainLookupSignature, offchainLookupAbiItem;
var init_ccip2 = __esm(() => {
  init_call();
  init_ccip();
  init_request();
  init_decodeErrorResult();
  init_encodeAbiParameters();
  init_isAddressEqual();
  init_concat();
  init_isHex();
  init_stringify();
  offchainLookupSignature = "0x556f1830";
  offchainLookupAbiItem = {
    name: "OffchainLookup",
    type: "error",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "urls",
        type: "string[]"
      },
      {
        name: "callData",
        type: "bytes"
      },
      {
        name: "callbackFunction",
        type: "bytes4"
      },
      {
        name: "extraData",
        type: "bytes"
      }
    ]
  };
});

// node_modules/viem/_esm/actions/public/call.js
async function call2(client, args) {
  const { account: account_ = client.account, batch = Boolean(client.batch?.multicall), blockNumber, blockTag = "latest", accessList, blobs, data: data4, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride: stateOverride3, ...rest } = args;
  const account = account_ ? parseAccount(account_) : undefined;
  try {
    assertRequest(args);
    const blockNumberHex = blockNumber ? numberToHex(blockNumber) : undefined;
    const block3 = blockNumberHex || blockTag;
    const rpcStateOverride = parseStateOverride(stateOverride3);
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request3 = format({
      ...extract(rest, { format: chainFormat }),
      from: account?.address,
      accessList,
      blobs,
      data: data4,
      gas,
      gasPrice,
      maxFeePerBlobGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      value
    });
    if (batch && shouldPerformMulticall({ request: request3 }) && !rpcStateOverride) {
      try {
        return await scheduleMulticall(client, {
          ...request3,
          blockNumber,
          blockTag
        });
      } catch (err) {
        if (!(err instanceof ClientChainNotConfiguredError) && !(err instanceof ChainDoesNotSupportContract))
          throw err;
      }
    }
    const response = await client.request({
      method: "eth_call",
      params: rpcStateOverride ? [
        request3,
        block3,
        rpcStateOverride
      ] : [request3, block3]
    });
    if (response === "0x")
      return { data: undefined };
    return { data: response };
  } catch (err) {
    const data5 = getRevertErrorData(err);
    const { offchainLookup: offchainLookup2, offchainLookupSignature: offchainLookupSignature2 } = await Promise.resolve().then(() => (init_ccip2(), exports_ccip));
    if (client.ccipRead !== false && data5?.slice(0, 10) === offchainLookupSignature2 && to)
      return { data: await offchainLookup2(client, { data: data5, to }) };
    throw getCallError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}
async function scheduleMulticall(client, args) {
  const { batchSize = 1024, wait = 0 } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
  const { blockNumber, blockTag = "latest", data: data4, multicallAddress: multicallAddress_, to } = args;
  let multicallAddress = multicallAddress_;
  if (!multicallAddress) {
    if (!client.chain)
      throw new ClientChainNotConfiguredError;
    multicallAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "multicall3"
    });
  }
  const blockNumberHex = blockNumber ? numberToHex(blockNumber) : undefined;
  const block3 = blockNumberHex || blockTag;
  const { schedule } = createBatchScheduler({
    id: `${client.uid}.${block3}`,
    wait,
    shouldSplitBatch(args2) {
      const size9 = args2.reduce((size10, { data: data5 }) => size10 + (data5.length - 2), 0);
      return size9 > batchSize * 2;
    },
    fn: async (requests) => {
      const calls = requests.map((request3) => ({
        allowFailure: true,
        callData: request3.data,
        target: request3.to
      }));
      const calldata = encodeFunctionData({
        abi: multicall3Abi,
        args: [calls],
        functionName: "aggregate3"
      });
      const data5 = await client.request({
        method: "eth_call",
        params: [
          {
            data: calldata,
            to: multicallAddress
          },
          block3
        ]
      });
      return decodeFunctionResult({
        abi: multicall3Abi,
        args: [calls],
        functionName: "aggregate3",
        data: data5 || "0x"
      });
    }
  });
  const [{ returnData, success }] = await schedule({ data: data4, to });
  if (!success)
    throw new RawContractError({ data: returnData });
  if (returnData === "0x")
    return { data: undefined };
  return { data: returnData };
}
function getRevertErrorData(err) {
  if (!(err instanceof BaseError))
    return;
  const error = err.walk();
  return typeof error?.data === "object" ? error.data?.data : error.data;
}
function parseStateMapping(stateMapping) {
  if (!stateMapping || stateMapping.length === 0)
    return;
  return stateMapping.reduce((acc, { slot, value }) => {
    if (slot.length !== 66)
      throw new InvalidBytesLengthError({
        size: slot.length,
        targetSize: 66,
        type: "hex"
      });
    if (value.length !== 66)
      throw new InvalidBytesLengthError({
        size: value.length,
        targetSize: 66,
        type: "hex"
      });
    acc[slot] = value;
    return acc;
  }, {});
}
function parseAccountStateOverride(args) {
  const { balance, nonce, state, stateDiff, code } = args;
  const rpcAccountStateOverride = {};
  if (code !== undefined)
    rpcAccountStateOverride.code = code;
  if (balance !== undefined)
    rpcAccountStateOverride.balance = numberToHex(balance);
  if (nonce !== undefined)
    rpcAccountStateOverride.nonce = numberToHex(nonce);
  if (state !== undefined)
    rpcAccountStateOverride.state = parseStateMapping(state);
  if (stateDiff !== undefined) {
    if (rpcAccountStateOverride.state)
      throw new StateAssignmentConflictError;
    rpcAccountStateOverride.stateDiff = parseStateMapping(stateDiff);
  }
  return rpcAccountStateOverride;
}
function parseStateOverride(args) {
  if (!args)
    return;
  const rpcStateOverride = {};
  for (const { address: address6, ...accountState } of args) {
    if (!isAddress2(address6, { strict: false }))
      throw new InvalidAddressError({ address: address6 });
    if (rpcStateOverride[address6])
      throw new AccountStateConflictError({ address: address6 });
    rpcStateOverride[address6] = parseAccountStateOverride(accountState);
  }
  return rpcStateOverride;
}
var shouldPerformMulticall;
var init_call = __esm(() => {
  init_parseAccount();
  init_abis();
  init_contract2();
  init_address();
  init_base();
  init_chain();
  init_contract();
  init_data();
  init_stateOverride();
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_isAddress();
  init_getChainContractAddress();
  init_toHex();
  init_getCallError();
  init_extract();
  init_transactionRequest();
  init_createBatchScheduler();
  init_assertRequest();
  shouldPerformMulticall = function({ request: request3 }) {
    const { data: data4, to, ...request_ } = request3;
    if (!data4)
      return false;
    if (data4.startsWith(aggregate3Signature))
      return false;
    if (!to)
      return false;
    if (Object.values(request_).filter((x) => typeof x !== "undefined").length > 0)
      return false;
    return true;
  };
});

// node_modules/@noble/curves/esm/abstract/utils.js
var exports_utils = {};
__export(exports_utils, {
  validateObject: () => {
    {
      return validateObject;
    }
  },
  utf8ToBytes: () => {
    {
      return utf8ToBytes2;
    }
  },
  numberToVarBytesBE: () => {
    {
      return numberToVarBytesBE;
    }
  },
  numberToHexUnpadded: () => {
    {
      return numberToHexUnpadded;
    }
  },
  numberToBytesLE: () => {
    {
      return numberToBytesLE;
    }
  },
  numberToBytesBE: () => {
    {
      return numberToBytesBE;
    }
  },
  hexToNumber: () => {
    {
      return hexToNumber2;
    }
  },
  hexToBytes: () => {
    {
      return hexToBytes2;
    }
  },
  equalBytes: () => {
    {
      return equalBytes;
    }
  },
  ensureBytes: () => {
    {
      return ensureBytes;
    }
  },
  createHmacDrbg: () => {
    {
      return createHmacDrbg;
    }
  },
  concatBytes: () => {
    {
      return concatBytes3;
    }
  },
  bytesToNumberLE: () => {
    {
      return bytesToNumberLE;
    }
  },
  bytesToNumberBE: () => {
    {
      return bytesToNumberBE;
    }
  },
  bytesToHex: () => {
    {
      return bytesToHex2;
    }
  },
  bitSet: () => {
    {
      return bitSet;
    }
  },
  bitMask: () => {
    {
      return bitMask;
    }
  },
  bitLen: () => {
    {
      return bitLen;
    }
  },
  bitGet: () => {
    {
      return bitGet;
    }
  }
});
function bytesToHex2(bytes2) {
  if (!u8a2(bytes2))
    throw new Error("Uint8Array expected");
  let hex = "";
  for (let i = 0;i < bytes2.length; i++) {
    hex += hexes2[bytes2[i]];
  }
  return hex;
}
function numberToHexUnpadded(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? `0${hex}` : hex;
}
function hexToNumber2(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return BigInt(hex === "" ? "0" : `0x${hex}`);
}
function hexToBytes2(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  const len = hex.length;
  if (len % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + len);
  const array = new Uint8Array(len / 2);
  for (let i = 0;i < array.length; i++) {
    const j = i * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error("Invalid byte sequence");
    array[i] = byte;
  }
  return array;
}
function bytesToNumberBE(bytes2) {
  return hexToNumber2(bytesToHex2(bytes2));
}
function bytesToNumberLE(bytes2) {
  if (!u8a2(bytes2))
    throw new Error("Uint8Array expected");
  return hexToNumber2(bytesToHex2(Uint8Array.from(bytes2).reverse()));
}
function numberToBytesBE(n, len) {
  return hexToBytes2(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
function numberToVarBytesBE(n) {
  return hexToBytes2(numberToHexUnpadded(n));
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes2(hex);
    } catch (e) {
      throw new Error(`${title} must be valid hex string, got "${hex}". Cause: ${e}`);
    }
  } else if (u8a2(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(`${title} must be hex string or Uint8Array`);
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(`${title} expected ${expectedLength} bytes, got ${len}`);
  return res;
}
function concatBytes3(...arrays) {
  const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
  let pad5 = 0;
  arrays.forEach((a) => {
    if (!u8a2(a))
      throw new Error("Uint8Array expected");
    r.set(a, pad5);
    pad5 += a.length;
  });
  return r;
}
function equalBytes(b1, b2) {
  if (b1.length !== b2.length)
    return false;
  for (let i = 0;i < b1.length; i++)
    if (b1[i] !== b2[i])
      return false;
  return true;
}
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function bitLen(n) {
  let len;
  for (len = 0;n > _0n2; n >>= _1n2, len += 1)
    ;
  return len;
}
function bitGet(n, pos) {
  return n >> BigInt(pos) & _1n2;
}
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  let v = u8n(hashLen);
  let k = u8n(hashLen);
  let i = 0;
  const reset = () => {
    v.fill(1);
    k.fill(0);
    i = 0;
  };
  const h = (...b) => hmacFn(k, v, ...b);
  const reseed = (seed = u8n()) => {
    k = h(u8fr([0]), seed);
    v = h();
    if (seed.length === 0)
      return;
    k = h(u8fr([1]), seed);
    v = h();
  };
  const gen2 = () => {
    if (i++ >= 1000)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v = h();
      const sl = v.slice();
      out.push(sl);
      len += v.length;
    }
    return concatBytes3(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = undefined;
    while (!(res = pred(gen2())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
function validateObject(object, validators, optValidators = {}) {
  const checkField = (fieldName, type, isOptional) => {
    const checkVal = validatorFns[type];
    if (typeof checkVal !== "function")
      throw new Error(`Invalid validator "${type}", expected function`);
    const val = object[fieldName];
    if (isOptional && val === undefined)
      return;
    if (!checkVal(val, object)) {
      throw new Error(`Invalid param ${String(fieldName)}=${val} (${typeof val}), expected ${type}`);
    }
  };
  for (const [fieldName, type] of Object.entries(validators))
    checkField(fieldName, type, false);
  for (const [fieldName, type] of Object.entries(optValidators))
    checkField(fieldName, type, true);
  return object;
}
var _0n2, _1n2, _2n2, u8a2, hexes2, bitSet, bitMask, u8n, u8fr, validatorFns;
var init_utils3 = __esm(() => {
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  _0n2 = BigInt(0);
  _1n2 = BigInt(1);
  _2n2 = BigInt(2);
  u8a2 = (a) => a instanceof Uint8Array;
  hexes2 = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
  bitSet = (n, pos, value) => {
    return n | (value ? _1n2 : _0n2) << BigInt(pos);
  };
  bitMask = (n) => (_2n2 << BigInt(n - 1)) - _1n2;
  u8n = (data4) => new Uint8Array(data4);
  u8fr = (arr) => Uint8Array.from(arr);
  validatorFns = {
    bigint: (val) => typeof val === "bigint",
    function: (val) => typeof val === "function",
    boolean: (val) => typeof val === "boolean",
    string: (val) => typeof val === "string",
    stringOrUint8Array: (val) => typeof val === "string" || val instanceof Uint8Array,
    isSafeInteger: (val) => Number.isSafeInteger(val),
    array: (val) => Array.isArray(val),
    field: (val, object) => object.Fp.isValid(val),
    hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
  };
});

// node_modules/@noble/curves/esm/abstract/modular.js
function mod(a, b) {
  const result = a % b;
  return result >= _0n3 ? result : b + result;
}
function pow(num, power, modulo) {
  if (modulo <= _0n3 || power < _0n3)
    throw new Error("Expected power/modulo > 0");
  if (modulo === _1n3)
    return _0n3;
  let res = _1n3;
  while (power > _0n3) {
    if (power & _1n3)
      res = res * num % modulo;
    num = num * num % modulo;
    power >>= _1n3;
  }
  return res;
}
function pow2(x, power, modulo) {
  let res = x;
  while (power-- > _0n3) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number2, modulo) {
  if (number2 === _0n3 || modulo <= _0n3) {
    throw new Error(`invert: expected positive integers, got n=${number2} mod=${modulo}`);
  }
  let a = mod(number2, modulo);
  let b = modulo;
  let x = _0n3, y = _1n3, u = _1n3, v = _0n3;
  while (a !== _0n3) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n;
  }
  const gcd = b;
  if (gcd !== _1n3)
    throw new Error("invert: does not exist");
  return mod(x, modulo);
}
function tonelliShanks(P) {
  const legendreC = (P - _1n3) / _2n3;
  let Q, S, Z;
  for (Q = P - _1n3, S = 0;Q % _2n3 === _0n3; Q /= _2n3, S++)
    ;
  for (Z = _2n3;Z < P && pow(Z, legendreC, P) !== P - _1n3; Z++)
    ;
  if (S === 1) {
    const p1div4 = (P + _1n3) / _4n;
    return function tonelliFast(Fp, n) {
      const root = Fp.pow(n, p1div4);
      if (!Fp.eql(Fp.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  const Q1div2 = (Q + _1n3) / _2n3;
  return function tonelliSlow(Fp, n) {
    if (Fp.pow(n, legendreC) === Fp.neg(Fp.ONE))
      throw new Error("Cannot find square root");
    let r = S;
    let g = Fp.pow(Fp.mul(Fp.ONE, Z), Q);
    let x = Fp.pow(n, Q1div2);
    let b = Fp.pow(n, Q);
    while (!Fp.eql(b, Fp.ONE)) {
      if (Fp.eql(b, Fp.ZERO))
        return Fp.ZERO;
      let m = 1;
      for (let t2 = Fp.sqr(b);m < r; m++) {
        if (Fp.eql(t2, Fp.ONE))
          break;
        t2 = Fp.sqr(t2);
      }
      const ge = Fp.pow(g, _1n3 << BigInt(r - m - 1));
      g = Fp.sqr(ge);
      x = Fp.mul(x, ge);
      b = Fp.mul(b, g);
      r = m;
    }
    return x;
  };
}
function FpSqrt(P) {
  if (P % _4n === _3n) {
    const p1div4 = (P + _1n3) / _4n;
    return function sqrt3mod4(Fp, n) {
      const root = Fp.pow(n, p1div4);
      if (!Fp.eql(Fp.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  if (P % _8n === _5n) {
    const c1 = (P - _5n) / _8n;
    return function sqrt5mod8(Fp, n) {
      const n2 = Fp.mul(n, _2n3);
      const v = Fp.pow(n2, c1);
      const nv = Fp.mul(n, v);
      const i = Fp.mul(Fp.mul(nv, _2n3), v);
      const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
      if (!Fp.eql(Fp.sqr(root), n))
        throw new Error("Cannot find square root");
      return root;
    };
  }
  if (P % _16n === _9n) {
  }
  return tonelliShanks(P);
}
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  return validateObject(field, opts);
}
function FpPow(f, num, power) {
  if (power < _0n3)
    throw new Error("Expected power > 0");
  if (power === _0n3)
    return f.ONE;
  if (power === _1n3)
    return num;
  let p = f.ONE;
  let d = num;
  while (power > _0n3) {
    if (power & _1n3)
      p = f.mul(p, d);
    d = f.sqr(d);
    power >>= _1n3;
  }
  return p;
}
function FpInvertBatch(f, nums) {
  const tmp = new Array(nums.length);
  const lastMultiplied = nums.reduce((acc, num, i) => {
    if (f.is0(num))
      return acc;
    tmp[i] = acc;
    return f.mul(acc, num);
  }, f.ONE);
  const inverted = f.inv(lastMultiplied);
  nums.reduceRight((acc, num, i) => {
    if (f.is0(num))
      return acc;
    tmp[i] = f.mul(acc, tmp[i]);
    return f.mul(acc, num);
  }, inverted);
  return tmp;
}
function nLength(n, nBitLength) {
  const _nBitLength = nBitLength !== undefined ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLen2, isLE2 = false, redef = {}) {
  if (ORDER <= _0n3)
    throw new Error(`Expected Field ORDER > 0, got ${ORDER}`);
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
  if (BYTES > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const sqrtP = FpSqrt(ORDER);
  const f = Object.freeze({
    ORDER,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n3,
    ONE: _1n3,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof num}`);
      return _0n3 <= num && num < ORDER;
    },
    is0: (num) => num === _0n3,
    isOdd: (num) => (num & _1n3) === _1n3,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: redef.sqrt || ((n) => sqrtP(f, n)),
    invertBatch: (lst) => FpInvertBatch(f, lst),
    cmov: (a, b, c) => c ? b : a,
    toBytes: (num) => isLE2 ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes2) => {
      if (bytes2.length !== BYTES)
        throw new Error(`Fp.fromBytes: expected ${BYTES}, got ${bytes2.length}`);
      return isLE2 ? bytesToNumberLE(bytes2) : bytesToNumberBE(bytes2);
    }
  });
  return Object.freeze(f);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length = getFieldBytesLength(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField(key, fieldOrder, isLE2 = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error(`expected ${minLen}-1024 bytes of input, got ${len}`);
  const num = isLE2 ? bytesToNumberBE(key) : bytesToNumberLE(key);
  const reduced = mod(num, fieldOrder - _1n3) + _1n3;
  return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}
var _0n3, _1n3, _2n3, _3n, _4n, _5n, _8n, _9n, _16n, FIELD_FIELDS;
var init_modular = __esm(() => {
  init_utils3();
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  _0n3 = BigInt(0);
  _1n3 = BigInt(1);
  _2n3 = BigInt(2);
  _3n = BigInt(3);
  _4n = BigInt(4);
  _5n = BigInt(5);
  _8n = BigInt(8);
  _9n = BigInt(9);
  _16n = BigInt(16);
  FIELD_FIELDS = [
    "create",
    "isValid",
    "is0",
    "neg",
    "inv",
    "sqrt",
    "sqr",
    "eql",
    "add",
    "sub",
    "mul",
    "pow",
    "div",
    "addN",
    "subN",
    "mulN",
    "sqrN"
  ];
});

// node_modules/@noble/curves/esm/abstract/curve.js
function wNAF(c, bits) {
  const constTimeNegate = (condition, item) => {
    const neg = item.negate();
    return condition ? neg : item;
  };
  const opts = (W) => {
    const windows = Math.ceil(bits / W) + 1;
    const windowSize = 2 ** (W - 1);
    return { windows, windowSize };
  };
  return {
    constTimeNegate,
    unsafeLadder(elm, n) {
      let p = c.ZERO;
      let d = elm;
      while (n > _0n4) {
        if (n & _1n4)
          p = p.add(d);
        d = d.double();
        n >>= _1n4;
      }
      return p;
    },
    precomputeWindow(elm, W) {
      const { windows, windowSize } = opts(W);
      const points = [];
      let p = elm;
      let base32 = p;
      for (let window = 0;window < windows; window++) {
        base32 = p;
        points.push(base32);
        for (let i = 1;i < windowSize; i++) {
          base32 = base32.add(p);
          points.push(base32);
        }
        p = base32.double();
      }
      return points;
    },
    wNAF(W, precomputes, n) {
      const { windows, windowSize } = opts(W);
      let p = c.ZERO;
      let f = c.BASE;
      const mask = BigInt(2 ** W - 1);
      const maxNumber = 2 ** W;
      const shiftBy = BigInt(W);
      for (let window = 0;window < windows; window++) {
        const offset = window * windowSize;
        let wbits = Number(n & mask);
        n >>= shiftBy;
        if (wbits > windowSize) {
          wbits -= maxNumber;
          n += _1n4;
        }
        const offset1 = offset;
        const offset2 = offset + Math.abs(wbits) - 1;
        const cond1 = window % 2 !== 0;
        const cond2 = wbits < 0;
        if (wbits === 0) {
          f = f.add(constTimeNegate(cond1, precomputes[offset1]));
        } else {
          p = p.add(constTimeNegate(cond2, precomputes[offset2]));
        }
      }
      return { p, f };
    },
    wNAFCached(P, precomputesMap, n, transform) {
      const W = P._WINDOW_SIZE || 1;
      let comp = precomputesMap.get(P);
      if (!comp) {
        comp = this.precomputeWindow(P, W);
        if (W !== 1) {
          precomputesMap.set(P, transform(comp));
        }
      }
      return this.wNAF(W, comp, n);
    }
  };
}
function validateBasic(curve) {
  validateField(curve.Fp);
  validateObject(curve, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  });
  return Object.freeze({
    ...nLength(curve.n, curve.nBitLength),
    ...curve,
    ...{ p: curve.Fp.ORDER }
  });
}
var _0n4, _1n4;
var init_curve = __esm(() => {
  init_modular();
  init_utils3();
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  _0n4 = BigInt(0);
  _1n4 = BigInt(1);
});

// node_modules/@noble/curves/esm/abstract/weierstrass.js
function weierstrassPoints(opts) {
  const CURVE = validatePointOpts(opts);
  const { Fp } = CURVE;
  const toBytes18 = CURVE.toBytes || ((_c, point, _isCompressed) => {
    const a = point.toAffine();
    return concatBytes3(Uint8Array.from([4]), Fp.toBytes(a.x), Fp.toBytes(a.y));
  });
  const fromBytes2 = CURVE.fromBytes || ((bytes2) => {
    const tail = bytes2.subarray(1);
    const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
    const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
    return { x, y };
  });
  function weierstrassEquation(x) {
    const { a, b } = CURVE;
    const x2 = Fp.sqr(x);
    const x3 = Fp.mul(x2, x);
    return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
  }
  if (!Fp.eql(Fp.sqr(CURVE.Gy), weierstrassEquation(CURVE.Gx)))
    throw new Error("bad generator point: equation left != right");
  function isWithinCurveOrder(num) {
    return typeof num === "bigint" && _0n5 < num && num < CURVE.n;
  }
  function assertGE(num) {
    if (!isWithinCurveOrder(num))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function normPrivateKeyToScalar(key) {
    const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n } = CURVE;
    if (lengths && typeof key !== "bigint") {
      if (key instanceof Uint8Array)
        key = bytesToHex2(key);
      if (typeof key !== "string" || !lengths.includes(key.length))
        throw new Error("Invalid key");
      key = key.padStart(nByteLength * 2, "0");
    }
    let num;
    try {
      num = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
    } catch (error) {
      throw new Error(`private key must be ${nByteLength} bytes, hex or bigint, not ${typeof key}`);
    }
    if (wrapPrivateKey)
      num = mod(num, n);
    assertGE(num);
    return num;
  }
  const pointPrecomputes = new Map;
  function assertPrjPoint(other) {
    if (!(other instanceof Point))
      throw new Error("ProjectivePoint expected");
  }

  class Point {
    constructor(px, py, pz) {
      this.px = px;
      this.py = py;
      this.pz = pz;
      if (px == null || !Fp.isValid(px))
        throw new Error("x required");
      if (py == null || !Fp.isValid(py))
        throw new Error("y required");
      if (pz == null || !Fp.isValid(pz))
        throw new Error("z required");
    }
    static fromAffine(p) {
      const { x, y } = p || {};
      if (!p || !Fp.isValid(x) || !Fp.isValid(y))
        throw new Error("invalid affine point");
      if (p instanceof Point)
        throw new Error("projective point not allowed");
      const is0 = (i) => Fp.eql(i, Fp.ZERO);
      if (is0(x) && is0(y))
        return Point.ZERO;
      return new Point(x, y, Fp.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(points) {
      const toInv = Fp.invertBatch(points.map((p) => p.pz));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
    }
    static fromHex(hex) {
      const P = Point.fromAffine(fromBytes2(ensureBytes("pointHex", hex)));
      P.assertValidity();
      return P;
    }
    static fromPrivateKey(privateKey) {
      return Point.BASE.multiply(normPrivateKeyToScalar(privateKey));
    }
    _setWindowSize(windowSize) {
      this._WINDOW_SIZE = windowSize;
      pointPrecomputes.delete(this);
    }
    assertValidity() {
      if (this.is0()) {
        if (CURVE.allowInfinityPoint && !Fp.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x, y } = this.toAffine();
      if (!Fp.isValid(x) || !Fp.isValid(y))
        throw new Error("bad point: x or y not FE");
      const left = Fp.sqr(y);
      const right = weierstrassEquation(x);
      if (!Fp.eql(left, right))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (Fp.isOdd)
        return !Fp.isOdd(y);
      throw new Error("Field doesn't support isOdd");
    }
    equals(other) {
      assertPrjPoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
      const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
      return U1 && U2;
    }
    negate() {
      return new Point(this.px, Fp.neg(this.py), this.pz);
    }
    double() {
      const { a, b } = CURVE;
      const b3 = Fp.mul(b, _3n2);
      const { px: X1, py: Y1, pz: Z1 } = this;
      let { ZERO: X3, ZERO: Y3, ZERO: Z3 } = Fp;
      let t0 = Fp.mul(X1, X1);
      let t1 = Fp.mul(Y1, Y1);
      let t2 = Fp.mul(Z1, Z1);
      let t3 = Fp.mul(X1, Y1);
      t3 = Fp.add(t3, t3);
      Z3 = Fp.mul(X1, Z1);
      Z3 = Fp.add(Z3, Z3);
      X3 = Fp.mul(a, Z3);
      Y3 = Fp.mul(b3, t2);
      Y3 = Fp.add(X3, Y3);
      X3 = Fp.sub(t1, Y3);
      Y3 = Fp.add(t1, Y3);
      Y3 = Fp.mul(X3, Y3);
      X3 = Fp.mul(t3, X3);
      Z3 = Fp.mul(b3, Z3);
      t2 = Fp.mul(a, t2);
      t3 = Fp.sub(t0, t2);
      t3 = Fp.mul(a, t3);
      t3 = Fp.add(t3, Z3);
      Z3 = Fp.add(t0, t0);
      t0 = Fp.add(Z3, t0);
      t0 = Fp.add(t0, t2);
      t0 = Fp.mul(t0, t3);
      Y3 = Fp.add(Y3, t0);
      t2 = Fp.mul(Y1, Z1);
      t2 = Fp.add(t2, t2);
      t0 = Fp.mul(t2, t3);
      X3 = Fp.sub(X3, t0);
      Z3 = Fp.mul(t2, t1);
      Z3 = Fp.add(Z3, Z3);
      Z3 = Fp.add(Z3, Z3);
      return new Point(X3, Y3, Z3);
    }
    add(other) {
      assertPrjPoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      let { ZERO: X3, ZERO: Y3, ZERO: Z3 } = Fp;
      const a = CURVE.a;
      const b3 = Fp.mul(CURVE.b, _3n2);
      let t0 = Fp.mul(X1, X2);
      let t1 = Fp.mul(Y1, Y2);
      let t2 = Fp.mul(Z1, Z2);
      let t3 = Fp.add(X1, Y1);
      let t4 = Fp.add(X2, Y2);
      t3 = Fp.mul(t3, t4);
      t4 = Fp.add(t0, t1);
      t3 = Fp.sub(t3, t4);
      t4 = Fp.add(X1, Z1);
      let t5 = Fp.add(X2, Z2);
      t4 = Fp.mul(t4, t5);
      t5 = Fp.add(t0, t2);
      t4 = Fp.sub(t4, t5);
      t5 = Fp.add(Y1, Z1);
      X3 = Fp.add(Y2, Z2);
      t5 = Fp.mul(t5, X3);
      X3 = Fp.add(t1, t2);
      t5 = Fp.sub(t5, X3);
      Z3 = Fp.mul(a, t4);
      X3 = Fp.mul(b3, t2);
      Z3 = Fp.add(X3, Z3);
      X3 = Fp.sub(t1, Z3);
      Z3 = Fp.add(t1, Z3);
      Y3 = Fp.mul(X3, Z3);
      t1 = Fp.add(t0, t0);
      t1 = Fp.add(t1, t0);
      t2 = Fp.mul(a, t2);
      t4 = Fp.mul(b3, t4);
      t1 = Fp.add(t1, t2);
      t2 = Fp.sub(t0, t2);
      t2 = Fp.mul(a, t2);
      t4 = Fp.add(t4, t2);
      t0 = Fp.mul(t1, t4);
      Y3 = Fp.add(Y3, t0);
      t0 = Fp.mul(t5, t4);
      X3 = Fp.mul(t3, X3);
      X3 = Fp.sub(X3, t0);
      t0 = Fp.mul(t3, t1);
      Z3 = Fp.mul(t5, Z3);
      Z3 = Fp.add(Z3, t0);
      return new Point(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    wNAF(n) {
      return wnaf.wNAFCached(this, pointPrecomputes, n, (comp) => {
        const toInv = Fp.invertBatch(comp.map((p) => p.pz));
        return comp.map((p, i) => p.toAffine(toInv[i])).map(Point.fromAffine);
      });
    }
    multiplyUnsafe(n) {
      const I = Point.ZERO;
      if (n === _0n5)
        return I;
      assertGE(n);
      if (n === _1n5)
        return this;
      const { endo } = CURVE;
      if (!endo)
        return wnaf.unsafeLadder(this, n);
      let { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
      let k1p = I;
      let k2p = I;
      let d = this;
      while (k1 > _0n5 || k2 > _0n5) {
        if (k1 & _1n5)
          k1p = k1p.add(d);
        if (k2 & _1n5)
          k2p = k2p.add(d);
        d = d.double();
        k1 >>= _1n5;
        k2 >>= _1n5;
      }
      if (k1neg)
        k1p = k1p.negate();
      if (k2neg)
        k2p = k2p.negate();
      k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
      return k1p.add(k2p);
    }
    multiply(scalar) {
      assertGE(scalar);
      let n = scalar;
      let point, fake;
      const { endo } = CURVE;
      if (endo) {
        const { k1neg, k1, k2neg, k2 } = endo.splitScalar(n);
        let { p: k1p, f: f1p } = this.wNAF(k1);
        let { p: k2p, f: f2p } = this.wNAF(k2);
        k1p = wnaf.constTimeNegate(k1neg, k1p);
        k2p = wnaf.constTimeNegate(k2neg, k2p);
        k2p = new Point(Fp.mul(k2p.px, endo.beta), k2p.py, k2p.pz);
        point = k1p.add(k2p);
        fake = f1p.add(f2p);
      } else {
        const { p, f } = this.wNAF(n);
        point = p;
        fake = f;
      }
      return Point.normalizeZ([point, fake])[0];
    }
    multiplyAndAddUnsafe(Q, a, b) {
      const G = Point.BASE;
      const mul = (P, a2) => a2 === _0n5 || a2 === _1n5 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
      const sum = mul(this, a).add(mul(Q, b));
      return sum.is0() ? undefined : sum;
    }
    toAffine(iz) {
      const { px: x, py: y, pz: z } = this;
      const is0 = this.is0();
      if (iz == null)
        iz = is0 ? Fp.ONE : Fp.inv(z);
      const ax = Fp.mul(x, iz);
      const ay = Fp.mul(y, iz);
      const zz = Fp.mul(z, iz);
      if (is0)
        return { x: Fp.ZERO, y: Fp.ZERO };
      if (!Fp.eql(zz, Fp.ONE))
        throw new Error("invZ was invalid");
      return { x: ax, y: ay };
    }
    isTorsionFree() {
      const { h: cofactor, isTorsionFree } = CURVE;
      if (cofactor === _1n5)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: cofactor, clearCofactor } = CURVE;
      if (cofactor === _1n5)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(CURVE.h);
    }
    toRawBytes(isCompressed = true) {
      this.assertValidity();
      return toBytes18(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex2(this.toRawBytes(isCompressed));
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp.ONE);
  Point.ZERO = new Point(Fp.ZERO, Fp.ONE, Fp.ZERO);
  const _bits = CURVE.nBitLength;
  const wnaf = wNAF(Point, CURVE.endo ? Math.ceil(_bits / 2) : _bits);
  return {
    CURVE,
    ProjectivePoint: Point,
    normPrivateKeyToScalar,
    weierstrassEquation,
    isWithinCurveOrder
  };
}
function weierstrass(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { Fp, n: CURVE_ORDER } = CURVE;
  const compressedLen = Fp.BYTES + 1;
  const uncompressedLen = 2 * Fp.BYTES + 1;
  function isValidFieldElement(num) {
    return _0n5 < num && num < Fp.ORDER;
  }
  function modN(a) {
    return mod(a, CURVE_ORDER);
  }
  function invN(a) {
    return invert(a, CURVE_ORDER);
  }
  const { ProjectivePoint: Point, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
    ...CURVE,
    toBytes(_c, point, isCompressed) {
      const a = point.toAffine();
      const x = Fp.toBytes(a.x);
      const cat = concatBytes3;
      if (isCompressed) {
        return cat(Uint8Array.from([point.hasEvenY() ? 2 : 3]), x);
      } else {
        return cat(Uint8Array.from([4]), x, Fp.toBytes(a.y));
      }
    },
    fromBytes(bytes2) {
      const len = bytes2.length;
      const head = bytes2[0];
      const tail = bytes2.subarray(1);
      if (len === compressedLen && (head === 2 || head === 3)) {
        const x = bytesToNumberBE(tail);
        if (!isValidFieldElement(x))
          throw new Error("Point is not on curve");
        const y2 = weierstrassEquation(x);
        let y = Fp.sqrt(y2);
        const isYOdd = (y & _1n5) === _1n5;
        const isHeadOdd = (head & 1) === 1;
        if (isHeadOdd !== isYOdd)
          y = Fp.neg(y);
        return { x, y };
      } else if (len === uncompressedLen && head === 4) {
        const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
        const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
        return { x, y };
      } else {
        throw new Error(`Point of length ${len} was invalid. Expected ${compressedLen} compressed bytes or ${uncompressedLen} uncompressed bytes`);
      }
    }
  });
  const numToNByteStr = (num) => bytesToHex2(numberToBytesBE(num, CURVE.nByteLength));
  function isBiggerThanHalfOrder(number2) {
    const HALF = CURVE_ORDER >> _1n5;
    return number2 > HALF;
  }
  function normalizeS(s) {
    return isBiggerThanHalfOrder(s) ? modN(-s) : s;
  }
  const slcNum = (b, from, to) => bytesToNumberBE(b.slice(from, to));

  class Signature {
    constructor(r, s, recovery) {
      this.r = r;
      this.s = s;
      this.recovery = recovery;
      this.assertValidity();
    }
    static fromCompact(hex) {
      const l = CURVE.nByteLength;
      hex = ensureBytes("compactSignature", hex, l * 2);
      return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
    }
    static fromDER(hex) {
      const { r, s } = DER.toSig(ensureBytes("DER", hex));
      return new Signature(r, s);
    }
    assertValidity() {
      if (!isWithinCurveOrder(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!isWithinCurveOrder(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(msgHash) {
      const { r, s, recovery: rec } = this;
      const h = bits2int_modN(ensureBytes("msgHash", msgHash));
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
      if (radj >= Fp.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const prefix = (rec & 1) === 0 ? "02" : "03";
      const R = Point.fromHex(prefix + numToNByteStr(radj));
      const ir = invN(radj);
      const u1 = modN(-h * ir);
      const u2 = modN(s * ir);
      const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
      if (!Q)
        throw new Error("point at infinify");
      Q.assertValidity();
      return Q;
    }
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, modN(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return hexToBytes2(this.toDERHex());
    }
    toDERHex() {
      return DER.hexFromSig({ r: this.r, s: this.s });
    }
    toCompactRawBytes() {
      return hexToBytes2(this.toCompactHex());
    }
    toCompactHex() {
      return numToNByteStr(this.r) + numToNByteStr(this.s);
    }
  }
  const utils16 = {
    isValidPrivateKey(privateKey) {
      try {
        normPrivateKeyToScalar(privateKey);
        return true;
      } catch (error) {
        return false;
      }
    },
    normPrivateKeyToScalar,
    randomPrivateKey: () => {
      const length = getMinHashLength(CURVE.n);
      return mapHashToField(CURVE.randomBytes(length), CURVE.n);
    },
    precompute(windowSize = 8, point = Point.BASE) {
      point._setWindowSize(windowSize);
      point.multiply(BigInt(3));
      return point;
    }
  };
  function getPublicKey(privateKey, isCompressed = true) {
    return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
  }
  function isProbPub(item) {
    const arr = item instanceof Uint8Array;
    const str = typeof item === "string";
    const len = (arr || str) && item.length;
    if (arr)
      return len === compressedLen || len === uncompressedLen;
    if (str)
      return len === 2 * compressedLen || len === 2 * uncompressedLen;
    if (item instanceof Point)
      return true;
    return false;
  }
  function getSharedSecret(privateA, publicB, isCompressed = true) {
    if (isProbPub(privateA))
      throw new Error("first arg must be private key");
    if (!isProbPub(publicB))
      throw new Error("second arg must be public key");
    const b = Point.fromHex(publicB);
    return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
  }
  const bits2int = CURVE.bits2int || function(bytes2) {
    const num = bytesToNumberBE(bytes2);
    const delta = bytes2.length * 8 - CURVE.nBitLength;
    return delta > 0 ? num >> BigInt(delta) : num;
  };
  const bits2int_modN = CURVE.bits2int_modN || function(bytes2) {
    return modN(bits2int(bytes2));
  };
  const ORDER_MASK = bitMask(CURVE.nBitLength);
  function int2octets(num) {
    if (typeof num !== "bigint")
      throw new Error("bigint expected");
    if (!(_0n5 <= num && num < ORDER_MASK))
      throw new Error(`bigint expected < 2^${CURVE.nBitLength}`);
    return numberToBytesBE(num, CURVE.nByteLength);
  }
  function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
    if (["recovered", "canonical"].some((k) => (k in opts)))
      throw new Error("sign() legacy options not supported");
    const { hash: hash3, randomBytes: randomBytes2 } = CURVE;
    let { lowS, prehash, extraEntropy: ent } = opts;
    if (lowS == null)
      lowS = true;
    msgHash = ensureBytes("msgHash", msgHash);
    if (prehash)
      msgHash = ensureBytes("prehashed msgHash", hash3(msgHash));
    const h1int = bits2int_modN(msgHash);
    const d = normPrivateKeyToScalar(privateKey);
    const seedArgs = [int2octets(d), int2octets(h1int)];
    if (ent != null) {
      const e = ent === true ? randomBytes2(Fp.BYTES) : ent;
      seedArgs.push(ensureBytes("extraEntropy", e));
    }
    const seed = concatBytes3(...seedArgs);
    const m = h1int;
    function k2sig(kBytes) {
      const k = bits2int(kBytes);
      if (!isWithinCurveOrder(k))
        return;
      const ik = invN(k);
      const q = Point.BASE.multiply(k).toAffine();
      const r = modN(q.x);
      if (r === _0n5)
        return;
      const s = modN(ik * modN(m + r * d));
      if (s === _0n5)
        return;
      let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n5);
      let normS = s;
      if (lowS && isBiggerThanHalfOrder(s)) {
        normS = normalizeS(s);
        recovery ^= 1;
      }
      return new Signature(r, normS, recovery);
    }
    return { seed, k2sig };
  }
  const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
  const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
  function sign(msgHash, privKey, opts = defaultSigOpts) {
    const { seed, k2sig } = prepSig(msgHash, privKey, opts);
    const C = CURVE;
    const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
    return drbg(seed, k2sig);
  }
  Point.BASE._setWindowSize(8);
  function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
    const sg = signature;
    msgHash = ensureBytes("msgHash", msgHash);
    publicKey = ensureBytes("publicKey", publicKey);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    const { lowS, prehash } = opts;
    let _sig = undefined;
    let P;
    try {
      if (typeof sg === "string" || sg instanceof Uint8Array) {
        try {
          _sig = Signature.fromDER(sg);
        } catch (derError) {
          if (!(derError instanceof DER.Err))
            throw derError;
          _sig = Signature.fromCompact(sg);
        }
      } else if (typeof sg === "object" && typeof sg.r === "bigint" && typeof sg.s === "bigint") {
        const { r: r2, s: s2 } = sg;
        _sig = new Signature(r2, s2);
      } else {
        throw new Error("PARSE");
      }
      P = Point.fromHex(publicKey);
    } catch (error) {
      if (error.message === "PARSE")
        throw new Error(`signature must be Signature instance, Uint8Array or hex string`);
      return false;
    }
    if (lowS && _sig.hasHighS())
      return false;
    if (prehash)
      msgHash = CURVE.hash(msgHash);
    const { r, s } = _sig;
    const h = bits2int_modN(msgHash);
    const is = invN(s);
    const u1 = modN(h * is);
    const u2 = modN(r * is);
    const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
    if (!R)
      return false;
    const v = modN(R.x);
    return v === r;
  }
  return {
    CURVE,
    getPublicKey,
    getSharedSecret,
    sign,
    verify,
    ProjectivePoint: Point,
    Signature,
    utils: utils16
  };
}
var validatePointOpts, validateOpts, b2n, h2b, DER, _0n5, _1n5, _2n4, _3n2, _4n2;
var init_weierstrass = __esm(() => {
  init_modular();
  init_utils3();
  init_utils3();
  init_curve();
  validatePointOpts = function(curve2) {
    const opts = validateBasic(curve2);
    validateObject(opts, {
      a: "field",
      b: "field"
    }, {
      allowedPrivateKeyLengths: "array",
      wrapPrivateKey: "boolean",
      isTorsionFree: "function",
      clearCofactor: "function",
      allowInfinityPoint: "boolean",
      fromBytes: "function",
      toBytes: "function"
    });
    const { endo, Fp, a } = opts;
    if (endo) {
      if (!Fp.eql(a, Fp.ZERO)) {
        throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
      }
      if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
        throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
      }
    }
    return Object.freeze({ ...opts });
  };
  validateOpts = function(curve2) {
    const opts = validateBasic(curve2);
    validateObject(opts, {
      hash: "hash",
      hmac: "function",
      randomBytes: "function"
    }, {
      bits2int: "function",
      bits2int_modN: "function",
      lowS: "boolean"
    });
    return Object.freeze({ lowS: true, ...opts });
  };
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  ({ bytesToNumberBE: b2n, hexToBytes: h2b } = exports_utils);
  DER = {
    Err: class DERErr extends Error {
      constructor(m = "") {
        super(m);
      }
    },
    _parseInt(data4) {
      const { Err: E } = DER;
      if (data4.length < 2 || data4[0] !== 2)
        throw new E("Invalid signature integer tag");
      const len = data4[1];
      const res = data4.subarray(2, len + 2);
      if (!len || res.length !== len)
        throw new E("Invalid signature integer: wrong length");
      if (res[0] & 128)
        throw new E("Invalid signature integer: negative");
      if (res[0] === 0 && !(res[1] & 128))
        throw new E("Invalid signature integer: unnecessary leading zero");
      return { d: b2n(res), l: data4.subarray(len + 2) };
    },
    toSig(hex) {
      const { Err: E } = DER;
      const data4 = typeof hex === "string" ? h2b(hex) : hex;
      if (!(data4 instanceof Uint8Array))
        throw new Error("ui8a expected");
      let l = data4.length;
      if (l < 2 || data4[0] != 48)
        throw new E("Invalid signature tag");
      if (data4[1] !== l - 2)
        throw new E("Invalid signature: incorrect length");
      const { d: r, l: sBytes } = DER._parseInt(data4.subarray(2));
      const { d: s, l: rBytesLeft } = DER._parseInt(sBytes);
      if (rBytesLeft.length)
        throw new E("Invalid signature: left bytes after parsing");
      return { r, s };
    },
    hexFromSig(sig) {
      const slice7 = (s2) => Number.parseInt(s2[0], 16) & 8 ? "00" + s2 : s2;
      const h = (num) => {
        const hex = num.toString(16);
        return hex.length & 1 ? `0${hex}` : hex;
      };
      const s = slice7(h(sig.s));
      const r = slice7(h(sig.r));
      const shl = s.length / 2;
      const rhl = r.length / 2;
      const sl = h(shl);
      const rl = h(rhl);
      return `30${h(rhl + shl + 4)}02${rl}${r}02${sl}${s}`;
    }
  };
  _0n5 = BigInt(0);
  _1n5 = BigInt(1);
  _2n4 = BigInt(2);
  _3n2 = BigInt(3);
  _4n2 = BigInt(4);
});

// node_modules/@noble/hashes/esm/hmac.js
class HMAC extends Hash {
  constructor(hash3, _key) {
    super();
    this.finished = false;
    this.destroyed = false;
    hash(hash3);
    const key = toBytes2(_key);
    this.iHash = hash3.create();
    if (typeof this.iHash.update !== "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen;
    this.outputLen = this.iHash.outputLen;
    const blockLen = this.blockLen;
    const pad5 = new Uint8Array(blockLen);
    pad5.set(key.length > blockLen ? hash3.create().update(key).digest() : key);
    for (let i = 0;i < pad5.length; i++)
      pad5[i] ^= 54;
    this.iHash.update(pad5);
    this.oHash = hash3.create();
    for (let i = 0;i < pad5.length; i++)
      pad5[i] ^= 54 ^ 92;
    this.oHash.update(pad5);
    pad5.fill(0);
  }
  update(buf) {
    exists(this);
    this.iHash.update(buf);
    return this;
  }
  digestInto(out) {
    exists(this);
    bytes(out, this.outputLen);
    this.finished = true;
    this.iHash.digestInto(out);
    this.oHash.update(out);
    this.oHash.digestInto(out);
    this.destroy();
  }
  digest() {
    const out = new Uint8Array(this.oHash.outputLen);
    this.digestInto(out);
    return out;
  }
  _cloneInto(to) {
    to || (to = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
    to = to;
    to.finished = finished;
    to.destroyed = destroyed;
    to.blockLen = blockLen;
    to.outputLen = outputLen;
    to.oHash = oHash._cloneInto(to.oHash);
    to.iHash = iHash._cloneInto(to.iHash);
    return to;
  }
  destroy() {
    this.destroyed = true;
    this.oHash.destroy();
    this.iHash.destroy();
  }
}
var hmac;
var init_hmac = __esm(() => {
  init__assert();
  init_utils2();
  hmac = (hash3, key, message) => new HMAC(hash3, key).update(message).digest();
  hmac.create = (hash3, key) => new HMAC(hash3, key);
});

// node_modules/@noble/curves/esm/_shortw_utils.js
function getHash(hash3) {
  return {
    hash: hash3,
    hmac: (key, ...msgs) => hmac(hash3, key, concatBytes(...msgs)),
    randomBytes
  };
}
function createCurve(curveDef, defHash) {
  const create = (hash3) => weierstrass({ ...curveDef, ...getHash(hash3) });
  return Object.freeze({ ...create(defHash), create });
}
var init__shortw_utils = __esm(() => {
  init_hmac();
  init_utils2();
  init_weierstrass();
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
});

// node_modules/@noble/curves/esm/secp256k1.js
var sqrtMod, secp256k1P, secp256k1N, _1n6, _2n5, divNearest, Fp, secp256k1, _0n6, Point;
var init_secp256k1 = __esm(() => {
  init_sha256();
  init_modular();
  init__shortw_utils();
  sqrtMod = function(y) {
    const P = secp256k1P;
    const _3n3 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
    const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
    const b2 = y * y * y % P;
    const b3 = b2 * b2 * y % P;
    const b6 = pow2(b3, _3n3, P) * b3 % P;
    const b9 = pow2(b6, _3n3, P) * b3 % P;
    const b11 = pow2(b9, _2n5, P) * b2 % P;
    const b22 = pow2(b11, _11n, P) * b11 % P;
    const b44 = pow2(b22, _22n, P) * b22 % P;
    const b88 = pow2(b44, _44n, P) * b44 % P;
    const b176 = pow2(b88, _88n, P) * b88 % P;
    const b220 = pow2(b176, _44n, P) * b44 % P;
    const b223 = pow2(b220, _3n3, P) * b3 % P;
    const t1 = pow2(b223, _23n, P) * b22 % P;
    const t2 = pow2(t1, _6n, P) * b2 % P;
    const root = pow2(t2, _2n5, P);
    if (!Fp.eql(Fp.sqr(root), y))
      throw new Error("Cannot find square root");
    return root;
  };
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
  secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
  _1n6 = BigInt(1);
  _2n5 = BigInt(2);
  divNearest = (a, b) => (a + b / _2n5) / b;
  Fp = Field(secp256k1P, undefined, undefined, { sqrt: sqrtMod });
  secp256k1 = createCurve({
    a: BigInt(0),
    b: BigInt(7),
    Fp,
    n: secp256k1N,
    Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
    Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
    h: BigInt(1),
    lowS: true,
    endo: {
      beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
      splitScalar: (k) => {
        const n = secp256k1N;
        const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
        const b1 = -_1n6 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
        const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
        const b2 = a1;
        const POW_2_128 = BigInt("0x100000000000000000000000000000000");
        const c1 = divNearest(b2 * k, n);
        const c2 = divNearest(-b1 * k, n);
        let k1 = mod(k - c1 * a1 - c2 * a2, n);
        let k2 = mod(-c1 * b1 - c2 * b2, n);
        const k1neg = k1 > POW_2_128;
        const k2neg = k2 > POW_2_128;
        if (k1neg)
          k1 = n - k1;
        if (k2neg)
          k2 = n - k2;
        if (k1 > POW_2_128 || k2 > POW_2_128) {
          throw new Error("splitScalar: Endomorphism failed, k=" + k);
        }
        return { k1neg, k1, k2neg, k2 };
      }
    }
  }, sha256);
  _0n6 = BigInt(0);
  Point = secp256k1.ProjectivePoint;
});

// node_modules/viem/_esm/utils/getAction.js
function getAction(client, action, name) {
  return (params) => client[action.name]?.(params) ?? client[name]?.(params) ?? action(client, params);
}

// node_modules/viem/_esm/utils/abi/encodeEventTopics.js
init_abi();

// node_modules/viem/_esm/errors/log.js
init_base();

class FilterTypeNotSupportedError extends BaseError {
  constructor(type) {
    super(`Filter type "${type}" is not supported.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "FilterTypeNotSupportedError"
    });
  }
}

// node_modules/viem/_esm/utils/abi/encodeEventTopics.js
init_toBytes();
init_keccak256();
init_toEventSelector();
init_encodeAbiParameters();
init_formatAbiItem2();
init_getAbiItem();
function encodeEventTopics(parameters) {
  const { abi: abi5, eventName, args } = parameters;
  let abiItem = abi5[0];
  if (eventName) {
    const item = getAbiItem({ abi: abi5, name: eventName });
    if (!item)
      throw new AbiEventNotFoundError(eventName, { docsPath });
    abiItem = item;
  }
  if (abiItem.type !== "event")
    throw new AbiEventNotFoundError(undefined, { docsPath });
  const definition = formatAbiItem2(abiItem);
  const signature = toEventSelector(definition);
  let topics = [];
  if (args && ("inputs" in abiItem)) {
    const indexedInputs = abiItem.inputs?.filter((param) => ("indexed" in param) && param.indexed);
    const args_ = Array.isArray(args) ? args : Object.values(args).length > 0 ? indexedInputs?.map((x) => args[x.name]) ?? [] : [];
    if (args_.length > 0) {
      topics = indexedInputs?.map((param, i) => Array.isArray(args_[i]) ? args_[i].map((_, j) => encodeArg({ param, value: args_[i][j] })) : args_[i] ? encodeArg({ param, value: args_[i] }) : null) ?? [];
    }
  }
  return [signature, ...topics];
}
var encodeArg = function({ param, value }) {
  if (param.type === "string" || param.type === "bytes")
    return keccak256(toBytes(value));
  if (param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
    throw new FilterTypeNotSupportedError(param.type);
  return encodeAbiParameters([param], [value]);
};
var docsPath = "/docs/contract/encodeEventTopics";

// node_modules/viem/_esm/actions/public/createContractEventFilter.js
init_toHex();

// node_modules/viem/_esm/utils/filters/createFilterRequestScope.js
function createFilterRequestScope(client, { method }) {
  const requestMap = {};
  if (client.transport.type === "fallback")
    client.transport.onResponse?.(({ method: method_, response: id, status, transport }) => {
      if (status === "success" && method === method_)
        requestMap[id] = transport.request;
    });
  return (id) => requestMap[id] || client.request;
}

// node_modules/viem/_esm/actions/public/createContractEventFilter.js
async function createContractEventFilter(client, parameters) {
  const { address: address3, abi: abi5, args, eventName, fromBlock, strict, toBlock } = parameters;
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newFilter"
  });
  const topics = eventName ? encodeEventTopics({
    abi: abi5,
    args,
    eventName
  }) : undefined;
  const id = await client.request({
    method: "eth_newFilter",
    params: [
      {
        address: address3,
        fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
        toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
        topics
      }
    ]
  });
  return {
    abi: abi5,
    args,
    eventName,
    id,
    request: getRequest(id),
    strict: Boolean(strict),
    type: "event"
  };
}

// node_modules/viem/_esm/actions/public/estimateContractGas.js
init_parseAccount();
init_encodeFunctionData();

// node_modules/viem/_esm/utils/errors/getContractError.js
init_abi();
init_base();
init_contract();
init_rpc();
function getContractError(err, { abi: abi10, address: address3, args, docsPath: docsPath3, functionName, sender }) {
  const { code, data: data3, message, shortMessage } = err instanceof RawContractError ? err : err instanceof BaseError ? err.walk((err2) => ("data" in err2)) || err.walk() : {};
  const cause = (() => {
    if (err instanceof AbiDecodingZeroDataError)
      return new ContractFunctionZeroDataError({ functionName });
    if ([EXECUTION_REVERTED_ERROR_CODE, InternalRpcError.code].includes(code) && (data3 || message || shortMessage)) {
      return new ContractFunctionRevertedError({
        abi: abi10,
        data: typeof data3 === "object" ? data3.data : data3,
        functionName,
        message: shortMessage ?? message
      });
    }
    return err;
  })();
  return new ContractFunctionExecutionError(cause, {
    abi: abi10,
    args,
    contractAddress: address3,
    docsPath: docsPath3,
    functionName,
    sender
  });
}
var EXECUTION_REVERTED_ERROR_CODE = 3;

// node_modules/viem/_esm/actions/public/estimateGas.js
init_parseAccount();
init_toHex();

// node_modules/viem/_esm/errors/estimateGas.js
init_formatEther();
init_formatGwei();
init_base();
init_transaction();

class EstimateGasExecutionError extends BaseError {
  constructor(cause, { account, docsPath: docsPath3, chain, data: data3, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
    const prettyArgs = prettyPrint({
      from: account?.address,
      to,
      value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
      data: data3,
      gas,
      gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
      maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
      maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
      nonce
    });
    super(cause.shortMessage, {
      cause,
      docsPath: docsPath3,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Estimate Gas Arguments:",
        prettyArgs
      ].filter(Boolean)
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EstimateGasExecutionError"
    });
    this.cause = cause;
  }
}

// node_modules/viem/_esm/utils/errors/getEstimateGasError.js
init_node();
init_getNodeError();
function getEstimateGasError(err, { docsPath: docsPath3, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new EstimateGasExecutionError(cause, {
    docsPath: docsPath3,
    ...args
  });
}

// node_modules/viem/_esm/actions/public/estimateGas.js
init_extract();
init_transactionRequest();
init_assertRequest();

// node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
init_parseAccount();

// node_modules/viem/_esm/errors/fee.js
init_formatGwei();
init_base();

class BaseFeeScalarError extends BaseError {
  constructor() {
    super("`baseFeeMultiplier` must be greater than 1.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseFeeScalarError"
    });
  }
}

class Eip1559FeesNotSupportedError extends BaseError {
  constructor() {
    super("Chain does not support EIP-1559 fees.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Eip1559FeesNotSupportedError"
    });
  }
}

class MaxFeePerGasTooLowError extends BaseError {
  constructor({ maxPriorityFeePerGas }) {
    super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${formatGwei(maxPriorityFeePerGas)} gwei).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "MaxFeePerGasTooLowError"
    });
  }
}

// node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
init_fromHex();

// node_modules/viem/_esm/errors/block.js
init_base();

class BlockNotFoundError extends BaseError {
  constructor({ blockHash, blockNumber }) {
    let identifier = "Block";
    if (blockHash)
      identifier = `Block at hash "${blockHash}"`;
    if (blockNumber)
      identifier = `Block at number "${blockNumber}"`;
    super(`${identifier} could not be found.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BlockNotFoundError"
    });
  }
}

// node_modules/viem/_esm/actions/public/getBlock.js
init_toHex();

// node_modules/viem/_esm/utils/formatters/transaction.js
init_fromHex();
function formatTransaction(transaction4) {
  const transaction_ = {
    ...transaction4,
    blockHash: transaction4.blockHash ? transaction4.blockHash : null,
    blockNumber: transaction4.blockNumber ? BigInt(transaction4.blockNumber) : null,
    chainId: transaction4.chainId ? hexToNumber(transaction4.chainId) : undefined,
    gas: transaction4.gas ? BigInt(transaction4.gas) : undefined,
    gasPrice: transaction4.gasPrice ? BigInt(transaction4.gasPrice) : undefined,
    maxFeePerBlobGas: transaction4.maxFeePerBlobGas ? BigInt(transaction4.maxFeePerBlobGas) : undefined,
    maxFeePerGas: transaction4.maxFeePerGas ? BigInt(transaction4.maxFeePerGas) : undefined,
    maxPriorityFeePerGas: transaction4.maxPriorityFeePerGas ? BigInt(transaction4.maxPriorityFeePerGas) : undefined,
    nonce: transaction4.nonce ? hexToNumber(transaction4.nonce) : undefined,
    to: transaction4.to ? transaction4.to : null,
    transactionIndex: transaction4.transactionIndex ? Number(transaction4.transactionIndex) : null,
    type: transaction4.type ? transactionType[transaction4.type] : undefined,
    typeHex: transaction4.type ? transaction4.type : undefined,
    value: transaction4.value ? BigInt(transaction4.value) : undefined,
    v: transaction4.v ? BigInt(transaction4.v) : undefined
  };
  transaction_.yParity = (() => {
    if (transaction4.yParity)
      return Number(transaction4.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === 0n || transaction_.v === 27n)
        return 0;
      if (transaction_.v === 1n || transaction_.v === 28n)
        return 1;
      if (transaction_.v >= 35n)
        return transaction_.v % 2n === 0n ? 1 : 0;
    }
    return;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  if (transaction_.type === "eip1559") {
    delete transaction_.maxFeePerBlobGas;
  }
  return transaction_;
}
var transactionType = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844"
};

// node_modules/viem/_esm/utils/formatters/block.js
function formatBlock(block) {
  const transactions = block.transactions?.map((transaction5) => {
    if (typeof transaction5 === "string")
      return transaction5;
    return formatTransaction(transaction5);
  });
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : undefined,
    difficulty: block.difficulty ? BigInt(block.difficulty) : undefined,
    excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : undefined,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : undefined,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : undefined,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : undefined,
    timestamp: block.timestamp ? BigInt(block.timestamp) : undefined,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  };
}

// node_modules/viem/_esm/actions/public/getBlock.js
async function getBlock(client, { blockHash, blockNumber, blockTag: blockTag_, includeTransactions: includeTransactions_ } = {}) {
  const blockTag = blockTag_ ?? "latest";
  const includeTransactions = includeTransactions_ ?? false;
  const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
  let block3 = null;
  if (blockHash) {
    block3 = await client.request({
      method: "eth_getBlockByHash",
      params: [blockHash, includeTransactions]
    });
  } else {
    block3 = await client.request({
      method: "eth_getBlockByNumber",
      params: [blockNumberHex || blockTag, includeTransactions]
    });
  }
  if (!block3)
    throw new BlockNotFoundError({ blockHash, blockNumber });
  const format = client.chain?.formatters?.block?.format || formatBlock;
  return format(block3);
}

// node_modules/viem/_esm/actions/public/getGasPrice.js
async function getGasPrice(client) {
  const gasPrice = await client.request({
    method: "eth_gasPrice"
  });
  return BigInt(gasPrice);
}

// node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
async function estimateMaxPriorityFeePerGas(client, args) {
  return internal_estimateMaxPriorityFeePerGas(client, args);
}
async function internal_estimateMaxPriorityFeePerGas(client, args) {
  const { block: block_, chain = client.chain, request: request2 } = args || {};
  if (typeof chain?.fees?.defaultPriorityFee === "function") {
    const block3 = block_ || await getAction(client, getBlock, "getBlock")({});
    return chain.fees.defaultPriorityFee({
      block: block3,
      client,
      request: request2
    });
  }
  if (typeof chain?.fees?.defaultPriorityFee !== "undefined")
    return chain?.fees?.defaultPriorityFee;
  try {
    const maxPriorityFeePerGasHex = await client.request({
      method: "eth_maxPriorityFeePerGas"
    });
    return hexToBigInt(maxPriorityFeePerGasHex);
  } catch {
    const [block3, gasPrice] = await Promise.all([
      block_ ? Promise.resolve(block_) : getAction(client, getBlock, "getBlock")({}),
      getAction(client, getGasPrice, "getGasPrice")({})
    ]);
    if (typeof block3.baseFeePerGas !== "bigint")
      throw new Eip1559FeesNotSupportedError;
    const maxPriorityFeePerGas = gasPrice - block3.baseFeePerGas;
    if (maxPriorityFeePerGas < 0n)
      return 0n;
    return maxPriorityFeePerGas;
  }
}

// node_modules/viem/_esm/actions/public/estimateFeesPerGas.js
async function estimateFeesPerGas(client, args) {
  return internal_estimateFeesPerGas(client, args);
}
async function internal_estimateFeesPerGas(client, args) {
  const { block: block_, chain = client.chain, request: request2, type = "eip1559" } = args || {};
  const baseFeeMultiplier = await (async () => {
    if (typeof chain?.fees?.baseFeeMultiplier === "function")
      return chain.fees.baseFeeMultiplier({
        block: block_,
        client,
        request: request2
      });
    return chain?.fees?.baseFeeMultiplier ?? 1.2;
  })();
  if (baseFeeMultiplier < 1)
    throw new BaseFeeScalarError;
  const decimals = baseFeeMultiplier.toString().split(".")[1]?.length ?? 0;
  const denominator = 10 ** decimals;
  const multiply = (base21) => base21 * BigInt(Math.ceil(baseFeeMultiplier * denominator)) / BigInt(denominator);
  const block3 = block_ ? block_ : await getAction(client, getBlock, "getBlock")({});
  if (typeof chain?.fees?.estimateFeesPerGas === "function") {
    const fees = await chain.fees.estimateFeesPerGas({
      block: block_,
      client,
      multiply,
      request: request2,
      type
    });
    if (fees !== null)
      return fees;
  }
  if (type === "eip1559") {
    if (typeof block3.baseFeePerGas !== "bigint")
      throw new Eip1559FeesNotSupportedError;
    const maxPriorityFeePerGas = typeof request2?.maxPriorityFeePerGas === "bigint" ? request2.maxPriorityFeePerGas : await internal_estimateMaxPriorityFeePerGas(client, {
      block: block3,
      chain,
      request: request2
    });
    const baseFeePerGas = multiply(block3.baseFeePerGas);
    const maxFeePerGas = request2?.maxFeePerGas ?? baseFeePerGas + maxPriorityFeePerGas;
    return {
      maxFeePerGas,
      maxPriorityFeePerGas
    };
  }
  const gasPrice = request2?.gasPrice ?? multiply(await getAction(client, getGasPrice, "getGasPrice")({}));
  return {
    gasPrice
  };
}

// node_modules/viem/_esm/actions/public/getTransactionCount.js
init_fromHex();
init_toHex();
async function getTransactionCount(client, { address: address4, blockTag = "latest", blockNumber }) {
  const count = await client.request({
    method: "eth_getTransactionCount",
    params: [address4, blockNumber ? numberToHex(blockNumber) : blockTag]
  });
  return hexToNumber(count);
}

// node_modules/viem/_esm/errors/account.js
init_base();

class AccountNotFoundError extends BaseError {
  constructor({ docsPath: docsPath3 } = {}) {
    super([
      "Could not find an Account to execute with this Action.",
      "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the WalletClient."
    ].join("\n"), {
      docsPath: docsPath3,
      docsSlug: "account"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AccountNotFoundError"
    });
  }
}

// node_modules/viem/_esm/utils/blob/blobsToCommitments.js
init_toBytes();
init_toHex();
function blobsToCommitments(parameters) {
  const { kzg } = parameters;
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
  const commitments = [];
  for (const blob of blobs)
    commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
  return to === "bytes" ? commitments : commitments.map((x) => bytesToHex(x));
}

// node_modules/viem/_esm/utils/blob/blobsToProofs.js
init_toBytes();
init_toHex();
function blobsToProofs(parameters) {
  const { kzg } = parameters;
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
  const commitments = typeof parameters.commitments[0] === "string" ? parameters.commitments.map((x) => hexToBytes(x)) : parameters.commitments;
  const proofs = [];
  for (let i = 0;i < blobs.length; i++) {
    const blob = blobs[i];
    const commitment = commitments[i];
    proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
  }
  return to === "bytes" ? proofs : proofs.map((x) => bytesToHex(x));
}

// node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
init_toHex();

// node_modules/viem/_esm/utils/hash/sha256.js
init_sha256();
init_isHex();
init_toBytes();
init_toHex();
function sha2563(value, to_) {
  const to = to_ || "hex";
  const bytes2 = sha256(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes2;
  return toHex(bytes2);
}

// node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
function commitmentToVersionedHash(parameters) {
  const { commitment, version: version3 = 1 } = parameters;
  const to = parameters.to ?? (typeof commitment === "string" ? "hex" : "bytes");
  const versionedHash = sha2563(commitment, "bytes");
  versionedHash.set([version3], 0);
  return to === "bytes" ? versionedHash : bytesToHex(versionedHash);
}

// node_modules/viem/_esm/utils/blob/commitmentsToVersionedHashes.js
function commitmentsToVersionedHashes(parameters) {
  const { commitments, version: version3 } = parameters;
  const to = parameters.to ?? (typeof commitments[0] === "string" ? "hex" : "bytes");
  const hashes = [];
  for (const commitment of commitments) {
    hashes.push(commitmentToVersionedHash({
      commitment,
      to,
      version: version3
    }));
  }
  return hashes;
}

// node_modules/viem/_esm/constants/blob.js
var blobsPerTransaction = 6;
var bytesPerFieldElement = 32;
var fieldElementsPerBlob = 4096;
var bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - 1 - 1 * fieldElementsPerBlob * blobsPerTransaction;

// node_modules/viem/_esm/constants/kzg.js
var versionedHashVersionKzg = 1;

// node_modules/viem/_esm/errors/blob.js
init_base();

class BlobSizeTooLargeError extends BaseError {
  constructor({ maxSize, size: size7 }) {
    super("Blob size is too large.", {
      metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size7} bytes`]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BlobSizeTooLargeError"
    });
  }
}

class EmptyBlobError extends BaseError {
  constructor() {
    super("Blob data must not be empty.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EmptyBlobError"
    });
  }
}

class InvalidVersionedHashSizeError extends BaseError {
  constructor({ hash: hash3, size: size7 }) {
    super(`Versioned hash "${hash3}" size is invalid.`, {
      metaMessages: ["Expected: 32", `Received: ${size7}`]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidVersionedHashSizeError"
    });
  }
}

class InvalidVersionedHashVersionError extends BaseError {
  constructor({ hash: hash3, version: version3 }) {
    super(`Versioned hash "${hash3}" version is invalid.`, {
      metaMessages: [
        `Expected: ${versionedHashVersionKzg}`,
        `Received: ${version3}`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidVersionedHashVersionError"
    });
  }
}

// node_modules/viem/_esm/utils/blob/toBlobs.js
init_cursor2();
init_size();
init_toBytes();
init_toHex();
function toBlobs(parameters) {
  const to = parameters.to ?? (typeof parameters.data === "string" ? "hex" : "bytes");
  const data3 = typeof parameters.data === "string" ? hexToBytes(parameters.data) : parameters.data;
  const size_ = size(data3);
  if (!size_)
    throw new EmptyBlobError;
  if (size_ > maxBytesPerTransaction)
    throw new BlobSizeTooLargeError({
      maxSize: maxBytesPerTransaction,
      size: size_
    });
  const blobs = [];
  let active = true;
  let position = 0;
  while (active) {
    const blob3 = createCursor(new Uint8Array(bytesPerBlob));
    let size8 = 0;
    while (size8 < fieldElementsPerBlob) {
      const bytes2 = data3.slice(position, position + (bytesPerFieldElement - 1));
      blob3.pushByte(0);
      blob3.pushBytes(bytes2);
      if (bytes2.length < 31) {
        blob3.pushByte(128);
        active = false;
        break;
      }
      size8++;
      position += 31;
    }
    blobs.push(blob3);
  }
  return to === "bytes" ? blobs.map((x) => x.bytes) : blobs.map((x) => bytesToHex(x.bytes));
}

// node_modules/viem/_esm/utils/blob/toBlobSidecars.js
function toBlobSidecars(parameters) {
  const { data: data3, kzg: kzg2, to } = parameters;
  const blobs = parameters.blobs ?? toBlobs({ data: data3, to });
  const commitments = parameters.commitments ?? blobsToCommitments({ blobs, kzg: kzg2, to });
  const proofs = parameters.proofs ?? blobsToProofs({ blobs, commitments, kzg: kzg2, to });
  const sidecars = [];
  for (let i = 0;i < blobs.length; i++)
    sidecars.push({
      blob: blobs[i],
      commitment: commitments[i],
      proof: proofs[i]
    });
  return sidecars;
}

// node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
init_assertRequest();

// node_modules/viem/_esm/utils/transaction/getTransactionType.js
init_transaction();
function getTransactionType(transaction6) {
  if (transaction6.type)
    return transaction6.type;
  if (typeof transaction6.blobs !== "undefined" || typeof transaction6.blobVersionedHashes !== "undefined" || typeof transaction6.maxFeePerBlobGas !== "undefined" || typeof transaction6.sidecars !== "undefined")
    return "eip4844";
  if (typeof transaction6.maxFeePerGas !== "undefined" || typeof transaction6.maxPriorityFeePerGas !== "undefined") {
    return "eip1559";
  }
  if (typeof transaction6.gasPrice !== "undefined") {
    if (typeof transaction6.accessList !== "undefined")
      return "eip2930";
    return "legacy";
  }
  throw new InvalidSerializableTransactionError({ transaction: transaction6 });
}

// node_modules/viem/_esm/actions/public/getChainId.js
init_fromHex();
async function getChainId(client) {
  const chainIdHex = await client.request({
    method: "eth_chainId"
  });
  return hexToNumber(chainIdHex);
}

// node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
async function prepareTransactionRequest(client, args) {
  const { account: account_ = client.account, blobs, chain, chainId, gas, kzg: kzg2, nonce, parameters = defaultParameters, type } = args;
  const account = account_ ? parseAccount(account_) : undefined;
  const request2 = { ...args, ...account ? { from: account?.address } : {} };
  let block3;
  async function getBlock5() {
    if (block3)
      return block3;
    block3 = await getAction(client, getBlock, "getBlock")({ blockTag: "latest" });
    return block3;
  }
  if ((parameters.includes("blobVersionedHashes") || parameters.includes("sidecars")) && blobs && kzg2) {
    const commitments = blobsToCommitments({ blobs, kzg: kzg2 });
    if (parameters.includes("blobVersionedHashes")) {
      const versionedHashes = commitmentsToVersionedHashes({
        commitments,
        to: "hex"
      });
      request2.blobVersionedHashes = versionedHashes;
    }
    if (parameters.includes("sidecars")) {
      const proofs = blobsToProofs({ blobs, commitments, kzg: kzg2 });
      const sidecars = toBlobSidecars({
        blobs,
        commitments,
        proofs,
        to: "hex"
      });
      request2.sidecars = sidecars;
    }
  }
  if (parameters.includes("chainId")) {
    if (chain)
      request2.chainId = chain.id;
    else if (typeof chainId !== "undefined")
      request2.chainId = chainId;
    else
      request2.chainId = await getAction(client, getChainId, "getChainId")({});
  }
  if (parameters.includes("nonce") && typeof nonce === "undefined" && account)
    request2.nonce = await getAction(client, getTransactionCount, "getTransactionCount")({
      address: account.address,
      blockTag: "pending"
    });
  if ((parameters.includes("fees") || parameters.includes("type")) && typeof type === "undefined") {
    try {
      request2.type = getTransactionType(request2);
    } catch {
      const block4 = await getBlock5();
      request2.type = typeof block4?.baseFeePerGas === "bigint" ? "eip1559" : "legacy";
    }
  }
  if (parameters.includes("fees")) {
    if (request2.type === "eip1559" || request2.type === "eip4844") {
      if (typeof request2.maxFeePerGas === "undefined" || typeof request2.maxPriorityFeePerGas === "undefined") {
        const block4 = await getBlock5();
        const { maxFeePerGas, maxPriorityFeePerGas } = await internal_estimateFeesPerGas(client, {
          block: block4,
          chain,
          request: request2
        });
        if (typeof args.maxPriorityFeePerGas === "undefined" && args.maxFeePerGas && args.maxFeePerGas < maxPriorityFeePerGas)
          throw new MaxFeePerGasTooLowError({
            maxPriorityFeePerGas
          });
        request2.maxPriorityFeePerGas = maxPriorityFeePerGas;
        request2.maxFeePerGas = maxFeePerGas;
      }
    } else {
      if (typeof args.maxFeePerGas !== "undefined" || typeof args.maxPriorityFeePerGas !== "undefined")
        throw new Eip1559FeesNotSupportedError;
      const block4 = await getBlock5();
      const { gasPrice: gasPrice_ } = await internal_estimateFeesPerGas(client, {
        block: block4,
        chain,
        request: request2,
        type: "legacy"
      });
      request2.gasPrice = gasPrice_;
    }
  }
  if (parameters.includes("gas") && typeof gas === "undefined")
    request2.gas = await getAction(client, estimateGas3, "estimateGas")({
      ...request2,
      account: account ? { address: account.address, type: "json-rpc" } : undefined
    });
  assertRequest(request2);
  delete request2.parameters;
  return request2;
}
var defaultParameters = [
  "blobVersionedHashes",
  "chainId",
  "fees",
  "gas",
  "nonce",
  "type"
];

// node_modules/viem/_esm/actions/public/estimateGas.js
async function estimateGas3(client, args) {
  const account_ = args.account ?? client.account;
  const account = account_ ? parseAccount(account_) : undefined;
  try {
    const { accessList, blobs, blobVersionedHashes, blockNumber, blockTag, data: data3, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, ...rest } = await prepareTransactionRequest(client, {
      ...args,
      parameters: account?.type === "local" ? undefined : ["blobVersionedHashes"]
    });
    const blockNumberHex = blockNumber ? numberToHex(blockNumber) : undefined;
    const block3 = blockNumberHex || blockTag;
    assertRequest(args);
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request2 = format({
      ...extract(rest, { format: chainFormat }),
      from: account?.address,
      accessList,
      blobs,
      blobVersionedHashes,
      data: data3,
      gas,
      gasPrice,
      maxFeePerBlobGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      value
    });
    const balance = await client.request({
      method: "eth_estimateGas",
      params: block3 ? [request2, block3] : [request2]
    });
    return BigInt(balance);
  } catch (err) {
    throw getEstimateGasError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}

// node_modules/viem/_esm/actions/public/estimateContractGas.js
async function estimateContractGas(client, parameters) {
  const { abi: abi10, address: address4, args, functionName, ...request2 } = parameters;
  const data3 = encodeFunctionData({
    abi: abi10,
    args,
    functionName
  });
  try {
    const gas = await getAction(client, estimateGas3, "estimateGas")({
      data: data3,
      to: address4,
      ...request2
    });
    return gas;
  } catch (error) {
    const account = request2.account ? parseAccount(request2.account) : undefined;
    throw getContractError(error, {
      abi: abi10,
      address: address4,
      args,
      docsPath: "/docs/contract/estimateContractGas",
      functionName,
      sender: account?.address
    });
  }
}

// node_modules/viem/_esm/actions/public/getContractEvents.js
init_getAbiItem();

// node_modules/viem/_esm/utils/abi/decodeEventLog.js
init_abi();
init_size();
init_toEventSelector();
init_cursor();
init_decodeAbiParameters();
init_formatAbiItem2();
function decodeEventLog(parameters) {
  const { abi: abi11, data: data3, strict: strict_, topics } = parameters;
  const strict = strict_ ?? true;
  const [signature, ...argTopics] = topics;
  if (!signature)
    throw new AbiEventSignatureEmptyTopicsError({ docsPath: docsPath3 });
  const abiItem = abi11.find((x) => x.type === "event" && signature === toEventSelector(formatAbiItem2(x)));
  if (!(abiItem && ("name" in abiItem)) || abiItem.type !== "event")
    throw new AbiEventSignatureNotFoundError(signature, { docsPath: docsPath3 });
  const { name, inputs } = abiItem;
  const isUnnamed = inputs?.some((x) => !(("name" in x) && x.name));
  let args = isUnnamed ? [] : {};
  const indexedInputs = inputs.filter((x) => ("indexed" in x) && x.indexed);
  for (let i = 0;i < indexedInputs.length; i++) {
    const param = indexedInputs[i];
    const topic = argTopics[i];
    if (!topic)
      throw new DecodeLogTopicsMismatch({
        abiItem,
        param
      });
    args[isUnnamed ? i : param.name || i] = decodeTopic({ param, value: topic });
  }
  const nonIndexedInputs = inputs.filter((x) => !(("indexed" in x) && x.indexed));
  if (nonIndexedInputs.length > 0) {
    if (data3 && data3 !== "0x") {
      try {
        const decodedData = decodeAbiParameters(nonIndexedInputs, data3);
        if (decodedData) {
          if (isUnnamed)
            args = [...args, ...decodedData];
          else {
            for (let i = 0;i < nonIndexedInputs.length; i++) {
              args[nonIndexedInputs[i].name] = decodedData[i];
            }
          }
        }
      } catch (err) {
        if (strict) {
          if (err instanceof AbiDecodingDataSizeTooSmallError || err instanceof PositionOutOfBoundsError)
            throw new DecodeLogDataMismatch({
              abiItem,
              data: data3,
              params: nonIndexedInputs,
              size: size(data3)
            });
          throw err;
        }
      }
    } else if (strict) {
      throw new DecodeLogDataMismatch({
        abiItem,
        data: "0x",
        params: nonIndexedInputs,
        size: 0
      });
    }
  }
  return {
    eventName: name,
    args: Object.values(args).length > 0 ? args : undefined
  };
}
var decodeTopic = function({ param, value }) {
  if (param.type === "string" || param.type === "bytes" || param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
    return value;
  const decodedArg = decodeAbiParameters([param], value) || [];
  return decodedArg[0];
};
var docsPath3 = "/docs/contract/decodeEventLog";

// node_modules/viem/_esm/utils/abi/parseEventLogs.js
function parseEventLogs({ abi: abi11, eventName, logs, strict = true }) {
  return logs.map((log2) => {
    try {
      const event = decodeEventLog({
        ...log2,
        abi: abi11,
        strict
      });
      if (eventName && !eventName.includes(event.eventName))
        return null;
      return { ...event, ...log2 };
    } catch (err) {
      let eventName2;
      let isUnnamed;
      if (err instanceof AbiEventSignatureNotFoundError)
        return null;
      if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
        if (strict)
          return null;
        eventName2 = err.abiItem.name;
        isUnnamed = err.abiItem.inputs?.some((x) => !(("name" in x) && x.name));
      }
      return { ...log2, args: isUnnamed ? [] : {}, eventName: eventName2 };
    }
  }).filter(Boolean);
}

// node_modules/viem/_esm/actions/public/getLogs.js
init_toHex();

// node_modules/viem/_esm/utils/formatters/log.js
function formatLog(log2, { args, eventName } = {}) {
  return {
    ...log2,
    blockHash: log2.blockHash ? log2.blockHash : null,
    blockNumber: log2.blockNumber ? BigInt(log2.blockNumber) : null,
    logIndex: log2.logIndex ? Number(log2.logIndex) : null,
    transactionHash: log2.transactionHash ? log2.transactionHash : null,
    transactionIndex: log2.transactionIndex ? Number(log2.transactionIndex) : null,
    ...eventName ? { args, eventName } : {}
  };
}

// node_modules/viem/_esm/actions/public/getLogs.js
async function getLogs(client, { address: address4, blockHash, fromBlock, toBlock, event, events: events_, args, strict: strict_ } = {}) {
  const strict = strict_ ?? false;
  const events = events_ ?? (event ? [event] : undefined);
  let topics = [];
  if (events) {
    topics = [
      events.flatMap((event2) => encodeEventTopics({
        abi: [event2],
        eventName: event2.name,
        args
      }))
    ];
    if (event)
      topics = topics[0];
  }
  let logs;
  if (blockHash) {
    logs = await client.request({
      method: "eth_getLogs",
      params: [{ address: address4, topics, blockHash }]
    });
  } else {
    logs = await client.request({
      method: "eth_getLogs",
      params: [
        {
          address: address4,
          topics,
          fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
          toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock
        }
      ]
    });
  }
  const formattedLogs = logs.map((log3) => formatLog(log3));
  if (!events)
    return formattedLogs;
  return parseEventLogs({
    abi: events,
    logs: formattedLogs,
    strict
  });
}

// node_modules/viem/_esm/actions/public/getContractEvents.js
async function getContractEvents(client, parameters) {
  const { abi: abi11, address: address4, args, blockHash, eventName, fromBlock, toBlock, strict } = parameters;
  const event = eventName ? getAbiItem({ abi: abi11, name: eventName }) : undefined;
  const events = !event ? abi11.filter((x) => x.type === "event") : undefined;
  return getAction(client, getLogs, "getLogs")({
    address: address4,
    args,
    blockHash,
    event,
    events,
    fromBlock,
    toBlock,
    strict
  });
}

// node_modules/viem/_esm/actions/public/readContract.js
init_decodeFunctionResult();
init_encodeFunctionData();
init_call();
async function readContract(client, parameters) {
  const { abi: abi12, address: address6, args, functionName, ...rest } = parameters;
  const calldata = encodeFunctionData({
    abi: abi12,
    args,
    functionName
  });
  try {
    const { data: data4 } = await getAction(client, call2, "call")({
      ...rest,
      data: calldata,
      to: address6
    });
    return decodeFunctionResult({
      abi: abi12,
      args,
      functionName,
      data: data4 || "0x"
    });
  } catch (error) {
    throw getContractError(error, {
      abi: abi12,
      address: address6,
      args,
      docsPath: "/docs/contract/readContract",
      functionName
    });
  }
}

// node_modules/viem/_esm/actions/public/simulateContract.js
init_parseAccount();
init_decodeFunctionResult();
init_encodeFunctionData();
init_call();
async function simulateContract(client, parameters) {
  const { abi: abi12, address: address6, args, dataSuffix, functionName, ...callRequest } = parameters;
  const account = callRequest.account ? parseAccount(callRequest.account) : client.account;
  const calldata = encodeFunctionData({ abi: abi12, args, functionName });
  try {
    const { data: data4 } = await getAction(client, call2, "call")({
      batch: false,
      data: `${calldata}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
      to: address6,
      ...callRequest,
      account
    });
    const result = decodeFunctionResult({
      abi: abi12,
      args,
      functionName,
      data: data4 || "0x"
    });
    const minimizedAbi = abi12.filter((abiItem) => ("name" in abiItem) && abiItem.name === parameters.functionName);
    return {
      result,
      request: {
        abi: minimizedAbi,
        address: address6,
        args,
        dataSuffix,
        functionName,
        ...callRequest,
        account
      }
    };
  } catch (error) {
    throw getContractError(error, {
      abi: abi12,
      address: address6,
      args,
      docsPath: "/docs/contract/simulateContract",
      functionName,
      sender: account?.address
    });
  }
}

// node_modules/viem/_esm/actions/public/watchContractEvent.js
init_abi();
init_rpc();

// node_modules/viem/_esm/utils/observe.js
function observe(observerId, callbacks, fn) {
  const callbackId = ++callbackCount;
  const getListeners = () => listenersCache.get(observerId) || [];
  const unsubscribe = () => {
    const listeners2 = getListeners();
    listenersCache.set(observerId, listeners2.filter((cb) => cb.id !== callbackId));
  };
  const unwatch = () => {
    const cleanup2 = cleanupCache.get(observerId);
    if (getListeners().length === 1 && cleanup2)
      cleanup2();
    unsubscribe();
  };
  const listeners = getListeners();
  listenersCache.set(observerId, [
    ...listeners,
    { id: callbackId, fns: callbacks }
  ]);
  if (listeners && listeners.length > 0)
    return unwatch;
  const emit = {};
  for (const key in callbacks) {
    emit[key] = (...args) => {
      const listeners2 = getListeners();
      if (listeners2.length === 0)
        return;
      for (const listener of listeners2)
        listener.fns[key]?.(...args);
    };
  }
  const cleanup = fn(emit);
  if (typeof cleanup === "function")
    cleanupCache.set(observerId, cleanup);
  return unwatch;
}
var listenersCache = new Map;
var cleanupCache = new Map;
var callbackCount = 0;

// node_modules/viem/_esm/utils/wait.js
async function wait(time) {
  return new Promise((res) => setTimeout(res, time));
}

// node_modules/viem/_esm/utils/poll.js
function poll(fn, { emitOnBegin, initialWaitTime, interval }) {
  let active = true;
  const unwatch = () => active = false;
  const watch = async () => {
    let data4 = undefined;
    if (emitOnBegin)
      data4 = await fn({ unpoll: unwatch });
    const initialWait = await initialWaitTime?.(data4) ?? interval;
    await wait(initialWait);
    const poll2 = async () => {
      if (!active)
        return;
      await fn({ unpoll: unwatch });
      await wait(interval);
      poll2();
    };
    poll2();
  };
  watch();
  return unwatch;
}

// node_modules/viem/_esm/actions/public/watchContractEvent.js
init_stringify();

// node_modules/viem/_esm/utils/promise/withCache.js
function getCache(cacheKey) {
  const buildCache = (cacheKey2, cache) => ({
    clear: () => cache.delete(cacheKey2),
    get: () => cache.get(cacheKey2),
    set: (data4) => cache.set(cacheKey2, data4)
  });
  const promise = buildCache(cacheKey, promiseCache);
  const response = buildCache(cacheKey, responseCache);
  return {
    clear: () => {
      promise.clear();
      response.clear();
    },
    promise,
    response
  };
}
async function withCache(fn, { cacheKey, cacheTime = Infinity }) {
  const cache = getCache(cacheKey);
  const response = cache.response.get();
  if (response && cacheTime > 0) {
    const age = new Date().getTime() - response.created.getTime();
    if (age < cacheTime)
      return response.data;
  }
  let promise = cache.promise.get();
  if (!promise) {
    promise = fn();
    cache.promise.set(promise);
  }
  try {
    const data4 = await promise;
    cache.response.set({ created: new Date, data: data4 });
    return data4;
  } finally {
    cache.promise.clear();
  }
}
var promiseCache = new Map;
var responseCache = new Map;

// node_modules/viem/_esm/actions/public/getBlockNumber.js
async function getBlockNumber(client, { cacheTime = client.cacheTime } = {}) {
  const blockNumberHex = await withCache(() => client.request({
    method: "eth_blockNumber"
  }), { cacheKey: cacheKey(client.uid), cacheTime });
  return BigInt(blockNumberHex);
}
var cacheKey = (id) => `blockNumber.${id}`;

// node_modules/viem/_esm/actions/public/getFilterChanges.js
async function getFilterChanges(_client, { filter }) {
  const strict = ("strict" in filter) && filter.strict;
  const logs = await filter.request({
    method: "eth_getFilterChanges",
    params: [filter.id]
  });
  if (typeof logs[0] === "string")
    return logs;
  const formattedLogs = logs.map((log4) => formatLog(log4));
  if (!("abi" in filter) || !filter.abi)
    return formattedLogs;
  return parseEventLogs({
    abi: filter.abi,
    logs: formattedLogs,
    strict
  });
}

// node_modules/viem/_esm/actions/public/uninstallFilter.js
async function uninstallFilter(_client, { filter }) {
  return filter.request({
    method: "eth_uninstallFilter",
    params: [filter.id]
  });
}

// node_modules/viem/_esm/actions/public/watchContractEvent.js
function watchContractEvent(client, parameters) {
  const { abi: abi13, address: address6, args, batch = true, eventName, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ } = parameters;
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket" || typeof fromBlock === "number";
  const pollContractEvent = () => {
    const strict = strict_ ?? false;
    const observerId = stringify([
      "watchContractEvent",
      address6,
      args,
      batch,
      client.uid,
      eventName,
      pollingInterval,
      strict,
      fromBlock
    ]);
    return observe(observerId, { onLogs, onError }, (emit) => {
      let previousBlockNumber;
      if (fromBlock !== undefined)
        previousBlockNumber = fromBlock - 1n;
      let filter;
      let initialized = false;
      const unwatch = poll(async () => {
        if (!initialized) {
          try {
            filter = await getAction(client, createContractEventFilter, "createContractEventFilter")({
              abi: abi13,
              address: address6,
              args,
              eventName,
              strict,
              fromBlock
            });
          } catch {
          }
          initialized = true;
          return;
        }
        try {
          let logs;
          if (filter) {
            logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          } else {
            const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
            if (previousBlockNumber && previousBlockNumber !== blockNumber) {
              logs = await getAction(client, getContractEvents, "getContractEvents")({
                abi: abi13,
                address: address6,
                args,
                eventName,
                fromBlock: previousBlockNumber + 1n,
                toBlock: blockNumber,
                strict
              });
            } else {
              logs = [];
            }
            previousBlockNumber = blockNumber;
          }
          if (logs.length === 0)
            return;
          if (batch)
            emit.onLogs(logs);
          else
            for (const log5 of logs)
              emit.onLogs([log5]);
        } catch (err) {
          if (filter && err instanceof InvalidInputRpcError)
            initialized = false;
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribeContractEvent = () => {
    const strict = strict_ ?? false;
    const observerId = stringify([
      "watchContractEvent",
      address6,
      args,
      batch,
      client.uid,
      eventName,
      pollingInterval,
      strict
    ]);
    let active = true;
    let unsubscribe = () => active = false;
    return observe(observerId, { onLogs, onError }, (emit) => {
      (async () => {
        try {
          const topics = eventName ? encodeEventTopics({
            abi: abi13,
            eventName,
            args
          }) : [];
          const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
            params: ["logs", { address: address6, topics }],
            onData(data4) {
              if (!active)
                return;
              const log5 = data4.result;
              try {
                const { eventName: eventName2, args: args2 } = decodeEventLog({
                  abi: abi13,
                  data: log5.data,
                  topics: log5.topics,
                  strict: strict_
                });
                const formatted = formatLog(log5, {
                  args: args2,
                  eventName: eventName2
                });
                emit.onLogs([formatted]);
              } catch (err) {
                let eventName2;
                let isUnnamed;
                if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                  if (strict_)
                    return;
                  eventName2 = err.abiItem.name;
                  isUnnamed = err.abiItem.inputs?.some((x) => !(("name" in x) && x.name));
                }
                const formatted = formatLog(log5, {
                  args: isUnnamed ? [] : {},
                  eventName: eventName2
                });
                emit.onLogs([formatted]);
              }
            },
            onError(error) {
              emit.onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    });
  };
  return enablePolling ? pollContractEvent() : subscribeContractEvent();
}

// node_modules/viem/_esm/actions/wallet/sendRawTransaction.js
async function sendRawTransaction(client, { serializedTransaction }) {
  return client.request({
    method: "eth_sendRawTransaction",
    params: [serializedTransaction]
  }, { retryCount: 0 });
}

// node_modules/viem/_esm/utils/accounts.js
init_parseAccount();

// node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js
init_getAddress();
init_keccak256();
function publicKeyToAddress(publicKey) {
  const address6 = keccak256(`0x${publicKey.substring(4)}`).substring(26);
  return checksumAddress(`0x${address6}`);
}

// node_modules/viem/_esm/utils/uid.js
function uid(length = 11) {
  if (!buffer || index + length > size9 * 2) {
    buffer = "";
    index = 0;
    for (let i = 0;i < size9; i++) {
      buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
    }
  }
  return buffer.substring(index, index++ + length);
}
var size9 = 256;
var index = size9;
var buffer;

// node_modules/viem/_esm/clients/createClient.js
function createClient(parameters) {
  const { batch, cacheTime = parameters.pollingInterval ?? 4000, ccipRead, key = "base", name = "Base Client", pollingInterval = 4000, type = "base" } = parameters;
  const chain3 = parameters.chain;
  const account = parameters.account ? parseAccount(parameters.account) : undefined;
  const { config, request: request3, value } = parameters.transport({
    chain: chain3,
    pollingInterval
  });
  const transport = { ...config, ...value };
  const client = {
    account,
    batch,
    cacheTime,
    ccipRead,
    chain: chain3,
    key,
    name,
    pollingInterval,
    request: request3,
    transport,
    type,
    uid: uid()
  };
  function extend(base26) {
    return (extendFn) => {
      const extended = extendFn(base26);
      for (const key2 in client)
        delete extended[key2];
      const combined = { ...base26, ...extended };
      return Object.assign(combined, { extend: extend(combined) });
    };
  }
  return Object.assign(client, { extend: extend(client) });
}
// node_modules/viem/_esm/utils/buildRequest.js
init_base();
init_request();
init_rpc();

// node_modules/viem/_esm/utils/promise/withRetry.js
function withRetry(fn, { delay: delay_ = 100, retryCount = 2, shouldRetry = () => true } = {}) {
  return new Promise((resolve, reject) => {
    const attemptRetry = async ({ count = 0 } = {}) => {
      const retry = async ({ error }) => {
        const delay = typeof delay_ === "function" ? delay_({ count, error }) : delay_;
        if (delay)
          await wait(delay);
        attemptRetry({ count: count + 1 });
      };
      try {
        const data4 = await fn();
        resolve(data4);
      } catch (err) {
        if (count < retryCount && await shouldRetry({ count, error: err }))
          return retry({ error: err });
        reject(err);
      }
    };
    attemptRetry();
  });
}

// node_modules/viem/_esm/utils/buildRequest.js
function buildRequest(request4, options = {}) {
  return async (args, overrideOptions = {}) => {
    const { retryDelay = 150, retryCount = 3 } = {
      ...options,
      ...overrideOptions
    };
    return withRetry(async () => {
      try {
        return await request4(args);
      } catch (err_) {
        const err = err_;
        switch (err.code) {
          case ParseRpcError.code:
            throw new ParseRpcError(err);
          case InvalidRequestRpcError.code:
            throw new InvalidRequestRpcError(err);
          case MethodNotFoundRpcError.code:
            throw new MethodNotFoundRpcError(err);
          case InvalidParamsRpcError.code:
            throw new InvalidParamsRpcError(err);
          case InternalRpcError.code:
            throw new InternalRpcError(err);
          case InvalidInputRpcError.code:
            throw new InvalidInputRpcError(err);
          case ResourceNotFoundRpcError.code:
            throw new ResourceNotFoundRpcError(err);
          case ResourceUnavailableRpcError.code:
            throw new ResourceUnavailableRpcError(err);
          case TransactionRejectedRpcError.code:
            throw new TransactionRejectedRpcError(err);
          case MethodNotSupportedRpcError.code:
            throw new MethodNotSupportedRpcError(err);
          case LimitExceededRpcError.code:
            throw new LimitExceededRpcError(err);
          case JsonRpcVersionUnsupportedError.code:
            throw new JsonRpcVersionUnsupportedError(err);
          case UserRejectedRequestError.code:
            throw new UserRejectedRequestError(err);
          case UnauthorizedProviderError.code:
            throw new UnauthorizedProviderError(err);
          case UnsupportedProviderMethodError.code:
            throw new UnsupportedProviderMethodError(err);
          case ProviderDisconnectedError.code:
            throw new ProviderDisconnectedError(err);
          case ChainDisconnectedError.code:
            throw new ChainDisconnectedError(err);
          case SwitchChainError.code:
            throw new SwitchChainError(err);
          case 5000:
            throw new UserRejectedRequestError(err);
          default:
            if (err_ instanceof BaseError)
              throw err_;
            throw new UnknownRpcError(err);
        }
      }
    }, {
      delay: ({ count, error }) => {
        if (error && error instanceof HttpRequestError) {
          const retryAfter = error?.headers?.get("Retry-After");
          if (retryAfter?.match(/\d/))
            return parseInt(retryAfter) * 1000;
        }
        return ~~(1 << count) * retryDelay;
      },
      retryCount,
      shouldRetry: ({ error }) => shouldRetry(error)
    });
  };
}
function shouldRetry(error) {
  if (("code" in error) && typeof error.code === "number") {
    if (error.code === -1)
      return true;
    if (error.code === LimitExceededRpcError.code)
      return true;
    if (error.code === InternalRpcError.code)
      return true;
    return false;
  }
  if (error instanceof HttpRequestError && error.status) {
    if (error.status === 403)
      return true;
    if (error.status === 408)
      return true;
    if (error.status === 413)
      return true;
    if (error.status === 429)
      return true;
    if (error.status === 500)
      return true;
    if (error.status === 502)
      return true;
    if (error.status === 503)
      return true;
    if (error.status === 504)
      return true;
    return false;
  }
  return true;
}

// node_modules/viem/_esm/clients/transports/createTransport.js
function createTransport({ key, name, request: request4, retryCount = 3, retryDelay = 150, timeout, type }, value) {
  return {
    config: { key, name, request: request4, retryCount, retryDelay, timeout, type },
    request: buildRequest(request4, { retryCount, retryDelay }),
    value
  };
}

// node_modules/viem/_esm/clients/transports/http.js
init_request();

// node_modules/viem/_esm/errors/transport.js
init_base();

class UrlRequiredError extends BaseError {
  constructor() {
    super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
      docsPath: "/docs/clients/intro"
    });
  }
}

// node_modules/viem/_esm/clients/transports/http.js
init_createBatchScheduler();

// node_modules/viem/_esm/utils/rpc/http.js
init_request();

// node_modules/viem/_esm/utils/promise/withTimeout.js
function withTimeout(fn, { errorInstance = new Error("timed out"), timeout, signal }) {
  return new Promise((resolve, reject) => {
    (async () => {
      let timeoutId;
      try {
        const controller = new AbortController;
        if (timeout > 0) {
          timeoutId = setTimeout(() => {
            if (signal) {
              controller.abort();
            } else {
              reject(errorInstance);
            }
          }, timeout);
        }
        resolve(await fn({ signal: controller?.signal || null }));
      } catch (err) {
        if (err.name === "AbortError")
          reject(errorInstance);
        reject(err);
      } finally {
        clearTimeout(timeoutId);
      }
    })();
  });
}

// node_modules/viem/_esm/utils/rpc/http.js
init_stringify();

// node_modules/viem/_esm/utils/rpc/id.js
function createIdStore() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    }
  };
}
var idCache = createIdStore();

// node_modules/viem/_esm/utils/rpc/http.js
function getHttpRpcClient(url, options = {}) {
  return {
    async request(params) {
      const { body, fetchOptions = {}, onRequest = options.onRequest, onResponse = options.onResponse, timeout = options.timeout ?? 1e4 } = params;
      const { headers, method, signal: signal_ } = { ...options.fetchOptions, ...fetchOptions };
      try {
        const response = await withTimeout(async ({ signal }) => {
          const init = {
            ...fetchOptions,
            body: Array.isArray(body) ? stringify(body.map((body2) => ({
              jsonrpc: "2.0",
              id: body2.id ?? idCache.take(),
              ...body2
            }))) : stringify({
              jsonrpc: "2.0",
              id: body.id ?? idCache.take(),
              ...body
            }),
            headers: {
              ...headers,
              "Content-Type": "application/json"
            },
            method: method || "POST",
            signal: signal_ || (timeout > 0 ? signal : null)
          };
          const request5 = new Request(url, init);
          if (onRequest)
            await onRequest(request5);
          const response2 = await fetch(url, init);
          return response2;
        }, {
          errorInstance: new TimeoutError({ body, url }),
          timeout,
          signal: true
        });
        if (onResponse)
          await onResponse(response);
        let data4;
        if (response.headers.get("Content-Type")?.startsWith("application/json"))
          data4 = await response.json();
        else
          data4 = await response.text();
        if (!response.ok) {
          throw new HttpRequestError({
            body,
            details: stringify(data4.error) || response.statusText,
            headers: response.headers,
            status: response.status,
            url
          });
        }
        return data4;
      } catch (err) {
        if (err instanceof HttpRequestError)
          throw err;
        if (err instanceof TimeoutError)
          throw err;
        throw new HttpRequestError({
          body,
          details: err.message,
          url
        });
      }
    }
  };
}

// node_modules/viem/_esm/clients/transports/http.js
function http2(url, config = {}) {
  const { batch, fetchOptions, key = "http", name = "HTTP JSON-RPC", onFetchRequest, onFetchResponse, retryDelay } = config;
  return ({ chain: chain3, retryCount: retryCount_, timeout: timeout_ }) => {
    const { batchSize = 1000, wait: wait4 = 0 } = typeof batch === "object" ? batch : {};
    const retryCount = config.retryCount ?? retryCount_;
    const timeout = timeout_ ?? config.timeout ?? 1e4;
    const url_ = url || chain3?.rpcUrls.default.http[0];
    if (!url_)
      throw new UrlRequiredError;
    const rpcClient = getHttpRpcClient(url_, {
      fetchOptions,
      onRequest: onFetchRequest,
      onResponse: onFetchResponse,
      timeout
    });
    return createTransport({
      key,
      name,
      async request({ method, params }) {
        const body = { method, params };
        const { schedule } = createBatchScheduler({
          id: `${url}`,
          wait: wait4,
          shouldSplitBatch(requests) {
            return requests.length > batchSize;
          },
          fn: (body2) => rpcClient.request({
            body: body2
          }),
          sort: (a, b) => a.id - b.id
        });
        const fn = async (body2) => batch ? schedule(body2) : [
          await rpcClient.request({
            body: body2
          })
        ];
        const [{ error, result }] = await fn(body);
        if (error)
          throw new RpcRequestError({
            body,
            error,
            url: url_
          });
        return result;
      },
      retryCount,
      retryDelay,
      timeout,
      type: "http"
    }, {
      fetchOptions,
      url: url_
    });
  };
}
// node_modules/viem/_esm/actions/ens/getEnsAddress.js
init_abis();
init_decodeFunctionResult();
init_encodeFunctionData();
init_getChainContractAddress();
init_trim();
init_toHex();

// node_modules/viem/_esm/utils/ens/errors.js
init_solidity();
init_base();
init_contract();
function isNullUniversalResolverError(err, callType) {
  if (!(err instanceof BaseError))
    return false;
  const cause = err.walk((e) => e instanceof ContractFunctionRevertedError);
  if (!(cause instanceof ContractFunctionRevertedError))
    return false;
  if (cause.data?.errorName === "ResolverNotFound")
    return true;
  if (cause.data?.errorName === "ResolverWildcardNotSupported")
    return true;
  if (cause.data?.errorName === "ResolverNotContract")
    return true;
  if (cause.data?.errorName === "ResolverError")
    return true;
  if (cause.data?.errorName === "HttpError")
    return true;
  if (cause.reason?.includes("Wildcard on non-extended resolvers is not supported"))
    return true;
  if (callType === "reverse" && cause.reason === panicReasons[50])
    return true;
  return false;
}

// node_modules/viem/_esm/utils/ens/namehash.js
init_concat();
init_toBytes();
init_toHex();
init_keccak256();

// node_modules/viem/_esm/utils/ens/encodedLabelToLabelhash.js
init_isHex();
function encodedLabelToLabelhash(label) {
  if (label.length !== 66)
    return null;
  if (label.indexOf("[") !== 0)
    return null;
  if (label.indexOf("]") !== 65)
    return null;
  const hash3 = `0x${label.slice(1, 65)}`;
  if (!isHex(hash3))
    return null;
  return hash3;
}

// node_modules/viem/_esm/utils/ens/namehash.js
function namehash(name) {
  let result = new Uint8Array(32).fill(0);
  if (!name)
    return bytesToHex(result);
  const labels = name.split(".");
  for (let i = labels.length - 1;i >= 0; i -= 1) {
    const hashFromEncodedLabel = encodedLabelToLabelhash(labels[i]);
    const hashed = hashFromEncodedLabel ? toBytes(hashFromEncodedLabel) : keccak256(stringToBytes(labels[i]), "bytes");
    result = keccak256(concat([result, hashed]), "bytes");
  }
  return bytesToHex(result);
}

// node_modules/viem/_esm/utils/ens/packetToBytes.js
init_toBytes();

// node_modules/viem/_esm/utils/ens/encodeLabelhash.js
function encodeLabelhash(hash3) {
  return `[${hash3.slice(2)}]`;
}

// node_modules/viem/_esm/utils/ens/labelhash.js
init_toBytes();
init_toHex();
init_keccak256();
function labelhash(label) {
  const result = new Uint8Array(32).fill(0);
  if (!label)
    return bytesToHex(result);
  return encodedLabelToLabelhash(label) || keccak256(stringToBytes(label));
}

// node_modules/viem/_esm/utils/ens/packetToBytes.js
function packetToBytes(packet) {
  const value = packet.replace(/^\.|\.$/gm, "");
  if (value.length === 0)
    return new Uint8Array(1);
  const bytes2 = new Uint8Array(stringToBytes(value).byteLength + 2);
  let offset = 0;
  const list = value.split(".");
  for (let i = 0;i < list.length; i++) {
    let encoded = stringToBytes(list[i]);
    if (encoded.byteLength > 255)
      encoded = stringToBytes(encodeLabelhash(labelhash(list[i])));
    bytes2[offset] = encoded.length;
    bytes2.set(encoded, offset + 1);
    offset += encoded.length + 1;
  }
  if (bytes2.byteLength !== offset + 1)
    return bytes2.slice(0, offset + 1);
  return bytes2;
}

// node_modules/viem/_esm/actions/ens/getEnsAddress.js
async function getEnsAddress(client, { blockNumber, blockTag, coinType, name, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  try {
    const functionData = encodeFunctionData({
      abi: addressResolverAbi,
      functionName: "addr",
      ...coinType != null ? { args: [namehash(name), BigInt(coinType)] } : { args: [namehash(name)] }
    });
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverResolveAbi,
      functionName: "resolve",
      args: [toHex(packetToBytes(name)), functionData],
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const res = gatewayUrls ? await readContractAction({
      ...readContractParameters,
      args: [...readContractParameters.args, gatewayUrls]
    }) : await readContractAction(readContractParameters);
    if (res[0] === "0x")
      return null;
    const address6 = decodeFunctionResult({
      abi: addressResolverAbi,
      args: coinType != null ? [namehash(name), BigInt(coinType)] : undefined,
      functionName: "addr",
      data: res[0]
    });
    if (address6 === "0x")
      return null;
    if (trim(address6) === "0x00")
      return null;
    return address6;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err, "resolve"))
      return null;
    throw err;
  }
}

// node_modules/viem/_esm/errors/ens.js
init_base();

class EnsAvatarInvalidMetadataError extends BaseError {
  constructor({ data: data4 }) {
    super("Unable to extract image from metadata. The metadata may be malformed or invalid.", {
      metaMessages: [
        "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
        "",
        `Provided data: ${JSON.stringify(data4)}`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EnsAvatarInvalidMetadataError"
    });
  }
}

class EnsAvatarInvalidNftUriError extends BaseError {
  constructor({ reason }) {
    super(`ENS NFT avatar URI is invalid. ${reason}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EnsAvatarInvalidNftUriError"
    });
  }
}

class EnsAvatarUriResolutionError extends BaseError {
  constructor({ uri }) {
    super(`Unable to resolve ENS avatar URI "${uri}". The URI may be malformed, invalid, or does not respond with a valid image.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EnsAvatarUriResolutionError"
    });
  }
}

class EnsAvatarUnsupportedNamespaceError extends BaseError {
  constructor({ namespace }) {
    super(`ENS NFT avatar namespace "${namespace}" is not supported. Must be "erc721" or "erc1155".`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EnsAvatarUnsupportedNamespaceError"
    });
  }
}

// node_modules/viem/_esm/utils/ens/avatar/utils.js
async function isImageUri(uri) {
  try {
    const res = await fetch(uri, { method: "HEAD" });
    if (res.status === 200) {
      const contentType = res.headers.get("content-type");
      return contentType?.startsWith("image/");
    }
    return false;
  } catch (error) {
    if (typeof error === "object" && typeof error.response !== "undefined") {
      return false;
    }
    if (!globalThis.hasOwnProperty("Image"))
      return false;
    return new Promise((resolve) => {
      const img = new Image;
      img.onload = () => {
        resolve(true);
      };
      img.onerror = () => {
        resolve(false);
      };
      img.src = uri;
    });
  }
}
function getGateway(custom, defaultGateway) {
  if (!custom)
    return defaultGateway;
  if (custom.endsWith("/"))
    return custom.slice(0, -1);
  return custom;
}
function resolveAvatarUri({ uri, gatewayUrls }) {
  const isEncoded = base64Regex.test(uri);
  if (isEncoded)
    return { uri, isOnChain: true, isEncoded };
  const ipfsGateway = getGateway(gatewayUrls?.ipfs, "https://ipfs.io");
  const arweaveGateway = getGateway(gatewayUrls?.arweave, "https://arweave.net");
  const networkRegexMatch = uri.match(networkRegex);
  const { protocol, subpath, target, subtarget = "" } = networkRegexMatch?.groups || {};
  const isIPNS = protocol === "ipns:/" || subpath === "ipns/";
  const isIPFS = protocol === "ipfs:/" || subpath === "ipfs/" || ipfsHashRegex.test(uri);
  if (uri.startsWith("http") && !isIPNS && !isIPFS) {
    let replacedUri = uri;
    if (gatewayUrls?.arweave)
      replacedUri = uri.replace(/https:\/\/arweave.net/g, gatewayUrls?.arweave);
    return { uri: replacedUri, isOnChain: false, isEncoded: false };
  }
  if ((isIPNS || isIPFS) && target) {
    return {
      uri: `${ipfsGateway}/${isIPNS ? "ipns" : "ipfs"}/${target}${subtarget}`,
      isOnChain: false,
      isEncoded: false
    };
  }
  if (protocol === "ar:/" && target) {
    return {
      uri: `${arweaveGateway}/${target}${subtarget || ""}`,
      isOnChain: false,
      isEncoded: false
    };
  }
  let parsedUri = uri.replace(dataURIRegex, "");
  if (parsedUri.startsWith("<svg")) {
    parsedUri = `data:image/svg+xml;base64,${btoa(parsedUri)}`;
  }
  if (parsedUri.startsWith("data:") || parsedUri.startsWith("{")) {
    return {
      uri: parsedUri,
      isOnChain: true,
      isEncoded: false
    };
  }
  throw new EnsAvatarUriResolutionError({ uri });
}
function getJsonImage(data4) {
  if (typeof data4 !== "object" || !("image" in data4) && !("image_url" in data4) && !("image_data" in data4)) {
    throw new EnsAvatarInvalidMetadataError({ data: data4 });
  }
  return data4.image || data4.image_url || data4.image_data;
}
async function getMetadataAvatarUri({ gatewayUrls, uri }) {
  try {
    const res = await fetch(uri).then((res2) => res2.json());
    const image = await parseAvatarUri({
      gatewayUrls,
      uri: getJsonImage(res)
    });
    return image;
  } catch {
    throw new EnsAvatarUriResolutionError({ uri });
  }
}
async function parseAvatarUri({ gatewayUrls, uri }) {
  const { uri: resolvedURI, isOnChain } = resolveAvatarUri({ uri, gatewayUrls });
  if (isOnChain)
    return resolvedURI;
  const isImage = await isImageUri(resolvedURI);
  if (isImage)
    return resolvedURI;
  throw new EnsAvatarUriResolutionError({ uri });
}
function parseNftUri(uri_) {
  let uri = uri_;
  if (uri.startsWith("did:nft:")) {
    uri = uri.replace("did:nft:", "").replace(/_/g, "/");
  }
  const [reference, asset_namespace, tokenID] = uri.split("/");
  const [eip_namespace, chainID] = reference.split(":");
  const [erc_namespace, contractAddress] = asset_namespace.split(":");
  if (!eip_namespace || eip_namespace.toLowerCase() !== "eip155")
    throw new EnsAvatarInvalidNftUriError({ reason: "Only EIP-155 supported" });
  if (!chainID)
    throw new EnsAvatarInvalidNftUriError({ reason: "Chain ID not found" });
  if (!contractAddress)
    throw new EnsAvatarInvalidNftUriError({
      reason: "Contract address not found"
    });
  if (!tokenID)
    throw new EnsAvatarInvalidNftUriError({ reason: "Token ID not found" });
  if (!erc_namespace)
    throw new EnsAvatarInvalidNftUriError({ reason: "ERC namespace not found" });
  return {
    chainID: parseInt(chainID),
    namespace: erc_namespace.toLowerCase(),
    contractAddress,
    tokenID
  };
}
async function getNftTokenUri(client, { nft }) {
  if (nft.namespace === "erc721") {
    return readContract(client, {
      address: nft.contractAddress,
      abi: [
        {
          name: "tokenURI",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "tokenId", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "tokenURI",
      args: [BigInt(nft.tokenID)]
    });
  }
  if (nft.namespace === "erc1155") {
    return readContract(client, {
      address: nft.contractAddress,
      abi: [
        {
          name: "uri",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "_id", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "uri",
      args: [BigInt(nft.tokenID)]
    });
  }
  throw new EnsAvatarUnsupportedNamespaceError({ namespace: nft.namespace });
}
var networkRegex = /(?<protocol>https?:\/\/[^\/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/;
var ipfsHashRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/;
var base64Regex = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/;
var dataURIRegex = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;

// node_modules/viem/_esm/utils/ens/avatar/parseAvatarRecord.js
async function parseAvatarRecord(client, { gatewayUrls, record }) {
  if (/eip155:/i.test(record))
    return parseNftAvatarUri(client, { gatewayUrls, record });
  return parseAvatarUri({ uri: record, gatewayUrls });
}
async function parseNftAvatarUri(client, { gatewayUrls, record }) {
  const nft = parseNftUri(record);
  const nftUri = await getNftTokenUri(client, { nft });
  const { uri: resolvedNftUri, isOnChain, isEncoded } = resolveAvatarUri({ uri: nftUri, gatewayUrls });
  if (isOnChain && (resolvedNftUri.includes("data:application/json;base64,") || resolvedNftUri.startsWith("{"))) {
    const encodedJson = isEncoded ? atob(resolvedNftUri.replace("data:application/json;base64,", "")) : resolvedNftUri;
    const decoded = JSON.parse(encodedJson);
    return parseAvatarUri({ uri: getJsonImage(decoded), gatewayUrls });
  }
  let uriTokenId = nft.tokenID;
  if (nft.namespace === "erc1155")
    uriTokenId = uriTokenId.replace("0x", "").padStart(64, "0");
  return getMetadataAvatarUri({
    gatewayUrls,
    uri: resolvedNftUri.replace(/(?:0x)?{id}/, uriTokenId)
  });
}

// node_modules/viem/_esm/actions/ens/getEnsText.js
init_abis();
init_decodeFunctionResult();
init_encodeFunctionData();
init_getChainContractAddress();
init_toHex();
async function getEnsText(client, { blockNumber, blockTag, name, key, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  try {
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverResolveAbi,
      functionName: "resolve",
      args: [
        toHex(packetToBytes(name)),
        encodeFunctionData({
          abi: textResolverAbi,
          functionName: "text",
          args: [namehash(name), key]
        })
      ],
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const res = gatewayUrls ? await readContractAction({
      ...readContractParameters,
      args: [...readContractParameters.args, gatewayUrls]
    }) : await readContractAction(readContractParameters);
    if (res[0] === "0x")
      return null;
    const record = decodeFunctionResult({
      abi: textResolverAbi,
      functionName: "text",
      data: res[0]
    });
    return record === "" ? null : record;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err, "resolve"))
      return null;
    throw err;
  }
}

// node_modules/viem/_esm/actions/ens/getEnsAvatar.js
async function getEnsAvatar(client, { blockNumber, blockTag, assetGatewayUrls, name, gatewayUrls, strict, universalResolverAddress }) {
  const record = await getAction(client, getEnsText, "getEnsText")({
    blockNumber,
    blockTag,
    key: "avatar",
    name,
    universalResolverAddress,
    gatewayUrls,
    strict
  });
  if (!record)
    return null;
  try {
    return await parseAvatarRecord(client, {
      record,
      gatewayUrls: assetGatewayUrls
    });
  } catch {
    return null;
  }
}

// node_modules/viem/_esm/actions/ens/getEnsName.js
init_abis();
init_getChainContractAddress();
init_toHex();
async function getEnsName(client, { address: address6, blockNumber, blockTag, gatewayUrls, strict, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  const reverseNode = `${address6.toLowerCase().substring(2)}.addr.reverse`;
  try {
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverReverseAbi,
      functionName: "reverse",
      args: [toHex(packetToBytes(reverseNode))],
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const [name, resolvedAddress] = gatewayUrls ? await readContractAction({
      ...readContractParameters,
      args: [...readContractParameters.args, gatewayUrls]
    }) : await readContractAction(readContractParameters);
    if (address6.toLowerCase() !== resolvedAddress.toLowerCase())
      return null;
    return name;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err, "reverse"))
      return null;
    throw err;
  }
}

// node_modules/viem/_esm/actions/ens/getEnsResolver.js
init_getChainContractAddress();
init_toHex();
async function getEnsResolver(client, { blockNumber, blockTag, name, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  const [resolverAddress] = await getAction(client, readContract, "readContract")({
    address: universalResolverAddress,
    abi: [
      {
        inputs: [{ type: "bytes" }],
        name: "findResolver",
        outputs: [{ type: "address" }, { type: "bytes32" }],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "findResolver",
    args: [toHex(packetToBytes(name))],
    blockNumber,
    blockTag
  });
  return resolverAddress;
}

// node_modules/viem/_esm/clients/decorators/public.js
init_call();

// node_modules/viem/_esm/actions/public/createBlockFilter.js
async function createBlockFilter(client) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newBlockFilter"
  });
  const id2 = await client.request({
    method: "eth_newBlockFilter"
  });
  return { id: id2, request: getRequest(id2), type: "block" };
}

// node_modules/viem/_esm/actions/public/createEventFilter.js
init_toHex();
async function createEventFilter(client, { address: address6, args, event, events: events_, fromBlock, strict, toBlock } = {}) {
  const events = events_ ?? (event ? [event] : undefined);
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newFilter"
  });
  let topics = [];
  if (events) {
    topics = [
      events.flatMap((event2) => encodeEventTopics({
        abi: [event2],
        eventName: event2.name,
        args
      }))
    ];
    if (event)
      topics = topics[0];
  }
  const id2 = await client.request({
    method: "eth_newFilter",
    params: [
      {
        address: address6,
        fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
        toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
        ...topics.length ? { topics } : {}
      }
    ]
  });
  return {
    abi: events,
    args,
    eventName: event ? event.name : undefined,
    fromBlock,
    id: id2,
    request: getRequest(id2),
    strict: Boolean(strict),
    toBlock,
    type: "event"
  };
}

// node_modules/viem/_esm/actions/public/createPendingTransactionFilter.js
async function createPendingTransactionFilter(client) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newPendingTransactionFilter"
  });
  const id2 = await client.request({
    method: "eth_newPendingTransactionFilter"
  });
  return { id: id2, request: getRequest(id2), type: "transaction" };
}

// node_modules/viem/_esm/actions/public/getBalance.js
init_toHex();
async function getBalance(client, { address: address6, blockNumber, blockTag = "latest" }) {
  const blockNumberHex = blockNumber ? numberToHex(blockNumber) : undefined;
  const balance = await client.request({
    method: "eth_getBalance",
    params: [address6, blockNumberHex || blockTag]
  });
  return BigInt(balance);
}

// node_modules/viem/_esm/actions/public/getBlobBaseFee.js
async function getBlobBaseFee(client) {
  const baseFee = await client.request({
    method: "eth_blobBaseFee"
  });
  return BigInt(baseFee);
}

// node_modules/viem/_esm/actions/public/getBlockTransactionCount.js
init_fromHex();
init_toHex();
async function getBlockTransactionCount(client, { blockHash, blockNumber, blockTag = "latest" } = {}) {
  const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
  let count;
  if (blockHash) {
    count = await client.request({
      method: "eth_getBlockTransactionCountByHash",
      params: [blockHash]
    });
  } else {
    count = await client.request({
      method: "eth_getBlockTransactionCountByNumber",
      params: [blockNumberHex || blockTag]
    });
  }
  return hexToNumber(count);
}

// node_modules/viem/_esm/actions/public/getBytecode.js
init_toHex();
async function getBytecode(client, { address: address6, blockNumber, blockTag = "latest" }) {
  const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
  const hex = await client.request({
    method: "eth_getCode",
    params: [address6, blockNumberHex || blockTag]
  });
  if (hex === "0x")
    return;
  return hex;
}

// node_modules/viem/_esm/actions/public/getFeeHistory.js
init_toHex();

// node_modules/viem/_esm/utils/formatters/feeHistory.js
function formatFeeHistory(feeHistory) {
  return {
    baseFeePerGas: feeHistory.baseFeePerGas.map((value) => BigInt(value)),
    gasUsedRatio: feeHistory.gasUsedRatio,
    oldestBlock: BigInt(feeHistory.oldestBlock),
    reward: feeHistory.reward?.map((reward) => reward.map((value) => BigInt(value)))
  };
}

// node_modules/viem/_esm/actions/public/getFeeHistory.js
async function getFeeHistory(client, { blockCount, blockNumber, blockTag = "latest", rewardPercentiles }) {
  const blockNumberHex = blockNumber ? numberToHex(blockNumber) : undefined;
  const feeHistory2 = await client.request({
    method: "eth_feeHistory",
    params: [
      numberToHex(blockCount),
      blockNumberHex || blockTag,
      rewardPercentiles
    ]
  });
  return formatFeeHistory(feeHistory2);
}

// node_modules/viem/_esm/actions/public/getFilterLogs.js
async function getFilterLogs(_client, { filter }) {
  const strict = filter.strict ?? false;
  const logs = await filter.request({
    method: "eth_getFilterLogs",
    params: [filter.id]
  });
  const formattedLogs = logs.map((log6) => formatLog(log6));
  if (!filter.abi)
    return formattedLogs;
  return parseEventLogs({
    abi: filter.abi,
    logs: formattedLogs,
    strict
  });
}

// node_modules/viem/_esm/actions/public/getProof.js
init_toHex();

// node_modules/viem/_esm/utils/chain/defineChain.js
function defineChain(chain3) {
  return {
    formatters: undefined,
    fees: undefined,
    serializers: undefined,
    ...chain3
  };
}

// node_modules/viem/_esm/utils/regex.js
var bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;

// node_modules/viem/_esm/utils/typedData.js
init_abi();
init_address();
init_isAddress();
init_size();
init_toHex();

// node_modules/viem/_esm/utils/signature/hashTypedData.js
init_encodeAbiParameters();
init_concat();
init_toHex();
init_keccak256();
function hashTypedData(parameters) {
  const { domain = {}, message, primaryType } = parameters;
  const types = {
    EIP712Domain: getTypesForEIP712Domain({ domain }),
    ...parameters.types
  };
  validateTypedData({
    domain,
    message,
    primaryType,
    types
  });
  const parts = ["0x1901"];
  if (domain)
    parts.push(hashDomain({
      domain,
      types
    }));
  if (primaryType !== "EIP712Domain")
    parts.push(hashStruct({
      data: message,
      primaryType,
      types
    }));
  return keccak256(concat(parts));
}
function hashDomain({ domain, types }) {
  return hashStruct({
    data: domain,
    primaryType: "EIP712Domain",
    types
  });
}
var hashStruct = function({ data: data4, primaryType, types }) {
  const encoded = encodeData({
    data: data4,
    primaryType,
    types
  });
  return keccak256(encoded);
};
var encodeData = function({ data: data4, primaryType, types }) {
  const encodedTypes = [{ type: "bytes32" }];
  const encodedValues = [hashType({ primaryType, types })];
  for (const field of types[primaryType]) {
    const [type, value] = encodeField({
      types,
      name: field.name,
      type: field.type,
      value: data4[field.name]
    });
    encodedTypes.push(type);
    encodedValues.push(value);
  }
  return encodeAbiParameters(encodedTypes, encodedValues);
};
var hashType = function({ primaryType, types }) {
  const encodedHashType = toHex(encodeType({ primaryType, types }));
  return keccak256(encodedHashType);
};
var encodeType = function({ primaryType, types }) {
  let result = "";
  const unsortedDeps = findTypeDependencies({ primaryType, types });
  unsortedDeps.delete(primaryType);
  const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
  for (const type of deps) {
    result += `${type}(${types[type].map(({ name, type: t }) => `${t} ${name}`).join(",")})`;
  }
  return result;
};
var findTypeDependencies = function({ primaryType: primaryType_, types }, results = new Set) {
  const match = primaryType_.match(/^\w*/u);
  const primaryType = match?.[0];
  if (results.has(primaryType) || types[primaryType] === undefined) {
    return results;
  }
  results.add(primaryType);
  for (const field of types[primaryType]) {
    findTypeDependencies({ primaryType: field.type, types }, results);
  }
  return results;
};
var encodeField = function({ types, name, type, value }) {
  if (types[type] !== undefined) {
    return [
      { type: "bytes32" },
      keccak256(encodeData({ data: value, primaryType: type, types }))
    ];
  }
  if (type === "bytes") {
    const prepend = value.length % 2 ? "0" : "";
    value = `0x${prepend + value.slice(2)}`;
    return [{ type: "bytes32" }, keccak256(value)];
  }
  if (type === "string")
    return [{ type: "bytes32" }, keccak256(toHex(value))];
  if (type.lastIndexOf("]") === type.length - 1) {
    const parsedType = type.slice(0, type.lastIndexOf("["));
    const typeValuePairs = value.map((item) => encodeField({
      name,
      type: parsedType,
      types,
      value: item
    }));
    return [
      { type: "bytes32" },
      keccak256(encodeAbiParameters(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v)))
    ];
  }
  return [{ type }, value];
};

// node_modules/viem/_esm/utils/typedData.js
function validateTypedData(parameters) {
  const { domain, message, primaryType, types } = parameters;
  const validateData = (struct, data4) => {
    for (const param of struct) {
      const { name, type } = param;
      const value = data4[name];
      const integerMatch = type.match(integerRegex);
      if (integerMatch && (typeof value === "number" || typeof value === "bigint")) {
        const [_type, base30, size_] = integerMatch;
        numberToHex(value, {
          signed: base30 === "int",
          size: parseInt(size_) / 8
        });
      }
      if (type === "address" && typeof value === "string" && !isAddress2(value))
        throw new InvalidAddressError({ address: value });
      const bytesMatch = type.match(bytesRegex);
      if (bytesMatch) {
        const [_type, size_] = bytesMatch;
        if (size_ && size(value) !== parseInt(size_))
          throw new BytesSizeMismatchError({
            expectedSize: parseInt(size_),
            givenSize: size(value)
          });
      }
      const struct2 = types[type];
      if (struct2)
        validateData(struct2, value);
    }
  };
  if (types.EIP712Domain && domain)
    validateData(types.EIP712Domain, domain);
  if (primaryType !== "EIP712Domain") {
    const type = types[primaryType];
    validateData(type, message);
  }
}
function getTypesForEIP712Domain({ domain }) {
  return [
    typeof domain?.name === "string" && { name: "name", type: "string" },
    domain?.version && { name: "version", type: "string" },
    typeof domain?.chainId === "number" && {
      name: "chainId",
      type: "uint256"
    },
    domain?.verifyingContract && {
      name: "verifyingContract",
      type: "address"
    },
    domain?.salt && { name: "salt", type: "bytes32" }
  ].filter(Boolean);
}
// node_modules/viem/_esm/utils/abi/encodeDeployData.js
init_abi();
init_concat();
init_encodeAbiParameters();
function encodeDeployData(parameters) {
  const { abi: abi15, args, bytecode } = parameters;
  if (!args || args.length === 0)
    return bytecode;
  const description = abi15.find((x) => ("type" in x) && x.type === "constructor");
  if (!description)
    throw new AbiConstructorNotFoundError({ docsPath: docsPath5 });
  if (!("inputs" in description))
    throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath5 });
  if (!description.inputs || description.inputs.length === 0)
    throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath5 });
  const data4 = encodeAbiParameters(description.inputs, args);
  return concatHex([bytecode, data4]);
}
var docsPath5 = "/docs/contract/encodeDeployData";
// node_modules/viem/_esm/utils/encoding/toRlp.js
init_cursor2();
init_toBytes();
init_toHex();
function toRlp(bytes2, to = "hex") {
  const encodable = getEncodable(bytes2);
  const cursor6 = createCursor(new Uint8Array(encodable.length));
  encodable.encode(cursor6);
  if (to === "hex")
    return bytesToHex(cursor6.bytes);
  return cursor6.bytes;
}
var getEncodable = function(bytes2) {
  if (Array.isArray(bytes2))
    return getEncodableList(bytes2.map((x) => getEncodable(x)));
  return getEncodableBytes(bytes2);
};
var getEncodableList = function(list) {
  const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
  const sizeOfBodyLength = getSizeOfLength(bodyLength);
  const length = (() => {
    if (bodyLength <= 55)
      return 1 + bodyLength;
    return 1 + sizeOfBodyLength + bodyLength;
  })();
  return {
    length,
    encode(cursor6) {
      if (bodyLength <= 55) {
        cursor6.pushByte(192 + bodyLength);
      } else {
        cursor6.pushByte(192 + 55 + sizeOfBodyLength);
        if (sizeOfBodyLength === 1)
          cursor6.pushUint8(bodyLength);
        else if (sizeOfBodyLength === 2)
          cursor6.pushUint16(bodyLength);
        else if (sizeOfBodyLength === 3)
          cursor6.pushUint24(bodyLength);
        else
          cursor6.pushUint32(bodyLength);
      }
      for (const { encode } of list) {
        encode(cursor6);
      }
    }
  };
};
var getEncodableBytes = function(bytesOrHex) {
  const bytes2 = typeof bytesOrHex === "string" ? hexToBytes(bytesOrHex) : bytesOrHex;
  const sizeOfBytesLength = getSizeOfLength(bytes2.length);
  const length = (() => {
    if (bytes2.length === 1 && bytes2[0] < 128)
      return 1;
    if (bytes2.length <= 55)
      return 1 + bytes2.length;
    return 1 + sizeOfBytesLength + bytes2.length;
  })();
  return {
    length,
    encode(cursor6) {
      if (bytes2.length === 1 && bytes2[0] < 128) {
        cursor6.pushBytes(bytes2);
      } else if (bytes2.length <= 55) {
        cursor6.pushByte(128 + bytes2.length);
        cursor6.pushBytes(bytes2);
      } else {
        cursor6.pushByte(128 + 55 + sizeOfBytesLength);
        if (sizeOfBytesLength === 1)
          cursor6.pushUint8(bytes2.length);
        else if (sizeOfBytesLength === 2)
          cursor6.pushUint16(bytes2.length);
        else if (sizeOfBytesLength === 3)
          cursor6.pushUint24(bytes2.length);
        else
          cursor6.pushUint32(bytes2.length);
        cursor6.pushBytes(bytes2);
      }
    }
  };
};
var getSizeOfLength = function(length) {
  if (length < 2 ** 8)
    return 1;
  if (length < 2 ** 16)
    return 2;
  if (length < 2 ** 24)
    return 3;
  if (length < 2 ** 32)
    return 4;
  throw new BaseError("Length is too large.");
};

// node_modules/viem/_esm/utils/index.js
init_isHex();
// node_modules/viem/_esm/utils/formatters/transactionReceipt.js
init_fromHex();
function formatTransactionReceipt(transactionReceipt) {
  const receipt = {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log7) => formatLog(log7)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
  };
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  return receipt;
}
var receiptStatuses = {
  "0x0": "reverted",
  "0x1": "success"
};

// node_modules/viem/_esm/utils/index.js
init_toHex();
init_fromHex();
// node_modules/viem/_esm/constants/strings.js
var presignMessagePrefix = `\x19Ethereum Signed Message:
`;

// node_modules/viem/_esm/utils/signature/hashMessage.js
init_concat();
init_toBytes();
init_keccak256();
function hashMessage(message, to_) {
  const messageBytes = (() => {
    if (typeof message === "string")
      return stringToBytes(message);
    if (message.raw instanceof Uint8Array)
      return message.raw;
    return toBytes(message.raw);
  })();
  const prefixBytes = stringToBytes(`${presignMessagePrefix}${messageBytes.length}`);
  return keccak256(concat([prefixBytes, messageBytes]), to_);
}
// node_modules/viem/_esm/utils/transaction/assertTransaction.js
init_address();
init_base();
init_chain();
init_node();
init_isAddress();
init_size();
init_slice();
init_fromHex();
function assertTransactionEIP4844(transaction7) {
  const { blobVersionedHashes } = transaction7;
  if (blobVersionedHashes) {
    if (blobVersionedHashes.length === 0)
      throw new EmptyBlobError;
    for (const hash3 of blobVersionedHashes) {
      const size_ = size(hash3);
      const version3 = hexToNumber(slice(hash3, 0, 1));
      if (size_ !== 32)
        throw new InvalidVersionedHashSizeError({ hash: hash3, size: size_ });
      if (version3 !== versionedHashVersionKzg)
        throw new InvalidVersionedHashVersionError({
          hash: hash3,
          version: version3
        });
    }
  }
  assertTransactionEIP1559(transaction7);
}
function assertTransactionEIP1559(transaction7) {
  const { chainId, maxPriorityFeePerGas, maxFeePerGas, to } = transaction7;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress2(to))
    throw new InvalidAddressError({ address: to });
  if (maxFeePerGas && maxFeePerGas > 2n ** 256n - 1n)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
function assertTransactionEIP2930(transaction7) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction7;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress2(to))
    throw new InvalidAddressError({ address: to });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");
  if (gasPrice && gasPrice > 2n ** 256n - 1n)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
}
function assertTransactionLegacy(transaction7) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to, accessList } = transaction7;
  if (to && !isAddress2(to))
    throw new InvalidAddressError({ address: to });
  if (typeof chainId !== "undefined" && chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (maxPriorityFeePerGas || maxFeePerGas)
    throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");
  if (gasPrice && gasPrice > 2n ** 256n - 1n)
    throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
  if (accessList)
    throw new BaseError("`accessList` is not a valid Legacy Transaction attribute.");
}

// node_modules/viem/_esm/utils/transaction/serializeTransaction.js
init_transaction();
init_concat();
init_trim();
init_toHex();

// node_modules/viem/_esm/utils/transaction/serializeAccessList.js
init_address();
init_transaction();
init_isAddress();
function serializeAccessList(accessList) {
  if (!accessList || accessList.length === 0)
    return [];
  const serializedAccessList = [];
  for (let i = 0;i < accessList.length; i++) {
    const { address: address9, storageKeys } = accessList[i];
    for (let j = 0;j < storageKeys.length; j++) {
      if (storageKeys[j].length - 2 !== 64) {
        throw new InvalidStorageKeySizeError({ storageKey: storageKeys[j] });
      }
    }
    if (!isAddress2(address9, { strict: false })) {
      throw new InvalidAddressError({ address: address9 });
    }
    serializedAccessList.push([address9, storageKeys]);
  }
  return serializedAccessList;
}

// node_modules/viem/_esm/utils/transaction/serializeTransaction.js
function serializeTransaction(transaction9, signature) {
  const type = getTransactionType(transaction9);
  if (type === "eip1559")
    return serializeTransactionEIP1559(transaction9, signature);
  if (type === "eip2930")
    return serializeTransactionEIP2930(transaction9, signature);
  if (type === "eip4844")
    return serializeTransactionEIP4844(transaction9, signature);
  return serializeTransactionLegacy(transaction9, signature);
}
var serializeTransactionEIP4844 = function(transaction9, signature) {
  const { chainId, gas, nonce, to, value, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, accessList, data: data4 } = transaction9;
  assertTransactionEIP4844(transaction9);
  let blobVersionedHashes = transaction9.blobVersionedHashes;
  let sidecars = transaction9.sidecars;
  if (transaction9.blobs && (typeof blobVersionedHashes === "undefined" || typeof sidecars === "undefined")) {
    const blobs2 = typeof transaction9.blobs[0] === "string" ? transaction9.blobs : transaction9.blobs.map((x) => bytesToHex(x));
    const kzg3 = transaction9.kzg;
    const commitments2 = blobsToCommitments({
      blobs: blobs2,
      kzg: kzg3
    });
    if (typeof blobVersionedHashes === "undefined")
      blobVersionedHashes = commitmentsToVersionedHashes({
        commitments: commitments2
      });
    if (typeof sidecars === "undefined") {
      const proofs2 = blobsToProofs({ blobs: blobs2, commitments: commitments2, kzg: kzg3 });
      sidecars = toBlobSidecars({ blobs: blobs2, commitments: commitments2, proofs: proofs2 });
    }
  }
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data4 ?? "0x",
    serializedAccessList,
    maxFeePerBlobGas ? toHex(maxFeePerBlobGas) : "0x",
    blobVersionedHashes ?? [],
    ...toYParitySignatureArray(transaction9, signature)
  ];
  const blobs = [];
  const commitments = [];
  const proofs = [];
  if (sidecars)
    for (let i = 0;i < sidecars.length; i++) {
      const { blob: blob4, commitment, proof } = sidecars[i];
      blobs.push(blob4);
      commitments.push(commitment);
      proofs.push(proof);
    }
  return concatHex([
    "0x03",
    sidecars ? toRlp([serializedTransaction, blobs, commitments, proofs]) : toRlp(serializedTransaction)
  ]);
};
var serializeTransactionEIP1559 = function(transaction9, signature) {
  const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data: data4 } = transaction9;
  assertTransactionEIP1559(transaction9);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data4 ?? "0x",
    serializedAccessList,
    ...toYParitySignatureArray(transaction9, signature)
  ];
  return concatHex([
    "0x02",
    toRlp(serializedTransaction)
  ]);
};
var serializeTransactionEIP2930 = function(transaction9, signature) {
  const { chainId, gas, data: data4, nonce, to, value, accessList, gasPrice } = transaction9;
  assertTransactionEIP2930(transaction9);
  const serializedAccessList = serializeAccessList(accessList);
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    gasPrice ? toHex(gasPrice) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data4 ?? "0x",
    serializedAccessList,
    ...toYParitySignatureArray(transaction9, signature)
  ];
  return concatHex([
    "0x01",
    toRlp(serializedTransaction)
  ]);
};
var serializeTransactionLegacy = function(transaction9, signature) {
  const { chainId = 0, gas, data: data4, nonce, to, value, gasPrice } = transaction9;
  assertTransactionLegacy(transaction9);
  let serializedTransaction = [
    nonce ? toHex(nonce) : "0x",
    gasPrice ? toHex(gasPrice) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data4 ?? "0x"
  ];
  if (signature) {
    const v = (() => {
      if (signature.v >= 35n) {
        const inferredChainId = (signature.v - 35n) / 2n;
        if (inferredChainId > 0)
          return signature.v;
        return 27n + (signature.v === 35n ? 0n : 1n);
      }
      if (chainId > 0)
        return BigInt(chainId * 2) + BigInt(35n + signature.v - 27n);
      const v2 = 27n + (signature.v === 27n ? 0n : 1n);
      if (signature.v !== v2)
        throw new InvalidLegacyVError({ v: signature.v });
      return v2;
    })();
    serializedTransaction = [
      ...serializedTransaction,
      toHex(v),
      signature.r,
      signature.s
    ];
  } else if (chainId > 0) {
    serializedTransaction = [
      ...serializedTransaction,
      toHex(chainId),
      "0x",
      "0x"
    ];
  }
  return toRlp(serializedTransaction);
};
function toYParitySignatureArray(transaction9, signature) {
  const { r, s, v, yParity } = signature ?? transaction9;
  if (typeof r === "undefined")
    return [];
  if (typeof s === "undefined")
    return [];
  if (typeof v === "undefined" && typeof yParity === "undefined")
    return [];
  const yParity_ = (() => {
    if (typeof yParity === "number")
      return yParity ? toHex(1) : "0x";
    if (v === 0n)
      return "0x";
    if (v === 1n)
      return toHex(1);
    return v === 27n ? "0x" : toHex(1);
  })();
  return [yParity_, trim(r), trim(s)];
}

// node_modules/viem/_esm/utils/formatters/proof.js
var formatStorageProof = function(storageProof) {
  return storageProof.map((proof) => ({
    ...proof,
    value: BigInt(proof.value)
  }));
};
function formatProof(proof) {
  return {
    ...proof,
    balance: proof.balance ? BigInt(proof.balance) : undefined,
    nonce: proof.nonce ? hexToNumber(proof.nonce) : undefined,
    storageProof: proof.storageProof ? formatStorageProof(proof.storageProof) : undefined
  };
}

// node_modules/viem/_esm/actions/public/getProof.js
async function getProof(client, { address: address9, blockNumber, blockTag: blockTag_, storageKeys }) {
  const blockTag = blockTag_ ?? "latest";
  const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
  const proof2 = await client.request({
    method: "eth_getProof",
    params: [address9, storageKeys, blockNumberHex || blockTag]
  });
  return formatProof(proof2);
}

// node_modules/viem/_esm/actions/public/getStorageAt.js
init_toHex();
async function getStorageAt(client, { address: address9, blockNumber, blockTag = "latest", slot }) {
  const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
  const data4 = await client.request({
    method: "eth_getStorageAt",
    params: [address9, slot, blockNumberHex || blockTag]
  });
  return data4;
}

// node_modules/viem/_esm/actions/public/getTransaction.js
init_transaction();
init_toHex();
async function getTransaction(client, { blockHash, blockNumber, blockTag: blockTag_, hash: hash3, index: index2 }) {
  const blockTag = blockTag_ || "latest";
  const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
  let transaction11 = null;
  if (hash3) {
    transaction11 = await client.request({
      method: "eth_getTransactionByHash",
      params: [hash3]
    });
  } else if (blockHash) {
    transaction11 = await client.request({
      method: "eth_getTransactionByBlockHashAndIndex",
      params: [blockHash, numberToHex(index2)]
    });
  } else if (blockNumberHex || blockTag) {
    transaction11 = await client.request({
      method: "eth_getTransactionByBlockNumberAndIndex",
      params: [blockNumberHex || blockTag, numberToHex(index2)]
    });
  }
  if (!transaction11)
    throw new TransactionNotFoundError({
      blockHash,
      blockNumber,
      blockTag,
      hash: hash3,
      index: index2
    });
  const format = client.chain?.formatters?.transaction?.format || formatTransaction;
  return format(transaction11);
}

// node_modules/viem/_esm/actions/public/getTransactionConfirmations.js
async function getTransactionConfirmations(client, { hash: hash3, transactionReceipt }) {
  const [blockNumber, transaction11] = await Promise.all([
    getAction(client, getBlockNumber, "getBlockNumber")({}),
    hash3 ? getAction(client, getTransaction, "getBlockNumber")({ hash: hash3 }) : undefined
  ]);
  const transactionBlockNumber = transactionReceipt?.blockNumber || transaction11?.blockNumber;
  if (!transactionBlockNumber)
    return 0n;
  return blockNumber - transactionBlockNumber + 1n;
}

// node_modules/viem/_esm/actions/public/getTransactionReceipt.js
init_transaction();
async function getTransactionReceipt(client, { hash: hash3 }) {
  const receipt = await client.request({
    method: "eth_getTransactionReceipt",
    params: [hash3]
  });
  if (!receipt)
    throw new TransactionReceiptNotFoundError({ hash: hash3 });
  const format = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
  return format(receipt);
}

// node_modules/viem/_esm/actions/public/multicall.js
init_abis();
init_abi();
init_base();
init_contract();
init_decodeFunctionResult();
init_encodeFunctionData();
init_getChainContractAddress();
async function multicall(client, parameters) {
  const { allowFailure = true, batchSize: batchSize_, blockNumber, blockTag, multicallAddress: multicallAddress_, stateOverride: stateOverride3 } = parameters;
  const contracts = parameters.contracts;
  const batchSize = batchSize_ ?? (typeof client.batch?.multicall === "object" && client.batch.multicall.batchSize || 1024);
  let multicallAddress = multicallAddress_;
  if (!multicallAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. multicallAddress is required.");
    multicallAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "multicall3"
    });
  }
  const chunkedCalls = [[]];
  let currentChunk = 0;
  let currentChunkSize = 0;
  for (let i = 0;i < contracts.length; i++) {
    const { abi: abi16, address: address9, args, functionName } = contracts[i];
    try {
      const callData = encodeFunctionData({ abi: abi16, args, functionName });
      currentChunkSize += (callData.length - 2) / 2;
      if (batchSize > 0 && currentChunkSize > batchSize && chunkedCalls[currentChunk].length > 0) {
        currentChunk++;
        currentChunkSize = (callData.length - 2) / 2;
        chunkedCalls[currentChunk] = [];
      }
      chunkedCalls[currentChunk] = [
        ...chunkedCalls[currentChunk],
        {
          allowFailure: true,
          callData,
          target: address9
        }
      ];
    } catch (err) {
      const error = getContractError(err, {
        abi: abi16,
        address: address9,
        args,
        docsPath: "/docs/contract/multicall",
        functionName
      });
      if (!allowFailure)
        throw error;
      chunkedCalls[currentChunk] = [
        ...chunkedCalls[currentChunk],
        {
          allowFailure: true,
          callData: "0x",
          target: address9
        }
      ];
    }
  }
  const aggregate3Results = await Promise.allSettled(chunkedCalls.map((calls) => getAction(client, readContract, "readContract")({
    abi: multicall3Abi,
    address: multicallAddress,
    args: [calls],
    blockNumber,
    blockTag,
    functionName: "aggregate3",
    stateOverride: stateOverride3
  })));
  const results = [];
  for (let i = 0;i < aggregate3Results.length; i++) {
    const result = aggregate3Results[i];
    if (result.status === "rejected") {
      if (!allowFailure)
        throw result.reason;
      for (let j = 0;j < chunkedCalls[i].length; j++) {
        results.push({
          status: "failure",
          error: result.reason,
          result: undefined
        });
      }
      continue;
    }
    const aggregate3Result = result.value;
    for (let j = 0;j < aggregate3Result.length; j++) {
      const { returnData, success } = aggregate3Result[j];
      const { callData } = chunkedCalls[i][j];
      const { abi: abi16, address: address9, functionName, args } = contracts[results.length];
      try {
        if (callData === "0x")
          throw new AbiDecodingZeroDataError;
        if (!success)
          throw new RawContractError({ data: returnData });
        const result2 = decodeFunctionResult({
          abi: abi16,
          args,
          data: returnData,
          functionName
        });
        results.push(allowFailure ? { result: result2, status: "success" } : result2);
      } catch (err) {
        const error = getContractError(err, {
          abi: abi16,
          address: address9,
          args,
          docsPath: "/docs/contract/multicall",
          functionName
        });
        if (!allowFailure)
          throw error;
        results.push({ error, result: undefined, status: "failure" });
      }
    }
  }
  if (results.length !== contracts.length)
    throw new BaseError("multicall results mismatch");
  return results;
}

// node_modules/viem/_esm/actions/public/verifyHash.js
init_abis();

// node_modules/viem/_esm/constants/contracts.js
var universalSignatureValidatorByteCode = "0x60806040523480156200001157600080fd5b50604051620007003803806200070083398101604081905262000034916200056f565b6000620000438484846200004f565b9050806000526001601ff35b600080846001600160a01b0316803b806020016040519081016040528181526000908060200190933c90507f6492649264926492649264926492649264926492649264926492649264926492620000a68462000451565b036200021f57600060608085806020019051810190620000c79190620005ce565b8651929550909350915060000362000192576000836001600160a01b031683604051620000f5919062000643565b6000604051808303816000865af19150503d806000811462000134576040519150601f19603f3d011682016040523d82523d6000602084013e62000139565b606091505b5050905080620001905760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b505b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90620001c4908b90869060040162000661565b602060405180830381865afa158015620001e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200020891906200069d565b6001600160e01b031916149450505050506200044a565b805115620002b157604051630b135d3f60e11b808252906001600160a01b03871690631626ba7e9062000259908890889060040162000661565b602060405180830381865afa15801562000277573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200029d91906200069d565b6001600160e01b031916149150506200044a565b8251604114620003195760405162461bcd60e51b815260206004820152603a6024820152600080516020620006e083398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e677468000000000000606482015260840162000187565b620003236200046b565b506020830151604080850151855186939260009185919081106200034b576200034b620006c9565b016020015160f81c9050601b81148015906200036b57508060ff16601c14155b15620003cf5760405162461bcd60e51b815260206004820152603b6024820152600080516020620006e083398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c75650000000000606482015260840162000187565b6040805160008152602081018083528a905260ff83169181019190915260608101849052608081018390526001600160a01b038a169060019060a0016020604051602081039080840390855afa1580156200042e573d6000803e3d6000fd5b505050602060405103516001600160a01b031614955050505050505b9392505050565b60006020825110156200046357600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b03811681146200049f57600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620004d5578181015183820152602001620004bb565b50506000910152565b600082601f830112620004f057600080fd5b81516001600160401b03808211156200050d576200050d620004a2565b604051601f8301601f19908116603f01168101908282118183101715620005385762000538620004a2565b816040528381528660208588010111156200055257600080fd5b62000565846020830160208901620004b8565b9695505050505050565b6000806000606084860312156200058557600080fd5b8351620005928162000489565b6020850151604086015191945092506001600160401b03811115620005b657600080fd5b620005c486828701620004de565b9150509250925092565b600080600060608486031215620005e457600080fd5b8351620005f18162000489565b60208501519093506001600160401b03808211156200060f57600080fd5b6200061d87838801620004de565b935060408601519150808211156200063457600080fd5b50620005c486828701620004de565b6000825162000657818460208701620004b8565b9190910192915050565b828152604060208201526000825180604084015262000688816060850160208701620004b8565b601f01601f1916919091016060019392505050565b600060208284031215620006b057600080fd5b81516001600160e01b0319811681146200044a57600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";

// node_modules/viem/_esm/actions/public/verifyHash.js
init_contract();

// node_modules/viem/_esm/utils/data/isBytesEqual.js
init_utils3();
init_toBytes();
init_isHex();
function isBytesEqual(a_, b_) {
  const a = isHex(a_) ? toBytes(a_) : a_;
  const b = isHex(b_) ? toBytes(b_) : b_;
  return equalBytes(a, b);
}

// node_modules/viem/_esm/actions/public/verifyHash.js
init_call();
async function verifyHash(client, { address: address9, hash: hash3, signature, ...callRequest }) {
  const signatureHex = isHex(signature) ? signature : toHex(signature);
  try {
    const { data: data4 } = await getAction(client, call2, "call")({
      data: encodeDeployData({
        abi: universalSignatureValidatorAbi,
        args: [address9, hash3, signatureHex],
        bytecode: universalSignatureValidatorByteCode
      }),
      ...callRequest
    });
    return isBytesEqual(data4 ?? "0x0", "0x1");
  } catch (error) {
    if (error instanceof CallExecutionError) {
      return false;
    }
    throw error;
  }
}

// node_modules/viem/_esm/actions/public/verifyMessage.js
async function verifyMessage(client, { address: address9, message, signature, ...callRequest }) {
  const hash3 = hashMessage(message);
  return verifyHash(client, {
    address: address9,
    hash: hash3,
    signature,
    ...callRequest
  });
}

// node_modules/viem/_esm/actions/public/verifyTypedData.js
async function verifyTypedData(client, parameters) {
  const { address: address9, signature, message, primaryType, types, domain, ...callRequest } = parameters;
  const hash3 = hashTypedData({ message, primaryType, types, domain });
  return verifyHash(client, {
    address: address9,
    hash: hash3,
    signature,
    ...callRequest
  });
}

// node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
init_transaction();
init_stringify();

// node_modules/viem/_esm/actions/public/watchBlockNumber.js
init_fromHex();
init_stringify();
function watchBlockNumber(client, { emitOnBegin = false, emitMissed = false, onBlockNumber, onError, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket";
  let prevBlockNumber;
  const pollBlockNumber = () => {
    const observerId = stringify([
      "watchBlockNumber",
      client.uid,
      emitOnBegin,
      emitMissed,
      pollingInterval
    ]);
    return observe(observerId, { onBlockNumber, onError }, (emit) => poll(async () => {
      try {
        const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({ cacheTime: 0 });
        if (prevBlockNumber) {
          if (blockNumber === prevBlockNumber)
            return;
          if (blockNumber - prevBlockNumber > 1 && emitMissed) {
            for (let i = prevBlockNumber + 1n;i < blockNumber; i++) {
              emit.onBlockNumber(i, prevBlockNumber);
              prevBlockNumber = i;
            }
          }
        }
        if (!prevBlockNumber || blockNumber > prevBlockNumber) {
          emit.onBlockNumber(blockNumber, prevBlockNumber);
          prevBlockNumber = blockNumber;
        }
      } catch (err) {
        emit.onError?.(err);
      }
    }, {
      emitOnBegin,
      interval: pollingInterval
    }));
  };
  const subscribeBlockNumber = () => {
    const observerId = stringify([
      "watchBlockNumber",
      client.uid,
      emitOnBegin,
      emitMissed
    ]);
    return observe(observerId, { onBlockNumber, onError }, (emit) => {
      let active = true;
      let unsubscribe = () => active = false;
      (async () => {
        try {
          const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
            params: ["newHeads"],
            onData(data4) {
              if (!active)
                return;
              const blockNumber = hexToBigInt(data4.result?.number);
              emit.onBlockNumber(blockNumber, prevBlockNumber);
              prevBlockNumber = blockNumber;
            },
            onError(error) {
              emit.onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    });
  };
  return enablePolling ? pollBlockNumber() : subscribeBlockNumber();
}

// node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
async function waitForTransactionReceipt(client, {
  confirmations = 1,
  hash: hash3,
  onReplaced,
  pollingInterval = client.pollingInterval,
  retryCount = 6,
  retryDelay = ({ count }) => ~~(1 << count) * 200,
  timeout
}) {
  const observerId = stringify(["waitForTransactionReceipt", client.uid, hash3]);
  let transaction13;
  let replacedTransaction;
  let receipt;
  let retrying = false;
  return new Promise((resolve, reject) => {
    if (timeout)
      setTimeout(() => reject(new WaitForTransactionReceiptTimeoutError({ hash: hash3 })), timeout);
    const _unobserve = observe(observerId, { onReplaced, resolve, reject }, (emit) => {
      const _unwatch = getAction(client, watchBlockNumber, "watchBlockNumber")({
        emitMissed: true,
        emitOnBegin: true,
        poll: true,
        pollingInterval,
        async onBlockNumber(blockNumber_) {
          if (retrying)
            return;
          let blockNumber = blockNumber_;
          const done = (fn) => {
            _unwatch();
            fn();
            _unobserve();
          };
          try {
            if (receipt) {
              if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                return;
              done(() => emit.resolve(receipt));
              return;
            }
            if (!transaction13) {
              retrying = true;
              await withRetry(async () => {
                transaction13 = await getAction(client, getTransaction, "getTransaction")({ hash: hash3 });
                if (transaction13.blockNumber)
                  blockNumber = transaction13.blockNumber;
              }, {
                delay: retryDelay,
                retryCount
              });
              retrying = false;
            }
            receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: hash3 });
            if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
              return;
            done(() => emit.resolve(receipt));
          } catch (err) {
            if (err instanceof TransactionNotFoundError || err instanceof TransactionReceiptNotFoundError) {
              if (!transaction13) {
                retrying = false;
                return;
              }
              try {
                replacedTransaction = transaction13;
                retrying = true;
                const block4 = await withRetry(() => getAction(client, getBlock, "getBlock")({
                  blockNumber,
                  includeTransactions: true
                }), {
                  delay: retryDelay,
                  retryCount,
                  shouldRetry: ({ error }) => error instanceof BlockNotFoundError
                });
                retrying = false;
                const replacementTransaction = block4.transactions.find(({ from, nonce }) => from === replacedTransaction.from && nonce === replacedTransaction.nonce);
                if (!replacementTransaction)
                  return;
                receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({
                  hash: replacementTransaction.hash
                });
                if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                  return;
                let reason = "replaced";
                if (replacementTransaction.to === replacedTransaction.to && replacementTransaction.value === replacedTransaction.value) {
                  reason = "repriced";
                } else if (replacementTransaction.from === replacementTransaction.to && replacementTransaction.value === 0n) {
                  reason = "cancelled";
                }
                done(() => {
                  emit.onReplaced?.({
                    reason,
                    replacedTransaction,
                    transaction: replacementTransaction,
                    transactionReceipt: receipt
                  });
                  emit.resolve(receipt);
                });
              } catch (err_) {
                done(() => emit.reject(err_));
              }
            } else {
              done(() => emit.reject(err));
            }
          }
        }
      });
    });
  });
}

// node_modules/viem/_esm/actions/public/watchBlocks.js
init_stringify();
function watchBlocks(client, { blockTag = "latest", emitMissed = false, emitOnBegin = false, onBlock, onError, includeTransactions: includeTransactions_, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket";
  const includeTransactions = includeTransactions_ ?? false;
  let prevBlock;
  const pollBlocks = () => {
    const observerId = stringify([
      "watchBlocks",
      client.uid,
      blockTag,
      emitMissed,
      emitOnBegin,
      includeTransactions,
      pollingInterval
    ]);
    return observe(observerId, { onBlock, onError }, (emit) => poll(async () => {
      try {
        const block5 = await getAction(client, getBlock, "getBlock")({
          blockTag,
          includeTransactions
        });
        if (block5.number && prevBlock?.number) {
          if (block5.number === prevBlock.number)
            return;
          if (block5.number - prevBlock.number > 1 && emitMissed) {
            for (let i = prevBlock?.number + 1n;i < block5.number; i++) {
              const block6 = await getAction(client, getBlock, "getBlock")({
                blockNumber: i,
                includeTransactions
              });
              emit.onBlock(block6, prevBlock);
              prevBlock = block6;
            }
          }
        }
        if (!prevBlock?.number || blockTag === "pending" && !block5?.number || block5.number && block5.number > prevBlock.number) {
          emit.onBlock(block5, prevBlock);
          prevBlock = block5;
        }
      } catch (err) {
        emit.onError?.(err);
      }
    }, {
      emitOnBegin,
      interval: pollingInterval
    }));
  };
  const subscribeBlocks = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
          params: ["newHeads"],
          onData(data4) {
            if (!active)
              return;
            const format = client.chain?.formatters?.block?.format || formatBlock;
            const block5 = format(data4.result);
            onBlock(block5, prevBlock);
            prevBlock = block5;
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollBlocks() : subscribeBlocks();
}

// node_modules/viem/_esm/actions/public/watchEvent.js
init_stringify();
init_abi();
init_rpc();
function watchEvent(client, { address: address9, args, batch = true, event, events, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket" || typeof fromBlock === "bigint";
  const strict = strict_ ?? false;
  const pollEvent = () => {
    const observerId = stringify([
      "watchEvent",
      address9,
      args,
      batch,
      client.uid,
      event,
      pollingInterval,
      fromBlock
    ]);
    return observe(observerId, { onLogs, onError }, (emit) => {
      let previousBlockNumber;
      if (fromBlock !== undefined)
        previousBlockNumber = fromBlock - 1n;
      let filter;
      let initialized = false;
      const unwatch = poll(async () => {
        if (!initialized) {
          try {
            filter = await getAction(client, createEventFilter, "createEventFilter")({
              address: address9,
              args,
              event,
              events,
              strict,
              fromBlock
            });
          } catch {
          }
          initialized = true;
          return;
        }
        try {
          let logs;
          if (filter) {
            logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          } else {
            const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
            if (previousBlockNumber && previousBlockNumber !== blockNumber) {
              logs = await getAction(client, getLogs, "getLogs")({
                address: address9,
                args,
                event,
                events,
                fromBlock: previousBlockNumber + 1n,
                toBlock: blockNumber
              });
            } else {
              logs = [];
            }
            previousBlockNumber = blockNumber;
          }
          if (logs.length === 0)
            return;
          if (batch)
            emit.onLogs(logs);
          else
            for (const log7 of logs)
              emit.onLogs([log7]);
        } catch (err) {
          if (filter && err instanceof InvalidInputRpcError)
            initialized = false;
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribeEvent = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const events_ = events ?? (event ? [event] : undefined);
        let topics = [];
        if (events_) {
          topics = [
            events_.flatMap((event2) => encodeEventTopics({
              abi: [event2],
              eventName: event2.name,
              args
            }))
          ];
          if (event)
            topics = topics[0];
        }
        const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
          params: ["logs", { address: address9, topics }],
          onData(data4) {
            if (!active)
              return;
            const log7 = data4.result;
            try {
              const { eventName, args: args2 } = decodeEventLog({
                abi: events_ ?? [],
                data: log7.data,
                topics: log7.topics,
                strict
              });
              const formatted = formatLog(log7, { args: args2, eventName });
              onLogs([formatted]);
            } catch (err) {
              let eventName;
              let isUnnamed;
              if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                if (strict_)
                  return;
                eventName = err.abiItem.name;
                isUnnamed = err.abiItem.inputs?.some((x) => !(("name" in x) && x.name));
              }
              const formatted = formatLog(log7, {
                args: isUnnamed ? [] : {},
                eventName
              });
              onLogs([formatted]);
            }
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollEvent() : subscribeEvent();
}

// node_modules/viem/_esm/actions/public/watchPendingTransactions.js
init_stringify();
function watchPendingTransactions(client, { batch = true, onError, onTransactions, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket";
  const pollPendingTransactions = () => {
    const observerId = stringify([
      "watchPendingTransactions",
      client.uid,
      batch,
      pollingInterval
    ]);
    return observe(observerId, { onTransactions, onError }, (emit) => {
      let filter;
      const unwatch = poll(async () => {
        try {
          if (!filter) {
            try {
              filter = await getAction(client, createPendingTransactionFilter, "createPendingTransactionFilter")({});
              return;
            } catch (err) {
              unwatch();
              throw err;
            }
          }
          const hashes = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          if (hashes.length === 0)
            return;
          if (batch)
            emit.onTransactions(hashes);
          else
            for (const hash3 of hashes)
              emit.onTransactions([hash3]);
        } catch (err) {
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribePendingTransactions = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
          params: ["newPendingTransactions"],
          onData(data4) {
            if (!active)
              return;
            const transaction13 = data4.result;
            onTransactions([transaction13]);
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollPendingTransactions() : subscribePendingTransactions();
}

// node_modules/viem/_esm/clients/decorators/public.js
function publicActions(client) {
  return {
    call: (args) => call2(client, args),
    createBlockFilter: () => createBlockFilter(client),
    createContractEventFilter: (args) => createContractEventFilter(client, args),
    createEventFilter: (args) => createEventFilter(client, args),
    createPendingTransactionFilter: () => createPendingTransactionFilter(client),
    estimateContractGas: (args) => estimateContractGas(client, args),
    estimateGas: (args) => estimateGas3(client, args),
    getBalance: (args) => getBalance(client, args),
    getBlobBaseFee: () => getBlobBaseFee(client),
    getBlock: (args) => getBlock(client, args),
    getBlockNumber: (args) => getBlockNumber(client, args),
    getBlockTransactionCount: (args) => getBlockTransactionCount(client, args),
    getBytecode: (args) => getBytecode(client, args),
    getChainId: () => getChainId(client),
    getContractEvents: (args) => getContractEvents(client, args),
    getEnsAddress: (args) => getEnsAddress(client, args),
    getEnsAvatar: (args) => getEnsAvatar(client, args),
    getEnsName: (args) => getEnsName(client, args),
    getEnsResolver: (args) => getEnsResolver(client, args),
    getEnsText: (args) => getEnsText(client, args),
    getFeeHistory: (args) => getFeeHistory(client, args),
    estimateFeesPerGas: (args) => estimateFeesPerGas(client, args),
    getFilterChanges: (args) => getFilterChanges(client, args),
    getFilterLogs: (args) => getFilterLogs(client, args),
    getGasPrice: () => getGasPrice(client),
    getLogs: (args) => getLogs(client, args),
    getProof: (args) => getProof(client, args),
    estimateMaxPriorityFeePerGas: (args) => estimateMaxPriorityFeePerGas(client, args),
    getStorageAt: (args) => getStorageAt(client, args),
    getTransaction: (args) => getTransaction(client, args),
    getTransactionConfirmations: (args) => getTransactionConfirmations(client, args),
    getTransactionCount: (args) => getTransactionCount(client, args),
    getTransactionReceipt: (args) => getTransactionReceipt(client, args),
    multicall: (args) => multicall(client, args),
    prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
    readContract: (args) => readContract(client, args),
    sendRawTransaction: (args) => sendRawTransaction(client, args),
    simulateContract: (args) => simulateContract(client, args),
    verifyMessage: (args) => verifyMessage(client, args),
    verifyTypedData: (args) => verifyTypedData(client, args),
    uninstallFilter: (args) => uninstallFilter(client, args),
    waitForTransactionReceipt: (args) => waitForTransactionReceipt(client, args),
    watchBlocks: (args) => watchBlocks(client, args),
    watchBlockNumber: (args) => watchBlockNumber(client, args),
    watchContractEvent: (args) => watchContractEvent(client, args),
    watchEvent: (args) => watchEvent(client, args),
    watchPendingTransactions: (args) => watchPendingTransactions(client, args)
  };
}

// node_modules/viem/_esm/clients/createPublicClient.js
function createPublicClient(parameters) {
  const { key = "public", name = "Public Client" } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    type: "publicClient"
  });
  return client.extend(publicActions);
}
// node_modules/viem/_esm/actions/wallet/signMessage.js
init_parseAccount();
init_toHex();
async function signMessage(client, { account: account_ = client.account, message }) {
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/wallet/signMessage"
    });
  const account2 = parseAccount(account_);
  if (account2.type === "local")
    return account2.signMessage({ message });
  const message_ = (() => {
    if (typeof message === "string")
      return stringToHex(message);
    if (message.raw instanceof Uint8Array)
      return toHex(message.raw);
    return message.raw;
  })();
  return client.request({
    method: "personal_sign",
    params: [message_, account2.address]
  }, { retryCount: 0 });
}

// node_modules/viem/_esm/index.js
init_abi();
init_base();
init_node();
init_decodeErrorResult();
init_encodeAbiParameters();
init_encodeFunctionData();

// node_modules/viem/_esm/utils/signature/signatureToHex.js
init_secp256k1();
init_fromHex();
function signatureToHex({ r, s, v, yParity }) {
  const vHex = (() => {
    if (v === 27n || yParity === 0)
      return "1b";
    if (v === 28n || yParity === 1)
      return "1c";
    throw new Error("Invalid v value");
  })();
  return `0x${new secp256k1.Signature(hexToBigInt(r), hexToBigInt(s)).toCompactHex()}${vHex}`;
}

// node_modules/viem/_esm/index.js
init_toHex();
init_concat();
init_getAddress();
init_keccak256();
init_pad();
init_stringify();
// node_modules/viem/_esm/chains/definitions/sepolia.js
var sepolia = defineChain({
  id: 11155111,
  name: "Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
      apiUrl: "https://api-sepolia.etherscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 751532
    },
    ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
    ensUniversalResolver: {
      address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
      blockCreated: 5317080
    }
  },
  testnet: true
});
// src/common/constants.ts
var Network;
(function(Network2) {
  Network2[Network2["SEPOLIA"] = 0] = "SEPOLIA";
  Network2[Network2["VANAR_TESTNET"] = 1] = "VANAR_TESTNET";
})(Network || (Network = {}));
var vanarTestnet = defineChain({
  id: 78600,
  name: "Vanar Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "VANRY",
    symbol: "VANRY"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-vanguard.vanarchain.com/"],
      webSocket: ["wss://ws-vanguard.vanarchain.com/"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer-vanguard.vanarchain.com"
    }
  }
});
var NetworkChainMap = {
  [Network.SEPOLIA]: sepolia,
  [Network.VANAR_TESTNET]: vanarTestnet
};
var ADDRESS_TYPES;
(function(ADDRESS_TYPES2) {
  ADDRESS_TYPES2[ADDRESS_TYPES2["SIMPLE_ACCOUNT"] = 0] = "SIMPLE_ACCOUNT";
})(ADDRESS_TYPES || (ADDRESS_TYPES = {}));
var SIMPLE_ACCOUNT_FACTORY_ADDRESS_MAP = {
  [Network.VANAR_TESTNET]: {
    "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789": "0xeD08Bfd2478C9616f2E2F51F4f6b28D3EE16F99B",
    "0x0000000071727De22E5E9d8BAf0edAc6f37da032": "0x41f9E11556e0119E452dF67B2311EC46071ad6c7"
  },
  [Network.SEPOLIA]: {
    "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789": "0x9fd25AC3Ac6dfb00C4d11FA32E8454525bF4cFD0",
    "0x0000000071727De22E5E9d8BAf0edAc6f37da032": "0xe0e7da3f07745fa3c3b3c3d41db9ea8d7c514633"
  }
};
var SIMPLE_ACCOUNT_FACTORY_V7_ADDRESS_MAP = {
  [Network.VANAR_TESTNET]: "0x41f9E11556e0119E452dF67B2311EC46071ad6c7"
};
var ADDRESS_FACTORY_MAP = {
  [ADDRESS_TYPES.SIMPLE_ACCOUNT]: SIMPLE_ACCOUNT_FACTORY_ADDRESS_MAP
};
var PUBLIC_RPC = {
  [Network.VANAR_TESTNET]: "https://rpca-vanguard.vanarchain.com/"
};
var PUBLIC_RPC_MAP = {
  [Network.SEPOLIA]: "https://rpc.ankr.com/eth_sepolia"
};
var PUBLIC_BUNDLER_MAP = {
  [Network.SEPOLIA]: "https://public.stackup.sh/api/v1/node/ethereum-sepolia"
};

// node_modules/@scure/bip39/esm/wordlists/czech.js
var wordlist = `abdikace
abeceda
adresa
agrese
akce
aktovka
alej
alkohol
amputace
ananas
andulka
anekdota
anketa
antika
anulovat
archa
arogance
asfalt
asistent
aspirace
astma
astronom
atlas
atletika
atol
autobus
azyl
babka
bachor
bacil
baculka
badatel
bageta
bagr
bahno
bakterie
balada
baletka
balkon
balonek
balvan
balza
bambus
bankomat
barbar
baret
barman
baroko
barva
baterka
batoh
bavlna
bazalka
bazilika
bazuka
bedna
beran
beseda
bestie
beton
bezinka
bezmoc
beztak
bicykl
bidlo
biftek
bikiny
bilance
biograf
biolog
bitva
bizon
blahobyt
blatouch
blecha
bledule
blesk
blikat
blizna
blokovat
bloudit
blud
bobek
bobr
bodlina
bodnout
bohatost
bojkot
bojovat
bokorys
bolest
borec
borovice
bota
boubel
bouchat
bouda
boule
bourat
boxer
bradavka
brambora
branka
bratr
brepta
briketa
brko
brloh
bronz
broskev
brunetka
brusinka
brzda
brzy
bublina
bubnovat
buchta
buditel
budka
budova
bufet
bujarost
bukvice
buldok
bulva
bunda
bunkr
burza
butik
buvol
buzola
bydlet
bylina
bytovka
bzukot
capart
carevna
cedr
cedule
cejch
cejn
cela
celer
celkem
celnice
cenina
cennost
cenovka
centrum
cenzor
cestopis
cetka
chalupa
chapadlo
charita
chata
chechtat
chemie
chichot
chirurg
chlad
chleba
chlubit
chmel
chmura
chobot
chochol
chodba
cholera
chomout
chopit
choroba
chov
chrapot
chrlit
chrt
chrup
chtivost
chudina
chutnat
chvat
chvilka
chvost
chyba
chystat
chytit
cibule
cigareta
cihelna
cihla
cinkot
cirkus
cisterna
citace
citrus
cizinec
cizost
clona
cokoliv
couvat
ctitel
ctnost
cudnost
cuketa
cukr
cupot
cvaknout
cval
cvik
cvrkot
cyklista
daleko
dareba
datel
datum
dcera
debata
dechovka
decibel
deficit
deflace
dekl
dekret
demokrat
deprese
derby
deska
detektiv
dikobraz
diktovat
dioda
diplom
disk
displej
divadlo
divoch
dlaha
dlouho
dluhopis
dnes
dobro
dobytek
docent
dochutit
dodnes
dohled
dohoda
dohra
dojem
dojnice
doklad
dokola
doktor
dokument
dolar
doleva
dolina
doma
dominant
domluvit
domov
donutit
dopad
dopis
doplnit
doposud
doprovod
dopustit
dorazit
dorost
dort
dosah
doslov
dostatek
dosud
dosyta
dotaz
dotek
dotknout
doufat
doutnat
dovozce
dozadu
doznat
dozorce
drahota
drak
dramatik
dravec
draze
drdol
drobnost
drogerie
drozd
drsnost
drtit
drzost
duben
duchovno
dudek
duha
duhovka
dusit
dusno
dutost
dvojice
dvorec
dynamit
ekolog
ekonomie
elektron
elipsa
email
emise
emoce
empatie
epizoda
epocha
epopej
epos
esej
esence
eskorta
eskymo
etiketa
euforie
evoluce
exekuce
exkurze
expedice
exploze
export
extrakt
facka
fajfka
fakulta
fanatik
fantazie
farmacie
favorit
fazole
federace
fejeton
fenka
fialka
figurant
filozof
filtr
finance
finta
fixace
fjord
flanel
flirt
flotila
fond
fosfor
fotbal
fotka
foton
frakce
freska
fronta
fukar
funkce
fyzika
galeje
garant
genetika
geolog
gilotina
glazura
glejt
golem
golfista
gotika
graf
gramofon
granule
grep
gril
grog
groteska
guma
hadice
hadr
hala
halenka
hanba
hanopis
harfa
harpuna
havran
hebkost
hejkal
hejno
hejtman
hektar
helma
hematom
herec
herna
heslo
hezky
historik
hladovka
hlasivky
hlava
hledat
hlen
hlodavec
hloh
hloupost
hltat
hlubina
hluchota
hmat
hmota
hmyz
hnis
hnojivo
hnout
hoblina
hoboj
hoch
hodiny
hodlat
hodnota
hodovat
hojnost
hokej
holinka
holka
holub
homole
honitba
honorace
horal
horda
horizont
horko
horlivec
hormon
hornina
horoskop
horstvo
hospoda
hostina
hotovost
houba
houf
houpat
houska
hovor
hradba
hranice
hravost
hrazda
hrbolek
hrdina
hrdlo
hrdost
hrnek
hrobka
hromada
hrot
hrouda
hrozen
hrstka
hrubost
hryzat
hubenost
hubnout
hudba
hukot
humr
husita
hustota
hvozd
hybnost
hydrant
hygiena
hymna
hysterik
idylka
ihned
ikona
iluze
imunita
infekce
inflace
inkaso
inovace
inspekce
internet
invalida
investor
inzerce
ironie
jablko
jachta
jahoda
jakmile
jakost
jalovec
jantar
jarmark
jaro
jasan
jasno
jatka
javor
jazyk
jedinec
jedle
jednatel
jehlan
jekot
jelen
jelito
jemnost
jenom
jepice
jeseter
jevit
jezdec
jezero
jinak
jindy
jinoch
jiskra
jistota
jitrnice
jizva
jmenovat
jogurt
jurta
kabaret
kabel
kabinet
kachna
kadet
kadidlo
kahan
kajak
kajuta
kakao
kaktus
kalamita
kalhoty
kalibr
kalnost
kamera
kamkoliv
kamna
kanibal
kanoe
kantor
kapalina
kapela
kapitola
kapka
kaple
kapota
kapr
kapusta
kapybara
karamel
karotka
karton
kasa
katalog
katedra
kauce
kauza
kavalec
kazajka
kazeta
kazivost
kdekoliv
kdesi
kedluben
kemp
keramika
kino
klacek
kladivo
klam
klapot
klasika
klaun
klec
klenba
klepat
klesnout
klid
klima
klisna
klobouk
klokan
klopa
kloub
klubovna
klusat
kluzkost
kmen
kmitat
kmotr
kniha
knot
koalice
koberec
kobka
kobliha
kobyla
kocour
kohout
kojenec
kokos
koktejl
kolaps
koleda
kolize
kolo
komando
kometa
komik
komnata
komora
kompas
komunita
konat
koncept
kondice
konec
konfese
kongres
konina
konkurs
kontakt
konzerva
kopanec
kopie
kopnout
koprovka
korbel
korektor
kormidlo
koroptev
korpus
koruna
koryto
korzet
kosatec
kostka
kotel
kotleta
kotoul
koukat
koupelna
kousek
kouzlo
kovboj
koza
kozoroh
krabice
krach
krajina
kralovat
krasopis
kravata
kredit
krejcar
kresba
kreveta
kriket
kritik
krize
krkavec
krmelec
krmivo
krocan
krok
kronika
kropit
kroupa
krovka
krtek
kruhadlo
krupice
krutost
krvinka
krychle
krypta
krystal
kryt
kudlanka
kufr
kujnost
kukla
kulajda
kulich
kulka
kulomet
kultura
kuna
kupodivu
kurt
kurzor
kutil
kvalita
kvasinka
kvestor
kynolog
kyselina
kytara
kytice
kytka
kytovec
kyvadlo
labrador
lachtan
ladnost
laik
lakomec
lamela
lampa
lanovka
lasice
laso
lastura
latinka
lavina
lebka
leckdy
leden
lednice
ledovka
ledvina
legenda
legie
legrace
lehce
lehkost
lehnout
lektvar
lenochod
lentilka
lepenka
lepidlo
letadlo
letec
letmo
letokruh
levhart
levitace
levobok
libra
lichotka
lidojed
lidskost
lihovina
lijavec
lilek
limetka
linie
linka
linoleum
listopad
litina
litovat
lobista
lodivod
logika
logoped
lokalita
loket
lomcovat
lopata
lopuch
lord
losos
lotr
loudal
louh
louka
louskat
lovec
lstivost
lucerna
lucifer
lump
lusk
lustrace
lvice
lyra
lyrika
lysina
madam
madlo
magistr
mahagon
majetek
majitel
majorita
makak
makovice
makrela
malba
malina
malovat
malvice
maminka
mandle
manko
marnost
masakr
maskot
masopust
matice
matrika
maturita
mazanec
mazivo
mazlit
mazurka
mdloba
mechanik
meditace
medovina
melasa
meloun
mentolka
metla
metoda
metr
mezera
migrace
mihnout
mihule
mikina
mikrofon
milenec
milimetr
milost
mimika
mincovna
minibar
minomet
minulost
miska
mistr
mixovat
mladost
mlha
mlhovina
mlok
mlsat
mluvit
mnich
mnohem
mobil
mocnost
modelka
modlitba
mohyla
mokro
molekula
momentka
monarcha
monokl
monstrum
montovat
monzun
mosaz
moskyt
most
motivace
motorka
motyka
moucha
moudrost
mozaika
mozek
mozol
mramor
mravenec
mrkev
mrtvola
mrzet
mrzutost
mstitel
mudrc
muflon
mulat
mumie
munice
muset
mutace
muzeum
muzikant
myslivec
mzda
nabourat
nachytat
nadace
nadbytek
nadhoz
nadobro
nadpis
nahlas
nahnat
nahodile
nahradit
naivita
najednou
najisto
najmout
naklonit
nakonec
nakrmit
nalevo
namazat
namluvit
nanometr
naoko
naopak
naostro
napadat
napevno
naplnit
napnout
naposled
naprosto
narodit
naruby
narychlo
nasadit
nasekat
naslepo
nastat
natolik
navenek
navrch
navzdory
nazvat
nebe
nechat
necky
nedaleko
nedbat
neduh
negace
nehet
nehoda
nejen
nejprve
neklid
nelibost
nemilost
nemoc
neochota
neonka
nepokoj
nerost
nerv
nesmysl
nesoulad
netvor
neuron
nevina
nezvykle
nicota
nijak
nikam
nikdy
nikl
nikterak
nitro
nocleh
nohavice
nominace
nora
norek
nositel
nosnost
nouze
noviny
novota
nozdra
nuda
nudle
nuget
nutit
nutnost
nutrie
nymfa
obal
obarvit
obava
obdiv
obec
obehnat
obejmout
obezita
obhajoba
obilnice
objasnit
objekt
obklopit
oblast
oblek
obliba
obloha
obluda
obnos
obohatit
obojek
obout
obrazec
obrna
obruba
obrys
obsah
obsluha
obstarat
obuv
obvaz
obvinit
obvod
obvykle
obyvatel
obzor
ocas
ocel
ocenit
ochladit
ochota
ochrana
ocitnout
odboj
odbyt
odchod
odcizit
odebrat
odeslat
odevzdat
odezva
odhadce
odhodit
odjet
odjinud
odkaz
odkoupit
odliv
odluka
odmlka
odolnost
odpad
odpis
odplout
odpor
odpustit
odpykat
odrazka
odsoudit
odstup
odsun
odtok
odtud
odvaha
odveta
odvolat
odvracet
odznak
ofina
ofsajd
ohlas
ohnisko
ohrada
ohrozit
ohryzek
okap
okenice
oklika
okno
okouzlit
okovy
okrasa
okres
okrsek
okruh
okupant
okurka
okusit
olejnina
olizovat
omak
omeleta
omezit
omladina
omlouvat
omluva
omyl
onehdy
opakovat
opasek
operace
opice
opilost
opisovat
opora
opozice
opravdu
oproti
orbital
orchestr
orgie
orlice
orloj
ortel
osada
oschnout
osika
osivo
oslava
oslepit
oslnit
oslovit
osnova
osoba
osolit
ospalec
osten
ostraha
ostuda
ostych
osvojit
oteplit
otisk
otop
otrhat
otrlost
otrok
otruby
otvor
ovanout
ovar
oves
ovlivnit
ovoce
oxid
ozdoba
pachatel
pacient
padouch
pahorek
pakt
palanda
palec
palivo
paluba
pamflet
pamlsek
panenka
panika
panna
panovat
panstvo
pantofle
paprika
parketa
parodie
parta
paruka
paryba
paseka
pasivita
pastelka
patent
patrona
pavouk
pazneht
pazourek
pecka
pedagog
pejsek
peklo
peloton
penalta
pendrek
penze
periskop
pero
pestrost
petarda
petice
petrolej
pevnina
pexeso
pianista
piha
pijavice
pikle
piknik
pilina
pilnost
pilulka
pinzeta
pipeta
pisatel
pistole
pitevna
pivnice
pivovar
placenta
plakat
plamen
planeta
plastika
platit
plavidlo
plaz
plech
plemeno
plenta
ples
pletivo
plevel
plivat
plnit
plno
plocha
plodina
plomba
plout
pluk
plyn
pobavit
pobyt
pochod
pocit
poctivec
podat
podcenit
podepsat
podhled
podivit
podklad
podmanit
podnik
podoba
podpora
podraz
podstata
podvod
podzim
poezie
pohanka
pohnutka
pohovor
pohroma
pohyb
pointa
pojistka
pojmout
pokazit
pokles
pokoj
pokrok
pokuta
pokyn
poledne
polibek
polknout
poloha
polynom
pomalu
pominout
pomlka
pomoc
pomsta
pomyslet
ponechat
ponorka
ponurost
popadat
popel
popisek
poplach
poprosit
popsat
popud
poradce
porce
porod
porucha
poryv
posadit
posed
posila
poskok
poslanec
posoudit
pospolu
postava
posudek
posyp
potah
potkan
potlesk
potomek
potrava
potupa
potvora
poukaz
pouto
pouzdro
povaha
povidla
povlak
povoz
povrch
povstat
povyk
povzdech
pozdrav
pozemek
poznatek
pozor
pozvat
pracovat
prahory
praktika
prales
praotec
praporek
prase
pravda
princip
prkno
probudit
procento
prodej
profese
prohra
projekt
prolomit
promile
pronikat
propad
prorok
prosba
proton
proutek
provaz
prskavka
prsten
prudkost
prut
prvek
prvohory
psanec
psovod
pstruh
ptactvo
puberta
puch
pudl
pukavec
puklina
pukrle
pult
pumpa
punc
pupen
pusa
pusinka
pustina
putovat
putyka
pyramida
pysk
pytel
racek
rachot
radiace
radnice
radon
raft
ragby
raketa
rakovina
rameno
rampouch
rande
rarach
rarita
rasovna
rastr
ratolest
razance
razidlo
reagovat
reakce
recept
redaktor
referent
reflex
rejnok
reklama
rekord
rekrut
rektor
reputace
revize
revma
revolver
rezerva
riskovat
riziko
robotika
rodokmen
rohovka
rokle
rokoko
romaneto
ropovod
ropucha
rorejs
rosol
rostlina
rotmistr
rotoped
rotunda
roubenka
roucho
roup
roura
rovina
rovnice
rozbor
rozchod
rozdat
rozeznat
rozhodce
rozinka
rozjezd
rozkaz
rozloha
rozmar
rozpad
rozruch
rozsah
roztok
rozum
rozvod
rubrika
ruchadlo
rukavice
rukopis
ryba
rybolov
rychlost
rydlo
rypadlo
rytina
ryzost
sadista
sahat
sako
samec
samizdat
samota
sanitka
sardinka
sasanka
satelit
sazba
sazenice
sbor
schovat
sebranka
secese
sedadlo
sediment
sedlo
sehnat
sejmout
sekera
sekta
sekunda
sekvoje
semeno
seno
servis
sesadit
seshora
seskok
seslat
sestra
sesuv
sesypat
setba
setina
setkat
setnout
setrvat
sever
seznam
shoda
shrnout
sifon
silnice
sirka
sirotek
sirup
situace
skafandr
skalisko
skanzen
skaut
skeptik
skica
skladba
sklenice
sklo
skluz
skoba
skokan
skoro
skripta
skrz
skupina
skvost
skvrna
slabika
sladidlo
slanina
slast
slavnost
sledovat
slepec
sleva
slezina
slib
slina
sliznice
slon
sloupek
slovo
sluch
sluha
slunce
slupka
slza
smaragd
smetana
smilstvo
smlouva
smog
smrad
smrk
smrtka
smutek
smysl
snad
snaha
snob
sobota
socha
sodovka
sokol
sopka
sotva
souboj
soucit
soudce
souhlas
soulad
soumrak
souprava
soused
soutok
souviset
spalovna
spasitel
spis
splav
spodek
spojenec
spolu
sponzor
spornost
spousta
sprcha
spustit
sranda
sraz
srdce
srna
srnec
srovnat
srpen
srst
srub
stanice
starosta
statika
stavba
stehno
stezka
stodola
stolek
stopa
storno
stoupat
strach
stres
strhnout
strom
struna
studna
stupnice
stvol
styk
subjekt
subtropy
suchar
sudost
sukno
sundat
sunout
surikata
surovina
svah
svalstvo
svetr
svatba
svazek
svisle
svitek
svoboda
svodidlo
svorka
svrab
sykavka
sykot
synek
synovec
sypat
sypkost
syrovost
sysel
sytost
tabletka
tabule
tahoun
tajemno
tajfun
tajga
tajit
tajnost
taktika
tamhle
tampon
tancovat
tanec
tanker
tapeta
tavenina
tazatel
technika
tehdy
tekutina
telefon
temnota
tendence
tenista
tenor
teplota
tepna
teprve
terapie
termoska
textil
ticho
tiskopis
titulek
tkadlec
tkanina
tlapka
tleskat
tlukot
tlupa
tmel
toaleta
topinka
topol
torzo
touha
toulec
tradice
traktor
tramp
trasa
traverza
trefit
trest
trezor
trhavina
trhlina
trochu
trojice
troska
trouba
trpce
trpitel
trpkost
trubec
truchlit
truhlice
trus
trvat
tudy
tuhnout
tuhost
tundra
turista
turnaj
tuzemsko
tvaroh
tvorba
tvrdost
tvrz
tygr
tykev
ubohost
uboze
ubrat
ubrousek
ubrus
ubytovna
ucho
uctivost
udivit
uhradit
ujednat
ujistit
ujmout
ukazatel
uklidnit
uklonit
ukotvit
ukrojit
ulice
ulita
ulovit
umyvadlo
unavit
uniforma
uniknout
upadnout
uplatnit
uplynout
upoutat
upravit
uran
urazit
usednout
usilovat
usmrtit
usnadnit
usnout
usoudit
ustlat
ustrnout
utahovat
utkat
utlumit
utonout
utopenec
utrousit
uvalit
uvolnit
uvozovka
uzdravit
uzel
uzenina
uzlina
uznat
vagon
valcha
valoun
vana
vandal
vanilka
varan
varhany
varovat
vcelku
vchod
vdova
vedro
vegetace
vejce
velbloud
veletrh
velitel
velmoc
velryba
venkov
veranda
verze
veselka
veskrze
vesnice
vespodu
vesta
veterina
veverka
vibrace
vichr
videohra
vidina
vidle
vila
vinice
viset
vitalita
vize
vizitka
vjezd
vklad
vkus
vlajka
vlak
vlasec
vlevo
vlhkost
vliv
vlnovka
vloupat
vnucovat
vnuk
voda
vodivost
vodoznak
vodstvo
vojensky
vojna
vojsko
volant
volba
volit
volno
voskovka
vozidlo
vozovna
vpravo
vrabec
vracet
vrah
vrata
vrba
vrcholek
vrhat
vrstva
vrtule
vsadit
vstoupit
vstup
vtip
vybavit
vybrat
vychovat
vydat
vydra
vyfotit
vyhledat
vyhnout
vyhodit
vyhradit
vyhubit
vyjasnit
vyjet
vyjmout
vyklopit
vykonat
vylekat
vymazat
vymezit
vymizet
vymyslet
vynechat
vynikat
vynutit
vypadat
vyplatit
vypravit
vypustit
vyrazit
vyrovnat
vyrvat
vyslovit
vysoko
vystavit
vysunout
vysypat
vytasit
vytesat
vytratit
vyvinout
vyvolat
vyvrhel
vyzdobit
vyznat
vzadu
vzbudit
vzchopit
vzdor
vzduch
vzdychat
vzestup
vzhledem
vzkaz
vzlykat
vznik
vzorek
vzpoura
vztah
vztek
xylofon
zabrat
zabydlet
zachovat
zadarmo
zadusit
zafoukat
zahltit
zahodit
zahrada
zahynout
zajatec
zajet
zajistit
zaklepat
zakoupit
zalepit
zamezit
zamotat
zamyslet
zanechat
zanikat
zaplatit
zapojit
zapsat
zarazit
zastavit
zasunout
zatajit
zatemnit
zatknout
zaujmout
zavalit
zavelet
zavinit
zavolat
zavrtat
zazvonit
zbavit
zbrusu
zbudovat
zbytek
zdaleka
zdarma
zdatnost
zdivo
zdobit
zdroj
zdvih
zdymadlo
zelenina
zeman
zemina
zeptat
zezadu
zezdola
zhatit
zhltnout
zhluboka
zhotovit
zhruba
zima
zimnice
zjemnit
zklamat
zkoumat
zkratka
zkumavka
zlato
zlehka
zloba
zlom
zlost
zlozvyk
zmapovat
zmar
zmatek
zmije
zmizet
zmocnit
zmodrat
zmrzlina
zmutovat
znak
znalost
znamenat
znovu
zobrazit
zotavit
zoubek
zoufale
zplodit
zpomalit
zprava
zprostit
zprudka
zprvu
zrada
zranit
zrcadlo
zrnitost
zrno
zrovna
zrychlit
zrzavost
zticha
ztratit
zubovina
zubr
zvednout
zvenku
zvesela
zvon
zvrat
zvukovod
zvyk`.split("\n");
// node_modules/@scure/bip39/esm/wordlists/english.js
var wordlist2 = `abandon
ability
able
about
above
absent
absorb
abstract
absurd
abuse
access
accident
account
accuse
achieve
acid
acoustic
acquire
across
act
action
actor
actress
actual
adapt
add
addict
address
adjust
admit
adult
advance
advice
aerobic
affair
afford
afraid
again
age
agent
agree
ahead
aim
air
airport
aisle
alarm
album
alcohol
alert
alien
all
alley
allow
almost
alone
alpha
already
also
alter
always
amateur
amazing
among
amount
amused
analyst
anchor
ancient
anger
angle
angry
animal
ankle
announce
annual
another
answer
antenna
antique
anxiety
any
apart
apology
appear
apple
approve
april
arch
arctic
area
arena
argue
arm
armed
armor
army
around
arrange
arrest
arrive
arrow
art
artefact
artist
artwork
ask
aspect
assault
asset
assist
assume
asthma
athlete
atom
attack
attend
attitude
attract
auction
audit
august
aunt
author
auto
autumn
average
avocado
avoid
awake
aware
away
awesome
awful
awkward
axis
baby
bachelor
bacon
badge
bag
balance
balcony
ball
bamboo
banana
banner
bar
barely
bargain
barrel
base
basic
basket
battle
beach
bean
beauty
because
become
beef
before
begin
behave
behind
believe
below
belt
bench
benefit
best
betray
better
between
beyond
bicycle
bid
bike
bind
biology
bird
birth
bitter
black
blade
blame
blanket
blast
bleak
bless
blind
blood
blossom
blouse
blue
blur
blush
board
boat
body
boil
bomb
bone
bonus
book
boost
border
boring
borrow
boss
bottom
bounce
box
boy
bracket
brain
brand
brass
brave
bread
breeze
brick
bridge
brief
bright
bring
brisk
broccoli
broken
bronze
broom
brother
brown
brush
bubble
buddy
budget
buffalo
build
bulb
bulk
bullet
bundle
bunker
burden
burger
burst
bus
business
busy
butter
buyer
buzz
cabbage
cabin
cable
cactus
cage
cake
call
calm
camera
camp
can
canal
cancel
candy
cannon
canoe
canvas
canyon
capable
capital
captain
car
carbon
card
cargo
carpet
carry
cart
case
cash
casino
castle
casual
cat
catalog
catch
category
cattle
caught
cause
caution
cave
ceiling
celery
cement
census
century
cereal
certain
chair
chalk
champion
change
chaos
chapter
charge
chase
chat
cheap
check
cheese
chef
cherry
chest
chicken
chief
child
chimney
choice
choose
chronic
chuckle
chunk
churn
cigar
cinnamon
circle
citizen
city
civil
claim
clap
clarify
claw
clay
clean
clerk
clever
click
client
cliff
climb
clinic
clip
clock
clog
close
cloth
cloud
clown
club
clump
cluster
clutch
coach
coast
coconut
code
coffee
coil
coin
collect
color
column
combine
come
comfort
comic
common
company
concert
conduct
confirm
congress
connect
consider
control
convince
cook
cool
copper
copy
coral
core
corn
correct
cost
cotton
couch
country
couple
course
cousin
cover
coyote
crack
cradle
craft
cram
crane
crash
crater
crawl
crazy
cream
credit
creek
crew
cricket
crime
crisp
critic
crop
cross
crouch
crowd
crucial
cruel
cruise
crumble
crunch
crush
cry
crystal
cube
culture
cup
cupboard
curious
current
curtain
curve
cushion
custom
cute
cycle
dad
damage
damp
dance
danger
daring
dash
daughter
dawn
day
deal
debate
debris
decade
december
decide
decline
decorate
decrease
deer
defense
define
defy
degree
delay
deliver
demand
demise
denial
dentist
deny
depart
depend
deposit
depth
deputy
derive
describe
desert
design
desk
despair
destroy
detail
detect
develop
device
devote
diagram
dial
diamond
diary
dice
diesel
diet
differ
digital
dignity
dilemma
dinner
dinosaur
direct
dirt
disagree
discover
disease
dish
dismiss
disorder
display
distance
divert
divide
divorce
dizzy
doctor
document
dog
doll
dolphin
domain
donate
donkey
donor
door
dose
double
dove
draft
dragon
drama
drastic
draw
dream
dress
drift
drill
drink
drip
drive
drop
drum
dry
duck
dumb
dune
during
dust
dutch
duty
dwarf
dynamic
eager
eagle
early
earn
earth
easily
east
easy
echo
ecology
economy
edge
edit
educate
effort
egg
eight
either
elbow
elder
electric
elegant
element
elephant
elevator
elite
else
embark
embody
embrace
emerge
emotion
employ
empower
empty
enable
enact
end
endless
endorse
enemy
energy
enforce
engage
engine
enhance
enjoy
enlist
enough
enrich
enroll
ensure
enter
entire
entry
envelope
episode
equal
equip
era
erase
erode
erosion
error
erupt
escape
essay
essence
estate
eternal
ethics
evidence
evil
evoke
evolve
exact
example
excess
exchange
excite
exclude
excuse
execute
exercise
exhaust
exhibit
exile
exist
exit
exotic
expand
expect
expire
explain
expose
express
extend
extra
eye
eyebrow
fabric
face
faculty
fade
faint
faith
fall
false
fame
family
famous
fan
fancy
fantasy
farm
fashion
fat
fatal
father
fatigue
fault
favorite
feature
february
federal
fee
feed
feel
female
fence
festival
fetch
fever
few
fiber
fiction
field
figure
file
film
filter
final
find
fine
finger
finish
fire
firm
first
fiscal
fish
fit
fitness
fix
flag
flame
flash
flat
flavor
flee
flight
flip
float
flock
floor
flower
fluid
flush
fly
foam
focus
fog
foil
fold
follow
food
foot
force
forest
forget
fork
fortune
forum
forward
fossil
foster
found
fox
fragile
frame
frequent
fresh
friend
fringe
frog
front
frost
frown
frozen
fruit
fuel
fun
funny
furnace
fury
future
gadget
gain
galaxy
gallery
game
gap
garage
garbage
garden
garlic
garment
gas
gasp
gate
gather
gauge
gaze
general
genius
genre
gentle
genuine
gesture
ghost
giant
gift
giggle
ginger
giraffe
girl
give
glad
glance
glare
glass
glide
glimpse
globe
gloom
glory
glove
glow
glue
goat
goddess
gold
good
goose
gorilla
gospel
gossip
govern
gown
grab
grace
grain
grant
grape
grass
gravity
great
green
grid
grief
grit
grocery
group
grow
grunt
guard
guess
guide
guilt
guitar
gun
gym
habit
hair
half
hammer
hamster
hand
happy
harbor
hard
harsh
harvest
hat
have
hawk
hazard
head
health
heart
heavy
hedgehog
height
hello
helmet
help
hen
hero
hidden
high
hill
hint
hip
hire
history
hobby
hockey
hold
hole
holiday
hollow
home
honey
hood
hope
horn
horror
horse
hospital
host
hotel
hour
hover
hub
huge
human
humble
humor
hundred
hungry
hunt
hurdle
hurry
hurt
husband
hybrid
ice
icon
idea
identify
idle
ignore
ill
illegal
illness
image
imitate
immense
immune
impact
impose
improve
impulse
inch
include
income
increase
index
indicate
indoor
industry
infant
inflict
inform
inhale
inherit
initial
inject
injury
inmate
inner
innocent
input
inquiry
insane
insect
inside
inspire
install
intact
interest
into
invest
invite
involve
iron
island
isolate
issue
item
ivory
jacket
jaguar
jar
jazz
jealous
jeans
jelly
jewel
job
join
joke
journey
joy
judge
juice
jump
jungle
junior
junk
just
kangaroo
keen
keep
ketchup
key
kick
kid
kidney
kind
kingdom
kiss
kit
kitchen
kite
kitten
kiwi
knee
knife
knock
know
lab
label
labor
ladder
lady
lake
lamp
language
laptop
large
later
latin
laugh
laundry
lava
law
lawn
lawsuit
layer
lazy
leader
leaf
learn
leave
lecture
left
leg
legal
legend
leisure
lemon
lend
length
lens
leopard
lesson
letter
level
liar
liberty
library
license
life
lift
light
like
limb
limit
link
lion
liquid
list
little
live
lizard
load
loan
lobster
local
lock
logic
lonely
long
loop
lottery
loud
lounge
love
loyal
lucky
luggage
lumber
lunar
lunch
luxury
lyrics
machine
mad
magic
magnet
maid
mail
main
major
make
mammal
man
manage
mandate
mango
mansion
manual
maple
marble
march
margin
marine
market
marriage
mask
mass
master
match
material
math
matrix
matter
maximum
maze
meadow
mean
measure
meat
mechanic
medal
media
melody
melt
member
memory
mention
menu
mercy
merge
merit
merry
mesh
message
metal
method
middle
midnight
milk
million
mimic
mind
minimum
minor
minute
miracle
mirror
misery
miss
mistake
mix
mixed
mixture
mobile
model
modify
mom
moment
monitor
monkey
monster
month
moon
moral
more
morning
mosquito
mother
motion
motor
mountain
mouse
move
movie
much
muffin
mule
multiply
muscle
museum
mushroom
music
must
mutual
myself
mystery
myth
naive
name
napkin
narrow
nasty
nation
nature
near
neck
need
negative
neglect
neither
nephew
nerve
nest
net
network
neutral
never
news
next
nice
night
noble
noise
nominee
noodle
normal
north
nose
notable
note
nothing
notice
novel
now
nuclear
number
nurse
nut
oak
obey
object
oblige
obscure
observe
obtain
obvious
occur
ocean
october
odor
off
offer
office
often
oil
okay
old
olive
olympic
omit
once
one
onion
online
only
open
opera
opinion
oppose
option
orange
orbit
orchard
order
ordinary
organ
orient
original
orphan
ostrich
other
outdoor
outer
output
outside
oval
oven
over
own
owner
oxygen
oyster
ozone
pact
paddle
page
pair
palace
palm
panda
panel
panic
panther
paper
parade
parent
park
parrot
party
pass
patch
path
patient
patrol
pattern
pause
pave
payment
peace
peanut
pear
peasant
pelican
pen
penalty
pencil
people
pepper
perfect
permit
person
pet
phone
photo
phrase
physical
piano
picnic
picture
piece
pig
pigeon
pill
pilot
pink
pioneer
pipe
pistol
pitch
pizza
place
planet
plastic
plate
play
please
pledge
pluck
plug
plunge
poem
poet
point
polar
pole
police
pond
pony
pool
popular
portion
position
possible
post
potato
pottery
poverty
powder
power
practice
praise
predict
prefer
prepare
present
pretty
prevent
price
pride
primary
print
priority
prison
private
prize
problem
process
produce
profit
program
project
promote
proof
property
prosper
protect
proud
provide
public
pudding
pull
pulp
pulse
pumpkin
punch
pupil
puppy
purchase
purity
purpose
purse
push
put
puzzle
pyramid
quality
quantum
quarter
question
quick
quit
quiz
quote
rabbit
raccoon
race
rack
radar
radio
rail
rain
raise
rally
ramp
ranch
random
range
rapid
rare
rate
rather
raven
raw
razor
ready
real
reason
rebel
rebuild
recall
receive
recipe
record
recycle
reduce
reflect
reform
refuse
region
regret
regular
reject
relax
release
relief
rely
remain
remember
remind
remove
render
renew
rent
reopen
repair
repeat
replace
report
require
rescue
resemble
resist
resource
response
result
retire
retreat
return
reunion
reveal
review
reward
rhythm
rib
ribbon
rice
rich
ride
ridge
rifle
right
rigid
ring
riot
ripple
risk
ritual
rival
river
road
roast
robot
robust
rocket
romance
roof
rookie
room
rose
rotate
rough
round
route
royal
rubber
rude
rug
rule
run
runway
rural
sad
saddle
sadness
safe
sail
salad
salmon
salon
salt
salute
same
sample
sand
satisfy
satoshi
sauce
sausage
save
say
scale
scan
scare
scatter
scene
scheme
school
science
scissors
scorpion
scout
scrap
screen
script
scrub
sea
search
season
seat
second
secret
section
security
seed
seek
segment
select
sell
seminar
senior
sense
sentence
series
service
session
settle
setup
seven
shadow
shaft
shallow
share
shed
shell
sheriff
shield
shift
shine
ship
shiver
shock
shoe
shoot
shop
short
shoulder
shove
shrimp
shrug
shuffle
shy
sibling
sick
side
siege
sight
sign
silent
silk
silly
silver
similar
simple
since
sing
siren
sister
situate
six
size
skate
sketch
ski
skill
skin
skirt
skull
slab
slam
sleep
slender
slice
slide
slight
slim
slogan
slot
slow
slush
small
smart
smile
smoke
smooth
snack
snake
snap
sniff
snow
soap
soccer
social
sock
soda
soft
solar
soldier
solid
solution
solve
someone
song
soon
sorry
sort
soul
sound
soup
source
south
space
spare
spatial
spawn
speak
special
speed
spell
spend
sphere
spice
spider
spike
spin
spirit
split
spoil
sponsor
spoon
sport
spot
spray
spread
spring
spy
square
squeeze
squirrel
stable
stadium
staff
stage
stairs
stamp
stand
start
state
stay
steak
steel
stem
step
stereo
stick
still
sting
stock
stomach
stone
stool
story
stove
strategy
street
strike
strong
struggle
student
stuff
stumble
style
subject
submit
subway
success
such
sudden
suffer
sugar
suggest
suit
summer
sun
sunny
sunset
super
supply
supreme
sure
surface
surge
surprise
surround
survey
suspect
sustain
swallow
swamp
swap
swarm
swear
sweet
swift
swim
swing
switch
sword
symbol
symptom
syrup
system
table
tackle
tag
tail
talent
talk
tank
tape
target
task
taste
tattoo
taxi
teach
team
tell
ten
tenant
tennis
tent
term
test
text
thank
that
theme
then
theory
there
they
thing
this
thought
three
thrive
throw
thumb
thunder
ticket
tide
tiger
tilt
timber
time
tiny
tip
tired
tissue
title
toast
tobacco
today
toddler
toe
together
toilet
token
tomato
tomorrow
tone
tongue
tonight
tool
tooth
top
topic
topple
torch
tornado
tortoise
toss
total
tourist
toward
tower
town
toy
track
trade
traffic
tragic
train
transfer
trap
trash
travel
tray
treat
tree
trend
trial
tribe
trick
trigger
trim
trip
trophy
trouble
truck
true
truly
trumpet
trust
truth
try
tube
tuition
tumble
tuna
tunnel
turkey
turn
turtle
twelve
twenty
twice
twin
twist
two
type
typical
ugly
umbrella
unable
unaware
uncle
uncover
under
undo
unfair
unfold
unhappy
uniform
unique
unit
universe
unknown
unlock
until
unusual
unveil
update
upgrade
uphold
upon
upper
upset
urban
urge
usage
use
used
useful
useless
usual
utility
vacant
vacuum
vague
valid
valley
valve
van
vanish
vapor
various
vast
vault
vehicle
velvet
vendor
venture
venue
verb
verify
version
very
vessel
veteran
viable
vibrant
vicious
victory
video
view
village
vintage
violin
virtual
virus
visa
visit
visual
vital
vivid
vocal
voice
void
volcano
volume
vote
voyage
wage
wagon
wait
walk
wall
walnut
want
warfare
warm
warrior
wash
wasp
waste
water
wave
way
wealth
weapon
wear
weasel
weather
web
wedding
weekend
weird
welcome
west
wet
whale
what
wheat
wheel
when
where
whip
whisper
wide
width
wife
wild
will
win
window
wine
wing
wink
winner
winter
wire
wisdom
wise
wish
witness
wolf
woman
wonder
wood
wool
word
work
world
worry
worth
wrap
wreck
wrestle
wrist
write
wrong
yard
year
yellow
you
young
youth
zebra
zero
zone
zoo`.split("\n");
// node_modules/@scure/bip39/esm/wordlists/french.js
var wordlist3 = `abaisser
abandon
abdiquer
abeille
abolir
aborder
aboutir
aboyer
abrasif
abreuver
abriter
abroger
abrupt
absence
absolu
absurde
abusif
abyssal
acade\u0301mie
acajou
acarien
accabler
accepter
acclamer
accolade
accroche
accuser
acerbe
achat
acheter
aciduler
acier
acompte
acque\u0301rir
acronyme
acteur
actif
actuel
adepte
ade\u0301quat
adhe\u0301sif
adjectif
adjuger
admettre
admirer
adopter
adorer
adoucir
adresse
adroit
adulte
adverbe
ae\u0301rer
ae\u0301ronef
affaire
affecter
affiche
affreux
affubler
agacer
agencer
agile
agiter
agrafer
agre\u0301able
agrume
aider
aiguille
ailier
aimable
aisance
ajouter
ajuster
alarmer
alchimie
alerte
alge\u0300bre
algue
alie\u0301ner
aliment
alle\u0301ger
alliage
allouer
allumer
alourdir
alpaga
altesse
alve\u0301ole
amateur
ambigu
ambre
ame\u0301nager
amertume
amidon
amiral
amorcer
amour
amovible
amphibie
ampleur
amusant
analyse
anaphore
anarchie
anatomie
ancien
ane\u0301antir
angle
angoisse
anguleux
animal
annexer
annonce
annuel
anodin
anomalie
anonyme
anormal
antenne
antidote
anxieux
apaiser
ape\u0301ritif
aplanir
apologie
appareil
appeler
apporter
appuyer
aquarium
aqueduc
arbitre
arbuste
ardeur
ardoise
argent
arlequin
armature
armement
armoire
armure
arpenter
arracher
arriver
arroser
arsenic
arte\u0301riel
article
aspect
asphalte
aspirer
assaut
asservir
assiette
associer
assurer
asticot
astre
astuce
atelier
atome
atrium
atroce
attaque
attentif
attirer
attraper
aubaine
auberge
audace
audible
augurer
aurore
automne
autruche
avaler
avancer
avarice
avenir
averse
aveugle
aviateur
avide
avion
aviser
avoine
avouer
avril
axial
axiome
badge
bafouer
bagage
baguette
baignade
balancer
balcon
baleine
balisage
bambin
bancaire
bandage
banlieue
bannie\u0300re
banquier
barbier
baril
baron
barque
barrage
bassin
bastion
bataille
bateau
batterie
baudrier
bavarder
belette
be\u0301lier
belote
be\u0301ne\u0301fice
berceau
berger
berline
bermuda
besace
besogne
be\u0301tail
beurre
biberon
bicycle
bidule
bijou
bilan
bilingue
billard
binaire
biologie
biopsie
biotype
biscuit
bison
bistouri
bitume
bizarre
blafard
blague
blanchir
blessant
blinder
blond
bloquer
blouson
bobard
bobine
boire
boiser
bolide
bonbon
bondir
bonheur
bonifier
bonus
bordure
borne
botte
boucle
boueux
bougie
boulon
bouquin
bourse
boussole
boutique
boxeur
branche
brasier
brave
brebis
bre\u0300che
breuvage
bricoler
brigade
brillant
brioche
brique
brochure
broder
bronzer
brousse
broyeur
brume
brusque
brutal
bruyant
buffle
buisson
bulletin
bureau
burin
bustier
butiner
butoir
buvable
buvette
cabanon
cabine
cachette
cadeau
cadre
cafe\u0301ine
caillou
caisson
calculer
calepin
calibre
calmer
calomnie
calvaire
camarade
came\u0301ra
camion
campagne
canal
caneton
canon
cantine
canular
capable
caporal
caprice
capsule
capter
capuche
carabine
carbone
caresser
caribou
carnage
carotte
carreau
carton
cascade
casier
casque
cassure
causer
caution
cavalier
caverne
caviar
ce\u0301dille
ceinture
ce\u0301leste
cellule
cendrier
censurer
central
cercle
ce\u0301re\u0301bral
cerise
cerner
cerveau
cesser
chagrin
chaise
chaleur
chambre
chance
chapitre
charbon
chasseur
chaton
chausson
chavirer
chemise
chenille
che\u0301quier
chercher
cheval
chien
chiffre
chignon
chime\u0300re
chiot
chlorure
chocolat
choisir
chose
chouette
chrome
chute
cigare
cigogne
cimenter
cine\u0301ma
cintrer
circuler
cirer
cirque
citerne
citoyen
citron
civil
clairon
clameur
claquer
classe
clavier
client
cligner
climat
clivage
cloche
clonage
cloporte
cobalt
cobra
cocasse
cocotier
coder
codifier
coffre
cogner
cohe\u0301sion
coiffer
coincer
cole\u0300re
colibri
colline
colmater
colonel
combat
come\u0301die
commande
compact
concert
conduire
confier
congeler
connoter
consonne
contact
convexe
copain
copie
corail
corbeau
cordage
corniche
corpus
correct
corte\u0300ge
cosmique
costume
coton
coude
coupure
courage
couteau
couvrir
coyote
crabe
crainte
cravate
crayon
cre\u0301ature
cre\u0301diter
cre\u0301meux
creuser
crevette
cribler
crier
cristal
crite\u0300re
croire
croquer
crotale
crucial
cruel
crypter
cubique
cueillir
cuille\u0300re
cuisine
cuivre
culminer
cultiver
cumuler
cupide
curatif
curseur
cyanure
cycle
cylindre
cynique
daigner
damier
danger
danseur
dauphin
de\u0301battre
de\u0301biter
de\u0301border
de\u0301brider
de\u0301butant
de\u0301caler
de\u0301cembre
de\u0301chirer
de\u0301cider
de\u0301clarer
de\u0301corer
de\u0301crire
de\u0301cupler
de\u0301dale
de\u0301ductif
de\u0301esse
de\u0301fensif
de\u0301filer
de\u0301frayer
de\u0301gager
de\u0301givrer
de\u0301glutir
de\u0301grafer
de\u0301jeuner
de\u0301lice
de\u0301loger
demander
demeurer
de\u0301molir
de\u0301nicher
de\u0301nouer
dentelle
de\u0301nuder
de\u0301part
de\u0301penser
de\u0301phaser
de\u0301placer
de\u0301poser
de\u0301ranger
de\u0301rober
de\u0301sastre
descente
de\u0301sert
de\u0301signer
de\u0301sobe\u0301ir
dessiner
destrier
de\u0301tacher
de\u0301tester
de\u0301tourer
de\u0301tresse
devancer
devenir
deviner
devoir
diable
dialogue
diamant
dicter
diffe\u0301rer
dige\u0301rer
digital
digne
diluer
dimanche
diminuer
dioxyde
directif
diriger
discuter
disposer
dissiper
distance
divertir
diviser
docile
docteur
dogme
doigt
domaine
domicile
dompter
donateur
donjon
donner
dopamine
dortoir
dorure
dosage
doseur
dossier
dotation
douanier
double
douceur
douter
doyen
dragon
draper
dresser
dribbler
droiture
duperie
duplexe
durable
durcir
dynastie
e\u0301blouir
e\u0301carter
e\u0301charpe
e\u0301chelle
e\u0301clairer
e\u0301clipse
e\u0301clore
e\u0301cluse
e\u0301cole
e\u0301conomie
e\u0301corce
e\u0301couter
e\u0301craser
e\u0301cre\u0301mer
e\u0301crivain
e\u0301crou
e\u0301cume
e\u0301cureuil
e\u0301difier
e\u0301duquer
effacer
effectif
effigie
effort
effrayer
effusion
e\u0301galiser
e\u0301garer
e\u0301jecter
e\u0301laborer
e\u0301largir
e\u0301lectron
e\u0301le\u0301gant
e\u0301le\u0301phant
e\u0301le\u0300ve
e\u0301ligible
e\u0301litisme
e\u0301loge
e\u0301lucider
e\u0301luder
emballer
embellir
embryon
e\u0301meraude
e\u0301mission
emmener
e\u0301motion
e\u0301mouvoir
empereur
employer
emporter
emprise
e\u0301mulsion
encadrer
enche\u0300re
enclave
encoche
endiguer
endosser
endroit
enduire
e\u0301nergie
enfance
enfermer
enfouir
engager
engin
englober
e\u0301nigme
enjamber
enjeu
enlever
ennemi
ennuyeux
enrichir
enrobage
enseigne
entasser
entendre
entier
entourer
entraver
e\u0301nume\u0301rer
envahir
enviable
envoyer
enzyme
e\u0301olien
e\u0301paissir
e\u0301pargne
e\u0301patant
e\u0301paule
e\u0301picerie
e\u0301pide\u0301mie
e\u0301pier
e\u0301pilogue
e\u0301pine
e\u0301pisode
e\u0301pitaphe
e\u0301poque
e\u0301preuve
e\u0301prouver
e\u0301puisant
e\u0301querre
e\u0301quipe
e\u0301riger
e\u0301rosion
erreur
e\u0301ruption
escalier
espadon
espe\u0300ce
espie\u0300gle
espoir
esprit
esquiver
essayer
essence
essieu
essorer
estime
estomac
estrade
e\u0301tage\u0300re
e\u0301taler
e\u0301tanche
e\u0301tatique
e\u0301teindre
e\u0301tendoir
e\u0301ternel
e\u0301thanol
e\u0301thique
ethnie
e\u0301tirer
e\u0301toffer
e\u0301toile
e\u0301tonnant
e\u0301tourdir
e\u0301trange
e\u0301troit
e\u0301tude
euphorie
e\u0301valuer
e\u0301vasion
e\u0301ventail
e\u0301vidence
e\u0301viter
e\u0301volutif
e\u0301voquer
exact
exage\u0301rer
exaucer
exceller
excitant
exclusif
excuse
exe\u0301cuter
exemple
exercer
exhaler
exhorter
exigence
exiler
exister
exotique
expe\u0301dier
explorer
exposer
exprimer
exquis
extensif
extraire
exulter
fable
fabuleux
facette
facile
facture
faiblir
falaise
fameux
famille
farceur
farfelu
farine
farouche
fasciner
fatal
fatigue
faucon
fautif
faveur
favori
fe\u0301brile
fe\u0301conder
fe\u0301de\u0301rer
fe\u0301lin
femme
fe\u0301mur
fendoir
fe\u0301odal
fermer
fe\u0301roce
ferveur
festival
feuille
feutre
fe\u0301vrier
fiasco
ficeler
fictif
fide\u0300le
figure
filature
filetage
filie\u0300re
filleul
filmer
filou
filtrer
financer
finir
fiole
firme
fissure
fixer
flairer
flamme
flasque
flatteur
fle\u0301au
fle\u0300che
fleur
flexion
flocon
flore
fluctuer
fluide
fluvial
folie
fonderie
fongible
fontaine
forcer
forgeron
formuler
fortune
fossile
foudre
fouge\u0300re
fouiller
foulure
fourmi
fragile
fraise
franchir
frapper
frayeur
fre\u0301gate
freiner
frelon
fre\u0301mir
fre\u0301ne\u0301sie
fre\u0300re
friable
friction
frisson
frivole
froid
fromage
frontal
frotter
fruit
fugitif
fuite
fureur
furieux
furtif
fusion
futur
gagner
galaxie
galerie
gambader
garantir
gardien
garnir
garrigue
gazelle
gazon
ge\u0301ant
ge\u0301latine
ge\u0301lule
gendarme
ge\u0301ne\u0301ral
ge\u0301nie
genou
gentil
ge\u0301ologie
ge\u0301ome\u0300tre
ge\u0301ranium
germe
gestuel
geyser
gibier
gicler
girafe
givre
glace
glaive
glisser
globe
gloire
glorieux
golfeur
gomme
gonfler
gorge
gorille
goudron
gouffre
goulot
goupille
gourmand
goutte
graduel
graffiti
graine
grand
grappin
gratuit
gravir
grenat
griffure
griller
grimper
grogner
gronder
grotte
groupe
gruger
grutier
gruye\u0300re
gue\u0301pard
guerrier
guide
guimauve
guitare
gustatif
gymnaste
gyrostat
habitude
hachoir
halte
hameau
hangar
hanneton
haricot
harmonie
harpon
hasard
he\u0301lium
he\u0301matome
herbe
he\u0301risson
hermine
he\u0301ron
he\u0301siter
heureux
hiberner
hibou
hilarant
histoire
hiver
homard
hommage
homoge\u0300ne
honneur
honorer
honteux
horde
horizon
horloge
hormone
horrible
houleux
housse
hublot
huileux
humain
humble
humide
humour
hurler
hydromel
hygie\u0300ne
hymne
hypnose
idylle
ignorer
iguane
illicite
illusion
image
imbiber
imiter
immense
immobile
immuable
impact
impe\u0301rial
implorer
imposer
imprimer
imputer
incarner
incendie
incident
incliner
incolore
indexer
indice
inductif
ine\u0301dit
ineptie
inexact
infini
infliger
informer
infusion
inge\u0301rer
inhaler
inhiber
injecter
injure
innocent
inoculer
inonder
inscrire
insecte
insigne
insolite
inspirer
instinct
insulter
intact
intense
intime
intrigue
intuitif
inutile
invasion
inventer
inviter
invoquer
ironique
irradier
irre\u0301el
irriter
isoler
ivoire
ivresse
jaguar
jaillir
jambe
janvier
jardin
jauger
jaune
javelot
jetable
jeton
jeudi
jeunesse
joindre
joncher
jongler
joueur
jouissif
journal
jovial
joyau
joyeux
jubiler
jugement
junior
jupon
juriste
justice
juteux
juve\u0301nile
kayak
kimono
kiosque
label
labial
labourer
lace\u0301rer
lactose
lagune
laine
laisser
laitier
lambeau
lamelle
lampe
lanceur
langage
lanterne
lapin
largeur
larme
laurier
lavabo
lavoir
lecture
le\u0301gal
le\u0301ger
le\u0301gume
lessive
lettre
levier
lexique
le\u0301zard
liasse
libe\u0301rer
libre
licence
licorne
lie\u0300ge
lie\u0300vre
ligature
ligoter
ligue
limer
limite
limonade
limpide
line\u0301aire
lingot
lionceau
liquide
lisie\u0300re
lister
lithium
litige
littoral
livreur
logique
lointain
loisir
lombric
loterie
louer
lourd
loutre
louve
loyal
lubie
lucide
lucratif
lueur
lugubre
luisant
lumie\u0300re
lunaire
lundi
luron
lutter
luxueux
machine
magasin
magenta
magique
maigre
maillon
maintien
mairie
maison
majorer
malaxer
male\u0301fice
malheur
malice
mallette
mammouth
mandater
maniable
manquant
manteau
manuel
marathon
marbre
marchand
mardi
maritime
marqueur
marron
marteler
mascotte
massif
mate\u0301riel
matie\u0300re
matraque
maudire
maussade
mauve
maximal
me\u0301chant
me\u0301connu
me\u0301daille
me\u0301decin
me\u0301diter
me\u0301duse
meilleur
me\u0301lange
me\u0301lodie
membre
me\u0301moire
menacer
mener
menhir
mensonge
mentor
mercredi
me\u0301rite
merle
messager
mesure
me\u0301tal
me\u0301te\u0301ore
me\u0301thode
me\u0301tier
meuble
miauler
microbe
miette
mignon
migrer
milieu
million
mimique
mince
mine\u0301ral
minimal
minorer
minute
miracle
miroiter
missile
mixte
mobile
moderne
moelleux
mondial
moniteur
monnaie
monotone
monstre
montagne
monument
moqueur
morceau
morsure
mortier
moteur
motif
mouche
moufle
moulin
mousson
mouton
mouvant
multiple
munition
muraille
mure\u0300ne
murmure
muscle
muse\u0301um
musicien
mutation
muter
mutuel
myriade
myrtille
myste\u0300re
mythique
nageur
nappe
narquois
narrer
natation
nation
nature
naufrage
nautique
navire
ne\u0301buleux
nectar
ne\u0301faste
ne\u0301gation
ne\u0301gliger
ne\u0301gocier
neige
nerveux
nettoyer
neurone
neutron
neveu
niche
nickel
nitrate
niveau
noble
nocif
nocturne
noirceur
noisette
nomade
nombreux
nommer
normatif
notable
notifier
notoire
nourrir
nouveau
novateur
novembre
novice
nuage
nuancer
nuire
nuisible
nume\u0301ro
nuptial
nuque
nutritif
obe\u0301ir
objectif
obliger
obscur
observer
obstacle
obtenir
obturer
occasion
occuper
oce\u0301an
octobre
octroyer
octupler
oculaire
odeur
odorant
offenser
officier
offrir
ogive
oiseau
oisillon
olfactif
olivier
ombrage
omettre
onctueux
onduler
one\u0301reux
onirique
opale
opaque
ope\u0301rer
opinion
opportun
opprimer
opter
optique
orageux
orange
orbite
ordonner
oreille
organe
orgueil
orifice
ornement
orque
ortie
osciller
osmose
ossature
otarie
ouragan
ourson
outil
outrager
ouvrage
ovation
oxyde
oxyge\u0300ne
ozone
paisible
palace
palmare\u0300s
palourde
palper
panache
panda
pangolin
paniquer
panneau
panorama
pantalon
papaye
papier
papoter
papyrus
paradoxe
parcelle
paresse
parfumer
parler
parole
parrain
parsemer
partager
parure
parvenir
passion
paste\u0300que
paternel
patience
patron
pavillon
pavoiser
payer
paysage
peigne
peintre
pelage
pe\u0301lican
pelle
pelouse
peluche
pendule
pe\u0301ne\u0301trer
pe\u0301nible
pensif
pe\u0301nurie
pe\u0301pite
pe\u0301plum
perdrix
perforer
pe\u0301riode
permuter
perplexe
persil
perte
peser
pe\u0301tale
petit
pe\u0301trir
peuple
pharaon
phobie
phoque
photon
phrase
physique
piano
pictural
pie\u0300ce
pierre
pieuvre
pilote
pinceau
pipette
piquer
pirogue
piscine
piston
pivoter
pixel
pizza
placard
plafond
plaisir
planer
plaque
plastron
plateau
pleurer
plexus
pliage
plomb
plonger
pluie
plumage
pochette
poe\u0301sie
poe\u0300te
pointe
poirier
poisson
poivre
polaire
policier
pollen
polygone
pommade
pompier
ponctuel
ponde\u0301rer
poney
portique
position
posse\u0301der
posture
potager
poteau
potion
pouce
poulain
poumon
pourpre
poussin
pouvoir
prairie
pratique
pre\u0301cieux
pre\u0301dire
pre\u0301fixe
pre\u0301lude
pre\u0301nom
pre\u0301sence
pre\u0301texte
pre\u0301voir
primitif
prince
prison
priver
proble\u0300me
proce\u0301der
prodige
profond
progre\u0300s
proie
projeter
prologue
promener
propre
prospe\u0300re
prote\u0301ger
prouesse
proverbe
prudence
pruneau
psychose
public
puceron
puiser
pulpe
pulsar
punaise
punitif
pupitre
purifier
puzzle
pyramide
quasar
querelle
question
quie\u0301tude
quitter
quotient
racine
raconter
radieux
ragondin
raideur
raisin
ralentir
rallonge
ramasser
rapide
rasage
ratisser
ravager
ravin
rayonner
re\u0301actif
re\u0301agir
re\u0301aliser
re\u0301animer
recevoir
re\u0301citer
re\u0301clamer
re\u0301colter
recruter
reculer
recycler
re\u0301diger
redouter
refaire
re\u0301flexe
re\u0301former
refrain
refuge
re\u0301galien
re\u0301gion
re\u0301glage
re\u0301gulier
re\u0301ite\u0301rer
rejeter
rejouer
relatif
relever
relief
remarque
reme\u0300de
remise
remonter
remplir
remuer
renard
renfort
renifler
renoncer
rentrer
renvoi
replier
reporter
reprise
reptile
requin
re\u0301serve
re\u0301sineux
re\u0301soudre
respect
rester
re\u0301sultat
re\u0301tablir
retenir
re\u0301ticule
retomber
retracer
re\u0301union
re\u0301ussir
revanche
revivre
re\u0301volte
re\u0301vulsif
richesse
rideau
rieur
rigide
rigoler
rincer
riposter
risible
risque
rituel
rival
rivie\u0300re
rocheux
romance
rompre
ronce
rondin
roseau
rosier
rotatif
rotor
rotule
rouge
rouille
rouleau
routine
royaume
ruban
rubis
ruche
ruelle
rugueux
ruiner
ruisseau
ruser
rustique
rythme
sabler
saboter
sabre
sacoche
safari
sagesse
saisir
salade
salive
salon
saluer
samedi
sanction
sanglier
sarcasme
sardine
saturer
saugrenu
saumon
sauter
sauvage
savant
savonner
scalpel
scandale
sce\u0301le\u0301rat
sce\u0301nario
sceptre
sche\u0301ma
science
scinder
score
scrutin
sculpter
se\u0301ance
se\u0301cable
se\u0301cher
secouer
se\u0301cre\u0301ter
se\u0301datif
se\u0301duire
seigneur
se\u0301jour
se\u0301lectif
semaine
sembler
semence
se\u0301minal
se\u0301nateur
sensible
sentence
se\u0301parer
se\u0301quence
serein
sergent
se\u0301rieux
serrure
se\u0301rum
service
se\u0301same
se\u0301vir
sevrage
sextuple
side\u0301ral
sie\u0300cle
sie\u0301ger
siffler
sigle
signal
silence
silicium
simple
since\u0300re
sinistre
siphon
sirop
sismique
situer
skier
social
socle
sodium
soigneux
soldat
soleil
solitude
soluble
sombre
sommeil
somnoler
sonde
songeur
sonnette
sonore
sorcier
sortir
sosie
sottise
soucieux
soudure
souffle
soulever
soupape
source
soutirer
souvenir
spacieux
spatial
spe\u0301cial
sphe\u0300re
spiral
stable
station
sternum
stimulus
stipuler
strict
studieux
stupeur
styliste
sublime
substrat
subtil
subvenir
succe\u0300s
sucre
suffixe
sugge\u0301rer
suiveur
sulfate
superbe
supplier
surface
suricate
surmener
surprise
sursaut
survie
suspect
syllabe
symbole
syme\u0301trie
synapse
syntaxe
syste\u0300me
tabac
tablier
tactile
tailler
talent
talisman
talonner
tambour
tamiser
tangible
tapis
taquiner
tarder
tarif
tartine
tasse
tatami
tatouage
taupe
taureau
taxer
te\u0301moin
temporel
tenaille
tendre
teneur
tenir
tension
terminer
terne
terrible
te\u0301tine
texte
the\u0300me
the\u0301orie
the\u0301rapie
thorax
tibia
tie\u0300de
timide
tirelire
tiroir
tissu
titane
titre
tituber
toboggan
tole\u0301rant
tomate
tonique
tonneau
toponyme
torche
tordre
tornade
torpille
torrent
torse
tortue
totem
toucher
tournage
tousser
toxine
traction
trafic
tragique
trahir
train
trancher
travail
tre\u0300fle
tremper
tre\u0301sor
treuil
triage
tribunal
tricoter
trilogie
triomphe
tripler
triturer
trivial
trombone
tronc
tropical
troupeau
tuile
tulipe
tumulte
tunnel
turbine
tuteur
tutoyer
tuyau
tympan
typhon
typique
tyran
ubuesque
ultime
ultrason
unanime
unifier
union
unique
unitaire
univers
uranium
urbain
urticant
usage
usine
usuel
usure
utile
utopie
vacarme
vaccin
vagabond
vague
vaillant
vaincre
vaisseau
valable
valise
vallon
valve
vampire
vanille
vapeur
varier
vaseux
vassal
vaste
vecteur
vedette
ve\u0301ge\u0301tal
ve\u0301hicule
veinard
ve\u0301loce
vendredi
ve\u0301ne\u0301rer
venger
venimeux
ventouse
verdure
ve\u0301rin
vernir
verrou
verser
vertu
veston
ve\u0301te\u0301ran
ve\u0301tuste
vexant
vexer
viaduc
viande
victoire
vidange
vide\u0301o
vignette
vigueur
vilain
village
vinaigre
violon
vipe\u0300re
virement
virtuose
virus
visage
viseur
vision
visqueux
visuel
vital
vitesse
viticole
vitrine
vivace
vivipare
vocation
voguer
voile
voisin
voiture
volaille
volcan
voltiger
volume
vorace
vortex
voter
vouloir
voyage
voyelle
wagon
xe\u0301non
yacht
ze\u0300bre
ze\u0301nith
zeste
zoologie`.split("\n");
// node_modules/@scure/bip39/esm/wordlists/italian.js
var wordlist4 = `abaco
abbaglio
abbinato
abete
abisso
abolire
abrasivo
abrogato
accadere
accenno
accusato
acetone
achille
acido
acqua
acre
acrilico
acrobata
acuto
adagio
addebito
addome
adeguato
aderire
adipe
adottare
adulare
affabile
affetto
affisso
affranto
aforisma
afoso
africano
agave
agente
agevole
aggancio
agire
agitare
agonismo
agricolo
agrumeto
aguzzo
alabarda
alato
albatro
alberato
albo
albume
alce
alcolico
alettone
alfa
algebra
aliante
alibi
alimento
allagato
allegro
allievo
allodola
allusivo
almeno
alogeno
alpaca
alpestre
altalena
alterno
alticcio
altrove
alunno
alveolo
alzare
amalgama
amanita
amarena
ambito
ambrato
ameba
america
ametista
amico
ammasso
ammenda
ammirare
ammonito
amore
ampio
ampliare
amuleto
anacardo
anagrafe
analista
anarchia
anatra
anca
ancella
ancora
andare
andrea
anello
angelo
angolare
angusto
anima
annegare
annidato
anno
annuncio
anonimo
anticipo
anzi
apatico
apertura
apode
apparire
appetito
appoggio
approdo
appunto
aprile
arabica
arachide
aragosta
araldica
arancio
aratura
arazzo
arbitro
archivio
ardito
arenile
argento
argine
arguto
aria
armonia
arnese
arredato
arringa
arrosto
arsenico
arso
artefice
arzillo
asciutto
ascolto
asepsi
asettico
asfalto
asino
asola
aspirato
aspro
assaggio
asse
assoluto
assurdo
asta
astenuto
astice
astratto
atavico
ateismo
atomico
atono
attesa
attivare
attorno
attrito
attuale
ausilio
austria
autista
autonomo
autunno
avanzato
avere
avvenire
avviso
avvolgere
azione
azoto
azzimo
azzurro
babele
baccano
bacino
baco
badessa
badilata
bagnato
baita
balcone
baldo
balena
ballata
balzano
bambino
bandire
baraonda
barbaro
barca
baritono
barlume
barocco
basilico
basso
batosta
battuto
baule
bava
bavosa
becco
beffa
belgio
belva
benda
benevole
benigno
benzina
bere
berlina
beta
bibita
bici
bidone
bifido
biga
bilancia
bimbo
binocolo
biologo
bipede
bipolare
birbante
birra
biscotto
bisesto
bisnonno
bisonte
bisturi
bizzarro
blando
blatta
bollito
bonifico
bordo
bosco
botanico
bottino
bozzolo
braccio
bradipo
brama
branca
bravura
bretella
brevetto
brezza
briglia
brillante
brindare
broccolo
brodo
bronzina
brullo
bruno
bubbone
buca
budino
buffone
buio
bulbo
buono
burlone
burrasca
bussola
busta
cadetto
caduco
calamaro
calcolo
calesse
calibro
calmo
caloria
cambusa
camerata
camicia
cammino
camola
campale
canapa
candela
cane
canino
canotto
cantina
capace
capello
capitolo
capogiro
cappero
capra
capsula
carapace
carcassa
cardo
carisma
carovana
carretto
cartolina
casaccio
cascata
caserma
caso
cassone
castello
casuale
catasta
catena
catrame
cauto
cavillo
cedibile
cedrata
cefalo
celebre
cellulare
cena
cenone
centesimo
ceramica
cercare
certo
cerume
cervello
cesoia
cespo
ceto
chela
chiaro
chicca
chiedere
chimera
china
chirurgo
chitarra
ciao
ciclismo
cifrare
cigno
cilindro
ciottolo
circa
cirrosi
citrico
cittadino
ciuffo
civetta
civile
classico
clinica
cloro
cocco
codardo
codice
coerente
cognome
collare
colmato
colore
colposo
coltivato
colza
coma
cometa
commando
comodo
computer
comune
conciso
condurre
conferma
congelare
coniuge
connesso
conoscere
consumo
continuo
convegno
coperto
copione
coppia
copricapo
corazza
cordata
coricato
cornice
corolla
corpo
corredo
corsia
cortese
cosmico
costante
cottura
covato
cratere
cravatta
creato
credere
cremoso
crescita
creta
criceto
crinale
crisi
critico
croce
cronaca
crostata
cruciale
crusca
cucire
cuculo
cugino
cullato
cupola
curatore
cursore
curvo
cuscino
custode
dado
daino
dalmata
damerino
daniela
dannoso
danzare
datato
davanti
davvero
debutto
decennio
deciso
declino
decollo
decreto
dedicato
definito
deforme
degno
delegare
delfino
delirio
delta
demenza
denotato
dentro
deposito
derapata
derivare
deroga
descritto
deserto
desiderio
desumere
detersivo
devoto
diametro
dicembre
diedro
difeso
diffuso
digerire
digitale
diluvio
dinamico
dinnanzi
dipinto
diploma
dipolo
diradare
dire
dirotto
dirupo
disagio
discreto
disfare
disgelo
disposto
distanza
disumano
dito
divano
divelto
dividere
divorato
doblone
docente
doganale
dogma
dolce
domato
domenica
dominare
dondolo
dono
dormire
dote
dottore
dovuto
dozzina
drago
druido
dubbio
dubitare
ducale
duna
duomo
duplice
duraturo
ebano
eccesso
ecco
eclissi
economia
edera
edicola
edile
editoria
educare
egemonia
egli
egoismo
egregio
elaborato
elargire
elegante
elencato
eletto
elevare
elfico
elica
elmo
elsa
eluso
emanato
emblema
emesso
emiro
emotivo
emozione
empirico
emulo
endemico
enduro
energia
enfasi
enoteca
entrare
enzima
epatite
epilogo
episodio
epocale
eppure
equatore
erario
erba
erboso
erede
eremita
erigere
ermetico
eroe
erosivo
errante
esagono
esame
esanime
esaudire
esca
esempio
esercito
esibito
esigente
esistere
esito
esofago
esortato
esoso
espanso
espresso
essenza
esso
esteso
estimare
estonia
estroso
esultare
etilico
etnico
etrusco
etto
euclideo
europa
evaso
evidenza
evitato
evoluto
evviva
fabbrica
faccenda
fachiro
falco
famiglia
fanale
fanfara
fango
fantasma
fare
farfalla
farinoso
farmaco
fascia
fastoso
fasullo
faticare
fato
favoloso
febbre
fecola
fede
fegato
felpa
feltro
femmina
fendere
fenomeno
fermento
ferro
fertile
fessura
festivo
fetta
feudo
fiaba
fiducia
fifa
figurato
filo
finanza
finestra
finire
fiore
fiscale
fisico
fiume
flacone
flamenco
flebo
flemma
florido
fluente
fluoro
fobico
focaccia
focoso
foderato
foglio
folata
folclore
folgore
fondente
fonetico
fonia
fontana
forbito
forchetta
foresta
formica
fornaio
foro
fortezza
forzare
fosfato
fosso
fracasso
frana
frassino
fratello
freccetta
frenata
fresco
frigo
frollino
fronde
frugale
frutta
fucilata
fucsia
fuggente
fulmine
fulvo
fumante
fumetto
fumoso
fune
funzione
fuoco
furbo
furgone
furore
fuso
futile
gabbiano
gaffe
galateo
gallina
galoppo
gambero
gamma
garanzia
garbo
garofano
garzone
gasdotto
gasolio
gastrico
gatto
gaudio
gazebo
gazzella
geco
gelatina
gelso
gemello
gemmato
gene
genitore
gennaio
genotipo
gergo
ghepardo
ghiaccio
ghisa
giallo
gilda
ginepro
giocare
gioiello
giorno
giove
girato
girone
gittata
giudizio
giurato
giusto
globulo
glutine
gnomo
gobba
golf
gomito
gommone
gonfio
gonna
governo
gracile
grado
grafico
grammo
grande
grattare
gravoso
grazia
greca
gregge
grifone
grigio
grinza
grotta
gruppo
guadagno
guaio
guanto
guardare
gufo
guidare
ibernato
icona
identico
idillio
idolo
idra
idrico
idrogeno
igiene
ignaro
ignorato
ilare
illeso
illogico
illudere
imballo
imbevuto
imbocco
imbuto
immane
immerso
immolato
impacco
impeto
impiego
importo
impronta
inalare
inarcare
inattivo
incanto
incendio
inchino
incisivo
incluso
incontro
incrocio
incubo
indagine
india
indole
inedito
infatti
infilare
inflitto
ingaggio
ingegno
inglese
ingordo
ingrosso
innesco
inodore
inoltrare
inondato
insano
insetto
insieme
insonnia
insulina
intasato
intero
intonaco
intuito
inumidire
invalido
invece
invito
iperbole
ipnotico
ipotesi
ippica
iride
irlanda
ironico
irrigato
irrorare
isolato
isotopo
isterico
istituto
istrice
italia
iterare
labbro
labirinto
lacca
lacerato
lacrima
lacuna
laddove
lago
lampo
lancetta
lanterna
lardoso
larga
laringe
lastra
latenza
latino
lattuga
lavagna
lavoro
legale
leggero
lembo
lentezza
lenza
leone
lepre
lesivo
lessato
lesto
letterale
leva
levigato
libero
lido
lievito
lilla
limatura
limitare
limpido
lineare
lingua
liquido
lira
lirica
lisca
lite
litigio
livrea
locanda
lode
logica
lombare
londra
longevo
loquace
lorenzo
loto
lotteria
luce
lucidato
lumaca
luminoso
lungo
lupo
luppolo
lusinga
lusso
lutto
macabro
macchina
macero
macinato
madama
magico
maglia
magnete
magro
maiolica
malafede
malgrado
malinteso
malsano
malto
malumore
mana
mancia
mandorla
mangiare
manifesto
mannaro
manovra
mansarda
mantide
manubrio
mappa
maratona
marcire
maretta
marmo
marsupio
maschera
massaia
mastino
materasso
matricola
mattone
maturo
mazurca
meandro
meccanico
mecenate
medesimo
meditare
mega
melassa
melis
melodia
meninge
meno
mensola
mercurio
merenda
merlo
meschino
mese
messere
mestolo
metallo
metodo
mettere
miagolare
mica
micelio
michele
microbo
midollo
miele
migliore
milano
milite
mimosa
minerale
mini
minore
mirino
mirtillo
miscela
missiva
misto
misurare
mitezza
mitigare
mitra
mittente
mnemonico
modello
modifica
modulo
mogano
mogio
mole
molosso
monastero
monco
mondina
monetario
monile
monotono
monsone
montato
monviso
mora
mordere
morsicato
mostro
motivato
motosega
motto
movenza
movimento
mozzo
mucca
mucosa
muffa
mughetto
mugnaio
mulatto
mulinello
multiplo
mummia
munto
muovere
murale
musa
muscolo
musica
mutevole
muto
nababbo
nafta
nanometro
narciso
narice
narrato
nascere
nastrare
naturale
nautica
naviglio
nebulosa
necrosi
negativo
negozio
nemmeno
neofita
neretto
nervo
nessuno
nettuno
neutrale
neve
nevrotico
nicchia
ninfa
nitido
nobile
nocivo
nodo
nome
nomina
nordico
normale
norvegese
nostrano
notare
notizia
notturno
novella
nucleo
nulla
numero
nuovo
nutrire
nuvola
nuziale
oasi
obbedire
obbligo
obelisco
oblio
obolo
obsoleto
occasione
occhio
occidente
occorrere
occultare
ocra
oculato
odierno
odorare
offerta
offrire
offuscato
oggetto
oggi
ognuno
olandese
olfatto
oliato
oliva
ologramma
oltre
omaggio
ombelico
ombra
omega
omissione
ondoso
onere
onice
onnivoro
onorevole
onta
operato
opinione
opposto
oracolo
orafo
ordine
orecchino
orefice
orfano
organico
origine
orizzonte
orma
ormeggio
ornativo
orologio
orrendo
orribile
ortensia
ortica
orzata
orzo
osare
oscurare
osmosi
ospedale
ospite
ossa
ossidare
ostacolo
oste
otite
otre
ottagono
ottimo
ottobre
ovale
ovest
ovino
oviparo
ovocito
ovunque
ovviare
ozio
pacchetto
pace
pacifico
padella
padrone
paese
paga
pagina
palazzina
palesare
pallido
palo
palude
pandoro
pannello
paolo
paonazzo
paprica
parabola
parcella
parere
pargolo
pari
parlato
parola
partire
parvenza
parziale
passivo
pasticca
patacca
patologia
pattume
pavone
peccato
pedalare
pedonale
peggio
peloso
penare
pendice
penisola
pennuto
penombra
pensare
pentola
pepe
pepita
perbene
percorso
perdonato
perforare
pergamena
periodo
permesso
perno
perplesso
persuaso
pertugio
pervaso
pesatore
pesista
peso
pestifero
petalo
pettine
petulante
pezzo
piacere
pianta
piattino
piccino
picozza
piega
pietra
piffero
pigiama
pigolio
pigro
pila
pilifero
pillola
pilota
pimpante
pineta
pinna
pinolo
pioggia
piombo
piramide
piretico
pirite
pirolisi
pitone
pizzico
placebo
planare
plasma
platano
plenario
pochezza
poderoso
podismo
poesia
poggiare
polenta
poligono
pollice
polmonite
polpetta
polso
poltrona
polvere
pomice
pomodoro
ponte
popoloso
porfido
poroso
porpora
porre
portata
posa
positivo
possesso
postulato
potassio
potere
pranzo
prassi
pratica
precluso
predica
prefisso
pregiato
prelievo
premere
prenotare
preparato
presenza
pretesto
prevalso
prima
principe
privato
problema
procura
produrre
profumo
progetto
prolunga
promessa
pronome
proposta
proroga
proteso
prova
prudente
prugna
prurito
psiche
pubblico
pudica
pugilato
pugno
pulce
pulito
pulsante
puntare
pupazzo
pupilla
puro
quadro
qualcosa
quasi
querela
quota
raccolto
raddoppio
radicale
radunato
raffica
ragazzo
ragione
ragno
ramarro
ramingo
ramo
randagio
rantolare
rapato
rapina
rappreso
rasatura
raschiato
rasente
rassegna
rastrello
rata
ravveduto
reale
recepire
recinto
recluta
recondito
recupero
reddito
redimere
regalato
registro
regola
regresso
relazione
remare
remoto
renna
replica
reprimere
reputare
resa
residente
responso
restauro
rete
retina
retorica
rettifica
revocato
riassunto
ribadire
ribelle
ribrezzo
ricarica
ricco
ricevere
riciclato
ricordo
ricreduto
ridicolo
ridurre
rifasare
riflesso
riforma
rifugio
rigare
rigettato
righello
rilassato
rilevato
rimanere
rimbalzo
rimedio
rimorchio
rinascita
rincaro
rinforzo
rinnovo
rinomato
rinsavito
rintocco
rinuncia
rinvenire
riparato
ripetuto
ripieno
riportare
ripresa
ripulire
risata
rischio
riserva
risibile
riso
rispetto
ristoro
risultato
risvolto
ritardo
ritegno
ritmico
ritrovo
riunione
riva
riverso
rivincita
rivolto
rizoma
roba
robotico
robusto
roccia
roco
rodaggio
rodere
roditore
rogito
rollio
romantico
rompere
ronzio
rosolare
rospo
rotante
rotondo
rotula
rovescio
rubizzo
rubrica
ruga
rullino
rumine
rumoroso
ruolo
rupe
russare
rustico
sabato
sabbiare
sabotato
sagoma
salasso
saldatura
salgemma
salivare
salmone
salone
saltare
saluto
salvo
sapere
sapido
saporito
saraceno
sarcasmo
sarto
sassoso
satellite
satira
satollo
saturno
savana
savio
saziato
sbadiglio
sbalzo
sbancato
sbarra
sbattere
sbavare
sbendare
sbirciare
sbloccato
sbocciato
sbrinare
sbruffone
sbuffare
scabroso
scadenza
scala
scambiare
scandalo
scapola
scarso
scatenare
scavato
scelto
scenico
scettro
scheda
schiena
sciarpa
scienza
scindere
scippo
sciroppo
scivolo
sclerare
scodella
scolpito
scomparto
sconforto
scoprire
scorta
scossone
scozzese
scriba
scrollare
scrutinio
scuderia
scultore
scuola
scuro
scusare
sdebitare
sdoganare
seccatura
secondo
sedano
seggiola
segnalato
segregato
seguito
selciato
selettivo
sella
selvaggio
semaforo
sembrare
seme
seminato
sempre
senso
sentire
sepolto
sequenza
serata
serbato
sereno
serio
serpente
serraglio
servire
sestina
setola
settimana
sfacelo
sfaldare
sfamato
sfarzoso
sfaticato
sfera
sfida
sfilato
sfinge
sfocato
sfoderare
sfogo
sfoltire
sforzato
sfratto
sfruttato
sfuggito
sfumare
sfuso
sgabello
sgarbato
sgonfiare
sgorbio
sgrassato
sguardo
sibilo
siccome
sierra
sigla
signore
silenzio
sillaba
simbolo
simpatico
simulato
sinfonia
singolo
sinistro
sino
sintesi
sinusoide
sipario
sisma
sistole
situato
slitta
slogatura
sloveno
smarrito
smemorato
smentito
smeraldo
smilzo
smontare
smottato
smussato
snellire
snervato
snodo
sobbalzo
sobrio
soccorso
sociale
sodale
soffitto
sogno
soldato
solenne
solido
sollazzo
solo
solubile
solvente
somatico
somma
sonda
sonetto
sonnifero
sopire
soppeso
sopra
sorgere
sorpasso
sorriso
sorso
sorteggio
sorvolato
sospiro
sosta
sottile
spada
spalla
spargere
spatola
spavento
spazzola
specie
spedire
spegnere
spelatura
speranza
spessore
spettrale
spezzato
spia
spigoloso
spillato
spinoso
spirale
splendido
sportivo
sposo
spranga
sprecare
spronato
spruzzo
spuntino
squillo
sradicare
srotolato
stabile
stacco
staffa
stagnare
stampato
stantio
starnuto
stasera
statuto
stelo
steppa
sterzo
stiletto
stima
stirpe
stivale
stizzoso
stonato
storico
strappo
stregato
stridulo
strozzare
strutto
stuccare
stufo
stupendo
subentro
succoso
sudore
suggerito
sugo
sultano
suonare
superbo
supporto
surgelato
surrogato
sussurro
sutura
svagare
svedese
sveglio
svelare
svenuto
svezia
sviluppo
svista
svizzera
svolta
svuotare
tabacco
tabulato
tacciare
taciturno
tale
talismano
tampone
tannino
tara
tardivo
targato
tariffa
tarpare
tartaruga
tasto
tattico
taverna
tavolata
tazza
teca
tecnico
telefono
temerario
tempo
temuto
tendone
tenero
tensione
tentacolo
teorema
terme
terrazzo
terzetto
tesi
tesserato
testato
tetro
tettoia
tifare
tigella
timbro
tinto
tipico
tipografo
tiraggio
tiro
titanio
titolo
titubante
tizio
tizzone
toccare
tollerare
tolto
tombola
tomo
tonfo
tonsilla
topazio
topologia
toppa
torba
tornare
torrone
tortora
toscano
tossire
tostatura
totano
trabocco
trachea
trafila
tragedia
tralcio
tramonto
transito
trapano
trarre
trasloco
trattato
trave
treccia
tremolio
trespolo
tributo
tricheco
trifoglio
trillo
trincea
trio
tristezza
triturato
trivella
tromba
trono
troppo
trottola
trovare
truccato
tubatura
tuffato
tulipano
tumulto
tunisia
turbare
turchino
tuta
tutela
ubicato
uccello
uccisore
udire
uditivo
uffa
ufficio
uguale
ulisse
ultimato
umano
umile
umorismo
uncinetto
ungere
ungherese
unicorno
unificato
unisono
unitario
unte
uovo
upupa
uragano
urgenza
urlo
usanza
usato
uscito
usignolo
usuraio
utensile
utilizzo
utopia
vacante
vaccinato
vagabondo
vagliato
valanga
valgo
valico
valletta
valoroso
valutare
valvola
vampata
vangare
vanitoso
vano
vantaggio
vanvera
vapore
varano
varcato
variante
vasca
vedetta
vedova
veduto
vegetale
veicolo
velcro
velina
velluto
veloce
venato
vendemmia
vento
verace
verbale
vergogna
verifica
vero
verruca
verticale
vescica
vessillo
vestale
veterano
vetrina
vetusto
viandante
vibrante
vicenda
vichingo
vicinanza
vidimare
vigilia
vigneto
vigore
vile
villano
vimini
vincitore
viola
vipera
virgola
virologo
virulento
viscoso
visione
vispo
vissuto
visura
vita
vitello
vittima
vivanda
vivido
viziare
voce
voga
volatile
volere
volpe
voragine
vulcano
zampogna
zanna
zappato
zattera
zavorra
zefiro
zelante
zelo
zenzero
zerbino
zibetto
zinco
zircone
zitto
zolla
zotico
zucchero
zufolo
zulu
zuppa`.split("\n");
// node_modules/@scure/bip39/esm/wordlists/japanese.js
var wordlist5 = `\u3042\u3044\u3053\u304F\u3057\u3093
\u3042\u3044\u3055\u3064
\u3042\u3044\u305F\u3099
\u3042\u304A\u305D\u3099\u3089
\u3042\u304B\u3061\u3083\u3093
\u3042\u304D\u308B
\u3042\u3051\u304B\u3099\u305F
\u3042\u3051\u308B
\u3042\u3053\u304B\u3099\u308C\u308B
\u3042\u3055\u3044
\u3042\u3055\u3072
\u3042\u3057\u3042\u3068
\u3042\u3057\u3099\u308F\u3046
\u3042\u3059\u3099\u304B\u308B
\u3042\u3059\u3099\u304D
\u3042\u305D\u3075\u3099
\u3042\u305F\u3048\u308B
\u3042\u305F\u305F\u3081\u308B
\u3042\u305F\u308A\u307E\u3048
\u3042\u305F\u308B
\u3042\u3064\u3044
\u3042\u3064\u304B\u3046
\u3042\u3063\u3057\u3085\u304F
\u3042\u3064\u307E\u308A
\u3042\u3064\u3081\u308B
\u3042\u3066\u306A
\u3042\u3066\u306F\u307E\u308B
\u3042\u3072\u308B
\u3042\u3075\u3099\u3089
\u3042\u3075\u3099\u308B
\u3042\u3075\u308C\u308B
\u3042\u307E\u3044
\u3042\u307E\u3068\u3099
\u3042\u307E\u3084\u304B\u3059
\u3042\u307E\u308A
\u3042\u307F\u3082\u306E
\u3042\u3081\u308A\u304B
\u3042\u3084\u307E\u308B
\u3042\u3086\u3080
\u3042\u3089\u3044\u304F\u3099\u307E
\u3042\u3089\u3057
\u3042\u3089\u3059\u3057\u3099
\u3042\u3089\u305F\u3081\u308B
\u3042\u3089\u3086\u308B
\u3042\u3089\u308F\u3059
\u3042\u308A\u304B\u3099\u3068\u3046
\u3042\u308F\u305B\u308B
\u3042\u308F\u3066\u308B
\u3042\u3093\u3044
\u3042\u3093\u304B\u3099\u3044
\u3042\u3093\u3053
\u3042\u3093\u305B\u3099\u3093
\u3042\u3093\u3066\u3044
\u3042\u3093\u306A\u3044
\u3042\u3093\u307E\u308A
\u3044\u3044\u305F\u3099\u3059
\u3044\u304A\u3093
\u3044\u304B\u3099\u3044
\u3044\u304B\u3099\u304F
\u3044\u304D\u304A\u3044
\u3044\u304D\u306A\u308A
\u3044\u304D\u3082\u306E
\u3044\u304D\u308B
\u3044\u304F\u3057\u3099
\u3044\u304F\u3075\u3099\u3093
\u3044\u3051\u306F\u3099\u306A
\u3044\u3051\u3093
\u3044\u3053\u3046
\u3044\u3053\u304F
\u3044\u3053\u3064
\u3044\u3055\u307E\u3057\u3044
\u3044\u3055\u3093
\u3044\u3057\u304D
\u3044\u3057\u3099\u3085\u3046
\u3044\u3057\u3099\u3087\u3046
\u3044\u3057\u3099\u308F\u308B
\u3044\u3059\u3099\u307F
\u3044\u3059\u3099\u308C
\u3044\u305B\u3044
\u3044\u305B\u3048\u3072\u3099
\u3044\u305B\u304B\u3044
\u3044\u305B\u304D
\u3044\u305B\u3099\u3093
\u3044\u305D\u3046\u308D\u3046
\u3044\u305D\u304B\u3099\u3057\u3044
\u3044\u305F\u3099\u3044
\u3044\u305F\u3099\u304F
\u3044\u305F\u3059\u3099\u3089
\u3044\u305F\u307F
\u3044\u305F\u308A\u3042
\u3044\u3061\u304A\u3046
\u3044\u3061\u3057\u3099
\u3044\u3061\u3068\u3099
\u3044\u3061\u306F\u3099
\u3044\u3061\u3075\u3099
\u3044\u3061\u308A\u3085\u3046
\u3044\u3064\u304B
\u3044\u3063\u3057\u3085\u3093
\u3044\u3063\u305B\u3044
\u3044\u3063\u305D\u3046
\u3044\u3063\u305F\u3093
\u3044\u3063\u3061
\u3044\u3063\u3066\u3044
\u3044\u3063\u307B\u309A\u3046
\u3044\u3066\u3055\u3099
\u3044\u3066\u3093
\u3044\u3068\u3099\u3046
\u3044\u3068\u3053
\u3044\u306A\u3044
\u3044\u306A\u304B
\u3044\u306D\u3080\u308A
\u3044\u306E\u3061
\u3044\u306E\u308B
\u3044\u306F\u3064
\u3044\u306F\u3099\u308B
\u3044\u306F\u3093
\u3044\u3072\u3099\u304D
\u3044\u3072\u3093
\u3044\u3075\u304F
\u3044\u3078\u3093
\u3044\u307B\u3046
\u3044\u307F\u3093
\u3044\u3082\u3046\u3068
\u3044\u3082\u305F\u308C
\u3044\u3082\u308A
\u3044\u3084\u304B\u3099\u308B
\u3044\u3084\u3059
\u3044\u3088\u304B\u3093
\u3044\u3088\u304F
\u3044\u3089\u3044
\u3044\u3089\u3059\u3068
\u3044\u308A\u304F\u3099\u3061
\u3044\u308A\u3087\u3046
\u3044\u308C\u3044
\u3044\u308C\u3082\u306E
\u3044\u308C\u308B
\u3044\u308D\u3048\u3093\u3072\u309A\u3064
\u3044\u308F\u3044
\u3044\u308F\u3046
\u3044\u308F\u304B\u3093
\u3044\u308F\u306F\u3099
\u3044\u308F\u3086\u308B
\u3044\u3093\u3051\u3099\u3093\u307E\u3081
\u3044\u3093\u3055\u3064
\u3044\u3093\u3057\u3087\u3046
\u3044\u3093\u3088\u3046
\u3046\u3048\u304D
\u3046\u3048\u308B
\u3046\u304A\u3055\u3099
\u3046\u304B\u3099\u3044
\u3046\u304B\u3075\u3099
\u3046\u304B\u3078\u3099\u308B
\u3046\u304D\u308F
\u3046\u304F\u3089\u3044\u306A
\u3046\u304F\u308C\u308C
\u3046\u3051\u305F\u307E\u308F\u308B
\u3046\u3051\u3064\u3051
\u3046\u3051\u3068\u308B
\u3046\u3051\u3082\u3064
\u3046\u3051\u308B
\u3046\u3053\u3099\u304B\u3059
\u3046\u3053\u3099\u304F
\u3046\u3053\u3093
\u3046\u3055\u304D\u3099
\u3046\u3057\u306A\u3046
\u3046\u3057\u308D\u304B\u3099\u307F
\u3046\u3059\u3044
\u3046\u3059\u304D\u3099
\u3046\u3059\u304F\u3099\u3089\u3044
\u3046\u3059\u3081\u308B
\u3046\u305B\u3064
\u3046\u3061\u3042\u308F\u305B
\u3046\u3061\u304B\u3099\u308F
\u3046\u3061\u304D
\u3046\u3061\u3085\u3046
\u3046\u3063\u304B\u308A
\u3046\u3064\u304F\u3057\u3044
\u3046\u3063\u305F\u3048\u308B
\u3046\u3064\u308B
\u3046\u3068\u3099\u3093
\u3046\u306A\u304D\u3099
\u3046\u306A\u3057\u3099
\u3046\u306A\u3059\u3099\u304F
\u3046\u306A\u308B
\u3046\u306D\u308B
\u3046\u306E\u3046
\u3046\u3075\u3099\u3051\u3099
\u3046\u3075\u3099\u3053\u3099\u3048
\u3046\u307E\u308C\u308B
\u3046\u3081\u308B
\u3046\u3082\u3046
\u3046\u3084\u307E\u3046
\u3046\u3088\u304F
\u3046\u3089\u304B\u3099\u3048\u3059
\u3046\u3089\u304F\u3099\u3061
\u3046\u3089\u306A\u3044
\u3046\u308A\u3042\u3051\u3099
\u3046\u308A\u304D\u308C
\u3046\u308B\u3055\u3044
\u3046\u308C\u3057\u3044
\u3046\u308C\u3086\u304D
\u3046\u308C\u308B
\u3046\u308D\u3053
\u3046\u308F\u304D
\u3046\u308F\u3055
\u3046\u3093\u3053\u3046
\u3046\u3093\u3061\u3093
\u3046\u3093\u3066\u3093
\u3046\u3093\u3068\u3099\u3046
\u3048\u3044\u3048\u3093
\u3048\u3044\u304B\u3099
\u3048\u3044\u304D\u3087\u3046
\u3048\u3044\u3053\u3099
\u3048\u3044\u305B\u3044
\u3048\u3044\u3075\u3099\u3093
\u3048\u3044\u3088\u3046
\u3048\u3044\u308F
\u3048\u304A\u308A
\u3048\u304B\u3099\u304A
\u3048\u304B\u3099\u304F
\u3048\u304D\u305F\u3044
\u3048\u304F\u305B\u308B
\u3048\u3057\u3083\u304F
\u3048\u3059\u3066
\u3048\u3064\u3089\u3093
\u3048\u306E\u304F\u3099
\u3048\u307B\u3046\u307E\u304D
\u3048\u307B\u3093
\u3048\u307E\u304D
\u3048\u3082\u3057\u3099
\u3048\u3082\u306E
\u3048\u3089\u3044
\u3048\u3089\u3075\u3099
\u3048\u308A\u3042
\u3048\u3093\u3048\u3093
\u3048\u3093\u304B\u3044
\u3048\u3093\u304D\u3099
\u3048\u3093\u3051\u3099\u304D
\u3048\u3093\u3057\u3085\u3046
\u3048\u3093\u305B\u3099\u3064
\u3048\u3093\u305D\u304F
\u3048\u3093\u3061\u3087\u3046
\u3048\u3093\u3068\u3064
\u304A\u3044\u304B\u3051\u308B
\u304A\u3044\u3053\u3059
\u304A\u3044\u3057\u3044
\u304A\u3044\u3064\u304F
\u304A\u3046\u3048\u3093
\u304A\u3046\u3055\u307E
\u304A\u3046\u3057\u3099
\u304A\u3046\u305B\u3064
\u304A\u3046\u305F\u3044
\u304A\u3046\u3075\u304F
\u304A\u3046\u3078\u3099\u3044
\u304A\u3046\u3088\u3046
\u304A\u3048\u308B
\u304A\u304A\u3044
\u304A\u304A\u3046
\u304A\u304A\u3068\u3099\u304A\u308A
\u304A\u304A\u3084
\u304A\u304A\u3088\u305D
\u304A\u304B\u3048\u308A
\u304A\u304B\u3059\u3099
\u304A\u304B\u3099\u3080
\u304A\u304B\u308F\u308A
\u304A\u304D\u3099\u306A\u3046
\u304A\u304D\u308B
\u304A\u304F\u3055\u307E
\u304A\u304F\u3057\u3099\u3087\u3046
\u304A\u304F\u308A\u304B\u3099\u306A
\u304A\u304F\u308B
\u304A\u304F\u308C\u308B
\u304A\u3053\u3059
\u304A\u3053\u306A\u3046
\u304A\u3053\u308B
\u304A\u3055\u3048\u308B
\u304A\u3055\u306A\u3044
\u304A\u3055\u3081\u308B
\u304A\u3057\u3044\u308C
\u304A\u3057\u3048\u308B
\u304A\u3057\u3099\u304D\u3099
\u304A\u3057\u3099\u3055\u3093
\u304A\u3057\u3083\u308C
\u304A\u305D\u3089\u304F
\u304A\u305D\u308F\u308B
\u304A\u305F\u304B\u3099\u3044
\u304A\u305F\u304F
\u304A\u305F\u3099\u3084\u304B
\u304A\u3061\u3064\u304F
\u304A\u3063\u3068
\u304A\u3064\u308A
\u304A\u3066\u3099\u304B\u3051
\u304A\u3068\u3057\u3082\u306E
\u304A\u3068\u306A\u3057\u3044
\u304A\u3068\u3099\u308A
\u304A\u3068\u3099\u308D\u304B\u3059
\u304A\u306F\u3099\u3055\u3093
\u304A\u307E\u3044\u308A
\u304A\u3081\u3066\u3099\u3068\u3046
\u304A\u3082\u3044\u3066\u3099
\u304A\u3082\u3046
\u304A\u3082\u305F\u3044
\u304A\u3082\u3061\u3083
\u304A\u3084\u3064
\u304A\u3084\u3086\u3072\u3099
\u304A\u3088\u307B\u3099\u3059
\u304A\u3089\u3093\u305F\u3099
\u304A\u308D\u3059
\u304A\u3093\u304B\u3099\u304F
\u304A\u3093\u3051\u3044
\u304A\u3093\u3057\u3083
\u304A\u3093\u305B\u3093
\u304A\u3093\u305F\u3099\u3093
\u304A\u3093\u3061\u3085\u3046
\u304A\u3093\u3068\u3099\u3051\u3044
\u304B\u3042\u3064
\u304B\u3044\u304B\u3099
\u304B\u3099\u3044\u304D
\u304B\u3099\u3044\u3051\u3093
\u304B\u3099\u3044\u3053\u3046
\u304B\u3044\u3055\u3064
\u304B\u3044\u3057\u3083
\u304B\u3044\u3059\u3044\u3088\u304F
\u304B\u3044\u305B\u3099\u3093
\u304B\u3044\u305D\u3099\u3046\u3068\u3099
\u304B\u3044\u3064\u3046
\u304B\u3044\u3066\u3093
\u304B\u3044\u3068\u3046
\u304B\u3044\u3075\u304F
\u304B\u3099\u3044\u3078\u304D
\u304B\u3044\u307B\u3046
\u304B\u3044\u3088\u3046
\u304B\u3099\u3044\u3089\u3044
\u304B\u3044\u308F
\u304B\u3048\u308B
\u304B\u304A\u308A
\u304B\u304B\u3048\u308B
\u304B\u304B\u3099\u304F
\u304B\u304B\u3099\u3057
\u304B\u304B\u3099\u307F
\u304B\u304F\u3053\u3099
\u304B\u304F\u3068\u304F
\u304B\u3055\u3099\u308B
\u304B\u3099\u305D\u3099\u3046
\u304B\u305F\u3044
\u304B\u305F\u3061
\u304B\u3099\u3061\u3087\u3046
\u304B\u3099\u3063\u304D\u3085\u3046
\u304B\u3099\u3063\u3053\u3046
\u304B\u3099\u3063\u3055\u3093
\u304B\u3099\u3063\u3057\u3087\u3046
\u304B\u306A\u3055\u3099\u308F\u3057
\u304B\u306E\u3046
\u304B\u3099\u306F\u304F
\u304B\u3075\u3099\u304B
\u304B\u307B\u3046
\u304B\u307B\u3053\u3099
\u304B\u307E\u3046
\u304B\u307E\u307B\u3099\u3053
\u304B\u3081\u308C\u304A\u3093
\u304B\u3086\u3044
\u304B\u3088\u3046\u3072\u3099
\u304B\u3089\u3044
\u304B\u308B\u3044
\u304B\u308D\u3046
\u304B\u308F\u304F
\u304B\u308F\u3089
\u304B\u3099\u3093\u304B
\u304B\u3093\u3051\u3044
\u304B\u3093\u3053\u3046
\u304B\u3093\u3057\u3083
\u304B\u3093\u305D\u3046
\u304B\u3093\u305F\u3093
\u304B\u3093\u3061
\u304B\u3099\u3093\u306F\u3099\u308B
\u304D\u3042\u3044
\u304D\u3042\u3064
\u304D\u3044\u308D
\u304D\u3099\u3044\u3093
\u304D\u3046\u3044
\u304D\u3046\u3093
\u304D\u3048\u308B
\u304D\u304A\u3046
\u304D\u304A\u304F
\u304D\u304A\u3061
\u304D\u304A\u3093
\u304D\u304B\u3044
\u304D\u304B\u304F
\u304D\u304B\u3093\u3057\u3083
\u304D\u304D\u3066
\u304D\u304F\u306F\u3099\u308A
\u304D\u304F\u3089\u3051\u3099
\u304D\u3051\u3093\u305B\u3044
\u304D\u3053\u3046
\u304D\u3053\u3048\u308B
\u304D\u3053\u304F
\u304D\u3055\u3044
\u304D\u3055\u304F
\u304D\u3055\u307E
\u304D\u3055\u3089\u304D\u3099
\u304D\u3099\u3057\u3099\u304B\u304B\u3099\u304F
\u304D\u3099\u3057\u304D
\u304D\u3099\u3057\u3099\u305F\u3044\u3051\u3093
\u304D\u3099\u3057\u3099\u306B\u3063\u3066\u3044
\u304D\u3099\u3057\u3099\u3085\u3064\u3057\u3083
\u304D\u3059\u3046
\u304D\u305B\u3044
\u304D\u305B\u304D
\u304D\u305B\u3064
\u304D\u305D\u3046
\u304D\u305D\u3099\u304F
\u304D\u305D\u3099\u3093
\u304D\u305F\u3048\u308B
\u304D\u3061\u3087\u3046
\u304D\u3064\u3048\u3093
\u304D\u3099\u3063\u3061\u308A
\u304D\u3064\u3064\u304D
\u304D\u3064\u306D
\u304D\u3066\u3044
\u304D\u3068\u3099\u3046
\u304D\u3068\u3099\u304F
\u304D\u306A\u3044
\u304D\u306A\u304B\u3099
\u304D\u306A\u3053
\u304D\u306C\u3053\u3099\u3057
\u304D\u306D\u3093
\u304D\u306E\u3046
\u304D\u306E\u3057\u305F
\u304D\u306F\u304F
\u304D\u3072\u3099\u3057\u3044
\u304D\u3072\u3093
\u304D\u3075\u304F
\u304D\u3075\u3099\u3093
\u304D\u307B\u3099\u3046
\u304D\u307B\u3093
\u304D\u307E\u308B
\u304D\u307F\u3064
\u304D\u3080\u3059\u3099\u304B\u3057\u3044
\u304D\u3081\u308B
\u304D\u3082\u305F\u3099\u3081\u3057
\u304D\u3082\u3061
\u304D\u3082\u306E
\u304D\u3083\u304F
\u304D\u3084\u304F
\u304D\u3099\u3085\u3046\u306B\u304F
\u304D\u3088\u3046
\u304D\u3087\u3046\u308A\u3085\u3046
\u304D\u3089\u3044
\u304D\u3089\u304F
\u304D\u308A\u3093
\u304D\u308C\u3044
\u304D\u308C\u3064
\u304D\u308D\u304F
\u304D\u3099\u308D\u3093
\u304D\u308F\u3081\u308B
\u304D\u3099\u3093\u3044\u308D
\u304D\u3093\u304B\u304F\u3057\u3099
\u304D\u3093\u3057\u3099\u3087
\u304D\u3093\u3088\u3046\u3072\u3099
\u304F\u3099\u3042\u3044
\u304F\u3044\u3059\u3099
\u304F\u3046\u304B\u3093
\u304F\u3046\u304D
\u304F\u3046\u304F\u3099\u3093
\u304F\u3046\u3053\u3046
\u304F\u3099\u3046\u305B\u3044
\u304F\u3046\u305D\u3046
\u304F\u3099\u3046\u305F\u3089
\u304F\u3046\u3075\u304F
\u304F\u3046\u307B\u3099
\u304F\u304B\u3093
\u304F\u304D\u3087\u3046
\u304F\u3051\u3099\u3093
\u304F\u3099\u3053\u3046
\u304F\u3055\u3044
\u304F\u3055\u304D
\u304F\u3055\u306F\u3099\u306A
\u304F\u3055\u308B
\u304F\u3057\u3083\u307F
\u304F\u3057\u3087\u3046
\u304F\u3059\u306E\u304D
\u304F\u3059\u308A\u3086\u3072\u3099
\u304F\u305B\u3051\u3099
\u304F\u305B\u3093
\u304F\u3099\u305F\u3044\u3066\u304D
\u304F\u305F\u3099\u3055\u308B
\u304F\u305F\u3072\u3099\u308C\u308B
\u304F\u3061\u3053\u307F
\u304F\u3061\u3055\u304D
\u304F\u3064\u3057\u305F
\u304F\u3099\u3063\u3059\u308A
\u304F\u3064\u308D\u304F\u3099
\u304F\u3068\u3046\u3066\u3093
\u304F\u3068\u3099\u304F
\u304F\u306A\u3093
\u304F\u306D\u304F\u306D
\u304F\u306E\u3046
\u304F\u3075\u3046
\u304F\u307F\u3042\u308F\u305B
\u304F\u307F\u305F\u3066\u308B
\u304F\u3081\u308B
\u304F\u3084\u304F\u3057\u3087
\u304F\u3089\u3059
\u304F\u3089\u3078\u3099\u308B
\u304F\u308B\u307E
\u304F\u308C\u308B
\u304F\u308D\u3046
\u304F\u308F\u3057\u3044
\u304F\u3099\u3093\u304B\u3093
\u304F\u3099\u3093\u3057\u3087\u304F
\u304F\u3099\u3093\u305F\u3044
\u304F\u3099\u3093\u3066
\u3051\u3042\u306A
\u3051\u3044\u304B\u304F
\u3051\u3044\u3051\u3093
\u3051\u3044\u3053
\u3051\u3044\u3055\u3064
\u3051\u3099\u3044\u3057\u3099\u3085\u3064
\u3051\u3044\u305F\u3044
\u3051\u3099\u3044\u306E\u3046\u3057\u3099\u3093
\u3051\u3044\u308C\u304D
\u3051\u3044\u308D
\u3051\u304A\u3068\u3059
\u3051\u304A\u308A\u3082\u306E
\u3051\u3099\u304D\u304B
\u3051\u3099\u304D\u3051\u3099\u3093
\u3051\u3099\u304D\u305F\u3099\u3093
\u3051\u3099\u304D\u3061\u3093
\u3051\u3099\u304D\u3068\u3064
\u3051\u3099\u304D\u306F
\u3051\u3099\u304D\u3084\u304F
\u3051\u3099\u3053\u3046
\u3051\u3099\u3053\u304F\u3057\u3099\u3087\u3046
\u3051\u3099\u3055\u3099\u3044
\u3051\u3055\u304D
\u3051\u3099\u3055\u3099\u3093
\u3051\u3057\u304D
\u3051\u3057\u3053\u3099\u3080
\u3051\u3057\u3087\u3046
\u3051\u3099\u3059\u3068
\u3051\u305F\u306F\u3099
\u3051\u3061\u3083\u3063\u3075\u309A
\u3051\u3061\u3089\u3059
\u3051\u3064\u3042\u3064
\u3051\u3064\u3044
\u3051\u3064\u3048\u304D
\u3051\u3063\u3053\u3093
\u3051\u3064\u3057\u3099\u3087
\u3051\u3063\u305B\u304D
\u3051\u3063\u3066\u3044
\u3051\u3064\u307E\u3064
\u3051\u3099\u3064\u3088\u3046\u3072\u3099
\u3051\u3099\u3064\u308C\u3044
\u3051\u3064\u308D\u3093
\u3051\u3099\u3068\u3099\u304F
\u3051\u3068\u306F\u3099\u3059
\u3051\u3068\u308B
\u3051\u306A\u3051\u3099
\u3051\u306A\u3059
\u3051\u306A\u307F
\u3051\u306C\u304D
\u3051\u3099\u306D\u3064
\u3051\u306D\u3093
\u3051\u306F\u3044
\u3051\u3099\u3072\u3093
\u3051\u3075\u3099\u304B\u3044
\u3051\u3099\u307B\u3099\u304F
\u3051\u307E\u308A
\u3051\u307F\u304B\u308B
\u3051\u3080\u3057
\u3051\u3080\u308A
\u3051\u3082\u306E
\u3051\u3089\u3044
\u3051\u308D\u3051\u308D
\u3051\u308F\u3057\u3044
\u3051\u3093\u3044
\u3051\u3093\u3048\u3064
\u3051\u3093\u304A
\u3051\u3093\u304B
\u3051\u3099\u3093\u304D
\u3051\u3093\u3051\u3099\u3093
\u3051\u3093\u3053\u3046
\u3051\u3093\u3055\u304F
\u3051\u3093\u3057\u3085\u3046
\u3051\u3093\u3059\u3046
\u3051\u3099\u3093\u305D\u3046
\u3051\u3093\u3061\u304F
\u3051\u3093\u3066\u3044
\u3051\u3093\u3068\u3046
\u3051\u3093\u306A\u3044
\u3051\u3093\u306B\u3093
\u3051\u3099\u3093\u3075\u3099\u3064
\u3051\u3093\u307E
\u3051\u3093\u307F\u3093
\u3051\u3093\u3081\u3044
\u3051\u3093\u3089\u3093
\u3051\u3093\u308A
\u3053\u3042\u304F\u307E
\u3053\u3044\u306C
\u3053\u3044\u3072\u3099\u3068
\u3053\u3099\u3046\u3044
\u3053\u3046\u3048\u3093
\u3053\u3046\u304A\u3093
\u3053\u3046\u304B\u3093
\u3053\u3099\u3046\u304D\u3085\u3046
\u3053\u3099\u3046\u3051\u3044
\u3053\u3046\u3053\u3046
\u3053\u3046\u3055\u3044
\u3053\u3046\u3057\u3099
\u3053\u3046\u3059\u3044
\u3053\u3099\u3046\u305B\u3044
\u3053\u3046\u305D\u304F
\u3053\u3046\u305F\u3044
\u3053\u3046\u3061\u3083
\u3053\u3046\u3064\u3046
\u3053\u3046\u3066\u3044
\u3053\u3046\u3068\u3099\u3046
\u3053\u3046\u306A\u3044
\u3053\u3046\u306F\u3044
\u3053\u3099\u3046\u307B\u3046
\u3053\u3099\u3046\u307E\u3093
\u3053\u3046\u3082\u304F
\u3053\u3046\u308A\u3064
\u3053\u3048\u308B
\u3053\u304A\u308A
\u3053\u3099\u304B\u3044
\u3053\u3099\u304B\u3099\u3064
\u3053\u3099\u304B\u3093
\u3053\u304F\u3053\u3099
\u3053\u304F\u3055\u3044
\u3053\u304F\u3068\u3046
\u3053\u304F\u306A\u3044
\u3053\u304F\u306F\u304F
\u3053\u304F\u3099\u307E
\u3053\u3051\u3044
\u3053\u3051\u308B
\u3053\u3053\u306E\u304B
\u3053\u3053\u308D
\u3053\u3055\u3081
\u3053\u3057\u3064
\u3053\u3059\u3046
\u3053\u305B\u3044
\u3053\u305B\u304D
\u3053\u305B\u3099\u3093
\u3053\u305D\u305F\u3099\u3066
\u3053\u305F\u3044
\u3053\u305F\u3048\u308B
\u3053\u305F\u3064
\u3053\u3061\u3087\u3046
\u3053\u3063\u304B
\u3053\u3064\u3053\u3064
\u3053\u3064\u306F\u3099\u3093
\u3053\u3064\u3075\u3099
\u3053\u3066\u3044
\u3053\u3066\u3093
\u3053\u3068\u304B\u3099\u3089
\u3053\u3068\u3057
\u3053\u3068\u306F\u3099
\u3053\u3068\u308A
\u3053\u306A\u3053\u3099\u306A
\u3053\u306D\u3053\u306D
\u3053\u306E\u307E\u307E
\u3053\u306E\u307F
\u3053\u306E\u3088
\u3053\u3099\u306F\u3093
\u3053\u3072\u3064\u3057\u3099
\u3053\u3075\u3046
\u3053\u3075\u3093
\u3053\u307B\u3099\u308C\u308B
\u3053\u3099\u307E\u3042\u3075\u3099\u3089
\u3053\u307E\u304B\u3044
\u3053\u3099\u307E\u3059\u308A
\u3053\u307E\u3064\u306A
\u3053\u307E\u308B
\u3053\u3080\u304D\u3099\u3053
\u3053\u3082\u3057\u3099
\u3053\u3082\u3061
\u3053\u3082\u306E
\u3053\u3082\u3093
\u3053\u3084\u304F
\u3053\u3084\u307E
\u3053\u3086\u3046
\u3053\u3086\u3072\u3099
\u3053\u3088\u3044
\u3053\u3088\u3046
\u3053\u308A\u308B
\u3053\u308C\u304F\u3057\u3087\u3093
\u3053\u308D\u3063\u3051
\u3053\u308F\u3082\u3066
\u3053\u308F\u308C\u308B
\u3053\u3093\u3044\u3093
\u3053\u3093\u304B\u3044
\u3053\u3093\u304D
\u3053\u3093\u3057\u3085\u3046
\u3053\u3093\u3059\u3044
\u3053\u3093\u305F\u3099\u3066
\u3053\u3093\u3068\u3093
\u3053\u3093\u306A\u3093
\u3053\u3093\u3072\u3099\u306B
\u3053\u3093\u307B\u309A\u3093
\u3053\u3093\u307E\u3051
\u3053\u3093\u3084
\u3053\u3093\u308C\u3044
\u3053\u3093\u308F\u304F
\u3055\u3099\u3044\u3048\u304D
\u3055\u3044\u304B\u3044
\u3055\u3044\u304D\u3093
\u3055\u3099\u3044\u3051\u3099\u3093
\u3055\u3099\u3044\u3053
\u3055\u3044\u3057\u3087
\u3055\u3044\u305B\u3044
\u3055\u3099\u3044\u305F\u304F
\u3055\u3099\u3044\u3061\u3085\u3046
\u3055\u3044\u3066\u304D
\u3055\u3099\u3044\u308A\u3087\u3046
\u3055\u3046\u306A
\u3055\u304B\u3044\u3057
\u3055\u304B\u3099\u3059
\u3055\u304B\u306A
\u3055\u304B\u307F\u3061
\u3055\u304B\u3099\u308B
\u3055\u304D\u3099\u3087\u3046
\u3055\u304F\u3057
\u3055\u304F\u3072\u3093
\u3055\u304F\u3089
\u3055\u3053\u304F
\u3055\u3053\u3064
\u3055\u3059\u3099\u304B\u308B
\u3055\u3099\u305B\u304D
\u3055\u305F\u3093
\u3055\u3064\u3048\u3044
\u3055\u3099\u3064\u304A\u3093
\u3055\u3099\u3063\u304B
\u3055\u3099\u3064\u304B\u3099\u304F
\u3055\u3063\u304D\u3087\u304F
\u3055\u3099\u3063\u3057
\u3055\u3064\u3057\u3099\u3093
\u3055\u3099\u3063\u305D\u3046
\u3055\u3064\u305F\u306F\u3099
\u3055\u3064\u307E\u3044\u3082
\u3055\u3066\u3044
\u3055\u3068\u3044\u3082
\u3055\u3068\u3046
\u3055\u3068\u304A\u3084
\u3055\u3068\u3057
\u3055\u3068\u308B
\u3055\u306E\u3046
\u3055\u306F\u3099\u304F
\u3055\u3072\u3099\u3057\u3044
\u3055\u3078\u3099\u3064
\u3055\u307B\u3046
\u3055\u307B\u3068\u3099
\u3055\u307E\u3059
\u3055\u307F\u3057\u3044
\u3055\u307F\u305F\u3099\u308C
\u3055\u3080\u3051
\u3055\u3081\u308B
\u3055\u3084\u3048\u3093\u3068\u3099\u3046
\u3055\u3086\u3046
\u3055\u3088\u3046
\u3055\u3088\u304F
\u3055\u3089\u305F\u3099
\u3055\u3099\u308B\u305D\u306F\u3099
\u3055\u308F\u3084\u304B
\u3055\u308F\u308B
\u3055\u3093\u3044\u3093
\u3055\u3093\u304B
\u3055\u3093\u304D\u3083\u304F
\u3055\u3093\u3053\u3046
\u3055\u3093\u3055\u3044
\u3055\u3099\u3093\u3057\u3087
\u3055\u3093\u3059\u3046
\u3055\u3093\u305B\u3044
\u3055\u3093\u305D
\u3055\u3093\u3061
\u3055\u3093\u307E
\u3055\u3093\u307F
\u3055\u3093\u3089\u3093
\u3057\u3042\u3044
\u3057\u3042\u3051\u3099
\u3057\u3042\u3055\u3063\u3066
\u3057\u3042\u308F\u305B
\u3057\u3044\u304F
\u3057\u3044\u3093
\u3057\u3046\u3061
\u3057\u3048\u3044
\u3057\u304A\u3051
\u3057\u304B\u3044
\u3057\u304B\u304F
\u3057\u3099\u304B\u3093
\u3057\u3053\u3099\u3068
\u3057\u3059\u3046
\u3057\u3099\u305F\u3099\u3044
\u3057\u305F\u3046\u3051
\u3057\u305F\u304D\u3099
\u3057\u305F\u3066
\u3057\u305F\u307F
\u3057\u3061\u3087\u3046
\u3057\u3061\u308A\u3093
\u3057\u3063\u304B\u308A
\u3057\u3064\u3057\u3099
\u3057\u3064\u3082\u3093
\u3057\u3066\u3044
\u3057\u3066\u304D
\u3057\u3066\u3064
\u3057\u3099\u3066\u3093
\u3057\u3099\u3068\u3099\u3046
\u3057\u306A\u304D\u3099\u308C
\u3057\u306A\u3082\u306E
\u3057\u306A\u3093
\u3057\u306D\u307E
\u3057\u306D\u3093
\u3057\u306E\u304F\u3099
\u3057\u306E\u3075\u3099
\u3057\u306F\u3044
\u3057\u306F\u3099\u304B\u308A
\u3057\u306F\u3064
\u3057\u306F\u3089\u3044
\u3057\u306F\u3093
\u3057\u3072\u3087\u3046
\u3057\u3075\u304F
\u3057\u3099\u3075\u3099\u3093
\u3057\u3078\u3044
\u3057\u307B\u3046
\u3057\u307B\u3093
\u3057\u307E\u3046
\u3057\u307E\u308B
\u3057\u307F\u3093
\u3057\u3080\u3051\u308B
\u3057\u3099\u3080\u3057\u3087
\u3057\u3081\u3044
\u3057\u3081\u308B
\u3057\u3082\u3093
\u3057\u3083\u3044\u3093
\u3057\u3083\u3046\u3093
\u3057\u3083\u304A\u3093
\u3057\u3099\u3083\u304B\u3099\u3044\u3082
\u3057\u3084\u304F\u3057\u3087
\u3057\u3083\u304F\u307B\u3046
\u3057\u3083\u3051\u3093
\u3057\u3083\u3053
\u3057\u3083\u3055\u3099\u3044
\u3057\u3083\u3057\u3093
\u3057\u3083\u305B\u3093
\u3057\u3083\u305D\u3046
\u3057\u3083\u305F\u3044
\u3057\u3083\u3061\u3087\u3046
\u3057\u3083\u3063\u304D\u3093
\u3057\u3099\u3083\u307E
\u3057\u3083\u308A\u3093
\u3057\u3083\u308C\u3044
\u3057\u3099\u3086\u3046
\u3057\u3099\u3085\u3046\u3057\u3087
\u3057\u3085\u304F\u306F\u304F
\u3057\u3099\u3085\u3057\u3093
\u3057\u3085\u3063\u305B\u304D
\u3057\u3085\u307F
\u3057\u3085\u3089\u306F\u3099
\u3057\u3099\u3085\u3093\u306F\u3099\u3093
\u3057\u3087\u3046\u304B\u3044
\u3057\u3087\u304F\u305F\u304F
\u3057\u3087\u3063\u3051\u3093
\u3057\u3087\u3068\u3099\u3046
\u3057\u3087\u3082\u3064
\u3057\u3089\u305B\u308B
\u3057\u3089\u3078\u3099\u308B
\u3057\u3093\u304B
\u3057\u3093\u3053\u3046
\u3057\u3099\u3093\u3057\u3099\u3083
\u3057\u3093\u305B\u3044\u3057\u3099
\u3057\u3093\u3061\u304F
\u3057\u3093\u308A\u3093
\u3059\u3042\u3051\u3099
\u3059\u3042\u3057
\u3059\u3042\u306A
\u3059\u3099\u3042\u3093
\u3059\u3044\u3048\u3044
\u3059\u3044\u304B
\u3059\u3044\u3068\u3046
\u3059\u3099\u3044\u3075\u3099\u3093
\u3059\u3044\u3088\u3046\u3072\u3099
\u3059\u3046\u304B\u3099\u304F
\u3059\u3046\u3057\u3099\u3064
\u3059\u3046\u305B\u3093
\u3059\u304A\u3068\u3099\u308A
\u3059\u304D\u307E
\u3059\u304F\u3046
\u3059\u304F\u306A\u3044
\u3059\u3051\u308B
\u3059\u3053\u3099\u3044
\u3059\u3053\u3057
\u3059\u3099\u3055\u3093
\u3059\u3059\u3099\u3057\u3044
\u3059\u3059\u3080
\u3059\u3059\u3081\u308B
\u3059\u3063\u304B\u308A
\u3059\u3099\u3063\u3057\u308A
\u3059\u3099\u3063\u3068
\u3059\u3066\u304D
\u3059\u3066\u308B
\u3059\u306D\u308B
\u3059\u306E\u3053
\u3059\u306F\u305F\u3099
\u3059\u306F\u3099\u3089\u3057\u3044
\u3059\u3099\u3072\u3087\u3046
\u3059\u3099\u3075\u3099\u306C\u308C
\u3059\u3075\u3099\u308A
\u3059\u3075\u308C
\u3059\u3078\u3099\u3066
\u3059\u3078\u3099\u308B
\u3059\u3099\u307B\u3046
\u3059\u307B\u3099\u3093
\u3059\u307E\u3044
\u3059\u3081\u3057
\u3059\u3082\u3046
\u3059\u3084\u304D
\u3059\u3089\u3059\u3089
\u3059\u308B\u3081
\u3059\u308C\u3061\u304B\u3099\u3046
\u3059\u308D\u3063\u3068
\u3059\u308F\u308B
\u3059\u3093\u305B\u3099\u3093
\u3059\u3093\u307B\u309A\u3046
\u305B\u3042\u3075\u3099\u3089
\u305B\u3044\u304B\u3064
\u305B\u3044\u3051\u3099\u3093
\u305B\u3044\u3057\u3099
\u305B\u3044\u3088\u3046
\u305B\u304A\u3046
\u305B\u304B\u3044\u304B\u3093
\u305B\u304D\u306B\u3093
\u305B\u304D\u3080
\u305B\u304D\u3086
\u305B\u304D\u3089\u3093\u3046\u3093
\u305B\u3051\u3093
\u305B\u3053\u3046
\u305B\u3059\u3057\u3099
\u305B\u305F\u3044
\u305B\u305F\u3051
\u305B\u3063\u304B\u304F
\u305B\u3063\u304D\u3083\u304F
\u305B\u3099\u3063\u304F
\u305B\u3063\u3051\u3093
\u305B\u3063\u3053\u3064
\u305B\u3063\u3055\u305F\u304F\u307E
\u305B\u3064\u305D\u3099\u304F
\u305B\u3064\u305F\u3099\u3093
\u305B\u3064\u3066\u3099\u3093
\u305B\u3063\u306F\u309A\u3093
\u305B\u3064\u3072\u3099
\u305B\u3064\u3075\u3099\u3093
\u305B\u3064\u3081\u3044
\u305B\u3064\u308A\u3064
\u305B\u306A\u304B
\u305B\u306E\u3072\u3099
\u305B\u306F\u306F\u3099
\u305B\u3072\u3099\u308D
\u305B\u307B\u3099\u306D
\u305B\u307E\u3044
\u305B\u307E\u308B
\u305B\u3081\u308B
\u305B\u3082\u305F\u308C
\u305B\u308A\u3075
\u305B\u3099\u3093\u3042\u304F
\u305B\u3093\u3044
\u305B\u3093\u3048\u3044
\u305B\u3093\u304B
\u305B\u3093\u304D\u3087
\u305B\u3093\u304F
\u305B\u3093\u3051\u3099\u3093
\u305B\u3099\u3093\u3053\u3099
\u305B\u3093\u3055\u3044
\u305B\u3093\u3057\u3085
\u305B\u3093\u3059\u3044
\u305B\u3093\u305B\u3044
\u305B\u3093\u305D\u3099
\u305B\u3093\u305F\u304F
\u305B\u3093\u3061\u3087\u3046
\u305B\u3093\u3066\u3044
\u305B\u3093\u3068\u3046
\u305B\u3093\u306C\u304D
\u305B\u3093\u306D\u3093
\u305B\u3093\u306F\u309A\u3044
\u305B\u3099\u3093\u3075\u3099
\u305B\u3099\u3093\u307B\u309A\u3046
\u305B\u3093\u3080
\u305B\u3093\u3081\u3093\u3057\u3099\u3087
\u305B\u3093\u3082\u3093
\u305B\u3093\u3084\u304F
\u305B\u3093\u3086\u3046
\u305B\u3093\u3088\u3046
\u305B\u3099\u3093\u3089
\u305B\u3099\u3093\u308A\u3083\u304F
\u305B\u3093\u308C\u3044
\u305B\u3093\u308D
\u305D\u3042\u304F
\u305D\u3044\u3068\u3051\u3099\u308B
\u305D\u3044\u306D
\u305D\u3046\u304B\u3099\u3093\u304D\u3087\u3046
\u305D\u3046\u304D
\u305D\u3046\u3053\u3099
\u305D\u3046\u3057\u3093
\u305D\u3046\u305F\u3099\u3093
\u305D\u3046\u306A\u3093
\u305D\u3046\u3072\u3099
\u305D\u3046\u3081\u3093
\u305D\u3046\u308A
\u305D\u3048\u3082\u306E
\u305D\u3048\u3093
\u305D\u304B\u3099\u3044
\u305D\u3051\u3099\u304D
\u305D\u3053\u3046
\u305D\u3053\u305D\u3053
\u305D\u3055\u3099\u3044
\u305D\u3057\u306A
\u305D\u305B\u3044
\u305D\u305B\u3093
\u305D\u305D\u304F\u3099
\u305D\u305F\u3099\u3066\u308B
\u305D\u3064\u3046
\u305D\u3064\u3048\u3093
\u305D\u3063\u304B\u3093
\u305D\u3064\u304D\u3099\u3087\u3046
\u305D\u3063\u3051\u3064
\u305D\u3063\u3053\u3046
\u305D\u3063\u305B\u3093
\u305D\u3063\u3068
\u305D\u3068\u304B\u3099\u308F
\u305D\u3068\u3064\u3099\u3089
\u305D\u306A\u3048\u308B
\u305D\u306A\u305F
\u305D\u3075\u307B\u3099
\u305D\u307B\u3099\u304F
\u305D\u307B\u3099\u308D
\u305D\u307E\u3064
\u305D\u307E\u308B
\u305D\u3080\u304F
\u305D\u3080\u308A\u3048
\u305D\u3081\u308B
\u305D\u3082\u305D\u3082
\u305D\u3088\u304B\u305B\u3099
\u305D\u3089\u307E\u3081
\u305D\u308D\u3046
\u305D\u3093\u304B\u3044
\u305D\u3093\u3051\u3044
\u305D\u3093\u3055\u3099\u3044
\u305D\u3093\u3057\u3064
\u305D\u3093\u305D\u3099\u304F
\u305D\u3093\u3061\u3087\u3046
\u305D\u3099\u3093\u3072\u3099
\u305D\u3099\u3093\u3075\u3099\u3093
\u305D\u3093\u307F\u3093
\u305F\u3042\u3044
\u305F\u3044\u3044\u3093
\u305F\u3044\u3046\u3093
\u305F\u3044\u3048\u304D
\u305F\u3044\u304A\u3046
\u305F\u3099\u3044\u304B\u3099\u304F
\u305F\u3044\u304D
\u305F\u3044\u304F\u3099\u3046
\u305F\u3044\u3051\u3093
\u305F\u3044\u3053
\u305F\u3044\u3055\u3099\u3044
\u305F\u3099\u3044\u3057\u3099\u3087\u3046\u3075\u3099
\u305F\u3099\u3044\u3059\u304D
\u305F\u3044\u305B\u3064
\u305F\u3044\u305D\u3046
\u305F\u3099\u3044\u305F\u3044
\u305F\u3044\u3061\u3087\u3046
\u305F\u3044\u3066\u3044
\u305F\u3099\u3044\u3068\u3099\u3053\u308D
\u305F\u3044\u306A\u3044
\u305F\u3044\u306D\u3064
\u305F\u3044\u306E\u3046
\u305F\u3044\u306F\u3093
\u305F\u3099\u3044\u3072\u3087\u3046
\u305F\u3044\u3075\u3046
\u305F\u3044\u3078\u3093
\u305F\u3044\u307B
\u305F\u3044\u307E\u3064\u306F\u3099\u306A
\u305F\u3044\u307F\u3093\u304F\u3099
\u305F\u3044\u3080
\u305F\u3044\u3081\u3093
\u305F\u3044\u3084\u304D
\u305F\u3044\u3088\u3046
\u305F\u3044\u3089
\u305F\u3044\u308A\u3087\u304F
\u305F\u3044\u308B
\u305F\u3044\u308F\u3093
\u305F\u3046\u3048
\u305F\u3048\u308B
\u305F\u304A\u3059
\u305F\u304A\u308B
\u305F\u304A\u308C\u308B
\u305F\u304B\u3044
\u305F\u304B\u306D
\u305F\u304D\u3072\u3099
\u305F\u304F\u3055\u3093
\u305F\u3053\u304F
\u305F\u3053\u3084\u304D
\u305F\u3055\u3044
\u305F\u3057\u3055\u3099\u3093
\u305F\u3099\u3057\u3099\u3083\u308C
\u305F\u3059\u3051\u308B
\u305F\u3059\u3099\u3055\u308F\u308B
\u305F\u305D\u304B\u3099\u308C
\u305F\u305F\u304B\u3046
\u305F\u305F\u304F
\u305F\u305F\u3099\u3057\u3044
\u305F\u305F\u307F
\u305F\u3061\u306F\u3099\u306A
\u305F\u3099\u3063\u304B\u3044
\u305F\u3099\u3063\u304D\u3083\u304F
\u305F\u3099\u3063\u3053
\u305F\u3099\u3063\u3057\u3085\u3064
\u305F\u3099\u3063\u305F\u3044
\u305F\u3066\u308B
\u305F\u3068\u3048\u308B
\u305F\u306A\u306F\u3099\u305F
\u305F\u306B\u3093
\u305F\u306C\u304D
\u305F\u306E\u3057\u307F
\u305F\u306F\u3064
\u305F\u3075\u3099\u3093
\u305F\u3078\u3099\u308B
\u305F\u307B\u3099\u3046
\u305F\u307E\u3053\u3099
\u305F\u307E\u308B
\u305F\u3099\u3080\u308B
\u305F\u3081\u3044\u304D
\u305F\u3081\u3059
\u305F\u3081\u308B
\u305F\u3082\u3064
\u305F\u3084\u3059\u3044
\u305F\u3088\u308B
\u305F\u3089\u3059
\u305F\u308A\u304D\u307B\u3093\u304B\u3099\u3093
\u305F\u308A\u3087\u3046
\u305F\u308A\u308B
\u305F\u308B\u3068
\u305F\u308C\u308B
\u305F\u308C\u3093\u3068
\u305F\u308D\u3063\u3068
\u305F\u308F\u3080\u308C\u308B
\u305F\u3099\u3093\u3042\u3064
\u305F\u3093\u3044
\u305F\u3093\u304A\u3093
\u305F\u3093\u304B
\u305F\u3093\u304D
\u305F\u3093\u3051\u3093
\u305F\u3093\u3053\u3099
\u305F\u3093\u3055\u3093
\u305F\u3093\u3057\u3099\u3087\u3046\u3072\u3099
\u305F\u3099\u3093\u305B\u3044
\u305F\u3093\u305D\u304F
\u305F\u3093\u305F\u3044
\u305F\u3099\u3093\u3061
\u305F\u3093\u3066\u3044
\u305F\u3093\u3068\u3046
\u305F\u3099\u3093\u306A
\u305F\u3093\u306B\u3093
\u305F\u3099\u3093\u306D\u3064
\u305F\u3093\u306E\u3046
\u305F\u3093\u3072\u309A\u3093
\u305F\u3099\u3093\u307B\u3099\u3046
\u305F\u3093\u307E\u3064
\u305F\u3093\u3081\u3044
\u305F\u3099\u3093\u308C\u3064
\u305F\u3099\u3093\u308D
\u305F\u3099\u3093\u308F
\u3061\u3042\u3044
\u3061\u3042\u3093
\u3061\u3044\u304D
\u3061\u3044\u3055\u3044
\u3061\u3048\u3093
\u3061\u304B\u3044
\u3061\u304B\u3089
\u3061\u304D\u3085\u3046
\u3061\u304D\u3093
\u3061\u3051\u3044\u3059\u3099
\u3061\u3051\u3093
\u3061\u3053\u304F
\u3061\u3055\u3044
\u3061\u3057\u304D
\u3061\u3057\u308A\u3087\u3046
\u3061\u305B\u3044
\u3061\u305D\u3046
\u3061\u305F\u3044
\u3061\u305F\u3093
\u3061\u3061\u304A\u3084
\u3061\u3064\u3057\u3099\u3087
\u3061\u3066\u304D
\u3061\u3066\u3093
\u3061\u306C\u304D
\u3061\u306C\u308A
\u3061\u306E\u3046
\u3061\u3072\u3087\u3046
\u3061\u3078\u3044\u305B\u3093
\u3061\u307B\u3046
\u3061\u307E\u305F
\u3061\u307F\u3064
\u3061\u307F\u3068\u3099\u308D
\u3061\u3081\u3044\u3068\u3099
\u3061\u3083\u3093\u3053\u306A\u3078\u3099
\u3061\u3085\u3046\u3044
\u3061\u3086\u308A\u3087\u304F
\u3061\u3087\u3046\u3057
\u3061\u3087\u3055\u304F\u3051\u3093
\u3061\u3089\u3057
\u3061\u3089\u307F
\u3061\u308A\u304B\u3099\u307F
\u3061\u308A\u3087\u3046
\u3061\u308B\u3068\u3099
\u3061\u308F\u308F
\u3061\u3093\u305F\u3044
\u3061\u3093\u3082\u304F
\u3064\u3044\u304B
\u3064\u3044\u305F\u3061
\u3064\u3046\u304B
\u3064\u3046\u3057\u3099\u3087\u3046
\u3064\u3046\u306F\u3093
\u3064\u3046\u308F
\u3064\u304B\u3046
\u3064\u304B\u308C\u308B
\u3064\u304F\u306D
\u3064\u304F\u308B
\u3064\u3051\u306D
\u3064\u3051\u308B
\u3064\u3053\u3099\u3046
\u3064\u305F\u3048\u308B
\u3064\u3064\u3099\u304F
\u3064\u3064\u3057\u3099
\u3064\u3064\u3080
\u3064\u3068\u3081\u308B
\u3064\u306A\u304B\u3099\u308B
\u3064\u306A\u307F
\u3064\u306D\u3064\u3099\u306D
\u3064\u306E\u308B
\u3064\u3075\u3099\u3059
\u3064\u307E\u3089\u306A\u3044
\u3064\u307E\u308B
\u3064\u307F\u304D
\u3064\u3081\u305F\u3044
\u3064\u3082\u308A
\u3064\u3082\u308B
\u3064\u3088\u3044
\u3064\u308B\u307B\u3099
\u3064\u308B\u307F\u304F
\u3064\u308F\u3082\u306E
\u3064\u308F\u308A
\u3066\u3042\u3057
\u3066\u3042\u3066
\u3066\u3042\u307F
\u3066\u3044\u304A\u3093
\u3066\u3044\u304B
\u3066\u3044\u304D
\u3066\u3044\u3051\u3044
\u3066\u3044\u3053\u304F
\u3066\u3044\u3055\u3064
\u3066\u3044\u3057
\u3066\u3044\u305B\u3044
\u3066\u3044\u305F\u3044
\u3066\u3044\u3068\u3099
\u3066\u3044\u306D\u3044
\u3066\u3044\u3072\u3087\u3046
\u3066\u3044\u3078\u3093
\u3066\u3044\u307B\u3099\u3046
\u3066\u3046\u3061
\u3066\u304A\u304F\u308C
\u3066\u304D\u3068\u3046
\u3066\u304F\u3072\u3099
\u3066\u3099\u3053\u307B\u3099\u3053
\u3066\u3055\u304D\u3099\u3087\u3046
\u3066\u3055\u3051\u3099
\u3066\u3059\u308A
\u3066\u305D\u3046
\u3066\u3061\u304B\u3099\u3044
\u3066\u3061\u3087\u3046
\u3066\u3064\u304B\u3099\u304F
\u3066\u3064\u3064\u3099\u304D
\u3066\u3099\u3063\u306F\u309A
\u3066\u3064\u307B\u3099\u3046
\u3066\u3064\u3084
\u3066\u3099\u306C\u304B\u3048
\u3066\u306C\u304D
\u3066\u306C\u304F\u3099\u3044
\u3066\u306E\u3072\u3089
\u3066\u306F\u3044
\u3066\u3075\u3099\u304F\u308D
\u3066\u3075\u305F\u3099
\u3066\u307B\u3068\u3099\u304D
\u3066\u307B\u3093
\u3066\u307E\u3048
\u3066\u307E\u304D\u3059\u3099\u3057
\u3066\u307F\u3057\u3099\u304B
\u3066\u307F\u3084\u3051\u3099
\u3066\u3089\u3059
\u3066\u308C\u3072\u3099
\u3066\u308F\u3051
\u3066\u308F\u305F\u3057
\u3066\u3099\u3093\u3042\u3064
\u3066\u3093\u3044\u3093
\u3066\u3093\u304B\u3044
\u3066\u3093\u304D
\u3066\u3093\u304F\u3099
\u3066\u3093\u3051\u3093
\u3066\u3093\u3053\u3099\u304F
\u3066\u3093\u3055\u3044
\u3066\u3093\u3057
\u3066\u3093\u3059\u3046
\u3066\u3099\u3093\u3061
\u3066\u3093\u3066\u304D
\u3066\u3093\u3068\u3046
\u3066\u3093\u306A\u3044
\u3066\u3093\u3075\u309A\u3089
\u3066\u3093\u307B\u3099\u3046\u305F\u3099\u3044
\u3066\u3093\u3081\u3064
\u3066\u3093\u3089\u3093\u304B\u3044
\u3066\u3099\u3093\u308A\u3087\u304F
\u3066\u3099\u3093\u308F
\u3068\u3099\u3042\u3044
\u3068\u3044\u308C
\u3068\u3099\u3046\u304B\u3093
\u3068\u3046\u304D\u3085\u3046
\u3068\u3099\u3046\u304F\u3099
\u3068\u3046\u3057
\u3068\u3046\u3080\u304D\u3099
\u3068\u304A\u3044
\u3068\u304A\u304B
\u3068\u304A\u304F
\u3068\u304A\u3059
\u3068\u304A\u308B
\u3068\u304B\u3044
\u3068\u304B\u3059
\u3068\u304D\u304A\u308A
\u3068\u304D\u3068\u3099\u304D
\u3068\u304F\u3044
\u3068\u304F\u3057\u3085\u3046
\u3068\u304F\u3066\u3093
\u3068\u304F\u306B
\u3068\u304F\u3078\u3099\u3064
\u3068\u3051\u3044
\u3068\u3051\u308B
\u3068\u3053\u3084
\u3068\u3055\u304B
\u3068\u3057\u3087\u304B\u3093
\u3068\u305D\u3046
\u3068\u305F\u3093
\u3068\u3061\u3085\u3046
\u3068\u3063\u304D\u3085\u3046
\u3068\u3063\u304F\u3093
\u3068\u3064\u305B\u3099\u3093
\u3068\u3064\u306B\u3085\u3046
\u3068\u3068\u3099\u3051\u308B
\u3068\u3068\u306E\u3048\u308B
\u3068\u306A\u3044
\u3068\u306A\u3048\u308B
\u3068\u306A\u308A
\u3068\u306E\u3055\u307E
\u3068\u306F\u3099\u3059
\u3068\u3099\u3075\u3099\u304B\u3099\u308F
\u3068\u307B\u3046
\u3068\u307E\u308B
\u3068\u3081\u308B
\u3068\u3082\u305F\u3099\u3061
\u3068\u3082\u308B
\u3068\u3099\u3088\u3046\u3072\u3099
\u3068\u3089\u3048\u308B
\u3068\u3093\u304B\u3064
\u3068\u3099\u3093\u3075\u3099\u308A
\u306A\u3044\u304B\u304F
\u306A\u3044\u3053\u3046
\u306A\u3044\u3057\u3087
\u306A\u3044\u3059
\u306A\u3044\u305B\u3093
\u306A\u3044\u305D\u3046
\u306A\u304A\u3059
\u306A\u304B\u3099\u3044
\u306A\u304F\u3059
\u306A\u3051\u3099\u308B
\u306A\u3053\u3046\u3068\u3099
\u306A\u3055\u3051
\u306A\u305F\u3066\u3099\u3053\u3053
\u306A\u3063\u3068\u3046
\u306A\u3064\u3084\u3059\u307F
\u306A\u306A\u304A\u3057
\u306A\u306B\u3053\u3099\u3068
\u306A\u306B\u3082\u306E
\u306A\u306B\u308F
\u306A\u306E\u304B
\u306A\u3075\u305F\u3099
\u306A\u307E\u3044\u304D
\u306A\u307E\u3048
\u306A\u307E\u307F
\u306A\u307F\u305F\u3099
\u306A\u3081\u3089\u304B
\u306A\u3081\u308B
\u306A\u3084\u3080
\u306A\u3089\u3046
\u306A\u3089\u3072\u3099
\u306A\u3089\u3075\u3099
\u306A\u308C\u308B
\u306A\u308F\u3068\u3072\u3099
\u306A\u308F\u306F\u3099\u308A
\u306B\u3042\u3046
\u306B\u3044\u304B\u3099\u305F
\u306B\u3046\u3051
\u306B\u304A\u3044
\u306B\u304B\u3044
\u306B\u304B\u3099\u3066
\u306B\u304D\u3072\u3099
\u306B\u304F\u3057\u307F
\u306B\u304F\u307E\u3093
\u306B\u3051\u3099\u308B
\u306B\u3055\u3093\u304B\u305F\u3093\u305D
\u306B\u3057\u304D
\u306B\u305B\u3082\u306E
\u306B\u3061\u3057\u3099\u3087\u3046
\u306B\u3061\u3088\u3046\u3072\u3099
\u306B\u3063\u304B
\u306B\u3063\u304D
\u306B\u3063\u3051\u3044
\u306B\u3063\u3053\u3046
\u306B\u3063\u3055\u3093
\u306B\u3063\u3057\u3087\u304F
\u306B\u3063\u3059\u3046
\u306B\u3063\u305B\u304D
\u306B\u3063\u3066\u3044
\u306B\u306A\u3046
\u306B\u307B\u3093
\u306B\u307E\u3081
\u306B\u3082\u3064
\u306B\u3084\u308A
\u306B\u3085\u3046\u3044\u3093
\u306B\u308A\u3093\u3057\u3083
\u306B\u308F\u3068\u308A
\u306B\u3093\u3044
\u306B\u3093\u304B
\u306B\u3093\u304D
\u306B\u3093\u3051\u3099\u3093
\u306B\u3093\u3057\u304D
\u306B\u3093\u3059\u3099\u3046
\u306B\u3093\u305D\u3046
\u306B\u3093\u305F\u3044
\u306B\u3093\u3061
\u306B\u3093\u3066\u3044
\u306B\u3093\u306B\u304F
\u306B\u3093\u3075\u309A
\u306B\u3093\u307E\u308A
\u306B\u3093\u3080
\u306B\u3093\u3081\u3044
\u306B\u3093\u3088\u3046
\u306C\u3044\u304F\u304D\u3099
\u306C\u304B\u3059
\u306C\u304F\u3099\u3044\u3068\u308B
\u306C\u304F\u3099\u3046
\u306C\u304F\u3082\u308A
\u306C\u3059\u3080
\u306C\u307E\u3048\u3072\u3099
\u306C\u3081\u308A
\u306C\u3089\u3059
\u306C\u3093\u3061\u3083\u304F
\u306D\u3042\u3051\u3099
\u306D\u3044\u304D
\u306D\u3044\u308B
\u306D\u3044\u308D
\u306D\u304F\u3099\u305B
\u306D\u304F\u305F\u3044
\u306D\u304F\u3089
\u306D\u3053\u305B\u3099
\u306D\u3053\u3080
\u306D\u3055\u3051\u3099
\u306D\u3059\u3053\u3099\u3059
\u306D\u305D\u3078\u3099\u308B
\u306D\u305F\u3099\u3093
\u306D\u3064\u3044
\u306D\u3063\u3057\u3093
\u306D\u3064\u305D\u3099\u3046
\u306D\u3063\u305F\u3044\u304D\u3099\u3087
\u306D\u3075\u3099\u305D\u304F
\u306D\u3075\u305F\u3099
\u306D\u307B\u3099\u3046
\u306D\u307B\u308A\u306F\u307B\u308A
\u306D\u307E\u304D
\u306D\u307E\u308F\u3057
\u306D\u307F\u307F
\u306D\u3080\u3044
\u306D\u3080\u305F\u3044
\u306D\u3082\u3068
\u306D\u3089\u3046
\u306D\u308F\u3055\u3099
\u306D\u3093\u3044\u308A
\u306D\u3093\u304A\u3057
\u306D\u3093\u304B\u3093
\u306D\u3093\u304D\u3093
\u306D\u3093\u304F\u3099
\u306D\u3093\u3055\u3099
\u306D\u3093\u3057
\u306D\u3093\u3061\u3083\u304F
\u306D\u3093\u3068\u3099
\u306D\u3093\u3072\u309A
\u306D\u3093\u3075\u3099\u3064
\u306D\u3093\u307E\u3064
\u306D\u3093\u308A\u3087\u3046
\u306D\u3093\u308C\u3044
\u306E\u3044\u3059\u3099
\u306E\u304A\u3064\u3099\u307E
\u306E\u304B\u3099\u3059
\u306E\u304D\u306A\u307F
\u306E\u3053\u304D\u3099\u308A
\u306E\u3053\u3059
\u306E\u3053\u308B
\u306E\u305B\u308B
\u306E\u305D\u3099\u304F
\u306E\u305D\u3099\u3080
\u306E\u305F\u307E\u3046
\u306E\u3061\u307B\u3068\u3099
\u306E\u3063\u304F
\u306E\u306F\u3099\u3059
\u306E\u306F\u3089
\u306E\u3078\u3099\u308B
\u306E\u307B\u3099\u308B
\u306E\u307F\u3082\u306E
\u306E\u3084\u307E
\u306E\u3089\u3044\u306C
\u306E\u3089\u306D\u3053
\u306E\u308A\u3082\u306E
\u306E\u308A\u3086\u304D
\u306E\u308C\u3093
\u306E\u3093\u304D
\u306F\u3099\u3042\u3044
\u306F\u3042\u304F
\u306F\u3099\u3042\u3055\u3093
\u306F\u3099\u3044\u304B
\u306F\u3099\u3044\u304F
\u306F\u3044\u3051\u3093
\u306F\u3044\u3053\u3099
\u306F\u3044\u3057\u3093
\u306F\u3044\u3059\u3044
\u306F\u3044\u305B\u3093
\u306F\u3044\u305D\u3046
\u306F\u3044\u3061
\u306F\u3099\u3044\u306F\u3099\u3044
\u306F\u3044\u308C\u3064
\u306F\u3048\u308B
\u306F\u304A\u308B
\u306F\u304B\u3044
\u306F\u3099\u304B\u308A
\u306F\u304B\u308B
\u306F\u304F\u3057\u3085
\u306F\u3051\u3093
\u306F\u3053\u3075\u3099
\u306F\u3055\u307F
\u306F\u3055\u3093
\u306F\u3057\u3053\u3099
\u306F\u3099\u3057\u3087
\u306F\u3057\u308B
\u306F\u305B\u308B
\u306F\u309A\u305D\u3053\u3093
\u306F\u305D\u3093
\u306F\u305F\u3093
\u306F\u3061\u307F\u3064
\u306F\u3064\u304A\u3093
\u306F\u3063\u304B\u304F
\u306F\u3064\u3099\u304D
\u306F\u3063\u304D\u308A
\u306F\u3063\u304F\u3064
\u306F\u3063\u3051\u3093
\u306F\u3063\u3053\u3046
\u306F\u3063\u3055\u3093
\u306F\u3063\u3057\u3093
\u306F\u3063\u305F\u3064
\u306F\u3063\u3061\u3085\u3046
\u306F\u3063\u3066\u3093
\u306F\u3063\u3072\u309A\u3087\u3046
\u306F\u3063\u307B\u309A\u3046
\u306F\u306A\u3059
\u306F\u306A\u3072\u3099
\u306F\u306B\u304B\u3080
\u306F\u3075\u3099\u3089\u3057
\u306F\u307F\u304B\u3099\u304D
\u306F\u3080\u304B\u3046
\u306F\u3081\u3064
\u306F\u3084\u3044
\u306F\u3084\u3057
\u306F\u3089\u3046
\u306F\u308D\u3046\u3043\u3093
\u306F\u308F\u3044
\u306F\u3093\u3044
\u306F\u3093\u3048\u3044
\u306F\u3093\u304A\u3093
\u306F\u3093\u304B\u304F
\u306F\u3093\u304D\u3087\u3046
\u306F\u3099\u3093\u304F\u3099\u307F
\u306F\u3093\u3053
\u306F\u3093\u3057\u3083
\u306F\u3093\u3059\u3046
\u306F\u3093\u305F\u3099\u3093
\u306F\u309A\u3093\u3061
\u306F\u309A\u3093\u3064
\u306F\u3093\u3066\u3044
\u306F\u3093\u3068\u3057
\u306F\u3093\u306E\u3046
\u306F\u3093\u306F\u309A
\u306F\u3093\u3075\u3099\u3093
\u306F\u3093\u3078\u309A\u3093
\u306F\u3093\u307B\u3099\u3046\u304D
\u306F\u3093\u3081\u3044
\u306F\u3093\u3089\u3093
\u306F\u3093\u308D\u3093
\u3072\u3044\u304D
\u3072\u3046\u3093
\u3072\u3048\u308B
\u3072\u304B\u304F
\u3072\u304B\u308A
\u3072\u304B\u308B
\u3072\u304B\u3093
\u3072\u304F\u3044
\u3072\u3051\u3064
\u3072\u3053\u3046\u304D
\u3072\u3053\u304F
\u3072\u3055\u3044
\u3072\u3055\u3057\u3075\u3099\u308A
\u3072\u3055\u3093
\u3072\u3099\u3057\u3099\u3085\u3064\u304B\u3093
\u3072\u3057\u3087
\u3072\u305D\u304B
\u3072\u305D\u3080
\u3072\u305F\u3080\u304D
\u3072\u305F\u3099\u308A
\u3072\u305F\u308B
\u3072\u3064\u304D\u3099
\u3072\u3063\u3053\u3057
\u3072\u3063\u3057
\u3072\u3064\u3057\u3099\u3085\u3072\u3093
\u3072\u3063\u3059
\u3072\u3064\u305B\u3099\u3093
\u3072\u309A\u3063\u305F\u308A
\u3072\u309A\u3063\u3061\u308A
\u3072\u3064\u3088\u3046
\u3072\u3066\u3044
\u3072\u3068\u3053\u3099\u307F
\u3072\u306A\u307E\u3064\u308A
\u3072\u306A\u3093
\u3072\u306D\u308B
\u3072\u306F\u3093
\u3072\u3072\u3099\u304F
\u3072\u3072\u3087\u3046
\u3072\u307B\u3046
\u3072\u307E\u308F\u308A
\u3072\u307E\u3093
\u3072\u307F\u3064
\u3072\u3081\u3044
\u3072\u3081\u3057\u3099\u3057
\u3072\u3084\u3051
\u3072\u3084\u3059
\u3072\u3088\u3046
\u3072\u3099\u3087\u3046\u304D
\u3072\u3089\u304B\u3099\u306A
\u3072\u3089\u304F
\u3072\u308A\u3064
\u3072\u308A\u3087\u3046
\u3072\u308B\u307E
\u3072\u308B\u3084\u3059\u307F
\u3072\u308C\u3044
\u3072\u308D\u3044
\u3072\u308D\u3046
\u3072\u308D\u304D
\u3072\u308D\u3086\u304D
\u3072\u3093\u304B\u304F
\u3072\u3093\u3051\u3064
\u3072\u3093\u3053\u3093
\u3072\u3093\u3057\u3085
\u3072\u3093\u305D\u3046
\u3072\u309A\u3093\u3061
\u3072\u3093\u306F\u309A\u3093
\u3072\u3099\u3093\u307B\u3099\u3046
\u3075\u3042\u3093
\u3075\u3044\u3046\u3061
\u3075\u3046\u3051\u3044
\u3075\u3046\u305B\u3093
\u3075\u309A\u3046\u305F\u308D\u3046
\u3075\u3046\u3068\u3046
\u3075\u3046\u3075
\u3075\u3048\u308B
\u3075\u304A\u3093
\u3075\u304B\u3044
\u3075\u304D\u3093
\u3075\u304F\u3055\u3099\u3064
\u3075\u304F\u3075\u3099\u304F\u308D
\u3075\u3053\u3046
\u3075\u3055\u3044
\u3075\u3057\u304D\u3099
\u3075\u3057\u3099\u307F
\u3075\u3059\u307E
\u3075\u305B\u3044
\u3075\u305B\u304F\u3099
\u3075\u305D\u304F
\u3075\u3099\u305F\u306B\u304F
\u3075\u305F\u3093
\u3075\u3061\u3087\u3046
\u3075\u3064\u3046
\u3075\u3064\u304B
\u3075\u3063\u304B\u3064
\u3075\u3063\u304D
\u3075\u3063\u3053\u304F
\u3075\u3099\u3068\u3099\u3046
\u3075\u3068\u308B
\u3075\u3068\u3093
\u3075\u306E\u3046
\u3075\u306F\u3044
\u3075\u3072\u3087\u3046
\u3075\u3078\u3093
\u3075\u307E\u3093
\u3075\u307F\u3093
\u3075\u3081\u3064
\u3075\u3081\u3093
\u3075\u3088\u3046
\u3075\u308A\u3053
\u3075\u308A\u308B
\u3075\u308B\u3044
\u3075\u3093\u3044\u304D
\u3075\u3099\u3093\u304B\u3099\u304F
\u3075\u3099\u3093\u304F\u3099
\u3075\u3093\u3057\u3064
\u3075\u3099\u3093\u305B\u304D
\u3075\u3093\u305D\u3046
\u3075\u3099\u3093\u307B\u309A\u3046
\u3078\u3044\u3042\u3093
\u3078\u3044\u304A\u3093
\u3078\u3044\u304B\u3099\u3044
\u3078\u3044\u304D
\u3078\u3044\u3051\u3099\u3093
\u3078\u3044\u3053\u3046
\u3078\u3044\u3055
\u3078\u3044\u3057\u3083
\u3078\u3044\u305B\u3064
\u3078\u3044\u305D
\u3078\u3044\u305F\u304F
\u3078\u3044\u3066\u3093
\u3078\u3044\u306D\u3064
\u3078\u3044\u308F
\u3078\u304D\u304B\u3099
\u3078\u3053\u3080
\u3078\u3099\u306B\u3044\u308D
\u3078\u3099\u306B\u3057\u3087\u3046\u304B\u3099
\u3078\u3089\u3059
\u3078\u3093\u304B\u3093
\u3078\u3099\u3093\u304D\u3087\u3046
\u3078\u3099\u3093\u3053\u3099\u3057
\u3078\u3093\u3055\u3044
\u3078\u3093\u305F\u3044
\u3078\u3099\u3093\u308A
\u307B\u3042\u3093
\u307B\u3044\u304F
\u307B\u3099\u3046\u304D\u3099\u3087
\u307B\u3046\u3053\u304F
\u307B\u3046\u305D\u3046
\u307B\u3046\u307B\u3046
\u307B\u3046\u3082\u3093
\u307B\u3046\u308A\u3064
\u307B\u3048\u308B
\u307B\u304A\u3093
\u307B\u304B\u3093
\u307B\u304D\u3087\u3046
\u307B\u3099\u304D\u3093
\u307B\u304F\u308D
\u307B\u3051\u3064
\u307B\u3051\u3093
\u307B\u3053\u3046
\u307B\u3053\u308B
\u307B\u3057\u3044
\u307B\u3057\u3064
\u307B\u3057\u3085
\u307B\u3057\u3087\u3046
\u307B\u305B\u3044
\u307B\u305D\u3044
\u307B\u305D\u304F
\u307B\u305F\u3066
\u307B\u305F\u308B
\u307B\u309A\u3061\u3075\u3099\u304F\u308D
\u307B\u3063\u304D\u3087\u304F
\u307B\u3063\u3055
\u307B\u3063\u305F\u3093
\u307B\u3068\u3093\u3068\u3099
\u307B\u3081\u308B
\u307B\u3093\u3044
\u307B\u3093\u304D
\u307B\u3093\u3051
\u307B\u3093\u3057\u3064
\u307B\u3093\u3084\u304F
\u307E\u3044\u306B\u3061
\u307E\u304B\u3044
\u307E\u304B\u305B\u308B
\u307E\u304B\u3099\u308B
\u307E\u3051\u308B
\u307E\u3053\u3068
\u307E\u3055\u3064
\u307E\u3057\u3099\u3081
\u307E\u3059\u304F
\u307E\u305B\u3099\u308B
\u307E\u3064\u308A
\u307E\u3068\u3081
\u307E\u306A\u3075\u3099
\u307E\u306C\u3051
\u307E\u306D\u304F
\u307E\u307B\u3046
\u307E\u3082\u308B
\u307E\u3086\u3051\u3099
\u307E\u3088\u3046
\u307E\u308D\u3084\u304B
\u307E\u308F\u3059
\u307E\u308F\u308A
\u307E\u308F\u308B
\u307E\u3093\u304B\u3099
\u307E\u3093\u304D\u3064
\u307E\u3093\u305D\u3099\u304F
\u307E\u3093\u306A\u304B
\u307F\u3044\u3089
\u307F\u3046\u3061
\u307F\u3048\u308B
\u307F\u304B\u3099\u304F
\u307F\u304B\u305F
\u307F\u304B\u3093
\u307F\u3051\u3093
\u307F\u3053\u3093
\u307F\u3057\u3099\u304B\u3044
\u307F\u3059\u3044
\u307F\u3059\u3048\u308B
\u307F\u305B\u308B
\u307F\u3063\u304B
\u307F\u3064\u304B\u308B
\u307F\u3064\u3051\u308B
\u307F\u3066\u3044
\u307F\u3068\u3081\u308B
\u307F\u306A\u3068
\u307F\u306A\u307F\u304B\u3055\u3044
\u307F\u306D\u3089\u308B
\u307F\u306E\u3046
\u307F\u306E\u304B\u3099\u3059
\u307F\u307B\u3093
\u307F\u3082\u3068
\u307F\u3084\u3051\u3099
\u307F\u3089\u3044
\u307F\u308A\u3087\u304F
\u307F\u308F\u304F
\u307F\u3093\u304B
\u307F\u3093\u305D\u3099\u304F
\u3080\u3044\u304B
\u3080\u3048\u304D
\u3080\u3048\u3093
\u3080\u304B\u3044
\u3080\u304B\u3046
\u3080\u304B\u3048
\u3080\u304B\u3057
\u3080\u304D\u3099\u3061\u3083
\u3080\u3051\u308B
\u3080\u3051\u3099\u3093
\u3080\u3055\u307B\u3099\u308B
\u3080\u3057\u3042\u3064\u3044
\u3080\u3057\u306F\u3099
\u3080\u3057\u3099\u3085\u3093
\u3080\u3057\u308D
\u3080\u3059\u3046
\u3080\u3059\u3053
\u3080\u3059\u3075\u3099
\u3080\u3059\u3081
\u3080\u305B\u308B
\u3080\u305B\u3093
\u3080\u3061\u3085\u3046
\u3080\u306A\u3057\u3044
\u3080\u306E\u3046
\u3080\u3084\u307F
\u3080\u3088\u3046
\u3080\u3089\u3055\u304D
\u3080\u308A\u3087\u3046
\u3080\u308D\u3093
\u3081\u3044\u3042\u3093
\u3081\u3044\u3046\u3093
\u3081\u3044\u3048\u3093
\u3081\u3044\u304B\u304F
\u3081\u3044\u304D\u3087\u304F
\u3081\u3044\u3055\u3044
\u3081\u3044\u3057
\u3081\u3044\u305D\u3046
\u3081\u3044\u3075\u3099\u3064
\u3081\u3044\u308C\u3044
\u3081\u3044\u308F\u304F
\u3081\u304F\u3099\u307E\u308C\u308B
\u3081\u3055\u3099\u3059
\u3081\u3057\u305F
\u3081\u3059\u3099\u3089\u3057\u3044
\u3081\u305F\u3099\u3064
\u3081\u307E\u3044
\u3081\u3084\u3059
\u3081\u3093\u304D\u3087
\u3081\u3093\u305B\u304D
\u3081\u3093\u3068\u3099\u3046
\u3082\u3046\u3057\u3042\u3051\u3099\u308B
\u3082\u3046\u3068\u3099\u3046\u3051\u3093
\u3082\u3048\u308B
\u3082\u304F\u3057
\u3082\u304F\u3066\u304D
\u3082\u304F\u3088\u3046\u3072\u3099
\u3082\u3061\u308D\u3093
\u3082\u3068\u3099\u308B
\u3082\u3089\u3046
\u3082\u3093\u304F
\u3082\u3093\u305F\u3099\u3044
\u3084\u304A\u3084
\u3084\u3051\u308B
\u3084\u3055\u3044
\u3084\u3055\u3057\u3044
\u3084\u3059\u3044
\u3084\u3059\u305F\u308D\u3046
\u3084\u3059\u307F
\u3084\u305B\u308B
\u3084\u305D\u3046
\u3084\u305F\u3044
\u3084\u3061\u3093
\u3084\u3063\u3068
\u3084\u3063\u306F\u309A\u308A
\u3084\u3075\u3099\u308B
\u3084\u3081\u308B
\u3084\u3084\u3053\u3057\u3044
\u3084\u3088\u3044
\u3084\u308F\u3089\u304B\u3044
\u3086\u3046\u304D
\u3086\u3046\u3072\u3099\u3093\u304D\u3087\u304F
\u3086\u3046\u3078\u3099
\u3086\u3046\u3081\u3044
\u3086\u3051\u3064
\u3086\u3057\u3085\u3064
\u3086\u305B\u3093
\u3086\u305D\u3046
\u3086\u305F\u304B
\u3086\u3061\u3083\u304F
\u3086\u3066\u3099\u308B
\u3086\u306B\u3085\u3046
\u3086\u3072\u3099\u308F
\u3086\u3089\u3044
\u3086\u308C\u308B
\u3088\u3046\u3044
\u3088\u3046\u304B
\u3088\u3046\u304D\u3085\u3046
\u3088\u3046\u3057\u3099
\u3088\u3046\u3059
\u3088\u3046\u3061\u3048\u3093
\u3088\u304B\u305B\u3099
\u3088\u304B\u3093
\u3088\u304D\u3093
\u3088\u304F\u305B\u3044
\u3088\u304F\u307B\u3099\u3046
\u3088\u3051\u3044
\u3088\u3053\u3099\u308C\u308B
\u3088\u3055\u3093
\u3088\u3057\u3085\u3046
\u3088\u305D\u3046
\u3088\u305D\u304F
\u3088\u3063\u304B
\u3088\u3066\u3044
\u3088\u3068\u3099\u304B\u3099\u308F\u304F
\u3088\u306D\u3064
\u3088\u3084\u304F
\u3088\u3086\u3046
\u3088\u308D\u3053\u3075\u3099
\u3088\u308D\u3057\u3044
\u3089\u3044\u3046
\u3089\u304F\u304B\u3099\u304D
\u3089\u304F\u3053\u3099
\u3089\u304F\u3055\u3064
\u3089\u304F\u305F\u3099
\u3089\u3057\u3093\u306F\u3099\u3093
\u3089\u305B\u3093
\u3089\u305D\u3099\u304F
\u3089\u305F\u3044
\u3089\u3063\u304B
\u3089\u308C\u3064
\u308A\u3048\u304D
\u308A\u304B\u3044
\u308A\u304D\u3055\u304F
\u308A\u304D\u305B\u3064
\u308A\u304F\u304F\u3099\u3093
\u308A\u304F\u3064
\u308A\u3051\u3093
\u308A\u3053\u3046
\u308A\u305B\u3044
\u308A\u305D\u3046
\u308A\u305D\u304F
\u308A\u3066\u3093
\u308A\u306D\u3093
\u308A\u3086\u3046
\u308A\u3085\u3046\u304B\u3099\u304F
\u308A\u3088\u3046
\u308A\u3087\u3046\u308A
\u308A\u3087\u304B\u3093
\u308A\u3087\u304F\u3061\u3083
\u308A\u3087\u3053\u3046
\u308A\u308A\u304F
\u308A\u308C\u304D
\u308A\u308D\u3093
\u308A\u3093\u3053\u3099
\u308B\u3044\u3051\u3044
\u308B\u3044\u3055\u3044
\u308B\u3044\u3057\u3099
\u308B\u3044\u305B\u304D
\u308B\u3059\u306F\u3099\u3093
\u308B\u308A\u304B\u3099\u308F\u3089
\u308C\u3044\u304B\u3093
\u308C\u3044\u304D\u3099
\u308C\u3044\u305B\u3044
\u308C\u3044\u305D\u3099\u3046\u3053
\u308C\u3044\u3068\u3046
\u308C\u3044\u307B\u3099\u3046
\u308C\u304D\u3057
\u308C\u304D\u305F\u3099\u3044
\u308C\u3093\u3042\u3044
\u308C\u3093\u3051\u3044
\u308C\u3093\u3053\u3093
\u308C\u3093\u3055\u3044
\u308C\u3093\u3057\u3085\u3046
\u308C\u3093\u305D\u3099\u304F
\u308C\u3093\u3089\u304F
\u308D\u3046\u304B
\u308D\u3046\u3053\u3099
\u308D\u3046\u3057\u3099\u3093
\u308D\u3046\u305D\u304F
\u308D\u304F\u304B\u3099
\u308D\u3053\u3064
\u308D\u3057\u3099\u3046\u3089
\u308D\u3057\u3085\u3064
\u308D\u305B\u3093
\u308D\u3066\u3093
\u308D\u3081\u3093
\u308D\u308C\u3064
\u308D\u3093\u304D\u3099
\u308D\u3093\u306F\u309A
\u308D\u3093\u3075\u3099\u3093
\u308D\u3093\u308A
\u308F\u304B\u3059
\u308F\u304B\u3081
\u308F\u304B\u3084\u307E
\u308F\u304B\u308C\u308B
\u308F\u3057\u3064
\u308F\u3057\u3099\u307E\u3057
\u308F\u3059\u308C\u3082\u306E
\u308F\u3089\u3046
\u308F\u308C\u308B`.split("\n");
// node_modules/@scure/bip39/esm/wordlists/korean.js
var wordlist6 = `\u1100\u1161\u1100\u1167\u11A8
\u1100\u1161\u1101\u1173\u11B7
\u1100\u1161\u1102\u1161\u11AB
\u1100\u1161\u1102\u1173\u11BC
\u1100\u1161\u1103\u1173\u11A8
\u1100\u1161\u1105\u1173\u110E\u1175\u11B7
\u1100\u1161\u1106\u116E\u11B7
\u1100\u1161\u1107\u1161\u11BC
\u1100\u1161\u1109\u1161\u11BC
\u1100\u1161\u1109\u1173\u11B7
\u1100\u1161\u110B\u116E\u11AB\u1103\u1166
\u1100\u1161\u110B\u1173\u11AF
\u1100\u1161\u110B\u1175\u1103\u1173
\u1100\u1161\u110B\u1175\u11B8
\u1100\u1161\u110C\u1161\u11BC
\u1100\u1161\u110C\u1165\u11BC
\u1100\u1161\u110C\u1169\u11A8
\u1100\u1161\u110C\u116E\u11A8
\u1100\u1161\u11A8\u110B\u1169
\u1100\u1161\u11A8\u110C\u1161
\u1100\u1161\u11AB\u1100\u1167\u11A8
\u1100\u1161\u11AB\u1107\u116E
\u1100\u1161\u11AB\u1109\u1165\u11B8
\u1100\u1161\u11AB\u110C\u1161\u11BC
\u1100\u1161\u11AB\u110C\u1165\u11B8
\u1100\u1161\u11AB\u1111\u1161\u11AB
\u1100\u1161\u11AF\u1103\u1173\u11BC
\u1100\u1161\u11AF\u1107\u1175
\u1100\u1161\u11AF\u1109\u1162\u11A8
\u1100\u1161\u11AF\u110C\u1173\u11BC
\u1100\u1161\u11B7\u1100\u1161\u11A8
\u1100\u1161\u11B7\u1100\u1175
\u1100\u1161\u11B7\u1109\u1169
\u1100\u1161\u11B7\u1109\u116E\u1109\u1165\u11BC
\u1100\u1161\u11B7\u110C\u1161
\u1100\u1161\u11B7\u110C\u1165\u11BC
\u1100\u1161\u11B8\u110C\u1161\u1100\u1175
\u1100\u1161\u11BC\u1102\u1161\u11B7
\u1100\u1161\u11BC\u1103\u1161\u11BC
\u1100\u1161\u11BC\u1103\u1169
\u1100\u1161\u11BC\u1105\u1167\u11A8\u1112\u1175
\u1100\u1161\u11BC\u1107\u1167\u11AB
\u1100\u1161\u11BC\u1107\u116E\u11A8
\u1100\u1161\u11BC\u1109\u1161
\u1100\u1161\u11BC\u1109\u116E\u1105\u1163\u11BC
\u1100\u1161\u11BC\u110B\u1161\u110C\u1175
\u1100\u1161\u11BC\u110B\u116F\u11AB\u1103\u1169
\u1100\u1161\u11BC\u110B\u1174
\u1100\u1161\u11BC\u110C\u1166
\u1100\u1161\u11BC\u110C\u1169
\u1100\u1161\u11C0\u110B\u1175
\u1100\u1162\u1100\u116E\u1105\u1175
\u1100\u1162\u1102\u1161\u1105\u1175
\u1100\u1162\u1107\u1161\u11BC
\u1100\u1162\u1107\u1167\u11AF
\u1100\u1162\u1109\u1165\u11AB
\u1100\u1162\u1109\u1165\u11BC
\u1100\u1162\u110B\u1175\u11AB
\u1100\u1162\u11A8\u1100\u116A\u11AB\u110C\u1165\u11A8
\u1100\u1165\u1109\u1175\u11AF
\u1100\u1165\u110B\u1162\u11A8
\u1100\u1165\u110B\u116E\u11AF
\u1100\u1165\u110C\u1175\u11BA
\u1100\u1165\u1111\u116E\u11B7
\u1100\u1165\u11A8\u110C\u1165\u11BC
\u1100\u1165\u11AB\u1100\u1161\u11BC
\u1100\u1165\u11AB\u1106\u116E\u11AF
\u1100\u1165\u11AB\u1109\u1165\u11AF
\u1100\u1165\u11AB\u110C\u1169
\u1100\u1165\u11AB\u110E\u116E\u11A8
\u1100\u1165\u11AF\u110B\u1173\u11B7
\u1100\u1165\u11B7\u1109\u1161
\u1100\u1165\u11B7\u1110\u1169
\u1100\u1166\u1109\u1175\u1111\u1161\u11AB
\u1100\u1166\u110B\u1175\u11B7
\u1100\u1167\u110B\u116E\u11AF
\u1100\u1167\u11AB\u1112\u1162
\u1100\u1167\u11AF\u1100\u116A
\u1100\u1167\u11AF\u1100\u116E\u11A8
\u1100\u1167\u11AF\u1105\u1169\u11AB
\u1100\u1167\u11AF\u1109\u1165\u11A8
\u1100\u1167\u11AF\u1109\u1173\u11BC
\u1100\u1167\u11AF\u1109\u1175\u11B7
\u1100\u1167\u11AF\u110C\u1165\u11BC
\u1100\u1167\u11AF\u1112\u1169\u11AB
\u1100\u1167\u11BC\u1100\u1168
\u1100\u1167\u11BC\u1100\u1169
\u1100\u1167\u11BC\u1100\u1175
\u1100\u1167\u11BC\u1105\u1167\u11A8
\u1100\u1167\u11BC\u1107\u1169\u11A8\u1100\u116E\u11BC
\u1100\u1167\u11BC\u1107\u1175
\u1100\u1167\u11BC\u1109\u1161\u11BC\u1103\u1169
\u1100\u1167\u11BC\u110B\u1167\u11BC
\u1100\u1167\u11BC\u110B\u116E
\u1100\u1167\u11BC\u110C\u1162\u11BC
\u1100\u1167\u11BC\u110C\u1166
\u1100\u1167\u11BC\u110C\u116E
\u1100\u1167\u11BC\u110E\u1161\u11AF
\u1100\u1167\u11BC\u110E\u1175
\u1100\u1167\u11BC\u1112\u1163\u11BC
\u1100\u1167\u11BC\u1112\u1165\u11B7
\u1100\u1168\u1100\u1169\u11A8
\u1100\u1168\u1103\u1161\u11AB
\u1100\u1168\u1105\u1161\u11AB
\u1100\u1168\u1109\u1161\u11AB
\u1100\u1168\u1109\u1169\u11A8
\u1100\u1168\u110B\u1163\u11A8
\u1100\u1168\u110C\u1165\u11AF
\u1100\u1168\u110E\u1173\u11BC
\u1100\u1168\u1112\u116C\u11A8
\u1100\u1169\u1100\u1162\u11A8
\u1100\u1169\u1100\u116E\u1105\u1167
\u1100\u1169\u1100\u116E\u11BC
\u1100\u1169\u1100\u1173\u11B8
\u1100\u1169\u1103\u1173\u11BC\u1112\u1161\u11A8\u1109\u1162\u11BC
\u1100\u1169\u1106\u116E\u1109\u1175\u11AB
\u1100\u1169\u1106\u1175\u11AB
\u1100\u1169\u110B\u1163\u11BC\u110B\u1175
\u1100\u1169\u110C\u1161\u11BC
\u1100\u1169\u110C\u1165\u11AB
\u1100\u1169\u110C\u1175\u11B8
\u1100\u1169\u110E\u116E\u11BA\u1100\u1161\u1105\u116E
\u1100\u1169\u1110\u1169\u11BC
\u1100\u1169\u1112\u1163\u11BC
\u1100\u1169\u11A8\u1109\u1175\u11A8
\u1100\u1169\u11AF\u1106\u1169\u11A8
\u1100\u1169\u11AF\u110D\u1161\u1100\u1175
\u1100\u1169\u11AF\u1111\u1173
\u1100\u1169\u11BC\u1100\u1161\u11AB
\u1100\u1169\u11BC\u1100\u1162
\u1100\u1169\u11BC\u1100\u1167\u11A8
\u1100\u1169\u11BC\u1100\u116E\u11AB
\u1100\u1169\u11BC\u1100\u1173\u11B8
\u1100\u1169\u11BC\u1100\u1175
\u1100\u1169\u11BC\u1103\u1169\u11BC
\u1100\u1169\u11BC\u1106\u116E\u110B\u116F\u11AB
\u1100\u1169\u11BC\u1107\u116E
\u1100\u1169\u11BC\u1109\u1161
\u1100\u1169\u11BC\u1109\u1175\u11A8
\u1100\u1169\u11BC\u110B\u1165\u11B8
\u1100\u1169\u11BC\u110B\u1167\u11AB
\u1100\u1169\u11BC\u110B\u116F\u11AB
\u1100\u1169\u11BC\u110C\u1161\u11BC
\u1100\u1169\u11BC\u110D\u1161
\u1100\u1169\u11BC\u110E\u1162\u11A8
\u1100\u1169\u11BC\u1110\u1169\u11BC
\u1100\u1169\u11BC\u1111\u1169
\u1100\u1169\u11BC\u1112\u1161\u11BC
\u1100\u1169\u11BC\u1112\u1172\u110B\u1175\u11AF
\u1100\u116A\u1106\u1169\u11A8
\u1100\u116A\u110B\u1175\u11AF
\u1100\u116A\u110C\u1161\u11BC
\u1100\u116A\u110C\u1165\u11BC
\u1100\u116A\u1112\u1161\u11A8
\u1100\u116A\u11AB\u1100\u1162\u11A8
\u1100\u116A\u11AB\u1100\u1168
\u1100\u116A\u11AB\u1100\u116A\u11BC
\u1100\u116A\u11AB\u1102\u1167\u11B7
\u1100\u116A\u11AB\u1105\u1161\u11B7
\u1100\u116A\u11AB\u1105\u1167\u11AB
\u1100\u116A\u11AB\u1105\u1175
\u1100\u116A\u11AB\u1109\u1173\u11B8
\u1100\u116A\u11AB\u1109\u1175\u11B7
\u1100\u116A\u11AB\u110C\u1165\u11B7
\u1100\u116A\u11AB\u110E\u1161\u11AF
\u1100\u116A\u11BC\u1100\u1167\u11BC
\u1100\u116A\u11BC\u1100\u1169
\u1100\u116A\u11BC\u110C\u1161\u11BC
\u1100\u116A\u11BC\u110C\u116E
\u1100\u116C\u1105\u1169\u110B\u116E\u11B7
\u1100\u116C\u11BC\u110C\u1161\u11BC\u1112\u1175
\u1100\u116D\u1100\u116A\u1109\u1165
\u1100\u116D\u1106\u116E\u11AB
\u1100\u116D\u1107\u1169\u11A8
\u1100\u116D\u1109\u1175\u11AF
\u1100\u116D\u110B\u1163\u11BC
\u1100\u116D\u110B\u1172\u11A8
\u1100\u116D\u110C\u1161\u11BC
\u1100\u116D\u110C\u1175\u11A8
\u1100\u116D\u1110\u1169\u11BC
\u1100\u116D\u1112\u116A\u11AB
\u1100\u116D\u1112\u116E\u11AB
\u1100\u116E\u1100\u1167\u11BC
\u1100\u116E\u1105\u1173\u11B7
\u1100\u116E\u1106\u1165\u11BC
\u1100\u116E\u1107\u1167\u11AF
\u1100\u116E\u1107\u116E\u11AB
\u1100\u116E\u1109\u1165\u11A8
\u1100\u116E\u1109\u1165\u11BC
\u1100\u116E\u1109\u1169\u11A8
\u1100\u116E\u110B\u1167\u11A8
\u1100\u116E\u110B\u1175\u11B8
\u1100\u116E\u110E\u1165\u11BC
\u1100\u116E\u110E\u1166\u110C\u1165\u11A8
\u1100\u116E\u11A8\u1100\u1161
\u1100\u116E\u11A8\u1100\u1175
\u1100\u116E\u11A8\u1102\u1162
\u1100\u116E\u11A8\u1105\u1175\u11B8
\u1100\u116E\u11A8\u1106\u116E\u11AF
\u1100\u116E\u11A8\u1106\u1175\u11AB
\u1100\u116E\u11A8\u1109\u116E
\u1100\u116E\u11A8\u110B\u1165
\u1100\u116E\u11A8\u110B\u116A\u11BC
\u1100\u116E\u11A8\u110C\u1165\u11A8
\u1100\u116E\u11A8\u110C\u1166
\u1100\u116E\u11A8\u1112\u116C
\u1100\u116E\u11AB\u1103\u1162
\u1100\u116E\u11AB\u1109\u1161
\u1100\u116E\u11AB\u110B\u1175\u11AB
\u1100\u116E\u11BC\u1100\u1173\u11A8\u110C\u1165\u11A8
\u1100\u116F\u11AB\u1105\u1175
\u1100\u116F\u11AB\u110B\u1171
\u1100\u116F\u11AB\u1110\u116E
\u1100\u1171\u1100\u116E\u11A8
\u1100\u1171\u1109\u1175\u11AB
\u1100\u1172\u110C\u1165\u11BC
\u1100\u1172\u110E\u1175\u11A8
\u1100\u1172\u11AB\u1112\u1167\u11BC
\u1100\u1173\u1102\u1161\u11AF
\u1100\u1173\u1102\u1163\u11BC
\u1100\u1173\u1102\u1173\u11AF
\u1100\u1173\u1105\u1165\u1102\u1161
\u1100\u1173\u1105\u116E\u11B8
\u1100\u1173\u1105\u1173\u11BA
\u1100\u1173\u1105\u1175\u11B7
\u1100\u1173\u110C\u1166\u1109\u1165\u110B\u1163
\u1100\u1173\u1110\u1169\u1105\u1169\u11A8
\u1100\u1173\u11A8\u1107\u1169\u11A8
\u1100\u1173\u11A8\u1112\u1175
\u1100\u1173\u11AB\u1100\u1165
\u1100\u1173\u11AB\u1100\u116D
\u1100\u1173\u11AB\u1105\u1162
\u1100\u1173\u11AB\u1105\u1169
\u1100\u1173\u11AB\u1106\u116E
\u1100\u1173\u11AB\u1107\u1169\u11AB
\u1100\u1173\u11AB\u110B\u116F\u11AB
\u1100\u1173\u11AB\u110B\u1172\u11A8
\u1100\u1173\u11AB\u110E\u1165
\u1100\u1173\u11AF\u110A\u1175
\u1100\u1173\u11AF\u110C\u1161
\u1100\u1173\u11B7\u1100\u1161\u11BC\u1109\u1161\u11AB
\u1100\u1173\u11B7\u1100\u1169
\u1100\u1173\u11B7\u1102\u1167\u11AB
\u1100\u1173\u11B7\u1106\u1166\u1103\u1161\u11AF
\u1100\u1173\u11B7\u110B\u1162\u11A8
\u1100\u1173\u11B7\u110B\u1167\u11AB
\u1100\u1173\u11B7\u110B\u116D\u110B\u1175\u11AF
\u1100\u1173\u11B7\u110C\u1175
\u1100\u1173\u11BC\u110C\u1165\u11BC\u110C\u1165\u11A8
\u1100\u1175\u1100\u1161\u11AB
\u1100\u1175\u1100\u116A\u11AB
\u1100\u1175\u1102\u1167\u11B7
\u1100\u1175\u1102\u1173\u11BC
\u1100\u1175\u1103\u1169\u11A8\u1100\u116D
\u1100\u1175\u1103\u116E\u11BC
\u1100\u1175\u1105\u1169\u11A8
\u1100\u1175\u1105\u1173\u11B7
\u1100\u1175\u1107\u1165\u11B8
\u1100\u1175\u1107\u1169\u11AB
\u1100\u1175\u1107\u116E\u11AB
\u1100\u1175\u1108\u1173\u11B7
\u1100\u1175\u1109\u116E\u11A8\u1109\u1161
\u1100\u1175\u1109\u116E\u11AF
\u1100\u1175\u110B\u1165\u11A8
\u1100\u1175\u110B\u1165\u11B8
\u1100\u1175\u110B\u1169\u11AB
\u1100\u1175\u110B\u116E\u11AB
\u1100\u1175\u110B\u116F\u11AB
\u1100\u1175\u110C\u1165\u11A8
\u1100\u1175\u110C\u116E\u11AB
\u1100\u1175\u110E\u1175\u11B7
\u1100\u1175\u1112\u1169\u11AB
\u1100\u1175\u1112\u116C\u11A8
\u1100\u1175\u11AB\u1100\u1173\u11B8
\u1100\u1175\u11AB\u110C\u1161\u11BC
\u1100\u1175\u11AF\u110B\u1175
\u1100\u1175\u11B7\u1107\u1161\u11B8
\u1100\u1175\u11B7\u110E\u1175
\u1100\u1175\u11B7\u1111\u1169\u1100\u1169\u11BC\u1112\u1161\u11BC
\u1101\u1161\u11A8\u1103\u116E\u1100\u1175
\u1101\u1161\u11B7\u1108\u1161\u11A8
\u1101\u1162\u1103\u1161\u11AF\u110B\u1173\u11B7
\u1101\u1162\u1109\u1169\u1100\u1173\u11B7
\u1101\u1165\u11B8\u110C\u1175\u11AF
\u1101\u1169\u11A8\u1103\u1162\u1100\u1175
\u1101\u1169\u11BE\u110B\u1175\u11C1
\u1102\u1161\u1103\u1173\u11AF\u110B\u1175
\u1102\u1161\u1105\u1161\u11AB\u1112\u1175
\u1102\u1161\u1106\u1165\u110C\u1175
\u1102\u1161\u1106\u116E\u11AF
\u1102\u1161\u110E\u1175\u11B7\u1107\u1161\u11AB
\u1102\u1161\u1112\u1173\u11AF
\u1102\u1161\u11A8\u110B\u1167\u11B8
\u1102\u1161\u11AB\u1107\u1161\u11BC
\u1102\u1161\u11AF\u1100\u1162
\u1102\u1161\u11AF\u110A\u1175
\u1102\u1161\u11AF\u110D\u1161
\u1102\u1161\u11B7\u1102\u1167
\u1102\u1161\u11B7\u1103\u1162\u1106\u116E\u11AB
\u1102\u1161\u11B7\u1106\u1162
\u1102\u1161\u11B7\u1109\u1161\u11AB
\u1102\u1161\u11B7\u110C\u1161
\u1102\u1161\u11B7\u1111\u1167\u11AB
\u1102\u1161\u11B7\u1112\u1161\u11A8\u1109\u1162\u11BC
\u1102\u1161\u11BC\u1107\u1175
\u1102\u1161\u11C0\u1106\u1161\u11AF
\u1102\u1162\u1102\u1167\u11AB
\u1102\u1162\u110B\u116D\u11BC
\u1102\u1162\u110B\u1175\u11AF
\u1102\u1162\u11B7\u1107\u1175
\u1102\u1162\u11B7\u1109\u1162
\u1102\u1162\u11BA\u1106\u116E\u11AF
\u1102\u1162\u11BC\u1103\u1169\u11BC
\u1102\u1162\u11BC\u1106\u1167\u11AB
\u1102\u1162\u11BC\u1107\u1161\u11BC
\u1102\u1162\u11BC\u110C\u1161\u11BC\u1100\u1169
\u1102\u1166\u11A8\u1110\u1161\u110B\u1175
\u1102\u1166\u11BA\u110D\u1162
\u1102\u1169\u1103\u1169\u11BC
\u1102\u1169\u1105\u1161\u11AB\u1109\u1162\u11A8
\u1102\u1169\u1105\u1167\u11A8
\u1102\u1169\u110B\u1175\u11AB
\u1102\u1169\u11A8\u110B\u1173\u11B7
\u1102\u1169\u11A8\u110E\u1161
\u1102\u1169\u11A8\u1112\u116A
\u1102\u1169\u11AB\u1105\u1175
\u1102\u1169\u11AB\u1106\u116E\u11AB
\u1102\u1169\u11AB\u110C\u1162\u11BC
\u1102\u1169\u11AF\u110B\u1175
\u1102\u1169\u11BC\u1100\u116E
\u1102\u1169\u11BC\u1103\u1161\u11B7
\u1102\u1169\u11BC\u1106\u1175\u11AB
\u1102\u1169\u11BC\u1107\u116E
\u1102\u1169\u11BC\u110B\u1165\u11B8
\u1102\u1169\u11BC\u110C\u1161\u11BC
\u1102\u1169\u11BC\u110E\u1169\u11AB
\u1102\u1169\u11C1\u110B\u1175
\u1102\u116E\u11AB\u1103\u1169\u11BC\u110C\u1161
\u1102\u116E\u11AB\u1106\u116E\u11AF
\u1102\u116E\u11AB\u110A\u1165\u11B8
\u1102\u1172\u110B\u116D\u11A8
\u1102\u1173\u1101\u1175\u11B7
\u1102\u1173\u11A8\u1103\u1162
\u1102\u1173\u11BC\u1103\u1169\u11BC\u110C\u1165\u11A8
\u1102\u1173\u11BC\u1105\u1167\u11A8
\u1103\u1161\u1107\u1161\u11BC
\u1103\u1161\u110B\u1163\u11BC\u1109\u1165\u11BC
\u1103\u1161\u110B\u1173\u11B7
\u1103\u1161\u110B\u1175\u110B\u1165\u1110\u1173
\u1103\u1161\u1112\u1162\u11BC
\u1103\u1161\u11AB\u1100\u1168
\u1103\u1161\u11AB\u1100\u1169\u11AF
\u1103\u1161\u11AB\u1103\u1169\u11A8
\u1103\u1161\u11AB\u1106\u1161\u11BA
\u1103\u1161\u11AB\u1109\u116E\u11AB
\u1103\u1161\u11AB\u110B\u1165
\u1103\u1161\u11AB\u110B\u1171
\u1103\u1161\u11AB\u110C\u1165\u11B7
\u1103\u1161\u11AB\u110E\u1166
\u1103\u1161\u11AB\u110E\u116E
\u1103\u1161\u11AB\u1111\u1167\u11AB
\u1103\u1161\u11AB\u1111\u116E\u11BC
\u1103\u1161\u11AF\u1100\u1163\u11AF
\u1103\u1161\u11AF\u1105\u1165
\u1103\u1161\u11AF\u1105\u1167\u11A8
\u1103\u1161\u11AF\u1105\u1175
\u1103\u1161\u11B0\u1100\u1169\u1100\u1175
\u1103\u1161\u11B7\u1103\u1161\u11BC
\u1103\u1161\u11B7\u1107\u1162
\u1103\u1161\u11B7\u110B\u116D
\u1103\u1161\u11B7\u110B\u1175\u11B7
\u1103\u1161\u11B8\u1107\u1167\u11AB
\u1103\u1161\u11B8\u110C\u1161\u11BC
\u1103\u1161\u11BC\u1100\u1173\u11AB
\u1103\u1161\u11BC\u1107\u116E\u11AB\u1100\u1161\u11AB
\u1103\u1161\u11BC\u110B\u1167\u11AB\u1112\u1175
\u1103\u1161\u11BC\u110C\u1161\u11BC
\u1103\u1162\u1100\u1172\u1106\u1169
\u1103\u1162\u1102\u1161\u11BD
\u1103\u1162\u1103\u1161\u11AB\u1112\u1175
\u1103\u1162\u1103\u1161\u11B8
\u1103\u1162\u1103\u1169\u1109\u1175
\u1103\u1162\u1105\u1163\u11A8
\u1103\u1162\u1105\u1163\u11BC
\u1103\u1162\u1105\u1172\u11A8
\u1103\u1162\u1106\u116E\u11AB
\u1103\u1162\u1107\u116E\u1107\u116E\u11AB
\u1103\u1162\u1109\u1175\u11AB
\u1103\u1162\u110B\u1173\u11BC
\u1103\u1162\u110C\u1161\u11BC
\u1103\u1162\u110C\u1165\u11AB
\u1103\u1162\u110C\u1165\u11B8
\u1103\u1162\u110C\u116E\u11BC
\u1103\u1162\u110E\u1162\u11A8
\u1103\u1162\u110E\u116E\u11AF
\u1103\u1162\u110E\u116E\u11BC
\u1103\u1162\u1110\u1169\u11BC\u1105\u1167\u11BC
\u1103\u1162\u1112\u1161\u11A8
\u1103\u1162\u1112\u1161\u11AB\u1106\u1175\u11AB\u1100\u116E\u11A8
\u1103\u1162\u1112\u1161\u11B8\u1109\u1175\u11AF
\u1103\u1162\u1112\u1167\u11BC
\u1103\u1165\u11BC\u110B\u1165\u1105\u1175
\u1103\u1166\u110B\u1175\u1110\u1173
\u1103\u1169\u1103\u1162\u110E\u1166
\u1103\u1169\u1103\u1165\u11A8
\u1103\u1169\u1103\u116E\u11A8
\u1103\u1169\u1106\u1161\u11BC
\u1103\u1169\u1109\u1165\u1100\u116A\u11AB
\u1103\u1169\u1109\u1175\u11B7
\u1103\u1169\u110B\u116E\u11B7
\u1103\u1169\u110B\u1175\u11B8
\u1103\u1169\u110C\u1161\u1100\u1175
\u1103\u1169\u110C\u1165\u1112\u1175
\u1103\u1169\u110C\u1165\u11AB
\u1103\u1169\u110C\u116E\u11BC
\u1103\u1169\u110E\u1161\u11A8
\u1103\u1169\u11A8\u1100\u1161\u11B7
\u1103\u1169\u11A8\u1105\u1175\u11B8
\u1103\u1169\u11A8\u1109\u1165
\u1103\u1169\u11A8\u110B\u1175\u11AF
\u1103\u1169\u11A8\u110E\u1161\u11BC\u110C\u1165\u11A8
\u1103\u1169\u11BC\u1112\u116A\u110E\u1162\u11A8
\u1103\u1171\u11BA\u1106\u1169\u1109\u1173\u11B8
\u1103\u1171\u11BA\u1109\u1161\u11AB
\u1104\u1161\u11AF\u110B\u1161\u110B\u1175
\u1106\u1161\u1102\u116E\u1105\u1161
\u1106\u1161\u1102\u1173\u11AF
\u1106\u1161\u1103\u1161\u11BC
\u1106\u1161\u1105\u1161\u1110\u1169\u11AB
\u1106\u1161\u1105\u1167\u11AB
\u1106\u1161\u1106\u116E\u1105\u1175
\u1106\u1161\u1109\u1161\u110C\u1175
\u1106\u1161\u110B\u1163\u11A8
\u1106\u1161\u110B\u116D\u1102\u1166\u110C\u1173
\u1106\u1161\u110B\u1173\u11AF
\u1106\u1161\u110B\u1173\u11B7
\u1106\u1161\u110B\u1175\u110F\u1173
\u1106\u1161\u110C\u116E\u11BC
\u1106\u1161\u110C\u1175\u1106\u1161\u11A8
\u1106\u1161\u110E\u1161\u11AB\u1100\u1161\u110C\u1175
\u1106\u1161\u110E\u1161\u11AF
\u1106\u1161\u1112\u1173\u11AB
\u1106\u1161\u11A8\u1100\u1165\u11AF\u1105\u1175
\u1106\u1161\u11A8\u1102\u1162
\u1106\u1161\u11A8\u1109\u1161\u11BC
\u1106\u1161\u11AB\u1102\u1161\u11B7
\u1106\u1161\u11AB\u1103\u116E
\u1106\u1161\u11AB\u1109\u1166
\u1106\u1161\u11AB\u110B\u1163\u11A8
\u1106\u1161\u11AB\u110B\u1175\u11AF
\u1106\u1161\u11AB\u110C\u1165\u11B7
\u1106\u1161\u11AB\u110C\u1169\u11A8
\u1106\u1161\u11AB\u1112\u116A
\u1106\u1161\u11AD\u110B\u1175
\u1106\u1161\u11AF\u1100\u1175
\u1106\u1161\u11AF\u110A\u1173\u11B7
\u1106\u1161\u11AF\u1110\u116E
\u1106\u1161\u11B7\u1103\u1162\u1105\u1169
\u1106\u1161\u11BC\u110B\u116F\u11AB\u1100\u1167\u11BC
\u1106\u1162\u1102\u1167\u11AB
\u1106\u1162\u1103\u1161\u11AF
\u1106\u1162\u1105\u1167\u11A8
\u1106\u1162\u1107\u1165\u11AB
\u1106\u1162\u1109\u1173\u110F\u1165\u11B7
\u1106\u1162\u110B\u1175\u11AF
\u1106\u1162\u110C\u1161\u11BC
\u1106\u1162\u11A8\u110C\u116E
\u1106\u1165\u11A8\u110B\u1175
\u1106\u1165\u11AB\u110C\u1165
\u1106\u1165\u11AB\u110C\u1175
\u1106\u1165\u11AF\u1105\u1175
\u1106\u1166\u110B\u1175\u11AF
\u1106\u1167\u1102\u1173\u1105\u1175
\u1106\u1167\u110E\u1175\u11AF
\u1106\u1167\u11AB\u1103\u1161\u11B7
\u1106\u1167\u11AF\u110E\u1175
\u1106\u1167\u11BC\u1103\u1161\u11AB
\u1106\u1167\u11BC\u1105\u1167\u11BC
\u1106\u1167\u11BC\u110B\u1168
\u1106\u1167\u11BC\u110B\u1174
\u1106\u1167\u11BC\u110C\u1165\u11AF
\u1106\u1167\u11BC\u110E\u1175\u11BC
\u1106\u1167\u11BC\u1112\u1161\u11B7
\u1106\u1169\u1100\u1173\u11B7
\u1106\u1169\u1102\u1175\u1110\u1165
\u1106\u1169\u1103\u1166\u11AF
\u1106\u1169\u1103\u1173\u11AB
\u1106\u1169\u1107\u1165\u11B7
\u1106\u1169\u1109\u1173\u11B8
\u1106\u1169\u110B\u1163\u11BC
\u1106\u1169\u110B\u1175\u11B7
\u1106\u1169\u110C\u1169\u1105\u1175
\u1106\u1169\u110C\u1175\u11B8
\u1106\u1169\u1110\u116E\u11BC\u110B\u1175
\u1106\u1169\u11A8\u1100\u1165\u11AF\u110B\u1175
\u1106\u1169\u11A8\u1105\u1169\u11A8
\u1106\u1169\u11A8\u1109\u1161
\u1106\u1169\u11A8\u1109\u1169\u1105\u1175
\u1106\u1169\u11A8\u1109\u116E\u11B7
\u1106\u1169\u11A8\u110C\u1165\u11A8
\u1106\u1169\u11A8\u1111\u116D
\u1106\u1169\u11AF\u1105\u1162
\u1106\u1169\u11B7\u1106\u1162
\u1106\u1169\u11B7\u1106\u116E\u1100\u1166
\u1106\u1169\u11B7\u1109\u1161\u11AF
\u1106\u1169\u11B7\u1109\u1169\u11A8
\u1106\u1169\u11B7\u110C\u1175\u11BA
\u1106\u1169\u11B7\u1110\u1169\u11BC
\u1106\u1169\u11B8\u1109\u1175
\u1106\u116E\u1100\u116A\u11AB\u1109\u1175\u11B7
\u1106\u116E\u1100\u116E\u11BC\u1112\u116A
\u1106\u116E\u1103\u1165\u110B\u1171
\u1106\u116E\u1103\u1165\u11B7
\u1106\u116E\u1105\u1173\u11C1
\u1106\u116E\u1109\u1173\u11AB
\u1106\u116E\u110B\u1165\u11BA
\u1106\u116E\u110B\u1167\u11A8
\u1106\u116E\u110B\u116D\u11BC
\u1106\u116E\u110C\u1169\u1100\u1165\u11AB
\u1106\u116E\u110C\u1175\u1100\u1162
\u1106\u116E\u110E\u1165\u11A8
\u1106\u116E\u11AB\u1100\u116E
\u1106\u116E\u11AB\u1103\u1173\u11A8
\u1106\u116E\u11AB\u1107\u1165\u11B8
\u1106\u116E\u11AB\u1109\u1165
\u1106\u116E\u11AB\u110C\u1166
\u1106\u116E\u11AB\u1112\u1161\u11A8
\u1106\u116E\u11AB\u1112\u116A
\u1106\u116E\u11AF\u1100\u1161
\u1106\u116E\u11AF\u1100\u1165\u11AB
\u1106\u116E\u11AF\u1100\u1167\u11AF
\u1106\u116E\u11AF\u1100\u1169\u1100\u1175
\u1106\u116E\u11AF\u1105\u1169\u11AB
\u1106\u116E\u11AF\u1105\u1175\u1112\u1161\u11A8
\u1106\u116E\u11AF\u110B\u1173\u11B7
\u1106\u116E\u11AF\u110C\u1175\u11AF
\u1106\u116E\u11AF\u110E\u1166
\u1106\u1175\u1100\u116E\u11A8
\u1106\u1175\u1103\u1175\u110B\u1165
\u1106\u1175\u1109\u1161\u110B\u1175\u11AF
\u1106\u1175\u1109\u116E\u11AF
\u1106\u1175\u110B\u1167\u11A8
\u1106\u1175\u110B\u116D\u11BC\u1109\u1175\u11AF
\u1106\u1175\u110B\u116E\u11B7
\u1106\u1175\u110B\u1175\u11AB
\u1106\u1175\u1110\u1175\u11BC
\u1106\u1175\u1112\u1169\u11AB
\u1106\u1175\u11AB\u1100\u1161\u11AB
\u1106\u1175\u11AB\u110C\u1169\u11A8
\u1106\u1175\u11AB\u110C\u116E
\u1106\u1175\u11AE\u110B\u1173\u11B7
\u1106\u1175\u11AF\u1100\u1161\u1105\u116E
\u1106\u1175\u11AF\u1105\u1175\u1106\u1175\u1110\u1165
\u1106\u1175\u11C0\u1107\u1161\u1103\u1161\u11A8
\u1107\u1161\u1100\u1161\u110C\u1175
\u1107\u1161\u1100\u116E\u1102\u1175
\u1107\u1161\u1102\u1161\u1102\u1161
\u1107\u1161\u1102\u1173\u11AF
\u1107\u1161\u1103\u1161\u11A8
\u1107\u1161\u1103\u1161\u11BA\u1100\u1161
\u1107\u1161\u1105\u1161\u11B7
\u1107\u1161\u110B\u1175\u1105\u1165\u1109\u1173
\u1107\u1161\u1110\u1161\u11BC
\u1107\u1161\u11A8\u1106\u116E\u11AF\u1100\u116A\u11AB
\u1107\u1161\u11A8\u1109\u1161
\u1107\u1161\u11A8\u1109\u116E
\u1107\u1161\u11AB\u1103\u1162
\u1107\u1161\u11AB\u1103\u1173\u1109\u1175
\u1107\u1161\u11AB\u1106\u1161\u11AF
\u1107\u1161\u11AB\u1107\u1161\u11AF
\u1107\u1161\u11AB\u1109\u1165\u11BC
\u1107\u1161\u11AB\u110B\u1173\u11BC
\u1107\u1161\u11AB\u110C\u1161\u11BC
\u1107\u1161\u11AB\u110C\u116E\u11A8
\u1107\u1161\u11AB\u110C\u1175
\u1107\u1161\u11AB\u110E\u1161\u11AB
\u1107\u1161\u11AE\u110E\u1175\u11B7
\u1107\u1161\u11AF\u1100\u1161\u1105\u1161\u11A8
\u1107\u1161\u11AF\u1100\u1165\u11AF\u110B\u1173\u11B7
\u1107\u1161\u11AF\u1100\u1167\u11AB
\u1107\u1161\u11AF\u1103\u1161\u11AF
\u1107\u1161\u11AF\u1105\u1166
\u1107\u1161\u11AF\u1106\u1169\u11A8
\u1107\u1161\u11AF\u1107\u1161\u1103\u1161\u11A8
\u1107\u1161\u11AF\u1109\u1162\u11BC
\u1107\u1161\u11AF\u110B\u1173\u11B7
\u1107\u1161\u11AF\u110C\u1161\u1100\u116E\u11A8
\u1107\u1161\u11AF\u110C\u1165\u11AB
\u1107\u1161\u11AF\u1110\u1169\u11B8
\u1107\u1161\u11AF\u1111\u116D
\u1107\u1161\u11B7\u1112\u1161\u1102\u1173\u11AF
\u1107\u1161\u11B8\u1100\u1173\u1105\u1173\u11BA
\u1107\u1161\u11B8\u1106\u1161\u11BA
\u1107\u1161\u11B8\u1109\u1161\u11BC
\u1107\u1161\u11B8\u1109\u1169\u11C0
\u1107\u1161\u11BC\u1100\u1173\u11B7
\u1107\u1161\u11BC\u1106\u1167\u11AB
\u1107\u1161\u11BC\u1106\u116E\u11AB
\u1107\u1161\u11BC\u1107\u1161\u1103\u1161\u11A8
\u1107\u1161\u11BC\u1107\u1165\u11B8
\u1107\u1161\u11BC\u1109\u1169\u11BC
\u1107\u1161\u11BC\u1109\u1175\u11A8
\u1107\u1161\u11BC\u110B\u1161\u11AB
\u1107\u1161\u11BC\u110B\u116E\u11AF
\u1107\u1161\u11BC\u110C\u1175
\u1107\u1161\u11BC\u1112\u1161\u11A8
\u1107\u1161\u11BC\u1112\u1162
\u1107\u1161\u11BC\u1112\u1163\u11BC
\u1107\u1162\u1100\u1167\u11BC
\u1107\u1162\u1101\u1169\u11B8
\u1107\u1162\u1103\u1161\u11AF
\u1107\u1162\u1103\u1173\u1106\u1175\u11AB\u1110\u1165\u11AB
\u1107\u1162\u11A8\u1103\u116E\u1109\u1161\u11AB
\u1107\u1162\u11A8\u1109\u1162\u11A8
\u1107\u1162\u11A8\u1109\u1165\u11BC
\u1107\u1162\u11A8\u110B\u1175\u11AB
\u1107\u1162\u11A8\u110C\u1166
\u1107\u1162\u11A8\u1112\u116A\u110C\u1165\u11B7
\u1107\u1165\u1105\u1173\u11BA
\u1107\u1165\u1109\u1165\u11BA
\u1107\u1165\u1110\u1173\u11AB
\u1107\u1165\u11AB\u1100\u1162
\u1107\u1165\u11AB\u110B\u1167\u11A8
\u1107\u1165\u11AB\u110C\u1175
\u1107\u1165\u11AB\u1112\u1169
\u1107\u1165\u11AF\u1100\u1173\u11B7
\u1107\u1165\u11AF\u1105\u1166
\u1107\u1165\u11AF\u110A\u1165
\u1107\u1165\u11B7\u110B\u1171
\u1107\u1165\u11B7\u110B\u1175\u11AB
\u1107\u1165\u11B7\u110C\u116C
\u1107\u1165\u11B8\u1105\u1172\u11AF
\u1107\u1165\u11B8\u110B\u116F\u11AB
\u1107\u1165\u11B8\u110C\u1165\u11A8
\u1107\u1165\u11B8\u110E\u1175\u11A8
\u1107\u1166\u110B\u1175\u110C\u1175\u11BC
\u1107\u1166\u11AF\u1110\u1173
\u1107\u1167\u11AB\u1100\u1167\u11BC
\u1107\u1167\u11AB\u1103\u1169\u11BC
\u1107\u1167\u11AB\u1106\u1167\u11BC
\u1107\u1167\u11AB\u1109\u1175\u11AB
\u1107\u1167\u11AB\u1112\u1169\u1109\u1161
\u1107\u1167\u11AB\u1112\u116A
\u1107\u1167\u11AF\u1103\u1169
\u1107\u1167\u11AF\u1106\u1167\u11BC
\u1107\u1167\u11AF\u110B\u1175\u11AF
\u1107\u1167\u11BC\u1109\u1175\u11AF
\u1107\u1167\u11BC\u110B\u1161\u1105\u1175
\u1107\u1167\u11BC\u110B\u116F\u11AB
\u1107\u1169\u1100\u116A\u11AB
\u1107\u1169\u1102\u1165\u1109\u1173
\u1107\u1169\u1105\u1161\u1109\u1162\u11A8
\u1107\u1169\u1105\u1161\u11B7
\u1107\u1169\u1105\u1173\u11B7
\u1107\u1169\u1109\u1161\u11BC
\u1107\u1169\u110B\u1161\u11AB
\u1107\u1169\u110C\u1161\u1100\u1175
\u1107\u1169\u110C\u1161\u11BC
\u1107\u1169\u110C\u1165\u11AB
\u1107\u1169\u110C\u1169\u11AB
\u1107\u1169\u1110\u1169\u11BC
\u1107\u1169\u1111\u1167\u11AB\u110C\u1165\u11A8
\u1107\u1169\u1112\u1165\u11B7
\u1107\u1169\u11A8\u1103\u1169
\u1107\u1169\u11A8\u1109\u1161
\u1107\u1169\u11A8\u1109\u116E\u11BC\u110B\u1161
\u1107\u1169\u11A8\u1109\u1173\u11B8
\u1107\u1169\u11A9\u110B\u1173\u11B7
\u1107\u1169\u11AB\u1100\u1167\u11A8\u110C\u1165\u11A8
\u1107\u1169\u11AB\u1105\u1162
\u1107\u1169\u11AB\u1107\u116E
\u1107\u1169\u11AB\u1109\u1161
\u1107\u1169\u11AB\u1109\u1165\u11BC
\u1107\u1169\u11AB\u110B\u1175\u11AB
\u1107\u1169\u11AB\u110C\u1175\u11AF
\u1107\u1169\u11AF\u1111\u1166\u11AB
\u1107\u1169\u11BC\u1109\u1161
\u1107\u1169\u11BC\u110C\u1175
\u1107\u1169\u11BC\u1110\u116E
\u1107\u116E\u1100\u1173\u11AB
\u1107\u116E\u1101\u1173\u1105\u1165\u110B\u116E\u11B7
\u1107\u116E\u1103\u1161\u11B7
\u1107\u116E\u1103\u1169\u11BC\u1109\u1161\u11AB
\u1107\u116E\u1106\u116E\u11AB
\u1107\u116E\u1107\u116E\u11AB
\u1107\u116E\u1109\u1161\u11AB
\u1107\u116E\u1109\u1161\u11BC
\u1107\u116E\u110B\u1165\u11BF
\u1107\u116E\u110B\u1175\u11AB
\u1107\u116E\u110C\u1161\u11A8\u110B\u116D\u11BC
\u1107\u116E\u110C\u1161\u11BC
\u1107\u116E\u110C\u1165\u11BC
\u1107\u116E\u110C\u1169\u11A8
\u1107\u116E\u110C\u1175\u1105\u1165\u11AB\u1112\u1175
\u1107\u116E\u110E\u1175\u11AB
\u1107\u116E\u1110\u1161\u11A8
\u1107\u116E\u1111\u116E\u11B7
\u1107\u116E\u1112\u116C\u110C\u1161\u11BC
\u1107\u116E\u11A8\u1107\u116E
\u1107\u116E\u11A8\u1112\u1161\u11AB
\u1107\u116E\u11AB\u1102\u1169
\u1107\u116E\u11AB\u1105\u1163\u11BC
\u1107\u116E\u11AB\u1105\u1175
\u1107\u116E\u11AB\u1106\u1167\u11BC
\u1107\u116E\u11AB\u1109\u1165\u11A8
\u1107\u116E\u11AB\u110B\u1163
\u1107\u116E\u11AB\u110B\u1171\u1100\u1175
\u1107\u116E\u11AB\u1111\u1175\u11AF
\u1107\u116E\u11AB\u1112\u1169\u11BC\u1109\u1162\u11A8
\u1107\u116E\u11AF\u1100\u1169\u1100\u1175
\u1107\u116E\u11AF\u1100\u116A
\u1107\u116E\u11AF\u1100\u116D
\u1107\u116E\u11AF\u1101\u1169\u11BE
\u1107\u116E\u11AF\u1106\u1161\u11AB
\u1107\u116E\u11AF\u1107\u1165\u11B8
\u1107\u116E\u11AF\u1107\u1175\u11BE
\u1107\u116E\u11AF\u110B\u1161\u11AB
\u1107\u116E\u11AF\u110B\u1175\u110B\u1175\u11A8
\u1107\u116E\u11AF\u1112\u1162\u11BC
\u1107\u1173\u1105\u1162\u11AB\u1103\u1173
\u1107\u1175\u1100\u1173\u11A8
\u1107\u1175\u1102\u1161\u11AB
\u1107\u1175\u1102\u1175\u11AF
\u1107\u1175\u1103\u116E\u11AF\u1100\u1175
\u1107\u1175\u1103\u1175\u110B\u1169
\u1107\u1175\u1105\u1169\u1109\u1169
\u1107\u1175\u1106\u1161\u11AB
\u1107\u1175\u1106\u1167\u11BC
\u1107\u1175\u1106\u1175\u11AF
\u1107\u1175\u1107\u1161\u1105\u1161\u11B7
\u1107\u1175\u1107\u1175\u11B7\u1107\u1161\u11B8
\u1107\u1175\u1109\u1161\u11BC
\u1107\u1175\u110B\u116D\u11BC
\u1107\u1175\u110B\u1172\u11AF
\u1107\u1175\u110C\u116E\u11BC
\u1107\u1175\u1110\u1161\u1106\u1175\u11AB
\u1107\u1175\u1111\u1161\u11AB
\u1107\u1175\u11AF\u1103\u1175\u11BC
\u1107\u1175\u11BA\u1106\u116E\u11AF
\u1107\u1175\u11BA\u1107\u1161\u11BC\u110B\u116E\u11AF
\u1107\u1175\u11BA\u110C\u116E\u11AF\u1100\u1175
\u1107\u1175\u11BE\u1101\u1161\u11AF
\u1108\u1161\u11AF\u1100\u1161\u11AB\u1109\u1162\u11A8
\u1108\u1161\u11AF\u1105\u1162
\u1108\u1161\u11AF\u1105\u1175
\u1109\u1161\u1100\u1165\u11AB
\u1109\u1161\u1100\u1168\u110C\u1165\u11AF
\u1109\u1161\u1102\u1161\u110B\u1175
\u1109\u1161\u1102\u1163\u11BC
\u1109\u1161\u1105\u1161\u11B7
\u1109\u1161\u1105\u1161\u11BC
\u1109\u1161\u1105\u1175\u11B8
\u1109\u1161\u1106\u1169\u1102\u1175\u11B7
\u1109\u1161\u1106\u116E\u11AF
\u1109\u1161\u1107\u1161\u11BC
\u1109\u1161\u1109\u1161\u11BC
\u1109\u1161\u1109\u1162\u11BC\u1112\u116A\u11AF
\u1109\u1161\u1109\u1165\u11AF
\u1109\u1161\u1109\u1173\u11B7
\u1109\u1161\u1109\u1175\u11AF
\u1109\u1161\u110B\u1165\u11B8
\u1109\u1161\u110B\u116D\u11BC
\u1109\u1161\u110B\u116F\u11AF
\u1109\u1161\u110C\u1161\u11BC
\u1109\u1161\u110C\u1165\u11AB
\u1109\u1161\u110C\u1175\u11AB
\u1109\u1161\u110E\u1169\u11AB
\u1109\u1161\u110E\u116E\u11AB\u1100\u1175
\u1109\u1161\u1110\u1161\u11BC
\u1109\u1161\u1110\u116E\u1105\u1175
\u1109\u1161\u1112\u1173\u11AF
\u1109\u1161\u11AB\u1100\u1175\u11AF
\u1109\u1161\u11AB\u1107\u116E\u110B\u1175\u11AB\u1100\u116A
\u1109\u1161\u11AB\u110B\u1165\u11B8
\u1109\u1161\u11AB\u110E\u1162\u11A8
\u1109\u1161\u11AF\u1105\u1175\u11B7
\u1109\u1161\u11AF\u110B\u1175\u11AB
\u1109\u1161\u11AF\u110D\u1161\u11A8
\u1109\u1161\u11B7\u1100\u1168\u1110\u1161\u11BC
\u1109\u1161\u11B7\u1100\u116E\u11A8
\u1109\u1161\u11B7\u1109\u1175\u11B8
\u1109\u1161\u11B7\u110B\u116F\u11AF
\u1109\u1161\u11B7\u110E\u1169\u11AB
\u1109\u1161\u11BC\u1100\u116A\u11AB
\u1109\u1161\u11BC\u1100\u1173\u11B7
\u1109\u1161\u11BC\u1103\u1162
\u1109\u1161\u11BC\u1105\u1172
\u1109\u1161\u11BC\u1107\u1161\u11AB\u1100\u1175
\u1109\u1161\u11BC\u1109\u1161\u11BC
\u1109\u1161\u11BC\u1109\u1175\u11A8
\u1109\u1161\u11BC\u110B\u1165\u11B8
\u1109\u1161\u11BC\u110B\u1175\u11AB
\u1109\u1161\u11BC\u110C\u1161
\u1109\u1161\u11BC\u110C\u1165\u11B7
\u1109\u1161\u11BC\u110E\u1165
\u1109\u1161\u11BC\u110E\u116E
\u1109\u1161\u11BC\u1110\u1162
\u1109\u1161\u11BC\u1111\u116D
\u1109\u1161\u11BC\u1111\u116E\u11B7
\u1109\u1161\u11BC\u1112\u116A\u11BC
\u1109\u1162\u1107\u1167\u11A8
\u1109\u1162\u11A8\u1101\u1161\u11AF
\u1109\u1162\u11A8\u110B\u1167\u11AB\u1111\u1175\u11AF
\u1109\u1162\u11BC\u1100\u1161\u11A8
\u1109\u1162\u11BC\u1106\u1167\u11BC
\u1109\u1162\u11BC\u1106\u116E\u11AF
\u1109\u1162\u11BC\u1107\u1161\u11BC\u1109\u1169\u11BC
\u1109\u1162\u11BC\u1109\u1161\u11AB
\u1109\u1162\u11BC\u1109\u1165\u11AB
\u1109\u1162\u11BC\u1109\u1175\u11AB
\u1109\u1162\u11BC\u110B\u1175\u11AF
\u1109\u1162\u11BC\u1112\u116A\u11AF
\u1109\u1165\u1105\u1161\u11B8
\u1109\u1165\u1105\u1173\u11AB
\u1109\u1165\u1106\u1167\u11BC
\u1109\u1165\u1106\u1175\u11AB
\u1109\u1165\u1107\u1175\u1109\u1173
\u1109\u1165\u110B\u1163\u11BC
\u1109\u1165\u110B\u116E\u11AF
\u1109\u1165\u110C\u1165\u11A8
\u1109\u1165\u110C\u1165\u11B7
\u1109\u1165\u110D\u1169\u11A8
\u1109\u1165\u110F\u1173\u11AF
\u1109\u1165\u11A8\u1109\u1161
\u1109\u1165\u11A8\u110B\u1172
\u1109\u1165\u11AB\u1100\u1165
\u1109\u1165\u11AB\u1106\u116E\u11AF
\u1109\u1165\u11AB\u1107\u1162
\u1109\u1165\u11AB\u1109\u1162\u11BC
\u1109\u1165\u11AB\u1109\u116E
\u1109\u1165\u11AB\u110B\u116F\u11AB
\u1109\u1165\u11AB\u110C\u1161\u11BC
\u1109\u1165\u11AB\u110C\u1165\u11AB
\u1109\u1165\u11AB\u1110\u1162\u11A8
\u1109\u1165\u11AB\u1111\u116E\u11BC\u1100\u1175
\u1109\u1165\u11AF\u1100\u1165\u110C\u1175
\u1109\u1165\u11AF\u1102\u1161\u11AF
\u1109\u1165\u11AF\u1105\u1165\u11BC\u1110\u1161\u11BC
\u1109\u1165\u11AF\u1106\u1167\u11BC
\u1109\u1165\u11AF\u1106\u116E\u11AB
\u1109\u1165\u11AF\u1109\u1161
\u1109\u1165\u11AF\u110B\u1161\u11A8\u1109\u1161\u11AB
\u1109\u1165\u11AF\u110E\u1175
\u1109\u1165\u11AF\u1110\u1161\u11BC
\u1109\u1165\u11B8\u110A\u1175
\u1109\u1165\u11BC\u1100\u1169\u11BC
\u1109\u1165\u11BC\u1103\u1161\u11BC
\u1109\u1165\u11BC\u1106\u1167\u11BC
\u1109\u1165\u11BC\u1107\u1167\u11AF
\u1109\u1165\u11BC\u110B\u1175\u11AB
\u1109\u1165\u11BC\u110C\u1161\u11BC
\u1109\u1165\u11BC\u110C\u1165\u11A8
\u1109\u1165\u11BC\u110C\u1175\u11AF
\u1109\u1165\u11BC\u1112\u1161\u11B7
\u1109\u1166\u1100\u1173\u11B7
\u1109\u1166\u1106\u1175\u1102\u1161
\u1109\u1166\u1109\u1161\u11BC
\u1109\u1166\u110B\u116F\u11AF
\u1109\u1166\u110C\u1169\u11BC\u1103\u1162\u110B\u116A\u11BC
\u1109\u1166\u1110\u1161\u11A8
\u1109\u1166\u11AB\u1110\u1165
\u1109\u1166\u11AB\u1110\u1175\u1106\u1175\u1110\u1165
\u1109\u1166\u11BA\u110D\u1162
\u1109\u1169\u1100\u1172\u1106\u1169
\u1109\u1169\u1100\u1173\u11A8\u110C\u1165\u11A8
\u1109\u1169\u1100\u1173\u11B7
\u1109\u1169\u1102\u1161\u1100\u1175
\u1109\u1169\u1102\u1167\u11AB
\u1109\u1169\u1103\u1173\u11A8
\u1109\u1169\u1106\u1161\u11BC
\u1109\u1169\u1106\u116E\u11AB
\u1109\u1169\u1109\u1165\u11AF
\u1109\u1169\u1109\u1169\u11A8
\u1109\u1169\u110B\u1161\u1100\u116A
\u1109\u1169\u110B\u116D\u11BC
\u1109\u1169\u110B\u116F\u11AB
\u1109\u1169\u110B\u1173\u11B7
\u1109\u1169\u110C\u116E\u11BC\u1112\u1175
\u1109\u1169\u110C\u1175\u1111\u116E\u11B7
\u1109\u1169\u110C\u1175\u11AF
\u1109\u1169\u1111\u116E\u11BC
\u1109\u1169\u1112\u1167\u11BC
\u1109\u1169\u11A8\u1103\u1161\u11B7
\u1109\u1169\u11A8\u1103\u1169
\u1109\u1169\u11A8\u110B\u1169\u11BA
\u1109\u1169\u11AB\u1100\u1161\u1105\u1161\u11A8
\u1109\u1169\u11AB\u1100\u1175\u11AF
\u1109\u1169\u11AB\u1102\u1167
\u1109\u1169\u11AB\u1102\u1175\u11B7
\u1109\u1169\u11AB\u1103\u1173\u11BC
\u1109\u1169\u11AB\u1106\u1169\u11A8
\u1109\u1169\u11AB\u1108\u1167\u11A8
\u1109\u1169\u11AB\u1109\u1175\u11AF
\u1109\u1169\u11AB\u110C\u1175\u11AF
\u1109\u1169\u11AB\u1110\u1169\u11B8
\u1109\u1169\u11AB\u1112\u1162
\u1109\u1169\u11AF\u110C\u1175\u11A8\u1112\u1175
\u1109\u1169\u11B7\u110A\u1175
\u1109\u1169\u11BC\u110B\u1161\u110C\u1175
\u1109\u1169\u11BC\u110B\u1175
\u1109\u1169\u11BC\u1111\u1167\u11AB
\u1109\u116C\u1100\u1169\u1100\u1175
\u1109\u116D\u1111\u1175\u11BC
\u1109\u116E\u1100\u1165\u11AB
\u1109\u116E\u1102\u1167\u11AB
\u1109\u116E\u1103\u1161\u11AB
\u1109\u116E\u1103\u1169\u11BA\u1106\u116E\u11AF
\u1109\u116E\u1103\u1169\u11BC\u110C\u1165\u11A8
\u1109\u116E\u1106\u1167\u11AB
\u1109\u116E\u1106\u1167\u11BC
\u1109\u116E\u1107\u1161\u11A8
\u1109\u116E\u1109\u1161\u11BC
\u1109\u116E\u1109\u1165\u11A8
\u1109\u116E\u1109\u116E\u11AF
\u1109\u116E\u1109\u1175\u1105\u1169
\u1109\u116E\u110B\u1165\u11B8
\u1109\u116E\u110B\u1167\u11B7
\u1109\u116E\u110B\u1167\u11BC
\u1109\u116E\u110B\u1175\u11B8
\u1109\u116E\u110C\u116E\u11AB
\u1109\u116E\u110C\u1175\u11B8
\u1109\u116E\u110E\u116E\u11AF
\u1109\u116E\u110F\u1165\u11BA
\u1109\u116E\u1111\u1175\u11AF
\u1109\u116E\u1112\u1161\u11A8
\u1109\u116E\u1112\u1165\u11B7\u1109\u1162\u11BC
\u1109\u116E\u1112\u116A\u1100\u1175
\u1109\u116E\u11A8\u1102\u1167
\u1109\u116E\u11A8\u1109\u1169
\u1109\u116E\u11A8\u110C\u1166
\u1109\u116E\u11AB\u1100\u1161\u11AB
\u1109\u116E\u11AB\u1109\u1165
\u1109\u116E\u11AB\u1109\u116E
\u1109\u116E\u11AB\u1109\u1175\u11A8\u1100\u1161\u11AB
\u1109\u116E\u11AB\u110B\u1171
\u1109\u116E\u11AE\u1100\u1161\u1105\u1161\u11A8
\u1109\u116E\u11AF\u1107\u1167\u11BC
\u1109\u116E\u11AF\u110C\u1175\u11B8
\u1109\u116E\u11BA\u110C\u1161
\u1109\u1173\u1102\u1175\u11B7
\u1109\u1173\u1106\u116E\u11AF
\u1109\u1173\u1109\u1173\u1105\u1169
\u1109\u1173\u1109\u1173\u11BC
\u1109\u1173\u110B\u1170\u1110\u1165
\u1109\u1173\u110B\u1171\u110E\u1175
\u1109\u1173\u110F\u1166\u110B\u1175\u1110\u1173
\u1109\u1173\u1110\u1172\u1103\u1175\u110B\u1169
\u1109\u1173\u1110\u1173\u1105\u1166\u1109\u1173
\u1109\u1173\u1111\u1169\u110E\u1173
\u1109\u1173\u11AF\u110D\u1165\u11A8
\u1109\u1173\u11AF\u1111\u1173\u11B7
\u1109\u1173\u11B8\u1100\u116A\u11AB
\u1109\u1173\u11B8\u1100\u1175
\u1109\u1173\u11BC\u1100\u1162\u11A8
\u1109\u1173\u11BC\u1105\u1175
\u1109\u1173\u11BC\u1107\u116E
\u1109\u1173\u11BC\u110B\u116D\u11BC\u110E\u1161
\u1109\u1173\u11BC\u110C\u1175\u11AB
\u1109\u1175\u1100\u1161\u11A8
\u1109\u1175\u1100\u1161\u11AB
\u1109\u1175\u1100\u1169\u11AF
\u1109\u1175\u1100\u1173\u11B7\u110E\u1175
\u1109\u1175\u1102\u1161\u1105\u1175\u110B\u1169
\u1109\u1175\u1103\u1162\u11A8
\u1109\u1175\u1105\u1175\u110C\u1173
\u1109\u1175\u1106\u1166\u11AB\u1110\u1173
\u1109\u1175\u1106\u1175\u11AB
\u1109\u1175\u1107\u116E\u1106\u1169
\u1109\u1175\u1109\u1165\u11AB
\u1109\u1175\u1109\u1165\u11AF
\u1109\u1175\u1109\u1173\u1110\u1166\u11B7
\u1109\u1175\u110B\u1161\u1107\u1165\u110C\u1175
\u1109\u1175\u110B\u1165\u1106\u1165\u1102\u1175
\u1109\u1175\u110B\u116F\u11AF
\u1109\u1175\u110B\u1175\u11AB
\u1109\u1175\u110B\u1175\u11AF
\u1109\u1175\u110C\u1161\u11A8
\u1109\u1175\u110C\u1161\u11BC
\u1109\u1175\u110C\u1165\u11AF
\u1109\u1175\u110C\u1165\u11B7
\u1109\u1175\u110C\u116E\u11BC
\u1109\u1175\u110C\u1173\u11AB
\u1109\u1175\u110C\u1175\u11B8
\u1109\u1175\u110E\u1165\u11BC
\u1109\u1175\u1112\u1161\u11B8
\u1109\u1175\u1112\u1165\u11B7
\u1109\u1175\u11A8\u1100\u116E
\u1109\u1175\u11A8\u1100\u1175
\u1109\u1175\u11A8\u1103\u1161\u11BC
\u1109\u1175\u11A8\u1105\u1163\u11BC
\u1109\u1175\u11A8\u1105\u116D\u1111\u116E\u11B7
\u1109\u1175\u11A8\u1106\u116E\u11AF
\u1109\u1175\u11A8\u1108\u1161\u11BC
\u1109\u1175\u11A8\u1109\u1161
\u1109\u1175\u11A8\u1109\u1162\u11BC\u1112\u116A\u11AF
\u1109\u1175\u11A8\u110E\u1169
\u1109\u1175\u11A8\u1110\u1161\u11A8
\u1109\u1175\u11A8\u1111\u116E\u11B7
\u1109\u1175\u11AB\u1100\u1169
\u1109\u1175\u11AB\u1100\u1172
\u1109\u1175\u11AB\u1102\u1167\u11B7
\u1109\u1175\u11AB\u1106\u116E\u11AB
\u1109\u1175\u11AB\u1107\u1161\u11AF
\u1109\u1175\u11AB\u1107\u1175
\u1109\u1175\u11AB\u1109\u1161
\u1109\u1175\u11AB\u1109\u1166
\u1109\u1175\u11AB\u110B\u116D\u11BC
\u1109\u1175\u11AB\u110C\u1166\u1111\u116E\u11B7
\u1109\u1175\u11AB\u110E\u1165\u11BC
\u1109\u1175\u11AB\u110E\u1166
\u1109\u1175\u11AB\u1112\u116A
\u1109\u1175\u11AF\u1100\u1161\u11B7
\u1109\u1175\u11AF\u1102\u1162
\u1109\u1175\u11AF\u1105\u1167\u11A8
\u1109\u1175\u11AF\u1105\u1168
\u1109\u1175\u11AF\u1106\u1161\u11BC
\u1109\u1175\u11AF\u1109\u116E
\u1109\u1175\u11AF\u1109\u1173\u11B8
\u1109\u1175\u11AF\u1109\u1175
\u1109\u1175\u11AF\u110C\u1161\u11BC
\u1109\u1175\u11AF\u110C\u1165\u11BC
\u1109\u1175\u11AF\u110C\u1175\u11AF\u110C\u1165\u11A8
\u1109\u1175\u11AF\u110E\u1165\u11AB
\u1109\u1175\u11AF\u110E\u1166
\u1109\u1175\u11AF\u110F\u1165\u11BA
\u1109\u1175\u11AF\u1110\u1162
\u1109\u1175\u11AF\u1111\u1162
\u1109\u1175\u11AF\u1112\u1165\u11B7
\u1109\u1175\u11AF\u1112\u1167\u11AB
\u1109\u1175\u11B7\u1105\u1175
\u1109\u1175\u11B7\u1107\u116E\u1105\u1173\u11B7
\u1109\u1175\u11B7\u1109\u1161
\u1109\u1175\u11B7\u110C\u1161\u11BC
\u1109\u1175\u11B7\u110C\u1165\u11BC
\u1109\u1175\u11B7\u1111\u1161\u11AB
\u110A\u1161\u11BC\u1103\u116E\u11BC\u110B\u1175
\u110A\u1175\u1105\u1173\u11B7
\u110A\u1175\u110B\u1161\u11BA
\u110B\u1161\u1100\u1161\u110A\u1175
\u110B\u1161\u1102\u1161\u110B\u116E\u11AB\u1109\u1165
\u110B\u1161\u1103\u1173\u1102\u1175\u11B7
\u110B\u1161\u1103\u1173\u11AF
\u110B\u1161\u1109\u1171\u110B\u116E\u11B7
\u110B\u1161\u1109\u1173\u1111\u1161\u11AF\u1110\u1173
\u110B\u1161\u1109\u1175\u110B\u1161
\u110B\u1161\u110B\u116E\u11AF\u1105\u1165
\u110B\u1161\u110C\u1165\u110A\u1175
\u110B\u1161\u110C\u116E\u11B7\u1106\u1161
\u110B\u1161\u110C\u1175\u11A8
\u110B\u1161\u110E\u1175\u11B7
\u110B\u1161\u1111\u1161\u1110\u1173
\u110B\u1161\u1111\u1173\u1105\u1175\u110F\u1161
\u110B\u1161\u1111\u1173\u11B7
\u110B\u1161\u1112\u1169\u11B8
\u110B\u1161\u1112\u1173\u11AB
\u110B\u1161\u11A8\u1100\u1175
\u110B\u1161\u11A8\u1106\u1169\u11BC
\u110B\u1161\u11A8\u1109\u116E
\u110B\u1161\u11AB\u1100\u1162
\u110B\u1161\u11AB\u1100\u1167\u11BC
\u110B\u1161\u11AB\u1100\u116A
\u110B\u1161\u11AB\u1102\u1162
\u110B\u1161\u11AB\u1102\u1167\u11BC
\u110B\u1161\u11AB\u1103\u1169\u11BC
\u110B\u1161\u11AB\u1107\u1161\u11BC
\u110B\u1161\u11AB\u1107\u116E
\u110B\u1161\u11AB\u110C\u116E
\u110B\u1161\u11AF\u1105\u116E\u1106\u1175\u1102\u1172\u11B7
\u110B\u1161\u11AF\u110F\u1169\u110B\u1169\u11AF
\u110B\u1161\u11B7\u1109\u1175
\u110B\u1161\u11B7\u110F\u1165\u11BA
\u110B\u1161\u11B8\u1105\u1167\u11A8
\u110B\u1161\u11C1\u1102\u1161\u11AF
\u110B\u1161\u11C1\u1106\u116E\u11AB
\u110B\u1162\u110B\u1175\u11AB
\u110B\u1162\u110C\u1165\u11BC
\u110B\u1162\u11A8\u1109\u116E
\u110B\u1162\u11AF\u1107\u1165\u11B7
\u110B\u1163\u1100\u1161\u11AB
\u110B\u1163\u1103\u1161\u11AB
\u110B\u1163\u110B\u1169\u11BC
\u110B\u1163\u11A8\u1100\u1161\u11AB
\u110B\u1163\u11A8\u1100\u116E\u11A8
\u110B\u1163\u11A8\u1109\u1169\u11A8
\u110B\u1163\u11A8\u1109\u116E
\u110B\u1163\u11A8\u110C\u1165\u11B7
\u110B\u1163\u11A8\u1111\u116E\u11B7
\u110B\u1163\u11A8\u1112\u1169\u11AB\u1102\u1167
\u110B\u1163\u11BC\u1102\u1167\u11B7
\u110B\u1163\u11BC\u1105\u1167\u11A8
\u110B\u1163\u11BC\u1106\u1161\u11AF
\u110B\u1163\u11BC\u1107\u1162\u110E\u116E
\u110B\u1163\u11BC\u110C\u116E
\u110B\u1163\u11BC\u1111\u1161
\u110B\u1165\u1103\u116E\u11B7
\u110B\u1165\u1105\u1167\u110B\u116E\u11B7
\u110B\u1165\u1105\u1173\u11AB
\u110B\u1165\u110C\u1166\u11BA\u1107\u1161\u11B7
\u110B\u1165\u110D\u1162\u11BB\u1103\u1173\u11AB
\u110B\u1165\u110D\u1165\u1103\u1161\u1100\u1161
\u110B\u1165\u110D\u1165\u11AB\u110C\u1175
\u110B\u1165\u11AB\u1102\u1175
\u110B\u1165\u11AB\u1103\u1165\u11A8
\u110B\u1165\u11AB\u1105\u1169\u11AB
\u110B\u1165\u11AB\u110B\u1165
\u110B\u1165\u11AF\u1100\u116E\u11AF
\u110B\u1165\u11AF\u1105\u1173\u11AB
\u110B\u1165\u11AF\u110B\u1173\u11B7
\u110B\u1165\u11AF\u1111\u1175\u11BA
\u110B\u1165\u11B7\u1106\u1161
\u110B\u1165\u11B8\u1106\u116E
\u110B\u1165\u11B8\u110C\u1169\u11BC
\u110B\u1165\u11B8\u110E\u1166
\u110B\u1165\u11BC\u1103\u1165\u11BC\u110B\u1175
\u110B\u1165\u11BC\u1106\u1161\u11BC
\u110B\u1165\u11BC\u1110\u1165\u1105\u1175
\u110B\u1165\u11BD\u1100\u1173\u110C\u1166
\u110B\u1166\u1102\u1165\u110C\u1175
\u110B\u1166\u110B\u1165\u110F\u1165\u11AB
\u110B\u1166\u11AB\u110C\u1175\u11AB
\u110B\u1167\u1100\u1165\u11AB
\u110B\u1167\u1100\u1169\u1109\u1162\u11BC
\u110B\u1167\u1100\u116A\u11AB
\u110B\u1167\u1100\u116E\u11AB
\u110B\u1167\u1100\u116F\u11AB
\u110B\u1167\u1103\u1162\u1109\u1162\u11BC
\u110B\u1167\u1103\u1165\u11B2
\u110B\u1167\u1103\u1169\u11BC\u1109\u1162\u11BC
\u110B\u1167\u1103\u1173\u11AB
\u110B\u1167\u1105\u1169\u11AB
\u110B\u1167\u1105\u1173\u11B7
\u110B\u1167\u1109\u1165\u11BA
\u110B\u1167\u1109\u1165\u11BC
\u110B\u1167\u110B\u116A\u11BC
\u110B\u1167\u110B\u1175\u11AB
\u110B\u1167\u110C\u1165\u11AB\u1112\u1175
\u110B\u1167\u110C\u1175\u11A8\u110B\u116F\u11AB
\u110B\u1167\u1112\u1161\u11A8\u1109\u1162\u11BC
\u110B\u1167\u1112\u1162\u11BC
\u110B\u1167\u11A8\u1109\u1161
\u110B\u1167\u11A8\u1109\u1175
\u110B\u1167\u11A8\u1112\u1161\u11AF
\u110B\u1167\u11AB\u1100\u1167\u11AF
\u110B\u1167\u11AB\u1100\u116E
\u110B\u1167\u11AB\u1100\u1173\u11A8
\u110B\u1167\u11AB\u1100\u1175
\u110B\u1167\u11AB\u1105\u1161\u11A8
\u110B\u1167\u11AB\u1109\u1165\u11AF
\u110B\u1167\u11AB\u1109\u1166
\u110B\u1167\u11AB\u1109\u1169\u11A8
\u110B\u1167\u11AB\u1109\u1173\u11B8
\u110B\u1167\u11AB\u110B\u1162
\u110B\u1167\u11AB\u110B\u1168\u110B\u1175\u11AB
\u110B\u1167\u11AB\u110B\u1175\u11AB
\u110B\u1167\u11AB\u110C\u1161\u11BC
\u110B\u1167\u11AB\u110C\u116E
\u110B\u1167\u11AB\u110E\u116E\u11AF
\u110B\u1167\u11AB\u1111\u1175\u11AF
\u110B\u1167\u11AB\u1112\u1161\u11B8
\u110B\u1167\u11AB\u1112\u1172
\u110B\u1167\u11AF\u1100\u1175
\u110B\u1167\u11AF\u1106\u1162
\u110B\u1167\u11AF\u1109\u116C
\u110B\u1167\u11AF\u1109\u1175\u11B7\u1112\u1175
\u110B\u1167\u11AF\u110C\u1165\u11BC
\u110B\u1167\u11AF\u110E\u1161
\u110B\u1167\u11AF\u1112\u1173\u11AF
\u110B\u1167\u11B7\u1105\u1167
\u110B\u1167\u11B8\u1109\u1165
\u110B\u1167\u11BC\u1100\u116E\u11A8
\u110B\u1167\u11BC\u1102\u1161\u11B7
\u110B\u1167\u11BC\u1109\u1161\u11BC
\u110B\u1167\u11BC\u110B\u1163\u11BC
\u110B\u1167\u11BC\u110B\u1167\u11A8
\u110B\u1167\u11BC\u110B\u116E\u11BC
\u110B\u1167\u11BC\u110B\u116F\u11AB\u1112\u1175
\u110B\u1167\u11BC\u1112\u1161
\u110B\u1167\u11BC\u1112\u1163\u11BC
\u110B\u1167\u11BC\u1112\u1169\u11AB
\u110B\u1167\u11BC\u1112\u116A
\u110B\u1167\u11C1\u1100\u116E\u1105\u1175
\u110B\u1167\u11C1\u1107\u1161\u11BC
\u110B\u1167\u11C1\u110C\u1175\u11B8
\u110B\u1168\u1100\u1161\u11B7
\u110B\u1168\u1100\u1173\u11B7
\u110B\u1168\u1107\u1161\u11BC
\u110B\u1168\u1109\u1161\u11AB
\u110B\u1168\u1109\u1161\u11BC
\u110B\u1168\u1109\u1165\u11AB
\u110B\u1168\u1109\u116E\u11AF
\u110B\u1168\u1109\u1173\u11B8
\u110B\u1168\u1109\u1175\u11A8\u110C\u1161\u11BC
\u110B\u1168\u110B\u1163\u11A8
\u110B\u1168\u110C\u1165\u11AB
\u110B\u1168\u110C\u1165\u11AF
\u110B\u1168\u110C\u1165\u11BC
\u110B\u1168\u110F\u1165\u11AB\u1103\u1162
\u110B\u1168\u11BA\u1102\u1161\u11AF
\u110B\u1169\u1102\u1173\u11AF
\u110B\u1169\u1105\u1161\u11A8
\u110B\u1169\u1105\u1162\u11BA\u1103\u1169\u11BC\u110B\u1161\u11AB
\u110B\u1169\u1105\u1166\u11AB\u110C\u1175
\u110B\u1169\u1105\u1169\u110C\u1175
\u110B\u1169\u1105\u1173\u11AB\u1107\u1161\u11AF
\u110B\u1169\u1107\u1173\u11AB
\u110B\u1169\u1109\u1175\u11B8
\u110B\u1169\u110B\u1167\u11B7
\u110B\u1169\u110B\u116F\u11AF
\u110B\u1169\u110C\u1165\u11AB
\u110B\u1169\u110C\u1175\u11A8
\u110B\u1169\u110C\u1175\u11BC\u110B\u1165
\u110B\u1169\u1111\u1166\u1105\u1161
\u110B\u1169\u1111\u1175\u1109\u1173\u1110\u1166\u11AF
\u110B\u1169\u1112\u1175\u1105\u1167
\u110B\u1169\u11A8\u1109\u1161\u11BC
\u110B\u1169\u11A8\u1109\u116E\u1109\u116E
\u110B\u1169\u11AB\u1100\u1161\u11BD
\u110B\u1169\u11AB\u1105\u1161\u110B\u1175\u11AB
\u110B\u1169\u11AB\u1106\u1169\u11B7
\u110B\u1169\u11AB\u110C\u1169\u11BC\u110B\u1175\u11AF
\u110B\u1169\u11AB\u1110\u1169\u11BC
\u110B\u1169\u11AF\u1100\u1161\u110B\u1173\u11AF
\u110B\u1169\u11AF\u1105\u1175\u11B7\u1111\u1175\u11A8
\u110B\u1169\u11AF\u1112\u1162
\u110B\u1169\u11BA\u110E\u1161\u1105\u1175\u11B7
\u110B\u116A\u110B\u1175\u1109\u1167\u110E\u1173
\u110B\u116A\u110B\u1175\u11AB
\u110B\u116A\u11AB\u1109\u1165\u11BC
\u110B\u116A\u11AB\u110C\u1165\u11AB
\u110B\u116A\u11BC\u1107\u1175
\u110B\u116A\u11BC\u110C\u1161
\u110B\u116B\u1102\u1163\u1112\u1161\u1106\u1167\u11AB
\u110B\u116B\u11AB\u110C\u1175
\u110B\u116C\u1100\u1161\u11BA\u110C\u1175\u11B8
\u110B\u116C\u1100\u116E\u11A8
\u110B\u116C\u1105\u1169\u110B\u116E\u11B7
\u110B\u116C\u1109\u1161\u11B7\u110E\u1169\u11AB
\u110B\u116C\u110E\u116E\u11AF
\u110B\u116C\u110E\u1175\u11B7
\u110B\u116C\u1112\u1161\u11AF\u1106\u1165\u1102\u1175
\u110B\u116C\u11AB\u1107\u1161\u11AF
\u110B\u116C\u11AB\u1109\u1169\u11AB
\u110B\u116C\u11AB\u110D\u1169\u11A8
\u110B\u116D\u1100\u1173\u11B7
\u110B\u116D\u110B\u1175\u11AF
\u110B\u116D\u110C\u1173\u11B7
\u110B\u116D\u110E\u1165\u11BC
\u110B\u116D\u11BC\u1100\u1175
\u110B\u116D\u11BC\u1109\u1165
\u110B\u116D\u11BC\u110B\u1165
\u110B\u116E\u1109\u1161\u11AB
\u110B\u116E\u1109\u1165\u11AB
\u110B\u116E\u1109\u1173\u11BC
\u110B\u116E\u110B\u1167\u11AB\u1112\u1175
\u110B\u116E\u110C\u1165\u11BC
\u110B\u116E\u110E\u1166\u1100\u116E\u11A8
\u110B\u116E\u1111\u1167\u11AB
\u110B\u116E\u11AB\u1103\u1169\u11BC
\u110B\u116E\u11AB\u1106\u1167\u11BC
\u110B\u116E\u11AB\u1107\u1161\u11AB
\u110B\u116E\u11AB\u110C\u1165\u11AB
\u110B\u116E\u11AB\u1112\u1162\u11BC
\u110B\u116E\u11AF\u1109\u1161\u11AB
\u110B\u116E\u11AF\u110B\u1173\u11B7
\u110B\u116E\u11B7\u110C\u1175\u11A8\u110B\u1175\u11B7
\u110B\u116E\u11BA\u110B\u1165\u1105\u1173\u11AB
\u110B\u116E\u11BA\u110B\u1173\u11B7
\u110B\u116F\u1102\u1161\u11A8
\u110B\u116F\u11AB\u1100\u1169
\u110B\u116F\u11AB\u1105\u1162
\u110B\u116F\u11AB\u1109\u1165
\u110B\u116F\u11AB\u1109\u116E\u11BC\u110B\u1175
\u110B\u116F\u11AB\u110B\u1175\u11AB
\u110B\u116F\u11AB\u110C\u1161\u11BC
\u110B\u116F\u11AB\u1111\u1175\u1109\u1173
\u110B\u116F\u11AF\u1100\u1173\u11B8
\u110B\u116F\u11AF\u1103\u1173\u110F\u1165\u11B8
\u110B\u116F\u11AF\u1109\u1166
\u110B\u116F\u11AF\u110B\u116D\u110B\u1175\u11AF
\u110B\u1170\u110B\u1175\u1110\u1165
\u110B\u1171\u1107\u1161\u11AB
\u110B\u1171\u1107\u1165\u11B8
\u110B\u1171\u1109\u1165\u11BC
\u110B\u1171\u110B\u116F\u11AB
\u110B\u1171\u1112\u1165\u11B7
\u110B\u1171\u1112\u1167\u11B8
\u110B\u1171\u11BA\u1109\u1161\u1105\u1161\u11B7
\u110B\u1172\u1102\u1161\u11AB\u1112\u1175
\u110B\u1172\u1105\u1165\u11B8
\u110B\u1172\u1106\u1167\u11BC
\u110B\u1172\u1106\u116E\u11AF
\u110B\u1172\u1109\u1161\u11AB
\u110B\u1172\u110C\u1165\u11A8
\u110B\u1172\u110E\u1175\u110B\u116F\u11AB
\u110B\u1172\u1112\u1161\u11A8
\u110B\u1172\u1112\u1162\u11BC
\u110B\u1172\u1112\u1167\u11BC
\u110B\u1172\u11A8\u1100\u116E\u11AB
\u110B\u1172\u11A8\u1109\u1161\u11BC
\u110B\u1172\u11A8\u1109\u1175\u11B8
\u110B\u1172\u11A8\u110E\u1166
\u110B\u1173\u11AB\u1112\u1162\u11BC
\u110B\u1173\u11B7\u1105\u1167\u11A8
\u110B\u1173\u11B7\u1105\u116D
\u110B\u1173\u11B7\u1107\u1161\u11AB
\u110B\u1173\u11B7\u1109\u1165\u11BC
\u110B\u1173\u11B7\u1109\u1175\u11A8
\u110B\u1173\u11B7\u110B\u1161\u11A8
\u110B\u1173\u11B7\u110C\u116E
\u110B\u1174\u1100\u1167\u11AB
\u110B\u1174\u1102\u1169\u11AB
\u110B\u1174\u1106\u116E\u11AB
\u110B\u1174\u1107\u1169\u11A8
\u110B\u1174\u1109\u1175\u11A8
\u110B\u1174\u1109\u1175\u11B7
\u110B\u1174\u110B\u116C\u1105\u1169
\u110B\u1174\u110B\u116D\u11A8
\u110B\u1174\u110B\u116F\u11AB
\u110B\u1174\u1112\u1161\u11A8
\u110B\u1175\u1100\u1165\u11BA
\u110B\u1175\u1100\u1169\u11BA
\u110B\u1175\u1102\u1167\u11B7
\u110B\u1175\u1102\u1169\u11B7
\u110B\u1175\u1103\u1161\u11AF
\u110B\u1175\u1103\u1162\u1105\u1169
\u110B\u1175\u1103\u1169\u11BC
\u110B\u1175\u1105\u1165\u11C2\u1100\u1166
\u110B\u1175\u1105\u1167\u11A8\u1109\u1165
\u110B\u1175\u1105\u1169\u11AB\u110C\u1165\u11A8
\u110B\u1175\u1105\u1173\u11B7
\u110B\u1175\u1106\u1175\u11AB
\u110B\u1175\u1107\u1161\u11AF\u1109\u1169
\u110B\u1175\u1107\u1167\u11AF
\u110B\u1175\u1107\u116E\u11AF
\u110B\u1175\u1108\u1161\u11AF
\u110B\u1175\u1109\u1161\u11BC
\u110B\u1175\u1109\u1165\u11BC
\u110B\u1175\u1109\u1173\u11AF
\u110B\u1175\u110B\u1163\u1100\u1175
\u110B\u1175\u110B\u116D\u11BC
\u110B\u1175\u110B\u116E\u11BA
\u110B\u1175\u110B\u116F\u11AF
\u110B\u1175\u110B\u1173\u11A8\u1100\u1169
\u110B\u1175\u110B\u1175\u11A8
\u110B\u1175\u110C\u1165\u11AB
\u110B\u1175\u110C\u116E\u11BC
\u110B\u1175\u1110\u1173\u11AE\u1102\u1161\u11AF
\u110B\u1175\u1110\u1173\u11AF
\u110B\u1175\u1112\u1169\u11AB
\u110B\u1175\u11AB\u1100\u1161\u11AB
\u110B\u1175\u11AB\u1100\u1167\u11A8
\u110B\u1175\u11AB\u1100\u1169\u11BC
\u110B\u1175\u11AB\u1100\u116E
\u110B\u1175\u11AB\u1100\u1173\u11AB
\u110B\u1175\u11AB\u1100\u1175
\u110B\u1175\u11AB\u1103\u1169
\u110B\u1175\u11AB\u1105\u1172
\u110B\u1175\u11AB\u1106\u116E\u11AF
\u110B\u1175\u11AB\u1109\u1162\u11BC
\u110B\u1175\u11AB\u1109\u116B
\u110B\u1175\u11AB\u110B\u1167\u11AB
\u110B\u1175\u11AB\u110B\u116F\u11AB
\u110B\u1175\u11AB\u110C\u1162
\u110B\u1175\u11AB\u110C\u1169\u11BC
\u110B\u1175\u11AB\u110E\u1165\u11AB
\u110B\u1175\u11AB\u110E\u1166
\u110B\u1175\u11AB\u1110\u1165\u1102\u1166\u11BA
\u110B\u1175\u11AB\u1112\u1161
\u110B\u1175\u11AB\u1112\u1167\u11BC
\u110B\u1175\u11AF\u1100\u1169\u11B8
\u110B\u1175\u11AF\u1100\u1175
\u110B\u1175\u11AF\u1103\u1161\u11AB
\u110B\u1175\u11AF\u1103\u1162
\u110B\u1175\u11AF\u1103\u1173\u11BC
\u110B\u1175\u11AF\u1107\u1161\u11AB
\u110B\u1175\u11AF\u1107\u1169\u11AB
\u110B\u1175\u11AF\u1107\u116E
\u110B\u1175\u11AF\u1109\u1161\u11BC
\u110B\u1175\u11AF\u1109\u1162\u11BC
\u110B\u1175\u11AF\u1109\u1169\u11AB
\u110B\u1175\u11AF\u110B\u116D\u110B\u1175\u11AF
\u110B\u1175\u11AF\u110B\u116F\u11AF
\u110B\u1175\u11AF\u110C\u1165\u11BC
\u110B\u1175\u11AF\u110C\u1169\u11BC
\u110B\u1175\u11AF\u110C\u116E\u110B\u1175\u11AF
\u110B\u1175\u11AF\u110D\u1175\u11A8
\u110B\u1175\u11AF\u110E\u1166
\u110B\u1175\u11AF\u110E\u1175
\u110B\u1175\u11AF\u1112\u1162\u11BC
\u110B\u1175\u11AF\u1112\u116C\u110B\u116D\u11BC
\u110B\u1175\u11B7\u1100\u1173\u11B7
\u110B\u1175\u11B7\u1106\u116E
\u110B\u1175\u11B8\u1103\u1162
\u110B\u1175\u11B8\u1105\u1167\u11A8
\u110B\u1175\u11B8\u1106\u1161\u11BA
\u110B\u1175\u11B8\u1109\u1161
\u110B\u1175\u11B8\u1109\u116E\u11AF
\u110B\u1175\u11B8\u1109\u1175
\u110B\u1175\u11B8\u110B\u116F\u11AB
\u110B\u1175\u11B8\u110C\u1161\u11BC
\u110B\u1175\u11B8\u1112\u1161\u11A8
\u110C\u1161\u1100\u1161\u110B\u116D\u11BC
\u110C\u1161\u1100\u1167\u11A8
\u110C\u1161\u1100\u1173\u11A8
\u110C\u1161\u1103\u1169\u11BC
\u110C\u1161\u1105\u1161\u11BC
\u110C\u1161\u1107\u116E\u1109\u1175\u11B7
\u110C\u1161\u1109\u1175\u11A8
\u110C\u1161\u1109\u1175\u11AB
\u110C\u1161\u110B\u1167\u11AB
\u110C\u1161\u110B\u116F\u11AB
\u110C\u1161\u110B\u1172\u11AF
\u110C\u1161\u110C\u1165\u11AB\u1100\u1165
\u110C\u1161\u110C\u1165\u11BC
\u110C\u1161\u110C\u1169\u11AB\u1109\u1175\u11B7
\u110C\u1161\u1111\u1161\u11AB
\u110C\u1161\u11A8\u1100\u1161
\u110C\u1161\u11A8\u1102\u1167\u11AB
\u110C\u1161\u11A8\u1109\u1165\u11BC
\u110C\u1161\u11A8\u110B\u1165\u11B8
\u110C\u1161\u11A8\u110B\u116D\u11BC
\u110C\u1161\u11A8\u110B\u1173\u11AB\u1104\u1161\u11AF
\u110C\u1161\u11A8\u1111\u116E\u11B7
\u110C\u1161\u11AB\u1103\u1175
\u110C\u1161\u11AB\u1104\u1173\u11A8
\u110C\u1161\u11AB\u110E\u1175
\u110C\u1161\u11AF\u1106\u1169\u11BA
\u110C\u1161\u11B7\u1101\u1161\u11AB
\u110C\u1161\u11B7\u1109\u116E\u1112\u1161\u11B7
\u110C\u1161\u11B7\u1109\u1175
\u110C\u1161\u11B7\u110B\u1169\u11BA
\u110C\u1161\u11B7\u110C\u1161\u1105\u1175
\u110C\u1161\u11B8\u110C\u1175
\u110C\u1161\u11BC\u1100\u116A\u11AB
\u110C\u1161\u11BC\u1100\u116E\u11AB
\u110C\u1161\u11BC\u1100\u1175\u1100\u1161\u11AB
\u110C\u1161\u11BC\u1105\u1162
\u110C\u1161\u11BC\u1105\u1168
\u110C\u1161\u11BC\u1105\u1173
\u110C\u1161\u11BC\u1106\u1161
\u110C\u1161\u11BC\u1106\u1167\u11AB
\u110C\u1161\u11BC\u1106\u1169
\u110C\u1161\u11BC\u1106\u1175
\u110C\u1161\u11BC\u1107\u1175
\u110C\u1161\u11BC\u1109\u1161
\u110C\u1161\u11BC\u1109\u1169
\u110C\u1161\u11BC\u1109\u1175\u11A8
\u110C\u1161\u11BC\u110B\u1162\u110B\u1175\u11AB
\u110C\u1161\u11BC\u110B\u1175\u11AB
\u110C\u1161\u11BC\u110C\u1165\u11B7
\u110C\u1161\u11BC\u110E\u1161
\u110C\u1161\u11BC\u1112\u1161\u11A8\u1100\u1173\u11B7
\u110C\u1162\u1102\u1173\u11BC
\u110C\u1162\u1108\u1161\u11AF\u1105\u1175
\u110C\u1162\u1109\u1161\u11AB
\u110C\u1162\u1109\u1162\u11BC
\u110C\u1162\u110C\u1161\u11A8\u1102\u1167\u11AB
\u110C\u1162\u110C\u1165\u11BC
\u110C\u1162\u110E\u1162\u1100\u1175
\u110C\u1162\u1111\u1161\u11AB
\u110C\u1162\u1112\u1161\u11A8
\u110C\u1162\u1112\u116A\u11AF\u110B\u116D\u11BC
\u110C\u1165\u1100\u1165\u11BA
\u110C\u1165\u1100\u1169\u1105\u1175
\u110C\u1165\u1100\u1169\u11BA
\u110C\u1165\u1102\u1167\u11A8
\u110C\u1165\u1105\u1165\u11AB
\u110C\u1165\u1105\u1165\u11C2\u1100\u1166
\u110C\u1165\u1107\u1165\u11AB
\u110C\u1165\u110B\u116E\u11AF
\u110C\u1165\u110C\u1165\u11AF\u1105\u1169
\u110C\u1165\u110E\u116E\u11A8
\u110C\u1165\u11A8\u1100\u1173\u11A8
\u110C\u1165\u11A8\u1103\u1161\u11BC\u1112\u1175
\u110C\u1165\u11A8\u1109\u1165\u11BC
\u110C\u1165\u11A8\u110B\u116D\u11BC
\u110C\u1165\u11A8\u110B\u1173\u11BC
\u110C\u1165\u11AB\u1100\u1162
\u110C\u1165\u11AB\u1100\u1169\u11BC
\u110C\u1165\u11AB\u1100\u1175
\u110C\u1165\u11AB\u1103\u1161\u11AF
\u110C\u1165\u11AB\u1105\u1161\u1103\u1169
\u110C\u1165\u11AB\u1106\u1161\u11BC
\u110C\u1165\u11AB\u1106\u116E\u11AB
\u110C\u1165\u11AB\u1107\u1161\u11AB
\u110C\u1165\u11AB\u1107\u116E
\u110C\u1165\u11AB\u1109\u1166
\u110C\u1165\u11AB\u1109\u1175
\u110C\u1165\u11AB\u110B\u116D\u11BC
\u110C\u1165\u11AB\u110C\u1161
\u110C\u1165\u11AB\u110C\u1162\u11BC
\u110C\u1165\u11AB\u110C\u116E
\u110C\u1165\u11AB\u110E\u1165\u11AF
\u110C\u1165\u11AB\u110E\u1166
\u110C\u1165\u11AB\u1110\u1169\u11BC
\u110C\u1165\u11AB\u1112\u1167
\u110C\u1165\u11AB\u1112\u116E
\u110C\u1165\u11AF\u1103\u1162
\u110C\u1165\u11AF\u1106\u1161\u11BC
\u110C\u1165\u11AF\u1107\u1161\u11AB
\u110C\u1165\u11AF\u110B\u1163\u11A8
\u110C\u1165\u11AF\u110E\u1161
\u110C\u1165\u11B7\u1100\u1165\u11B7
\u110C\u1165\u11B7\u1109\u116E
\u110C\u1165\u11B7\u1109\u1175\u11B7
\u110C\u1165\u11B7\u110B\u116F\u11AB
\u110C\u1165\u11B7\u110C\u1165\u11B7
\u110C\u1165\u11B7\u110E\u1161
\u110C\u1165\u11B8\u1100\u1173\u11AB
\u110C\u1165\u11B8\u1109\u1175
\u110C\u1165\u11B8\u110E\u1169\u11A8
\u110C\u1165\u11BA\u1100\u1161\u1105\u1161\u11A8
\u110C\u1165\u11BC\u1100\u1165\u110C\u1161\u11BC
\u110C\u1165\u11BC\u1103\u1169
\u110C\u1165\u11BC\u1105\u1172\u110C\u1161\u11BC
\u110C\u1165\u11BC\u1105\u1175
\u110C\u1165\u11BC\u1106\u1161\u11AF
\u110C\u1165\u11BC\u1106\u1167\u11AB
\u110C\u1165\u11BC\u1106\u116E\u11AB
\u110C\u1165\u11BC\u1107\u1161\u11AB\u1103\u1162
\u110C\u1165\u11BC\u1107\u1169
\u110C\u1165\u11BC\u1107\u116E
\u110C\u1165\u11BC\u1107\u1175
\u110C\u1165\u11BC\u1109\u1161\u11BC
\u110C\u1165\u11BC\u1109\u1165\u11BC
\u110C\u1165\u11BC\u110B\u1169
\u110C\u1165\u11BC\u110B\u116F\u11AB
\u110C\u1165\u11BC\u110C\u1161\u11BC
\u110C\u1165\u11BC\u110C\u1175
\u110C\u1165\u11BC\u110E\u1175
\u110C\u1165\u11BC\u1112\u116A\u11A8\u1112\u1175
\u110C\u1166\u1100\u1169\u11BC
\u110C\u1166\u1100\u116A\u110C\u1165\u11B7
\u110C\u1166\u1103\u1162\u1105\u1169
\u110C\u1166\u1106\u1169\u11A8
\u110C\u1166\u1107\u1161\u11AF
\u110C\u1166\u1107\u1165\u11B8
\u110C\u1166\u1109\u1161\u11BA\u1102\u1161\u11AF
\u110C\u1166\u110B\u1161\u11AB
\u110C\u1166\u110B\u1175\u11AF
\u110C\u1166\u110C\u1161\u11A8
\u110C\u1166\u110C\u116E\u1103\u1169
\u110C\u1166\u110E\u116E\u11AF
\u110C\u1166\u1111\u116E\u11B7
\u110C\u1166\u1112\u1161\u11AB
\u110C\u1169\u1100\u1161\u11A8
\u110C\u1169\u1100\u1165\u11AB
\u110C\u1169\u1100\u1173\u11B7
\u110C\u1169\u1100\u1175\u11BC
\u110C\u1169\u1106\u1167\u11BC
\u110C\u1169\u1106\u1175\u1105\u116D
\u110C\u1169\u1109\u1161\u11BC
\u110C\u1169\u1109\u1165\u11AB
\u110C\u1169\u110B\u116D\u11BC\u1112\u1175
\u110C\u1169\u110C\u1165\u11AF
\u110C\u1169\u110C\u1165\u11BC
\u110C\u1169\u110C\u1175\u11A8
\u110C\u1169\u11AB\u1103\u1162\u11BA\u1106\u1161\u11AF
\u110C\u1169\u11AB\u110C\u1162
\u110C\u1169\u11AF\u110B\u1165\u11B8
\u110C\u1169\u11AF\u110B\u1173\u11B7
\u110C\u1169\u11BC\u1100\u116D
\u110C\u1169\u11BC\u1105\u1169
\u110C\u1169\u11BC\u1105\u1172
\u110C\u1169\u11BC\u1109\u1169\u1105\u1175
\u110C\u1169\u11BC\u110B\u1165\u11B8\u110B\u116F\u11AB
\u110C\u1169\u11BC\u110C\u1169\u11BC
\u110C\u1169\u11BC\u1112\u1161\u11B8
\u110C\u116A\u1109\u1165\u11A8
\u110C\u116C\u110B\u1175\u11AB
\u110C\u116E\u1100\u116A\u11AB\u110C\u1165\u11A8
\u110C\u116E\u1105\u1173\u11B7
\u110C\u116E\u1106\u1161\u11AF
\u110C\u116E\u1106\u1165\u1102\u1175
\u110C\u116E\u1106\u1165\u11A8
\u110C\u116E\u1106\u116E\u11AB
\u110C\u116E\u1106\u1175\u11AB
\u110C\u116E\u1107\u1161\u11BC
\u110C\u116E\u1107\u1167\u11AB
\u110C\u116E\u1109\u1175\u11A8
\u110C\u116E\u110B\u1175\u11AB
\u110C\u116E\u110B\u1175\u11AF
\u110C\u116E\u110C\u1161\u11BC
\u110C\u116E\u110C\u1165\u11AB\u110C\u1161
\u110C\u116E\u1110\u1162\u11A8
\u110C\u116E\u11AB\u1107\u1175
\u110C\u116E\u11AF\u1100\u1165\u1105\u1175
\u110C\u116E\u11AF\u1100\u1175
\u110C\u116E\u11AF\u1106\u116E\u1102\u1174
\u110C\u116E\u11BC\u1100\u1161\u11AB
\u110C\u116E\u11BC\u1100\u1168\u1107\u1161\u11BC\u1109\u1169\u11BC
\u110C\u116E\u11BC\u1100\u116E\u11A8
\u110C\u116E\u11BC\u1102\u1167\u11AB
\u110C\u116E\u11BC\u1103\u1161\u11AB
\u110C\u116E\u11BC\u1103\u1169\u11A8
\u110C\u116E\u11BC\u1107\u1161\u11AB
\u110C\u116E\u11BC\u1107\u116E
\u110C\u116E\u11BC\u1109\u1166
\u110C\u116E\u11BC\u1109\u1169\u1100\u1175\u110B\u1165\u11B8
\u110C\u116E\u11BC\u1109\u116E\u11AB
\u110C\u116E\u11BC\u110B\u1161\u11BC
\u110C\u116E\u11BC\u110B\u116D
\u110C\u116E\u11BC\u1112\u1161\u11A8\u1100\u116D
\u110C\u1173\u11A8\u1109\u1165\u11A8
\u110C\u1173\u11A8\u1109\u1175
\u110C\u1173\u11AF\u1100\u1165\u110B\u116E\u11B7
\u110C\u1173\u11BC\u1100\u1161
\u110C\u1173\u11BC\u1100\u1165
\u110C\u1173\u11BC\u1100\u116F\u11AB
\u110C\u1173\u11BC\u1109\u1161\u11BC
\u110C\u1173\u11BC\u1109\u1166
\u110C\u1175\u1100\u1161\u11A8
\u110C\u1175\u1100\u1161\u11B8
\u110C\u1175\u1100\u1167\u11BC
\u110C\u1175\u1100\u1173\u11A8\u1112\u1175
\u110C\u1175\u1100\u1173\u11B7
\u110C\u1175\u1100\u1173\u11B8
\u110C\u1175\u1102\u1173\u11BC
\u110C\u1175\u1105\u1173\u11B7\u1100\u1175\u11AF
\u110C\u1175\u1105\u1175\u1109\u1161\u11AB
\u110C\u1175\u1107\u1161\u11BC
\u110C\u1175\u1107\u116E\u11BC
\u110C\u1175\u1109\u1175\u11A8
\u110C\u1175\u110B\u1167\u11A8
\u110C\u1175\u110B\u116E\u1100\u1162
\u110C\u1175\u110B\u116F\u11AB
\u110C\u1175\u110C\u1165\u11A8
\u110C\u1175\u110C\u1165\u11B7
\u110C\u1175\u110C\u1175\u11AB
\u110C\u1175\u110E\u116E\u11AF
\u110C\u1175\u11A8\u1109\u1165\u11AB
\u110C\u1175\u11A8\u110B\u1165\u11B8
\u110C\u1175\u11A8\u110B\u116F\u11AB
\u110C\u1175\u11A8\u110C\u1161\u11BC
\u110C\u1175\u11AB\u1100\u1173\u11B8
\u110C\u1175\u11AB\u1103\u1169\u11BC
\u110C\u1175\u11AB\u1105\u1169
\u110C\u1175\u11AB\u1105\u116D
\u110C\u1175\u11AB\u1105\u1175
\u110C\u1175\u11AB\u110D\u1161
\u110C\u1175\u11AB\u110E\u1161\u11AF
\u110C\u1175\u11AB\u110E\u116E\u11AF
\u110C\u1175\u11AB\u1110\u1169\u11BC
\u110C\u1175\u11AB\u1112\u1162\u11BC
\u110C\u1175\u11AF\u1106\u116E\u11AB
\u110C\u1175\u11AF\u1107\u1167\u11BC
\u110C\u1175\u11AF\u1109\u1165
\u110C\u1175\u11B7\u110C\u1161\u11A8
\u110C\u1175\u11B8\u1103\u1161\u11AB
\u110C\u1175\u11B8\u110B\u1161\u11AB
\u110C\u1175\u11B8\u110C\u116E\u11BC
\u110D\u1161\u110C\u1173\u11BC
\u110D\u1175\u1101\u1165\u1100\u1175
\u110E\u1161\u1102\u1161\u11B7
\u110E\u1161\u1105\u1161\u1105\u1175
\u110E\u1161\u1105\u1163\u11BC
\u110E\u1161\u1105\u1175\u11B7
\u110E\u1161\u1107\u1167\u11AF
\u110E\u1161\u1109\u1165\u11AB
\u110E\u1161\u110E\u1173\u11B7
\u110E\u1161\u11A8\u1100\u1161\u11A8
\u110E\u1161\u11AB\u1106\u116E\u11AF
\u110E\u1161\u11AB\u1109\u1165\u11BC
\u110E\u1161\u11B7\u1100\u1161
\u110E\u1161\u11B7\u1100\u1175\u1105\u1173\u11B7
\u110E\u1161\u11B7\u1109\u1162
\u110E\u1161\u11B7\u1109\u1165\u11A8
\u110E\u1161\u11B7\u110B\u1167
\u110E\u1161\u11B7\u110B\u116C
\u110E\u1161\u11B7\u110C\u1169
\u110E\u1161\u11BA\u110C\u1161\u11AB
\u110E\u1161\u11BC\u1100\u1161
\u110E\u1161\u11BC\u1100\u1169
\u110E\u1161\u11BC\u1100\u116E
\u110E\u1161\u11BC\u1106\u116E\u11AB
\u110E\u1161\u11BC\u1107\u1161\u11A9
\u110E\u1161\u11BC\u110C\u1161\u11A8
\u110E\u1161\u11BC\u110C\u1169
\u110E\u1162\u1102\u1165\u11AF
\u110E\u1162\u110C\u1165\u11B7
\u110E\u1162\u11A8\u1100\u1161\u1107\u1161\u11BC
\u110E\u1162\u11A8\u1107\u1161\u11BC
\u110E\u1162\u11A8\u1109\u1161\u11BC
\u110E\u1162\u11A8\u110B\u1175\u11B7
\u110E\u1162\u11B7\u1111\u1175\u110B\u1165\u11AB
\u110E\u1165\u1107\u1165\u11AF
\u110E\u1165\u110B\u1173\u11B7
\u110E\u1165\u11AB\u1100\u116E\u11A8
\u110E\u1165\u11AB\u1103\u116E\u11BC
\u110E\u1165\u11AB\u110C\u1161\u11BC
\u110E\u1165\u11AB\u110C\u1162
\u110E\u1165\u11AB\u110E\u1165\u11AB\u1112\u1175
\u110E\u1165\u11AF\u1103\u1169
\u110E\u1165\u11AF\u110C\u1165\u1112\u1175
\u110E\u1165\u11AF\u1112\u1161\u11A8
\u110E\u1165\u11BA\u1102\u1161\u11AF
\u110E\u1165\u11BA\u110D\u1162
\u110E\u1165\u11BC\u1102\u1167\u11AB
\u110E\u1165\u11BC\u1107\u1161\u110C\u1175
\u110E\u1165\u11BC\u1109\u1169
\u110E\u1165\u11BC\u110E\u116E\u11AB
\u110E\u1166\u1100\u1168
\u110E\u1166\u1105\u1167\u11A8
\u110E\u1166\u110B\u1169\u11AB
\u110E\u1166\u110B\u1172\u11A8
\u110E\u1166\u110C\u116E\u11BC
\u110E\u1166\u1112\u1165\u11B7
\u110E\u1169\u1103\u1173\u11BC\u1112\u1161\u11A8\u1109\u1162\u11BC
\u110E\u1169\u1107\u1161\u11AB
\u110E\u1169\u1107\u1161\u11B8
\u110E\u1169\u1109\u1161\u11BC\u1112\u116A
\u110E\u1169\u1109\u116E\u11AB
\u110E\u1169\u110B\u1167\u1105\u1173\u11B7
\u110E\u1169\u110B\u116F\u11AB
\u110E\u1169\u110C\u1165\u1102\u1167\u11A8
\u110E\u1169\u110C\u1165\u11B7
\u110E\u1169\u110E\u1165\u11BC
\u110E\u1169\u110F\u1169\u11AF\u1105\u1175\u11BA
\u110E\u1169\u11BA\u1107\u116E\u11AF
\u110E\u1169\u11BC\u1100\u1161\u11A8
\u110E\u1169\u11BC\u1105\u1175
\u110E\u1169\u11BC\u110C\u1161\u11BC
\u110E\u116A\u11AF\u110B\u1167\u11BC
\u110E\u116C\u1100\u1173\u11AB
\u110E\u116C\u1109\u1161\u11BC
\u110E\u116C\u1109\u1165\u11AB
\u110E\u116C\u1109\u1175\u11AB
\u110E\u116C\u110B\u1161\u11A8
\u110E\u116C\u110C\u1169\u11BC
\u110E\u116E\u1109\u1165\u11A8
\u110E\u116E\u110B\u1165\u11A8
\u110E\u116E\u110C\u1175\u11AB
\u110E\u116E\u110E\u1165\u11AB
\u110E\u116E\u110E\u1173\u11A8
\u110E\u116E\u11A8\u1100\u116E
\u110E\u116E\u11A8\u1109\u1169
\u110E\u116E\u11A8\u110C\u1166
\u110E\u116E\u11A8\u1112\u1161
\u110E\u116E\u11AF\u1100\u1173\u11AB
\u110E\u116E\u11AF\u1107\u1161\u11AF
\u110E\u116E\u11AF\u1109\u1161\u11AB
\u110E\u116E\u11AF\u1109\u1175\u11AB
\u110E\u116E\u11AF\u110B\u1167\u11AB
\u110E\u116E\u11AF\u110B\u1175\u11B8
\u110E\u116E\u11AF\u110C\u1161\u11BC
\u110E\u116E\u11AF\u1111\u1161\u11AB
\u110E\u116E\u11BC\u1100\u1167\u11A8
\u110E\u116E\u11BC\u1100\u1169
\u110E\u116E\u11BC\u1103\u1169\u11AF
\u110E\u116E\u11BC\u1107\u116E\u11AB\u1112\u1175
\u110E\u116E\u11BC\u110E\u1165\u11BC\u1103\u1169
\u110E\u1171\u110B\u1165\u11B8
\u110E\u1171\u110C\u1175\u11A8
\u110E\u1171\u1112\u1163\u11BC
\u110E\u1175\u110B\u1163\u11A8
\u110E\u1175\u11AB\u1100\u116E
\u110E\u1175\u11AB\u110E\u1165\u11A8
\u110E\u1175\u11AF\u1109\u1175\u11B8
\u110E\u1175\u11AF\u110B\u116F\u11AF
\u110E\u1175\u11AF\u1111\u1161\u11AB
\u110E\u1175\u11B7\u1103\u1162
\u110E\u1175\u11B7\u1106\u116E\u11A8
\u110E\u1175\u11B7\u1109\u1175\u11AF
\u110E\u1175\u11BA\u1109\u1169\u11AF
\u110E\u1175\u11BC\u110E\u1161\u11AB
\u110F\u1161\u1106\u1166\u1105\u1161
\u110F\u1161\u110B\u116E\u11AB\u1110\u1165
\u110F\u1161\u11AF\u1100\u116E\u11A8\u1109\u116E
\u110F\u1162\u1105\u1175\u11A8\u1110\u1165
\u110F\u1162\u11B7\u1111\u1165\u1109\u1173
\u110F\u1162\u11B7\u1111\u1166\u110B\u1175\u11AB
\u110F\u1165\u1110\u1173\u11AB
\u110F\u1165\u11AB\u1103\u1175\u1109\u1167\u11AB
\u110F\u1165\u11AF\u1105\u1165
\u110F\u1165\u11B7\u1111\u1172\u1110\u1165
\u110F\u1169\u1101\u1175\u1105\u1175
\u110F\u1169\u1106\u1175\u1103\u1175
\u110F\u1169\u11AB\u1109\u1165\u1110\u1173
\u110F\u1169\u11AF\u1105\u1161
\u110F\u1169\u11B7\u1111\u1173\u11AF\u1105\u1166\u11A8\u1109\u1173
\u110F\u1169\u11BC\u1102\u1161\u1106\u116E\u11AF
\u110F\u116B\u1100\u1161\u11B7
\u110F\u116E\u1103\u1166\u1110\u1161
\u110F\u1173\u1105\u1175\u11B7
\u110F\u1173\u11AB\u1100\u1175\u11AF
\u110F\u1173\u11AB\u1104\u1161\u11AF
\u110F\u1173\u11AB\u1109\u1169\u1105\u1175
\u110F\u1173\u11AB\u110B\u1161\u1103\u1173\u11AF
\u110F\u1173\u11AB\u110B\u1165\u1106\u1165\u1102\u1175
\u110F\u1173\u11AB\u110B\u1175\u11AF
\u110F\u1173\u11AB\u110C\u1165\u11AF
\u110F\u1173\u11AF\u1105\u1162\u1109\u1175\u11A8
\u110F\u1173\u11AF\u1105\u1165\u11B8
\u110F\u1175\u11AF\u1105\u1169
\u1110\u1161\u110B\u1175\u11B8
\u1110\u1161\u110C\u1161\u1100\u1175
\u1110\u1161\u11A8\u1100\u116E
\u1110\u1161\u11A8\u110C\u1161
\u1110\u1161\u11AB\u1109\u1162\u11BC
\u1110\u1162\u1100\u116F\u11AB\u1103\u1169
\u1110\u1162\u110B\u1163\u11BC
\u1110\u1162\u1111\u116E\u11BC
\u1110\u1162\u11A8\u1109\u1175
\u1110\u1162\u11AF\u1105\u1165\u11AB\u1110\u1173
\u1110\u1165\u1102\u1165\u11AF
\u1110\u1165\u1106\u1175\u1102\u1165\u11AF
\u1110\u1166\u1102\u1175\u1109\u1173
\u1110\u1166\u1109\u1173\u1110\u1173
\u1110\u1166\u110B\u1175\u1107\u1173\u11AF
\u1110\u1166\u11AF\u1105\u1166\u1107\u1175\u110C\u1165\u11AB
\u1110\u1169\u1105\u1169\u11AB
\u1110\u1169\u1106\u1161\u1110\u1169
\u1110\u1169\u110B\u116D\u110B\u1175\u11AF
\u1110\u1169\u11BC\u1100\u1168
\u1110\u1169\u11BC\u1100\u116A
\u1110\u1169\u11BC\u1105\u1169
\u1110\u1169\u11BC\u1109\u1175\u11AB
\u1110\u1169\u11BC\u110B\u1167\u11A8
\u1110\u1169\u11BC\u110B\u1175\u11AF
\u1110\u1169\u11BC\u110C\u1161\u11BC
\u1110\u1169\u11BC\u110C\u1166
\u1110\u1169\u11BC\u110C\u1173\u11BC
\u1110\u1169\u11BC\u1112\u1161\u11B8
\u1110\u1169\u11BC\u1112\u116A
\u1110\u116C\u1100\u1173\u11AB
\u1110\u116C\u110B\u116F\u11AB
\u1110\u116C\u110C\u1175\u11A8\u1100\u1173\u11B7
\u1110\u1171\u1100\u1175\u11B7
\u1110\u1173\u1105\u1165\u11A8
\u1110\u1173\u11A8\u1100\u1173\u11B8
\u1110\u1173\u11A8\u1107\u1167\u11AF
\u1110\u1173\u11A8\u1109\u1165\u11BC
\u1110\u1173\u11A8\u1109\u116E
\u1110\u1173\u11A8\u110C\u1175\u11BC
\u1110\u1173\u11A8\u1112\u1175
\u1110\u1173\u11AB\u1110\u1173\u11AB\u1112\u1175
\u1110\u1175\u1109\u1167\u110E\u1173
\u1111\u1161\u1105\u1161\u11AB\u1109\u1162\u11A8
\u1111\u1161\u110B\u1175\u11AF
\u1111\u1161\u110E\u116E\u11AF\u1109\u1169
\u1111\u1161\u11AB\u1100\u1167\u11AF
\u1111\u1161\u11AB\u1103\u1161\u11AB
\u1111\u1161\u11AB\u1106\u1162
\u1111\u1161\u11AB\u1109\u1161
\u1111\u1161\u11AF\u1109\u1175\u11B8
\u1111\u1161\u11AF\u110B\u116F\u11AF
\u1111\u1161\u11B8\u1109\u1169\u11BC
\u1111\u1162\u1109\u1167\u11AB
\u1111\u1162\u11A8\u1109\u1173
\u1111\u1162\u11A8\u1109\u1175\u1106\u1175\u11AF\u1105\u1175
\u1111\u1162\u11AB\u1110\u1175
\u1111\u1165\u1109\u1166\u11AB\u1110\u1173
\u1111\u1166\u110B\u1175\u11AB\u1110\u1173
\u1111\u1167\u11AB\u1100\u1167\u11AB
\u1111\u1167\u11AB\u110B\u1174
\u1111\u1167\u11AB\u110C\u1175
\u1111\u1167\u11AB\u1112\u1175
\u1111\u1167\u11BC\u1100\u1161
\u1111\u1167\u11BC\u1100\u1172\u11AB
\u1111\u1167\u11BC\u1109\u1162\u11BC
\u1111\u1167\u11BC\u1109\u1169
\u1111\u1167\u11BC\u110B\u1163\u11BC
\u1111\u1167\u11BC\u110B\u1175\u11AF
\u1111\u1167\u11BC\u1112\u116A
\u1111\u1169\u1109\u1173\u1110\u1165
\u1111\u1169\u110B\u1175\u11AB\u1110\u1173
\u1111\u1169\u110C\u1161\u11BC
\u1111\u1169\u1112\u1161\u11B7
\u1111\u116D\u1106\u1167\u11AB
\u1111\u116D\u110C\u1165\u11BC
\u1111\u116D\u110C\u116E\u11AB
\u1111\u116D\u1112\u1167\u11AB
\u1111\u116E\u11B7\u1106\u1169\u11A8
\u1111\u116E\u11B7\u110C\u1175\u11AF
\u1111\u116E\u11BC\u1100\u1167\u11BC
\u1111\u116E\u11BC\u1109\u1169\u11A8
\u1111\u116E\u11BC\u1109\u1173\u11B8
\u1111\u1173\u1105\u1161\u11BC\u1109\u1173
\u1111\u1173\u1105\u1175\u11AB\u1110\u1165
\u1111\u1173\u11AF\u1105\u1161\u1109\u1173\u1110\u1175\u11A8
\u1111\u1175\u1100\u1169\u11AB
\u1111\u1175\u1106\u1161\u11BC
\u1111\u1175\u110B\u1161\u1102\u1169
\u1111\u1175\u11AF\u1105\u1173\u11B7
\u1111\u1175\u11AF\u1109\u116E
\u1111\u1175\u11AF\u110B\u116D
\u1111\u1175\u11AF\u110C\u1161
\u1111\u1175\u11AF\u1110\u1169\u11BC
\u1111\u1175\u11BC\u1100\u1168
\u1112\u1161\u1102\u1173\u1102\u1175\u11B7
\u1112\u1161\u1102\u1173\u11AF
\u1112\u1161\u1103\u1173\u110B\u1170\u110B\u1165
\u1112\u1161\u1105\u116E\u11BA\u1107\u1161\u11B7
\u1112\u1161\u1107\u1161\u11AB\u1100\u1175
\u1112\u1161\u1109\u116E\u11A8\u110C\u1175\u11B8
\u1112\u1161\u1109\u116E\u11AB
\u1112\u1161\u110B\u1167\u1110\u1173\u11AB
\u1112\u1161\u110C\u1175\u1106\u1161\u11AB
\u1112\u1161\u110E\u1165\u11AB
\u1112\u1161\u1111\u116E\u11B7
\u1112\u1161\u1111\u1175\u11AF
\u1112\u1161\u11A8\u1100\u116A
\u1112\u1161\u11A8\u1100\u116D
\u1112\u1161\u11A8\u1100\u1173\u11B8
\u1112\u1161\u11A8\u1100\u1175
\u1112\u1161\u11A8\u1102\u1167\u11AB
\u1112\u1161\u11A8\u1105\u1167\u11A8
\u1112\u1161\u11A8\u1107\u1165\u11AB
\u1112\u1161\u11A8\u1107\u116E\u1106\u1169
\u1112\u1161\u11A8\u1107\u1175
\u1112\u1161\u11A8\u1109\u1162\u11BC
\u1112\u1161\u11A8\u1109\u116E\u11AF
\u1112\u1161\u11A8\u1109\u1173\u11B8
\u1112\u1161\u11A8\u110B\u116D\u11BC\u1111\u116E\u11B7
\u1112\u1161\u11A8\u110B\u116F\u11AB
\u1112\u1161\u11A8\u110B\u1171
\u1112\u1161\u11A8\u110C\u1161
\u1112\u1161\u11A8\u110C\u1165\u11B7
\u1112\u1161\u11AB\u1100\u1168
\u1112\u1161\u11AB\u1100\u1173\u11AF
\u1112\u1161\u11AB\u1101\u1165\u1107\u1165\u11AB\u110B\u1166
\u1112\u1161\u11AB\u1102\u1161\u11BD
\u1112\u1161\u11AB\u1102\u116E\u11AB
\u1112\u1161\u11AB\u1103\u1169\u11BC\u110B\u1161\u11AB
\u1112\u1161\u11AB\u1104\u1162
\u1112\u1161\u11AB\u1105\u1161\u1109\u1161\u11AB
\u1112\u1161\u11AB\u1106\u1161\u1103\u1175
\u1112\u1161\u11AB\u1106\u116E\u11AB
\u1112\u1161\u11AB\u1107\u1165\u11AB
\u1112\u1161\u11AB\u1107\u1169\u11A8
\u1112\u1161\u11AB\u1109\u1175\u11A8
\u1112\u1161\u11AB\u110B\u1167\u1105\u1173\u11B7
\u1112\u1161\u11AB\u110D\u1169\u11A8
\u1112\u1161\u11AF\u1106\u1165\u1102\u1175
\u1112\u1161\u11AF\u110B\u1161\u1107\u1165\u110C\u1175
\u1112\u1161\u11AF\u110B\u1175\u11AB
\u1112\u1161\u11B7\u1101\u1166
\u1112\u1161\u11B7\u1107\u116E\u1105\u1169
\u1112\u1161\u11B8\u1100\u1167\u11A8
\u1112\u1161\u11B8\u1105\u1175\u110C\u1165\u11A8
\u1112\u1161\u11BC\u1100\u1169\u11BC
\u1112\u1161\u11BC\u1100\u116E
\u1112\u1161\u11BC\u1109\u1161\u11BC
\u1112\u1161\u11BC\u110B\u1174
\u1112\u1162\u1100\u1167\u11AF
\u1112\u1162\u1100\u116E\u11AB
\u1112\u1162\u1103\u1161\u11B8
\u1112\u1162\u1103\u1161\u11BC
\u1112\u1162\u1106\u116E\u11AF
\u1112\u1162\u1109\u1165\u11A8
\u1112\u1162\u1109\u1165\u11AF
\u1112\u1162\u1109\u116E\u110B\u116D\u11A8\u110C\u1161\u11BC
\u1112\u1162\u110B\u1161\u11AB
\u1112\u1162\u11A8\u1109\u1175\u11B7
\u1112\u1162\u11AB\u1103\u1173\u1107\u1162\u11A8
\u1112\u1162\u11B7\u1107\u1165\u1100\u1165
\u1112\u1162\u11BA\u1107\u1167\u11C0
\u1112\u1162\u11BA\u1109\u1161\u11AF
\u1112\u1162\u11BC\u1103\u1169\u11BC
\u1112\u1162\u11BC\u1107\u1169\u11A8
\u1112\u1162\u11BC\u1109\u1161
\u1112\u1162\u11BC\u110B\u116E\u11AB
\u1112\u1162\u11BC\u110B\u1171
\u1112\u1163\u11BC\u1100\u1175
\u1112\u1163\u11BC\u1109\u1161\u11BC
\u1112\u1163\u11BC\u1109\u116E
\u1112\u1165\u1105\u1161\u11A8
\u1112\u1165\u110B\u116D\u11BC
\u1112\u1166\u11AF\u1100\u1175
\u1112\u1167\u11AB\u1100\u116A\u11AB
\u1112\u1167\u11AB\u1100\u1173\u11B7
\u1112\u1167\u11AB\u1103\u1162
\u1112\u1167\u11AB\u1109\u1161\u11BC
\u1112\u1167\u11AB\u1109\u1175\u11AF
\u1112\u1167\u11AB\u110C\u1161\u11BC
\u1112\u1167\u11AB\u110C\u1162
\u1112\u1167\u11AB\u110C\u1175
\u1112\u1167\u11AF\u110B\u1162\u11A8
\u1112\u1167\u11B8\u1105\u1167\u11A8
\u1112\u1167\u11BC\u1107\u116E
\u1112\u1167\u11BC\u1109\u1161
\u1112\u1167\u11BC\u1109\u116E
\u1112\u1167\u11BC\u1109\u1175\u11A8
\u1112\u1167\u11BC\u110C\u1166
\u1112\u1167\u11BC\u1110\u1162
\u1112\u1167\u11BC\u1111\u1167\u11AB
\u1112\u1168\u1110\u1162\u11A8
\u1112\u1169\u1100\u1175\u1109\u1175\u11B7
\u1112\u1169\u1102\u1161\u11B7
\u1112\u1169\u1105\u1161\u11BC\u110B\u1175
\u1112\u1169\u1107\u1161\u11A8
\u1112\u1169\u1110\u1166\u11AF
\u1112\u1169\u1112\u1173\u11B8
\u1112\u1169\u11A8\u1109\u1175
\u1112\u1169\u11AF\u1105\u1169
\u1112\u1169\u11B7\u1111\u1166\u110B\u1175\u110C\u1175
\u1112\u1169\u11BC\u1107\u1169
\u1112\u1169\u11BC\u1109\u116E
\u1112\u1169\u11BC\u110E\u1161
\u1112\u116A\u1106\u1167\u11AB
\u1112\u116A\u1107\u116E\u11AB
\u1112\u116A\u1109\u1161\u11AF
\u1112\u116A\u110B\u116D\u110B\u1175\u11AF
\u1112\u116A\u110C\u1161\u11BC
\u1112\u116A\u1112\u1161\u11A8
\u1112\u116A\u11A8\u1107\u1169
\u1112\u116A\u11A8\u110B\u1175\u11AB
\u1112\u116A\u11A8\u110C\u1161\u11BC
\u1112\u116A\u11A8\u110C\u1165\u11BC
\u1112\u116A\u11AB\u1100\u1161\u11B8
\u1112\u116A\u11AB\u1100\u1167\u11BC
\u1112\u116A\u11AB\u110B\u1167\u11BC
\u1112\u116A\u11AB\u110B\u1172\u11AF
\u1112\u116A\u11AB\u110C\u1161
\u1112\u116A\u11AF\u1100\u1175
\u1112\u116A\u11AF\u1103\u1169\u11BC
\u1112\u116A\u11AF\u1107\u1161\u11AF\u1112\u1175
\u1112\u116A\u11AF\u110B\u116D\u11BC
\u1112\u116A\u11AF\u110D\u1161\u11A8
\u1112\u116C\u1100\u1167\u11AB
\u1112\u116C\u1100\u116A\u11AB
\u1112\u116C\u1107\u1169\u11A8
\u1112\u116C\u1109\u1162\u11A8
\u1112\u116C\u110B\u116F\u11AB
\u1112\u116C\u110C\u1161\u11BC
\u1112\u116C\u110C\u1165\u11AB
\u1112\u116C\u11BA\u1109\u116E
\u1112\u116C\u11BC\u1103\u1161\u11AB\u1107\u1169\u1103\u1169
\u1112\u116D\u110B\u1172\u11AF\u110C\u1165\u11A8
\u1112\u116E\u1107\u1161\u11AB
\u1112\u116E\u110E\u116E\u11BA\u1100\u1161\u1105\u116E
\u1112\u116E\u11AB\u1105\u1167\u11AB
\u1112\u116F\u11AF\u110A\u1175\u11AB
\u1112\u1172\u1109\u1175\u11A8
\u1112\u1172\u110B\u1175\u11AF
\u1112\u1172\u11BC\u1102\u1162
\u1112\u1173\u1105\u1173\u11B7
\u1112\u1173\u11A8\u1107\u1162\u11A8
\u1112\u1173\u11A8\u110B\u1175\u11AB
\u1112\u1173\u11AB\u110C\u1165\u11A8
\u1112\u1173\u11AB\u1112\u1175
\u1112\u1173\u11BC\u1106\u1175
\u1112\u1173\u11BC\u1107\u116E\u11AB
\u1112\u1174\u1100\u1169\u11A8
\u1112\u1174\u1106\u1161\u11BC
\u1112\u1174\u1109\u1162\u11BC
\u1112\u1174\u11AB\u1109\u1162\u11A8
\u1112\u1175\u11B7\u1101\u1165\u11BA`.split("\n");
// node_modules/@scure/bip39/esm/wordlists/simplified-chinese.js
var wordlist7 = `\u7684
\u4E00
\u662F
\u5728
\u4E0D
\u4E86
\u6709
\u548C
\u4EBA
\u8FD9
\u4E2D
\u5927
\u4E3A
\u4E0A
\u4E2A
\u56FD
\u6211
\u4EE5
\u8981
\u4ED6
\u65F6
\u6765
\u7528
\u4EEC
\u751F
\u5230
\u4F5C
\u5730
\u4E8E
\u51FA
\u5C31
\u5206
\u5BF9
\u6210
\u4F1A
\u53EF
\u4E3B
\u53D1
\u5E74
\u52A8
\u540C
\u5DE5
\u4E5F
\u80FD
\u4E0B
\u8FC7
\u5B50
\u8BF4
\u4EA7
\u79CD
\u9762
\u800C
\u65B9
\u540E
\u591A
\u5B9A
\u884C
\u5B66
\u6CD5
\u6240
\u6C11
\u5F97
\u7ECF
\u5341
\u4E09
\u4E4B
\u8FDB
\u7740
\u7B49
\u90E8
\u5EA6
\u5BB6
\u7535
\u529B
\u91CC
\u5982
\u6C34
\u5316
\u9AD8
\u81EA
\u4E8C
\u7406
\u8D77
\u5C0F
\u7269
\u73B0
\u5B9E
\u52A0
\u91CF
\u90FD
\u4E24
\u4F53
\u5236
\u673A
\u5F53
\u4F7F
\u70B9
\u4ECE
\u4E1A
\u672C
\u53BB
\u628A
\u6027
\u597D
\u5E94
\u5F00
\u5B83
\u5408
\u8FD8
\u56E0
\u7531
\u5176
\u4E9B
\u7136
\u524D
\u5916
\u5929
\u653F
\u56DB
\u65E5
\u90A3
\u793E
\u4E49
\u4E8B
\u5E73
\u5F62
\u76F8
\u5168
\u8868
\u95F4
\u6837
\u4E0E
\u5173
\u5404
\u91CD
\u65B0
\u7EBF
\u5185
\u6570
\u6B63
\u5FC3
\u53CD
\u4F60
\u660E
\u770B
\u539F
\u53C8
\u4E48
\u5229
\u6BD4
\u6216
\u4F46
\u8D28
\u6C14
\u7B2C
\u5411
\u9053
\u547D
\u6B64
\u53D8
\u6761
\u53EA
\u6CA1
\u7ED3
\u89E3
\u95EE
\u610F
\u5EFA
\u6708
\u516C
\u65E0
\u7CFB
\u519B
\u5F88
\u60C5
\u8005
\u6700
\u7ACB
\u4EE3
\u60F3
\u5DF2
\u901A
\u5E76
\u63D0
\u76F4
\u9898
\u515A
\u7A0B
\u5C55
\u4E94
\u679C
\u6599
\u8C61
\u5458
\u9769
\u4F4D
\u5165
\u5E38
\u6587
\u603B
\u6B21
\u54C1
\u5F0F
\u6D3B
\u8BBE
\u53CA
\u7BA1
\u7279
\u4EF6
\u957F
\u6C42
\u8001
\u5934
\u57FA
\u8D44
\u8FB9
\u6D41
\u8DEF
\u7EA7
\u5C11
\u56FE
\u5C71
\u7EDF
\u63A5
\u77E5
\u8F83
\u5C06
\u7EC4
\u89C1
\u8BA1
\u522B
\u5979
\u624B
\u89D2
\u671F
\u6839
\u8BBA
\u8FD0
\u519C
\u6307
\u51E0
\u4E5D
\u533A
\u5F3A
\u653E
\u51B3
\u897F
\u88AB
\u5E72
\u505A
\u5FC5
\u6218
\u5148
\u56DE
\u5219
\u4EFB
\u53D6
\u636E
\u5904
\u961F
\u5357
\u7ED9
\u8272
\u5149
\u95E8
\u5373
\u4FDD
\u6CBB
\u5317
\u9020
\u767E
\u89C4
\u70ED
\u9886
\u4E03
\u6D77
\u53E3
\u4E1C
\u5BFC
\u5668
\u538B
\u5FD7
\u4E16
\u91D1
\u589E
\u4E89
\u6D4E
\u9636
\u6CB9
\u601D
\u672F
\u6781
\u4EA4
\u53D7
\u8054
\u4EC0
\u8BA4
\u516D
\u5171
\u6743
\u6536
\u8BC1
\u6539
\u6E05
\u7F8E
\u518D
\u91C7
\u8F6C
\u66F4
\u5355
\u98CE
\u5207
\u6253
\u767D
\u6559
\u901F
\u82B1
\u5E26
\u5B89
\u573A
\u8EAB
\u8F66
\u4F8B
\u771F
\u52A1
\u5177
\u4E07
\u6BCF
\u76EE
\u81F3
\u8FBE
\u8D70
\u79EF
\u793A
\u8BAE
\u58F0
\u62A5
\u6597
\u5B8C
\u7C7B
\u516B
\u79BB
\u534E
\u540D
\u786E
\u624D
\u79D1
\u5F20
\u4FE1
\u9A6C
\u8282
\u8BDD
\u7C73
\u6574
\u7A7A
\u5143
\u51B5
\u4ECA
\u96C6
\u6E29
\u4F20
\u571F
\u8BB8
\u6B65
\u7FA4
\u5E7F
\u77F3
\u8BB0
\u9700
\u6BB5
\u7814
\u754C
\u62C9
\u6797
\u5F8B
\u53EB
\u4E14
\u7A76
\u89C2
\u8D8A
\u7EC7
\u88C5
\u5F71
\u7B97
\u4F4E
\u6301
\u97F3
\u4F17
\u4E66
\u5E03
\u590D
\u5BB9
\u513F
\u987B
\u9645
\u5546
\u975E
\u9A8C
\u8FDE
\u65AD
\u6DF1
\u96BE
\u8FD1
\u77FF
\u5343
\u5468
\u59D4
\u7D20
\u6280
\u5907
\u534A
\u529E
\u9752
\u7701
\u5217
\u4E60
\u54CD
\u7EA6
\u652F
\u822C
\u53F2
\u611F
\u52B3
\u4FBF
\u56E2
\u5F80
\u9178
\u5386
\u5E02
\u514B
\u4F55
\u9664
\u6D88
\u6784
\u5E9C
\u79F0
\u592A
\u51C6
\u7CBE
\u503C
\u53F7
\u7387
\u65CF
\u7EF4
\u5212
\u9009
\u6807
\u5199
\u5B58
\u5019
\u6BDB
\u4EB2
\u5FEB
\u6548
\u65AF
\u9662
\u67E5
\u6C5F
\u578B
\u773C
\u738B
\u6309
\u683C
\u517B
\u6613
\u7F6E
\u6D3E
\u5C42
\u7247
\u59CB
\u5374
\u4E13
\u72B6
\u80B2
\u5382
\u4EAC
\u8BC6
\u9002
\u5C5E
\u5706
\u5305
\u706B
\u4F4F
\u8C03
\u6EE1
\u53BF
\u5C40
\u7167
\u53C2
\u7EA2
\u7EC6
\u5F15
\u542C
\u8BE5
\u94C1
\u4EF7
\u4E25
\u9996
\u5E95
\u6DB2
\u5B98
\u5FB7
\u968F
\u75C5
\u82CF
\u5931
\u5C14
\u6B7B
\u8BB2
\u914D
\u5973
\u9EC4
\u63A8
\u663E
\u8C08
\u7F6A
\u795E
\u827A
\u5462
\u5E2D
\u542B
\u4F01
\u671B
\u5BC6
\u6279
\u8425
\u9879
\u9632
\u4E3E
\u7403
\u82F1
\u6C27
\u52BF
\u544A
\u674E
\u53F0
\u843D
\u6728
\u5E2E
\u8F6E
\u7834
\u4E9A
\u5E08
\u56F4
\u6CE8
\u8FDC
\u5B57
\u6750
\u6392
\u4F9B
\u6CB3
\u6001
\u5C01
\u53E6
\u65BD
\u51CF
\u6811
\u6EB6
\u600E
\u6B62
\u6848
\u8A00
\u58EB
\u5747
\u6B66
\u56FA
\u53F6
\u9C7C
\u6CE2
\u89C6
\u4EC5
\u8D39
\u7D27
\u7231
\u5DE6
\u7AE0
\u65E9
\u671D
\u5BB3
\u7EED
\u8F7B
\u670D
\u8BD5
\u98DF
\u5145
\u5175
\u6E90
\u5224
\u62A4
\u53F8
\u8DB3
\u67D0
\u7EC3
\u5DEE
\u81F4
\u677F
\u7530
\u964D
\u9ED1
\u72AF
\u8D1F
\u51FB
\u8303
\u7EE7
\u5174
\u4F3C
\u4F59
\u575A
\u66F2
\u8F93
\u4FEE
\u6545
\u57CE
\u592B
\u591F
\u9001
\u7B14
\u8239
\u5360
\u53F3
\u8D22
\u5403
\u5BCC
\u6625
\u804C
\u89C9
\u6C49
\u753B
\u529F
\u5DF4
\u8DDF
\u867D
\u6742
\u98DE
\u68C0
\u5438
\u52A9
\u5347
\u9633
\u4E92
\u521D
\u521B
\u6297
\u8003
\u6295
\u574F
\u7B56
\u53E4
\u5F84
\u6362
\u672A
\u8DD1
\u7559
\u94A2
\u66FE
\u7AEF
\u8D23
\u7AD9
\u7B80
\u8FF0
\u94B1
\u526F
\u5C3D
\u5E1D
\u5C04
\u8349
\u51B2
\u627F
\u72EC
\u4EE4
\u9650
\u963F
\u5BA3
\u73AF
\u53CC
\u8BF7
\u8D85
\u5FAE
\u8BA9
\u63A7
\u5DDE
\u826F
\u8F74
\u627E
\u5426
\u7EAA
\u76CA
\u4F9D
\u4F18
\u9876
\u7840
\u8F7D
\u5012
\u623F
\u7A81
\u5750
\u7C89
\u654C
\u7565
\u5BA2
\u8881
\u51B7
\u80DC
\u7EDD
\u6790
\u5757
\u5242
\u6D4B
\u4E1D
\u534F
\u8BC9
\u5FF5
\u9648
\u4ECD
\u7F57
\u76D0
\u53CB
\u6D0B
\u9519
\u82E6
\u591C
\u5211
\u79FB
\u9891
\u9010
\u9760
\u6DF7
\u6BCD
\u77ED
\u76AE
\u7EC8
\u805A
\u6C7D
\u6751
\u4E91
\u54EA
\u65E2
\u8DDD
\u536B
\u505C
\u70C8
\u592E
\u5BDF
\u70E7
\u8FC5
\u5883
\u82E5
\u5370
\u6D32
\u523B
\u62EC
\u6FC0
\u5B54
\u641E
\u751A
\u5BA4
\u5F85
\u6838
\u6821
\u6563
\u4FB5
\u5427
\u7532
\u6E38
\u4E45
\u83DC
\u5473
\u65E7
\u6A21
\u6E56
\u8D27
\u635F
\u9884
\u963B
\u6BEB
\u666E
\u7A33
\u4E59
\u5988
\u690D
\u606F
\u6269
\u94F6
\u8BED
\u6325
\u9152
\u5B88
\u62FF
\u5E8F
\u7EB8
\u533B
\u7F3A
\u96E8
\u5417
\u9488
\u5218
\u554A
\u6025
\u5531
\u8BEF
\u8BAD
\u613F
\u5BA1
\u9644
\u83B7
\u8336
\u9C9C
\u7CAE
\u65A4
\u5B69
\u8131
\u786B
\u80A5
\u5584
\u9F99
\u6F14
\u7236
\u6E10
\u8840
\u6B22
\u68B0
\u638C
\u6B4C
\u6C99
\u521A
\u653B
\u8C13
\u76FE
\u8BA8
\u665A
\u7C92
\u4E71
\u71C3
\u77DB
\u4E4E
\u6740
\u836F
\u5B81
\u9C81
\u8D35
\u949F
\u7164
\u8BFB
\u73ED
\u4F2F
\u9999
\u4ECB
\u8FEB
\u53E5
\u4E30
\u57F9
\u63E1
\u5170
\u62C5
\u5F26
\u86CB
\u6C89
\u5047
\u7A7F
\u6267
\u7B54
\u4E50
\u8C01
\u987A
\u70DF
\u7F29
\u5F81
\u8138
\u559C
\u677E
\u811A
\u56F0
\u5F02
\u514D
\u80CC
\u661F
\u798F
\u4E70
\u67D3
\u4E95
\u6982
\u6162
\u6015
\u78C1
\u500D
\u7956
\u7687
\u4FC3
\u9759
\u8865
\u8BC4
\u7FFB
\u8089
\u8DF5
\u5C3C
\u8863
\u5BBD
\u626C
\u68C9
\u5E0C
\u4F24
\u64CD
\u5782
\u79CB
\u5B9C
\u6C22
\u5957
\u7763
\u632F
\u67B6
\u4EAE
\u672B
\u5BAA
\u5E86
\u7F16
\u725B
\u89E6
\u6620
\u96F7
\u9500
\u8BD7
\u5EA7
\u5C45
\u6293
\u88C2
\u80DE
\u547C
\u5A18
\u666F
\u5A01
\u7EFF
\u6676
\u539A
\u76DF
\u8861
\u9E21
\u5B59
\u5EF6
\u5371
\u80F6
\u5C4B
\u4E61
\u4E34
\u9646
\u987E
\u6389
\u5440
\u706F
\u5C81
\u63AA
\u675F
\u8010
\u5267
\u7389
\u8D75
\u8DF3
\u54E5
\u5B63
\u8BFE
\u51EF
\u80E1
\u989D
\u6B3E
\u7ECD
\u5377
\u9F50
\u4F1F
\u84B8
\u6B96
\u6C38
\u5B97
\u82D7
\u5DDD
\u7089
\u5CA9
\u5F31
\u96F6
\u6768
\u594F
\u6CBF
\u9732
\u6746
\u63A2
\u6ED1
\u9547
\u996D
\u6D53
\u822A
\u6000
\u8D76
\u5E93
\u593A
\u4F0A
\u7075
\u7A0E
\u9014
\u706D
\u8D5B
\u5F52
\u53EC
\u9F13
\u64AD
\u76D8
\u88C1
\u9669
\u5EB7
\u552F
\u5F55
\u83CC
\u7EAF
\u501F
\u7CD6
\u76D6
\u6A2A
\u7B26
\u79C1
\u52AA
\u5802
\u57DF
\u67AA
\u6DA6
\u5E45
\u54C8
\u7ADF
\u719F
\u866B
\u6CFD
\u8111
\u58E4
\u78B3
\u6B27
\u904D
\u4FA7
\u5BE8
\u6562
\u5F7B
\u8651
\u659C
\u8584
\u5EAD
\u7EB3
\u5F39
\u9972
\u4F38
\u6298
\u9EA6
\u6E7F
\u6697
\u8377
\u74E6
\u585E
\u5E8A
\u7B51
\u6076
\u6237
\u8BBF
\u5854
\u5947
\u900F
\u6881
\u5200
\u65CB
\u8FF9
\u5361
\u6C2F
\u9047
\u4EFD
\u6BD2
\u6CE5
\u9000
\u6D17
\u6446
\u7070
\u5F69
\u5356
\u8017
\u590F
\u62E9
\u5FD9
\u94DC
\u732E
\u786C
\u4E88
\u7E41
\u5708
\u96EA
\u51FD
\u4EA6
\u62BD
\u7BC7
\u9635
\u9634
\u4E01
\u5C3A
\u8FFD
\u5806
\u96C4
\u8FCE
\u6CDB
\u7238
\u697C
\u907F
\u8C0B
\u5428
\u91CE
\u732A
\u65D7
\u7D2F
\u504F
\u5178
\u9986
\u7D22
\u79E6
\u8102
\u6F6E
\u7237
\u8C46
\u5FFD
\u6258
\u60CA
\u5851
\u9057
\u6108
\u6731
\u66FF
\u7EA4
\u7C97
\u503E
\u5C1A
\u75DB
\u695A
\u8C22
\u594B
\u8D2D
\u78E8
\u541B
\u6C60
\u65C1
\u788E
\u9AA8
\u76D1
\u6355
\u5F1F
\u66B4
\u5272
\u8D2F
\u6B8A
\u91CA
\u8BCD
\u4EA1
\u58C1
\u987F
\u5B9D
\u5348
\u5C18
\u95FB
\u63ED
\u70AE
\u6B8B
\u51AC
\u6865
\u5987
\u8B66
\u7EFC
\u62DB
\u5434
\u4ED8
\u6D6E
\u906D
\u5F90
\u60A8
\u6447
\u8C37
\u8D5E
\u7BB1
\u9694
\u8BA2
\u7537
\u5439
\u56ED
\u7EB7
\u5510
\u8D25
\u5B8B
\u73BB
\u5DE8
\u8015
\u5766
\u8363
\u95ED
\u6E7E
\u952E
\u51E1
\u9A7B
\u9505
\u6551
\u6069
\u5265
\u51DD
\u78B1
\u9F7F
\u622A
\u70BC
\u9EBB
\u7EBA
\u7981
\u5E9F
\u76DB
\u7248
\u7F13
\u51C0
\u775B
\u660C
\u5A5A
\u6D89
\u7B52
\u5634
\u63D2
\u5CB8
\u6717
\u5E84
\u8857
\u85CF
\u59D1
\u8D38
\u8150
\u5974
\u5566
\u60EF
\u4E58
\u4F19
\u6062
\u5300
\u7EB1
\u624E
\u8FA9
\u8033
\u5F6A
\u81E3
\u4EBF
\u7483
\u62B5
\u8109
\u79C0
\u8428
\u4FC4
\u7F51
\u821E
\u5E97
\u55B7
\u7EB5
\u5BF8
\u6C57
\u6302
\u6D2A
\u8D3A
\u95EA
\u67EC
\u7206
\u70EF
\u6D25
\u7A3B
\u5899
\u8F6F
\u52C7
\u50CF
\u6EDA
\u5398
\u8499
\u82B3
\u80AF
\u5761
\u67F1
\u8361
\u817F
\u4EEA
\u65C5
\u5C3E
\u8F67
\u51B0
\u8D21
\u767B
\u9ECE
\u524A
\u94BB
\u52D2
\u9003
\u969C
\u6C28
\u90ED
\u5CF0
\u5E01
\u6E2F
\u4F0F
\u8F68
\u4EA9
\u6BD5
\u64E6
\u83AB
\u523A
\u6D6A
\u79D8
\u63F4
\u682A
\u5065
\u552E
\u80A1
\u5C9B
\u7518
\u6CE1
\u7761
\u7AE5
\u94F8
\u6C64
\u9600
\u4F11
\u6C47
\u820D
\u7267
\u7ED5
\u70B8
\u54F2
\u78F7
\u7EE9
\u670B
\u6DE1
\u5C16
\u542F
\u9677
\u67F4
\u5448
\u5F92
\u989C
\u6CEA
\u7A0D
\u5FD8
\u6CF5
\u84DD
\u62D6
\u6D1E
\u6388
\u955C
\u8F9B
\u58EE
\u950B
\u8D2B
\u865A
\u5F2F
\u6469
\u6CF0
\u5E7C
\u5EF7
\u5C0A
\u7A97
\u7EB2
\u5F04
\u96B6
\u7591
\u6C0F
\u5BAB
\u59D0
\u9707
\u745E
\u602A
\u5C24
\u7434
\u5FAA
\u63CF
\u819C
\u8FDD
\u5939
\u8170
\u7F18
\u73E0
\u7A77
\u68EE
\u679D
\u7AF9
\u6C9F
\u50AC
\u7EF3
\u5FC6
\u90A6
\u5269
\u5E78
\u6D46
\u680F
\u62E5
\u7259
\u8D2E
\u793C
\u6EE4
\u94A0
\u7EB9
\u7F62
\u62CD
\u54B1
\u558A
\u8896
\u57C3
\u52E4
\u7F5A
\u7126
\u6F5C
\u4F0D
\u58A8
\u6B32
\u7F1D
\u59D3
\u520A
\u9971
\u4EFF
\u5956
\u94DD
\u9B3C
\u4E3D
\u8DE8
\u9ED8
\u6316
\u94FE
\u626B
\u559D
\u888B
\u70AD
\u6C61
\u5E55
\u8BF8
\u5F27
\u52B1
\u6885
\u5976
\u6D01
\u707E
\u821F
\u9274
\u82EF
\u8BBC
\u62B1
\u6BC1
\u61C2
\u5BD2
\u667A
\u57D4
\u5BC4
\u5C4A
\u8DC3
\u6E21
\u6311
\u4E39
\u8270
\u8D1D
\u78B0
\u62D4
\u7239
\u6234
\u7801
\u68A6
\u82BD
\u7194
\u8D64
\u6E14
\u54ED
\u656C
\u9897
\u5954
\u94C5
\u4EF2
\u864E
\u7A00
\u59B9
\u4E4F
\u73CD
\u7533
\u684C
\u9075
\u5141
\u9686
\u87BA
\u4ED3
\u9B4F
\u9510
\u6653
\u6C2E
\u517C
\u9690
\u788D
\u8D6B
\u62E8
\u5FE0
\u8083
\u7F38
\u7275
\u62A2
\u535A
\u5DE7
\u58F3
\u5144
\u675C
\u8BAF
\u8BDA
\u78A7
\u7965
\u67EF
\u9875
\u5DE1
\u77E9
\u60B2
\u704C
\u9F84
\u4F26
\u7968
\u5BFB
\u6842
\u94FA
\u5723
\u6050
\u6070
\u90D1
\u8DA3
\u62AC
\u8352
\u817E
\u8D34
\u67D4
\u6EF4
\u731B
\u9614
\u8F86
\u59BB
\u586B
\u64A4
\u50A8
\u7B7E
\u95F9
\u6270
\u7D2B
\u7802
\u9012
\u620F
\u540A
\u9676
\u4F10
\u5582
\u7597
\u74F6
\u5A46
\u629A
\u81C2
\u6478
\u5FCD
\u867E
\u8721
\u90BB
\u80F8
\u5DE9
\u6324
\u5076
\u5F03
\u69FD
\u52B2
\u4E73
\u9093
\u5409
\u4EC1
\u70C2
\u7816
\u79DF
\u4E4C
\u8230
\u4F34
\u74DC
\u6D45
\u4E19
\u6682
\u71E5
\u6A61
\u67F3
\u8FF7
\u6696
\u724C
\u79E7
\u80C6
\u8BE6
\u7C27
\u8E0F
\u74F7
\u8C31
\u5446
\u5BBE
\u7CCA
\u6D1B
\u8F89
\u6124
\u7ADE
\u9699
\u6012
\u7C98
\u4E43
\u7EEA
\u80A9
\u7C4D
\u654F
\u6D82
\u7199
\u7686
\u4FA6
\u60AC
\u6398
\u4EAB
\u7EA0
\u9192
\u72C2
\u9501
\u6DC0
\u6068
\u7272
\u9738
\u722C
\u8D4F
\u9006
\u73A9
\u9675
\u795D
\u79D2
\u6D59
\u8C8C
\u5F79
\u5F7C
\u6089
\u9E2D
\u8D8B
\u51E4
\u6668
\u755C
\u8F88
\u79E9
\u5375
\u7F72
\u68AF
\u708E
\u6EE9
\u68CB
\u9A71
\u7B5B
\u5CE1
\u5192
\u5565
\u5BFF
\u8BD1
\u6D78
\u6CC9
\u5E3D
\u8FDF
\u7845
\u7586
\u8D37
\u6F0F
\u7A3F
\u51A0
\u5AE9
\u80C1
\u82AF
\u7262
\u53DB
\u8680
\u5965
\u9E23
\u5CAD
\u7F8A
\u51ED
\u4E32
\u5858
\u7ED8
\u9175
\u878D
\u76C6
\u9521
\u5E99
\u7B79
\u51BB
\u8F85
\u6444
\u88AD
\u7B4B
\u62D2
\u50DA
\u65F1
\u94BE
\u9E1F
\u6F06
\u6C88
\u7709
\u758F
\u6DFB
\u68D2
\u7A57
\u785D
\u97E9
\u903C
\u626D
\u4FA8
\u51C9
\u633A
\u7897
\u683D
\u7092
\u676F
\u60A3
\u998F
\u529D
\u8C6A
\u8FBD
\u52C3
\u9E3F
\u65E6
\u540F
\u62DC
\u72D7
\u57CB
\u8F8A
\u63A9
\u996E
\u642C
\u9A82
\u8F9E
\u52FE
\u6263
\u4F30
\u848B
\u7ED2
\u96FE
\u4E08
\u6735
\u59C6
\u62DF
\u5B87
\u8F91
\u9655
\u96D5
\u507F
\u84C4
\u5D07
\u526A
\u5021
\u5385
\u54AC
\u9A76
\u85AF
\u5237
\u65A5
\u756A
\u8D4B
\u5949
\u4F5B
\u6D47
\u6F2B
\u66FC
\u6247
\u9499
\u6843
\u6276
\u4ED4
\u8FD4
\u4FD7
\u4E8F
\u8154
\u978B
\u68F1
\u8986
\u6846
\u6084
\u53D4
\u649E
\u9A97
\u52D8
\u65FA
\u6CB8
\u5B64
\u5410
\u5B5F
\u6E20
\u5C48
\u75BE
\u5999
\u60DC
\u4EF0
\u72E0
\u80C0
\u8C10
\u629B
\u9709
\u6851
\u5C97
\u561B
\u8870
\u76D7
\u6E17
\u810F
\u8D56
\u6D8C
\u751C
\u66F9
\u9605
\u808C
\u54E9
\u5389
\u70C3
\u7EAC
\u6BC5
\u6628
\u4F2A
\u75C7
\u716E
\u53F9
\u9489
\u642D
\u830E
\u7B3C
\u9177
\u5077
\u5F13
\u9525
\u6052
\u6770
\u5751
\u9F3B
\u7FFC
\u7EB6
\u53D9
\u72F1
\u902E
\u7F50
\u7EDC
\u68DA
\u6291
\u81A8
\u852C
\u5BFA
\u9AA4
\u7A46
\u51B6
\u67AF
\u518C
\u5C38
\u51F8
\u7EC5
\u576F
\u727A
\u7130
\u8F70
\u6B23
\u664B
\u7626
\u5FA1
\u952D
\u9526
\u4E27
\u65EC
\u953B
\u5784
\u641C
\u6251
\u9080
\u4EAD
\u916F
\u8FC8
\u8212
\u8106
\u9176
\u95F2
\u5FE7
\u915A
\u987D
\u7FBD
\u6DA8
\u5378
\u4ED7
\u966A
\u8F9F
\u60E9
\u676D
\u59DA
\u809A
\u6349
\u98D8
\u6F02
\u6606
\u6B3A
\u543E
\u90CE
\u70F7
\u6C41
\u5475
\u9970
\u8427
\u96C5
\u90AE
\u8FC1
\u71D5
\u6492
\u59FB
\u8D74
\u5BB4
\u70E6
\u503A
\u5E10
\u6591
\u94C3
\u65E8
\u9187
\u8463
\u997C
\u96CF
\u59FF
\u62CC
\u5085
\u8179
\u59A5
\u63C9
\u8D24
\u62C6
\u6B6A
\u8461
\u80FA
\u4E22
\u6D69
\u5FBD
\u6602
\u57AB
\u6321
\u89C8
\u8D2A
\u6170
\u7F34
\u6C6A
\u614C
\u51AF
\u8BFA
\u59DC
\u8C0A
\u51F6
\u52A3
\u8BEC
\u8000
\u660F
\u8EBA
\u76C8
\u9A91
\u4E54
\u6EAA
\u4E1B
\u5362
\u62B9
\u95F7
\u54A8
\u522E
\u9A7E
\u7F06
\u609F
\u6458
\u94D2
\u63B7
\u9887
\u5E7B
\u67C4
\u60E0
\u60E8
\u4F73
\u4EC7
\u814A
\u7A9D
\u6DA4
\u5251
\u77A7
\u5821
\u6CFC
\u8471
\u7F69
\u970D
\u635E
\u80CE
\u82CD
\u6EE8
\u4FE9
\u6345
\u6E58
\u780D
\u971E
\u90B5
\u8404
\u75AF
\u6DEE
\u9042
\u718A
\u7CAA
\u70D8
\u5BBF
\u6863
\u6208
\u9A73
\u5AC2
\u88D5
\u5F99
\u7BAD
\u6350
\u80A0
\u6491
\u6652
\u8FA8
\u6BBF
\u83B2
\u644A
\u6405
\u9171
\u5C4F
\u75AB
\u54C0
\u8521
\u5835
\u6CAB
\u76B1
\u7545
\u53E0
\u9601
\u83B1
\u6572
\u8F96
\u94A9
\u75D5
\u575D
\u5DF7
\u997F
\u7978
\u4E18
\u7384
\u6E9C
\u66F0
\u903B
\u5F6D
\u5C1D
\u537F
\u59A8
\u8247
\u541E
\u97E6
\u6028
\u77EE
\u6B47`.split("\n");
// node_modules/@scure/bip39/esm/wordlists/spanish.js
var wordlist8 = `a\u0301baco
abdomen
abeja
abierto
abogado
abono
aborto
abrazo
abrir
abuelo
abuso
acabar
academia
acceso
accio\u0301n
aceite
acelga
acento
aceptar
a\u0301cido
aclarar
acne\u0301
acoger
acoso
activo
acto
actriz
actuar
acudir
acuerdo
acusar
adicto
admitir
adoptar
adorno
aduana
adulto
ae\u0301reo
afectar
aficio\u0301n
afinar
afirmar
a\u0301gil
agitar
agoni\u0301a
agosto
agotar
agregar
agrio
agua
agudo
a\u0301guila
aguja
ahogo
ahorro
aire
aislar
ajedrez
ajeno
ajuste
alacra\u0301n
alambre
alarma
alba
a\u0301lbum
alcalde
aldea
alegre
alejar
alerta
aleta
alfiler
alga
algodo\u0301n
aliado
aliento
alivio
alma
almeja
almi\u0301bar
altar
alteza
altivo
alto
altura
alumno
alzar
amable
amante
amapola
amargo
amasar
a\u0301mbar
a\u0301mbito
ameno
amigo
amistad
amor
amparo
amplio
ancho
anciano
ancla
andar
ande\u0301n
anemia
a\u0301ngulo
anillo
a\u0301nimo
ani\u0301s
anotar
antena
antiguo
antojo
anual
anular
anuncio
an\u0303adir
an\u0303ejo
an\u0303o
apagar
aparato
apetito
apio
aplicar
apodo
aporte
apoyo
aprender
aprobar
apuesta
apuro
arado
aran\u0303a
arar
a\u0301rbitro
a\u0301rbol
arbusto
archivo
arco
arder
ardilla
arduo
a\u0301rea
a\u0301rido
aries
armoni\u0301a
arne\u0301s
aroma
arpa
arpo\u0301n
arreglo
arroz
arruga
arte
artista
asa
asado
asalto
ascenso
asegurar
aseo
asesor
asiento
asilo
asistir
asno
asombro
a\u0301spero
astilla
astro
astuto
asumir
asunto
atajo
ataque
atar
atento
ateo
a\u0301tico
atleta
a\u0301tomo
atraer
atroz
atu\u0301n
audaz
audio
auge
aula
aumento
ausente
autor
aval
avance
avaro
ave
avellana
avena
avestruz
avio\u0301n
aviso
ayer
ayuda
ayuno
azafra\u0301n
azar
azote
azu\u0301car
azufre
azul
baba
babor
bache
bahi\u0301a
baile
bajar
balanza
balco\u0301n
balde
bambu\u0301
banco
banda
ban\u0303o
barba
barco
barniz
barro
ba\u0301scula
basto\u0301n
basura
batalla
bateri\u0301a
batir
batuta
bau\u0301l
bazar
bebe\u0301
bebida
bello
besar
beso
bestia
bicho
bien
bingo
blanco
bloque
blusa
boa
bobina
bobo
boca
bocina
boda
bodega
boina
bola
bolero
bolsa
bomba
bondad
bonito
bono
bonsa\u0301i
borde
borrar
bosque
bote
boti\u0301n
bo\u0301veda
bozal
bravo
brazo
brecha
breve
brillo
brinco
brisa
broca
broma
bronce
brote
bruja
brusco
bruto
buceo
bucle
bueno
buey
bufanda
bufo\u0301n
bu\u0301ho
buitre
bulto
burbuja
burla
burro
buscar
butaca
buzo\u0301n
caballo
cabeza
cabina
cabra
cacao
cada\u0301ver
cadena
caer
cafe\u0301
cai\u0301da
caima\u0301n
caja
cajo\u0301n
cal
calamar
calcio
caldo
calidad
calle
calma
calor
calvo
cama
cambio
camello
camino
campo
ca\u0301ncer
candil
canela
canguro
canica
canto
can\u0303a
can\u0303o\u0301n
caoba
caos
capaz
capita\u0301n
capote
captar
capucha
cara
carbo\u0301n
ca\u0301rcel
careta
carga
carin\u0303o
carne
carpeta
carro
carta
casa
casco
casero
caspa
castor
catorce
catre
caudal
causa
cazo
cebolla
ceder
cedro
celda
ce\u0301lebre
celoso
ce\u0301lula
cemento
ceniza
centro
cerca
cerdo
cereza
cero
cerrar
certeza
ce\u0301sped
cetro
chacal
chaleco
champu\u0301
chancla
chapa
charla
chico
chiste
chivo
choque
choza
chuleta
chupar
ciclo\u0301n
ciego
cielo
cien
cierto
cifra
cigarro
cima
cinco
cine
cinta
cipre\u0301s
circo
ciruela
cisne
cita
ciudad
clamor
clan
claro
clase
clave
cliente
clima
cli\u0301nica
cobre
coccio\u0301n
cochino
cocina
coco
co\u0301digo
codo
cofre
coger
cohete
coji\u0301n
cojo
cola
colcha
colegio
colgar
colina
collar
colmo
columna
combate
comer
comida
co\u0301modo
compra
conde
conejo
conga
conocer
consejo
contar
copa
copia
corazo\u0301n
corbata
corcho
cordo\u0301n
corona
correr
coser
cosmos
costa
cra\u0301neo
cra\u0301ter
crear
crecer
crei\u0301do
crema
cri\u0301a
crimen
cripta
crisis
cromo
cro\u0301nica
croqueta
crudo
cruz
cuadro
cuarto
cuatro
cubo
cubrir
cuchara
cuello
cuento
cuerda
cuesta
cueva
cuidar
culebra
culpa
culto
cumbre
cumplir
cuna
cuneta
cuota
cupo\u0301n
cu\u0301pula
curar
curioso
curso
curva
cutis
dama
danza
dar
dardo
da\u0301til
deber
de\u0301bil
de\u0301cada
decir
dedo
defensa
definir
dejar
delfi\u0301n
delgado
delito
demora
denso
dental
deporte
derecho
derrota
desayuno
deseo
desfile
desnudo
destino
desvi\u0301o
detalle
detener
deuda
di\u0301a
diablo
diadema
diamante
diana
diario
dibujo
dictar
diente
dieta
diez
difi\u0301cil
digno
dilema
diluir
dinero
directo
dirigir
disco
disen\u0303o
disfraz
diva
divino
doble
doce
dolor
domingo
don
donar
dorado
dormir
dorso
dos
dosis
drago\u0301n
droga
ducha
duda
duelo
duen\u0303o
dulce
du\u0301o
duque
durar
dureza
duro
e\u0301bano
ebrio
echar
eco
ecuador
edad
edicio\u0301n
edificio
editor
educar
efecto
eficaz
eje
ejemplo
elefante
elegir
elemento
elevar
elipse
e\u0301lite
elixir
elogio
eludir
embudo
emitir
emocio\u0301n
empate
empen\u0303o
empleo
empresa
enano
encargo
enchufe
enci\u0301a
enemigo
enero
enfado
enfermo
engan\u0303o
enigma
enlace
enorme
enredo
ensayo
ensen\u0303ar
entero
entrar
envase
envi\u0301o
e\u0301poca
equipo
erizo
escala
escena
escolar
escribir
escudo
esencia
esfera
esfuerzo
espada
espejo
espi\u0301a
esposa
espuma
esqui\u0301
estar
este
estilo
estufa
etapa
eterno
e\u0301tica
etnia
evadir
evaluar
evento
evitar
exacto
examen
exceso
excusa
exento
exigir
exilio
existir
e\u0301xito
experto
explicar
exponer
extremo
fa\u0301brica
fa\u0301bula
fachada
fa\u0301cil
factor
faena
faja
falda
fallo
falso
faltar
fama
familia
famoso
farao\u0301n
farmacia
farol
farsa
fase
fatiga
fauna
favor
fax
febrero
fecha
feliz
feo
feria
feroz
fe\u0301rtil
fervor
festi\u0301n
fiable
fianza
fiar
fibra
ficcio\u0301n
ficha
fideo
fiebre
fiel
fiera
fiesta
figura
fijar
fijo
fila
filete
filial
filtro
fin
finca
fingir
finito
firma
flaco
flauta
flecha
flor
flota
fluir
flujo
flu\u0301or
fobia
foca
fogata
fogo\u0301n
folio
folleto
fondo
forma
forro
fortuna
forzar
fosa
foto
fracaso
fra\u0301gil
franja
frase
fraude
frei\u0301r
freno
fresa
fri\u0301o
frito
fruta
fuego
fuente
fuerza
fuga
fumar
funcio\u0301n
funda
furgo\u0301n
furia
fusil
fu\u0301tbol
futuro
gacela
gafas
gaita
gajo
gala
galeri\u0301a
gallo
gamba
ganar
gancho
ganga
ganso
garaje
garza
gasolina
gastar
gato
gavila\u0301n
gemelo
gemir
gen
ge\u0301nero
genio
gente
geranio
gerente
germen
gesto
gigante
gimnasio
girar
giro
glaciar
globo
gloria
gol
golfo
goloso
golpe
goma
gordo
gorila
gorra
gota
goteo
gozar
grada
gra\u0301fico
grano
grasa
gratis
grave
grieta
grillo
gripe
gris
grito
grosor
gru\u0301a
grueso
grumo
grupo
guante
guapo
guardia
guerra
gui\u0301a
guin\u0303o
guion
guiso
guitarra
gusano
gustar
haber
ha\u0301bil
hablar
hacer
hacha
hada
hallar
hamaca
harina
haz
hazan\u0303a
hebilla
hebra
hecho
helado
helio
hembra
herir
hermano
he\u0301roe
hervir
hielo
hierro
hi\u0301gado
higiene
hijo
himno
historia
hocico
hogar
hoguera
hoja
hombre
hongo
honor
honra
hora
hormiga
horno
hostil
hoyo
hueco
huelga
huerta
hueso
huevo
huida
huir
humano
hu\u0301medo
humilde
humo
hundir
huraca\u0301n
hurto
icono
ideal
idioma
i\u0301dolo
iglesia
iglu\u0301
igual
ilegal
ilusio\u0301n
imagen
ima\u0301n
imitar
impar
imperio
imponer
impulso
incapaz
i\u0301ndice
inerte
infiel
informe
ingenio
inicio
inmenso
inmune
innato
insecto
instante
intere\u0301s
i\u0301ntimo
intuir
inu\u0301til
invierno
ira
iris
ironi\u0301a
isla
islote
jabali\u0301
jabo\u0301n
jamo\u0301n
jarabe
jardi\u0301n
jarra
jaula
jazmi\u0301n
jefe
jeringa
jinete
jornada
joroba
joven
joya
juerga
jueves
juez
jugador
jugo
juguete
juicio
junco
jungla
junio
juntar
ju\u0301piter
jurar
justo
juvenil
juzgar
kilo
koala
labio
lacio
lacra
lado
ladro\u0301n
lagarto
la\u0301grima
laguna
laico
lamer
la\u0301mina
la\u0301mpara
lana
lancha
langosta
lanza
la\u0301piz
largo
larva
la\u0301stima
lata
la\u0301tex
latir
laurel
lavar
lazo
leal
leccio\u0301n
leche
lector
leer
legio\u0301n
legumbre
lejano
lengua
lento
len\u0303a
leo\u0301n
leopardo
lesio\u0301n
letal
letra
leve
leyenda
libertad
libro
licor
li\u0301der
lidiar
lienzo
liga
ligero
lima
li\u0301mite
limo\u0301n
limpio
lince
lindo
li\u0301nea
lingote
lino
linterna
li\u0301quido
liso
lista
litera
litio
litro
llaga
llama
llanto
llave
llegar
llenar
llevar
llorar
llover
lluvia
lobo
locio\u0301n
loco
locura
lo\u0301gica
logro
lombriz
lomo
lonja
lote
lucha
lucir
lugar
lujo
luna
lunes
lupa
lustro
luto
luz
maceta
macho
madera
madre
maduro
maestro
mafia
magia
mago
mai\u0301z
maldad
maleta
malla
malo
mama\u0301
mambo
mamut
manco
mando
manejar
manga
maniqui\u0301
manjar
mano
manso
manta
man\u0303ana
mapa
ma\u0301quina
mar
marco
marea
marfil
margen
marido
ma\u0301rmol
marro\u0301n
martes
marzo
masa
ma\u0301scara
masivo
matar
materia
matiz
matriz
ma\u0301ximo
mayor
mazorca
mecha
medalla
medio
me\u0301dula
mejilla
mejor
melena
melo\u0301n
memoria
menor
mensaje
mente
menu\u0301
mercado
merengue
me\u0301rito
mes
meso\u0301n
meta
meter
me\u0301todo
metro
mezcla
miedo
miel
miembro
miga
mil
milagro
militar
millo\u0301n
mimo
mina
minero
mi\u0301nimo
minuto
miope
mirar
misa
miseria
misil
mismo
mitad
mito
mochila
mocio\u0301n
moda
modelo
moho
mojar
molde
moler
molino
momento
momia
monarca
moneda
monja
monto
mon\u0303o
morada
morder
moreno
morir
morro
morsa
mortal
mosca
mostrar
motivo
mover
mo\u0301vil
mozo
mucho
mudar
mueble
muela
muerte
muestra
mugre
mujer
mula
muleta
multa
mundo
mun\u0303eca
mural
muro
mu\u0301sculo
museo
musgo
mu\u0301sica
muslo
na\u0301car
nacio\u0301n
nadar
naipe
naranja
nariz
narrar
nasal
natal
nativo
natural
na\u0301usea
naval
nave
navidad
necio
ne\u0301ctar
negar
negocio
negro
neo\u0301n
nervio
neto
neutro
nevar
nevera
nicho
nido
niebla
nieto
nin\u0303ez
nin\u0303o
ni\u0301tido
nivel
nobleza
noche
no\u0301mina
noria
norma
norte
nota
noticia
novato
novela
novio
nube
nuca
nu\u0301cleo
nudillo
nudo
nuera
nueve
nuez
nulo
nu\u0301mero
nutria
oasis
obeso
obispo
objeto
obra
obrero
observar
obtener
obvio
oca
ocaso
oce\u0301ano
ochenta
ocho
ocio
ocre
octavo
octubre
oculto
ocupar
ocurrir
odiar
odio
odisea
oeste
ofensa
oferta
oficio
ofrecer
ogro
oi\u0301do
oi\u0301r
ojo
ola
oleada
olfato
olivo
olla
olmo
olor
olvido
ombligo
onda
onza
opaco
opcio\u0301n
o\u0301pera
opinar
oponer
optar
o\u0301ptica
opuesto
oracio\u0301n
orador
oral
o\u0301rbita
orca
orden
oreja
o\u0301rgano
orgi\u0301a
orgullo
oriente
origen
orilla
oro
orquesta
oruga
osadi\u0301a
oscuro
osezno
oso
ostra
oton\u0303o
otro
oveja
o\u0301vulo
o\u0301xido
oxi\u0301geno
oyente
ozono
pacto
padre
paella
pa\u0301gina
pago
pai\u0301s
pa\u0301jaro
palabra
palco
paleta
pa\u0301lido
palma
paloma
palpar
pan
panal
pa\u0301nico
pantera
pan\u0303uelo
papa\u0301
papel
papilla
paquete
parar
parcela
pared
parir
paro
pa\u0301rpado
parque
pa\u0301rrafo
parte
pasar
paseo
pasio\u0301n
paso
pasta
pata
patio
patria
pausa
pauta
pavo
payaso
peato\u0301n
pecado
pecera
pecho
pedal
pedir
pegar
peine
pelar
peldan\u0303o
pelea
peligro
pellejo
pelo
peluca
pena
pensar
pen\u0303o\u0301n
peo\u0301n
peor
pepino
pequen\u0303o
pera
percha
perder
pereza
perfil
perico
perla
permiso
perro
persona
pesa
pesca
pe\u0301simo
pestan\u0303a
pe\u0301talo
petro\u0301leo
pez
pezun\u0303a
picar
picho\u0301n
pie
piedra
pierna
pieza
pijama
pilar
piloto
pimienta
pino
pintor
pinza
pin\u0303a
piojo
pipa
pirata
pisar
piscina
piso
pista
pito\u0301n
pizca
placa
plan
plata
playa
plaza
pleito
pleno
plomo
pluma
plural
pobre
poco
poder
podio
poema
poesi\u0301a
poeta
polen
polici\u0301a
pollo
polvo
pomada
pomelo
pomo
pompa
poner
porcio\u0301n
portal
posada
poseer
posible
poste
potencia
potro
pozo
prado
precoz
pregunta
premio
prensa
preso
previo
primo
pri\u0301ncipe
prisio\u0301n
privar
proa
probar
proceso
producto
proeza
profesor
programa
prole
promesa
pronto
propio
pro\u0301ximo
prueba
pu\u0301blico
puchero
pudor
pueblo
puerta
puesto
pulga
pulir
pulmo\u0301n
pulpo
pulso
puma
punto
pun\u0303al
pun\u0303o
pupa
pupila
pure\u0301
quedar
queja
quemar
querer
queso
quieto
qui\u0301mica
quince
quitar
ra\u0301bano
rabia
rabo
racio\u0301n
radical
rai\u0301z
rama
rampa
rancho
rango
rapaz
ra\u0301pido
rapto
rasgo
raspa
rato
rayo
raza
razo\u0301n
reaccio\u0301n
realidad
reban\u0303o
rebote
recaer
receta
rechazo
recoger
recreo
recto
recurso
red
redondo
reducir
reflejo
reforma
refra\u0301n
refugio
regalo
regir
regla
regreso
rehe\u0301n
reino
rei\u0301r
reja
relato
relevo
relieve
relleno
reloj
remar
remedio
remo
rencor
rendir
renta
reparto
repetir
reposo
reptil
res
rescate
resina
respeto
resto
resumen
retiro
retorno
retrato
reunir
reve\u0301s
revista
rey
rezar
rico
riego
rienda
riesgo
rifa
ri\u0301gido
rigor
rinco\u0301n
rin\u0303o\u0301n
ri\u0301o
riqueza
risa
ritmo
rito
rizo
roble
roce
rociar
rodar
rodeo
rodilla
roer
rojizo
rojo
romero
romper
ron
ronco
ronda
ropa
ropero
rosa
rosca
rostro
rotar
rubi\u0301
rubor
rudo
rueda
rugir
ruido
ruina
ruleta
rulo
rumbo
rumor
ruptura
ruta
rutina
sa\u0301bado
saber
sabio
sable
sacar
sagaz
sagrado
sala
saldo
salero
salir
salmo\u0301n
salo\u0301n
salsa
salto
salud
salvar
samba
sancio\u0301n
sandi\u0301a
sanear
sangre
sanidad
sano
santo
sapo
saque
sardina
sarte\u0301n
sastre
sata\u0301n
sauna
saxofo\u0301n
seccio\u0301n
seco
secreto
secta
sed
seguir
seis
sello
selva
semana
semilla
senda
sensor
sen\u0303al
sen\u0303or
separar
sepia
sequi\u0301a
ser
serie
sermo\u0301n
servir
sesenta
sesio\u0301n
seta
setenta
severo
sexo
sexto
sidra
siesta
siete
siglo
signo
si\u0301laba
silbar
silencio
silla
si\u0301mbolo
simio
sirena
sistema
sitio
situar
sobre
socio
sodio
sol
solapa
soldado
soledad
so\u0301lido
soltar
solucio\u0301n
sombra
sondeo
sonido
sonoro
sonrisa
sopa
soplar
soporte
sordo
sorpresa
sorteo
soste\u0301n
so\u0301tano
suave
subir
suceso
sudor
suegra
suelo
suen\u0303o
suerte
sufrir
sujeto
sulta\u0301n
sumar
superar
suplir
suponer
supremo
sur
surco
suren\u0303o
surgir
susto
sutil
tabaco
tabique
tabla
tabu\u0301
taco
tacto
tajo
talar
talco
talento
talla
talo\u0301n
taman\u0303o
tambor
tango
tanque
tapa
tapete
tapia
tapo\u0301n
taquilla
tarde
tarea
tarifa
tarjeta
tarot
tarro
tarta
tatuaje
tauro
taza
tazo\u0301n
teatro
techo
tecla
te\u0301cnica
tejado
tejer
tejido
tela
tele\u0301fono
tema
temor
templo
tenaz
tender
tener
tenis
tenso
teori\u0301a
terapia
terco
te\u0301rmino
ternura
terror
tesis
tesoro
testigo
tetera
texto
tez
tibio
tiburo\u0301n
tiempo
tienda
tierra
tieso
tigre
tijera
tilde
timbre
ti\u0301mido
timo
tinta
ti\u0301o
ti\u0301pico
tipo
tira
tiro\u0301n
tita\u0301n
ti\u0301tere
ti\u0301tulo
tiza
toalla
tobillo
tocar
tocino
todo
toga
toldo
tomar
tono
tonto
topar
tope
toque
to\u0301rax
torero
tormenta
torneo
toro
torpedo
torre
torso
tortuga
tos
tosco
toser
to\u0301xico
trabajo
tractor
traer
tra\u0301fico
trago
traje
tramo
trance
trato
trauma
trazar
tre\u0301bol
tregua
treinta
tren
trepar
tres
tribu
trigo
tripa
triste
triunfo
trofeo
trompa
tronco
tropa
trote
trozo
truco
trueno
trufa
tuberi\u0301a
tubo
tuerto
tumba
tumor
tu\u0301nel
tu\u0301nica
turbina
turismo
turno
tutor
ubicar
u\u0301lcera
umbral
unidad
unir
universo
uno
untar
un\u0303a
urbano
urbe
urgente
urna
usar
usuario
u\u0301til
utopi\u0301a
uva
vaca
vaci\u0301o
vacuna
vagar
vago
vaina
vajilla
vale
va\u0301lido
valle
valor
va\u0301lvula
vampiro
vara
variar
varo\u0301n
vaso
vecino
vector
vehi\u0301culo
veinte
vejez
vela
velero
veloz
vena
vencer
venda
veneno
vengar
venir
venta
venus
ver
verano
verbo
verde
vereda
verja
verso
verter
vi\u0301a
viaje
vibrar
vicio
vi\u0301ctima
vida
vi\u0301deo
vidrio
viejo
viernes
vigor
vil
villa
vinagre
vino
vin\u0303edo
violi\u0301n
viral
virgo
virtud
visor
vi\u0301spera
vista
vitamina
viudo
vivaz
vivero
vivir
vivo
volca\u0301n
volumen
volver
voraz
votar
voto
voz
vuelo
vulgar
yacer
yate
yegua
yema
yerno
yeso
yodo
yoga
yogur
zafiro
zanja
zapato
zarza
zona
zorro
zumo
zurdo`.split("\n");
// node_modules/@scure/bip39/esm/wordlists/traditional-chinese.js
var wordlist9 = `\u7684
\u4E00
\u662F
\u5728
\u4E0D
\u4E86
\u6709
\u548C
\u4EBA
\u9019
\u4E2D
\u5927
\u70BA
\u4E0A
\u500B
\u570B
\u6211
\u4EE5
\u8981
\u4ED6
\u6642
\u4F86
\u7528
\u5011
\u751F
\u5230
\u4F5C
\u5730
\u65BC
\u51FA
\u5C31
\u5206
\u5C0D
\u6210
\u6703
\u53EF
\u4E3B
\u767C
\u5E74
\u52D5
\u540C
\u5DE5
\u4E5F
\u80FD
\u4E0B
\u904E
\u5B50
\u8AAA
\u7522
\u7A2E
\u9762
\u800C
\u65B9
\u5F8C
\u591A
\u5B9A
\u884C
\u5B78
\u6CD5
\u6240
\u6C11
\u5F97
\u7D93
\u5341
\u4E09
\u4E4B
\u9032
\u8457
\u7B49
\u90E8
\u5EA6
\u5BB6
\u96FB
\u529B
\u88E1
\u5982
\u6C34
\u5316
\u9AD8
\u81EA
\u4E8C
\u7406
\u8D77
\u5C0F
\u7269
\u73FE
\u5BE6
\u52A0
\u91CF
\u90FD
\u5169
\u9AD4
\u5236
\u6A5F
\u7576
\u4F7F
\u9EDE
\u5F9E
\u696D
\u672C
\u53BB
\u628A
\u6027
\u597D
\u61C9
\u958B
\u5B83
\u5408
\u9084
\u56E0
\u7531
\u5176
\u4E9B
\u7136
\u524D
\u5916
\u5929
\u653F
\u56DB
\u65E5
\u90A3
\u793E
\u7FA9
\u4E8B
\u5E73
\u5F62
\u76F8
\u5168
\u8868
\u9593
\u6A23
\u8207
\u95DC
\u5404
\u91CD
\u65B0
\u7DDA
\u5167
\u6578
\u6B63
\u5FC3
\u53CD
\u4F60
\u660E
\u770B
\u539F
\u53C8
\u9EBC
\u5229
\u6BD4
\u6216
\u4F46
\u8CEA
\u6C23
\u7B2C
\u5411
\u9053
\u547D
\u6B64
\u8B8A
\u689D
\u53EA
\u6C92
\u7D50
\u89E3
\u554F
\u610F
\u5EFA
\u6708
\u516C
\u7121
\u7CFB
\u8ECD
\u5F88
\u60C5
\u8005
\u6700
\u7ACB
\u4EE3
\u60F3
\u5DF2
\u901A
\u4E26
\u63D0
\u76F4
\u984C
\u9EE8
\u7A0B
\u5C55
\u4E94
\u679C
\u6599
\u8C61
\u54E1
\u9769
\u4F4D
\u5165
\u5E38
\u6587
\u7E3D
\u6B21
\u54C1
\u5F0F
\u6D3B
\u8A2D
\u53CA
\u7BA1
\u7279
\u4EF6
\u9577
\u6C42
\u8001
\u982D
\u57FA
\u8CC7
\u908A
\u6D41
\u8DEF
\u7D1A
\u5C11
\u5716
\u5C71
\u7D71
\u63A5
\u77E5
\u8F03
\u5C07
\u7D44
\u898B
\u8A08
\u5225
\u5979
\u624B
\u89D2
\u671F
\u6839
\u8AD6
\u904B
\u8FB2
\u6307
\u5E7E
\u4E5D
\u5340
\u5F37
\u653E
\u6C7A
\u897F
\u88AB
\u5E79
\u505A
\u5FC5
\u6230
\u5148
\u56DE
\u5247
\u4EFB
\u53D6
\u64DA
\u8655
\u968A
\u5357
\u7D66
\u8272
\u5149
\u9580
\u5373
\u4FDD
\u6CBB
\u5317
\u9020
\u767E
\u898F
\u71B1
\u9818
\u4E03
\u6D77
\u53E3
\u6771
\u5C0E
\u5668
\u58D3
\u5FD7
\u4E16
\u91D1
\u589E
\u722D
\u6FDF
\u968E
\u6CB9
\u601D
\u8853
\u6975
\u4EA4
\u53D7
\u806F
\u4EC0
\u8A8D
\u516D
\u5171
\u6B0A
\u6536
\u8B49
\u6539
\u6E05
\u7F8E
\u518D
\u63A1
\u8F49
\u66F4
\u55AE
\u98A8
\u5207
\u6253
\u767D
\u6559
\u901F
\u82B1
\u5E36
\u5B89
\u5834
\u8EAB
\u8ECA
\u4F8B
\u771F
\u52D9
\u5177
\u842C
\u6BCF
\u76EE
\u81F3
\u9054
\u8D70
\u7A4D
\u793A
\u8B70
\u8072
\u5831
\u9B25
\u5B8C
\u985E
\u516B
\u96E2
\u83EF
\u540D
\u78BA
\u624D
\u79D1
\u5F35
\u4FE1
\u99AC
\u7BC0
\u8A71
\u7C73
\u6574
\u7A7A
\u5143
\u6CC1
\u4ECA
\u96C6
\u6EAB
\u50B3
\u571F
\u8A31
\u6B65
\u7FA4
\u5EE3
\u77F3
\u8A18
\u9700
\u6BB5
\u7814
\u754C
\u62C9
\u6797
\u5F8B
\u53EB
\u4E14
\u7A76
\u89C0
\u8D8A
\u7E54
\u88DD
\u5F71
\u7B97
\u4F4E
\u6301
\u97F3
\u773E
\u66F8
\u5E03
\u590D
\u5BB9
\u5152
\u9808
\u969B
\u5546
\u975E
\u9A57
\u9023
\u65B7
\u6DF1
\u96E3
\u8FD1
\u7926
\u5343
\u9031
\u59D4
\u7D20
\u6280
\u5099
\u534A
\u8FA6
\u9752
\u7701
\u5217
\u7FD2
\u97FF
\u7D04
\u652F
\u822C
\u53F2
\u611F
\u52DE
\u4FBF
\u5718
\u5F80
\u9178
\u6B77
\u5E02
\u514B
\u4F55
\u9664
\u6D88
\u69CB
\u5E9C
\u7A31
\u592A
\u6E96
\u7CBE
\u503C
\u865F
\u7387
\u65CF
\u7DAD
\u5283
\u9078
\u6A19
\u5BEB
\u5B58
\u5019
\u6BDB
\u89AA
\u5FEB
\u6548
\u65AF
\u9662
\u67E5
\u6C5F
\u578B
\u773C
\u738B
\u6309
\u683C
\u990A
\u6613
\u7F6E
\u6D3E
\u5C64
\u7247
\u59CB
\u537B
\u5C08
\u72C0
\u80B2
\u5EE0
\u4EAC
\u8B58
\u9069
\u5C6C
\u5713
\u5305
\u706B
\u4F4F
\u8ABF
\u6EFF
\u7E23
\u5C40
\u7167
\u53C3
\u7D05
\u7D30
\u5F15
\u807D
\u8A72
\u9435
\u50F9
\u56B4
\u9996
\u5E95
\u6DB2
\u5B98
\u5FB7
\u96A8
\u75C5
\u8607
\u5931
\u723E
\u6B7B
\u8B1B
\u914D
\u5973
\u9EC3
\u63A8
\u986F
\u8AC7
\u7F6A
\u795E
\u85DD
\u5462
\u5E2D
\u542B
\u4F01
\u671B
\u5BC6
\u6279
\u71DF
\u9805
\u9632
\u8209
\u7403
\u82F1
\u6C27
\u52E2
\u544A
\u674E
\u53F0
\u843D
\u6728
\u5E6B
\u8F2A
\u7834
\u4E9E
\u5E2B
\u570D
\u6CE8
\u9060
\u5B57
\u6750
\u6392
\u4F9B
\u6CB3
\u614B
\u5C01
\u53E6
\u65BD
\u6E1B
\u6A39
\u6EB6
\u600E
\u6B62
\u6848
\u8A00
\u58EB
\u5747
\u6B66
\u56FA
\u8449
\u9B5A
\u6CE2
\u8996
\u50C5
\u8CBB
\u7DCA
\u611B
\u5DE6
\u7AE0
\u65E9
\u671D
\u5BB3
\u7E8C
\u8F15
\u670D
\u8A66
\u98DF
\u5145
\u5175
\u6E90
\u5224
\u8B77
\u53F8
\u8DB3
\u67D0
\u7DF4
\u5DEE
\u81F4
\u677F
\u7530
\u964D
\u9ED1
\u72AF
\u8CA0
\u64CA
\u8303
\u7E7C
\u8208
\u4F3C
\u9918
\u5805
\u66F2
\u8F38
\u4FEE
\u6545
\u57CE
\u592B
\u5920
\u9001
\u7B46
\u8239
\u4F54
\u53F3
\u8CA1
\u5403
\u5BCC
\u6625
\u8077
\u89BA
\u6F22
\u756B
\u529F
\u5DF4
\u8DDF
\u96D6
\u96DC
\u98DB
\u6AA2
\u5438
\u52A9
\u6607
\u967D
\u4E92
\u521D
\u5275
\u6297
\u8003
\u6295
\u58DE
\u7B56
\u53E4
\u5F91
\u63DB
\u672A
\u8DD1
\u7559
\u92FC
\u66FE
\u7AEF
\u8CAC
\u7AD9
\u7C21
\u8FF0
\u9322
\u526F
\u76E1
\u5E1D
\u5C04
\u8349
\u885D
\u627F
\u7368
\u4EE4
\u9650
\u963F
\u5BA3
\u74B0
\u96D9
\u8ACB
\u8D85
\u5FAE
\u8B93
\u63A7
\u5DDE
\u826F
\u8EF8
\u627E
\u5426
\u7D00
\u76CA
\u4F9D
\u512A
\u9802
\u790E
\u8F09
\u5012
\u623F
\u7A81
\u5750
\u7C89
\u6575
\u7565
\u5BA2
\u8881
\u51B7
\u52DD
\u7D55
\u6790
\u584A
\u5291
\u6E2C
\u7D72
\u5354
\u8A34
\u5FF5
\u9673
\u4ECD
\u7F85
\u9E7D
\u53CB
\u6D0B
\u932F
\u82E6
\u591C
\u5211
\u79FB
\u983B
\u9010
\u9760
\u6DF7
\u6BCD
\u77ED
\u76AE
\u7D42
\u805A
\u6C7D
\u6751
\u96F2
\u54EA
\u65E2
\u8DDD
\u885B
\u505C
\u70C8
\u592E
\u5BDF
\u71D2
\u8FC5
\u5883
\u82E5
\u5370
\u6D32
\u523B
\u62EC
\u6FC0
\u5B54
\u641E
\u751A
\u5BA4
\u5F85
\u6838
\u6821
\u6563
\u4FB5
\u5427
\u7532
\u904A
\u4E45
\u83DC
\u5473
\u820A
\u6A21
\u6E56
\u8CA8
\u640D
\u9810
\u963B
\u6BEB
\u666E
\u7A69
\u4E59
\u5ABD
\u690D
\u606F
\u64F4
\u9280
\u8A9E
\u63EE
\u9152
\u5B88
\u62FF
\u5E8F
\u7D19
\u91AB
\u7F3A
\u96E8
\u55CE
\u91DD
\u5289
\u554A
\u6025
\u5531
\u8AA4
\u8A13
\u9858
\u5BE9
\u9644
\u7372
\u8336
\u9BAE
\u7CE7
\u65A4
\u5B69
\u812B
\u786B
\u80A5
\u5584
\u9F8D
\u6F14
\u7236
\u6F38
\u8840
\u6B61
\u68B0
\u638C
\u6B4C
\u6C99
\u525B
\u653B
\u8B02
\u76FE
\u8A0E
\u665A
\u7C92
\u4E82
\u71C3
\u77DB
\u4E4E
\u6BBA
\u85E5
\u5BE7
\u9B6F
\u8CB4
\u9418
\u7164
\u8B80
\u73ED
\u4F2F
\u9999
\u4ECB
\u8FEB
\u53E5
\u8C50
\u57F9
\u63E1
\u862D
\u64D4
\u5F26
\u86CB
\u6C89
\u5047
\u7A7F
\u57F7
\u7B54
\u6A02
\u8AB0
\u9806
\u7159
\u7E2E
\u5FB5
\u81C9
\u559C
\u677E
\u8173
\u56F0
\u7570
\u514D
\u80CC
\u661F
\u798F
\u8CB7
\u67D3
\u4E95
\u6982
\u6162
\u6015
\u78C1
\u500D
\u7956
\u7687
\u4FC3
\u975C
\u88DC
\u8A55
\u7FFB
\u8089
\u8E10
\u5C3C
\u8863
\u5BEC
\u63DA
\u68C9
\u5E0C
\u50B7
\u64CD
\u5782
\u79CB
\u5B9C
\u6C2B
\u5957
\u7763
\u632F
\u67B6
\u4EAE
\u672B
\u61B2
\u6176
\u7DE8
\u725B
\u89F8
\u6620
\u96F7
\u92B7
\u8A69
\u5EA7
\u5C45
\u6293
\u88C2
\u80DE
\u547C
\u5A18
\u666F
\u5A01
\u7DA0
\u6676
\u539A
\u76DF
\u8861
\u96DE
\u5B6B
\u5EF6
\u5371
\u81A0
\u5C4B
\u9109
\u81E8
\u9678
\u9867
\u6389
\u5440
\u71C8
\u6B72
\u63AA
\u675F
\u8010
\u5287
\u7389
\u8D99
\u8DF3
\u54E5
\u5B63
\u8AB2
\u51F1
\u80E1
\u984D
\u6B3E
\u7D39
\u5377
\u9F4A
\u5049
\u84B8
\u6B96
\u6C38
\u5B97
\u82D7
\u5DDD
\u7210
\u5CA9
\u5F31
\u96F6
\u694A
\u594F
\u6CBF
\u9732
\u687F
\u63A2
\u6ED1
\u93AE
\u98EF
\u6FC3
\u822A
\u61F7
\u8D95
\u5EAB
\u596A
\u4F0A
\u9748
\u7A05
\u9014
\u6EC5
\u8CFD
\u6B78
\u53EC
\u9F13
\u64AD
\u76E4
\u88C1
\u96AA
\u5EB7
\u552F
\u9304
\u83CC
\u7D14
\u501F
\u7CD6
\u84CB
\u6A6B
\u7B26
\u79C1
\u52AA
\u5802
\u57DF
\u69CD
\u6F64
\u5E45
\u54C8
\u7ADF
\u719F
\u87F2
\u6FA4
\u8166
\u58E4
\u78B3
\u6B50
\u904D
\u5074
\u5BE8
\u6562
\u5FB9
\u616E
\u659C
\u8584
\u5EAD
\u7D0D
\u5F48
\u98FC
\u4F38
\u6298
\u9EA5
\u6FD5
\u6697
\u8377
\u74E6
\u585E
\u5E8A
\u7BC9
\u60E1
\u6236
\u8A2A
\u5854
\u5947
\u900F
\u6881
\u5200
\u65CB
\u8DE1
\u5361
\u6C2F
\u9047
\u4EFD
\u6BD2
\u6CE5
\u9000
\u6D17
\u64FA
\u7070
\u5F69
\u8CE3
\u8017
\u590F
\u64C7
\u5FD9
\u9285
\u737B
\u786C
\u4E88
\u7E41
\u5708
\u96EA
\u51FD
\u4EA6
\u62BD
\u7BC7
\u9663
\u9670
\u4E01
\u5C3A
\u8FFD
\u5806
\u96C4
\u8FCE
\u6CDB
\u7238
\u6A13
\u907F
\u8B00
\u5678
\u91CE
\u8C6C
\u65D7
\u7D2F
\u504F
\u5178
\u9928
\u7D22
\u79E6
\u8102
\u6F6E
\u723A
\u8C46
\u5FFD
\u6258
\u9A5A
\u5851
\u907A
\u6108
\u6731
\u66FF
\u7E96
\u7C97
\u50BE
\u5C1A
\u75DB
\u695A
\u8B1D
\u596E
\u8CFC
\u78E8
\u541B
\u6C60
\u65C1
\u788E
\u9AA8
\u76E3
\u6355
\u5F1F
\u66B4
\u5272
\u8CAB
\u6B8A
\u91CB
\u8A5E
\u4EA1
\u58C1
\u9813
\u5BF6
\u5348
\u5875
\u805E
\u63ED
\u70AE
\u6B98
\u51AC
\u6A4B
\u5A66
\u8B66
\u7D9C
\u62DB
\u5433
\u4ED8
\u6D6E
\u906D
\u5F90
\u60A8
\u6416
\u8C37
\u8D0A
\u7BB1
\u9694
\u8A02
\u7537
\u5439
\u5712
\u7D1B
\u5510
\u6557
\u5B8B
\u73BB
\u5DE8
\u8015
\u5766
\u69AE
\u9589
\u7063
\u9375
\u51E1
\u99D0
\u934B
\u6551
\u6069
\u525D
\u51DD
\u9E7C
\u9F52
\u622A
\u7149
\u9EBB
\u7D21
\u7981
\u5EE2
\u76DB
\u7248
\u7DE9
\u6DE8
\u775B
\u660C
\u5A5A
\u6D89
\u7B52
\u5634
\u63D2
\u5CB8
\u6717
\u838A
\u8857
\u85CF
\u59D1
\u8CBF
\u8150
\u5974
\u5566
\u6163
\u4E58
\u5925
\u6062
\u52FB
\u7D17
\u624E
\u8FAF
\u8033
\u5F6A
\u81E3
\u5104
\u7483
\u62B5
\u8108
\u79C0
\u85A9
\u4FC4
\u7DB2
\u821E
\u5E97
\u5674
\u7E31
\u5BF8
\u6C57
\u639B
\u6D2A
\u8CC0
\u9583
\u67EC
\u7206
\u70EF
\u6D25
\u7A3B
\u7246
\u8EDF
\u52C7
\u50CF
\u6EFE
\u5398
\u8499
\u82B3
\u80AF
\u5761
\u67F1
\u76EA
\u817F
\u5100
\u65C5
\u5C3E
\u8ECB
\u51B0
\u8CA2
\u767B
\u9ECE
\u524A
\u947D
\u52D2
\u9003
\u969C
\u6C28
\u90ED
\u5CF0
\u5E63
\u6E2F
\u4F0F
\u8ECC
\u755D
\u7562
\u64E6
\u83AB
\u523A
\u6D6A
\u79D8
\u63F4
\u682A
\u5065
\u552E
\u80A1
\u5CF6
\u7518
\u6CE1
\u7761
\u7AE5
\u9444
\u6E6F
\u95A5
\u4F11
\u532F
\u820D
\u7267
\u7E5E
\u70B8
\u54F2
\u78F7
\u7E3E
\u670B
\u6DE1
\u5C16
\u555F
\u9677
\u67F4
\u5448
\u5F92
\u984F
\u6DDA
\u7A0D
\u5FD8
\u6CF5
\u85CD
\u62D6
\u6D1E
\u6388
\u93E1
\u8F9B
\u58EF
\u92D2
\u8CA7
\u865B
\u5F4E
\u6469
\u6CF0
\u5E7C
\u5EF7
\u5C0A
\u7A97
\u7DB1
\u5F04
\u96B8
\u7591
\u6C0F
\u5BAE
\u59D0
\u9707
\u745E
\u602A
\u5C24
\u7434
\u5FAA
\u63CF
\u819C
\u9055
\u593E
\u8170
\u7DE3
\u73E0
\u7AAE
\u68EE
\u679D
\u7AF9
\u6E9D
\u50AC
\u7E69
\u61B6
\u90A6
\u5269
\u5E78
\u6F3F
\u6B04
\u64C1
\u7259
\u8CAF
\u79AE
\u6FFE
\u9209
\u7D0B
\u7F77
\u62CD
\u54B1
\u558A
\u8896
\u57C3
\u52E4
\u7F70
\u7126
\u6F5B
\u4F0D
\u58A8
\u6B32
\u7E2B
\u59D3
\u520A
\u98FD
\u4EFF
\u734E
\u92C1
\u9B3C
\u9E97
\u8DE8
\u9ED8
\u6316
\u93C8
\u6383
\u559D
\u888B
\u70AD
\u6C61
\u5E55
\u8AF8
\u5F27
\u52F5
\u6885
\u5976
\u6F54
\u707D
\u821F
\u9451
\u82EF
\u8A1F
\u62B1
\u6BC0
\u61C2
\u5BD2
\u667A
\u57D4
\u5BC4
\u5C46
\u8E8D
\u6E21
\u6311
\u4E39
\u8271
\u8C9D
\u78B0
\u62D4
\u7239
\u6234
\u78BC
\u5922
\u82BD
\u7194
\u8D64
\u6F01
\u54ED
\u656C
\u9846
\u5954
\u925B
\u4EF2
\u864E
\u7A00
\u59B9
\u4E4F
\u73CD
\u7533
\u684C
\u9075
\u5141
\u9686
\u87BA
\u5009
\u9B4F
\u92B3
\u66C9
\u6C2E
\u517C
\u96B1
\u7919
\u8D6B
\u64A5
\u5FE0
\u8085
\u7F38
\u727D
\u6436
\u535A
\u5DE7
\u6BBC
\u5144
\u675C
\u8A0A
\u8AA0
\u78A7
\u7965
\u67EF
\u9801
\u5DE1
\u77E9
\u60B2
\u704C
\u9F61
\u502B
\u7968
\u5C0B
\u6842
\u92EA
\u8056
\u6050
\u6070
\u912D
\u8DA3
\u62AC
\u8352
\u9A30
\u8CBC
\u67D4
\u6EF4
\u731B
\u95CA
\u8F1B
\u59BB
\u586B
\u64A4
\u5132
\u7C3D
\u9B27
\u64FE
\u7D2B
\u7802
\u905E
\u6232
\u540A
\u9676
\u4F10
\u9935
\u7642
\u74F6
\u5A46
\u64AB
\u81C2
\u6478
\u5FCD
\u8766
\u881F
\u9130
\u80F8
\u978F
\u64E0
\u5076
\u68C4
\u69FD
\u52C1
\u4E73
\u9127
\u5409
\u4EC1
\u721B
\u78DA
\u79DF
\u70CF
\u8266
\u4F34
\u74DC
\u6DFA
\u4E19
\u66AB
\u71E5
\u6A61
\u67F3
\u8FF7
\u6696
\u724C
\u79E7
\u81BD
\u8A73
\u7C27
\u8E0F
\u74F7
\u8B5C
\u5446
\u8CD3
\u7CCA
\u6D1B
\u8F1D
\u61A4
\u7AF6
\u9699
\u6012
\u7C98
\u4E43
\u7DD2
\u80A9
\u7C4D
\u654F
\u5857
\u7199
\u7686
\u5075
\u61F8
\u6398
\u4EAB
\u7CFE
\u9192
\u72C2
\u9396
\u6DC0
\u6068
\u7272
\u9738
\u722C
\u8CDE
\u9006
\u73A9
\u9675
\u795D
\u79D2
\u6D59
\u8C8C
\u5F79
\u5F7C
\u6089
\u9D28
\u8DA8
\u9CF3
\u6668
\u755C
\u8F29
\u79E9
\u5375
\u7F72
\u68AF
\u708E
\u7058
\u68CB
\u9A45
\u7BE9
\u5CFD
\u5192
\u5565
\u58FD
\u8B6F
\u6D78
\u6CC9
\u5E3D
\u9072
\u77FD
\u7586
\u8CB8
\u6F0F
\u7A3F
\u51A0
\u5AE9
\u8105
\u82AF
\u7262
\u53DB
\u8755
\u5967
\u9CF4
\u5DBA
\u7F8A
\u6191
\u4E32
\u5858
\u7E6A
\u9175
\u878D
\u76C6
\u932B
\u5EDF
\u7C4C
\u51CD
\u8F14
\u651D
\u8972
\u7B4B
\u62D2
\u50DA
\u65F1
\u9240
\u9CE5
\u6F06
\u6C88
\u7709
\u758F
\u6DFB
\u68D2
\u7A57
\u785D
\u97D3
\u903C
\u626D
\u50D1
\u6DBC
\u633A
\u7897
\u683D
\u7092
\u676F
\u60A3
\u993E
\u52F8
\u8C6A
\u907C
\u52C3
\u9D3B
\u65E6
\u540F
\u62DC
\u72D7
\u57CB
\u8F25
\u63A9
\u98F2
\u642C
\u7F75
\u8FAD
\u52FE
\u6263
\u4F30
\u8523
\u7D68
\u9727
\u4E08
\u6735
\u59C6
\u64EC
\u5B87
\u8F2F
\u965D
\u96D5
\u511F
\u84C4
\u5D07
\u526A
\u5021
\u5EF3
\u54AC
\u99DB
\u85AF
\u5237
\u65A5
\u756A
\u8CE6
\u5949
\u4F5B
\u6F86
\u6F2B
\u66FC
\u6247
\u9223
\u6843
\u6276
\u4ED4
\u8FD4
\u4FD7
\u8667
\u8154
\u978B
\u68F1
\u8986
\u6846
\u6084
\u53D4
\u649E
\u9A19
\u52D8
\u65FA
\u6CB8
\u5B64
\u5410
\u5B5F
\u6E20
\u5C48
\u75BE
\u5999
\u60DC
\u4EF0
\u72E0
\u8139
\u8AE7
\u62CB
\u9EF4
\u6851
\u5D17
\u561B
\u8870
\u76DC
\u6EF2
\u81DF
\u8CF4
\u6E67
\u751C
\u66F9
\u95B1
\u808C
\u54E9
\u53B2
\u70F4
\u7DEF
\u6BC5
\u6628
\u507D
\u75C7
\u716E
\u5606
\u91D8
\u642D
\u8396
\u7C60
\u9177
\u5077
\u5F13
\u9310
\u6046
\u5091
\u5751
\u9F3B
\u7FFC
\u7DB8
\u6558
\u7344
\u902E
\u7F50
\u7D61
\u68DA
\u6291
\u81A8
\u852C
\u5BFA
\u9A5F
\u7A46
\u51B6
\u67AF
\u518A
\u5C4D
\u51F8
\u7D33
\u576F
\u72A7
\u7130
\u8F5F
\u6B23
\u6649
\u7626
\u79A6
\u9320
\u9326
\u55AA
\u65EC
\u935B
\u58DF
\u641C
\u64B2
\u9080
\u4EAD
\u916F
\u9081
\u8212
\u8106
\u9176
\u9592
\u6182
\u915A
\u9811
\u7FBD
\u6F32
\u5378
\u4ED7
\u966A
\u95E2
\u61F2
\u676D
\u59DA
\u809A
\u6349
\u98C4
\u6F02
\u6606
\u6B3A
\u543E
\u90CE
\u70F7
\u6C41
\u5475
\u98FE
\u856D
\u96C5
\u90F5
\u9077
\u71D5
\u6492
\u59FB
\u8D74
\u5BB4
\u7169
\u50B5
\u5E33
\u6591
\u9234
\u65E8
\u9187
\u8463
\u9905
\u96DB
\u59FF
\u62CC
\u5085
\u8179
\u59A5
\u63C9
\u8CE2
\u62C6
\u6B6A
\u8461
\u80FA
\u4E1F
\u6D69
\u5FBD
\u6602
\u588A
\u64CB
\u89BD
\u8CAA
\u6170
\u7E73
\u6C6A
\u614C
\u99AE
\u8AFE
\u59DC
\u8ABC
\u5147
\u52A3
\u8AA3
\u8000
\u660F
\u8EBA
\u76C8
\u9A0E
\u55AC
\u6EAA
\u53E2
\u76E7
\u62B9
\u60B6
\u8AEE
\u522E
\u99D5
\u7E9C
\u609F
\u6458
\u927A
\u64F2
\u9817
\u5E7B
\u67C4
\u60E0
\u6158
\u4F73
\u4EC7
\u81D8
\u7AA9
\u6ECC
\u528D
\u77A7
\u5821
\u6F51
\u8525
\u7F69
\u970D
\u6488
\u80CE
\u84BC
\u6FF1
\u5006
\u6345
\u6E58
\u780D
\u971E
\u90B5
\u8404
\u760B
\u6DEE
\u9042
\u718A
\u7CDE
\u70D8
\u5BBF
\u6A94
\u6208
\u99C1
\u5AC2
\u88D5
\u5F99
\u7BAD
\u6350
\u8178
\u6490
\u66EC
\u8FA8
\u6BBF
\u84EE
\u6524
\u652A
\u91AC
\u5C4F
\u75AB
\u54C0
\u8521
\u5835
\u6CAB
\u76BA
\u66A2
\u758A
\u95A3
\u840A
\u6572
\u8F44
\u9264
\u75D5
\u58E9
\u5DF7
\u9913
\u798D
\u4E18
\u7384
\u6E9C
\u66F0
\u908F
\u5F6D
\u5617
\u537F
\u59A8
\u8247
\u541E
\u97CB
\u6028
\u77EE
\u6B47`.split("\n");
// node_modules/viem/_esm/accounts/privateKeyToAccount.js
init_secp256k1();
init_toHex();

// node_modules/viem/_esm/accounts/toAccount.js
init_address();
init_isAddress();
function toAccount(source) {
  if (typeof source === "string") {
    if (!isAddress2(source, { strict: false }))
      throw new InvalidAddressError({ address: source });
    return {
      address: source,
      type: "json-rpc"
    };
  }
  if (!isAddress2(source.address, { strict: false }))
    throw new InvalidAddressError({ address: source.address });
  return {
    address: source.address,
    signMessage: source.signMessage,
    signTransaction: source.signTransaction,
    signTypedData: source.signTypedData,
    source: "custom",
    type: "local"
  };
}

// node_modules/viem/_esm/accounts/utils/sign.js
init_secp256k1();
init_toHex();
async function sign({ hash: hash3, privateKey }) {
  const { r, s, recovery } = secp256k1.sign(hash3.slice(2), privateKey.slice(2));
  return {
    r: toHex(r),
    s: toHex(s),
    v: recovery ? 28n : 27n,
    yParity: recovery
  };
}

// node_modules/viem/_esm/accounts/utils/signMessage.js
async function signMessage2({ message, privateKey }) {
  const signature = await sign({ hash: hashMessage(message), privateKey });
  return signatureToHex(signature);
}

// node_modules/viem/_esm/accounts/utils/signTransaction.js
init_keccak256();
async function signTransaction(parameters) {
  const { privateKey, transaction: transaction13, serializer = serializeTransaction } = parameters;
  const signableTransaction = (() => {
    if (transaction13.type === "eip4844")
      return {
        ...transaction13,
        sidecars: false
      };
    return transaction13;
  })();
  const signature = await sign({
    hash: keccak256(serializer(signableTransaction)),
    privateKey
  });
  return serializer(transaction13, signature);
}

// node_modules/viem/_esm/accounts/utils/signTypedData.js
async function signTypedData(parameters) {
  const { privateKey, ...typedData2 } = parameters;
  const signature = await sign({
    hash: hashTypedData(typedData2),
    privateKey
  });
  return signatureToHex(signature);
}

// node_modules/viem/_esm/accounts/privateKeyToAccount.js
function privateKeyToAccount(privateKey) {
  const publicKey = toHex(secp256k1.getPublicKey(privateKey.slice(2), false));
  const address10 = publicKeyToAddress(publicKey);
  const account2 = toAccount({
    address: address10,
    async signMessage({ message }) {
      return signMessage2({ message, privateKey });
    },
    async signTransaction(transaction13, { serializer } = {}) {
      return signTransaction({ privateKey, transaction: transaction13, serializer });
    },
    async signTypedData(typedData2) {
      return signTypedData({ ...typedData2, privateKey });
    }
  });
  return {
    ...account2,
    publicKey,
    source: "privateKey"
  };
}
// node_modules/permissionless/_esm/actions/public/getAccountNonce.js
var getAccountNonce = async (client, args) => {
  const { sender, entryPoint, key = BigInt(0) } = args;
  return await getAction(client, readContract, "readContract")({
    address: entryPoint,
    abi: [
      {
        inputs: [
          {
            name: "sender",
            type: "address"
          },
          {
            name: "key",
            type: "uint192"
          }
        ],
        name: "getNonce",
        outputs: [
          {
            name: "nonce",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "getNonce",
    args: [sender, key]
  });
};

// node_modules/permissionless/_esm/actions/public/getSenderAddress.js
class InvalidEntryPointError extends BaseError {
  constructor({ cause, entryPoint } = {}) {
    super(`The entry point address (\`entryPoint\`${entryPoint ? ` = ${entryPoint}` : ""}) is not a valid entry point. getSenderAddress did not revert with a SenderAddressResult error.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidEntryPointError"
    });
  }
}
var getSenderAddress = async (client, args) => {
  const { initCode, entryPoint, factory, factoryData } = args;
  if (!initCode && !factory && !factoryData) {
    throw new Error("Either `initCode` or `factory` and `factoryData` must be provided");
  }
  try {
    await getAction(client, simulateContract, "simulateContract")({
      address: entryPoint,
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address"
            }
          ],
          name: "SenderAddressResult",
          type: "error"
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "initCode",
              type: "bytes"
            }
          ],
          name: "getSenderAddress",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        }
      ],
      functionName: "getSenderAddress",
      args: [initCode || concat([factory, factoryData])]
    });
  } catch (e) {
    const err = e;
    if (err.cause.name === "ContractFunctionRevertedError") {
      const revertError = err.cause;
      const errorName = revertError.data?.errorName ?? "";
      if (errorName === "SenderAddressResult" && revertError.data?.args && revertError.data?.args[0]) {
        return revertError.data?.args[0];
      }
    }
    if (err.cause.name === "CallExecutionError") {
      const callExecutionError = err.cause;
      if (callExecutionError.cause.name === "RpcRequestError") {
        const revertError = callExecutionError.cause;
        const data4 = revertError.cause.data.split(" ")[1];
        const error = decodeErrorResult({
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "sender",
                  type: "address"
                }
              ],
              name: "SenderAddressResult",
              type: "error"
            }
          ],
          data: data4
        });
        return error.args[0];
      }
      if (callExecutionError.cause.name === "InvalidInputRpcError") {
        const revertError = callExecutionError.cause;
        const data4 = revertError.cause.data;
        const error = decodeErrorResult({
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "sender",
                  type: "address"
                }
              ],
              name: "SenderAddressResult",
              type: "error"
            }
          ],
          data: data4
        });
        return error.args[0];
      }
    }
    throw e;
  }
  throw new InvalidEntryPointError({ entryPoint });
};

// node_modules/permissionless/_esm/utils/deepHexlify.js
function deepHexlify(obj) {
  if (typeof obj === "function") {
    return;
  }
  if (obj == null || typeof obj === "string" || typeof obj === "boolean") {
    return obj;
  }
  if (typeof obj === "bigint") {
    return toHex(obj);
  }
  if (obj._isBigNumber != null || typeof obj !== "object") {
    return toHex(obj).replace(/^0x0/, "0x");
  }
  if (Array.isArray(obj)) {
    return obj.map((member) => deepHexlify(member));
  }
  return Object.keys(obj).reduce((set, key) => {
    set[key] = deepHexlify(obj[key]);
    return set;
  }, {});
}
var transactionReceiptStatus = {
  "0x0": "reverted",
  "0x1": "success"
};

// node_modules/permissionless/_esm/utils/getAddressFromInitCodeOrPaymasterAndData.js
function getAddressFromInitCodeOrPaymasterAndData(data4) {
  if (!data4) {
    return;
  }
  if (data4.length >= 42) {
    return getAddress(data4.slice(0, 42));
  }
  return;
}

// node_modules/permissionless/_esm/utils/getEntryPointVersion.js
function isUserOperationVersion06(entryPoint, _operation) {
  return getEntryPointVersion(entryPoint) === "v0.6";
}
var ENTRYPOINT_ADDRESS_V06 = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
var getEntryPointVersion = (entryPoint) => entryPoint === ENTRYPOINT_ADDRESS_V06 ? "v0.6" : "v0.7";

// node_modules/permissionless/_esm/utils/getUserOperationHash.js
var packUserOp = function({ userOperation, entryPoint: entryPointAddress }) {
  if (isUserOperationVersion06(entryPointAddress, userOperation)) {
    const hashedInitCode2 = keccak256(userOperation.initCode);
    const hashedCallData2 = keccak256(userOperation.callData);
    const hashedPaymasterAndData2 = keccak256(userOperation.paymasterAndData);
    return encodeAbiParameters([
      { type: "address" },
      { type: "uint256" },
      { type: "bytes32" },
      { type: "bytes32" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "uint256" },
      { type: "bytes32" }
    ], [
      userOperation.sender,
      userOperation.nonce,
      hashedInitCode2,
      hashedCallData2,
      userOperation.callGasLimit,
      userOperation.verificationGasLimit,
      userOperation.preVerificationGas,
      userOperation.maxFeePerGas,
      userOperation.maxPriorityFeePerGas,
      hashedPaymasterAndData2
    ]);
  }
  const hashedInitCode = keccak256(userOperation.factory && userOperation.factoryData ? concat([userOperation.factory, userOperation.factoryData]) : "0x");
  const hashedCallData = keccak256(userOperation.callData);
  const hashedPaymasterAndData = keccak256(userOperation.paymaster ? concat([
    userOperation.paymaster,
    pad(toHex(userOperation.paymasterVerificationGasLimit || BigInt(0)), {
      size: 16
    }),
    pad(toHex(userOperation.paymasterPostOpGasLimit || BigInt(0)), {
      size: 16
    }),
    userOperation.paymasterData || "0x"
  ]) : "0x");
  return encodeAbiParameters([
    { type: "address" },
    { type: "uint256" },
    { type: "bytes32" },
    { type: "bytes32" },
    { type: "bytes32" },
    { type: "uint256" },
    { type: "bytes32" },
    { type: "bytes32" }
  ], [
    userOperation.sender,
    userOperation.nonce,
    hashedInitCode,
    hashedCallData,
    concat([
      pad(toHex(userOperation.verificationGasLimit), {
        size: 16
      }),
      pad(toHex(userOperation.callGasLimit), { size: 16 })
    ]),
    userOperation.preVerificationGas,
    concat([
      pad(toHex(userOperation.maxPriorityFeePerGas), {
        size: 16
      }),
      pad(toHex(userOperation.maxFeePerGas), { size: 16 })
    ]),
    hashedPaymasterAndData
  ]);
};
var getUserOperationHash = ({ userOperation, entryPoint: entryPointAddress, chainId }) => {
  const encoded = encodeAbiParameters([{ type: "bytes32" }, { type: "address" }, { type: "uint256" }], [
    keccak256(packUserOp({
      userOperation,
      entryPoint: entryPointAddress
    })),
    entryPointAddress,
    BigInt(chainId)
  ]);
  return keccak256(encoded);
};

// node_modules/permissionless/_esm/utils/isSmartAccountDeployed.js
var isSmartAccountDeployed = async (client, address10) => {
  const contractCode = await getBytecode(client, {
    address: address10
  });
  if ((contractCode?.length ?? 0) > 2) {
    return true;
  }
  return false;
};

// node_modules/permissionless/_esm/utils/signUserOperationHashWithECDSA.js
class AccountOrClientNotFoundError extends BaseError {
  constructor({ docsPath: docsPath6 } = {}) {
    super([
      "Could not find an Account to execute with this Action.",
      "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the WalletClient."
    ].join("\n"), {
      docsPath: docsPath6,
      docsSlug: "account"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AccountOrClientNotFoundError"
    });
  }
}

// node_modules/permissionless/_esm/utils/index.js
function parseAccount10(account2) {
  if (typeof account2 === "string")
    return { address: account2, type: "json-rpc" };
  return account2;
}

// node_modules/permissionless/_esm/accounts/types.js
class SignTransactionNotSupportedBySmartAccount extends BaseError {
  constructor({ docsPath: docsPath6 } = {}) {
    super([
      "A smart account cannot sign or send transaction, it can only sign message or userOperation.",
      "Please send user operation instead."
    ].join("\n"), {
      docsPath: docsPath6,
      docsSlug: "account"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SignTransactionNotSupportedBySmartAccount"
    });
  }
}

// node_modules/permissionless/_esm/accounts/toSmartAccount.js
function toSmartAccount({ address: address10, client, source, entryPoint, getNonce, getInitCode, getFactory, getFactoryData, encodeCallData, getDummySignature, encodeDeployCallData, signUserOperation, signMessage: signMessage4, signTypedData: signTypedData3 }) {
  const account2 = toAccount({
    address: address10,
    signMessage: async ({ message }) => {
      const isDeployed = await isSmartAccountDeployed(client, address10);
      const signature = await signMessage4({ message });
      if (isDeployed)
        return signature;
      const abiEncodedMessage = encodeAbiParameters([
        {
          type: "address",
          name: "create2Factory"
        },
        {
          type: "bytes",
          name: "factoryCalldata"
        },
        {
          type: "bytes",
          name: "originalERC1271Signature"
        }
      ], [
        await getFactory() ?? "0x",
        await getFactoryData() ?? "0x",
        signature
      ]);
      return concat([abiEncodedMessage, MAGIC_BYTES]);
    },
    signTypedData: async (typedData2) => {
      const isDeployed = await isSmartAccountDeployed(client, address10);
      const signature = await signTypedData3(typedData2);
      if (isDeployed)
        return signature;
      const abiEncodedMessage = encodeAbiParameters([
        {
          type: "address",
          name: "create2Factory"
        },
        {
          type: "bytes",
          name: "factoryCalldata"
        },
        {
          type: "bytes",
          name: "originalERC1271Signature"
        }
      ], [
        await getFactory() ?? "0x",
        await getFactoryData() ?? "0x",
        signature
      ]);
      return concat([abiEncodedMessage, MAGIC_BYTES]);
    },
    async signTransaction(_, __3) {
      throw new SignTransactionNotSupportedBySmartAccount;
    }
  });
  return {
    ...account2,
    source,
    client,
    type: "local",
    entryPoint,
    publicKey: address10,
    getNonce,
    getInitCode,
    getFactory,
    getFactoryData,
    encodeCallData,
    getDummySignature,
    encodeDeployCallData,
    signUserOperation
  };
}
var MAGIC_BYTES = "0x6492649264926492649264926492649264926492649264926492649264926492";

// node_modules/permissionless/_esm/accounts/simple/signerToSimpleSmartAccount.js
async function signerToSimpleSmartAccount(client, { signer, factoryAddress, entryPoint: entryPointAddress, index: index2 = BigInt(0), address: address10 }) {
  const viemSigner = {
    ...signer,
    signTransaction: (_, __3) => {
      throw new SignTransactionNotSupportedBySmartAccount;
    }
  };
  const [accountAddress, chainId] = await Promise.all([
    address10 ?? getAccountAddress({
      client,
      factoryAddress,
      entryPoint: entryPointAddress,
      owner: viemSigner.address,
      index: index2
    }),
    client.chain?.id ?? getChainId(client)
  ]);
  if (!accountAddress)
    throw new Error("Account address not found");
  let smartAccountDeployed = await isSmartAccountDeployed(client, accountAddress);
  return toSmartAccount({
    address: accountAddress,
    signMessage: async (_) => {
      throw new Error("Simple account isn't 1271 compliant");
    },
    signTransaction: (_, __3) => {
      throw new SignTransactionNotSupportedBySmartAccount;
    },
    signTypedData: async (_) => {
      throw new Error("Simple account isn't 1271 compliant");
    },
    client,
    publicKey: accountAddress,
    entryPoint: entryPointAddress,
    source: "SimpleSmartAccount",
    async getNonce() {
      return getAccountNonce(client, {
        sender: accountAddress,
        entryPoint: entryPointAddress
      });
    },
    async signUserOperation(userOperation) {
      return signMessage(client, {
        account: viemSigner,
        message: {
          raw: getUserOperationHash({
            userOperation,
            entryPoint: entryPointAddress,
            chainId
          })
        }
      });
    },
    async getInitCode() {
      if (smartAccountDeployed)
        return "0x";
      smartAccountDeployed = await isSmartAccountDeployed(client, accountAddress);
      if (smartAccountDeployed)
        return "0x";
      return concatHex([
        factoryAddress,
        await getAccountInitCode(viemSigner.address, index2)
      ]);
    },
    async getFactory() {
      if (smartAccountDeployed)
        return;
      smartAccountDeployed = await isSmartAccountDeployed(client, accountAddress);
      if (smartAccountDeployed)
        return;
      return factoryAddress;
    },
    async getFactoryData() {
      if (smartAccountDeployed)
        return;
      smartAccountDeployed = await isSmartAccountDeployed(client, accountAddress);
      if (smartAccountDeployed)
        return;
      return getAccountInitCode(viemSigner.address, index2);
    },
    async encodeDeployCallData(_) {
      throw new Error("Simple account doesn't support account deployment");
    },
    async encodeCallData(args) {
      if (Array.isArray(args)) {
        const argsArray = args;
        if (getEntryPointVersion(entryPointAddress) === "v0.6") {
          return encodeFunctionData({
            abi: [
              {
                inputs: [
                  {
                    internalType: "address[]",
                    name: "dest",
                    type: "address[]"
                  },
                  {
                    internalType: "bytes[]",
                    name: "func",
                    type: "bytes[]"
                  }
                ],
                name: "executeBatch",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function"
              }
            ],
            functionName: "executeBatch",
            args: [
              argsArray.map((a) => a.to),
              argsArray.map((a) => a.data)
            ]
          });
        }
        return encodeFunctionData({
          abi: [
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "dest",
                  type: "address[]"
                },
                {
                  internalType: "uint256[]",
                  name: "value",
                  type: "uint256[]"
                },
                {
                  internalType: "bytes[]",
                  name: "func",
                  type: "bytes[]"
                }
              ],
              name: "executeBatch",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function"
            }
          ],
          functionName: "executeBatch",
          args: [
            argsArray.map((a) => a.to),
            argsArray.map((a) => a.value),
            argsArray.map((a) => a.data)
          ]
        });
      }
      const { to, value, data: data4 } = args;
      return encodeFunctionData({
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "dest",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256"
              },
              {
                internalType: "bytes",
                name: "func",
                type: "bytes"
              }
            ],
            name: "execute",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          }
        ],
        functionName: "execute",
        args: [to, value, data4]
      });
    },
    async getDummySignature(_userOperation) {
      return "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
    }
  });
}
var getAccountInitCode = async (owner, index2 = BigInt(0)) => {
  if (!owner)
    throw new Error("Owner account not found");
  return encodeFunctionData({
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "salt",
            type: "uint256"
          }
        ],
        name: "createAccount",
        outputs: [
          {
            internalType: "contract SimpleAccount",
            name: "ret",
            type: "address"
          }
        ],
        stateMutability: "nonpayable",
        type: "function"
      }
    ],
    functionName: "createAccount",
    args: [owner, index2]
  });
};
var getAccountAddress = async ({ client, factoryAddress, entryPoint: entryPointAddress, owner, index: index2 = BigInt(0) }) => {
  const entryPointVersion = getEntryPointVersion(entryPointAddress);
  const factoryData = await getAccountInitCode(owner, index2);
  if (entryPointVersion === "v0.6") {
    return getSenderAddress(client, {
      initCode: concatHex([factoryAddress, factoryData]),
      entryPoint: entryPointAddress
    });
  }
  return getSenderAddress(client, {
    factory: factoryAddress,
    factoryData,
    entryPoint: entryPointAddress
  });
};

// node_modules/permissionless/_esm/accounts/simple/privateKeyToSimpleSmartAccount.js
async function privateKeyToSimpleSmartAccount(client, { privateKey, ...rest }) {
  const privateKeyAccount = privateKeyToAccount(privateKey);
  return signerToSimpleSmartAccount(client, {
    signer: privateKeyAccount,
    ...rest
  });
}

// node_modules/permissionless/_esm/errors/utils.js
function prettyPrint2(args) {
  const entries = Object.entries(args).map(([key, value]) => {
    if (value === undefined || value === false)
      return null;
    return [key, value];
  }).filter(Boolean);
  const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
  return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
}

// node_modules/permissionless/_esm/errors/estimateUserOperationGas.js
class EstimateUserOperationGasError extends BaseError {
  constructor(cause, { userOperation, entryPoint, docsPath: docsPath6 }) {
    const prettyArgs = prettyPrint2({
      sender: userOperation.sender,
      nonce: userOperation.nonce,
      initCode: userOperation.initCode,
      callData: userOperation.callData,
      callGasLimit: userOperation.callGasLimit,
      verificationGasLimit: userOperation.verificationGasLimit,
      preVerificationGas: userOperation.preVerificationGas,
      maxFeePerGas: userOperation.maxFeePerGas,
      maxPriorityFeePerGas: userOperation.maxPriorityFeePerGas,
      paymasterAndData: userOperation.paymasterAndData,
      signature: userOperation.signature,
      entryPoint
    });
    super(cause.shortMessage, {
      cause,
      docsPath: docsPath6,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Estimate Gas Arguments:",
        prettyArgs
      ].filter(Boolean)
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EstimateUserOperationGasError"
    });
    this.cause = cause;
  }
}

// node_modules/permissionless/_esm/errors/account.js
class SenderAlreadyDeployedError extends BaseError {
  constructor({ cause, sender, docsPath: docsPath6 } = {}) {
    super([
      `Smart account ${sender} is already deployed.`,
      "",
      "Possible solutions:",
      `\u2022 Remove the initCode from the user operation and set it to "0x"`,
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SenderAlreadyDeployedError"
    });
  }
}
Object.defineProperty(SenderAlreadyDeployedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa10/
});

class InitCodeRevertedError extends BaseError {
  constructor({ cause, docsPath: docsPath6 } = {}) {
    super([
      "EntryPoint failed to create the smart account with the initCode provided.",
      "",
      "Possible reasons:",
      "\u2022 The initCode ran out of gas",
      "\u2022 The initCode reverted during the account deployment process",
      "",
      "Possible solutions:",
      "\u2022 Verify that the factory address in the initCode is correct (the factory address is the first 20 bytes of the initCode).",
      "\u2022 Verify that the initCode is correct.",
      "\u2022 Check whether the verificationGasLimit is sufficient for the initCode to complete without running out of gas.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InitCodeRevertedError"
    });
  }
}
Object.defineProperty(InitCodeRevertedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa13/
});

class SenderAddressMismatchError extends BaseError {
  constructor({ cause, sender, docsPath: docsPath6 }) {
    super([
      "The initCode returned a different smart account address than expected.",
      `Expected: ${sender}`,
      "",
      "Possible reasons:",
      "\u2022 Account deployed with the initCode provided does not match match the sender address provided",
      "",
      "Possible solutions:",
      "\u2022 Verify that the sender address was generated deterministically from the initCode. (consider leveraging functions like getSenderAddress)",
      "\u2022 Verify that the factory address in the initCode is correct (the factory address is the first 20 bytes of the initCode)",
      "\u2022 Verify that the initCode is correct.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SenderAddressMismatchError"
    });
  }
}
Object.defineProperty(SenderAddressMismatchError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa14/
});

class InitCodeDidNotDeploySenderError extends BaseError {
  constructor({ cause, sender, docsPath: docsPath6 }) {
    super([
      `The initCode did not deploy the sender at the address ${sender}.`,
      "",
      "Possible reasons:",
      "\u2022 The initCode factory is not creating an account.",
      "\u2022 The initCode factory is creating an account, but is not implemented correctly as it is not deploying at the sender address",
      "",
      "Possible solutions:",
      "\u2022 Verify that the factory address in the initCode is correct (the factory address is the first 20 bytes of the initCode).",
      "\u2022 Verify that the initCode factory is implemented correctly. The factory must deploy the smart account at the sender address.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InitCodeDidNotDeploySenderError"
    });
  }
}
Object.defineProperty(InitCodeDidNotDeploySenderError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa15/
});

class SenderNotDeployedError extends BaseError {
  constructor({ cause, sender, docsPath: docsPath6 }) {
    super([
      `Smart account ${sender} is not deployed.`,
      "",
      "Possible reasons:",
      "\u2022 An initCode was not specified, but the sender address (i.e. the smart account) is not deployed.",
      "",
      "Possible solutions:",
      "\u2022 If this is the first transaction by this account, make sure the initCode is included in the user operation.",
      "\u2022 If the smart account is already supposed to be deployed, verify that you have selected the correct sender address for the user operation.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SenderNotDeployedError"
    });
  }
}
Object.defineProperty(SenderNotDeployedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa20/
});

class SmartAccountInsufficientFundsError extends BaseError {
  constructor({ cause, sender, docsPath: docsPath6 }) {
    super([
      `You are not using a paymaster, and the ${sender} address did not have enough native tokens to cover the gas costs associated with the user operation.`,
      "",
      "Possible solutions:",
      "\u2022 If you are not using a paymaster, verify that the sender address has enough native tokens to cover the required prefund. Consider leveraging functions like getRequiredPrefund.",
      "\u2022 If you are looking to use a paymaster to cover the gas fees, verify that the paymasterAndData field is set.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SmartAccountInsufficientFundsError"
    });
  }
}
Object.defineProperty(SmartAccountInsufficientFundsError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa21/
});

class SmartAccountSignatureValidityPeriodError extends BaseError {
  constructor({ cause, docsPath: docsPath6 }) {
    super([
      "The signature used in the user operation is not valid, because it is outside of the time range it specified.",
      "",
      "Possible reasons:",
      "\u2022 This error occurs when the block.timestamp falls after the validUntil timestamp, or before the validAfter timestamp.",
      "",
      "Possible solutions:",
      "\u2022 If you are looking to use time-based signatures, verify that the validAfter and validUntil fields are set correctly and that the user operation is sent within the specified range.",
      "\u2022 If you are not looking to use time-based signatures, verify that the validAfter and validUntil fields are set to 0.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SmartAccountSignatureValidityPeriodError"
    });
  }
}
Object.defineProperty(SmartAccountSignatureValidityPeriodError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa22/
});

class SmartAccountValidationRevertedError extends BaseError {
  constructor({ cause, sender, docsPath: docsPath6 }) {
    super([
      `The smart account ${sender} reverted or ran out of gas during the validation of the user operation.`,
      "",
      "Possible solutions:",
      "\u2022 Verify that the verificationGasLimit is high enough to cover the validateUserOp function's gas costs.",
      "\u2022 Make sure validateUserOp returns uint(1) for invalid signatures, and MUST NOT REVERT when the signature is invalid",
      "\u2022 If you are not using a paymaster, verify that the sender address has enough native tokens to cover the required pre fund. Consider leveraging functions like getRequiredPrefund.",
      "\u2022 Verify that the validateUserOp function is implemented with the correct logic, and that the user operation is supposed to be valid.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SmartAccountValidationRevertedError"
    });
  }
}
Object.defineProperty(SmartAccountValidationRevertedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa23/
});

class InvalidSmartAccountSignatureError extends BaseError {
  constructor({ cause, sender, docsPath: docsPath6 }) {
    super([
      `The smart account ${sender} signature is invalid.`,
      "",
      "Possible solutions:",
      "\u2022 Verify that the user operation was correctly signed, and that the signature was correctly encoded in the signature field of the user operation.",
      "\u2022 Most smart account implementations sign over the userOpHash. Make sure that the userOpHash is correctly computed. Consider leveraging functions like getUserOperationHash.",
      "\u2022 Make sure you have selected the correct chainId and entryPointAddress when computing the userOpHash.",
      "\u2022 Make sure the smart account signature verification function is correctly implemented.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidSmartAccountSignatureError"
    });
  }
}
Object.defineProperty(InvalidSmartAccountSignatureError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa24/
});

class InvalidSmartAccountNonceError extends BaseError {
  constructor({ cause, sender, nonce, docsPath: docsPath6 }) {
    const nonceKey = nonce >> BigInt(64);
    const nonceSequence = nonce & 0xffffffffffffffffn;
    super([
      `The smart account ${sender} nonce is invalid.`,
      `Nonce sent: ${nonce} (key: ${nonceKey}, sequence: ${nonceSequence})`,
      "",
      "Possible solutions:",
      "\u2022 Verify that you are using the correct nonce for the user operation. The nonce should be the current nonce of the smart account for the selected key. Consider leveraging functions like getAccountNonce.",
      "\u2022 Verify that the nonce is formatted correctly.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidSmartAccountNonceError"
    });
  }
}
Object.defineProperty(InvalidSmartAccountNonceError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa25/
});

// node_modules/permissionless/_esm/utils/errors/getSendUserOperationError.js
function getSendUserOperationError(err, args) {
  const cause = (() => {
    const cause2 = getBundlerError2(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  throw new SendUserOperationError(cause, {
    ...args
  });
}

// node_modules/permissionless/_esm/actions/bundler/sendUserOperation.js
var sendUserOperation = async (client, args) => {
  const { userOperation, entryPoint } = args;
  try {
    console.log("inside bundler sendUserOperation");
    const userOperationHash = await client.request({
      method: "eth_sendUserOperation",
      params: [deepHexlify(userOperation), entryPoint]
    });
    console.log("eth_sendUserOperation", userOperationHash);
    return userOperationHash;
  } catch (err) {
    throw getSendUserOperationError(err, args);
  }
};

// node_modules/permissionless/_esm/errors/sendUserOperation.js
class SendUserOperationError extends BaseError {
  constructor(cause, { userOperation, entryPoint, docsPath: docsPath6 }) {
    const prettyArgs = prettyPrint2({
      ...userOperation,
      entryPoint
    });
    super(cause.shortMessage, {
      cause,
      docsPath: docsPath6,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "sendUserOperation Arguments:",
        prettyArgs
      ].filter(Boolean)
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SendUserOperationError"
    });
    this.cause = cause;
  }
}

// node_modules/permissionless/_esm/errors/paymaster.js
class PaymasterNotDeployedError extends BaseError {
  constructor({ cause, paymasterAndData, docsPath: docsPath6 } = {}) {
    const paymaster = paymasterAndData ? getAddressFromInitCodeOrPaymasterAndData(paymasterAndData) : "0x";
    super([
      `Paymaster ${paymaster} is not deployed.`,
      "",
      "Possible solutions:",
      "\u2022 Verify that the paymasterAndData field is correct, and that the first 20 bytes are the address of the paymaster contract you intend to use.",
      "\u2022 Verify that the paymaster contract is deployed on the network you are using.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PaymasterNotDeployedError"
    });
  }
}
Object.defineProperty(PaymasterNotDeployedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa30/
});

class PaymasterDepositTooLowError extends BaseError {
  constructor({ cause, paymasterAndData, docsPath: docsPath6 } = {}) {
    const paymaster = paymasterAndData ? getAddressFromInitCodeOrPaymasterAndData(paymasterAndData) : "0x";
    super([
      `Paymaster ${paymaster} contract does not have enough funds deposited into the EntryPoint contract to cover the required funds for the user operation.`,
      "",
      "Possible solutions:",
      "\u2022 If you are using your own paymaster contract, deposit more funds into the EntryPoint contract through the deposit() function of the paymaster contract.",
      "\u2022 Verify that the paymasterAndData field is correct, and that the first 20 bytes are the address of the paymaster contract you intend to useVerify that the paymasterAndData field is correct, and that the first 20 bytes are the address of the paymaster contract you intend to use.",
      "\u2022 If you are using a paymaster service, reach out to them.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PaymasterDepositTooLowError"
    });
  }
}
Object.defineProperty(PaymasterDepositTooLowError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa31/
});

class PaymasterValidityPeriodError extends BaseError {
  constructor({ cause, paymasterAndData, docsPath: docsPath6 }) {
    const paymaster = paymasterAndData ? getAddressFromInitCodeOrPaymasterAndData(paymasterAndData) : "0x";
    super([
      `Paymaster ${paymaster}'s data used in the paymasterAndData field of the user operation is not valid, because it is outside of the time range it specified.`,
      "",
      "Possible reasons:",
      "\u2022 This error occurs when the block.timestamp falls after the validUntil timestamp, or before the validAfter timestamp.",
      "",
      "Possible solutions:",
      "\u2022 If you are using your own paymaster contract and using time-based signatures, verify that the validAfter and validUntil fields are set correctly and that the user operation is sent within the specified range.",
      "\u2022 If you are using your own paymaster contract and not looking to use time-based signatures, verify that the validAfter and validUntil fields are set to 0.",
      "\u2022 If you are using a service, contact your service provider for their paymaster's validity.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PaymasterValidityPeriodError"
    });
  }
}
Object.defineProperty(PaymasterValidityPeriodError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa32/
});

class PaymasterValidationRevertedError extends BaseError {
  constructor({ cause, paymasterAndData, docsPath: docsPath6 }) {
    const paymaster = paymasterAndData ? getAddressFromInitCodeOrPaymasterAndData(paymasterAndData) : "0x";
    super([
      `The validatePaymasterUserOp function of the paymaster ${paymaster} either reverted or ran out of gas.`,
      "",
      "Possible solutions:",
      "\u2022 Verify that the verificationGasLimit is high enough to cover the validatePaymasterUserOp function's gas costs.",
      "\u2022 If you are using your own paymaster contract, verify that the validatePaymasterUserOp function is implemented with the correct logic, and that the user operation is supposed to be valid.",
      "\u2022 If you are using a paymaster service, and the user operation is well formed with a high enough verificationGasLimit, reach out to them.",
      "\u2022 If you are not looking to use a paymaster to cover the gas fees, verify that the paymasterAndData field is not set.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PaymasterValidationRevertedError"
    });
  }
}
Object.defineProperty(PaymasterValidationRevertedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa33/
});

class PaymasterDataRejectedError extends BaseError {
  constructor({ cause, paymasterAndData, docsPath: docsPath6 }) {
    const paymaster = paymasterAndData ? getAddressFromInitCodeOrPaymasterAndData(paymasterAndData) : "0x";
    super([
      `The validatePaymasterUserOp function of the paymaster ${paymaster} rejected paymasterAndData.`,
      "",
      "Possible solutions:",
      "\u2022 If you are using your own paymaster contract, verify that the user operation was correctly signed according to your implementation, and that the paymaster signature was correctly encoded in the paymasterAndData field of the user operation.",
      "\u2022 If you are using a paymaster service, make sure you do not modify any of the fields of the user operation after the paymaster signs over it (except the signature field).",
      "\u2022 If you are using a paymaster service and you have not modified any of the fields except the signature but you are still getting this error, reach out to them.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PaymasterDataRejectedError"
    });
  }
}
Object.defineProperty(PaymasterDataRejectedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa34/
});

class PaymasterPostOpRevertedError extends BaseError {
  constructor({ cause, paymasterAndData, docsPath: docsPath6 }) {
    const paymaster = paymasterAndData ? getAddressFromInitCodeOrPaymasterAndData(paymasterAndData) : "0x";
    super([
      `The postOp function of the paymaster ${paymaster} reverted.`,
      "",
      "Possible solutions:",
      "\u2022 If you are using your own paymaster contract, verify that that you have correctly implemented the postOp function (if you are using one). If you do not intent to make use of the postOp function, make sure you do not set the context parameter in the paymaster's validatePaymasterUserOp function.",
      "\u2022 If you are using a paymaster service and you see this error, reach out to them.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PaymasterPostOpRevertedError"
    });
  }
}
Object.defineProperty(PaymasterPostOpRevertedError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa50/
});

class InvalidPaymasterAndDataError extends BaseError {
  constructor({ cause, docsPath: docsPath6 }) {
    super([
      "The paymasterAndData field of the user operation is invalid.",
      "",
      "Possible solutions:",
      "\u2022 Make sure you have either not set a value for the paymasterAndData, or that it is at least 20 bytes long.",
      "\u2022 If you are using a paymaster service, reach out to them.",
      "",
      docsPath6 ? `Docs: ${docsPath6}` : ""
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidPaymasterAndDataError"
    });
  }
}
Object.defineProperty(InvalidPaymasterAndDataError, "message", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: /aa93/
});

// node_modules/permissionless/_esm/utils/errors/getBundlerError.js
function getBundlerError2(err, args) {
  const message = (err.details || "").toLowerCase();
  const executionRevertedError = err instanceof BaseError ? err.walk((e) => e.code === ExecutionRevertedError.code) : err;
  if (executionRevertedError instanceof BaseError) {
    return new ExecutionRevertedError({
      cause: err,
      message: executionRevertedError.details
    });
  }
  if (args.userOperation.sender === undefined)
    return new UnknownNodeError({ cause: err });
  if (args.userOperation.nonce === undefined)
    return new UnknownNodeError({ cause: err });
  if (SenderAlreadyDeployedError.message.test(message)) {
    return new SenderAlreadyDeployedError({
      cause: err,
      sender: args.userOperation.sender,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa10"
    });
  }
  if (InitCodeRevertedError.message.test(message)) {
    return new InitCodeRevertedError({
      cause: err,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa13"
    });
  }
  if (SenderAddressMismatchError.message.test(message)) {
    return new SenderAddressMismatchError({
      cause: err,
      sender: args.userOperation.sender,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa14"
    });
  }
  if (InitCodeDidNotDeploySenderError.message.test(message)) {
    return new InitCodeDidNotDeploySenderError({
      cause: err,
      sender: args.userOperation.sender,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa15"
    });
  }
  if (SenderNotDeployedError.message.test(message)) {
    return new SenderNotDeployedError({
      cause: err,
      sender: args.userOperation.sender,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa20"
    });
  }
  if (SmartAccountInsufficientFundsError.message.test(message)) {
    return new SmartAccountInsufficientFundsError({
      cause: err,
      sender: args.userOperation.sender,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa21"
    });
  }
  if (SmartAccountSignatureValidityPeriodError.message.test(message)) {
    return new SmartAccountSignatureValidityPeriodError({
      cause: err,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa22"
    });
  }
  if (SmartAccountValidationRevertedError.message.test(message)) {
    return new SmartAccountValidationRevertedError({
      cause: err,
      sender: args.userOperation.sender,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa23"
    });
  }
  if (InvalidSmartAccountNonceError.message.test(message)) {
    return new InvalidSmartAccountNonceError({
      cause: err,
      sender: args.userOperation.sender,
      nonce: args.userOperation.nonce,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa25"
    });
  }
  if (PaymasterNotDeployedError.message.test(message)) {
    return new PaymasterNotDeployedError({
      cause: err,
      paymasterAndData: args.userOperation.paymasterAndData,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa30"
    });
  }
  if (PaymasterDepositTooLowError.message.test(message)) {
    return new PaymasterDepositTooLowError({
      cause: err,
      paymasterAndData: args.userOperation.paymasterAndData,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa31"
    });
  }
  if (PaymasterValidityPeriodError.message.test(message)) {
    return new PaymasterValidityPeriodError({
      cause: err,
      paymasterAndData: args.userOperation.paymasterAndData,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa32"
    });
  }
  if (PaymasterValidationRevertedError.message.test(message)) {
    return new PaymasterValidationRevertedError({
      cause: err,
      paymasterAndData: args.userOperation.paymasterAndData,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa33"
    });
  }
  if (PaymasterDataRejectedError.message.test(message)) {
    return new PaymasterDataRejectedError({
      cause: err,
      paymasterAndData: args.userOperation.paymasterAndData,
      docsPath: "https://docs.pimlico.io/bundler/reference/entrypoint-errors/aa34"
    });
  }
  return new UnknownNodeError({ cause: err });
}

// node_modules/permissionless/_esm/utils/errors/getEstimateUserOperationGasError.js
function getEstimateUserOperationGasError(error, args) {
  const cause = (() => {
    const cause2 = getBundlerError2(error, args);
    if (cause2 instanceof UnknownNodeError)
      return error;
    return cause2;
  })();
  throw new EstimateUserOperationGasError(cause, {
    ...args
  });
}

// node_modules/permissionless/_esm/actions/bundler/estimateUserOperationGas.js
var estimateUserOperationGas2 = async (client, args, stateOverrides) => {
  const { userOperation, entryPoint } = args;
  const userOperationWithBigIntAsHex = deepHexlify(userOperation);
  const stateOverridesWithBigIntAsHex = deepHexlify(stateOverrides);
  try {
    const response = await client.request({
      method: "eth_estimateUserOperationGas",
      params: stateOverrides ? [
        userOperationWithBigIntAsHex,
        entryPoint,
        stateOverridesWithBigIntAsHex
      ] : [userOperationWithBigIntAsHex, entryPoint]
    });
    const entryPointVersion = getEntryPointVersion(entryPoint);
    if (entryPointVersion === "v0.6") {
      const responseV06 = response;
      return {
        preVerificationGas: BigInt(responseV06.preVerificationGas || 0),
        verificationGasLimit: BigInt(responseV06.verificationGasLimit || 0),
        callGasLimit: BigInt(responseV06.callGasLimit || 0)
      };
    }
    const responseV07 = response;
    return {
      preVerificationGas: BigInt(responseV07.preVerificationGas || 0),
      verificationGasLimit: BigInt(responseV07.verificationGasLimit || 0),
      callGasLimit: BigInt(responseV07.callGasLimit || 0),
      paymasterVerificationGasLimit: responseV07.paymasterVerificationGasLimit ? BigInt(responseV07.paymasterVerificationGasLimit) : undefined,
      paymasterPostOpGasLimit: responseV07.paymasterPostOpGasLimit ? BigInt(responseV07.paymasterPostOpGasLimit) : undefined
    };
  } catch (err) {
    throw getEstimateUserOperationGasError(err, args);
  }
};

// node_modules/permissionless/_esm/actions/bundler/getUserOperationReceipt.js
var getUserOperationReceipt = async (client, { hash: hash3 }) => {
  const params = [hash3];
  const response = await client.request({
    method: "eth_getUserOperationReceipt",
    params
  });
  if (!response)
    return null;
  const userOperationReceipt = {
    userOpHash: response.userOpHash,
    sender: response.sender,
    nonce: BigInt(response.nonce),
    actualGasUsed: BigInt(response.actualGasUsed),
    actualGasCost: BigInt(response.actualGasCost),
    success: response.success,
    receipt: {
      transactionHash: response.receipt.transactionHash,
      transactionIndex: BigInt(response.receipt.transactionIndex),
      blockHash: response.receipt.blockHash,
      blockNumber: BigInt(response.receipt.blockNumber),
      from: response.receipt.from,
      to: response.receipt.to,
      cumulativeGasUsed: BigInt(response.receipt.cumulativeGasUsed),
      status: transactionReceiptStatus[response.receipt.status],
      gasUsed: BigInt(response.receipt.gasUsed),
      contractAddress: response.receipt.contractAddress,
      logsBloom: response.receipt.logsBloom,
      effectiveGasPrice: BigInt(response.receipt.effectiveGasPrice)
    },
    logs: response.logs.map((log7) => ({
      data: log7.data,
      blockNumber: BigInt(log7.blockNumber),
      blockHash: log7.blockHash,
      transactionHash: log7.transactionHash,
      logIndex: BigInt(log7.logIndex),
      transactionIndex: BigInt(log7.transactionIndex),
      address: log7.address,
      topics: log7.topics
    }))
  };
  return userOperationReceipt;
};

// node_modules/permissionless/_esm/utils/observe.js
function observe8(observerId, callbacks, fn) {
  const callbackId = ++callbackCount2;
  const getListeners = () => listenersCache2.get(observerId) || [];
  const unsubscribe = () => {
    const listeners2 = getListeners();
    listenersCache2.set(observerId, listeners2.filter((cb) => cb.id !== callbackId));
  };
  const unwatch = () => {
    const cleanup2 = cleanupCache2.get(observerId);
    if (getListeners().length === 1 && cleanup2)
      cleanup2();
    unsubscribe();
  };
  const listeners = getListeners();
  listenersCache2.set(observerId, [
    ...listeners,
    { id: callbackId, fns: callbacks }
  ]);
  if (listeners && listeners.length > 0)
    return unwatch;
  const emit = {};
  for (const key in callbacks) {
    emit[key] = (...args) => {
      const listeners2 = getListeners();
      if (listeners2.length === 0)
        return;
      for (const listener of listeners2) {
        listener.fns[key]?.(...args);
      }
    };
  }
  const cleanup = fn(emit);
  if (typeof cleanup === "function")
    cleanupCache2.set(observerId, cleanup);
  return unwatch;
}
var listenersCache2 = new Map;
var cleanupCache2 = new Map;
var callbackCount2 = 0;

// node_modules/permissionless/_esm/actions/bundler/waitForUserOperationReceipt.js
class WaitForUserOperationReceiptTimeoutError extends BaseError {
  constructor({ hash: hash3 }) {
    super(`Timed out while waiting for transaction with hash "${hash3}" to be confirmed.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WaitForUserOperationReceiptTimeoutError"
    });
  }
}
var waitForUserOperationReceipt = (bundlerClient, { hash: hash3, pollingInterval = bundlerClient.pollingInterval, timeout }) => {
  const observerId = stringify([
    "waitForUserOperationReceipt",
    bundlerClient.uid,
    hash3
  ]);
  let userOperationReceipt;
  return new Promise((resolve, reject) => {
    const unobserve = observe8(observerId, { resolve, reject }, async (emit) => {
      let timeoutTimer;
      const _removeInterval = setInterval(async () => {
        const done = (fn) => {
          clearInterval(_removeInterval);
          fn();
          unobserve();
          if (timeout)
            clearTimeout(timeoutTimer);
        };
        try {
          const _userOperationReceipt = await getAction(bundlerClient, getUserOperationReceipt, "getUserOperationReceipt")({ hash: hash3 });
          if (_userOperationReceipt !== null) {
            userOperationReceipt = _userOperationReceipt;
          }
          if (userOperationReceipt) {
            done(() => emit.resolve(userOperationReceipt));
            return;
          }
        } catch (err) {
          done(() => emit.reject(err));
          return;
        }
      }, pollingInterval);
      if (timeout) {
        timeoutTimer = setTimeout(() => {
          clearInterval(_removeInterval);
          unobserve();
          reject(new WaitForUserOperationReceiptTimeoutError({
            hash: hash3
          }));
          clearTimeout(timeoutTimer);
        }, timeout);
      }
    });
  });
};

// node_modules/permissionless/_esm/actions/smartAccount/prepareUserOperationRequest.js
async function prepareUserOperationRequestForEntryPointV06(client, args, stateOverrides) {
  console.log("preparing user operation for entry point v6");
  const {
    account: account_ = client.account,
    userOperation: partialUserOperation,
    middleware
  } = args;
  if (!account_)
    throw new AccountOrClientNotFoundError;
  const account4 = parseAccount10(account_);
  const [sender, nonce, initCode, callData] = await Promise.all([
    partialUserOperation.sender || account4.address,
    partialUserOperation.nonce || account4.getNonce(),
    partialUserOperation.initCode || account4.getInitCode(),
    partialUserOperation.callData
  ]);
  const userOperation = {
    sender,
    nonce,
    initCode,
    callData,
    paymasterAndData: "0x",
    signature: partialUserOperation.signature || "0x",
    maxFeePerGas: partialUserOperation.maxFeePerGas || BigInt(0),
    maxPriorityFeePerGas: partialUserOperation.maxPriorityFeePerGas || BigInt(0),
    callGasLimit: partialUserOperation.callGasLimit || BigInt(0),
    verificationGasLimit: partialUserOperation.verificationGasLimit || BigInt(0),
    preVerificationGas: partialUserOperation.preVerificationGas || BigInt(0)
  };
  if (userOperation.signature === "0x") {
    userOperation.signature = await account4.getDummySignature(userOperation);
  }
  if (typeof middleware === "function") {
    return middleware({
      userOperation,
      entryPoint: account4.entryPoint
    });
  }
  if (middleware && typeof middleware !== "function" && middleware.gasPrice) {
    const gasPrice = await middleware.gasPrice();
    userOperation.maxFeePerGas = gasPrice.maxFeePerGas;
    userOperation.maxPriorityFeePerGas = gasPrice.maxPriorityFeePerGas;
  }
  if (!userOperation.maxFeePerGas || !userOperation.maxPriorityFeePerGas) {
    const estimateGas6 = await estimateFeesPerGas(account4.client);
    userOperation.maxFeePerGas = userOperation.maxFeePerGas || estimateGas6.maxFeePerGas;
    userOperation.maxPriorityFeePerGas = userOperation.maxPriorityFeePerGas || estimateGas6.maxPriorityFeePerGas;
  }
  if (middleware && typeof middleware !== "function" && middleware.sponsorUserOperation) {
    const sponsorUserOperationData = await middleware.sponsorUserOperation({
      userOperation,
      entryPoint: account4.entryPoint
    });
    userOperation.callGasLimit = sponsorUserOperationData.callGasLimit;
    userOperation.verificationGasLimit = sponsorUserOperationData.verificationGasLimit;
    userOperation.preVerificationGas = sponsorUserOperationData.preVerificationGas;
    userOperation.paymasterAndData = sponsorUserOperationData.paymasterAndData;
    userOperation.maxFeePerGas = sponsorUserOperationData.maxFeePerGas || userOperation.maxFeePerGas;
    userOperation.maxPriorityFeePerGas = sponsorUserOperationData.maxPriorityFeePerGas || userOperation.maxPriorityFeePerGas;
    return userOperation;
  }
  if (!userOperation.callGasLimit || !userOperation.verificationGasLimit || !userOperation.preVerificationGas) {
    const gasParameters = await getAction(client, estimateUserOperationGas2, "estimateUserOperationGas")({
      userOperation,
      entryPoint: account4.entryPoint
    }, stateOverrides);
    userOperation.callGasLimit |= gasParameters.callGasLimit;
    userOperation.verificationGasLimit = userOperation.verificationGasLimit || gasParameters.verificationGasLimit;
    userOperation.preVerificationGas = userOperation.preVerificationGas || gasParameters.preVerificationGas;
  }
  return userOperation;
}
async function prepareUserOperationRequestEntryPointV07(client, args, stateOverrides) {
  console.log("preparing user operation for entry point v7");
  const {
    account: account_ = client.account,
    userOperation: partialUserOperation,
    middleware
  } = args;
  if (!account_)
    throw new AccountOrClientNotFoundError;
  const account4 = parseAccount10(account_);
  const [sender, nonce, factory, factoryData, callData, gasEstimation] = await Promise.all([
    partialUserOperation.sender || account4.address,
    partialUserOperation.nonce || account4.getNonce(),
    partialUserOperation.factory || account4.getFactory(),
    partialUserOperation.factoryData || account4.getFactoryData(),
    partialUserOperation.callData,
    !partialUserOperation.maxFeePerGas || !partialUserOperation.maxPriorityFeePerGas ? estimateFeesPerGas(account4.client) : undefined
  ]);
  const userOperation = {
    sender,
    nonce,
    factory,
    factoryData,
    callData,
    callGasLimit: partialUserOperation.callGasLimit || BigInt(0),
    verificationGasLimit: partialUserOperation.verificationGasLimit || BigInt(0),
    preVerificationGas: partialUserOperation.preVerificationGas || BigInt(0),
    maxFeePerGas: partialUserOperation.maxFeePerGas || gasEstimation?.maxFeePerGas || BigInt(0),
    maxPriorityFeePerGas: partialUserOperation.maxPriorityFeePerGas || gasEstimation?.maxPriorityFeePerGas || BigInt(0),
    signature: partialUserOperation.signature || "0x"
  };
  console.log("userOperation", userOperation);
  if (userOperation.signature === "0x") {
    userOperation.signature = await account4.getDummySignature(userOperation);
  }
  if (typeof middleware === "function") {
    return middleware({
      userOperation,
      entryPoint: account4.entryPoint
    });
  }
  if (middleware && typeof middleware !== "function" && middleware.gasPrice) {
    const gasPrice = await middleware.gasPrice();
    userOperation.maxFeePerGas = gasPrice.maxFeePerGas;
    userOperation.maxPriorityFeePerGas = gasPrice.maxPriorityFeePerGas;
  }
  if (!userOperation.maxFeePerGas || !userOperation.maxPriorityFeePerGas) {
    const estimateGas6 = await estimateFeesPerGas(account4.client);
    userOperation.maxFeePerGas = userOperation.maxFeePerGas || estimateGas6.maxFeePerGas;
    userOperation.maxPriorityFeePerGas = userOperation.maxPriorityFeePerGas || estimateGas6.maxPriorityFeePerGas;
  }
  if (middleware && typeof middleware !== "function" && middleware.sponsorUserOperation) {
    const sponsorUserOperationData = await middleware.sponsorUserOperation({
      userOperation,
      entryPoint: account4.entryPoint
    });
    userOperation.callGasLimit = sponsorUserOperationData.callGasLimit;
    userOperation.verificationGasLimit = sponsorUserOperationData.verificationGasLimit;
    userOperation.preVerificationGas = sponsorUserOperationData.preVerificationGas;
    userOperation.paymaster = sponsorUserOperationData.paymaster;
    userOperation.paymasterVerificationGasLimit = sponsorUserOperationData.paymasterVerificationGasLimit;
    userOperation.paymasterPostOpGasLimit = sponsorUserOperationData.paymasterPostOpGasLimit;
    userOperation.paymasterData = sponsorUserOperationData.paymasterData;
    userOperation.maxFeePerGas = sponsorUserOperationData.maxFeePerGas || userOperation.maxFeePerGas;
    userOperation.maxPriorityFeePerGas = sponsorUserOperationData.maxPriorityFeePerGas || userOperation.maxPriorityFeePerGas;
    return userOperation;
  }
  if (!userOperation.callGasLimit || !userOperation.verificationGasLimit || !userOperation.preVerificationGas) {
    const gasParameters = await getAction(client, estimateUserOperationGas2, "estimateUserOperationGas")({
      userOperation,
      entryPoint: account4.entryPoint
    }, stateOverrides);
    userOperation.callGasLimit |= gasParameters.callGasLimit;
    userOperation.verificationGasLimit = userOperation.verificationGasLimit || gasParameters.verificationGasLimit;
    userOperation.preVerificationGas = userOperation.preVerificationGas || gasParameters.preVerificationGas;
    userOperation.paymasterPostOpGasLimit = userOperation.paymasterPostOpGasLimit || gasParameters.paymasterPostOpGasLimit;
    userOperation.paymasterPostOpGasLimit = userOperation.paymasterPostOpGasLimit || gasParameters.paymasterPostOpGasLimit;
  }
  return userOperation;
}
async function prepareUserOperationRequest(client, args, stateOverrides) {
  const { account: account_ = client.account } = args;
  if (!account_)
    throw new AccountOrClientNotFoundError;
  const account4 = parseAccount10(account_);
  const entryPointVersion = getEntryPointVersion(account4.entryPoint);
  if (entryPointVersion === "v0.6") {
    return prepareUserOperationRequestForEntryPointV06(client, args, stateOverrides);
  }
  return prepareUserOperationRequestEntryPointV07(client, args, stateOverrides);
}

// node_modules/permissionless/_esm/actions/smartAccount/sendUserOperation.js
async function sendUserOperation4(client, args) {
  console.log("hereerere");
  console.log(args);
  const { account: account_ = client.account } = args;
  if (!account_)
    throw new AccountOrClientNotFoundError;
  const account4 = parseAccount10(account_);
  const userOperation = await getAction(client, prepareUserOperationRequest, "prepareUserOperationRequest")(args);
  console.log(userOperation);
  userOperation.signature = await account4.signUserOperation(userOperation);
  console.log("sendind sending user operation");
  return sendUserOperation(client, {
    userOperation,
    entryPoint: account4.entryPoint
  });
}

// node_modules/permissionless/_esm/actions/smartAccount/deployContract.js
async function deployContract(client, args) {
  const { abi: abi17, args: constructorArgs, bytecode, middleware, ...request6 } = args;
  const { account: account_ = client.account } = request6;
  if (!account_) {
    throw new AccountOrClientNotFoundError({
      docsPath: "/docs/actions/wallet/sendTransaction"
    });
  }
  const account4 = parseAccount10(account_);
  const userOpHash = await getAction(client, sendUserOperation4, "sendUserOperation")({
    userOperation: {
      sender: account4.address,
      maxFeePerGas: request6.maxFeePerGas || BigInt(0),
      maxPriorityFeePerGas: request6.maxPriorityFeePerGas || BigInt(0),
      callData: await account4.encodeDeployCallData({
        abi: abi17,
        bytecode,
        args: constructorArgs
      })
    },
    account: account4,
    middleware
  });
  const userOperationReceipt = await getAction(client, waitForUserOperationReceipt, "waitForUserOperationReceipt")({
    hash: userOpHash
  });
  return userOperationReceipt?.receipt.transactionHash;
}

// node_modules/permissionless/_esm/actions/smartAccount/sendTransaction.js
async function sendTransaction(client, args) {
  const {
    account: account_ = client.account,
    data: data4,
    maxFeePerGas,
    maxPriorityFeePerGas,
    to,
    value,
    nonce,
    middleware
  } = args;
  if (!account_) {
    throw new AccountOrClientNotFoundError({
      docsPath: "/docs/actions/wallet/sendTransaction"
    });
  }
  const account4 = parseAccount10(account_);
  if (!to)
    throw new Error("Missing to address");
  if (account4.type !== "local") {
    throw new Error("RPC account type not supported");
  }
  const callData = await account4.encodeCallData({
    to,
    value: value || BigInt(0),
    data: data4 || "0x"
  });
  console.log("sending user operation", callData);
  const userOpHash = await getAction(client, sendUserOperation4, "sendUserOperation")({
    userOperation: {
      sender: account4.address,
      maxFeePerGas: maxFeePerGas || BigInt(0),
      maxPriorityFeePerGas: maxPriorityFeePerGas || BigInt(0),
      callData,
      nonce: nonce ? BigInt(nonce) : undefined
    },
    account: account4,
    middleware
  });
  console.log("userOpHash", userOpHash);
  const userOperationReceipt = await getAction(client, waitForUserOperationReceipt, "waitForUserOperationReceipt")({
    hash: userOpHash
  });
  console.log("userOperationReceipt", userOperationReceipt);
  return userOperationReceipt?.receipt.transactionHash;
}

// node_modules/permissionless/_esm/actions/smartAccount/signMessage.js
async function signMessage4(client, { account: account_ = client.account, message }) {
  if (!account_)
    throw new AccountOrClientNotFoundError({
      docsPath: "/docs/actions/wallet/signMessage"
    });
  const account4 = parseAccount10(account_);
  if (account4.type === "local")
    return account4.signMessage({ message });
  throw new Error("Sign message is not supported by this account");
}

// node_modules/permissionless/_esm/actions/smartAccount/signTypedData.js
async function signTypedData3(client, { account: account_ = client.account, domain, message, primaryType, types: types_ }) {
  if (!account_) {
    throw new AccountOrClientNotFoundError({
      docsPath: "/docs/actions/wallet/signMessage"
    });
  }
  const account4 = parseAccount10(account_);
  const types3 = {
    EIP712Domain: getTypesForEIP712Domain({ domain }),
    ...types_
  };
  validateTypedData({
    domain,
    message,
    primaryType,
    types: types3
  });
  if (account4.type === "local") {
    return account4.signTypedData({
      domain,
      primaryType,
      types: types3,
      message
    });
  }
  throw new Error("Sign type message is not supported by this account");
}

// node_modules/permissionless/_esm/actions/smartAccount/sendTransactions.js
async function sendTransactions(client, args) {
  const { account: account_ = client.account, transactions, middleware, maxFeePerGas, maxPriorityFeePerGas, nonce } = args;
  if (!account_) {
    throw new AccountOrClientNotFoundError({
      docsPath: "/docs/actions/wallet/sendTransaction"
    });
  }
  const account4 = parseAccount10(account_);
  if (account4.type !== "local") {
    throw new Error("RPC account type not supported");
  }
  const callData = await account4.encodeCallData(transactions.map(({ to, value, data: data4 }) => {
    if (!to)
      throw new Error("Missing to address");
    return {
      to,
      value: value || BigInt(0),
      data: data4 || "0x"
    };
  }));
  const userOpHash = await getAction(client, sendUserOperation4, "sendUserOperation")({
    userOperation: {
      sender: account4.address,
      maxFeePerGas: maxFeePerGas || BigInt(0),
      maxPriorityFeePerGas: maxPriorityFeePerGas || BigInt(0),
      callData,
      nonce
    },
    account: account4,
    middleware
  });
  const userOperationReceipt = await getAction(client, waitForUserOperationReceipt, "waitForUserOperationReceipt")({
    hash: userOpHash
  });
  return userOperationReceipt?.receipt.transactionHash;
}

// node_modules/permissionless/_esm/actions/smartAccount/writeContract.js
async function writeContract(client, { abi: abi17, address: address10, args, dataSuffix, functionName, ...request6 }) {
  const data4 = encodeFunctionData({
    abi: abi17,
    args,
    functionName
  });
  const hash3 = await getAction(client, sendTransaction, "sendTransaction")({
    data: `${data4}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
    to: address10,
    ...request6
  });
  return hash3;
}

// node_modules/permissionless/_esm/clients/decorators/smartAccount.js
function smartAccountActions({ middleware }) {
  return (client) => ({
    prepareUserOperationRequest: (args, stateOverrides) => prepareUserOperationRequest(client, {
      ...args,
      middleware
    }, stateOverrides),
    deployContract: (args) => deployContract(client, {
      ...args,
      middleware
    }),
    sendTransaction: (args) => sendTransaction(client, {
      ...args,
      middleware
    }),
    sendTransactions: (args) => sendTransactions(client, {
      ...args,
      middleware
    }),
    sendUserOperation: (args) => sendUserOperation4(client, {
      ...args,
      middleware
    }),
    signMessage: (args) => signMessage4(client, args),
    signTypedData: (args) => signTypedData3(client, args),
    writeContract: (args) => writeContract(client, {
      ...args,
      middleware
    })
  });
}

// node_modules/permissionless/_esm/clients/createSmartAccountClient.js
function createSmartAccountClient(parameters) {
  const { key = "Account", name = "Smart Account Client", bundlerTransport } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    transport: bundlerTransport,
    type: "smartAccountClient"
  });
  return client.extend(smartAccountActions({
    middleware: parameters.middleware
  }));
}
// src/paymaster/paymaster.ts
class Paymaster {
}

// src/paymaster/jiffy/paymaster.ts
class JiffyPaymaster extends Paymaster {
  paymasterUrl;
  chainId;
  headers = {};
  constructor(paymasterUrl, chainId, headers = {}) {
    super();
    this.paymasterUrl = paymasterUrl;
    this.chainId = chainId;
    this.headers = headers;
  }
  sponsorUserOperation = async (args) => {
    const { userOperation, entryPoint } = args;
    let modifiedUserOperation = userOperation;
    let paymasterRes = null;
    const options = {
      headers: {
        "x-api-key": this.headers?.["x-api-key"] ? this.headers["x-api"] : ""
      }
    };
    paymasterRes = await fetch(`${this.paymasterUrl}/${this.chainId}/sponsorUserOperation?` + new URLSearchParams({
      userOperation: JSON.stringify(modifiedUserOperation, (key, value) => typeof value === "bigint" ? value.toString() : value),
      entryPoint
    }), options);
    const paymasterResJson = await paymasterRes.json();
    if (paymasterResJson?.callGasLimit) {
      modifiedUserOperation = {
        ...modifiedUserOperation,
        callGasLimit: BigInt(paymasterResJson.callGasLimit),
        preVerificationGas: BigInt(paymasterResJson.preVerificationGas),
        verificationGasLimit: BigInt(paymasterResJson.verificationGasLimit),
        paymasterAndData: paymasterResJson && paymasterResJson.paymasterAndData ? paymasterResJson.paymasterAndData : "0x"
      };
    }
    return modifiedUserOperation;
  };
}

// src/accounts/simpleAccount/index.ts
var publicClient = createPublicClient({
  transport: http2("https://rpca-vanguard.vanarchain.com/")
});
var getAccountClientFromPrivateKeyV7 = async ({
  privateKey,
  network,
  index: index2 = 0n,
  bundler,
  paymaster: paymaster4
}) => {
  if (paymaster4.sponsoredBy == "Jiffy" && !paymaster4.url) {
    throw new Error("paymasterUrl is required if sponsoredBy is Jiffy");
  }
  const publicClient2 = createPublicClient({
    chain: NetworkChainMap[network],
    transport: http2(NetworkChainMap[network].rpcUrls.default.http[0])
  });
  const account4 = await privateKeyToSimpleSmartAccount(publicClient2, {
    privateKey,
    factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS_MAP[network]["0x0000000071727De22E5E9d8BAf0edAc6f37da032"],
    entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
    index: index2 || 0n
  });
  const paymasterClient = paymaster4.url && paymaster4.sponsoredBy == "Jiffy" ? new JiffyPaymaster(paymaster4.url, publicClient2?.chain.id, paymaster4.header) : undefined;
  const smartAccClient = createSmartAccountClient({
    account: account4,
    chain: NetworkChainMap[network],
    entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
    bundlerTransport: http2(bundler.url, {
      fetchOptions: {
        headers: bundler.header
      }
    })
  });
  return smartAccClient;
};
var getAccountClientFromPrivateKeyV6 = async ({
  privateKey,
  network,
  index: index2 = 0n,
  bundler,
  paymaster: paymaster4
}) => {
  if (paymaster4.sponsoredBy == "Jiffy" && !paymaster4.url) {
    throw new Error("paymasterUrl is required if sponsoredBy is Jiffy");
  }
  const publicClient2 = createPublicClient({
    chain: NetworkChainMap[network],
    transport: http2(NetworkChainMap[network].rpcUrls.default.http[0])
  });
  const account4 = await privateKeyToSimpleSmartAccount(publicClient2, {
    privateKey,
    factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS_MAP[Network.VANAR_TESTNET]["0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"],
    entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    index: index2 || 0n
  });
  const paymasterClient = paymaster4.url && paymaster4.sponsoredBy == "Jiffy" ? new JiffyPaymaster(paymaster4.url, publicClient2?.chain.id, paymaster4.header) : undefined;
  const smartAccClient = createSmartAccountClient({
    account: account4,
    chain: NetworkChainMap[network],
    entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    bundlerTransport: http2(bundler.url, {
      fetchOptions: {
        headers: bundler.header
      }
    })
  });
  return smartAccClient;
};
var getPublicClient = (network) => {
  return createPublicClient({
    chain: NetworkChainMap[network],
    transport: http2(NetworkChainMap[network].rpcUrls.default.http[0])
  });
};
export {
  publicClient,
  getPublicClient,
  getAccountClientFromPrivateKeyV7,
  getAccountClientFromPrivateKeyV6
};
