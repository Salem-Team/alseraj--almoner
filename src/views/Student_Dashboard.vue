<template>
    <div class="container">
        <v-card flat class="mx-auto my-4" max-width="90%">
            <v-card-title class="text-h4 custom-font" style="color: #2980b9">
                المدفوعات
            </v-card-title>
            <v-card-subtitle class="mb-4 text-h6 custom-title">
                ادخل المبلغ واختر نظام الدفع
            </v-card-subtitle>
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="totalAmount"
                            label="ادخل المبلغ"
                            outlined
                            dense
                            required
                            @blur="validateTotalAmount"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select
                            v-model="paymentMethod"
                            :items="paymentMethods"
                            label="اختر نظام الدفع"
                            @change="updatePaymentOptions"
                            outlined
                            dense
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row v-if="paymentMethod === 'نظام التقسيط'">
                    <v-col cols="12" md="12">
                        <v-select
                            v-model="selectedPlan"
                            :items="selectPaid"
                            label="اختر نظام التقسيط"
                            @change="updateCircles"
                            outlined
                            dense
                        ></v-select>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <div
            v-if="paymentMethod === 'نظام التقسيط' && selectedPlan"
            class="payment-section"
        >
            <v-row>
                <div class="timeline-container">
                    <div class="timeline">
                        <div class="timeline-line"></div>
                        <div class="progress_container">
                            <div
                                class="progress"
                                :style="{
                                    height:
                                        (paidAmount / totalAmount) * 100 + '%',
                                    backgroundColor: '#2980b9',
                                }"
                            ></div>
                            <span class="progress-label mb-3">
                                <!-- {{ (paidAmount / totalAmount) * 100 }} % -->
                                {{ paidAmount }}
                                مدفوعاتك
                            </span>
                        </div>
                        <div
                            v-for="month in numberOfMonths"
                            :key="month"
                            class="timeline-item"
                        >
                            <div
                                class="timeline-item-content"
                                :style="{
                                    backgroundColor:
                                        paidAmount >= installmentAmount * month
                                            ? '#d8588c'
                                            : '#fff',
                                    color:
                                        paidAmount >= installmentAmount * month
                                            ? '#fff'
                                            : '#333', // أو أي لون آخر تفضله
                                }"
                            >
                                <div class="timeline-item-header">
                                    <span
                                        class="month-name"
                                        :style="{
                                            color:
                                                paidAmount >=
                                                installmentAmount * month
                                                    ? '#fff'
                                                    : '#333',
                                        }"
                                        >شهر {{ month }}</span
                                    >
                                </div>
                                <div class="timeline-item-body">
                                    <p>
                                        القسط الشهري:
                                        {{ Math.floor(installmentAmount) }} جنيه
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-row>
            <v-row>
                <v-col>
                    <v-dialog
                        v-model="dialogSuccess"
                        max-width="600"
                        @input="handleDialogClose"
                    >
                        <v-card>
                            <v-card-actions class="justify-center">
                                <v-icon color="success" size="100"
                                    >mdi-check-circle-outline</v-icon
                                >
                            </v-card-actions>
                            <v-card-text class="text-center">
                                <p class="success-message">
                                    تم دفع مبلغ {{ paidAmount }} جنيه. بنجاح
                                </p>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                    color="success"
                                    @click="dialogSuccess = false"
                                >
                                    موافق
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
            <v-row class="my-4">
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="amount"
                        label="ادخل المبلغ للدفع"
                        outlined
                        dense
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn color="primary" size="x-large" @click="payAmount"
                        >ادفع</v-btn
                    >
                </v-col>
            </v-row>
            <v-row class="my-4">
                <v-col cols="12" md="4">
                    <v-card class="pa-4">
                        <v-card-title>المبلغ المستحق</v-card-title>
                        <v-card-subtitle
                            >{{ totalAmount }} جنيه</v-card-subtitle
                        >
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="pa-4">
                        <v-card-title>المبلغ المدفوع</v-card-title>
                        <v-card-subtitle>{{ paidAmount }} جنيه</v-card-subtitle>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="pa-4">
                        <v-card-title>باقي المبلغ المستحق</v-card-title>
                        <v-card-subtitle
                            >{{ remainingAmount }} جنيه</v-card-subtitle
                        >
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <!-- v-alert for notifications -->
        <v-alert
            title="تنبيه"
            class="custom-alert mt-4"
            v-if="alertMessage"
            v-model="alertMessage"
            dense
            outlined
            closable
            type="warning"
        >
            {{ alertMessage }}
        </v-alert>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        numberOfMonths() {
            if (!this.selectedPlan) return [];
            const monthsMap = {
                شهر: 1,
                شهرين: 2,
                "3 شهر": 3,
                "4 شهر": 4,
                "5 شهر": 5,
            };
            return Array.from(
                { length: monthsMap[this.selectedPlan] },
                (_, i) => i + 1
            );
        },
        installmentAmount() {
            if (!this.selectedPlan) return 0;
            const monthsMap = {
                شهر: 1,
                شهرين: 2,
                "3 شهر": 3,
                "4 شهر": 4,
                "5 شهر": 5,
            };
            return Math.floor(this.totalAmount / monthsMap[this.selectedPlan]);
        },
        remainingAmount() {
            return Math.max(this.totalAmount - this.paidAmount, 0);
        },
    },
    methods: {
        updatePaymentOptions() {
            if (this.paymentMethod === "نظام التقسيط") {
                this.selectedPlan = null;
                this.paidAmount = 0;
                this.amount = 0;
            }
        },
        payAmount() {
            const amountToPay = parseInt(this.amount);

            if (isNaN(amountToPay) || amountToPay <= 0) {
                this.showAlert("الرجاء إدخال المبلغ صحيحا");
                return;
            }

            this.paidAmount += amountToPay;
            this.amount = 0;
            this.dialogSuccess = true;
        },
        validateTotalAmount() {
            if (this.totalAmount !== null) {
                if (isNaN(this.totalAmount) || this.totalAmount < 0) {
                    this.showAlert("لابد ان يكون رقما وليس سالبا");
                    this.totalAmount = null;
                }
            }
        },
        showAlert(message) {
            this.alertMessage = message;
            setTimeout(() => {
                this.alertMessage = "";
            }, 3000);
        },
        resetPayment() {
            this.paidAmount = 0;
        },
    },
};
</script>

