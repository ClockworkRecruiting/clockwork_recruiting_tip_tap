import { jsxs as j, Fragment as le, jsx as k } from "react/jsx-runtime";
import Ie, { useRef as Jt, useState as It, useDebugValue as wa, useEffect as je, forwardRef as xa, useLayoutEffect as _d, createContext as _s, useContext as Ca, useMemo as Gt, useImperativeHandle as Fd, useCallback as Hd } from "react";
import Vd from "react-dom";
var Jn = { exports: {} }, Si = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vo;
function jd() {
  if (vo) return Si;
  vo = 1;
  var n = Ie;
  function e(d, f) {
    return d === f && (d !== 0 || 1 / d === 1 / f) || d !== d && f !== f;
  }
  var t = typeof Object.is == "function" ? Object.is : e, r = n.useState, i = n.useEffect, s = n.useLayoutEffect, o = n.useDebugValue;
  function l(d, f) {
    var h = f(), p = r({ inst: { value: h, getSnapshot: f } }), m = p[0].inst, g = p[1];
    return s(
      function() {
        m.value = h, m.getSnapshot = f, a(m) && g({ inst: m });
      },
      [d, h, f]
    ), i(
      function() {
        return a(m) && g({ inst: m }), d(function() {
          a(m) && g({ inst: m });
        });
      },
      [d]
    ), o(h), h;
  }
  function a(d) {
    var f = d.getSnapshot;
    d = d.value;
    try {
      var h = f();
      return !t(d, h);
    } catch {
      return !0;
    }
  }
  function c(d, f) {
    return f();
  }
  var u = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? c : l;
  return Si.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : u, Si;
}
var wi = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mo;
function Wd() {
  return Mo || (Mo = 1, process.env.NODE_ENV !== "production" && (function() {
    function n(h, p) {
      return h === p && (h !== 0 || 1 / h === 1 / p) || h !== h && p !== p;
    }
    function e(h, p) {
      u || i.startTransition === void 0 || (u = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var m = p();
      if (!d) {
        var g = p();
        s(m, g) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), d = !0);
      }
      g = o({
        inst: { value: m, getSnapshot: p }
      });
      var y = g[0].inst, b = g[1];
      return a(
        function() {
          y.value = m, y.getSnapshot = p, t(y) && b({ inst: y });
        },
        [h, m, p]
      ), l(
        function() {
          return t(y) && b({ inst: y }), h(function() {
            t(y) && b({ inst: y });
          });
        },
        [h]
      ), c(m), m;
    }
    function t(h) {
      var p = h.getSnapshot;
      h = h.value;
      try {
        var m = p();
        return !s(h, m);
      } catch {
        return !0;
      }
    }
    function r(h, p) {
      return p();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var i = Ie, s = typeof Object.is == "function" ? Object.is : n, o = i.useState, l = i.useEffect, a = i.useLayoutEffect, c = i.useDebugValue, u = !1, d = !1, f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? r : e;
    wi.useSyncExternalStore = i.useSyncExternalStore !== void 0 ? i.useSyncExternalStore : f, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), wi;
}
var To;
function Fs() {
  return To || (To = 1, process.env.NODE_ENV === "production" ? Jn.exports = jd() : Jn.exports = Wd()), Jn.exports;
}
var Ea = Fs(), Ao = Object.defineProperty, Ud = (n, e) => {
  let t = {};
  for (var r in n) Ao(t, r, {
    get: n[r],
    enumerable: !0
  });
  return Ao(t, Symbol.toStringTag, { value: "Module" }), t;
};
function ee(n) {
  this.content = n;
}
ee.prototype = {
  constructor: ee,
  find: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      if (this.content[e] === n) return e;
    return -1;
  },
  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(n) {
    var e = this.find(n);
    return e == -1 ? void 0 : this.content[e + 1];
  },
  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(n, e, t) {
    var r = t && t != n ? this.remove(t) : this, i = r.find(n), s = r.content.slice();
    return i == -1 ? s.push(t || n, e) : (s[i + 1] = e, t && (s[i] = t)), new ee(s);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new ee(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new ee([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new ee(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), s = r.find(n);
    return i.splice(s == -1 ? i.length : s, 0, e, t), new ee(i);
  },
  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(n) {
    for (var e = 0; e < this.content.length; e += 2)
      n(this.content[e], this.content[e + 1]);
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(n) {
    return n = ee.from(n), n.size ? new ee(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = ee.from(n), n.size ? new ee(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = ee.from(n);
    for (var t = 0; t < n.content.length; t += 2)
      e = e.remove(n.content[t]);
    return e;
  },
  // :: () → Object
  // Turn ordered map into a plain object.
  toObject: function() {
    var n = {};
    return this.forEach(function(e, t) {
      n[e] = t;
    }), n;
  },
  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1;
  }
};
ee.from = function(n) {
  if (n instanceof ee) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new ee(e);
};
function va(n, e, t) {
  for (let r = 0; ; r++) {
    if (r == n.childCount || r == e.childCount)
      return n.childCount == e.childCount ? null : t;
    let i = n.child(r), s = e.child(r);
    if (i == s) {
      t += i.nodeSize;
      continue;
    }
    if (!i.sameMarkup(s))
      return t;
    if (i.isText && i.text != s.text) {
      let o = i.text, l = s.text, a = 0;
      for (; o[a] == l[a]; a++)
        t++;
      return a && a < o.length && a < l.length && Aa(o.charCodeAt(a - 1)) && Ta(o.charCodeAt(a)) && t--, t;
    }
    if (i.content.size || s.content.size) {
      let o = va(i.content, s.content, t + 1);
      if (o != null)
        return o;
    }
    t += i.nodeSize;
  }
}
function Ma(n, e, t, r) {
  for (let i = n.childCount, s = e.childCount; ; ) {
    if (i == 0 || s == 0)
      return i == s ? null : { a: t, b: r };
    let o = n.child(--i), l = e.child(--s), a = o.nodeSize;
    if (o == l) {
      t -= a, r -= a;
      continue;
    }
    if (!o.sameMarkup(l))
      return { a: t, b: r };
    if (o.isText && o.text != l.text) {
      let c = o.text, u = l.text, d = c.length, f = u.length;
      for (; d > 0 && f > 0 && c[d - 1] == u[f - 1]; )
        d--, f--, t--, r--;
      return d && f && d < c.length && Aa(c.charCodeAt(d - 1)) && Ta(c.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (o.content.size || l.content.size) {
      let c = Ma(o.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
function Ta(n) {
  return n >= 56320 && n < 57344;
}
function Aa(n) {
  return n >= 55296 && n < 56320;
}
class x {
  /**
  @internal
  */
  constructor(e, t) {
    if (this.content = e, this.size = t || 0, t == null)
      for (let r = 0; r < e.length; r++)
        this.size += e[r].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(e, t, r, i = 0, s) {
    for (let o = 0, l = 0; l < t; o++) {
      let a = this.content[o], c = l + a.nodeSize;
      if (c > e && r(a, i + l, s || null, o) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(Math.max(0, e - u), Math.min(a.content.size, t - u), r, i + u);
      }
      l = c;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(e, t, r, i) {
    let s = "", o = !0;
    return this.nodesBetween(e, t, (l, a) => {
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (o ? o = !1 : s += r), s += c;
    }, 0), s;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(e) {
    if (!e.size)
      return this;
    if (!this.size)
      return e;
    let t = this.lastChild, r = e.firstChild, i = this.content.slice(), s = 0;
    for (t.isText && t.sameMarkup(r) && (i[i.length - 1] = t.withText(t.text + r.text), s = 1); s < e.content.length; s++)
      i.push(e.content[s]);
    return new x(i, this.size + e.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(e, t = this.size) {
    if (e == 0 && t == this.size)
      return this;
    let r = [], i = 0;
    if (t > e)
      for (let s = 0, o = 0; o < t; s++) {
        let l = this.content[s], a = o + l.nodeSize;
        a > e && ((o < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - o), Math.min(l.text.length, t - o)) : l = l.cut(Math.max(0, e - o - 1), Math.min(l.content.size, t - o - 1))), r.push(l), i += l.nodeSize), o = a;
      }
    return new x(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? x.empty : e == 0 && t == this.content.length ? this : new x(this.content.slice(e, t));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(e, t) {
    let r = this.content[e];
    if (r == t)
      return this;
    let i = this.content.slice(), s = this.size + t.nodeSize - r.nodeSize;
    return i[e] = t, new x(i, s);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new x([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new x(this.content.concat(e), this.size + e.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(e) {
    if (this.content.length != e.content.length)
      return !1;
    for (let t = 0; t < this.content.length; t++)
      if (!this.content[t].eq(e.content[t]))
        return !1;
    return !0;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(e) {
    let t = this.content[e];
    if (!t)
      throw new RangeError("Index " + e + " out of range for " + this);
    return t;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content[e] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    for (let t = 0, r = 0; t < this.content.length; t++) {
      let i = this.content[t];
      e(i, r, t), r += i.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(e, t = 0) {
    return va(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return Ma(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return Gn(0, e);
    if (e == this.size)
      return Gn(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), s = r + i.nodeSize;
      if (s >= e)
        return s == e ? Gn(t + 1, s) : Gn(t, r);
      r = s;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return x.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return x.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return x.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      r += s.nodeSize, i && s.isText && e[i - 1].sameMarkup(s) ? (t || (t = e.slice(0, i)), t[t.length - 1] = s.withText(t[t.length - 1].text + s.text)) : t && t.push(s);
    }
    return new x(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return x.empty;
    if (e instanceof x)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new x([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
x.empty = new x([], 0);
const xi = { index: 0, offset: 0 };
function Gn(n, e) {
  return xi.index = n, xi.offset = e, xi;
}
function gr(n, e) {
  if (n === e)
    return !0;
  if (!(n && typeof n == "object") || !(e && typeof e == "object"))
    return !1;
  let t = Array.isArray(n);
  if (Array.isArray(e) != t)
    return !1;
  if (t) {
    if (n.length != e.length)
      return !1;
    for (let r = 0; r < n.length; r++)
      if (!gr(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !gr(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let _ = class ss {
  /**
  @internal
  */
  constructor(e, t) {
    this.type = e, this.attrs = t;
  }
  /**
  Given a set of marks, create a new set which contains this one as
  well, in the right position. If this mark is already in the set,
  the set itself is returned. If any marks that are set to be
  [exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
  those are replaced by this one.
  */
  addToSet(e) {
    let t, r = !1;
    for (let i = 0; i < e.length; i++) {
      let s = e[i];
      if (this.eq(s))
        return e;
      if (this.type.excludes(s.type))
        t || (t = e.slice(0, i));
      else {
        if (s.type.excludes(this.type))
          return e;
        !r && s.type.rank > this.type.rank && (t || (t = e.slice(0, i)), t.push(this), r = !0), t && t.push(s);
      }
    }
    return t || (t = e.slice()), r || t.push(this), t;
  }
  /**
  Remove this mark from the given set, returning a new set. If this
  mark is not in the set, the set itself is returned.
  */
  removeFromSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return e.slice(0, t).concat(e.slice(t + 1));
    return e;
  }
  /**
  Test whether this mark is in the given set of marks.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (this.eq(e[t]))
        return !0;
    return !1;
  }
  /**
  Test whether this mark has the same type and attributes as
  another mark.
  */
  eq(e) {
    return this == e || this.type == e.type && gr(this.attrs, e.attrs);
  }
  /**
  Convert this mark to a JSON-serializeable representation.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return e;
  }
  /**
  Deserialize a mark from JSON.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Mark.fromJSON");
    let r = e.marks[t.type];
    if (!r)
      throw new RangeError(`There is no mark type ${t.type} in this schema`);
    let i = r.create(t.attrs);
    return r.checkAttrs(i.attrs), i;
  }
  /**
  Test whether two sets of marks are identical.
  */
  static sameSet(e, t) {
    if (e == t)
      return !0;
    if (e.length != t.length)
      return !1;
    for (let r = 0; r < e.length; r++)
      if (!e[r].eq(t[r]))
        return !1;
    return !0;
  }
  /**
  Create a properly sorted mark set from null, a single mark, or an
  unsorted array of marks.
  */
  static setFrom(e) {
    if (!e || Array.isArray(e) && e.length == 0)
      return ss.none;
    if (e instanceof ss)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
_.none = [];
class Nn extends Error {
}
class v {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(e, t, r) {
    this.content = e, this.openStart = t, this.openEnd = r;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(e, t) {
    let r = Na(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new v(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new v(Oa(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(e) {
    return this.content.eq(e.content) && this.openStart == e.openStart && this.openEnd == e.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let e = { content: this.content.toJSON() };
    return this.openStart > 0 && (e.openStart = this.openStart), this.openEnd > 0 && (e.openEnd = this.openEnd), e;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      return v.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new v(x.fromJSON(e, t.content), r, i);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(e, t = !0) {
    let r = 0, i = 0;
    for (let s = e.firstChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.firstChild)
      r++;
    for (let s = e.lastChild; s && !s.isLeaf && (t || !s.type.spec.isolating); s = s.lastChild)
      i++;
    return new v(e, r, i);
  }
}
v.empty = new v(x.empty, 0, 0);
function Oa(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), s = n.maybeChild(r), { index: o, offset: l } = n.findIndex(t);
  if (i == e || s.isText) {
    if (l != t && !n.child(o).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != o)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, s.copy(Oa(s.content, e - i - 1, t - i - 1)));
}
function Na(n, e, t, r, i, s) {
  let { index: o, offset: l } = n.findIndex(e), a = n.maybeChild(o);
  if (l == e || a.isText)
    return s && r <= 0 && i <= 0 && !s.canReplace(o, o, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let c = Na(a.content, e - l - 1, t, o == 0 ? r - 1 : 0, o == n.childCount - 1 ? i - 1 : 0, a);
  return c && n.replaceChild(o, a.copy(c));
}
function qd(n, e, t) {
  if (t.openStart > n.depth)
    throw new Nn("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Nn("Inconsistent open depths");
  return Ia(n, e, t, 0);
}
function Ia(n, e, t, r) {
  let i = n.index(r), s = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let o = Ia(n, e, t, r + 1);
    return s.copy(s.content.replaceChild(i, o));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let o = n.parent, l = o.content;
      return Mt(o, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: o, end: l } = Kd(t, n);
      return Mt(s, Ra(n, o, l, e, r));
    }
  else return Mt(s, yr(n, e, r));
}
function Da(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Nn("Cannot join " + e.type.name + " onto " + n.type.name);
}
function ls(n, e, t) {
  let r = n.node(t);
  return Da(r, e.node(t)), r;
}
function vt(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function yn(n, e, t, r) {
  let i = (e || n).node(t), s = 0, o = e ? e.index(t) : i.childCount;
  n && (s = n.index(t), n.depth > t ? s++ : n.textOffset && (vt(n.nodeAfter, r), s++));
  for (let l = s; l < o; l++)
    vt(i.child(l), r);
  e && e.depth == t && e.textOffset && vt(e.nodeBefore, r);
}
function Mt(n, e) {
  if (!n.type.validContent(e))
    throw new Nn("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function Ra(n, e, t, r, i) {
  let s = n.depth > i && ls(n, e, i + 1), o = r.depth > i && ls(t, r, i + 1), l = [];
  return yn(null, n, i, l), s && o && e.index(i) == t.index(i) ? (Da(s, o), vt(Mt(s, Ra(n, e, t, r, i + 1)), l)) : (s && vt(Mt(s, yr(n, e, i + 1)), l), yn(e, t, i, l), o && vt(Mt(o, yr(t, r, i + 1)), l)), yn(r, null, i, l), new x(l);
}
function yr(n, e, t) {
  let r = [];
  if (yn(null, n, t, r), n.depth > t) {
    let i = ls(n, e, t + 1);
    vt(Mt(i, yr(n, e, t + 1)), r);
  }
  return yn(e, null, t, r), new x(r);
}
function Kd(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let s = t - 1; s >= 0; s--)
    i = e.node(s).copy(x.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class In {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.path = t, this.parentOffset = r, this.depth = t.length / 3 - 1;
  }
  /**
  @internal
  */
  resolveDepth(e) {
    return e == null ? this.depth : e < 0 ? this.depth + e : e;
  }
  /**
  The parent node that the position points into. Note that even if
  a position points into a text node, that node is not considered
  the parent—text nodes are ‘flat’ in this model, and have no content.
  */
  get parent() {
    return this.node(this.depth);
  }
  /**
  The root node in which the position was resolved.
  */
  get doc() {
    return this.node(0);
  }
  /**
  The ancestor node at the given level. `p.node(p.depth)` is the
  same as `p.parent`.
  */
  node(e) {
    return this.path[this.resolveDepth(e) * 3];
  }
  /**
  The index into the ancestor at the given level. If this points
  at the 3rd node in the 2nd paragraph on the top level, for
  example, `p.index(0)` is 1 and `p.index(1)` is 2.
  */
  index(e) {
    return this.path[this.resolveDepth(e) * 3 + 1];
  }
  /**
  The index pointing after this position into the ancestor at the
  given level.
  */
  indexAfter(e) {
    return e = this.resolveDepth(e), this.index(e) + (e == this.depth && !this.textOffset ? 0 : 1);
  }
  /**
  The (absolute) position at the start of the node at the given
  level.
  */
  start(e) {
    return e = this.resolveDepth(e), e == 0 ? 0 : this.path[e * 3 - 1] + 1;
  }
  /**
  The (absolute) position at the end of the node at the given
  level.
  */
  end(e) {
    return e = this.resolveDepth(e), this.start(e) + this.node(e).content.size;
  }
  /**
  The (absolute) position directly before the wrapping node at the
  given level, or, when `depth` is `this.depth + 1`, the original
  position.
  */
  before(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position before the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1];
  }
  /**
  The (absolute) position directly after the wrapping node at the
  given level, or the original position when `depth` is `this.depth + 1`.
  */
  after(e) {
    if (e = this.resolveDepth(e), !e)
      throw new RangeError("There is no position after the top-level node");
    return e == this.depth + 1 ? this.pos : this.path[e * 3 - 1] + this.path[e * 3].nodeSize;
  }
  /**
  When this position points into a text node, this returns the
  distance between the position and the start of the text node.
  Will be zero for positions that point between nodes.
  */
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  /**
  Get the node directly after the position, if any. If the position
  points into a text node, only the part of that node after the
  position is returned.
  */
  get nodeAfter() {
    let e = this.parent, t = this.index(this.depth);
    if (t == e.childCount)
      return null;
    let r = this.pos - this.path[this.path.length - 1], i = e.child(t);
    return r ? e.child(t).cut(r) : i;
  }
  /**
  Get the node directly before the position, if any. If the
  position points into a text node, only the part of that node
  before the position is returned.
  */
  get nodeBefore() {
    let e = this.index(this.depth), t = this.pos - this.path[this.path.length - 1];
    return t ? this.parent.child(e).cut(0, t) : e == 0 ? null : this.parent.child(e - 1);
  }
  /**
  Get the position at the given index in the parent node at the
  given depth (which defaults to `this.depth`).
  */
  posAtIndex(e, t) {
    t = this.resolveDepth(t);
    let r = this.path[t * 3], i = t == 0 ? 0 : this.path[t * 3 - 1] + 1;
    for (let s = 0; s < e; s++)
      i += r.child(s).nodeSize;
    return i;
  }
  /**
  Get the marks at this position, factoring in the surrounding
  marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
  position is at the start of a non-empty node, the marks of the
  node after it (if any) are returned.
  */
  marks() {
    let e = this.parent, t = this.index();
    if (e.content.size == 0)
      return _.none;
    if (this.textOffset)
      return e.child(t).marks;
    let r = e.maybeChild(t - 1), i = e.maybeChild(t);
    if (!r) {
      let l = r;
      r = i, i = l;
    }
    let s = r.marks;
    for (var o = 0; o < s.length; o++)
      s[o].type.spec.inclusive === !1 && (!i || !s[o].isInSet(i.marks)) && (s = s[o--].removeFromSet(s));
    return s;
  }
  /**
  Get the marks after the current position, if any, except those
  that are non-inclusive and not present at position `$end`. This
  is mostly useful for getting the set of marks to preserve after a
  deletion. Will return `null` if this position is at the end of
  its parent node or its parent node isn't a textblock (in which
  case no marks should be preserved).
  */
  marksAcross(e) {
    let t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline)
      return null;
    let r = t.marks, i = e.parent.maybeChild(e.index());
    for (var s = 0; s < r.length; s++)
      r[s].type.spec.inclusive === !1 && (!i || !r[s].isInSet(i.marks)) && (r = r[s--].removeFromSet(r));
    return r;
  }
  /**
  The depth up to which this position and the given (non-resolved)
  position share the same parent nodes.
  */
  sharedDepth(e) {
    for (let t = this.depth; t > 0; t--)
      if (this.start(t) <= e && this.end(t) >= e)
        return t;
    return 0;
  }
  /**
  Returns a range based on the place where this position and the
  given position diverge around block content. If both point into
  the same textblock, for example, a range around that textblock
  will be returned. If they point into different blocks, the range
  around those blocks in their shared ancestor is returned. You can
  pass in an optional predicate that will be called with a parent
  node to see if a range into that parent is acceptable.
  */
  blockRange(e = this, t) {
    if (e.pos < this.pos)
      return e.blockRange(this);
    for (let r = this.depth - (this.parent.inlineContent || this.pos == e.pos ? 1 : 0); r >= 0; r--)
      if (e.pos <= this.end(r) && (!t || t(this.node(r))))
        return new br(this, e, r);
    return null;
  }
  /**
  Query whether the given position shares the same parent node.
  */
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  /**
  Return the greater of this and the given position.
  */
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  /**
  Return the smaller of this and the given position.
  */
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  /**
  @internal
  */
  toString() {
    let e = "";
    for (let t = 1; t <= this.depth; t++)
      e += (e ? "/" : "") + this.node(t).type.name + "_" + this.index(t - 1);
    return e + ":" + this.parentOffset;
  }
  /**
  @internal
  */
  static resolve(e, t) {
    if (!(t >= 0 && t <= e.content.size))
      throw new RangeError("Position " + t + " out of range");
    let r = [], i = 0, s = t;
    for (let o = e; ; ) {
      let { index: l, offset: a } = o.content.findIndex(s), c = s - a;
      if (r.push(o, l, i + a), !c || (o = o.child(l), o.isText))
        break;
      s = c - 1, i += a + 1;
    }
    return new In(t, r, s);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = Oo.get(e);
    if (r)
      for (let s = 0; s < r.elts.length; s++) {
        let o = r.elts[s];
        if (o.pos == t)
          return o;
      }
    else
      Oo.set(e, r = new Jd());
    let i = r.elts[r.i] = In.resolve(e, t);
    return r.i = (r.i + 1) % Gd, i;
  }
}
class Jd {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Gd = 12, Oo = /* @__PURE__ */ new WeakMap();
class br {
  /**
  Construct a node range. `$from` and `$to` should point into the
  same node until at least the given `depth`, since a node range
  denotes an adjacent set of nodes in a single parent node.
  */
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.depth = r;
  }
  /**
  The position at the start of the range.
  */
  get start() {
    return this.$from.before(this.depth + 1);
  }
  /**
  The position at the end of the range.
  */
  get end() {
    return this.$to.after(this.depth + 1);
  }
  /**
  The parent node that the range points into.
  */
  get parent() {
    return this.$from.node(this.depth);
  }
  /**
  The start index of the range in the parent node.
  */
  get startIndex() {
    return this.$from.index(this.depth);
  }
  /**
  The end index of the range in the parent node.
  */
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const Qd = /* @__PURE__ */ Object.create(null);
let Tt = class as {
  /**
  @internal
  */
  constructor(e, t, r, i = _.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || x.empty;
  }
  /**
  The array of this node's child nodes.
  */
  get children() {
    return this.content.content;
  }
  /**
  The size of this node, as defined by the integer-based [indexing
  scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
  amount of characters. For other leaf nodes, it is one. For
  non-leaf nodes, it is the size of the content plus two (the
  start and end token).
  */
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  /**
  The number of children that the node has.
  */
  get childCount() {
    return this.content.childCount;
  }
  /**
  Get the child node at the given index. Raises an error when the
  index is out of range.
  */
  child(e) {
    return this.content.child(e);
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(e) {
    this.content.forEach(e);
  }
  /**
  Invoke a callback for all descendant nodes recursively overlapping
  the given two positions that are relative to start of this
  node's content. This includes all ancestors of the nodes
  containing the two positions. The callback is invoked with the
  node, its position relative to the original node (method receiver),
  its parent node, and its child index. When the callback returns
  false for a given node, that node's children will not be
  recursed over. The last parameter can be used to specify a
  starting position to count from.
  */
  nodesBetween(e, t, r, i = 0) {
    this.content.nodesBetween(e, t, r, i, this);
  }
  /**
  Call the given callback for every descendant node. Doesn't
  descend into a node when the callback returns `false`.
  */
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  /**
  Concatenates all the text nodes found in this fragment and its
  children.
  */
  get textContent() {
    return this.isLeaf && this.type.spec.leafText ? this.type.spec.leafText(this) : this.textBetween(0, this.content.size, "");
  }
  /**
  Get all text between positions `from` and `to`. When
  `blockSeparator` is given, it will be inserted to separate text
  from different block nodes. If `leafText` is given, it'll be
  inserted for every non-text leaf node encountered, otherwise
  [`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec.leafText) will be used.
  */
  textBetween(e, t, r, i) {
    return this.content.textBetween(e, t, r, i);
  }
  /**
  Returns this node's first child, or `null` if there are no
  children.
  */
  get firstChild() {
    return this.content.firstChild;
  }
  /**
  Returns this node's last child, or `null` if there are no
  children.
  */
  get lastChild() {
    return this.content.lastChild;
  }
  /**
  Test whether two nodes represent the same piece of document.
  */
  eq(e) {
    return this == e || this.sameMarkup(e) && this.content.eq(e.content);
  }
  /**
  Compare the markup (type, attributes, and marks) of this node to
  those of another. Returns `true` if both have the same markup.
  */
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  /**
  Check whether this node's markup correspond to the given type,
  attributes, and marks.
  */
  hasMarkup(e, t, r) {
    return this.type == e && gr(this.attrs, t || e.defaultAttrs || Qd) && _.sameSet(this.marks, r || _.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new as(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new as(this.type, this.attrs, this.content, e);
  }
  /**
  Create a copy of this node with only the content between the
  given positions. If `to` is not given, it defaults to the end of
  the node.
  */
  cut(e, t = this.content.size) {
    return e == 0 && t == this.content.size ? this : this.copy(this.content.cut(e, t));
  }
  /**
  Cut out the part of the document between the given positions, and
  return it as a `Slice` object.
  */
  slice(e, t = this.content.size, r = !1) {
    if (e == t)
      return v.empty;
    let i = this.resolve(e), s = this.resolve(t), o = r ? 0 : i.sharedDepth(t), l = i.start(o), c = i.node(o).content.cut(i.pos - l, s.pos - l);
    return new v(c, i.depth - o, s.depth - o);
  }
  /**
  Replace the part of the document between the given positions with
  the given slice. The slice must 'fit', meaning its open sides
  must be able to connect to the surrounding content, and its
  content nodes must be valid children for the node they are placed
  into. If any of this is violated, an error of type
  [`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.
  */
  replace(e, t, r) {
    return qd(this.resolve(e), this.resolve(t), r);
  }
  /**
  Find the node directly after the given position.
  */
  nodeAt(e) {
    for (let t = this; ; ) {
      let { index: r, offset: i } = t.content.findIndex(e);
      if (t = t.maybeChild(r), !t)
        return null;
      if (i == e || t.isText)
        return t;
      e -= i + 1;
    }
  }
  /**
  Find the (direct) child node after the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childAfter(e) {
    let { index: t, offset: r } = this.content.findIndex(e);
    return { node: this.content.maybeChild(t), index: t, offset: r };
  }
  /**
  Find the (direct) child node before the given offset, if any,
  and return it along with its index and offset relative to this
  node.
  */
  childBefore(e) {
    if (e == 0)
      return { node: null, index: 0, offset: 0 };
    let { index: t, offset: r } = this.content.findIndex(e);
    if (r < e)
      return { node: this.content.child(t), index: t, offset: r };
    let i = this.content.child(t - 1);
    return { node: i, index: t - 1, offset: r - i.nodeSize };
  }
  /**
  Resolve the given position in the document, returning an
  [object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.
  */
  resolve(e) {
    return In.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return In.resolve(this, e);
  }
  /**
  Test whether a given mark or mark type occurs in this document
  between the two given positions.
  */
  rangeHasMark(e, t, r) {
    let i = !1;
    return t > e && this.nodesBetween(e, t, (s) => (r.isInSet(s.marks) && (i = !0), !i)), i;
  }
  /**
  True when this is a block (non-inline node)
  */
  get isBlock() {
    return this.type.isBlock;
  }
  /**
  True when this is a textblock node, a block node with inline
  content.
  */
  get isTextblock() {
    return this.type.isTextblock;
  }
  /**
  True when this node allows inline content.
  */
  get inlineContent() {
    return this.type.inlineContent;
  }
  /**
  True when this is an inline node (a text node or a node that can
  appear among text).
  */
  get isInline() {
    return this.type.isInline;
  }
  /**
  True when this is a text node.
  */
  get isText() {
    return this.type.isText;
  }
  /**
  True when this is a leaf node.
  */
  get isLeaf() {
    return this.type.isLeaf;
  }
  /**
  True when this is an atom, i.e. when it does not have directly
  editable content. This is usually the same as `isLeaf`, but can
  be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
  on a node's spec (typically used when the node is displayed as
  an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).
  */
  get isAtom() {
    return this.type.isAtom;
  }
  /**
  Return a string representation of this node for debugging
  purposes.
  */
  toString() {
    if (this.type.spec.toDebugString)
      return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), La(this.marks, e);
  }
  /**
  Get the content match in this node at the given index.
  */
  contentMatchAt(e) {
    let t = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (!t)
      throw new Error("Called contentMatchAt on a node with invalid content");
    return t;
  }
  /**
  Test whether replacing the range between `from` and `to` (by
  child index) with the given replacement fragment (which defaults
  to the empty fragment) would leave the node's content valid. You
  can optionally pass `start` and `end` indices into the
  replacement fragment.
  */
  canReplace(e, t, r = x.empty, i = 0, s = r.childCount) {
    let o = this.contentMatchAt(e).matchFragment(r, i, s), l = o && o.matchFragment(this.content, t);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < s; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
        return !1;
    return !0;
  }
  /**
  Test whether replacing the range `from` to `to` (by index) with
  a node of the given type would leave the node's content valid.
  */
  canReplaceWith(e, t, r, i) {
    if (i && !this.type.allowsMarks(i))
      return !1;
    let s = this.contentMatchAt(e).matchType(r), o = s && s.matchFragment(this.content, t);
    return o ? o.validEnd : !1;
  }
  /**
  Test whether the given node's content could be appended to this
  node. If that node is empty, this will only return true if there
  is at least one node type that can appear in both nodes (to avoid
  merging completely incompatible nodes).
  */
  canAppend(e) {
    return e.content.size ? this.canReplace(this.childCount, this.childCount, e.content) : this.type.compatibleContent(e.type);
  }
  /**
  Check whether this node and its descendants conform to the
  schema, and raise an exception when they do not.
  */
  check() {
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = _.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!_.sameSet(e, this.marks))
      throw new RangeError(`Invalid collection of marks for node ${this.type.name}: ${this.marks.map((t) => t.type.name)}`);
    this.content.forEach((t) => t.check());
  }
  /**
  Return a JSON-serializeable representation of this node.
  */
  toJSON() {
    let e = { type: this.type.name };
    for (let t in this.attrs) {
      e.attrs = this.attrs;
      break;
    }
    return this.content.size && (e.content = this.content.toJSON()), this.marks.length && (e.marks = this.marks.map((t) => t.toJSON())), e;
  }
  /**
  Deserialize a node from its JSON representation.
  */
  static fromJSON(e, t) {
    if (!t)
      throw new RangeError("Invalid input for Node.fromJSON");
    let r;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError("Invalid mark data for Node.fromJSON");
      r = t.marks.map(e.markFromJSON);
    }
    if (t.type == "text") {
      if (typeof t.text != "string")
        throw new RangeError("Invalid text node in JSON");
      return e.text(t.text, r);
    }
    let i = x.fromJSON(e, t.content), s = e.nodeType(t.type).create(t.attrs, i, r);
    return s.type.checkAttrs(s.attrs), s;
  }
};
Tt.prototype.text = void 0;
class kr extends Tt {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : La(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks ? this : new kr(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new kr(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return e == 0 && t == this.text.length ? this : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    let e = super.toJSON();
    return e.text = this.text, e;
  }
}
function La(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class Dt {
  /**
  @internal
  */
  constructor(e) {
    this.validEnd = e, this.next = [], this.wrapCache = [];
  }
  /**
  @internal
  */
  static parse(e, t) {
    let r = new Yd(e, t);
    if (r.next == null)
      return Dt.empty;
    let i = Pa(r);
    r.next && r.err("Unexpected trailing text");
    let s = sf(rf(i));
    return of(s, r), s;
  }
  /**
  Match a node type, returning a match after that node if
  successful.
  */
  matchType(e) {
    for (let t = 0; t < this.next.length; t++)
      if (this.next[t].type == e)
        return this.next[t].next;
    return null;
  }
  /**
  Try to match a fragment. Returns the resulting match when
  successful.
  */
  matchFragment(e, t = 0, r = e.childCount) {
    let i = this;
    for (let s = t; i && s < r; s++)
      i = i.matchType(e.child(s).type);
    return i;
  }
  /**
  @internal
  */
  get inlineContent() {
    return this.next.length != 0 && this.next[0].type.isInline;
  }
  /**
  Get the first matching node type at this match position that can
  be generated.
  */
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      let { type: t } = this.next[e];
      if (!(t.isText || t.hasRequiredAttrs()))
        return t;
    }
    return null;
  }
  /**
  @internal
  */
  compatible(e) {
    for (let t = 0; t < this.next.length; t++)
      for (let r = 0; r < e.next.length; r++)
        if (this.next[t].type == e.next[r].type)
          return !0;
    return !1;
  }
  /**
  Try to match the given fragment, and if that fails, see if it can
  be made to match by inserting nodes in front of it. When
  successful, return a fragment of inserted nodes (which may be
  empty if nothing had to be inserted). When `toEnd` is true, only
  return a fragment if the resulting match goes to the end of the
  content expression.
  */
  fillBefore(e, t = !1, r = 0) {
    let i = [this];
    function s(o, l) {
      let a = o.matchFragment(e, r);
      if (a && (!t || a.validEnd))
        return x.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < o.next.length; c++) {
        let { type: u, next: d } = o.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(d) == -1) {
          i.push(d);
          let f = s(d, l.concat(u));
          if (f)
            return f;
        }
      }
      return null;
    }
    return s(this, []);
  }
  /**
  Find a set of wrapping node types that would allow a node of the
  given type to appear at this position. The result may be empty
  (when it fits directly) and will be null when no such wrapping
  exists.
  */
  findWrapping(e) {
    for (let r = 0; r < this.wrapCache.length; r += 2)
      if (this.wrapCache[r] == e)
        return this.wrapCache[r + 1];
    let t = this.computeWrapping(e);
    return this.wrapCache.push(e, t), t;
  }
  /**
  @internal
  */
  computeWrapping(e) {
    let t = /* @__PURE__ */ Object.create(null), r = [{ match: this, type: null, via: null }];
    for (; r.length; ) {
      let i = r.shift(), s = i.match;
      if (s.matchType(e)) {
        let o = [];
        for (let l = i; l.type; l = l.via)
          o.push(l.type);
        return o.reverse();
      }
      for (let o = 0; o < s.next.length; o++) {
        let { type: l, next: a } = s.next[o];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), t[l.name] = !0);
      }
    }
    return null;
  }
  /**
  The number of outgoing edges this node has in the finite
  automaton that describes the content expression.
  */
  get edgeCount() {
    return this.next.length;
  }
  /**
  Get the _n_​th outgoing edge from this node in the finite
  automaton that describes the content expression.
  */
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  /**
  @internal
  */
  toString() {
    let e = [];
    function t(r) {
      e.push(r);
      for (let i = 0; i < r.next.length; i++)
        e.indexOf(r.next[i].next) == -1 && t(r.next[i].next);
    }
    return t(this), e.map((r, i) => {
      let s = i + (r.validEnd ? "*" : " ") + " ";
      for (let o = 0; o < r.next.length; o++)
        s += (o ? ", " : "") + r.next[o].type.name + "->" + e.indexOf(r.next[o].next);
      return s;
    }).join(`
`);
  }
}
Dt.empty = new Dt(!0);
class Yd {
  constructor(e, t) {
    this.string = e, this.nodeTypes = t, this.inline = null, this.pos = 0, this.tokens = e.split(/\s*(?=\b|\W|$)/), this.tokens[this.tokens.length - 1] == "" && this.tokens.pop(), this.tokens[0] == "" && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function Pa(n) {
  let e = [];
  do
    e.push(Xd(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Xd(n) {
  let e = [];
  do
    e.push(Zd(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Zd(n) {
  let e = nf(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = ef(n, e);
    else
      break;
  return e;
}
function No(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function ef(n, e) {
  let t = No(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = No(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function tf(n, e) {
  let t = n.nodeTypes, r = t[e];
  if (r)
    return [r];
  let i = [];
  for (let s in t) {
    let o = t[s];
    o.isInGroup(e) && i.push(o);
  }
  return i.length == 0 && n.err("No node type or group '" + e + "' found"), i;
}
function nf(n) {
  if (n.eat("(")) {
    let e = Pa(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = tf(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function rf(n) {
  let e = [[]];
  return i(s(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(o, l, a) {
    let c = { term: a, to: l };
    return e[o].push(c), c;
  }
  function i(o, l) {
    o.forEach((a) => a.to = l);
  }
  function s(o, l) {
    if (o.type == "choice")
      return o.exprs.reduce((a, c) => a.concat(s(c, l)), []);
    if (o.type == "seq")
      for (let a = 0; ; a++) {
        let c = s(o.exprs[a], l);
        if (a == o.exprs.length - 1)
          return c;
        i(c, l = t());
      }
    else if (o.type == "star") {
      let a = t();
      return r(l, a), i(s(o.expr, a), a), [r(a)];
    } else if (o.type == "plus") {
      let a = t();
      return i(s(o.expr, l), a), i(s(o.expr, a), a), [r(a)];
    } else {
      if (o.type == "opt")
        return [r(l)].concat(s(o.expr, l));
      if (o.type == "range") {
        let a = l;
        for (let c = 0; c < o.min; c++) {
          let u = t();
          i(s(o.expr, a), u), a = u;
        }
        if (o.max == -1)
          i(s(o.expr, a), a);
        else
          for (let c = o.min; c < o.max; c++) {
            let u = t();
            r(a, u), i(s(o.expr, a), u), a = u;
          }
        return [r(a)];
      } else {
        if (o.type == "name")
          return [r(l, void 0, o.value)];
        throw new Error("Unknown expr type");
      }
    }
  }
}
function Ba(n, e) {
  return e - n;
}
function Io(n, e) {
  let t = [];
  return r(e), t.sort(Ba);
  function r(i) {
    let s = n[i];
    if (s.length == 1 && !s[0].term)
      return r(s[0].to);
    t.push(i);
    for (let o = 0; o < s.length; o++) {
      let { term: l, to: a } = s[o];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function sf(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Io(n, 0));
  function t(r) {
    let i = [];
    r.forEach((o) => {
      n[o].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        Io(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let s = e[r.join(",")] = new Dt(r.indexOf(n.length - 1) > -1);
    for (let o = 0; o < i.length; o++) {
      let l = i[o][1].sort(Ba);
      s.next.push({ type: i[o][0], next: e[l.join(",")] || t(l) });
    }
    return s;
  }
}
function of(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], s = !i.validEnd, o = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      o.push(a.name), s && !(a.isText || a.hasRequiredAttrs()) && (s = !1), r.indexOf(c) == -1 && r.push(c);
    }
    s && e.err("Only non-generatable nodes (" + o.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function $a(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function za(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let i = e && e[r];
    if (i === void 0) {
      let s = n[r];
      if (s.hasDefault)
        i = s.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = i;
  }
  return t;
}
function _a(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
function Fa(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new af(n, r, e[r]);
  return t;
}
let Do = class Ha {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Fa(e, r.attrs), this.defaultAttrs = $a(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
  }
  /**
  True if this is an inline type.
  */
  get isInline() {
    return !this.isBlock;
  }
  /**
  True if this is a textblock type, a block that contains inline
  content.
  */
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  /**
  True for node types that allow no content.
  */
  get isLeaf() {
    return this.contentMatch == Dt.empty;
  }
  /**
  True when this node is an atom, i.e. when it does not have
  directly editable content.
  */
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  /**
  Return true when this node type is part of the given
  [group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).
  */
  isInGroup(e) {
    return this.groups.indexOf(e) > -1;
  }
  /**
  The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.
  */
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? "pre" : "normal");
  }
  /**
  Tells you whether this node type has any required attributes.
  */
  hasRequiredAttrs() {
    for (let e in this.attrs)
      if (this.attrs[e].isRequired)
        return !0;
    return !1;
  }
  /**
  Indicates whether this node allows some of the same content as
  the given node type.
  */
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  /**
  @internal
  */
  computeAttrs(e) {
    return !e && this.defaultAttrs ? this.defaultAttrs : za(this.attrs, e);
  }
  /**
  Create a `Node` of this type. The given attributes are
  checked and defaulted (you can pass `null` to use the type's
  defaults entirely, if no required attributes exist). `content`
  may be a `Fragment`, a node, an array of nodes, or
  `null`. Similarly `marks` may be `null` to default to the empty
  set of marks.
  */
  create(e = null, t, r) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new Tt(this, this.computeAttrs(e), x.from(t), _.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = x.from(t), this.checkContent(t), new Tt(this, this.computeAttrs(e), t, _.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
  necessary to add nodes to the start or end of the given fragment
  to make it fit the node. If no fitting wrapping can be found,
  return null. Note that, due to the fact that required nodes can
  always be created, this will always succeed if you pass null or
  `Fragment.empty` as content.
  */
  createAndFill(e = null, t, r) {
    if (e = this.computeAttrs(e), t = x.from(t), t.size) {
      let o = this.contentMatch.fillBefore(t);
      if (!o)
        return null;
      t = o.append(t);
    }
    let i = this.contentMatch.matchFragment(t), s = i && i.fillBefore(x.empty, !0);
    return s ? new Tt(this, e, t.append(s), _.setFrom(r)) : null;
  }
  /**
  Returns true if the given fragment is valid content for this node
  type.
  */
  validContent(e) {
    let t = this.contentMatch.matchFragment(e);
    if (!t || !t.validEnd)
      return !1;
    for (let r = 0; r < e.childCount; r++)
      if (!this.allowsMarks(e.child(r).marks))
        return !1;
    return !0;
  }
  /**
  Throws a RangeError if the given fragment is not valid content for this
  node type.
  @internal
  */
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(`Invalid content for node ${this.name}: ${e.toString().slice(0, 50)}`);
  }
  /**
  @internal
  */
  checkAttrs(e) {
    _a(this.attrs, e, "node", this.name);
  }
  /**
  Check whether the given mark type is allowed in this node.
  */
  allowsMarkType(e) {
    return this.markSet == null || this.markSet.indexOf(e) > -1;
  }
  /**
  Test whether the given set of marks are allowed in this node.
  */
  allowsMarks(e) {
    if (this.markSet == null)
      return !0;
    for (let t = 0; t < e.length; t++)
      if (!this.allowsMarkType(e[t].type))
        return !1;
    return !0;
  }
  /**
  Removes the marks that are not allowed in this node from the given set.
  */
  allowedMarks(e) {
    if (this.markSet == null)
      return e;
    let t;
    for (let r = 0; r < e.length; r++)
      this.allowsMarkType(e[r].type) ? t && t.push(e[r]) : t || (t = e.slice(0, r));
    return t ? t.length ? t : _.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((s, o) => r[s] = new Ha(s, t, o));
    let i = t.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let s in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function lf(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let s = i === null ? "null" : typeof i;
    if (r.indexOf(s) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${s}`);
  };
}
class af {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? lf(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class si {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Fa(e, i.attrs), this.excluded = null;
    let s = $a(this.attrs);
    this.instance = s ? new _(this, s) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new _(this, za(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((s, o) => r[s] = new si(s, i++, t, o)), r;
  }
  /**
  When there is a mark of this type in the given set, a new set
  without it is returned. Otherwise, the input set is returned.
  */
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && (e = e.slice(0, t).concat(e.slice(t + 1)), t--);
    return e;
  }
  /**
  Tests whether there is a mark of this type in the given set.
  */
  isInSet(e) {
    for (let t = 0; t < e.length; t++)
      if (e[t].type == this)
        return e[t];
  }
  /**
  @internal
  */
  checkAttrs(e) {
    _a(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class Va {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = ee.from(e.nodes), t.marks = ee.from(e.marks || {}), this.nodes = Do.compile(this.spec.nodes, this), this.marks = si.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let s = this.nodes[i], o = s.spec.content || "", l = s.spec.marks;
      if (s.contentMatch = r[o] || (r[o] = Dt.parse(o, this.nodes)), s.inlineContent = s.contentMatch.inlineContent, s.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!s.isInline || !s.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = s;
      }
      s.markSet = l == "_" ? null : l ? Ro(this, l.split(" ")) : l == "" || !s.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let s = this.marks[i], o = s.spec.excludes;
      s.excluded = o == null ? [s] : o == "" ? [] : Ro(this, o.split(" "));
    }
    this.nodeFromJSON = (i) => Tt.fromJSON(this, i), this.markFromJSON = (i) => _.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
  }
  /**
  Create a node in this schema. The `type` may be a string or a
  `NodeType` instance. Attributes will be extended with defaults,
  `content` may be a `Fragment`, `null`, a `Node`, or an array of
  nodes.
  */
  node(e, t = null, r, i) {
    if (typeof e == "string")
      e = this.nodeType(e);
    else if (e instanceof Do) {
      if (e.schema != this)
        throw new RangeError("Node type from different schema used (" + e.name + ")");
    } else throw new RangeError("Invalid node type: " + e);
    return e.createChecked(t, r, i);
  }
  /**
  Create a text node in the schema. Empty text nodes are not
  allowed.
  */
  text(e, t) {
    let r = this.nodes.text;
    return new kr(r, r.defaultAttrs, e, _.setFrom(t));
  }
  /**
  Create a mark with the given type and attributes.
  */
  mark(e, t) {
    return typeof e == "string" && (e = this.marks[e]), e.create(t);
  }
  /**
  @internal
  */
  nodeType(e) {
    let t = this.nodes[e];
    if (!t)
      throw new RangeError("Unknown node type: " + e);
    return t;
  }
}
function Ro(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], s = n.marks[i], o = s;
    if (s)
      t.push(s);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(o = a);
      }
    if (!o)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function cf(n) {
  return n.tag != null;
}
function uf(n) {
  return n.style != null;
}
class st {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (cf(i))
        this.tags.push(i);
      else if (uf(i)) {
        let s = /[^=]*/.exec(i.style)[0];
        r.indexOf(s) < 0 && r.push(s), this.styles.push(i);
      }
    }), this.normalizeLists = !this.tags.some((i) => {
      if (!/^(ul|ol)\b/.test(i.tag) || !i.node)
        return !1;
      let s = e.nodes[i.node];
      return s.contentMatch.matchType(s);
    });
  }
  /**
  Parse a document from the content of a DOM node.
  */
  parse(e, t = {}) {
    let r = new Po(this, t, !1);
    return r.addAll(e, _.none, t.from, t.to), r.finish();
  }
  /**
  Parses the content of the given DOM node, like
  [`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
  options. But unlike that method, which produces a whole node,
  this one returns a slice that is open at the sides, meaning that
  the schema constraints aren't applied to the start of nodes to
  the left of the input and the end of nodes at the end.
  */
  parseSlice(e, t = {}) {
    let r = new Po(this, t, !0);
    return r.addAll(e, _.none, t.from, t.to), v.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let s = this.tags[i];
      if (hf(e, s.tag) && (s.namespace === void 0 || e.namespaceURI == s.namespace) && (!s.context || t.matchesContext(s.context))) {
        if (s.getAttrs) {
          let o = s.getAttrs(e);
          if (o === !1)
            continue;
          s.attrs = o || void 0;
        }
        return s;
      }
    }
  }
  /**
  @internal
  */
  matchStyle(e, t, r, i) {
    for (let s = i ? this.styles.indexOf(i) + 1 : 0; s < this.styles.length; s++) {
      let o = this.styles[s], l = o.style;
      if (!(l.indexOf(e) != 0 || o.context && !r.matchesContext(o.context) || // Test that the style string either precisely matches the prop,
      // or has an '=' sign after the prop, followed by the given
      // value.
      l.length > e.length && (l.charCodeAt(e.length) != 61 || l.slice(e.length + 1) != t))) {
        if (o.getAttrs) {
          let a = o.getAttrs(t);
          if (a === !1)
            continue;
          o.attrs = a || void 0;
        }
        return o;
      }
    }
  }
  /**
  @internal
  */
  static schemaRules(e) {
    let t = [];
    function r(i) {
      let s = i.priority == null ? 50 : i.priority, o = 0;
      for (; o < t.length; o++) {
        let l = t[o];
        if ((l.priority == null ? 50 : l.priority) < s)
          break;
      }
      t.splice(o, 0, i);
    }
    for (let i in e.marks) {
      let s = e.marks[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = Bo(o)), o.mark || o.ignore || o.clearMark || (o.mark = i);
      });
    }
    for (let i in e.nodes) {
      let s = e.nodes[i].spec.parseDOM;
      s && s.forEach((o) => {
        r(o = Bo(o)), o.node || o.ignore || o.mark || (o.node = i);
      });
    }
    return t;
  }
  /**
  Construct a DOM parser using the parsing rules listed in a
  schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
  [priority](https://prosemirror.net/docs/ref/#model.GenericParseRule.priority).
  */
  static fromSchema(e) {
    return e.cached.domParser || (e.cached.domParser = new st(e, st.schemaRules(e)));
  }
}
const ja = {
  address: !0,
  article: !0,
  aside: !0,
  blockquote: !0,
  body: !0,
  canvas: !0,
  dd: !0,
  div: !0,
  dl: !0,
  fieldset: !0,
  figcaption: !0,
  figure: !0,
  footer: !0,
  form: !0,
  h1: !0,
  h2: !0,
  h3: !0,
  h4: !0,
  h5: !0,
  h6: !0,
  header: !0,
  hgroup: !0,
  hr: !0,
  li: !0,
  noscript: !0,
  ol: !0,
  output: !0,
  p: !0,
  pre: !0,
  section: !0,
  table: !0,
  tfoot: !0,
  ul: !0
}, df = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Wa = { ol: !0, ul: !0 }, Dn = 1, cs = 2, bn = 4;
function Lo(n, e, t) {
  return e != null ? (e ? Dn : 0) | (e === "full" ? cs : 0) : n && n.whitespace == "pre" ? Dn | cs : t & ~bn;
}
class Qn {
  constructor(e, t, r, i, s, o) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = o, this.content = [], this.activeMarks = _.none, this.match = s || (o & bn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(x.from(e));
      if (t)
        this.match = this.type.contentMatch.matchFragment(t);
      else {
        let r = this.type.contentMatch, i;
        return (i = r.findWrapping(e.type)) ? (this.match = r, i) : null;
      }
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & Dn)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let s = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = s.withText(s.text.slice(0, s.text.length - i[0].length));
      }
    }
    let t = x.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(x.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !ja.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Po {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, s, o = Lo(null, t.preserveWhitespace, 0) | (r ? bn : 0);
    i ? s = new Qn(i.type, i.attrs, _.none, !0, t.topMatch || i.type.contentMatch, o) : r ? s = new Qn(null, null, _.none, !0, null, o) : s = new Qn(e.schema.topNodeType, null, _.none, !0, null, o), this.nodes = [s], this.find = t.findPositions, this.needsBlock = !1;
  }
  get top() {
    return this.nodes[this.open];
  }
  // Add a DOM node to the content. Text is inserted as text node,
  // otherwise, the node is passed to `addElement` or, if it has a
  // `style` attribute, `addElementWithStyles`.
  addDOM(e, t) {
    e.nodeType == 3 ? this.addTextNode(e, t) : e.nodeType == 1 && this.addElement(e, t);
  }
  addTextNode(e, t) {
    let r = e.nodeValue, i = this.top, s = i.options & cs ? "full" : this.localPreserveWS || (i.options & Dn) > 0, { schema: o } = this.parser;
    if (s === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (s)
        if (s === "full")
          r = r.replace(/\r\n?/g, `
`);
        else if (o.linebreakReplacement && /[\r\n]/.test(r) && this.top.findWrapping(o.linebreakReplacement.create())) {
          let l = r.split(/\r?\n|\r/);
          for (let a = 0; a < l.length; a++)
            a && this.insertNode(o.linebreakReplacement.create(), t, !0), l[a] && this.insertNode(o.text(l[a]), t, !/\S/.test(l[a]));
          r = "";
        } else
          r = r.replace(/\r?\n|\r/g, " ");
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let l = i.content[i.content.length - 1], a = e.previousSibling;
        (!l || a && a.nodeName == "BR" || l.isText && /[ \t\r\n\u000c]$/.test(l.text)) && (r = r.slice(1));
      }
      r && this.insertNode(o.text(r), t, !/\S/.test(r)), this.findInText(e);
    } else
      this.findInside(e);
  }
  // Try to find a handler for the given tag and use that to parse. If
  // none is found, the element's content nodes are added directly.
  addElement(e, t, r) {
    let i = this.localPreserveWS, s = this.top;
    (e.tagName == "PRE" || /pre/.test(e.style && e.style.whiteSpace)) && (this.localPreserveWS = !0);
    let o = e.nodeName.toLowerCase(), l;
    Wa.hasOwnProperty(o) && this.parser.normalizeLists && ff(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : df.hasOwnProperty(o))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (ja.hasOwnProperty(o))
        s.content.length && s.content[0].isInline && this.open && (this.open--, s = this.top), c = !0, s.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let d = a && a.skip ? t : this.readStyles(e, t);
      d && this.addAll(e, d), c && this.sync(s), this.needsBlock = u;
    } else {
      let c = this.readStyles(e, t);
      c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
    }
    this.localPreserveWS = i;
  }
  // Called for leaf DOM nodes that would otherwise be ignored
  leafFallback(e, t) {
    e.nodeName == "BR" && this.top.type && this.top.type.inlineContent && this.addTextNode(e.ownerDocument.createTextNode(`
`), t);
  }
  // Called for ignored nodes
  ignoreFallback(e, t) {
    e.nodeName == "BR" && (!this.top.type || !this.top.type.inlineContent) && this.findPlace(this.parser.schema.text("-"), t, !0);
  }
  // Run any style parser associated with the node's styles. Either
  // return an updated array of marks, or null to indicate some of the
  // styles had a rule with `ignore` set.
  readStyles(e, t) {
    let r = e.style;
    if (r && r.length)
      for (let i = 0; i < this.parser.matchedStyles.length; i++) {
        let s = this.parser.matchedStyles[i], o = r.getPropertyValue(s);
        if (o)
          for (let l = void 0; ; ) {
            let a = this.parser.matchStyle(s, o, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? t = t.filter((c) => !a.clearMark(c)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
            else
              break;
          }
      }
    return t;
  }
  // Look up a handler for the given node. If none are found, return
  // false. Otherwise, apply it, use its return value to drive the way
  // the node's content is wrapped, and return true.
  addElementByRule(e, t, r, i) {
    let s, o;
    if (t.node)
      if (o = this.parser.schema.nodes[t.node], o.isLeaf)
        this.insertNode(o.create(t.attrs), r, e.nodeName == "BR") || this.leafFallback(e, r);
      else {
        let a = this.enter(o, t.attrs || null, r, t.preserveWhitespace);
        a && (s = !0, r = a);
      }
    else {
      let a = this.parser.schema.marks[t.mark];
      r = r.concat(a.create(t.attrs));
    }
    let l = this.top;
    if (o && o.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, r, !1));
    else {
      let a = e;
      typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement), this.findAround(e, a, !0), this.addAll(a, r), this.findAround(e, a, !1);
    }
    s && this.sync(l) && this.open--;
  }
  // Add all child nodes between `startIndex` and `endIndex` (or the
  // whole node, if not given). If `sync` is passed, use it to
  // synchronize after every block element.
  addAll(e, t, r, i) {
    let s = r || 0;
    for (let o = r ? e.childNodes[r] : e.firstChild, l = i == null ? null : e.childNodes[i]; o != l; o = o.nextSibling, ++s)
      this.findAtPoint(e, s), this.addDOM(o, t);
    this.findAtPoint(e, s);
  }
  // Try to find a way to fit the given node type into the current
  // context. May add intermediate wrappers and/or leave non-solid
  // nodes that we're in.
  findPlace(e, t, r) {
    let i, s;
    for (let o = this.open, l = 0; o >= 0; o--) {
      let a = this.nodes[o], c = a.findWrapping(e);
      if (c && (!i || i.length > c.length + l) && (i = c, s = a, !c.length))
        break;
      if (a.solid) {
        if (r)
          break;
        l += 2;
      }
    }
    if (!i)
      return null;
    this.sync(s);
    for (let o = 0; o < i.length; o++)
      t = this.enterInner(i[o], null, t, !1);
    return t;
  }
  // Try to insert the given node, adjusting the context when needed.
  insertNode(e, t, r) {
    if (e.isInline && this.needsBlock && !this.top.type) {
      let s = this.textblockFromContext();
      s && (t = this.enterInner(s, null, t));
    }
    let i = this.findPlace(e, t, r);
    if (i) {
      this.closeExtra();
      let s = this.top;
      s.match && (s.match = s.match.matchType(e.type));
      let o = _.none;
      for (let l of i.concat(e.marks))
        (s.type ? s.type.allowsMarkType(l.type) : $o(l.type, e.type)) && (o = l.addToSet(o));
      return s.content.push(e.mark(o)), !0;
    }
    return !1;
  }
  // Try to start a node of the given type, adjusting the context when
  // necessary.
  enter(e, t, r, i) {
    let s = this.findPlace(e.create(t), r, !1);
    return s && (s = this.enterInner(e, t, r, !0, i)), s;
  }
  // Open a node of the given type
  enterInner(e, t, r, i = !1, s) {
    this.closeExtra();
    let o = this.top;
    o.match = o.match && o.match.matchType(e);
    let l = Lo(e, s, o.options);
    o.options & bn && o.content.length == 0 && (l |= bn);
    let a = _.none;
    return r = r.filter((c) => (o.type ? o.type.allowsMarkType(c.type) : $o(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new Qn(e, t, a, i, null, l)), this.open++, r;
  }
  // Make sure all nodes above this.open are finished and added to
  // their parents
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return this.open = 0, this.closeExtra(this.isOpen), this.nodes[0].finish(!!(this.isOpen || this.options.topOpen));
  }
  sync(e) {
    for (let t = this.open; t >= 0; t--) {
      if (this.nodes[t] == e)
        return this.open = t, !0;
      this.localPreserveWS && (this.nodes[t].options |= Dn);
    }
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let e = 0;
    for (let t = this.open; t >= 0; t--) {
      let r = this.nodes[t].content;
      for (let i = r.length - 1; i >= 0; i--)
        e += r[i].nodeSize;
      t && e++;
    }
    return e;
  }
  findAtPoint(e, t) {
    if (this.find)
      for (let r = 0; r < this.find.length; r++)
        this.find[r].node == e && this.find[r].offset == t && (this.find[r].pos = this.currentPos);
  }
  findInside(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].pos == null && e.nodeType == 1 && e.contains(this.find[t].node) && (this.find[t].pos = this.currentPos);
  }
  findAround(e, t, r) {
    if (e != t && this.find)
      for (let i = 0; i < this.find.length; i++)
        this.find[i].pos == null && e.nodeType == 1 && e.contains(this.find[i].node) && t.compareDocumentPosition(this.find[i].node) & (r ? 2 : 4) && (this.find[i].pos = this.currentPos);
  }
  findInText(e) {
    if (this.find)
      for (let t = 0; t < this.find.length; t++)
        this.find[t].node == e && (this.find[t].pos = this.currentPos - (e.nodeValue.length - this.find[t].offset));
  }
  // Determines whether the given context string matches this context.
  matchesContext(e) {
    if (e.indexOf("|") > -1)
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let t = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), s = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), o = (l, a) => {
      for (; l >= 0; l--) {
        let c = t[l];
        if (c == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= s; a--)
            if (o(l - 1, a))
              return !0;
          return !1;
        } else {
          let u = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= s ? r.node(a - s).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
            return !1;
          a--;
        }
      }
      return !0;
    };
    return o(t.length - 1, this.open);
  }
  textblockFromContext() {
    let e = this.options.context;
    if (e)
      for (let t = e.depth; t >= 0; t--) {
        let r = e.node(t).contentMatchAt(e.indexAfter(t)).defaultType;
        if (r && r.isTextblock && r.defaultAttrs)
          return r;
      }
    for (let t in this.parser.schema.nodes) {
      let r = this.parser.schema.nodes[t];
      if (r.isTextblock && r.defaultAttrs)
        return r;
    }
  }
}
function ff(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Wa.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function hf(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function Bo(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function $o(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n))
      continue;
    let s = [], o = (l) => {
      s.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: u } = l.edge(a);
        if (c == e || s.indexOf(u) < 0 && o(u))
          return !0;
      }
    };
    if (o(i.contentMatch))
      return !0;
  }
}
class Bt {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, r) {
    r || (r = Yn(t).createDocumentFragment());
    let i = r, s = [];
    return e.forEach((o) => {
      if (s.length || o.marks.length) {
        let l = 0, a = 0;
        for (; l < s.length && a < o.marks.length; ) {
          let c = o.marks[a];
          if (!this.marks[c.type.name]) {
            a++;
            continue;
          }
          if (!c.eq(s[l][0]) || c.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < s.length; )
          i = s.pop()[1];
        for (; a < o.marks.length; ) {
          let c = o.marks[a++], u = this.serializeMark(c, o.isInline, t);
          u && (s.push([c, i]), i.appendChild(u.dom), i = u.contentDOM || u.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(o, t));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    if (e.isText)
      return Yn(t).createTextNode(e.text);
    let { dom: r, contentDOM: i } = dr(Yn(t), this.nodes[e.type.name](e), null, e.attrs);
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, i);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let s = this.serializeMark(e.marks[i], e.isInline, t);
      s && ((s.contentDOM || s.dom).appendChild(r), r = s.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, t, r = {}) {
    let i = this.marks[e.type.name];
    return i && dr(Yn(r), i(e, t), null, e.attrs);
  }
  static renderSpec(e, t, r = null, i) {
    return typeof t == "string" ? { dom: e.createTextNode(t) } : dr(e, t, r, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new Bt(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = zo(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return zo(e.marks);
  }
}
function zo(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function Yn(n) {
  return n.document || window.document;
}
const _o = /* @__PURE__ */ new WeakMap();
function pf(n) {
  let e = _o.get(n);
  return e === void 0 && _o.set(n, e = mf(n)), e;
}
function mf(n) {
  let e = null;
  function t(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string")
          e || (e = []), e.push(r);
        else
          for (let i = 0; i < r.length; i++)
            t(r[i]);
      else
        for (let i in r)
          t(r[i]);
  }
  return t(n), e;
}
function dr(n, e, t, r) {
  if (e.nodeType == 1)
    return { dom: e };
  if (e.dom && e.dom.nodeType == 1)
    return e;
  let i = e[0], s;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (s = pf(r)) && s.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let o = i.indexOf(" ");
  o > 0 && (t = i.slice(0, o), i = i.slice(o + 1));
  let l, a = t ? n.createElementNS(t, i) : n.createElement(i), c = e[1], u = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let d in c)
      if (c[d] != null) {
        let f = d.indexOf(" ");
        f > 0 ? a.setAttributeNS(d.slice(0, f), d.slice(f + 1), c[d]) : d == "style" && a.style ? a.style.cssText = c[d] : a.setAttribute(d, c[d]);
      }
  }
  for (let d = u; d < e.length; d++) {
    let f = e[d];
    if (f === 0) {
      if (d < e.length - 1 || d > u)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: a, contentDOM: a };
    } else if (typeof f == "string")
      a.appendChild(n.createTextNode(f));
    else {
      let { dom: h, contentDOM: p } = dr(n, f, t, r);
      if (a.appendChild(h), p) {
        if (l)
          throw new RangeError("Multiple content holes");
        l = p;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const Ua = 65535, qa = Math.pow(2, 16);
function gf(n, e) {
  return n + e * qa;
}
function Fo(n) {
  return n & Ua;
}
function yf(n) {
  return (n - (n & Ua)) / qa;
}
const Ka = 1, Ja = 2, fr = 4, Ga = 8;
class us {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.pos = e, this.delInfo = t, this.recover = r;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & Ga) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Ka | fr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Ja | fr)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & fr) > 0;
  }
}
class Se {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Se.empty)
      return Se.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Fo(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + yf(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0, s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], u = this.ranges[l + o], d = a + c;
      if (e <= d) {
        let f = c ? e == a ? -1 : e == d ? 1 : t : t, h = a + i + (f < 0 ? 0 : u);
        if (r)
          return h;
        let p = e == (t < 0 ? a : d) ? null : gf(l / 3, e - a), m = e == a ? Ja : e == d ? Ka : fr;
        return (t < 0 ? e != a : e != d) && (m |= Ga), new us(h, m, p);
      }
      i += u - c;
    }
    return r ? e + i : new us(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Fo(t), s = this.inverted ? 2 : 1, o = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + s], u = a + c;
      if (e <= u && l == i * 3)
        return !0;
      r += this.ranges[l + o] - c;
    }
    return !1;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(e) {
    let t = this.inverted ? 2 : 1, r = this.inverted ? 1 : 2;
    for (let i = 0, s = 0; i < this.ranges.length; i += 3) {
      let o = this.ranges[i], l = o - (this.inverted ? s : 0), a = o + (this.inverted ? 0 : s), c = this.ranges[i + t], u = this.ranges[i + r];
      e(l, l + c, a, a + u), s += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new Se(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(e) {
    return e == 0 ? Se.empty : new Se(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Se.empty = new Se([]);
class Rn {
  /**
  Create a new mapping with the given position maps.
  */
  constructor(e, t, r = 0, i = e ? e.length : 0) {
    this.mirror = t, this.from = r, this.to = i, this._maps = e || [], this.ownData = !(e || t);
  }
  /**
  The step maps in this mapping.
  */
  get maps() {
    return this._maps;
  }
  /**
  Create a mapping that maps only through a part of this one.
  */
  slice(e = 0, t = this.maps.length) {
    return new Rn(this._maps, this.mirror, e, t);
  }
  /**
  Add a step map to the end of this mapping. If `mirrors` is
  given, it should be the index of the step map that is the mirror
  image of this one.
  */
  appendMap(e, t) {
    this.ownData || (this._maps = this._maps.slice(), this.mirror = this.mirror && this.mirror.slice(), this.ownData = !0), this.to = this._maps.push(e), t != null && this.setMirror(this._maps.length - 1, t);
  }
  /**
  Add all the step maps in a given mapping to this one (preserving
  mirroring information).
  */
  appendMapping(e) {
    for (let t = 0, r = this._maps.length; t < e._maps.length; t++) {
      let i = e.getMirror(t);
      this.appendMap(e._maps[t], i != null && i < t ? r + i : void 0);
    }
  }
  /**
  Finds the offset of the step map that mirrors the map at the
  given offset, in this mapping (as per the second argument to
  `appendMap`).
  */
  getMirror(e) {
    if (this.mirror) {
      for (let t = 0; t < this.mirror.length; t++)
        if (this.mirror[t] == e)
          return this.mirror[t + (t % 2 ? -1 : 1)];
    }
  }
  /**
  @internal
  */
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  /**
  Append the inverse of the given mapping to this one.
  */
  appendMappingInverted(e) {
    for (let t = e.maps.length - 1, r = this._maps.length + e._maps.length; t >= 0; t--) {
      let i = e.getMirror(t);
      this.appendMap(e._maps[t].invert(), i != null && i > t ? r - i - 1 : void 0);
    }
  }
  /**
  Create an inverted version of this mapping.
  */
  invert() {
    let e = new Rn();
    return e.appendMappingInverted(this), e;
  }
  /**
  Map a position through this mapping.
  */
  map(e, t = 1) {
    if (this.mirror)
      return this._map(e, t, !0);
    for (let r = this.from; r < this.to; r++)
      e = this._maps[r].map(e, t);
    return e;
  }
  /**
  Map a position through this mapping, returning a mapping
  result.
  */
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  /**
  @internal
  */
  _map(e, t, r) {
    let i = 0;
    for (let s = this.from; s < this.to; s++) {
      let o = this._maps[s], l = o.mapResult(e, t);
      if (l.recover != null) {
        let a = this.getMirror(s);
        if (a != null && a > s && a < this.to) {
          s = a, e = this._maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new us(e, i, null);
  }
}
const Ci = /* @__PURE__ */ Object.create(null);
class ae {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Se.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(e) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let r = Ci[t.stepType];
    if (!r)
      throw new RangeError(`No step type ${t.stepType} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(e, t) {
    if (e in Ci)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Ci[e] = t, t.prototype.jsonID = e, t;
  }
}
class Q {
  /**
  @internal
  */
  constructor(e, t) {
    this.doc = e, this.failed = t;
  }
  /**
  Create a successful step result.
  */
  static ok(e) {
    return new Q(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new Q(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return Q.ok(e.replace(t, r, i));
    } catch (s) {
      if (s instanceof Nn)
        return Q.fail(s.message);
      throw s;
    }
  }
}
function Hs(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let s = n.child(i);
    s.content.size && (s = s.copy(Hs(s.content, e, s))), s.isInline && (s = e(s, t, i)), r.push(s);
  }
  return x.fromArray(r);
}
class rt extends ae {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), s = new v(Hs(t.content, (o, l) => !o.isAtom || !l.type.allowsMarkType(this.mark.type) ? o : o.mark(this.mark.addToSet(o.marks)), i), t.openStart, t.openEnd);
    return Q.fromReplace(e, this.from, this.to, s);
  }
  invert() {
    return new Oe(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new rt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof rt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new rt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new rt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ae.jsonID("addMark", rt);
class Oe extends ae {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new v(Hs(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return Q.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new rt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Oe(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Oe && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Oe(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new Oe(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ae.jsonID("removeMark", Oe);
class it extends ae {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Q.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return Q.fromReplace(e, this.pos, this.pos + 1, new v(x.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new it(this.pos, t.marks[i]);
        return new it(this.pos, this.mark);
      }
    }
    return new Rt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new it(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new it(t.pos, e.markFromJSON(t.mark));
  }
}
ae.jsonID("addNodeMark", it);
class Rt extends ae {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Q.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return Q.fromReplace(e, this.pos, this.pos + 1, new v(x.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new it(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Rt(t.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new Rt(t.pos, e.markFromJSON(t.mark));
  }
}
ae.jsonID("removeNodeMark", Rt);
class G extends ae {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(e, t, r, i = !1) {
    super(), this.from = e, this.to = t, this.slice = r, this.structure = i;
  }
  apply(e) {
    return this.structure && ds(e, this.from, this.to) ? Q.fail("Structure replace would overwrite content") : Q.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Se([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new G(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && G.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new G(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof G) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? v.empty : new v(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new G(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? v.empty : new v(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new G(e.from, this.to, t, this.structure);
    } else
      return null;
  }
  toJSON() {
    let e = { stepType: "replace", from: this.from, to: this.to };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new G(t.from, t.to, v.fromJSON(e, t.slice), !!t.structure);
  }
}
G.MAP_BIAS = 1;
ae.jsonID("replace", G);
class X extends ae {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(e, t, r, i, s, o, l = !1) {
    super(), this.from = e, this.to = t, this.gapFrom = r, this.gapTo = i, this.slice = s, this.insert = o, this.structure = l;
  }
  apply(e) {
    if (this.structure && (ds(e, this.from, this.gapFrom) || ds(e, this.gapTo, this.to)))
      return Q.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return Q.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? Q.fromReplace(e, this.from, this.to, r) : Q.fail("Content does not fit in gap");
  }
  getMap() {
    return new Se([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(e) {
    let t = this.gapTo - this.gapFrom;
    return new X(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), s = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || s > r.pos ? null : new X(t.pos, r.pos, i, s, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let e = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    return this.slice.size && (e.slice = this.slice.toJSON()), this.structure && (e.structure = !0), e;
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.from != "number" || typeof t.to != "number" || typeof t.gapFrom != "number" || typeof t.gapTo != "number" || typeof t.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new X(t.from, t.to, t.gapFrom, t.gapTo, v.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
ae.jsonID("replaceAround", X);
function ds(n, e, t) {
  let r = n.resolve(e), i = t - e, s = r.depth;
  for (; i > 0 && s > 0 && r.indexAfter(s) == r.node(s).childCount; )
    s--, i--;
  if (i > 0) {
    let o = r.node(s).maybeChild(r.indexAfter(s));
    for (; i > 0; ) {
      if (!o || o.isLeaf)
        return !0;
      o = o.firstChild, i--;
    }
  }
  return !1;
}
function bf(n, e, t, r) {
  let i = [], s = [], o, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let d = a.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), h = Math.min(c + a.nodeSize, t), p = r.addToSet(d);
      for (let m = 0; m < d.length; m++)
        d[m].isInSet(p) || (o && o.to == f && o.mark.eq(d[m]) ? o.to = h : i.push(o = new Oe(f, h, d[m])));
      l && l.to == f ? l.to = h : s.push(l = new rt(f, h, r));
    }
  }), i.forEach((a) => n.step(a)), s.forEach((a) => n.step(a));
}
function kf(n, e, t, r) {
  let i = [], s = 0;
  n.doc.nodesBetween(e, t, (o, l) => {
    if (!o.isInline)
      return;
    s++;
    let a = null;
    if (r instanceof si) {
      let c = o.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(o.marks) && (a = [r]) : a = o.marks;
    if (a && a.length) {
      let c = Math.min(l + o.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let d = a[u], f;
        for (let h = 0; h < i.length; h++) {
          let p = i[h];
          p.step == s - 1 && d.eq(i[h].style) && (f = p);
        }
        f ? (f.to = c, f.step = s) : i.push({ style: d, from: Math.max(l, e), to: c, step: s });
      }
    }
  }), i.forEach((o) => n.step(new Oe(o.from, o.to, o.style)));
}
function Vs(n, e, t, r = t.contentMatch, i = !0) {
  let s = n.doc.nodeAt(e), o = [], l = e + 1;
  for (let a = 0; a < s.childCount; a++) {
    let c = s.child(a), u = l + c.nodeSize, d = r.matchType(c.type);
    if (!d)
      o.push(new G(l, u, v.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        t.allowsMarkType(c.marks[f].type) || n.step(new Oe(l, u, c.marks[f]));
      if (i && c.isText && t.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new v(x.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), o.push(new G(l + f.index, l + f.index + f[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(x.empty, !0);
    n.replace(l, l, new v(a, 0, 0));
  }
  for (let a = o.length - 1; a >= 0; a--)
    n.step(o[a]);
}
function Sf(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function on(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, s = 0; ; --r) {
    let o = n.$from.node(r), l = n.$from.index(r) + i, a = n.$to.indexAfter(r) - s;
    if (r < n.depth && o.canReplace(l, a, t))
      return r;
    if (r == 0 || o.type.spec.isolating || !Sf(o, l, a))
      break;
    l && (i = 1), a < o.childCount && (s = 1);
  }
  return null;
}
function wf(n, e, t) {
  let { $from: r, $to: i, depth: s } = e, o = r.before(s + 1), l = i.after(s + 1), a = o, c = l, u = x.empty, d = 0;
  for (let p = s, m = !1; p > t; p--)
    m || r.index(p) > 0 ? (m = !0, u = x.from(r.node(p).copy(u)), d++) : a--;
  let f = x.empty, h = 0;
  for (let p = s, m = !1; p > t; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, f = x.from(i.node(p).copy(f)), h++) : c++;
  n.step(new X(a, c, o, l, new v(u.append(f), d, h), u.size - d, !0));
}
function js(n, e, t = null, r = n) {
  let i = xf(n, e), s = i && Cf(r, e);
  return s ? i.map(Ho).concat({ type: e, attrs: t }).concat(s.map(Ho)) : null;
}
function Ho(n) {
  return { type: n, attrs: null };
}
function xf(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, s = t.contentMatchAt(r).findWrapping(e);
  if (!s)
    return null;
  let o = s.length ? s[0] : e;
  return t.canReplaceWith(r, i, o) ? s : null;
}
function Cf(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, s = t.child(r), o = e.contentMatch.findWrapping(s.type);
  if (!o)
    return null;
  let a = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : o;
}
function Ef(n, e, t) {
  let r = x.empty;
  for (let o = t.length - 1; o >= 0; o--) {
    if (r.size) {
      let l = t[o].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = x.from(t[o].type.create(t[o].attrs, r));
  }
  let i = e.start, s = e.end;
  n.step(new X(i, s, i, s, new v(r, 0, 0), t.length, !0));
}
function vf(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let s = n.steps.length;
  n.doc.nodesBetween(e, t, (o, l) => {
    let a = typeof i == "function" ? i(o) : i;
    if (o.isTextblock && !o.hasMarkup(r, a) && Mf(n.doc, n.mapping.slice(s).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? c = !1 : !h && p && (c = !0);
      }
      c === !1 && Ya(n, o, l, s), Vs(n, n.mapping.slice(s).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(s), d = u.map(l, 1), f = u.map(l + o.nodeSize, 1);
      return n.step(new X(d, f, d + 1, f - 1, new v(x.from(r.create(a, null, o.marks)), 0, 0), 1, !0)), c === !0 && Qa(n, o, l, s), !1;
    }
  });
}
function Qa(n, e, t, r) {
  e.forEach((i, s) => {
    if (i.isText) {
      let o, l = /\r?\n|\r/g;
      for (; o = l.exec(i.text); ) {
        let a = n.mapping.slice(r).map(t + 1 + s + o.index);
        n.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
      }
    }
  });
}
function Ya(n, e, t, r) {
  e.forEach((i, s) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let o = n.mapping.slice(r).map(t + 1 + s);
      n.replaceWith(o, o + 1, e.type.schema.text(`
`));
    }
  });
}
function Mf(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function Tf(n, e, t, r, i) {
  let s = n.doc.nodeAt(e);
  if (!s)
    throw new RangeError("No node at given position");
  t || (t = s.type);
  let o = t.create(r, null, i || s.marks);
  if (s.isLeaf)
    return n.replaceWith(e, e + s.nodeSize, o);
  if (!t.validContent(s.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new X(e, e + s.nodeSize, e + 1, e + s.nodeSize - 1, new v(x.from(o), 0, 0), 1, !0));
}
function qe(n, e, t = 1, r) {
  let i = n.resolve(e), s = i.depth - t, o = r && r[r.length - 1] || i.parent;
  if (s < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !o.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > s; c--, u--) {
    let d = i.node(c), f = i.index(c);
    if (d.type.spec.isolating)
      return !1;
    let h = d.content.cutByIndex(f, d.childCount), p = r && r[u + 1];
    p && (h = h.replaceChild(0, p.type.create(p.attrs)));
    let m = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !m.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(s), a = r && r[0];
  return i.node(s).canReplaceWith(l, l, a ? a.type : i.node(s + 1).type);
}
function Af(n, e, t = 1, r) {
  let i = n.doc.resolve(e), s = x.empty, o = x.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    s = x.from(i.node(l).copy(s));
    let u = r && r[c];
    o = x.from(u ? u.type.create(u.attrs, o) : i.node(l).copy(o));
  }
  n.step(new G(e, e, new v(s.append(o), t, t), !0));
}
function ft(n, e) {
  let t = n.resolve(e), r = t.index();
  return Xa(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function Of(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let s = e.child(i), o = s.type == r ? n.type.schema.nodes.text : s.type;
    if (t = t.matchType(o), !t || !n.type.allowsMarks(s.marks))
      return !1;
  }
  return t.validEnd;
}
function Xa(n, e) {
  return !!(n && e && !n.isLeaf && Of(n, e));
}
function oi(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let s, o, l = r.index(i);
    if (i == r.depth ? (s = r.nodeBefore, o = r.nodeAfter) : t > 0 ? (s = r.node(i + 1), l++, o = r.node(i).maybeChild(l)) : (s = r.node(i).maybeChild(l - 1), o = r.node(i + 1)), s && !s.isTextblock && Xa(s, o) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function Nf(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, s = n.doc.resolve(e - t), o = s.node().type;
  if (i && o.inlineContent) {
    let u = o.whitespace == "pre", d = !!o.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    Ya(n, u.node(), u.before(), l);
  }
  o.inlineContent && Vs(n, e + t - 1, o, s.node().contentMatchAt(s.index()), r == null);
  let a = n.mapping.slice(l), c = a.map(e - t);
  if (n.step(new G(c, a.map(e + t, -1), v.empty, !0)), r === !0) {
    let u = n.doc.resolve(c);
    Qa(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function If(n, e, t) {
  let r = n.resolve(e);
  if (r.parent.canReplaceWith(r.index(), r.index(), t))
    return e;
  if (r.parentOffset == 0)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.index(i);
      if (r.node(i).canReplaceWith(s, s, t))
        return r.before(i + 1);
      if (s > 0)
        return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let i = r.depth - 1; i >= 0; i--) {
      let s = r.indexAfter(i);
      if (r.node(i).canReplaceWith(s, s, t))
        return r.after(i + 1);
      if (s < r.node(i).childCount)
        return null;
    }
  return null;
}
function Za(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let i = t.content;
  for (let s = 0; s < t.openStart; s++)
    i = i.firstChild.content;
  for (let s = 1; s <= (t.openStart == 0 && t.size ? 2 : 1); s++)
    for (let o = r.depth; o >= 0; o--) {
      let l = o == r.depth ? 0 : r.pos <= (r.start(o + 1) + r.end(o + 1)) / 2 ? -1 : 1, a = r.index(o) + (l > 0 ? 1 : 0), c = r.node(o), u = !1;
      if (s == 1)
        u = c.canReplace(a, a, i);
      else {
        let d = c.contentMatchAt(a).findWrapping(i.firstChild.type);
        u = d && c.canReplaceWith(a, a, d[0]);
      }
      if (u)
        return l == 0 ? r.pos : l < 0 ? r.before(o + 1) : r.after(o + 1);
    }
  return null;
}
function li(n, e, t = e, r = v.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), s = n.resolve(t);
  return ec(i, s, r) ? new G(e, t, r) : new Df(i, s, r).fit();
}
function ec(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class Df {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = x.empty;
    for (let i = 0; i <= e.depth; i++) {
      let s = e.node(i);
      this.frontier.push({
        type: s.type,
        match: s.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = x.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let s = this.placed, o = r.depth, l = i.depth;
    for (; o && l && s.childCount == 1; )
      s = s.firstChild.content, o--, l--;
    let a = new v(s, o, l);
    return e > -1 ? new X(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new G(r.pos, i.pos, a) : null;
  }
  // Find a position on the start spine of `this.unplaced` that has
  // content that can be moved somewhere on the frontier. Returns two
  // depths, one for the slice and one for the frontier.
  findFittable() {
    let e = this.unplaced.openStart;
    for (let t = this.unplaced.content, r = 0, i = this.unplaced.openEnd; r < e; r++) {
      let s = t.firstChild;
      if (t.childCount > 1 && (i = 0), s.type.spec.isolating && i <= r) {
        e = r;
        break;
      }
      t = s.content;
    }
    for (let t = 1; t <= 2; t++)
      for (let r = t == 1 ? e : this.unplaced.openStart; r >= 0; r--) {
        let i, s = null;
        r ? (s = Ei(this.unplaced.content, r - 1).firstChild, i = s.content) : i = this.unplaced.content;
        let o = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, d = null;
          if (t == 1 && (o ? c.matchType(o.type) || (d = c.fillBefore(x.from(o), !1)) : s && a.compatibleContent(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, inject: d };
          if (t == 2 && o && (u = c.findWrapping(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: s, wrap: u };
          if (s && c.matchType(s.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Ei(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new v(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Ei(e, t);
    if (i.childCount <= 1 && t > 0) {
      let s = e.size - t <= t + i.size;
      this.unplaced = new v(dn(e, t - 1, 1), t - 1, s ? t - 1 : r);
    } else
      this.unplaced = new v(dn(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: i, wrap: s }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (s)
      for (let m = 0; m < s.length; m++)
        this.openFrontierNode(s[m]);
    let o = this.unplaced, l = r ? r.content : o.content, a = o.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      d = d.matchFragment(i);
    }
    let h = l.size + e - (o.content.size - o.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), g = d.matchType(m.type);
      if (!g)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (d = g, u.push(tc(m.mark(f.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let p = c == l.childCount;
    p || (h = -1), this.placed = fn(this.placed, t, x.from(u)), this.frontier[t].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, g = l; m < h; m++) {
      let y = g.lastChild;
      this.frontier.push({ type: y.type, match: y.contentMatchAt(y.childCount) }), g = y.content;
    }
    this.unplaced = p ? e == 0 ? v.empty : new v(dn(o.content, e - 1, 1), e - 1, h < 0 ? o.openEnd : e - 1) : new v(dn(o.content, e, c), o.openStart, o.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !vi(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], s = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), o = vi(e, t, i, r, s);
      if (o) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = vi(e, l, c, a, !0);
          if (!u || u.childCount)
            continue e;
        }
        return { depth: t, fit: o, move: s ? e.doc.resolve(e.after(t + 1)) : e };
      }
    }
  }
  close(e) {
    let t = this.findCloseLevel(e);
    if (!t)
      return null;
    for (; this.depth > t.depth; )
      this.closeFrontierNode();
    t.fit.childCount && (this.placed = fn(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), s = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, s);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = fn(this.placed, this.depth, x.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(x.empty, !0);
    t.childCount && (this.placed = fn(this.placed, this.frontier.length, t));
  }
}
function dn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(dn(n.firstChild.content, e - 1, t)));
}
function fn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(fn(n.lastChild.content, e - 1, t)));
}
function Ei(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function tc(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, tc(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(x.empty, !0)))), n.copy(r);
}
function vi(n, e, t, r, i) {
  let s = n.node(e), o = i ? n.indexAfter(e) : n.index(e);
  if (o == s.childCount && !t.compatibleContent(s.type))
    return null;
  let l = r.fillBefore(s.content, !0, o);
  return l && !Rf(t, s.content, o) ? l : null;
}
function Rf(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function Lf(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Pf(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), s = n.doc.resolve(t);
  if (ec(i, s, r))
    return n.step(new G(e, t, r));
  let o = rc(i, s);
  o[o.length - 1] == 0 && o.pop();
  let l = -(i.depth + 1);
  o.unshift(l);
  for (let f = i.depth, h = i.pos - 1; f > 0; f--, h--) {
    let p = i.node(f).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    o.indexOf(f) > -1 ? l = f : i.before(f) == h && o.splice(1, 0, -f);
  }
  let a = o.indexOf(l), c = [], u = r.openStart;
  for (let f = r.content, h = 0; ; h++) {
    let p = f.firstChild;
    if (c.push(p), h == r.openStart)
      break;
    f = p.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let h = c[f], p = Lf(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), p = c[h];
    if (p)
      for (let m = 0; m < o.length; m++) {
        let g = o[(m + a) % o.length], y = !0;
        g < 0 && (y = !1, g = -g);
        let b = i.node(g - 1), S = i.index(g - 1);
        if (b.canReplaceWith(S, S, p.type, p.marks))
          return n.replace(i.before(g), y ? s.after(g) : t, new v(nc(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = o.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let h = o[f];
    h < 0 || (e = i.before(h), t = s.after(h));
  }
}
function nc(n, e, t, r, i) {
  if (e < t) {
    let s = n.firstChild;
    n = n.replaceChild(0, s.copy(nc(s.content, e + 1, t, r, s)));
  }
  if (e > r) {
    let s = i.contentMatchAt(0), o = s.fillBefore(n).append(n);
    n = o.append(s.matchFragment(o).fillBefore(x.empty, !0));
  }
  return n;
}
function Bf(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = If(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new v(x.from(r), 0, 0));
}
function $f(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t);
  if (r.parent.isTextblock && i.parent.isTextblock && r.start() != i.start() && r.parentOffset == 0 && i.parentOffset == 0) {
    let o = r.sharedDepth(t), l = !1;
    for (let a = r.depth; a > o; a--)
      r.node(a).type.spec.isolating && (l = !0);
    for (let a = i.depth; a > o; a--)
      i.node(a).type.spec.isolating && (l = !0);
    if (!l) {
      for (let a = r.depth; a > 0 && e == r.start(a); a--)
        e = r.before(a);
      for (let a = i.depth; a > 0 && t == i.start(a); a--)
        t = i.before(a);
      r = n.doc.resolve(e), i = n.doc.resolve(t);
    }
  }
  let s = rc(r, i);
  for (let o = 0; o < s.length; o++) {
    let l = s[o], a = o == s.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return n.delete(r.before(l), i.after(l));
  }
  for (let o = 1; o <= r.depth && o <= i.depth; o++)
    if (e - r.start(o) == r.depth - o && t > r.end(o) && i.end(o) - t != i.depth - o && r.start(o - 1) == i.start(o - 1) && r.node(o - 1).canReplace(r.index(o - 1), i.index(o - 1)))
      return n.delete(r.before(o), t);
  n.delete(e, t);
}
function rc(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let s = n.start(i);
    if (s < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (s == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == s - 1) && t.push(i);
  }
  return t;
}
class Qt extends ae {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Q.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let s in t.attrs)
      r[s] = t.attrs[s];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return Q.fromReplace(e, this.pos, this.pos + 1, new v(x.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Se.empty;
  }
  invert(e) {
    return new Qt(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Qt(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Qt(t.pos, t.attr, t.value);
  }
}
ae.jsonID("attr", Qt);
class Ln extends ae {
  /**
  Construct an attribute step.
  */
  constructor(e, t) {
    super(), this.attr = e, this.value = t;
  }
  apply(e) {
    let t = /* @__PURE__ */ Object.create(null);
    for (let i in e.attrs)
      t[i] = e.attrs[i];
    t[this.attr] = this.value;
    let r = e.type.create(t, e.content, e.marks);
    return Q.ok(r);
  }
  getMap() {
    return Se.empty;
  }
  invert(e) {
    return new Ln(this.attr, e.attrs[this.attr]);
  }
  map(e) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new Ln(t.attr, t.value);
  }
}
ae.jsonID("docAttr", Ln);
let Xt = class extends Error {
};
Xt = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Xt.prototype = Object.create(Error.prototype);
Xt.prototype.constructor = Xt;
Xt.prototype.name = "TransformError";
class ic {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Rn();
  }
  /**
  The starting document.
  */
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  /**
  Apply a new step in this transform, saving the result. Throws an
  error when the step fails.
  */
  step(e) {
    let t = this.maybeStep(e);
    if (t.failed)
      throw new Xt(t.failed);
    return this;
  }
  /**
  Try to apply a step in this transformation, ignoring it if it
  fails. Returns the step result.
  */
  maybeStep(e) {
    let t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  /**
  True when the document has been changed (when there are any
  steps).
  */
  get docChanged() {
    return this.steps.length > 0;
  }
  /**
  Return a single range, in post-transform document positions,
  that covers all content changed by this transform. Returns null
  if no replacements are made. Note that this will ignore changes
  that add/remove marks without replacing the underlying content.
  */
  changedRange() {
    let e = 1e9, t = -1e9;
    for (let r = 0; r < this.mapping.maps.length; r++) {
      let i = this.mapping.maps[r];
      r && (e = i.map(e, 1), t = i.map(t, -1)), i.forEach((s, o, l, a) => {
        e = Math.min(e, l), t = Math.max(t, a);
      });
    }
    return e == 1e9 ? null : { from: e, to: t };
  }
  /**
  @internal
  */
  addStep(e, t) {
    this.docs.push(this.doc), this.steps.push(e), this.mapping.appendMap(e.getMap()), this.doc = t;
  }
  /**
  Replace the part of the document between `from` and `to` with the
  given `slice`.
  */
  replace(e, t = e, r = v.empty) {
    let i = li(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new v(x.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, v.empty);
  }
  /**
  Insert the given content at the given position.
  */
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  /**
  Replace a range of the document with a given slice, using
  `from`, `to`, and the slice's
  [`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
  than fixed start and end points. This method may grow the
  replaced area or close open nodes in the slice in order to get a
  fit that is more in line with WYSIWYG expectations, by dropping
  fully covered parent nodes of the replaced region when they are
  marked [non-defining as
  context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
  open parent node from the slice that _is_ marked as [defining
  its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).
  
  This is the method, for example, to handle paste. The similar
  [`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
  primitive tool which will _not_ move the start and end of its given
  range, and is useful in situations where you need more precise
  control over what happens.
  */
  replaceRange(e, t, r) {
    return Pf(this, e, t, r), this;
  }
  /**
  Replace the given range with a node, but use `from` and `to` as
  hints, rather than precise positions. When from and to are the same
  and are at the start or end of a parent node in which the given
  node doesn't fit, this method may _move_ them out towards a parent
  that does allow the given node to be placed. When the given range
  completely covers a parent node, this method may completely replace
  that parent node.
  */
  replaceRangeWith(e, t, r) {
    return Bf(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return $f(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return wf(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return Nf(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Ef(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return vf(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return Tf(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Qt(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new Ln(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new it(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof _)
      t.isInSet(r.marks) && this.step(new Rt(e, t));
    else {
      let i = r.marks, s, o = [];
      for (; s = t.isInSet(i); )
        o.push(new Rt(e, s)), i = s.removeFromSet(i);
      for (let l = o.length - 1; l >= 0; l--)
        this.step(o[l]);
    }
    return this;
  }
  /**
  Split the node at the given position, and optionally, if `depth` is
  greater than one, any number of nodes above that. By default, the
  parts split off will inherit the node type of the original node.
  This can be changed by passing an array of types and attributes to
  use after the split (with the outermost nodes coming first).
  */
  split(e, t = 1, r) {
    return Af(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return bf(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return kf(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Vs(this, e, t, r), this;
  }
}
const Mi = /* @__PURE__ */ Object.create(null);
class D {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new zf(e.min(t), e.max(t))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let e = this.ranges;
    for (let t = 0; t < e.length; t++)
      if (e[t].$from.pos != e[t].$to.pos)
        return !1;
    return !0;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(e, t = v.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let s = e.steps.length, o = this.ranges;
    for (let l = 0; l < o.length; l++) {
      let { $from: a, $to: c } = o[l], u = e.mapping.slice(s);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? v.empty : t), l == 0 && Wo(e, s, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let s = 0; s < i.length; s++) {
      let { $from: o, $to: l } = i[s], a = e.mapping.slice(r), c = a.map(o.pos), u = a.map(l.pos);
      s ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), Wo(e, r, t.isInline ? -1 : 1));
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom(e, t, r = !1) {
    let i = e.parent.inlineContent ? new I(e) : Vt(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let s = e.depth - 1; s >= 0; s--) {
      let o = t < 0 ? Vt(e.node(0), e.node(s), e.before(s + 1), e.index(s), t, r) : Vt(e.node(0), e.node(s), e.after(s + 1), e.index(s) + 1, t, r);
      if (o)
        return o;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near(e, t = 1) {
    return this.findFrom(e, t) || this.findFrom(e, -t) || new we(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Vt(e, e, 0, 0, 1) || new we(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Vt(e, e, e.content.size, e.childCount, -1) || new we(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Mi[t.type];
    if (!r)
      throw new RangeError(`No selection type ${t.type} defined`);
    return r.fromJSON(e, t);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(e, t) {
    if (e in Mi)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Mi[e] = t, t.prototype.jsonID = e, t;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return I.between(this.$anchor, this.$head).getBookmark();
  }
}
D.prototype.visible = !0;
class zf {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Vo = !1;
function jo(n) {
  !Vo && !n.parent.inlineContent && (Vo = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class I extends D {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    jo(e), jo(t), super(e, t);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    if (!r.parent.inlineContent)
      return D.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new I(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = v.empty) {
    if (super.replace(e, t), t == v.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof I && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new ai(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new I(e.resolve(t.anchor), e.resolve(t.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(e, t, r = t) {
    let i = e.resolve(t);
    return new this(i, r == t ? i : e.resolve(r));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between(e, t, r) {
    let i = e.pos - t.pos;
    if ((!r || i) && (r = i >= 0 ? 1 : -1), !t.parent.inlineContent) {
      let s = D.findFrom(t, r, !0) || D.findFrom(t, -r, !0);
      if (s)
        t = s.$head;
      else
        return D.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (D.findFrom(e, -r, !0) || D.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new I(e, t);
  }
}
D.jsonID("text", I);
class ai {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new ai(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return I.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class N extends D {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor(e) {
    let t = e.nodeAfter, r = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, r), this.node = t;
  }
  map(e, t) {
    let { deleted: r, pos: i } = t.mapResult(this.anchor), s = e.resolve(i);
    return r ? D.near(s) : new N(s);
  }
  content() {
    return new v(x.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof N && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Ws(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new N(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new N(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
N.prototype.visible = !1;
D.jsonID("node", N);
class Ws {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new ai(r, r) : new Ws(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && N.isSelectable(r) ? new N(t) : D.near(t);
  }
}
class we extends D {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = v.empty) {
    if (t == v.empty) {
      e.delete(0, e.doc.content.size);
      let r = D.atStart(e.doc);
      r.eq(e.selection) || e.setSelection(r);
    } else
      super.replace(e, t);
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(e) {
    return new we(e);
  }
  map(e) {
    return new we(e);
  }
  eq(e) {
    return e instanceof we;
  }
  getBookmark() {
    return _f;
  }
}
D.jsonID("all", we);
const _f = {
  map() {
    return this;
  },
  resolve(n) {
    return new we(n);
  }
};
function Vt(n, e, t, r, i, s = !1) {
  if (e.inlineContent)
    return I.create(n, t);
  for (let o = r - (i > 0 ? 0 : 1); i > 0 ? o < e.childCount : o >= 0; o += i) {
    let l = e.child(o);
    if (l.isAtom) {
      if (!s && N.isSelectable(l))
        return N.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = Vt(n, l, t + i, i < 0 ? l.childCount : 0, i, s);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Wo(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof G || i instanceof X))
    return;
  let s = n.mapping.maps[r], o;
  s.forEach((l, a, c, u) => {
    o == null && (o = u);
  }), n.setSelection(D.near(n.doc.resolve(o), t));
}
const Uo = 1, Xn = 2, qo = 4;
class Ff extends ic {
  /**
  @internal
  */
  constructor(e) {
    super(e.doc), this.curSelectionFor = 0, this.updated = 0, this.meta = /* @__PURE__ */ Object.create(null), this.time = Date.now(), this.curSelection = e.selection, this.storedMarks = e.storedMarks;
  }
  /**
  The transaction's current selection. This defaults to the editor
  selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
  transaction, but can be overwritten with
  [`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).
  */
  get selection() {
    return this.curSelectionFor < this.steps.length && (this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor)), this.curSelectionFor = this.steps.length), this.curSelection;
  }
  /**
  Update the transaction's current selection. Will determine the
  selection that the editor gets when the transaction is applied.
  */
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError("Selection passed to setSelection must point at the current document");
    return this.curSelection = e, this.curSelectionFor = this.steps.length, this.updated = (this.updated | Uo) & ~Xn, this.storedMarks = null, this;
  }
  /**
  Whether the selection was explicitly updated by this transaction.
  */
  get selectionSet() {
    return (this.updated & Uo) > 0;
  }
  /**
  Set the current stored marks.
  */
  setStoredMarks(e) {
    return this.storedMarks = e, this.updated |= Xn, this;
  }
  /**
  Make sure the current stored marks or, if that is null, the marks
  at the selection, match the given set of marks. Does nothing if
  this is already the case.
  */
  ensureMarks(e) {
    return _.sameSet(this.storedMarks || this.selection.$from.marks(), e) || this.setStoredMarks(e), this;
  }
  /**
  Add a mark to the set of stored marks.
  */
  addStoredMark(e) {
    return this.ensureMarks(e.addToSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Remove a mark or mark type from the set of stored marks.
  */
  removeStoredMark(e) {
    return this.ensureMarks(e.removeFromSet(this.storedMarks || this.selection.$head.marks()));
  }
  /**
  Whether the stored marks were explicitly set for this transaction.
  */
  get storedMarksSet() {
    return (this.updated & Xn) > 0;
  }
  /**
  @internal
  */
  addStep(e, t) {
    super.addStep(e, t), this.updated = this.updated & ~Xn, this.storedMarks = null;
  }
  /**
  Update the timestamp for the transaction.
  */
  setTime(e) {
    return this.time = e, this;
  }
  /**
  Replace the current selection with the given slice.
  */
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  /**
  Replace the selection with the given node. When `inheritMarks` is
  true and the content is inline, it inherits the marks from the
  place where it is inserted.
  */
  replaceSelectionWith(e, t = !0) {
    let r = this.selection;
    return t && (e = e.mark(this.storedMarks || (r.empty ? r.$from.marks() : r.$from.marksAcross(r.$to) || _.none))), r.replaceWith(this, e), this;
  }
  /**
  Delete the selection.
  */
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  /**
  Replace the given range, or the selection if no range is given,
  with a text node containing the given string.
  */
  insertText(e, t, r) {
    let i = this.doc.type.schema;
    if (t == null)
      return e ? this.replaceSelectionWith(i.text(e), !0) : this.deleteSelection();
    {
      if (r == null && (r = t), !e)
        return this.deleteRange(t, r);
      let s = this.storedMarks;
      if (!s) {
        let o = this.doc.resolve(t);
        s = r == t ? o.marks() : o.marksAcross(this.doc.resolve(r));
      }
      return this.replaceRangeWith(t, r, i.text(e, s)), !this.selection.empty && this.selection.to == t + e.length && this.setSelection(D.near(this.selection.$to)), this;
    }
  }
  /**
  Store a metadata property in this transaction, keyed either by
  name or by plugin.
  */
  setMeta(e, t) {
    return this.meta[typeof e == "string" ? e : e.key] = t, this;
  }
  /**
  Retrieve a metadata property for a given name or plugin.
  */
  getMeta(e) {
    return this.meta[typeof e == "string" ? e : e.key];
  }
  /**
  Returns true if this transaction doesn't contain any metadata,
  and can thus safely be extended.
  */
  get isGeneric() {
    for (let e in this.meta)
      return !1;
    return !0;
  }
  /**
  Indicate that the editor should scroll the selection into view
  when updated to the state produced by this transaction.
  */
  scrollIntoView() {
    return this.updated |= qo, this;
  }
  /**
  True when this transaction has had `scrollIntoView` called on it.
  */
  get scrolledIntoView() {
    return (this.updated & qo) > 0;
  }
}
function Ko(n, e) {
  return !e || !n ? n : n.bind(e);
}
class hn {
  constructor(e, t, r) {
    this.name = e, this.init = Ko(t.init, r), this.apply = Ko(t.apply, r);
  }
}
const Hf = [
  new hn("doc", {
    init(n) {
      return n.doc || n.schema.topNodeType.createAndFill();
    },
    apply(n) {
      return n.doc;
    }
  }),
  new hn("selection", {
    init(n, e) {
      return n.selection || D.atStart(e.doc);
    },
    apply(n) {
      return n.selection;
    }
  }),
  new hn("storedMarks", {
    init(n) {
      return n.storedMarks || null;
    },
    apply(n, e, t, r) {
      return r.selection.$cursor ? n.storedMarks : null;
    }
  }),
  new hn("scrollToSelection", {
    init() {
      return 0;
    },
    apply(n, e) {
      return n.scrolledIntoView ? e + 1 : e;
    }
  })
];
class Ti {
  constructor(e, t) {
    this.schema = e, this.plugins = [], this.pluginsByKey = /* @__PURE__ */ Object.create(null), this.fields = Hf.slice(), t && t.forEach((r) => {
      if (this.pluginsByKey[r.key])
        throw new RangeError("Adding different instances of a keyed plugin (" + r.key + ")");
      this.plugins.push(r), this.pluginsByKey[r.key] = r, r.spec.state && this.fields.push(new hn(r.key, r.spec.state, r));
    });
  }
}
class kt {
  /**
  @internal
  */
  constructor(e) {
    this.config = e;
  }
  /**
  The schema of the state's document.
  */
  get schema() {
    return this.config.schema;
  }
  /**
  The plugins that are active in this state.
  */
  get plugins() {
    return this.config.plugins;
  }
  /**
  Apply the given transaction to produce a new state.
  */
  apply(e) {
    return this.applyTransaction(e).state;
  }
  /**
  @internal
  */
  filterTransaction(e, t = -1) {
    for (let r = 0; r < this.config.plugins.length; r++)
      if (r != t) {
        let i = this.config.plugins[r];
        if (i.spec.filterTransaction && !i.spec.filterTransaction.call(i, e, this))
          return !1;
      }
    return !0;
  }
  /**
  Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
  returns the precise transactions that were applied (which might
  be influenced by the [transaction
  hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
  plugins) along with the new state.
  */
  applyTransaction(e) {
    if (!this.filterTransaction(e))
      return { state: this, transactions: [] };
    let t = [e], r = this.applyInner(e), i = null;
    for (; ; ) {
      let s = !1;
      for (let o = 0; o < this.config.plugins.length; o++) {
        let l = this.config.plugins[o];
        if (l.spec.appendTransaction) {
          let a = i ? i[o].n : 0, c = i ? i[o].state : this, u = a < t.length && l.spec.appendTransaction.call(l, a ? t.slice(a) : t, c, r);
          if (u && r.filterTransaction(u, o)) {
            if (u.setMeta("appendedTransaction", e), !i) {
              i = [];
              for (let d = 0; d < this.config.plugins.length; d++)
                i.push(d < o ? { state: r, n: t.length } : { state: this, n: 0 });
            }
            t.push(u), r = r.applyInner(u), s = !0;
          }
          i && (i[o] = { state: r, n: t.length });
        }
      }
      if (!s)
        return { state: r, transactions: t };
    }
  }
  /**
  @internal
  */
  applyInner(e) {
    if (!e.before.eq(this.doc))
      throw new RangeError("Applying a mismatched transaction");
    let t = new kt(this.config), r = this.config.fields;
    for (let i = 0; i < r.length; i++) {
      let s = r[i];
      t[s.name] = s.apply(e, this[s.name], this, t);
    }
    return t;
  }
  /**
  Accessor that constructs and returns a new [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.
  */
  get tr() {
    return new Ff(this);
  }
  /**
  Create a new state.
  */
  static create(e) {
    let t = new Ti(e.doc ? e.doc.type.schema : e.schema, e.plugins), r = new kt(t);
    for (let i = 0; i < t.fields.length; i++)
      r[t.fields[i].name] = t.fields[i].init(e, r);
    return r;
  }
  /**
  Create a new state based on this one, but with an adjusted set
  of active plugins. State fields that exist in both sets of
  plugins are kept unchanged. Those that no longer exist are
  dropped, and those that are new are initialized using their
  [`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
  configuration object..
  */
  reconfigure(e) {
    let t = new Ti(this.schema, e.plugins), r = t.fields, i = new kt(t);
    for (let s = 0; s < r.length; s++) {
      let o = r[s].name;
      i[o] = this.hasOwnProperty(o) ? this[o] : r[s].init(e, i);
    }
    return i;
  }
  /**
  Serialize this state to JSON. If you want to serialize the state
  of plugins, pass an object mapping property names to use in the
  resulting JSON object to plugin objects. The argument may also be
  a string or number, in which case it is ignored, to support the
  way `JSON.stringify` calls `toString` methods.
  */
  toJSON(e) {
    let t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (this.storedMarks && (t.storedMarks = this.storedMarks.map((r) => r.toJSON())), e && typeof e == "object")
      for (let r in e) {
        if (r == "doc" || r == "selection")
          throw new RangeError("The JSON fields `doc` and `selection` are reserved");
        let i = e[r], s = i.spec.state;
        s && s.toJSON && (t[r] = s.toJSON.call(i, this[i.key]));
      }
    return t;
  }
  /**
  Deserialize a JSON representation of a state. `config` should
  have at least a `schema` field, and should contain array of
  plugins to initialize the state with. `pluginFields` can be used
  to deserialize the state of plugins, by associating plugin
  instances with the property names they use in the JSON object.
  */
  static fromJSON(e, t, r) {
    if (!t)
      throw new RangeError("Invalid input for EditorState.fromJSON");
    if (!e.schema)
      throw new RangeError("Required config field 'schema' missing");
    let i = new Ti(e.schema, e.plugins), s = new kt(i);
    return i.fields.forEach((o) => {
      if (o.name == "doc")
        s.doc = Tt.fromJSON(e.schema, t.doc);
      else if (o.name == "selection")
        s.selection = D.fromJSON(s.doc, t.selection);
      else if (o.name == "storedMarks")
        t.storedMarks && (s.storedMarks = t.storedMarks.map(e.schema.markFromJSON));
      else {
        if (r)
          for (let l in r) {
            let a = r[l], c = a.spec.state;
            if (a.key == o.name && c && c.fromJSON && Object.prototype.hasOwnProperty.call(t, l)) {
              s[o.name] = c.fromJSON.call(a, e, t[l], s);
              return;
            }
          }
        s[o.name] = o.init(e, s);
      }
    }), s;
  }
}
function sc(n, e, t) {
  for (let r in n) {
    let i = n[r];
    i instanceof Function ? i = i.bind(e) : r == "handleDOMEvents" && (i = sc(i, e, {})), t[r] = i;
  }
  return t;
}
class z {
  /**
  Create a plugin.
  */
  constructor(e) {
    this.spec = e, this.props = {}, e.props && sc(e.props, this, this.props), this.key = e.key ? e.key.key : oc("plugin");
  }
  /**
  Extract the plugin's state field from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const Ai = /* @__PURE__ */ Object.create(null);
function oc(n) {
  return n in Ai ? n + "$" + ++Ai[n] : (Ai[n] = 0, n + "$");
}
class W {
  /**
  Create a plugin key.
  */
  constructor(e = "key") {
    this.key = oc(e);
  }
  /**
  Get the active plugin with this key, if any, from an editor
  state.
  */
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  /**
  Get the plugin's state from an editor state.
  */
  getState(e) {
    return e[this.key];
  }
}
const lc = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function ac(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const cc = (n, e, t) => {
  let r = ac(n, t);
  if (!r)
    return !1;
  let i = Us(r);
  if (!i) {
    let o = r.blockRange(), l = o && on(o);
    return l == null ? !1 : (e && e(n.tr.lift(o, l).scrollIntoView()), !0);
  }
  let s = i.nodeBefore;
  if (bc(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Zt(s, "end") || N.isSelectable(s)))
    for (let o = r.depth; ; o--) {
      let l = li(n.doc, r.before(o), r.after(o), v.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(Zt(s, "end") ? D.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : N.create(a.doc, i.pos - s.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (o == 1 || r.node(o - 1).childCount > 1)
        break;
    }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - s.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Vf = (n, e, t) => {
  let r = ac(n, t);
  if (!r)
    return !1;
  let i = Us(r);
  return i ? uc(n, i, e) : !1;
}, jf = (n, e, t) => {
  let r = fc(n, t);
  if (!r)
    return !1;
  let i = qs(r);
  return i ? uc(n, i, e) : !1;
};
function uc(n, e, t) {
  let r = e.nodeBefore, i = r, s = e.pos - 1;
  for (; !i.isTextblock; s--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let o = e.nodeAfter, l = o, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let u = l.firstChild;
    if (!u)
      return !1;
    l = u;
  }
  let c = li(n.doc, s, a, v.empty);
  if (!c || c.from != s || c instanceof G && c.slice.size >= a - s)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(I.create(u.doc, s)), t(u.scrollIntoView());
  }
  return !0;
}
function Zt(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const dc = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    s = Us(r);
  }
  let o = s && s.nodeBefore;
  return !o || !N.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(N.create(n.doc, s.pos - o.nodeSize)).scrollIntoView()), !0);
};
function Us(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function fc(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const hc = (n, e, t) => {
  let r = fc(n, t);
  if (!r)
    return !1;
  let i = qs(r);
  if (!i)
    return !1;
  let s = i.nodeAfter;
  if (bc(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Zt(s, "start") || N.isSelectable(s))) {
    let o = li(n.doc, r.before(), r.after(), v.empty);
    if (o && o.slice.size < o.to - o.from) {
      if (e) {
        let l = n.tr.step(o);
        l.setSelection(Zt(s, "start") ? D.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : N.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return s.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + s.nodeSize).scrollIntoView()), !0) : !1;
}, pc = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, s = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    s = qs(r);
  }
  let o = s && s.nodeAfter;
  return !o || !N.isSelectable(o) ? !1 : (e && e(n.tr.setSelection(N.create(n.doc, s.pos)).scrollIntoView()), !0);
};
function qs(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      let t = n.node(e);
      if (n.index(e) + 1 < t.childCount)
        return n.doc.resolve(n.after(e + 1));
      if (t.type.spec.isolating)
        break;
    }
  return null;
}
const Wf = (n, e) => {
  let t = n.selection, r = t instanceof N, i;
  if (r) {
    if (t.node.isTextblock || !ft(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = oi(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let s = n.tr.join(i);
    r && s.setSelection(N.create(s.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(s.scrollIntoView());
  }
  return !0;
}, Uf = (n, e) => {
  let t = n.selection, r;
  if (t instanceof N) {
    if (t.node.isTextblock || !ft(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = oi(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, qf = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), s = i && on(i);
  return s == null ? !1 : (e && e(n.tr.lift(i, s).scrollIntoView()), !0);
}, mc = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Ks(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Kf = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), s = t.indexAfter(-1), o = Ks(i.contentMatchAt(s));
  if (!o || !i.canReplaceWith(s, s, o))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, o.createAndFill());
    a.setSelection(D.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, gc = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof we || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let s = Ks(i.parent.contentMatchAt(i.indexAfter()));
  if (!s || !s.isTextblock)
    return !1;
  if (e) {
    let o = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(o, s.createAndFill());
    l.setSelection(I.create(l.doc, o + 1)), e(l.scrollIntoView());
  }
  return !0;
}, yc = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let s = t.before();
    if (qe(n.doc, s))
      return e && e(n.tr.split(s).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && on(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function Jf(n) {
  return (e, t) => {
    if (e.selection instanceof N && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !qe(e.doc, h.pos) ? !1 : (t && t(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof I || e.selection instanceof we) && r.deleteSelection();
    let { $from: i } = r.selection, s = r.steps.length, o = [], l, a, c = !1, u = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        c = i.end(h) == i.pos + (i.depth - h), u = i.start(h) == i.pos - (i.depth - h), a = Ks(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), o.unshift(c && a ? { type: a } : null), l = h;
        break;
      } else {
        if (h == 1)
          return !1;
        o.unshift(null);
      }
    let d = i.pos, f = qe(r.doc, d, o.length, o);
    if (f || (o[0] = a ? { type: a } : null, f = qe(r.doc, d, o.length, o)), !f)
      return !1;
    if (r.split(d, o.length, o), !c && u && i.node(l).type != a) {
      let h = r.mapping.slice(s), p = h.map(i.before(l)), m = r.doc.resolve(p);
      a && i.node(l - 1).canReplaceWith(m.index(), m.index() + 1, a) && r.setNodeMarkup(h.map(i.before(l)), a);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const Gf = Jf(), Qf = (n, e) => {
  let { $from: t, to: r } = n.selection, i, s = t.sharedDepth(r);
  return s == 0 ? !1 : (i = t.before(s), e && e(n.tr.setSelection(N.create(n.doc, i))), !0);
};
function Yf(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, s = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(s - 1, s) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(s, s + 1) || !(i.isTextblock || ft(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function bc(n, e, t, r) {
  let i = e.nodeBefore, s = e.nodeAfter, o, l, a = i.type.spec.isolating || s.type.spec.isolating;
  if (!a && Yf(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (o = (l = i.contentMatchAt(i.childCount)).findWrapping(s.type)) && l.matchType(o[0] || s.type).validEnd) {
    if (t) {
      let h = e.pos + s.nodeSize, p = x.empty;
      for (let y = o.length - 1; y >= 0; y--)
        p = x.from(o[y].create(null, p));
      p = x.from(i.copy(p));
      let m = n.tr.step(new X(e.pos - 1, h, e.pos, h, new v(p, 1, 0), o.length, !0)), g = m.doc.resolve(h + 2 * o.length);
      g.nodeAfter && g.nodeAfter.type == i.type && ft(m.doc, g.pos) && m.join(g.pos), t(m.scrollIntoView());
    }
    return !0;
  }
  let u = s.type.spec.isolating || r > 0 && a ? null : D.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && on(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (c && Zt(s, "start", !0) && Zt(i, "end")) {
    let h = i, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let m = s, g = 1;
    for (; !m.isTextblock; m = m.firstChild)
      g++;
    if (h.canReplace(h.childCount, h.childCount, m.content)) {
      if (t) {
        let y = x.empty;
        for (let S = p.length - 1; S >= 0; S--)
          y = x.from(p[S].copy(y));
        let b = n.tr.step(new X(e.pos - p.length, e.pos + s.nodeSize, e.pos + g, e.pos + s.nodeSize - g, new v(y, p.length, 0), 0, !0));
        t(b.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function kc(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, s = i.depth;
    for (; i.node(s).isInline; ) {
      if (!s)
        return !1;
      s--;
    }
    return i.node(s).isTextblock ? (t && t(e.tr.setSelection(I.create(e.doc, n < 0 ? i.start(s) : i.end(s)))), !0) : !1;
  };
}
const Xf = kc(-1), Zf = kc(1);
function eh(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: s } = t.selection, o = i.blockRange(s), l = o && js(o, n, e);
    return l ? (r && r(t.tr.wrap(o, l).scrollIntoView()), !0) : !1;
  };
}
function Jo(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let s = 0; s < t.selection.ranges.length && !i; s++) {
      let { $from: { pos: o }, $to: { pos: l } } = t.selection.ranges[s];
      t.doc.nodesBetween(o, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n)
            i = !0;
          else {
            let u = t.doc.resolve(c), d = u.index();
            i = u.parent.canReplaceWith(d, d + 1, n);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let s = t.tr;
      for (let o = 0; o < t.selection.ranges.length; o++) {
        let { $from: { pos: l }, $to: { pos: a } } = t.selection.ranges[o];
        s.setBlockType(l, a, n, e);
      }
      r(s.scrollIntoView());
    }
    return !0;
  };
}
function Js(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Js(lc, cc, dc);
Js(lc, hc, pc);
Js(mc, gc, yc, Gf);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function th(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: s } = t.selection, o = i.blockRange(s);
    if (!o)
      return !1;
    let l = r ? t.tr : null;
    return nh(l, o, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function nh(n, e, t, r = null) {
  let i = !1, s = e, o = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = o.resolve(e.start - 2);
    s = new br(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new br(e.$from, o.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = js(s, t, r, e);
  return l ? (n && rh(n, e, l, i, t), !0) : !1;
}
function rh(n, e, t, r, i) {
  let s = x.empty;
  for (let u = t.length - 1; u >= 0; u--)
    s = x.from(t[u].type.create(t[u].attrs, s));
  n.step(new X(e.start - (r ? 2 : 0), e.end, e.start, e.end, new v(s, 0, 0), t.length, !0));
  let o = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (o = u + 1);
  let l = t.length - o, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && qe(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return n;
}
function ih(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (o) => o.childCount > 0 && o.firstChild.type == n);
    return s ? t ? r.node(s.depth - 1).type == n ? sh(e, t, n, s) : oh(e, t, s) : !0 : !1;
  };
}
function sh(n, e, t, r) {
  let i = n.tr, s = r.end, o = r.$to.end(r.depth);
  s < o && (i.step(new X(s - 1, o, s, o, new v(x.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new br(i.doc.resolve(r.$from.pos), i.doc.resolve(o), r.depth));
  const l = on(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(s, -1) - 1);
  return ft(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function oh(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let s = r.doc.resolve(t.start), o = s.nodeAfter;
  if (r.mapping.map(t.end) != t.start + s.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = s.node(-1), u = s.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, o.content.append(a ? x.empty : x.from(i))))
    return !1;
  let d = s.pos, f = d + o.nodeSize;
  return r.step(new X(d - (l ? 1 : 0), f + (a ? 1 : 0), d + 1, f - 1, new v((l ? x.empty : x.from(i.copy(x.empty))).append(a ? x.empty : x.from(i.copy(x.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function lh(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, s = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!s)
      return !1;
    let o = s.startIndex;
    if (o == 0)
      return !1;
    let l = s.parent, a = l.child(o - 1);
    if (a.type != n)
      return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type, u = x.from(c ? n.create() : null), d = new v(x.from(n.create(null, x.from(l.type.create(null, u)))), c ? 3 : 1, 0), f = s.start, h = s.end;
      t(e.tr.step(new X(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
const te = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, en = function(n) {
  let e = n.assignedSlot || n.parentNode;
  return e && e.nodeType == 11 ? e.host : e;
};
let fs = null;
const Ve = function(n, e, t) {
  let r = fs || (fs = document.createRange());
  return r.setEnd(n, t ?? n.nodeValue.length), r.setStart(n, e || 0), r;
}, ah = function() {
  fs = null;
}, Lt = function(n, e, t, r) {
  return t && (Go(n, e, t, r, -1) || Go(n, e, t, r, 1));
}, ch = /^(img|br|input|textarea|hr)$/i;
function Go(n, e, t, r, i) {
  for (var s; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (i < 0 ? 0 : ve(n))) {
      let o = n.parentNode;
      if (!o || o.nodeType != 1 || Hn(n) || ch.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = te(n) + (i < 0 ? 0 : 1), n = o;
    } else if (n.nodeType == 1) {
      let o = n.childNodes[e + (i < 0 ? -1 : 0)];
      if (o.nodeType == 1 && o.contentEditable == "false")
        if (!((s = o.pmViewDesc) === null || s === void 0) && s.ignoreForSelection)
          e += i;
        else
          return !1;
      else
        n = o, e = i < 0 ? ve(n) : 0;
    } else
      return !1;
  }
}
function ve(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function uh(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e)
      return n;
    if (n.nodeType == 1 && e > 0) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e - 1], e = ve(n);
    } else if (n.parentNode && !Hn(n))
      e = te(n), n = n.parentNode;
    else
      return null;
  }
}
function dh(n, e) {
  for (; ; ) {
    if (n.nodeType == 3 && e < n.nodeValue.length)
      return n;
    if (n.nodeType == 1 && e < n.childNodes.length) {
      if (n.contentEditable == "false")
        return null;
      n = n.childNodes[e], e = 0;
    } else if (n.parentNode && !Hn(n))
      e = te(n) + 1, n = n.parentNode;
    else
      return null;
  }
}
function fh(n, e, t) {
  for (let r = e == 0, i = e == ve(n); r || i; ) {
    if (n == t)
      return !0;
    let s = te(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && s == 0, i = i && s == ve(n);
  }
}
function Hn(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const ci = function(n) {
  return n.focusNode && Lt(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function bt(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
function hh(n) {
  let e = n.activeElement;
  for (; e && e.shadowRoot; )
    e = e.shadowRoot.activeElement;
  return e;
}
function ph(n, e, t) {
  if (n.caretPositionFromPoint)
    try {
      let r = n.caretPositionFromPoint(e, t);
      if (r)
        return { node: r.offsetNode, offset: Math.min(ve(r.offsetNode), r.offset) };
    } catch {
    }
  if (n.caretRangeFromPoint) {
    let r = n.caretRangeFromPoint(e, t);
    if (r)
      return { node: r.startContainer, offset: Math.min(ve(r.startContainer), r.startOffset) };
  }
}
const Pe = typeof navigator < "u" ? navigator : null, Qo = typeof document < "u" ? document : null, ht = Pe && Pe.userAgent || "", hs = /Edge\/(\d+)/.exec(ht), Sc = /MSIE \d/.exec(ht), ps = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(ht), be = !!(Sc || ps || hs), ot = Sc ? document.documentMode : ps ? +ps[1] : hs ? +hs[1] : 0, Me = !be && /gecko\/(\d+)/i.test(ht);
Me && +(/Firefox\/(\d+)/.exec(ht) || [0, 0])[1];
const ms = !be && /Chrome\/(\d+)/.exec(ht), re = !!ms, wc = ms ? +ms[1] : 0, oe = !be && !!Pe && /Apple Computer/.test(Pe.vendor), tn = oe && (/Mobile\/\w+/.test(ht) || !!Pe && Pe.maxTouchPoints > 2), Ee = tn || (Pe ? /Mac/.test(Pe.platform) : !1), xc = Pe ? /Win/.test(Pe.platform) : !1, We = /Android \d/.test(ht), Vn = !!Qo && "webkitFontSmoothing" in Qo.documentElement.style, mh = Vn ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function gh(n) {
  let e = n.defaultView && n.defaultView.visualViewport;
  return e ? {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  } : {
    left: 0,
    right: n.documentElement.clientWidth,
    top: 0,
    bottom: n.documentElement.clientHeight
  };
}
function $e(n, e) {
  return typeof n == "number" ? n : n[e];
}
function yh(n) {
  let e = n.getBoundingClientRect(), t = e.width / n.offsetWidth || 1, r = e.height / n.offsetHeight || 1;
  return {
    left: e.left,
    right: e.left + n.clientWidth * t,
    top: e.top,
    bottom: e.top + n.clientHeight * r
  };
}
function Yo(n, e, t) {
  if (!gs(e) && e.left == 0)
    return;
  let r = n.someProp("scrollThreshold") || 0, i = n.someProp("scrollMargin") || 5, s = n.dom.ownerDocument;
  for (let o = t || n.dom; o; ) {
    if (o.nodeType != 1) {
      o = en(o);
      continue;
    }
    let l = o, a = l == s.body, c = a ? gh(s) : yh(l), u = 0, d = 0;
    if (e.top < c.top + $e(r, "top") ? d = -(c.top - e.top + $e(i, "top")) : e.bottom > c.bottom - $e(r, "bottom") && (d = e.bottom - e.top > c.bottom - c.top ? e.top + $e(i, "top") - c.top : e.bottom - c.bottom + $e(i, "bottom")), e.left < c.left + $e(r, "left") ? u = -(c.left - e.left + $e(i, "left")) : e.right > c.right - $e(r, "right") && (u = e.right - c.right + $e(i, "right")), u || d)
      if (a)
        s.defaultView.scrollBy(u, d);
      else {
        let h = l.scrollLeft, p = l.scrollTop;
        d && (l.scrollTop += d), u && (l.scrollLeft += u);
        let m = l.scrollLeft - h, g = l.scrollTop - p;
        e = { left: e.left - m, top: e.top - g, right: e.right - m, bottom: e.bottom - g };
      }
    let f = a ? "fixed" : getComputedStyle(o).position;
    if (/^(fixed|sticky)$/.test(f))
      break;
    o = f == "absolute" ? o.offsetParent : en(o);
  }
}
function bh(n) {
  let e = n.dom.getBoundingClientRect(), t = Math.max(0, e.top), r, i;
  for (let s = (e.left + e.right) / 2, o = t + 1; o < Math.min(innerHeight, e.bottom); o += 5) {
    let l = n.root.elementFromPoint(s, o);
    if (!l || l == n.dom || !n.dom.contains(l))
      continue;
    let a = l.getBoundingClientRect();
    if (a.top >= t - 20) {
      r = l, i = a.top;
      break;
    }
  }
  return { refDOM: r, refTop: i, stack: Cc(n.dom) };
}
function Cc(n) {
  let e = [], t = n.ownerDocument;
  for (let r = n; r && (e.push({ dom: r, top: r.scrollTop, left: r.scrollLeft }), n != t); r = en(r))
    ;
  return e;
}
function kh({ refDOM: n, refTop: e, stack: t }) {
  let r = n ? n.getBoundingClientRect().top : 0;
  Ec(t, r == 0 ? 0 : r - e);
}
function Ec(n, e) {
  for (let t = 0; t < n.length; t++) {
    let { dom: r, top: i, left: s } = n[t];
    r.scrollTop != i + e && (r.scrollTop = i + e), r.scrollLeft != s && (r.scrollLeft = s);
  }
}
let zt = null;
function Sh(n) {
  if (n.setActive)
    return n.setActive();
  if (zt)
    return n.focus(zt);
  let e = Cc(n);
  n.focus(zt == null ? {
    get preventScroll() {
      return zt = { preventScroll: !0 }, !0;
    }
  } : void 0), zt || (zt = !1, Ec(e, 0));
}
function vc(n, e) {
  let t, r = 2e8, i, s = 0, o = e.top, l = e.top, a, c;
  for (let u = n.firstChild, d = 0; u; u = u.nextSibling, d++) {
    let f;
    if (u.nodeType == 1)
      f = u.getClientRects();
    else if (u.nodeType == 3)
      f = Ve(u).getClientRects();
    else
      continue;
    for (let h = 0; h < f.length; h++) {
      let p = f[h];
      if (p.top <= o && p.bottom >= l) {
        o = Math.max(p.bottom, o), l = Math.min(p.top, l);
        let m = p.left > e.left ? p.left - e.left : p.right < e.left ? e.left - p.right : 0;
        if (m < r) {
          t = u, r = m, i = m && t.nodeType == 3 ? {
            left: p.right < e.left ? p.right : p.left,
            top: e.top
          } : e, u.nodeType == 1 && m && (s = d + (e.left >= (p.left + p.right) / 2 ? 1 : 0));
          continue;
        }
      } else p.top > e.top && !a && p.left <= e.left && p.right >= e.left && (a = u, c = { left: Math.max(p.left, Math.min(p.right, e.left)), top: p.top });
      !t && (e.left >= p.right && e.top >= p.top || e.left >= p.left && e.top >= p.bottom) && (s = d + 1);
    }
  }
  return !t && a && (t = a, i = c, r = 0), t && t.nodeType == 3 ? wh(t, i) : !t || r && t.nodeType == 1 ? { node: n, offset: s } : vc(t, i);
}
function wh(n, e) {
  let t = n.nodeValue.length, r = document.createRange(), i;
  for (let s = 0; s < t; s++) {
    r.setEnd(n, s + 1), r.setStart(n, s);
    let o = Xe(r, 1);
    if (o.top != o.bottom && Gs(e, o)) {
      i = { node: n, offset: s + (e.left >= (o.left + o.right) / 2 ? 1 : 0) };
      break;
    }
  }
  return r.detach(), i || { node: n, offset: 0 };
}
function Gs(n, e) {
  return n.left >= e.left - 1 && n.left <= e.right + 1 && n.top >= e.top - 1 && n.top <= e.bottom + 1;
}
function xh(n, e) {
  let t = n.parentNode;
  return t && /^li$/i.test(t.nodeName) && e.left < n.getBoundingClientRect().left ? t : n;
}
function Ch(n, e, t) {
  let { node: r, offset: i } = vc(e, t), s = -1;
  if (r.nodeType == 1 && !r.firstChild) {
    let o = r.getBoundingClientRect();
    s = o.left != o.right && t.left > (o.left + o.right) / 2 ? 1 : -1;
  }
  return n.docView.posFromDOM(r, i, s);
}
function Eh(n, e, t, r) {
  let i = -1;
  for (let s = e, o = !1; s != n.dom; ) {
    let l = n.docView.nearestDesc(s, !0), a;
    if (!l)
      return null;
    if (l.dom.nodeType == 1 && (l.node.isBlock && l.parent || !l.contentDOM) && // Ignore elements with zero-size bounding rectangles
    ((a = l.dom.getBoundingClientRect()).width || a.height) && (l.node.isBlock && l.parent && !/^T(R|BODY|HEAD|FOOT)$/.test(l.dom.nodeName) && (!o && a.left > r.left || a.top > r.top ? i = l.posBefore : (!o && a.right < r.left || a.bottom < r.top) && (i = l.posAfter), o = !0), !l.contentDOM && i < 0 && !l.node.isText))
      return (l.node.isBlock ? r.top < (a.top + a.bottom) / 2 : r.left < (a.left + a.right) / 2) ? l.posBefore : l.posAfter;
    s = l.dom.parentNode;
  }
  return i > -1 ? i : n.docView.posFromDOM(e, t, -1);
}
function Mc(n, e, t) {
  let r = n.childNodes.length;
  if (r && t.top < t.bottom)
    for (let i = Math.max(0, Math.min(r - 1, Math.floor(r * (e.top - t.top) / (t.bottom - t.top)) - 2)), s = i; ; ) {
      let o = n.childNodes[s];
      if (o.nodeType == 1) {
        let l = o.getClientRects();
        for (let a = 0; a < l.length; a++) {
          let c = l[a];
          if (Gs(e, c))
            return Mc(o, e, c);
        }
      }
      if ((s = (s + 1) % r) == i)
        break;
    }
  return n;
}
function vh(n, e) {
  let t = n.dom.ownerDocument, r, i = 0, s = ph(t, e.left, e.top);
  s && ({ node: r, offset: i } = s);
  let o = (n.root.elementFromPoint ? n.root : t).elementFromPoint(e.left, e.top), l;
  if (!o || !n.dom.contains(o.nodeType != 1 ? o.parentNode : o)) {
    let c = n.dom.getBoundingClientRect();
    if (!Gs(e, c) || (o = Mc(n.dom, e, c), !o))
      return null;
  }
  if (oe)
    for (let c = o; r && c; c = en(c))
      c.draggable && (r = void 0);
  if (o = xh(o, e), r) {
    if (Me && r.nodeType == 1 && (i = Math.min(i, r.childNodes.length), i < r.childNodes.length)) {
      let u = r.childNodes[i], d;
      u.nodeName == "IMG" && (d = u.getBoundingClientRect()).right <= e.left && d.bottom > e.top && i++;
    }
    let c;
    Vn && i && r.nodeType == 1 && (c = r.childNodes[i - 1]).nodeType == 1 && c.contentEditable == "false" && c.getBoundingClientRect().top >= e.top && i--, r == n.dom && i == r.childNodes.length - 1 && r.lastChild.nodeType == 1 && e.top > r.lastChild.getBoundingClientRect().bottom ? l = n.state.doc.content.size : (i == 0 || r.nodeType != 1 || r.childNodes[i - 1].nodeName != "BR") && (l = Eh(n, r, i, e));
  }
  l == null && (l = Ch(n, o, e));
  let a = n.docView.nearestDesc(o, !0);
  return { pos: l, inside: a ? a.posAtStart - a.border : -1 };
}
function gs(n) {
  return n.top < n.bottom || n.left < n.right;
}
function Xe(n, e) {
  let t = n.getClientRects();
  if (t.length) {
    let r = t[e < 0 ? 0 : t.length - 1];
    if (gs(r))
      return r;
  }
  return Array.prototype.find.call(t, gs) || n.getBoundingClientRect();
}
const Mh = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function Tc(n, e, t) {
  let { node: r, offset: i, atom: s } = n.docView.domFromPos(e, t < 0 ? -1 : 1), o = Vn || Me;
  if (r.nodeType == 3)
    if (o && (Mh.test(r.nodeValue) || (t < 0 ? !i : i == r.nodeValue.length))) {
      let a = Xe(Ve(r, i, i), t);
      if (Me && i && /\s/.test(r.nodeValue[i - 1]) && i < r.nodeValue.length) {
        let c = Xe(Ve(r, i - 1, i - 1), -1);
        if (c.top == a.top) {
          let u = Xe(Ve(r, i, i + 1), -1);
          if (u.top != a.top)
            return an(u, u.left < c.left);
        }
      }
      return a;
    } else {
      let a = i, c = i, u = t < 0 ? 1 : -1;
      return t < 0 && !i ? (c++, u = -1) : t >= 0 && i == r.nodeValue.length ? (a--, u = 1) : t < 0 ? a-- : c++, an(Xe(Ve(r, a, c), u), u < 0);
    }
  if (!n.state.doc.resolve(e - (s || 0)).parent.inlineContent) {
    if (s == null && i && (t < 0 || i == ve(r))) {
      let a = r.childNodes[i - 1];
      if (a.nodeType == 1)
        return Oi(a.getBoundingClientRect(), !1);
    }
    if (s == null && i < ve(r)) {
      let a = r.childNodes[i];
      if (a.nodeType == 1)
        return Oi(a.getBoundingClientRect(), !0);
    }
    return Oi(r.getBoundingClientRect(), t >= 0);
  }
  if (s == null && i && (t < 0 || i == ve(r))) {
    let a = r.childNodes[i - 1], c = a.nodeType == 3 ? Ve(a, ve(a) - (o ? 0 : 1)) : a.nodeType == 1 && (a.nodeName != "BR" || !a.nextSibling) ? a : null;
    if (c)
      return an(Xe(c, 1), !1);
  }
  if (s == null && i < ve(r)) {
    let a = r.childNodes[i];
    for (; a.pmViewDesc && a.pmViewDesc.ignoreForCoords; )
      a = a.nextSibling;
    let c = a ? a.nodeType == 3 ? Ve(a, 0, o ? 0 : 1) : a.nodeType == 1 ? a : null : null;
    if (c)
      return an(Xe(c, -1), !0);
  }
  return an(Xe(r.nodeType == 3 ? Ve(r) : r, -t), t >= 0);
}
function an(n, e) {
  if (n.width == 0)
    return n;
  let t = e ? n.left : n.right;
  return { top: n.top, bottom: n.bottom, left: t, right: t };
}
function Oi(n, e) {
  if (n.height == 0)
    return n;
  let t = e ? n.top : n.bottom;
  return { top: t, bottom: t, left: n.left, right: n.right };
}
function Ac(n, e, t) {
  let r = n.state, i = n.root.activeElement;
  r != e && n.updateState(e), i != n.dom && n.focus();
  try {
    return t();
  } finally {
    r != e && n.updateState(r), i != n.dom && i && i.focus();
  }
}
function Th(n, e, t) {
  let r = e.selection, i = t == "up" ? r.$from : r.$to;
  return Ac(n, e, () => {
    let { node: s } = n.docView.domFromPos(i.pos, t == "up" ? -1 : 1);
    for (; ; ) {
      let l = n.docView.nearestDesc(s, !0);
      if (!l)
        break;
      if (l.node.isBlock) {
        s = l.contentDOM || l.dom;
        break;
      }
      s = l.dom.parentNode;
    }
    let o = Tc(n, i.pos, 1);
    for (let l = s.firstChild; l; l = l.nextSibling) {
      let a;
      if (l.nodeType == 1)
        a = l.getClientRects();
      else if (l.nodeType == 3)
        a = Ve(l, 0, l.nodeValue.length).getClientRects();
      else
        continue;
      for (let c = 0; c < a.length; c++) {
        let u = a[c];
        if (u.bottom > u.top + 1 && (t == "up" ? o.top - u.top > (u.bottom - o.top) * 2 : u.bottom - o.bottom > (o.bottom - u.top) * 2))
          return !1;
      }
    }
    return !0;
  });
}
const Ah = /[\u0590-\u08ac]/;
function Oh(n, e, t) {
  let { $head: r } = e.selection;
  if (!r.parent.isTextblock)
    return !1;
  let i = r.parentOffset, s = !i, o = i == r.parent.content.size, l = n.domSelection();
  return l ? !Ah.test(r.parent.textContent) || !l.modify ? t == "left" || t == "backward" ? s : o : Ac(n, e, () => {
    let { focusNode: a, focusOffset: c, anchorNode: u, anchorOffset: d } = n.domSelectionRange(), f = l.caretBidiLevel;
    l.modify("move", t, "character");
    let h = r.depth ? n.docView.domAfterPos(r.before()) : n.dom, { focusNode: p, focusOffset: m } = n.domSelectionRange(), g = p && !h.contains(p.nodeType == 1 ? p : p.parentNode) || a == p && c == m;
    try {
      l.collapse(u, d), a && (a != u || c != d) && l.extend && l.extend(a, c);
    } catch {
    }
    return f != null && (l.caretBidiLevel = f), g;
  }) : r.pos == r.start() || r.pos == r.end();
}
let Xo = null, Zo = null, el = !1;
function Nh(n, e, t) {
  return Xo == e && Zo == t ? el : (Xo = e, Zo = t, el = t == "up" || t == "down" ? Th(n, e, t) : Oh(n, e, t));
}
const Te = 0, tl = 1, St = 2, Ne = 3;
class jn {
  constructor(e, t, r, i) {
    this.parent = e, this.children = t, this.dom = r, this.contentDOM = i, this.dirty = Te, r.pmViewDesc = this;
  }
  // Used to check whether a given description corresponds to a
  // widget/mark/node.
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, r) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  // When parsing in-editor content (in domchange.js), we allow
  // descriptions to determine the parse rules that should be used to
  // parse them.
  parseRule(e) {
    return null;
  }
  // Used by the editor's event handler to ignore events that come
  // from certain descs.
  stopEvent(e) {
    return !1;
  }
  // The size of the content represented by this desc.
  get size() {
    let e = 0;
    for (let t = 0; t < this.children.length; t++)
      e += this.children[t].size;
    return e;
  }
  // For block nodes, this represents the space taken up by their
  // start/end tokens.
  get border() {
    return 0;
  }
  destroy() {
    this.parent = void 0, this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++)
      this.children[e].destroy();
  }
  posBeforeChild(e) {
    for (let t = 0, r = this.posAtStart; ; t++) {
      let i = this.children[t];
      if (i == e)
        return r;
      r += i.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(e, t, r) {
    if (this.contentDOM && this.contentDOM.contains(e.nodeType == 1 ? e : e.parentNode))
      if (r < 0) {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t - 1];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.previousSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.previousSibling;
        return s ? this.posBeforeChild(o) + o.size : this.posAtStart;
      } else {
        let s, o;
        if (e == this.contentDOM)
          s = e.childNodes[t];
        else {
          for (; e.parentNode != this.contentDOM; )
            e = e.parentNode;
          s = e.nextSibling;
        }
        for (; s && !((o = s.pmViewDesc) && o.parent == this); )
          s = s.nextSibling;
        return s ? this.posBeforeChild(o) : this.posAtEnd;
      }
    let i;
    if (e == this.dom && this.contentDOM)
      i = t > te(this.contentDOM);
    else if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM))
      i = e.compareDocumentPosition(this.contentDOM) & 2;
    else if (this.dom.firstChild) {
      if (t == 0)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !1;
            break;
          }
          if (s.previousSibling)
            break;
        }
      if (i == null && t == e.childNodes.length)
        for (let s = e; ; s = s.parentNode) {
          if (s == this.dom) {
            i = !0;
            break;
          }
          if (s.nextSibling)
            break;
        }
    }
    return i ?? r > 0 ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(e, t = !1) {
    for (let r = !0, i = e; i; i = i.parentNode) {
      let s = this.getDesc(i), o;
      if (s && (!t || s.node))
        if (r && (o = s.nodeDOM) && !(o.nodeType == 1 ? o.contains(e.nodeType == 1 ? e : e.parentNode) : o == e))
          r = !1;
        else
          return s;
    }
  }
  getDesc(e) {
    let t = e.pmViewDesc;
    for (let r = t; r; r = r.parent)
      if (r == this)
        return t;
  }
  posFromDOM(e, t, r) {
    for (let i = e; i; i = i.parentNode) {
      let s = this.getDesc(i);
      if (s)
        return s.localPosFromDOM(e, t, r);
    }
    return -1;
  }
  // Find the desc for the node after the given pos, if any. (When a
  // parent node overrode rendering, there might not be one.)
  descAt(e) {
    for (let t = 0, r = 0; t < this.children.length; t++) {
      let i = this.children[t], s = r + i.size;
      if (r == e && s != r) {
        for (; !i.border && i.children.length; )
          for (let o = 0; o < i.children.length; o++) {
            let l = i.children[o];
            if (l.size) {
              i = l;
              break;
            }
          }
        return i;
      }
      if (e < s)
        return i.descAt(e - r - i.border);
      r = s;
    }
  }
  domFromPos(e, t) {
    if (!this.contentDOM)
      return { node: this.dom, offset: 0, atom: e + 1 };
    let r = 0, i = 0;
    for (let s = 0; r < this.children.length; r++) {
      let o = this.children[r], l = s + o.size;
      if (l > e || o instanceof Nc) {
        i = e - s;
        break;
      }
      s = l;
    }
    if (i)
      return this.children[r].domFromPos(i - this.children[r].border, t);
    for (let s; r && !(s = this.children[r - 1]).size && s instanceof Oc && s.side >= 0; r--)
      ;
    if (t <= 0) {
      let s, o = !0;
      for (; s = r ? this.children[r - 1] : null, !(!s || s.dom.parentNode == this.contentDOM); r--, o = !1)
        ;
      return s && t && o && !s.border && !s.domAtom ? s.domFromPos(s.size, t) : { node: this.contentDOM, offset: s ? te(s.dom) + 1 : 0 };
    } else {
      let s, o = !0;
      for (; s = r < this.children.length ? this.children[r] : null, !(!s || s.dom.parentNode == this.contentDOM); r++, o = !1)
        ;
      return s && o && !s.border && !s.domAtom ? s.domFromPos(0, t) : { node: this.contentDOM, offset: s ? te(s.dom) : this.contentDOM.childNodes.length };
    }
  }
  // Used to find a DOM range in a single parent for a given changed
  // range.
  parseRange(e, t, r = 0) {
    if (this.children.length == 0)
      return { node: this.contentDOM, from: e, to: t, fromOffset: 0, toOffset: this.contentDOM.childNodes.length };
    let i = -1, s = -1;
    for (let o = r, l = 0; ; l++) {
      let a = this.children[l], c = o + a.size;
      if (i == -1 && e <= c) {
        let u = o + a.border;
        if (e >= u && t <= c - a.border && a.node && a.contentDOM && this.contentDOM.contains(a.contentDOM))
          return a.parseRange(e, t, u);
        e = o;
        for (let d = l; d > 0; d--) {
          let f = this.children[d - 1];
          if (f.size && f.dom.parentNode == this.contentDOM && !f.emptyChildAt(1)) {
            i = te(f.dom) + 1;
            break;
          }
          e -= f.size;
        }
        i == -1 && (i = 0);
      }
      if (i > -1 && (c > t || l == this.children.length - 1)) {
        t = c;
        for (let u = l + 1; u < this.children.length; u++) {
          let d = this.children[u];
          if (d.size && d.dom.parentNode == this.contentDOM && !d.emptyChildAt(-1)) {
            s = te(d.dom);
            break;
          }
          t += d.size;
        }
        s == -1 && (s = this.contentDOM.childNodes.length);
        break;
      }
      o = c;
    }
    return { node: this.contentDOM, from: e, to: t, fromOffset: i, toOffset: s };
  }
  emptyChildAt(e) {
    if (this.border || !this.contentDOM || !this.children.length)
      return !1;
    let t = this.children[e < 0 ? 0 : this.children.length - 1];
    return t.size == 0 || t.emptyChildAt(e);
  }
  domAfterPos(e) {
    let { node: t, offset: r } = this.domFromPos(e, 0);
    if (t.nodeType != 1 || r == t.childNodes.length)
      throw new RangeError("No node after pos " + e);
    return t.childNodes[r];
  }
  // View descs are responsible for setting any selection that falls
  // entirely inside of them, so that custom implementations can do
  // custom things with the selection. Note that this falls apart when
  // a selection starts in such a node and ends in another, in which
  // case we just use whatever domFromPos produces as a best effort.
  setSelection(e, t, r, i = !1) {
    let s = Math.min(e, t), o = Math.max(e, t);
    for (let h = 0, p = 0; h < this.children.length; h++) {
      let m = this.children[h], g = p + m.size;
      if (s > p && o < g)
        return m.setSelection(e - p - m.border, t - p - m.border, r, i);
      p = g;
    }
    let l = this.domFromPos(e, e ? -1 : 1), a = t == e ? l : this.domFromPos(t, t ? -1 : 1), c = r.root.getSelection(), u = r.domSelectionRange(), d = !1;
    if ((Me || oe) && e == t) {
      let { node: h, offset: p } = l;
      if (h.nodeType == 3) {
        if (d = !!(p && h.nodeValue[p - 1] == `
`), d && p == h.nodeValue.length)
          for (let m = h, g; m; m = m.parentNode) {
            if (g = m.nextSibling) {
              g.nodeName == "BR" && (l = a = { node: g.parentNode, offset: te(g) + 1 });
              break;
            }
            let y = m.pmViewDesc;
            if (y && y.node && y.node.isBlock)
              break;
          }
      } else {
        let m = h.childNodes[p - 1];
        d = m && (m.nodeName == "BR" || m.contentEditable == "false");
      }
    }
    if (Me && u.focusNode && u.focusNode != a.node && u.focusNode.nodeType == 1) {
      let h = u.focusNode.childNodes[u.focusOffset];
      h && h.contentEditable == "false" && (i = !0);
    }
    if (!(i || d && oe) && Lt(l.node, l.offset, u.anchorNode, u.anchorOffset) && Lt(a.node, a.offset, u.focusNode, u.focusOffset))
      return;
    let f = !1;
    if ((c.extend || e == t) && !(d && Me)) {
      c.collapse(l.node, l.offset);
      try {
        e != t && c.extend(a.node, a.offset), f = !0;
      } catch {
      }
    }
    if (!f) {
      if (e > t) {
        let p = l;
        l = a, a = p;
      }
      let h = document.createRange();
      h.setEnd(a.node, a.offset), h.setStart(l.node, l.offset), c.removeAllRanges(), c.addRange(h);
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && e.type != "selection";
  }
  get contentLost() {
    return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM);
  }
  // Remove a subtree of the element tree that has been touched
  // by a DOM change, so that the next update will redraw it.
  markDirty(e, t) {
    for (let r = 0, i = 0; i < this.children.length; i++) {
      let s = this.children[i], o = r + s.size;
      if (r == o ? e <= o && t >= r : e < o && t > r) {
        let l = r + s.border, a = o - s.border;
        if (e >= l && t <= a) {
          this.dirty = e == r || t == o ? St : tl, e == l && t == a && (s.contentLost || s.dom.parentNode != this.contentDOM) ? s.dirty = Ne : s.markDirty(e - l, t - l);
          return;
        } else
          s.dirty = s.dom == s.contentDOM && s.dom.parentNode == this.contentDOM && !s.children.length ? St : Ne;
      }
      r = o;
    }
    this.dirty = St;
  }
  markParentsDirty() {
    let e = 1;
    for (let t = this.parent; t; t = t.parent, e++) {
      let r = e == 1 ? St : tl;
      t.dirty < r && (t.dirty = r);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
  get ignoreForSelection() {
    return !1;
  }
  isText(e) {
    return !1;
  }
}
class Oc extends jn {
  constructor(e, t, r, i) {
    let s, o = t.type.toDOM;
    if (typeof o == "function" && (o = o(r, () => {
      if (!s)
        return i;
      if (s.parent)
        return s.parent.posBeforeChild(s);
    })), !t.type.spec.raw) {
      if (o.nodeType != 1) {
        let l = document.createElement("span");
        l.appendChild(o), o = l;
      }
      o.contentEditable = "false", o.classList.add("ProseMirror-widget");
    }
    super(e, [], o, null), this.widget = t, this.widget = t, s = this;
  }
  matchesWidget(e) {
    return this.dirty == Te && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    let t = this.widget.spec.stopEvent;
    return t ? t(e) : !1;
  }
  ignoreMutation(e) {
    return e.type != "selection" || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get ignoreForSelection() {
    return !!this.widget.type.spec.relaxedSide;
  }
  get side() {
    return this.widget.type.side;
  }
}
class Ih extends jn {
  constructor(e, t, r, i) {
    super(e, [], t, null), this.textDOM = r, this.text = i;
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM ? this.posAtStart + (t ? this.size : 0) : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return e.type === "characterData" && e.target.nodeValue == e.oldValue;
  }
}
class lt extends jn {
  constructor(e, t, r, i, s) {
    super(e, [], r, i), this.mark = t, this.spec = s;
  }
  static create(e, t, r, i) {
    let s = i.nodeViews[t.type.name], o = s && s(t, i, r);
    return (!o || !o.dom) && (o = Bt.renderSpec(document, t.type.spec.toDOM(t, r), null, t.attrs)), new lt(e, t, o.dom, o.contentDOM || o.dom, o);
  }
  parseRule() {
    return this.dirty & Ne || this.mark.type.spec.reparseInView ? null : { mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM };
  }
  matchesMark(e) {
    return this.dirty != Ne && this.mark.eq(e);
  }
  markDirty(e, t) {
    if (super.markDirty(e, t), this.dirty != Te) {
      let r = this.parent;
      for (; !r.node; )
        r = r.parent;
      r.dirty < this.dirty && (r.dirty = this.dirty), this.dirty = Te;
    }
  }
  slice(e, t, r) {
    let i = lt.create(this.parent, this.mark, !0, r), s = this.children, o = this.size;
    t < o && (s = bs(s, t, o, r)), e > 0 && (s = bs(s, 0, e, r));
    for (let l = 0; l < s.length; l++)
      s[l].parent = i;
    return i.children = s, i;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
}
class at extends jn {
  constructor(e, t, r, i, s, o, l) {
    super(e, [], s, o), this.node = t, this.outerDeco = r, this.innerDeco = i, this.nodeDOM = l;
  }
  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finicky
  // implementation details to the user code that they probably will
  // never need.)
  static create(e, t, r, i, s, o) {
    let l = s.nodeViews[t.type.name], a, c = l && l(t, s, () => {
      if (!a)
        return o;
      if (a.parent)
        return a.parent.posBeforeChild(a);
    }, r, i), u = c && c.dom, d = c && c.contentDOM;
    if (t.isText) {
      if (!u)
        u = document.createTextNode(t.text);
      else if (u.nodeType != 3)
        throw new RangeError("Text must be rendered as a DOM text node");
    } else u || ({ dom: u, contentDOM: d } = Bt.renderSpec(document, t.type.spec.toDOM(t), null, t.attrs));
    !d && !t.isText && u.nodeName != "BR" && (u.hasAttribute("contenteditable") || (u.contentEditable = "false"), t.type.spec.draggable && (u.draggable = !0));
    let f = u;
    return u = Rc(u, r, t), c ? a = new Dh(e, t, r, i, u, d || null, f, c) : t.isText ? new ui(e, t, r, i, u, f) : new at(e, t, r, i, u, d || null, f);
  }
  parseRule(e) {
    if (this.node.type.spec.reparseInView)
      return null;
    let t = { node: this.node.type.name, attrs: this.node.attrs };
    if (this.node.type.whitespace == "pre" && (t.preserveWhitespace = "full"), !this.contentDOM)
      t.getContent = () => this.node.content;
    else if (!this.contentLost)
      t.contentElement = this.contentDOM;
    else {
      for (let r = this.children.length - 1; r >= 0; r--) {
        let i = this.children[r];
        if (this.dom.contains(i.dom.parentNode)) {
          t.contentElement = i.dom.parentNode;
          break;
        }
      }
      if (!t.contentElement) {
        let r = e && e.find((i) => i.nodeType == 1 && e.indexOf(i.parentNode) < 0 && this.dom.contains(i));
        r ? t.contentElement = r : t.getContent = () => x.empty;
      }
    }
    return t;
  }
  matchesNode(e, t, r) {
    return this.dirty == Te && e.eq(this.node) && Sr(t, this.outerDeco) && r.eq(this.innerDeco);
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  updateChildren(e, t) {
    let r = this.node.inlineContent, i = t, s = e.composing ? this.localCompositionInfo(e, t) : null, o = s && s.pos > -1 ? s : null, l = s && s.pos < 0, a = new Lh(this, o && o.node, e);
    $h(this.node, this.innerDeco, (c, u, d) => {
      c.spec.marks ? a.syncToMarks(c.spec.marks, r, e, u) : c.type.side >= 0 && !d && a.syncToMarks(u == this.node.childCount ? _.none : this.node.child(u).marks, r, e, u), a.placeWidget(c, e, i);
    }, (c, u, d, f) => {
      a.syncToMarks(c.marks, r, e, f);
      let h;
      a.findNodeMatch(c, u, d, f) || l && e.state.selection.from > i && e.state.selection.to < i + c.nodeSize && (h = a.findIndexWithChild(s.node)) > -1 && a.updateNodeAt(c, u, d, h, e) || a.updateNextNode(c, u, d, e, f, i) || a.addNode(c, u, d, e, i), i += c.nodeSize;
    }), a.syncToMarks([], r, e, 0), this.node.isTextblock && a.addTextblockHacks(), a.destroyRest(), (a.changed || this.dirty == St) && (o && this.protectLocalComposition(e, o), Ic(this.contentDOM, this.children, e), tn && zh(this.dom));
  }
  localCompositionInfo(e, t) {
    let { from: r, to: i } = e.state.selection;
    if (!(e.state.selection instanceof I) || r < t || i > t + this.node.content.size)
      return null;
    let s = e.input.compositionNode;
    if (!s || !this.dom.contains(s.parentNode))
      return null;
    if (this.node.inlineContent) {
      let o = s.nodeValue, l = _h(this.node.content, o, r - t, i - t);
      return l < 0 ? null : { node: s, pos: l, text: o };
    } else
      return { node: s, pos: -1, text: "" };
  }
  protectLocalComposition(e, { node: t, pos: r, text: i }) {
    if (this.getDesc(t))
      return;
    let s = t;
    for (; s.parentNode != this.contentDOM; s = s.parentNode) {
      for (; s.previousSibling; )
        s.parentNode.removeChild(s.previousSibling);
      for (; s.nextSibling; )
        s.parentNode.removeChild(s.nextSibling);
      s.pmViewDesc && (s.pmViewDesc = void 0);
    }
    let o = new Ih(this, s, t, i);
    e.input.compositionNodes.push(o), this.children = bs(this.children, r, r + i.length, e, o);
  }
  // If this desc must be updated to match the given node decoration,
  // do so and return true.
  update(e, t, r, i) {
    return this.dirty == Ne || !e.sameMarkup(this.node) ? !1 : (this.updateInner(e, t, r, i), !0);
  }
  updateInner(e, t, r, i) {
    this.updateOuterDeco(t), this.node = e, this.innerDeco = r, this.contentDOM && this.updateChildren(i, this.posAtStart), this.dirty = Te;
  }
  updateOuterDeco(e) {
    if (Sr(e, this.outerDeco))
      return;
    let t = this.nodeDOM.nodeType != 1, r = this.dom;
    this.dom = Dc(this.dom, this.nodeDOM, ys(this.outerDeco, this.node, t), ys(e, this.node, t)), this.dom != r && (r.pmViewDesc = void 0, this.dom.pmViewDesc = this), this.outerDeco = e;
  }
  // Mark this node as being the selected node.
  selectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.add("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && (this.nodeDOM.draggable = !0));
  }
  // Remove selected node marking from this node.
  deselectNode() {
    this.nodeDOM.nodeType == 1 && (this.nodeDOM.classList.remove("ProseMirror-selectednode"), (this.contentDOM || !this.node.type.spec.draggable) && this.nodeDOM.removeAttribute("draggable"));
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function nl(n, e, t, r, i) {
  Rc(r, e, n);
  let s = new at(void 0, n, e, t, r, r, r);
  return s.contentDOM && s.updateChildren(i, 0), s;
}
class ui extends at {
  constructor(e, t, r, i, s, o) {
    super(e, t, r, i, s, null, o);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; )
      e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, r, i) {
    return this.dirty == Ne || this.dirty != Te && !this.inParent() || !e.sameMarkup(this.node) ? !1 : (this.updateOuterDeco(t), (this.dirty != Te || e.text != this.node.text) && e.text != this.nodeDOM.nodeValue && (this.nodeDOM.nodeValue = e.text, i.trackWrites == this.nodeDOM && (i.trackWrites = null)), this.node = e, this.dirty = Te, !0);
  }
  inParent() {
    let e = this.parent.contentDOM;
    for (let t = this.nodeDOM; t; t = t.parentNode)
      if (t == e)
        return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, r) {
    return e == this.nodeDOM ? this.posAtStart + Math.min(t, this.node.text.length) : super.localPosFromDOM(e, t, r);
  }
  ignoreMutation(e) {
    return e.type != "characterData" && e.type != "selection";
  }
  slice(e, t, r) {
    let i = this.node.cut(e, t), s = document.createTextNode(i.text);
    return new ui(this.parent, i, this.outerDeco, this.innerDeco, s, s);
  }
  markDirty(e, t) {
    super.markDirty(e, t), this.dom != this.nodeDOM && (e == 0 || t == this.nodeDOM.nodeValue.length) && (this.dirty = Ne);
  }
  get domAtom() {
    return !1;
  }
  isText(e) {
    return this.node.text == e;
  }
}
class Nc extends jn {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == Te && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return this.dom.nodeName == "IMG";
  }
}
class Dh extends at {
  constructor(e, t, r, i, s, o, l, a) {
    super(e, t, r, i, s, o, l), this.spec = a;
  }
  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  update(e, t, r, i) {
    if (this.dirty == Ne)
      return !1;
    if (this.spec.update && (this.node.type == e.type || this.spec.multiType)) {
      let s = this.spec.update(e, t, r);
      return s && this.updateInner(e, t, r, i), s;
    } else return !this.contentDOM && !e.isLeaf ? !1 : super.update(e, t, r, i);
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, r, i) {
    this.spec.setSelection ? this.spec.setSelection(e, t, r.root) : super.setSelection(e, t, r, i);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return this.spec.stopEvent ? this.spec.stopEvent(e) : !1;
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(e) : super.ignoreMutation(e);
  }
}
function Ic(n, e, t) {
  let r = n.firstChild, i = !1;
  for (let s = 0; s < e.length; s++) {
    let o = e[s], l = o.dom;
    if (l.parentNode == n) {
      for (; l != r; )
        r = rl(r), i = !0;
      r = r.nextSibling;
    } else
      i = !0, n.insertBefore(l, r);
    if (o instanceof lt) {
      let a = r ? r.previousSibling : n.lastChild;
      Ic(o.contentDOM, o.children, t), r = a ? a.nextSibling : n.firstChild;
    }
  }
  for (; r; )
    r = rl(r), i = !0;
  i && t.trackWrites == n && (t.trackWrites = null);
}
const kn = function(n) {
  n && (this.nodeName = n);
};
kn.prototype = /* @__PURE__ */ Object.create(null);
const wt = [new kn()];
function ys(n, e, t) {
  if (n.length == 0)
    return wt;
  let r = t ? wt[0] : new kn(), i = [r];
  for (let s = 0; s < n.length; s++) {
    let o = n[s].type.attrs;
    if (o) {
      o.nodeName && i.push(r = new kn(o.nodeName));
      for (let l in o) {
        let a = o[l];
        a != null && (t && i.length == 1 && i.push(r = new kn(e.isInline ? "span" : "div")), l == "class" ? r.class = (r.class ? r.class + " " : "") + a : l == "style" ? r.style = (r.style ? r.style + ";" : "") + a : l != "nodeName" && (r[l] = a));
      }
    }
  }
  return i;
}
function Dc(n, e, t, r) {
  if (t == wt && r == wt)
    return e;
  let i = e;
  for (let s = 0; s < r.length; s++) {
    let o = r[s], l = t[s];
    if (s) {
      let a;
      l && l.nodeName == o.nodeName && i != n && (a = i.parentNode) && a.nodeName.toLowerCase() == o.nodeName || (a = document.createElement(o.nodeName), a.pmIsDeco = !0, a.appendChild(i), l = wt[0]), i = a;
    }
    Rh(i, l || wt[0], o);
  }
  return i;
}
function Rh(n, e, t) {
  for (let r in e)
    r != "class" && r != "style" && r != "nodeName" && !(r in t) && n.removeAttribute(r);
  for (let r in t)
    r != "class" && r != "style" && r != "nodeName" && t[r] != e[r] && n.setAttribute(r, t[r]);
  if (e.class != t.class) {
    let r = e.class ? e.class.split(" ").filter(Boolean) : [], i = t.class ? t.class.split(" ").filter(Boolean) : [];
    for (let s = 0; s < r.length; s++)
      i.indexOf(r[s]) == -1 && n.classList.remove(r[s]);
    for (let s = 0; s < i.length; s++)
      r.indexOf(i[s]) == -1 && n.classList.add(i[s]);
    n.classList.length == 0 && n.removeAttribute("class");
  }
  if (e.style != t.style) {
    if (e.style) {
      let r = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, i;
      for (; i = r.exec(e.style); )
        n.style.removeProperty(i[1]);
    }
    t.style && (n.style.cssText += t.style);
  }
}
function Rc(n, e, t) {
  return Dc(n, n, wt, ys(e, t, n.nodeType != 1));
}
function Sr(n, e) {
  if (n.length != e.length)
    return !1;
  for (let t = 0; t < n.length; t++)
    if (!n[t].type.eq(e[t].type))
      return !1;
  return !0;
}
function rl(n) {
  let e = n.nextSibling;
  return n.parentNode.removeChild(n), e;
}
class Lh {
  constructor(e, t, r) {
    this.lock = t, this.view = r, this.index = 0, this.stack = [], this.changed = !1, this.top = e, this.preMatch = Ph(e.node.content, e);
  }
  // Destroy and remove the children between the given indices in
  // `this.top`.
  destroyBetween(e, t) {
    if (e != t) {
      for (let r = e; r < t; r++)
        this.top.children[r].destroy();
      this.top.children.splice(e, t - e), this.changed = !0;
    }
  }
  // Destroy all remaining children in `this.top`.
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  // Sync the current stack of mark descs with the given array of
  // marks, reusing existing mark descs when possible.
  syncToMarks(e, t, r, i) {
    let s = 0, o = this.stack.length >> 1, l = Math.min(o, e.length);
    for (; s < l && (s == o - 1 ? this.top : this.stack[s + 1 << 1]).matchesMark(e[s]) && e[s].type.spec.spanning !== !1; )
      s++;
    for (; s < o; )
      this.destroyRest(), this.top.dirty = Te, this.index = this.stack.pop(), this.top = this.stack.pop(), o--;
    for (; o < e.length; ) {
      this.stack.push(this.top, this.index + 1);
      let a = -1, c = this.top.children.length;
      i < this.preMatch.index && (c = Math.min(this.index + 3, c));
      for (let u = this.index; u < c; u++) {
        let d = this.top.children[u];
        if (d.matchesMark(e[o]) && !this.isLocked(d.dom)) {
          a = u;
          break;
        }
      }
      if (a < 0 && this.index < this.top.children.length) {
        let u = this.top.children[this.index];
        u instanceof lt && u.dirty != Ne && u.mark.type == e[o].type && u.spec.update && !this.isLocked(u.dom) && u.spec.update(e[o]) && (u.mark = e[o], a = this.index, this.changed = !0);
      }
      if (a > -1)
        a > this.index && (this.changed = !0, this.destroyBetween(this.index, a)), this.top = this.top.children[this.index];
      else {
        let u = lt.create(this.top, e[o], t, r);
        this.top.children.splice(this.index, 0, u), this.top = u, this.changed = !0;
      }
      this.index = 0, o++;
    }
  }
  // Try to find a node desc matching the given data. Skip over it and
  // return true when successful.
  findNodeMatch(e, t, r, i) {
    let s = -1, o;
    if (i >= this.preMatch.index && (o = this.preMatch.matches[i - this.preMatch.index]).parent == this.top && o.matchesNode(e, t, r))
      s = this.top.children.indexOf(o, this.index);
    else
      for (let l = this.index, a = Math.min(this.top.children.length, l + 5); l < a; l++) {
        let c = this.top.children[l];
        if (c.matchesNode(e, t, r) && !this.preMatch.matched.has(c)) {
          s = l;
          break;
        }
      }
    return s < 0 ? !1 : (this.destroyBetween(this.index, s), this.index++, !0);
  }
  updateNodeAt(e, t, r, i, s) {
    let o = this.top.children[i];
    return o.dirty == Ne && o.dom == o.contentDOM && (o.dirty = St), o.update(e, t, r, s) ? (this.destroyBetween(this.index, i), this.index++, !0) : !1;
  }
  findIndexWithChild(e) {
    for (; ; ) {
      let t = e.parentNode;
      if (!t)
        return -1;
      if (t == this.top.contentDOM) {
        let r = e.pmViewDesc;
        if (r) {
          for (let i = this.index; i < this.top.children.length; i++)
            if (this.top.children[i] == r)
              return i;
        }
        return -1;
      }
      e = t;
    }
  }
  // Try to update the next node, if any, to the given data. Checks
  // pre-matches to avoid overwriting nodes that could still be used.
  updateNextNode(e, t, r, i, s, o) {
    for (let l = this.index; l < this.top.children.length; l++) {
      let a = this.top.children[l];
      if (a instanceof at) {
        let c = this.preMatch.matched.get(a);
        if (c != null && c != s)
          return !1;
        let u = a.dom, d, f = this.isLocked(u) && !(e.isText && a.node && a.node.isText && a.nodeDOM.nodeValue == e.text && a.dirty != Ne && Sr(t, a.outerDeco));
        if (!f && a.update(e, t, r, i))
          return this.destroyBetween(this.index, l), a.dom != u && (this.changed = !0), this.index++, !0;
        if (!f && (d = this.recreateWrapper(a, e, t, r, i, o)))
          return this.destroyBetween(this.index, l), this.top.children[this.index] = d, d.contentDOM && (d.dirty = St, d.updateChildren(i, o + 1), d.dirty = Te), this.changed = !0, this.index++, !0;
        break;
      }
    }
    return !1;
  }
  // When a node with content is replaced by a different node with
  // identical content, move over its children.
  recreateWrapper(e, t, r, i, s, o) {
    if (e.dirty || t.isAtom || !e.children.length || !e.node.content.eq(t.content) || !Sr(r, e.outerDeco) || !i.eq(e.innerDeco))
      return null;
    let l = at.create(this.top, t, r, i, s, o);
    if (l.contentDOM) {
      l.children = e.children, e.children = [];
      for (let a of l.children)
        a.parent = l;
    }
    return e.destroy(), l;
  }
  // Insert the node as a newly created node desc.
  addNode(e, t, r, i, s) {
    let o = at.create(this.top, e, t, r, i, s);
    o.contentDOM && o.updateChildren(i, s + 1), this.top.children.splice(this.index++, 0, o), this.changed = !0;
  }
  placeWidget(e, t, r) {
    let i = this.index < this.top.children.length ? this.top.children[this.index] : null;
    if (i && i.matchesWidget(e) && (e == i.widget || !i.widget.type.toDOM.parentNode))
      this.index++;
    else {
      let s = new Oc(this.top, e, t, r);
      this.top.children.splice(this.index++, 0, s), this.changed = !0;
    }
  }
  // Make sure a textblock looks and behaves correctly in
  // contentEditable.
  addTextblockHacks() {
    let e = this.top.children[this.index - 1], t = this.top;
    for (; e instanceof lt; )
      t = e, e = t.children[t.children.length - 1];
    (!e || // Empty textblock
    !(e instanceof ui) || /\n$/.test(e.node.text) || this.view.requiresGeckoHackNode && /\s$/.test(e.node.text)) && ((oe || re) && e && e.dom.contentEditable == "false" && this.addHackNode("IMG", t), this.addHackNode("BR", this.top));
  }
  addHackNode(e, t) {
    if (t == this.top && this.index < t.children.length && t.children[this.index].matchesHack(e))
      this.index++;
    else {
      let r = document.createElement(e);
      e == "IMG" && (r.className = "ProseMirror-separator", r.alt = ""), e == "BR" && (r.className = "ProseMirror-trailingBreak");
      let i = new Nc(this.top, [], r, null);
      t != this.top ? t.children.push(i) : t.children.splice(this.index++, 0, i), this.changed = !0;
    }
  }
  isLocked(e) {
    return this.lock && (e == this.lock || e.nodeType == 1 && e.contains(this.lock.parentNode));
  }
}
function Ph(n, e) {
  let t = e, r = t.children.length, i = n.childCount, s = /* @__PURE__ */ new Map(), o = [];
  e: for (; i > 0; ) {
    let l;
    for (; ; )
      if (r) {
        let c = t.children[r - 1];
        if (c instanceof lt)
          t = c, r = c.children.length;
        else {
          l = c, r--;
          break;
        }
      } else {
        if (t == e)
          break e;
        r = t.parent.children.indexOf(t), t = t.parent;
      }
    let a = l.node;
    if (a) {
      if (a != n.child(i - 1))
        break;
      --i, s.set(l, i), o.push(l);
    }
  }
  return { index: i, matched: s, matches: o.reverse() };
}
function Bh(n, e) {
  return n.type.side - e.type.side;
}
function $h(n, e, t, r) {
  let i = e.locals(n), s = 0;
  if (i.length == 0) {
    for (let c = 0; c < n.childCount; c++) {
      let u = n.child(c);
      r(u, i, e.forChild(s, u), c), s += u.nodeSize;
    }
    return;
  }
  let o = 0, l = [], a = null;
  for (let c = 0; ; ) {
    let u, d;
    for (; o < i.length && i[o].to == s; ) {
      let g = i[o++];
      g.widget && (u ? (d || (d = [u])).push(g) : u = g);
    }
    if (u)
      if (d) {
        d.sort(Bh);
        for (let g = 0; g < d.length; g++)
          t(d[g], c, !!a);
      } else
        t(u, c, !!a);
    let f, h;
    if (a)
      h = -1, f = a, a = null;
    else if (c < n.childCount)
      h = c, f = n.child(c++);
    else
      break;
    for (let g = 0; g < l.length; g++)
      l[g].to <= s && l.splice(g--, 1);
    for (; o < i.length && i[o].from <= s && i[o].to > s; )
      l.push(i[o++]);
    let p = s + f.nodeSize;
    if (f.isText) {
      let g = p;
      o < i.length && i[o].from < g && (g = i[o].from);
      for (let y = 0; y < l.length; y++)
        l[y].to < g && (g = l[y].to);
      g < p && (a = f.cut(g - s), f = f.cut(0, g - s), p = g, h = -1);
    } else
      for (; o < i.length && i[o].to < p; )
        o++;
    let m = f.isInline && !f.isLeaf ? l.filter((g) => !g.inline) : l.slice();
    r(f, m, e.forChild(s, f), h), s = p;
  }
}
function zh(n) {
  if (n.nodeName == "UL" || n.nodeName == "OL") {
    let e = n.style.cssText;
    n.style.cssText = e + "; list-style: square !important", window.getComputedStyle(n).listStyle, n.style.cssText = e;
  }
}
function _h(n, e, t, r) {
  for (let i = 0, s = 0; i < n.childCount && s <= r; ) {
    let o = n.child(i++), l = s;
    if (s += o.nodeSize, !o.isText)
      continue;
    let a = o.text;
    for (; i < n.childCount; ) {
      let c = n.child(i++);
      if (s += c.nodeSize, !c.isText)
        break;
      a += c.text;
    }
    if (s >= t) {
      if (s >= r && a.slice(r - e.length - l, r - l) == e)
        return r - e.length;
      let c = l < r ? a.lastIndexOf(e, r - l - 1) : -1;
      if (c >= 0 && c + e.length + l >= t)
        return l + c;
      if (t == r && a.length >= r + e.length - l && a.slice(r - l, r - l + e.length) == e)
        return r;
    }
  }
  return -1;
}
function bs(n, e, t, r, i) {
  let s = [];
  for (let o = 0, l = 0; o < n.length; o++) {
    let a = n[o], c = l, u = l += a.size;
    c >= t || u <= e ? s.push(a) : (c < e && s.push(a.slice(0, e - c, r)), i && (s.push(i), i = void 0), u > t && s.push(a.slice(t - c, a.size, r)));
  }
  return s;
}
function Qs(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let i = n.docView.nearestDesc(t.focusNode), s = i && i.size == 0, o = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (o < 0)
    return null;
  let l = r.resolve(o), a, c;
  if (ci(t)) {
    for (a = o; i && !i.node; )
      i = i.parent;
    let d = i.node;
    if (i && d.isAtom && N.isSelectable(d) && i.parent && !(d.isInline && fh(t.focusNode, t.focusOffset, i.dom))) {
      let f = i.posBefore;
      c = new N(o == f ? l : r.resolve(f));
    }
  } else {
    if (t instanceof n.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
      let d = o, f = o;
      for (let h = 0; h < t.rangeCount; h++) {
        let p = t.getRangeAt(h);
        d = Math.min(d, n.docView.posFromDOM(p.startContainer, p.startOffset, 1)), f = Math.max(f, n.docView.posFromDOM(p.endContainer, p.endOffset, -1));
      }
      if (d < 0)
        return null;
      [a, o] = f == n.state.selection.anchor ? [f, d] : [d, f], l = r.resolve(o);
    } else
      a = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (a < 0)
      return null;
  }
  let u = r.resolve(a);
  if (!c) {
    let d = e == "pointer" || n.state.selection.head < l.pos && !s ? 1 : -1;
    c = Ys(n, u, l, d);
  }
  return c;
}
function Lc(n) {
  return n.editable ? n.hasFocus() : Bc(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function Ke(n, e = !1) {
  let t = n.state.selection;
  if (Pc(n, t), !Lc(n))
    return;
  let r = n.input.mouseDown;
  if (!e && re && r) {
    let i = n.domSelectionRange(), s = n.domObserver.currentSelection;
    if (i.anchorNode && s.anchorNode && Lt(i.anchorNode, i.anchorOffset, s.anchorNode, s.anchorOffset) && r.delaySelUpdate()) {
      n.domObserver.setCurSelection();
      return;
    }
  }
  if (n.domObserver.disconnectSelection(), n.cursorWrapper)
    Hh(n);
  else {
    let { anchor: i, head: s } = t, o, l;
    il && !(t instanceof I) && (t.$from.parent.inlineContent || (o = sl(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (l = sl(n, t.to))), n.docView.setSelection(i, s, n, e), il && (o && ol(o), l && ol(l)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Fh(n));
  }
  n.domObserver.setCurSelection(), n.domObserver.connectSelection();
}
const il = oe || re && wc < 63;
function sl(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), i = r < t.childNodes.length ? t.childNodes[r] : null, s = r ? t.childNodes[r - 1] : null;
  if (oe && i && i.contentEditable == "false")
    return Ni(i);
  if ((!i || i.contentEditable == "false") && (!s || s.contentEditable == "false")) {
    if (i)
      return Ni(i);
    if (s)
      return Ni(s);
  }
}
function Ni(n) {
  return n.contentEditable = "true", oe && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function ol(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function Fh(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, i = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != i) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!Lc(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function Hh(n) {
  let e = n.domSelection();
  if (!e)
    return;
  let t = n.cursorWrapper.dom, r = t.nodeName == "IMG";
  r ? e.collapse(t.parentNode, te(t) + 1) : e.collapse(t, 0), !r && !n.state.selection.visible && be && ot <= 11 && (t.disabled = !0, t.disabled = !1);
}
function Pc(n, e) {
  if (e instanceof N) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (ll(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    ll(n);
}
function ll(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function Ys(n, e, t, r) {
  return n.someProp("createSelectionBetween", (i) => i(n, e, t)) || I.between(e, t, r);
}
function al(n) {
  return n.editable && !n.hasFocus() ? !1 : Bc(n);
}
function Bc(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function Vh(n) {
  let e = n.docView.domFromPos(n.state.selection.anchor, 0), t = n.domSelectionRange();
  return Lt(e.node, e.offset, t.anchorNode, t.anchorOffset);
}
function ks(n, e) {
  let { $anchor: t, $head: r } = n.selection, i = e > 0 ? t.max(r) : t.min(r), s = i.parent.inlineContent ? i.depth ? n.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return s && D.findFrom(s, e);
}
function Ze(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function cl(n, e, t) {
  let r = n.state.selection;
  if (r instanceof I)
    if (t.indexOf("s") > -1) {
      let { $head: i } = r, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!s || s.isText || !s.isLeaf)
        return !1;
      let o = n.state.doc.resolve(i.pos + s.nodeSize * (e < 0 ? -1 : 1));
      return Ze(n, new I(r.$anchor, o));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = ks(n.state, e);
        return i && i instanceof N ? Ze(n, i) : !1;
      } else if (!(Ee && t.indexOf("m") > -1)) {
        let i = r.$head, s = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, o;
        if (!s || s.isText)
          return !1;
        let l = e < 0 ? i.pos - s.nodeSize : i.pos;
        return s.isAtom || (o = n.docView.descAt(l)) && !o.contentDOM ? N.isSelectable(s) ? Ze(n, new N(e < 0 ? n.state.doc.resolve(i.pos - s.nodeSize) : i)) : Vn ? Ze(n, new I(n.state.doc.resolve(e < 0 ? l : l + s.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof N && r.node.isInline)
      return Ze(n, new I(e > 0 ? r.$to : r.$from));
    {
      let i = ks(n.state, e);
      return i ? Ze(n, i) : !1;
    }
  }
}
function wr(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function Sn(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function _t(n, e) {
  return e < 0 ? jh(n) : Wh(n);
}
function jh(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i, s, o = !1;
  for (Me && t.nodeType == 1 && r < wr(t) && Sn(t.childNodes[r], -1) && (o = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let l = t.childNodes[r - 1];
        if (Sn(l, -1))
          i = t, s = --r;
        else if (l.nodeType == 3)
          t = l, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if ($c(t))
        break;
      {
        let l = t.previousSibling;
        for (; l && Sn(l, -1); )
          i = t.parentNode, s = te(l), l = l.previousSibling;
        if (l)
          t = l, r = wr(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  o ? Ss(n, t, r) : i && Ss(n, i, s);
}
function Wh(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i = wr(t), s, o;
  for (; ; )
    if (r < i) {
      if (t.nodeType != 1)
        break;
      let l = t.childNodes[r];
      if (Sn(l, 1))
        s = t, o = ++r;
      else
        break;
    } else {
      if ($c(t))
        break;
      {
        let l = t.nextSibling;
        for (; l && Sn(l, 1); )
          s = l.parentNode, o = te(l) + 1, l = l.nextSibling;
        if (l)
          t = l, r = 0, i = wr(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = i = 0;
        }
      }
    }
  s && Ss(n, s, o);
}
function $c(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function Uh(n, e) {
  for (; n && e == n.childNodes.length && !Hn(n); )
    e = te(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function qh(n, e) {
  for (; n && !e && !Hn(n); )
    e = te(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function Ss(n, e, t) {
  if (e.nodeType != 3) {
    let s, o;
    (o = Uh(e, t)) ? (e = o, t = 0) : (s = qh(e, t)) && (e = s, t = s.nodeValue.length);
  }
  let r = n.domSelection();
  if (!r)
    return;
  if (ci(r)) {
    let s = document.createRange();
    s.setEnd(e, t), s.setStart(e, t), r.removeAllRanges(), r.addRange(s);
  } else r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: i } = n;
  setTimeout(() => {
    n.state == i && Ke(n);
  }, 50);
}
function ul(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(re || xc) && t.parent.inlineContent) {
    let i = n.coordsAtPos(e);
    if (e > t.start()) {
      let s = n.coordsAtPos(e - 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left < i.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let s = n.coordsAtPos(e + 1), o = (s.top + s.bottom) / 2;
      if (o > i.top && o < i.bottom && Math.abs(s.left - i.left) > 1)
        return s.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function dl(n, e, t) {
  let r = n.state.selection;
  if (r instanceof I && !r.empty || t.indexOf("s") > -1 || Ee && t.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: s } = r;
  if (!i.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let o = ks(n.state, e);
    if (o && o instanceof N)
      return Ze(n, o);
  }
  if (!i.parent.inlineContent) {
    let o = e < 0 ? i : s, l = r instanceof we ? D.near(o, e) : D.findFrom(o, e);
    return l ? Ze(n, l) : !1;
  }
  return !1;
}
function fl(n, e) {
  if (!(n.state.selection instanceof I))
    return !0;
  let { $head: t, $anchor: r, empty: i } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let s = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (s && !s.isText) {
    let o = n.state.tr;
    return e < 0 ? o.delete(t.pos - s.nodeSize, t.pos) : o.delete(t.pos, t.pos + s.nodeSize), n.dispatch(o), !0;
  }
  return !1;
}
function hl(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function Kh(n) {
  if (!oe || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    hl(n, r, "true"), setTimeout(() => hl(n, r, "false"), 20);
  }
  return !1;
}
function Jh(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function Gh(n, e) {
  let t = e.keyCode, r = Jh(e);
  if (t == 8 || Ee && t == 72 && r == "c")
    return fl(n, -1) || _t(n, -1);
  if (t == 46 && !e.shiftKey || Ee && t == 68 && r == "c")
    return fl(n, 1) || _t(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || Ee && t == 66 && r == "c") {
    let i = t == 37 ? ul(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return cl(n, i, r) || _t(n, i);
  } else if (t == 39 || Ee && t == 70 && r == "c") {
    let i = t == 39 ? ul(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return cl(n, i, r) || _t(n, i);
  } else {
    if (t == 38 || Ee && t == 80 && r == "c")
      return dl(n, -1, r) || _t(n, -1);
    if (t == 40 || Ee && t == 78 && r == "c")
      return Kh(n) || dl(n, 1, r) || _t(n, 1);
    if (r == (Ee ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function Xs(n, e) {
  n.someProp("transformCopied", (h) => {
    e = h(e, n);
  });
  let t = [], { content: r, openStart: i, openEnd: s } = e;
  for (; i > 1 && s > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, s--;
    let h = r.firstChild;
    t.push(h.type.name, h.attrs != h.type.defaultAttrs ? h.attrs : null), r = h.content;
  }
  let o = n.someProp("clipboardSerializer") || Bt.fromSchema(n.state.schema), l = jc(), a = l.createElement("div");
  a.appendChild(o.serializeFragment(r, { document: l }));
  let c = a.firstChild, u, d = 0;
  for (; c && c.nodeType == 1 && (u = Vc[c.nodeName.toLowerCase()]); ) {
    for (let h = u.length - 1; h >= 0; h--) {
      let p = l.createElement(u[h]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), d++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${s}${d ? ` -${d}` : ""} ${JSON.stringify(t)}`);
  let f = n.someProp("clipboardTextSerializer", (h) => h(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: f, slice: e };
}
function zc(n, e, t, r, i) {
  let s = i.parent.type.spec.code, o, l;
  if (!t && !e)
    return null;
  let a = !!e && (r || s || !t);
  if (a) {
    if (n.someProp("transformPastedText", (f) => {
      e = f(e, s || r, n);
    }), s)
      return l = new v(x.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0), n.someProp("transformPasted", (f) => {
        l = f(l, n, !0);
      }), l;
    let d = n.someProp("clipboardTextParser", (f) => f(e, i, r, n));
    if (d)
      l = d;
    else {
      let f = i.marks(), { schema: h } = n.state, p = Bt.fromSchema(h);
      o = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let g = o.appendChild(document.createElement("p"));
        m && g.appendChild(p.serializeNode(h.text(m, f)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (d) => {
      t = d(t, n);
    }), o = Zh(t), Vn && ep(o);
  let c = o && o.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let d = +u[3]; d > 0; d--) {
      let f = o.firstChild;
      for (; f && f.nodeType != 1; )
        f = f.nextSibling;
      if (!f)
        break;
      o = f;
    }
  if (l || (l = (n.someProp("clipboardParser") || n.someProp("domParser") || st.fromSchema(n.state.schema)).parseSlice(o, {
    preserveWhitespace: !!(a || u),
    context: i,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !Qh.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    l = tp(pl(l, +u[1], +u[2]), u[4]);
  else if (l = v.maxOpen(Yh(l.content, i), !0), l.openStart || l.openEnd) {
    let d = 0, f = 0;
    for (let h = l.content.firstChild; d < l.openStart && !h.type.spec.isolating; d++, h = h.firstChild)
      ;
    for (let h = l.content.lastChild; f < l.openEnd && !h.type.spec.isolating; f++, h = h.lastChild)
      ;
    l = pl(l, d, f);
  }
  return n.someProp("transformPasted", (d) => {
    l = d(l, n, a);
  }), l;
}
const Qh = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Yh(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let i = e.node(t).contentMatchAt(e.index(t)), s, o = [];
    if (n.forEach((l) => {
      if (!o)
        return;
      let a = i.findWrapping(l.type), c;
      if (!a)
        return o = null;
      if (c = o.length && s.length && Fc(a, s, l, o[o.length - 1], 0))
        o[o.length - 1] = c;
      else {
        o.length && (o[o.length - 1] = Hc(o[o.length - 1], s.length));
        let u = _c(l, a);
        o.push(u), i = i.matchType(u.type), s = a;
      }
    }), o)
      return x.from(o);
  }
  return n;
}
function _c(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, x.from(n));
  return n;
}
function Fc(n, e, t, r, i) {
  if (i < n.length && i < e.length && n[i] == e[i]) {
    let s = Fc(n, e, t, r.lastChild, i + 1);
    if (s)
      return r.copy(r.content.replaceChild(r.childCount - 1, s));
    if (r.contentMatchAt(r.childCount).matchType(i == n.length - 1 ? t.type : n[i + 1]))
      return r.copy(r.content.append(x.from(_c(t, n, i + 1))));
  }
}
function Hc(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, Hc(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(x.empty, !0);
  return n.copy(t.append(r));
}
function ws(n, e, t, r, i, s) {
  let o = e < 0 ? n.firstChild : n.lastChild, l = o.content;
  return n.childCount > 1 && (s = 0), i < r - 1 && (l = ws(l, e, t, r, i + 1, s)), i >= t && (l = e < 0 ? o.contentMatchAt(0).fillBefore(l, s <= i).append(l) : l.append(o.contentMatchAt(o.childCount).fillBefore(x.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, o.copy(l));
}
function pl(n, e, t) {
  return e < n.openStart && (n = new v(ws(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new v(ws(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const Vc = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
function jc() {
  return document.implementation.createHTMLDocument("title");
}
let Ii = null;
function Xh(n) {
  let e = window.trustedTypes;
  return e ? (Ii || (Ii = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", { createHTML: (t) => t })), Ii.createHTML(n)) : n;
}
function Zh(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = jc(), r = t.body, i = /<([a-z][^>\s]+)/i.exec(n), s;
  if ((s = i && Vc[i[1].toLowerCase()]) && (n = s.map((o) => "<" + o + ">").join("") + n + s.map((o) => "</" + o + ">").reverse().join("")), r.innerHTML = Xh(n), s)
    for (let o = 0; o < s.length; o++)
      r = r.querySelector(s[o]) || r;
  for (let o = 0; o < t.styleSheets.length; o++) {
    let l = t.styleSheets[o];
    for (let a = 0; a < l.rules.length; a++) {
      let c = l.rules[a];
      if (c instanceof CSSStyleRule) {
        let u = r.querySelectorAll(c.selectorText);
        for (let d = 0; d < u.length; d++)
          u[d].style.cssText += c.style.cssText;
      }
    }
  }
  return r;
}
function ep(n) {
  let e = n.querySelectorAll(re ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function tp(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: i, openStart: s, openEnd: o } = n;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = t.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    i = x.from(a.create(r[l + 1], i)), s++, o++;
  }
  return new v(i, s, o);
}
const de = {}, fe = {}, np = { touchstart: !0, touchmove: !0 };
class rp {
  constructor() {
    this.shiftKey = !1, this.mouseDown = null, this.lastKeyCode = null, this.lastKeyCodeTime = 0, this.lastClick = { time: 0, x: 0, y: 0, type: "", button: 0 }, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastIOSEnter = 0, this.lastIOSEnterFallbackTimeout = -1, this.lastFocus = 0, this.lastTouch = 0, this.lastChromeDelete = 0, this.composing = !1, this.compositionNode = null, this.composingTimeout = -1, this.compositionNodes = [], this.compositionEndedAt = -2e8, this.compositionID = 1, this.badSafariComposition = !1, this.compositionPendingChanges = 0, this.domChangeCount = 0, this.eventHandlers = /* @__PURE__ */ Object.create(null), this.hideSelectionGuard = null;
  }
}
function ip(n) {
  for (let e in de) {
    let t = de[e];
    n.dom.addEventListener(e, n.input.eventHandlers[e] = (r) => {
      op(n, r) && !Zs(n, r) && (n.editable || !(r.type in fe)) && t(n, r);
    }, np[e] ? { passive: !0 } : void 0);
  }
  oe && n.dom.addEventListener("input", () => null), xs(n);
}
function Ue(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
function sp(n) {
  n.input.mouseDown && n.input.mouseDown.done(), n.domObserver.stop();
  for (let e in n.input.eventHandlers)
    n.dom.removeEventListener(e, n.input.eventHandlers[e]);
  clearTimeout(n.input.composingTimeout), clearTimeout(n.input.lastIOSEnterFallbackTimeout);
}
function xs(n) {
  n.someProp("handleDOMEvents", (e) => {
    for (let t in e)
      n.input.eventHandlers[t] || n.dom.addEventListener(t, n.input.eventHandlers[t] = (r) => Zs(n, r));
  });
}
function Zs(n, e) {
  return n.someProp("handleDOMEvents", (t) => {
    let r = t[e.type];
    return r ? r(n, e) || e.defaultPrevented : !1;
  });
}
function op(n, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target; t != n.dom; t = t.parentNode)
    if (!t || t.nodeType == 11 || t.pmViewDesc && t.pmViewDesc.stopEvent(e))
      return !1;
  return !0;
}
function lp(n, e) {
  !Zs(n, e) && de[e.type] && (n.editable || !(e.type in fe)) && de[e.type](n, e);
}
fe.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !Kc(n) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(We && re && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), tn && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (i) => i(n, bt(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else n.someProp("handleKeyDown", (r) => r(n, t)) || Gh(n, t) ? t.preventDefault() : Ue(n, "key");
};
fe.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
fe.keypress = (n, e) => {
  let t = e;
  if (Kc(n) || !t.charCode || t.ctrlKey && !t.altKey || Ee && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (i) => i(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof I) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(t.charCode), s = () => n.state.tr.insertText(i).scrollIntoView();
    !/[\r\n]/.test(i) && !n.someProp("handleTextInput", (o) => o(n, r.$from.pos, r.$to.pos, i, s)) && n.dispatch(s()), t.preventDefault();
  }
};
function Wn(n) {
  return { left: n.clientX, top: n.clientY };
}
function ap(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function eo(n, e, t, r, i) {
  if (r == -1)
    return !1;
  let s = n.state.doc.resolve(r);
  for (let o = s.depth + 1; o > 0; o--)
    if (n.someProp(e, (l) => o > s.depth ? l(n, t, s.nodeAfter, s.before(o), i, !0) : l(n, t, s.node(o), s.before(o), i, !1)))
      return !0;
  return !1;
}
function Un(n, e, t) {
  if (n.focused || n.focus(), n.state.selection.eq(e))
    return;
  let r = n.state.tr.setSelection(e);
  r.setMeta("pointer", !0), n.dispatch(r);
}
function cp(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && N.isSelectable(r) ? (Un(n, new N(t)), !0) : !1;
}
function up(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, i;
  t instanceof N && (r = t.node);
  let s = n.state.doc.resolve(e);
  for (let o = s.depth + 1; o > 0; o--) {
    let l = o > s.depth ? s.nodeAfter : s.node(o);
    if (N.isSelectable(l)) {
      r && t.$from.depth > 0 && o >= t.$from.depth && s.before(t.$from.depth + 1) == t.$from.pos ? i = s.before(t.$from.depth) : i = s.before(o);
      break;
    }
  }
  return i != null ? (Un(n, N.create(n.state.doc, i)), !0) : !1;
}
function dp(n, e, t, r, i) {
  return eo(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (s) => s(n, e, r)) || (i ? up(n, t) : cp(n, t));
}
function fp(n, e, t, r) {
  return eo(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (i) => i(n, e, r));
}
function hp(n, e, t, r) {
  return eo(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (i) => i(n, e, r)) || pp(n, t, r);
}
function pp(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = Wc(n, e, !0), i = n.state.doc;
  return r ? (Un(n, r), r instanceof I && i.eq(n.state.doc) && (n.input.mouseDown = new gp(n, r)), !0) : !1;
}
function Wc(n, e, t) {
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? I.create(r, 0, r.content.size) : null;
  let i = r.resolve(e);
  for (let s = i.depth + 1; s > 0; s--) {
    let o = s > i.depth ? i.nodeAfter : i.node(s), l = i.before(s);
    if (o.inlineContent)
      return I.create(r, l + 1, l + 1 + o.content.size);
    if (t && N.isSelectable(o))
      return N.create(r, l);
  }
  return null;
}
function to(n) {
  return xr(n);
}
const Uc = Ee ? "metaKey" : "ctrlKey";
de.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = to(n), i = Date.now(), s = "singleClick";
  i - n.input.lastClick.time < 500 && ap(t, n.input.lastClick) && !t[Uc] && n.input.lastClick.button == t.button && (n.input.lastClick.type == "singleClick" ? s = "doubleClick" : n.input.lastClick.type == "doubleClick" && (s = "tripleClick")), n.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: s, button: t.button }, n.input.mouseDown && n.input.mouseDown.done();
  let o = n.posAtCoords(Wn(t));
  o && (s == "singleClick" ? n.input.mouseDown = new mp(n, o, t, !!r) : (s == "doubleClick" ? fp : hp)(n, o.pos, o.inside, t) ? t.preventDefault() : Ue(n, "pointer"));
};
class qc {
  constructor(e) {
    this.view = e, this.mightDrag = null, e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this));
  }
  up(e) {
    this.done();
  }
  move(e) {
    e.buttons == 0 && this.done();
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.view.input.mouseDown == this && (this.view.input.mouseDown = null);
  }
  delaySelUpdate() {
    return !1;
  }
}
class mp extends qc {
  constructor(e, t, r, i) {
    super(e), this.pos = t, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.startDoc = e.state.doc, this.selectNode = !!r[Uc], this.allowDefault = r.shiftKey;
    let s, o;
    if (t.inside > -1)
      s = e.state.doc.nodeAt(t.inside), o = t.inside;
    else {
      let u = e.state.doc.resolve(t.pos);
      s = u.parent, o = u.depth ? u.before() : 0;
    }
    const l = i ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.nodeDOM.nodeType == 1 ? a.nodeDOM : null;
    let { selection: c } = e.state;
    r.button == 0 && (s.type.spec.draggable && s.type.spec.selectable !== !1 || c instanceof N && c.from <= o && c.to > o) && (this.mightDrag = {
      node: s,
      pos: o,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && Me && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), Ue(e, "pointer");
  }
  done() {
    super.done(), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => {
      this.view.isDestroyed || Ke(this.view);
    });
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Wn(e))), this.updateAllowDefault(e), this.allowDefault || !t ? Ue(this.view, "pointer") : dp(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    oe && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    re && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (Un(this.view, D.near(this.view.state.doc.resolve(t.pos))), e.preventDefault()) : Ue(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), Ue(this.view, "pointer"), super.move(e);
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
  delaySelUpdate() {
    return this.allowDefault ? (this.delayedSelectionSync = !0, !0) : !1;
  }
}
class gp extends qc {
  constructor(e, t) {
    super(e), this.startSelection = t, this.startDoc = e.state.doc;
  }
  move(e) {
    if (e.buttons == 0 || this.view.isDestroyed || !this.view.state.doc.eq(this.startDoc)) {
      this.done();
      return;
    }
    e.preventDefault(), Ue(this.view, "pointer");
    let t = this.view.posAtCoords(Wn(e)), r = t && Wc(this.view, t.inside, !1);
    if (!r)
      return;
    let { doc: i } = this.view.state, s = this.startSelection, [o, l] = r.from < s.from ? [s.to, r.from] : [s.from, r.to];
    Un(this.view, I.create(i, o, l));
  }
}
de.touchstart = (n) => {
  n.input.lastTouch = Date.now(), to(n), Ue(n, "pointer");
};
de.touchmove = (n) => {
  n.input.lastTouch = Date.now(), Ue(n, "pointer");
};
de.contextmenu = (n) => to(n);
function Kc(n, e) {
  return n.composing ? !0 : oe && Math.abs(Date.now() - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const yp = We ? 5e3 : -1;
fe.compositionstart = fe.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$to;
    if (e.selection instanceof I && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1) || re && xc && bp(n)))
      n.markCursor = n.state.storedMarks || t.marks(), xr(n, !0), n.markCursor = null;
    else if (xr(n, !e.selection.empty), Me && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let i = r.focusNode, s = r.focusOffset; i && i.nodeType == 1 && s != 0; ) {
        let o = s < 0 ? i.lastChild : i.childNodes[s - 1];
        if (!o)
          break;
        if (o.nodeType == 3) {
          let l = n.domSelection();
          l && l.collapse(o, o.nodeValue.length);
          break;
        } else
          i = o, s = -1;
      }
    }
    n.input.composing = !0;
  }
  Jc(n, yp);
};
function bp(n) {
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (!e || e.nodeType != 1 || t >= e.childNodes.length)
    return !1;
  let r = e.childNodes[t];
  return r.nodeType == 1 && r.contentEditable == "false";
}
fe.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Date.now(), n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.badSafariComposition ? n.domObserver.forceFlush() : n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, Jc(n, 20));
};
function Jc(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => xr(n), e));
}
function Gc(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Date.now()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function kp(n) {
  let e = n.domSelectionRange();
  if (!e.focusNode)
    return null;
  let t = uh(e.focusNode, e.focusOffset), r = dh(e.focusNode, e.focusOffset);
  if (t && r && t != r) {
    let i = r.pmViewDesc, s = n.domObserver.lastChangedTextNode;
    if (t == s || r == s)
      return s;
    if (!i || !i.isText(r.nodeValue))
      return r;
    if (n.input.compositionNode == r) {
      let o = t.pmViewDesc;
      if (!(!o || !o.isText(t.nodeValue)))
        return r;
    }
  }
  return t || r;
}
function xr(n, e = !1) {
  if (!(We && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), Gc(n), e || n.docView && n.docView.dirty) {
      let t = Qs(n), r = n.state.selection;
      return t && !t.eq(r) ? n.dispatch(n.state.tr.setSelection(t)) : (n.markCursor || e) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? n.dispatch(n.state.tr.deleteSelection()) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function Sp(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const Pn = be && ot < 15 || tn && mh < 604;
de.copy = fe.cut = (n, e) => {
  let t = e, r = n.state.selection, i = t.type == "cut";
  if (r.empty)
    return;
  let s = Pn ? null : t.clipboardData, o = r.content(), { dom: l, text: a } = Xs(n, o);
  s ? (t.preventDefault(), s.clearData(), s.setData("text/html", l.innerHTML), s.setData("text/plain", a)) : Sp(n, l), i && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function wp(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function xp(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? Bn(n, r.value, null, i, e) : Bn(n, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function Bn(n, e, t, r, i) {
  let s = zc(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (a) => a(n, i, s || v.empty)))
    return !0;
  if (!s)
    return !1;
  let o = wp(s), l = o ? n.state.tr.replaceSelectionWith(o, r) : n.state.tr.replaceSelection(s);
  return n.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function Qc(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
fe.paste = (n, e) => {
  let t = e;
  if (n.composing && !We)
    return;
  let r = Pn ? null : t.clipboardData, i = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && Bn(n, Qc(r), r.getData("text/html"), i, t) ? t.preventDefault() : xp(n, t);
};
class Yc {
  constructor(e, t, r) {
    this.slice = e, this.move = t, this.node = r;
  }
}
const Cp = Ee ? "altKey" : "ctrlKey";
function Xc(n, e) {
  let t;
  return n.someProp("dragCopies", (r) => {
    t = t || r(e);
  }), t != null ? !t : !e[Cp];
}
de.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let i = n.state.selection, s = i.empty ? null : n.posAtCoords(Wn(t)), o;
  if (!(s && s.pos >= i.from && s.pos <= (i instanceof N ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      o = N.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let d = n.docView.nearestDesc(t.target, !0);
      d && d.node.type.spec.draggable && d != n.docView && (o = N.create(n.state.doc, d.posBefore));
    }
  }
  let l = (o || n.state.selection).content(), { dom: a, text: c, slice: u } = Xs(n, l);
  (!t.dataTransfer.files.length || !re || wc > 120) && t.dataTransfer.clearData(), t.dataTransfer.setData(Pn ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", Pn || t.dataTransfer.setData("text/plain", c), n.dragging = new Yc(u, Xc(n, t), o);
};
de.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
fe.dragover = fe.dragenter = (n, e) => e.preventDefault();
fe.drop = (n, e) => {
  try {
    Ep(n, e, n.dragging);
  } finally {
    n.dragging = null;
  }
};
function Ep(n, e, t) {
  if (!e.dataTransfer)
    return;
  let r = n.posAtCoords(Wn(e));
  if (!r)
    return;
  let i = n.state.doc.resolve(r.pos), s = t && t.slice;
  s ? n.someProp("transformPasted", (h) => {
    s = h(s, n, !1);
  }) : s = zc(n, Qc(e.dataTransfer), Pn ? null : e.dataTransfer.getData("text/html"), !1, i);
  let o = !!(t && Xc(n, e));
  if (n.someProp("handleDrop", (h) => h(n, e, s || v.empty, o))) {
    e.preventDefault();
    return;
  }
  if (!s)
    return;
  e.preventDefault();
  let l = s ? Za(n.state.doc, i.pos, s) : i.pos;
  l == null && (l = i.pos);
  let a = n.state.tr;
  if (o) {
    let { node: h } = t;
    h ? h.replace(a) : a.deleteSelection();
  }
  let c = a.mapping.map(l), u = s.openStart == 0 && s.openEnd == 0 && s.content.childCount == 1, d = a.doc;
  if (u ? a.replaceRangeWith(c, c, s.content.firstChild) : a.replaceRange(c, c, s), a.doc.eq(d))
    return;
  let f = a.doc.resolve(c);
  if (u && N.isSelectable(s.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(s.content.firstChild))
    a.setSelection(new N(f));
  else {
    let h = a.mapping.map(l);
    a.mapping.maps[a.mapping.maps.length - 1].forEach((p, m, g, y) => h = y), a.setSelection(Ys(n, f, a.doc.resolve(h)));
  }
  n.focus(), n.dispatch(a.setMeta("uiEvent", "drop"));
}
de.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && Ke(n);
  }, 20));
};
de.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
de.beforeinput = (n, e) => {
  if (We && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (s) => s(n, bt(8, "Backspace")))))
        return;
      let { $cursor: i } = n.state.selection;
      i && i.pos > 0 && n.dispatch(n.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in fe)
  de[n] = fe[n];
function $n(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class Cr {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || At, this.side = this.spec.side || 0;
  }
  map(e, t, r, i) {
    let { pos: s, deleted: o } = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
    return o ? null : new ue(s - r, s - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof Cr && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && $n(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class ct {
  constructor(e, t) {
    this.attrs = e, this.spec = t || At;
  }
  map(e, t, r, i) {
    let s = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - r, o = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return s >= o ? null : new ue(s, o, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof ct && $n(this.attrs, e.attrs) && $n(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof ct;
  }
  destroy() {
  }
}
class no {
  constructor(e, t) {
    this.attrs = e, this.spec = t || At;
  }
  map(e, t, r, i) {
    let s = e.mapResult(t.from + i, 1);
    if (s.deleted)
      return null;
    let o = e.mapResult(t.to + i, -1);
    return o.deleted || o.pos <= s.pos ? null : new ue(s.pos - r, o.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: i } = e.content.findIndex(t.from), s;
    return i == t.from && !(s = e.child(r)).isText && i + s.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof no && $n(this.attrs, e.attrs) && $n(this.spec, e.spec);
  }
  destroy() {
  }
}
class ue {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new ue(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, r) {
    return new ue(e, e, new Cr(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, i) {
    return new ue(e, t, new ct(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, i) {
    return new ue(e, t, new no(r, i));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof ct;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof Cr;
  }
}
const jt = [], At = {};
class P {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : jt, this.children = t.length ? t : jt;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? Er(t, e, 0, At) : se;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, r) {
    let i = [];
    return this.findInner(e ?? 0, t ?? 1e9, i, 0, r), i;
  }
  findInner(e, t, r, i, s) {
    for (let o = 0; o < this.local.length; o++) {
      let l = this.local[o];
      l.from <= t && l.to >= e && (!s || s(l.spec)) && r.push(l.copy(l.from + i, l.to + i));
    }
    for (let o = 0; o < this.children.length; o += 3)
      if (this.children[o] < t && this.children[o + 1] > e) {
        let l = this.children[o] + 1;
        this.children[o + 2].findInner(e - l, t - l, r, i + l, s);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, r) {
    return this == se || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || At);
  }
  /**
  @internal
  */
  mapInner(e, t, r, i, s) {
    let o;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(t, a) ? (o || (o = [])).push(a) : s.onRemove && s.onRemove(this.local[l].spec);
    }
    return this.children.length ? vp(this.children, o || [], e, t, r, i, s) : o ? new P(o.sort(Ot), jt) : se;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == se ? P.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let i, s = 0;
    e.forEach((l, a) => {
      let c = a + r, u;
      if (u = eu(t, l, c)) {
        for (i || (i = this.children.slice()); s < i.length && i[s] < a; )
          s += 3;
        i[s] == a ? i[s + 2] = i[s + 2].addInner(l, u, c + 1) : i.splice(s, 0, a, a + l.nodeSize, Er(u, l, c + 1, At)), s += 3;
      }
    });
    let o = Zc(s ? tu(t) : t, -r);
    for (let l = 0; l < o.length; l++)
      o[l].type.valid(e, o[l]) || o.splice(l--, 1);
    return new P(o.length ? this.local.concat(o).sort(Ot) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == se ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, i = this.local;
    for (let s = 0; s < r.length; s += 3) {
      let o, l = r[s] + t, a = r[s + 1] + t;
      for (let u = 0, d; u < e.length; u++)
        (d = e[u]) && d.from > l && d.to < a && (e[u] = null, (o || (o = [])).push(d));
      if (!o)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[s + 2].removeInner(o, l + 1);
      c != se ? r[s + 2] = c : (r.splice(s, 3), s -= 3);
    }
    if (i.length) {
      for (let s = 0, o; s < e.length; s++)
        if (o = e[s])
          for (let l = 0; l < i.length; l++)
            i[l].eq(o, t) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new P(i, r) : se;
  }
  forChild(e, t) {
    if (this == se)
      return this;
    if (t.isLeaf)
      return P.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let s = e + 1, o = s + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < o && a.to > s && a.type instanceof ct) {
        let c = Math.max(s, a.from) - s, u = Math.min(o, a.to) - s;
        c < u && (i || (i = [])).push(a.copy(c, u));
      }
    }
    if (i) {
      let l = new P(i.sort(Ot), jt);
      return r ? new nt([l, r]) : l;
    }
    return r || se;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof P) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return ro(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == se)
      return jt;
    if (e.inlineContent || !this.local.some(ct.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof ct || t.push(this.local[r]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
P.empty = new P([], []);
P.removeOverlap = ro;
const se = P.empty;
class nt {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((i) => i.map(e, t, At));
    return nt.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return P.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].forChild(e, t);
      s != se && (s instanceof nt ? r = r.concat(s.members) : r.push(s));
    }
    return nt.from(r);
  }
  eq(e) {
    if (!(e instanceof nt) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let s = this.members[i].localsInner(e);
      if (s.length)
        if (!t)
          t = s;
        else {
          r && (t = t.slice(), r = !1);
          for (let o = 0; o < s.length; o++)
            t.push(s[o]);
        }
    }
    return t ? ro(r ? t : t.sort(Ot)) : jt;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return se;
      case 1:
        return e[0];
      default:
        return new nt(e.every((t) => t instanceof P) ? e : e.reduce((t, r) => t.concat(r instanceof P ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++)
      this.members[t].forEachSet(e);
  }
}
function vp(n, e, t, r, i, s, o) {
  let l = n.slice();
  for (let c = 0, u = s; c < t.maps.length; c++) {
    let d = 0;
    t.maps[c].forEach((f, h, p, m) => {
      let g = m - p - (h - f);
      for (let y = 0; y < l.length; y += 3) {
        let b = l[y + 1];
        if (b < 0 || f > b + u - d)
          continue;
        let S = l[y] + u - d;
        h >= S ? l[y + 1] = f <= S ? -2 : -1 : f >= u && g && (l[y] += g, l[y + 1] += g);
      }
      d += g;
    }), u = t.maps[c].map(u, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let u = t.map(n[c] + s), d = u - i;
      if (d < 0 || d >= r.content.size) {
        a = !0;
        continue;
      }
      let f = t.map(n[c + 1] + s, -1), h = f - i, { index: p, offset: m } = r.content.findIndex(d), g = r.maybeChild(p);
      if (g && m == d && m + g.nodeSize == h) {
        let y = l[c + 2].mapInner(t, g, u + 1, n[c] + s + 1, o);
        y != se ? (l[c] = d, l[c + 1] = h, l[c + 2] = y) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = Mp(l, n, e, t, i, s, o), u = Er(c, r, 0, o);
    e = u.local;
    for (let d = 0; d < l.length; d += 3)
      l[d + 1] < 0 && (l.splice(d, 3), d -= 3);
    for (let d = 0, f = 0; d < u.children.length; d += 3) {
      let h = u.children[d];
      for (; f < l.length && l[f] < h; )
        f += 3;
      l.splice(f, 0, u.children[d], u.children[d + 1], u.children[d + 2]);
    }
  }
  return new P(e.sort(Ot), l);
}
function Zc(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    t.push(new ue(i.from + e, i.to + e, i.type));
  }
  return t;
}
function Mp(n, e, t, r, i, s, o) {
  function l(a, c) {
    for (let u = 0; u < a.local.length; u++) {
      let d = a.local[u].map(r, i, c);
      d ? t.push(d) : o.onRemove && o.onRemove(a.local[u].spec);
    }
    for (let u = 0; u < a.children.length; u += 3)
      l(a.children[u + 2], a.children[u] + c + 1);
  }
  for (let a = 0; a < n.length; a += 3)
    n[a + 1] == -1 && l(n[a + 2], e[a] + s + 1);
  return t;
}
function eu(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, i = null;
  for (let s = 0, o; s < n.length; s++)
    (o = n[s]) && o.from > t && o.to < r && ((i || (i = [])).push(o), n[s] = null);
  return i;
}
function tu(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function Er(n, e, t, r) {
  let i = [], s = !1;
  e.forEach((l, a) => {
    let c = eu(n, l, a + t);
    if (c) {
      s = !0;
      let u = Er(c, l, t + a + 1, r);
      u != se && i.push(a, a + l.nodeSize, u);
    }
  });
  let o = Zc(s ? tu(n) : n, -t).sort(Ot);
  for (let l = 0; l < o.length; l++)
    o[l].type.valid(e, o[l]) || (r.onRemove && r.onRemove(o[l].spec), o.splice(l--, 1));
  return o.length || i.length ? new P(o, i) : se;
}
function Ot(n, e) {
  return n.from - e.from || n.to - e.to;
}
function ro(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let i = t + 1; i < e.length; i++) {
        let s = e[i];
        if (s.from == r.from) {
          s.to != r.to && (e == n && (e = n.slice()), e[i] = s.copy(s.from, r.to), ml(e, i + 1, s.copy(r.to, s.to)));
          continue;
        } else {
          s.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, s.from), ml(e, i, r.copy(s.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function ml(n, e, t) {
  for (; e < n.length && Ot(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
function Di(n) {
  let e = [];
  return n.someProp("decorations", (t) => {
    let r = t(n.state);
    r && r != se && e.push(r);
  }), n.cursorWrapper && e.push(P.create(n.state.doc, [n.cursorWrapper.deco])), nt.from(e);
}
const Tp = {
  childList: !0,
  characterData: !0,
  characterDataOldValue: !0,
  attributes: !0,
  attributeOldValue: !0,
  subtree: !0
}, Ap = be && ot <= 11;
class Op {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  set(e) {
    this.anchorNode = e.anchorNode, this.anchorOffset = e.anchorOffset, this.focusNode = e.focusNode, this.focusOffset = e.focusOffset;
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return e.anchorNode == this.anchorNode && e.anchorOffset == this.anchorOffset && e.focusNode == this.focusNode && e.focusOffset == this.focusOffset;
  }
}
class Np {
  constructor(e, t) {
    this.view = e, this.handleDOMChange = t, this.queue = [], this.flushingSoon = -1, this.observer = null, this.currentSelection = new Op(), this.onCharData = null, this.suppressingSelectionUpdates = !1, this.lastChangedTextNode = null, this.observer = window.MutationObserver && new window.MutationObserver((r) => {
      for (let i = 0; i < r.length; i++)
        this.queue.push(r[i]);
      be && ot <= 11 && r.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : oe && e.composing && r.some((i) => i.type == "childList" && i.target.nodeName == "TR") ? (e.input.badSafariComposition = !0, this.flushSoon()) : this.flush();
    }), Ap && (this.onCharData = (r) => {
      this.queue.push({ target: r.target, type: "characterData", oldValue: r.prevValue }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this);
  }
  flushSoon() {
    this.flushingSoon < 0 && (this.flushingSoon = window.setTimeout(() => {
      this.flushingSoon = -1, this.flush();
    }, 20));
  }
  forceFlush() {
    this.flushingSoon > -1 && (window.clearTimeout(this.flushingSoon), this.flushingSoon = -1, this.flush());
  }
  start() {
    this.observer && (this.observer.takeRecords(), this.observer.observe(this.view.dom, Tp)), this.onCharData && this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.connectSelection();
  }
  stop() {
    if (this.observer) {
      let e = this.observer.takeRecords();
      if (e.length) {
        for (let t = 0; t < e.length; t++)
          this.queue.push(e[t]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData && this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData), this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener("selectionchange", this.onSelectionChange);
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener("selectionchange", this.onSelectionChange);
  }
  suppressSelectionUpdates() {
    this.suppressingSelectionUpdates = !0, setTimeout(() => this.suppressingSelectionUpdates = !1, 50);
  }
  onSelectionChange() {
    if (al(this.view)) {
      if (this.suppressingSelectionUpdates)
        return Ke(this.view);
      if (be && ot <= 11 && !this.view.state.selection.empty) {
        let e = this.view.domSelectionRange();
        if (e.focusNode && Lt(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset))
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(e) {
    if (!e.focusNode)
      return !0;
    let t = /* @__PURE__ */ new Set(), r;
    for (let s = e.focusNode; s; s = en(s))
      t.add(s);
    for (let s = e.anchorNode; s; s = en(s))
      if (t.has(s)) {
        r = s;
        break;
      }
    let i = r && this.view.docView.nearestDesc(r);
    if (i && i.ignoreMutation({
      type: "selection",
      target: r.nodeType == 3 ? r.parentNode : r
    }))
      return this.setCurSelection(), !0;
  }
  pendingRecords() {
    if (this.observer)
      for (let e of this.observer.takeRecords())
        this.queue.push(e);
    return this.queue;
  }
  flush() {
    let { view: e } = this;
    if (!e.docView || this.flushingSoon > -1)
      return;
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let r = e.domSelectionRange(), i = !this.suppressingSelectionUpdates && !this.currentSelection.eq(r) && al(e) && !this.ignoreSelectionChange(r), s = -1, o = -1, l = !1, a = [];
    if (e.editable)
      for (let u = 0; u < t.length; u++) {
        let d = this.registerMutation(t[u], a);
        d && (s = s < 0 ? d.from : Math.min(d.from, s), o = o < 0 ? d.to : Math.max(d.to, o), d.typeOver && (l = !0));
      }
    if (a.some((u) => u.nodeName == "BR") && (e.input.lastKeyCode == 8 || e.input.lastKeyCode == 46 || re && (e.composing || e.input.compositionEndedAt > Date.now() - 50) && t.some((u) => u.type == "childList" && u.removedNodes.length))) {
      for (let u of a)
        if (u.nodeName == "BR" && u.parentNode) {
          let d = u.nextSibling;
          for (; d && d.nodeType == 1; ) {
            if (d.contentEditable == "false") {
              u.parentNode.removeChild(u);
              break;
            }
            d = d.firstChild;
          }
        }
    } else if (Me && a.length) {
      let u = a.filter((d) => d.nodeName == "BR");
      if (u.length == 2) {
        let [d, f] = u;
        d.parentNode && d.parentNode.parentNode == f.parentNode ? f.remove() : d.remove();
      } else {
        let { focusNode: d } = this.currentSelection;
        for (let f of u) {
          let h = f.parentNode;
          h && h.nodeName == "LI" && (!d || Rp(e, d) != h) && f.remove();
        }
      }
    }
    let c = null;
    s < 0 && i && e.input.lastFocus > Date.now() - 200 && Math.max(e.input.lastTouch, e.input.lastClick.time) < Date.now() - 300 && ci(r) && (c = Qs(e)) && c.eq(D.near(e.state.doc.resolve(0), 1)) ? (e.input.lastFocus = 0, Ke(e), this.currentSelection.set(r), e.scrollToSelection()) : (s > -1 || i) && (s > -1 && (e.docView.markDirty(s, o), Ip(e)), e.input.badSafariComposition && (e.input.badSafariComposition = !1, Lp(e, a)), this.handleDOMChange(s, o, l, a), e.docView && e.docView.dirty ? e.updateState(e.state) : this.currentSelection.eq(r) || Ke(e), this.currentSelection.set(r));
  }
  registerMutation(e, t) {
    if (t.indexOf(e.target) > -1)
      return null;
    let r = this.view.docView.nearestDesc(e.target);
    if (e.type == "attributes" && (r == this.view.docView || e.attributeName == "contenteditable" || // Firefox sometimes fires spurious events for null/empty styles
    e.attributeName == "style" && !e.oldValue && !e.target.getAttribute("style")) || !r || r.ignoreMutation(e))
      return null;
    if (e.type == "childList") {
      for (let u = 0; u < e.addedNodes.length; u++) {
        let d = e.addedNodes[u];
        t.push(d), d.nodeType == 3 && (this.lastChangedTextNode = d);
      }
      if (r.contentDOM && r.contentDOM != r.dom && !r.contentDOM.contains(e.target))
        return { from: r.posBefore, to: r.posAfter };
      let i = e.previousSibling, s = e.nextSibling;
      if (be && ot <= 11 && e.addedNodes.length)
        for (let u = 0; u < e.addedNodes.length; u++) {
          let { previousSibling: d, nextSibling: f } = e.addedNodes[u];
          (!d || Array.prototype.indexOf.call(e.addedNodes, d) < 0) && (i = d), (!f || Array.prototype.indexOf.call(e.addedNodes, f) < 0) && (s = f);
        }
      let o = i && i.parentNode == e.target ? te(i) + 1 : 0, l = r.localPosFromDOM(e.target, o, -1), a = s && s.parentNode == e.target ? te(s) : e.target.childNodes.length, c = r.localPosFromDOM(e.target, a, 1);
      return { from: l, to: c };
    } else return e.type == "attributes" ? { from: r.posAtStart - r.border, to: r.posAtEnd + r.border } : (this.lastChangedTextNode = e.target, {
      from: r.posAtStart,
      to: r.posAtEnd,
      // An event was generated for a text change that didn't change
      // any text. Mark the dom change to fall back to assuming the
      // selection was typed over with an identical value if it can't
      // find another change.
      typeOver: e.target.nodeValue == e.oldValue
    });
  }
}
let gl = /* @__PURE__ */ new WeakMap(), yl = !1;
function Ip(n) {
  if (!gl.has(n) && (gl.set(n, null), ["normal", "nowrap", "pre-line"].indexOf(getComputedStyle(n.dom).whiteSpace) !== -1)) {
    if (n.requiresGeckoHackNode = Me, yl)
      return;
    console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."), yl = !0;
  }
}
function bl(n, e) {
  let t = e.startContainer, r = e.startOffset, i = e.endContainer, s = e.endOffset, o = n.domAtPos(n.state.selection.anchor);
  return Lt(o.node, o.offset, i, s) && ([t, r, i, s] = [i, s, t, r]), { anchorNode: t, anchorOffset: r, focusNode: i, focusOffset: s };
}
function Dp(n, e) {
  if (e.getComposedRanges) {
    let i = e.getComposedRanges(n.root)[0];
    if (i)
      return bl(n, i);
  }
  let t;
  function r(i) {
    i.preventDefault(), i.stopImmediatePropagation(), t = i.getTargetRanges()[0];
  }
  return n.dom.addEventListener("beforeinput", r, !0), document.execCommand("indent"), n.dom.removeEventListener("beforeinput", r, !0), t ? bl(n, t) : null;
}
function Rp(n, e) {
  for (let t = e.parentNode; t && t != n.dom; t = t.parentNode) {
    let r = n.docView.nearestDesc(t, !0);
    if (r && r.node.isBlock)
      return t;
  }
  return null;
}
function Lp(n, e) {
  var t;
  let { focusNode: r, focusOffset: i } = n.domSelectionRange();
  for (let s of e)
    if (((t = s.parentNode) === null || t === void 0 ? void 0 : t.nodeName) == "TR") {
      let o = s.nextSibling;
      for (; o && o.nodeName != "TD" && o.nodeName != "TH"; )
        o = o.nextSibling;
      if (o) {
        let l = o;
        for (; ; ) {
          let a = l.firstChild;
          if (!a || a.nodeType != 1 || a.contentEditable == "false" || /^(BR|IMG)$/.test(a.nodeName))
            break;
          l = a;
        }
        l.insertBefore(s, l.firstChild), r == s && n.domSelection().collapse(s, i);
      } else
        s.parentNode.removeChild(s);
    }
}
function Pp(n, e, t, r) {
  let { node: i, fromOffset: s, toOffset: o, from: l, to: a } = n.docView.parseRange(e, t), c = n.domSelectionRange(), u, d = c.anchorNode;
  if (d && n.dom.contains(d.nodeType == 1 ? d : d.parentNode) && (u = [{ node: d, offset: c.anchorOffset }], ci(c) || u.push({ node: c.focusNode, offset: c.focusOffset })), re && n.input.lastKeyCode === 8)
    for (let y = o; y > s; y--) {
      let b = i.childNodes[y - 1], S = b.pmViewDesc;
      if (b.nodeName == "BR" && !S) {
        o = y;
        break;
      }
      if (!S || S.size)
        break;
    }
  let f = n.state.doc, h = n.someProp("domParser") || st.fromSchema(n.state.schema), p = f.resolve(l), m = null, g = h.parse(i, {
    topNode: p.parent,
    topMatch: p.parent.contentMatchAt(p.index()),
    topOpen: !0,
    from: s,
    to: o,
    preserveWhitespace: p.parent.type.whitespace == "pre" ? "full" : !0,
    findPositions: u,
    ruleFromNode: Bp(r),
    context: p
  });
  if (u && u[0].pos != null) {
    let y = u[0].pos, b = u[1] && u[1].pos;
    b == null && (b = y), m = { anchor: y + l, head: b + l };
  }
  return { doc: g, sel: m, from: l, to: a };
}
const Bp = (n) => (e) => {
  let t = e.pmViewDesc;
  if (t)
    return t.parseRule(n);
  if (e.nodeName == "BR" && e.parentNode) {
    if (oe && /^(ul|ol)$/i.test(e.parentNode.nodeName)) {
      let r = document.createElement("div");
      return r.appendChild(document.createElement("li")), { skip: r };
    } else if (e.parentNode.lastChild == e || oe && /^(tr|table)$/i.test(e.parentNode.nodeName))
      return { ignore: !0 };
  } else if (e.nodeName == "IMG" && e.getAttribute("mark-placeholder"))
    return { ignore: !0 };
  return null;
}, $p = /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|img|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function zp(n, e, t, r, i) {
  let s = n.input.compositionPendingChanges || (n.composing ? n.input.compositionID : 0);
  if (n.input.compositionPendingChanges = 0, e < 0) {
    let T = n.input.lastSelectionTime > Date.now() - 50 ? n.input.lastSelectionOrigin : null, M = Qs(n, T);
    if (M && !n.state.selection.eq(M)) {
      if (re && We && n.input.lastKeyCode === 13 && Date.now() - 100 < n.input.lastKeyCodeTime && n.someProp("handleKeyDown", (pe) => pe(n, bt(13, "Enter"))))
        return;
      let L = n.state.tr.setSelection(M);
      T == "pointer" ? L.setMeta("pointer", !0) : T == "key" && L.scrollIntoView(), s && L.setMeta("composition", s), n.dispatch(L);
    }
    return;
  }
  let o = n.state.doc.resolve(e), l = o.sharedDepth(t);
  e = o.before(l + 1), t = n.state.doc.resolve(t).after(l + 1);
  let a = n.state.selection, c = Pp(n, e, t, i), u = n.state.doc, d = u.slice(c.from, c.to), f, h;
  n.input.lastKeyCode === 8 && Date.now() - 100 < n.input.lastKeyCodeTime ? (f = n.state.selection.to, h = "end") : (f = n.state.selection.from, h = "start"), n.input.lastKeyCode = null;
  let p = Hp(d.content, c.doc.content, c.from, f, h);
  if (p && n.input.domChangeCount++, (tn && n.input.lastIOSEnter > Date.now() - 225 || We) && i.some((T) => T.nodeType == 1 && !$p.test(T.nodeName)) && (!p || p.endA >= p.endB) && n.someProp("handleKeyDown", (T) => T(n, bt(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (!p)
    if (r && a instanceof I && !a.empty && a.$head.sameParent(a.$anchor) && !n.composing && !(c.sel && c.sel.anchor != c.sel.head))
      p = { start: a.from, endA: a.to, endB: a.to };
    else {
      if (c.sel) {
        let T = kl(n, n.state.doc, c.sel);
        if (T && !T.eq(n.state.selection)) {
          let M = n.state.tr.setSelection(T);
          s && M.setMeta("composition", s), n.dispatch(M);
        }
      }
      return;
    }
  n.state.selection.from < n.state.selection.to && p.start == p.endB && n.state.selection instanceof I && (p.start > n.state.selection.from && p.start <= n.state.selection.from + 2 && n.state.selection.from >= c.from ? p.start = n.state.selection.from : p.endA < n.state.selection.to && p.endA >= n.state.selection.to - 2 && n.state.selection.to <= c.to && (p.endB += n.state.selection.to - p.endA, p.endA = n.state.selection.to)), be && ot <= 11 && p.endB == p.start + 1 && p.endA == p.start && p.start > c.from && c.doc.textBetween(p.start - c.from - 1, p.start - c.from + 1) == "  " && (p.start--, p.endA--, p.endB--);
  let m = c.doc.resolveNoCache(p.start - c.from), g = c.doc.resolveNoCache(p.endB - c.from), y = u.resolve(p.start), b = m.sameParent(g) && m.parent.inlineContent && y.end() >= p.endA;
  if ((tn && n.input.lastIOSEnter > Date.now() - 225 && (!b || i.some((T) => T.nodeName == "DIV" || T.nodeName == "P")) || !b && m.pos < c.doc.content.size && (!m.sameParent(g) || !m.parent.inlineContent) && m.pos < g.pos && !/\S/.test(c.doc.textBetween(m.pos, g.pos, "", ""))) && n.someProp("handleKeyDown", (T) => T(n, bt(13, "Enter")))) {
    n.input.lastIOSEnter = 0;
    return;
  }
  if (n.state.selection.anchor > p.start && Fp(u, p.start, p.endA, m, g) && n.someProp("handleKeyDown", (T) => T(n, bt(8, "Backspace")))) {
    We && re && n.domObserver.suppressSelectionUpdates();
    return;
  }
  re && p.endB == p.start && (n.input.lastChromeDelete = Date.now()), We && !b && m.start() != g.start() && g.parentOffset == 0 && m.depth == g.depth && c.sel && c.sel.anchor == c.sel.head && c.sel.head == p.endA && (p.endB -= 2, g = c.doc.resolveNoCache(p.endB - c.from), setTimeout(() => {
    n.someProp("handleKeyDown", function(T) {
      return T(n, bt(13, "Enter"));
    });
  }, 20));
  let S = p.start, w = p.endA, E = (T) => {
    let M = T || n.state.tr.replace(S, w, c.doc.slice(p.start - c.from, p.endB - c.from));
    if (c.sel) {
      let L = kl(n, M.doc, c.sel);
      L && !(re && n.composing && L.empty && (p.start != p.endB || n.input.lastChromeDelete < Date.now() - 100) && (L.head == S || L.head == M.mapping.map(w) - 1) || be && L.empty && L.head == S) && M.setSelection(L);
    }
    return s && M.setMeta("composition", s), M.scrollIntoView();
  }, A;
  if (b)
    if (m.pos == g.pos) {
      be && ot <= 11 && m.parentOffset == 0 && (n.domObserver.suppressSelectionUpdates(), setTimeout(() => Ke(n), 20));
      let T = E(n.state.tr.delete(S, w)), M = u.resolve(p.start).marksAcross(u.resolve(p.endA));
      M && T.ensureMarks(M), n.dispatch(T);
    } else if (
      // Adding or removing a mark
      p.endA == p.endB && (A = _p(m.parent.content.cut(m.parentOffset, g.parentOffset), y.parent.content.cut(y.parentOffset, p.endA - y.start())))
    ) {
      let T = E(n.state.tr);
      A.type == "add" ? T.addMark(S, w, A.mark) : T.removeMark(S, w, A.mark), n.dispatch(T);
    } else if (m.parent.child(m.index()).isText && m.index() == g.index() - (g.textOffset ? 0 : 1)) {
      let T = m.parent.textBetween(m.parentOffset, g.parentOffset), M = () => E(n.state.tr.insertText(T, S, w));
      n.someProp("handleTextInput", (L) => L(n, S, w, T, M)) || n.dispatch(M());
    } else
      n.dispatch(E());
  else
    n.dispatch(E());
}
function kl(n, e, t) {
  return Math.max(t.anchor, t.head) > e.content.size ? null : Ys(n, e.resolve(t.anchor), e.resolve(t.head));
}
function _p(n, e) {
  let t = n.firstChild.marks, r = e.firstChild.marks, i = t, s = r, o, l, a;
  for (let u = 0; u < r.length; u++)
    i = r[u].removeFromSet(i);
  for (let u = 0; u < t.length; u++)
    s = t[u].removeFromSet(s);
  if (i.length == 1 && s.length == 0)
    l = i[0], o = "add", a = (u) => u.mark(l.addToSet(u.marks));
  else if (i.length == 0 && s.length == 1)
    l = s[0], o = "remove", a = (u) => u.mark(l.removeFromSet(u.marks));
  else
    return null;
  let c = [];
  for (let u = 0; u < e.childCount; u++)
    c.push(a(e.child(u)));
  if (x.from(c).eq(n))
    return { mark: l, type: o };
}
function Fp(n, e, t, r, i) {
  if (
    // The content must have shrunk
    t - e <= i.pos - r.pos || // newEnd must point directly at or after the end of the block that newStart points into
    Ri(r, !0, !1) < i.pos
  )
    return !1;
  let s = n.resolve(e);
  if (!r.parent.isTextblock) {
    let l = s.nodeAfter;
    return l != null && t == e + l.nodeSize;
  }
  if (s.parentOffset < s.parent.content.size || !s.parent.isTextblock)
    return !1;
  let o = n.resolve(Ri(s, !0, !0));
  return !o.parent.isTextblock || o.pos > t || Ri(o, !0, !1) < t ? !1 : r.parent.content.cut(r.parentOffset).eq(o.parent.content);
}
function Ri(n, e, t) {
  let r = n.depth, i = e ? n.end() : n.pos;
  for (; r > 0 && (e || n.indexAfter(r) == n.node(r).childCount); )
    r--, i++, e = !1;
  if (t) {
    let s = n.node(r).maybeChild(n.indexAfter(r));
    for (; s && !s.isLeaf; )
      s = s.firstChild, i++;
  }
  return i;
}
function Hp(n, e, t, r, i) {
  let s = n.findDiffStart(e, t), o = t + n.size, l = t + e.size;
  if (s == null)
    return null;
  let { a, b: c } = n.findDiffEnd(e, o, l);
  if (i == "end") {
    let u = Math.max(0, s - Math.min(a, c));
    r -= a + u - s;
  }
  if (a < s && o < l) {
    let u = r <= s && r >= a ? s - r : 0;
    s -= u, c = s + (c - a), a = s;
  } else if (c < s) {
    let u = r <= s && r >= c ? s - r : 0;
    s -= u, a = s + (a - c), c = s;
  }
  return { start: s, endA: a, endB: c };
}
class nu {
  /**
  Create a view. `place` may be a DOM node that the editor should
  be appended to, a function that will place it into the document,
  or an object whose `mount` property holds the node to use as the
  document container. If it is `null`, the editor will not be
  added to the document.
  */
  constructor(e, t) {
    this._root = null, this.focused = !1, this.trackWrites = null, this.mounted = !1, this.markCursor = null, this.cursorWrapper = null, this.lastSelectedViewDesc = void 0, this.input = new rp(), this.prevDirectPlugins = [], this.pluginViews = [], this.requiresGeckoHackNode = !1, this.dragging = null, this._props = t, this.state = t.state, this.directPlugins = t.plugins || [], this.directPlugins.forEach(El), this.dispatch = this.dispatch.bind(this), this.dom = e && e.mount || document.createElement("div"), e && (e.appendChild ? e.appendChild(this.dom) : typeof e == "function" ? e(this.dom) : e.mount && (this.mounted = !0)), this.editable = xl(this), wl(this), this.nodeViews = Cl(this), this.docView = nl(this.state.doc, Sl(this), Di(this), this.dom, this), this.domObserver = new Np(this, (r, i, s, o) => zp(this, r, i, s, o)), this.domObserver.start(), ip(this), this.updatePluginViews();
  }
  /**
  Holds `true` when a
  [composition](https://w3c.github.io/uievents/#events-compositionevents)
  is active.
  */
  get composing() {
    return this.input.composing;
  }
  /**
  The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).
  */
  get props() {
    if (this._props.state != this.state) {
      let e = this._props;
      this._props = {};
      for (let t in e)
        this._props[t] = e[t];
      this._props.state = this.state;
    }
    return this._props;
  }
  /**
  Update the view's props. Will immediately cause an update to
  the DOM.
  */
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && xs(this);
    let t = this._props;
    this._props = e, e.plugins && (e.plugins.forEach(El), this.directPlugins = e.plugins), this.updateStateInner(e.state, t);
  }
  /**
  Update the view by updating existing props object with the object
  given as argument. Equivalent to `view.update(Object.assign({},
  view.props, props))`.
  */
  setProps(e) {
    let t = {};
    for (let r in this._props)
      t[r] = this._props[r];
    t.state = this.state;
    for (let r in e)
      t[r] = e[r];
    this.update(t);
  }
  /**
  Update the editor's `state` prop, without touching any of the
  other props.
  */
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(e, t) {
    var r;
    let i = this.state, s = !1, o = !1;
    e.storedMarks && this.composing && (Gc(this), o = !0), this.state = e;
    let l = i.plugins != e.plugins || this._props.plugins != t.plugins;
    if (l || this._props.plugins != t.plugins || this._props.nodeViews != t.nodeViews) {
      let h = Cl(this);
      jp(h, this.nodeViews) && (this.nodeViews = h, s = !0);
    }
    (l || t.handleDOMEvents != this._props.handleDOMEvents) && xs(this), this.editable = xl(this), wl(this);
    let a = Di(this), c = Sl(this), u = i.plugins != e.plugins && !i.doc.eq(e.doc) ? "reset" : e.scrollToSelection > i.scrollToSelection ? "to selection" : "preserve", d = s || !this.docView.matchesNode(e.doc, c, a);
    (d || !e.selection.eq(i.selection)) && (o = !0);
    let f = u == "preserve" && o && this.dom.style.overflowAnchor == null && bh(this);
    if (o) {
      this.domObserver.stop();
      let h = d && (be || re) && !this.composing && !i.selection.empty && !e.selection.empty && Vp(i.selection, e.selection);
      if (d) {
        let m = re ? this.trackWrites = this.domSelectionRange().focusNode : null;
        this.composing && (this.input.compositionNode = kp(this)), (s || !this.docView.update(e.doc, c, a, this)) && (this.docView.updateOuterDeco(c), this.docView.destroy(), this.docView = nl(e.doc, c, a, this.dom, this)), m && (!this.trackWrites || !this.dom.contains(this.trackWrites)) && (h = !0);
      }
      let p = this.input.mouseDown;
      h || !(p && this.domObserver.currentSelection.eq(this.domSelectionRange()) && Vh(this) && p.delaySelUpdate()) ? Ke(this, h) : (Pc(this, e.selection), this.domObserver.setCurSelection()), this.domObserver.start();
    }
    this.updatePluginViews(i), !((r = this.dragging) === null || r === void 0) && r.node && !i.doc.eq(e.doc) && this.updateDraggedNode(this.dragging, i), u == "reset" ? this.dom.scrollTop = 0 : u == "to selection" ? this.scrollToSelection() : f && kh(f);
  }
  /**
  @internal
  */
  scrollToSelection() {
    let e = this.domSelectionRange().focusNode;
    if (!(!e || !this.dom.contains(e.nodeType == 1 ? e : e.parentNode))) {
      if (!this.someProp("handleScrollToSelection", (t) => t(this))) if (this.state.selection instanceof N) {
        let t = this.docView.domAfterPos(this.state.selection.from);
        t.nodeType == 1 && Yo(this, t.getBoundingClientRect(), e);
      } else
        Yo(this, this.coordsAtPos(this.state.selection.head, 1), e);
    }
  }
  destroyPluginViews() {
    let e;
    for (; e = this.pluginViews.pop(); )
      e.destroy && e.destroy();
  }
  updatePluginViews(e) {
    if (!e || e.plugins != this.state.plugins || this.directPlugins != this.prevDirectPlugins) {
      this.prevDirectPlugins = this.directPlugins, this.destroyPluginViews();
      for (let t = 0; t < this.directPlugins.length; t++) {
        let r = this.directPlugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let t = 0; t < this.state.plugins.length; t++) {
        let r = this.state.plugins[t];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
    } else
      for (let t = 0; t < this.pluginViews.length; t++) {
        let r = this.pluginViews[t];
        r.update && r.update(this, e);
      }
  }
  updateDraggedNode(e, t) {
    let r = e.node, i = -1;
    if (r.from < this.state.doc.content.size && this.state.doc.nodeAt(r.from) == r.node)
      i = r.from;
    else {
      let s = r.from + (this.state.doc.content.size - t.doc.content.size);
      (s > 0 && s < this.state.doc.content.size && this.state.doc.nodeAt(s)) == r.node && (i = s);
    }
    this.dragging = new Yc(e.slice, e.move, i < 0 ? void 0 : N.create(this.state.doc, i));
  }
  someProp(e, t) {
    let r = this._props && this._props[e], i;
    if (r != null && (i = t ? t(r) : r))
      return i;
    for (let o = 0; o < this.directPlugins.length; o++) {
      let l = this.directPlugins[o].props[e];
      if (l != null && (i = t ? t(l) : l))
        return i;
    }
    let s = this.state.plugins;
    if (s)
      for (let o = 0; o < s.length; o++) {
        let l = s[o].props[e];
        if (l != null && (i = t ? t(l) : l))
          return i;
      }
  }
  /**
  Query whether the view has focus.
  */
  hasFocus() {
    if (be) {
      let e = this.root.activeElement;
      if (e == this.dom)
        return !0;
      if (!e || !this.dom.contains(e))
        return !1;
      for (; e && this.dom != e && this.dom.contains(e); ) {
        if (e.contentEditable == "false")
          return !1;
        e = e.parentElement;
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  /**
  Focus the editor.
  */
  focus() {
    this.domObserver.stop(), this.editable && Sh(this.dom), Ke(this), this.domObserver.start();
  }
  /**
  Get the document root in which the editor exists. This will
  usually be the top-level `document`, but might be a [shadow
  DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
  root if the editor is inside one.
  */
  get root() {
    let e = this._root;
    if (e == null) {
      for (let t = this.dom.parentNode; t; t = t.parentNode)
        if (t.nodeType == 9 || t.nodeType == 11 && t.host)
          return t.getSelection || (Object.getPrototypeOf(t).getSelection = () => t.ownerDocument.getSelection()), this._root = t;
    }
    return e || document;
  }
  /**
  When an existing editor view is moved to a new document or
  shadow tree, call this to make it recompute its root.
  */
  updateRoot() {
    this._root = null;
  }
  /**
  Given a pair of viewport coordinates, return the document
  position that corresponds to them. May return null if the given
  coordinates aren't inside of the editor. When an object is
  returned, its `pos` property is the position nearest to the
  coordinates, and its `inside` property holds the position of the
  inner node that the position falls inside of, or -1 if it is at
  the top level, not in any node.
  */
  posAtCoords(e) {
    return vh(this, e);
  }
  /**
  Returns the viewport rectangle at a given document position.
  `left` and `right` will be the same number, as this returns a
  flat cursor-ish rectangle. If the position is between two things
  that aren't directly adjacent, `side` determines which element
  is used. When < 0, the element before the position is used,
  otherwise the element after.
  */
  coordsAtPos(e, t = 1) {
    return Tc(this, e, t);
  }
  /**
  Find the DOM position that corresponds to the given document
  position. When `side` is negative, find the position as close as
  possible to the content before the position. When positive,
  prefer positions close to the content after the position. When
  zero, prefer as shallow a position as possible.
  
  Note that you should **not** mutate the editor's internal DOM,
  only inspect it (and even that is usually not necessary).
  */
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  /**
  Find the DOM node that represents the document node after the
  given position. May return `null` when the position doesn't point
  in front of a node or if the node is inside an opaque node view.
  
  This is intended to be able to call things like
  `getBoundingClientRect` on that DOM node. Do **not** mutate the
  editor DOM directly, or add styling this way, since that will be
  immediately overriden by the editor as it redraws the node.
  */
  nodeDOM(e) {
    let t = this.docView.descAt(e);
    return t ? t.nodeDOM : null;
  }
  /**
  Find the document position that corresponds to a given DOM
  position. (Whenever possible, it is preferable to inspect the
  document structure directly, rather than poking around in the
  DOM, but sometimes—for example when interpreting an event
  target—you don't have a choice.)
  
  The `bias` parameter can be used to influence which side of a DOM
  node to use when the position is inside a leaf node.
  */
  posAtDOM(e, t, r = -1) {
    let i = this.docView.posFromDOM(e, t, r);
    if (i == null)
      throw new RangeError("DOM position not inside the editor");
    return i;
  }
  /**
  Find out whether the selection is at the end of a textblock when
  moving in a given direction. When, for example, given `"left"`,
  it will return true if moving left from the current cursor
  position would leave that position's parent textblock. Will apply
  to the view's current state by default, but it is possible to
  pass a different state.
  */
  endOfTextblock(e, t) {
    return Nh(this, t || this.state, e);
  }
  /**
  Run the editor's paste logic with the given HTML string. The
  `event`, if given, will be passed to the
  [`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.
  */
  pasteHTML(e, t) {
    return Bn(this, "", e, !1, t || new ClipboardEvent("paste"));
  }
  /**
  Run the editor's paste logic with the given plain-text input.
  */
  pasteText(e, t) {
    return Bn(this, e, null, !0, t || new ClipboardEvent("paste"));
  }
  /**
  Serialize the given slice as it would be if it was copied from
  this editor. Returns a DOM element that contains a
  representation of the slice as its children, a textual
  representation, and the transformed slice (which can be
  different from the given input due to hooks like
  [`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).
  */
  serializeForClipboard(e) {
    return Xs(this, e);
  }
  /**
  Removes the editor from the DOM and destroys all [node
  views](https://prosemirror.net/docs/ref/#view.NodeView).
  */
  destroy() {
    this.docView && (sp(this), this.destroyPluginViews(), this.mounted ? (this.docView.update(this.state.doc, [], Di(this), this), this.dom.textContent = "") : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom), this.docView.destroy(), this.docView = null, ah());
  }
  /**
  This is true when the view has been
  [destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
  used anymore).
  */
  get isDestroyed() {
    return this.docView == null;
  }
  /**
  Used for testing.
  */
  dispatchEvent(e) {
    return lp(this, e);
  }
  /**
  @internal
  */
  domSelectionRange() {
    let e = this.domSelection();
    return e ? oe && this.root.nodeType === 11 && hh(this.dom.ownerDocument) == this.dom && Dp(this, e) || e : { focusNode: null, focusOffset: 0, anchorNode: null, anchorOffset: 0 };
  }
  /**
  @internal
  */
  domSelection() {
    return this.root.getSelection();
  }
}
nu.prototype.dispatch = function(n) {
  let e = this._props.dispatchTransaction;
  e ? e.call(this, n) : this.updateState(this.state.apply(n));
};
function Sl(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return e.class = "ProseMirror", e.contenteditable = String(n.editable), n.someProp("attributes", (t) => {
    if (typeof t == "function" && (t = t(n.state)), t)
      for (let r in t)
        r == "class" ? e.class += " " + t[r] : r == "style" ? e.style = (e.style ? e.style + ";" : "") + t[r] : !e[r] && r != "contenteditable" && r != "nodeName" && (e[r] = String(t[r]));
  }), e.translate || (e.translate = "no"), [ue.node(0, n.state.doc.content.size, e)];
}
function wl(n) {
  if (n.markCursor) {
    let e = document.createElement("img");
    e.className = "ProseMirror-separator", e.setAttribute("mark-placeholder", "true"), e.setAttribute("alt", ""), n.cursorWrapper = { dom: e, deco: ue.widget(n.state.selection.from, e, { raw: !0, marks: n.markCursor }) };
  } else
    n.cursorWrapper = null;
}
function xl(n) {
  return !n.someProp("editable", (e) => e(n.state) === !1);
}
function Vp(n, e) {
  let t = Math.min(n.$anchor.sharedDepth(n.head), e.$anchor.sharedDepth(e.head));
  return n.$anchor.start(t) != e.$anchor.start(t);
}
function Cl(n) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(r) {
    for (let i in r)
      Object.prototype.hasOwnProperty.call(e, i) || (e[i] = r[i]);
  }
  return n.someProp("nodeViews", t), n.someProp("markViews", t), e;
}
function jp(n, e) {
  let t = 0, r = 0;
  for (let i in n) {
    if (n[i] != e[i])
      return !0;
    t++;
  }
  for (let i in e)
    r++;
  return t != r;
}
function El(n) {
  if (n.spec.state || n.spec.filterTransaction || n.spec.appendTransaction)
    throw new RangeError("Plugins passed directly to the view must not have a state component");
}
var ut = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, vr = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, Wp = typeof navigator < "u" && /Mac/.test(navigator.platform), Up = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var ne = 0; ne < 10; ne++) ut[48 + ne] = ut[96 + ne] = String(ne);
for (var ne = 1; ne <= 24; ne++) ut[ne + 111] = "F" + ne;
for (var ne = 65; ne <= 90; ne++)
  ut[ne] = String.fromCharCode(ne + 32), vr[ne] = String.fromCharCode(ne);
for (var Li in ut) vr.hasOwnProperty(Li) || (vr[Li] = ut[Li]);
function qp(n) {
  var e = Wp && n.metaKey && n.shiftKey && !n.ctrlKey && !n.altKey || Up && n.shiftKey && n.key && n.key.length == 1 || n.key == "Unidentified", t = !e && n.key || (n.shiftKey ? vr : ut)[n.keyCode] || n.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
const Kp = typeof navigator < "u" && /Mac|iP(hone|[oa]d)/.test(navigator.platform), Jp = typeof navigator < "u" && /Win/.test(navigator.platform);
function Gp(n) {
  let e = n.split(/-(?!$)/), t = e[e.length - 1];
  t == "Space" && (t = " ");
  let r, i, s, o;
  for (let l = 0; l < e.length - 1; l++) {
    let a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      o = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      s = !0;
    else if (/^mod$/i.test(a))
      Kp ? o = !0 : i = !0;
    else
      throw new Error("Unrecognized modifier name: " + a);
  }
  return r && (t = "Alt-" + t), i && (t = "Ctrl-" + t), o && (t = "Meta-" + t), s && (t = "Shift-" + t), t;
}
function Qp(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n)
    e[Gp(t)] = n[t];
  return e;
}
function Pi(n, e, t = !0) {
  return e.altKey && (n = "Alt-" + n), e.ctrlKey && (n = "Ctrl-" + n), e.metaKey && (n = "Meta-" + n), t && e.shiftKey && (n = "Shift-" + n), n;
}
function Yp(n) {
  return new z({ props: { handleKeyDown: ru(n) } });
}
function ru(n) {
  let e = Qp(n);
  return function(t, r) {
    let i = qp(r), s, o = e[Pi(i, r)];
    if (o && o(t.state, t.dispatch, t))
      return !0;
    if (i.length == 1 && i != " ") {
      if (r.shiftKey) {
        let l = e[Pi(i, r, !1)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
      if ((r.altKey || r.metaKey || r.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
      !(Jp && r.ctrlKey && r.altKey) && (s = ut[r.keyCode]) && s != i) {
        let l = e[Pi(s, r)];
        if (l && l(t.state, t.dispatch, t))
          return !0;
      }
    }
    return !1;
  };
}
function di(n) {
  const { state: e, transaction: t } = n;
  let { selection: r } = t, { doc: i } = t, { storedMarks: s } = t;
  return {
    ...e,
    apply: e.apply.bind(e),
    applyTransaction: e.applyTransaction.bind(e),
    plugins: e.plugins,
    schema: e.schema,
    reconfigure: e.reconfigure.bind(e),
    toJSON: e.toJSON.bind(e),
    get storedMarks() {
      return s;
    },
    get selection() {
      return r;
    },
    get doc() {
      return i;
    },
    get tr() {
      return r = t.selection, i = t.doc, s = t.storedMarks, t;
    }
  };
}
var Yt = class iu {
  constructor(e) {
    this.editor = e.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = e.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: e, editor: t, state: r } = this, { view: i } = t, { tr: s } = r, o = this.buildProps(s);
    return Object.fromEntries(Object.entries(e).map(([l, a]) => [l, (...u) => {
      const d = a(...u)(o);
      return !s.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(s), d;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: r, editor: i, state: s } = this, { view: o } = i, l = [], a = !!e, c = e || s.tr, u = () => (!a && t && !c.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(c), l.every((f) => f === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([f, h]) => [f, (...m) => {
        const g = this.buildProps(c, t), y = h(...m)(g);
        return l.push(y), d;
      }])),
      run: u
    };
    return d;
  }
  /**
  * Creates a chain that safely returns `false` when run.
  * @returns A non-dispatching command chain.
  * @example
  * const chain = CommandManager.createFakeChain()
  * chain.focus().run() // false
  */
  static createFakeChain() {
    const e = new Proxy({}, { get: (t, r) => {
      if (r !== "then")
        return r === "run" ? () => !1 : () => e;
    } });
    return e;
  }
  createCan(e) {
    const { rawCommands: t, state: r } = this, i = !1, s = e || r.tr, o = this.buildProps(s, i);
    return {
      ...Object.fromEntries(Object.entries(t).map(([l, a]) => [l, (...c) => a(...c)({
        ...o,
        dispatch: void 0
      })])),
      chain: () => this.createChain(s, i)
    };
  }
  /**
  * Creates capability checks that safely return `false`.
  * @returns A non-dispatching capability checker.
  * @example
  * const can = CommandManager.createFallbackCan()
  * can.focus() // false
  */
  static createFallbackCan() {
    const e = iu.createFakeChain();
    return new Proxy({ chain: () => e }, { get: (t, r) => {
      if (r !== "then")
        return r === "chain" ? t.chain : () => !1;
    } });
  }
  buildProps(e, t = !0) {
    const { rawCommands: r, editor: i, state: s } = this, { view: o } = i, l = {
      tr: e,
      editor: i,
      view: o,
      state: di({
        state: s,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([a, c]) => [a, (...u) => c(...u)(l)]));
      }
    };
    return l;
  }
};
const Xp = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), Zp = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), em = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: s, $to: o }) => {
    n.doc.nodesBetween(s.pos, o.pos, (l, a) => {
      if (l.type.isText) return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(a)), f = c.resolve(u.map(a + l.nodeSize)), h = d.blockRange(f);
      if (!h) return;
      const p = on(h);
      if (l.type.isTextblock) {
        const { defaultType: m } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, m);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, tm = (n) => (e) => n(e), nm = () => ({ state: n, dispatch: e }) => gc(n, e), rm = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, s = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const o = r.mapping.map(e);
  return r.insert(o, s.content), r.setSelection(new I(r.doc.resolve(Math.max(o - 1, 0)))), !0;
}, im = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0) return !1;
  const i = n.selection.$anchor;
  for (let s = i.depth; s > 0; s -= 1) if (i.node(s).type === r.type) {
    if (e) {
      const o = i.before(s), l = i.after(s);
      n.delete(o, l).scrollIntoView();
    }
    return !0;
  }
  return !1;
};
function Y(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const sm = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Y(n, t.schema), s = e.selection.$anchor;
  for (let o = s.depth; o > 0; o -= 1) if (s.node(o).type === i) {
    if (r) {
      const l = s.before(o), a = s.after(o);
      e.delete(l, a).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, om = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, lm = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, vl = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return lm(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, am = (n, e, t) => ({
  from: vl(n, t, "left"),
  to: vl(e, t, "right")
}), cm = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((s) => {
      const o = t.mapping.slice(i), l = t.doc.resolve(o.map(s.$from.pos)), a = t.doc.resolve(o.map(s.$to.pos)), { from: c, to: u } = am(l, a, n.schema);
      t.deleteRange(c, u);
    }), t.selection.empty || t.setSelection(I.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, um = () => ({ commands: n }) => n.keyboardShortcut("Enter"), dm = () => ({ state: n, dispatch: e }) => Kf(n, e);
function io(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Mr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : io(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function su(n, e, t = {}) {
  return n.find((r) => r.type === e && Mr(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Ml(n, e, t = {}) {
  return !!su(n, e, t);
}
function so(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((a) => a.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((a) => a.type === e)) return;
  if (!t) {
    const a = r.node.marks.find((c) => c.type === e);
    a && (t = a.attrs);
  }
  if (!su([...r.node.marks], e, t)) return;
  let i = r.index, s = n.start() + r.offset, o = i + 1, l = s + r.node.nodeSize;
  for (; i > 0 && Ml([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, s -= n.parent.child(i).nodeSize;
  for (; o < n.parent.childCount && Ml([...n.parent.child(o).marks], e, t); )
    l += n.parent.child(o).nodeSize, o += 1;
  return {
    from: s,
    to: l
  };
}
function Qe(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const fm = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const s = Qe(n, r.schema), { doc: o, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const d = so(a, s, e);
    if (d && d.from <= c && d.to >= u) {
      const f = I.create(o, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, hm = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function ou(n) {
  return n instanceof I;
}
function xt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Cs(n, e = null) {
  if (!e) return null;
  const t = D.atStart(n), r = D.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, s = r.to;
  return e === "all" ? I.create(n, xt(0, i, s), xt(n.content.size, i, s)) : I.create(n, xt(e, i, s), xt(e, i, s));
}
function Tl() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Tr() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function pm() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const mm = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: s }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const o = () => {
    (Tr() || Tl()) && r.dom.focus(), pm() && !Tr() && !Tl() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (s && n === null && !ou(t.state.selection))
    return o(), !0;
  const l = Cs(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return s && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), o()), !0;
}, gm = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), ym = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), lu = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && lu(r);
  }
  return n;
};
function Zn(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return lu(t);
}
function au(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function nn(n, e, t) {
  if (au(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return x.fromArray(n.map((o) => e.nodeFromJSON(o)));
    const s = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && s.check(), s;
  } catch (s) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: s });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", s), nn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let o = !1, l = "";
      const a = new Va({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        nodes: e.spec.nodes.append({ __tiptap__private__unknown__catch__all__node: {
          content: "inline*",
          group: "block",
          parseDOM: [{
            tag: "*",
            getAttrs: (c) => (o = !0, l = typeof c == "string" ? c : c.outerHTML, null)
          }]
        } })
      });
      if (t.slice ? st.fromSchema(a).parseSlice(Zn(n), t.parseOptions) : st.fromSchema(a).parse(Zn(n), t.parseOptions), t.errorOnInvalidContent && o) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const s = st.fromSchema(e);
    return t.slice ? s.parseSlice(Zn(n), t.parseOptions).content : s.parse(Zn(n), t.parseOptions);
  }
  return nn("", e, t);
}
function cu(n) {
  return !("type" in n);
}
function uu(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof G || i instanceof X)) return;
  const s = n.mapping.maps[r];
  let o = 0;
  s.forEach((l, a, c, u) => {
    o === 0 && (o = u);
  }), n.setSelection(D.near(n.doc.resolve(o), t));
}
const bm = (n, e, t) => ({ tr: r, dispatch: i, editor: s }) => {
  if (i) {
    t = {
      parseOptions: s.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    const a = (g) => {
      s.emit("contentError", {
        editor: s,
        error: g,
        disableCollaboration: () => {
          "collaboration" in s.storage && typeof s.storage.collaboration == "object" && s.storage.collaboration && (s.storage.collaboration.isDisabled = !0);
        }
      });
    }, c = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !s.options.enableContentCheck && s.options.emitContentError) try {
      nn(e, s.schema, {
        parseOptions: c,
        errorOnInvalidContent: !0
      });
    } catch (g) {
      a(g);
    }
    try {
      var o;
      l = nn(e, s.schema, {
        parseOptions: c,
        errorOnInvalidContent: (o = t.errorOnInvalidContent) !== null && o !== void 0 ? o : s.options.enableContentCheck
      });
    } catch (g) {
      return a(g), !1;
    }
    let { from: u, to: d } = typeof n == "number" ? {
      from: n,
      to: n
    } : {
      from: n.from,
      to: n.to
    }, f = !0, h = !0;
    const p = cu(l) ? l.content : [l];
    if (p.forEach((g) => {
      g.check(), f = f ? g.isText && g.marks.length === 0 : !1, h = h ? g.isBlock : !1;
    }), u === d && h) {
      const { parent: g } = r.doc.resolve(u);
      g.isTextblock && !g.type.spec.code && !g.childCount && (u -= 1, d += 1);
    }
    let m;
    if (f)
      Array.isArray(e) ? m = e.map((g) => g.text || "").join("") : au(e) ? m = p.map((g) => {
        var y;
        return (y = g.text) !== null && y !== void 0 ? y : "";
      }).join("") : typeof e == "object" && e && e.text ? m = e.text : m = e, r.insertText(m, u, d);
    else {
      m = x.from(p);
      const g = r.doc.resolve(u), y = g.node(), b = g.parentOffset === 0, S = y.isText || y.isTextblock, w = y.content.size > 0;
      b && S && w && h && (u = Math.max(0, u - 1)), r.replaceWith(u, d, p);
    }
    t.updateSelection && uu(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: m
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: m
    });
  }
  return !0;
};
function du(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const km = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: s, content: o, updateSelection: l = !0 } = n;
  let a;
  typeof i == "number" ? a = e.doc.resolve(i) : i ? a = i : a = e.selection.$from;
  const c = du(a.parent.contentMatchAt(a.index()));
  if (!c) return !1;
  const u = Object.keys(c.spec.attrs || {}), d = s ? Object.fromEntries(Object.entries(s).filter(([h]) => u.includes(h))) : {};
  let f;
  if (o) {
    const h = nn(o, r.schema);
    f = c.createAndFill(d, h);
  } else f = c.createAndFill(d);
  return f ? (t && (e.insert(a.pos, f), l && uu(e, e.steps.length - 1, -1)), !0) : !1;
}, Sm = () => ({ state: n, dispatch: e }) => Wf(n, e), wm = () => ({ state: n, dispatch: e }) => Uf(n, e), xm = () => ({ state: n, dispatch: e }) => cc(n, e), Cm = () => ({ state: n, dispatch: e }) => hc(n, e), Em = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = oi(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, vm = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = oi(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Mm = () => ({ state: n, dispatch: e }) => Vf(n, e), Tm = () => ({ state: n, dispatch: e }) => jf(n, e);
function fu() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Am(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, i, s, o;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a)) o = !0;
    else if (/^a(lt)?$/i.test(a)) r = !0;
    else if (/^(c|ctrl|control)$/i.test(a)) i = !0;
    else if (/^s(hift)?$/i.test(a)) s = !0;
    else if (/^mod$/i.test(a)) Tr() || fu() ? o = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), o && (t = `Meta-${t}`), s && (t = `Shift-${t}`), t;
}
const Om = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const s = Am(n).split(/-(?!$)/), o = s.find((c) => ![
    "Alt",
    "Ctrl",
    "Meta",
    "Shift"
  ].includes(c)), l = new KeyboardEvent("keydown", {
    key: o === "Space" ? " " : o,
    altKey: s.includes("Alt"),
    ctrlKey: s.includes("Ctrl"),
    metaKey: s.includes("Meta"),
    shiftKey: s.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, l));
  });
  return a == null || a.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && i && r.maybeStep(u);
  }), !0;
};
function Ge(n, e, t = {}) {
  const { from: r, to: i, empty: s } = n.selection, o = e ? Y(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, d) => {
    if (u.isText) return;
    const f = Math.max(r, d), h = Math.min(i, d + u.nodeSize);
    l.push({
      node: u,
      from: f,
      to: h
    });
  });
  const a = i - r, c = l.filter((u) => o ? o.name === u.node.type.name : !0).filter((u) => Mr(u.node.attrs, t, { strict: !1 }));
  return s ? !!c.length : c.reduce((u, d) => u + d.to - d.from, 0) >= a;
}
const Nm = (n, e = {}) => ({ state: t, dispatch: r }) => Ge(t, Y(n, t.schema), e) ? qf(t, r) : !1, Im = () => ({ state: n, dispatch: e }) => yc(n, e), Dm = (n) => ({ state: e, dispatch: t }) => ih(Y(n, e.schema))(e, t), Rm = () => ({ state: n, dispatch: e }) => mc(n, e);
function fi(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Al(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const Lm = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let s = null, o = null;
  const l = fi(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (s = Y(n, r.schema)), l === "mark" && (o = Qe(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, d) => {
      s && s === u.type && (a = !0, i && t.setNodeMarkup(d, void 0, Al(u.attrs, e))), o && u.marks.length && u.marks.forEach((f) => {
        o === f.type && (a = !0, i && t.addMark(d, d + u.nodeSize, o.create(Al(f.attrs, e))));
      });
    });
  }), a;
}, Pm = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Bm = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new we(n.doc);
    n.setSelection(t);
  }
  return !0;
}, $m = () => ({ state: n, dispatch: e }) => dc(n, e), zm = () => ({ state: n, dispatch: e }) => pc(n, e), _m = () => ({ state: n, dispatch: e }) => Qf(n, e), Fm = () => ({ state: n, dispatch: e }) => Zf(n, e), Hm = () => ({ state: n, dispatch: e }) => Xf(n, e);
function Es(n, e, t = {}, r = {}) {
  return nn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const Vm = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: s, dispatch: o, commands: l }) => {
  const { doc: a } = s;
  if (r.preserveWhitespace !== "full") {
    const c = Es(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (o) {
      const u = cu(c) ? c.content : [c];
      s.replaceWith(0, a.content.size, u).setMeta("preventUpdate", !t);
    }
    return !0;
  }
  return o && s.setMeta("preventUpdate", !t), l.insertContentAt({
    from: 0,
    to: a.content.size
  }, n, {
    parseOptions: r,
    errorOnInvalidContent: e ?? i.options.enableContentCheck
  });
};
function hu(n, e) {
  const t = Qe(e, n.schema), { from: r, to: i, empty: s } = n.selection, o = [];
  s ? (n.storedMarks && o.push(...n.storedMarks), o.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    o.push(...a.marks);
  });
  const l = o.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function pu(n, e) {
  const t = new ic(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function jm(n, e, t) {
  const r = [];
  return n.nodesBetween(e.from, e.to, (i, s) => {
    t(i) && r.push({
      node: i,
      pos: s
    });
  }), r;
}
function Wm(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r)) return {
      pos: t > 0 ? n.before(t) : 0,
      start: n.start(t),
      depth: t,
      node: r
    };
  }
}
function hi(n) {
  return (e) => Wm(e.$from, n);
}
function O(n, e, t) {
  return n.config[e] === void 0 && n.parent ? O(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? O(n.parent, e, t) : null
  }) : n.config[e];
}
function oo(n) {
  return n.map((e) => {
    const t = O(e, "addExtensions", {
      name: e.name,
      options: e.options,
      storage: e.storage
    });
    return t ? [e, ...oo(t())] : e;
  }).flat(10);
}
function lo(n, e) {
  const t = Bt.fromSchema(e).serializeFragment(n), r = document.implementation.createHTMLDocument().createElement("div");
  return r.appendChild(t), r.innerHTML;
}
function mu(n) {
  return typeof n == "function";
}
function B(n, e = void 0, ...t) {
  return mu(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Um(n = {}) {
  return Object.keys(n).length === 0 && n.constructor === Object;
}
function rn(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function gu(n) {
  const e = [], { nodeExtensions: t, markExtensions: r } = rn(n), i = [...t, ...r], s = {
    default: null,
    validate: void 0,
    rendered: !0,
    renderHTML: null,
    parseHTML: null,
    keepOnSplit: !0,
    isRequired: !1
  }, o = t.filter((c) => c.name !== "text").map((c) => c.name), l = r.map((c) => c.name), a = [...o, ...l];
  return n.forEach((c) => {
    const u = O(c, "addGlobalAttributes", {
      name: c.name,
      options: c.options,
      storage: c.storage,
      extensions: i
    });
    u && u().forEach((d) => {
      let f;
      Array.isArray(d.types) ? f = d.types : d.types === "*" ? f = a : d.types === "nodes" ? f = o : d.types === "marks" ? f = l : f = [], f.forEach((h) => {
        Object.entries(d.attributes).forEach(([p, m]) => {
          e.push({
            type: h,
            name: p,
            attribute: {
              ...s,
              ...m
            }
          });
        });
      });
    });
  }), i.forEach((c) => {
    const u = O(c, "addAttributes", {
      name: c.name,
      options: c.options,
      storage: c.storage
    });
    if (!u) return;
    const d = u();
    Object.entries(d).forEach(([f, h]) => {
      const p = {
        ...s,
        ...h
      };
      typeof (p == null ? void 0 : p.default) == "function" && (p.default = p.default()), p != null && p.isRequired && (p == null ? void 0 : p.default) === void 0 && delete p.default, e.push({
        type: c.name,
        name: f,
        attribute: p
      });
    });
  }), e;
}
function qm(n) {
  const e = [];
  let t = "", r = !1, i = !1, s = 0;
  const o = n.length;
  for (let l = 0; l < o; l += 1) {
    const a = n[l];
    if (a === "'" && !i) {
      r = !r, t += a;
      continue;
    }
    if (a === '"' && !r) {
      i = !i, t += a;
      continue;
    }
    if (!r && !i) {
      if (a === "(") {
        s += 1, t += a;
        continue;
      }
      if (a === ")" && s > 0) {
        s -= 1, t += a;
        continue;
      }
      if (a === ";" && s === 0) {
        e.push(t), t = "";
        continue;
      }
    }
    t += a;
  }
  return t && e.push(t), e;
}
function Ol(n) {
  const e = [], t = qm(n || ""), r = t.length;
  for (let i = 0; i < r; i += 1) {
    const s = t[i], o = s.indexOf(":");
    if (o === -1) continue;
    const l = s.slice(0, o).trim(), a = s.slice(o + 1).trim();
    l && a && e.push([l, a]);
  }
  return e;
}
function V(...n) {
  return n.filter((e) => !!e).reduce((e, t) => {
    const r = { ...e };
    return Object.entries(t).forEach(([i, s]) => {
      if (!r[i]) {
        r[i] = s;
        return;
      }
      if (i === "class") {
        const o = s ? String(s).split(" ") : [], l = r[i] ? r[i].split(" ") : [], a = o.filter((c) => !l.includes(c));
        r[i] = [...l, ...a].join(" ");
      } else if (i === "style") {
        const o = new Map([...Ol(r[i]), ...Ol(s)]);
        r[i] = Array.from(o.entries()).map(([l, a]) => `${l}: ${a}`).join("; ");
      } else r[i] = s;
    }), r;
  }, {});
}
function zn(n, e) {
  return e.filter((t) => t.type === n.type.name).filter((t) => t.attribute.rendered).map((t) => t.attribute.renderHTML ? t.attribute.renderHTML(n.attrs) || {} : { [t.name]: n.attrs[t.name] }).reduce((t, r) => V(t, r), {});
}
function Km(n) {
  return typeof n != "string" ? n : n.match(/^[+-]?(?:\d*\.)?\d+$/) ? Number(n) : n === "true" ? !0 : n === "false" ? !1 : n;
}
function Nl(n, e) {
  return "style" in n ? n : {
    ...n,
    getAttrs: (t) => {
      const r = n.getAttrs ? n.getAttrs(t) : n.attrs;
      if (r === !1) return !1;
      const i = e.reduce((s, o) => {
        const l = o.attribute.parseHTML ? o.attribute.parseHTML(t) : Km(t.getAttribute(o.name));
        return l == null ? s : {
          ...s,
          [o.name]: l
        };
      }, {});
      return {
        ...r,
        ...i
      };
    }
  };
}
function Il(n) {
  return Object.fromEntries(Object.entries(n).filter(([e, t]) => e === "attrs" && Um(t) ? !1 : t != null));
}
function Dl(n) {
  var e, t;
  const r = {};
  return !(!(n == null || (e = n.attribute) === null || e === void 0) && e.isRequired) && "default" in ((n == null ? void 0 : n.attribute) || {}) && (r.default = n.attribute.default), (n == null || (t = n.attribute) === null || t === void 0 ? void 0 : t.validate) !== void 0 && (r.validate = n.attribute.validate), [n.name, r];
}
function Jm(n, e) {
  var t;
  const r = gu(n), { nodeExtensions: i, markExtensions: s } = rn(n);
  return new Va({
    topNode: (t = i.find((o) => O(o, "topNode"))) === null || t === void 0 ? void 0 : t.name,
    nodes: Object.fromEntries(i.map((o) => {
      const l = r.filter((h) => h.type === o.name), a = {
        name: o.name,
        options: o.options,
        storage: o.storage,
        editor: e
      }, c = Il({
        ...n.reduce((h, p) => {
          const m = O(p, "extendNodeSchema", a);
          return {
            ...h,
            ...m ? m(o) : {}
          };
        }, {}),
        content: B(O(o, "content", a)),
        marks: B(O(o, "marks", a)),
        group: B(O(o, "group", a)),
        inline: B(O(o, "inline", a)),
        atom: B(O(o, "atom", a)),
        selectable: B(O(o, "selectable", a)),
        draggable: B(O(o, "draggable", a)),
        code: B(O(o, "code", a)),
        whitespace: B(O(o, "whitespace", a)),
        linebreakReplacement: B(O(o, "linebreakReplacement", a)),
        defining: B(O(o, "defining", a)),
        isolating: B(O(o, "isolating", a)),
        attrs: Object.fromEntries(l.map(Dl))
      }), u = B(O(o, "parseHTML", a));
      u && (c.parseDOM = u.map((h) => Nl(h, l)));
      const d = O(o, "renderHTML", a);
      d && (c.toDOM = (h) => d({
        node: h,
        HTMLAttributes: zn(h, l)
      }));
      const f = O(o, "renderText", a);
      return f && (c.toText = f), [o.name, c];
    })),
    marks: Object.fromEntries(s.map((o) => {
      const l = r.filter((f) => f.type === o.name), a = {
        name: o.name,
        options: o.options,
        storage: o.storage,
        editor: e
      }, c = Il({
        ...n.reduce((f, h) => {
          const p = O(h, "extendMarkSchema", a);
          return {
            ...f,
            ...p ? p(o) : {}
          };
        }, {}),
        inclusive: B(O(o, "inclusive", a)),
        excludes: B(O(o, "excludes", a)),
        group: B(O(o, "group", a)),
        spanning: B(O(o, "spanning", a)),
        code: B(O(o, "code", a)),
        attrs: Object.fromEntries(l.map(Dl))
      }), u = B(O(o, "parseHTML", a));
      u && (c.parseDOM = u.map((f) => Nl(f, l)));
      const d = O(o, "renderHTML", a);
      return d && (c.toDOM = (f) => d({
        mark: f,
        HTMLAttributes: zn(f, l)
      })), [o.name, c];
    }))
  });
}
function Gm(n) {
  const e = n.filter((t, r) => n.indexOf(t) !== r);
  return Array.from(new Set(e));
}
function wn(n) {
  return n.sort((t, r) => {
    const i = O(t, "priority") || 100, s = O(r, "priority") || 100;
    return i > s ? -1 : i < s ? 1 : 0;
  });
}
function yu(n) {
  const e = wn(oo(n)), t = Gm(e.map((r) => r.name));
  return t.length && console.warn(`[tiptap warn]: Duplicate extension names found: [${t.map((r) => `'${r}'`).join(", ")}]. This can lead to issues.`), e;
}
function bu(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: s = `

`, textSerializers: o = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (a, c, u, d) => {
    a.isBlock && c > r && (l += s);
    const f = o == null ? void 0 : o[a.type.name];
    if (f)
      return u && (l += f({
        node: a,
        pos: c,
        parent: u,
        index: d,
        range: e
      })), !1;
    if (a.isText) {
      var h;
      l += a == null || (h = a.text) === null || h === void 0 ? void 0 : h.slice(Math.max(r, c) - c, i - c);
    }
  }), l;
}
function Qm(n, e) {
  return bu(n, {
    from: 0,
    to: n.content.size
  }, e);
}
function ku(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function Ym(n, e) {
  const t = Y(e, n.schema), { from: r, to: i } = n.selection, s = [];
  n.doc.nodesBetween(r, i, (l) => {
    s.push(l);
  });
  const o = s.reverse().find((l) => l.type.name === t.name);
  return o ? { ...o.attrs } : {};
}
function Su(n, e) {
  const t = fi(typeof e == "string" ? e : e.name, n.schema);
  return t === "node" ? Ym(n, e) : t === "mark" ? hu(n, e) : {};
}
function Xm(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Zm(n) {
  const e = Xm(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, s) => s !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function pi(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((i, s) => {
    const o = [];
    if (i.ranges.length)
      i.forEach((l, a) => {
        o.push({
          from: l,
          to: a
        });
      });
    else {
      const { from: l, to: a } = t[s];
      if (l === void 0 || a === void 0) return;
      o.push({
        from: l,
        to: a
      });
    }
    o.forEach(({ from: l, to: a }) => {
      const c = e.slice(s).map(l, -1), u = e.slice(s).map(a), d = e.invert().map(c, -1), f = e.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), Zm(r);
}
function ao(n, e, t) {
  const r = [];
  return n === e ? t.resolve(n).marks().forEach((i) => {
    const s = so(t.resolve(n), i.type);
    s && r.push({
      mark: i,
      ...s
    });
  }) : t.nodesBetween(n, e, (i, s) => {
    !i || (i == null ? void 0 : i.nodeSize) === void 0 || r.push(...i.marks.map((o) => ({
      from: s,
      to: s + i.nodeSize,
      mark: o
    })));
  }), r;
}
const eg = (n, e, t, r = 20) => {
  const i = n.doc.resolve(t);
  let s = r, o = null;
  for (; s > 0 && o === null; ) {
    const l = i.node(s);
    (l == null ? void 0 : l.type.name) === e ? o = l : s -= 1;
  }
  return [o, s];
}, tg = (n) => {
  const e = n.depth - 1;
  if (e < 0) return null;
  const t = n.index(e);
  return t === 0 ? null : n.node(e).child(t - 1);
};
function Ft(n, e) {
  return e.nodes[n] || e.marks[n] || null;
}
function hr(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((s) => s.type === e && s.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
const ng = (n, e = 500) => {
  let t = "";
  const r = n.parentOffset;
  return n.parent.nodesBetween(Math.max(0, r - e), r, (i, s, o, l) => {
    var a, c;
    const u = ((a = (c = i.type.spec).toText) === null || a === void 0 ? void 0 : a.call(c, {
      node: i,
      pos: s,
      parent: o,
      index: l
    })) || i.textContent || "%leaf%";
    t += i.isAtom && !i.isText ? u : u.slice(0, Math.max(0, r - s));
  }), t;
};
function vs(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, s = e ? Qe(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => s ? s.name === u.type.name : !0).find((u) => Mr(u.attrs, t, { strict: !1 }));
  let o = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, h = d.pos;
    n.doc.nodesBetween(f, h, (p, m) => {
      if (s && p.inlineContent && !p.type.allowsMarkType(s)) return !1;
      if (!p.isText && !p.marks.length) return;
      const g = Math.max(f, m), y = Math.min(h, m + p.nodeSize), b = y - g;
      o += b, l.push(...p.marks.map((S) => ({
        mark: S,
        from: g,
        to: y
      })));
    });
  }), o === 0) return !1;
  const a = l.filter((u) => s ? s.name === u.mark.type.name : !0).filter((u) => Mr(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), c = l.filter((u) => s ? u.mark.type !== s && u.mark.type.excludes(s) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (a > 0 ? a + c : a) >= o;
}
function rg(n, e, t = {}) {
  if (!e) return Ge(n, null, t) || vs(n, null, t);
  const r = fi(e, n.schema);
  return r === "node" ? Ge(n, e, t) : r === "mark" ? vs(n, e, t) : !1;
}
const ig = (n, e) => {
  const { $from: t, $to: r, $anchor: i } = n.selection;
  if (e) {
    const s = hi((l) => l.type.name === e)(n.selection);
    if (!s) return !1;
    const o = n.doc.resolve(s.pos + 1);
    return i.pos + 1 === o.end();
  }
  return !(r.parentOffset < r.parent.nodeSize - 2 || t.pos !== r.pos);
}, sg = (n) => {
  const { $from: e, $to: t } = n.selection;
  return !(e.parentOffset > 0 || e.pos !== t.pos);
};
function Rl(n, e) {
  return Array.isArray(e) ? e.some((t) => (typeof t == "string" ? t : t.name) === n.name) : e;
}
function Bi(n, e) {
  const { nodeExtensions: t } = rn(e), r = t.find((s) => s.name === n);
  if (!r) return !1;
  const i = B(O(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function qn(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
  if (t) {
    if (n.type.name === "hardBreak") return !0;
    if (n.isText) {
      var r;
      return !/\S/.test((r = n.text) !== null && r !== void 0 ? r : "");
    }
  }
  if (n.isText) return !n.text;
  if (n.isAtom || n.isLeaf) return !1;
  if (n.content.childCount === 0) return !0;
  if (e) {
    let i = !0;
    return n.content.forEach((s) => {
      i !== !1 && (qn(s, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function wu(n) {
  return n instanceof N;
}
var xu = class Cu {
  constructor(e) {
    this.position = e;
  }
  /**
  * Creates a MappablePosition from a JSON object.
  */
  static fromJSON(e) {
    return new Cu(e.position);
  }
  /**
  * Converts the MappablePosition to a JSON object.
  */
  toJSON() {
    return { position: this.position };
  }
};
function og(n, e) {
  const t = e.mapping.mapResult(n.position);
  return {
    position: new xu(t.pos),
    mapResult: t
  };
}
function lg(n) {
  return new xu(n);
}
function ag(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (ou(r) && (i = r.$cursor), i) {
    var s;
    const l = (s = n.storedMarks) !== null && s !== void 0 ? s : i.marks();
    return i.parent.type.allowsMarkType(t) && (!!t.isInSet(l) || !l.some((a) => a.type.excludes(t)));
  }
  const { ranges: o } = r;
  return o.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, a.pos, (u, d, f) => {
      if (c) return !1;
      if (u.isInline) {
        const h = !f || f.type.allowsMarkType(t), p = !!t.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(t));
        c = h && p;
      }
      return !c;
    }), c;
  });
}
const cg = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: s } = t, { empty: o, ranges: l } = s, a = Qe(n, r.schema);
  if (i) if (o) {
    const c = hu(r, a);
    t.addStoredMark(a.create({
      ...c,
      ...e
    }));
  } else l.forEach((c) => {
    const u = c.$from.pos, d = c.$to.pos;
    r.doc.nodesBetween(u, d, (f, h) => {
      const p = Math.max(h, u), m = Math.min(h + f.nodeSize, d);
      f.marks.find((g) => g.type === a) ? f.marks.forEach((g) => {
        a === g.type && t.addMark(p, m, a.create({
          ...g.attrs,
          ...e
        }));
      }) : t.addMark(p, m, a.create(e));
    });
  });
  return ag(r, t, a);
}, ug = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), dg = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const s = Y(n, t.schema);
  let o;
  return t.selection.$anchor.sameParent(t.selection.$head) && (o = t.selection.$anchor.parent.attrs), s.isTextblock ? i().command(({ commands: l }) => Jo(s, {
    ...o,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Jo(s, {
    ...o,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, fg = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = xt(n, 0, r.content.size), s = N.create(r, i);
    e.setSelection(s);
  }
  return !0;
}, hg = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: s } = r;
  let o, l;
  return typeof e == "number" ? (o = e, l = e) : e && "from" in e && "to" in e ? (o = e.from, l = e.to) : (o = s.from, l = s.to), i && t.doc.nodesBetween(o, l, (a, c) => {
    a.isText || t.setNodeMarkup(c, void 0, {
      ...a.attrs,
      dir: n
    });
  }), !0;
}, pg = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: s } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, o = I.atStart(r).from, l = I.atEnd(r).to, a = xt(i, o, l), c = xt(s, o, l), u = I.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, mg = (n) => ({ state: e, dispatch: t }) => lh(Y(n, e.schema))(e, t);
function Ll(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const gg = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: s, doc: o } = e, { $from: l, $to: a } = s, c = i.extensionManager.attributes, u = hr(c, l.node().type.name, l.node().attrs);
  if (s instanceof N && s.node.isBlock)
    return !l.parentOffset || !qe(o, l.pos) ? !1 : (r && (n && Ll(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = a.parentOffset === a.parent.content.size, f = l.depth === 0 ? void 0 : du(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = d && f ? [{
    type: f,
    attrs: u
  }] : void 0, p = qe(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && qe(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (p && (s instanceof I && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const m = e.mapping.map(l.before()), g = e.doc.resolve(m);
      l.node(-1).canReplaceWith(g.index(), g.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && Ll(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, yg = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: s }) => {
  const o = Y(n, r.schema), { $from: l, $to: a } = r.selection, c = r.selection.node;
  if (c && c.isBlock || l.depth < 2 || !l.sameParent(a)) return !1;
  const u = l.node(-1);
  if (u.type !== o) return !1;
  const d = s.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== o || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let y = x.empty;
      const b = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let M = l.depth - b; M >= l.depth - 3; M -= 1) y = x.from(l.node(M).copy(y));
      const S = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, w = {
        ...hr(d, l.node().type.name, l.node().attrs),
        ...e
      }, E = ((f = o.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(w)) || void 0;
      y = y.append(x.from(o.createAndFill(null, E) || void 0));
      const A = l.before(l.depth - (b - 1));
      t.replace(A, l.after(-S), new v(y, 4 - b, 0));
      let T = -1;
      t.doc.nodesBetween(A, t.doc.content.size, (M, L) => {
        if (T > -1) return !1;
        M.isTextblock && M.content.size === 0 && (T = L + 1);
      }), T > -1 && t.setSelection(I.near(t.doc.resolve(T))), t.scrollIntoView();
    }
    return !0;
  }
  const h = a.pos === l.end() ? u.contentMatchAt(0).defaultType : null, p = {
    ...hr(d, u.type.name, u.attrs),
    ...e
  }, m = {
    ...hr(d, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, a.pos);
  const g = h ? [{
    type: o,
    attrs: p
  }, {
    type: h,
    attrs: m
  }] : [{
    type: o,
    attrs: p
  }];
  if (!qe(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: y, storedMarks: b } = r, { splittableMarks: S } = s.extensionManager, w = b || y.$to.parentOffset && y.$from.marks();
    if (t.split(l.pos, 2, g).scrollIntoView(), !w || !i) return !0;
    const E = w.filter((A) => S.includes(A.type.name));
    t.ensureMarks(E);
  }
  return !0;
};
function Pl(n) {
  return !n || n === "1" ? null : n;
}
function Eu(n, e) {
  return Pl(n) === Pl(e);
}
const $i = (n, e) => {
  const t = hi((s) => s.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && ft(n.doc, t.pos)) || !Eu(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, zi = (n, e) => {
  const t = hi((s) => s.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && ft(n.doc, r)) || !Eu(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function bg(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return I.between(r, i);
}
const kg = (n, e, t, r = {}) => ({ editor: i, tr: s, state: o, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = Y(n, o.schema), p = Y(e, o.schema), { selection: m, storedMarks: g } = o, { $from: y, $to: b } = m, S = y.blockRange(b), w = g || m.$to.parentOffset && m.$from.marks();
  if (!S) return !1;
  const E = hi((me) => Bi(me.type.name, d))(m), A = m.from === 0 && m.to === o.doc.content.size, T = o.doc.content.content, M = T.length === 1 ? T[0] : null, L = A && M && Bi(M.type.name, d) ? {
    node: M,
    pos: 0
  } : null, pe = E ?? L, mt = !!E && S.depth >= 1 && S.depth - E.depth <= 1, gt = !!L;
  if ((mt || gt) && pe) {
    if (pe.node.type === h)
      return A && gt ? a().command(({ tr: me, dispatch: F }) => {
        const J = bg(me);
        return J ? (me.setSelection(J), F && F(me), !0) : !1;
      }).liftListItem(p).run() : c.liftListItem(p);
    if (Bi(pe.node.type.name, d) && h.validContent(pe.node.content)) return a().command(() => (s.setNodeMarkup(pe.pos, h), !0)).command(() => $i(s, h)).command(() => zi(s, h)).run();
  }
  return !t || !w || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => $i(s, h)).command(() => zi(s, h)).run() : a().command(() => {
    const me = u().wrapInList(h, r), F = w.filter((J) => f.includes(J.type.name));
    return s.ensureMarks(F), me ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => $i(s, h)).command(() => zi(s, h)).run();
}, Sg = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: s = !1 } = t, o = Qe(n, r.schema);
  return vs(r, o, e) ? i.unsetMark(o, { extendEmptyMarkRange: s }) : i.setMark(o, e);
}, wg = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const s = Y(n, r.schema), o = Y(e, r.schema), l = Ge(r, s, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(o, a) : i.setNode(s, {
    ...a,
    ...t
  });
}, xg = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Y(n, t.schema);
  return Ge(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Cg = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const i = t[r];
    let s;
    if (i.spec.isInputRules && (s = i.getState(n))) {
      if (e) {
        const o = n.tr, l = s.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1) o.step(l.steps[a].invert(l.docs[a]));
        if (s.text) {
          const a = o.doc.resolve(s.from).marks();
          o.replaceWith(s.from, s.to, n.schema.text(s.text, a));
        } else o.delete(s.from, s.to);
      }
      return !0;
    }
  }
  return !1;
}, Eg = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { ignoreClearable: i = !1 } = n, { selection: s } = e, { empty: o, ranges: l } = s;
  if (o) return !0;
  const { nonClearableMarks: a } = r.extensionManager;
  if (t) {
    const c = Object.values(r.schema.marks).filter((u) => i || !a.includes(u.name));
    l.forEach((u) => {
      for (const d of c) e.removeMark(u.$from.pos, u.$to.pos, d);
    });
  }
  return !0;
}, vg = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: s = !1 } = e, { selection: o } = t, l = Qe(n, r.schema), { $from: a, empty: c, ranges: u } = o;
  if (!i) return !0;
  if (c && s) {
    var d;
    let { from: f, to: h } = o;
    const p = so(a, l, (d = a.marks().find((m) => m.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    p && (f = p.from, h = p.to), t.removeMark(f, h, l);
  } else u.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, Mg = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let s, o;
  return typeof n == "number" ? (s = n, o = n) : n && "from" in n && "to" in n ? (s = n.from, o = n.to) : (s = i.from, o = i.to), r && e.doc.nodesBetween(s, o, (l, a) => {
    if (l.isText) return;
    const c = { ...l.attrs };
    delete c.dir, e.setNodeMarkup(a, void 0, c);
  }), !0;
}, Tg = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let s = null, o = null;
  const l = fi(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (s = Y(n, r.schema)), l === "mark" && (o = Qe(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    const u = c.$from.pos, d = c.$to.pos;
    let f, h, p, m;
    t.selection.empty ? r.doc.nodesBetween(u, d, (g, y) => {
      s && s === g.type && (a = !0, p = Math.max(y, u), m = Math.min(y + g.nodeSize, d), f = y, h = g);
    }) : r.doc.nodesBetween(u, d, (g, y) => {
      y < u && s && s === g.type && (a = !0, p = Math.max(y, u), m = Math.min(y + g.nodeSize, d), f = y, h = g), y >= u && y <= d && (s && s === g.type && (a = !0, i && t.setNodeMarkup(y, void 0, {
        ...g.attrs,
        ...e
      })), o && g.marks.length && g.marks.forEach((b) => {
        if (o === b.type && (a = !0, i)) {
          const S = Math.max(y, u), w = Math.min(y + g.nodeSize, d);
          t.addMark(S, w, o.create({
            ...b.attrs,
            ...e
          }));
        }
      }));
    }), h && (f !== void 0 && i && t.setNodeMarkup(f, void 0, {
      ...h.attrs,
      ...e
    }), o && h.marks.length && h.marks.forEach((g) => {
      o === g.type && i && t.addMark(p, m, o.create({
        ...g.attrs,
        ...e
      }));
    }));
  }), a;
}, Wt = new W("__tiptap_decorations__"), Ag = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(Wt, {
  type: "force",
  name: n
}), !0), Og = (n, e = {}) => ({ state: t, dispatch: r }) => eh(Y(n, t.schema), e)(t, r), Ng = (n, e = {}) => ({ state: t, dispatch: r }) => th(Y(n, t.schema), e)(t, r);
var Ig = /* @__PURE__ */ Ud({
  blur: () => Xp,
  clearContent: () => Zp,
  clearNodes: () => em,
  command: () => tm,
  createParagraphNear: () => nm,
  cut: () => rm,
  deleteCurrentNode: () => im,
  deleteNode: () => sm,
  deleteRange: () => om,
  deleteSelection: () => cm,
  enter: () => um,
  exitCode: () => dm,
  extendMarkRange: () => fm,
  first: () => hm,
  focus: () => mm,
  forEach: () => gm,
  insertContent: () => ym,
  insertContentAt: () => bm,
  insertDefaultBlock: () => km,
  joinBackward: () => xm,
  joinDown: () => wm,
  joinForward: () => Cm,
  joinItemBackward: () => Em,
  joinItemForward: () => vm,
  joinTextblockBackward: () => Mm,
  joinTextblockForward: () => Tm,
  joinUp: () => Sm,
  keyboardShortcut: () => Om,
  lift: () => Nm,
  liftEmptyBlock: () => Im,
  liftListItem: () => Dm,
  newlineInCode: () => Rm,
  resetAttributes: () => Lm,
  scrollIntoView: () => Pm,
  selectAll: () => Bm,
  selectNodeBackward: () => $m,
  selectNodeForward: () => zm,
  selectParentNode: () => _m,
  selectTextblockEnd: () => Fm,
  selectTextblockStart: () => Hm,
  setContent: () => Vm,
  setMark: () => cg,
  setMeta: () => ug,
  setNode: () => dg,
  setNodeSelection: () => fg,
  setTextDirection: () => hg,
  setTextSelection: () => pg,
  sinkListItem: () => mg,
  splitBlock: () => gg,
  splitListItem: () => yg,
  toggleList: () => kg,
  toggleMark: () => Sg,
  toggleNode: () => wg,
  toggleWrap: () => xg,
  undoInputRule: () => Cg,
  unsetAllMarks: () => Eg,
  unsetMark: () => vg,
  unsetTextDirection: () => Mg,
  updateAttributes: () => Tg,
  updateDecorations: () => Ag,
  wrapIn: () => Og,
  wrapInList: () => Ng
});
const Ut = /* @__PURE__ */ new WeakMap();
function Dg(n, e) {
  var t;
  Ut.set(n, ((t = Ut.get(n)) !== null && t !== void 0 ? t : 0) + 1);
  try {
    return e();
  } finally {
    var r;
    const i = ((r = Ut.get(n)) !== null && r !== void 0 ? r : 1) - 1;
    i > 0 ? Ut.set(n, i) : Ut.delete(n);
  }
}
function Rg(n) {
  return Ut.has(n);
}
var Lg = class {
  constructor() {
    this.callbacks = {};
  }
  on(n, e) {
    return this.callbacks[n] || (this.callbacks[n] = []), this.callbacks[n].push(e), this;
  }
  emit(n, ...e) {
    const t = this.callbacks[n];
    return t && t.forEach((r) => r.apply(this, e)), this;
  }
  off(n, e) {
    const t = this.callbacks[n];
    return t && (e ? this.callbacks[n] = t.filter((r) => r !== e) : delete this.callbacks[n]), this;
  }
  once(n, e) {
    const t = (...r) => {
      this.off(n, t), e.apply(this, r);
    };
    return this.on(n, t);
  }
  removeAllListeners() {
    this.callbacks = {};
  }
};
const vu = typeof process < "u" && process.env.NODE_ENV !== "production";
function Pg(n) {
  return n.kind === "widget";
}
function Mu(n, e) {
  const t = [], r = /* @__PURE__ */ new Set();
  for (const i of n)
    i.kind === "widget" && Pg(i) && r.add(i.key), t.push(i.toPMDecoration(e));
  return {
    decorations: t,
    widgetKeys: r
  };
}
function Bg(n, e, t) {
  const { decorations: r, widgetKeys: i } = Mu(e, t);
  return {
    set: P.create(n, r),
    widgetKeys: i
  };
}
function Tu({ position: n, from: e, to: t, docSize: r }) {
  return n < e ? !1 : n < t ? !0 : n === t && t === r;
}
function $g({ decorations: n, from: e, to: t, docSize: r, extensionName: i, warnedExtensions: s }) {
  return n.filter((o) => Tu({
    position: o.anchor,
    from: e,
    to: t,
    docSize: r
  }) ? !0 : (o.anchor === t || s.has(i) || (s.add(i), console.warn(`[tiptap warn]: Extension "${i}" returned a decoration outside the requested range [${e}, ${t}). It was ignored.`)), !1));
}
function Au(n) {
  var e;
  const t = (e = n.spec) === null || e === void 0 ? void 0 : e.key;
  return typeof t == "string" ? t : void 0;
}
function zg(n) {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  for (const o of n.find()) {
    var r, i, s;
    const l = Au(o);
    if (!l) continue;
    const a = (r = o.spec.extensionName) !== null && r !== void 0 ? r : "unknown", c = (i = e.get(l)) !== null && i !== void 0 ? i : /* @__PURE__ */ new Set();
    c.add(a), e.set(l, c), t.set(l, ((s = t.get(l)) !== null && s !== void 0 ? s : 0) + 1);
  }
  return Array.from(e, ([o, l]) => ({
    key: o,
    extensions: l
  })).filter(({ key: o }) => {
    var l;
    return ((l = t.get(o)) !== null && l !== void 0 ? l : 0) > 1;
  });
}
function Ou(n) {
  return n.jsonID === "attr";
}
function _g(n) {
  let e = !1;
  if (n.getMap().forEach(() => {
    e = !0;
  }), e || Ou(n)) return !0;
  const t = n;
  return typeof t.from == "number" && typeof t.to == "number";
}
function Fg(n, e) {
  let t = null, r = 0, i = 0;
  for (let s = 0; s < n.childCount && !(i > e.to); s += 1) {
    const o = i + n.child(s).nodeSize;
    o >= e.from && (t === null && (t = i), r = o), i = o;
  }
  return t === null ? null : {
    from: t,
    to: r
  };
}
function Hg(n, e) {
  if (n.steps.some((s) => !_g(s))) return { type: "full" };
  const t = pi(n).map(({ newRange: s }) => s);
  n.steps.forEach((s, o) => {
    if (!Ou(s)) return;
    const l = n.mapping.slice(o);
    t.push({
      from: l.map(s.pos, -1),
      to: l.map(s.pos + 1)
    });
  });
  const r = [];
  for (const s of t) {
    const o = Fg(e, s);
    o && r.push(o);
  }
  r.sort((s, o) => s.from - o.from);
  const i = [];
  for (const s of r) {
    const o = i[i.length - 1];
    o && s.from <= o.to ? o.to = Math.max(o.to, s.to) : i.push({ ...s });
  }
  return {
    type: "ranges",
    ranges: i
  };
}
function Nu(n, e, t, r) {
  return n.map(e, t, { onRemove: (i) => {
    const s = i == null ? void 0 : i.key;
    typeof s == "string" && r.delete(s);
  } });
}
function Vg(n, e, t) {
  var r, i;
  const s = (r = e.decorationSetsByExtension[n]) !== null && r !== void 0 ? r : P.empty, o = new Set((i = e.widgetKeysByExtension[n]) !== null && i !== void 0 ? i : []);
  return {
    set: Nu(s, t.mapping, t.doc, o),
    widgetKeys: o
  };
}
function Bl(n, e) {
  const t = Object.values(e).flatMap((r) => r.find());
  return P.create(n, t);
}
function $l(n) {
  const e = /* @__PURE__ */ new Set();
  for (const t of Object.values(n)) for (const r of t) e.add(r);
  return e;
}
function jg(n, e) {
  var t;
  switch ((t = e.update) !== null && t !== void 0 ? t : "document") {
    case "document":
      if (e.createInRange) throw new Error(`[tiptap error]: Extension "${n}" provides createInRange() but does not use the "changedRanges" decoration update strategy.`);
      return;
    case "changedRanges":
      if (!e.createInRange) throw new Error(`[tiptap error]: Extension "${n}" uses the "changedRanges" decoration update strategy but does not provide createInRange().`);
      return;
    case "manual":
      if (e.createInRange) throw new Error(`[tiptap error]: Extension "${n}" uses the "manual" decoration update strategy, which is not compatible with createInRange(). createInRange() requires the "changedRanges" strategy.`);
      if (e.shouldUpdate) throw new Error(`[tiptap error]: Extension "${n}" cannot combine the "manual" decoration update strategy with shouldUpdate().`);
      return;
    default:
      throw new Error(`[tiptap error]: Extension "${n}" uses an unknown decoration update strategy. Expected "document", "changedRanges", or "manual".`);
  }
}
function Wg(n, e, t) {
  return t ? !0 : n.update === "manual" ? !1 : n.shouldUpdate ? n.shouldUpdate(e) : e.tr.docChanged;
}
const Ug = /* @__PURE__ */ new Set();
var qg = class {
  constructor(n) {
    this.warnedWidgetKeys = /* @__PURE__ */ new Set(), this.warnedOutOfRangeExtensions = /* @__PURE__ */ new Set(), this.handleBeforeTransaction = ({ nextState: e }) => {
      const t = Wt.getState(e);
      t && this.warnDuplicateWidgetKeys(t);
    }, this.editor = n.editor, this.entries = this.resolveEntries(n.entries), this.entries.forEach(({ name: e, spec: t }) => jg(e, t)), this.plugin = this.entries.length > 0 ? this.createPlugin() : null, this.editor.on("beforeTransaction", this.handleBeforeTransaction);
  }
  destroy() {
    this.editor.off("beforeTransaction", this.handleBeforeTransaction);
  }
  /**
  * Returns the set of live widget keys from all decoration extensions.
  * @returns A readonly set of widget keys
  */
  liveWidgetKeys() {
    var n, e;
    return (n = (e = Wt.getState(this.editor.state)) === null || e === void 0 ? void 0 : e.widgetKeys) !== null && n !== void 0 ? n : Ug;
  }
  /**
  * The mounted editor view, or `null` when destroyed. Decoration callbacks
  * must never receive the placeholder view `editor.view` falls back to.
  * @returns The mounted editor view, or `null`
  */
  get mountedView() {
    return this.editor.isDestroyed ? null : this.editor.view;
  }
  /**
  * Resolves decoration entries by calling the addDecorations function for each extension entry.
  * @param entries The decoration manager entries to resolve
  * @returns An array of resolved decoration entries
  */
  resolveEntries(n) {
    const e = [];
    for (const { name: t, addDecorations: r } of n) {
      const i = r();
      i && e.push({
        name: t,
        spec: i
      });
    }
    return e;
  }
  /**
  * Creates the ProseMirror plugin for managing decorations.
  * @returns A ProseMirror plugin with state management
  */
  createPlugin() {
    const { editor: n, entries: e } = this;
    return new z({
      key: Wt,
      state: {
        init: (t, r) => {
          const i = {}, s = {};
          for (const { name: l, spec: a } of e) {
            const { set: c, widgetKeys: u } = this.buildFullSet(l, a, r);
            i[l] = c, s[l] = u;
          }
          const o = {
            decorationSetsByExtension: i,
            widgetKeysByExtension: s,
            mergedDecorationSet: this.buildMergedSet(r.doc, i),
            widgetKeys: $l(s)
          };
          return this.warnDuplicateWidgetKeys(o), o;
        },
        apply: (t, r, i, s) => {
          const o = t.getMeta(Wt), l = (o == null ? void 0 : o.type) === "force" && !o.name, a = (o == null ? void 0 : o.type) === "force" ? o.name : void 0, c = {}, u = {}, d = /* @__PURE__ */ new Set();
          return Dg(n, () => {
            for (const { name: f, spec: h } of e) {
              const p = l || a === f;
              if (Wg(h, {
                editor: n,
                tr: t,
                oldState: i,
                newState: s
              }, p))
                if (h.update === "changedRanges" && t.docChanged && !p) {
                  const m = this.applyChangedRangesRecompute(f, h, r, t, s);
                  c[f] = m.set, u[f] = m.widgetKeys, d.add(f);
                } else {
                  const { set: m, widgetKeys: g } = this.buildFullSet(f, h, s);
                  c[f] = m, u[f] = g, d.add(f);
                }
              else {
                const m = Vg(f, r, t);
                c[f] = m.set, u[f] = m.widgetKeys;
              }
            }
          }), d.size === 0 && !t.docChanged ? r : {
            decorationSetsByExtension: c,
            widgetKeysByExtension: u,
            mergedDecorationSet: this.mergeAfterApply({
              entries: e,
              previous: r,
              tr: t,
              decorationSetsByExtension: c,
              recomputedNames: d
            }),
            widgetKeys: $l(u)
          };
        }
      },
      props: { decorations(t) {
        var r, i;
        return (r = (i = Wt.getState(t)) === null || i === void 0 ? void 0 : i.mergedDecorationSet) !== null && r !== void 0 ? r : P.empty;
      } }
    });
  }
  /**
  * Applies changed ranges recomputation to a decoration set, dropping stale decorations and rebuilding only the touched blocks.
  * @param name The name of the decoration extension
  * @param spec The decoration spec
  * @param previous The previous decoration manager state
  * @param tr The transaction to apply
  * @param newState The new editor state
  * @returns The updated decoration set and widget keys
  */
  applyChangedRangesRecompute(n, e, t, r, i) {
    const s = Hg(r, i.doc);
    return s.type === "full" ? this.buildFullSet(n, e, i) : this.rebuildRanges(n, e, t, r, i, s.ranges);
  }
  /**
  * Rebuilds decorations for the changed block ranges: maps the previous set
  * forward, then for each range removes stale decorations, calls
  * `createInRange`, and adds the new ones while syncing widget keys.
  * @param name The extension name.
  * @param spec The decoration spec.
  * @param previous The previous decoration manager state.
  * @param tr The transaction to apply.
  * @param newState The new editor state.
  * @param ranges The block ranges to rebuild.
  * @returns The updated decoration set and widget keys.
  */
  rebuildRanges(n, e, t, r, i, s) {
    var o, l;
    const a = (o = t.decorationSetsByExtension[n]) !== null && o !== void 0 ? o : P.empty, c = new Set((l = t.widgetKeysByExtension[n]) !== null && l !== void 0 ? l : []);
    let u = Nu(a, r.mapping, r.doc, c);
    const d = i.doc.content.size;
    for (const { from: f, to: h } of s) {
      const p = u.find(f, h).filter((y) => Tu({
        position: y.from,
        from: f,
        to: h,
        docSize: d
      }));
      for (const y of p) {
        const b = Au(y);
        b && c.delete(b);
      }
      u = u.remove(p);
      const { decorations: m, widgetKeys: g } = Mu($g({
        decorations: this.runCreate(n, "createInRange", () => e.createInRange({
          editor: this.editor,
          state: i,
          view: this.mountedView,
          from: f,
          to: h
        })),
        from: f,
        to: h,
        docSize: d,
        extensionName: n,
        warnedExtensions: this.warnedOutOfRangeExtensions
      }), n);
      u = u.add(i.doc, m);
      for (const y of g) c.add(y);
    }
    return {
      set: u,
      widgetKeys: c
    };
  }
  /**
  * Builds a full decoration set for the entire document.
  * @param name The name of the decoration extension
  * @param spec The decoration spec
  * @param state The editor state
  * @returns The decoration set and widget keys
  */
  buildFullSet(n, e, t) {
    const r = this.runCreate(n, "create", () => e.create({
      editor: this.editor,
      state: t,
      view: this.mountedView
    }));
    return Bg(t.doc, r, n);
  }
  /**
  * Runs a decoration callback and swallows anything it throws. These run inside
  * `state.apply`, where an uncaught error would abort the whole transaction.
  * @param name The extension name.
  * @param method The callback name, used in the error message.
  * @param create The callback to run.
  * @returns The decorations, or an empty array if the callback threw.
  */
  runCreate(n, e, t) {
    try {
      return t();
    } catch (r) {
      return console.error(`[tiptap error]: Extension "${n}" threw in \`addDecorations().${e}()\`. Its decorations were dropped for this update.`, r), [];
    }
  }
  warnDuplicateWidgetKeys(n) {
    if (!vu) return;
    if (n.widgetKeys.size === 0) {
      this.warnedWidgetKeys.clear();
      return;
    }
    const e = zg(n.mergedDecorationSet), t = new Set(e.map(({ key: r }) => r));
    for (const { key: r, extensions: i } of e) {
      if (this.warnedWidgetKeys.has(r)) continue;
      const s = Array.from(i).map((o) => `"${o}"`).join(", ");
      console.warn(`[tiptap warn]: Duplicate widget decoration key "${r}" in extension${i.size === 1 ? "" : "s"} ${s}. Widget decoration keys must be globally unique, otherwise ProseMirror misplaces the widget DOM. Use a stable, unique key (e.g. \`comment-\${id}\`).`);
    }
    this.warnedWidgetKeys = t;
  }
  /**
  * Builds the merged DecorationSet during init. Skips the merge for a
  * single extension since its per-extension set is already correct.
  * @param doc The document to build the merged set for.
  * @param decorationSetsByExtension The per-extension decoration sets.
  * @returns The merged decoration set.
  */
  buildMergedSet(n, e) {
    const t = Object.keys(e);
    return t.length === 1 ? e[t[0]] : Bl(n, e);
  }
  /**
  * Computes the merged DecorationSet after apply. Single extension skips the
  * merge; nothing recomputed maps the previous merged set forward; otherwise
  * the merge is rebuilt from the per-extension sets.
  */
  mergeAfterApply({ entries: n, previous: e, tr: t, decorationSetsByExtension: r, recomputedNames: i }) {
    return n.length === 1 ? r[n[0].name] : i.size === 0 ? e.mergedDecorationSet.map(t.mapping, t.doc) : Bl(t.doc, r);
  }
};
function Kg(n, e) {
  const { selection: t } = n, { $from: r } = t;
  if (t instanceof N) {
    const s = r.index();
    return r.parent.canReplaceWith(s, s + 1, e);
  }
  let i = r.depth;
  for (; i >= 0; ) {
    const s = r.index(i);
    if (r.node(i).contentMatchAt(s).matchType(e)) return !0;
    i -= 1;
  }
  return !1;
}
function Jg(n, e, t) {
  const r = document.querySelector("style[data-tiptap-style]");
  if (r !== null) return r;
  const i = document.createElement("style");
  return e && i.setAttribute("nonce", e), i.setAttribute("data-tiptap-style", ""), i.innerHTML = n, document.getElementsByTagName("head")[0].appendChild(i), i;
}
function Gg(n) {
  return typeof n == "number";
}
function Qg(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function er(n) {
  return Qg(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function zl(n, e, t) {
  const r = n.split(`
`), i = [];
  let s = "", o = 0;
  const l = e.baseIndentSize || 2;
  for (; o < r.length; ) {
    const u = r[o], d = u.match(e.itemPattern);
    if (!d) {
      if (i.length > 0) break;
      if (u.trim() === "") {
        o += 1, s = `${s}${u}
`;
        continue;
      } else return;
    }
    const f = e.extractItemData(d), { indentLevel: h, mainContent: p } = f;
    s = `${s}${u}
`;
    const m = [p];
    for (o += 1; o < r.length; ) {
      var a;
      const S = r[o];
      if (S.trim() === "") {
        var c;
        const w = r.slice(o + 1).findIndex((E) => E.trim() !== "");
        if (w === -1) break;
        if ((((c = r[o + 1 + w].match(/^(\s*)/)) === null || c === void 0 || (c = c[1]) === null || c === void 0 ? void 0 : c.length) || 0) > h) {
          m.push(S), s = `${s}${S}
`, o += 1;
          continue;
        } else break;
      }
      if ((((a = S.match(/^(\s*)/)) === null || a === void 0 || (a = a[1]) === null || a === void 0 ? void 0 : a.length) || 0) > h)
        m.push(S), s = `${s}${S}
`, o += 1;
      else break;
    }
    let g;
    const y = m.slice(1);
    if (y.length > 0) {
      const S = y.map((w) => w.slice(h + l)).join(`
`);
      S.trim() && (e.customNestedParser ? g = e.customNestedParser(S) : g = t.blockTokens(S));
    }
    const b = e.createToken(f, g);
    i.push(b);
  }
  if (i.length !== 0)
    return {
      items: i,
      raw: s
    };
}
function Iu(n, e, t, r) {
  if (!n || !Array.isArray(n.content)) return "";
  const i = typeof t == "function" ? t(r) : t, [s, ...o] = n.content;
  let l = `${i}${e.renderChildren([s])}`;
  return o && o.length > 0 && o.forEach((a, c) => {
    var u, d;
    const f = (u = (d = e.renderChild) === null || d === void 0 ? void 0 : d.call(e, a, c + 1)) !== null && u !== void 0 ? u : e.renderChildren([a]);
    if (f != null) {
      const h = f.split(`
`).map((p) => p ? e.indent(p) : e.indent("")).join(`
`);
      l += a.type === "paragraph" ? `

${h}` : `
${h}`;
    }
  }), l;
}
function Du(n, e) {
  const t = { ...n };
  return er(n) && er(e) && Object.keys(e).forEach((r) => {
    er(e[r]) && er(n[r]) ? t[r] = Du(n[r], e[r]) : t[r] = e[r];
  }), t;
}
function Yg(n, e, t = {}) {
  const { state: r } = e, { doc: i, tr: s } = r, o = n;
  i.descendants((l, a) => {
    const c = s.mapping.map(a), u = s.mapping.map(a) + l.nodeSize;
    let d = null;
    if (l.marks.forEach((h) => {
      if (h !== o) return !1;
      d = h;
    }), !d) return;
    let f = !1;
    if (Object.keys(t).forEach((h) => {
      t[h] !== d.attrs[h] && (f = !0);
    }), f) {
      const h = n.type.create({
        ...n.attrs,
        ...t
      });
      s.removeMark(c, u, n.type), s.addMark(c, u, h);
    }
  }), s.docChanged && e.view.dispatch(s);
}
var ln = class {
  constructor(n) {
    var e;
    this.find = n.find, this.handler = n.handler, this.undoable = (e = n.undoable) !== null && e !== void 0 ? e : !0;
  }
};
const Xg = (n, e) => {
  if (io(e)) return e.exec(n);
  const t = e(n);
  if (!t) return null;
  const r = [t.text];
  return r.index = t.index, r.input = n, r.data = t.data, t.replaceWith && (t.text.includes(t.replaceWith) || console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'), r.push(t.replaceWith)), r;
};
function tr(n) {
  var e;
  const { editor: t, from: r, to: i, text: s, rules: o, plugin: l } = n, { view: a } = t;
  if (a.composing) return !1;
  const c = a.state.doc.resolve(r);
  if (c.parent.type.spec.code || !((e = c.nodeBefore || c.nodeAfter) === null || e === void 0) && e.marks.find((f) => f.type.spec.code)) return !1;
  let u = !1;
  const d = ng(c) + s;
  return o.forEach((f) => {
    if (u) return;
    const h = Xg(d, f.find);
    if (!h) return;
    const p = h[0].length - s.length;
    if (p > 0) {
      const E = c.parentOffset - p;
      if (E < 0 || c.parent.textBetween(E, c.parentOffset) !== h[0].slice(0, p)) return;
    }
    const m = a.state.tr, g = di({
      state: a.state,
      transaction: m
    }), y = {
      from: r - (h[0].length - s.length),
      to: i
    }, { commands: b, chain: S, can: w } = new Yt({
      editor: t,
      state: g
    });
    f.handler({
      state: g,
      range: y,
      match: h,
      commands: b,
      chain: S,
      can: w
    }) === null || !m.steps.length || (f.undoable && m.setMeta(l, {
      transform: m,
      from: r,
      to: i,
      text: s
    }), a.dispatch(m), u = !0);
  }), u;
}
function Zg(n) {
  const { editor: e, rules: t } = n, r = new z({
    state: {
      init() {
        return null;
      },
      apply(i, s, o) {
        const l = i.getMeta(r);
        if (l) return l;
        const a = i.getMeta("applyInputRules");
        return a && setTimeout(() => {
          let { text: c } = a;
          typeof c == "string" ? c = c : c = lo(x.from(c), o.schema);
          const { from: u } = a, d = u + c.length;
          tr({
            editor: e,
            from: u,
            to: d,
            text: c,
            rules: t,
            plugin: r
          });
        }), i.selectionSet || i.docChanged ? null : s;
      }
    },
    props: {
      handleTextInput(i, s, o, l) {
        return tr({
          editor: e,
          from: s,
          to: o,
          text: l,
          rules: t,
          plugin: r
        });
      },
      handleDOMEvents: { compositionend: (i) => (setTimeout(() => {
        const { $cursor: s } = i.state.selection;
        s && tr({
          editor: e,
          from: s.pos,
          to: s.pos,
          text: "",
          rules: t,
          plugin: r
        });
      }), !1) },
      handleKeyDown(i, s) {
        if (s.key !== "Enter") return !1;
        const { $cursor: o } = i.state.selection;
        return o ? tr({
          editor: e,
          from: o.pos,
          to: o.pos,
          text: `
`,
          rules: t,
          plugin: r
        }) : !1;
      }
    },
    isInputRules: !0
  });
  return r;
}
var co = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...B(O(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...B(O(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Du(this.options, n)
    });
    return e.name = this.name, e.parent = this.parent, this.child = null, e;
  }
  extend(n = {}) {
    const e = new this.constructor({
      ...this.config,
      ...n
    });
    return e.parent = this, this.child = e, e.name = "name" in n ? n.name : e.parent.name, e;
  }
}, Be = class Ru extends co {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Ru(t);
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const s = i.marks();
      if (!s.find((l) => (l == null ? void 0 : l.type.name) === t.name)) return !1;
      const o = s.find((l) => (l == null ? void 0 : l.type.name) === t.name);
      return o && r.removeStoredMark(o), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
    }
    return !1;
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
}, Lu = class {
  constructor(n) {
    this.find = n.find, this.handler = n.handler;
  }
};
const ey = (n, e, t) => {
  if (io(e)) return [...n.matchAll(e)];
  const r = e(n, t);
  return r ? r.map((i) => {
    const s = [i.text];
    return s.index = i.index, s.input = n, s.data = i.data, i.replaceWith && (i.text.includes(i.replaceWith) || console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'), s.push(i.replaceWith)), s;
  }) : [];
};
function ty(n) {
  const { editor: e, state: t, from: r, to: i, rule: s, pasteEvent: o, dropEvent: l } = n, { commands: a, chain: c, can: u } = new Yt({
    editor: e,
    state: t
  }), d = [];
  return t.doc.nodesBetween(r, i, (f, h) => {
    var p, m, g, y;
    if (!((p = f.type) === null || p === void 0 || (p = p.spec) === null || p === void 0) && p.code || !(f.isText || f.isTextblock || f.isInline)) return;
    const b = (m = (g = (y = f.content) === null || y === void 0 ? void 0 : y.size) !== null && g !== void 0 ? g : f.nodeSize) !== null && m !== void 0 ? m : 0, S = Math.max(r, h), w = Math.min(i, h + b);
    if (S >= w) return;
    const E = f.isText ? f.text || "" : f.textBetween(S - h, w - h, void 0, "￼");
    ey(E, s.find, o).forEach((A) => {
      if (A.index === void 0) return;
      const T = S + A.index + 1, M = T + A[0].length, L = {
        from: t.tr.mapping.map(T),
        to: t.tr.mapping.map(M)
      }, pe = s.handler({
        state: t,
        range: L,
        match: A,
        commands: a,
        chain: c,
        can: u,
        pasteEvent: o,
        dropEvent: l
      });
      d.push(pe);
    });
  }), d.every((f) => f !== null);
}
let nr = null;
const ny = (n) => {
  var e;
  const t = new ClipboardEvent("paste", { clipboardData: new DataTransfer() });
  return (e = t.clipboardData) === null || e === void 0 || e.setData("text/html", n), t;
};
function ry(n) {
  const { editor: e, rules: t } = n;
  let r = null, i = !1, s = !1, o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, l;
  try {
    l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
  } catch {
    l = null;
  }
  const a = ({ state: c, from: u, to: d, rule: f, pasteEvt: h }) => {
    const p = c.tr, m = di({
      state: c,
      transaction: p
    });
    if (!(!ty({
      editor: e,
      state: m,
      from: Math.max(u - 1, 0),
      to: d.b - 1,
      rule: f,
      pasteEvent: h,
      dropEvent: l
    }) || !p.steps.length)) {
      try {
        l = typeof DragEvent < "u" ? new DragEvent("drop") : null;
      } catch {
        l = null;
      }
      return o = typeof ClipboardEvent < "u" ? new ClipboardEvent("paste") : null, p;
    }
  };
  return t.map((c) => new z({
    view(u) {
      const d = (h) => {
        var p;
        r = !((p = u.dom.parentElement) === null || p === void 0) && p.contains(h.target) ? u.dom.parentElement : null, r && (nr = e);
      }, f = () => {
        nr && (nr = null);
      };
      return window.addEventListener("dragstart", d), window.addEventListener("dragend", f), { destroy() {
        window.removeEventListener("dragstart", d), window.removeEventListener("dragend", f);
      } };
    },
    props: { handleDOMEvents: {
      drop: (u, d) => {
        if (s = r === u.dom.parentElement, l = d, !s) {
          const f = nr;
          f != null && f.isEditable && setTimeout(() => {
            const h = f.state.selection;
            h && f.commands.deleteRange({
              from: h.from,
              to: h.to
            });
          }, 10);
        }
        return !1;
      },
      paste: (u, d) => {
        var f;
        const h = (f = d.clipboardData) === null || f === void 0 ? void 0 : f.getData("text/html");
        return o = d, i = !!(h != null && h.includes("data-pm-slice")), !1;
      }
    } },
    appendTransaction: (u, d, f) => {
      const h = u[0], p = h.getMeta("uiEvent") === "paste" && !i, m = h.getMeta("uiEvent") === "drop" && !s, g = h.getMeta("applyPasteRules"), y = !!g;
      if (!p && !m && !y) return;
      if (y) {
        let { text: w } = g;
        typeof w == "string" ? w = w : w = lo(x.from(w), f.schema);
        const { from: E } = g, A = E + w.length, T = ny(w);
        return a({
          rule: c,
          state: f,
          from: E,
          to: { b: A },
          pasteEvt: T
        });
      }
      const b = d.doc.content.findDiffStart(f.doc.content), S = d.doc.content.findDiffEnd(f.doc.content);
      if (!(!Gg(b) || !S || b === S.b))
        return a({
          rule: c,
          state: f,
          from: b,
          to: S,
          pasteEvt: o
        });
    }
  }));
}
var mi = class {
  constructor(n, e) {
    this.splittableMarks = [], this.nonClearableMarks = [], this.decorationManager = null, this.editor = e, this.baseExtensions = n, this.extensions = yu(n), this.schema = Jm(this.extensions, e), this.setupExtensions();
  }
  /**
  * Get all commands from the extensions.
  * @returns An object with all commands where the key is the command name and the value is the command function
  */
  get commands() {
    return this.extensions.reduce((n, e) => {
      const t = O(e, "addCommands", {
        name: e.name,
        options: e.options,
        storage: this.editor.extensionStorage[e.name],
        editor: this.editor,
        type: Ft(e.name, this.schema)
      });
      return t ? {
        ...n,
        ...t()
      } : n;
    }, {});
  }
  /**
  * Get all registered Prosemirror plugins from the extensions.
  * @returns An array of Prosemirror plugins
  */
  get plugins() {
    const { editor: n } = this, e = wn([...this.extensions].reverse()).flatMap((r) => {
      const i = {
        name: r.name,
        options: r.options,
        storage: this.editor.extensionStorage[r.name],
        editor: n,
        type: Ft(r.name, this.schema)
      }, s = [], o = O(r, "addKeyboardShortcuts", i);
      let l = {};
      if (r.type === "mark" && O(r, "exitable", i) && (l.ArrowRight = () => Be.handleExit({
        editor: n,
        mark: r
      })), o) {
        const f = Object.fromEntries(Object.entries(o()).map(([h, p]) => [h, () => p({ editor: n })]));
        l = {
          ...l,
          ...f
        };
      }
      const a = Yp(l);
      s.push(a);
      const c = O(r, "addInputRules", i);
      if (Rl(r, n.options.enableInputRules) && c) {
        const f = c();
        if (f && f.length) {
          const h = Zg({
            editor: n,
            rules: f
          }), p = Array.isArray(h) ? h : [h];
          s.push(...p);
        }
      }
      const u = O(r, "addPasteRules", i);
      if (Rl(r, n.options.enablePasteRules) && u) {
        const f = u();
        if (f && f.length) {
          const h = ry({
            editor: n,
            rules: f
          });
          s.push(...h);
        }
      }
      const d = O(r, "addProseMirrorPlugins", i);
      if (d) {
        const f = d();
        s.push(...f);
      }
      return s;
    }), t = this.createDecorationPlugin();
    return t && e.push(t), e;
  }
  /**
  * Aggregates decorations from extensions into a single plugin, or returns null
  * if none exist. Destroys the previous manager to avoid orphaned listeners.
  * @returns A ProseMirror plugin or `null`
  * @example
  * const plugin = editor.extensionManager.createDecorationPlugin()
  */
  createDecorationPlugin() {
    var n;
    const { editor: e } = this;
    (n = this.decorationManager) === null || n === void 0 || n.destroy();
    const t = [];
    return this.extensions.forEach((r) => {
      const i = O(r, "addDecorations", {
        name: r.name,
        options: r.options,
        storage: this.editor.extensionStorage[r.name],
        editor: e,
        type: Ft(r.name, this.schema)
      });
      i && t.push({
        name: r.name,
        addDecorations: i
      });
    }), this.decorationManager = new qg({
      editor: e,
      entries: t
    }), this.decorationManager.plugin;
  }
  /**
  * Get all attributes from the extensions.
  * @returns An array of attributes
  */
  get attributes() {
    return gu(this.extensions);
  }
  /**
  * Get all node views from the extensions.
  * @returns An object with all node views where the key is the node name and the value is the node view function
  */
  get nodeViews() {
    const { editor: n } = this, { nodeExtensions: e } = rn(this.extensions);
    return Object.fromEntries(e.filter((t) => !!O(t, "addNodeView")).map((t) => {
      const r = this.attributes.filter((l) => l.type === t.name), i = O(t, "addNodeView", {
        name: t.name,
        options: t.options,
        storage: this.editor.extensionStorage[t.name],
        editor: n,
        type: Y(t.name, this.schema)
      });
      if (!i) return [];
      const s = i();
      if (!s) return [];
      const o = (l, a, c, u, d) => {
        const f = zn(l, r);
        return s({
          node: l,
          view: a,
          getPos: c,
          decorations: u,
          innerDecorations: d,
          editor: n,
          extension: t,
          HTMLAttributes: f
        });
      };
      return [t.name, o];
    }));
  }
  /**
  * Get the composed dispatchTransaction function from all extensions.
  * @param baseDispatch The base dispatch function (e.g. from the editor or user props)
  * @returns A composed dispatch function
  */
  dispatchTransaction(n) {
    const { editor: e } = this;
    return wn([...this.extensions].reverse()).reduceRight((t, r) => {
      const i = {
        name: r.name,
        options: r.options,
        storage: this.editor.extensionStorage[r.name],
        editor: e,
        type: Ft(r.name, this.schema)
      }, s = O(r, "dispatchTransaction", i);
      return s ? (o) => {
        s.call(i, {
          transaction: o,
          next: t
        });
      } : t;
    }, n);
  }
  /**
  * Get the composed transformPastedHTML function from all extensions.
  * @param baseTransform The base transform function (e.g. from the editor props)
  * @returns A composed transform function that chains all extension transforms
  */
  transformPastedHTML(n) {
    const { editor: e } = this;
    return wn([...this.extensions]).reduce((t, r) => {
      const i = {
        name: r.name,
        options: r.options,
        storage: this.editor.extensionStorage[r.name],
        editor: e,
        type: Ft(r.name, this.schema)
      }, s = O(r, "transformPastedHTML", i);
      return s ? (o, l) => {
        const a = t(o, l);
        return s.call(i, a);
      } : t;
    }, n || ((t) => t));
  }
  get markViews() {
    const { editor: n } = this, { markExtensions: e } = rn(this.extensions);
    return Object.fromEntries(e.filter((t) => !!O(t, "addMarkView")).map((t) => {
      const r = this.attributes.filter((o) => o.type === t.name), i = O(t, "addMarkView", {
        name: t.name,
        options: t.options,
        storage: this.editor.extensionStorage[t.name],
        editor: n,
        type: Qe(t.name, this.schema)
      });
      if (!i) return [];
      const s = (o, l, a) => {
        const c = zn(o, r);
        return i()({
          mark: o,
          view: l,
          inline: a,
          editor: n,
          extension: t,
          HTMLAttributes: c,
          updateAttributes: (u) => {
            Yg(o, n, u);
          }
        });
      };
      return [t.name, s];
    }));
  }
  /**
  * Destroy the extension manager and clean up all extension references
  * to prevent memory leaks through parent/child extension chains.
  *
  * Walks each extension's full parent chain and nulls every forward
  * `parent.child → current` link where the parent still points to the
  * current node. This breaks the retention path from module-scope
  * singleton roots through deep extend() chains.
  *
  * Only ancestor `.child` links matching the current chain are cleared.
  * The `.parent` pointer on ancestors is never touched — extensions
  * may be shared across live editors, so their own backward references
  * and non-matching forward links must remain intact.
  */
  destroy() {
    var n;
    (n = this.decorationManager) === null || n === void 0 || n.destroy(), this.extensions.forEach((e) => {
      let t = e;
      for (; t.parent; ) {
        const r = t.parent;
        r.child === t && (r.child = null), t = r;
      }
    }), this.extensions = [], this.baseExtensions = [], this.decorationManager = null, this.schema = null, this.editor = null;
  }
  /**
  * Go through all extensions, create extension storages & setup marks
  * & bind editor event listener.
  */
  setupExtensions() {
    const n = this.extensions;
    this.editor.extensionStorage = Object.fromEntries(n.map((e) => [e.name, e.storage])), n.forEach((e) => {
      const t = {
        name: e.name,
        options: e.options,
        storage: this.editor.extensionStorage[e.name],
        editor: this.editor,
        type: Ft(e.name, this.schema)
      };
      if (e.type === "mark") {
        var r, i;
        (!((r = B(O(e, "keepOnSplit", t))) !== null && r !== void 0) || r) && this.splittableMarks.push(e.name), !((i = B(O(e, "clearable", t))) !== null && i !== void 0) || i || this.nonClearableMarks.push(e.name);
      }
      const s = O(e, "onBeforeCreate", t), o = O(e, "onCreate", t), l = O(e, "onUpdate", t), a = O(e, "onSelectionUpdate", t), c = O(e, "onTransaction", t), u = O(e, "onFocus", t), d = O(e, "onBlur", t), f = O(e, "onDestroy", t);
      s && this.editor.on("beforeCreate", s), o && this.editor.on("create", o), l && this.editor.on("update", l), a && this.editor.on("selectionUpdate", a), c && this.editor.on("transaction", c), u && this.editor.on("focus", u), d && this.editor.on("blur", d), f && this.editor.on("destroy", f);
    });
  }
};
mi.resolve = yu;
mi.sort = wn;
mi.flatten = oo;
var $ = class Pu extends co {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Pu(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
const iy = $.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new z({
      key: new W("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, s = ku(t), { blockSeparator: o } = this.options, l = {
          ...o !== void 0 ? { blockSeparator: o } : {},
          textSerializers: s
        };
        return [...i.ranges].sort((a, c) => a.$from.pos - c.$from.pos).map(({ $from: a, $to: c }) => bu(r, {
          from: a.pos,
          to: c.pos
        }, l)).join(o ?? `

`);
      } }
    })];
  }
}), sy = $.create({
  name: "commands",
  addCommands() {
    return { ...Ig };
  }
}), oy = $.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var s, o, l;
      if ((s = (o = this.editor.options.coreExtensionOptions) === null || o === void 0 || (o = o.delete) === null || o === void 0 || (l = o.filterTransaction) === null || l === void 0 ? void 0 : l.call(o, n)) !== null && s !== void 0 ? s : n.getMeta("y-sync$")) return;
      const a = pu(n.before, [n, ...e]);
      pi(a).forEach((u) => {
        a.mapping.mapResult(u.oldRange.from).deletedAfter && a.mapping.mapResult(u.oldRange.to).deletedBefore && a.before.nodesBetween(u.oldRange.from, u.oldRange.to, (d, f) => {
          const h = f + d.nodeSize - 2, p = u.oldRange.from <= f && h <= u.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: d,
            from: f,
            to: h,
            newFrom: a.mapping.map(f),
            newTo: a.mapping.map(h),
            deletedRange: u.oldRange,
            newRange: u.newRange,
            partial: !p,
            editor: this.editor,
            transaction: n,
            combinedTransform: a
          });
        });
      });
      const c = a.mapping;
      a.steps.forEach((u, d) => {
        if (u instanceof Oe) {
          var f, h;
          const p = c.slice(d).map(u.from, -1), m = c.slice(d).map(u.to), g = c.invert().map(p, -1), y = c.invert().map(m), b = p > 0 ? (f = a.doc.nodeAt(p - 1)) === null || f === void 0 ? void 0 : f.marks.some((w) => w.eq(u.mark)) : !1, S = (h = a.doc.nodeAt(m)) === null || h === void 0 ? void 0 : h.marks.some((w) => w.eq(u.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: u.mark,
            from: u.from,
            to: u.to,
            deletedRange: {
              from: g,
              to: y
            },
            newRange: {
              from: p,
              to: m
            },
            partial: !!(S || b),
            editor: this.editor,
            transaction: n,
            combinedTransform: a
          });
        }
      });
    };
    !((t = (r = this.editor.options.coreExtensionOptions) === null || r === void 0 || (r = r.delete) === null || r === void 0 ? void 0 : r.async) !== null && t !== void 0) || t ? setTimeout(i, 0) : i();
  }
}), ly = $.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new z({
      key: new W("tiptapDrop"),
      props: { handleDrop: (n, e, t, r) => {
        this.editor.emit("drop", {
          editor: this.editor,
          event: e,
          slice: t,
          moved: r
        });
      } }
    })];
  }
}), ay = $.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new z({
      key: new W("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
}), cy = new W("focusEvents"), uy = $.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new z({
      key: cy,
      props: { handleDOMEvents: {
        focus: (e, t) => {
          n.isFocused = !0;
          const r = n.state.tr.setMeta("focus", { event: t }).setMeta("addToHistory", !1);
          return e.dispatch(r), !1;
        },
        blur: (e, t) => {
          n.isFocused = !1;
          const r = n.state.tr.setMeta("blur", { event: t }).setMeta("addToHistory", !1);
          return e.dispatch(r), !1;
        }
      } }
    })];
  }
}), dy = $.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: o }) => [
      () => o.undoInputRule(),
      () => o.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: d } = a, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, m = p.parent.type.spec.isolating, g = d.pos - d.parentOffset, y = m && p.parent.childCount === 1 ? g === d.pos : D.atStart(c).from === f;
        return !u || !h.type.isTextblock || h.textContent.length || !y || y && d.parent.type.name === "paragraph" ? !1 : o.clearNodes();
      }),
      () => o.deleteSelection(),
      () => o.joinBackward(),
      () => o.selectNodeBackward()
    ]), e = () => this.editor.commands.first(({ commands: o }) => [
      () => o.deleteSelection(),
      () => o.deleteCurrentNode(),
      () => o.joinForward(),
      () => o.selectNodeForward()
    ]), r = {
      Enter: () => this.editor.commands.first(({ commands: o }) => [
        () => o.newlineInCode(),
        () => o.createParagraphNear(),
        () => o.liftEmptyBlock(),
        () => o.splitBlock()
      ]),
      "Mod-Enter": () => this.editor.commands.exitCode(),
      Backspace: n,
      "Mod-Backspace": n,
      "Shift-Backspace": n,
      Delete: e,
      "Mod-Delete": e,
      "Mod-a": () => this.editor.commands.selectAll()
    }, i = { ...r }, s = {
      ...r,
      "Ctrl-h": n,
      "Alt-Backspace": n,
      "Ctrl-d": e,
      "Ctrl-Alt-Backspace": e,
      "Alt-Delete": e,
      "Alt-d": e,
      "Ctrl-a": () => this.editor.commands.selectTextblockStart(),
      "Ctrl-e": () => this.editor.commands.selectTextblockEnd()
    };
    return Tr() || fu() ? s : i;
  },
  addProseMirrorPlugins() {
    return [new z({
      key: new W("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((h) => h.getMeta("composition"))) return;
        const r = n.some((h) => h.docChanged) && !e.doc.eq(t.doc), i = n.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: s, from: o, to: l } = e.selection, a = D.atStart(e.doc).from, c = D.atEnd(e.doc).to;
        if (s || !(o === a && l === c) || !qn(t.doc)) return;
        const u = t.tr, d = di({
          state: t,
          transaction: u
        }), { commands: f } = new Yt({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
}), fy = $.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new z({
      key: new W("tiptapPaste"),
      props: { handlePaste: (n, e, t) => {
        this.editor.emit("paste", {
          editor: this.editor,
          event: e,
          slice: t
        });
      } }
    })];
  }
}), hy = $.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new z({
      key: new W("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
}), py = $.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = rn(this.extensions);
    return [{
      types: n.filter((e) => e.name !== "text").map((e) => e.name),
      attributes: { dir: {
        default: this.options.direction,
        parseHTML: (e) => {
          const t = e.getAttribute("dir");
          return t && (t === "ltr" || t === "rtl" || t === "auto") ? t : this.options.direction;
        },
        renderHTML: (e) => e.dir ? { dir: e.dir } : {}
      } }
    }];
  },
  addProseMirrorPlugins() {
    return [new z({
      key: new W("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
let _l = !1;
function my(n) {
  if (_l) return;
  _l = !0;
  let e;
  try {
    e = G.fromJSON(n, {
      from: 0,
      to: 0
    }).slice.content;
  } catch {
    return;
  }
  e instanceof x || console.warn("[tiptap warn]: prosemirror-model is loaded more than once. Wrapping and splitting nodes will fail. Deduplicate it in your lock file, or alias it to a single copy in your bundler.");
}
var gy = class pn {
  get name() {
    return this.node.type.name;
  }
  constructor(e, t, r = !1, i = null) {
    this.currentNode = null, this.actualDepth = null, this.isBlock = r, this.resolvedPos = e, this.editor = t, this.currentNode = i;
  }
  get node() {
    return this.currentNode || this.resolvedPos.node();
  }
  get element() {
    return this.editor.view.domAtPos(this.pos).node;
  }
  get depth() {
    var e;
    return (e = this.actualDepth) !== null && e !== void 0 ? e : this.resolvedPos.depth;
  }
  get pos() {
    return this.resolvedPos.pos;
  }
  get content() {
    return this.node.content;
  }
  set content(e) {
    let t = this.from, r = this.to;
    if (this.isBlock) {
      if (this.content.size === 0) {
        console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`);
        return;
      }
      t = this.from + 1, r = this.to - 1;
    }
    this.editor.commands.insertContentAt({
      from: t,
      to: r
    }, e);
  }
  get attributes() {
    return this.node.attrs;
  }
  get textContent() {
    return this.node.textContent;
  }
  get size() {
    return this.node.nodeSize;
  }
  get from() {
    return this.isBlock ? this.pos : this.resolvedPos.start(this.resolvedPos.depth);
  }
  get range() {
    return {
      from: this.from,
      to: this.to
    };
  }
  get to() {
    return this.isBlock ? this.pos + this.size : this.resolvedPos.end(this.resolvedPos.depth) + (this.node.isText ? 0 : 1);
  }
  get parent() {
    if (this.depth === 0) return null;
    const e = this.resolvedPos.start(this.resolvedPos.depth - 1), t = this.resolvedPos.doc.resolve(e);
    return new pn(t, this.editor);
  }
  get before() {
    let e = this.resolvedPos.doc.resolve(this.from - (this.isBlock ? 1 : 2));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.from - 3)), new pn(e, this.editor);
  }
  get after() {
    let e = this.resolvedPos.doc.resolve(this.to + (this.isBlock ? 2 : 1));
    return e.depth !== this.depth && (e = this.resolvedPos.doc.resolve(this.to + 3)), new pn(e, this.editor);
  }
  get children() {
    const e = [];
    return this.node.content.forEach((t, r) => {
      const i = t.isBlock && !t.isTextblock, s = t.isAtom && !t.isText, o = t.isInline, l = this.pos + r + (s ? 0 : 1);
      if (l < 0 || l > this.resolvedPos.doc.nodeSize - 2) return;
      const a = this.resolvedPos.doc.resolve(l);
      if (!i && !o && a.depth <= this.depth) return;
      const c = new pn(a, this.editor, i, i || o ? t : null);
      i && (c.actualDepth = this.depth + 1), e.push(c);
    }), e;
  }
  get firstChild() {
    return this.children[0] || null;
  }
  get lastChild() {
    const e = this.children;
    return e[e.length - 1] || null;
  }
  closest(e, t = {}) {
    let r = null, i = this.parent;
    for (; i && !r; ) {
      if (i.node.type.name === e) if (Object.keys(t).length > 0) {
        const s = i.node.attrs, o = Object.keys(t);
        for (let l = 0; l < o.length; l += 1) {
          const a = o[l];
          if (s[a] !== t[a]) break;
        }
      } else r = i;
      i = i.parent;
    }
    return r;
  }
  querySelector(e, t = {}) {
    return this.querySelectorAll(e, t, !0)[0] || null;
  }
  querySelectorAll(e, t = {}, r = !1) {
    let i = [];
    if (!this.children || this.children.length === 0) return i;
    const s = Object.keys(t);
    return this.children.forEach((o) => {
      r && i.length > 0 || (o.node.type.name === e && s.every((l) => t[l] === o.node.attrs[l]) && i.push(o), !(r && i.length > 0) && (i = i.concat(o.querySelectorAll(e, t, r))));
    }), i;
  }
  setAttribute(e) {
    const { tr: t } = this.editor.state;
    t.setNodeMarkup(this.from, void 0, {
      ...this.node.attrs,
      ...e
    }), this.editor.view.dispatch(t);
  }
};
const yy = `.ProseMirror {
  position: relative;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

.ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="false"] [contenteditable="true"] {
  white-space: pre-wrap;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
  width: 0 !important;
  height: 0 !important;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
  margin: 0;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-hideselection *::selection {
  background: transparent;
}

.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
}

.ProseMirror-hideselection * {
  caret-color: transparent;
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}`;
var by = class extends Lg {
  constructor(n = {}) {
    super(), this.css = null, this.className = "tiptap", this.editorView = null, this.isFocused = !1, this.destroyed = !1, this.isInitialized = !1, this.extensionStorage = {}, this.instanceId = Math.random().toString(36).slice(2, 9), this.hasWarnedStaleDecorationRead = !1, this.options = {
      element: typeof document < "u" ? document.createElement("div") : null,
      content: "",
      injectCSS: !0,
      injectNonce: void 0,
      extensions: [],
      autofocus: !1,
      editable: !0,
      textDirection: void 0,
      editorProps: {},
      parseOptions: {},
      coreExtensionOptions: {},
      enableInputRules: !0,
      enablePasteRules: !0,
      enableCoreExtensions: !0,
      enableContentCheck: !1,
      emitContentError: !1,
      onBeforeCreate: () => null,
      onCreate: () => null,
      onMount: () => null,
      onUnmount: () => null,
      onUpdate: () => null,
      onSelectionUpdate: () => null,
      onTransaction: () => null,
      onFocus: () => null,
      onBlur: () => null,
      onDestroy: () => null,
      onContentError: ({ error: t }) => {
        throw t;
      },
      onPaste: () => null,
      onDrop: () => null,
      onDelete: () => null,
      enableExtensionDispatchTransaction: !0
    }, this.isCapturingTransaction = !1, this.capturedTransaction = null, this.utils = {
      getUpdatedPosition: og,
      createMappablePosition: lg
    }, this.setOptions(n), this.createExtensionManager(), this.createCommandManager(), this.createSchema(), this.on("beforeCreate", this.options.onBeforeCreate), this.emit("beforeCreate", { editor: this }), this.on("mount", this.options.onMount), this.on("unmount", this.options.onUnmount), this.on("contentError", this.options.onContentError), this.on("create", this.options.onCreate), this.on("update", this.options.onUpdate), this.on("selectionUpdate", this.options.onSelectionUpdate), this.on("transaction", this.options.onTransaction), this.on("focus", this.options.onFocus), this.on("blur", this.options.onBlur), this.on("destroy", this.options.onDestroy), this.on("drop", ({ event: t, slice: r, moved: i }) => this.options.onDrop(t, r, i)), this.on("paste", ({ event: t, slice: r }) => this.options.onPaste(t, r)), this.on("delete", this.options.onDelete);
    const e = this.createDoc();
    if (!this.editorState) {
      const t = Cs(e, this.options.autofocus);
      this.editorState = kt.create({
        doc: e,
        schema: this.schema,
        selection: t || void 0
      });
    }
    my(this.schema), this.options.element && this.mount(this.options.element);
  }
  /**
  * Attach the editor to the DOM, creating a new editor view.
  */
  mount(n) {
    if (typeof document > "u") throw new Error("[tiptap error]: The editor cannot be mounted because there is no 'document' defined in this environment.");
    this.createView(n), this.emit("mount", { editor: this }), this.css && !document.head.contains(this.css) && document.head.appendChild(this.css), window.setTimeout(() => {
      this.isDestroyed || (this.options.autofocus !== !1 && this.options.autofocus !== null && this.commands.focus(this.options.autofocus), this.emit("create", { editor: this }), this.isInitialized = !0);
    }, 0);
  }
  /**
  * Remove the editor from the DOM, but still allow remounting at a different point in time
  */
  unmount() {
    if (this.editorView) {
      this.editorState = this.editorView.state;
      const n = this.editorView.dom;
      n != null && n.editor && delete n.editor, this.editorView.destroy();
    }
    if (this.editorView = null, this.isInitialized = !1, this.css && !document.querySelectorAll(`.${this.className}`).length) try {
      typeof this.css.remove == "function" ? this.css.remove() : this.css.parentNode && this.css.parentNode.removeChild(this.css);
    } catch (n) {
      console.warn("Failed to remove CSS element:", n);
    }
    this.css = null, this.emit("unmount", { editor: this });
  }
  /**
  * Returns the editor storage.
  */
  get storage() {
    return this.extensionStorage;
  }
  /**
  * An object of all registered commands.
  */
  get commands() {
    return this.commandManager.commands;
  }
  /**
  * Create a command chain to call multiple commands at once.
  */
  chain() {
    return this.commandManager ? this.commandManager.chain() : Yt.createFakeChain();
  }
  /**
  * Check if a command or a command chain can be executed. Without executing it.
  */
  can() {
    return this.commandManager ? this.commandManager.can() : Yt.createFallbackCan();
  }
  /**
  * Inject CSS styles.
  */
  injectCSS() {
    this.options.injectCSS && typeof document < "u" && (this.css = Jg(yy, this.options.injectNonce));
  }
  /**
  * Update editor options.
  *
  * @param options A list of options
  */
  setOptions(n = {}) {
    this.options = {
      ...this.options,
      ...n
    }, !(!this.editorView || !this.state || this.isDestroyed) && (this.options.editorProps && this.view.setProps(this.options.editorProps), this.view.updateState(this.state));
  }
  /**
  * Update editable state of the editor.
  */
  setEditable(n, e = !0) {
    this.setOptions({ editable: n }), e && this.emit("update", {
      editor: this,
      transaction: this.state.tr,
      appendedTransactions: []
    });
  }
  /**
  * Returns whether the editor is editable.
  */
  get isEditable() {
    return this.options.editable && this.view && this.view.editable;
  }
  /**
  * Returns the editor view.
  */
  get view() {
    return this.editorView ? this.editorView : new Proxy({
      state: this.editorState,
      updateState: (n) => {
        this.editorState = n;
      },
      dispatch: (n) => {
        this.dispatchTransaction(n);
      },
      composing: !1,
      dragging: null,
      editable: !0,
      isDestroyed: !1
    }, { get: (n, e) => {
      if (this.editorView) return this.editorView[e];
      if (e === "state") return this.editorState;
      if (e in n) return Reflect.get(n, e);
      throw new Error(`[tiptap error]: The editor view is not available. Cannot access view['${e}']. The editor may not be mounted yet.`);
    } });
  }
  /**
  * Returns the editor state.
  */
  get state() {
    return vu && !this.hasWarnedStaleDecorationRead && Rg(this) && (this.hasWarnedStaleDecorationRead = !0, console.warn("[tiptap warn]: `editor.state` was read while decoration `create()` was running. It returns the pre-transaction document. Use the `state` argument passed to `create()` instead. Helpers like `editor.isActive()` read `editor.state` too, so pass `state` to their standalone versions instead of calling them on the editor.")), this.editorView && (this.editorState = this.view.state), this.editorState;
  }
  /**
  * Register a ProseMirror plugin.
  *
  * @param plugin A ProseMirror plugin
  * @param handlePlugins Control how to merge the plugin into the existing plugins.
  * @returns The new editor state
  */
  registerPlugin(n, e) {
    const t = mu(e) ? e(n, [...this.state.plugins]) : [...this.state.plugins, n], r = this.state.reconfigure({ plugins: t });
    return this.view.updateState(r), r;
  }
  /**
  * Unregister a ProseMirror plugin.
  *
  * @param nameOrPluginKeyToRemove The plugins name
  * @returns The new editor state or undefined if the editor is destroyed
  */
  unregisterPlugin(n) {
    if (this.isDestroyed) return;
    const e = this.state.plugins;
    let t = e;
    if ([].concat(n).forEach((i) => {
      const s = typeof i == "string" ? `${i}$` : i.key;
      t = t.filter((o) => !o.key.startsWith(s));
    }), e.length === t.length) return;
    const r = this.state.reconfigure({ plugins: t });
    return this.view.updateState(r), r;
  }
  /**
  * Creates an extension manager.
  */
  createExtensionManager() {
    var n, e;
    const t = [...this.options.enableCoreExtensions ? [
      ay,
      iy.configure({ blockSeparator: (n = this.options.coreExtensionOptions) === null || n === void 0 || (n = n.clipboardTextSerializer) === null || n === void 0 ? void 0 : n.blockSeparator }),
      sy,
      uy,
      dy,
      hy.configure({ value: (e = this.options.coreExtensionOptions) === null || e === void 0 || (e = e.tabindex) === null || e === void 0 ? void 0 : e.value }),
      ly,
      fy,
      oy,
      py.configure({ direction: this.options.textDirection })
    ].filter((r) => typeof this.options.enableCoreExtensions == "object" ? this.options.enableCoreExtensions[r.name] !== !1 : !0) : [], ...this.options.extensions].filter((r) => [
      "extension",
      "node",
      "mark"
    ].includes(r == null ? void 0 : r.type));
    this.extensionManager = new mi(t, this);
  }
  /**
  * Creates an command manager.
  */
  createCommandManager() {
    this.commandManager = new Yt({ editor: this });
  }
  /**
  * Creates a ProseMirror schema.
  */
  createSchema() {
    this.schema = this.extensionManager.schema;
  }
  /**
  * Creates the initial document.
  */
  createDoc() {
    let n;
    try {
      n = Es(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: this.options.enableContentCheck });
    } catch (e) {
      if (!(e instanceof Error) || !["[tiptap error]: Invalid JSON content", "[tiptap error]: Invalid HTML content"].includes(e.message)) throw e;
      const t = Es(this.options.content, this.schema, this.options.parseOptions, { errorOnInvalidContent: !1 });
      return this.editorState = kt.create({
        doc: t,
        schema: this.schema,
        selection: Cs(t, this.options.autofocus) || void 0
      }), this.emit("contentError", {
        editor: this,
        error: e,
        disableCollaboration: () => {
          "collaboration" in this.storage && typeof this.storage.collaboration == "object" && this.storage.collaboration && (this.storage.collaboration.isDisabled = !0), this.options.extensions = this.options.extensions.filter((r) => r.name !== "collaboration"), this.createExtensionManager();
        }
      }), this.editorState.doc;
    }
    return n;
  }
  /**
  * Creates a ProseMirror view.
  */
  createView(n) {
    const { editorProps: e, enableExtensionDispatchTransaction: t } = this.options, r = e.dispatchTransaction || this.dispatchTransaction.bind(this), i = t ? this.extensionManager.dispatchTransaction(r) : r, s = e.transformPastedHTML, o = this.extensionManager.transformPastedHTML(s);
    this.editorView = new nu(n, {
      ...e,
      attributes: {
        role: "textbox",
        ...e == null ? void 0 : e.attributes
      },
      dispatchTransaction: i,
      transformPastedHTML: o,
      state: this.editorState,
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
    const l = this.state.reconfigure({ plugins: this.extensionManager.plugins });
    this.view.updateState(l), this.prependClass(), this.injectCSS();
    const a = this.view.dom;
    a.editor = this;
  }
  /**
  * Creates all node and mark views.
  */
  createNodeViews() {
    this.view.isDestroyed || this.view.setProps({
      markViews: this.extensionManager.markViews,
      nodeViews: this.extensionManager.nodeViews
    });
  }
  /**
  * Prepend class name to element.
  */
  prependClass() {
    this.view.dom.className = `${this.className} ${this.view.dom.className}`;
  }
  captureTransaction(n) {
    this.isCapturingTransaction = !0, n(), this.isCapturingTransaction = !1;
    const e = this.capturedTransaction;
    return this.capturedTransaction = null, e;
  }
  /**
  * The callback over which to send transactions (state updates) produced by the view.
  *
  * @param transaction An editor state transaction
  */
  dispatchTransaction(n) {
    if (this.view.isDestroyed) return;
    if (this.isCapturingTransaction) {
      if (!this.capturedTransaction) {
        this.capturedTransaction = n;
        return;
      }
      n.steps.forEach((c) => {
        var u;
        return (u = this.capturedTransaction) === null || u === void 0 ? void 0 : u.step(c);
      });
      return;
    }
    const { state: e, transactions: t } = this.state.applyTransaction(n), r = !this.state.selection.eq(e.selection), i = t.includes(n), s = this.state;
    if (this.emit("beforeTransaction", {
      editor: this,
      transaction: n,
      nextState: e
    }), !i) return;
    this.view.updateState(e), this.emit("transaction", {
      editor: this,
      transaction: n,
      appendedTransactions: t.slice(1)
    }), r && this.emit("selectionUpdate", {
      editor: this,
      transaction: n
    });
    const o = t.findLast((c) => c.getMeta("focus") || c.getMeta("blur")), l = o == null ? void 0 : o.getMeta("focus"), a = o == null ? void 0 : o.getMeta("blur");
    l && this.emit("focus", {
      editor: this,
      event: l.event,
      transaction: o
    }), a && this.emit("blur", {
      editor: this,
      event: a.event,
      transaction: o
    }), !(n.getMeta("preventUpdate") || !t.some((c) => c.docChanged) || s.doc.eq(e.doc)) && this.emit("update", {
      editor: this,
      transaction: n,
      appendedTransactions: t.slice(1)
    });
  }
  /**
  * Get attributes of the currently selected node or mark.
  */
  getAttributes(n) {
    return Su(this.state, n);
  }
  isActive(n, e) {
    const t = typeof n == "string" ? n : null, r = typeof n == "string" ? e : n;
    return rg(this.state, t, r);
  }
  /**
  * Get the document as JSON.
  */
  getJSON() {
    return this.state.doc.toJSON();
  }
  /**
  * Get the document as HTML.
  */
  getHTML() {
    return lo(this.state.doc.content, this.schema);
  }
  /**
  * Get the document as text.
  */
  getText(n) {
    const { blockSeparator: e = `

`, textSerializers: t = {} } = n || {};
    return Qm(this.state.doc, {
      blockSeparator: e,
      textSerializers: {
        ...ku(this.schema),
        ...t
      }
    });
  }
  /**
  * Check if there is no content.
  */
  get isEmpty() {
    return qn(this.state.doc);
  }
  /**
  * Destroy the editor.
  */
  destroy() {
    this.destroyed || (this.destroyed = !0, this.emit("destroy"), this.unmount(), this.removeAllListeners(), this.extensionManager.destroy(), this.extensionManager = null, this.schema = null, this.commandManager = null, this.extensionStorage = {});
  }
  /**
  * Check if the editor is already destroyed.
  */
  get isDestroyed() {
    var n, e;
    return (n = (e = this.editorView) === null || e === void 0 ? void 0 : e.isDestroyed) !== null && n !== void 0 ? n : !0;
  }
  $node(n, e) {
    var t;
    return ((t = this.$doc) === null || t === void 0 ? void 0 : t.querySelector(n, e)) || null;
  }
  $nodes(n, e) {
    var t;
    return ((t = this.$doc) === null || t === void 0 ? void 0 : t.querySelectorAll(n, e)) || null;
  }
  $pos(n) {
    const e = this.state.doc.resolve(n), t = n > 0 && e.nodeAfter && !e.nodeAfter.isText && e.nodeAfter.isAtom ? e.nodeAfter : null;
    return new gy(e, this, !1, t);
  }
  get $doc() {
    return this.$pos(0);
  }
};
function Pt(n) {
  return new ln({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = B(n.getAttributes, void 0, r);
      if (i === !1 || i === null) return null;
      const { tr: s } = e, o = r[r.length - 1], l = r[0];
      if (o) {
        const a = l.search(/\S/), c = t.from + l.indexOf(o), u = c + o.length;
        if (ao(t.from, t.to, e.doc).filter((f) => f.mark.type.excluded.find((h) => h === n.type && h !== f.mark.type)).filter((f) => f.to > c).length) return null;
        u < t.to && s.delete(u, t.to), c > t.from && s.delete(t.from + a, c);
        const d = t.from + a + o.length;
        s.addMark(t.from + a, d, n.type.create(i || {})), s.removeStoredMark(n.type);
      }
    },
    undoable: n.undoable
  });
}
function ky(n) {
  return new ln({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = B(n.getAttributes, void 0, r) || {}, { tr: s } = e, o = t.from;
      let l = t.to;
      const a = n.type.create(i);
      if (r[1]) {
        let c = o + r[0].lastIndexOf(r[1]);
        c > l ? c = l : l = c + r[1].length;
        const u = r[0][r[0].length - 1];
        s.insertText(u, o + r[0].length - 1), s.replaceWith(c, l, a);
      } else if (r[0]) {
        const c = n.type.isInline ? o : o - 1;
        s.insert(c, n.type.create(i)).delete(s.mapping.map(o), s.mapping.map(l));
      }
      s.scrollIntoView();
    },
    undoable: n.undoable
  });
}
function Ms(n) {
  return new ln({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      const i = e.doc.resolve(t.from), s = B(n.getAttributes, void 0, r) || {};
      if (!i.node(-1).canReplaceWith(i.index(-1), i.indexAfter(-1), n.type)) return null;
      e.tr.delete(t.from, t.to).setBlockType(t.from, t.from, n.type, s);
    },
    undoable: n.undoable
  });
}
function K(n) {
  return new ln({
    find: n.find,
    handler: ({ state: e, range: t, match: r }) => {
      let i = n.replace, s = t.from;
      const o = t.to;
      if (r[1]) {
        const l = r[0].lastIndexOf(r[1]);
        i += r[0].slice(l + r[1].length), s += l;
        const a = s - o;
        a > 0 && (i = r[0].slice(l - a, l) + i, s = o);
      }
      e.tr.insertText(i, s, o);
    },
    undoable: n.undoable
  });
}
function sn(n) {
  return new ln({
    find: n.find,
    handler: ({ state: e, range: t, match: r, chain: i }) => {
      const s = B(n.getAttributes, void 0, r) || {}, o = e.tr.delete(t.from, t.to), l = o.doc.resolve(t.from).blockRange(), a = l && js(l, n.type, s);
      if (!a) return null;
      if (o.wrap(l, a), n.keepMarks && n.editor) {
        const { selection: u, storedMarks: d } = e, { splittableMarks: f } = n.editor.extensionManager, h = d || u.$to.parentOffset && u.$from.marks();
        if (h) {
          const p = h.filter((m) => f.includes(m.type.name));
          o.ensureMarks(p);
        }
      }
      if (n.keepAttributes) {
        const u = n.type.name === "bulletList" || n.type.name === "orderedList" ? "listItem" : "taskList";
        i().updateAttributes(u, s).run();
      }
      const c = o.doc.resolve(t.from - 1).nodeBefore;
      c && c.type === n.type && ft(o.doc, t.from - 1) && (!n.joinPredicate || n.joinPredicate(r, c)) && o.join(t.from - 1);
    },
    undoable: n.undoable
  });
}
var he = class Bu extends co {
  constructor(...e) {
    super(...e), this.type = "node";
  }
  /**
  * Create a new Node instance
  * @param config - Node configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Bu(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
function dt(n) {
  return new Lu({
    find: n.find,
    handler: ({ state: e, range: t, match: r, pasteEvent: i }) => {
      const s = B(n.getAttributes, void 0, r, i);
      if (s === !1 || s === null) return null;
      const { tr: o } = e, l = r[r.length - 1], a = r[0];
      let c = t.to;
      if (l) {
        const u = a.search(/\S/), d = t.from + a.indexOf(l), f = d + l.length;
        if (ao(t.from, t.to, e.doc).filter((h) => h.mark.type.excluded.find((p) => p === n.type && p !== h.mark.type)).filter((h) => h.to > d).length) return null;
        f < t.to && o.delete(f, t.to), d > t.from && o.delete(t.from + u, d), c = t.from + u + l.length, o.addMark(t.from + u, c, n.type.create(s || {})), r.index !== void 0 && r.input !== void 0 && r.index + r[0].length >= r.input.length || o.removeStoredMark(n.type);
      }
    }
  });
}
const { getOwnPropertyNames: Sy, getOwnPropertySymbols: wy } = Object, { hasOwnProperty: xy } = Object.prototype;
function _i(n, e) {
  return function(r, i, s) {
    return n(r, i, s) && e(r, i, s);
  };
}
function rr(n) {
  return function(t, r, i) {
    if (!t || !r || typeof t != "object" || typeof r != "object")
      return n(t, r, i);
    const { cache: s } = i, o = s.get(t), l = s.get(r);
    if (o && l)
      return o === r && l === t;
    s.set(t, r), s.set(r, t);
    const a = n(t, r, i);
    return s.delete(t), s.delete(r), a;
  };
}
function Cy(n) {
  return n != null ? n[Symbol.toStringTag] : void 0;
}
function Fl(n) {
  return Sy(n).concat(wy(n));
}
const Ey = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((n, e) => xy.call(n, e))
);
function $t(n, e) {
  return n === e || !n && !e && n !== n && e !== e;
}
const vy = "__v", My = "__o", Ty = "_owner", { getOwnPropertyDescriptor: Hl, keys: Vl } = Object;
function Ay(n, e) {
  return n.byteLength === e.byteLength && Ar(new Uint8Array(n), new Uint8Array(e));
}
function Oy(n, e, t) {
  let r = n.length;
  if (e.length !== r)
    return !1;
  for (; r-- > 0; )
    if (!t.equals(n[r], e[r], r, r, n, e, t))
      return !1;
  return !0;
}
function Ny(n, e) {
  return n.byteLength === e.byteLength && Ar(new Uint8Array(n.buffer, n.byteOffset, n.byteLength), new Uint8Array(e.buffer, e.byteOffset, e.byteLength));
}
function Iy(n, e) {
  return $t(n.getTime(), e.getTime());
}
function Dy(n, e) {
  return n.name === e.name && n.message === e.message && n.cause === e.cause && n.stack === e.stack;
}
function Ry(n, e) {
  return n === e;
}
function jl(n, e, t) {
  const r = n.size;
  if (r !== e.size)
    return !1;
  if (!r)
    return !0;
  const i = new Array(r), s = n.entries();
  let o, l, a = 0;
  for (; (o = s.next()) && !o.done; ) {
    const c = e.entries();
    let u = !1, d = 0;
    for (; (l = c.next()) && !l.done; ) {
      if (i[d]) {
        d++;
        continue;
      }
      const f = o.value, h = l.value;
      if (t.equals(f[0], h[0], a, d, n, e, t) && t.equals(f[1], h[1], f[0], h[0], n, e, t)) {
        u = i[d] = !0;
        break;
      }
      d++;
    }
    if (!u)
      return !1;
    a++;
  }
  return !0;
}
const Ly = $t;
function Py(n, e, t) {
  const r = Vl(n);
  let i = r.length;
  if (Vl(e).length !== i)
    return !1;
  for (; i-- > 0; )
    if (!$u(n, e, t, r[i]))
      return !1;
  return !0;
}
function cn(n, e, t) {
  const r = Fl(n);
  let i = r.length;
  if (Fl(e).length !== i)
    return !1;
  let s, o, l;
  for (; i-- > 0; )
    if (s = r[i], !$u(n, e, t, s) || (o = Hl(n, s), l = Hl(e, s), (o || l) && (!o || !l || o.configurable !== l.configurable || o.enumerable !== l.enumerable || o.writable !== l.writable)))
      return !1;
  return !0;
}
function By(n, e) {
  return $t(n.valueOf(), e.valueOf());
}
function $y(n, e) {
  return n.source === e.source && n.flags === e.flags;
}
function Wl(n, e, t) {
  const r = n.size;
  if (r !== e.size)
    return !1;
  if (!r)
    return !0;
  const i = new Array(r), s = n.values();
  let o, l;
  for (; (o = s.next()) && !o.done; ) {
    const a = e.values();
    let c = !1, u = 0;
    for (; (l = a.next()) && !l.done; ) {
      if (!i[u] && t.equals(o.value, l.value, o.value, l.value, n, e, t)) {
        c = i[u] = !0;
        break;
      }
      u++;
    }
    if (!c)
      return !1;
  }
  return !0;
}
function Ar(n, e) {
  let t = n.byteLength;
  if (e.byteLength !== t || n.byteOffset !== e.byteOffset)
    return !1;
  for (; t-- > 0; )
    if (n[t] !== e[t])
      return !1;
  return !0;
}
function zy(n, e) {
  return n.hostname === e.hostname && n.pathname === e.pathname && n.protocol === e.protocol && n.port === e.port && n.hash === e.hash && n.username === e.username && n.password === e.password;
}
function $u(n, e, t, r) {
  return (r === Ty || r === My || r === vy) && (n.$$typeof || e.$$typeof) ? !0 : Ey(e, r) && t.equals(n[r], e[r], r, r, n, e, t);
}
const _y = "[object ArrayBuffer]", Fy = "[object Arguments]", Hy = "[object Boolean]", Vy = "[object DataView]", jy = "[object Date]", Wy = "[object Error]", Uy = "[object Map]", qy = "[object Number]", Ky = "[object Object]", Jy = "[object RegExp]", Gy = "[object Set]", Qy = "[object String]", Yy = {
  "[object Int8Array]": !0,
  "[object Uint8Array]": !0,
  "[object Uint8ClampedArray]": !0,
  "[object Int16Array]": !0,
  "[object Uint16Array]": !0,
  "[object Int32Array]": !0,
  "[object Uint32Array]": !0,
  "[object Float16Array]": !0,
  "[object Float32Array]": !0,
  "[object Float64Array]": !0,
  "[object BigInt64Array]": !0,
  "[object BigUint64Array]": !0
}, Xy = "[object URL]", Zy = Object.prototype.toString;
function e0({ areArrayBuffersEqual: n, areArraysEqual: e, areDataViewsEqual: t, areDatesEqual: r, areErrorsEqual: i, areFunctionsEqual: s, areMapsEqual: o, areNumbersEqual: l, areObjectsEqual: a, arePrimitiveWrappersEqual: c, areRegExpsEqual: u, areSetsEqual: d, areTypedArraysEqual: f, areUrlsEqual: h, unknownTagComparators: p }) {
  return function(g, y, b) {
    if (g === y)
      return !0;
    if (g == null || y == null)
      return !1;
    const S = typeof g;
    if (S !== typeof y)
      return !1;
    if (S !== "object")
      return S === "number" ? l(g, y, b) : S === "function" ? s(g, y, b) : !1;
    const w = g.constructor;
    if (w !== y.constructor)
      return !1;
    if (w === Object)
      return a(g, y, b);
    if (Array.isArray(g))
      return e(g, y, b);
    if (w === Date)
      return r(g, y, b);
    if (w === RegExp)
      return u(g, y, b);
    if (w === Map)
      return o(g, y, b);
    if (w === Set)
      return d(g, y, b);
    const E = Zy.call(g);
    if (E === jy)
      return r(g, y, b);
    if (E === Jy)
      return u(g, y, b);
    if (E === Uy)
      return o(g, y, b);
    if (E === Gy)
      return d(g, y, b);
    if (E === Ky)
      return typeof g.then != "function" && typeof y.then != "function" && a(g, y, b);
    if (E === Xy)
      return h(g, y, b);
    if (E === Wy)
      return i(g, y, b);
    if (E === Fy)
      return a(g, y, b);
    if (Yy[E])
      return f(g, y, b);
    if (E === _y)
      return n(g, y, b);
    if (E === Vy)
      return t(g, y, b);
    if (E === Hy || E === qy || E === Qy)
      return c(g, y, b);
    if (p) {
      let A = p[E];
      if (!A) {
        const T = Cy(g);
        T && (A = p[T]);
      }
      if (A)
        return A(g, y, b);
    }
    return !1;
  };
}
function t0({ circular: n, createCustomConfig: e, strict: t }) {
  let r = {
    areArrayBuffersEqual: Ay,
    areArraysEqual: t ? cn : Oy,
    areDataViewsEqual: Ny,
    areDatesEqual: Iy,
    areErrorsEqual: Dy,
    areFunctionsEqual: Ry,
    areMapsEqual: t ? _i(jl, cn) : jl,
    areNumbersEqual: Ly,
    areObjectsEqual: t ? cn : Py,
    arePrimitiveWrappersEqual: By,
    areRegExpsEqual: $y,
    areSetsEqual: t ? _i(Wl, cn) : Wl,
    areTypedArraysEqual: t ? _i(Ar, cn) : Ar,
    areUrlsEqual: zy,
    unknownTagComparators: void 0
  };
  if (e && (r = Object.assign({}, r, e(r))), n) {
    const i = rr(r.areArraysEqual), s = rr(r.areMapsEqual), o = rr(r.areObjectsEqual), l = rr(r.areSetsEqual);
    r = Object.assign({}, r, {
      areArraysEqual: i,
      areMapsEqual: s,
      areObjectsEqual: o,
      areSetsEqual: l
    });
  }
  return r;
}
function n0(n) {
  return function(e, t, r, i, s, o, l) {
    return n(e, t, l);
  };
}
function r0({ circular: n, comparator: e, createState: t, equals: r, strict: i }) {
  if (t)
    return function(l, a) {
      const { cache: c = n ? /* @__PURE__ */ new WeakMap() : void 0, meta: u } = t();
      return e(l, a, {
        cache: c,
        equals: r,
        meta: u,
        strict: i
      });
    };
  if (n)
    return function(l, a) {
      return e(l, a, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: r,
        meta: void 0,
        strict: i
      });
    };
  const s = {
    cache: void 0,
    equals: r,
    meta: void 0,
    strict: i
  };
  return function(l, a) {
    return e(l, a, s);
  };
}
const i0 = pt();
pt({ strict: !0 });
pt({ circular: !0 });
pt({
  circular: !0,
  strict: !0
});
pt({
  createInternalComparator: () => $t
});
pt({
  strict: !0,
  createInternalComparator: () => $t
});
pt({
  circular: !0,
  createInternalComparator: () => $t
});
pt({
  circular: !0,
  createInternalComparator: () => $t,
  strict: !0
});
function pt(n = {}) {
  const { circular: e = !1, createInternalComparator: t, createState: r, strict: i = !1 } = n, s = t0(n), o = e0(s), l = t ? t(o) : n0(o);
  return r0({ circular: e, comparator: o, createState: r, equals: l, strict: i });
}
var ir = { exports: {} }, Fi = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ul;
function s0() {
  if (Ul) return Fi;
  Ul = 1;
  var n = Ie, e = Fs();
  function t(c, u) {
    return c === u && (c !== 0 || 1 / c === 1 / u) || c !== c && u !== u;
  }
  var r = typeof Object.is == "function" ? Object.is : t, i = e.useSyncExternalStore, s = n.useRef, o = n.useEffect, l = n.useMemo, a = n.useDebugValue;
  return Fi.useSyncExternalStoreWithSelector = function(c, u, d, f, h) {
    var p = s(null);
    if (p.current === null) {
      var m = { hasValue: !1, value: null };
      p.current = m;
    } else m = p.current;
    p = l(
      function() {
        function y(A) {
          if (!b) {
            if (b = !0, S = A, A = f(A), h !== void 0 && m.hasValue) {
              var T = m.value;
              if (h(T, A))
                return w = T;
            }
            return w = A;
          }
          if (T = w, r(S, A)) return T;
          var M = f(A);
          return h !== void 0 && h(T, M) ? (S = A, T) : (S = A, w = M);
        }
        var b = !1, S, w, E = d === void 0 ? null : d;
        return [
          function() {
            return y(u());
          },
          E === null ? void 0 : function() {
            return y(E());
          }
        ];
      },
      [u, d, f, h]
    );
    var g = i(c, p[0], p[1]);
    return o(
      function() {
        m.hasValue = !0, m.value = g;
      },
      [g]
    ), a(g), g;
  }, Fi;
}
var Hi = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ql;
function o0() {
  return ql || (ql = 1, process.env.NODE_ENV !== "production" && (function() {
    function n(c, u) {
      return c === u && (c !== 0 || 1 / c === 1 / u) || c !== c && u !== u;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var e = Ie, t = Fs(), r = typeof Object.is == "function" ? Object.is : n, i = t.useSyncExternalStore, s = e.useRef, o = e.useEffect, l = e.useMemo, a = e.useDebugValue;
    Hi.useSyncExternalStoreWithSelector = function(c, u, d, f, h) {
      var p = s(null);
      if (p.current === null) {
        var m = { hasValue: !1, value: null };
        p.current = m;
      } else m = p.current;
      p = l(
        function() {
          function y(A) {
            if (!b) {
              if (b = !0, S = A, A = f(A), h !== void 0 && m.hasValue) {
                var T = m.value;
                if (h(T, A))
                  return w = T;
              }
              return w = A;
            }
            if (T = w, r(S, A))
              return T;
            var M = f(A);
            return h !== void 0 && h(T, M) ? (S = A, T) : (S = A, w = M);
          }
          var b = !1, S, w, E = d === void 0 ? null : d;
          return [
            function() {
              return y(u());
            },
            E === null ? void 0 : function() {
              return y(E());
            }
          ];
        },
        [u, d, f, h]
      );
      var g = i(c, p[0], p[1]);
      return o(
        function() {
          m.hasValue = !0, m.value = g;
        },
        [g]
      ), a(g), g;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), Hi;
}
var Kl;
function l0() {
  return Kl || (Kl = 1, process.env.NODE_ENV === "production" ? ir.exports = s0() : ir.exports = o0()), ir.exports;
}
var a0 = l0();
const c0 = (...n) => (e) => {
  n.forEach((t) => {
    typeof t == "function" ? t(e) : t && (t.current = e);
  });
}, u0 = ({ contentComponent: n }) => {
  const e = Ea.useSyncExternalStore(n.subscribe, n.getSnapshot, n.getServerSnapshot);
  return /* @__PURE__ */ k(le, { children: Object.values(e) });
};
function d0() {
  const n = /* @__PURE__ */ new Set();
  let e = {}, t = !1;
  const r = () => {
    t || !n.size || (t = !0, queueMicrotask(() => {
      t = !1, n.forEach((i) => i());
    }));
  };
  return {
    /**
    * Subscribe to the editor instance's changes.
    */
    subscribe(i) {
      return n.add(i), () => {
        n.delete(i);
      };
    },
    getSnapshot() {
      return e;
    },
    getServerSnapshot() {
      return e;
    },
    /**
    * Adds a new NodeView Renderer to the editor.
    */
    setRenderer(i, s) {
      e = {
        ...e,
        [i]: Vd.createPortal(s.reactElement, s.element, i)
      }, r();
    },
    /**
    * Removes a NodeView Renderer from the editor.
    */
    removeRenderer(i) {
      const s = { ...e };
      delete s[i], e = s, r();
    }
  };
}
var f0 = class extends Ie.Component {
  constructor(n) {
    super(n), this.editorContentRef = Ie.createRef();
  }
  componentDidMount() {
    this.init();
  }
  componentDidUpdate() {
    this.init();
  }
  init() {
    var n;
    const e = this.props.editor;
    if (e && !e.isDestroyed && (!((n = e.view.dom) === null || n === void 0) && n.parentNode)) {
      if (e.contentComponent) return;
      const t = this.editorContentRef.current;
      t.append(...e.view.dom.parentNode.childNodes), e.setOptions({ element: t }), e.contentComponent = d0(), e.createNodeViews(), e.isEditorContentInitialized = !0, this.forceUpdate();
    }
  }
  componentWillUnmount() {
    const n = this.props.editor;
    if (n) {
      n.isEditorContentInitialized = !1, n.isDestroyed || n.view.setProps({ nodeViews: {} }), n.contentComponent = null;
      try {
        var e;
        if (!(!((e = n.view.dom) === null || e === void 0) && e.parentNode)) return;
        const t = document.createElement("div");
        t.append(...n.view.dom.parentNode.childNodes), n.setOptions({ element: t });
      } catch {
      }
    }
  }
  render() {
    const { editor: n, innerRef: e, ...t } = this.props;
    return /* @__PURE__ */ j(le, { children: [/* @__PURE__ */ k("div", {
      ref: c0(e, this.editorContentRef),
      ...t
    }), (n == null ? void 0 : n.contentComponent) && /* @__PURE__ */ k(u0, { contentComponent: n.contentComponent })] });
  }
};
const h0 = xa((n, e) => {
  const t = Ie.useMemo(() => Math.floor(Math.random() * 4294967295).toString(), [n.editor]);
  return Ie.createElement(f0, {
    key: t,
    innerRef: e,
    ...n
  });
}), zu = Ie.memo(h0), p0 = typeof window < "u" ? _d : je;
var m0 = class {
  constructor(n) {
    this.transactionNumber = 0, this.lastTransactionNumber = 0, this.subscribers = /* @__PURE__ */ new Set(), this.editor = n, this.lastSnapshot = {
      editor: n,
      transactionNumber: 0
    }, this.getSnapshot = this.getSnapshot.bind(this), this.getServerSnapshot = this.getServerSnapshot.bind(this), this.watch = this.watch.bind(this), this.subscribe = this.subscribe.bind(this);
  }
  /**
  * Get the current editor instance.
  */
  getSnapshot() {
    return this.transactionNumber === this.lastTransactionNumber ? this.lastSnapshot : (this.lastTransactionNumber = this.transactionNumber, this.lastSnapshot = {
      editor: this.editor,
      transactionNumber: this.transactionNumber
    }, this.lastSnapshot);
  }
  /**
  * Always disable the editor on the server-side.
  */
  getServerSnapshot() {
    return {
      editor: null,
      transactionNumber: 0
    };
  }
  /**
  * Subscribe to the editor instance's changes.
  */
  subscribe(n) {
    return this.subscribers.add(n), () => {
      this.subscribers.delete(n);
    };
  }
  /**
  * Watch the editor instance for changes.
  */
  watch(n) {
    if (this.editor = n, this.editor) {
      let e;
      const t = (i) => {
        (i == null ? void 0 : i.transaction) !== void 0 && i.transaction === e || (e = i == null ? void 0 : i.transaction, this.transactionNumber += 1, this.subscribers.forEach((s) => s()));
      }, r = this.editor;
      return r.on("transaction", t), r.on("update", t), () => {
        r.off("transaction", t), r.off("update", t);
      };
    }
  }
};
function g0(n) {
  var e;
  const [t] = It(() => new m0(n.editor)), r = a0.useSyncExternalStoreWithSelector(t.subscribe, t.getSnapshot, t.getServerSnapshot, n.selector, (e = n.equalityFn) !== null && e !== void 0 ? e : i0);
  return p0(() => t.watch(n.editor), [n.editor, t]), wa(r), r;
}
const Jl = process.env.NODE_ENV !== "production", _u = typeof window > "u", y0 = _u || !!(typeof window < "u" && window.next);
var b0 = class Fu {
  constructor(e) {
    this.editor = null, this.subscriptions = /* @__PURE__ */ new Set(), this.isComponentMounted = !1, this.previousDeps = null, this.instanceId = "", this.options = e, this.subscriptions = /* @__PURE__ */ new Set(), this.setEditor(this.getInitialEditor()), this.scheduleDestroy(), this.getEditor = this.getEditor.bind(this), this.getServerSnapshot = this.getServerSnapshot.bind(this), this.subscribe = this.subscribe.bind(this), this.refreshEditorInstance = this.refreshEditorInstance.bind(this), this.scheduleDestroy = this.scheduleDestroy.bind(this), this.onRender = this.onRender.bind(this), this.createEditor = this.createEditor.bind(this);
  }
  setEditor(e) {
    this.editor = e, this.instanceId = Math.random().toString(36).slice(2, 9), this.subscriptions.forEach((t) => t());
  }
  getInitialEditor() {
    const e = this.options.current.immediatelyRender;
    let t = e ?? !0;
    return _u ? (t && Jl && console.warn("SSR detected. `immediatelyRender` has been set to false to avoid hydration mismatches"), t = !1) : y0 && e === void 0 && (t = !1, Jl && console.warn("Next.js detected. `immediatelyRender` defaults to false to avoid hydration mismatches. Pass `immediatelyRender: true` explicitly if you are rendering the editor only on the client.")), t ? this.createEditor() : null;
  }
  /**
  * Create a new editor instance. And attach event listeners.
  */
  createEditor() {
    return new by({
      ...this.options.current,
      onBeforeCreate: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onBeforeCreate) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onBlur: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onBlur) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onCreate: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onCreate) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onDestroy: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onDestroy) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onFocus: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onFocus) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onSelectionUpdate: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onSelectionUpdate) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onTransaction: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onTransaction) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onUpdate: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onUpdate) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onContentError: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onContentError) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onDrop: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onDrop) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onPaste: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onPaste) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onDelete: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onDelete) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onMount: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onMount) === null || t === void 0 ? void 0 : t.call(r, ...e);
      },
      onUnmount: (...e) => {
        var t, r;
        return (t = (r = this.options.current).onUnmount) === null || t === void 0 ? void 0 : t.call(r, ...e);
      }
    });
  }
  /**
  * Get the current editor instance.
  */
  getEditor() {
    return this.editor;
  }
  /**
  * Always disable the editor on the server-side.
  */
  getServerSnapshot() {
    return null;
  }
  /**
  * Subscribe to the editor instance's changes.
  */
  subscribe(e) {
    return this.subscriptions.add(e), () => {
      this.subscriptions.delete(e);
    };
  }
  static compareOptions(e, t) {
    return Object.keys(e).every((r) => [
      "onCreate",
      "onBeforeCreate",
      "onDestroy",
      "onUpdate",
      "onTransaction",
      "onFocus",
      "onBlur",
      "onSelectionUpdate",
      "onContentError",
      "onDrop",
      "onPaste"
    ].includes(r) ? !0 : r === "extensions" && e.extensions && t.extensions ? e.extensions.length !== t.extensions.length ? !1 : e.extensions.every((i, s) => {
      var o;
      return i === ((o = t.extensions) === null || o === void 0 ? void 0 : o[s]);
    }) : e[r] === t[r]);
  }
  /**
  * On each render, we will create, update, or destroy the editor instance.
  * @param deps The dependencies to watch for changes
  * @returns A cleanup function
  */
  onRender(e) {
    return () => (this.isComponentMounted = !0, clearTimeout(this.scheduledDestructionTimeout), this.editor && !this.editor.isDestroyed && e.length === 0 ? Fu.compareOptions(this.options.current, this.editor.options) || this.editor.setOptions({
      ...this.options.current,
      editable: this.editor.isEditable
    }) : this.refreshEditorInstance(e), () => {
      this.isComponentMounted = !1, this.scheduleDestroy();
    });
  }
  /**
  * Recreate the editor instance if the dependencies have changed.
  */
  refreshEditorInstance(e) {
    if (this.editor && !this.editor.isDestroyed) {
      if (this.previousDeps === null) {
        this.previousDeps = e;
        return;
      }
      if (this.previousDeps.length === e.length && this.previousDeps.every((t, r) => t === e[r])) return;
    }
    this.editor && !this.editor.isDestroyed && this.editor.destroy(), this.setEditor(this.createEditor()), this.previousDeps = e;
  }
  /**
  * Schedule the destruction of the editor instance.
  * This will only destroy the editor if it was not mounted on the next tick.
  * This is to avoid destroying the editor instance when it's actually still mounted.
  */
  scheduleDestroy() {
    const e = this.instanceId, t = this.editor;
    this.scheduledDestructionTimeout = setTimeout(() => {
      if (this.isComponentMounted && this.instanceId === e) {
        t && t.setOptions(this.options.current);
        return;
      }
      t && !t.isDestroyed && (t.destroy(), this.instanceId === e && this.setEditor(null));
    }, 1);
  }
};
function k0(n = {}, e = []) {
  const t = Jt(n);
  t.current = n;
  const [r] = It(() => new b0(t)), i = Ea.useSyncExternalStore(r.subscribe, r.getEditor, r.getServerSnapshot);
  return wa(i), je(r.onRender(e)), g0({
    editor: i,
    selector: ({ transactionNumber: s }) => n.shouldRerenderOnTransaction === !1 || n.shouldRerenderOnTransaction === void 0 ? null : n.immediatelyRender && s === 0 ? 0 : s + 1
  }), i;
}
const Hu = _s({ editor: null });
Hu.Consumer;
const S0 = _s({
  onDragStart: () => {
  },
  nodeViewContentChildren: void 0,
  nodeViewContentRef: () => {
  }
}), w0 = () => Ca(S0);
Ie.forwardRef((n, e) => {
  const { onDragStart: t } = w0();
  return /* @__PURE__ */ k(n.as || "div", {
    ...n,
    ref: e,
    "data-node-view-wrapper": "",
    onDragStart: t,
    style: {
      whiteSpace: "normal",
      ...n.style
    }
  });
});
Ie.createContext({ markViewContentRef: () => {
} });
const uo = _s({ get editor() {
  throw new Error("useTiptap must be used within a <Tiptap> provider");
} });
uo.displayName = "TiptapContext";
const x0 = () => Ca(uo);
function Vu({ children: n, ...e }) {
  const t = "editor" in e ? e.editor : e.instance;
  if (!t) throw new Error("Tiptap: An editor instance is required. Pass a non-null `editor` prop.");
  const r = Gt(() => ({ editor: t }), [t]), i = Gt(() => ({ editor: t }), [t]);
  return /* @__PURE__ */ k(Hu.Provider, {
    value: i,
    children: /* @__PURE__ */ k(uo.Provider, {
      value: r,
      children: n
    })
  });
}
Vu.displayName = "Tiptap";
function ju({ ...n }) {
  const { editor: e } = x0();
  return /* @__PURE__ */ k(zu, {
    editor: e,
    ...n
  });
}
ju.displayName = "Tiptap.Content";
Object.assign(Vu, {
  /**
  * The Tiptap Content component that renders the EditorContent with the editor instance from the context.
  * @see TiptapContent
  */
  Content: ju
});
const Wu = /* @__PURE__ */ new WeakSet(), Uu = /* @__PURE__ */ new WeakSet();
function yt(n) {
  const e = n;
  return Wu.add(e), e;
}
function Ts(n) {
  return Array.isArray(n) && Wu.has(n);
}
function qu(n) {
  return n.flatMap((e) => e == null ? [] : Array.isArray(e) && Uu.has(e) && !Ts(e) ? qu(e) : [e]);
}
function C0(n, e) {
  if (n === "slot") return 0;
  if (n instanceof Function) {
    const i = n(e);
    return Array.isArray(i) && !Ts(i) && !Uu.has(i) ? yt(i) : i;
  }
  const { children: t, ...r } = e ?? {};
  if (n === "svg") throw new Error("SVG elements are not supported in the JSX syntax, use the array syntax instead");
  if (Array.isArray(t)) {
    if (Ts(t)) return yt([
      n,
      r,
      t
    ]);
    if (t.length === 0) return yt([n, r]);
    const i = qu(t);
    return i.length === 0 ? yt([n, r]) : yt([
      n,
      r,
      ...i
    ]);
  }
  return t != null ? yt([
    n,
    r,
    t
  ]) : yt([n, r]);
}
const Or = (n, e) => C0(n, e), E0 = (n, e) => {
  var t;
  const { state: r } = n, { selection: i } = r;
  if (!i.empty) return !1;
  const { $from: s } = i;
  if (s.parentOffset !== 0) return !1;
  const o = s.depth - 1;
  if (o < 0) return !1;
  const l = s.node(o), a = s.index(o);
  if (a === 0) return !1;
  if (l.type === e) return n.commands.lift(e.name);
  const c = l.child(a - 1);
  if (c.type !== e || !(!((t = c.lastChild) === null || t === void 0) && t.isTextblock)) return !1;
  const u = s.before() - 1 - 1;
  return n.commands.command(({ tr: d, dispatch: f }) => {
    if (!f) return !0;
    const h = s.parent.content, p = new v(h, 0, 0);
    return d.replace(u, s.after(), p), d.setSelection(I.create(d.doc, u + h.size)), d.scrollIntoView(), f(d), !0;
  });
}, v0 = /^\s*>\s$/, M0 = he.create({
  name: "blockquote",
  addOptions() {
    return { HTMLAttributes: {} };
  },
  content: "block+",
  group: "block",
  defining: !0,
  parseHTML() {
    return [{ tag: "blockquote" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return /* @__PURE__ */ Or("blockquote", {
      ...V(this.options.HTMLAttributes, n),
      children: /* @__PURE__ */ Or("slot", {})
    });
  },
  parseMarkdown: (n, e) => {
    var t;
    const r = (t = e.parseBlockChildren) !== null && t !== void 0 ? t : e.parseChildren;
    return e.createNode("blockquote", void 0, r(n.tokens || []));
  },
  renderMarkdown: (n, e) => {
    if (!n.content) return "";
    const t = ">", r = [];
    return n.content.forEach((i, s) => {
      var o, l;
      const a = ((o = (l = e.renderChild) === null || l === void 0 ? void 0 : l.call(e, i, s)) !== null && o !== void 0 ? o : e.renderChildren([i])).split(`
`).map((c) => c.trim() === "" ? t : `${t} ${c}`);
      r.push(a.join(`
`));
    }), r.join(`
${t}
`);
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands: n }) => n.wrapIn(this.name),
      toggleBlockquote: () => ({ commands: n }) => n.toggleWrap(this.name),
      unsetBlockquote: () => ({ commands: n }) => n.lift(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote(),
      Backspace: () => E0(this.editor, this.type)
    };
  },
  addInputRules() {
    return [sn({
      find: v0,
      type: this.type
    })];
  }
}), T0 = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/, A0 = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g, O0 = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/, N0 = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g, I0 = Be.create({
  name: "bold",
  addOptions() {
    return { HTMLAttributes: {} };
  },
  parseHTML() {
    return [
      { tag: "strong" },
      {
        tag: "b",
        getAttrs: (n) => n.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight=400",
        clearMark: (n) => n.type.name === this.name
      },
      {
        style: "font-weight",
        getAttrs: (n) => /^(bold(er)?|[5-9]\d{2,})$/.test(n) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return /* @__PURE__ */ Or("strong", {
      ...V(this.options.HTMLAttributes, n),
      children: /* @__PURE__ */ Or("slot", {})
    });
  },
  markdownTokenName: "strong",
  parseMarkdown: (n, e) => e.applyMark("bold", e.parseInline(n.tokens || [])),
  markdownOptions: { htmlReopen: {
    open: "<strong>",
    close: "</strong>"
  } },
  renderMarkdown: (n, e) => `**${e.renderChildren(n)}**`,
  addCommands() {
    return {
      setBold: () => ({ commands: n }) => n.setMark(this.name),
      toggleBold: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetBold: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [Pt({
      find: T0,
      type: this.type
    }), Pt({
      find: O0,
      type: this.type
    })];
  },
  addPasteRules() {
    return [dt({
      find: A0,
      type: this.type
    }), dt({
      find: N0,
      type: this.type
    })];
  }
}), D0 = (n) => {
  const e = /`([^`]+)`(?!`)$/.exec(n);
  return !e || e.index > 0 && n[e.index - 1] === "`" ? null : {
    index: e.index,
    text: e[0],
    replaceWith: e[1]
  };
}, R0 = (n) => {
  const e = /`([^`]+)`(?!`)/g, t = [];
  let r;
  for (; (r = e.exec(n)) !== null; )
    r.index > 0 && n[r.index - 1] === "`" || t.push({
      index: r.index,
      text: r[0],
      replaceWith: r[1]
    });
  return t;
}, L0 = Be.create({
  name: "code",
  addOptions() {
    return { HTMLAttributes: {} };
  },
  excludes: "_",
  code: !0,
  exitable: !0,
  parseHTML() {
    return [{ tag: "code" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "code",
      V(this.options.HTMLAttributes, n),
      0
    ];
  },
  markdownTokenName: "codespan",
  parseMarkdown: (n, e) => e.applyMark("code", [{
    type: "text",
    text: n.text || ""
  }]),
  renderMarkdown: (n, e) => n.content ? `\`${e.renderChildren(n.content)}\`` : "",
  addCommands() {
    return {
      setCode: () => ({ commands: n }) => n.setMark(this.name),
      toggleCode: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetCode: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return { "Mod-e": () => this.editor.commands.toggleCode() };
  },
  addInputRules() {
    return [Pt({
      find: D0,
      type: this.type
    })];
  },
  addPasteRules() {
    return [dt({
      find: R0,
      type: this.type
    })];
  }
}), Vi = 4, P0 = /^```([a-z]+)?[\s\n]$/, B0 = /^~~~([a-z]+)?[\s\n]$/, $0 = he.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: !0,
      exitOnArrowDown: !0,
      exitOnArrowUp: !0,
      defaultLanguage: null,
      enableTabIndentation: !1,
      tabSize: Vi,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: !0,
  defining: !0,
  addAttributes() {
    return { language: {
      default: this.options.defaultLanguage,
      parseHTML: (n) => {
        var e;
        const { languageClassPrefix: t } = this.options;
        if (!t) return null;
        const r = [...((e = n.firstElementChild) === null || e === void 0 ? void 0 : e.classList) || []].filter((i) => i.startsWith(t)).map((i) => i.replace(t, ""))[0];
        return r || null;
      },
      rendered: !1
    } };
  },
  parseHTML() {
    return [{
      tag: "pre",
      preserveWhitespace: "full"
    }];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "pre",
      V(this.options.HTMLAttributes, e),
      [
        "code",
        { class: n.attrs.language ? this.options.languageClassPrefix + n.attrs.language : null },
        0
      ]
    ];
  },
  markdownTokenName: "code",
  parseMarkdown: (n, e) => {
    var t, r;
    return ((t = n.raw) === null || t === void 0 ? void 0 : t.startsWith("```")) === !1 && ((r = n.raw) === null || r === void 0 ? void 0 : r.startsWith("~~~")) === !1 && n.codeBlockStyle !== "indented" ? [] : e.createNode("codeBlock", { language: n.lang || null }, n.text ? [e.createTextNode(n.text)] : []);
  },
  renderMarkdown: (n, e) => {
    var t;
    let r = "";
    const i = ((t = n.attrs) === null || t === void 0 ? void 0 : t.language) || "";
    return n.content ? r = [
      `\`\`\`${i}`,
      e.renderChildren(n.content),
      "```"
    ].join(`
`) : r = `\`\`\`${i}

\`\`\``, r;
  },
  addCommands() {
    return {
      setCodeBlock: (n) => ({ commands: e }) => e.setNode(this.name, n),
      toggleCodeBlock: (n) => ({ commands: e }) => e.toggleNode(this.name, "paragraph", n)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      Backspace: () => {
        const { empty: n, $anchor: e } = this.editor.state.selection, t = e.pos === 1;
        return !n || e.parent.type.name !== this.name ? !1 : t || !e.parent.textContent.length ? this.editor.commands.clearNodes() : !1;
      },
      Tab: ({ editor: n }) => {
        var e;
        if (!this.options.enableTabIndentation) return !1;
        const t = (e = this.options.tabSize) !== null && e !== void 0 ? e : Vi, { state: r } = n, { selection: i } = r, { $from: s, empty: o } = i;
        if (s.parent.type !== this.type) return !1;
        const l = " ".repeat(t);
        return o ? n.commands.insertContent(l) : n.commands.command(({ tr: a }) => {
          const { from: c, to: u } = i, d = r.doc.textBetween(c, u, `
`, `
`).split(`
`).map((f) => l + f).join(`
`);
          return a.replaceWith(c, u, r.schema.text(d)), !0;
        });
      },
      "Shift-Tab": ({ editor: n }) => {
        var e;
        if (!this.options.enableTabIndentation) return !1;
        const t = (e = this.options.tabSize) !== null && e !== void 0 ? e : Vi, { state: r } = n, { selection: i } = r, { $from: s, empty: o } = i;
        return s.parent.type !== this.type ? !1 : o ? n.commands.command(({ tr: l }) => {
          var a;
          const { pos: c } = s, u = s.start(), d = s.end(), f = r.doc.textBetween(u, d, `
`, `
`).split(`
`);
          let h = 0, p = 0;
          const m = c - u;
          for (let S = 0; S < f.length; S += 1) {
            if (p + f[S].length >= m) {
              h = S;
              break;
            }
            p += f[S].length + 1;
          }
          const g = ((a = f[h].match(/^ */)) === null || a === void 0 ? void 0 : a[0]) || "", y = Math.min(g.length, t);
          if (y === 0) return !0;
          let b = u;
          for (let S = 0; S < h; S += 1) b += f[S].length + 1;
          return l.delete(b, b + y), c - b <= y && l.setSelection(I.create(l.doc, b)), !0;
        }) : n.commands.command(({ tr: l }) => {
          const { from: a, to: c } = i, u = r.doc.textBetween(a, c, `
`, `
`).split(`
`).map((d) => {
            var f;
            const h = ((f = d.match(/^ */)) === null || f === void 0 ? void 0 : f[0]) || "", p = Math.min(h.length, t);
            return d.slice(p);
          }).join(`
`);
          return l.replaceWith(a, c, r.schema.text(u)), !0;
        });
      },
      Enter: ({ editor: n }) => {
        if (!this.options.exitOnTripleEnter) return !1;
        const { state: e } = n, { selection: t } = e, { $from: r, empty: i } = t;
        if (!i || r.parent.type !== this.type) return !1;
        const s = r.parentOffset === r.parent.nodeSize - 2, o = r.parent.textContent.endsWith(`

`);
        return !s || !o ? !1 : n.chain().command(({ tr: l }) => (l.delete(r.pos - 2, r.pos), !0)).exitCode().run();
      },
      ArrowUp: ({ editor: n }) => {
        if (!this.options.exitOnArrowUp) return !1;
        const { state: e } = n, { selection: t } = e, { $from: r, empty: i } = t;
        if (!i || r.parent.type !== this.type || r.parentOffset !== 0) return !1;
        const s = r.before();
        return s > 0 ? !1 : n.commands.insertDefaultBlock({ pos: s });
      },
      ArrowDown: ({ editor: n }) => {
        if (!this.options.exitOnArrowDown) return !1;
        const { state: e } = n, { selection: t, doc: r } = e, { $from: i, empty: s } = t;
        if (!s || i.parent.type !== this.type || i.parentOffset !== i.parent.nodeSize - 2) return !1;
        const o = i.after();
        return o === void 0 ? !1 : r.nodeAt(o) ? n.commands.command(({ tr: l }) => (l.setSelection(D.near(r.resolve(o))), !0)) : n.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [Ms({
      find: P0,
      type: this.type,
      getAttributes: (n) => ({ language: n[1] })
    }), Ms({
      find: B0,
      type: this.type,
      getAttributes: (n) => ({ language: n[1] })
    })];
  },
  addProseMirrorPlugins() {
    return [new z({
      key: new W("codeBlockVSCodeHandler"),
      props: { handlePaste: (n, e) => {
        if (!e.clipboardData || this.editor.isActive(this.type.name)) return !1;
        const t = e.clipboardData.getData("text/plain"), r = e.clipboardData.getData("vscode-editor-data"), i = r ? JSON.parse(r) : void 0, s = i == null ? void 0 : i.mode;
        if (!t || !s) return !1;
        const { tr: o, schema: l } = n.state, a = l.text(t.replace(/\r\n?/g, `
`));
        return o.replaceSelectionWith(this.type.create({ language: s }, a)), o.selection.$from.parent.type !== this.type && o.setSelection(I.near(o.doc.resolve(Math.max(0, o.selection.from - 2)))), o.setMeta("paste", !0), n.dispatch(o), !0;
      } }
    })];
  }
}), z0 = he.create({
  name: "doc",
  topNode: !0,
  content: "block+",
  renderMarkdown: (n, e) => n.content ? e.renderChildren(n.content, `

`) : ""
}), _0 = he.create({
  name: "hardBreak",
  markdownTokenName: "br",
  addOptions() {
    return {
      keepMarks: !0,
      HTMLAttributes: {}
    };
  },
  inline: !0,
  group: "inline",
  selectable: !1,
  linebreakReplacement: !0,
  parseHTML() {
    return [{ tag: "br" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["br", V(this.options.HTMLAttributes, n)];
  },
  renderText() {
    return `
`;
  },
  renderMarkdown: () => `  
`,
  parseMarkdown: () => ({ type: "hardBreak" }),
  addCommands() {
    return { setHardBreak: () => ({ commands: n, chain: e, state: t, editor: r }) => n.first([() => n.exitCode(), () => n.command(() => {
      const { selection: i, storedMarks: s } = t;
      if (i.$from.parent.type.spec.isolating) return !1;
      const { keepMarks: o } = this.options, { splittableMarks: l } = r.extensionManager, a = s || i.$to.parentOffset && i.$from.marks();
      return e().insertContent({ type: this.name }).command(({ tr: c, dispatch: u }) => {
        if (u && a && o) {
          const d = a.filter((f) => l.includes(f.type.name));
          c.ensureMarks(d);
        }
        return !0;
      }).scrollIntoView().run();
    })]) };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
}), Ku = he.create({
  name: "heading",
  addOptions() {
    return {
      levels: [
        1,
        2,
        3,
        4,
        5,
        6
      ],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: !0,
  addAttributes() {
    return { level: {
      default: 1,
      rendered: !1
    } };
  },
  parseHTML() {
    return this.options.levels.map((n) => ({
      tag: `h${n}`,
      attrs: { level: n }
    }));
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      `h${this.options.levels.includes(n.attrs.level) ? n.attrs.level : this.options.levels[0]}`,
      V(this.options.HTMLAttributes, e),
      0
    ];
  },
  parseMarkdown: (n, e) => e.createNode("heading", { level: n.depth || 1 }, e.parseInline(n.tokens || [])),
  renderMarkdown: (n, e) => {
    var t;
    const r = !((t = n.attrs) === null || t === void 0) && t.level ? parseInt(n.attrs.level, 10) : 1, i = "#".repeat(r);
    return n.content ? `${i} ${e.renderChildren(n.content)}` : "";
  },
  addCommands() {
    return {
      setHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.setNode(this.name, n) : !1,
      toggleHeading: (n) => ({ commands: e }) => this.options.levels.includes(n.level) ? e.toggleNode(this.name, "paragraph", n) : !1
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce((n, e) => ({
      ...n,
      [`Mod-Alt-${e}`]: () => this.editor.commands.toggleHeading({ level: e })
    }), {});
  },
  addInputRules() {
    return this.options.levels.map((n) => Ms({
      find: new RegExp(`^(#{${Math.min(...this.options.levels)},${n}})\\s$`),
      type: this.type,
      getAttributes: { level: n }
    }));
  }
}), Ju = he.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {},
      nextNodeType: "paragraph"
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["hr", V(this.options.HTMLAttributes, n)];
  },
  markdownTokenName: "hr",
  parseMarkdown: (n, e) => e.createNode("horizontalRule"),
  renderMarkdown: () => "---",
  addCommands() {
    return { setHorizontalRule: () => ({ chain: n, state: e }) => {
      if (!Kg(e, e.schema.nodes[this.name])) return !1;
      const { selection: t } = e, { $to: r } = t, i = n();
      return wu(t) ? i.insertContentAt(r.pos, { type: this.name }) : i.insertContent({ type: this.name }), i.command(({ state: s, tr: o, dispatch: l }) => {
        if (l) {
          const { $to: a } = o.selection, c = a.end();
          if (a.nodeAfter) a.nodeAfter.isTextblock ? o.setSelection(I.create(o.doc, a.pos + 1)) : a.nodeAfter.isBlock ? o.setSelection(N.create(o.doc, a.pos)) : o.setSelection(I.create(o.doc, a.pos));
          else {
            const u = s.schema.nodes[this.options.nextNodeType] || a.parent.type.contentMatch.defaultType, d = u == null ? void 0 : u.create();
            d && (o.insert(c, d), o.setSelection(I.create(o.doc, c + 1)));
          }
          o.scrollIntoView();
        }
        return !0;
      }).run();
    } };
  },
  addInputRules() {
    return [ky({
      find: /^(?:---|—-|___\s|\*\*\*\s)$/,
      type: this.type
    })];
  }
}), F0 = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/, H0 = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g, V0 = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/, j0 = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g, W0 = Be.create({
  name: "italic",
  addOptions() {
    return { HTMLAttributes: {} };
  },
  parseHTML() {
    return [
      { tag: "em" },
      {
        tag: "i",
        getAttrs: (n) => n.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=normal",
        clearMark: (n) => n.type.name === this.name
      },
      { style: "font-style=italic" }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "em",
      V(this.options.HTMLAttributes, n),
      0
    ];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands: n }) => n.setMark(this.name),
      toggleItalic: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetItalic: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  markdownTokenName: "em",
  parseMarkdown: (n, e) => e.applyMark("italic", e.parseInline(n.tokens || [])),
  markdownOptions: { htmlReopen: {
    open: "<em>",
    close: "</em>"
  } },
  renderMarkdown: (n, e) => `*${e.renderChildren(n)}*`,
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [Pt({
      find: F0,
      type: this.type
    }), Pt({
      find: V0,
      type: this.type
    })];
  },
  addPasteRules() {
    return [dt({
      find: H0,
      type: this.type
    }), dt({
      find: j0,
      type: this.type
    })];
  }
}), U0 = "aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2", q0 = "ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2", As = "numeric", Os = "ascii", Ns = "alpha", xn = "asciinumeric", mn = "alphanumeric", Is = "domain", Gu = "emoji", K0 = "scheme", J0 = "slashscheme", ji = "whitespace";
function G0(n, e) {
  return n in e || (e[n] = []), e[n];
}
function Ct(n, e, t) {
  e[As] && (e[xn] = !0, e[mn] = !0), e[Os] && (e[xn] = !0, e[Ns] = !0), e[xn] && (e[mn] = !0), e[Ns] && (e[mn] = !0), e[mn] && (e[Is] = !0), e[Gu] && (e[Is] = !0);
  for (const r in e) {
    const i = G0(r, t);
    i.indexOf(n) < 0 && i.push(n);
  }
}
function Q0(n, e) {
  const t = {};
  for (const r in e)
    e[r].indexOf(n) >= 0 && (t[r] = !0);
  return t;
}
function ye(n = null) {
  this.j = {}, this.jr = [], this.jd = null, this.t = n;
}
ye.groups = {};
ye.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(n) {
    const e = this, t = e.j[n];
    if (t)
      return t;
    for (let r = 0; r < e.jr.length; r++) {
      const i = e.jr[r][0], s = e.jr[r][1];
      if (s && i.test(n))
        return s;
    }
    return e.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(n, e = !1) {
    return e ? n in this.j : !!this.go(n);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(n, e, t, r) {
    for (let i = 0; i < n.length; i++)
      this.tt(n[i], e, t, r);
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(n, e, t, r) {
    r = r || ye.groups;
    let i;
    return e && e.j ? i = e : (i = new ye(e), t && r && Ct(e, t, r)), this.jr.push([n, i]), i;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(n, e, t, r) {
    let i = this;
    const s = n.length;
    if (!s)
      return i;
    for (let o = 0; o < s - 1; o++)
      i = i.tt(n[o]);
    return i.tt(n[s - 1], e, t, r);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(n, e, t, r) {
    r = r || ye.groups;
    const i = this;
    if (e && e.j)
      return i.j[n] = e, e;
    const s = e;
    let o, l = i.go(n);
    if (l ? (o = new ye(), Object.assign(o.j, l.j), o.jr.push.apply(o.jr, l.jr), o.jd = l.jd, o.t = l.t) : o = new ye(), s) {
      if (r)
        if (o.t && typeof o.t == "string") {
          const a = Object.assign(Q0(o.t, r), t);
          Ct(s, a, r);
        } else t && Ct(s, t, r);
      o.t = s;
    }
    return i.j[n] = o, o;
  }
};
const R = (n, e, t, r, i) => n.ta(e, t, r, i), U = (n, e, t, r, i) => n.tr(e, t, r, i), Gl = (n, e, t, r, i) => n.ts(e, t, r, i), C = (n, e, t, r, i) => n.tt(e, t, r, i), He = "WORD", Ds = "UWORD", Qu = "ASCIINUMERICAL", Yu = "ALPHANUMERICAL", _n = "LOCALHOST", Rs = "TLD", Ls = "UTLD", pr = "SCHEME", qt = "SLASH_SCHEME", fo = "NUM", Ps = "WS", ho = "NL", Cn = "OPENBRACE", En = "CLOSEBRACE", Nr = "OPENBRACKET", Ir = "CLOSEBRACKET", Dr = "OPENPAREN", Rr = "CLOSEPAREN", Lr = "OPENANGLEBRACKET", Pr = "CLOSEANGLEBRACKET", Br = "FULLWIDTHLEFTPAREN", $r = "FULLWIDTHRIGHTPAREN", zr = "LEFTCORNERBRACKET", _r = "RIGHTCORNERBRACKET", Fr = "LEFTWHITECORNERBRACKET", Hr = "RIGHTWHITECORNERBRACKET", Vr = "FULLWIDTHLESSTHAN", jr = "FULLWIDTHGREATERTHAN", Wr = "AMPERSAND", Ur = "APOSTROPHE", qr = "ASTERISK", et = "AT", Kr = "BACKSLASH", Jr = "BACKTICK", Gr = "CARET", Et = "COLON", po = "COMMA", Qr = "DOLLAR", De = "DOT", Yr = "EQUALS", mo = "EXCLAMATION", Ce = "HYPHEN", vn = "PERCENT", Xr = "PIPE", Zr = "PLUS", ei = "POUND", Mn = "QUERY", go = "QUOTE", Xu = "FULLWIDTHMIDDLEDOT", yo = "SEMI", Re = "SLASH", Tn = "TILDE", ti = "UNDERSCORE", Zu = "EMOJI", ni = "SYM";
var ed = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ALPHANUMERICAL: Yu,
  AMPERSAND: Wr,
  APOSTROPHE: Ur,
  ASCIINUMERICAL: Qu,
  ASTERISK: qr,
  AT: et,
  BACKSLASH: Kr,
  BACKTICK: Jr,
  CARET: Gr,
  CLOSEANGLEBRACKET: Pr,
  CLOSEBRACE: En,
  CLOSEBRACKET: Ir,
  CLOSEPAREN: Rr,
  COLON: Et,
  COMMA: po,
  DOLLAR: Qr,
  DOT: De,
  EMOJI: Zu,
  EQUALS: Yr,
  EXCLAMATION: mo,
  FULLWIDTHGREATERTHAN: jr,
  FULLWIDTHLEFTPAREN: Br,
  FULLWIDTHLESSTHAN: Vr,
  FULLWIDTHMIDDLEDOT: Xu,
  FULLWIDTHRIGHTPAREN: $r,
  HYPHEN: Ce,
  LEFTCORNERBRACKET: zr,
  LEFTWHITECORNERBRACKET: Fr,
  LOCALHOST: _n,
  NL: ho,
  NUM: fo,
  OPENANGLEBRACKET: Lr,
  OPENBRACE: Cn,
  OPENBRACKET: Nr,
  OPENPAREN: Dr,
  PERCENT: vn,
  PIPE: Xr,
  PLUS: Zr,
  POUND: ei,
  QUERY: Mn,
  QUOTE: go,
  RIGHTCORNERBRACKET: _r,
  RIGHTWHITECORNERBRACKET: Hr,
  SCHEME: pr,
  SEMI: yo,
  SLASH: Re,
  SLASH_SCHEME: qt,
  SYM: ni,
  TILDE: Tn,
  TLD: Rs,
  UNDERSCORE: ti,
  UTLD: Ls,
  UWORD: Ds,
  WORD: He,
  WS: Ps
});
const ze = /[a-z]/, un = new RegExp("\\p{L}", "u"), Wi = new RegExp("\\p{Emoji}", "u"), _e = /\d/, Ui = /\s/, Ql = "\r", qi = `
`, Y0 = "️", X0 = "‍", Ki = "￼";
let sr = null, or = null;
function Z0(n = []) {
  const e = {};
  ye.groups = e;
  const t = new ye();
  sr == null && (sr = Yl(U0)), or == null && (or = Yl(q0)), C(t, "'", Ur), C(t, "{", Cn), C(t, "}", En), C(t, "[", Nr), C(t, "]", Ir), C(t, "(", Dr), C(t, ")", Rr), C(t, "<", Lr), C(t, ">", Pr), C(t, "（", Br), C(t, "）", $r), C(t, "「", zr), C(t, "」", _r), C(t, "『", Fr), C(t, "』", Hr), C(t, "＜", Vr), C(t, "＞", jr), C(t, "&", Wr), C(t, "*", qr), C(t, "@", et), C(t, "`", Jr), C(t, "^", Gr), C(t, ":", Et), C(t, ",", po), C(t, "$", Qr), C(t, ".", De), C(t, "=", Yr), C(t, "!", mo), C(t, "-", Ce), C(t, "%", vn), C(t, "|", Xr), C(t, "+", Zr), C(t, "#", ei), C(t, "?", Mn), C(t, '"', go), C(t, "/", Re), C(t, ";", yo), C(t, "~", Tn), C(t, "_", ti), C(t, "\\", Kr), C(t, "・", Xu);
  const r = U(t, _e, fo, {
    [As]: !0
  });
  U(r, _e, r);
  const i = U(r, ze, Qu, {
    [xn]: !0
  }), s = U(r, un, Yu, {
    [mn]: !0
  }), o = U(t, ze, He, {
    [Os]: !0
  });
  U(o, _e, i), U(o, ze, o), U(i, _e, i), U(i, ze, i);
  const l = U(t, un, Ds, {
    [Ns]: !0
  });
  U(l, ze), U(l, _e, s), U(l, un, l), U(s, _e, s), U(s, ze), U(s, un, s);
  const a = C(t, qi, ho, {
    [ji]: !0
  }), c = C(t, Ql, Ps, {
    [ji]: !0
  }), u = U(t, Ui, Ps, {
    [ji]: !0
  });
  C(t, Ki, u), C(c, qi, a), C(c, Ki, u), U(c, Ui, u), C(u, Ql), C(u, qi), U(u, Ui, u), C(u, Ki, u);
  const d = U(t, Wi, Zu, {
    [Gu]: !0
  });
  C(d, "#"), U(d, Wi, d), C(d, Y0, d);
  const f = C(d, X0);
  C(f, "#"), U(f, Wi, d);
  const h = [[ze, o], [_e, i]], p = [[ze, null], [un, l], [_e, s]];
  for (let m = 0; m < sr.length; m++)
    Ye(t, sr[m], Rs, He, h);
  for (let m = 0; m < or.length; m++)
    Ye(t, or[m], Ls, Ds, p);
  Ct(Rs, {
    tld: !0,
    ascii: !0
  }, e), Ct(Ls, {
    utld: !0,
    alpha: !0
  }, e), Ye(t, "file", pr, He, h), Ye(t, "mailto", pr, He, h), Ye(t, "http", qt, He, h), Ye(t, "https", qt, He, h), Ye(t, "ftp", qt, He, h), Ye(t, "ftps", qt, He, h), Ct(pr, {
    scheme: !0,
    ascii: !0
  }, e), Ct(qt, {
    slashscheme: !0,
    ascii: !0
  }, e), n = n.sort((m, g) => m[0] > g[0] ? 1 : -1);
  for (let m = 0; m < n.length; m++) {
    const g = n[m][0], b = n[m][1] ? {
      [K0]: !0
    } : {
      [J0]: !0
    };
    g.indexOf("-") >= 0 ? b[Is] = !0 : ze.test(g) ? _e.test(g) ? b[xn] = !0 : b[Os] = !0 : b[As] = !0, Gl(t, g, g, b);
  }
  return Gl(t, "localhost", _n, {
    ascii: !0
  }), t.jd = new ye(ni), {
    start: t,
    tokens: Object.assign({
      groups: e
    }, ed)
  };
}
function td(n, e) {
  const t = eb(e.replace(/[A-Z]/g, (l) => l.toLowerCase())), r = t.length, i = [];
  let s = 0, o = 0;
  for (; o < r; ) {
    let l = n, a = null, c = 0, u = null, d = -1, f = -1;
    for (; o < r && (a = l.go(t[o])); )
      l = a, l.accepts() ? (d = 0, f = 0, u = l) : d >= 0 && (d += t[o].length, f++), c += t[o].length, s += t[o].length, o++;
    s -= d, o -= f, c -= d, i.push({
      t: u.t,
      // token type/name
      v: e.slice(s - c, s),
      // string value
      s: s - c,
      // start index
      e: s
      // end index (excluding)
    });
  }
  return i;
}
function eb(n) {
  const e = [], t = n.length;
  let r = 0;
  for (; r < t; ) {
    let i = n.charCodeAt(r), s, o = i < 55296 || i > 56319 || r + 1 === t || (s = n.charCodeAt(r + 1)) < 56320 || s > 57343 ? n[r] : n.slice(r, r + 2);
    e.push(o), r += o.length;
  }
  return e;
}
function Ye(n, e, t, r, i) {
  let s;
  const o = e.length;
  for (let l = 0; l < o - 1; l++) {
    const a = e[l];
    n.j[a] ? s = n.j[a] : (s = new ye(r), s.jr = i.slice(), n.j[a] = s), n = s;
  }
  return s = new ye(t), s.jr = i.slice(), n.j[e[o - 1]] = s, s;
}
function Yl(n) {
  const e = [], t = [];
  let r = 0, i = "0123456789";
  for (; r < n.length; ) {
    let s = 0;
    for (; i.indexOf(n[r + s]) >= 0; )
      s++;
    if (s > 0) {
      e.push(t.join(""));
      for (let o = parseInt(n.substring(r, r + s), 10); o > 0; o--)
        t.pop();
      r += s;
    } else
      t.push(n[r]), r++;
  }
  return e;
}
const Fn = {
  defaultProtocol: "http",
  events: null,
  format: Xl,
  formatHref: Xl,
  nl2br: !1,
  tagName: "a",
  target: null,
  rel: null,
  validate: !0,
  truncate: 1 / 0,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
function bo(n, e = null) {
  let t = Object.assign({}, Fn);
  n && (t = Object.assign(t, n instanceof bo ? n.o : n));
  const r = t.ignoreTags, i = [];
  for (let s = 0; s < r.length; s++)
    i.push(r[s].toUpperCase());
  this.o = t, e && (this.defaultRender = e), this.ignoreTags = i;
}
bo.prototype = {
  o: Fn,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(n) {
    return n;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(n) {
    return this.get("validate", n.toString(), n);
  },
  // Private methods
  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(n, e, t) {
    const r = e != null;
    let i = this.o[n];
    return i && (typeof i == "object" ? (i = t.t in i ? i[t.t] : Fn[n], typeof i == "function" && r && (i = i(e, t))) : typeof i == "function" && r && (i = i(e, t.t, t)), i);
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(n, e, t) {
    let r = this.o[n];
    return typeof r == "function" && e != null && (r = r(e, t.t, t)), r;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(n) {
    const e = n.render(this);
    return (this.get("render", null, n) || this.defaultRender)(e, n.t, n);
  }
};
function Xl(n) {
  return n;
}
function nd(n, e) {
  this.t = "token", this.v = n, this.tk = e;
}
nd.prototype = {
  isLink: !1,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
   */
  toHref(n) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(n) {
    const e = this.toString(), t = n.get("truncate", e, this), r = n.get("format", e, this);
    return t && r.length > t ? r.substring(0, t) + "…" : r;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(n) {
    return n.get("formatHref", this.toHref(n.get("defaultProtocol")), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(n = Fn.defaultProtocol) {
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(n) {
    return {
      type: this.t,
      value: this.toFormattedString(n),
      isLink: this.isLink,
      href: this.toFormattedHref(n),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(n) {
    return n.get("validate", this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(n) {
    const e = this, t = this.toHref(n.get("defaultProtocol")), r = n.get("formatHref", t, this), i = n.get("tagName", t, e), s = this.toFormattedString(n), o = {}, l = n.get("className", t, e), a = n.get("target", t, e), c = n.get("rel", t, e), u = n.getObj("attributes", t, e), d = n.getObj("events", t, e);
    return o.href = r, l && (o.class = l), a && (o.target = a), c && (o.rel = c), u && Object.assign(o, u), {
      tagName: i,
      attributes: o,
      content: s,
      eventListeners: d
    };
  }
};
function gi(n, e) {
  class t extends nd {
    constructor(i, s) {
      super(i, s), this.t = n;
    }
  }
  for (const r in e)
    t.prototype[r] = e[r];
  return t.t = n, t;
}
const tb = gi("email", {
  isLink: !0,
  toHref() {
    return "mailto:" + this.toString();
  }
}), Zl = gi("text"), nb = gi("nl"), lr = gi("url", {
  isLink: !0,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(n = Fn.defaultProtocol) {
    return this.hasProtocol() ? this.v : `${n}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const n = this.tk;
    return n.length >= 2 && n[0].t !== _n && n[1].t === Et;
  }
}), xe = (n) => new ye(n);
function rb({
  groups: n
}) {
  const e = n.domain.concat([Wr, qr, et, Kr, Jr, Gr, Qr, Yr, Ce, fo, vn, Xr, Zr, ei, Re, ni, Tn, ti]), t = [Ur, Et, po, De, mo, vn, Mn, go, yo, Lr, Pr, Cn, En, Ir, Nr, Dr, Rr, Br, $r, zr, _r, Fr, Hr, Vr, jr], r = [Wr, Ur, qr, Kr, Jr, Gr, Qr, Yr, Ce, Cn, En, vn, Xr, Zr, ei, Mn, Re, ni, Tn, ti], i = xe(), s = C(i, Tn);
  R(s, r, s), R(s, n.domain, s);
  const o = xe(), l = xe(), a = xe();
  R(i, n.domain, o), R(i, n.scheme, l), R(i, n.slashscheme, a), R(o, r, s), R(o, n.domain, o);
  const c = C(o, et);
  C(s, et, c), C(l, et, c), C(a, et, c);
  const u = C(s, De);
  R(u, r, s), R(u, n.domain, s);
  const d = xe();
  R(c, n.domain, d), R(d, n.domain, d);
  const f = C(d, De);
  R(f, n.domain, d);
  const h = xe(tb);
  R(f, n.tld, h), R(f, n.utld, h), C(c, _n, h);
  const p = C(d, Ce);
  C(p, Ce, p), R(p, n.domain, d), R(h, n.domain, d), C(h, De, f), C(h, Ce, p);
  const m = C(o, Ce), g = C(o, De);
  C(m, Ce, m), R(m, n.domain, o), R(g, r, s), R(g, n.domain, o);
  const y = xe(lr);
  R(g, n.tld, y), R(g, n.utld, y), R(y, n.domain, o), R(y, r, s), C(y, De, g), C(y, Ce, m), C(y, et, c);
  const b = C(y, Et), S = xe(lr);
  R(b, n.numeric, S);
  const w = xe(lr), E = xe();
  R(w, e, w), R(w, t, E), R(E, e, w), R(E, t, E), C(y, Re, w), C(S, Re, w);
  const A = C(l, Et), T = C(a, Et), M = C(T, Re), L = C(M, Re);
  R(l, n.domain, o), C(l, De, g), C(l, Ce, m), R(a, n.domain, o), C(a, De, g), C(a, Ce, m), R(A, n.domain, w), C(A, Re, w), C(A, Mn, w), R(L, n.domain, w), R(L, e, w), C(L, Re, w);
  const pe = [
    [Cn, En],
    // {}
    [Nr, Ir],
    // []
    [Dr, Rr],
    // ()
    [Lr, Pr],
    // <>
    [Br, $r],
    // （）
    [zr, _r],
    // 「」
    [Fr, Hr],
    // 『』
    [Vr, jr]
    // ＜＞
  ];
  for (let mt = 0; mt < pe.length; mt++) {
    const [gt, me] = pe[mt], F = C(w, gt);
    C(E, gt, F);
    const J = xe(lr);
    R(F, e, J);
    const ge = xe();
    R(F, t, ge), C(F, me, w), R(J, e, J), R(J, t, ge), R(ge, e, J), R(ge, t, ge), C(J, me, w), C(ge, me, w);
  }
  return C(i, _n, y), C(i, ho, nb), {
    start: i,
    tokens: ed
  };
}
function ib(n, e, t) {
  let r = t.length, i = 0, s = [], o = [];
  for (; i < r; ) {
    let l = n, a = null, c = null, u = 0, d = null, f = -1;
    for (; i < r && !(a = l.go(t[i].t)); )
      o.push(t[i++]);
    for (; i < r && (c = a || l.go(t[i].t)); )
      a = null, l = c, l.accepts() ? (f = 0, d = l) : f >= 0 && f++, i++, u++;
    if (f < 0)
      i -= u, i < r && (o.push(t[i]), i++);
    else {
      o.length > 0 && (s.push(Ji(Zl, e, o)), o = []), i -= f, u -= f;
      const h = d.t, p = t.slice(i - u, i);
      s.push(Ji(h, e, p));
    }
  }
  return o.length > 0 && s.push(Ji(Zl, e, o)), s;
}
function Ji(n, e, t) {
  const r = t[0].s, i = t[t.length - 1].e, s = e.slice(r, i);
  return new n(s, t);
}
const sb = typeof console < "u" && console && console.warn || (() => {
}), ob = "until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.", H = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: !1
};
function lb() {
  return ye.groups = {}, H.scanner = null, H.parser = null, H.tokenQueue = [], H.pluginQueue = [], H.customSchemes = [], H.initialized = !1, H;
}
function ea(n, e = !1) {
  if (H.initialized && sb(`linkifyjs: already initialized - will not register custom scheme "${n}" ${ob}`), !/^[0-9a-z]+(-[0-9a-z]+)*$/.test(n))
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  H.customSchemes.push([n, e]);
}
function ab() {
  H.scanner = Z0(H.customSchemes);
  for (let n = 0; n < H.tokenQueue.length; n++)
    H.tokenQueue[n][1]({
      scanner: H.scanner
    });
  H.parser = rb(H.scanner.tokens);
  for (let n = 0; n < H.pluginQueue.length; n++)
    H.pluginQueue[n][1]({
      scanner: H.scanner,
      parser: H.parser
    });
  return H.initialized = !0, H;
}
function ko(n) {
  return H.initialized || ab(), ib(H.parser.start, n, td(H.scanner.start, n));
}
ko.scan = td;
function rd(n, e = null, t = null) {
  if (e && typeof e == "object") {
    if (t)
      throw Error(`linkifyjs: Invalid link type ${e}; must be a string`);
    t = e, e = null;
  }
  const r = new bo(t), i = ko(n), s = [];
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    l.isLink && (!e || l.t === e) && r.check(l) && s.push(l.toFormattedObject(r));
  }
  return s;
}
const So = "[\0-   ᠎ -\u2029 　]", cb = new RegExp(So), ub = new RegExp(`${So}$`), db = new RegExp(So, "g");
function fb(n) {
  return n.length === 1 ? n[0].isLink : n.length === 3 && n[1].isLink ? ["()", "[]"].includes(n[0].value + n[2].value) : !1;
}
function hb(n) {
  return new z({
    key: new W("autolink"),
    appendTransaction: (e, t, r) => {
      const i = e.some((l) => l.docChanged) && !t.doc.eq(r.doc), s = e.some((l) => l.getMeta("preventAutolink"));
      if (!i || s) return;
      const { tr: o } = r;
      if (pi(pu(t.doc, [...e])).forEach(({ newRange: l }) => {
        const a = jm(r.doc, l, (d) => d.isTextblock);
        let c, u;
        if (a.length > 1)
          c = a[0], u = r.doc.textBetween(c.pos, c.pos + c.node.nodeSize, void 0, " ");
        else if (a.length) {
          const d = r.doc.textBetween(l.from, l.to, " ", " ");
          if (!ub.test(d)) return;
          c = a[0], u = r.doc.textBetween(c.pos, l.to, void 0, " ");
        }
        if (c && u) {
          const d = u.split(cb).filter(Boolean);
          if (d.length <= 0) return !1;
          const f = d[d.length - 1], h = c.pos + u.lastIndexOf(f);
          if (!f) return !1;
          const p = ko(f).map((m) => m.toObject(n.defaultProtocol));
          if (!fb(p)) return !1;
          p.filter((m) => m.isLink).map((m) => ({
            ...m,
            from: h + m.start + 1,
            to: h + m.end + 1
          })).filter((m) => r.schema.marks.code ? !r.doc.rangeHasMark(m.from, m.to, r.schema.marks.code) : !0).filter((m) => n.validate(m.value)).filter((m) => n.shouldAutoLink(m.value)).forEach((m) => {
            ao(m.from, m.to, r.doc).some((g) => g.mark.type === n.type) || o.addMark(m.from, m.to, n.type.create({ href: m.href }));
          });
        }
      }), !!o.steps.length)
        return o;
    }
  });
}
function pb(n) {
  return new z({
    key: new W("handleClickLink"),
    props: { handleClick: (e, t, r) => {
      if (r.button !== 0 || !e.editable) return !1;
      let i = null;
      if (r.target instanceof HTMLAnchorElement) i = r.target;
      else {
        const a = r.target;
        if (!a) return !1;
        const c = n.editor.view.dom;
        i = a.closest("a"), i && !c.contains(i) && (i = null);
      }
      if (!i) return !1;
      let s = !1;
      if (n.enableClickSelection && (s = n.editor.commands.extendMarkRange(n.type.name)), n.openOnClick) {
        var o, l;
        const a = Su(e.state, n.type.name), c = (o = i.href) !== null && o !== void 0 ? o : a.href, u = (l = i.target) !== null && l !== void 0 ? l : a.target;
        c && (window.open(c, u), s = !0);
      }
      return s;
    } }
  });
}
const mb = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)$/, gb = /\[([^[\]]+)\]\(((?:[^\s()]|\([^\s()]*\))+)(?:\s+(?:(["'])(.*?)\3|“(.*?)”|‘(.*?)’))?\)/g;
function id(n, e) {
  let t = 0;
  for (let r = e - 1; r >= 0 && n[r] === "\\"; r -= 1) t += 1;
  return t % 2 === 1;
}
function yb(n, e) {
  let t = 0, r = 0;
  for (; r < e; ) {
    if (n[r] !== "`") {
      r += 1;
      continue;
    }
    if (t === 0 && id(n, r)) {
      r += 1;
      continue;
    }
    let i = 0;
    for (; r < e && n[r] === "`"; )
      i += 1, r += 1;
    t === 0 ? t = i : i === t && (t = 0);
  }
  return t > 0;
}
function sd(n, e, t) {
  var r, i;
  const [, s, o] = e;
  return (e.index ? n[e.index - 1] : void 0) === "!" || id(n, (r = e.index) !== null && r !== void 0 ? r : 0) || yb(n, (i = e.index) !== null && i !== void 0 ? i : 0) ? !1 : !!s.trim() && t(o);
}
function od(n) {
  var e, t;
  const [r, i, s, , o, l, a] = n, c = (e = o ?? l) !== null && e !== void 0 ? e : a;
  return {
    index: (t = n.index) !== null && t !== void 0 ? t : 0,
    text: r,
    replaceWith: i,
    data: {
      href: s,
      title: c || null,
      markdown: !0
    }
  };
}
function bb(n, e) {
  return n.index < e.index + e.text.length && e.index < n.index + n.text.length;
}
function ld(n) {
  var e, t, r;
  return {
    href: (e = n.data) === null || e === void 0 ? void 0 : e.href,
    title: (t = (r = n.data) === null || r === void 0 ? void 0 : r.title) !== null && t !== void 0 ? t : null
  };
}
function kb(n) {
  const e = Pt({
    find: (t) => {
      const r = mb.exec(t);
      return !r || !sd(t, r, n.isAllowedHref) ? null : od(r);
    },
    type: n.type,
    getAttributes: ld
  });
  return new ln({
    find: e.find,
    handler: (t) => {
      const r = e.handler(t);
      return r !== null && t.state.tr.steps.length && t.state.tr.setMeta("preventAutolink", !0), r;
    }
  });
}
function Sb(n) {
  const e = dt({
    find: (t) => {
      var r, i;
      const s = [];
      for (const l of t.matchAll(gb)) sd(t, l, n.isAllowedHref) && s.push(od(l));
      const o = ((r = (i = n.findPlainUrls) === null || i === void 0 ? void 0 : i.call(n, t)) !== null && r !== void 0 ? r : []).filter((l) => !s.some((a) => bb(a, l)));
      return [...s, ...o];
    },
    type: n.type,
    getAttributes: ld
  });
  return new Lu({
    find: e.find,
    handler: (t) => {
      var r;
      const i = e.handler(t);
      return i !== null && t.state.tr.steps.length && (!((r = t.match.data) === null || r === void 0) && r.markdown) && t.state.tr.setMeta("preventAutolink", !0), i;
    }
  });
}
function wb(n) {
  return new z({
    key: new W("handlePasteLink"),
    props: { handlePaste: (e, t, r) => {
      const { shouldAutoLink: i } = n, { state: s } = e, { selection: o } = s, { empty: l } = o;
      if (l) return !1;
      let a = "";
      r.content.forEach((u) => {
        a += u.textContent;
      });
      const c = rd(a, { defaultProtocol: n.defaultProtocol }).find((u) => u.isLink && u.value === a);
      return !a || !c || i !== void 0 && !i(c.value) ? !1 : n.editor.commands.setMark(n.type, { href: c.href });
    } }
  });
}
function Fe(n, e) {
  const t = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp"
  ];
  return e && e.forEach((r) => {
    const i = typeof r == "string" ? r : r.scheme;
    i && t.push(i);
  }), !n || n.replace(db, "").match(new RegExp(`^(?:(?:${t.map((r) => r.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")}):|[^a-z]|[a-z0-9+.\\-]+(?:[^a-z+.\\-:]|$))`, "i"));
}
const ad = Be.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: !1,
  exitable: !0,
  onCreate() {
    this.options.validate && !this.options.shouldAutoLink && (this.options.shouldAutoLink = this.options.validate, console.warn("The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead.")), this.options.protocols.forEach((n) => {
      if (typeof n == "string") {
        ea(n);
        return;
      }
      ea(n.scheme, n.optionalSlashes);
    });
  },
  onDestroy() {
    lb();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: !0,
      enableClickSelection: !1,
      linkOnPaste: !0,
      markdownLinks: !1,
      autolink: !0,
      protocols: [],
      defaultProtocol: "http",
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      isAllowedUri: (n, e) => !!Fe(n, e.protocols),
      validate: (n) => !!n,
      shouldAutoLink: (n) => {
        const e = /^[a-z][a-z0-9+.-]*:\/\//i.test(n), t = /^[a-z][a-z0-9+.-]*:/i.test(n);
        if (e || t && !n.includes("@")) return !0;
        const r = (n.includes("@") ? n.split("@").pop() : n).split(/[/?#:]/)[0];
        return !(/^\d{1,3}(\.\d{1,3}){3}$/.test(r) || !/\./.test(r));
      }
    };
  },
  addAttributes() {
    var n, e, t;
    return {
      href: {
        default: null,
        parseHTML(r) {
          return r.getAttribute("href");
        }
      },
      target: { default: (n = this.options.HTMLAttributes.target) !== null && n !== void 0 ? n : null },
      rel: { default: (e = this.options.HTMLAttributes.rel) !== null && e !== void 0 ? e : null },
      class: { default: (t = this.options.HTMLAttributes.class) !== null && t !== void 0 ? t : null },
      title: { default: null }
    };
  },
  parseHTML() {
    return [{
      tag: "a[href]",
      getAttrs: (n) => {
        const e = n.getAttribute("href");
        return !e || !this.options.isAllowedUri(e, {
          defaultValidate: (t) => !!Fe(t, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? !1 : null;
      }
    }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return this.options.isAllowedUri(n.href, {
      defaultValidate: (e) => !!Fe(e, this.options.protocols),
      protocols: this.options.protocols,
      defaultProtocol: this.options.defaultProtocol
    }) ? [
      "a",
      V(this.options.HTMLAttributes, n),
      0
    ] : [
      "a",
      V(this.options.HTMLAttributes, {
        ...n,
        href: ""
      }),
      0
    ];
  },
  markdownTokenName: "link",
  parseMarkdown: (n, e) => e.applyMark("link", e.parseInline(n.tokens || []), {
    href: n.href,
    title: n.title || null
  }),
  renderMarkdown: (n, e) => {
    var t, r, i, s;
    const o = (t = (r = n.attrs) === null || r === void 0 ? void 0 : r.href) !== null && t !== void 0 ? t : "", l = (i = (s = n.attrs) === null || s === void 0 ? void 0 : s.title) !== null && i !== void 0 ? i : "", a = e.renderChildren(n);
    return l ? `[${a}](${o} "${l}")` : `[${a}](${o})`;
  },
  addCommands() {
    return {
      setLink: (n) => ({ chain: e }) => {
        const { href: t } = n;
        return this.options.isAllowedUri(t, {
          defaultValidate: (r) => !!Fe(r, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? e().setMark(this.name, n).setMeta("preventAutolink", !0).run() : !1;
      },
      toggleLink: (n) => ({ chain: e }) => {
        const { href: t } = n || {};
        return t && !this.options.isAllowedUri(t, {
          defaultValidate: (r) => !!Fe(r, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        }) ? !1 : e().toggleMark(this.name, n, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run();
      },
      unsetLink: () => ({ chain: n }) => n().unsetMark(this.name, { extendEmptyMarkRange: !0 }).setMeta("preventAutolink", !0).run()
    };
  },
  addInputRules() {
    return this.options.markdownLinks ? [kb({
      type: this.type,
      isAllowedHref: (n) => this.options.isAllowedUri(n, {
        defaultValidate: (e) => !!Fe(e, this.options.protocols),
        protocols: this.options.protocols,
        defaultProtocol: this.options.defaultProtocol
      })
    })] : [];
  },
  addPasteRules() {
    const n = (e) => {
      const t = [];
      if (e) {
        const { protocols: r, defaultProtocol: i } = this.options;
        rd(e).filter((s) => s.isLink && this.options.isAllowedUri(s.value, {
          defaultValidate: (o) => !!Fe(o, r),
          protocols: r,
          defaultProtocol: i
        })).forEach((s) => {
          this.options.shouldAutoLink(s.value) && t.push({
            text: s.value,
            data: { href: s.href },
            index: s.start
          });
        });
      }
      return t;
    };
    return this.options.markdownLinks ? [Sb({
      type: this.type,
      isAllowedHref: (e) => this.options.isAllowedUri(e, {
        defaultValidate: (t) => !!Fe(t, this.options.protocols),
        protocols: this.options.protocols,
        defaultProtocol: this.options.defaultProtocol
      }),
      findPlainUrls: n
    })] : [dt({
      find: n,
      type: this.type,
      getAttributes: (e) => {
        var t;
        return { href: (t = e.data) === null || t === void 0 ? void 0 : t.href };
      }
    })];
  },
  addProseMirrorPlugins() {
    const n = [], { protocols: e, defaultProtocol: t } = this.options;
    return this.options.autolink && n.push(hb({
      type: this.type,
      defaultProtocol: this.options.defaultProtocol,
      validate: (r) => this.options.isAllowedUri(r, {
        defaultValidate: (i) => !!Fe(i, e),
        protocols: e,
        defaultProtocol: t
      }),
      shouldAutoLink: this.options.shouldAutoLink
    })), n.push(pb({
      type: this.type,
      editor: this.editor,
      openOnClick: this.options.openOnClick === "whenNotEditable" ? !0 : this.options.openOnClick,
      enableClickSelection: this.options.enableClickSelection
    })), this.options.linkOnPaste && n.push(wb({
      editor: this.editor,
      defaultProtocol: this.options.defaultProtocol,
      type: this.type,
      shouldAutoLink: this.options.shouldAutoLink
    })), n;
  }
}), xb = "listItem", ta = "textStyle", na = /^\s*([-+*])\s$/, cd = he.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [{ tag: "ul" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "ul",
      V(this.options.HTMLAttributes, n),
      0
    ];
  },
  markdownTokenName: "list",
  parseMarkdown: (n, e) => n.type !== "list" || n.ordered ? [] : {
    type: "bulletList",
    content: n.items ? e.parseChildren(n.items) : []
  },
  renderMarkdown: (n, e) => n.content ? e.renderChildren(n.content, `
`) : "",
  markdownOptions: { indentsContent: !0 },
  addCommands() {
    return { toggleBulletList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(xb, this.editor.getAttributes(ta)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
  },
  addKeyboardShortcuts() {
    return { "Mod-Shift-8": () => this.editor.commands.toggleBulletList() };
  },
  addInputRules() {
    let n = sn({
      find: na,
      type: this.type
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (n = sn({
      find: na,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: () => this.editor.getAttributes(ta),
      editor: this.editor
    })), [n];
  }
}), Cb = (n, e, t) => {
  const { selection: r } = n;
  if (!r.empty) return null;
  const { $from: i } = r;
  if (!i.parent.isTextblock || i.parentOffset !== i.parent.content.size) return null;
  let s = -1;
  for (let h = i.depth; h > 0; h -= 1) if (i.node(h).type.name === e) {
    s = h;
    break;
  }
  if (s < 0) return null;
  const o = i.node(s), l = i.index(s);
  if (l + 1 >= o.childCount) return null;
  const a = o.child(l + 1);
  if (!t.includes(a.type.name)) return null;
  const c = n.schema.nodes[e];
  let u = !1;
  if (a.forEach((h) => {
    h.type === c && h.childCount > 1 && (u = !0);
  }), !u) return null;
  const d = n.doc.resolve(i.after()).nodeAfter;
  if (!d || !t.includes(d.type.name)) return null;
  const f = [];
  return d.forEach((h) => {
    f.push(h);
  }), f.length === 0 ? null : {
    listItemDepth: s,
    nestedList: d,
    nestedListPos: i.after(),
    insertPos: i.after(s),
    items: f
  };
}, Eb = (n, e, t, r) => {
  const i = Cb(n, t, r);
  if (!i) return !1;
  const { selection: s } = n, { nestedList: o, nestedListPos: l, insertPos: a, items: c } = i, u = n.tr;
  u.delete(l, l + o.nodeSize);
  const d = u.mapping.map(a);
  return u.insert(d, x.from(c)), u.setSelection(s.map(u.doc, u.mapping)), e && e(u), !0;
}, vb = (n, e, t) => Eb(n.state, n.view.dispatch, e, t), ud = (n, e) => $.create({
  name: `${n}BranchingDeleteKeymap`,
  priority: 101,
  addKeyboardShortcuts() {
    const t = () => vb(this.editor, n, e);
    return {
      Delete: t,
      "Mod-Delete": t
    };
  }
}), dd = [
  [1e3, "m"],
  [900, "cm"],
  [500, "d"],
  [400, "cd"],
  [100, "c"],
  [90, "xc"],
  [50, "l"],
  [40, "xl"],
  [10, "x"],
  [9, "ix"],
  [5, "v"],
  [4, "iv"],
  [1, "i"]
], ar = "abcdefghijklmnopqrstuvwxyz", fd = String.raw`\d+|[ivxlcdmIVXLCDM]+|${"[a-zA-Z]{1,2}"}`;
function yi(n) {
  let e = n, t = "";
  for (const [r, i] of dd) for (; e >= r; )
    t += i, e -= r;
  return t;
}
function wo(n) {
  return yi(n).toUpperCase();
}
function hd(n) {
  const e = n.toLowerCase();
  let t = 0, r = 0;
  for (; t < e.length; ) {
    let i = !1;
    for (const [s, o] of dd) if (e.startsWith(o, t)) {
      r += s, t += o.length, i = !0;
      break;
    }
    if (!i) return 0;
  }
  return r;
}
function Mb(n) {
  if (!/^[ivxlcdmIVXLCDM]+$/.test(n)) return !1;
  const e = hd(n);
  return e <= 0 ? !1 : (n === n.toLowerCase() ? yi(e) : wo(e)) === n;
}
function Tb(n) {
  const e = n.toLowerCase();
  if (e.length === 1) return e.charCodeAt(0) - 97 + 1;
  if (e.length === 2) {
    const t = e.charCodeAt(0) - 97, r = e.charCodeAt(1) - 97;
    return (t + 1) * 26 + r + 1;
  }
  return 0;
}
function ri(n) {
  if (n <= 26) return ar[n - 1];
  const e = Math.floor((n - 1) / 26) - 1, t = (n - 1) % 26;
  return e < 0 ? ar[t] : ar[e] + ar[t];
}
function bi(n) {
  if (!(!n || /^\d+$/.test(n))) {
    if (Mb(n)) return n === n.toLowerCase() ? "i" : "I";
    if (/^[a-z]{1,2}$/.test(n)) return "a";
    if (/^[A-Z]{1,2}$/.test(n)) return "A";
  }
}
function xo(n) {
  if (/^\d+$/.test(n)) return parseInt(n, 10);
  const e = bi(n);
  if (e === "i" || e === "I") return hd(n);
  if (e === "a" || e === "A") {
    const r = Tb(n);
    return r > 0 ? r : 1;
  }
  const t = parseInt(n, 10);
  return Number.isNaN(t) ? 1 : t;
}
function Ab(n, e) {
  if (n === "numeric") return String(e);
  switch (n) {
    case "a":
      return ri(e);
    case "A":
      return ri(e).toUpperCase();
    case "i":
      return yi(e);
    case "I":
      return wo(e);
    default:
      return String(e);
  }
}
function Ob(n) {
  var e;
  if (n.length === 0) return !1;
  const t = (e = bi(n[0])) !== null && e !== void 0 ? e : "numeric", r = xo(n[0]);
  if (r < 1) return !1;
  for (let i = 0; i < n.length; i++) {
    const s = Ab(t, r + i);
    if (n[i] !== s) return !1;
  }
  return !0;
}
function Nb(n) {
  return {
    type: bi(n),
    start: xo(n)
  };
}
function Ib(n) {
  const { type: e, start: t } = Nb(n), r = {};
  return e && (r.type = e), t !== 1 && (r.start = t), r;
}
function Db(n, e, t = ". ") {
  const r = e + 1;
  if (!n || n === "1") return `${r}${t}`;
  switch (n) {
    case "a":
      return `${ri(r)}${t}`;
    case "A":
      return `${ri(r).toUpperCase()}${t}`;
    case "i":
      return `${yi(r)}${t}`;
    case "I":
      return `${wo(r)}${t}`;
    default:
      return `${r}${t}`;
  }
}
function Rb(n) {
  var e, t;
  const r = (e = n.tokens) === null || e === void 0 ? void 0 : e[0];
  return !!(n.text && ((t = n.tokens) === null || t === void 0 ? void 0 : t.length) === 1 && (r == null ? void 0 : r.type) === "list" && r.ordered && r.raw === n.text);
}
function Lb(n, e) {
  return e.tokenizeInline ? e.parseInline(e.tokenizeInline(n)) : e.parseInline([{
    type: "text",
    raw: n,
    text: n
  }]);
}
const pd = he.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: !0,
  parseHTML() {
    return [{ tag: "li" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "li",
      V(this.options.HTMLAttributes, n),
      0
    ];
  },
  markdownTokenName: "list_item",
  parseMarkdown: (n, e) => {
    var t;
    if (n.type !== "list_item") return [];
    const r = (t = e.parseBlockChildren) !== null && t !== void 0 ? t : e.parseChildren;
    let i = [];
    if (n.tokens && n.tokens.length > 0) {
      if (Rb(n)) return {
        type: "listItem",
        content: [{
          type: "paragraph",
          content: Lb(n.text || "", e)
        }]
      };
      if (n.tokens.some((s) => s.type === "paragraph")) i = r(n.tokens);
      else {
        const s = n.tokens[0];
        if (s && s.type === "text" && s.tokens && s.tokens.length > 0) {
          if (i = [{
            type: "paragraph",
            content: e.parseInline(s.tokens)
          }], n.tokens.length > 1) {
            const o = r(n.tokens.slice(1));
            i.push(...o);
          }
        } else i = r(n.tokens);
      }
    }
    return i.length === 0 && (i = [{
      type: "paragraph",
      content: []
    }]), {
      type: "listItem",
      content: i
    };
  },
  renderMarkdown: (n, e, t) => Iu(n, e, (r) => {
    if (r.parentType === "bulletList") return "- ";
    if (r.parentType === "orderedList") {
      var i, s;
      const o = ((i = r.meta) === null || i === void 0 || (i = i.parentAttrs) === null || i === void 0 ? void 0 : i.start) || 1;
      return Db((s = r.meta) === null || s === void 0 || (s = s.parentAttrs) === null || s === void 0 ? void 0 : s.type, o - 1 + (r.index || 0), ". ");
    }
    return "- ";
  }, t),
  addExtensions() {
    return [ud(this.name, [this.options.bulletListTypeName, this.options.orderedListTypeName])];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
}), Co = (n, e) => {
  const { $from: t } = e.selection, r = Y(n, e.schema);
  let i = null, s = t.depth, o = t.pos, l = null;
  for (; s > 0 && l === null; )
    i = t.node(s), i.type === r ? l = s : (s -= 1, o -= 1);
  return l === null ? null : {
    $pos: e.doc.resolve(o),
    depth: l
  };
}, md = (n, e) => {
  const t = Co(n, e);
  if (!t) return !1;
  const [, r] = eg(e, n, t.$pos.pos + 4);
  return r;
}, Pb = (n, e, t) => {
  const { $anchor: r } = n.selection, i = Math.max(0, r.pos - 2), s = n.doc.resolve(i).node();
  return !(!s || !t.includes(s.type.name));
}, ra = (n, e, t) => {
  if (n.commands.undoInputRule()) return !0;
  if (n.state.selection.from !== n.state.selection.to) return !1;
  if (!Ge(n.state, e) && Pb(n.state, e, t)) {
    const { $anchor: s } = n.state.selection, o = n.state.doc.resolve(s.before() - 1), l = [];
    o.node().descendants((u, d) => {
      u.type.name === e && l.push({
        node: u,
        pos: d
      });
    });
    const a = l.at(-1);
    if (!a) return !1;
    const c = n.state.doc.resolve(o.start() + a.pos + 1);
    return n.chain().cut({
      from: s.start() - 1,
      to: s.end() + 1
    }, c.end()).joinForward().run();
  }
  if (!Ge(n.state, e) || !sg(n.state)) return !1;
  const { $from: r } = n.state.selection, i = r.depth - 1;
  return r.node(i).type !== n.schema.nodes[e] || r.index(i) !== 0 ? !1 : n.chain().liftListItem(e).run();
}, Bb = (n, e) => {
  const t = md(n, e), r = Co(n, e);
  return !r || !t ? !1 : t > r.depth;
}, $b = (n, e) => {
  const t = md(n, e), r = Co(n, e);
  return !r || !t ? !1 : t < r.depth;
}, ia = (n, e) => {
  if (!Ge(n.state, e) || !ig(n.state, e)) return !1;
  const { selection: t } = n.state, { $from: r, $to: i } = t;
  return !t.empty && r.sameParent(i) ? !1 : Bb(e, n.state) ? n.chain().focus(n.state.selection.from + 4).lift(e).joinBackward().run() : $b(e, n.state) ? n.chain().joinForward().joinBackward().run() : n.commands.joinItemForward();
}, zb = (n, e, t) => {
  const { state: r } = n, { selection: i } = r;
  if (!i.empty) return !1;
  const { $from: s } = i;
  if (s.parentOffset !== 0 || !s.parent.isTextblock || Ge(r, e)) return !1;
  const o = tg(s);
  if (!o || !t.includes(o.type.name)) return !1;
  const l = o.lastChild;
  if (!l || l.type.name !== e) return !1;
  const a = s.parent;
  if (!l.canReplace(l.childCount, l.childCount, x.from(a))) return !1;
  const c = s.before(), u = s.after(), d = c - 2;
  return n.commands.command(({ tr: f, dispatch: h }) => (h && (f.delete(c, u).insert(d, x.from(a)), f.setSelection(I.create(f.doc, d + 1)), f.scrollIntoView()), !0));
}, gd = $.create({
  name: "listKeymap",
  addOptions() {
    return { listTypes: [{
      itemName: "listItem",
      wrapperNames: ["bulletList", "orderedList"]
    }, {
      itemName: "taskItem",
      wrapperNames: ["taskList"]
    }] };
  },
  addKeyboardShortcuts() {
    return {
      Delete: ({ editor: n }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: t }) => {
          n.state.schema.nodes[t] !== void 0 && ia(n, t) && (e = !0);
        }), e;
      },
      "Mod-Delete": ({ editor: n }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: t }) => {
          n.state.schema.nodes[t] !== void 0 && ia(n, t) && (e = !0);
        }), e;
      },
      Backspace: ({ editor: n }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: t, wrapperNames: r }) => {
          n.state.schema.nodes[t] !== void 0 && ra(n, t, r) && (e = !0);
        }), e;
      },
      "Mod-Backspace": ({ editor: n }) => {
        let e = !1;
        return this.options.listTypes.forEach(({ itemName: t, wrapperNames: r }) => {
          n.state.schema.nodes[t] !== void 0 && ra(n, t, r) && (e = !0);
        }), e;
      },
      Tab: ({ editor: n }) => {
        for (const { itemName: e, wrapperNames: t } of this.options.listTypes)
          if (n.state.schema.nodes[e] !== void 0 && zb(n, e, t))
            return !0;
        return !1;
      }
    };
  }
}), Bs = new RegExp(`^(\\s*)(${fd})([.)])\\s+(.*)$`), _b = /^\s/, Kt = {
  heading: /^#{1,6}(?:\s|$)/,
  bulletItem: /^[-+*]\s+/,
  codeFence: /^(?:```|~~~)/,
  blockMath: /^\$\$/,
  thematicBreak: /^(?:(?:-[ \t]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})$/
};
function Fb(n) {
  return Bs.test(n.trimStart());
}
function Hb(n) {
  const e = n.trimStart();
  return Kt.bulletItem.test(e) || Fb(e) || Kt.heading.test(e) || Kt.thematicBreak.test(e) && !e.startsWith("-") || /^>\s?/.test(e) || Kt.codeFence.test(e) || Kt.blockMath.test(e);
}
function Vb(n) {
  return Object.values(Kt).some((e) => e.test(n));
}
function jb(n) {
  const e = [], t = [];
  let r = !1;
  return n.forEach((i) => {
    if (r) {
      t.push(i);
      return;
    }
    if (i.trim() === "") {
      r = !0, t.push(i);
      return;
    }
    if (e.length > 0 && Hb(i)) {
      r = !0, t.push(i);
      return;
    }
    e.push(i);
  }), {
    paragraphLines: e,
    blockLines: t
  };
}
function Wb(n) {
  const e = [];
  let t = 0, r = 0;
  for (; t < n.length; ) {
    const i = n[t], s = i.match(Bs);
    if (!s) break;
    const [, o, l, a, c] = s, u = o.length, d = parseInt(l, 10), f = isNaN(d) ? bi(l) : void 0, h = isNaN(d) ? xo(l) : d, p = [c];
    let m = t + 1;
    const g = [i];
    let y = !1;
    for (; m < n.length; ) {
      const b = n[m];
      if (b.match(Bs)) break;
      if (b.trim() === "")
        g.push(b), p.push(""), y = !0, m += 1;
      else if (b.match(_b)) {
        const S = b.length - b.trimStart().length, w = u + l.length + 1;
        g.push(b), p.push(b.slice(Math.min(S, w))), m += 1;
      } else {
        if (y || Vb(b)) break;
        g.push(b), p.push(b), m += 1;
      }
    }
    e.push({
      indent: u,
      number: h,
      type: f,
      content: p.join(`
`).trim(),
      contentLines: p,
      raw: g.join(`
`)
    }), r = m, t = m;
  }
  return [e, r];
}
const Ub = new RegExp(`^(${fd})([.)])\\s+(.+)$`);
function qb(n) {
  const e = n.split(`
`).filter((r) => r.trim().length > 0);
  if (e.length === 0) return null;
  const t = [];
  for (const r of e) {
    const i = r.trim().match(Ub);
    if (!i) return null;
    t.push({
      marker: i[1],
      content: i[3]
    });
  }
  return Ob(t.map((r) => r.marker)) ? {
    type: "orderedList",
    attrs: Ib(t[0].marker),
    content: t.map((r) => ({
      type: "listItem",
      content: [{
        type: "paragraph",
        content: [{
          type: "text",
          text: r.content
        }]
      }]
    }))
  } : null;
}
function yd(n, e, t) {
  const r = [];
  let i = 0;
  for (; i < n.length; ) {
    const s = n[i];
    if (s.indent === e) {
      const { paragraphLines: o, blockLines: l } = jb(s.contentLines), a = o.join(`
`).trim(), c = [];
      a && c.push({
        type: "paragraph",
        raw: a,
        tokens: t.inlineTokens(a)
      });
      const u = l.join(`
`).trim();
      if (u) {
        const h = t.blockTokens(u);
        c.push(...h);
      }
      let d = i + 1;
      const f = [];
      for (; d < n.length && n[d].indent > e; )
        f.push(n[d]), d += 1;
      if (f.length > 0) {
        const h = yd(f, Math.min(...f.map((p) => p.indent)), t);
        c.push({
          type: "list",
          ordered: !0,
          start: f[0].number,
          typeMarker: f[0].type,
          items: h,
          raw: f.map((p) => p.raw).join(`
`)
        });
      }
      r.push({
        type: "list_item",
        raw: s.raw,
        tokens: c
      }), i = d;
    } else i += 1;
  }
  return r;
}
function Kb(n, e) {
  return n.map((t) => {
    if (t.type !== "list_item") return e.parseChildren([t])[0];
    const r = [];
    return t.tokens && t.tokens.length > 0 && t.tokens.forEach((i) => {
      if (i.type === "paragraph" || i.type === "list" || i.type === "blockquote" || i.type === "code") r.push(...e.parseChildren([i]));
      else if (i.type === "text" && i.tokens) {
        const s = e.parseChildren([i]);
        r.push({
          type: "paragraph",
          content: s
        });
      } else {
        const s = e.parseChildren([i]);
        s.length > 0 && r.push(...s);
      }
    }), {
      type: "listItem",
      content: r
    };
  });
}
const Jb = "listItem", sa = "textStyle", oa = /^(\d+)\.\s$/;
function la(n) {
  const e = n.match(/list-style-type\s*:\s*([^;]+)/i);
  if (!e) return null;
  switch (e[1].trim().toLowerCase()) {
    case "upper-roman":
      return "I";
    case "lower-roman":
      return "i";
    case "upper-alpha":
    case "upper-latin":
      return "A";
    case "lower-alpha":
    case "lower-latin":
      return "a";
    default:
      return null;
  }
}
const bd = he.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: !1,
      keepAttributes: !1
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (n) => n.hasAttribute("start") ? parseInt(n.getAttribute("start") || "", 10) : 1
      },
      type: {
        default: null,
        parseHTML: (n) => {
          const e = n.getAttribute("type");
          if (e) return e;
          const t = n.getAttribute("style");
          if (t) {
            const i = la(t);
            if (i) return i;
          }
          const r = n.querySelector("li");
          if (r) {
            const i = r.getAttribute("style");
            if (i) {
              const s = la(i);
              if (s) return s;
            }
          }
          return null;
        }
      }
    };
  },
  parseHTML() {
    return [{ tag: "ol" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    const { start: e, type: t, ...r } = n, i = V(this.options.HTMLAttributes, r);
    return e !== 1 && (i.start = e), t && t !== "1" && (i.type = t), [
      "ol",
      i,
      0
    ];
  },
  markdownTokenName: "list",
  parseMarkdown: (n, e) => {
    if (n.type !== "list" || !n.ordered) return [];
    const t = n.start || 1, r = n.typeMarker, i = n.items ? Kb(n.items, e) : [], s = {};
    return t !== 1 && (s.start = t), r && (s.type = r), Object.keys(s).length > 0 ? {
      type: "orderedList",
      attrs: s,
      content: i
    } : {
      type: "orderedList",
      content: i
    };
  },
  renderMarkdown: (n, e) => n.content ? e.renderChildren(n.content, `
`) : "",
  markdownTokenizer: {
    name: "orderedList",
    level: "block",
    start: () => -1,
    tokenize: (n, e, t) => {
      var r, i;
      const s = n.split(`
`), [o, l] = Wb(s);
      if (o.length === 0) return;
      const a = yd(o, o[0].indent, t);
      if (a.length !== 0)
        return {
          type: "list",
          ordered: !0,
          start: ((r = o[0]) === null || r === void 0 ? void 0 : r.number) || 1,
          typeMarker: (i = o[0]) === null || i === void 0 ? void 0 : i.type,
          items: a,
          raw: s.slice(0, l).join(`
`)
        };
    }
  },
  markdownOptions: { indentsContent: !0 },
  addCommands() {
    return { toggleOrderedList: () => ({ commands: n, chain: e }) => this.options.keepAttributes ? e().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(Jb, this.editor.getAttributes(sa)).run() : n.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks) };
  },
  addKeyboardShortcuts() {
    return { "Mod-Shift-7": () => this.editor.commands.toggleOrderedList() };
  },
  addProseMirrorPlugins() {
    return [new z({ props: { handlePaste: (n, e) => {
      var t, r;
      const i = (t = e.clipboardData) === null || t === void 0 ? void 0 : t.getData("text/html");
      if (i != null && i.trim()) return !1;
      const s = (r = e.clipboardData) === null || r === void 0 ? void 0 : r.getData("text/plain");
      if (!s) return !1;
      const o = qb(s);
      if (!o) return !1;
      try {
        const l = n.state.schema.nodeFromJSON(o), a = n.state.tr.replaceSelectionWith(l);
        return n.dispatch(a), !0;
      } catch {
        return !1;
      }
    } } })];
  },
  addInputRules() {
    const n = (t, r) => (!r.attrs.type || r.attrs.type === "1") && r.childCount + r.attrs.start === +t[1];
    let e = sn({
      find: oa,
      type: this.type,
      getAttributes: (t) => ({ start: +t[1] }),
      joinPredicate: n
    });
    return (this.options.keepMarks || this.options.keepAttributes) && (e = sn({
      find: oa,
      type: this.type,
      keepMarks: this.options.keepMarks,
      keepAttributes: this.options.keepAttributes,
      getAttributes: (t) => ({
        start: +t[1],
        ...this.editor.getAttributes(sa)
      }),
      joinPredicate: n,
      editor: this.editor
    })), [e];
  }
}), Gb = /^\s*(\[([( |x])?\])\s$/, Qb = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0", Yb = (n, e, t) => {
  var r;
  return (t == null || (r = t.checkboxLabel) === null || r === void 0 ? void 0 : r.call(t, n, e)) || `Task item checkbox for ${n.textContent || "empty task item"}`;
}, Xb = he.create({
  name: "taskItem",
  addOptions() {
    return {
      nested: !1,
      HTMLAttributes: {},
      taskListTypeName: "taskList",
      a11y: void 0
    };
  },
  content() {
    return this.options.nested ? "paragraph block*" : "paragraph+";
  },
  defining: !0,
  addAttributes() {
    return { checked: {
      default: !1,
      keepOnSplit: !1,
      parseHTML: (n) => {
        const e = n.getAttribute("data-checked");
        return e === "" || e === "true";
      },
      renderHTML: (n) => ({ "data-checked": n.checked })
    } };
  },
  parseHTML() {
    return [{
      tag: `li[data-type="${this.name}"]`,
      priority: 51,
      contentElement: (n) => {
        var e;
        return (e = n.querySelector("div")) !== null && e !== void 0 ? e : n;
      }
    }];
  },
  renderHTML({ node: n, HTMLAttributes: e }) {
    return [
      "li",
      V(this.options.HTMLAttributes, e, { "data-type": this.name }),
      [
        "label",
        ["input", {
          type: "checkbox",
          checked: n.attrs.checked ? "checked" : null
        }],
        ["span"]
      ],
      ["div", 0]
    ];
  },
  parseMarkdown: (n, e) => {
    const t = [];
    if (n.tokens && n.tokens.length > 0 ? t.push(e.createNode("paragraph", {}, e.parseInline(n.tokens))) : n.text ? t.push(e.createNode("paragraph", {}, [e.createNode("text", { text: n.text })])) : t.push(e.createNode("paragraph", {}, [])), n.nestedTokens && n.nestedTokens.length > 0) {
      const r = e.parseChildren(n.nestedTokens);
      t.push(...r);
    }
    return e.createNode("taskItem", { checked: n.checked || !1 }, t);
  },
  renderMarkdown: (n, e) => {
    var t;
    return Iu(n, e, `- [${!((t = n.attrs) === null || t === void 0) && t.checked ? "x" : " "}] `);
  },
  addExtensions() {
    return this.options.nested ? [ud(this.name, [this.options.taskListTypeName])] : [];
  },
  addKeyboardShortcuts() {
    const n = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
    return this.options.nested ? {
      ...n,
      Tab: () => this.editor.commands.sinkListItem(this.name)
    } : n;
  },
  addNodeView() {
    return ({ node: n, HTMLAttributes: e, getPos: t, editor: r }) => {
      const i = document.createElement("li"), s = document.createElement("label"), o = document.createElement("span"), l = document.createElement("input"), a = document.createElement("div");
      o.style.cssText = Qb;
      const c = (d) => {
        const f = Yb(d, d.attrs.checked, this.options.a11y);
        l.setAttribute("aria-label", f), o.textContent = f;
      };
      c(n), s.contentEditable = "false", l.type = "checkbox", l.addEventListener("mousedown", (d) => d.preventDefault()), l.addEventListener("change", (d) => {
        if (!r.isEditable && !this.options.onReadOnlyChecked) {
          l.checked = !l.checked;
          return;
        }
        const { checked: f } = d.target;
        r.isEditable && typeof t == "function" && r.chain().focus(void 0, { scrollIntoView: !1 }).command(({ tr: h }) => {
          const p = t();
          if (typeof p != "number") return !1;
          const m = h.doc.nodeAt(p);
          return h.setNodeMarkup(p, void 0, {
            ...m == null ? void 0 : m.attrs,
            checked: f
          }), !0;
        }).run(), !r.isEditable && this.options.onReadOnlyChecked && (this.options.onReadOnlyChecked(n, f) || (l.checked = !l.checked));
      }), Object.entries(this.options.HTMLAttributes).forEach(([d, f]) => {
        i.setAttribute(d, f);
      }), i.dataset.checked = n.attrs.checked, l.checked = n.attrs.checked, s.append(l, o), i.append(s, a), Object.entries(e).forEach(([d, f]) => {
        i.setAttribute(d, f);
      });
      let u = new Set(Object.keys(e));
      return {
        dom: i,
        contentDOM: a,
        update: (d) => {
          if (d.type !== this.type) return !1;
          i.dataset.checked = d.attrs.checked, l.checked = d.attrs.checked, c(d);
          const f = r.extensionManager.attributes, h = zn(d, f), p = new Set(Object.keys(h)), m = this.options.HTMLAttributes;
          return u.forEach((g) => {
            p.has(g) || (g in m ? i.setAttribute(g, m[g]) : i.removeAttribute(g));
          }), Object.entries(h).forEach(([g, y]) => {
            y == null ? g in m ? i.setAttribute(g, m[g]) : i.removeAttribute(g) : i.setAttribute(g, y);
          }), u = p, !0;
        }
      };
    };
  },
  addInputRules() {
    return [sn({
      find: Gb,
      type: this.type,
      getAttributes: (n) => ({ checked: n[n.length - 1] === "x" })
    })];
  }
}), Zb = he.create({
  name: "taskList",
  addOptions() {
    return {
      itemTypeName: "taskItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [{
      tag: `ul[data-type="${this.name}"]`,
      priority: 51
    }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "ul",
      V(this.options.HTMLAttributes, n, { "data-type": this.name }),
      0
    ];
  },
  parseMarkdown: (n, e) => e.createNode("taskList", {}, e.parseChildren(n.items || [])),
  renderMarkdown: (n, e) => n.content ? e.renderChildren(n.content, `
`) : "",
  markdownTokenizer: {
    name: "taskList",
    level: "block",
    start(n) {
      var e;
      const t = (e = n.match(/^\s*[-+*]\s+\[([ xX])\]\s+/)) === null || e === void 0 ? void 0 : e.index;
      return t !== void 0 ? t : -1;
    },
    tokenize(n, e, t) {
      const r = (s) => {
        const o = zl(s, {
          itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
          extractItemData: (l) => ({
            indentLevel: l[1].length,
            mainContent: l[4],
            checked: l[3].toLowerCase() === "x"
          }),
          createToken: (l, a) => ({
            type: "taskItem",
            raw: "",
            mainContent: l.mainContent,
            indentLevel: l.indentLevel,
            checked: l.checked,
            text: l.mainContent,
            tokens: t.inlineTokens(l.mainContent),
            nestedTokens: a
          }),
          customNestedParser: r
        }, t);
        if (o) {
          const l = {
            type: "taskList",
            raw: o.raw,
            items: o.items
          }, a = s.slice(o.raw.length);
          return a.trim() ? [l, ...t.blockTokens(a)] : [l];
        }
        return t.blockTokens(s);
      }, i = zl(n, {
        itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
        extractItemData: (s) => ({
          indentLevel: s[1].length,
          mainContent: s[4],
          checked: s[3].toLowerCase() === "x"
        }),
        createToken: (s, o) => ({
          type: "taskItem",
          raw: "",
          mainContent: s.mainContent,
          indentLevel: s.indentLevel,
          checked: s.checked,
          text: s.mainContent,
          tokens: t.inlineTokens(s.mainContent),
          nestedTokens: o
        }),
        customNestedParser: r
      }, t);
      if (i)
        return {
          type: "taskList",
          raw: i.raw,
          items: i.items
        };
    }
  },
  markdownOptions: { indentsContent: !0 },
  addCommands() {
    return { toggleTaskList: () => ({ commands: n }) => n.toggleList(this.name, this.options.itemTypeName) };
  },
  addKeyboardShortcuts() {
    return { "Mod-Shift-9": () => this.editor.commands.toggleTaskList() };
  }
});
$.create({
  name: "listKit",
  addExtensions() {
    const n = [];
    return this.options.bulletList !== !1 && n.push(cd.configure(this.options.bulletList)), this.options.listItem !== !1 && n.push(pd.configure(this.options.listItem)), this.options.listKeymap !== !1 && n.push(gd.configure(this.options.listKeymap)), this.options.orderedList !== !1 && n.push(bd.configure(this.options.orderedList)), this.options.taskItem !== !1 && n.push(Xb.configure(this.options.taskItem)), this.options.taskList !== !1 && n.push(Zb.configure(this.options.taskList)), n;
  }
});
const cr = "&nbsp;", Gi = " ", ek = he.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return { HTMLAttributes: {} };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: "p" }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "p",
      V(this.options.HTMLAttributes, n),
      0
    ];
  },
  parseMarkdown: (n, e) => {
    const t = n.tokens || [];
    if (t.length === 1 && t[0].type === "image") return e.parseChildren([t[0]]);
    const r = e.parseInline(t);
    return t.length === 1 && t[0].type === "text" && (t[0].raw === cr || t[0].text === cr || t[0].raw === Gi || t[0].text === Gi) && r.length === 1 && r[0].type === "text" && (r[0].text === cr || r[0].text === Gi) ? e.createNode("paragraph", void 0, []) : e.createNode("paragraph", void 0, r);
  },
  renderMarkdown: (n, e, t) => {
    if (!n) return "";
    const r = Array.isArray(n.content) ? n.content : [];
    if (r.length === 0) {
      var i, s;
      const o = Array.isArray(t == null || (i = t.previousNode) === null || i === void 0 ? void 0 : i.content) ? t.previousNode.content : [];
      return (t == null || (s = t.previousNode) === null || s === void 0 ? void 0 : s.type) === "paragraph" && o.length === 0 ? cr : "";
    }
    return e.renderChildren(r);
  },
  addCommands() {
    return { setParagraph: () => ({ commands: n }) => n.setNode(this.name) };
  },
  addKeyboardShortcuts() {
    return { "Mod-Alt-0": () => this.editor.commands.setParagraph() };
  }
}), tk = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/, nk = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g, rk = Be.create({
  name: "strike",
  addOptions() {
    return { HTMLAttributes: {} };
  },
  parseHTML() {
    return [
      { tag: "s" },
      { tag: "del" },
      { tag: "strike" },
      {
        style: "text-decoration",
        consuming: !1,
        getAttrs: (n) => n.includes("line-through") ? {} : !1
      }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "s",
      V(this.options.HTMLAttributes, n),
      0
    ];
  },
  markdownTokenName: "del",
  parseMarkdown: (n, e) => e.applyMark("strike", e.parseInline(n.tokens || [])),
  renderMarkdown: (n, e) => `~~${e.renderChildren(n)}~~`,
  addCommands() {
    return {
      setStrike: () => ({ commands: n }) => n.setMark(this.name),
      toggleStrike: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetStrike: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return { "Mod-Shift-s": () => this.editor.commands.toggleStrike() };
  },
  addInputRules() {
    return [Pt({
      find: tk,
      type: this.type
    })];
  },
  addPasteRules() {
    return [dt({
      find: nk,
      type: this.type
    })];
  }
}), ik = he.create({
  name: "text",
  group: "inline",
  parseMarkdown: (n) => ({
    type: "text",
    text: n.text || ""
  }),
  renderMarkdown: (n) => n.text || ""
}), sk = Be.create({
  name: "underline",
  addOptions() {
    return { HTMLAttributes: {} };
  },
  parseHTML() {
    return [{ tag: "u" }, {
      style: "text-decoration",
      consuming: !1,
      getAttrs: (n) => n.includes("underline") ? {} : !1
    }];
  },
  renderHTML({ HTMLAttributes: n }) {
    return [
      "u",
      V(this.options.HTMLAttributes, n),
      0
    ];
  },
  parseMarkdown(n, e) {
    return e.applyMark(this.name || "underline", e.parseInline(n.tokens || []));
  },
  renderMarkdown(n, e) {
    return `++${e.renderChildren(n)}++`;
  },
  markdownTokenizer: {
    name: "underline",
    level: "inline",
    start(n) {
      return n.indexOf("++");
    },
    tokenize(n, e, t) {
      const r = /^(\+\+)([\s\S]+?)(\+\+)/.exec(n);
      if (!r) return;
      const i = r[2].trim();
      return {
        type: "underline",
        raw: r[0],
        text: i,
        tokens: t.inlineTokens(i)
      };
    }
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands: n }) => n.setMark(this.name),
      toggleUnderline: () => ({ commands: n }) => n.toggleMark(this.name),
      unsetUnderline: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
});
function ok(n = {}) {
  return new z({
    view(e) {
      return new lk(e, n);
    }
  });
}
class lk {
  constructor(e, t) {
    var r;
    this.editorView = e, this.cursorPos = null, this.element = null, this.timeout = -1, this.lastDragEvent = null, this.width = (r = t.width) !== null && r !== void 0 ? r : 1, this.color = t.color === !1 ? void 0 : t.color || "black", this.class = t.class, this.handlers = ["dragover", "dragend", "drop", "dragleave"].map((i) => {
      let s = (o) => {
        this[i](o);
      };
      return e.dom.addEventListener(i, s), { name: i, handler: s };
    });
  }
  destroy() {
    this.handlers.forEach(({ name: e, handler: t }) => this.editorView.dom.removeEventListener(e, t));
  }
  update(e, t) {
    if (this.cursorPos != null && t.doc != e.state.doc)
      if (this.lastDragEvent) {
        let r = this.computeTarget(this.lastDragEvent);
        r == this.cursorPos ? this.updateOverlay() : this.setCursor(r);
      } else
        this.updateOverlay();
  }
  setCursor(e) {
    e != this.cursorPos && (this.cursorPos = e, e == null ? (this.element.parentNode.removeChild(this.element), this.element = null) : this.updateOverlay());
  }
  updateOverlay() {
    let e = this.editorView.state.doc.resolve(this.cursorPos), t = !e.parent.inlineContent, r, i = this.editorView.dom, s = i.getBoundingClientRect(), o = s.width / i.offsetWidth, l = s.height / i.offsetHeight;
    if (t) {
      let d = e.nodeBefore, f = e.nodeAfter;
      if (d || f) {
        let h = this.editorView.nodeDOM(this.cursorPos - (d ? d.nodeSize : 0));
        if (h) {
          let p = h.getBoundingClientRect(), m = d ? p.bottom : p.top;
          d && f && (m = (m + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2);
          let g = this.width / 2 * l;
          r = { left: p.left, right: p.right, top: m - g, bottom: m + g };
        }
      }
    }
    if (!r) {
      let d = this.editorView.coordsAtPos(this.cursorPos), f = this.width / 2 * o;
      r = { left: d.left - f, right: d.left + f, top: d.top, bottom: d.bottom };
    }
    let a = this.editorView.dom.offsetParent;
    this.element || (this.element = a.appendChild(document.createElement("div")), this.class && (this.element.className = this.class), this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;", this.color && (this.element.style.backgroundColor = this.color)), this.element.classList.toggle("prosemirror-dropcursor-block", t), this.element.classList.toggle("prosemirror-dropcursor-inline", !t);
    let c, u;
    if (!a || a == document.body && getComputedStyle(a).position == "static")
      c = -pageXOffset, u = -pageYOffset;
    else {
      let d = a.getBoundingClientRect(), f = d.width / a.offsetWidth, h = d.height / a.offsetHeight;
      c = d.left - a.scrollLeft * f, u = d.top - a.scrollTop * h;
    }
    this.element.style.left = (r.left - c) / o + "px", this.element.style.top = (r.top - u) / l + "px", this.element.style.width = (r.right - r.left) / o + "px", this.element.style.height = (r.bottom - r.top) / l + "px";
  }
  scheduleRemoval(e) {
    clearTimeout(this.timeout), this.timeout = setTimeout(() => this.setCursor(null), e);
  }
  computeTarget(e) {
    let t = this.editorView.posAtCoords({ left: e.clientX, top: e.clientY }), r = t && t.inside >= 0 && this.editorView.state.doc.nodeAt(t.inside), i = r && r.type.spec.disableDropCursor, s = typeof i == "function" ? i(this.editorView, t, e) : i;
    if (!t || s)
      return null;
    let o = t.pos;
    if (this.editorView.dragging && this.editorView.dragging.slice) {
      let l = Za(this.editorView.state.doc, o, this.editorView.dragging.slice);
      l != null && (o = l);
    }
    return o;
  }
  dragover(e) {
    if (!this.editorView.editable)
      return;
    this.lastDragEvent = e;
    let t = this.computeTarget(e);
    t != null && (this.setCursor(t), this.scheduleRemoval(5e3));
  }
  dragend() {
    this.scheduleRemoval(20);
  }
  drop() {
    this.scheduleRemoval(20);
  }
  dragleave(e) {
    this.editorView.dom.contains(e.relatedTarget) || this.setCursor(null);
  }
}
class q extends D {
  /**
  Create a gap cursor.
  */
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    let r = e.resolve(t.map(this.head));
    return q.valid(r) ? new q(r) : D.near(r);
  }
  content() {
    return v.empty;
  }
  eq(e) {
    return e instanceof q && e.head == this.head;
  }
  toJSON() {
    return { type: "gapcursor", pos: this.head };
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.pos != "number")
      throw new RangeError("Invalid input for GapCursor.fromJSON");
    return new q(e.resolve(t.pos));
  }
  /**
  @internal
  */
  getBookmark() {
    return new Eo(this.anchor);
  }
  /**
  @internal
  */
  static valid(e) {
    let t = e.parent;
    if (t.inlineContent || !ak(e) || !ck(e))
      return !1;
    let r = t.type.spec.allowGapCursor;
    if (r != null)
      return r;
    let i = t.contentMatchAt(e.index()).defaultType;
    return i && i.isTextblock;
  }
  /**
  @internal
  */
  static findGapCursorFrom(e, t, r = !1) {
    e: for (; ; ) {
      if (!r && q.valid(e))
        return e;
      let i = e.pos, s = null;
      for (let o = e.depth; ; o--) {
        let l = e.node(o);
        if (t > 0 ? e.indexAfter(o) < l.childCount : e.index(o) > 0) {
          s = l.child(t > 0 ? e.indexAfter(o) : e.index(o) - 1);
          break;
        } else if (o == 0)
          return null;
        i += t;
        let a = e.doc.resolve(i);
        if (q.valid(a))
          return a;
      }
      for (; ; ) {
        let o = t > 0 ? s.firstChild : s.lastChild;
        if (!o) {
          if (s.isAtom && !s.isText && !N.isSelectable(s)) {
            e = e.doc.resolve(i + s.nodeSize * t), r = !1;
            continue e;
          }
          break;
        }
        s = o, i += t;
        let l = e.doc.resolve(i);
        if (q.valid(l))
          return l;
      }
      return null;
    }
  }
}
q.prototype.visible = !1;
q.findFrom = q.findGapCursorFrom;
D.jsonID("gapcursor", q);
class Eo {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new Eo(e.map(this.pos));
  }
  resolve(e) {
    let t = e.resolve(this.pos);
    return q.valid(t) ? new q(t) : D.near(t);
  }
}
function kd(n) {
  return n.isAtom || n.spec.isolating || n.spec.createGapCursor;
}
function ak(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.index(e), r = n.node(e);
    if (t == 0) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t - 1); ; i = i.lastChild) {
      if (i.childCount == 0 && !i.inlineContent || kd(i.type))
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function ck(n) {
  for (let e = n.depth; e >= 0; e--) {
    let t = n.indexAfter(e), r = n.node(e);
    if (t == r.childCount) {
      if (r.type.spec.isolating)
        return !0;
      continue;
    }
    for (let i = r.child(t); ; i = i.firstChild) {
      if (i.childCount == 0 && !i.inlineContent || kd(i.type))
        return !0;
      if (i.inlineContent)
        return !1;
    }
  }
  return !0;
}
function uk() {
  return new z({
    props: {
      decorations: pk,
      createSelectionBetween(n, e, t) {
        return e.pos == t.pos && q.valid(t) ? new q(t) : null;
      },
      handleClick: fk,
      handleKeyDown: dk,
      handleDOMEvents: { beforeinput: hk }
    }
  });
}
const dk = ru({
  ArrowLeft: ur("horiz", -1),
  ArrowRight: ur("horiz", 1),
  ArrowUp: ur("vert", -1),
  ArrowDown: ur("vert", 1)
});
function ur(n, e) {
  const t = n == "vert" ? e > 0 ? "down" : "up" : e > 0 ? "right" : "left";
  return function(r, i, s) {
    let o = r.selection, l = e > 0 ? o.$to : o.$from, a = o.empty;
    if (o instanceof I) {
      if (!s.endOfTextblock(t) || l.depth == 0)
        return !1;
      a = !1, l = r.doc.resolve(e > 0 ? l.after() : l.before());
    }
    let c = q.findGapCursorFrom(l, e, a);
    return c ? (i && i(r.tr.setSelection(new q(c))), !0) : !1;
  };
}
function fk(n, e, t) {
  if (!n || !n.editable)
    return !1;
  let r = n.state.doc.resolve(e);
  if (!q.valid(r))
    return !1;
  let i = n.posAtCoords({ left: t.clientX, top: t.clientY });
  return i && i.inside > -1 && N.isSelectable(n.state.doc.nodeAt(i.inside)) ? !1 : (n.dispatch(n.state.tr.setSelection(new q(r))), !0);
}
function hk(n, e) {
  if (e.inputType != "insertCompositionText" || !(n.state.selection instanceof q))
    return !1;
  let { $from: t } = n.state.selection, r = t.parent.contentMatchAt(t.index()).findWrapping(n.state.schema.nodes.text);
  if (!r)
    return !1;
  let i = x.empty;
  for (let o = r.length - 1; o >= 0; o--)
    i = x.from(r[o].createAndFill(null, i));
  let s = n.state.tr.replace(t.pos, t.pos, new v(i, 0, 0));
  return s.setSelection(I.near(s.doc.resolve(t.pos + 1))), n.dispatch(s), !1;
}
function pk(n) {
  if (!(n.selection instanceof q))
    return null;
  let e = document.createElement("div");
  return e.className = "ProseMirror-gapcursor", P.create(n.doc, [ue.widget(n.selection.head, e, { key: "gapcursor" })]);
}
var ii = 200, Z = function() {
};
Z.prototype.append = function(e) {
  return e.length ? (e = Z.from(e), !this.length && e || e.length < ii && this.leafAppend(e) || this.length < ii && e.leafPrepend(this) || this.appendInner(e)) : this;
};
Z.prototype.prepend = function(e) {
  return e.length ? Z.from(e).append(this) : this;
};
Z.prototype.appendInner = function(e) {
  return new mk(this, e);
};
Z.prototype.slice = function(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = this.length), e >= t ? Z.empty : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
};
Z.prototype.get = function(e) {
  if (!(e < 0 || e >= this.length))
    return this.getInner(e);
};
Z.prototype.forEach = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length), t <= r ? this.forEachInner(e, t, r, 0) : this.forEachInvertedInner(e, t, r, 0);
};
Z.prototype.map = function(e, t, r) {
  t === void 0 && (t = 0), r === void 0 && (r = this.length);
  var i = [];
  return this.forEach(function(s, o) {
    return i.push(e(s, o));
  }, t, r), i;
};
Z.from = function(e) {
  return e instanceof Z ? e : e && e.length ? new Sd(e) : Z.empty;
};
var Sd = /* @__PURE__ */ (function(n) {
  function e(r) {
    n.call(this), this.values = r;
  }
  n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e;
  var t = { length: { configurable: !0 }, depth: { configurable: !0 } };
  return e.prototype.flatten = function() {
    return this.values;
  }, e.prototype.sliceInner = function(i, s) {
    return i == 0 && s == this.length ? this : new e(this.values.slice(i, s));
  }, e.prototype.getInner = function(i) {
    return this.values[i];
  }, e.prototype.forEachInner = function(i, s, o, l) {
    for (var a = s; a < o; a++)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.forEachInvertedInner = function(i, s, o, l) {
    for (var a = s - 1; a >= o; a--)
      if (i(this.values[a], l + a) === !1)
        return !1;
  }, e.prototype.leafAppend = function(i) {
    if (this.length + i.length <= ii)
      return new e(this.values.concat(i.flatten()));
  }, e.prototype.leafPrepend = function(i) {
    if (this.length + i.length <= ii)
      return new e(i.flatten().concat(this.values));
  }, t.length.get = function() {
    return this.values.length;
  }, t.depth.get = function() {
    return 0;
  }, Object.defineProperties(e.prototype, t), e;
})(Z);
Z.empty = new Sd([]);
var mk = /* @__PURE__ */ (function(n) {
  function e(t, r) {
    n.call(this), this.left = t, this.right = r, this.length = t.length + r.length, this.depth = Math.max(t.depth, r.depth) + 1;
  }
  return n && (e.__proto__ = n), e.prototype = Object.create(n && n.prototype), e.prototype.constructor = e, e.prototype.flatten = function() {
    return this.left.flatten().concat(this.right.flatten());
  }, e.prototype.getInner = function(r) {
    return r < this.left.length ? this.left.get(r) : this.right.get(r - this.left.length);
  }, e.prototype.forEachInner = function(r, i, s, o) {
    var l = this.left.length;
    if (i < l && this.left.forEachInner(r, i, Math.min(s, l), o) === !1 || s > l && this.right.forEachInner(r, Math.max(i - l, 0), Math.min(this.length, s) - l, o + l) === !1)
      return !1;
  }, e.prototype.forEachInvertedInner = function(r, i, s, o) {
    var l = this.left.length;
    if (i > l && this.right.forEachInvertedInner(r, i - l, Math.max(s, l) - l, o + l) === !1 || s < l && this.left.forEachInvertedInner(r, Math.min(i, l), s, o) === !1)
      return !1;
  }, e.prototype.sliceInner = function(r, i) {
    if (r == 0 && i == this.length)
      return this;
    var s = this.left.length;
    return i <= s ? this.left.slice(r, i) : r >= s ? this.right.slice(r - s, i - s) : this.left.slice(r, s).append(this.right.slice(0, i - s));
  }, e.prototype.leafAppend = function(r) {
    var i = this.right.leafAppend(r);
    if (i)
      return new e(this.left, i);
  }, e.prototype.leafPrepend = function(r) {
    var i = this.left.leafPrepend(r);
    if (i)
      return new e(i, this.right);
  }, e.prototype.appendInner = function(r) {
    return this.left.depth >= Math.max(this.right.depth, r.depth) + 1 ? new e(this.left, new e(this.right, r)) : new e(this, r);
  }, e;
})(Z);
const gk = 500;
class Ae {
  constructor(e, t) {
    this.items = e, this.eventCount = t;
  }
  // Pop the latest event off the branch's history and apply it
  // to a document transform.
  popEvent(e, t) {
    if (this.eventCount == 0)
      return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let i, s;
    t && (i = this.remapping(r, this.items.length), s = i.maps.length);
    let o = e.tr, l, a, c = [], u = [];
    return this.items.forEach((d, f) => {
      if (!d.step) {
        i || (i = this.remapping(r, f + 1), s = i.maps.length), s--, u.push(d);
        return;
      }
      if (i) {
        u.push(new Le(d.map));
        let h = d.step.map(i.slice(s)), p;
        h && o.maybeStep(h).doc && (p = o.mapping.maps[o.mapping.maps.length - 1], c.push(new Le(p, void 0, void 0, c.length + u.length))), s--, p && i.appendMap(p, s);
      } else
        o.maybeStep(d.step);
      if (d.selection)
        return l = i ? d.selection.map(i.slice(s)) : d.selection, a = new Ae(this.items.slice(0, r).append(u.reverse().concat(c)), this.eventCount - 1), !1;
    }, this.items.length, 0), { remaining: a, transform: o, selection: l };
  }
  // Create a new branch with the given transform added.
  addTransform(e, t, r, i) {
    let s = [], o = this.eventCount, l = this.items, a = !i && l.length ? l.get(l.length - 1) : null;
    for (let u = 0; u < e.steps.length; u++) {
      let d = e.steps[u].invert(e.docs[u]), f = new Le(e.mapping.maps[u], d, t), h;
      (h = a && a.merge(f)) && (f = h, u ? s.pop() : l = l.slice(0, l.length - 1)), s.push(f), t && (o++, t = void 0), i || (a = f);
    }
    let c = o - r.depth;
    return c > bk && (l = yk(l, c), o -= c), new Ae(l.append(s), o);
  }
  remapping(e, t) {
    let r = new Rn();
    return this.items.forEach((i, s) => {
      let o = i.mirrorOffset != null && s - i.mirrorOffset >= e ? r.maps.length - i.mirrorOffset : void 0;
      r.appendMap(i.map, o);
    }, e, t), r;
  }
  addMaps(e) {
    return this.eventCount == 0 ? this : new Ae(this.items.append(e.map((t) => new Le(t))), this.eventCount);
  }
  // When the collab module receives remote changes, the history has
  // to know about those, so that it can adjust the steps that were
  // rebased on top of the remote changes, and include the position
  // maps for the remote changes in its array of items.
  rebased(e, t) {
    if (!this.eventCount)
      return this;
    let r = [], i = Math.max(0, this.items.length - t), s = e.mapping, o = e.steps.length, l = this.eventCount;
    this.items.forEach((f) => {
      f.selection && l--;
    }, i);
    let a = t;
    this.items.forEach((f) => {
      let h = s.getMirror(--a);
      if (h == null)
        return;
      o = Math.min(o, h);
      let p = s.maps[h];
      if (f.step) {
        let m = e.steps[h].invert(e.docs[h]), g = f.selection && f.selection.map(s.slice(a + 1, h));
        g && l++, r.push(new Le(p, m, g));
      } else
        r.push(new Le(p));
    }, i);
    let c = [];
    for (let f = t; f < o; f++)
      c.push(new Le(s.maps[f]));
    let u = this.items.slice(0, i).append(c).append(r), d = new Ae(u, l);
    return d.emptyItemCount() > gk && (d = d.compress(this.items.length - r.length)), d;
  }
  emptyItemCount() {
    let e = 0;
    return this.items.forEach((t) => {
      t.step || e++;
    }), e;
  }
  // Compressing a branch means rewriting it to push the air (map-only
  // items) out. During collaboration, these naturally accumulate
  // because each remote change adds one. The `upto` argument is used
  // to ensure that only the items below a given level are compressed,
  // because `rebased` relies on a clean, untouched set of items in
  // order to associate old items with rebased steps.
  compress(e = this.items.length) {
    let t = this.remapping(0, e), r = t.maps.length, i = [], s = 0;
    return this.items.forEach((o, l) => {
      if (l >= e)
        i.push(o), o.selection && s++;
      else if (o.step) {
        let a = o.step.map(t.slice(r)), c = a && a.getMap();
        if (r--, c && t.appendMap(c, r), a) {
          let u = o.selection && o.selection.map(t.slice(r));
          u && s++;
          let d = new Le(c.invert(), a, u), f, h = i.length - 1;
          (f = i.length && i[h].merge(d)) ? i[h] = f : i.push(d);
        }
      } else o.map && r--;
    }, this.items.length, 0), new Ae(Z.from(i.reverse()), s);
  }
}
Ae.empty = new Ae(Z.empty, 0);
function yk(n, e) {
  let t;
  return n.forEach((r, i) => {
    if (r.selection && e-- == 0)
      return t = i, !1;
  }), n.slice(t);
}
class Le {
  constructor(e, t, r, i) {
    this.map = e, this.step = t, this.selection = r, this.mirrorOffset = i;
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      let t = e.step.merge(this.step);
      if (t)
        return new Le(t.getMap().invert(), t, this.selection);
    }
  }
}
class tt {
  constructor(e, t, r, i, s) {
    this.done = e, this.undone = t, this.prevRanges = r, this.prevTime = i, this.prevComposition = s;
  }
}
const bk = 20;
function kk(n, e, t, r) {
  let i = t.getMeta(Nt), s;
  if (i)
    return i.historyState;
  t.getMeta(xk) && (n = new tt(n.done, n.undone, null, 0, -1));
  let o = t.getMeta("appendedTransaction");
  if (t.steps.length == 0)
    return n;
  if (o && o.getMeta(Nt))
    return o.getMeta(Nt).redo ? new tt(n.done.addTransform(t, void 0, r, mr(e)), n.undone, aa(t.mapping.maps), n.prevTime, n.prevComposition) : new tt(n.done, n.undone.addTransform(t, void 0, r, mr(e)), null, n.prevTime, n.prevComposition);
  if (t.getMeta("addToHistory") !== !1 && !(o && o.getMeta("addToHistory") === !1)) {
    let l = t.getMeta("composition"), a = n.prevTime == 0 || !o && n.prevComposition != l && (n.prevTime < (t.time || 0) - r.newGroupDelay || !Sk(t, n.prevRanges)), c = o ? Qi(n.prevRanges, t.mapping) : aa(t.mapping.maps);
    return new tt(n.done.addTransform(t, a ? e.selection.getBookmark() : void 0, r, mr(e)), Ae.empty, c, t.time, l ?? n.prevComposition);
  } else return (s = t.getMeta("rebased")) ? new tt(n.done.rebased(t, s), n.undone.rebased(t, s), Qi(n.prevRanges, t.mapping), n.prevTime, n.prevComposition) : new tt(n.done.addMaps(t.mapping.maps), n.undone.addMaps(t.mapping.maps), Qi(n.prevRanges, t.mapping), n.prevTime, n.prevComposition);
}
function Sk(n, e) {
  if (!e)
    return !1;
  if (!n.docChanged)
    return !0;
  let t = !1;
  return n.mapping.maps[0].forEach((r, i) => {
    for (let s = 0; s < e.length; s += 2)
      r <= e[s + 1] && i >= e[s] && (t = !0);
  }), t;
}
function aa(n) {
  let e = [];
  for (let t = n.length - 1; t >= 0 && e.length == 0; t--)
    n[t].forEach((r, i, s, o) => e.push(s, o));
  return e;
}
function Qi(n, e) {
  if (!n)
    return null;
  let t = [];
  for (let r = 0; r < n.length; r += 2) {
    let i = e.map(n[r], 1), s = e.map(n[r + 1], -1);
    i <= s && t.push(i, s);
  }
  return t;
}
function wk(n, e, t) {
  let r = mr(e), i = Nt.get(e).spec.config, s = (t ? n.undone : n.done).popEvent(e, r);
  if (!s)
    return null;
  let o = s.selection.resolve(s.transform.doc), l = (t ? n.done : n.undone).addTransform(s.transform, e.selection.getBookmark(), i, r), a = new tt(t ? l : s.remaining, t ? s.remaining : l, null, 0, -1);
  return s.transform.setSelection(o).setMeta(Nt, { redo: t, historyState: a });
}
let Yi = !1, ca = null;
function mr(n) {
  let e = n.plugins;
  if (ca != e) {
    Yi = !1, ca = e;
    for (let t = 0; t < e.length; t++)
      if (e[t].spec.historyPreserveItems) {
        Yi = !0;
        break;
      }
  }
  return Yi;
}
const Nt = new W("history"), xk = new W("closeHistory");
function Ck(n = {}) {
  return n = {
    depth: n.depth || 100,
    newGroupDelay: n.newGroupDelay || 500
  }, new z({
    key: Nt,
    state: {
      init() {
        return new tt(Ae.empty, Ae.empty, null, 0, -1);
      },
      apply(e, t, r) {
        return kk(t, r, e, n);
      }
    },
    config: n,
    props: {
      handleDOMEvents: {
        beforeinput(e, t) {
          let r = t.inputType, i = r == "historyUndo" ? xd : r == "historyRedo" ? Cd : null;
          return !i || !e.editable ? !1 : (t.preventDefault(), i(e.state, e.dispatch));
        }
      }
    }
  });
}
function wd(n, e) {
  return (t, r) => {
    let i = Nt.getState(t);
    if (!i || (n ? i.undone : i.done).eventCount == 0)
      return !1;
    if (r) {
      let s = wk(i, t, n);
      s && r(e ? s.scrollIntoView() : s);
    }
    return !0;
  };
}
const xd = wd(!1, !0), Cd = wd(!0, !0);
$.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      autoTrim: !0,
      mode: "textSize",
      textCounter: (n) => n.length,
      wordCounter: (n) => n.split(" ").filter((e) => e !== "").length
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (n) => {
      const e = (n == null ? void 0 : n.node) || this.editor.state.doc;
      if (((n == null ? void 0 : n.mode) || this.options.mode) === "textSize") {
        const t = e.textBetween(0, e.content.size, void 0, " ");
        return this.options.textCounter(t);
      }
      return e.nodeSize;
    }, this.storage.words = (n) => {
      const e = (n == null ? void 0 : n.node) || this.editor.state.doc, t = e.textBetween(0, e.content.size, " ", " ");
      return this.options.wordCounter(t);
    };
  },
  addProseMirrorPlugins() {
    let n = !1;
    return [new z({
      key: new W("characterCount"),
      appendTransaction: (e, t, r) => {
        if (n) return;
        const i = this.options.limit, s = this.options.autoTrim;
        if (i == null || i === 0 || s === !1) {
          n = !0;
          return;
        }
        const o = this.storage.characters({ node: r.doc });
        if (o > i) {
          const l = o - i, a = 0, c = l;
          console.warn(`[CharacterCount] Initial content exceeded limit of ${i} characters. Content was automatically trimmed.`);
          const u = r.tr.deleteRange(a, c);
          return n = !0, u;
        }
        n = !0;
      },
      filterTransaction: (e, t) => {
        const r = this.options.limit;
        if (!e.docChanged || r === 0 || r === null || r === void 0) return !0;
        const i = this.storage.characters({ node: t.doc }), s = this.storage.characters({ node: e.doc });
        if (s <= r || i > r && s > r && s <= i) return !0;
        if (i > r && s > r && s > i || !e.getMeta("paste")) return !1;
        const o = e.selection.$head.pos, l = o - (s - r), a = o;
        return e.deleteRange(l, a), !(this.storage.characters({ node: e.doc }) > r);
      }
    })];
  }
});
const Ek = $.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [ok(this.options)];
  }
});
$.create({
  name: "focus",
  addOptions() {
    return {
      className: "has-focus",
      mode: "all"
    };
  },
  addProseMirrorPlugins() {
    return [new z({
      key: new W("focus"),
      props: { decorations: ({ doc: n, selection: e }) => {
        const { isEditable: t, isFocused: r } = this.editor, { anchor: i } = e, s = [];
        if (!t || !r) return P.create(n, []);
        let o = 0;
        this.options.mode === "deepest" && n.descendants((a, c) => {
          if (!a.isText) {
            if (!(i >= c && i <= c + a.nodeSize - 1)) return !1;
            o += 1;
          }
        });
        let l = 0;
        return n.descendants((a, c) => {
          if (a.isText || !(i >= c && i <= c + a.nodeSize - 1)) return !1;
          if (l += 1, this.options.mode === "deepest" && o - l > 0 || this.options.mode === "shallowest" && l > 1) return this.options.mode === "deepest";
          s.push(ue.node(c, c + a.nodeSize, { class: this.options.className }));
        }), P.create(n, s);
      } }
    })];
  }
});
const vk = $.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [uk()];
  },
  extendNodeSchema(n) {
    var e;
    return { allowGapCursor: (e = B(O(n, "allowGapCursor", {
      name: n.name,
      options: n.options,
      storage: n.storage
    }))) !== null && e !== void 0 ? e : null };
  }
}), Ed = "placeholder", ua = new W("tiptap__placeholder");
function vd(n) {
  const { editor: e, placeholder: t, dataAttribute: r, pos: i, node: s, isEmptyDoc: o, hasAnchor: l, classes: { emptyNode: a, emptyEditor: c } } = n, u = [a];
  return o && u.push(c), ue.node(i, i + s.nodeSize, {
    class: u.join(" "),
    [r]: typeof t == "function" ? t({
      editor: e,
      node: s,
      pos: i,
      hasAnchor: l
    }) : t
  });
}
function Md(n, e) {
  return typeof n == "function" ? n(e) : n;
}
function Td({ editor: n, options: e, dataAttribute: t, doc: r, selection: i, from: s, to: o }) {
  const { anchor: l } = i, a = [], c = n.isEmpty;
  return r.nodesBetween(s, o, (u, d) => {
    const f = l >= d && l <= d + u.nodeSize, h = !u.isLeaf && qn(u);
    return u.type.isTextblock && (f || !e.showOnlyCurrent) && h && a.push(vd({
      editor: n,
      isEmptyDoc: c,
      dataAttribute: t,
      hasAnchor: f,
      placeholder: e.placeholder,
      classes: {
        emptyEditor: e.emptyEditorClass,
        emptyNode: Md(e.emptyNodeClass, {
          editor: n,
          node: u,
          pos: d,
          hasAnchor: f
        })
      },
      node: u,
      pos: d
    })), e.includeChildren;
  }), a;
}
function Ad({ editor: n, options: e, dataAttribute: t, doc: r, selection: i }) {
  if (!(n.isEditable || !e.showOnlyWhenEditable)) return null;
  const { anchor: s } = i, o = [], l = n.isEmpty;
  if (e.showOnlyCurrent && !e.includeChildren) {
    const a = r.resolve(s), c = a.depth > 0 ? a.node(1) : a.nodeAfter, u = a.depth > 0 ? a.before(1) : s;
    if (c && c.type.isTextblock && qn(c)) {
      const d = s >= u && s <= u + c.nodeSize;
      o.push(vd({
        editor: n,
        isEmptyDoc: l,
        dataAttribute: t,
        hasAnchor: d,
        placeholder: e.placeholder,
        classes: {
          emptyEditor: e.emptyEditorClass,
          emptyNode: Md(e.emptyNodeClass, {
            editor: n,
            node: c,
            pos: u,
            hasAnchor: d
          })
        },
        node: c,
        pos: u
      }));
    }
  } else o.push(...Td({
    editor: n,
    options: e,
    dataAttribute: t,
    doc: r,
    selection: i,
    from: 0,
    to: r.content.size
  }));
  return P.create(r, o);
}
function An(n, e) {
  const t = n.resolve(e);
  if (t.depth === 0) {
    var r;
    const s = (r = t.nodeAfter) !== null && r !== void 0 ? r : t.nodeBefore;
    if (!s) return {
      from: e,
      to: e
    };
    const o = t.nodeAfter ? e : e - s.nodeSize;
    return {
      from: o,
      to: o + s.nodeSize
    };
  }
  const i = t.before(1);
  return {
    from: i,
    to: i + t.node(1).nodeSize
  };
}
function On(n, e) {
  return {
    from: Math.max(0, e.from - 1),
    to: Math.min(n.content.size, e.to - 1)
  };
}
function Mk(n, e, t) {
  const r = [];
  return n.forEach((i, s) => {
    const o = s, l = o + i.nodeSize, a = o + 1, c = l + 1;
    a < t && c > e && r.push({
      from: o,
      to: l
    });
  }), r;
}
function Tk(n) {
  if (n.length === 0) return [];
  const e = [...n].sort((r, i) => r.from - i.from), t = [{ ...e[0] }];
  for (let r = 1; r < e.length; r += 1) {
    const i = t[t.length - 1], s = e[r];
    s.from <= i.to ? i.to = Math.max(i.to, s.to) : t.push({ ...s });
  }
  return t;
}
function Ak(n, e) {
  const t = Mk(n, e.from, e.to);
  return t.push(On(n, An(n, e.from))), e.to > e.from ? t.push(On(n, An(n, Math.min(e.to, n.content.size + 1) - 1))) : e.from < n.content.size + 1 && t.push(On(n, An(n, Math.min(e.from + 1, n.content.size)))), t;
}
function Ok(n, e, t) {
  const r = [];
  if (n.docChanged) {
    const i = pi(n);
    for (const s of i) r.push(...Ak(t.doc, s.newRange));
  }
  return n.selectionSet && (r.push(On(t.doc, An(t.doc, n.mapping.map(e.selection.anchor)))), r.push(On(t.doc, An(t.doc, t.selection.anchor)))), Tk(r);
}
function Nk(n, e, t) {
  const r = Math.max(0, Math.min(n, t.content.size));
  return {
    from: r,
    to: Math.max(r, Math.min(e, t.content.size))
  };
}
function Ik({ decorations: n, ranges: e, editor: t, options: r, dataAttribute: i, doc: s, selection: o }) {
  let l = n;
  for (const a of e) {
    const { from: c, to: u } = Nk(a.from, a.to, s), d = l.find(c, u).filter((h) => h.from >= c && h.to <= u);
    d.length && (l = l.remove(d));
    const f = Td({
      editor: t,
      options: r,
      dataAttribute: i,
      doc: s,
      selection: o,
      from: c,
      to: u
    });
    f.length && (l = l.add(s, f));
  }
  return l;
}
function Dk({ editor: n, options: e, dataAttribute: t }) {
  return {
    init(r, i) {
      const s = Ad({
        editor: n,
        options: e,
        dataAttribute: t,
        doc: i.doc,
        selection: i.selection
      });
      return s ?? P.empty;
    },
    apply(r, i, s, o) {
      return !r.docChanged && !r.selectionSet ? i : Ik({
        decorations: i.map(r.mapping, r.doc),
        ranges: Ok(r, s, o),
        editor: n,
        options: e,
        dataAttribute: t,
        doc: o.doc,
        selection: o.selection
      });
    }
  };
}
function Rk(n) {
  return n.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/^[0-9-]+/, "").replace(/^-+/, "").toLowerCase();
}
function Lk({ editor: n, options: e }) {
  const t = e.dataAttribute ? `data-${Rk(e.dataAttribute)}` : `data-${Ed}`, r = e.showOnlyCurrent && !e.includeChildren;
  return new z({
    key: ua,
    ...r ? {} : { state: Dk({
      editor: n,
      options: e,
      dataAttribute: t
    }) },
    props: { decorations: r ? ({ doc: i, selection: s }) => Ad({
      editor: n,
      options: e,
      dataAttribute: t,
      doc: i,
      selection: s
    }) : (i) => {
      var s;
      return e.showOnlyWhenEditable && !n.isEditable ? P.empty : (s = ua.getState(i)) !== null && s !== void 0 ? s : P.empty;
    } }
  });
}
const Pk = $.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      dataAttribute: Ed,
      placeholder: "Write something …",
      showOnlyWhenEditable: !0,
      showOnlyCurrent: !0,
      includeChildren: !1
    };
  },
  addProseMirrorPlugins() {
    return [Lk({
      editor: this.editor,
      options: this.options
    })];
  }
});
function $s(n, e) {
  return !n.selection.empty && !wu(n.selection) && e.isEditable;
}
function Bk(n, e) {
  return $s(n, e) && !e.isFocused && !e.view.dragging;
}
function $k() {
  var n;
  (n = window.getSelection()) === null || n === void 0 || n.removeAllRanges();
}
function zk(n) {
  n.focus();
}
$.create({
  name: "selection",
  addOptions() {
    return { className: "selection" };
  },
  addProseMirrorPlugins() {
    const { editor: n, options: e } = this;
    return [new z({
      key: new W("selection"),
      props: {
        decorations(t) {
          return Bk(t, n) ? P.create(t.doc, [ue.inline(t.selection.from, t.selection.to, { class: e.className })]) : null;
        },
        handleDOMEvents: {
          blur(t) {
            return $s(t.state, n) && $k(), !1;
          },
          focus(t) {
            return $s(t.state, n) && requestAnimationFrame(() => {
              !n.isDestroyed && t.hasFocus() && zk(t);
            }), !1;
          }
        }
      }
    })];
  }
});
function da({ types: n, node: e }) {
  return e && Array.isArray(n) && n.includes(e.type) || (e == null ? void 0 : e.type) === n;
}
const _k = $.create({
  name: "trailingNode",
  addOptions() {
    return {
      node: void 0,
      notAfter: []
    };
  },
  addProseMirrorPlugins() {
    var n;
    const e = new W(this.name), t = this.options.node || ((n = this.editor.schema.topNodeType.contentMatch.defaultType) === null || n === void 0 ? void 0 : n.name) || "paragraph", r = Object.entries(this.editor.schema.nodes).map(([, i]) => i).filter((i) => (this.options.notAfter || []).concat(t).includes(i.name));
    return [new z({
      key: e,
      appendTransaction: (i, s, o) => {
        const { doc: l, tr: a, schema: c } = o, u = e.getState(o), d = l.content.size, f = c.nodes[t];
        if (!i.some((h) => h.getMeta("skipTrailingNode")) && u)
          return a.insert(d, f.create());
      },
      state: {
        init: (i, s) => {
          const o = s.tr.doc.lastChild;
          return !da({
            node: o,
            types: r
          });
        },
        apply: (i, s) => {
          if (!i.docChanged || i.getMeta("__uniqueIDTransaction")) return s;
          const o = i.doc.lastChild;
          return !da({
            node: o,
            types: r
          });
        }
      }
    })];
  }
}), Fk = $.create({
  name: "undoRedo",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state: n, dispatch: e }) => xd(n, e),
      redo: () => ({ state: n, dispatch: e }) => Cd(n, e)
    };
  },
  addProseMirrorPlugins() {
    return [Ck(this.options)];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      "Mod-я": () => this.editor.commands.undo(),
      "Shift-Mod-я": () => this.editor.commands.redo()
    };
  }
}), Hk = $.create({
  name: "starterKit",
  addExtensions() {
    const n = [];
    if (this.options.bold !== !1 && n.push(I0.configure(this.options.bold)), this.options.blockquote !== !1 && n.push(M0.configure(this.options.blockquote)), this.options.bulletList !== !1 && n.push(cd.configure(this.options.bulletList)), this.options.code !== !1 && n.push(L0.configure(this.options.code)), this.options.codeBlock !== !1 && n.push($0.configure(this.options.codeBlock)), this.options.document !== !1 && n.push(z0.configure(this.options.document)), this.options.dropcursor !== !1 && n.push(Ek.configure(this.options.dropcursor)), this.options.gapcursor !== !1 && n.push(vk.configure(this.options.gapcursor)), this.options.hardBreak !== !1 && n.push(_0.configure(this.options.hardBreak)), this.options.heading !== !1 && n.push(Ku.configure(this.options.heading)), this.options.undoRedo !== !1 && n.push(Fk.configure(this.options.undoRedo)), this.options.horizontalRule !== !1 && n.push(Ju.configure(this.options.horizontalRule)), this.options.italic !== !1 && n.push(W0.configure(this.options.italic)), this.options.listItem !== !1 && n.push(pd.configure(this.options.listItem)), this.options.listKeymap !== !1) {
      var e;
      n.push(gd.configure((e = this.options) === null || e === void 0 ? void 0 : e.listKeymap));
    }
    if (this.options.link !== !1) {
      var t;
      n.push(ad.configure((t = this.options) === null || t === void 0 ? void 0 : t.link));
    }
    if (this.options.orderedList !== !1 && n.push(bd.configure(this.options.orderedList)), this.options.paragraph !== !1 && n.push(ek.configure(this.options.paragraph)), this.options.strike !== !1 && n.push(rk.configure(this.options.strike)), this.options.text !== !1 && n.push(ik.configure(this.options.text)), this.options.underline !== !1) {
      var r;
      n.push(sk.configure((r = this.options) === null || r === void 0 ? void 0 : r.underline));
    }
    if (this.options.trailingNode !== !1) {
      var i;
      n.push(_k.configure((i = this.options) === null || i === void 0 ? void 0 : i.trailingNode));
    }
    return n;
  }
});
var Vk = Hk;
const jk = (n) => K({
  find: /--$/,
  replace: n ?? "—"
}), Wk = (n) => K({
  find: /\.\.\.$/,
  replace: n ?? "…"
}), Xi = (n) => K({
  find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/,
  replace: n ?? "“"
}), Zi = (n) => K({
  find: /"$/,
  replace: n ?? "”"
}), es = (n) => K({
  find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/,
  replace: n ?? "‘"
}), ts = (n) => K({
  find: /'$/,
  replace: n ?? "’"
}), Uk = (n) => K({
  find: /<-$/,
  replace: n ?? "←"
}), qk = (n) => K({
  find: /->$/,
  replace: n ?? "→"
}), Kk = (n) => K({
  find: /\(c\)$/,
  replace: n ?? "©"
}), Jk = (n) => K({
  find: /\(tm\)$/,
  replace: n ?? "™"
}), Gk = (n) => K({
  find: /\(sm\)$/,
  replace: n ?? "℠"
}), Qk = (n) => K({
  find: /\(r\)$/,
  replace: n ?? "®"
}), Yk = (n) => K({
  find: /(?:^|\s)(1\/2)\s$/,
  replace: n ?? "½"
}), Xk = (n) => K({
  find: /\+\/-$/,
  replace: n ?? "±"
}), Zk = (n) => K({
  find: /!=$/,
  replace: n ?? "≠"
}), e1 = (n) => K({
  find: /<<$/,
  replace: n ?? "«"
}), t1 = (n) => K({
  find: />>$/,
  replace: n ?? "»"
}), n1 = (n) => K({
  find: /\d+\s?([*x])\s?\d+$/,
  replace: n ?? "×"
}), r1 = (n) => K({
  find: /\^2$/,
  replace: n ?? "²"
}), i1 = (n) => K({
  find: /\^3$/,
  replace: n ?? "³"
}), s1 = (n) => K({
  find: /(?:^|\s)(1\/4)\s$/,
  replace: n ?? "¼"
}), o1 = (n) => K({
  find: /(?:^|\s)(3\/4)\s$/,
  replace: n ?? "¾"
}), l1 = $.create({
  name: "typography",
  addOptions() {
    return {
      closeDoubleQuote: "”",
      closeSingleQuote: "’",
      copyright: "©",
      ellipsis: "…",
      emDash: "—",
      laquo: "«",
      leftArrow: "←",
      multiplication: "×",
      notEqual: "≠",
      oneHalf: "½",
      oneQuarter: "¼",
      openDoubleQuote: "“",
      openSingleQuote: "‘",
      plusMinus: "±",
      raquo: "»",
      registeredTrademark: "®",
      rightArrow: "→",
      servicemark: "℠",
      superscriptThree: "³",
      superscriptTwo: "²",
      threeQuarters: "¾",
      trademark: "™"
    };
  },
  addInputRules() {
    var n, e;
    const t = [];
    this.options.emDash !== !1 && t.push(jk(this.options.emDash)), this.options.ellipsis !== !1 && t.push(Wk(this.options.ellipsis));
    const r = this.editor.options.textDirection === "rtl";
    if (!((n = this.options.doubleQuotes) === null || n === void 0) && n.rtl) {
      const { open: i, close: s } = this.options.doubleQuotes.rtl;
      t.push(Xi(i)), t.push(Zi(s));
    } else r ? (t.push(Xi("”")), t.push(Zi("“"))) : (this.options.openDoubleQuote !== !1 && t.push(Xi(this.options.openDoubleQuote)), this.options.closeDoubleQuote !== !1 && t.push(Zi(this.options.closeDoubleQuote)));
    if (!((e = this.options.singleQuotes) === null || e === void 0) && e.rtl) {
      const { open: i, close: s } = this.options.singleQuotes.rtl;
      t.push(es(i)), t.push(ts(s));
    } else r ? (t.push(es("’")), t.push(ts("‘"))) : (this.options.openSingleQuote !== !1 && t.push(es(this.options.openSingleQuote)), this.options.closeSingleQuote !== !1 && t.push(ts(this.options.closeSingleQuote)));
    return this.options.leftArrow !== !1 && t.push(Uk(this.options.leftArrow)), this.options.rightArrow !== !1 && t.push(qk(this.options.rightArrow)), this.options.copyright !== !1 && t.push(Kk(this.options.copyright)), this.options.trademark !== !1 && t.push(Jk(this.options.trademark)), this.options.servicemark !== !1 && t.push(Gk(this.options.servicemark)), this.options.registeredTrademark !== !1 && t.push(Qk(this.options.registeredTrademark)), this.options.oneHalf !== !1 && t.push(Yk(this.options.oneHalf)), this.options.plusMinus !== !1 && t.push(Xk(this.options.plusMinus)), this.options.notEqual !== !1 && t.push(Zk(this.options.notEqual)), this.options.laquo !== !1 && t.push(e1(this.options.laquo)), this.options.raquo !== !1 && t.push(t1(this.options.raquo)), this.options.multiplication !== !1 && t.push(n1(this.options.multiplication)), this.options.superscriptTwo !== !1 && t.push(r1(this.options.superscriptTwo)), this.options.superscriptThree !== !1 && t.push(i1(this.options.superscriptThree)), this.options.oneQuarter !== !1 && t.push(s1(this.options.oneQuarter)), this.options.threeQuarters !== !1 && t.push(o1(this.options.threeQuarters)), t;
  }
}), ki = [
  { name: "tiny", className: "text-tiny", px: 9.1, label: "Tiny" },
  { name: "small", className: "text-small", px: 11.05, label: "Small" },
  { name: "default", className: null, px: 13, label: "Default" },
  { name: "big", className: "text-big", px: 18.2, label: "Big" },
  { name: "huge", className: "text-huge", px: 23.4, label: "Huge" }
], fa = ki.map((n) => n.className).filter(Boolean), a1 = (n) => ki.reduce((t, r) => Math.abs(r.px - n) < Math.abs(t.px - n) ? r : t).className, c1 = Be.create({
  name: "fontSize",
  addAttributes() {
    return {
      class: {
        default: null,
        parseHTML: (n) => fa.find((e) => n.classList.contains(e)) || null,
        renderHTML: (n) => n.class ? { class: n.class } : {}
      }
    };
  },
  parseHTML() {
    return fa.map((n) => ({ tag: `span.${n}` }));
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["span", V(n), 0];
  },
  addCommands() {
    return {
      setFontSize: (n) => ({ commands: e }) => {
        const t = ki.find((r) => r.name === n);
        return !t || !t.className ? e.unsetMark(this.name) : e.setMark(this.name, { class: t.className });
      },
      unsetFontSize: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  }
}), Od = [
  { model: "yellowMarker", className: "marker-yellow", title: "Yellow marker", color: "var(--cw-highlight-yellow, #fdfd77)", type: "marker" },
  { model: "greenMarker", className: "marker-green", title: "Green marker", color: "var(--cw-highlight-green, #62f962)", type: "marker" },
  { model: "pinkMarker", className: "marker-pink", title: "Pink marker", color: "var(--cw-highlight-pink, #fc7899)", type: "marker" },
  { model: "blueMarker", className: "marker-blue", title: "Blue marker", color: "var(--cw-highlight-blue, #72cdfd)", type: "marker" },
  { model: "redPen", className: "pen-red", title: "Red pen", color: "var(--cw-highlight-pen-red, #e91313)", type: "pen" },
  { model: "greenPen", className: "pen-green", title: "Green pen", color: "var(--cw-highlight-pen-green, #118800)", type: "pen" }
], ha = Od.map((n) => n.className), ns = "marker-yellow", u1 = Be.create({
  name: "highlight",
  addAttributes() {
    return {
      class: {
        default: ns,
        parseHTML: (n) => ha.find((e) => n.classList.contains(e)) || ns,
        renderHTML: (n) => ({ class: n.class || ns })
      }
    };
  },
  parseHTML() {
    return [{ tag: "mark" }, ...ha.map((n) => ({ tag: `span.${n}` }))];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["mark", V(n), 0];
  },
  addCommands() {
    return {
      setHighlight: (n) => ({ commands: e }) => e.setMark(this.name, { class: n }),
      toggleHighlight: (n) => ({ commands: e, editor: t }) => t.isActive(this.name, { class: n }) ? e.unsetMark(this.name) : e.setMark(this.name, { class: n }),
      unsetHighlight: () => ({ commands: n }) => n.unsetMark(this.name)
    };
  }
}), d1 = 40, f1 = 10, pa = (n, e) => Math.max(0, Math.min(n, e)), h1 = $.create({
  name: "indent",
  addOptions() {
    return {
      types: ["paragraph", "heading", "blockquote"],
      stepPx: d1,
      maxSteps: f1
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (n) => {
              const e = n.style.marginLeft;
              return !e || !e.endsWith("px") ? 0 : pa(Math.round(parseFloat(e) / this.options.stepPx), this.options.maxSteps);
            },
            renderHTML: (n) => {
              const e = Number(n.indent) || 0;
              return e <= 0 ? {} : { style: `margin-left:${e * this.options.stepPx}px;` };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    const n = (e) => () => ({ editor: t, commands: r, tr: i, state: s, dispatch: o }) => {
      if (t.isActive("listItem"))
        return e === 1 ? r.sinkListItem("listItem") : r.liftListItem("listItem");
      const { from: l, to: a } = s.selection;
      let c = !1;
      return s.doc.nodesBetween(l, a, (u, d) => {
        if (!this.options.types.includes(u.type.name)) return;
        const f = Number(u.attrs.indent) || 0, h = pa(f + e, this.options.maxSteps);
        h !== f && (i.setNodeMarkup(d, void 0, { ...u.attrs, indent: h }), c = !0);
      }), c && o && o(i), c;
    };
    return {
      indentBlock: n(1),
      outdentBlock: n(-1),
      unsetBlockIndent: () => ({ tr: e, state: t, dispatch: r }) => {
        const { from: i, to: s } = t.selection;
        let o = !1;
        return t.doc.nodesBetween(i, s, (l, a) => {
          !this.options.types.includes(l.type.name) || !l.attrs.indent || (e.setNodeMarkup(a, void 0, { ...l.attrs, indent: 0 }), o = !0);
        }), o && r && r(e), o;
      }
    };
  }
}), p1 = ["bold", "italic", "underline", "strike", "code", "fontSize", "highlight"], m1 = $.create({
  name: "removeFormat",
  addCommands() {
    return {
      removeFormat: () => ({ chain: n, editor: e }) => {
        const r = p1.filter((s) => !!e.schema.marks[s]).reduce(
          (s, o) => s.unsetMark(o, { extendEmptyMarkRange: !0 }),
          n()
        );
        return (typeof r.unsetBlockIndent == "function" ? r.unsetBlockIndent() : r).run();
      }
    };
  }
}), g1 = /^(https?:)?\/\//i, y1 = (n) => !!(n && g1.test(n)), Nd = (n, e = "https://") => {
  const t = n.trim();
  return !t || /^(#|\/|mailto:|tel:)/i.test(t) || /^[a-z][a-z0-9+.-]*:/i.test(t) || t.startsWith("//") ? t : `${e}${t}`;
}, b1 = ad.extend({
  addOptions() {
    var n;
    return {
      ...(n = this.parent) == null ? void 0 : n.call(this),
      openOnClick: !1,
      autolink: !1,
      linkOnPaste: !0,
      defaultProtocol: "https://",
      addTargetToExternalLinks: !0,
      HTMLAttributes: {}
    };
  },
  renderHTML({ HTMLAttributes: n }) {
    const e = { ...n }, t = y1(e.href);
    return this.options.addTargetToExternalLinks && t ? (e.target = "_blank", e.rel = "noopener noreferrer") : (delete e.target, delete e.rel), ["a", V(this.options.HTMLAttributes, e), 0];
  }
}), k1 = ["alignLeft", "alignRight"], S1 = "image_resized", w1 = "image", Id = {
  alignLeft: "image-style-align-left",
  alignRight: "image-style-align-right"
}, x1 = (n) => n && Id[n] || null, ma = (n) => k1.find((t) => n.contains(Id[t])) || null, Je = (n) => {
  if (n == null || n === "" || n === "unset") return null;
  const e = String(n).trim();
  return e ? /^\d+(\.\d+)?$/.test(e) ? `${e}px` : /^\d+(\.\d+)?(px|%)$/.test(e) ? e : null : null;
}, zs = (n, e) => {
  const t = Je(n == null ? void 0 : n.style.width);
  if (t) return t;
  const r = Je(e == null ? void 0 : e.style.width);
  return r || Je(e == null ? void 0 : e.getAttribute("width"));
}, Dd = (n, e, t = []) => [w1, n ? S1 : null, x1(e), ...t].filter(Boolean).join(" "), Rd = (n) => n ? `width:${n};` : null, C1 = ["top-left", "top-right", "bottom-right", "bottom-left"], E1 = 40, v1 = ({ resizable: n }) => ({ node: e, editor: t, getPos: r }) => {
  const i = document.createElement("figure"), s = document.createElement("img");
  let o = Je(e.attrs.width);
  const l = (d) => {
    o = Je(d.width), i.className = Dd(o, d.imageStyle, [
      "cw-image",
      d.uploading ? "cw-image--uploading" : ""
    ].filter(Boolean)), i.style.width = o || "", d.uploadId ? i.dataset.uploadId = d.uploadId : delete i.dataset.uploadId, s.src = d.src || "", s.style.width = o || "", d.alt ? s.alt = d.alt : s.removeAttribute("alt");
  };
  l(e.attrs), i.appendChild(s);
  const a = document.createElement("div");
  a.className = "cw-image__progress", i.appendChild(a);
  const c = (d) => {
    a.style.width = `${Math.round(d * 100)}%`;
  };
  c(0);
  const u = (d) => {
    var b;
    if (!t.isEditable || !n()) return;
    d.preventDefault(), d.stopPropagation();
    const f = d.clientX, h = s.getBoundingClientRect().width, m = (b = d.currentTarget.dataset.position) != null && b.includes("left") ? -1 : 1;
    i.classList.add("cw-image--resizing");
    const g = (S) => {
      const w = Math.max(E1, Math.round(h + (S.clientX - f) * m));
      i.style.width = `${w}px`, s.style.width = `${w}px`;
    }, y = () => {
      var E;
      document.removeEventListener("pointermove", g), document.removeEventListener("pointerup", y), i.classList.remove("cw-image--resizing");
      const S = `${Math.round(s.getBoundingClientRect().width)}px`, w = typeof r == "function" ? r() : null;
      w != null && t.view.dispatch(
        t.view.state.tr.setNodeMarkup(w, void 0, {
          ...(E = t.view.state.doc.nodeAt(w)) == null ? void 0 : E.attrs,
          width: S
        })
      );
    };
    document.addEventListener("pointermove", g), document.addEventListener("pointerup", y);
  };
  return C1.forEach((d) => {
    const f = document.createElement("span");
    f.className = `cw-image__handle cw-image__handle--${d}`, f.dataset.position = d, f.addEventListener("pointerdown", u), i.appendChild(f);
  }), {
    dom: i,
    update(d) {
      return d.type.name !== e.type.name ? !1 : (l(d.attrs), !0);
    },
    selectNode() {
      i.classList.add("cw-image--selected");
    },
    deselectNode() {
      i.classList.remove("cw-image--selected");
    },
    ignoreMutation: () => !0,
    setUploadProgress: c
  };
}, Ld = {
  src: { default: null },
  alt: {
    default: null,
    renderHTML: (n) => n.alt ? { alt: n.alt } : {}
  },
  width: { default: null, rendered: !1 },
  uploadId: { default: null, rendered: !1 },
  uploading: { default: !1, rendered: !1 }
}, M1 = he.create({
  name: "ckImageBlock",
  group: "block",
  atom: !0,
  draggable: !0,
  selectable: !0,
  addOptions() {
    return { resizable: !0, resizeUnit: "px" };
  },
  addAttributes() {
    return {
      ...Ld,
      imageStyle: { default: null, rendered: !1 }
    };
  },
  parseHTML() {
    return [
      {
        tag: "figure.image",
        priority: 60,
        getAttrs: (n) => {
          const e = n, t = e.querySelector("img");
          return t ? {
            src: t.getAttribute("src"),
            alt: t.getAttribute("alt"),
            width: zs(e, t),
            imageStyle: ma(e.classList)
          } : !1;
        }
      },
      {
        // A bare `<img>` that is the only child of a block: CKEditor 4 notes and
        // pasted mail content store block images this way.
        tag: "img[src]",
        priority: 40,
        getAttrs: (n) => {
          const e = n, t = e.parentElement;
          return !(t && t.childNodes.length === 1 && ["P", "DIV", "FIGURE"].includes(t.tagName)) ? !1 : {
            src: e.getAttribute("src"),
            alt: e.getAttribute("alt"),
            width: zs(null, e),
            imageStyle: ma(e.classList)
          };
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes: n, node: e }) {
    const t = Je(e.attrs.width), r = Rd(t);
    return [
      "figure",
      { class: Dd(t, e.attrs.imageStyle), ...r ? { style: r } : {} },
      ["img", V(n, { src: e.attrs.src, ...r ? { style: r } : {} })]
    ];
  },
  addNodeView() {
    return v1({ resizable: () => this.options.resizable });
  },
  addCommands() {
    return {
      setImage: (n) => ({ commands: e }) => e.insertContent({ type: this.name, attrs: { ...n, width: Je(n.width ?? null) } }),
      setImageStyle: (n) => ({ tr: e, state: t, dispatch: r }) => {
        const { from: i, to: s } = t.selection;
        let o = !1;
        return t.doc.nodesBetween(i, s, (l, a) => {
          l.type.name === this.name && (e.setNodeMarkup(a, void 0, { ...l.attrs, imageStyle: l.attrs.imageStyle === n ? null : n }), o = !0);
        }), o && r && r(e), o;
      },
      setImageWidth: (n) => ({ tr: e, state: t, dispatch: r }) => {
        const { from: i, to: s } = t.selection, o = Je(n);
        let l = !1;
        return t.doc.nodesBetween(i, s, (a, c) => {
          a.type.name !== this.name && a.type.name !== "ckImageInline" || (e.setNodeMarkup(c, void 0, { ...a.attrs, width: o }), l = !0);
        }), l && r && r(e), l;
      }
    };
  }
}), T1 = he.create({
  name: "ckImageInline",
  group: "inline",
  inline: !0,
  atom: !0,
  draggable: !0,
  addAttributes() {
    return { ...Ld };
  },
  parseHTML() {
    return [{ tag: "img[src]", priority: 30, getAttrs: (n) => ({
      src: n.getAttribute("src"),
      alt: n.getAttribute("alt"),
      width: zs(null, n)
    }) }];
  },
  renderHTML({ HTMLAttributes: n, node: e }) {
    const t = Je(e.attrs.width), r = Rd(t);
    return [
      "img",
      V(n, {
        src: e.attrs.src,
        ...t ? { class: "image_resized" } : {},
        ...r ? { style: r } : {}
      })
    ];
  }
}), A1 = 10, Pd = ["jpg", "jpeg", "png", "gif", "tiff", "bmp", "webp"], O1 = (n) => n.includes(".") ? n.split(".").pop().toLowerCase() : "", N1 = (n, e) => {
  if (!n.type.startsWith("image/")) return !1;
  if (!e.length) return !0;
  const t = n.type.slice(6).toLowerCase(), r = O1(n.name), i = e.map((s) => s.toLowerCase());
  return i.includes(t) || (r ? i.includes(r) : !1) || t === "jpeg" && i.includes("jpg");
};
let ga = 0;
const I1 = () => (ga += 1, `cw-upload-${ga}-${Math.random().toString(36).slice(2, 8)}`), D1 = (n, e) => {
  let t = null;
  return n.state.doc.descendants((r, i) => {
    var s;
    return t ? !1 : (((s = r.attrs) == null ? void 0 : s.uploadId) === e && (t = { pos: i, attrs: r.attrs }), !0);
  }), t;
}, R1 = $.create({
  name: "imageUpload",
  addOptions() {
    return {
      upload: null,
      allowedTypes: Pd,
      maxSizeMb: A1,
      // eslint-disable-next-line no-alert
      onError: (n) => window.alert(n)
    };
  },
  addCommands() {
    const n = (e) => {
      const { editor: t } = this, { upload: r, maxSizeMb: i, allowedTypes: s, onError: o } = this.options;
      if (!r) {
        o("Image upload is not configured for this editor.");
        return;
      }
      if (!N1(e, s)) {
        o(`${e.name} is not a supported image type.`);
        return;
      }
      if (e.size / 1048576 > i) {
        o(`Selected image size is greater than ${i}MB.`);
        return;
      }
      const l = I1(), a = URL.createObjectURL(e), c = new AbortController();
      t.commands.insertContent({
        type: "ckImageBlock",
        attrs: { src: a, uploadId: l, uploading: !0 }
      });
      const u = (f) => {
        const h = t.view.dom.querySelector(`figure[data-upload-id="${l}"] .cw-image__progress`);
        h && (h.style.width = `${Math.round(f * 100)}%`);
      }, d = (f) => {
        const h = D1(t, l);
        if (URL.revokeObjectURL(a), !h) return;
        const { tr: p } = t.state;
        f ? p.setNodeMarkup(h.pos, void 0, { ...h.attrs, ...f, uploadId: null, uploading: !1 }) : p.delete(h.pos, h.pos + 1), t.view.dispatch(p);
      };
      r(e, {
        signal: c.signal,
        onProgress: ({ loaded: f, total: h }) => u(h ? f / h : 0)
      }).then((f) => {
        const h = typeof f == "string" ? f : f == null ? void 0 : f.url;
        if (!h) throw new Error(`Couldn't upload file: ${e.name}.`);
        d({ src: h });
      }).catch((f) => {
        d(null), o((f == null ? void 0 : f.message) || `Couldn't upload file: ${e.name}.`);
      });
    };
    return {
      uploadImages: (e) => () => (Array.from(e).forEach(n), !0),
      openImageFilePicker: () => ({ commands: e }) => {
        const t = document.createElement("input");
        return t.type = "file", t.accept = this.options.allowedTypes.map((r) => `image/${r === "jpg" ? "jpeg" : r}`).join(","), t.multiple = !0, t.style.display = "none", t.addEventListener("change", () => {
          var r;
          (r = t.files) != null && r.length && e.uploadImages(t.files), t.remove();
        }), document.body.appendChild(t), t.click(), !0;
      },
      insertImageByUrl: (e) => ({ commands: t }) => e ? t.insertContent({ type: "ckImageBlock", attrs: { src: e } }) : !1
    };
  },
  addProseMirrorPlugins() {
    const { editor: n } = this, e = (t) => Array.from(t || []).filter((r) => r.type.startsWith("image/"));
    return [
      new z({
        key: new W("cwImageUploadDropPaste"),
        props: {
          handlePaste: (t, r) => {
            var s;
            const i = e((s = r.clipboardData) == null ? void 0 : s.files);
            return i.length ? (r.preventDefault(), n.commands.uploadImages(i), !0) : !1;
          },
          handleDrop: (t, r) => {
            var s;
            const i = e((s = r.dataTransfer) == null ? void 0 : s.files);
            return i.length ? (r.preventDefault(), n.commands.uploadImages(i), !0) : !1;
          }
        }
      })
    ];
  }
}), L1 = Be.create({
  name: "mention",
  inclusive: !1,
  spanning: !1,
  excludes: "_",
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-mention"),
        renderHTML: (n) => n.id ? { "data-mention": n.id } : {}
      },
      resourceType: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-resource-type"),
        renderHTML: (n) => n.resourceType ? { "data-resource-type": n.resourceType } : {}
      },
      resourceId: {
        default: null,
        parseHTML: (n) => n.getAttribute("data-resource-id"),
        renderHTML: (n) => n.resourceId === null || n.resourceId === void 0 ? {} : { "data-resource-id": n.resourceId }
      },
      href: {
        default: null,
        parseHTML: (n) => n.getAttribute("href"),
        renderHTML: (n) => n.href ? { href: n.href } : {}
      }
    };
  },
  parseHTML() {
    return [
      { tag: "a.mention[data-mention]", priority: 60 },
      // CKEditor's stock mention converter, used before the custom adapter landed.
      { tag: "span.mention[data-mention]", priority: 60 }
    ];
  },
  renderHTML({ HTMLAttributes: n }) {
    return ["a", V({ class: "mention" }, n), 0];
  }
}), ya = "ck-body-wrapper", P1 = () => {
  const n = document.querySelector(`.${ya}`);
  if (n) return n;
  const e = document.createElement("div");
  return e.className = `ck ${ya}`, document.body.appendChild(e), e;
}, B1 = (n) => {
  const e = document.createElement("span");
  return e.className = "mention-list-item", e.textContent = String(n.text || n.name || n.id || ""), e;
};
class $1 {
  constructor(e) {
    this.items = [], this.selectedIndex = -1, this.callbacks = e, this.panel = document.createElement("div"), this.panel.className = "ck ck-reset_all ck-balloon-panel ck-balloon-panel_visible cw-mentions-panel", this.list = document.createElement("ul"), this.list.className = "ck ck-reset ck-list ck-mentions cw-mentions", this.panel.appendChild(this.list);
  }
  get isOpen() {
    return this.panel.isConnected;
  }
  get currentItems() {
    return this.items;
  }
  get currentIndex() {
    return this.selectedIndex;
  }
  renderRow(e, t, r) {
    const i = document.createElement("li");
    i.className = "ck ck-list__item";
    const s = (r || B1)(e);
    return s.classList.add("ck", "ck-button"), e.isDisabled && s.classList.add("ck-disabled"), t === this.selectedIndex && s.classList.add("ck-on"), s.addEventListener("mousedown", (o) => {
      o.preventDefault(), o.stopPropagation(), this.callbacks.onSelect(e, t);
    }), i.appendChild(s), i;
  }
  render(e, t = {}) {
    const r = this.list.scrollTop;
    this.items = e, this.selectedIndex >= e.length && (this.selectedIndex = -1), this.list.textContent = "", e.forEach((i, s) => this.list.appendChild(this.renderRow(i, s, t.itemRenderer))), t.preserveScroll && (this.list.scrollTop = r);
  }
  /** Mirrors the CKEditor fork's `selectFirst(firstFocusIndex)`: skip header rows. */
  selectIndex(e, { scroll: t = !0 } = {}) {
    if (this.selectedIndex = e, Array.from(this.list.children).forEach((i, s) => {
      const o = i.firstElementChild;
      o && o.classList.toggle("ck-on", s === e);
    }), !t || e < 0) return;
    const r = this.list.children[e];
    typeof (r == null ? void 0 : r.scrollIntoView) == "function" && r.scrollIntoView({ block: "nearest" });
  }
  selectFirstSelectable(e = 0) {
    const t = this.items.findIndex((r, i) => i >= e && !r.isDisabled && !r.nestedFeedId);
    this.selectIndex(t === -1 ? this.items.findIndex((r) => !r.isDisabled) : t);
  }
  moveSelection(e) {
    const t = this.items.length;
    if (!t) return;
    const r = (s) => {
      var o;
      return !((o = this.items[s]) != null && o.isDisabled);
    };
    let i = this.selectedIndex;
    for (let s = 0; s < t && (i = (i + e + t) % t, !r(i)); s += 1)
      ;
    this.selectIndex(i);
  }
  open(e) {
    this.panel.isConnected || P1().appendChild(this.panel), this.setPosition(e);
  }
  setPosition({ left: e, top: t, bottom: r }) {
    const i = this.panel.offsetHeight || 320, o = window.innerHeight - r < i && t > i;
    this.panel.style.position = "absolute", this.panel.style.left = `${Math.round(e + window.scrollX)}px`, this.panel.style.top = o ? `${Math.round(t + window.scrollY - i)}px` : `${Math.round(r + window.scrollY)}px`, this.panel.classList.toggle("cw-mentions-panel--above", o);
  }
  close() {
    this.panel.remove(), this.list.textContent = "", this.items = [], this.selectedIndex = -1;
  }
  destroy() {
    this.close(), this.panel.remove();
  }
}
const ke = new W("cwMentionSuggest"), z1 = 100, _1 = 50, ba = "\0", F1 = (n) => n === "" || /[\s(\["'\u00A0]/.test(n), H1 = $.create({
  name: "mentionSuggest",
  addOptions() {
    return { feeds: [] };
  },
  addStorage() {
    return { feeds: this.options.feeds };
  },
  addProseMirrorPlugins() {
    const { editor: n } = this, e = () => this.editor.storage.mentionSuggest, t = (p) => e().feeds.find((m) => m.marker === p);
    let r = null, i = 0, s = "", o;
    const l = (p) => ke.getState(p.state) || null, a = (p) => {
      s = "", i += 1, r == null || r.close(), ke.getState(p.state) && p.dispatch(p.state.tr.setMeta(ke, null));
    }, c = (p, m) => {
      const g = l(p);
      if (!g) return;
      const y = String(m.text || m.id || m.name || ""), b = {
        id: m.id,
        resourceType: m.resourceType ?? null,
        resourceId: m.idValue ?? null,
        href: m.link ?? null
      }, S = g.markerPos, w = p.state.selection.head;
      i += 1, s = "", r == null || r.close(), n.chain().focus().insertContentAt({ from: S, to: w }, [
        { type: "text", text: y, marks: [{ type: "mention", attrs: b }] },
        { type: "text", text: " " }
      ]).command(({ tr: E }) => (E.setMeta(ke, null), !0)).run();
    }, u = (p) => (m) => {
      const g = l(p);
      if (g && (typeof m.onSelect == "function" && m.onSelect({ selectedItem: m, marker: g.marker }), !m.isDisabled)) {
        if (m.nestedFeedId) {
          if (!m.isClickable) return;
          p.dispatch(p.state.tr.setMeta(ke, { ...g, clickedItem: m }));
          return;
        }
        c(p, m);
      }
    }, d = (p, m) => {
      try {
        const g = p.coordsAtPos(m.markerPos);
        return { left: g.left, top: g.top, bottom: g.bottom };
      } catch {
        return { left: 0, top: 0, bottom: 0 };
      }
    }, f = (p, m, g, y) => {
      if (!r) return;
      const b = t(m.marker);
      if (r.render(g, { itemRenderer: b == null ? void 0 : b.itemRenderer, preserveScroll: y }), !g.length) {
        r.close();
        return;
      }
      r.open(d(p, m)), (!y || r.currentIndex === -1) && r.selectFirstSelectable();
    }, h = (p, m) => {
      const g = t(m.marker);
      if (!g) return;
      if (m.query.length < (g.minimumCharacters ?? 0)) {
        r == null || r.close();
        return;
      }
      i += 1;
      const y = i, b = (w) => {
        if (y !== i) return;
        const E = l(p);
        E && f(p, E, w || [], !0);
      }, S = g.feed(m.query, m.clickedItem, b);
      Promise.resolve(S).then((w) => {
        if (!Array.isArray(w) || y !== i) return;
        const E = l(p);
        E && f(p, E, w, !1);
      }).catch(() => {
        y === i && (r == null || r.close());
      });
    };
    return [
      new z({
        key: ke,
        state: {
          init: () => null,
          apply(p, m, g, y) {
            const b = p.getMeta(ke);
            if (b !== void 0) return b;
            if (!m) return null;
            const S = p.mapping.mapResult(m.markerPos);
            if (S.deleted) return null;
            const w = S.pos;
            if (y.doc.textBetween(w, Math.min(w + 1, y.doc.content.size)) !== m.marker) return null;
            const { selection: E } = y;
            if (!E.empty || E.head <= w) return null;
            const A = y.doc.textBetween(w + 1, E.head, `
`, ba);
            return A.includes(`
`) || A.includes(ba) || A.length > _1 ? null : { ...m, markerPos: w, query: A };
          }
        },
        appendTransaction(p, m, g) {
          if (ke.getState(m) || ke.getState(g) || !p.some((A) => A.docChanged && !A.getMeta("paste") && !A.getMeta("uiEvent")) || !g.selection.empty) return null;
          const { head: b } = g.selection;
          if (b < 1) return null;
          const S = g.doc.textBetween(b - 1, b);
          if (!t(S)) return null;
          const w = b >= 2 ? g.doc.textBetween(b - 2, b - 1) : "";
          if (!F1(w)) return null;
          const E = g.schema.marks.mention;
          return E && E.isInSet(g.doc.resolve(b).marks()) ? null : g.tr.setMeta(ke, { marker: S, markerPos: b - 1, query: "" });
        },
        props: {
          handleKeyDown(p, m) {
            if (!ke.getState(p.state) || !(r != null && r.isOpen)) return !1;
            if (m.key === "ArrowDown")
              return r.moveSelection(1), !0;
            if (m.key === "ArrowUp")
              return r.moveSelection(-1), !0;
            if (m.key === "Escape")
              return a(p), !0;
            if (m.key === "Enter" || m.key === "Tab") {
              const y = r.currentItems[r.currentIndex];
              return y ? (u(p)(y), !0) : !1;
            }
            return !1;
          },
          handleDOMEvents: {
            blur: (p) => (a(p), !1)
          }
        },
        view(p) {
          return r = new $1({ onSelect: (m) => u(p)(m) }), {
            update(m, g) {
              var w, E;
              const y = ke.getState(m.state), b = ke.getState(g);
              if (!y) {
                b && (s = "", r == null || r.close());
                return;
              }
              r != null && r.isOpen && r.setPosition(d(m, y));
              const S = `${y.marker}|${y.query}|${((w = y.clickedItem) == null ? void 0 : w.nestedFeedId) ?? ""}|${((E = y.clickedItem) == null ? void 0 : E.id) ?? ""}`;
              S !== s && (s = S, o && clearTimeout(o), o = setTimeout(() => h(m, y), z1));
            },
            destroy() {
              o && clearTimeout(o), r == null || r.destroy(), r = null;
            }
          };
        }
      })
    ];
  }
}), V1 = (n) => /urn:schemas-microsoft-com|mso-|class="?Mso|docs-internal-guid/i.test(n), j1 = ["style", "meta", "link", "xml", "o\\:p", "w\\:sdt", "v\\:shapetype", "v\\:shape"], W1 = (n) => {
  j1.forEach((r) => {
    n.querySelectorAll(r).forEach((i) => i.remove());
  });
  const e = document.createTreeWalker(n, NodeFilter.SHOW_COMMENT), t = [];
  for (; e.nextNode(); ) t.push(e.currentNode);
  t.forEach((r) => r.remove());
}, U1 = (n) => {
  n.querySelectorAll("b, strong").forEach((e) => {
    const t = e.style.fontWeight;
    (t === "normal" || t === "400" || e.id.startsWith("docs-internal-guid")) && e.replaceWith(...Array.from(e.childNodes));
  });
}, q1 = (n) => {
  n.querySelectorAll("span[style], p[style], div[style]").forEach((e) => {
    const { fontWeight: t, fontStyle: r, textDecoration: i, textDecorationLine: s } = e.style, o = parseInt(t, 10), l = `${i} ${s}`, a = [];
    if ((t === "bold" || t === "bolder" || !Number.isNaN(o) && o >= 600) && a.push("strong"), r === "italic" && a.push("i"), l.includes("underline") && a.push("u"), l.includes("line-through") && a.push("s"), !a.length) return;
    const c = a.reduce((d, f) => {
      const h = document.createElement(f);
      return d && h.appendChild(d), h;
    }, null);
    if (!c) return;
    let u = c;
    for (; u.firstElementChild; ) u = u.firstElementChild;
    for (; e.firstChild; ) u.appendChild(e.firstChild);
    e.appendChild(c), e.removeAttribute("style");
  });
}, ka = /^\s*([•·§\-*o])\s+/, Sa = /^\s*(\d+|[a-z]|[ivx]+)[.)]\s+/i, K1 = (n) => {
  var r;
  const e = Array.from(n.querySelectorAll("p"));
  let t = 0;
  for (; t < e.length; ) {
    const i = e[t];
    if (!(i.style.getPropertyValue("mso-list") || /MsoList/i.test(i.className))) {
      t += 1;
      continue;
    }
    const o = [];
    let l = i;
    for (; l && (l.style.getPropertyValue("mso-list") || /MsoList/i.test(l.className)); ) {
      o.push(l);
      const d = l.nextElementSibling;
      l = d && d.tagName === "P" ? d : void 0;
    }
    const a = o[0].textContent || "", c = !ka.test(a) && Sa.test(a), u = document.createElement(c ? "ol" : "ul");
    (r = o[0].parentNode) == null || r.insertBefore(u, o[0]), o.forEach((d) => {
      d.querySelectorAll('[style*="mso-list:Ignore"], [style*="mso-list: Ignore"]').forEach((h) => h.remove());
      const f = document.createElement("li");
      for (; d.firstChild; ) f.appendChild(d.firstChild);
      f.innerHTML = f.innerHTML.replace(ka, "").replace(Sa, ""), u.appendChild(f), d.remove();
    }), t += o.length;
  }
}, J1 = (n) => {
  n.querySelectorAll("*").forEach((e) => {
    Array.from(e.attributes).forEach((t) => {
      const r = t.name.toLowerCase();
      if (!["href", "src", "alt", "colspan", "rowspan", "data-mention", "data-resource-type", "data-resource-id"].includes(r)) {
        if (r === "class") {
          const i = Array.from(e.classList).filter(
            (s) => /^(mention|image|image_resized|image-style-align-(left|right)|text-(tiny|small|big|huge)|marker-(yellow|green|pink|blue)|pen-(red|green))$/.test(s)
          );
          i.length ? e.className = i.join(" ") : e.removeAttribute("class");
          return;
        }
        if (r === "style") {
          const i = e.style.marginLeft, s = e.style.width;
          e.removeAttribute("style"), i && /^\d/.test(i) && ["P", "BLOCKQUOTE", "H1", "H2", "H3", "H4", "H5", "H6"].includes(e.tagName) && (e.style.marginLeft = i), s && ["IMG", "FIGURE"].includes(e.tagName) && (e.style.width = s);
          return;
        }
        e.removeAttribute(t.name);
      }
    });
  }), n.querySelectorAll("span").forEach((e) => {
    e.attributes.length || e.replaceWith(...Array.from(e.childNodes));
  }), n.querySelectorAll("font").forEach((e) => e.replaceWith(...Array.from(e.childNodes)));
}, G1 = (n) => {
  if (!V1(n)) return n;
  const e = document.createElement("div");
  return e.innerHTML = n, W1(e), U1(e), q1(e), K1(e), J1(e), e.innerHTML;
}, Q1 = $.create({
  name: "pasteFromOffice",
  addProseMirrorPlugins() {
    return [
      new z({
        key: new W("cwPasteFromOffice"),
        props: {
          transformPastedHTML: (n) => G1(n)
        }
      })
    ];
  }
}), Y1 = $.create({
  name: "submitOnCtrlEnter",
  addOptions() {
    return { onSubmit: null };
  },
  addKeyboardShortcuts() {
    const n = () => {
      const e = this.options.onSubmit;
      return typeof e != "function" ? !1 : (e(), !0);
    };
    return { "Mod-Enter": n, "Ctrl-Enter": n };
  }
}), X1 = {
  oneHalf: ["oneHalf"],
  oneForth: ["oneQuarter"],
  oneQuarter: ["oneQuarter"],
  threeQuarters: ["threeQuarters"],
  oneThird: [],
  twoThirds: [],
  ellipsis: ["ellipsis"],
  horizontalEllipsis: ["ellipsis"],
  enDash: ["emDash"],
  emDash: ["emDash"],
  quotesPrimary: ["openDoubleQuote", "closeDoubleQuote"],
  quotesSecondary: ["openSingleQuote", "closeSingleQuote"],
  arrowLeft: ["leftArrow"],
  arrowRight: ["rightArrow"],
  notEqual: ["notEqual"],
  copyright: ["copyright"],
  trademark: ["trademark"],
  registeredTrademark: ["registeredTrademark"]
}, Z1 = ["laquo", "raquo", "multiplication", "superscriptTwo", "superscriptThree", "servicemark", "plusMinus"], eS = (n) => {
  var t, r;
  const e = {};
  return Z1.forEach((i) => {
    e[i] = !1;
  }), (((r = (t = n.typing) == null ? void 0 : t.transformations) == null ? void 0 : r.remove) || []).forEach((i) => {
    (X1[i] || []).forEach((s) => {
      e[s] = !1;
    });
  }), e;
}, tS = ({ config: n, upload: e = null, onSubmit: t = null, placeholder: r, onUploadError: i }) => {
  var o, l, a, c, u, d;
  const s = ((l = (o = n.image) == null ? void 0 : o.upload) == null ? void 0 : l.types) || Pd;
  return [
    Vk.configure({
      // Replaced below with the CKEditor-compatible versions.
      link: !1,
      heading: !1,
      // Not part of the CKEditor build: keeping them out matches what the editor
      // accepts today (`~~`, backticks and code blocks stay literal text).
      strike: !1,
      code: !1,
      codeBlock: !1,
      horizontalRule: !1,
      // CKEditor does not append an empty paragraph to every document, and the
      // stored HTML must not grow one on save.
      trailingNode: !1,
      bulletList: { keepMarks: !0, keepAttributes: !1 },
      orderedList: { keepMarks: !0, keepAttributes: !1 }
    }),
    // Parse-only: no input rule, so typing "# " or "---" stays literal text as in
    // CKEditor. `#` in particular is a mention marker in this app.
    Ku.extend({ addInputRules: () => [] }).configure({ levels: [1, 2, 3, 4, 5, 6] }),
    Ju.extend({ addInputRules: () => [] }),
    l1.configure(eS(n)),
    c1,
    u1,
    h1,
    m1,
    b1.configure({
      defaultProtocol: ((a = n.link) == null ? void 0 : a.defaultProtocol) || "https://",
      addTargetToExternalLinks: ((c = n.link) == null ? void 0 : c.addTargetToExternalLinks) !== !1
    }),
    M1.configure({ resizable: !0, resizeUnit: ((u = n.image) == null ? void 0 : u.resizeUnit) || "px" }),
    T1,
    R1.configure({
      upload: e,
      allowedTypes: s,
      ...i ? { onError: i } : {}
    }),
    L1,
    H1.configure({ feeds: ((d = n.mention) == null ? void 0 : d.feeds) || [] }),
    Q1,
    Y1.configure({ onSubmit: t }),
    Pk.configure({ placeholder: r || n.placeholder || "" })
  ];
}, Ht = (n, e) => ({
  label: n,
  characters: e.map(([t, r]) => ({ character: t, title: r }))
}), nS = [
  Ht("Text", [
    ["‘", "Left single quotation mark"],
    ["’", "Right single quotation mark"],
    ["“", "Left double quotation mark"],
    ["”", "Right double quotation mark"],
    ["–", "En dash"],
    ["—", "Em dash"],
    ["…", "Horizontal ellipsis"],
    ["§", "Section sign"],
    ["¶", "Paragraph sign"],
    ["†", "Dagger"],
    ["•", "Bullet"],
    ["′", "Prime"],
    ["″", "Double prime"]
  ]),
  Ht("Latin", [
    ["À", "Latin capital letter a with grave"],
    ["Á", "Latin capital letter a with acute"],
    ["Ä", "Latin capital letter a with diaeresis"],
    ["Ç", "Latin capital letter c with cedilla"],
    ["É", "Latin capital letter e with acute"],
    ["Ö", "Latin capital letter o with diaeresis"],
    ["Ü", "Latin capital letter u with diaeresis"],
    ["à", "Latin small letter a with grave"],
    ["á", "Latin small letter a with acute"],
    ["ä", "Latin small letter a with diaeresis"],
    ["ç", "Latin small letter c with cedilla"],
    ["é", "Latin small letter e with acute"],
    ["ñ", "Latin small letter n with tilde"],
    ["ö", "Latin small letter o with diaeresis"],
    ["ü", "Latin small letter u with diaeresis"],
    ["ß", "Latin small letter sharp s"]
  ]),
  Ht("Currency", [
    ["$", "Dollar sign"],
    ["£", "Pound sign"],
    ["€", "Euro sign"],
    ["¥", "Yen sign"],
    ["¢", "Cent sign"],
    ["₹", "Indian rupee sign"],
    ["₩", "Won sign"],
    ["₽", "Ruble sign"],
    ["ƒ", "Latin small letter f with hook"],
    ["¤", "Currency sign"]
  ]),
  Ht("Mathematical", [
    ["<", "Less-than sign"],
    [">", "Greater-than sign"],
    ["≤", "Less-than or equal to"],
    ["≥", "Greater-than or equal to"],
    ["≠", "Not equal to"],
    ["±", "Plus-minus sign"],
    ["×", "Multiplication sign"],
    ["÷", "Division sign"],
    ["≈", "Almost equal to"],
    ["∞", "Infinity"],
    ["°", "Degree sign"],
    ["%", "Percent sign"],
    ["‰", "Per mille sign"],
    ["½", "Vulgar fraction one half"],
    ["¼", "Vulgar fraction one quarter"],
    ["¾", "Vulgar fraction three quarters"]
  ]),
  Ht("Arrows", [
    ["←", "Leftwards arrow"],
    ["↑", "Upwards arrow"],
    ["→", "Rightwards arrow"],
    ["↓", "Downwards arrow"],
    ["↔", "Left right arrow"],
    ["↵", "Downwards arrow with corner leftwards"],
    ["⇒", "Rightwards double arrow"],
    ["⇔", "Left right double arrow"]
  ]),
  Ht("Symbols", [
    ["©", "Copyright sign"],
    ["®", "Registered sign"],
    ["™", "Trade mark sign"],
    ["★", "Black star"],
    ["✓", "Check mark"],
    ["✗", "Ballot x"],
    ["✉", "Envelope"],
    ["☎", "Telephone"]
  ])
], ce = (n) => /* @__PURE__ */ k("svg", { viewBox: "0 0 20 20", width: "16", height: "16", "aria-hidden": "true", focusable: "false", children: n }), Kn = (n, e = {}) => /* @__PURE__ */ k("span", { className: "cw-toolbar__glyph", style: e, "aria-hidden": "true", children: n }), rS = () => Kn("B", { fontWeight: "700" }), iS = () => Kn("I", { fontStyle: "italic", fontFamily: "Georgia, serif" }), sS = () => Kn("U", { textDecoration: "underline" }), oS = () => Kn("A", { fontWeight: "600" }), lS = () => ce(
  /* @__PURE__ */ j(le, { children: [
    /* @__PURE__ */ k("path", { d: "M4 13.2 11.4 5.8l2.8 2.8L6.8 16H4v-2.8Z", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "3", y: "17", width: "14", height: "2", rx: "1", fill: "currentColor" })
  ] })
), aS = () => ce(
  /* @__PURE__ */ k(le, { children: [5, 10, 15].map((n) => /* @__PURE__ */ j("g", { children: [
    /* @__PURE__ */ k("circle", { cx: "4", cy: n, r: "1.4", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "7.5", y: n - 0.9, width: "9", height: "1.8", rx: "0.9", fill: "currentColor" })
  ] }, n)) })
), cS = () => ce(
  /* @__PURE__ */ k(le, { children: ["1", "2", "3"].map((n, e) => /* @__PURE__ */ j("g", { children: [
    /* @__PURE__ */ k("text", { x: "2", y: e * 5 + 7, fontSize: "5.5", fill: "currentColor", children: n }),
    /* @__PURE__ */ k("rect", { x: "7.5", y: e * 5 + 4.1, width: "9", height: "1.8", rx: "0.9", fill: "currentColor" })
  ] }, n)) })
), Bd = (n) => /* @__PURE__ */ k(le, { children: n.map((e, t) => /* @__PURE__ */ k("rect", { x: e, y: 3 + t * 4, width: 16 - e, height: "1.8", rx: "0.9", fill: "currentColor" }, t)) }), uS = () => ce(
  /* @__PURE__ */ j(le, { children: [
    Bd([2, 6, 6, 2]),
    /* @__PURE__ */ k("path", { d: "M2 8.2 4.6 10 2 11.8Z", fill: "currentColor" })
  ] })
), dS = () => ce(
  /* @__PURE__ */ j(le, { children: [
    Bd([2, 6, 6, 2]),
    /* @__PURE__ */ k("path", { d: "M4.6 8.2 2 10l2.6 1.8Z", fill: "currentColor" })
  ] })
), fS = () => ce(
  /* @__PURE__ */ k(
    "path",
    {
      d: "M8.2 11.8a3.4 3.4 0 0 1 0-4.8l2-2a3.4 3.4 0 0 1 4.8 4.8l-1 1-1.4-1.4 1-1a1.4 1.4 0 0 0-2-2l-2 2a1.4 1.4 0 0 0 0 2l-1.4 1.4Zm3.6-3.6a3.4 3.4 0 0 1 0 4.8l-2 2a3.4 3.4 0 0 1-4.8-4.8l1-1 1.4 1.4-1 1a1.4 1.4 0 0 0 2 2l2-2a1.4 1.4 0 0 0 0-2l1.4-1.4Z",
      fill: "currentColor"
    }
  )
), hS = () => ce(
  /* @__PURE__ */ j(le, { children: [
    /* @__PURE__ */ k("path", { d: "M7 12.6 5.6 14a3.4 3.4 0 0 1-1-4.8l1-1L7 9.6l-1 1a1.4 1.4 0 0 0 1 2.1Z", fill: "currentColor" }),
    /* @__PURE__ */ k("path", { d: "M13 7.4 14.4 6a3.4 3.4 0 0 1 1 4.8l-1 1L13 10.4l1-1a1.4 1.4 0 0 0-1-2.1Z", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "3", y: "9.2", width: "14", height: "1.6", rx: "0.8", transform: "rotate(45 10 10)", fill: "currentColor" })
  ] })
), pS = () => ce(
  /* @__PURE__ */ j(le, { children: [
    /* @__PURE__ */ k("rect", { x: "3", y: "4", width: "2.4", height: "12", rx: "1.2", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "7.5", y: "5", width: "9.5", height: "1.8", rx: "0.9", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "7.5", y: "9.1", width: "9.5", height: "1.8", rx: "0.9", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "7.5", y: "13.2", width: "6", height: "1.8", rx: "0.9", fill: "currentColor" })
  ] })
), mS = () => ce(
  /* @__PURE__ */ j(le, { children: [
    /* @__PURE__ */ k("text", { x: "3", y: "14", fontSize: "11", fontWeight: "700", fill: "currentColor", children: "A" }),
    /* @__PURE__ */ k("path", { d: "M11 5.6 16.4 11l-1.4 1.4L9.6 7l1.4-1.4Z", fill: "currentColor" }),
    /* @__PURE__ */ k("path", { d: "M16.4 5.6 11 11 9.6 9.6 15 4.2l1.4 1.4Z", fill: "currentColor" })
  ] })
), gS = () => ce(
  /* @__PURE__ */ j(le, { children: [
    /* @__PURE__ */ k("path", { d: "M3 4h14v9H3V4Zm1.6 7.4h10.8l-3.2-4-2.6 3.2-1.6-1.8-3.4 2.6Z", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "3", y: "15", width: "14", height: "1.8", rx: "0.9", fill: "currentColor" })
  ] })
), yS = () => ce(
  /* @__PURE__ */ j(le, { children: [
    /* @__PURE__ */ k("path", { d: "M3 4h14v9H3V4Zm1.6 7.4h10.8l-3.2-4-2.6 3.2-1.6-1.8-3.4 2.6Z", fill: "currentColor" }),
    /* @__PURE__ */ k("path", { d: "M13.4 14h1.8v2h2v1.8h-2v2h-1.8v-2h-2V16h2v-2Z", fill: "currentColor" })
  ] })
), bS = () => ce(
  /* @__PURE__ */ j(le, { children: [
    /* @__PURE__ */ k("rect", { x: "3", y: "4", width: "7", height: "7", rx: "1", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "11", y: "4.4", width: "6", height: "1.6", rx: "0.8", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "11", y: "8", width: "6", height: "1.6", rx: "0.8", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "3", y: "13", width: "14", height: "1.6", rx: "0.8", fill: "currentColor" })
  ] })
), kS = () => ce(
  /* @__PURE__ */ j(le, { children: [
    /* @__PURE__ */ k("rect", { x: "10", y: "4", width: "7", height: "7", rx: "1", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "3", y: "4.4", width: "6", height: "1.6", rx: "0.8", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "3", y: "8", width: "6", height: "1.6", rx: "0.8", fill: "currentColor" }),
    /* @__PURE__ */ k("rect", { x: "3", y: "13", width: "14", height: "1.6", rx: "0.8", fill: "currentColor" })
  ] })
), SS = () => ce(
  /* @__PURE__ */ j(le, { children: [
    /* @__PURE__ */ k("rect", { x: "3", y: "4", width: "14", height: "12", rx: "1.4", fill: "none", stroke: "currentColor", strokeWidth: "1.6" }),
    /* @__PURE__ */ k("path", { d: "M9 14h5V9l-5 5Z", fill: "currentColor" })
  ] })
), wS = () => Kn("Ω"), xS = () => ce(
  /* @__PURE__ */ k(
    "path",
    {
      d: "M8 6V3.4L3.6 7.2 8 11V8.2c2.6 0 4.6 1.6 4.6 4.1 0 .9-.2 1.7-.6 2.4l1.6.9c.6-1 .9-2.1.9-3.3 0-3.6-2.9-6.3-6.5-6.3Z",
      fill: "currentColor"
    }
  )
), CS = () => ce(
  /* @__PURE__ */ k("g", { transform: "translate(20 0) scale(-1 1)", children: /* @__PURE__ */ k(
    "path",
    {
      d: "M8 6V3.4L3.6 7.2 8 11V8.2c2.6 0 4.6 1.6 4.6 4.1 0 .9-.2 1.7-.6 2.4l1.6.9c.6-1 .9-2.1.9-3.3 0-3.6-2.9-6.3-6.5-6.3Z",
      fill: "currentColor"
    }
  ) })
), ES = [
  { name: "resizeImage:original", label: "Original", value: null },
  { name: "resizeImage:150", label: "150px", value: "150" },
  { name: "resizeImage:250", label: "250px", value: "250" }
], ie = ({ title: n, onClick: e, isActive: t = !1, isDisabled: r = !1, children: i }) => /* @__PURE__ */ k(
  "button",
  {
    type: "button",
    className: `cw-toolbar__button${t ? " cw-toolbar__button--on" : ""}`,
    title: n,
    "aria-label": n,
    "aria-pressed": t,
    disabled: r,
    onMouseDown: (s) => s.preventDefault(),
    onClick: e,
    children: i
  }
), $d = (n) => {
  const e = Jt(null);
  return je(() => {
    const t = (i) => {
      e.current && !e.current.contains(i.target) && n();
    }, r = (i) => {
      i.key === "Escape" && n();
    };
    return document.addEventListener("mousedown", t), document.addEventListener("keydown", r), () => {
      document.removeEventListener("mousedown", t), document.removeEventListener("keydown", r);
    };
  }, [n]), e;
}, gn = ({ title: n, icon: e, isActive: t = !1, children: r }) => {
  const [i, s] = It(!1), o = () => s(!1), l = $d(o);
  return /* @__PURE__ */ j("div", { className: "cw-toolbar__dropdown", ref: l, children: [
    /* @__PURE__ */ j(ie, { title: n, isActive: t || i, onClick: () => s((a) => !a), children: [
      e,
      /* @__PURE__ */ k("span", { className: "cw-toolbar__caret", "aria-hidden": "true" })
    ] }),
    i && /* @__PURE__ */ k("div", { className: "cw-toolbar__panel", children: r(o) })
  ] });
}, vS = ({ editor: n }) => {
  const [e, t] = It(!1), [r, i] = It(""), s = () => t(!1), o = $d(s), l = n.isActive("link"), a = () => {
    i(n.getAttributes("link").href || ""), t(!0);
  }, c = () => {
    const u = Nd(r);
    u ? n.chain().focus().extendMarkRange("link").setLink({ href: u }).run() : n.chain().focus().unsetLink().run(), s();
  };
  return /* @__PURE__ */ j("div", { className: "cw-toolbar__dropdown", ref: o, children: [
    /* @__PURE__ */ k(ie, { title: "Link (Ctrl+K)", isActive: l || e, onClick: () => e ? s() : a(), children: /* @__PURE__ */ k(fS, {}) }),
    e && /* @__PURE__ */ j("div", { className: "cw-toolbar__panel cw-toolbar__panel--form ck-responsive-form", children: [
      /* @__PURE__ */ k(
        "input",
        {
          className: "cw-toolbar__input",
          type: "text",
          value: r,
          placeholder: "https://",
          autoFocus: !0,
          onChange: (u) => i(u.target.value),
          onKeyDown: (u) => {
            u.key === "Enter" && (u.preventDefault(), c());
          }
        }
      ),
      /* @__PURE__ */ k("button", { type: "button", className: "cw-toolbar__action", onClick: c, children: "Save" }),
      l && /* @__PURE__ */ k(
        "button",
        {
          type: "button",
          className: "cw-toolbar__action cw-toolbar__action--secondary",
          title: "Unlink",
          onClick: () => {
            n.chain().focus().extendMarkRange("link").unsetLink().run(), s();
          },
          children: /* @__PURE__ */ k(hS, {})
        }
      )
    ] })
  ] });
}, MS = ({ editor: n }) => {
  const [e, t] = It("");
  return /* @__PURE__ */ k(gn, { title: "Insert image via URL", icon: /* @__PURE__ */ k(yS, {}), children: (r) => /* @__PURE__ */ j("div", { className: "cw-toolbar__panel--form ck-responsive-form", children: [
    /* @__PURE__ */ k(
      "input",
      {
        className: "cw-toolbar__input",
        type: "text",
        value: e,
        placeholder: "https://",
        autoFocus: !0,
        onChange: (i) => t(i.target.value)
      }
    ),
    /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        className: "cw-toolbar__action",
        onClick: () => {
          e.trim() && n.chain().focus().insertImageByUrl(Nd(e.trim())).run(), t(""), r();
        },
        children: "Insert"
      }
    )
  ] }) });
}, TS = ({ editor: n, items: e, config: t }) => {
  var a, c, u;
  const [, r] = It(0);
  je(() => {
    const d = () => r((f) => f + 1);
    return n.on("transaction", d), n.on("selectionUpdate", d), () => {
      n.off("transaction", d), n.off("selectionUpdate", d);
    };
  }, [n]);
  const i = n.isActive("ckImageBlock") || n.isActive("ckImageInline"), s = (c = (a = t.image) == null ? void 0 : a.resizeOptions) != null && c.length ? t.image.resizeOptions : ES, o = ((u = t.image) == null ? void 0 : u.styles) || ["alignLeft", "alignRight"], l = {
    bold: () => /* @__PURE__ */ k(ie, { title: "Bold (Ctrl+B)", isActive: n.isActive("bold"), onClick: () => n.chain().focus().toggleBold().run(), children: /* @__PURE__ */ k(rS, {}) }, "bold"),
    italic: () => /* @__PURE__ */ k(ie, { title: "Italic (Ctrl+I)", isActive: n.isActive("italic"), onClick: () => n.chain().focus().toggleItalic().run(), children: /* @__PURE__ */ k(iS, {}) }, "italic"),
    underline: () => /* @__PURE__ */ k(
      ie,
      {
        title: "Underline (Ctrl+U)",
        isActive: n.isActive("underline"),
        onClick: () => n.chain().focus().toggleUnderline().run(),
        children: /* @__PURE__ */ k(sS, {})
      },
      "underline"
    ),
    fontsize: () => /* @__PURE__ */ k(gn, { title: "Font size", icon: /* @__PURE__ */ k(oS, {}), isActive: n.isActive("fontSize"), children: (d) => /* @__PURE__ */ k("ul", { className: "cw-toolbar__list", children: ki.map((f) => /* @__PURE__ */ k("li", { children: /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        className: `cw-toolbar__option${n.isActive("fontSize", f.className ? { class: f.className } : {}) ? " cw-toolbar__option--on" : ""}`,
        style: { fontSize: `${f.px}px` },
        onClick: () => {
          n.chain().focus().setFontSize(f.name).run(), d();
        },
        children: f.label
      }
    ) }, f.name)) }) }, "fontsize"),
    highlight: () => /* @__PURE__ */ k(gn, { title: "Highlight", icon: /* @__PURE__ */ k(lS, {}), isActive: n.isActive("highlight"), children: (d) => /* @__PURE__ */ j("ul", { className: "cw-toolbar__list cw-toolbar__list--swatches", children: [
      Od.map((f) => /* @__PURE__ */ k("li", { children: /* @__PURE__ */ j(
        "button",
        {
          type: "button",
          className: "cw-toolbar__swatch",
          title: f.title,
          onClick: () => {
            n.chain().focus().toggleHighlight(f.className).run(), d();
          },
          children: [
            /* @__PURE__ */ k(
              "span",
              {
                className: "cw-toolbar__swatch-preview",
                style: f.type === "pen" ? { color: f.color, borderColor: f.color } : { backgroundColor: f.color },
                children: "A"
              }
            ),
            f.title
          ]
        }
      ) }, f.model)),
      /* @__PURE__ */ k("li", { children: /* @__PURE__ */ k(
        "button",
        {
          type: "button",
          className: "cw-toolbar__option",
          onClick: () => {
            n.chain().focus().unsetHighlight().run(), d();
          },
          children: "Remove highlight"
        }
      ) })
    ] }) }, "highlight"),
    bulletedlist: () => /* @__PURE__ */ k(
      ie,
      {
        title: "Bulleted list",
        isActive: n.isActive("bulletList"),
        onClick: () => n.chain().focus().toggleBulletList().run(),
        children: /* @__PURE__ */ k(aS, {})
      },
      "bulletedList"
    ),
    numberedlist: () => /* @__PURE__ */ k(
      ie,
      {
        title: "Numbered list",
        isActive: n.isActive("orderedList"),
        onClick: () => n.chain().focus().toggleOrderedList().run(),
        children: /* @__PURE__ */ k(cS, {})
      },
      "numberedList"
    ),
    outdent: () => /* @__PURE__ */ k(ie, { title: "Decrease indent", onClick: () => n.chain().focus().outdentBlock().run(), children: /* @__PURE__ */ k(dS, {}) }, "outdent"),
    indent: () => /* @__PURE__ */ k(ie, { title: "Increase indent", onClick: () => n.chain().focus().indentBlock().run(), children: /* @__PURE__ */ k(uS, {}) }, "indent"),
    link: () => /* @__PURE__ */ k(vS, { editor: n }, "link"),
    blockquote: () => /* @__PURE__ */ k(
      ie,
      {
        title: "Block quote",
        isActive: n.isActive("blockquote"),
        onClick: () => n.chain().focus().toggleBlockquote().run(),
        children: /* @__PURE__ */ k(pS, {})
      },
      "blockQuote"
    ),
    removeformat: () => /* @__PURE__ */ k(ie, { title: "Remove format", onClick: () => n.chain().focus().removeFormat().run(), children: /* @__PURE__ */ k(mS, {}) }, "removeFormat"),
    imageupload: () => /* @__PURE__ */ k(ie, { title: "Insert image", onClick: () => n.chain().focus().openImageFilePicker().run(), children: /* @__PURE__ */ k(gS, {}) }, "imageUpload"),
    imageinsert: () => /* @__PURE__ */ k(MS, { editor: n }, "imageInsert"),
    "imagestyle:alignleft": () => o.includes("alignLeft") ? /* @__PURE__ */ k(
      ie,
      {
        title: "Left aligned image",
        isDisabled: !i,
        isActive: n.isActive("ckImageBlock", { imageStyle: "alignLeft" }),
        onClick: () => n.chain().focus().setImageStyle("alignLeft").run(),
        children: /* @__PURE__ */ k(bS, {})
      },
      "imageStyle:alignLeft"
    ) : null,
    "imagestyle:alignright": () => o.includes("alignRight") ? /* @__PURE__ */ k(
      ie,
      {
        title: "Right aligned image",
        isDisabled: !i,
        isActive: n.isActive("ckImageBlock", { imageStyle: "alignRight" }),
        onClick: () => n.chain().focus().setImageStyle("alignRight").run(),
        children: /* @__PURE__ */ k(kS, {})
      },
      "imageStyle:alignRight"
    ) : null,
    imageresize: () => /* @__PURE__ */ k(gn, { title: "Resize image", icon: /* @__PURE__ */ k(SS, {}), children: (d) => /* @__PURE__ */ k("ul", { className: "cw-toolbar__list", children: s.map((f) => /* @__PURE__ */ k("li", { children: /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        className: "cw-toolbar__option",
        disabled: !i,
        onClick: () => {
          n.chain().focus().setImageWidth(f.value).run(), d();
        },
        children: f.label
      }
    ) }, f.name)) }) }, "imageResize"),
    specialcharacters: () => /* @__PURE__ */ k(gn, { title: "Special characters", icon: /* @__PURE__ */ k(wS, {}), children: (d) => /* @__PURE__ */ k("div", { className: "cw-toolbar__characters", children: nS.map((f) => /* @__PURE__ */ j("div", { className: "cw-toolbar__character-group", children: [
      /* @__PURE__ */ k("span", { className: "cw-toolbar__character-label", children: f.label }),
      /* @__PURE__ */ k("div", { className: "cw-toolbar__character-grid", children: f.characters.map(({ character: h, title: p }) => /* @__PURE__ */ k(
        "button",
        {
          type: "button",
          className: "cw-toolbar__character",
          title: p,
          onClick: () => {
            n.chain().focus().insertContent(h).run(), d();
          },
          children: h
        },
        `${f.label}-${h}`
      )) })
    ] }, f.label)) }) }, "specialCharacters"),
    undo: () => /* @__PURE__ */ k(ie, { title: "Undo (Ctrl+Z)", isDisabled: !n.can().undo(), onClick: () => n.chain().focus().undo().run(), children: /* @__PURE__ */ k(xS, {}) }, "undo"),
    redo: () => /* @__PURE__ */ k(ie, { title: "Redo (Ctrl+Y)", isDisabled: !n.can().redo(), onClick: () => n.chain().focus().redo().run(), children: /* @__PURE__ */ k(CS, {}) }, "redo"),
    "|": () => /* @__PURE__ */ k("span", { className: "cw-toolbar__separator", "aria-hidden": "true" }, "separator")
  };
  return /* @__PURE__ */ k("div", { className: "cw-toolbar", role: "toolbar", "data-should-wrap": t.shouldNotGroupWhenFull !== !1, children: e.map((d, f) => {
    const h = l[d.toLowerCase()];
    if (!h) return null;
    const p = h();
    return p ? /* @__PURE__ */ k("span", { className: "cw-toolbar__slot", children: p }, `${d}-${f}`) : null;
  }) });
}, AS = " ", OS = (n) => {
  n.querySelectorAll("p").forEach((e) => {
    e.textContent === AS && e.children.length === 0 && (e.textContent = "");
  });
}, NS = (n) => {
  n.querySelectorAll("figcaption").forEach((e) => e.remove());
}, IS = (n, e) => {
  n.querySelectorAll('[style*="font-size"]').forEach((t) => {
    const r = t.style.fontSize, i = r.endsWith("px") ? parseFloat(r) : null;
    t.style.removeProperty("font-size");
    const s = i === null ? null : e(i);
    s && t.classList.add(s);
  });
}, DS = (n, e = {}, t = document) => {
  if (!n) return "";
  const r = t.createElement("div");
  return r.innerHTML = n, OS(r), NS(r), e.fontSizeClassForPx && IS(r, e.fontSizeClassForPx), r.innerHTML;
}, zd = " ", RS = (n) => n.tagName === "P" && !n.attributes.length, LS = (n) => {
  n.querySelectorAll("li").forEach((e) => {
    const t = Array.from(e.children).filter(RS);
    if (t.length !== 1 || t[0] !== e.firstElementChild) return;
    const r = t[0];
    for (; r.firstChild; ) e.insertBefore(r.firstChild, r);
    e.removeChild(r);
  });
}, PS = (n) => {
  n.querySelectorAll("p").forEach((e) => {
    e.childNodes.length === 0 && (e.textContent = zd);
  });
}, BS = (n, e) => {
  n.querySelectorAll("em").forEach((t) => {
    const r = e.createElement("i");
    for (Array.from(t.attributes).forEach((i) => r.setAttribute(i.name, i.value)); t.firstChild; ) r.appendChild(t.firstChild);
    t.replaceWith(r);
  });
}, $S = (n) => {
  n.querySelectorAll("[style]").forEach((e) => {
    const t = e.getAttribute("style");
    t && e.setAttribute("style", t.replace(/:\s+/g, ":").replace(/;\s+/g, ";").trim());
  });
}, zS = (n) => {
  n.querySelectorAll("br.ProseMirror-trailingBreak, br[data-placeholder]").forEach((e) => e.remove());
}, rs = (n, e = document) => {
  if (!n) return "";
  const t = e.createElement("div");
  t.innerHTML = n, zS(t), LS(t), BS(t, e), $S(t), PS(t);
  const r = t.innerHTML;
  return r === "<p>&nbsp;</p>" || r === `<p>${zd}</p>` || r === "<p></p>" ? "" : r;
}, _S = [
  "bold",
  "italic",
  "underline",
  "fontsize",
  "highlight",
  "bulletedList",
  "numberedList",
  "outdent",
  "indent",
  "link",
  "blockQuote",
  "removeFormat",
  "imageUpload",
  "imageStyle:alignLeft",
  "imageStyle:alignRight",
  "imageResize"
], is = (n) => DS(n || "", { fontSizeClassForPx: a1 }), FS = xa(
  ({
    id: n,
    content: e = "",
    onChange: t,
    config: r = {},
    excludeToolbar: i = [],
    placeholder: s,
    disabled: o = !1,
    onReturn: l,
    onReady: a,
    onFocus: c,
    onBlur: u,
    upload: d = null,
    onUploadError: f,
    height: h = 300,
    resizable: p = !1,
    className: m,
    autoFocus: g = !1,
    enforcedUpdate: y = !1
  }, b) => {
    var me;
    const S = Jt(t), w = Jt(l), E = Jt(d), A = Jt(e);
    S.current = t, w.current = l, E.current = d;
    const T = Gt(() => is(e), []), M = k0({
      extensions: tS({
        config: r,
        placeholder: s,
        upload: (F, J) => {
          const ge = E.current;
          return ge ? Promise.resolve(ge(F, J)) : Promise.reject(new Error("Image upload is not configured for this editor."));
        },
        onSubmit: () => {
          var F;
          return (F = w.current) == null ? void 0 : F.call(w);
        },
        onUploadError: f
      }),
      content: T,
      editable: !o,
      autofocus: g,
      editorProps: {
        attributes: {
          // `ck-content` is kept so the app's existing note styles still apply.
          class: "cw-editor__body ck-content",
          ...n ? { id: n } : {}
        }
      },
      onUpdate: ({ editor: F }) => {
        var ge;
        const J = rs(F.getHTML());
        A.current = J, (ge = S.current) == null || ge.call(S, J);
      },
      onFocus: () => c == null ? void 0 : c(),
      onBlur: () => u == null ? void 0 : u()
    }), L = Gt(() => M ? {
      editor: M,
      getData: () => rs(M.getHTML()),
      setData: (F) => {
        A.current = F, M.commands.setContent(is(F), { emitUpdate: !1 });
      },
      focus: () => M.commands.focus(),
      destroy: () => M.destroy()
    } : null, [M]);
    Fd(b, () => L, [L]), je(() => {
      L && (a == null || a(L));
    }, [L]), je(() => {
      var F;
      M && (M.storage.mentionSuggest.feeds = ((F = r.mention) == null ? void 0 : F.feeds) || []);
    }, [M, (me = r.mention) == null ? void 0 : me.feeds]), je(() => {
      M && M.setEditable(!o);
    }, [M, o]), je(() => {
      if (!M) return;
      const F = M.extensionManager.extensions.find((J) => J.name === "placeholder");
      F && (F.options.placeholder = s || r.placeholder || "", M.view.dispatch(M.state.tr));
    }, [M, s, r.placeholder]), je(() => {
      M && (e === A.current && !y || !y && e === rs(M.getHTML()) || (A.current = e, M.commands.setContent(is(e), { emitUpdate: !1 })));
    }, [M, e, y]);
    const pe = Gt(() => {
      var J;
      return ((J = r.toolbar) != null && J.length ? r.toolbar : _S).filter((ge) => !i.includes(ge));
    }, [r.toolbar, i]), mt = Gt(
      () => ({
        height: `${h}px`,
        ...p ? { resize: "vertical", width: "100%" } : {}
      }),
      [h, p]
    ), gt = Hd(() => {
      M && !M.isFocused && !o && M.commands.focus();
    }, [M, o]);
    return M ? /* @__PURE__ */ j("div", { className: `cw-editor${o ? " cw-editor--disabled" : ""}${m ? ` ${m}` : ""}`, "data-editor": "tiptap", children: [
      /* @__PURE__ */ k(TS, { editor: M, items: pe, config: r }),
      /* @__PURE__ */ k("div", { className: "cw-editor__scroll", style: mt, onMouseDown: gt, children: /* @__PURE__ */ k(zu, { editor: M }) })
    ] }) : null;
  }
);
FS.displayName = "ClockworkEditor";
export {
  M1 as CkImageBlock,
  T1 as CkImageInline,
  b1 as CkLink,
  FS as ClockworkEditor,
  A1 as DEFAULT_MAX_IMAGE_MB,
  Pd as DEFAULT_UPLOAD_TYPES,
  ki as FONT_SIZE_PRESETS,
  c1 as FontSize,
  Od as HIGHLIGHT_OPTIONS,
  u1 as Highlight,
  d1 as INDENT_STEP_PX,
  R1 as ImageUpload,
  h1 as Indent,
  $1 as MentionDropdown,
  L1 as MentionMark,
  H1 as MentionSuggest,
  Q1 as PasteFromOffice,
  m1 as RemoveFormat,
  nS as SPECIAL_CHARACTER_GROUPS,
  Y1 as SubmitOnCtrlEnter,
  TS as Toolbar,
  tS as buildExtensions,
  a1 as fontSizeClassForPx,
  y1 as isExternalHref,
  ke as mentionPluginKey,
  DS as normalizeIncomingHtml,
  rs as serializeToCkHtml,
  G1 as transformOfficeHtml,
  Nd as withDefaultProtocol
};
