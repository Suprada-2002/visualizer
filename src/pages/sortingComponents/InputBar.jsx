import './InputBar.css';

function InputBar({length, speed, sorting, generateRandomArray, handleSpeed, handleLength, 
    algo, handleAlgo, handleSort, setAlgo}) {

    return(
        <>
        <form className='InputbarWrapper'>
            <div className='form-input'>
                <label>Speed</label>
                <input 
                type="range"
                min="1"
                max="10"
                value={Math.ceil(400/ speed)}
                disabled={sorting}
                onChange={handleSpeed}
                ></input>
            </div>

            <div className='form-input'>
                <label>Length</label>
                <input type="range" 
                min='5'
                max={100}
                step='1'
                value={length}
                disabled={sorting}
                onChange={handleLength}
                 />

             </div>
                {/* <label>Speed: </label>
                <input type="number" min={30} max={90}/> */}
                
            <div className='form-input'>
                <label>Select Algorithm</label>
                <select 
                className='input-select'
                name="algo"
                value={algo}
                disabled={sorting}
                onChange={(e) => setAlgo(e.target.value)}
                >
                    <option value="bubbleSort">Bubble Sort</option>
                    <option value="selectionSort">Selection Sort</option>
                    <option value="insertionSort">Insertion Sort</option>
                    <option value="mergeSort">Merge Sort</option>
                    <option value="quickSort">Quick Sort</option>
                </select>
            </div>

            <div className='form-button'>
                <button onClick={generateRandomArray} disabled={sorting}>Randomize</button>
                <button onClick={handleSort} disabled={sorting}>Sort</button>
            </div>
            </form>

        </>
    )
}

export default InputBar;
