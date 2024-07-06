<template>
  <div class="right">
    <v-breadcrumbs :items="['الاشراف', 'الاعدادات']"></v-breadcrumbs>
  </div>
  <v-container class="d-flex justify-space-evenly mb-4 mt-16">
    <v-card
      class="card text-center mt-3 bg-grey-lighten-3"
      prepend-icon="mdi-account"
      link
      width="15%"
    >
      <v-card-title>إضافة أدمن</v-card-title>
    </v-card>
    <v-card
      class="card text-center mt-3 bg-grey-lighten-3"
      prepend-icon="mdi-newspaper-variant-multiple-outline"
      @click="$router.push('/Add_News')"
      width="15%"
    >
      <v-card-title> الأخبار</v-card-title>
    </v-card>
    <v-card
      class="card text-center mt-3 bg-grey-lighten-3"
      prepend-icon="mdi-frequently-asked-questions"
      link
      width="15%"
    >
      <v-card-title>أسئلة شائعة</v-card-title>
    </v-card>
    <v-card
      class="card text-center mt-3 bg-grey-lighten-3"
      prepend-icon="mdi-image"
      link
      @click="$router.push('/Photo_Gallery')"
      width="15%"
    >
      <v-card-title>معرض الصور</v-card-title>
    </v-card>
  </v-container>
</template>

<script>
export default {
  components: {},
};
</script>
<style scoped>
.right {
  margin-top: 40px;
  background: var(--secound-color);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3px;
  border-radius: 5px;
  color: var(--main-color);
  font-weight: bold;
  font-size: 20px;
}
</style>
