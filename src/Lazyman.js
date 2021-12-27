// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
// 以此类推。
class LazyMan {
  constructor(name) {
    this.name = name
    this.tasks = []
    const task = () => {
      console.log(` Hi! This is ${this.name}!`)
    }
    this.tasks.push(task)
    setTimeout(() => {
      this.next()
    })
  }
  next() {
    let task = this.tasks.shift()
    task && task()
  }
  eat(val) {
    let task = () => {
      console.log(`Eat ${val}~`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }
  sleep(wait) {
    let task = () =>
      setTimeout(() => {
        console.log(`Wake up after ${wait}`)
        this.next()
      }, wait * 1000)
    this.tasks.push(task)
    return this
  }
  sleepFirst(wait) {
    let task = () =>
      setTimeout(() => {
        console.log(`Wake up after ${wait}`)
        this.next()
      }, wait * 1000)
    this.tasks.unshift(task)
    return this
  }
}

function lazyMan(name) {
  return new LazyMan(name)
}

lazyMan('Hank').sleepFirst(5).eat('supper')
