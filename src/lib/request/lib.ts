import type * as types from './types'

function error(xhr: XMLHttpRequest, reason?: unknown): types.ErrorResponse {
  console.log(xhr, reason)
  let name = 'Error'
  let message = xhr.statusText
  let stack: string | undefined

  if (reason instanceof Error) {
    const err = reason as Error
    name = err.name
    message = err.message
    stack = err.stack
  }

  return {
    name,
    message,
    stack,
    xhr,
  }
}

export function request() {
  interface Data {
    body?: Blob | string
    headers: Record<string, string>
    method: types.Method
    ok: (number | [number, number])[]
    params?: URLSearchParams
    timeout?: number
    url: string
  }

  const data = <Data>{
    headers: {},
    ok: [[200, 299]],
  }

  const req: types.Request = {
    bearer(value) {
      req.header('authorization', `Bearer ${value}`)

      return req
    },

    blob(value) {
      data.body = value

      return req
    },

    body(value: Blob | string | types.AnyObject) {
      if (typeof value === 'string') {
        data.body = value
      } else if (value instanceof Blob) {
        data.body = value
      } else {
        return req.json(value)
      }

      return req
    },

    header(name, value) {
      data.headers[name] = value

      return req
    },

    json(value) {
      data.body = JSON.stringify(value)
      req.header('content-type', 'application/json')

      return req
    },

    method(value) {
      data.method = value

      return req
    },

    ok(value) {
      data.ok.push(value)

      return req
    },

    param(name, value) {
      if (!data.params) data.params = new URLSearchParams()

      data.params.append(name, value)

      return req
    },

    params(value) {
      if (!data.params) data.params = new URLSearchParams()

      if (value instanceof URLSearchParams) {
        for (const [name, val] of value.entries()) {
          data.params.append(name, val)
        }
      } else {
        for (const name in value) {
          data.params.append(name, value[name])
        }
      }

      return req
    },

    string(value) {
      data.body = value

      return req
    },

    timeout(value) {
      data.timeout = value

      return req
    },

    url(value) {
      data.url = value

      return req
    },

    send() {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.addEventListener('load', () => {
          const statusOk = data.ok.reduce((prev, value) => {
            if (!prev) return prev
            if (typeof value === 'number') return xhr.status === value
            return xhr.status >= value[0] && xhr.status <= value[1]
          }, true)

          if (statusOk) {
            resolve(response(xhr))
          } else {
            reject(error(xhr))
          }
        })

        xhr.addEventListener('error', (reason) => {
          reject(error(xhr, reason))
        })

        if (data.timeout) xhr.timeout = data.timeout

        let url = data.url
        if (data.params) {
          const query = data.params.toString()
          if (url.match('?')) url += `&${query}`
          else url += `?${query}`
        }
        xhr.open(data.method, url)

        xhr.send(data.body)
      })
    },

    then(resolve, reject) {
      return this.send().then(resolve).catch(reject)
    },
  }

  return req
}

function response(xhr: XMLHttpRequest) {
  const res: types.Response = {
    xhr,

    get blob() {
      if (xhr.responseType === 'blob') return xhr.response
      throw new Error('responseType is not blob')
    },

    header(name) {
      return xhr.getResponseHeader(name)
    },

    headers() {
      return xhr.getAllResponseHeaders()
        .split(/\r\n/)
        .map((line) => {
          const [name, value] = line.split(':')
          return { name, value }
        })
        .reduce((hs, { name, value }) => {
          hs[name] = value
          return hs
        }, <Record<string, string>>{})
    },

    get json() {
      if (xhr.responseType === 'json') return xhr.response
      if (xhr.responseType === 'text' || !xhr.responseType) return JSON.parse(xhr.responseText)
      throw new Error('responseType is not json or text')
    },

    get string() {
      return xhr.responseText
    },
  }

  return res
}

export function del(url: string) {
  return request().method('DELETE').url(url)
}

export function get(url: string) {
  return request().method('GET').url(url)
}

export function options(url: string) {
  return request().method('OPTIONS').url(url)
}

export function patch(url: string) {
  return request().method('PATCH').url(url)
}

export function post(url: string) {
  return request().method('POST').url(url)
}

export function put(url: string) {
  return request().method('PUT').url(url)
}
