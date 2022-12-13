// code based on: https://shaqqour.medium.com/how-to-create-click-me-button-with-a-counter-in-react-native-32bcf1d68a5e

import React, {useState} from "react";             

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <button onClick={() => {setCount(count+1)}} title="Yeah" className="YeahButton">        
            <p>Yeah!</p>
            <p>{count}</p>
        </button>
        
    );
}

export default Counter;