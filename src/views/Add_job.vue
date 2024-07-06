<template>
    <div>
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
                            @click="$router.push('/Modifications')"
                            link
                        >
                            الإعدادات
                        </v-breadcrumbs-item>
                        <v-breadcrumbs-divider />
                        <v-breadcrumbs-item
                            @click="$router.push('/Add_Job')"
                            link
                        >
                            الأخبار
                        </v-breadcrumbs-item>
                    </v-breadcrumbs>
                </div>
                <div class="left">
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
                        @click="jobs.Update_Jobs(Jobs.Id_Information)"
                    >
                        تعديل
                    </v-btn>
                </form>
            </v-card></v-dialog
        >
        <v-container
            class="box d-flex align-center justify-space-around"
            width="90%"
        >
            <v-card v-for="Job in Jobs" :key="Job.id" width="25%">
                <v-card-title
                    class="d-flex align-center justify-center flex-wrap"
                >
                    <p>{{ Job.title }}</p>
                    <v-spacer />
                    <div class="ma-2">
                        <font-awesome-icon
                            @click="jobs.Job_Information(Job)"
                            :icon="['fas', 'edit']"
                            @click.="dialog_1 = true"
                        />
                    </div>
                    <div>
                        <font-awesome-icon
                            @click="jobs.delete_Job(Job.id, Job.CV)"
                            :icon="['fas', 'trash']"
                        />
                    </div>
                </v-card-title>

                <v-card-subtitle>
                    {{ Job.time }}
                </v-card-subtitle>

                <v-card-text
                    ><p>{{ Job.description }}</p>
                    <v-btn
                        class="!m-auto !text-center mt-2 mb-4"
                        color="primary"
                        @click="
                            (jobs.dialog_2 = true), jobs.Job_Information(Job)
                        "
                    >
                        التقديم على الوظيفة</v-btn
                    >
                    <v-dialog v-model="dialog_2" width="90%">
                        <v-card width="100%" class="popup">
                            <v-card-title
                                class="d-flex justify-space-between align-center"
                            >
                                <div
                                    class="text-h4 ps-2"
                                    style="color: var(--main-color)"
                                >
                                    التقديم على الوظيفة
                                </div>
                                <v-btn
                                    style="color: var(--main-color)"
                                    icon="mdi-close"
                                    variant="text"
                                    @click="dialog_2 = false"
                                ></v-btn>
                            </v-card-title>
                            <form ref="form" @submit.prevent class="ma-auto">
                                <v-text-field
                                    v-model="jobs.Apply.name"
                                    type="text"
                                    label="الاسم"
                                    variant="outlined"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="jobs.Apply.email"
                                    type="email"
                                    label="البريد الالكتروني"
                                    variant="outlined"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="jobs.Apply.phone"
                                    type="text"
                                    label="التليفون"
                                    variant="outlined"
                                    required
                                ></v-text-field>
                                <v-file-input
                                    v-model="jobs.Apply.CV"
                                    label="السيرة الذاتية"
                                    variant="outlined"
                                    prepend-icon=""
                                    required
                                    prepend-inner-icon="mdi-paperclip"
                                    @click="jobs.upload_CV"
                                >
                                </v-file-input>

                                <v-btn
                                    class="d-flex align-center mt-4 mb-10"
                                    type="submit"
                                    color="primary"
                                    @click="jobs.Add_Apply(jobs.Id_Information)"
                                >
                                    تقديم
                                </v-btn>
                            </form>
                        </v-card></v-dialog
                    >
                    <v-expansion-panels>
                        <v-expansion-panel
                            v-for="Apply in applies"
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
                </v-card-text>
            </v-card>
        </v-container>
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
        // Destructure reactive references and methods from Jobs store
        const {
            Job,
            Jobs,
            applies,
            Apply,
            Get_Apply_data,
            Add_Apply,
            Add_Jobs,
            dialog,
            dialog_1,
            dialog_2,
            delete_Job,
            Get_data,
            upload_CV,
            Job_Information,
            progress,
        } = storeToRefs(jobs);

        // Return the necessary reactive properties and methods
        return {
            Job,
            applies,
            Apply,
            dialog_2,
            Get_Apply_data,
            Add_Apply,
            Add_Jobs,
            delete_Job,
            Job_Information,
            Get_data,
            upload_CV,
            Jobs,
            jobs,
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
            }
        }
    }
}
.box {
    flex-wrap: wrap;
    gap: 10px;
}
</style>
