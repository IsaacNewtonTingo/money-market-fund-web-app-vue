<template>
  <div class="leftFloat">
    <div @click="this.goToProfile" class="profileItem">
      <img
        class="profilePic"
        src="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM="
        alt=""
      />

      <div class="rightSemiTexts">
        <p class="nameText">{{ firstName }} {{ lastName }}</p>
        <p class="viewProfText">View profile</p>
      </div>
    </div>

    <nav class="leftInteriorNav">
      <div class="linky">
        <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
      </div>

      <div class="linky">
        <router-link :to="{ name: 'allUserPlans' }"
          >My savings plans</router-link
        >
      </div>

      <div class="linky">
        <router-link :to="{ name: 'myTransactions' }"
          >My transactions</router-link
        >
      </div>

      <div class="linky">
        <router-link :to="{ name: 'myWithdrawals' }"
          >My withdrawals</router-link
        >
      </div>

      <div class="linky">
        <router-link :to="{ name: 'settings' }">Logout</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["firstName", "lastName", "email", "phoneNumber", "active"],
  name: "LeftFloat",

  methods: {
    goToProfile() {
      this.$router.push("profile");
    },
  },
};
</script>

<style>
.leftInteriorNav {
  display: flex;
  flex-direction: column;
  background: none;
  padding: 0;
  padding: 20px 0;
}
.leftFloat {
  width: 20%;
  background: rgb(248, 255, 250);
  height: 100%;
  position: fixed;
  box-shadow: rgb(238, 238, 238) 5px 5px 5px;
  padding: 20px;
}

.linky {
  padding: 30px;
  border-bottom: solid 1px rgb(237, 237, 237);
}

nav a {
  color: #00381f;
  text-decoration: none;
  font-weight: 800;
}

nav a.router-link-exact-active {
  color: #ff6a00;
}

.profileItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  object-fit: cover;
  background: rgba(159, 184, 176, 0.9);
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  border: solid 1px rgb(104, 166, 146);
  cursor: pointer;
}

.profilePic {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  object-fit: cover;
}
.nameText {
  font-weight: 800;
}
.rightSemiTexts {
  display: flex;
  flex-direction: column;
}
.viewProfText {
  color: rgb(71, 122, 106);
  font-weight: 600;
  font-size: 12px;
}
</style>
