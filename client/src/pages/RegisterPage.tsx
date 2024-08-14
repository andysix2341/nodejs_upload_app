import { FormEvent, useRef, useState, useEffect } from "react"
import { postUserData } from "../handleApi"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const bioRef = useRef<HTMLTextAreaElement>(null)
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>()
  const navigate = useNavigate()

  const { isError, isPending, mutate } = useMutation({
    mutationFn: postUserData,
    onSuccess: data => {
      console.log(data)
      setAvatar(null)
      setAvatarPreview("")
      navigate(`/data-page/${data.id}`)
    },
    onError: data => {
      console.error(data)
    }
  })


  useEffect(() => {
    if (avatar) {
      const objectUrl = URL.createObjectURL(avatar)
      setAvatarPreview(objectUrl)
    }

  }, [avatar])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("user_name", nameRef.current?.value as string)
    formData.append("user_email", emailRef.current?.value as string)
    formData.append("user_password", passwordRef.current?.value as string)
    formData.append("Bio", bioRef.current?.value as string)
    formData.append("image_profile_path", avatar!)

    const objectUrl = URL.createObjectURL(avatar!)
    console.log(objectUrl)
    mutate(formData)
  }

  if (isPending) return <div>...Loading</div>
  return (
    <form onSubmit={e => handleSubmit(e)}>
      { isError && "Something went wrong" }
      <h1>Register</h1>
      <div className="Name">
        <label>Name</label>
        <input type="text" name="name" ref={nameRef} required />
      </div>
      <div className="email">
        <label>Email</label>
        <input type="email" name="email" ref={emailRef} required />
      </div>
      <div className="password">
        <label>Password</label>
        <input type="password" name="password" ref={passwordRef} required />
      </div>
      <div className="bio">
        <label>Bio</label>
        <textarea name="bio" id="bio" ref={bioRef} />
      </div>
      <div className="image">
        <label>Insert Image</label>
        <input type="file" name="avatar" accept="image/*" onChange={e => setAvatar((e.target as HTMLInputElement).files?.[0] || null)} required />
      </div>
      { avatarPreview && <img className="register-avatar-preview" src={avatarPreview} /> } <br />
      <button type="submit">Submit</button>
    </form>
  )
}
