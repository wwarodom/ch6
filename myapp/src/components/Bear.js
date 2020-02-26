import React, {useState, useEffect}  from 'react'
import axios from 'axios'

export default () => {

    const [bears, setBears] = useState({}) 
    const [name, setName] = useState('') 
    const [weight, setWeight] = useState(0) 

    useEffect( () => {
        getBears()
    } , [] )

    const getBears = async () => {
       const result = await axios.get('http://localhost/api/bears')
       console.log(result.data)
       setBears(result.data)
    }

    const addBear = async () => {
        const result = await axios.post('http://localhost/api/bears', {
            name,
            weight
        })
        console.log(result.data)
        getBears()
    }

    const printBears = () => {
        if ( bears && bears.length )
            return bears.map((bear,index) => {
                return (
                    <li key={index}>
                        {bear.name} : {bear.weight}
                    </li>
                )
            })
        else {
            return (<h2> No bear </h2>)
        }

    }

    return (
        <div>
            Bear
            <ul>
                 {printBears()}
            </ul>
            <h2>Add Bear</h2>
            Name: 
            <input 
                placeholder="name"
                type="text"
                name="name"
                onChange={ (e)=> setName(e.target.value) }
                /> <br/>
            Weight:
            <input                 
                type="number"
                name="weight"
                onChange={ (e)=> setWeight(e.target.value) }
                /><br/>
            <button onClick={addBear}>Add </button>
      </div>
    )
}