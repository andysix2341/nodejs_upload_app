export type UserData = {
    id: string
    user_name: string,
    user_email: string,
    Bio: string,
    image_name: string,
}

export type GetUserDataWithoutId = {
    user_name: string,
    user_email: string,
    user_password: string,
    Bio: string,
    image_name: string,
}

export type UploadError = {
    data: string
}

export type GetUsersData = {
    user_id: string,
    user_name: string,
    user_email: string,
    Bio: string,
    image_name: string
}

export type GetUserData = {
    user_id: string,
    user_name: string,
    user_email: string,
    user_password: string
    Bio: string,
}

export type GetAllUserData = {
    user_id: string,
    user_name: string,
    user_password: string,
    user_email: string,
    Bio: string | null,
    image_name: string | null,
}