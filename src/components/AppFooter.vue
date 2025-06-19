<template>
  <footer class="Tempfooter">
    <div class="footer-section">
      <!-- 홈페이지 이름 -->
      <div class="footer-column">
        <h4>practical</h4>
        전인수 이찬양 김민주 황일준<br />

      </div>
      <!-- 고객센터 -->
      <div class="footer-column">
        <h4>365 고객센터</h4>
        서울특별시 광진구 능동로 209<br />
        email: dlstn0201@daum.net
      </div>
      <!-- 프로젝트 정보 -->
      <div class="footer-column">
        <h4>프로젝트 정보</h4>
        본 홈페이지는<br />
        web programming 002분반<br />
        practical조의 결과물입니다.
      </div>
    </div>
  </footer>
</template>


<script>
export default {
  name: 'TempFooter',
};
</script>

<style scoped>
.Tempfooter {
  background-color: #fff;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  box-sizing: border-box;
  padding: 20px 0;
}

.footer-section {
  width: 80%;
  max-width: 1200px;   /* 필요시 최대폭 제한 */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.footer-column h4 {
  font-weight: bold;
}
.footer-column {
   font-size: 14px;
}
</style>

