import { useState, useEffect } from 'react'

import React from 'react';

import Modal from 'react-modal';

import axios from 'axios'

import '../App.css'


function TodoDisplay(props) {
  
  const {eachTodo, onClickDelete, updateTodoItem} = props
  const {id, title, status} = eachTodo
  const [updatedTodo, setUpdatedTodo] = useState(title)
  const [updateCompleted , setUpdateCompleted] = useState(status)
  const [statusUpdate, setStatusUpdate] = useState(status)
  

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection : "column",
      width: "350px"

    },
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onUpdateTodoText(e) {
      setUpdatedTodo(e.target.value)
  }

  const onChangestatus = (e) => {
     //sai
     setUpdateCompleted(!updateCompleted)
  }
  
  function onChangestatusWithoutModal() {
    setStatusUpdate(!statusUpdate)
    updateTodoItem(id, updatedTodo, !statusUpdate)
  }

  function onSubmitForm(e) {
    console.log(id, updatedTodo, updateCompleted)
    e.preventDefault()
    updateTodoItem(id, updatedTodo, updateCompleted)
    closeModal()
  }
  
  return <li className='todo-contaier' >
      
      <div>
        <span className='checkbox-css'>
          <input type='checkbox' name='checkbox' checked={statusUpdate} value={statusUpdate} onChange={onChangestatusWithoutModal} />
        </span>
        <span className={statusUpdate ? "titleLineThrough" : "title"}>{title}</span>
      </div>
      <div>
        <button className='editBtnCss' type='button' onClick={openModal}>Edit</button>
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp = {false}
      >
       <div style={{width: "100%",display: "flex", flexDirection: "row" , justifyContent: "space-between", alignItems: "center"}}>
          <h2>Edit Todo</h2>
          <button onClick={closeModal} style={{backgroundColor: "transparent", border : "0.5px solid red" , cursor: "pointer",
             outline: "none", color: "red"}}>close</button>
        </div>
        
        
        <form name='editForm' onSubmit={onSubmitForm}>
        <div style={{marginBottom: "32px", gap: "40px"}}>
            <label>Todo Text</label>
            <input type="text" value={updatedTodo} 
              onChange={onUpdateTodoText}
              placeholder='update todo text' 
              style={{width: "250px", gap: "62px", height: "25px", border: "1px solid #000", borderRadius: "4px", display: "flex", flexDirection: "column" }} />
          </div>

          <div style={{marginBottom: "32px", gap: "40px",  display: "flex", flexDirection: "row"}}>
            <input type="checkbox" checked={updateCompleted} value={updateCompleted} onChange={onChangestatus} />
            <label>Completed</label>
          </div>
          
          <div style={{marginBottom: "32px", gap: "40px",  display: "flex", flexDirection: "row"}}>
            <button onClick={closeModal} style={{backgroundColor: "transparent", border : "0.5px solid red" , cursor: "pointer",
                  outline: "none", color: "red"}}>close</button>
            <button type='submit'  style={{backgroundColor: "transparent", border : "0.5px solid green" , cursor: "pointer",
                  outline: "none", color: "green"}}>Submit</button>
          </div>
        </form>
      </Modal>
        <span style={{cursor: "pointer", color: "red"}} className='delete-css' onClick={() => onClickDelete(id)}>Delete</span>
      </div>
  </li>
}


function Home() {
  const [allTodos, setAllTodos] = useState([])
  const[inputText, setInputText] = useState("")
  const[error, setError] = useState("")
 
  

  

  


// RETRIEVE

  useEffect(() => {
     axios.get('http://127.0.0.1:8000/todos')
     .then((res) => setAllTodos(res.data))
     .catch((err) => console.log(err))
  }, [])




// create 

  const onClickAdd = (e) => {
    e.preventDefault()

    let data={title: inputText, status: false}
    setInputText("")

    axios.post("http://127.0.0.1:8000/todos", data)
    .then((res) => [
      setAllTodos([...allTodos, res.data])
    ])
    .catch((err) => {
      setAllTodos([...allTodos])
      setError(err.message)
    })
  }


  // DELETE 

  const onClickDelete = (id) => {
    const newTodoList = allTodos.filter((each) => each.id !== id)
    axios.delete("http://127.0.0.1:8000/todos/" + id)
    .then((res) => setAllTodos(newTodoList))
    .catch((err) => {
        setError(err.message)
        setAllTodos([...allTodos])
    })
  }



  // Update 
      const updateTodoItem = (id, updatedTitle, updatedStatus) => {
        let data = {title:updatedTitle, status:updatedStatus}
        
        axios.put("http://127.0.0.1:8000/todos/" + id, data)
        .then((res) => {
          const updatedAllTods = allTodos.map(each => {
            if (each.id === id) {
              return {
                id,
                ...data
              }
            }else {
              return each
            }
          })
          return setAllTodos(updatedAllTods)
        })
        .catch((err) => console.log(err))
        window.location.reload()
      }
      



  return <div className='mainContainer'>
      <h1>Todo Application</h1>
      
      <form name='myForm' onSubmit={onClickAdd}>
          <div>
            <input type="text" value={inputText} className="todotext" placeholder='Enter Todo' onChange={(e) => setInputText(e.target.value)}/>
            <button type='submit' className='add-btn'>Add</button>
          </div>
      </form>
      {error && <p>{error}</p>}
      <ul className='allTodosList'>
        {
          allTodos.map((eachTodo) => <TodoDisplay eachTodo={eachTodo} key={eachTodo.id} onClickDelete={onClickDelete} updateTodoItem={updateTodoItem}/>)
        }
      </ul>
  </div>
}

export default Home

