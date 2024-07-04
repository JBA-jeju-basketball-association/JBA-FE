import React from "react";
import styles from './ChairmanGreeting.module.css'

export const ChairmanGreeting = () => {
    return (
        <section id="chairman">
            <div className={styles.title_sub}>
                <h2 className={styles.tit}>회장 인사말</h2>
                <p className={styles.txt_desc}>제주 농구협회 홈페이지 방문을 진심으로 환영합니다.</p>
            </div>
            <div className={styles.inner_cont}></div>
        </section>
    )
}
