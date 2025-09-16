import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const { docs: posts } = await payload.find({ collection: 'posts' })

  return (
    <div>
      {user && <h1>Welcome back, {user.email}</h1>}

      {posts.length > 0 ? <h1>Posts</h1> : <h1>No posts</h1>}
      {posts?.map(post => <div key={post.id}>
        <h2>{post.title}</h2>
        <RichText data={post.content} />
        <Image src={post.layout?.[0].image?.url} alt={post.layout?.[0].image?.alt} width={500} height={500} />
      </div>)}
    </div>
  )
}
