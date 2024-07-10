<template>
    <img
        style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 245px;
        "
        v-if="loading1"
        src="../assets/Spinner@1x-1.0s-200px-200px.svg"
        alt=""
    />
    <div v-if="!loading1">
        <div class="use">
            <div class="title">
                <div class="right">الوظائف</div>
            </div>
        </div>
        <div class="box">
            <v-card v-for="Job in Jobs" :key="Job.id" width="100%" class="job">
                <v-card-title class="title">
                    <p>{{ Job.title }}</p>
                </v-card-title>
                <br />
                <v-card-subtitle>
                    {{ Job.time }}
                </v-card-subtitle>

                <v-card-text width="100%">
                    <p class="mb-2" style="color: var(--therd-color)">
                        متطلبات العمل :
                    </p>
                    <p class="mb-4">{{ Job.description }}</p>
                    <v-btn
                        width="100%"
                        class="!text-center mt-2 text-h6"
                        style="color: var(--main-color)"
                        color="var(--secound-color)"
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
                                    v-model="jobs.Title_Information"
                                    type="text"
                                    label="الوظيفة"
                                    variant="outlined"
                                    required
                                ></v-text-field>
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
                                    @input="jobs.upload_CV"
                                >
                                </v-file-input>
                                <!-- Show progress bar if jobs.Apply.CV is truthy (assuming New is a data property) -->
                                <v-progress-linear
                                    v-if="jobs.Apply.CV"
                                    :value="jobs.progress"
                                    color="blue-grey"
                                    height="25"
                                >
                                    <template v-slot:default="{ value }">
                                        <strong>{{ Math.ceil(value) }}%</strong>
                                    </template>
                                </v-progress-linear>
                                <br />
                                <v-textarea
                                    v-model="jobs.Apply.description"
                                    label="وصف قصير"
                                    variant="outlined"
                                    required
                                    :maxlength="150"
                                ></v-textarea>
                                <br />
                                <v-slider
                                    v-model="jobs.Apply.description.length"
                                    :max="150"
                                    step="1"
                                    disabled
                                    thumb-label="always"
                                ></v-slider>
                                <v-btn
                                    class="d-flex align-center mt-4 mb-10"
                                    type="submit"
                                    color="primary"
                                    :loading="loading"
                                    :disabled="loading"
                                    @click="jobs.Add_Apply(jobs.Id_Information)"
                                >
                                    تقديم
                                </v-btn>
                            </form>
                        </v-card></v-dialog
                    >
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
        // Destructure reactive references and methods from Jobs store
        const {
            Job,
            loading,
            applies,
            progress,
            Apply,
            upload_CV,
            Get_applies,
            dialog_2,
            Get_Apply_data,
            Add_Apply,
            Job_Information,
            Get_data,
            Jobs,
            apply,
            loading1,
        } = storeToRefs(jobs);

        // Return the necessary reactive properties and methods
        return {
            Job,
            loading,
            applies,
            progress,
            Apply,
            upload_CV,
            Get_applies,
            dialog_2,
            Get_Apply_data,
            Add_Apply,
            Job_Information,
            Get_data,
            Jobs,
            jobs,
            apply,
            loading1,
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
