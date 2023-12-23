import React, { useEffect, useState } from 'react'
import { GrAdd } from "react-icons/gr";
import { AiFillDelete ,AiFillEdit} from "react-icons/ai";

const localData = ()=>{
  let list = localStorage.getItem("data");
  if(list){
    return JSON.parse(localStorage.getItem("data"))
  }
  else{
    return [];
  }
}
const App = () => {
  const [input,setInput] = useState("");
  const [item,setItem] = useState(localData());
  const [togglebtn,setTogglebtn] = useState(true);
  const [isedit,setIsedit] = useState(null);


  // add todo items 
  const addItem = () =>{
    if(!input){
      alert('Please filled something inot input box');
    }
    else if(input && !togglebtn){
      setItem(item.map((elem)=>{
        if(elem.id === isedit){
          return {...elem,name:input}
        }
        return elem;
      }))
      setTogglebtn(true)
      setInput('');
      setIsedit(null);
    }
    else{
      const inputData = {id:new Date().getTime().toString(),name:input}
      setItem([...item,inputData]);
      setInput("");
    }

  }


  // edit todo items 
  const editData = (id)=>{
    let newData = item.find((elem)=>{
      return elem.id ===id
    })
    setTogglebtn(false)
    setInput(newData.name)
    setIsedit(id)
  }

  // delete todo items 
  const deleteData = (id)=>{
    const updateItem = item.filter((val,index)=>{
      return val.id !== id
    })
    setItem(updateItem)

  }

  // remove all items 
  const removeAll = ()=>{
    setItem([]);
  }

  useEffect(()=>{
    localStorage.setItem('data',JSON.stringify(item))
  },[item])



  return (
    <div className='bg-green-500 w-[100%] h-[100vh] flex flex-col justify-center items-center'>
    <h1 className='mb-[40px] text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>TODO LIST</h1>
    <div className="w-[400px]  h-[60px] flex justify-center">
    <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} className='w-[300px] h-[60px] rounded-xl indent-6 font-bold text-xl' />
    {
      togglebtn ?     <GrAdd className='bg-white mt-4 ml-[-2rem] text-[1.3rem]' onClick={addItem}/> 
      : 
      <AiFillEdit className='bg-white mt-4 ml-[-2rem] text-[1.3rem]' onClick={addItem}/> 
    }
    </div>
    <div>
    {
      item.map((val)=>(
        <div className=' text-white items-center font-semibold  bg-yellow-800 w-[350px] h-[60px] mt-[3rem]  rounded-lg p-4 flex justify-between'>
        <h1>{val.name}</h1>
        <AiFillDelete onClick={()=>deleteData(val.id)} />
        <AiFillEdit className='ml-[-10rem]'onClick={()=>editData(val.id)} />

        </div>
      ))
    }
    </div>
    <div className='mt-[100px]' >
    <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={removeAll}>Remove All</button>
    </div>
    
    </div>
  )
}

export default App