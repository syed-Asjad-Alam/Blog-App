import { useState,useEffect } from 'react';
import axios from "axios"
import './App.css';

function App() {


  //Hooks
  const [creator_name, setcreator_name] = useState()
  const [title, settitle] = useState()
  const [content,setcontent] = useState()
  const [date,setdate] = useState()
  const [updated_at, setupdated_at] = useState()

  const [blogs, setblogs] = useState([])

  const [selectedblog, setselectedblog] = useState()


  useEffect(() => {
    getblogs()
  },[])


  //Functions
  const getblogs = async() => {
    await axios.get(`http://localhost:5000/getAllBlogs`)
    .then((res) => setblogs(res.data.data))
    .catch((err) => console.log(err)) 
  }

  const addBlog = async() => {
    await axios.post(`http://localhost:5000/createBlog`,{
        creator_name:creator_name,
        title:title,
        content:content,
        date:date,
        updated_at:updated_at
    })
    .then(() => {
        getblogs()
        console.log("Blog Added Successfully")
    })
    .catch((err) => console.log(err))
  }

  const updateBlog = async() => {
    await axios.put(`http://localhost:5000/updateBlog/${selectedblog}`,{
      creator_name:creator_name,
      title:title,
      content:content,
      date:date,
      updated_at:Date.now()
    })
    .then(() => {
        getblogs()
        console.log("Blog Updated Successfully")
    })
    .catch((err) => console.log(err))
  }

  const deleteBlog = async() => {
    await axios.delete(`http://localhost:5000/deleteBlog/${selectedblog}`)
    .then(() => {
        getblogs()
        console.log("Blog deleted Successfully")})
    .catch((err) => console.log(err))
  }





  return (
    <div className='Main'>
    <div>
      <div className="heading">
          <h1> Welcome to the Blog Application</h1>
      </div>

      <div>
        <form>
          <div className='innerMain'>
            <label>Creator</label>
            <input type='text' value={creator_name} 
            onChange={(text) => setcreator_name(text.target.value)}></input>
          </div>
          <div className='innerMain'>
            <label>Title</label>
            <input type='text' value={title} 
            onChange={(text) => settitle(text.target.value)}></input>
          </div>
          <div className='innerMain'>
            <label>Content</label>
            <textarea type='text' value={content} 
            onChange={(text) => setcontent(text.target.value)}></textarea>
          </div>
          <div className='innerMain'>
            <label>Date</label>
            <input type='date' value={date} 
            onChange={(text) => setdate(text.target.value)}></input>
          </div>

          <div className="buttons">
            <div>
              <button className="add" onClick={addBlog}>Add Blog</button>
            </div>
            <div>
              <button className="update" onClick={updateBlog}>Update Blog</button>
            </div>
            <div>
              <button className="delete" onClick={deleteBlog}>Delete Blog</button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {blogs.map((item,index) => {
          return (
            <div>
              <button className={selectedblog === item._id ? "light" : "default"}
              onClick={() => {
                  setcreator_name(item.creator_name)
                  settitle(item.title)
                  setcontent(item.content)
                  setdate(item.date)
                  setupdated_at(item.updated_at)
                  setselectedblog(item._id)

                }}>
                <li key={index}>{item.creator_name} {item.title} {item.date} {item.updated_at}</li>
                <p>{item.content}</p>
              </button>
            </div>
          )
        })}
      </div>
    </div>
    </div>
  );
}

export default App;
