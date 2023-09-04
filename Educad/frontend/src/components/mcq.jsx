import {useState} from "react"


const Mcq=({mcq,setcount,count,index})=>{
    const [selected,setselected]=useState('')
    return(
        <>
        <div className="text-left pb-3">
        <h2>{index+1}) {mcq.question}</h2>
        <ul>
            {mcq.options?.map((que,index)=>(
                <li className="p-1" key={index}>
                    <label>
                    <input type="radio" value={que.text} checked={selected==que.text} onChange={()=>{
                        
                        if(que.isCorrect){
                            alert('right answer')
                            setselected(que.text)
                            setcount(count+1)
                        }
                        else{
                            alert('wrong answer')
                        }
                    }} />
                         {que.text}
                    </label>
                </li>
            ))}
            
        </ul>
        </div>
        </>
    )
}

export default Mcq