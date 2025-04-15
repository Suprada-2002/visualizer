export const linearSearch = (blocks, searchingEle) => {
    const arr = blocks.slice();
    const ele = searchingEle;
    const order = [];
    
    let i;
    for(i=0;i<arr.length;i++){
        order.push([i, null, "checked"]);
        if(arr[i] === ele){
            order.push([null, i, "found"]);
        }
    }

}

// export const binarySearch = (blocks, target) => {
//     const arr = blocks.slice();
//     const order = [];
//     let left = 0;
// let right = arr.length - 1;

//      while (left <= right) {
//         const mid = Math.floor((left + right) / 2);
//         order.push([left, mid, right, null]); // Highlight the current bounds and mid
       
    
//     }
//     order.push([null, null, null, null]);
//     return order;
// }

export const binarySearch = (blocks, target) => {
    const arr = blocks.slice();
    const order = [];
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        order.push([left, mid, right, null]); // Highlight the current bounds and mid

        if (arr[mid] === target) {
            order.push([null, mid, null, mid]); // Mark the found index
            return order;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    order.push([null, null, null, null]); // Indicate the search is complete
    return order;
};


export const exponentialSearch = (blocks) => {

}
