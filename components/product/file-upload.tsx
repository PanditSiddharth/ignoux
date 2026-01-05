'use client'

import { useEffect, useState } from 'react'
import { CldUploadButton } from 'next-cloudinary'
import { FileIcon } from 'lucide-react'

interface FileUploadProps {
  onChange: (src: string) => void,
  value?: string, // initial value for the input field
}

interface CloudinaryUploadResponse {
  info: {
    secure_url: string
    original_filename: string
  }
}

export const FileUpload = ({ onChange, value }: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>("test.png")
  useEffect(() => {
    onChange(value || "test.png")
    // eslint-disable-next-line 
  }, [])

  return (
    <CldUploadButton
      className="w-full"
      uploadPreset="sidssite"
      options={{ maxFiles: 1,  resourceType: "raw" }}
      onSuccess={(value: unknown) => {
        const response = value as CloudinaryUploadResponse
        onChange(response.info.secure_url)
        setFileName(response.info.original_filename || "test.png")
      }}
      
    >
      <div className="border-2 border-dashed border-primary/50 rounded-lg p-4 hover:bg-primary/5 transition-colors duration-200 ease-in-out">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 bg-primary/10 rounded-md flex items-center justify-center">
            <FileIcon className="w-10 h-10 text-primary/50" />
          </div>
          <div className="text-center">
            <h1 className="text-sm font-medium text-primary">
              {fileName ? 'Change File' : 'Upload File'}
            </h1>
            {fileName && (
              <p className="text-xs text-primary/70 mt-1 max-w-[200px] truncate">
                {fileName}
              </p>
            )}
            {!fileName && (
              <p className="text-xs text-primary/70 mt-1">
                Upload Your File
              </p>
            )}
          </div>
        </div>
      </div>
    </CldUploadButton>
  )
}