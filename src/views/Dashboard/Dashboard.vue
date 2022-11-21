<template>
  <LeftFloat
    :firstName="firstName"
    :lastName="lastName"
    :email="email"
    :phoneNumber="phoneNumber"
  />
</template>

<script>
import LeftFloat from "@/components/leftFloat.vue";
import axios from "axios";

export default {
  name: "Dashboard",
  components: { LeftFloat },
  data() {
    return {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    };
  },
  async created() {
    await axios
      .get(
        `http://localhost:3000/api/user/get-user-profile/${localStorage.getItem(
          "userID"
        )}`
      )
      .then((response) => {
        if (response.data) {
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
          this.email = response.data.email;
          this.phoneNumber = response.data.phoneNumber;
        } else {
          console.log(response.data.message);
        }
      });
  },
};
</script>

<style>
</style>