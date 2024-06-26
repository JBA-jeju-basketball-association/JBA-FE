import React from 'react';
import styles from './AdminGallery.module.css';
import { AdminSearchForm } from 'features/admin/';

export const AdminGallery = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        {/* <AdminSearchForm categorys={categorys} label={label} /> */}
      </div>
      <div className={styles.listWrapper}>목록 영역</div>
    </div>
  );
};
