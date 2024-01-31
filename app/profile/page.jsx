"use client"

import { useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@/components/Profile'

const MyProfile = () => {

  const router = useRouter();
  const {data : session} = useSession();
  const [prompts, setPrompts] = useState([]);

  const fetchPrompts = async () => {
    const response = await fetch(`api/users/${session?.user.id}/prompts`)
    const data = await response.json()
    setPrompts(data)
  }

  useEffect(() => {
    if(session?.user.id) fetchPrompts()
  }, [])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = prompts.filter((item) => item._id !== post._id);

        setPrompts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile 
      name="My"
      description="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      data={prompts}
    />
  )
}

export default MyProfile