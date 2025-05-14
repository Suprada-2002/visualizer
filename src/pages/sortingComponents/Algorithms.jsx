const swap = (arr, i, j) => {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  
  
  export const bubbleSort = (blocks) => {
    const dupBlocks = blocks.slice() // copying blocks array
    const order = []
    let i, j
    for (i = 0; i < dupBlocks.length; i++) {
        for (j = 0; j < dupBlocks.length - i - 1; j++) {
  
            order.push([j, j + 1, null, null])                  
            if (dupBlocks[j] > dupBlocks[j + 1]) {
                swap(dupBlocks, j, j + 1)
                order.push([j, j + 1, dupBlocks.slice(), null]) 
            }
        }
        order.push([null, null, null, j]) // j-th element is in correct position ( Sorted )
    }
    return order
  }
  
  export const insertionSort = (blocks) => {
  
    const dupBlocks = blocks.slice() // copying blocks array
    const order = []
  
    let i, j
    
    for (i = 0; i < dupBlocks.length; i++) {
        j = i - 1
        while(j >= 0 && dupBlocks[j] > dupBlocks[j + 1]){
            swap(dupBlocks, j, j + 1)
            order.push([j, j + 1, null, null])              // Compare
            order.push([j, j + 1, dupBlocks.slice(), null]) // Swap
            j -= 1
        }
    }
  
    for(i=0;i<dupBlocks.length;i++){
        order.push([null, null, null, i])
    }
  
    return order;
  }
  
  export const selectionSort = (blocks) => {
    const dupBlocks = blocks.slice() // copying blocks array
    const order = []
    let i, j
    for (i = 0; i < dupBlocks.length; i++) {
        for (j = i + 1; j < dupBlocks.length; j++) {
  
            order.push([i, j, null, null])                  // Compare
            if (dupBlocks[i] > dupBlocks[j]) {
                swap(dupBlocks, i, j)
                order.push([i, j, dupBlocks.slice(), null]) // Swap
            }
        }
        order.push([null, null, null, i]) // i-th element is in correct position ( Sorted )
    }
    return order
  }
  
  
//   // Sorting Algorithms with visualization
//   export const visualizeSort = async (blocks, algorithm, setCompare, setSwap, setSorted, sleep) => {
//     let arr = [...blocks];
//     let len = arr.length;
  
//     switch (algorithm) {
//       case 'bubbleSort':
//         for (let i = 0; i < len - 1; i++) {
//           for (let j = 0; j < len - i - 1; j++) {
//             setCompare([j, j + 1]); // Set the comparison indices
//             await sleep(300); // Wait for the comparison to show
  
//             if (arr[j] > arr[j + 1]) {
//               setSwap([j, j + 1]); // Set the swap indices
//               await sleep(300); // Wait for the swap to show
  
//               // Swap elements
//               [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//             }
//           }
//           setSorted(prevSorted => [...prevSorted, len - i - 1]); // Mark this element as sorted
//         }
//         break;
  
//       case 'insertionSort':
//         for (let i = 1; i < len; i++) {
//           let key = arr[i];
//           let j = i - 1;
//           setCompare([j, i]); // Set the comparison indices
//           await sleep(300); // Wait for the comparison to show
  
//           while (j >= 0 && arr[j] > key) {
//             setSwap([j, j + 1]); // Set the swap indices
//             await sleep(300); // Wait for the swap to show
//             arr[j + 1] = arr[j];
//             j--;
//           }
//           arr[j + 1] = key;
//           setSorted(prevSorted => [...prevSorted, i]); // Mark this element as sorted
//         }
//         break;
  
//       case 'selectionSort':
//         for (let i = 0; i < len - 1; i++) {
//           let minIndex = i;
//           for (let j = i + 1; j < len; j++) {
//             setCompare([minIndex, j]); // Set the comparison indices
//             await sleep(300); // Wait for the comparison to show
  
//             if (arr[j] < arr[minIndex]) {
//               minIndex = j;
//             }
//           }
//           if (minIndex !== i) {
//             setSwap([i, minIndex]); // Set the swap indices
//             await sleep(300); // Wait for the swap to show
  
//             // Swap the minimum element with the current element
//             [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
//           }
//           setSorted(prevSorted => [...prevSorted, i]); // Mark this element as sorted
//         }
//         break;
  
//       case 'quickSort':
//         {
//         const quickSortHelper = async (low, high) => {
//           if (low < high) {
//             const pi = await partition(arr, low, high, setCompare, setSwap, sleep);
//             await quickSortHelper(low, pi - 1);
//             await quickSortHelper(pi + 1, high);
//           }
//         };
//         await quickSortHelper(0, len - 1);
//         break;
//       }
  
//       case 'mergeSort':
//         {
//         const mergeSortHelper = async (low, high) => {
//           if (low < high) {
//             const mid = Math.floor((low + high) / 2);
//             await mergeSortHelper(low, mid); // Left half
//             await mergeSortHelper(mid + 1, high); // Right half
//             await merge(arr, low, mid, high, setCompare, setSwap, sleep); // Merge the two halves
//           }
//         };
//         await mergeSortHelper(0, len - 1);
//         break;
//       }
//       default:
//         console.error('Unknown sorting algorithm');
//     }
  
//     return arr;
//   };
  
//   const partition = async (arr, low, high, setCompare, setSwap, sleep) => {
//     let pivot = arr[high];
//     let i = low - 1;
  
//     for (let j = low; j <= high - 1; j++) {
//       setCompare([i + 1, j]); // Set the comparison indices
//       await sleep(300); // Wait for the comparison to show
  
//       if (arr[j] <= pivot) {
//         i++;
//         setSwap([i, j]); // Set the swap indices
//         await sleep(300); // Wait for the swap to show
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//       }
//     }
  
//     setSwap([i + 1, high]); // Set the final swap indices
//     await sleep(300); // Wait for the swap to show
//     [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
//     return i + 1;
//   };
  
//   const merge = async (arr, low, mid, high, setCompare, setSwap, sleep) => {
//     let left = arr.slice(low, mid + 1);
//     let right = arr.slice(mid + 1, high + 1);
//     let i = 0, j = 0, k = low;
  
//     while (i < left.length && j < right.length) {
//       setCompare([k, k + 1]); // Set the comparison indices
//       await sleep(300); // Wait for the comparison to show
  
//       if (left[i] <= right[j]) {
//         arr[k] = left[i];
//         i++;
//       } else {
//         arr[k] = right[j];
//         j++;
//       }
//       k++;
//     }
  
//     while (i < left.length) {
//       arr[k] = left[i];
//       i++;
//       k++;
//     }
  
//     while (j < right.length) {
//       arr[k] = right[j];
//       j++;
//       k++;
//     }
  
//     setSwap([low, high]); // Mark the swap for merging
//     await sleep(300); // Wait for the swap to show
//   };
  

  
