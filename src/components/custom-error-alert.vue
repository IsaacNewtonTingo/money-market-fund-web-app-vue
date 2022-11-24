<template>
  <div class="customErrorAlert">
    <h3 class="alertTitle">Failed</h3>
    <p class="alertBody">
      {{ errorMessage }}
    </p>
  </div>
</template>
  
  <script>
export default {
  name: "ErrorAlert",
  props: ["errorMessage"],
  mounted() {
    setTimeout(() => {
      let newMessage = this.errorMessage;
      newMessage = "";

      this.$emit("update-error-message", newMessage);
    }, 5000);
  },
};
</script>
  
  <style>
.customErrorAlert {
  background: rgb(175, 0, 0);
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  right: 0;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 20px 0 0;
  z-index: 2;
  width: 200px;
}
.customErrorAlert p {
  font-size: 10px;
  color: white;
  font-weight: 500;
}
.customErrorAlert h3 {
  color: white;
  margin: 0 0 10px 0;
}
</style>