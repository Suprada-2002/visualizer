import { useEffect, useState } from "react";
import './Bars.css'

function Bars({blocks, swap, compare, sortedIndex}){
  
    const [width, setWidth] = useState(Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 5));
    const color = blocks.length <= 50 && width > 14 ? '#e1e4e8' : 'transparent'

    useEffect(() => {
      const handleResize = () => {
        setWidth(Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8))
    }
    window.addEventListener('resize', handleResize);
    setWidth(Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8));
    }, [blocks.length])

    return(
        <>
          <div className="bars">
            {blocks.map( (num, i) => {

                const height = num * 500 / blocks.length;
                
                let bg = "#414853";

                if(compare && (i === compare[0] || i === compare[1])){
                  bg = '#f9b44e';
                }

                if(swap && swap && (i === swap[0] || i === swap[1])){
                  bg = '#2E88C7';
                }

                if(sortedIndex && sortedIndex.includes(i)){
                  bg = '#30a46c';
                }
                
                const barStyle = {
                    'backgroundColor': bg,
                    'color': color, 
                    'height': height, 
                    'width': width,
                    'border':'1px solid black'
                }
                return <div key={i} className="bar" style={barStyle}>{num}</div>
            })}
          </div>
        </>
    )
}

export default Bars;
