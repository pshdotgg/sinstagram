import { useState } from 'react'
import { storage } from '../firebase'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

const handleImageUpload = async (image) => {
  const storageRef = ref(storage, `images/${image.name}`)
  await uploadBytes(storageRef, image)
  return await getDownloadURL(storageRef)
}

export default handleImageUpload
