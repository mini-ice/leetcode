const index = Math.floor(Math.random() * 10000);

function normalLoop() {
  console.time();
  let result = [];
  for (let i = 0; i < 10000; i++) {
    result.push(i);
  }
  console.log(result[index]);
  console.timeEnd();
}

function sliceNoop() {
  console.time();
  let result = [];
  for (let i = 0; i < 10000; i += 100) {
    for (let j = 0; j < 100; j++) {
      result.push(j + i);
    }
  }
  console.log(result[index]);
  console.timeEnd();
}

normalLoop();
sliceNoop();

