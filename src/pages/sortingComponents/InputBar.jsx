function InputBar({length, speed, isSorting, generateRandomArray, handleSpeed, handleLength, 
    algo, setAlgo, handleSort}) {

    return(
        <>
        <p>Inputs: </p>

        <form>
                <label>Speed</label>
                <input 
                type="range"
                min="1"
                max="10"
                value={Math.ceil(400/ speed)}
                disabled={isSorting}
                onChange={handleSpeed}
                ></input>

                <label>Length: </label>
                <input type="range" 
                min='5'
                max={100}
                step='1'
                value={length}
                disabled={isSorting}
                onChange={handleLength}
                 />
                {/* <label>Speed: </label>
                <input type="number" min={30} max={90}/> */}
                <label>Select Algorithm:  </label>
                <select 
                name="algo"
                value={algo}
                disabled={isSorting}
                onChange={(e) => setAlgo(e.target.value)}
                >
                    <option value="bubbleSort">Bubble Sort</option>
                    <option value="selectionSort">Selection Sort</option>
                    <option value="insertionSort">Insertion Sort</option>
                    <option value="mergeSort">Merge Sort</option>
                    <option value="quickSort">Quick Sort</option>
                </select>

                <button onClick={generateRandomArray} disabled={isSorting}>Randomize</button>
                <button onClick={handleSort} disabled={isSorting}>Sort</button>
            </form>

        </>
    )
}

export default InputBar;
