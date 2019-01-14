<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <!-- TODO: router name으로 링크 이동할때랑, path로 이동할 때 차이점 알아두기 -->
      <router-link class="navbar-brand" :to="{ name: 'home'}">URIYANG</router-link>
      <!-- TODO: 요기 아랫 부분, VUEX 붙히고 나서 구현하기 -->
    </div>
    <ul v-if="!isAuthenticated" class="nav navbar-nav pull-sx-right">
      <li class="nav-item">
        <!-- TODO: router-link 중복되는 것.. 중복되지 않게 수정 -->
        <router-link
          class="nav-link"
          active-class="active"
          exact
          :to="{ name: 'home' }">
          Home
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          active-class="active"
          exact
          :to="{ name: 'login' }">
          <i class="ion-compose"></i>Sign in
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          active-class="active"
          exact
          :to="{ name: 'register' }">
          <i class="ion-compose"></i>Sign up
        </router-link>
      </li>
    </ul>
    <ul v-else class="nav navbar-nav pull-xs-right">
      <li class="nav-item">
        <router-link
          class="nav-link"
          active-class="active"
          exact
          :to="{ name: 'home' }">
          Home
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          active-class="active"
          exact
          :to="{ name: 'article-edit' }">
          <i class="ion-compose"></i>&nbsp;New Article
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          active-class="active"
          exact
          :to="{ name: 'settings' }">
          <i class="ion-gear-a"></i>&nbsp;Settings
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          active-class="active"
          exact
          :to="{ 
            name: 'profile',
            params: { usernmae: currentUser.username }
          }"
        >
          {{ currentUser.username }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  }
}
</script>

<style lang="scss" scoped>
.navbar {
}
</style>


