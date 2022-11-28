<template>
  <div v-if="isLoading" class="loadingScreen">
    <img src="../../assets/loading.gif" alt="" />
  </div>

  <div v-else>
    <LeftFloat
      :firstName="firstName"
      :lastName="lastName"
      :email="email"
      :phoneNumber="phoneNumber"
    />

    <div v-if="showModal" class="modalContainer">
      <div class="innerModal">
        <form @submit.prevent="depositFunds">
          <label for="">Phone number</label>
          <input
            type="tel"
            placeholder="e.g 254724753175"
            v-model="this.phoneNumber"
          />

          <label for="">Amount</label>
          <input v-model="this.amount" type="number" placeholder="e.g 2000" />

          <button :disabled="isSubmitting" class="depositBTN">
            <img
              class="loadingGif"
              v-if="isSubmitting"
              src="../../assets/loading.gif"
              alt=""
            />
            <div v-else>Deposit</div>
          </button>
          <button @click="this.showModal = false" class="withdrawBTN">
            Cancel
          </button>
        </form>
      </div>
    </div>

    <div class="rightItems">
      <h1 class="heading">Here are your savings plans</h1>

      <div class="savingsPlans">
        <!-- <div class="combText">
          <p class="subHeading">Your savings plans</p>
          <router-link to="/dashboard" class="viewAll">View all</router-link>
        </div> -->

        <div class="planContainer">
          <div
            v-for="userPlan in userPlans"
            :key="userPlan._id"
            class="planItem"
          >
            <p class="planName">
              {{ userPlan.plan.investmentPlanName }}
            </p>

            <div class="extraDetails">
              <p class="keyNames">
                <span>Amount deposited</span> KSH.
                {{ userPlan.amountAvailable.toFixed(2) }}
              </p>

              <p class="keyNames">
                <span>Expected interest</span> KSH.
                {{
                  (
                    (userPlan.plan.interestRate / 100) *
                    userPlan.amountAvailable
                  ).toFixed(2)
                }}
              </p>

              <p class="keyNames">
                <span>Expected income</span> KSH.
                {{
                  (
                    (userPlan.plan.interestRate / 100) *
                      userPlan.amountAvailable +
                    userPlan.amountAvailable
                  ).toFixed(2)
                }}
              </p>

              <p class="keyNames">
                <span>Maturity date</span>
                {{
                  userPlan.maturityDate != null
                    ? getMaturityDate(userPlan.maturityDate)
                    : "n/a"
                }}
              </p>
            </div>

            <div class="btns">
              <button
                @click="setShowModal({ planID: userPlan._id })"
                class="depositBTN"
              >
                Deposit
              </button>

              <button
                disabled
                v-if="getMaturityDate(userPlan.maturityDate) > getTodayDate()"
                @submit="withdrawFunds"
                class="notYetBTN"
              >
                Not yet time
              </button>

              <button v-else @submit="withdrawFunds" class="withdrawBTN">
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftFloat from "@/components/leftFloat.vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "allUserPlans",
  components: { LeftFloat },
  data() {
    return {
      userID: localStorage.getItem("userID"),
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",

      amount: "",
      showModal: false,
      isLoading: true,
      isSubmitting: false,

      planID: "",

      userPlans: [],
    };
  },
  methods: {
    getMaturityDate(date) {
      return moment(date).format("MMM Do YYYY");
    },
    getTodayDate() {
      return moment().format("MMM Do YYYY");
    },
    setShowModal({ planID }) {
      this.showModal = true;
      this.planID = planID;
    },
    async depositFunds() {
      this.isSubmitting = true;
      await axios
        .post(`http://localhost:3000/api/user/payments/make-payment/`, {
          phoneNumber: parseInt(this.phoneNumber),
          userID: this.userID,
          planID: this.planID,
          amount: this.amount,
        })
        .then((response) => {
          this.isSubmitting = false;
          this.planID = "";
          this.amount = "";

          console.log(response.data);

          if (response.data.ResponseCode === "0") {
            //stk push sent
            alert(
              `${response.data.ResponseDescription}. Please check your phone for an M-PESA prompt to complete transaction.`
            );
            console.log("Success");
          } else {
            //some error has occured
            console.log("An error occured");
          }
        })
        .catch((err) => {
          this.isSubmitting = false;
          console.log(err);
        });
    },
  },
  async mounted() {
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
      })
      .catch((err) => {
        this.isLoading = false;
        console.log(err);
      });

    await axios
      .get(
        `http://localhost:3000/api/user/user-plans/get-my-plans/${localStorage.getItem(
          "userID"
        )}`
      )
      .then((response) => {
        this.userPlans = response.data;
        this.isLoading = false;
      })
      .catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
  },
};
</script>

<style>
.rightItems {
  float: right;
  padding: 40px;
  width: 70%;
  background: rgb(248, 255, 250);
}
.modalContainer {
  height: 100%;
  width: 100%;
  background: rgba(159, 184, 176, 0.95);
  display: flex;
  flex: 1;
  position: absolute;
  z-index: 1;
  align-items: center;
  justify-content: center;
  right: 20px;
}
.loadingScreen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  text-align: center;
  flex: 1;
  background: rgb(248, 255, 250);
}
.loadingScreen img {
  width: 100px;
  height: 100px;
}
.viewAll {
  text-decoration-line: underline;
  font-weight: 800;
  color: #006b4d;
}
.innerModal {
  background: linear-gradient(
    146.03deg,
    #091e18 13.77%,
    rgba(159, 184, 176, 0) 148.56%
  );
  filter: drop-shadow(2px 2px 4px #000000);
  padding: 40px;
  border-radius: 10px;
  width: 30%;
}
.heading {
  color: #006b4d;
}
.savingsPlans {
  margin: 40px 0;
}
.subHeading {
  font-weight: 800;
  color: #006b4d;
}
.planContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
  flex-wrap: wrap;
}
.combText {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.planName {
  color: white;
  font-weight: 800;
  text-align: center;
  margin: 10px 0;
  font-size: 16px;
}
.planItem {
  width: 20%;
  background: linear-gradient(
    146.03deg,
    #091e18 13.77%,
    rgba(159, 184, 176, 0) 148.56%
  );
  filter: drop-shadow(2px 2px 4px #000000);
  border-radius: 10px;
  height: 300px;
  padding: 20px;
  margin: 0 0 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.btns {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.loadingGif {
  width: 30px;
  height: 30px;
  object-fit: cover;
}
.keyNames {
  color: rgb(235, 235, 235);
  font-weight: 600;
  font-size: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
}
.keyNames span {
  color: #9a9a9a;
}
.extraDetails {
  width: 100%;
}
.depositBTN {
  background: #195846;
  font-size: 10px;
}
.withdrawBTN {
  background: none;
  border: solid #9a9a9a 1px;
  font-size: 10px;
}
.notYetBTN {
  background: none;
  border: solid #4b4b4b 1px;
  font-size: 10px;
  color: #828282;
}
</style>