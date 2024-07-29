<template>
  <navbar />
  <div class="container">
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <h1>Update Restaurant</h1>
          <input
            type="text"
            class="form-control"
            placeholder="Restaurant Name"
            v-model="name"
          />
          <span class="error-feedback" v-if="v$.name.$error">{{
            v$.name.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
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
      </div>
      <br />
      <div class="row g-3 align-items-center">
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
      <br />
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
    </form>
    <div class="center">
      <button
        @click="Updatelocatin()"
        type="button"
        class="btn btn-success"
        id="musab"
      >
        Update Now
      </button>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/header/navbar.vue";
import axios from "axios";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
export default {
  name: "Update-location",
  components: {
    navbar,
  },
  data() {
    return {
      v$: useValidate(),
      name: "",
      phone: "",
      address: "",
      userid: "",
      successMessage: "",
      errorMessage: "",
      locationid: "",
    };
  },
  validations() {
    return {
      name: { required },
      phone: { required, minLength: minLength(10) },
      address: { required },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.userid = JSON.parse(user).id;
      this.locationid = this.$route.params.locationid;
      this.CanCurrentUserAccessThisLocation();
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async CanCurrentUserAccessThisLocation() {
      let result = await axios.get(
        `http://localhost:3000/locations?id=${this.locationid}&userid=${this.userid}`
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
    async Updatelocatin() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("is validated");
        let result = await axios.put(
          `http://localhost:3000/locations/${this.locationid}`,
          {
            name: this.name,
            phone: this.phone,
            address: this.address,
            locationid: this.locationid,
          }
        );
        if (result.status == 200) {
          this.redirectTo({ val: "home" });

          setTimeout(() => {
            this.name = "";
            this.phone = "";
            this.address = "";

            this.successMessage = "";
            this.errorMessage = "";
            // this.v$.phone.$errors[0].$message = "";
            // this.v$.name.$errors[0].$message = "";
            // this.v$.address.$errors[0].$message = "";
          }, 2000);
          // console.log(result);
          this.errorMessage = "";
          this.successMessage = " Location is Updated";
        }
      } else {
        this.successMessage = "";
        this.errorMessage = "Your Must Fill Every Field";
        console.log("is Not validated");
      }
    },
  },
};
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
