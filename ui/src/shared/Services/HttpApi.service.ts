import axios from 'axios'
import { env } from '../../config/env'
import { auth } from 'src/config/firebase.config'

const apiBaseUrl = env.app.apiBaseUrl
const currentToken = auth.currentUser?.getIdToken()

const Get = async (uri: string) => {
  return await axios.get(`${apiBaseUrl}${uri}`, {
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${await currentToken}`
    }
  })
}

const Post = async (uri: string, data: any) => {
  return await axios.post(`${apiBaseUrl}${uri}`, data, {
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${await currentToken}`
    }
  })
}

const PostFormData = async (formData: FormData, uri: string) => {
  return await axios.post(`${apiBaseUrl}${uri}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
      // Authorization: `Bearer ${await currentToken}`
    }
  })
}

const Patch = (uri: string, data: any) => {
  return axios.patch(`${apiBaseUrl}${uri}`, data, {
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${await currentToken}`
    }
  })
}

const Delete = (uri: string, id: string) => {
  return axios.delete(`${apiBaseUrl}${uri}/${id}`, {
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Bearer ${await currentToken}`
    }
  })
}

export const HttpApiService = { Get, Patch, Delete, Post, PostFormData }
