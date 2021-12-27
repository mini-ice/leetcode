Array.prototype.myFill = function (val, start, end) {
  const context = Object(this);

  const len = context.length >>> 0,
    relativeStart = start >> 0,
    relativeEnd = end === undefined ? len : end >> 0;

  let k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);
  let final = end < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);

  
  while(k < final) {
    context[k] = value;
    k++;
  }
  return context;
};
