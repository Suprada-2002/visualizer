import React, { useState, useEffect } from 'react'
import './Bars.css';

function Bars({ blocks, compare, sorted, swap }){
    const [width, setWidth] = useState(Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 5))
    const color = blocks.length <= 50 && width > 14 ? '#e1e4e8' : 'transparent'

    useEffect(() => {
        const handleResize = () => {
            setWidth(Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8))
        }

        window.addEventListener('resize', handleResize)

        setWidth(Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8))
    }, [blocks.length])

    return (
        <div className='barBlocks'>

            {blocks.map((block, i) => {
                const height = block * 500 / blocks.length;
                let bg = '#414853'

                // i th element is being compared with some other element
                if(compare && (i === compare[0] || i === compare[1])){
                    bg = '#2E88C7'
                }

                if(swap && (i === swap[0] || i === swap[1])){
                    bg='#F81774'
                }
                // i th element is in its correct position
                if(sorted && sorted.includes(i)){
                    bg = '#298459'
                }

                const style = {
                    'backgroundColor': bg,
                    'color': color, 
                    'height': height, 
                    'width': width,
                }
                return (<div key={i} className='block' style={style}>{block}</div>)
            })}
        </div>
    );
}

export default Bars;
