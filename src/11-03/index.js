/**
 * typeof
 * typeof 一般用于判断number, string, boolean, symbol, function, object, undefined 7种类型
 * js 会在储存变量时, 会在变量的机器码的低位 1～3 位 存储其类型信息:
 * 000 object
 * 010 浮点数
 * 100 字符串
 * 110 布尔
 * 1   整数
 */

/**
 * prototype __proto__
 */
(function learingPrototype() {
  console.group('-------learingPrototype-------');
  let obj = {};

  function myInstanceof(left, right) {
    if (!right.__proto__) throw TypeError('Right-hand side of ' instanceof ' is not an object');

    let proto = Object.getPrototypeOf(left);
    while (proto !== null) {
      if (proto === right.prototype) return true;

      proto = Object.getPrototypeOf(proto);
    }
    return false;
  }

  function Test() {}

  let test = new Test();

  console.log([
    test instanceof Object,
    myInstanceof(test, Object),
    test instanceof Function,
    myInstanceof(test, Function),
  ]);
})();

/**
 * 原型链继承
 * 1. 新实例无法向父类构造函数传参
 * 2. 继承单一
 * 3. 所有新实例都会共享父类实例的属性。
 */
(function () {
  console.log('-------原型链继承-------');
  function Animal() {
    this.colors = ['black', 'white'];

    this.getColors = function () {
      return this.colors;
    };
  }

  Animal.prototype.getColor = function () {
    return this.colors;
  };

  function Dog() {}
  Dog.prototype = new Animal();

  let dog1 = new Dog();
  dog1.colors.push('brown');
  let dog2 = new Dog();
  console.log('dog2.colors:', dog2.colors); // ['black', 'white', 'brown']
  console.log('dog2.getColor:', dog2.getColor()); // ['black', 'white', 'brown']
  console.log('Dog.prototype.constructor:', Dog.prototype.constructor); // [Function Animal]
  console.log('Dog.__proto__.constructor === Function:', Dog.__proto__.constructor === Function); // true
  console.log('dog2.__proto__ === Dog.prototype:', dog2.__proto__ === Dog.prototype); // true
  console.log('dog2.__proto__.__proto__ === Animal.prototype:', dog2.__proto__.__proto__ === Animal.prototype); // true
})();

/**
 * 借用构造函数继承
 * 特点
 * 1. 处理了引用类型共享问题以及传参问题
 * 2. 可继承多个构造函数(call 多个)
 * 3. 只继承了父类构造函数的属性, 没有继承原型属性
 *
 * 缺点
 * 1. 只能继承父类构造函数里的属性
 * 2. 无法实现构造函数的复用, 每个子类都有父类实例函数的副本，影响性能(创建子类实例时调用 Dog 构造函数，于是 Dog 的每个实例都会将 Animal 中的属性复制一份)
 */
(function () {
  console.log('-------借用构造函数继承-------');
  function Animal(colors) {
    this.colors = colors;

    this.getColors = function () {
      return this.colors;
    };
  }

  Animal.prototype.name = 10;
  Animal.prototype.age = 10;

  function Dog(colors) {
    Animal.call(this, colors);
    this.age = 12;
  }

  let dog1 = new Dog(['black']);
  console.log('dog1.name:', dog1.name); // undefined
  console.log('dog1.colors:', dog1.colors); // ['black']
  console.log('dog1 instanceof Animal:', dog1 instanceof Animal); // false
  console.log('dog1.__proto__ ===  Dog.prototype:', dog1.__proto__ === Dog.prototype); // true
  console.log('dog1.__proto__.constructor:', dog1.__proto__.constructor); // [Function Dog]
})();

/**
 * 组合继承
 * 组合继承结合了原型链和盗用构造函数, 基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。
 * 特点:
 * 1. 可以继承父类原型上的属性，可以传参，可复用。
 * 2. 每个新实例引入的构造函数属性是私有的。
 *
 * 缺点：
 * 1. 调用了两次父类构造函数（耗内存）。
 */
(function () {
  console.log('-------组合继承-------');

  function Animal(name) {
    this.name = name;
    this.colors = ['black', 'white'];
  }
  Animal.prototype.getName = function () {
    return this.name;
  };

  function Dog(name, age) {
    Animal.call(this, name);
    this.age = age;
  }

  Dog.prototype = new Animal();
  Dog.prototype.constructor = Dog;

  let dog1 = new Dog('dog1', 1);
  dog1.colors.push('brown');
  let dog2 = new Dog('dog2', 2);
  console.log('dog1:', dog1); // Dog{ name: dog1, age: 1, color: ['black', 'white', 'brown'] }
  console.log('dog2:', dog2); // Dog{ name: dog2, age: 2, color: ['black', 'white'] }
})();

