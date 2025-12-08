'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Mock authentication actions

export async function loginAction() {
  // In a real app, you'd validate credentials against a database
  cookies().set('auth-token', 'mock-user-token', { 
    httpOnly: true, 
    path: '/',
    maxAge: 60 * 60 * 24 // 1 day
  })
  redirect('/app')
}

export async function signupAction() {
  // In a real app, you'd create a new user in the database
  cookies().set('auth-token', 'mock-user-token', { 
    httpOnly: true, 
    path: '/',
    maxAge: 60 * 60 * 24 // 1 day
  })
  redirect('/app')
}


export async function logoutAction() {
  cookies().delete('auth-token')
  redirect('/')
}
