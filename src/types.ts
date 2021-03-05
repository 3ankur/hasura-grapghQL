
export type BookType={
    bookId: string,
    title: string,
    description: string,
    price: string,
    imgUrl:string,
    author: string
    isbn: string,
    pages: string,
}

export type ActionPayload = {
    type: string,
    payload: any 
}

export type BookCartAction ={
    readonly type: string,
    payload: any 
}
