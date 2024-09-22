import { useState, useEffect } from "react"
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import { createTicket, reset } from "../features/tickets/ticketSlice"
import { useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket() {
  const user = useSelector((state) => state.auth.user)
  const [Type,setType] = useState('Hardware')
  const [description,setDescription] = useState('')
  const [title,setTitle] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {isLoading, isError, isSuccess, message} = useSelector((state)=> state.ticket)



  useEffect(()=>{
    if(isError){
      toast.error(message)
      console.log(message)
    }

    // redirect when logged in
    if(isSuccess){
      console.log('Success')
      dispatch(reset())
      navigate('/tickets')
   }

   dispatch(reset())


 },[isSuccess, isError, message, dispatch, navigate])

  const onSubmit = (e)=>{
    e.preventDefault()
    dispatch(createTicket({Type, description}))
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className="section heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name"> Name</label>
          <input type="text" className='form-control' name="name" id="name" value={user.name} disabled/>
        </div>
        <div className="form-group">
          <label htmlFor="name"> Email</label>
          <input type="text" className='form-control' name="email" id="name" value={user.email} disabled/>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="Type">Type</label>
            <select name="Type" id="Type" value={Type} onChange={(e)=> setType(e.target.value)}>
              <option value='Hardware'>Hardware</option>
              
              <option value='Software'>Software</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title of the issue</label>
            <input type="text" name="title" id="title" className="form-control" placeholder="title" value={title} onChange={(e)=> setTitle(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="description">Desciption of the issue</label>
            <textarea name="description" id="description" className="form-control" placeholder="Description" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket