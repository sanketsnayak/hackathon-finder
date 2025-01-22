"use client"
import LoginComponent from "@/components/loginComponent"
import { signIn } from "next-auth/react"
 
export default function SignIn() {
  return (
    <>
      <LoginComponent />
    </>
  )
}