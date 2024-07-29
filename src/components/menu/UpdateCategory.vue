<template>
  <navbar />
  <div class="container">
    <router-link
      :to="{ name: 'ViewCategories', params: { locationid: locationid } }"
    >
      <button class="btn btn-info">Back To Category</button> </router-link
    >&nbsp;
    <router-link :to="{ name: 'menu', params: { locationid: locationid } }">
      <button class="btn btn-success">Back To Menu</button>
    </router-link>
    <br />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <h1>Update Category</h1>
          <input
            type="text"
            class="form-control"
            placeholder="Add New Category"
            v-model="name"
          />
          <span class="error-feedback" v-if="v$.name.$error">{{
            v$.name.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <!-- <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Phone Number"
            v-model="phone"
          />
          <span class="error-feedback" v-if="v$.phone.$error">{{
            v$.phone.$errors[0].$message
          }}</span>
        </div>
      </div> -->
      <br />
      <!-- <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Restaurant Address"
            v-model="address"
          />
          <span class="error-feedback" v-if="v$.address.$error">{{
            v$.address.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br /> -->
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
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto d-black mx-auto">
          <button
            @click="UpdateCategories()"
            type="button"
            class="btn btn-success"
          >
            Update Now
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import navbar from "@/components/header/navbar.vue";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

import { mapActions, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "UpdateCategory",
  components: {
    navbar,
  },
  data() {
    return {
      v$: useValidate(),
      locationid: this.$route.params.locationid,
      catid: this.$route.params.catid,
      name: "",
      errorMessage: "",
      successMessage: "",
      lastOfCategries: [],
      CategoryNames: [],
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
      this.canUserAcessThisCategory({
        useridis: this.userid,
        locationidis: this.locationid,
        catidis: this.catid,
        redirectToPage: "home",
      });
      //pass
      // this.getlocationinfo(this.userid, this.locationid);
    }
    this.DisplayUserCategries(this.userid, this.locationid);
    this.getCategoryName(this.userid, this.locationid, this.catid);
  },
  validations() {
    return {
      name: { required, minLength: minLength(3) },
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations([
      "isloggedinUser",
      "displayAllCategories",
      "canUserAcessThisLocation",
      // "listofCategories",
      "canUserAcessThisCategory",
    ]),
    async DisplayUserCategries(userid, locid) {
      let result = await axios.get(
        `http://localhost:3000/Categories?userid=${userid}&locationid=${locid}`
      );
      if (result.status == 200) {
        this.lastOfCategries = result.data;
      }
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
    async UpdateCategories() {
      this.v$.$validate();
      let fillterCategoryName = this.lastOfCategries.filter(
        (val) => val.name.toLocaleLowerCase() == this.name.toLocaleLowerCase()
      );
      console.table(this.lastOfCategries);

      if (!this.v$.$error) {
        if (fillterCategoryName.length > 0) {
          this.errorMessage = "Category Name Already Exists, Try Anathor Name";
          this.successMessage = "";
        } else {
          let result = await axios.put(
            `http://localhost:3000/Categories/${this.catid}`,
            {
              // http://localhost:3000/Categories
              name: this.name,
              userid: this.userid,
              locationid: this.locationid,
            }
          );
          if (result.status == 200) {
            this.errorMessage = "";
            this.successMessage = "Update Category Name sucssfullay";
            setTimeout(() => {
              this.$router.push({
                name: "ViewCategories",
                params: { locationid: this.locationid },
              });
            }, 1000);
          } else {
            this.successMessage = "";
            this.errorMessage = "Samething Wrong Try Again....";
          }
        }
      } else {
        this.successMessage = "";
        this.errorMessage = "Your Must Fill This Field";
      }
    },
  },
};
</script>

<style></style>
