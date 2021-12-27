# 重点

Fiber

diff

setState

事件流

---

## react 创建流程

### Init
1. createLegacyRoot
2. createRootImpl (创建fiber)
3. listenToNativeEvent

### render
1. unbatchedUpdate （为了更快绘制内容到屏幕上）
2. schedulerUpdateOnFiber
3. workloop
4. performUnitWork (dfs fiber tree)
5. beginWork
6. reconcileChildren
7. completeWork
8. setInitialProperties

### commit
1. commitRoot
2. runWithPriority
3. commitBeforeMutationEffect
4. commitMutationEffect
5. commitLayoutEffect

---

## React

参考文章 [React 为什么使用 Lane 技术方案]:(https://juejin.cn/post/6951206227418284063)

react@16 
expirationTimes缺点: expirationTimes模型不能满足IO操作（Suspense）, 高优先级 suspense 更新 会中断 低优先级 cpu 任务， 导致页面渲染结果停顿
当决定需要执行的优先级（currentExecTaskTime）时，所有 task.expirationTime >= currentExecTaskTime 的任务都将被执行。

React16的expirationTimes模型只能区分是否>=expirationTimes决定节点是否更新。

React17的lanes模型可以选定一个更新区间，并且动态的向区间中增减优先级，可以处理更细粒度的更新。

### Render层 架构
1. Scheduler  调度器(requestIdleCallback) ---> 调度任务优先级, 高优先级任务优先进入 reconciler
2. Reconciler 协调器 ---> 负责找出变化组件
3. Renderer   渲染器 ---> 负责将变化的组件渲染到页面上


## Render 

### Fiber 心智模型

代数模型 ->  (类似于 generator 模型) 执行函数 匹配关键字(yield)并中断执行函数 把执行权交还； 又由执行者控制继续执行时机(gen.next())

为什么不使用Generator
Generator 改动大 上下文函数 需要相应更改
Generator执行的中间状态是上下文关联的。

参考如下列子
```js
function* doWork(A, B, C) {
  var x = doExpensiveWorkA(A);
  yield;
  var y = x + doExpensiveWorkB(B);
  yield;
  var z = y + doExpensiveWorkC(C);
  return z;
}
```

但我们考虑"优先级任务插队"的情况时 如果此时已经完成doExpensiveWorkA与doExpensiveWorkB计算出x与y。此时B组件接收到一个高优更新，由于Generator执行的中间状态是上下文关联的，所以计算y时无法复用之前已经计算出的x，需要重新计算。 


React Fiber可以理解为：
React内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。
其中每个任务更新单元为React Element对应的Fiber节点

|  属性名   | 说明  |
|  :----  | :----  |
|  tag    | fiber类型 <br> 参考(https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactWorkTags.js) | 
|  type  | Element Tag |
|  pendingProps  | 由React元素中的新数据而来的已经更新过的props，且需要应用于子组件或者DOM元素 |
|  memoizedProps  | fiber中在前一次渲染时用于创建输出的props |
|  memoizedState  | fiber中在前一次渲染时用于创建输出的state |
|  updateQueue  | 状态更新、callbacks以及DOM更新的队列 |
|  stateNode  | 组件实例 |
|  effectTag  | 副作用字掩码 |
|  lane  | 优先级车道 |
|  mode  | 严格模式、legacy模式、concurrnt模式 标识 |
|  key  | 一组子组件的唯一标示 |

```js
function FiberNode (
  tag,
  pendingProps,
  key,
  mode
) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // fiber
  this.return = null;  // parent fiber
  this.child = null;   // first child fiber
  this.slibing = null; // next slibing fiber
  this.index = 0;

  this.ref = null;

  // 缓存属性和更新队列
  this.pendingProps = pengingProps;
  this.memoizeProps = null;
  this.memoizeState = null;
  this.updateQueue = null;

  this.mode = mode;

  // effect
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null; // effectList head point
  this.lastEffect = null; // effectList tail point

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 连接对应的缓存树节点
  this.alternate = null;
}

```

diff 算法中 判断 Fiber child 复用 => chlid.key === element.key -> child.elementType === element.elementType


### Fiber 双缓存

当我们用canvas绘制动画，每一帧绘制前都会调用ctx.clearRect清除上一帧的画面。

如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。

为了解决这个问题，我们可以在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，由于省去了两帧替换间的计算时间，不会出现从白屏到出现画面的闪烁情况。

这种在内存中构建并直接替换的技术叫做双缓存 (opens new window)。

React使用“双缓存”来完成Fiber树的构建与替换——对应着DOM树的创建与更新。



current Fiber Tree 当前屏幕显示内容对应的 fiber tree

workInProgress Fiber Tree 正在构建更新中的 fiber tree

---

### Initial 初始化创建


FiberRootNode -> rootFiber (current Fiber Tree) --------------- alternate 连接 workInProgress Tree ----------------->  rootFiber (workInProgress Tree)
当前 ReactDom.render 创建的应用根节点, 可创建多个应用 - 微前端)

