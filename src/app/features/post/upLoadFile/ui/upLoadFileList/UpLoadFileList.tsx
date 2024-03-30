import * as React from 'react' 
import style from "./UpLoadFileList.module.css"
import {SelectedFile} from "./selectedFile/selectedFile";

let testFiles=[{"name":"주연"},{"name":"한솔"},{"name":"동호"},{"name":"시후"}]

//api 확인 되면 testFiles 대신 props로 넣어줄 생각입니당! 
//props로 state 값을 변경해줄 이벤트핸들러 onClick 넣어줄 예정입니다.
type Props = {
    testFiles:object[]
    
  };


//게시글보기및 수정에도 첨부파일의 리스트를 보여주기 위하여 Props값이 있다면 해당 Props의 값으로 구현하고 없다면
//<span>현재 첨부된 파일이 없습니다.</span> 을 보여주는건 어떨까요?
//예시: response.file?? <UploadFileList/>:<span>현재 첨부된 파일이 없습니다.</span>  
export function UploadFileList() {
    return(<div className={style.UploadFileList}>
    {testFiles.map((file,index)=>{return(
        <SelectedFile key={index} filename={file.name}></SelectedFile>
    )})}
    </div>
    )
}