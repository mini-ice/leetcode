class Scheduler {
  constructor(max) {
    this.quene = [];
    this.max = max;
    this.count = 0;
    this.ret = [];
  }

  add(fn) {
    return new Promise((resolve) => {
      this.quene.push(fn);
    });
  }

  next() {
    if (this.quene.length === 0 || this.count >= this.max) return;

    let promise = this.quene.shift();
    let index = this.count;
    this.count++;

    promise().then((val) => {
      this.ret[index] = val;
      this.count--;
      this.next();
    });
  }

  start() {
    for (let i = 0; i < this.max; i++) {
      this.next();
    }
  }
}

const scheduler = new Scheduler(2);

function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function addTask(time, order) {
  scheduler.add(() =>
    timeout(time).then(() => {
      console.log(order);
    })
  );
}

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);

scheduler.start();
