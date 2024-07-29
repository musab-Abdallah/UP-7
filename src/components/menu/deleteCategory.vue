<template>
  <navbar />
  <div class="container">
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <h1>Delete Category</h1>
          <hr />
          <p class="text-danger">Are You Sure To Delete This Category</p>
          <hr />
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <button class="btn btn-info" @click="goback()">Go Back</button> &nbsp;
          &nbsp; &nbsp;
          <button class="btn btn-danger" @click="deleteCategory()">
            Delete Now
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
import { mapMutations } from "vuex";
export default {
  name: "delete-location",
  components: {
    navbar,
  },
  data() {
    return {
      locationid: this.$route.params.locationid,
      catid: this.$route.params.catid,
      userid: "",
      locationData: [],
      successMessage: "",
      errorMessage: "",
      name: "",
      allitemsidis: [],
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "signup" });
    } else {
      this.deletelocation = this.$route.params.locationid;
      this.userid = JSON.parse(user).id;
      this.CanCurrentUserAccessThisLocation();
      this.canUserAcessThisCategory({
        useridis: this.userid,
        locationidis: this.locationid,
        catidis: this.catid,
        redirectToPage: "home",
      });
      this.getCategoryName(this.userid, this.locationid, this.catid);
      let result = await axios.get(
        `http://localhost:3000/items?catid=${this.catid}`
      );
      let resultlentgh = result.data.length;
      for (let i = 0; i < resultlentgh; i++) {
        this.allitemsidis.push(result.data[i].id);
      }
    }
  },
  methods: {
    ...mapMutations(["canUserAcessThisCategory"]),
    goback() {
      this.$router.push({
        name: "ViewCategories",
        params: { locationid: this.locationid },
      });
    },
    async getCategoryName(userid, locid, catid) {
      let result = await axios.get(
        `http://localhost:3000/Categories?userid=${userid}&locationid=${locid}&id=${catid}`
      );
      if (result.status == 200) {
        this.CategoryNames = result.data;
        if (this.CategoryNames.length > 0) {
          this.name = this.CategoryNames[0].name;
        }
      }
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
    async deleteCategory() {
      let result = await axios.delete(
        `http://localhost:3000/Categories/${this.catid}`
      );
      let allresult = [];
      for (let i = 0; i < this.allitemsidis.length; i++) {
        let result = await axios.delete(
          `http://localhost:3000/items/${this.allitemsidis[i]}`
        );
        if (result.status == 200) {
          allresult.push(true);
        } else {
          allresult.push(false);
        }
      }
      if (result.status == 200) {
        this.successMessage = "Category is Deleted ....";
        this.errorMessage = "";
        setTimeout(() => {
          this.$router.push({
            name: "ViewCategories",
            params: { locationid: this.locationid },
          });
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
