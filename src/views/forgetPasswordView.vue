<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" min-width="644">
      <v-form ref="form" v-model="formValid" @submit.prevent="onSubmit">
        <v-text-field
          v-if="isPhone"
          label="Phone Number"
          v-model="phone"
          type="tel"
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          v-else
          label="Email"
          v-model="email"
          type="email"
          :rules="[required, emailRule]"
        ></v-text-field>
        <v-btn
          :disabled="!formValid"
          :loading="loading"
          color="success"
          size="large"
          type="submit"
          variant="elevated"
          block
        >
          Send Message
        </v-btn>
      </v-form>
      <v-switch v-model="isPhone" label="Switch" inset></v-switch>
    </v-card>
  </v-sheet>
</template>
  
  <script>
import loginUseState from "@/stores/login.js";
import emailjs from "@emailjs/browser";
import axios from "axios";

export default {
  data: () => ({
    formValid: false,
    isPhone: false, // Default state for the switch
    phone: "", // Model for phone number input
    email: "", // Model for email input
    authStore: loginUseState(),
    loading: false,
  }),

  methods: {
    async onSubmit() {
      const YOUR_ACCESS_TOKEN =
        "EAAZAyhGgo0ZCMBOxc8AEyI4jeZCXpbPHLBF8ZAvvc9xmDpqZBnktTdzw7ZC72IFL0iW7slXTjdlBEBjoYNZCek78Q7YFh0aVwf376c66qzozyZAhmZAwgvxR8OJLVgelALgQ5s5YUjVh5UCckOF8t167JRsfIHNgNiNreWirqbgToP0ytOMZCNsLM4qMzsrpiMI9ucLDu5BWzs8b4cj7yNjmIZD";
      const verificationCode = Math.floor(100000 + Math.random() * 900000);

      if (this.isPhone) {
        this.loading = true;
        try {
          await axios.post(
            "https://graph.facebook.com/v20.0/378804685314112/messages",
            {
              messaging_product: "whatsapp",
              //   "to": "201060688891",
              to: "201282029677",
              type: "template",
              template: {
                name: "school_password",
                language: {
                  code: "en",
                },
                components: [
                  {
                    type: "body",
                    parameters: [
                      {
                        type: "text",
                        text: verificationCode.toString(),
                      },
                    ],
                  },
                  {
                    type: "button",
                    sub_type: "url",
                    index: "0",
                    parameters: [
                      {
                        type: "text",
                        text: verificationCode.toString(),
                      },
                    ],
                  },
                ],
              },
            },
            {
              headers: {
                Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("WhatsApp message sent successfully!");
        } catch (error) {
          console.error("Failed to send WhatsApp message:", error);
        } finally {
          this.loading = false;
        }
      } else {
        if (!this.email) {
          console.error("Email is required");
          return;
        }
        this.loading = true;
        const templateParams = {
          user_name: "Mostafa",
          message: `رمز التحقق الخاص بك هو: ${verificationCode}`,
          email: this.email,
        };
        emailjs
          .send(
            "service_x9p0iec",
            "template_6zs17j8",
            templateParams,
            "9I5VJkf0f-W0IrA8k"
          )
          .then(
            () => {
              console.log("SUCCESS!");
            },
            (error) => {
              console.log("FAILED...", error.text);
            }
          )
          .finally(() => {
            this.loading = false;
          });
      }
    },
    required(v) {
      return !!v || "Field is required";
    },
    emailRule(v) {
      const pattern = /.+@.+\..+/;
      return pattern.test(v) || "E-mail must be valid";
    },
  },
};
</script>
  