<v-col>
    <v-row
        v-if="selectedPlan"
        class="d-flex flex-column mt-16"
    >
        <v-col>
            <h2 class="mb-5">أذهب للدفع</h2>
        </v-col>
        <v-col
            cols="12"
            sm="8"
            class="d-flex flex-row ga-5"
        >
            <v-text-field
                v-model="totalAmount"
                label="المبلغ المستحق"
                outlined
            ></v-text-field>
            <v-text-field
                v-model="amount"
                label="المبلغ المدفوع"
                outlined
            ></v-text-field>
            <v-btn
                color="primary"
                size="large"
                @click="payAmount"
                style="
                    height: 60px;
                    width: 150px;
                "
                >دفع</v-btn
            >
        </v-col>
        <v-col cols="12" sm="6"></v-col>
    </v-row>

    <v-row v-if="paidAmount > 0">
        <v-col cols="12">
            <div class="d-flex justify-center">
                <div class="progress_container">
                    <div
                        class="progress"
                        :style="{
                            width: progressBarWidth,
                        }"
                    ></div>

                    <div
                        v-for="(
                            circle, index
                        ) in circles"
                        :key="index"
                        :class="[
                            'circle',
                            {
                                circle_active:
                                    index <
                                    currentActive,
                            },
                            {
                                circle_success:
                                    index ===
                                        currentActive -
                                            1 &&
                                    reachedProgress,
                            },
                        ]"
                    >
                        {{ index + 1 }}
                    </div>
                </div>
            </div>
        </v-col>
        <v-col cols="12">
            <div
                class="cont ma-16 d-flex justify-space-around align-center"
            >
                <div
                    class="d-flex flex-column align-center ga-3"
                >
                    <h3>المبلغ المستحق</h3>
                    <p>{{ totalAmount }}</p>
                </div>
                <div
                    class="cont d-flex flex-column align-center ga-3"
                >
                    <h3>المبلغ المدفوع</h3>
                    <p>{{ paidAmount }}</p>
                </div>
                <div
                    class="cont d-flex flex-column align-center ga-3"
                >
                    <h3>الباقي من القسط</h3>
                    <p>
                        {{
                            totalAmount -
                            paidAmount
                        }}
                    </p>
                </div>
            </div>
        </v-col>
    </v-row>
</v-col>