<style scoped>
.container {
    width: 90%;
    max-width: 800px;
    margin: auto;
}

.timeline-container {
    margin-top: 20px;
    width: 90%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.timeline {
    position: relative;
    margin-left: 20px;
}

.timeline-line {
    position: absolute;
    width: 2px;
    background-color: #ccc;
    left: 8px;
    top: 0;
    bottom: 0;
    margin: auto;
}
.progress_container {
    position: absolute;
    width: 5px;
    background-color: #eee;
    left: 8px;
    top: 0;
    bottom: 0;
    margin: auto;
}

.timeline-item {
    position: relative;
    margin-bottom: 30px;
}

.timeline-item-content {
    position: relative;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 10px;
    border-radius: 4px;
    position: relative;
    margin-left: 20px;
}
.timeline-item-content::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -27.2px;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    /* border-radius: 50%; */
    transform: rotate(45deg);
    background-color: #2980b9;
}
.timeline-item-content::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -24px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-right: 20px solid #d8588c;
}
.timeline-item-header {
    padding-bottom: 10px;
}

.timeline-item-body {
    font-size: 14px;
}

.month-name {
    font-weight: bold;
    color: #2980b9;
}

.payment-section {
    margin-top: 20px;
}
.progress-label {
    font-size: 14px;
    font-weight: bold;
    position: absolute;
    right: 21px;
    width: 106px;
    background: #2980b9;
    color: #fff;
    text-align: center;
    line-height: 36px;
}
.timeline-item-content {
    margin-left: 30px;
    transition: 0.5s;
    transition: margin-left 0.5s;
}
.success-message {
    color: #4caf50; /* لون أخضر لرسائل النجاح */
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
    transition: 0.5s;
}

.timeline-item-content.transition {
    margin-left: 60px; /* أو أي قيمة انتقال تفضلها */
}

.progress {
    transition: height 0.5s;
}

.progress.transition {
    height: 100%;
}
.custom-alert {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 120px;
    font-size: 20px;
    z-index: 9999;
    border-radius: 20px;
    transition: all 0.5s ease-in-out;
    /* text-align: center; */
}
</style>
