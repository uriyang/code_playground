<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <!-- TODO: router name으로 링크 이동할때랑, path로 이동할 때 차이점 알아두기 -->
      <router-link class="navbar-brand" :to="{ name: 'home'}">URIYANG</router-link>
      <!-- TODO: 요기 아랫 부분, VUEX 붙히고 나서 구현하기 -->
    </div>
  </nav>
</template>

<script>
export default {
  name: 'R-Header'
}
</script>

