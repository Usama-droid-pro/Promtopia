"use client"

import{useState , useEffect} from 'react';
import PromptCard from '../components/PromptCard';
const PromptCardList = ({data , handleTagClick}) =>{
  console.log("Data is " , data)
  return(
    <div className='mt-16  prompt_layout'>
        {data.map((post)=>{
          console.log(post.prompt);
          return(         
            <PromptCard 
              key = {post._id}
              post= {post}
              handleTagClick={handleTagClick}
          />
          )
          
        })}
    </div>
  )
}

import React from 'react'

const Feed = () => {
  const [searchText,setSearchText] = useState('');
  const [posts , setPosts] = useState([]);
  const [allPosts , setAllPosts] = useState([]);
  
  const handleSearchChange = (e)=>{
      setSearchText(e.target.value);
      console.log("invoked")
      console.log(e.target.value);
     
      
        let filteredPosts = allPosts.filter((p) => p.tag.toLowerCase().includes(e.target.value.toLowerCase()));
        setPosts(filteredPosts);
      
  }
  
  useEffect(()=>{
    const fetchPosts = async()=>{
      console.log("heelwrwerwerwerwerwerwero")

      const response = await fetch('/api/prompt');
      const data = await response.json();
      console.log("this is useEffetc data" , data);
      setPosts(data);
      setAllPosts(data);
    }
    fetchPosts();
  } , [])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type = 'text' 
          placeholder='Search For a Tag or Category'
          value = {searchText}
          onChange={handleSearchChange}
          required={true}
          className='search_input peer'

          />
      </form>
      <PromptCardList 
      data =  {posts}
      handleTagClick = {()=>{

      }}
      
      />
    </section>
  )
}

export default Feed
