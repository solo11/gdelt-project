import axios from "axios"
import { useState,useEffect } from "react"
  
export default function App() {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {

      const fetchData = async () =>{
        setLoading(true);
        try {
          const {data: response} = await axios.get('https://fastapi-app-solo117844-l17pf0r0.leapcell.dev/today');
          setData(response);
        } catch (error) {
          console.error(error.message);
        }
        setLoading(false);
      }
      fetchData();

    },[])

    
    return (

        <div>
{Object.keys(data).map((keyName, i) => (
    <li className="travelcompany-input" key={i}>
        <span className="input-label">key: {i} {data[keyName]['event']}</span>
    </li>
))}

        {console.log(typeof data)}
      </div>

    )
  }
  