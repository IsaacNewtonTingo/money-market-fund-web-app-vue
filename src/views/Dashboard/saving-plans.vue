<template>
  <LeftFloat />
</template>

<script>
import LeftFloat from "@/components/leftFloat.vue";
export default {
  name: "savingPlans",
  components: { LeftFloat },
  data() {
    return {
      userID: localStorage.getItem("userID"),
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    };
  },
};
</script>

<style>
</style>