"use client"
import React from 'react'
import {useState , useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {useSession} from 'next-auth/react'
import Profile from '@components/Profile'


const MyProfile = () => {
    const {data : session} = useSession()
    const [posts , setPosts] = useState([])
    const router = useRouter();
    const [user_id , setUser_id] = useState("");
    useEffect(()=>{
      console.log(session)
        const fetchPosts = async()=>{
          const response = await fetch(`/api/users/${session.user.id}/posts`);
          const data = await response.json();
          console.log("this is useEffetc data" , data);
          setPosts(data);
        }
        if(session?.user?.id){
          
            fetchPosts();
        }
       
      } , [session])

    const handleDelete = async(post)=>{
        const hasConfirmed = confirm("Are you sure you want to delete");

        if(hasConfirmed){
          try{
            const response = await fetch(`/api/prompt/${post._id}` , {
              method : 'DELETE',
            });

            let filteredPosts ;
            if(response.ok){
              filteredPosts = posts.filter((p)=>p.id !== posts.id);
            }
            setPosts(filteredPosts);

          } 
          catch(err){
             console.log(err);
          }
        }

      }
    const handleEdit =async (post)=>{
      router.push(`/update-prompt?id=${post._id}`)

    }
  return (
   <Profile 
        name = "My"
        desc = 'Welcome to your personalized profile page'
        data = {posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
   />
  )
}

export default MyProfile
