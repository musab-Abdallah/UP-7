<template>
  <ul id="nav">
    <li>
      <router-link
        :to="{ name: 'home', params: { pageTitle: 'HomePage' } }"
        exact
      >
        <a>Home</a>
      </router-link>
    </li>
    <a href="#" @click="logmeout()">logout</a>
  </ul>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "nav-bar",
  methods: {
    ...mapActions(["redirectTo"]),
    logmeout() {
      localStorage.clear();
      // this.$router.push({ name: "login" });
      this.redirectTo({ val: "login" });
    },
  },
};
</script>
<style lang="scss" scoped>
$fontcolor: darkcyan;
$navcolor: #525a5a;
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin-bottom: 50px;
  margin-top: 40px;
}
a {
  text-decoration: none;
  font-weight: bold;
  color: $fontcolor;
  padding: 10px;
}
a.router-link-exact-active a,
ul a a:hover {
  color: $navcolor;
  box-shadow: 2px 2px 4px 0px $navcolor;
}
</style>