workInProgress Tree 构建时会尝试复用current Fiber树中已有的Fiber节点内的属性; 构建完成后 在 commit 阶段 渲染页面

类似于下图：

                              FiberRootNode

                    ↙

            rootFiber(current Tree) ←→ rootFiber(workInProgress)

                       ↓        alternate            ↓

                      App           ←→              App

                       ↓        alternate            ↓

                      div           ←→              div

                       ↓        alternate            ↓

                      text          ←→              text

### render

```js
// legacy
function workLoopSync() {
  if(workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

// concurrent
function workLoopConcurrent() {
  // requestIdleCallback
  if(workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}

// dfs 递归阶段
function performUnitOfWork(fiber) {
  // beginWork
  
  if(fiber.child) {
    performUnitOfWork(fiber.child);
  }

  // completeWork

  if(fiber.slibing) {
    preformUnitOfWork(fiber.slibing);
  }
}

// beginWork mount时 不会赋值 effectTag = Placement(插入dom元素)
function beginWork(
  current: Fiber | null, // 当前组件对应的Fiber节点在上一次更新时的Fiber节点 workInProgress.alternate
  workInProgress: Fiber, // 当前组件 Fiber
  renderLanes: Lanes // 优先级相关 scheduler 中处理
) {
  // ...
  if(current === null) {
    // mount
    // mount时：根据tag不同，创建不同的子Fiber节点
    // mountChildFibers 生成新的子Fiber节点 
  } else {
    // update
    // 满足复用 current 时, 复用 current 属性
    // reconcileChildren  比较（Diff算法）上次更新的fiber节点 将比较的结果生成新Fiber节点 并 插入 effectTag
  }
}

```

🌰:
```js

function App() {
  return (
    <div>
      <a>i am<a>
      <span>KaSong</span>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById("root"));

```
tip: textNode 特殊处理

App beginWork -> div beginWork -> a beginWork -> a completeWork -> span beginWork -> span completeWork -> div completeWork -> App completeWork


##### effectTag 需要执行的DOM操作 
```js
// DOM需要插入到页面中
export const Placement = /*                */ 0b00000000000010;
// DOM需要更新
export const Update = /*                   */ 0b00000000000100;
// DOM需要插入到页面中并更新
export const PlacementAndUpdate = /*       */ 0b00000000000110;
// DOM需要删除
export const Deletion = /*                 */ 0b00000000001000;
```                 

#### Reconciler

```js
let firstFiber
let nextFiber = firstFiber // 当前指针
let shouldYield = false // 暂停循环

function performUnitOfWork(fiber) {
  // 执行beginWork
  if (fiber.child) {
    performUnitOfWork(fiber.child);
  }
}

function workLoop(deadline) {
  while(nextFiber && !shouldYield) { // 存在下个fiber节点 且 处于浏览器空闲阶段
    nextFiber = performUnitOfWork(nextFiber);
    // https://developer.mozilla.org/zh-CN/docs/Web/API/IdleDeadline
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop)
}

// 浏览器空闲时候执行 (react 源码自己实现了这个api)
requestIdleCallback(workLoop)
```

#### Scheduler (requestIdleCallback polyfill)
react 通过requestAnimationFrame 动态算出当前帧率，计算出当前帧执行截止时间
      postMessage作为异步调度 （setTimeout 默认4ms 延迟）

```js
var schedulerCallback = null;
var isIdleScheduled = false;

var messageKey = "__reactIdleCallback$" + Math.random().toString(36).slice(2)
window.addEventListener('message', idleTick, false);

function idleTick () {
  if(event.source !== window || event.data !== messageKey) return;

  var callback = schedulerCallback;
  isIdleScheduled = false;
  if(callback !== null) {
    var start = Date.now(); // 闭包 保存变量
    callback({
      didTimeout: false,
      timeRemaining: function() {
        // currentFrame 当前平台 1帧执行时间 60fps 约等于 16.7ms
        return Math.max(0, currentFrame - (Date.now() - start))
      }
    })
  }
}

function requestIdleCallback(cb) {
  schedulerCallback = cb;
  if(!isIdleScheduled) {
    isIdleScheduled = true;
    window.postMessage(messageKey, '*')
  }
}
```

