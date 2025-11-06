// lib/readTracker.js
import { supabase } from './supabaseClient'

export async function incrementReadCount(postId: string) {
  try {
    // Get current read count
    const { data: post } = await supabase
      .from('posts')
      .select('read_count')
      .eq('id', postId)
      .single()

    if (post) {
      // Increment read count
      await supabase
        .from('posts')
        .update({ read_count: (post.read_count || 0) + 1 })
        .eq('id', postId)
    }
  } catch (error) {
    console.error('Error incrementing read count:', error)
  }
}