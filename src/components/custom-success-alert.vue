<template>
  <div class="customSuccessAlert">
    <h3 class="alertTitle">Success</h3>
    <p class="alertBody">
      {{ successMessage }}
    </p>
  </div>
</template>

<script>
export default {
  name: "SuccessAlert",
  props: ["successMessage"],
};
</script>

<style>
.customSuccessAlert {
  background: rgb(2, 144, 0);
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  right: 0;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 20px 0 0;
}
.customSuccessAlert p {
  font-size: 10px;
  color: white;
  font-weight: 500;
}
.customSuccessAlert h3 {
  color: white;
  margin: 0 0 10px 0;
}
</style>