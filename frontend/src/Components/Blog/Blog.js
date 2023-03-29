import { useState,useEffect } from 'react';
import DatePicker from 'react-datepicker'
import * as MdIcons from 'react-icons/md'
import * as GiIcons from 'react-icons/gi'
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"
import '../App/App.css'
import {useNavigate} from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser'


function Blog() {




  //Hooks
  const [creator_name, setcreator_name] = useState()
  const [title, settitle] = useState()
  const [content,setcontent] = useState('')
  const [created_at,setdate] = useState(new Date())
  const [updated_at, setupdated_at] = useState(new Date())

  const [blogs, setblogs] = useState([])
  const [blogId, setblogId] = useState()


  const token = localStorage.getItem('token')

  const navigate = useNavigate()


  const [modalVisibility,setmodalVisibility] = useState(false)

  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "link"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"]
  ];


  useEffect(() => {

    getblogs()
  },[])


  //Functions
  const getblogs = async() => {
    await axios.get(`${process.env.REACT_APP_API_URL}/blogs/getAllBlogs`,{
        headers: {
            "x-access-token": token //the token is a variable which holds the token
          }
    })
    .then((res) => setblogs(res.data.data))
    .catch((err) => console.log(err)) 
  }

  const addBlog = async(e) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/blogs/createBlog`,{
        creator_name:creator_name,
        title:title,
        content:content,
        created_at:created_at,
        updated_at:updated_at
    },{
        headers: {
            "x-access-token": token //the token is a variable which holds the token
          }
    })
    .then(() => {
        getblogs()
        console.log("Blog Added Successfully")
    })
    .catch((err) => console.log(err))
  }

  const updateBlog = async(selectedblog) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/blogs/updateBlog/${selectedblog}`,{
      creator_name:creator_name,
      title:title,
      content:content,
      created_at:created_at,
      updated_at:updated_at
    },{
      headers: {
          "x-access-token": token //the token is a variable which holds the token
        }
  })
    .then(() => {
        getblogs()
        console.log("Blog Updated Successfully")
    })
    .catch((err) => console.log(err))
  }

  const deleteBlog = async(selectedblog) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/blogs/deleteBlog/${selectedblog}`,{
        headers: {
            "x-access-token": token //the token is a variable which holds the token
          }
    })
    .then(() => {
        getblogs()
        console.log("Blog deleted Successfully")})
    .catch((err) => console.log(err))
  }
  





  return (
    <div>
    {modalVisibility ?
      <div className="grid h-screen place-items-center fixed top-0 left-0 right-0 bg-black bg-opacity-80">
    <div className="bg-white p-10 border-8 rounded-xl border-neutral-300 shadow-2xl">
      <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Welcome to the Blog Application</h1>
      </div>

      <div>
        <form>
          <div className="relative mt-2 rounded-md shadow-sm">
            <label className="block text-sm font-medium leading-6 text-gray-900">Creator</label>
            <input type='text' value={creator_name} className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(text) => setcreator_name(text.target.value)}></input>
          </div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <label className="block text-sm font-medium leading-6 text-gray-900">Title</label>
            <input type='text' value={title} className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(text) => settitle(text.target.value)}></input>
          </div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <label className="block text-sm font-medium leading-6 text-gray-900">Content</label>
            {/* <ReactQuill type='text' value={content} className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(text) => setcontent(text.target.value)} /> */}
            <ReactQuill value={content} theme="snow" placeholder='Start writing...'
             modules={{
              toolbar: {
                container: TOOLBAR_OPTIONS
              }
            }} onChange={setcontent} />
          </div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <label className="block text-sm font-medium leading-6 text-gray-900">Date</label>
            <DatePicker selected={created_at} className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
            placeholder:italic placeholder:text-slate-400 place-items-center"
             onChange={created_at => setdate(created_at)} />
          </div>

          <div className="flex justify-end">
            <div>
              <button className="mt-8 ml-4 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"  onClick={() => setmodalVisibility(false)}>Cancel</button>
            </div>
            <div>
              <button className="mt-8 ml-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"  onClick={() => {
                blogId ? updateBlog(blogId) : addBlog()
              }}>{blogId ? <span>Update</span> : <span>Add</span>}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div> : <div></div> 
     }
     <div className="flex row">
        {blogs.map((item) => {
          return (
            <div className="mt-10 bg-white border-8 rounded-xl border-neutral-300 shadow-2xl p-10 ml-5 mr-5">
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">{item.title}</h1>
              </div>
              <div className="relative mt-2 rounded-md shadow-sm flex justify-around">
                <label className="block text-sm font-medium leading-6 text-gray-900">{item.creator_name}</label>
                <label className="block text-sm font-medium leading-6 text-gray-900">{item.created_at}</label>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{parse(item.content)}</dd>
              </div>
              <div className="flex justify-end">
                <div className="ml-4">
                  <button className="mt-8 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"  onClick={() => {
                    navigate(`/blogs/${item._id}`,{state: {id: item._id}})
                  }}>
                    <GiIcons.GiRead />
                  </button>
                </div>
                <div className="ml-4">
                  <button className="mt-8 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"  onClick={() => {
                    setcreator_name(item.creator_name)
                    settitle(item.title)
                    setcontent(item.content)
                    setblogId(item._id)
                    // setdate(item.created_at)
                    setupdated_at(Date.now())
                    setmodalVisibility(true)
                  }}>
                    <MdIcons.MdEdit />
                  </button>
                </div>
                <div className="ml-4">
                  <button className="mt-8 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"  onClick={() => deleteBlog(item._id)}>
                    <MdIcons.MdDelete />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
        <button className="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded
        bg-white border-8 rounded-xl border-neutral-300 shadow-2xl p-10 ml-5 mr-5 pt-10"  onClick={() => setmodalVisibility(true)}>
            <MdIcons.MdAdd />
        </button>
      </div>
    
    </div>
  );
}

export default Blog;


{/* <button 
              onClick={() => {
                  setcreator_name(item.creator_name)
                  settitle(item.title)
                  setcontent(item.content)
                  setdate(item.created_at)
                  setupdated_at(item.updated_at)
                  setselectedblog(item._id)

                }}>
              </button> */}
