type createUserPayload = {
    email: string,
    password: string,
    userName: string,
    phoneNumber: string,
    matricNumber: string,
    level: string,
    department: string,
    faculaty: string,
}

type loginUserpayload = {
    email: string,
    password: string,
}

type signedInUser = {
    id: string,
    email: string,
    userName: string,
    matricNumber: string,
    phoneNumber: string,
    level: string,
    department: string,
    faculaty: string,
    role
}