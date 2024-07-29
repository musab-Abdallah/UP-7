<template>
  <div class="container">
    <navbar />
    <p class="text-end">
      Well Come {{ username }}
      <router-link :to="{ name: 'profile' }">
        <button class="btn btn-info" type="button">Profile</button>
      </router-link>
    </p>
    <router-link :to="{ name: 'addnewlocation' }">
      <button type="button" class="btn btn-primary">Add New Restaurant</button>
    </router-link>
    <!-- <addnewlocation /> -->
    <userlocation :alllocations="lastoflocation" />
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import navbar from "@/components/header/navbar.vue";
// import addnewlocation from "@/components/location/addnewlocation.vue";
import userlocation from "@/components/location/userlocation.vue";
export default {
  name: "HomeView",
  data() {
    return {
      username: "",
      lastoflocation: [],
      userid: "",
    };
  },
  components: {
    navbar,
    // addnewlocation,
    userlocation,
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.username = JSON.parse(user).name;
      this.userid = JSON.parse(user).id;
    }
    let result = await axios.get(
      `http://localhost:3000/locations?userid=${this.userid}`
    );
    if (result.status == 200 && result.data.length > 0) {
      // console.log(result.data);
      this.lastoflocation = result.data;
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
  },
};
</script>
