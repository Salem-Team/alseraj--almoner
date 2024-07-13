<template>
    <div>
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
            هذه الصفحة غير موجودة
        </v-container>
    </div>
</template>

<script>
export default {
    components: {},
};
</script>
<style scoped>
.right {
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
    font-weight: bold;
    font-size: 20px;
}
</style>
