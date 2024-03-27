import * as React from 'react' 
import { useState } from "react";
import styles from "../UpLoadButton/UpLoadButton.module.css"



export function UpLoadButton() {
  const [files, setFiles] = useState<File[]>([]);
  const [urls, setUrl] = useState<string[]>([]);
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles: File[] = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };


  const showUrl = () => {
    const urlList:string[]=[]
    for (let i = 0; i < files.length; i++) {
      const nowUrl = URL.createObjectURL(files[i]);
      urlList.push(nowUrl)
    }
    console.log(urlList)
  
  };


    return(
    <div className={styles.UpLoadButton}>
      <input  onChange={(e)=>handleFilesChange(e)} type={"file"} multiple></input>
      <button onClick={()=>console.log(files)}>"뿅"</button>
      <button onClick={showUrl}>"뺨"</button>
    </div>)
  }
  