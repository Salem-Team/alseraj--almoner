<template>
<<<<<<< HEAD
    <div>
=======
    <div class="visible">
>>>>>>> ca7a465 (add Add_admin , admin , img)
        <div class="right">
            <v-breadcrumbs>
                <v-breadcrumbs-item @click="$router.push('/admin')" link>
                    الإشراف
                </v-breadcrumbs-item>
                <v-breadcrumbs-divider />
                <v-breadcrumbs-item
                    @click="$router.push('/Modifications')"
                    link
                >
                    الإعدادات
                </v-breadcrumbs-item>
            </v-breadcrumbs>
        </div>
        <v-container class="d-flex justify-space-evenly mb-4 mt-16">
<<<<<<< HEAD
            <v-card
                class="card text-center mt-3 bg-grey-lighten-3"
                prepend-icon="mdi-account"
                link
                width="15%"
                @click="$router.push('/Add_admin')"
            >
                <v-card-title>إدارة المشرف</v-card-title>
            </v-card>
            <v-card
                class="card text-center mt-3 bg-grey-lighten-3"
                prepend-icon="mdi-newspaper-variant-multiple-outline"
                @click="$router.push('/Add_News')"
                width="15%"
            >
                <v-card-title>الأخبار</v-card-title>
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
=======
>>>>>>> ca7a465 (add Add_admin , admin , img)
        </v-container>
    </div>
</template>

<script>
export default {
    components: {},
};
</script>
<style lang="scss" scoped>
.right {
<<<<<<< HEAD
    width: 95% !important;
    margin: auto;
    margin-top: 40px;
    background: var(--secound-color);
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3px;
    border-radius: 5px;
    color: var(--main-color);
=======
    width: 90% !important;
    margin: auto;
>>>>>>> ca7a465 (add Add_admin , admin , img)
    font-weight: bold;
    font-size: 20px;
    border-bottom: 5px solid var(--secound-color);
    padding: 0;
    .v-breadcrumbs-item:first-child {
        color: var(--main-color);
        cursor: pointer;
    }
    .v-breadcrumbs {
        padding: 16px 0;
    }
}
.v-container {
    margin: 20px auto !important;

    padding: 0;
    justify-content: space-between !important;
    flex-direction: column;
    gap: 20px;
}
.card {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    font-size: 20px;
    color: var(--main-color);
    font-weight: bold;
    padding: 20px;
    text-align: center;
    width: 100%;
}
@media (max-width: 599px) {
}
@media (min-width: 600px) and (max-width: 768px) {
}
@media (min-width: 769px) {
    .v-container {
        flex-direction: row;
        gap: 15px;
    }
    .card {
        width: 32%;
    }
}
img {
    width: 50px;
}
.visible {
    opacity: 0;
    animation: fadeIn 1.3s ease-in-out forwards;
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
