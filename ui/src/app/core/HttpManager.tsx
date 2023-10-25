import React, { PropsWithChildren } from 'react'
import axios from 'axios'

interface DefaultResponse<T> {
  data: T
}

export interface HttpContextType {
  get<T>(...params: any): Promise<DefaultResponse<T>>
  post<T>(...params: any): Promise<DefaultResponse<T>>
}

export const HttpContext = React.createContext({} as HttpContextType)

export const HttpManager = ({ children }: PropsWithChildren) => {
  return (
    <HttpContext.Provider
      value={{
        get: axios.get,
        post: axios.post,
      }}
    >
      {children}
    </HttpContext.Provider>
  )
}
