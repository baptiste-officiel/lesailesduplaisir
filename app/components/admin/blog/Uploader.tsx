'use client';
 
import * as React from 'react';
import { useEdgeStore } from '@/app/provider/edgestore';
import { useState } from 'react'
import Image from 'next/image';
import { EdgeStoreApiClientError } from '@edgestore/react/shared';
 
export default function Uploader({handleUploadImage, image}: any) {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();

  const [progressBar, setProgressBar] = useState<number>(0)
  console.log("🚀 ~ Uploader ~ progressBar:", progressBar)

  const handleUpload = async () => {
    try {
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            // you can use this to show a progress bar
            setProgressBar(progress)
          },
        });
        // you can run some server action or api here
        // to add the necessary data to your database
        console.log(res);
        handleUploadImage(res.url)
      }
    } catch (error) {
      if (error instanceof EdgeStoreApiClientError) {
        // if it fails due to the `accept` set in the router config
        if (error.data.code === 'MIME_TYPE_NOT_ALLOWED') {
          alert(
            `Format d'image non autorisé. Les formats autorisés sont ${error.data.details.allowedMimeTypes.join(
              ', ',
            )}`,
          );
        }
        // if it fails during the `beforeUpload` check
        if (error.data.code === 'UPLOAD_NOT_ALLOWED') {
          alert("You don't have permission to upload files here.");
        }
      }

      
    }
  }
 
  return (
    <div className='flex justify-between flex-wrap items-center w-full  border-2 border-black p-2 rounded-lg'>
      <div className='w-full flex justify-around'>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
        <button
          onClick={handleUpload}
          className='bg-black text-white px-4 py-1 rounded-lg'
        >
          Ajouter
        </button>
      </div>
      {progressBar > 0 && progressBar < 100 &&
        <div className=' w-full h-6 border-2 border-black relative rounded-xl my-4 transition duration-100'>
          <div className={`absolute h-full bg-black rounded-xl transition-all duration-300 border-2 border-white`} style={{width: progressBar+'%'}}></div>
        </div>
      }
      {image && 
        <Image src={image} alt={image} width={500} height={500} className='w-full max-w-[400px] mx-auto my-12' />
      }
    </div>
  );
}