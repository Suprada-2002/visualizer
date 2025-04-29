import { useState, useEffect } from "react";
import InputBar from "./InputBar";
import Bars from "./Bars";

import { linearSearch, binarySearch, exponentialSearch, interpolationSearch, fibonacciSearch, jumpSearch} from "./Algorithm";

function Visualizer(){

        const [length, setLength] = useState(40);
        const [searchingEle, setIsSearchingEle] = useState(Math.floor(Math.random() * (length - 1 + 1) + 1));
        const [blocks, setBlocks] = useState([]);
        const [isSearching, setIsSearching] = useState(false);
        const [algo, setAlgo] = useState("linearSearch");
        const [speed, setSpeed] = useState(250);
        const [checked, setChecked] = useState([]); // left & right
        const [mid, setMid] = useState([]); //mid
        const [found, setFound] = useState([]);

        useEffect(() => {
            generateRandomArray(length);
        }, [algo, length])

        function generateRandomArray(length){
            setIsSearching(false);
            setChecked([]);
            setMid([]);
            setFound([]);
            const randomArray = Array.from(Array(length+1).keys()).slice(1);
                for (let i = randomArray.length - 1; i > 0; i--) {
                const indx = Math.floor(Math.random() * (i - 1))
                const temp = randomArray[i]
            
                randomArray[i] = randomArray[indx]
                randomArray[indx] = temp
            }
            setBlocks(randomArray);
            setIsSearchingEle(randomArray[Math.floor(Math.random() * length)]);
        };

        function handleSpeed(event) {
            setSpeed(400/Number(event.target.value))
        }

        function handleLength(event) {
            setLength(Number(event.target.value))
        }

        function handleSearch(event){
            event. preventDefault()
            setIsSearching(true);
            setChecked([]);
            setFound([]);
            setMid([]);

            const searchBlocks = (order) =>{
                console.log("order", order)
                let i = 0;

                const processOrder = () =>{
                    if(i>=order.length){
                        setIsSearching(false);
                        return;
                    }

                    const [left, right, mid , found, arr] = order[i];
                    if(arr) setBlocks(arr);
                    setChecked([left, right]);
                    setMid([mid]);

                    if(found !== null) setFound([found]) 
                    // else{ Window.alert("Element not found in the array!!")}

                    i++;
                    setTimeout(processOrder, speed);
                };

                processOrder(); 
            };
            
            setIsSearching(true);
            algo === "linearSearch" ? searchBlocks(linearSearch(blocks, searchingEle)) :
            algo === "exponentialSearch" ? searchBlocks(exponentialSearch(blocks, searchingEle)) :
            algo === "interpolationSearch" ? searchBlocks(interpolationSearch(blocks, searchingEle)) :
            algo === "binarySearch" ? searchBlocks(binarySearch(blocks, searchingEle)) : 
            algo === "jumpSearch" ? searchBlocks(jumpSearch(blocks, searchingEle)) :
            algo === "fibonacciSearch" ? searchBlocks(fibonacciSearch(blocks, searchingEle)) : (() => { setIsSearching(false) })()
        };

    return(
        <>
        <h3>Searching Algorithm</h3>

        <InputBar length={length} speed={speed} isSorting={isSearching} 
        generateRandomArray={generateRandomArray} handleSpeed={handleSpeed}
        handleLength={handleLength} algo={algo} setAlgo={setAlgo} handleSearch={handleSearch}
        />
        <span>Element to be Searched: {searchingEle}</span>

        <Bars blocks={blocks} checked={checked} mid={mid} found={found}/>
        </>
    )
}

export default Visualizer;
