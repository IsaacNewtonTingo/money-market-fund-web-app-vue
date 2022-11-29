<template>
  <LeftFloat />

  <div v-if="joinPlanModal" class="joinPlanModal">
    <form class="joinPlanForm">
      <p class="lanNameText">Lock savings</p>
      <label>Duration of saving(In days)</label>
      <input placeholder="e.g 90" type="text" />

      <button
        class="
          focus:outline-none
          text-white
          bg-green-700
          hover:bg-green-800
          focus:ring-4 focus:ring-green-300
          font-medium
          rounded-lg
          text-sm
          px-5
          py-2.5
          mr-2
          mb-2
          dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
        "
      >
        Submit
      </button>
      <button class="cancelPlan" @click="this.joinPlanModal = false">
        Cancel
      </button>
    </form>
  </div>

  <div class="mainPlanView">
    <!-- <h1 class="planText">Our savings plan</h1> -->

    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li
        v-for="savingPlan in savingsPlans"
        :key="savingPlan._id"
        class="mb-10 ml-6"
      >
        <span
          class="
            flex
            absolute
            -left-3
            justify-center
            items-center
            w-6
            h-6
            bg-blue-200
            rounded-full
            ring-8 ring-white
            dark:ring-gray-900 dark:bg-blue-900
          "
        >
          <svg
            aria-hidden="true"
            class="w-3 h-3 text-blue-600 dark:text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
        <h3
          class="
            flex
            items-center
            mb-1
            text-lg
            font-semibold
            text-gray-900
            dark:text-white
          "
        >
          {{ savingPlan.investmentPlanName }}
        </h3>
        <time
          class="
            block
            mb-2
            text-sm
            font-normal
            leading-none
            text-gray-400
            dark:text-gray-500
          "
          >{{ savingPlan.tagLine }}</time
        >
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          {{ savingPlan.description }}
        </p>

        <button
          @click="this.joinPlanModal = true"
          type="button"
          class="
            joinPlanBTN
            focus:outline-none
            text-white
            bg-green-700
            hover:bg-green-800
            focus:ring-4 focus:ring-green-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            mr-2
            mb-2
            dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
          "
        >
          Create plan
        </button>
      </li>
    </ol>
  </div>
</template>

<script>
import LeftFloat from "@/components/leftFloat.vue";
import axios from "axios";
export default {
  name: "savingPlans",
  components: { LeftFloat },
  data() {
    return {
      savingsPlans: [],
      joinPlanModal: true,
    };
  },
  methods: {
    async getSavingsPlans() {
      await axios
        .get(`http://localhost:3000/api/admin/get-savings-plan`)
        .then((response) => {
          this.savingsPlans = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getSavingsPlans();
  },
};
</script>

<style>
.mainPlanView {
  width: 60%;
  float: right;
  margin: 20px 80px 0 0;
}
.planText {
  margin: 20px 0 100px 0;
  color: teal;
  font-weight: 800;
  font-size: 30px;
}
.joinPlanBTN {
  width: 200px;
  background-color: cadetblue;
  margin: 40px 0;
  color: white;
  font-size: 14px;
}
.joinPlanModal {
  width: 100vw;
  height: 100vh;
  background: rgba(159, 184, 176, 0.95);
  display: flex;
  flex: 1;
  position: absolute;
  z-index: 1;
  align-items: center;
  justify-content: center;
}
.joinPlanForm {
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
.joinPlanForm {
  display: flex;
  flex-direction: column;
}
.joinPlanForm p {
  color: white;
  font-weight: 800;
  margin: 0 0 20px 0;
}
.joinPlanForm button {
  height: 50px;
  margin: 20px 0 0 0;
  color: white;
  font-weight: 800;
}
.joinPlanForm input {
  border-radius: 10px;
  padding: 0 20px;
}
.cancelPlan {
  border: solid 2px rgb(79, 201, 138);
}
</style>