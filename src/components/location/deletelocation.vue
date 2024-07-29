<template>
  <navbar />
  <div class="container">
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <h1>Delete Restaurant</h1>
          <hr />
          <p class="text-danger">Are You Sure To Delete This Location</p>
          <hr />
          {{ name }}<br />
          {{ address }} <br />
          {{ phone }}<br />
          <hr />
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <button class="btn btn-info" @click="goback()">Go Back</button> &nbsp;
          &nbsp; &nbsp;
          <button class="btn btn-danger" @click="deletelocations()">
            Delete Now
          </button>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <!-- <hr /> -->
        <div
          class="col-auto d-block mx-auto alert alert-success"
          v-if="successMessage.length > 0"
        >
          {{ successMessage }}
        </div>
        <div
          class="col-auto d-block mx-auto alert alert-danger"
          v-if="errorMessage.length > 0"
        >
          {{ errorMessage }}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import navbar from "@/components/header/navbar.vue";
import axios from "axios";
export default {
  name: "delete-location",
  components: {
    navbar,
  },
  data() {
    return {
      name: "",
      phone: "",
      address: "",
      userid: "",
      deletelocation: "",
      locationData: [],
      successMessage: "",
      errorMessage: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "signup" });
    } else {
      this.deletelocation = this.$route.params.locationid;
      this.userid = JSON.parse(user).id;
      this.CanCurrentUserAccessThisLocation();
    }
  },
  methods: {
    goback() {
      this.$router.push({ name: "home" });
    },
    async CanCurrentUserAccessThisLocation() {
      let result = await axios.get(
        `http://localhost:3000/locations?id=${this.deletelocation}&userid=${this.userid}`
      );
      if (result.status == 200 && result.data.length > 0) {
        this.locationData = result.data;
        this.name = this.locationData[0].name;
        this.address = this.locationData[0].address;
        this.phone = this.locationData[0].phone;
      } else {
        this.$router.push({ name: "home" });
      }
    },
    async deletelocations() {
      let result = await axios.delete(
        `http://localhost:3000/locations/${this.deletelocation}`
      );
      if (result.status == 200) {
        this.successMessage = "Loction is Deleted ....";
        this.errorMessage = "";
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 1000);
      } else {
        this.successMessage = "";
        this.errorMessage = "Samting wrong Try Again";
      }
    },
  },
};
</script>

<style></style>
