<template>
  <div class="container">
    <navbar />
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <h1>Update Your Profile</h1>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Enter Your Name"
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
            type="email"
            class="form-control"
            placeholder="Enter Your Email"
            v-model="email"
          />
          <span class="error-feedback" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <input
            type="password"
            class="form-control"
            placeholder="Enter Your Password"
            v-model="pass"
          />
          <span class="error-feedback" v-if="v$.pass.$error">{{
            v$.pass.$errors[0].$message
          }}</span>
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <button
            type="submit"
            @click="updateprofilenow()"
            class="btn btn-primary"
          >
            Update Profile
          </button>
          &nbsp; &nbsp;
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import navbar from "@/components/header/navbar.vue";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
// import { email } from '@vuelidate/validators';
export default {
  name: "pro-file",
  components: {
    navbar,
  },
  data() {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      pass: "",
      userid: "",
    };
  },
  validations() {
    return {
      name: { required },
      pass: { required },
      email: { required, email },
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.pass = JSON.parse(user).pass;
      this.userid = JSON.parse(user).userid;
    } else {
      this.redirectTo({ val: "signup" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async updateprofilenow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("Validated");
        let result = await axios.put(
          `http://localhost:3000/users/${this.userid}`,
          {
            name: this.name,
            email: this.email,
            pass: this.pass,
          }
        );
        // console.log(result);
        if (result.status == 200) {
          console.log("My Profile is Updated scussfully");
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.redirectTo({ val: "home" });
        } else {
          console.log("Is not updated");
        }
      } else {
        console.log("Not Validated");
      }
    },
  },
};
</script>

<style>
.error-feedback {
  color: red;
  font-size: 14px;
}
</style>
