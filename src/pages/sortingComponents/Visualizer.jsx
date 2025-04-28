import { useState, useEffect } from "react";
import InputBar from "./InputBar";
import Bars from "./Bars";

import { bubbleSort, selectionSort, insertionSort } from "./Algorithms";
import quickSort from './QuickSort.jsx';
import mergeSort from './MergeSort.jsx';

function Visualizer(){

        const [length, setLength] = useState(40);
        const [blocks, setBlocks] = useState([]);
        const [isSorting, setIsSorting] = useState(false);
        const [algo, setAlgo] = useState("bubbleSort");
        const [speed, setSpeed] = useState(250);
        const [swap, setSwap] = useState([]);
        const [compare, setCompare] = useState([]);
        const [sortedIndex, setSortedIndex] = useState([]);

        useEffect(() => {
            generateRandomArray(length);
        }, [algo, length])

        function generateRandomArray(length){
            setIsSorting(false);
            setSortedIndex([]);
            const randomArray = Array.from(Array(length+1).keys()).slice(1);
                for (let i = randomArray.length - 1; i > 0; i--) {
                const indx = Math.floor(Math.random() * (i - 1))
                const temp = randomArray[i]
            
                randomArray[i] = randomArray[indx]
                randomArray[indx] = temp
            }
            setBlocks(randomArray);
        }

        function handleSpeed(event) {
            setSpeed(400/Number(event.target.value))
        }

        function handleLength(event) {
            setLength(Number(event.target.value))
        }

        function handleSort(){
           

            // const sortBlocks = (order) => {
            //     ( function loop(i) {
            //         setTimeout(function(){
            //             const [j, k, arr, index] = order[i];
            //             setCompare([j,k]);
            //             setSwap([]);

            //             if(index !== null){
            //                 setSortedIndex((prevState) => ([...prevState, index]))
            //             }

            //             if(arr){
            //                 setBlocks(arr);
            //                 if(j !== null || k != null) setSwap([j,k])
            //             }

            //             if(++i < order.length) loop(i);
            //             else {
            //                 setIsSorting(false);
            //             }

            //         }, speed)
            //     })(0)
               
            // }

            const sortBlocks = (order) => {
                console.log("order", order);
                let i = 0;
            
                const processOrder = () => {
                    if (i >= order.length) {
                        setIsSorting(false);
                        return;
                    }
            
                    const [j, k, arr, index] = order[i];
                    setCompare([j, k]);
                    setSwap([]);
            
                    if (index !== null) {
                        setSortedIndex((prevState) => [...prevState, index]);
                    }
            
                    if (arr) {
                        setBlocks(arr);
                        if (j !== null || k !== null) setSwap([j, k]);
                    }
            
                    i++;
                    setTimeout(processOrder, speed);
                };
            
                processOrder();
            };
            

            setIsSorting(true);
            algo === "bubbleSort" ? sortBlocks(bubbleSort(blocks)):
            algo === "selectionSort" ? sortBlocks(selectionSort(blocks)):
            algo === "insertionSort" ? sortBlocks(insertionSort(blocks)) : (() => {
                setIsSorting(false);
            })()
        }

    return(
        <>
        <h3>Sorting Algorithm</h3>

        <InputBar length={length} speed={speed} isSorting={isSorting} 
        generateRandomArray={generateRandomArray} handleSpeed={handleSpeed}
        handleLength={handleLength} algo={algo} setAlgo={setAlgo} handleSort={handleSort}
        />

        <Bars blocks={blocks} swap={swap} compare={compare} sortedIndex={sortedIndex}/>
        </>
    )
}

export default Visualizer;
