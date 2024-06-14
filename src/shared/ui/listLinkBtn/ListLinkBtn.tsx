import React from 'react';
import style from "./ListLinkBtn.module.css"

type Props = {
    content: string;
    linkFC?: () => void;
    handleFC?: (e:React.MouseEvent<HTMLButtonElement>) => void;
}
export const ListLinkBtn = ({content, linkFC, handleFC}:Props) => {
    return (
        <button className={style.ListLinkBtn} onClick={linkFC ? linkFC : handleFC}>
            {content}
        </button>
    );
};
