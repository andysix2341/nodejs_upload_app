import { FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { UpdateUserData, getUserData } from "../handleApi"
import { GetUserDataWithoutId } from "../custom"

export default function EditPage() {
  const { user_id } = useParams()
  const navigate = useNavigate()
  const { data, status } = useQuery({
    queryKey: ["posts", user_id],
    queryFn: () => getUserData(user_id as string),
  })

  const { mutate, isError } = useMutation({
    mutationFn: UpdateUserData,
    onSuccess: data => {
      console.log(data)
      navigate('../data-page')
    },
    // the axios catch or error has to return axios error 
    onError: error => {
      console.error(error.message)
    }
  })
  
  
  const [formUserData, setFormUserData] = useState<GetUserDataWithoutId>({
    user_name: "",
    user_email: "",
    Bio: "",
    user_password: "",
    image_name:"",
  })

  const [newUserImage, setNewUserImage] = useState<File | null>()
  const [imagePreview, setImagePreview] = useState<string>()
  
  function updateUserName(newName: string) {
    setFormUserData(prev => {
        return {
          ...prev,
          user_name: newName
        }
      })
    }

    function updateUserEmail(newEmail: string) {
      setFormUserData(prev => {
          return {
            ...prev,
            user_email: newEmail
          }
      } )
    }

    function updateUserBio(newBio: string) {
      setFormUserData(prev => {
        return {
          ...prev,
          Bio: newBio
        }
      })
    }


    function handleSubmit(e: FormEvent) {
      e.preventDefault()
      const formData = new FormData()
      formData.append("user_name", formUserData.user_name)
      formData.append("user_email", formUserData.user_email)
      formData.append("Bio", formUserData.Bio)
      formData.append("user_password", formUserData.user_password)
      formData.append("image", newUserImage || "")
      mutate({ data: formData, param: user_id as string })
    }

    useEffect(() => {
      updateUserName(data?.user_name || "")
      updateUserEmail(data?.user_email || "")
      updateUserBio(data?.Bio || "")
    }, [data])

    useEffect(() => {
      if (newUserImage) {
        const objectUrl = URL.createObjectURL(newUserImage)
        setImagePreview(objectUrl)
      }
    }, [newUserImage])
  
  if (status === "pending") return <h2>Loading...</h2>
  if (status === 'error') return <h2>Data Not Found</h2>
  return (
    <form onSubmit={e => handleSubmit(e)}>
      Edit User { user_id }
      { isError && <div>Fetch data error</div>}
      <div>
        <label>User Name</label>
        <input type="text" value={formUserData.user_name} onChange={e => updateUserName(e.target.value)} required />
      </div>
      <div>
        <label>User Email</label>
        <input type="text" value={formUserData.user_email} onChange={e => updateUserEmail(e.target.value)} required />
      </div>
      <div>
        <label>User Bio</label>
        <textarea value={formUserData.Bio} onChange={e => updateUserBio(e.target.value)} />
      </div>
      <div>
        <label>Image</label>
        <input type="file" name="avatar" accept="image/*" onChange={e => setNewUserImage((e.target as HTMLInputElement).files?.[0] || null )} />
      </div>
      { newUserImage == null ? <img className="register-avatar-preview" src={`/uploads/${data.image_name}`} /> : <img className="register-avatar-preview" src={imagePreview} alt="img" /> }
      <button type="submit">Submit Changes</button>
    </form>
  )
}
