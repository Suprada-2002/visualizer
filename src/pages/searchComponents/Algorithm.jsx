export const linearSearch = (blocks, target) => {
    const arr = blocks.slice();
    const order = [];
    
    let i;
    for(i=0;i<arr.length;i++){
        order.push([i, null, null, null, null]);
        if(arr[i] === target){
            order.push([null, null, null, i, null]);
           return order;
        }
    }
    order.push([null, null, null, null, null]);
    return order;
}

export const binarySearch = (blocks, target) => {
    const arr = blocks.slice();
    arr.sort((a,b) => a-b);
    const order = [];
    order.push([null, null, null, null, arr]);
    let left = 0;
    let right = arr.length - 1;
    let mid = Math.floor((left + right) / 2);
    order.push([left, right, mid, null,null]);
    console.log(order);

    while (left <= right) {
        mid = Math.floor((left + right) / 2);
        order.push([left, right, mid, null, null]); // Highlight the current bounds and mid

        if (arr[mid] === target) {
            order.push([null, null, null, mid,null]); // Mark the found index
            return order;
        } else if (arr[mid] < target) {
            left = mid + 1;
            order.push([left,null,null,null,null]);
        } else {
            right = mid - 1;
            order.push([null,right,null,null,null])
        }
    }

    order.push([null, null, null, mid]); // Indicate the search is complete
    return order;
};

 // ----------------------- Exponential search -------------------------------------------
export const exponentialSearch = (blocks, target) => {
    const n = blocks.length;
    const arr = blocks.slice();
    const order = [];
    arr.sort((a,b) => a-b);
    order.push([null, null, null, null, arr]); // sort

    if (n == 0) {
      return -1;
    }
  
    let i = 1;
    while (i < n && arr[i] < target) { 
      i *= 2;
    }
  
    let left = Math.floor(i / 2); // left boundary 
    let right = Math.min(i, n - 1); // right boundary
    let mid = Math.floor((left + right) / 2);
    order.push([left, right, mid, null,null]);
  
    // Perform binary search on the range [i/2, min(i, n-1)]
    while (left <= right) { 

      const mid = Math.floor((left + right) / 2);

      if (arr[mid] == target) { 
        order.push([null, null, null, mid,null]); 
        return order;
      } 
      
      else if (arr[mid] < target) { 
        left = mid + 1;
        order.push([left,null,null,null,null]);
      } 
      
      else {
        right = mid - 1;
        order.push([null,right,null,null,null])
      }
    }
  
    return order; 
  }
  

//  -------------------- Interpolation Search --------------------
export const interpolationSearch = (blocks, target) => {
    const n = blocks.length;
    const arr = blocks.slice();
    const order = [];
    arr.sort((a,b) => a-b);
    order.push([null, null, null, null, arr]); 


    let low = 0;
    let high = n - 1;
    order.push([low, high, null, null, null]); 
    
    // Since array is sorted, an element present
    // in array must be in range defined by corner
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low == high) {
            if (arr[low] == target) {
                order.push([null, null, null, low,null]); 
                return order;
            }
            return -1;
        }
    
        // Probing the position with keeping
        // uniform distribution in mind.
        let pos = Math.floor(low + (((high - low) / (arr[high] - arr[low])) * (target - arr[low])));
        order.push([null, null, null, pos,null]); 
    
        // Condition of target found
        if (arr[pos] == target) {
            order.push([null, null, null, pos,null]); 
             return order;
        }
    
        // If x is larger, x is in upper part
        if (arr[pos] < target) {
            low = pos + 1;
            order.push([low,null,null,null,null]);
        }
    
        // If x is smaller, x is in lower part
        else {
            high = pos - 1;
            order.push([null,high,null,null,null])
        }
    }
    return order;
}

// ----------- Jump Search ------------
export const jumpSearch = (blocks, x)  => { 

    const n = blocks.length;
    const arr = blocks.slice();
    const order = [];
    arr.sort((a,b) => a-b);
    order.push([null, null, null, null, arr]); 

    // Finding block size to be jumped 
    let step = Math.sqrt(n); 
  
    // Finding the block where element is 
    // present (if it is present) 
    let prev = 0; 
    for (let minStep = Math.Min(step, n)-1; arr[minStep] < x; minStep = Math.Min(step, n)-1)
        { 
            prev = step; 
            step += Math.sqrt(n); 
            if (prev >= n) 
                return -1; 
        } 
  
    // Doing a linear search for x in block 
    // beginning with prev. 
    while (arr[prev] < x) 
    { 
        prev++; 
  
        // If we reached next block or end of 
        // array, element is not present. 
        if (prev == Math.min(step, n)) 
            return -1; 
    } 
    // If element is found 
    if (arr[prev] == x) 
        return prev; 
  
    return -1; 
} 


// ------------ Fibonacci search --------------
export const fibonacciSearch = (arr, x) => {
    let n = arr.length;

    // initialize first three fibonacci numbers
    let a =  0, b = 1, c = 1;
 
    // iterate while c is smaller than n
    // c stores the smallest Fibonacci 
    // number greater than or equal to n
    while (c < n) {
        a = b;
        b = c;
        c = a + b;
    }
 
    // marks the eliminated range from front
    let offset = -1;
 
    // while there are elements to be inspected
    // Note that we compare arr[a] with x. 
    // When c becomes 1, a becomes 08
    while (c > 1) {

        // check if a is a valid location
        let i = Math.min(offset + a, n - 1);
 
        // if x is greater than the value at index a,
        // cut the subarray array from offset to i 
        if (arr[i] < x) {
            c = b;
            b = a;
            a = c - b;
            offset = i;
        }
 
        // else if x is greater than the value at 
        // index a,cut the subarray after i+1
        else if (arr[i] > x) {
            c = a;
            b = b - a;
            a = c - b;
        }
 
        // else if element found, return index
        else
            return i;
    }
 
    // comparing the last element with x
    if (b && arr[offset + 1] === x)
        return offset + 1;
 
    // element not found, return -1
    return -1;
}
