<template>
    <div style="width: 100% !important; margin: auto; padding: 40px 0px">
        <div class="use">
            <div class="title">
                <div class="right">الوظائف</div>
            </div>
        </div>
        <div class="box d-flex align-center justify-space-around">
            <v-card
                v-for="Job in Jobs"
                :key="Job.id"
                width="400px"
                max-width="25%"
                class="job"
            >
                <v-card-title class="title">
                    <p>{{ Job.title }}</p>
                </v-card-title>
                <br />
                <v-card-subtitle>
                    {{ Job.time }}
                </v-card-subtitle>

                <v-card-text width="100%">
                    <p class="mb-2" style="color: var(--pink-color)">
                        متطلبات العمل :
                    </p>
                    <p class="mb-4" style="color: var(--therd-color)">
                        {{ Job.description }}
                    </p>
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
                            <div
                                class="d-flex justify-space-between align-center title mb-4"
                            >
                                <div style="color: var(--main-color)">
                                    التقديم على الوظيفة
                                </div>
                                <v-btn
                                    icon="mdi-close"
                                    @click="dialog_2 = false"
                                ></v-btn>
                            </div>
                            <form
                                ref="form"
                                @submit.prevent
                                class="ma-auto mt-4"
                            >
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
                                    class="d-flex align-center mt-4 mb-4"
                                    type="submit"
                                    :loading="loading"
                                    :disabled="loading"
                                    @click="jobs.Add_Apply(jobs.Id_Information)"
                                    style="
                                        width: 100%;
                                        padding: 20px;
                                        letter-spacing: normal;
                                        font-weight: bold;
                                        font-size: 19px;
                                        background: var(--main-color);
                                        color: #fff;
                                    "
                                >
                                    تقديم
                                </v-btn>
                            </form>
                        </v-card></v-dialog
                    >
                </v-card-text>
            </v-card>
        </div>
        <div v-if="Jobs.length < 4" class="btn">
            <v-btn
                style="
                    background-color: var(--main-color) !important;
                    color: white !important;
                    width: 20%;
                "
                @click="jobs.Get_data"
                >المزيد</v-btn
            >
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
        jobs.Get_splice();
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
    width: fit-content !important;
    margin: auto;
    .title {
        text-transform: uppercase;
        color: var(--main-color);
        margin: 0 auto 80px;
        border: 2px solid var(--main-color);
        padding: 10px 20px;
        font-size: 30px;
        width: fit-content;
        position: relative;
        z-index: 1;
        transition: 0.3s;
    }
    .title::before {
        content: "";
        width: 12px;
        height: 12px;
        background-color: var(--main-color);
        position: absolute;
        border-radius: 50%;
        top: 50%;
        right: -30px;
        transform: translateY(-50%);
    }
    .title::after {
        content: "";
        width: 12px;
        height: 12px;
        background-color: var(--main-color);
        position: absolute;
        border-radius: 50%;
        top: 50%;
        left: -30px;
        transform: translateY(-50%);
    }
    .title:hover::before {
        z-index: -1;
        animation: right-move 0.5s linear forwards;
    }
    .title:hover::after {
        z-index: -1;
        animation: left-move 0.5s linear forwards;
    }
    .title:hover {
        color: white;
        border: 2px solid white;
        transition-delay: 0.5s;
    }
}
.job {
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
    }
}

.box {
    flex-wrap: wrap !important;
    gap: 10px !important;
}

@keyframes left-move {
    50% {
        left: 0;
        width: 12px;
        height: 12px;
    }
    100% {
        left: 0;
        border-radius: 0;
        width: 50%;
        height: 100%;
    }
}
@keyframes right-move {
    50% {
        right: 0;
        width: 12px;
        height: 12px;
    }
    100% {
        right: 0;
        border-radius: 0;
        width: 50%;
        height: 100%;
    }
}
.btn {
    margin: auto !important;
    text-align: center;
    margin-top: 40px !important;
}
.popup .title {
    padding: 20px 20px 0 !important;
    font-size: 23px;
    font-weight: bold;
    color: var(--main-color);
    position: relative;
    margin-bottom: 15px;
    &::before {
        content: "";
        position: absolute;
        bottom: -15px;
        height: 3px;
        width: calc(100% - 40px);
        background: var(--secound-color);
        left: 50%;
        transform: translateX(-50%);
    }
}
.v-btn--icon.v-btn--density-default {
    color: var(--main-color);
    width: auto;
    height: auto;
    box-shadow: none;
    &:hover {
        background: #fff;
    }
}
</style>
