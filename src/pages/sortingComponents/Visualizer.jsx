import { useEffect,useState } from "react";
import InputBar from "./InputBar.jsx";
import Legend from "./Legend.jsx"

import { bubbleSort, selectionSort, insertionSort} from "./Algorithms.jsx";
import quickSort from "./QuickSort.jsx";
import mergeSort from "./MergeSort.jsx"

import Bars from "./Bars.jsx";

function Sorting() {

	{/* states */}
const [len, setLength] = useState(40);
const [algo,setAlgo] = useState('bubbleSort');
const [blocks, setBlocks] = useState([])
const [sorting, setSorting] = useState(false)
const [completed, setCompleted] = useState(true)
const [speed, setSpeed] = useState(250)
const [compare, setCompare] = useState([])
const [swap, setSwap] = useState([])
const [sortedIndex, setSortedIndex] = useState([])

const generateRandomArray = (len) => {

	setCompleted(false);
	setSorting(false);
	setSortedIndex([]);
	const randomArray = Array.from(Array(len+1).keys()).slice(1);
	for (let i = randomArray.length - 1; i > 0; i--) {
   const indx = Math.floor(Math.random() * (i - 1))
   const temp = randomArray[i]

   randomArray[i] = randomArray[indx]
   randomArray[indx] = temp
   }
   setBlocks(randomArray);
}

useEffect(() => {
	generateRandomArray(len);
}, [len,algo])

{/* function */}
const handleLength = (event) => {
	setLength(Number(event.target.value))
}

const handleSpeed = (event) => {
	console.log("speed: ",speed);
	setSpeed(Math.ceil(400 / Number(event.target.value)))
}

const handleAlgo = (event) => {
    console.log("Algo: ",algo);
	setAlgo(event.target.value)
}

const handleSort = () => {
	const sortAccOrder = (order) => {
		(function loop(i) {
			setTimeout(function () {
				const [j, k, arr, index] = order[i]
				setCompare([j, k])
				setSwap([]);

				if(index !== null){
					setSortedIndex((prevState) => (
						[...prevState, index]
					))
				}
	
				if(arr){
					
					setBlocks(arr)
					if(j !== null || k != null)
						setSwap([j, k])

				}
				if (++i < order.length){
					loop(i)
				} else {
					setSorting(false)
					setCompleted(true)
				}   
			}, speed)
		})(0)
		
	}

	setSorting(true)

	algo === 'bubbleSort' ? sortAccOrder(bubbleSort(blocks)) : 
	algo === 'insertionSort' ?  sortAccOrder(insertionSort(blocks)) :
	algo === 'selectionSort' ? sortAccOrder(selectionSort(blocks)) :
	algo === 'mergeSort' ? sortAccOrder(mergeSort(blocks)) : 
	algo === 'quickSort' ? sortAccOrder(quickSort(blocks)) : (() => {
		setSorting(false)
		setCompleted(true)
	})()
}

    return(
 <div>
		<div className="logo">
			<h3>Sorting Visualizer</h3>
		</div>
					<InputBar 
							generateRandomArray={() => generateRandomArray(len)}
							handleLength={handleLength} 
							handleSpeed={handleSpeed}
							handleAlgo={handleAlgo}
							handleSort={handleSort} 
							sorting={sorting}
							completed={completed}
							len={len}
							speed={speed}
							algo={algo}
							setAlgo={setAlgo}
						/>

						<Legend algo={algo} len={len} />
			
							<Bars
							swap={swap}
							blocks={blocks}
							compare={sorting && compare} sortedIndex={sortedIndex} 
							/>
			</div>
    )
}

export default Sorting;
