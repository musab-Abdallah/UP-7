<template>
  <div class="container">
    <navbar />
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Add New Restaurant
    </button>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Add New Restaurant
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @click.prevent>
              <div class="row g-3 align-items-center">
                <div class="col-auto mx-auto">
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
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button @click="Addlocatin()" type="button" class="btn btn-primary">
              Add Now
            </button>
          </div>
        </div>
      </div>
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
  name: "addnew-location",
  data() {
    return {
      v$: useValidate(),
      name: "",
      phone: "",
      address: "",
      userid: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  components: {
    navbar,
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
    }
  },
  methods: {
    ...mapActions(["redirectTo"]),
    async Addlocatin() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("is validated");
        let result = await axios.post("http://localhost:3000/locations", {
          name: this.name,
          phone: this.phone,
          address: this.address,
          userid: this.userid,
        });
        if (result.status == 201) {
          this.redirectTo({ val: "home" });

          setTimeout(() => {
            this.name = "";
            this.phone = "";
            this.address = "";

            this.successMessage = "";
            this.errorMessage = "";
          }, 2000);
          this.errorMessage = "";
          this.successMessage = "Added New Location";
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

<style></style>
