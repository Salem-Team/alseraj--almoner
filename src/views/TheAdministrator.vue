<template>
  <div class="admin-container">
    <v-container>
      <h1>الادمن</h1>
      <v-row
        justify="center"
        align="center"
        style="display: flex; justify-content: center; margin-top: 200px"
      >
        <v-col cols="4" md="4" style="">
          <v-card
            style="
              height: 168px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #2196f333;
            "
            class="admin-card"
            @click="goToClasses"
          >
            <h2 class="admin-title">الفصول الدراسية</h2>
          </v-card>
        </v-col>
        <v-col cols="4" md="4">
          <v-card
            style="
              height: 168px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #2196f333;
            "
            class="admin-card p-5"
          >
            <h2 class="admin-title">الإعدادات</h2>
          </v-card>
        </v-col>
        <v-col cols="4" md="4">
          <v-card
            style="
              height: 168px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: #2196f333;
            "
            class="admin-card p-5"
          >
            <h2 class="admin-title">تقديم على وظائف</h2>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "TheAdministrator",
  methods: {
    goToClasses() {
      this.$router.push({ name: "Class" });
    },
  },
};
</script>
<style>
.admin-card {
  padding: 68px;
  background-color: #2196f333;
}
</style>
