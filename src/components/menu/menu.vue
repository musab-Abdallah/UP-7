<template>
  <navbar />
  <div class="container">
    <div>
      <router-link
        :to="{ name: 'ViewCategories', params: { locid: locationid } }"
      >
        <button type="button" class="float-start btn btn-success">
          View/Add Categories
        </button>
      </router-link>
      <router-link :to="{ name: 'AddNewitems', params: { locid: locationid } }">
        <button type="button" class="float-end btn btn-success">
          Add New Item
        </button>
      </router-link>
    </div>
    <div class="clearfix"></div>
    <div class="text-center">
      <h1 class="mb0">{{ locName }}</h1>
      <p class="text-muted">{{ locAddress }}</p>
    </div>
    <div class="clearfix"></div>
    <div class="each-category">
      <div class="" v-for="(cat, i) in listofUserCategory" :key="i">
        <div class="row">
          <div class="row col-12 cat-Name">
            <h1 class="text-center bg-light p-1">{{ cat.name }}</h1>
          </div>
          <div class="each-items" v-for="(item, h) in listofUseritems" :key="h">
            <!-- <div v-if="cat.id == item.id"> -->
            <div>
              <h3 class="item-name float-start">{{ item.name }}</h3>
              <div class="item-price float-end">Price: {{ item.price }}</div>
            </div>
            <div class="clearfix"></div>
            <p class="item-discription text-muted">{{ item.discription }}</p>
            <p class="item-discription float-start text-muted">
              Avalible Qty: {{ item.qty }}
            </p>
            <div class="clearfix"></div>
            <!-- </div> -->
            <div class="p-1 mt-2">
              <div class="availabe-items float-start">
                <!-- <router-link
                  :to="{ name: 'Updateitems', params: { locid: locationid } }"
                >
                  <button type="button" class="float-end btn btn-info">
                    Update
                  </button>
                </router-link>
              </div>
              <div class="item-price float-end">
                <router-link
                  :to="{ name: 'deleteitems', params: { locid: locationid } }"
                >
                  <button type="button" class="float-end btn btn-danger">
                    Delete
                  </button>
                </router-link> -->
              </div>
            </div>
          </div>
          <!-- <div class="clearfix"></div> -->
          <br />
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/header/navbar.vue";
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "men-u",
  components: {
    navbar,
  },
  data() {
    return {
      id: this.$route.params.locationid,
      userid: "",
      username: "",
      locationid: "",
      locName: "",
      locAddress: "",
      listofUserCategory: [],
      listofUseritems: [],
    };
  },
  computed: {
    ...mapState([
      "isuserlaggedin",
      "loggedinuserid",
      "numofCategories",
      "listofCategories",
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
      // this.canUserAcessThisLocation({
      //   useridis: this.userid,
      //   locationidis: this.locationid,
      //   redirectToPage: "home",
      // });
      //pass
      // this.getlocationinfo(this.userid, this.locationid);
      this.getCurrentUserCategory(this.userid, this.locationid);
      this.getCurrentUserItems(this.userid, this.locationid);
    }
  },
  // async created() {
  //   await this.getlocationinfo(this.userid, this.locationid);
  // },
  methods: {
    ...mapActions(["redirectTo"]),
    ...mapMutations([
      "isloggedinUser",
      "displayAllCategories",
      // "canUserAcessThisLocation",
    ]),

    async getCurrentUserCategory(userid, locid) {
      let result = await axios.get(
        `http://localhost:3000/Categories?userid=${userid}&locid=${locid}`
      );
      if (result.status == 200) {
        this.listofUserCategory = result.data;
        console.table(this.listofUserCategory);
      }
    },
    async getCurrentUserItems(userid, locid) {
      let result = await axios.get(
        `http://localhost:3000/items?userid=${userid}&locid=${locid}`
      );
      if (result.status == 200) {
        this.listofUseritems = result.data;
        console.table(this.listofUseritems);
      }
    },
    // async getlocationinfo(userid, locationid) {
    //   let result = await axios.get(
    //     `http://localhost:3000/locations?userid=${userid}&id=${locationid}`
    //   );
    //   let locdetaills = [];
    //   if (result.status == 200) {
    //     locdetaills = result.data;
    //     this.locName = locdetaills[0].name;
    //     this.locAddress = locdetaills[0].address;
    //     this.locName = this.name;
    //     this.locAddress = this.address;
    //   }
    // },
  },
};
</script>

<style>
.mb {
  margin-bottom: 0;
}
.item-discription {
  padding-top: 12px;
  min-height: 100px;
}
</style>
