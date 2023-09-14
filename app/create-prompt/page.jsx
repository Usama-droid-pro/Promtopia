"use client"
import {useState} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import Form from '../../components/Form';

import React from 'react'

const CreatePrompt = () => {
    const [submitting , setSubmitting] = useState(false);
    const router = useRouter()
    const {data : session} = useSession();
    const [post , setPost] = useState({
        prompt : "",
        tag : ""
    });

    const createPrompt = async(e) => {
        e.preventDefault();
        setSubmitting(true);
        try{
            console.log(post)
            console.log(session.user.id)
            const response = await fetch('/api/prompt/new' , {
                method : 'POST',
                body: JSON.stringify({
                    prompt : post.prompt , 
                    tag : post.tag,
                    user_id : session?.user?.id
                })
            });

            console.log(response)

            if(response.ok){
                router.push('/')
            }
        }
        catch(err){
            console.log("Error Occurred")
            console.log(err);
        }
        finally {
            setSubmitting(false);
        }
    }


  return (
    <Form
        type = "Create"
        post = {post} 
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {createPrompt}
    />
  )
}

export default CreatePrompt
