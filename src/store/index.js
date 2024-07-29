import { createStore } from "vuex";
import router from "../router/index";
import axios from "axios";
const state = {
  isuserlaggedin: "",
  loggedinuserid: "",
  numofCategories: "",
  listofCategories: [],
  listoflocation: [],
  listofitems: [],
};
const getters = {};
const mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload });
  },
  isloggedinUser(state) {
    let user = localStorage.getItem("user-info");
    if (user) {
      state.isuserlaggedin = true;
      state.loggedinuserid = JSON.parse(user).id;
    } else {
      state.isuserlaggedin = false;
    }
  },
  async displayAllCategories(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/Categories?userid=${payload.useridis}&locationid=${payload.locationidis}`
    );
    if (result.status == 200) {
      state.listofCategories = result.data;
      state.numofCategories = state.listofCategories.length;
    }
  },
  async canUserAcessThisLocation(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/locations?userid=${payload.useridis}&id=${payload.locationidis}`
    );
    if (result.status == 200) {
      state.listoflocation = result.data;
      //return one Array
      if (state.listoflocation.length !== 1) {
        this.commit("redirectTo", payload.redirectToPage);
      }
    }
  },

  async canUserAcessThisCategory(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/Categories?userid=${payload.useridis}&locationid=${payload.locationidis}&id=${payload.catidis}`
    );
    if (result.status == 200) {
      state.listofCategories = result.data;
      if (state.listoflocation.length !== 1) {
        this.commit("redirectTo", payload.redirectToPage);
      }
    }
  },
  async canUserAcessThisitems(state, payload) {
    let result = await axios.get(
      `http://localhost:3000/items?userid=${payload.useridis}&locationid=${payload.locationidis}&id=${payload.itemidis}`
    );
    if (result.status == 200) {
      state.listofitems = result.data;
      if (state.listofitems.length !== 1) {
        this.commit("redirectTo", payload.redirectToPage);
      }
    }
  },
};
const actions = {
  redirectTo({ commit }, payload) {
    commit("redirectTo", payload.val);
  },
};
export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
