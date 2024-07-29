<template>
  <navbar />
  <div class="container">
    <form @click.prevent>
      <div class="clearfix"></div>
      <router-link :to="{ name: 'menu', params: { locid: locationid } }">
        <button type="button" class="float-start btn btn-info">
          Back To Menu
        </button>
      </router-link>
      <div class="clearfix"></div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <h4>Item Name : {{ itemName }}</h4>
          <hr />
          <p class="text-danger">Are You Sure To Want To delete This Items ?</p>
        </div>
      </div>
      <div class="row g-3 align-items-center">
        <div class="col-auto mx-auto">
          <button class="btn btn-info" @click="goback()">Go Back</button> &nbsp;
          &nbsp; &nbsp;
          <button class="btn btn-danger" @click="deleteitems()">
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
  name: "delete-items",
  components: {
    navbar,
  },
  data() {
    return {
      //   locationid: "",
      locationid: this.$route.params.locationid,
      id: this.$route.params.id,
      itemid: "",
      userid: "",
      locationData: [],
      successMessage: "",
      errorMessage: "",
      //   itemName: "",
      allitemsidis: [],
      itemName: "",
      itemsQty: 1,
      discription: "",
      itemprice: "",
      pickedCategory: "",
    };
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "signup" });
    } else {
      this.locationid = this.$route.params.locationid;
      //   this.itemid = this.$route.params.locationid;
      this.userid = JSON.parse(user).id;
      //   this.CanCurrentUserAccessThisLocation();
      this.canUserAcessThisitems({
        useridis: this.userid,
        locationidis: this.locationid,
        itemidis: this.itemid,
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
    this.getiteminfo(this.userid, this.locationid, this.itemid);
  },
  methods: {
    ...mapMutations(["canUserAcessThisitems"]),
    goback() {
      this.$router.push({
        name: "menu",
        params: { locationid: this.locationid },
      });
    },
    async getiteminfo(userid, locationid) {
      let result = await axios.get(
        `http://localhost:3000/items?userid=${userid}&locid=${locationid}$id=${this.itemid}`
      );
      let resultdate = result.data;
      if (result.status == 200) {
        this.discription = resultdate[0].discription;
        this.itemName = resultdate[0].name;
        this.itemprice = resultdate[0].price;
        this.itemsQty = resultdate[0].qty;
        // this.pickedCategory = resultdate.catid;
        // console.log(resultdate);
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
    // async CanCurrentUserAccessThisLocation() {
    //   let result = await axios.get(
    //     `http://localhost:3000/locations?id=${this.locationid}&userid=${this.userid}`
    //   );
    //   if (result.status == 200 && result.data.length > 0) {
    //     this.locationData = result.data;
    //     this.name = this.locationData[0].name;
    //   } else {
    //     this.$router.push({ name: "home" });
    //   }
    // },
    async deleteitems() {
      let result = await axios.delete(`http://localhost:3000/items/${this.id}`);
      //   let allresult = [];
      //   for (let i = 0; i < this.allitemsidis.length; i++) {
      //     let result = await axios.delete(
      //       `http://localhost:3000/items/${this.allitemsidis[i]}`
      //     );
      //     if (result.status == 200) {
      //       allresult.push(true);
      //     } else {
      //       allresult.push(false);
      //     }
      //   }
      try {
        // console.log("this is result", result);
      } catch (error) {
        console.log(error);
      }

      //   console.log(result);
      if (result.status == 200) {
        this.successMessage = "Item is Deleted ....";
        this.errorMessage = "";
        setTimeout(() => {
          this.$router.push({
            name: "menu",
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
