<template>
  <form @click.prevent>
    <br />
    <div class="row g-3 align-items-center">
      <div class="col-auto mx-auto">
        <h1>Login</h1>
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
        <button type="submit" @click="loginNaw()" class="btn btn-success">
          Login
        </button>
        &nbsp; &nbsp; &nbsp;
        <button
          type="button"
          @click="redirectTo({ val: 'signup' })"
          class="btn btn-primary"
        >
          Sign Up
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
  name: "log-in",
  data() {
    return {
      v$: useValidate(),
      pass: "",
      email: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.redirectTo({ val: "home" });
    }
  },
  validations() {
    return {
      pass: { required },
      email: { required, email },
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async loginNaw() {
      this.v$.$validate();
      if (!this.v$.$error) {
        // console.log("login is sucssfully");
        let result = await axios.get(
          `http://localhost:3000/users?email=${this.email}&pass=${this.pass}`
        );
        if (result.status == 200 && result.data.length > 0) {
          console.log("login is Dane");
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.redirectTo({ val: "home" });
        } else {
          console.log("is not found");
        }
        console.log(result);
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
