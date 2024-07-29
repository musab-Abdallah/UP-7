<template>
  <form @click.prevent>
    <div class="row g-3 align-items-center">
      <div class="col-auto mx-auto">
        <h1>Sign Up</h1>
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
        <button type="submit" @click="signupNaw()" class="btn btn-primary">
          Sign Up Now
        </button>
        &nbsp; &nbsp;
        <button
          type="button"
          @click="redirectTo({ val: 'login' })"
          class="btn btn-success"
        >
          Login
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  name: "Signup-Page",
  data() {
    return {
      v$: useValidate(),
      name: "",
      pass: "",
      email: "",
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
      this.redirectTo({ val: "home" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async signupNaw() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("is validate sucssfully");
        let result = await axios.post("http://localhost:3000/users", {
          name: this.name,
          email: this.email,
          pass: this.pass,
        });
        if (result.status == 201) {
          // save data in local storge
          localStorage.setItem("user-info", JSON.stringify(result.data));
          console.log(result.data);
          //redirectTo Home Page
          // this.redirectTo({ val: "home" });
          console.log("User Add And Done");
        } else {
          console.log("is not Add");
        }
      } else {
        console.log("is fialed");
      }
    },
  },
};
</script>
<style scoped>
.error-feedback {
  color: red;
  font-size: 14px;
}
</style>
