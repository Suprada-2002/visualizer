import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home(){

    const navigate = useNavigate();

    return(
        <>
        <p>Home</p>
        <div className="algoBoxes">

            <div className="box" onClick={() => navigate('/sorting')}>
                <h4>Sorting Algorithms</h4>
                <p>Algorithms Implemented: </p>
                <ul>
                    <li>Bubble Sort</li>
                    <li>Selection Sort</li>
                    <li>Insertion Sort</li>
                    <li>Merge Sort</li>
                    <li>Quick Sort</li>
                </ul>
            </div>

            <div className="box" onClick={() => navigate('/searching')}>
                <h4>Searching Algorithms</h4>
                <p>Algorithms Implemented: </p>
                <ul>
                    <li>Linear Search</li>
                    <li>Binary Search</li>
                    <li>Exponential Search</li>
                </ul>
            </div>

            <div className="box" onClick={() => navigate('/pathfinding')}>
                <h4>Path Finding Algorithms</h4>
                <p>Algorithms Implemented: </p>
                <ul>
                    <li>A* Path Finding Algorithm</li>
                    <li>Breadth First Drach (BFS)</li>
                    <li>Depth First Search (DFS)</li>
                </ul>
            </div>

        </div>
        </>
    )
}

export default Home;
