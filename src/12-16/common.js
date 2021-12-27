var counter = 3
let obj = {};
function incCounter() {
    counter++
}
function update() {
    obj.x = 1;
}
module.exports = {
    counter : counter,
    incCounter : incCounter,
    update
}