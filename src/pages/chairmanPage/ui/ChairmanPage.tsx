import React from "react"
import { ChairmanGreeting } from "entities/chairmanGreeting"
import styles from './ChairmanPage.module.css'

export const ChairmanPage = () => {
    return (
        <div className={styles.ChairmanPage}>
            <ChairmanGreeting/>
        </div>
    )
}