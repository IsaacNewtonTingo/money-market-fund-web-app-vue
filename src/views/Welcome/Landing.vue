<template>
  <TopNav />

  <div class="display">
    <div class="leftIntro">
      <h1>
        Take care of uncertainity. Start saving today with as low as KSH.100 as
        your money gains 10-10% interest. Your money is safe with us.
      </h1>

      <button class="getStartedBTN">Get started</button>
    </div>
    <img src="../../assets/displayImg.png" alt="display image" />
  </div>

  <div class="aboutUs" id="aboutUs"></div>
</template>

<script>
import TopNav from "../../components/TopNav.vue";

export default {
  name: "landing",
  components: { TopNav },
  methods: {
    goToSignIn() {
      this.$router.push("login");
    },
    goToSignUp() {
      this.$router.push("signup");
    },
  },
};
</script>

<style>
.display {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 80px;
  background-image: linear-gradient(
    rgb(248, 255, 250),
    rgb(206, 255, 234),
    rgb(248, 255, 250)
  );
}
.leftIntro {
  width: 45%;
}
.display img {
  width: 60%;
}
.getStartedBTN {
  width: 200px;
  margin: 40px 0;
  background-color: darkgreen;
  color: white;
  font-weight: 800;
}
.leftIntro h1 {
  font-weight: bolder;
  font-size: 30px;
}
.aboutUs {
  padding: 80px;
}
</style>