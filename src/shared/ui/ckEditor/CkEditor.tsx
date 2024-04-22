// <path-to-your-build>/src/ckeditor.ts or file containing editor configuration if you are integrating an editor from source.

// The editor creator to use.
import  Editor  from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from "react";
import axios from "axios";
import Api from "../../../app/hocs/Api";

type Props = {
    setCkData: React.Dispatch<any>;
    setCkImgUrls:  React.Dispatch<React.SetStateAction<string[]>>;
}

const TextEditor = ({setCkData, setCkImgUrls}:Props) => {

    const editorConfiguration = {
        toolbar: {
            items: [
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'imageUpload',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'undo',
                'redo',
                'fontBackgroundColor',
                'fontColor',
                'fontFamily',
                'fontSize',
                'strikethrough',
                'underline'
            ]
        },
        language: 'ko',
        image: {
            toolbar: [
                'imageTextAlternative',
                'toggleImageCaption',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                'linkImage'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableCellProperties',
                'tableProperties'
            ]
        },

        extraPlugins:[uploadPlugin]
    };

    const customUploadAdapter = (loader:any) => { // (2)
        return {
            upload(){
                return new Promise ((resolve, reject):void => {
                    const data:FormData = new FormData();
                    loader.file.then( (file:any):void => {
                        data.append("uploadFile", file);
                        Api.post('/v1/api/storage/ck-editor-upload', data, {
                            headers:{
                                "Content-Type": "multipart/form-data"
                            }
                        })
                            .then((res) => {
                                setCkImgUrls(prevState => {
                                    return [...prevState, res.data.url]
                                })
                                resolve({
                                    default: res.data.url
                                });
                            })
                            .catch((err)=>reject(err));
                    })
                })
            }
        }
    }

    function uploadPlugin (editor:any){ // (3)
        editor.plugins.get('FileRepository').createUploadAdapter = (loader:any) => {
            return customUploadAdapter(loader);
        }
    }


    return (
        <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data = ""
            onChange={(event, editor):void => {
                setCkData(editor.getData()); // 에디터 작성 내용 저장
                console.log(editor.getData())
                console.log(editor);
            }}
        />
    )
}

export default TextEditor;