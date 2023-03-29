import { useState,useEffect } from 'react';
import axios from "axios"
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser'
import * as BsIcons from 'react-icons/bs'
import * as MdIcons from 'react-icons/md'
import * as AiIcons from 'react-icons/ai'




function UserBlog () {

    const params = useParams()
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')
    const blog_id = params.id

    

    const [title,settitle] = useState()
    const [creator, setcreator] = useState()
    const [content, setcontent] = useState('')
    const [comments, setcomments] = useState([])

    const [comment, setcomment] = useState()

    const [isCommentSelected, setisCommentSelected] = useState()

    useEffect(() => {
        getBlog()
    },[])

    const getBlog = async() => {
        axios.get(`${process.env.REACT_APP_API_URL}/blogs/getBlog/${blog_id}`,{
            headers: {
                "x-access-token": token //the token is a variable which holds the token
              }
        })
        .then((res) => {
            console.log(res.data.data.Comment)
            settitle(res.data.data.title)
            setcreator(res.data.data.creator_name)
            setcontent(res.data.data.content)
            setcomments(res.data.data.Comment)
        })
        .catch((err) => console.log(err))
    }

    const postComment = async() => {
        axios.post(`${process.env.REACT_APP_API_URL}/comments/postComment`,{
            refOfBlog:blog_id,
            refOfUser:user_id,
            comment:comment

        })
        .then(() => {
            getBlog()
            console.log("Comment added succesfully")
            setcomment('')
        })
        .catch((err) => console.log(err))
    }

    const deleteComment = async(comment_id) => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/comments/deleteComment/${comment_id}`)
        .then(() => {
            getBlog()
            console.log("Comment deleted Successfully")})
        .catch((err) => console.log(err))
      }

      const editComment = async(comment_id) => {
        await axios.put(`${process.env.REACT_APP_API_URL}/comments/updateComment/${comment_id}`,{
          comment: comment
        })
        .then(() => {
            setisCommentSelected(false)
            getBlog()
            console.log("Comment Updated Successfully")
            setcomment('')
        })
        .catch((err) => console.log(err))
      }
      


    return (
        <div className="max-w-xl mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <h2 className="text-lg font-medium text-gray-700 mb-4">By {creator}</h2>
              <p className="text-gray-800">{parse(content)}</p>

              <hr className="my-8" />

                <h3 className="text-xl font-medium mb-4">Comments:</h3>
                {comments.map((comment) =>  {
                    return (
                    <div key={comment._id} className="bg-gray-100 p-4 mb-4 rounded-lg">
                        <div className="flex justify-between">
                            <div className="ml-4">
                                <p className="text-gray-800">{comment.comment}</p>
                            </div>
                            <div className="flex justify-end">
                                <div>
                                    <button className="text-blue-700 font-semibold hover:text-blue-500 py-2 px-1 rounded"
                                    onClick={() => {
                                        setcomment(comment.comment)
                                        setisCommentSelected(comment._id)}}>
                                        <MdIcons.MdEdit />
                                    </button>
                                </div>
                                <div>
                                    <button className="text-red-700 font-semibold hover:text-red-500 py-2 px-1 rounded"
                                    onClick={() => deleteComment(comment._id)}>
                                        <MdIcons.MdDelete />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <h4 className="text-sm font-medium mt-2">By {comment.refOfUser.firstName + " " + comment.refOfUser.lastName}</h4>
                    </div>
                ) })}
                <div className="bg-gray-100 p-4 mb-4 rounded-lg relative">
                    <input type='text' value={comment} placeholder="Comment..." className="block w-full rounded-3xl border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(text) => setcomment(text.target.value)} />
                    <div className="absolute -top-4 right-3">
                        <button className="mt-8 bg-transparent text-blue-700 hover:text-blue-500 text-lg font-bold py-2 px-4 rounded"
                         onClick={() => {
                            isCommentSelected ? 
                            editComment(isCommentSelected) :
                            postComment()}}>
                            {isCommentSelected ? <AiIcons.AiFillEdit /> :<BsIcons.BsFillArrowRightCircleFill />}
                            </button>
                    </div>
                </div>
                
        </div>
    )

}

export default UserBlog

