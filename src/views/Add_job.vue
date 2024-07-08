<template>
    <img
        style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 245px;
        "
        v-if="jobs.loading"
        src="../assets/Spinner@1x-1.0s-200px-200px.svg"
        alt=""
    />
    <div v-if="!jobs.loading">
        <div class="use">
            <div class="title">
                <div class="right">
                    <v-breadcrumbs>
                        <v-breadcrumbs-item
                            @click="$router.push('/admin')"
                            link
                        >
                            الإشراف
                        </v-breadcrumbs-item>
                        <v-breadcrumbs-divider />
                        <v-breadcrumbs-item
                            @click="$router.push('/Add_Job')"
                            link
                        >
                            الوظائف
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                </div>
                <div class="left">
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-badge
                                color="error"
                                :content="jobs.counter.counter"
                            >
                                <v-icon
                                    class="icon"
                                    v-bind="props"
                                    @click="jobs.Update_counter"
                                    >mdi-bell-outline</v-icon
                                >
                            </v-badge>
                        </template>
                        <v-list>
                            <v-list-item
                                v-for="notification in notifications"
                                :key="notification.id"
                                @click="
                                    jobs.delete_notifications(notification.id)
                                "
                            >
                                <v-list-item-title
                                    >{{ notification.text }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <font-awesome-icon
                        @click="dialog = true"
                        :icon="['fas', 'plus']"
                    />
                </div>
            </div>
        </div>
        <v-dialog v-model="dialog" width="90%">
            <v-card width="100%" class="popup">
                <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h4 ps-2" style="color: var(--main-color)">
                        إضافة وظيفة
                    </div>
                    <v-btn
                        style="color: var(--main-color)"
                        icon="mdi-close"
                        variant="text"
                        @click="dialog = false"
                    ></v-btn>
                </v-card-title>
                <form ref="form" @submit.prevent class="ma-auto">
                    <v-text-field
                        v-model="Job.title"
                        type="text"
                        label="عنوان"
                        variant="outlined"
                        required
                    ></v-text-field>

                    <v-textarea
                        v-model="Job.description"
                        label="وصف قصير"
                        :counter="150"
                        variant="outlined"
                        required
                    ></v-textarea>

                    <v-btn
                        class="d-flex align-center mt-4 mb-10"
                        type="submit"
                        color="primary"
                        :loading="loading"
                        :disabled="loading"
                        @click="jobs.Add_Jobs"
                    >
                        نشر
                    </v-btn>
                </form>
            </v-card></v-dialog
        >
        <v-dialog v-model="dialog_1" width="90%">
            <v-card width="100%" class="popup">
                <v-card-title class="d-flex justify-space-between align-center">
                    <div class="text-h4 ps-2" style="color: var(--main-color)">
                        تعديل الوظيفة
                    </div>
                    <v-btn
                        style="color: var(--main-color)"
                        icon="mdi-close"
                        variant="text"
                        @click="dialog_1 = false"
                    ></v-btn>
                </v-card-title>
                <form ref="form" @submit.prevent class="ma-auto">
                    <v-text-field
                        v-model="jobs.Title_Information"
                        type="text"
                        label="عنوان"
                        variant="outlined"
                        required
                    ></v-text-field>
                    <br />
                    <v-textarea
                        v-model="jobs.Description_Information"
                        label="وصف قصير"
                        :counter="150"
                        required
                        variant="outlined"
                    ></v-textarea>

                    <v-btn
                        class="d-flex align-center mt-4 mb-10"
                        type="submit"
                        color="primary"
                        :loading="loading"
                        :disabled="loading"
                        @click="jobs.Update_Jobs(jobs.Id_Information)"
                    >
                        تعديل
                    </v-btn>
                </form>
            </v-card></v-dialog
        >
        <div class="box">
            <v-card v-for="Job in Jobs" :key="Job.id" width="100%" class="job">
                <v-card-title
                    class="title d-flex align-center justify-center flex-wrap"
                >
                    <p>{{ Job.title }}</p>
                    <v-spacer />
                    <div class="left">
                        <font-awesome-icon
                            @click="jobs.Job_Information(Job)"
                            :icon="['fas', 'edit']"
                            @click.="dialog_1 = true"
                        />
                    </div>
                    <div class="left">
                        <font-awesome-icon
                            @click="jobs.delete_Job(Job.id, Job.CV)"
                            :icon="['fas', 'trash']"
                        />
                    </div>
                </v-card-title>
                <br />
                <v-card-subtitle>
                    {{ Job.time }}
                </v-card-subtitle>

                <v-card-text>
                    <p class="mb-2" style="color: var(--therd-color)">
                        متطلبات العمل :
                    </p>
                    <p class="mb-4">{{ Job.description }}</p>

                    <v-expansion-panels>
                        <v-expansion-panel
                            title="التقديمات"
                            style="
                                background-color: var(
                                    --secound-color
                                ) !important;
                                color: var(--main-color);
                                font-weight: bold;
                                font-size: 20px;
                            "
                            @click="
                                jobs.Job_Information(Job),
                                    jobs.Get_applies(jobs.Title_Information)
                            "
                        >
                            <v-expansion-panel-text>
                                <v-expansion-panels>
                                    <v-expansion-panel
                                        v-for="Apply in apply"
                                        :key="Apply.id"
                                        :title="Apply.name"
                                        :text="Apply.email"
                                    >
                                        <v-expansion-panel-text>
                                            {{ Apply.phone }}
                                        </v-expansion-panel-text>
                                        <v-expansion-panel-text>
                                            <a :href="Apply.CV">CV</a>
                                        </v-expansion-panel-text>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useJobs } from "@/store/job.js";
