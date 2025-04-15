import { useState, useEffect } from "react";
import InputBar from "./InputBar";
import Bars from "./Bars";

import { linearSearch, binarySearch, exponentialSearch} from "./Algorithm";

function Visualizer(){

        const [length, setLength] = useState(40);
        const [searchingEle, setIsSearchingEle] = useState(Math.floor(Math.random() * (length - 1 + 1) + 1));
        const [blocks, setBlocks] = useState([]);
        const [isSearching, setIsSearching] = useState(false);
        const [algo, setAlgo] = useState("bubbleSort");
        const [speed, setSpeed] = useState(250);
        const [checked, setChecked] = useState([]);
        const [found, setFound] = useState([]);
        const [index, setIndex] = useState(0);

        useEffect(() => {
            generateRandomArray(length);
        }, [algo, length])

        // useEffect(() => console.log(searchingEle), [searchingEle])

        function generateRandomArray(length){
            setIsSearching(false);
            const randomArray = Array.from(Array(length+1).keys()).slice(1);
                for (let i = randomArray.length - 1; i > 0; i--) {
                const indx = Math.floor(Math.random() * (i - 1))
                const temp = randomArray[i]
            
                randomArray[i] = randomArray[indx]
                randomArray[indx] = temp
            }
            setBlocks(randomArray);
            setIsSearchingEle(randomArray[Math.floor(Math.random() * length)]);
        }

        function handleSpeed(event) {
            setSpeed(400/Number(event.target.value))
        }

        function handleLength(event) {
            setLength(Number(event.target.value))
        }

        // function handleSearch(){
        //     setIsSearching(true);
        //     switch(algo){
        //         case "linearSearch":
        //             searchBlocks(linearSearch(blocks, searchingEle));
        //             setIsSearching(true);
        //             break;
        //         case "binarySearch":
        //             searchBlocks(binarySearch(blocks, searchingEle));
        //             setIsSearching(true);
        //             break;
        //         default:
        //             setIsSearching(false);
        //             console.log("Invalid Algorithm!!");
        //     }

        //     const searchBlocks = (order) =>{
        //         let i = 0;
        //         const process = () => {
        //             if(i>= order.length){
        //                 setIsSearching(false);
        //                 return;
        //             }

        //             const [checked, found, mess] = order[i];
        //             setChecked([checked]);
        //             setFound([found]);

        //             i++;
        //             setTimeout(process, speed);
        //         };
        //         process();
        //     }
           
        
          
            // setIsSearching(true);
            // algo === "linearSearch" ? searchBlocks(linearSearch(blocks)):
            // algo === "binarySearch" ? searchBlocks(binarySearch(blocks)):
            // algo === "exponentialSearch" ? searchBlocks(exponentialSearch(blocks)) : (() => {
            //     setIsSearching(false);
            // })()
        // }
        const handleSearch = (order) => {
            let i = 0;
        
            const processOrder = () => {
                if (i >= order.length) {
                    setIsSearching(false);
                    return;
                }
        
                const [left, mid, right, foundIndex] = order[i];
                setChecked([left, mid, right]);
        
                if (foundIndex !== null) {
                    setFound((prevState) => [...prevState, foundIndex]);
                }
        
                i++;
                setTimeout(processOrder, speed);
            };
        
            processOrder();
        };
        


    return(
        <>
        <h3>Sorting Algorithm</h3>

        <InputBar length={length} speed={speed} isSorting={isSearching} 
        generateRandomArray={generateRandomArray} handleSpeed={handleSpeed} searchingEle={searchingEle}
        handleLength={handleLength} algo={algo} setAlgo={setAlgo} handleSort={handleSearch}
        />

        <Bars blocks={blocks} checked={checked} found={found} sortedIndex={index}/>
        </>
    )
}

export default Visualizer;
