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


export const exponentialSearch = (blocks, target) => {
    const arr = blocks.slice();
    arr.sort((a,b) => a-b);
    const order = [];
    order.push([null, null, null, null, arr]);
    let ind = 1;    

    if(arr[0] === target){
        order.push([null, null, null, 0, null]);
        return order;
    }

    // while(ind < arr.length && arr[ind]<=target) ind=ind*2;

}