export default defineComponent({
    setup() {
        const jobs = useJobs();
        jobs.Get_data();
        jobs.Get_Apply_data();
        jobs.Get_notifications_data();
        // Destructure reactive references and methods from Jobs store
        const {
            Job,
            Jobs,
            applies,
            Apply,
            loading,
            Get_Apply_data,
            Add_Apply,
            Add_Jobs,
            dialog,
            dialog_1,
            delete_Job,
            Get_data,
            notifications,
            text,
            Update_counter,
            Job_Information,
            progress,
            Get_applies,
            apply,
            counter,
            delete_notifications,
            Get_notifications_data,
        } = storeToRefs(jobs);

        // Return the necessary reactive properties and methods
        return {
            Job,
            loading,
            applies,
            Update_counter,
            delete_notifications,
            Get_notifications_data,
            Apply,
            counter,
            notifications,
            text,
            Get_applies,
            Get_Apply_data,
            Add_Apply,
            Add_Jobs,
            delete_Job,
            Job_Information,
            Get_data,
            Jobs,
            jobs,
            apply,
            dialog,
            dialog_1,
            progress,
        };
    },
});
</script>
<style lang="scss" scoped>
form {
    width: 90%;
    margin: auto;
}

.use {
    width: 95% !important;
    margin: auto;
    .title {
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
        & > div {
            display: flex;
            align-items: center;
            gap: 4px;
            &.left {
                .icon,
                svg {
                    cursor: pointer;
                    transition: 0.3s;
                    background: #fff;
                    padding: 10px;
                    border-radius: 5px;
                    &:hover {
                        color: var(--therd-color);
                    }
                }
                .icon {
                    padding: 20px;
                }
            }
        }
    }
}
.job {
    width: 100% !important;
    margin-bottom: 10px;
    .title {
        background: var(--main-color);
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        font-size: 20px;
        & > div {
            display: flex;
            align-items: center;
            gap: 10px;
            &.left {
                svg {
                    color: var(--main-color);
                    cursor: pointer;
                    transition: 0.3s;
                    background: #fff;
                    padding: 10px;
                    border-radius: 5px;
                    &:hover {
                        color: var(--therd-color);
                    }
                }
            }
        }
    }
}
.box {
    width: 95% !important;
    margin: 0 auto;
    padding: 10px 0px;
}
</style>
