<template>
  <div class="table-responsive">
    <table
      class="table caption-top table table-hover"
      v-if="alllocations.length > 0"
    >
      <caption>
        <span> List Of Locations ({{ alllocations.length }}) </span>
        <span class="float-end">
          <router-link :to="{ name: 'deleteAllloction' }">
            <button class="btn btn-danger">Delete All</button>
          </router-link>
        </span>
      </caption>
      <thead class="table-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Address</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(loc, i) in alllocations" :key="i">
          <th scope="row">{{ loc.name }}</th>
          <td>{{ loc.phone }}</td>
          <td>{{ loc.address }}</td>
          <td>
            <router-link
              :to="{ name: 'deletelocation', params: { locationid: loc.id } }"
            >
              <button class="btn btn-danger">Delete</button> </router-link
            >&nbsp;
            <router-link
              :to="{ name: 'Updatelocation', params: { locationid: loc.id } }"
            >
              <button class="btn btn-info">Update</button> </router-link
            >&nbsp;
            <router-link :to="{ name: 'menu', params: { locationid: loc.id } }">
              <button class="btn btn-success">Menu</button> </router-link
            >&nbsp;
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="alert alert-warning" role="alert">No Location Added</div>
  </div>
</template>

<script>
export default {
  name: "user-location",
  props: ["alllocations"],
};
</script>

<style></style>