# Commit

## beforeMutation 
```js
// 遍历effectList 调用对应生命周期
function commitBeforeMutationEffect() {
  while(nextEffect !== null) {
    const current = nextEffect.alternate;

    if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
      // ...focus blur相关
    }

    const effectTag = current.effectTag;

    // 调用getSnapshotBeforeUpdate (commitBeforeMutationLifeCycles)
    if((effectTag & Snapshot) !== NoEffect) {
      commitBeforeMutationEffectOnFiber(current, nextEffect);
    }

    // 异步调度 useEffect
    if((effectTag & Passive) !== NoEffect) {
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true;
        scheduleCallback(NormalSchedulerPriority, () => {
          flushPassiveEffects();
          return null;
        });
      }
    }
    nextEffect = nextEffect.next;
  }
}

```

useEffect 异步调度
1. beforeMutation 阶段 在scheduler 中调度 flushPassiveEffect
2. layout 阶段之后 将effectList 赋值给rootWithPendingPassiveEffect
3. scheduler 触发flushPassiveEffects，flushPassiveEffects内部遍历rootWithPendingPassiveEffects

```js
do {
  // 触发useEffect回调与其他同步任务。由于这些任务可能触发新的渲染，所以这里要一直遍历执行直到没有任务
  flushPassiveEffects();
} while (rootWithPendingPassiveEffects !== null);
```

## commitMutationEffects

mutation阶段也是遍历effectList
根据effectTag 执行对应 dom 操作



# Diff 算法

diff 操作分为3种情况： 节点更新, 节点减少或者增加, 节点更换顺序

fiber 是使用单链表结构,不能使用双指针法遍历（需要改成双向链表）

虽然本次更新 newChildren(props.children) 为数组形式(react 源码中把newChildren转化成数组迭代器（iterator） step = newChildren.next(), 同时维护 newIdx 变量 作为索引), 但是和newChildren 中每个组件进行比较的是 currentFiber(单链表)

step = newChildren.next();

即 step.value与fiber比较, step.next().value与fiber.sibling比较 

所以 diff 需要分成两轮遍历

### 第一轮遍历

处理更新节点

1. 迭代newChildren, step.value 与 oldFiber 比较, 判断DOM节点是否可复用
2. 如果可以复用 继续迭代 即 step = step.next(); oldFiber = oldFiber.silbing;
3. 如果不能复用 分2种情况
   1. key 不相等 设置lastPlacedIndex = newIdx 终止遍历
   2. key 相等; type 不相等 则设置 oldFiber.effectTag = Deletion, 并继续遍历
4. 如果newChildren 遍历完了(即 step.done === false) 或者 oldFiber遍历完了(即 oldFiber === null), 终止循环


### 第二轮遍历

第二轮遍历 根据一轮遍历结果分为4种情况

#### newChildren与oldFiber同时遍历完

最理想情况, 在一轮更新完节点, diff 结束

#### newChildren 还未遍历完, oldFiber 遍历完 (新增)

意味着有新的节点插入, 我们只需要遍历剩余children 生成对应的 workInProgressFiber 并且标记effectTag为新增(即 workInProgressFiber.effectTag = Placement )

#### newChildren 遍历完, oldFiber 还未遍历完（删除）

意味着剩余节点需要被删除, 我们只需要遍历剩余oldFiber 标记effectTag为删除(即 workInProgressFiber.effectTag = Deletion )

#### newChildren, oldFiber 都未遍历完 （移动）

由于有节点改变了位置, 不能再用位置索引i对比前后的节点, 只能使用key 作为索引

由于本次更新中节点是按newChildren的顺序排列。在遍历newChildren过程中，每个遍历到的可复用节点一定是当前遍历到的所有可复用节点中最靠右的那个，即一定在lastPlacedIndex对应的可复用的节点在本次更新中位置的后面。

那么我们只需要比较遍历到的可复用节点在上次更新时是否也在lastPlacedIndex对应的oldFiber后面，就能知道两次更新中这两个节点的相对位置改变没有。

我们用变量oldIndex表示遍历到的可复用节点在oldFiber中的位置索引。如果oldIndex < lastPlacedIndex，代表本次更新该节点需要向右移动。

lastPlacedIndex初始为0，每遍历一个可复用的节点，如果oldIndex >= lastPlacedIndex，则lastPlacedIndex = oldIndex

设置 fiberMap 快速查找fiber
```js
const existingChildren = mapRemainingChildren(returnFiber, oldFiber);
```

考虑性能，我们要尽量减少将节点从后面移动到前面的操作


