import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import signup from "../views/Signup.vue";
import login from "../views/Login.vue";
import profile from "../views/profile.vue";
import Errorpage from "../views/Errorpage.vue";
import updateprofile from "../components/profile/updateProfile.vue";
import addnewlocation from "../components/location/addnewlocation.vue";
import deletelocation from "../components/location/deletelocation.vue";
import deleteAllloction from "../components/location/deleteAllloction.vue";
import Updatelocation from "../components/location/Updatelocation.vue";
import menu from "../components/menu/menu.vue";
import AddnewCategories from "../components/menu/AddnewCategories.vue";
import ViewCategories from "../components/menu/ViewCategories.vue";
import UpdateCategory from "../components/menu/UpdateCategory.vue";
import deleteCategory from "../components/menu/deleteCategory.vue";
import AddNewitems from "../components/menu/AddNewitems.vue";
import Updateitems from "../components/menu/Updateitems.vue";
import deleteitems from "../components/menu/deleteitems.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: signup,
  },
  {
    path: "/updateprofile",
    name: "updateprofile",
    component: updateprofile,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/add-new-location",
    name: "addnewlocation",
    component: addnewlocation,
  },
  {
    path: "/deletelocation/:locationid",
    name: "deletelocation",
    component: deletelocation,
  },
  {
    path: "/deleteAllloction",
    name: "deleteAllloction",
    component: deleteAllloction,
  },
  {
    path: "/menu/location/:locationid",
    name: "menu",
    component: menu,
  },
  {
    path: "/deleteitems/:locationid",
    name: "deleteitems",
    component: deleteitems,
  },
  {
    path: "/AddnewCategories/:locationid",
    name: "AddnewCategories",
    component: AddnewCategories,
  },
  {
    path: "/Updateitems/:locationid/",
    name: "Updateitems",
    component: Updateitems,
  },
  {
    path: "/ViewCategories/:locationid",
    name: "ViewCategories",
    component: ViewCategories,
  },
  {
    path: "/UpdateCategory/:locationid/:catid",
    name: "UpdateCategory",
    component: UpdateCategory,
  },
  {
    path: "/deleteCategory/:locationid/:catid",
    name: "deleteCategory",
    component: deleteCategory,
  },
  {
    path: "/Updatelocation/:locationid",
    name: "Updatelocation",
    component: Updatelocation,
  },
  {
    path: "/AddNewitems/:locationid",
    name: "AddNewitems",
    component: AddNewitems,
  },
  //last page for error

  {
    path: "/:catchAll(.*)",
    name: "Errorpage",
    component: Errorpage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
