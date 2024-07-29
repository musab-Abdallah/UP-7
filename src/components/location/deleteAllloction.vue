<template>
  <div class="container">
    <navbar />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <h1>Delete All Location</h1>
          <hr />
          <p class="text-danger">Are You Sure To Delete All Location</p>

          <hr />
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <button class="btn btn-info" @click="goback()">Go Back</button> &nbsp;
          &nbsp; &nbsp;
          <button class="btn btn-danger" @click="deleteAlllocations()">
            Delete All
          </button>
        </div>
      </div>
      <div class="row g-3 align-items-center">
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
  name: "deleteAll-loction",
  components: {
    navbar,
  },
  data() {
    return {
      userid: "",
      successMessage: "",
      errorMessage: "",
      alllocationid: [],
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "signup" });
    } else {
      this.userid = JSON.parse(user).id;
      let result = await axios.get(
        `http://localhost:3000/locations?userid=${this.userid}`
      );
      let resultlentgh = result.data.length;
      for (let i = 0; i < resultlentgh; i++) {
        this.alllocationid.push(result.data[i].id);
      }
      console.table(this.alllocationid);
    }
  },
  methods: {
    goback() {
      this.$router.push({ name: "home" });
    },
    async deleteAlllocations() {
      let allresult = [];
      for (var i = 0; i < this.alllocationid.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/locations/${this.alllocationid[i]}`
        );
        if (result.status == 200) {
          allresult.push(true);
        } else {
          allresult.push(false);
        }
      }
      console.log(this.allresult);
      if (!allresult.includes(false)) {
        this.successMessage = " All Loction Are Deleted ....";
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
