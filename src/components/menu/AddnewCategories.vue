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
          <h1>Add New Category</h1>
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
            @click="AddCategories()"
            type="button"
            class="btn btn-success"
          >
            Add Now
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
import axios from "axios";
export default {
  name: "Addnew-Categories",
  components: {
    navbar,
  },
  data() {
    return {
      v$: useValidate(),
      locationid: this.$route.params.locationid,
      name: "",
      errorMessage: "",
      successMessage: "",
      lastOfCategries: [],
      // userid: "",
    };
  },
  mounted() {
    this.DisplayUserCategries(this.userid, this.locationid);
  },
  validations() {
    return {
      name: { required, minLength: minLength(3) },
    };
  },
  methods: {
    async DisplayUserCategries(userid, locid) {
      let result = await axios.get(
        `http://localhost:3000/Categories?userid=${userid}&locationid=${locid}`
      );
      if (result.status == 200) {
        this.lastOfCategries = result.data;
      }
    },
    async AddCategories() {
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
          let result = await axios.post("http://localhost:3000/Categories", {
            // http://localhost:3000/Categories
            name: this.name,
            userid: this.userid,
            locationid: this.locationid,
          });
          if (result.status == 201) {
            this.errorMessage = "";
            this.successMessage = "Added New Category sucssfullay";
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
