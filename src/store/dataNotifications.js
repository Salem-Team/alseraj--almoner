import { defineStore } from "pinia";
import { getToken } from "firebase/messaging";
import { db, messaging } from "../Firebase.js";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export const dataNotifications = defineStore("dataNotifications", {
    // <-- Add store ID here
    state: () => ({
        token: "",
    }),
    actions: {
        async requestNotificationPermission() {
            try {
                const permission = await Notification.requestPermission();
                if (permission === "granted") {
                    console.log("Notification permission granted");
                    if (messaging) {
                        this.token = await getToken(messaging, {
                            vapidKey:
                                "BGwgThsV91e6sNhTIt8gVdYju5qfSYyg99NDs6zAY5L7Z8VGH224GvbFdrVTZ97Qjahw6mRqHK0qZSMDmjkzsyg",
                        });
                        console.log("FCM Token:", this.token); // Log the token for verification
                    } else {
                        console.warn(
                            "Firebase Messaging is not supported in this browser."
                        );
                    }
                } else {
                    console.log("Unable to get permission to notify");
                }
            } catch (error) {
                console.error(
                    "An error occurred while requesting permission for notifications:",
                    error
                );
            }
        },

        async notification({ data, ...rest }) {
            if (this.token) {
                try {
                    await addDoc(collection(db, "notifications"), {
                        data,
                        ...rest,
                    });
                    return "Notification sent successfully";
                } catch (error) {
                    return "Error sending notification: " + error.message;
                }
            } else {
                return "No token available, notification not sent";
            }
        },

        getMessage() {
            onSnapshot(collection(db, "notifications"), (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added" || change.type === "modified") {
                        console.log(change.doc.data()); // Handle the new/modified document data as needed
                    }
                });
            });
        },
    },
});
