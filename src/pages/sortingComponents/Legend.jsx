import {SwatchBook, CheckCheck, GitCompare, Ruler} from 'lucide-react'
const Legend = ({algo, len}) => {

    return (
        <div className='d-flex justify-content-center pt-2'>
             <div className='align-items-center'> 
             <span className='sq compare'></span> <Ruler color='#da8b17' /> Size: {len}
            </div>
            <div className='align-items-center'> 
                <span className='sq compare'></span> <GitCompare color='#2E88C7' /> Compare
            </div>
            <div className='align-items-center'> 
                <span className='sq swap'></span> <SwatchBook color='#F81774' /> {algo !== 'mergeSort' ? 'Swap' : 'Taking From Auxillary Space'}
            </div>
            <div className='align-items-center'> 
                <span className='sq sorted'></span> <CheckCheck color="#4bc52e" /> Sorted
            </div>

        </div>
    )
}

export default Legend;
