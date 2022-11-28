<template>
  <LeftFloat />

  <div class="mainView">
    <h1 class="planText">Our savings plan</h1>
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-10 ml-6">
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
          Lock savings plan
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
          >Time-bound plan</time
        >
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          This is a savings plan that literally help you take care of the
          future. When you create a lock savings plan, you indicate the duration
          in whick you want your money locked. You will not be able to withdraw
          any amount untill that time comes. You can keep making deposits to
          your account as it grows with annual interest of 20%
        </p>
        <button class="joinPlanBTN">Create plan</button>
      </li>
      <li class="mb-10 ml-6">
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
        <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          Flex savings plan
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
          >Flexible saving plan</time
        >
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">
          You just want your money secure somewhere else other than your M-Pesa
          account or bank account, this is the plan for you. This plan enables
          you to save whatever amount you have for as long as you want. You can
          withdraw your money anytime you want and it will be sent to your
          M-Pesa number. Withdrawals sometimes take up to 2 days but we try to
          make it as quick as possible. Your money also grows at the rate of 15%
          per year
        </p>
        <button class="joinPlanBTN">Create plan</button>
      </li>
    </ol>
  </div>
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
.mainView {
  width: 60%;
  float: right;
  margin: 0 80px 0 0;
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
</style>