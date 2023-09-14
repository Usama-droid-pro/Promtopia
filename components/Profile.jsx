"use client"
import React from 'react'
import PromptCard from '@components/PromptCard'
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <div>
      <section className='w-full'>
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{name} Profile</span>
        </h1>
        <p className='desc text-left'>{desc}</p>

          <div className='mt-10 prompt_layout'>
            {data.map((post) => {
              console.log(post.prompt);
              return (
                <PromptCard
                  key={post._id}
                  post={post}
                  handleEdit={()=> handleEdit && handleEdit(post)}
                  handleDelete={()=> handleEdit && handleDelete(post)}
                />
              )

            })}
        </div>
      </section>
    </div>
  )
}

export default Profile
