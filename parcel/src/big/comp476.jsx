
    function a(){

        "stream" in Blob.prototype ||
  Object.defineProperty(Blob.prototype, "stream", {
    value() {
      return new Response(this).body;
    },
  });
var e = (e) => new DataView(new ArrayBuffer(e)),
  n = (e) => new Uint8Array(e.buffer || e),
  t = (e) => new TextEncoder().encode(String(e));
function o(e, o) {
  if (
    (void 0 === o || o instanceof Date || (o = new Date(o)), e instanceof File)
  )
    return { t: o || new Date(e.lastModified), o: e.stream() };
  if (e instanceof Response)
    return {
      t: o || new Date(e.headers.get("Last-Modified") || Date.now()),
      o: e.body,
    };
  if (void 0 === o) o = new Date();
  else if (isNaN(o)) throw new Error("Invalid modification date.");
  if ("string" == typeof e) return { t: o, o: t(e) };
  if (e instanceof Blob) return { t: o, o: e.stream() };
  if (e instanceof Uint8Array || e instanceof ReadableStream)
    return { t: o, o: e };
  if (e instanceof ArrayBuffer || ArrayBuffer.isView(e))
    return { t: o, o: n(e) };
  if (Symbol.asyncIterator in e) return { t: o, o: i(e) };
  throw new TypeError("Unsupported input format.");
}
function i(e) {
  const n = "next" in e ? e : e[Symbol.asyncIterator]();
  return new ReadableStream({
    async pull(e) {
      let t = 0;
      for (; e.desiredSize > t; ) {
        const o = await n.next();
        if (!o.value) {
          e.close();
          break;
        }
        {
          const n = r(o.value);
          e.enqueue(n), (t += n.byteLength);
        }
      }
    },
  });
}
function r(e) {
  return "string" == typeof e ? t(e) : e instanceof Uint8Array ? e : n(e);
}
function a(e, n, o) {
  if (
    (void 0 === n || n instanceof Uint8Array || (n = t(n)), e instanceof File)
  )
    return { i: n || t(e.name), A: e.size };
  if (e instanceof Response) {
    const i = e.headers.get("content-disposition"),
      r = i && i.match(/;s*filename*?=["']?(.*?)["']?$/i),
      a = (r && r[1]) || new URL(e.url).pathname.split("/").pop(),
      s = a && decodeURIComponent(a),
      f = o || +e.headers.get("content-length");
    return { i: n || t(s), A: f };
  }
  if (!n || 0 === n.length) throw new Error("The file must have a name.");
  return "string" == typeof e
    ? { i: n, A: t(e).length }
    : e instanceof Blob
    ? { i: n, A: e.size }
    : e instanceof ArrayBuffer || ArrayBuffer.isView(e)
    ? { i: n, A: e.byteLength }
    : { i: n, A: o };
}
var s = new WebAssembly.Instance(
    new WebAssembly.Module(
      Uint8Array.from(
        atob(
          "AGFzbQEAAAABCgJgAABgAn9/AXwDAwIAAQUDAQACBwkCAW0CAAFjAAEIAQAKlQECSQEDfwNAIAEhAEEAIQIDQCAAQQF2IABBAXFBoIbi7X5scyEAIAJBAWoiAkEIRw0ACyABQQJ0IAA2AgAgAUEBaiIBQYACRw0ACwtJAQF/IAFBf3MhAUGAgAQhAkGAgAQgAGohAANAIAFB/wFxIAItAABzQQJ0KAIAIAFBCHZzIQEgAkEBaiICIABJDQALIAFBf3O4Cw"
        ),
        (e) => e.charCodeAt(0)
      )
    )
  ),
  { c, m } = s.exports,
  f = n(m).subarray(65536);
function A(e, n = 0) {
  for (const t of (function* (e) {
    for (; e.length > 65536; )
      yield e.subarray(0, 65536), (e = e.subarray(65536));
    e.length && (yield e);
  })(e))
    f.set(t), (n = c(t.length, n));
  return n;
}
function u(e, n, t = 0) {
  const o =
      (e.getSeconds() >> 1) | (e.getMinutes() << 5) | (e.getHours() << 11),
    i =
      e.getDate() | ((e.getMonth() + 1) << 5) | ((e.getFullYear() - 1980) << 9);
  n.setUint16(t, o, 1), n.setUint16(t + 2, i, 1);
}
function d(t) {
  const o = e(30);
  return (
    o.setUint32(0, 1347093252),
    o.setUint32(4, 335546368),
    u(t.t, o, 10),
    o.setUint16(26, t.i.length, 1),
    n(o)
  );
}
async function* y(e) {
  let { o: n } = e;
  if (("then" in n && (n = await n), n instanceof Uint8Array))
    yield n, (e.u = A(n, 0)), (e.A = n.length);
  else {
    e.A = 0;
    const t = n.getReader();
    for (;;) {
      const { value: n, done: o } = await t.read();
      if (o) break;
      (e.u = A(n, e.u)), (e.A += n.length), yield n;
    }
  }
}
function l(t) {
  const o = e(16);
  return (
    o.setUint32(0, 1347094280),
    o.setUint32(4, t.u, 1),
    o.setUint32(8, t.A, 1),
    o.setUint32(12, t.A, 1),
    n(o)
  );
}
function w(t, o) {
  const i = e(46);
  return (
    i.setUint32(0, 1347092738),
    i.setUint32(4, 352523264),
    i.setUint16(8, 2048),
    u(t.t, i, 12),
    i.setUint32(16, t.u, 1),
    i.setUint32(20, t.A, 1),
    i.setUint32(24, t.A, 1),
    i.setUint16(28, t.i.length, 1),
    i.setUint16(40, 33204, 1),
    i.setUint32(42, o, 1),
    n(i)
  );
}
function b(e) {
  return e instanceof File || e instanceof Response
    ? [[e], [e]]
    : [
        [e.input, e.name, e.size],
        [e.input, e.lastModified],
      ];
}
  var predictLength = (e) =>
  (function (e) {
    var n;
    let t = 22;
    for (const o of e) {
      if (!o.i) throw new Error("Every file must have a non-empty name.");
      if (isNaN(null != (n = o.A) ? n : NaN))
        throw new Error(
          'Missing size for file  .'
        );
      t += 2 * o.i.length + o.A + 92;
    }
    return t;
  })(
    (function* (e) {
      for (const n of e) yield a(...b(n)[0]);
    })(e)
  );
  function downloadZip(t, r = {}) {
  const s = {
    "Content-Type": "application/zip",
    "Content-Disposition": "attachment",
  };
  return (
    Number.isInteger(r.length) &&
      r.length > 0 &&
      (s["Content-Length"] = r.length),
    r.metadata && (s["Content-Length"] = p(r.metadata)),
    new Response(
      i(
        (async function* (t) {
          const o = [];
          let i = 0,
            r = 0;
          for await (const e of t)
            yield d(e),
              yield e.i,
              yield* y(e),
              yield l(e),
              o.push(w(e, i)),
              o.push(e.i),
              r++,
              (i += 46 + e.i.length + e.A);
          let a = 0;
          for (const e of o) yield e, (a += e.length);
          const s = e(22);
          s.setUint32(0, 1347093766),
            s.setUint16(8, r, 1),
            s.setUint16(10, r, 1),
            s.setUint32(12, a, 1),
            s.setUint32(16, i, 1),
            yield n(s);
        })(
          (async function* (e) {
            for await (const n of e) {
              const [e, t] = b(n);
              yield Object.assign(o(...t), a(...e));
            }
          })(t)
        )
      ),
      { headers: s }
    )
  );
}
 }

 if(1=="2"){
    a()
 }
    
    
    
    
    
    export function Comp476() {
        return <div> big 476</div>
      }