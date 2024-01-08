'use client'

import { CldUploadWidget } from 'next-cloudinary'
import React, { useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb';
import  Image  from 'next/image';

declare global{
    var cloudinary:any
}

interface ImageUploadProps{
    onChange: (value:string) => void;
    value:string;
}

const imageSrc = 'https://res.cloudinary.com/dimgzszl2/image/upload/v1704365223/frontend_meetup1-1024x576_pviihv.jpg';

const ImageUpload:React.FC<ImageUploadProps> = ({
    onChange, value
}) => {
    const handleUpload = useCallback((result:any) =>{
        onChange(result.info.secure_url);
    }, [onChange])

    console.log(value);
  return (
    <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="dcwpp8an"
        options={{
            maxFiles: 1
        }}
        >
        {
            ({open}) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="relative cursor-pointer 
                        hover:opacity-70 transition border-2 p-20 border-neutral-300 flex flex-col justify-center
                        items-center gap-4 text-neutral-600"
                    >
                        <TbPhotoPlus size={50}/>
                        <div className="font-semibold text-lg">
                            Click to Upload
                        </div>
                        {
                            value && (
                                <div className="absolute inset-0 w-full h-full">
                                    <Image 
                                    fill
                                    style={{objectFit: 'cover'}}
                                    src={value}
                                    alt="House"
                                    />
                                </div>
                            )
                        }
                    </div>
                )
            }
        }
    </CldUploadWidget>
  )
}

export default ImageUpload