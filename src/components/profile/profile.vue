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
            disabled
            type="text"
            class="form-control"
            placeholder="Enter Your Name"
            v-model="name"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <input
            disabled
            type="email"
            class="form-control"
            placeholder="Enter Your Email"
            v-model="email"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <input
            disabled
            type="password"
            class="form-control"
            placeholder="Enter Your Password"
            v-model="pass"
          />
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <button
            type="submit"
            @click="updateprofile()"
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
import navbar from "@/components/header/navbar.vue";
// import { email } from '@vuelidate/validators';
export default {
  name: "pro-file",
  components: {
    navbar,
  },
  data() {
    return {
      name: "",
      email: "",
      pass: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.name = JSON.parse(user).name;
      this.email = JSON.parse(user).email;
      this.pass = JSON.parse(user).pass;
    } else {
      this.redirectTo({ val: "signup" });
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    updateprofile() {
      this.redirectTo({ val: "updateprofile" });
    },
  },
};
</script>

<style></style>
