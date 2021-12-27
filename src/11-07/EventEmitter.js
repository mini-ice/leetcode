class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  add(name, fn) {
    if (typeof fn !== 'function') return false;
    if (!Object.prototype.hasOwnProperty.call(this.listeners, name)) {
      this.listeners[name] = [fn];
    }
    if (this.listeners[name].indexOf(fn) !== -1) return false;
    this.listeners[name] = [...this.listeners[name], fn];
    return true;
  }

  remove(name, fn) {
    if (Object.prototype.hasOwnProperty.call(this.listeners, name)) {
      const index = this.listeners[name].indexOf(fn);
      if (index !== -1) {
        this.listeners.splice(index, 1);
        return true;
      }
      return false;
    }

    return false;
  }

  emit(name, ...args) {
    if (Object.prototype.hasOwnProperty.call(this.listeners, name)) {
      this.listeners[name].forEach((fn) => fn.call(this, ...args));
    }
  }

  clear() {
    this.listeners = {};
  }
}

class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  add(key, fn) {
    if (this.listeners[key]) {
      this.listeners[key].push(fn);
    } else {
      this.listeners[key] = [fn];
    }
  }

  remove(key, fn) {}

  emit(key) {
    if (Object.prototype.hasOwnProperty.call(this.listeners, key)) {
      this.listeners[key].forEach((fn) => fn.call(this, ...args));
    }
  }
}

let eventBus = new EventEmitter();
let fn1 = function (name, age) {
  console.log(this);
  console.log(`${name} ${age}`);
};
let fn2 = function (name, age) {
  console.log(`hello, ${name} ${age}`);
};
eventBus.add('aaa', fn1);
eventBus.add('aaa', fn2);
console.time('eventBus');
setTimeout(() => {
  eventBus.emit('aaa', '布兰', 12);
  console.timeEnd('eventBus');
}, 1000);

class Subject {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    if (observer.update && this.observers.indexOf(observer) === -1) this.observers.push(observer);
  }

  remove(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) this.observers.splice(index, 1);
  }

  notify(...args) {
    this.observers.forEach((observer) => observer.update(...args));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  // 目标对象更新时触发的回调
  update(...args) {
    console.log(`目标者通知我更新了，我是：${this.name}`);
  }
}

let subject = new Subject();

// 实例化两个观察者
let obs1 = new Observer('前端开发者');
let obs2 = new Observer('后端开发者');

// 向目标者添加观察者
subject.add(obs1);
subject.add(obs2);

// 目标者通知更新
subject.notify();
