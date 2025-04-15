const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

export const bubbleSort = (blocks) =>{
    const arr = blocks.slice();
    const order = [];
    
    let i,j;
    for(i=0;i<arr.length;i++){
        for(j=0;j<arr.length-i-1;j++){
            order.push([j, j+1, null, null]);
            if(arr[j] > arr[j+1]){
                swap(arr, j, j+1);
                order.push([j, j+1, arr.slice(), null]);
            }
        }
        order.push([null, null, null, j]);
    }
    return order;
}

export const selectionSort = (blocks) => {
    const arr = blocks.slice();
    const order = [];

    let i,j;
    for(i=0;i<arr.length;i++){
        for(j=i+1;j<arr.length;j++){
            order.push([i,j,null,null]);
            if(arr[i] > arr[j]){
                swap(arr,i,j);
                order.push([i,j,arr.slice(),null]);
            }
        }
        order.push([null, null, null, i]);
    }
    return order;
}

export const insertionSort = (blocks) => {
    const arr = blocks.slice();
    const order = [];
    let i,j;
    for(i=0; i<arr.length; i++){
        j = i-1;
        while(j >= 0 && arr[j] > arr[j+1]){
            swap(arr, j, j+1);
            order.push([j, j+1, null, null]);
            order.push([j,j+1, arr.slice(), null]);
            j--;
        }
    }
    for(i=0;i<arr.length;i++){
        order.push([null, null, null, i]);
    }
    return order;
}
