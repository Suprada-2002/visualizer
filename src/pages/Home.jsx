import './Home.css';
import { useNavigate } from 'react-router-dom';
import {CirclePlay} from 'lucide-react'

function Home(){

    const navigate = useNavigate();

    return(
        <>
    <div className="ag-format-container">
        <div className="ag-courses_box">

    <div className="ag-courses_item" onClick={() => navigate('/sorting')} >
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Sorting Algorithm Visualization 
        </div>

        <div className="ag-courses-item_date-box">
          <CirclePlay width={40} color='#f9b234' />
          {/* <span className="ag-courses-item_date">
            04.11.2022
          </span> */}
        </div>
      </a>
    </div>

    <div className="ag-courses_item" onClick={() => navigate('/searching')} >
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Searching Algorithm Visualization
        </div>

        <div className="ag-courses-item_date-box">
         <CirclePlay width={40} color='#f9b234' />
          {/* <span className="ag-courses-item_date">
            04.11.2022
          </span> */}
        </div>
      </a>
    </div>

    <div className="ag-courses_item" onClick={() => navigate('/pathfinding')}  >
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Path-Finding Algorithm Visualization
        </div>

        <div className="ag-courses-item_date-box">
            <CirclePlay width={40} color='#f9b234' />
          {/* <span className="ag-courses-item_date">
            04.11.2022
          </span> */}
        </div>
      </a>
    </div>

    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Prime Number Visualization
        </div>

        <div className="ag-courses-item_date-box">
         <CirclePlay width={40} color='#f9b234' />
          {/* <span className="ag-courses-item_date">
            04.11.2022
          </span> */}
        </div>
      </a>
    </div>

    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Fibonacci Series Visualization
        </div>

        <div className="ag-courses-item_date-box">
         <CirclePlay width={40} color='#f9b234' />
          {/* <span className="ag-courses-item_date">
            30.11.2022
          </span> */}
        </div>
      </a>
    </div>

    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Ant-Colony Visualization
        </div>

        <div className="ag-courses-item_date-box">
         <CirclePlay width={40} color='#f9b234' />
          {/* <span className="ag-courses-item_date">
            30.11.2022
          </span> */}
        </div>
      </a>
    </div>

    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg">
        </div>
        <div className="ag-courses-item_title">
          Digital Marketing
        </div>

        <div className="ag-courses-item_date-box">
         <CirclePlay width={40} color='#f9b234' />
          {/* <span className="ag-courses-item_date">
            30.11.2022
          </span> */}
        </div>
      </a>
    </div>

    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Interior Design
        </div>

        <div className="ag-courses-item_date-box">
         <CirclePlay width={40} color='#f9b234' />
          {/* <span className="ag-courses-item_date">
            30.11.2022
          </span> */}
        </div>
      </a>
    </div>

  </div>
</div>
        </>
    )
}

export default Home;
