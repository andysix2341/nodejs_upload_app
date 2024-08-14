export type UserData = {
    user_id: string,
    user_name: string,
    user_password: string,
    user_email: string,
    Bio: string | null,
    image_name: string | null,
}

export type GetUserDataWithoutId = {
    user_name: string,
    user_password: string,
    user_email: string,
    Bio: string,
    image_name: string,
}

export type SendUserData = {
    user_id: string,
    user_name: string,
    user_email: string,
    Bio: string,
}

export type UpdateUserData = {
    user_name: string,
    user_email: string,
    Bio: string,
    user_password: string,
    image_name: string
}