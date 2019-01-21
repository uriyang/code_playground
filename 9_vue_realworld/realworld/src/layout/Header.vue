<template>
  <a-layout-header>
    <a-menu
        v-model="current"
        mode="horizontal"
    >
      <!-- TODO: router name으로 링크 이동할때랑, path로 이동할 때 차이점 알아두기 -->
      <a-menu-item key="menu-uri">
        <router-link 
          class="navbar-brand" 
          :to="{ name: 'home'}">
          URIYANG
        </router-link>
      </a-menu-item>
      <!-- TODO: 요기 아랫 부분, VUEX 붙히고 나서 구현하기 -->
      <a-menu-item key='menu-home'>
        <router-link
          class="nav-link"
          active-class="active"
          exact
          :to="{ name: 'home' }">
          Home
        </router-link>
      </a-menu-item>
      <a-menu-item key="menu-login" v-if="!isAuthenticated">
        <router-link
          class="nav-link"
          active-class="active"
          exact
          :to="{ name: 'login' }">
          <i class="ion-compose"></i>Sign in
        </router-link>
      </a-menu-item>
      <a-menu-item key="menu-join" v-if="!isAuthenticated">
        <router-link
          class="nav-link"
          active-class="active"
          exact
          :to="{ name: 'register' }">
          <i class="ion-compose"></i>Sign up
        </router-link>
      </a-menu-item>
      <a-menu-item key="menu-article" v-if="isAuthenticated">
        <router-link
          class="nav-link"
          active-class="active"
          exact
          :to="{ name: 'article-edit' }">
          <i class="ion-compose"></i>&nbsp;New Article
        </router-link>
      </a-menu-item>
      <a-menu-item key="menu-setting" v-if="isAuthenticated">
        <router-link
          class="nav-link"
          active-class="active"
          exact
          :to="{ name: 'settings' }">
          <i class="ion-gear-a"></i>&nbsp;Settings
        </router-link>
      </a-menu-item>
      <a-menu-item key="menu-profile" v-if="isAuthenticated">
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
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      current: ['mail']
    }
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  }
}
</script>

<style lang="scss" scoped>
.ant-layout-header {
  height: 46px;
  padding: 0;
  background: #fff;
}
</style>
