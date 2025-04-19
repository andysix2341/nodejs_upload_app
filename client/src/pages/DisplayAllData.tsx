import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteUserData, getUsersData } from "../handleApi"
import { Link, useNavigate } from "react-router-dom"
import { MouseEvent } from "react"

export default function DisplayAllData() {
  const { data, status } = useQuery({
    queryKey: ["posts"],
    queryFn: getUsersData,
  })

  const navigate = useNavigate()
  
  const { mutate } = useMutation({
    mutationFn: deleteUserData,
    onSuccess: data => {
      console.log(data)
      navigate('../data-page')
    }
  })

  function handleDeleteUserData(e: MouseEvent, user_id: string) {
    e.preventDefault()
    console.log(user_id)
    mutate(user_id)
  }

  if (status === "error") return <div>Something went wrong</div>
  if (status === "pending") return <div>Loading...</div>
  return (
    <>
      <Link to={`/register-page`} >go to register page</Link>
      {
        <table style={ data.length === 0 ? {display:"none"} : {} }>
          <thead>
            <tr>
              <th>User id</th>
              <th>User name</th>
              <th>User Email</th>
              <th>User Bio</th>
              <th>Image</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(user => (
                <tr key={user.user_id}>
                  <td>{user.user_id}</td>
                  <td>{user.user_email}</td>
                  <td>{user.user_name}</td>
                  <td>{user.Bio}</td>
                  <td><img src={`/uploads/${user.image_name}`} alt="image" width="100%" height="250" /></td>
                  <td>
                    <Link to={`/data-page/${user.user_id}`} className="edit">Edit</Link>
                    <button className="delete" onClick={e => handleDeleteUserData(e, user.user_id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      }
    </>
  )
}
