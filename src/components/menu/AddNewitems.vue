<template>
  <navbar />
  <div class="container">
    <div class="clearfix"></div>
    <router-link :to="{ name: 'menu', params: { locid: locationid } }">
      <button type="button" class="float-start btn btn-info">
        Back To Menu
      </button>
    </router-link>
    <div class="text-center">
      <h1 class="mb0">{{ locName }}</h1>
      <p class="text-muted">{{ locAddress }}</p>
    </div>
    <form @click.prevent>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <h1>Add New Items</h1>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="w250 form-control"
              id="floatitemsName"
              placeholder="Enter Item Name"
              v-model="itemName"
            />
            <label for="floatitemsName">Enter Item Name</label>
          </div>
          <span class="error-feedback" v-if="v$.itemName.$error">{{
            v$.itemName.$errors[0].$message
          }}</span>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <div class="form-floating mb-3">
            <input
              type="number"
              class="w250 form-control"
              id="floatitemsprice"
              placeholder="Enter Item Name"
              v-model="itemprice"
            />
            <label for="floatitemsprice">Enter Item Price</label>
          </div>
          <span class="error-feedback" v-if="v$.itemprice.$error">{{
            v$.itemprice.$errors[0].$message
          }}</span>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <div class="form-floating mb-3">
            <input
              type="number"
              class="w250 form-control"
              id="floatitemsQty"
              placeholder="Enter Item Quantities"
              v-model="itemsQty"
            />
            <label for="floatitemsQty">Enter Item Quantities</label>
          </div>
          <span class="error-feedback" v-if="v$.itemsQty.$error">{{
            v$.itemsQty.$errors[0].$message
          }}</span>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <div class="form-floating mb-3">
            <textarea
              class="w250 h200 form-control"
              placeholder="Enter Item discription"
              id="floatitemsdiscription"
              v-model="discription"
            ></textarea>
            <label for="floatitemsdiscription">Enter Item discription</label>
          </div>
          <span class="error-feedback" v-if="v$.discription.$error">{{
            v$.discription.$errors[0].$message
          }}</span>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <div class="form-floating mb-3">
            <select
              class="w250 form-select"
              id="floatitemCategory"
              v-model="pickedCategory"
            >
              <!-- <option value="">Selet Category Name</option> -->
              <option
                v-for="(cat, i) in listOfCategories"
                :key="i"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
              <option value="">dinner</option>
              <option value="">breakfast</option>
            </select>
            <label for="floatitemCategory">Selet Category Name</label>
          </div>
          <!-- <span class="error-feedback" v-if="v$.pickedCategory.$error">{{
            v$.pickedCategory.$errors[0].$message
          }}</span> -->
        </div>
      </div>
      <br />
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <button
            @click="AddNewItem()"
            type="button"
            class="w250 btn btn-primary"
          >
            Add New Items
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
import { mapActions, mapState, mapMutations } from "vuex";
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength, between } from "@vuelidate/validators";
export default {
  name: "AddNewitems",
  components: {
    navbar,
  },
  validations() {
    return {
      itemName: { required, minLength: minLength(5) },
      itemsQty: { required, between: between(1, 1000) },
      itemprice: { required },
      discription: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(120),
      },
      //   pickedCategory: { required },
    };
  },
  data() {
    return {
      v$: useValidate(),
      userid: "",
      username: "",
      locationid: this.$route.params.locationid,
      locName: "",
      locAddress: "",
      pickedCategory: "",
      successMessage: "",
      errorMessage: "",
      itemName: "",
      itemsQty: 1,
      discription: "",
      itemprice: "",
      //   lastOfCategries: [],
    };
  },
  computed: {
    ...mapState([
      "isuserlaggedin",
      "loggedinuserid",
      "numofCategories",
      "listofCategories",
      "listOfCategories",
    ]),
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.redirectTo({ val: "signup" });
    } else {
      this.username = JSON.parse(user).name;
      this.userid = JSON.parse(user).id;
      this.isloggedinUser();
      this.locationid = this.$route.params.locationID;
      this.displayAllCategories({
        useridis: this.userid,
        locationidis: this.locationid,
      });
      this.canUserAcessThisLocation({
        useridis: this.userid,
        locationidis: this.locationid,
        // redirectToPage: "home",
        //      /* v-if="numofCategories > 0" */
      });
      //pass
      this.getlocationinfo(this.userid, this.locationid);
    }
  },
  async created() {
    await this.getlocationinfo(this.userid, this.locationid);
  },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations([
      "isloggedinUser",
      "displayAllCategories",
      "canUserAcessThisLocation",
    ]),
    async getlocationinfo(userid, locationid) {
      let result = await axios.get(
        `http://localhost:3000/locations?userid=${userid}&id=${locationid}`
      );
      // let locdetaills = [];
      if (result.status == 200) {
        // locdetaills = result.data;
        // this.locName = locdetaills[0].name;
        // this.locAddress = locdetaills[0].address;
        this.locName = this.name;
        this.locAddress = this.address;
      }
    },
    async AddNewItem() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("is validated");
        let result = await axios.post("http://localhost:3000/items", {
          name: this.itemName,
          price: this.itemprice,
          discription: this.discription,
          qty: this.itemsQty,
          userid: this.userid,
          //   catid: this.pickedCategory,
          locid: this.locationid,
        });
        if (result.status == 201) {
          //   this.redirectTo({ val: "home" });
          this.$router.push({
            name: "menu",
            params: { locationid: this.locationid },
          });
          setTimeout(() => {
            this.name = "";
            this.phone = "";
            this.address = "";

            this.successMessage = "";
            this.errorMessage = "";
          }, 1000);
          this.errorMessage = "";
          this.successMessage = "Added New Item";
        }
      } else {
        this.successMessage = "";
        this.errorMessage = "Your Must Fill Every Field";
        console.log("is Not validated");
      }
    },
    // getBackMenu() {
    //   this.$router.push({
    //     name: "menu",
    //     params: { locationid: this.locationid },
    //   });
    // },
  },
};
</script>

<style>
.mb {
  margin-bottom: 0;
}
.w250 {
  min-width: 250px;
}
.h200 {
  min-height: 150px !important;
}
</style>
