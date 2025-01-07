'use client'
import { CldUploadButton } from 'next-cloudinary'
import Image from 'next/image'

interface ImageUploadProps {
  img_src?: string
  onChange: (src: string) => void
}

interface CloudinaryUploadResponse {
  info: {
    secure_url: string
  }
}

export const ImageUpload = ({ onChange, img_src }: ImageUploadProps) => {
  return (
    <CldUploadButton
      className="w-full h-full"
      uploadPreset="sidssite"
    
      options={{
        maxFiles: 1,
        cropping: true,
        croppingAspectRatio: 16 / 9,
        croppingCoordinatesMode: 'custom',
        croppingDefaultSelectionRatio: 16 / 9,
        croppingShowDimensions: true,
        croppingValidateDimensions: true,
        multiple: false,
      }}
      onDisplayChangedAction={console.log} onDisplayChanged={console.warn}
      onSuccess={(value: unknown) => {
        const response = value as CloudinaryUploadResponse
        console.log(response)
        onChange(response.info.secure_url)
      }}
    >
      <div className="border-2 border-dashed border-primary/50 rounded-lg p-4 hover:bg-primary/5 transition-colors duration-200 ease-in-out">
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <Image
            src={img_src || '/placeholder.png'}
            height={120}
            width={120}
            alt="Upload preview"
            className="rounded-md object-cover"
          />
          <div className="text-center">
            <h1 className="text-sm font-medium text-primary">
              {img_src ? 'Change Image' : 'Upload Image'}
            </h1>
            <p className="text-xs text-primary/70 mt-1">
              Upload Your Image
            </p>
          </div>
        </div>
      </div>
    </CldUploadButton>
  )
}