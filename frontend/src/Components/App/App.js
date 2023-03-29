import React from "react";
import {Route, Routes} from 'react-router-dom'
import Login from "../Login/Login";
import Blog from "../Blog/Blog";
import UserBlog from "../UserBlog/UserBlog";



function App() {
  return (
    <div>
    <Routes>
      <Route path = "/" element={<Login />} />
      <Route path = "/blogs" element={<Blog />} />
      <Route path = "/blogs/:id" element={<UserBlog />}/>
    </Routes>
    </div>
  )

}
  

export default App;


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