/**
 * 原型式继承
 *
 * 缺点
 * 1.原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
 * 2.无法传递参数
 */
(function () {
  console.log('-------原型式继承-------');

  Object.prototype.myCreate = function (proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object: ' + proto);
    } else if (proto === null) {
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
      );
    }

    if (typeof propertiesObject !== 'undefined')
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support a second argument."
      );

    function F() {}
    F.prototype = proto;
    return new F();
  };


  function Animal(name) {
    this.name = name;
    this.colors = ['black', 'white'];
  }
  Animal.prototype.getName = function () {
    return this.name;
  };

  // dog1.__proto__ === Animal.prototype
  let dog1 = Object.myCreate(new Animal('dog1'));

  console.log('dog1:', dog1); // Animal {}
  console.log('dog1.__proto__:', dog1.__proto__); // Animal { name: 'dog1', colors: [ 'black', 'white' ] }
  console.log('dog1.__proto__.__proto__ === Animal.prototype:', dog1.__proto__.__proto__ === Animal.prototype); // true
  delete Object.prototype.myCreate;
})();

/**
 * 寄生式继承
 * 特点
 * 1. 在原型式继承的基础上，增强对象，返回构造函数
 *
 * 缺点
 * 同原型式继承缺点
 */
(function () {
  console.log('-------寄生式继承-------');

  function Animal(name) {
    this.name = name;
    this.colors = ['black', 'white'];
  }

  function createDog(original) {
    const dog = Object.create(original);

    dog.getColors = function () {
      return this.colors;
    };

    return dog;
  }

  let animal1 = new Animal('dog1');
  let dog1 = createDog(animal1);
  // dog1.name = 'dog10086';

  console.log('dog1:', dog1); // Animal { getColors: [Function] }
  console.log('dog1.name:', dog1.name); // dog1
  console.log('dog1.getColors:', dog1.getColors()); // ['black', 'white']
  console.log('dog1.__proto__ === animal1:', dog1.__proto__ === animal1); // true
  console.log('dog1.__proto__.__proto__ === Animal.prototype:', dog1.__proto__.__proto__ === Animal.prototype); // true
})();

/**
 * 寄生组合式继承
 */
(function () {
  console.log('-------寄生组合式继承-------');

  function Animal(name) {
    this.name = name;
    this.colors = ['dark'];
  }

  Animal.prototype.getColors = function () {
    return this.colors;
  };

  function Dog(name, age) {
    // 构造函数继承
    Animal.call(this, name);
    this.age = age;
  }

  Dog.prototype.getName = function () {
    return this.name;
  };

  function _extends(subClass, superClass) {
    // 原型式继承prototype
    // prototype.__proto__ === superClass.prototype
    const prototype = Object.create(superClass.prototype); // 浅拷贝 prototype
    prototype.constructor = subClass; // 构造函数指向子类构造函数
    subClass.prototype = prototype;
    // function Foo() {}
    // Foo.prototype = prototype;
    // let f1 = new Foo();
    // subClass.prototype = f1;
  }

  _extends(Dog, Animal);

  let dog1 = new Dog('dog1', 1);
  console.log('dog1:', dog1); // Dog { age: 1, color: ['dark'], name: 'dog1;' }
  console.log('dog1 instanceof Animal:', dog1 instanceof Animal); // true
  console.log('dog1 instanceof Dog:', dog1 instanceof Dog); // true
  console.log('dog1.__proto__ === Dog.prototype:', dog1.__proto__ === Dog.prototype); // true
  console.log('dog1.constructor === Dog:', dog1.constructor === Dog); // true
  /**
   * _extends 流程
   *  const prototype = Object.create(superClass.prototype) => prototype.__proto__ === superClass.prototype
   * subClass.prototype = prototype => Dog.prototype === subClass.prototype
   *
   * let dog1 = new Dog() => dog1.__proto__ === Dog.prototype
   * Dog.prototype.__proto__ === Animal.prototype
   * dog1.__proto__.__proto__ === Animal.prototype
   *
   */
  console.log('dog1.__proto__.__proto__ === Animal.prototype:', dog1.__proto__.__proto__ === Animal.prototype); // true
  console.log('dog1.getColors:', dog1.getColors()); // ['dark']
  console.log('dog1.getName:', dog1.Name); // undefined
})();