# SetState

setState -> this.updater.enqueneState(this, partialState, callback, 'setState') -> enqueueSetState

setState什么时候异步、什么时候同步？
setState 都是同步的, 只是在react 调用生命周期事件或者合成事件前 将 "isBatchingUpdate" 设置true 执行完事件后 又将 "isBatchingUpdate" 设置为false, 当调用生命周期事件或者合成事件时 isBatchingUpdate === true  react 会自动合并update


enqueueSetState 步骤
1. 找到组件实例对应的fiber 节点
2. 获取优先级
3. 创建Update
4. 赋值回调函数和payload
5. 将update插入updateQueue(enqueneUpdate)
6. 调度update(scheduleUpdateOnFiber) -> effectList -> flushSyncCallbackQueue
```js
function enqueneSetState(instance, payload, callback) {
  const fiber = getInstance(instance)
  const eventTime = requestEventTime(); // 待废弃
  const suspenseConfig = requestCurrentSuspenseConfig();
  const lane = requestUpdateLane(fiber, suspenseConfig);

  const update = createUpdate(eventTime, lane, suspenseConfig);
  update.payload = payload;
  // ...省略判断callback 是否存在
  update.callback = callback;

  enQueneUpdate(fiber, update);
  scheduleUpdateOnFiber(fiber, lane, eventTime)
}

```

# hooks 原理

1. init Function Component 执行 renderWithHooks 函数 赋值 ReactCurrentDispatcher.current 

renderWithHooks -> ReactCurrentDispatcher.current = isMounted ? HooksDispatcherOnUpdate : HooksDispatcherOnMount -> 

执行 函数组件Component -> 依次调用hooks( useState -> useMemo(useCallback) -> useRef -> useLayoutEffect -> useEffect ) -> 

设置ReactCurrentDispatcher.current( ReactCurrentDispatcher.current = ContextOnlyDispatcher ) -> 清空currentHook, workInProgressHooks


初始化的时候 useState = mountState  会去调用 mountWorkInProgressHook 方法 添加到 workInProgressHook 链表中

```js
// 全局变量
let renderLanes: Lanes = NoLanes; // These are set right before calling the component.
let currentlyRenderingFiber: Fiber = (null: any); // the work-in-progress hook. I've named it differently to distinguish it from
let currentHook: Hook | null = null;
let workInProgressHook: Hook | null = null; // the work-in-progress hook. 
let didScheduleRenderPhaseUpdate: boolean = false; // 是否初次渲染

function renderWithHooks(
  current: Fiber | null, // 当前屏幕上fiber 节点, 创建前为null
  workInProgress: Fiber, // workInProgress fiber 节点
  Component: (p: Props, arg: SecondArg) => any, // 组件函数
  props, // props
  sencondArgs, 
  nextRenderLanes: Lanes, // lanes 优先级
){
  // ... 
  ReactCurrentDispatcher.current = current === null || current.memoizedState === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate;
  // ...
  let children = Component(props, secondArg);

  ReactCurrentDispatcher.current = ContextOnlyDispatcher;

  renderExpirationTime = NoWork;
  currentlyRenderingFiber = null;

  currentHook = null
  workInProgressHook = null;

  didScheduleRenderPhaseUpdate = false;

  return children
}

// useState
function mountState (initialState) {
  const hook = mountWorkInProgressHook();

  hook.memoizedState = hook.baseState = typeof initialState === 'function' ? initialState() : initialState;

  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState,
  });

  const dispatch: Dispatch<A> = (queue.dispatch = (dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any));
  
  return [hook.memoizedState, dispatch];

}

function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  // $FlowFixMe: Flow doesn't like mixed types
  return typeof action === 'function' ? action(state) : action;
}


function mountWorkInProgressHook () {
  const hooks: Hook = {
    memoizeState: null, // useState中 保存 state 信息 ｜ useEffect 中 保存着 effect 对象 ｜ useMemo 中 保存的是缓存的值和 deps ｜ useRef 中保存的是 ref 对象
    baseState: null, // usestate和useReducer中,一次更新中 ，产生的最新state值
    baseQuene: null, // usestate和useReducer中 保存最新的更新队列
    quene: null, // 保存待更新队列 pendingQueue ，更新函数 dispatch 等信息

    next: null,
  }

  if (workInProgressHook === null) {
    // This is the first hook in the list
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // Append to the end of the list
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}


function dispatchAction<S, A>(
  fiber: Fiber,
  queue: UpdateQueue<S, A>,
  action: A,
) {
  const eventTime = requestEventTime();
  const suspenseConfig = requestCurrentSuspenseConfig();
  const lane = requestUpdateLane(fiber, suspenseConfig);

  const update = {
    eventTime,
    suspenseConfig,
    lane,
    action, 
    eagerReducer: null, // lastReducer
    eagerState: null, // // lastState
    next: null,
  }

  /* 判断当前是否在渲染阶段 */
  if (fiber === currentlyRenderingFiber || (alternate !== null && alternate === currentlyRenderingFiber)) {
    didScheduleRenderPhaseUpdate = true;
    update.lanes = renderLanes;
    currentlyRenderingFiber.lanes = renderLanes;
  }else {
    /* 当前函数组件对应fiber没有处于调和渲染阶段 ，那么获取最新state , 执行更新 */
    // ... 省略判断 
    const currentState = quene.lastRenderedState;
    const eagerState = lastRenderedReducer(currentState, action);
    update.eagerReducer = lastRenderedReducer;
    update.eagerState = eagerState;
    if (is(eagerState, currentState)) { 
      return
    }
    // 进入调度
    schedulerOnFiberUpate(fiber, lane, eventTime)
  }
}


```

