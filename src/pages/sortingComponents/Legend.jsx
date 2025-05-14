import './Legend.css'

const Legend = ({algo, len, noOfSwap, noOfComps}) => {

    return (
        <div className='lengendContainer'>

        <div className='squares'>
                    <div className='block'> 
                        <span className='sq compare'></span> Compare
                    </div>
                    <div className='block'> 
                        <span className='sq swap'></span>  {algo !== 'mergeSort' ? 'Swap' : 'Taking From Auxillary Space'}
                    </div>
                    <div className='block'> 
                        <span className='sq sorted'></span>  Sorted
                    </div>
        </div>
            

            <div className='info'>
                    <div className='infoLen'> Length of Array : {len} </div>
                    <div className='infoBlock'>  Nos of Swaps : {noOfSwap} </div>
                    <div className='infoBlock'>  Nos Of Comparison : {noOfComps} </div>
            </div>
        </div>
        
    )
}

export default Legend;
