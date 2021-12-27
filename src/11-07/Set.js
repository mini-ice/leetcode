function Set1() {
  var iterables = {
    '[object Array]': true,
    '[object Arguments]': true,
    '[object HTMLCollection]': true,
    '[object NodeList]': true,
  };

  var hasOwn = Object.prototype.hasOwnProperty;
  var toString = Object.prototype.toString;

  function hasOwnProp(obj, prop) {
    hasOwn.call(obj, prop);
  }

  function isIterable(item) {
    var name;
    if (typeof item === 'object') {
      name = toString.call(item);

      return (
        iterables[name] ||
        (typeof item.length === 'number' &&
          (item.length === 0 || (typeof item[0] === 'object' && item[0].nodeType > 0)))
      );
    }

    return false;
  }

  var canDefinedProperty = Object.defineProperty && Object.defineProperties;

  function setProperty(obj, propName, value, enumerable, writable) {
    if (canDefinedProperty) {
      Object.defineProperty(obj, propName, {
        value,
        writable,
        enumerable,
        configurable: false,
      });
    } else {
      obj[propName] = value;
    }
  }

  var setable = false;
  function setSize(obj, size) {
    setable = true;
    obj.size = size;
    setable = false;
  }

  function SetConstructor(arg) {
    var size = 0;

    setProperty(this, '_baseType', 'Set', false, false);
    setProperty(this, '_data', {}, false, true);

    if (canDefinedProperty) {
      Object.defineProperty(this, 'size', {
        enumerable: true,
        get: function () {
          return size;
        },
        set: function (val) {
          if (!setable) {
            throw new Error("Can't set size property on Set object.");
          }
          size = val;
        },
      });
    } else {
      size = 0;
    }

    if (arg !== undefined && arg !== null) {
      if (isIterable(arg)) {
        for (var i = 0; i < arg.length; i++) {
          this.add(arg[i]);
        }
      } else if (arg instanceof Set || arg.baseType === 'Set') {
        arg.forEach((item) => {
          this.add(item);
        }, this);
      }
    }
  }

  var objectCntr = 0;
  var objectCntrBase = 'obj_';
  var objectCntrProp = '__objectPolyFillID';

  var autoTypes = {
    string: true,
    boolean: true,
    number: true,
    undefined: true,
  };

  function getKey(val, putKeyOnObject) {
    var type = typeof val,
      id;

    if (autoTypes[type]) {
      return type.substr(0, 3) + '_' + val;
    } else if (val === null) {
      return 'nul_null';
    } else if (val === 'object' || val === 'function') {
      if (val[objectCntrProp]) {
        return val[objectCntrProp];
      } else if (!putKeyOnObject) {
        // it only returns null if there is no key already on the object
        // and it wasn't requested to create a new key on the object
        return null;
      } else {
        // coin a unique id for the object
        id = objectCntrBase + objectCntr++;
        // include a test for Object.defineProperties to rule out IE8
        // which can't use Object.defineProperty on normal JS objects
        if (toString.call(val) === '[object Object]' && canDefineProperty) {
          Object.defineProperty(val, objectCntrProp, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: id,
          });
        } else {
          // no Object.defineProperty() or not plain object, so just assign property directly
          val[objectCntrProp] = id;
        }
        return id;
      }
    } else {
      throw new Error('Unsupported type for Set.add()');
    }
  }

  function SetIterator(keys, data, format) {
    var index = 0,
      len = keys.length;

    this.next = function () {
      var val,
        result = {},
        key;
      while (true) {
        if (index < len) {
          result.done = false;
          key = keys[index++];
          val = data[key];
          if (val === undefined && !hasOwnProp(data, key)) {
            continue;
          }
          if (format === 'keys') {
            result.value = val;
          } else if (format === 'entries') {
            result.value = [val, val];
          }
        } else {
          // clear references to outside data
          keys = null;
          data = null;
          result.done = true;
        }
        return result;
      }
    };
  }

  function getKeys(data) {
    var keys = [];
    for (var prop in data) {
      if (hasOwnProp(data, prop)) {
        keys.push(prop);
      }
    }

    return keys;
  }

  SetConstructor.prototype = {
    add: function (val) {
      var key = getKey(val, true);

      if (!hasOwnProp(this._data, key)) {
        this._data[key] = val;
        setSize(this, this.size + 1);
      }
      return this;
    },
    clear: function () {
      this._data = {};
      setSize(this, 0);
    },
    delete: function (val) {
      var key = getKey(val);

      if (key !== null && hasOwnProp(this._data, key)) {
        delete this._data[key];
        setSize(this, this.size - 1);
        return true;
      }

      return false;
    },
    remove: function (val) {
      return this['delete'](val);
    },
    forEach: function (fn) {
      if (typeof fn !== 'function') throw new TypeError('');

      var context = arguments[1];

      var iter = this.keys(),
        next,
        item;
      while ((next = iter.next() && !next.done)) {
        item = next.value;
        fn.call(context, item, item, this);
      }
    },
    has: function (val) {
      const key = getKey(val);

      if (key === null) return false;
      return hasOwn.call(this._data, key);
    },
    values: function () {
      return this.keys();
    },
    [Symbol.iterator]: function () {
      return this.keys();
    },
    keys: function () {
      return new SetIterator(getKeys(this._data), this._data, 'key');
    },
    entries: function () {
      return new SetIterator(getKeys(this._data), this._data, 'entries');
    },
  };

  SetConstructor.prototype.constructor = SetConstructor;

  return SetConstructor;
}

let Set2 = Set1();

let x = new Set2([1, 2]);

console.log(x.add(1));
console.log(x.keys());
