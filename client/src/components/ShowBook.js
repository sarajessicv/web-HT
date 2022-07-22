import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function ShowBook() {
    const {book} = useParams()

    const [data, setData] = useState({});

    useEffect(() => {
        fetch("/api/" + book)
        .then(response => response.json())
        .then(json => setData(json)) 
    }, [book])


  return (
    <div>
      <p>{data.name}</p>
      <p>{data.author}</p>
      <p>{data.pages}</p>
    </div>
  )
}

export default ShowBook
