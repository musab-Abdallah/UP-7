<template>
  <div class="main">
    <!-- <navbar /> -->

    <div class="test-center">
      <router-link :to="{ name: 'home' }">
        <button class="btn btn-info">Go To Visit Home Page</button>
      </router-link>
    </div>
    <br />
    <img src="../assets/tamp-bg-1.png" class="rounded mx-auto d-black h400" />
  </div>
</template>

<script>
// import navbar from "@/components/header/navbar.vue";

export default {
  name: "Error-page",
  components: {
    // navbar,
  },
};
</script>

<style>
.h400 {
  height: 400px;
}
.main {
  text-align: center;
  margin-top: 20px;
}
</style>
