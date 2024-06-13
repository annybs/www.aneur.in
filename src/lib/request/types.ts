export type AnyObject = Array<unknown> | Record<string | number | symbol, unknown>

export interface ErrorResponse extends Error {
  xhr: XMLHttpRequest
}

/** HTTP request method. */
export type Method = 'DELETE' | 'GET' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT'

/** Request data. */
export interface Request extends PromiseLike<Response> {
  /** Set the bearer token for the `authorization` header. */
  bearer(value: string): Request

  /** Unambiguously set a Blob as the request body. */
  blob(value: Blob): Request

  /** Set a Blob as the request body. */
  body(value: Blob): Request
  /** Set a string as the request body. */
  body(value: string): Request
  /**
   * Encode an object as the request body.
   * This will automatically set a `content-type: application/json` header.
   */
  body<T extends AnyObject>(value: T): Request

  /** Set a request header. */
  header(name: string, value: string): Request

  /**
   * Unambiguously encode an object as the request body.
   * This will automatically set a `content-type: application/json` header.
   */
  json<T extends AnyObject>(value: T): Request

  /** Set the request method. */
  method(value: Method): Request

  /**
   * Add an "OK" response status code, preventing a client error being thrown if that status code is received.
   * Status codes in the `2xx` range are always OK.
   */
  ok(value: number): Request
  /**
   * Add a range of "OK" response status codes, preventing a client error being thrown if a status code is received within that range.
   * Status codes in the `2xx` range are always OK.
   */
  ok(start: number, end: number): Request

  /** Set a request URL parameter. */
  param(name: string, value: string): Request

  /** Set request URL parameters. */
  params(data: Record<string, string>): Request
  /** Set request URL parameters. */
  params(data: URLSearchParams): Request

  /** Unambiguously set a string as the request body. */
  string(value: string): Request

  /** Set the request timeout (milliseconds). */
  timeout(value: number): Request

  /** Set the request URL. */
  url(value: string): Request

  /** Send the HTTP request via XMLHttpRequest. */
  send(): Promise<Response>
}

export interface Response {
  /** XMLHttpRequest object. */
  xhr: XMLHttpRequest

  /** Retrieve the response body as a Blob. */
  blob: Blob

  /** Get a response header. */
  header(name: string): string | null

  /** Get all response headers. */
  headers(): Record<string, string>

  /**
   * Parse the response body from JSON.
   * This can be cast to any type using the `as` keyword.
   */
  json: unknown

  /** Retrieve the response body as a string. */
  string: string
}
