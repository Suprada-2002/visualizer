import { useEffect, useState } from "react";
import './Bars.css'

function Bars({blocks, checked, found, sortedIndex}){
  
    const [width, setWidth] = useState(Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 5));

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
            {blocks.map( (num, key) => {

                const height = num * 500 / blocks.length;
                
                let bg = 'blue';

                if(checked && (key === checked[0] || key === checked[1])){ // left and right
                  bg = 'yellow';
                }

                if(checked && key === found[3]){
                  bg = 'pink';
                }

                if(found && found.includes(key)){
                  bg="green";
                }

                // if(sortedIndex && sortedIndex.includes(key)){
                //   bg = 'green';
                // }
                
                const barStyle = {
                    'backgroundColor': bg,
                    'color': 'black', 
                    'height': height, 
                    'width': width,
                    'border':'1px solid black'
                }
                return <div key={key} className="bar" style={barStyle}>{num}</div>
            })}
          </div>
        </>
    )
}

export default Bars;
