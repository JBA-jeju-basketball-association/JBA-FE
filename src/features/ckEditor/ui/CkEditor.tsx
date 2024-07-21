// <path-to-your-build>/src/ckeditor.ts or file containing editor configuration if you are integrating an editor from source.

// The editor creator to use.
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";
import { Api } from "../../../shared/api";
import {ClassicEditor} from "@ckeditor/ckeditor5-editor-classic";

type Props = {
  setCkData: React.Dispatch<any>;
  setNewCkImgUrls: React.Dispatch<React.SetStateAction<string[]>>;
  ckData: string;
};

export const CkEditor = ({ ckData, setCkData, setNewCkImgUrls }: Props) => {
  const editorConfiguration = {
    toolbar: {
      items: [
        "fontFamily",
        "|",
        "fontSize",
        "|",
        "bold",
        "italic",
        "strikethrough",
        "underline",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
        "|",
        "link",
        "imageUpload",
        "blockQuote",
        "insertTable",
        "mediaEmbed",
        "undo",
        "redo",
      ],
    },
    language: "ko",
    image: {
      toolbar: [
        "imageTextAlternative",
        "toggleImageCaption",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
        "linkImage",
      ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableCellProperties",
        "tableProperties",
      ],
    },
    mediaEmbed: {
      previewsInData:true
  },
    extraPlugins: [uploadPlugin],
  };

  const customUploadAdapter = (loader: any) => {
    // (2)
    return {
      upload() {
        return new Promise((resolve, reject): void => {
          const data: FormData = new FormData();
          loader.file.then((file: any): void => {
            data.append("uploadFile", file);
            Api.post("/v1/api/upload/ck-editor-upload", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
              .then((res) => {
                setNewCkImgUrls((prevState) => {
                  return [...prevState, res.data.url];
                });
                resolve({
                  default: res.data.url,
                });
              })
              .catch((err) => reject(err));
          });
        });
      },
    };
  };

  function uploadPlugin(editor: any) {
    // (3)
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={ckData !== null ? ckData : ""}
      onChange={(event, editor): void => {
        setCkData(editor.getData()); // 에디터 작성 내용 저장
      }}
    />
  );
};