#### mock useEffect
```js
let currentHook = null; // linked
let workInProgressHook = null; // linked
let currentlyRenderingFiber = null; // workInProgressHook linked point

function useEffect(cb, deps) {
  if(currentHook === null) {
    // mount
    const update = {
      memorizeState: [cb, deps],
      
      // lastCallback: null,
      // lastDeps: null,
      lastDestory: null,
      next: null,
    }

    if(workInProgressHook === null) {
      workInProgressHook = update;
      currentlyRenderingFiber = workInProgressHook;
    }else {
      currentlyRenderingFiber.next = update;
      currentlyRenderingFiber = update
    }
  }else {
    // update
    if(currentlyRenderingFiber === null) {
      workInProgressHook = {
        memorizeState: [cb, deps],
        next: null,
      }

      currentlyRenderingFiber = workInProgressHook;
    }else {
      currentlyRenderingFiber.next = {
        memorizeState: [cb, deps],
        next: null,
      }

      currentlyRenderingFiber = currentlyRenderingFiber.next;
    }
  }
}


function runEffectWithMount(){
  const point = workInProgressHook;
  while(point !== null) {
    const [cb, deps] = point.memorizeState;
    const lastDestory = cb();
    // point.lastCallback = cb;
    // point.lastDeps = deps;
    if(typeof lastDestory === 'function') {
      point.lastDestory = lastDestory;
    }
    point = point.next();
  }

  currentHook = workInProgressHook;
}

function runEffectWithUpdate(){
  const point = workInProgressHook;
  const currentPoint = currentHook;
  while(point !== null) {
    let shouldInvoke = false;
    const [cb, deps] = point.memorizeState;
  
    if(deps === undefined) {
      shouldInvoke = true;
    }else {
      const currentDeps = currentPoint.memorizeState[1];
      const deps = point.memorizeState[1];

      if(deps.length !== currentDeps.length) {
        // deps 依赖项发现变化
        shouldInvoke = true;
      }else {
        for(let i = 0; i < deps.length; i++ ) {
          // deps 依赖项发现变化
          if(!Object.is(deps[i], currentDeps[i])) {
            shouldInvoke = false;
            break;
          }
        }
      }
    }

    let lastDestory = currentPoint.lastDestory;
    // 调用 clean Up
    lastDestory && lastDestory();

    // 调用 callback
    lastDestory = cb();

    if(typeof lastDestory === 'function') {
      point.lastDestory = lastDestory;
    }
    
    point = point.next;
    currentPoint = currentPoint.next
  }

  currentHook = workInProgressHook;
}

function runWithWillUnmount() {
  // todo

  currentHook = workInProgressHook = currentlyRenderingFiber = null;
}

```

##### function component with getSnapshotBeforeUpdate
```js
function usePrevPropsAndState(props, state) {
  const prevPropsAndState = React.useRef({ props: null, state: null });
  const prevProps = prePropsAndState.current.props;
  const prevState = prePropsAndState.current.state;

  useEffect(() => {
    prevPropsAndStateRef.current = { props, state }
  })

  return { prevProps, prevState }
}

function useSnapshotBeforeUpdate(cb, props, state) {
  const { prevProps, prevState } = usePrevPropsAndState(props, state);
  const componentJustMounted = React.useRef(true);
  const snapshot = useRef(null)

  useLayoutEffect(() => {
    if(!componentJustMounted) {
      snapshot = cb(props, state);
    }
    componentJustMounted.current = false
  })

  return snapshot
}
```