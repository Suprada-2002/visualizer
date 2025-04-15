function InputBar({length, speed, isSearching, generateRandomArray, handleSpeed, handleLength, 
    algo, setAlgo, handleSearch, searchingEle}) {

    return(
        <>
        <p>Inputs: </p>

        <form>
                <label>Speed</label>
                <input 
                type="range"
                min="1"
                max="10"
                name="speed"
                value={Math.ceil(400/ speed)}
                disabled={isSearching}
                onChange={handleSpeed}
                ></input>

                <label>Length: </label>
                <input type="range" 
                name="length"
                min='5'
                max={100}
                step='1'
                value={length}
                disabled={isSearching}
                onChange={handleLength}
                 />
                {/* <label>Speed: </label>
                <input type="number" min={30} max={90}/> */}
                <label>Select Algorithm:  </label>
                <select 
                name="algo"
                value={algo}
                disabled={isSearching}
                onChange={(e) => setAlgo(e.target.value)}
                >
                    <option value="linearSearch">Linear Search</option>
                    <option value="binarySearch">Binary Search</option>
                    <option value="exponentialSearch">Exponential Search</option>
                    <option value="interpolationSearch">Interpolation Search</option>
                    <option value="jumpSearch">Jump Search</option>
                    <option value="fibonacciSearch">Finonnaci Search</option>
                </select>

                <label>Element to be Searched: {searchingEle}</label>

                <button onClick={generateRandomArray} disabled={isSearching}>Randomize</button>
                <button onClick={handleSearch} disabled={isSearching}>Search</button>
            </form>

        </>
    )
}

export default InputBar;
