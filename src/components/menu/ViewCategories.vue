<template>
  <navbar />
  <div class="container">
    <router-link
      :to="{ name: 'AddnewCategories', params: { locationid: locationid } }"
    >
      <button class="btn btn-info">Add Category</button> </router-link
    >&nbsp;
    <router-link :to="{ name: 'menu', params: { locationid: locationid } }">
      <button class="btn btn-success">Back To Menu</button>
    </router-link>
    <table class="table caption-top" v-if="listofCategories.length > 0">
      <caption>
        <span> List Of Categories ({{ listofCategories.length }}) </span>
        <span class="float-end">
          <!-- <router-link :to="{ name: 'deleteAllCategories' }">
            <button class="btn btn-danger">Delete All</button>
          </router-link> -->
        </span>
      </caption>
      <thead class="table-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cat, i) in listofCategories" :key="i">
          <th scope="row">{{ cat.name }}</th>
          <!-- <th>{{ cat.locationid }}</th> -->
          <td>
            <router-link
              :to="{
                name: 'UpdateCategory',
                params: { catid: cat.id, locationid: cat.locationid },
              }"
            >
              <button class="btn btn-info">Update</button> </router-link
            >&nbsp;
            <router-link
              :to="{
                name: 'deleteCategory',
                params: { catid: cat.id, locationid: cat.locationid },
              }"
            >
              <button class="btn btn-danger">Delete</button> </router-link
            >&nbsp;
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-warning" role="alert">
      No Categories Added
    </div>
  </div>
</template>

<script>
import navbar from "@/components/header/navbar.vue";
// import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "View-Categories",
  components: {
    navbar,
  },
  data() {
    return {
      locationid: this.$route.params.locationid,
      // userid: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.username = JSON.parse(user).name;
      this.userid = JSON.parse(user).id;
      this.isloggedinUser();
      this.locationid = this.$route.params.locationid;
      this.displayAllCategories({
        useridis: this.userid,
        locationidis: this.locationid,
      });
      this.canUserAcessThisLocation({
        useridis: this.userid,
        locationidis: this.locationid,
        // redirectToPage: "home",
      });
      //pass
      // this.getlocationinfo(this.userid, this.locationid);
    }
  },
  computed: {
    ...mapState([
      "isuserlaggedin",
      "loggedinuserid",
      "numofCategories",
      "listofCategories",
    ]),
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations([
      "isloggedinUser",
      "displayAllCategories",
      "canUserAcessThisLocation",
      // "listofCategories",
    ]),
  },
};
</script>

<style></style>
