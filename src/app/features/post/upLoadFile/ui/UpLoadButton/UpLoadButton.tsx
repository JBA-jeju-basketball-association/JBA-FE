import * as React from 'react' 
import { useState } from "react";
import styles from "../UpLoadButton/UpLoadButton.module.css"
import axios from 'axios';



export function UpLoadButton() {
  //전송될 파일들을 저장합니다.
  const [files, setFiles] = useState<File[]>([]);
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles: File[] = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

// axios가 확인되면 이후 따로 관리할 예정입니다.
  const  showUrl = async() => {
    const formData = new FormData();
    const urlList:string[]=[]
    for (let i = 0; i < files.length; i++) {
      const nowUrl = URL.createObjectURL(files[i]);
      formData.append('uploadFiles', files[i]);
      urlList.push(nowUrl)
    }
    console.log(typeof formData)
   try{
    const response = await axios.post('http://localhost:8080/multipart-files?type=small', formData);
    console.log('Response:', response.data);}catch (error) {
      // 오류가 발생한 경우 콘솔에 오류 메시지를 출력합니다.
      console.error('Error fetching users:', error);
    }
  

  
  };


    return(
    <div className={styles.UpLoadButton}>
      <label htmlFor="upload_file">파일 등록</label>
      <input id="upload_file" onChange={(e)=>handleFilesChange(e)} type={"file"} multiple></input>
      {/* 테스트를 위한 버튼들 입니다. */}
      <button onClick={()=>console.log(files)}>"뿅"</button>
      <button onClick={showUrl}>"뺨"</button>
    </div>)
  }
  