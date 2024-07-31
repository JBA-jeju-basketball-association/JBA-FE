import { Api } from "shared/api";
import confirmAlert from "shared/lib/alert/ConfirmAlert";
/**
 * 지정된 URL에서 파일을 다운로드하고 브라우저에서 다운로드를 트리거.
 * 'application/octet-stream' MIME 타입을 사용하여 다양한 파일 형식을 처리가능.
 * @example
 *
 * const { fileDownload } = useFileDownload();
 * 구조분해할당으로 fileDownload 함수를 가져옵니다.
 * 파일의 url과 name을 인자로 넘겨준다.
 * fileDownload("fileurl", "filename");
 *
 * @async
 * @param {string} url - 다운로드할 파일의 URL.
 * @param {string} name - 다운로드할 파일의 이름.
 * @returns {Promise<void>} 파일 다운로드가 완료되면 resolve되는 Promise를 반환합니다.
 */

export const useFileDownload = () => {
  const fileDownload = async (url: string, name: string) => {
    try {
      const res = await Api(url, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([res.data], {
        type: "application/octet-stream",
      });
      const blobURL = URL.createObjectURL(blob);
      //객체 URL을 생성하여 반환
      const a = document.createElement("a");
      //a태그 생성
      a.href = blobURL;
      a.style.display = "none";
      if (name && name.length) {
        a.download = name;
      }

      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
      confirmAlert("error", "첨부파일 다운로드 에러 발생");
    }
  };
  return { fileDownload };
};
