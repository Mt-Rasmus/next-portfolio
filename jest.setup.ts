import "@testing-library/jest-dom";

// Polyfill for Web APIs in Node environment
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock Request, Response, and Headers for Next.js API routes
if (typeof Request === "undefined") {
  global.Request = class Request {
    url: string;
    method: string;
    headers: any;
    _body: any;

    constructor(url: string, options: any = {}) {
      this.url = url;
      this.method = options.method || "GET";
      this.headers = options.headers || {};
      this._body = options.body;
    }

    async json() {
      return this._body ? JSON.parse(this._body) : {};
    }
  } as any;
}

if (typeof Response === "undefined") {
  global.Response = class Response {
    body: any;
    status: number;
    statusText: string;
    headers: any;

    constructor(body?: any, init: any = {}) {
      this.body = body;
      this.status = init.status || 200;
      this.statusText = init.statusText || "";
      this.headers = init.headers || {};
    }

    async json() {
      return typeof this.body === "string" ? JSON.parse(this.body) : this.body;
    }
  } as any;
}

if (typeof Headers === "undefined") {
  global.Headers = class Headers {
    _headers: Record<string, string> = {};

    set(name: string, value: string) {
      this._headers[name] = value;
    }

    get(name: string) {
      return this._headers[name];
    }
  } as any;
}
