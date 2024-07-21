import React from "react";
import styles from "./ChairmanGreeting.module.css";

export const ChairmanGreeting = () => {
  return (
    <section className={styles.chairman_container} id="chairman">
      <div className={styles.title_sub}>
        <h2 className={styles.title}>회장인사말</h2>
        <p className={styles.txt_desc}>
          제주특별자치도농구협회 홈페이지 방문을 진심으로 환영합니다.
        </p>
      </div>
      <div className={styles.inner_cont}>
        <div className={styles.border_line} />
        <div className={styles.greeting_background}>
          <div className={styles.wrap_greeting}>
            <div className={styles.frame}/>
            <div className={styles.continaer_greeting}>
              <p className={styles.top_greeting}>
                <strong>
                  제주특별자치도 농구 발전을 위해 끊임없는 관심과 애정을
                  <br/>
                  보여드릴 수 있는 협회가 될 것을 약속드립니다.
                </strong>
              </p>
              <strong className={styles.divide_line}>ㅡ</strong>
              <p className={styles.bottom_greeting}>
                우리는 제주의 모든 연령층에게 농구를 보급하고 지속적인
                <br/>
                훈력과 경기의 기회를 제공하여 농구의 매력을 널리 알리는 것을
                <br/>
                목표로 활동하고 있으며, 제주 지역 사회에 활력을 불어 넣고
                <br/>
                체육 문화의 발전에 기여할 것 입니다.
              </p>
              <div className={styles.desc_name_area}>
                <p className={styles.desc_name}>제주특별자치도농구협회장 김병주</p>
              </div>
            </div>
          </div>
        </div>
        {/*<div className={styles.desc}>*/}
        {/*  <p className={styles.desc_one}>*/}
        {/*    농구를 활성화하여 제주도민의 체력을 향상시키고 건전하고 활기찬*/}
        {/*    분위기를 조성하고자 하는 가치를 품고 있습니다. 농구를 통한 즐겁고*/}
        {/*    건강한 활동을 촉진하고 선수와 단체를 통해 농구의 가치를 홍보하며*/}
        {/*    우수한 농구 인재를 발굴함으로써 제주 체육 발전에 기여하고자 합니다.*/}
        {/*    농구를 통한 즐겁고 건강한 활동을 촉진하고 선수와 단체를 통해 농구의*/}
        {/*    가치를 홍보하며 우수한 농구 인재를 발굴함으로써 제주 체육 발전에*/}
        {/*    기여하고자 합니다.*/}
        {/*  </p>*/}
        {/*  <p className={styles.desc_two}>*/}
        {/*    농구를 활성화하여 제주도민의 체력을 향상시키고 건전하고 활기찬*/}
        {/*    분위기를 조성하고자 하는 가치를 품고 있습니다. 농구를 통한 즐겁고*/}
        {/*    건강한 활동을 촉진하고 선수와 단체를 통해 농구의 가치를 홍보하며*/}
        {/*    우수한 농구 인재를 발굴함으로써 제주 체육 발전에 기여하고자 합니다.*/}
        {/*    농구를 활성화하여 제주도민의 체력을 향상시키고 건전하고 활기찬*/}
        {/*    분위기를 조성하고자 하는 가치를 품고 있습니다. 감사합니다.*/}
        {/*  </p>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};
