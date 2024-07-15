import { defineStore } from "pinia";
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    query,
    orderBy,
    updateDoc,
    deleteDoc,
    arrayUnion,
    doc,
} from "@firebase/firestore";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
    ref as storageRef,
} from "firebase/storage";

const firebaseConfig = {
    // Firebase configuration object
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};

// Initialize Firebase app and services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Define Pinia store
export const useJobs = defineStore("job", {
    state: () => ({
        // State variables
        dialog: false,
        dialog_1: false,
        dialog_2: false,
        dialog_3: false,
        name_Information: "",
        email_Information: "",
        phone_Information: "",
        CV_Information: null,
        applies_Information: [],
        progress: 0,
        Jobs: [],
        Job: {
            title: "",
            description: "",
            applies: [],
        },
        Apply: {
            name: "",
            email: "",
            phone: "",
            title: "",
            CV: null,
            description: "",
        },
        random: 0,
        applies: [],
        apply: [],
        notifications: [],
        text: "",
        counter: [],
        loading: false,
        loading1: false,
    }),
    actions: {
        // Action methods

        // Upload CV file to Firebase Storage
        async upload_CV(file) {
            this.random = Math.random();
            const storageReference = storageRef(
                storage,
                "CVs/" + this.random + file.name
            );
            // Upload the file bytes to the storage reference and get a snapshot of the upload
            const snapshot = await uploadBytesResumable(storageReference, file);

            // Calculate the progress percentage
            this.progress = (
                (snapshot.bytesTransferred / snapshot.totalBytes) *
                100
            ).toFixed(2);
            console.log("the progress" + this.progress);
            // Log a message indicating the upload is complete, along with the snapshot details
            console.log("Uploaded a blob or file!", snapshot);

            // Return a promise that resolves with the download URL of the uploaded file
            return getDownloadURL(snapshot.ref);
        },

        // Delete CV file from Firebase Storage
        async delete_CV(CV) {
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, CV);

            // Delete the file
            deleteObject(desertRef);
        },

        // Add application for a job
        async Add_Apply(JobId) {
            try {
                this.loading = true;
                if (this.Apply.CV) {
                    // Step 1: Upload CV and get the download URL
                    const CVUrl = await this.upload_CV(this.Apply.CV);

                    // Step 2: Prepare data to add to the "Apply" collection
                    const applyData = {
                        title: this.Title_Information,
                        name: this.Apply.name,
                        email: this.Apply.email,
                        phone: this.Apply.phone,
                        CV: CVUrl,
                        description: this.Apply.description,
                    };

                    // Step 3: Add a document to the "Apply" collection
                    const docRef = await addDoc(
                        collection(db, "Apply"),
                        applyData
                    );
                    console.log("Document written with ID: ", docRef.id);

                    // Step 4: Update the corresponding "Jobs" document with the new apply information
                    const jobRef = doc(db, "Jobs", JobId);
                    await updateDoc(jobRef, {
                        applies: arrayUnion(docRef.id),
                        // Assuming you want to store apply document IDs in the "Jobs" document
                    });
                    console.log("Updated Job document with apply information.");

                    // Step 5: Update the Apply document with its own ID (optional)
                    await updateDoc(docRef, {
                        id: docRef.id,
                    });

                    // Step 6: Update counter and notifications
                    const currentTime = new Date().toLocaleString();
                    const Snapshot = await getDocs(collection(db, "counter"));
                    Snapshot.forEach((doc) => {
                        this.counter = doc.data();
                    });
                    this.counter.counter++;
                    this.text =
                        " قام " +
                        this.Apply.name +
                        " بالتقديم على وظيفة " +
                        this.Title_Information;
                    const Data = {
                        text: this.text,
                        time: currentTime,
                    };
                    const notRef = await addDoc(
                        collection(db, "Apply_notifications"),
                        Data
                    );
                    console.log("Document written with ID: ", notRef.id);

                    // Update notification document with its own ID (optional)
                    await updateDoc(notRef, {
                        id: notRef.id,
                    });

                    // Update counter document
                    const countRef = doc(db, "counter", "xLGdsLcpA71sNZRNvUmU");
                    updateDoc(countRef, {
                        counter: this.counter.counter,
                    });

                    this.loading = false;

                    // Step 7: Refresh data if needed
                    this.Get_Apply_data();

                    // Step 8: Close dialog or perform UI-related operations
                    this.dialog_2 = false;
                } else {
                    console.error("No File selected.");
                    this.loading = false;
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },

        // Display counter functionality
        async counter_display() {
            console.log("working");
            if (this.counter.counter === 0) {
                let bg_error = document.querySelector(".bg-error");
                bg_error.style.display = "none";
            }
        },

        // Add new job listing
        async Add_Jobs() {
            try {
                this.loading = true;
                const currentTime = new Date().toLocaleString();
                const docRef = await addDoc(collection(db, "Jobs"), {
                    title: this.Job.title,
                    description: this.Job.description,
                    time: currentTime,
                    applies: this.Job.applies,
                });
                console.log("Apply document updated with ID: ", docRef.id);

                // Update job document with its own ID (optional)
                await updateDoc(docRef, {
                    id: docRef.id,
                });

                console.log("Document written with ID: ", docRef.id);
                this.Get_data();
                this.loading = false;
                this.dialog = false;
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },

        // Retrieve apply data
        async Get_Apply_data() {
            try {
                this.loading1 = true;
                this.applies = []; // Initialize applies array
                const querySnapshot = await getDocs(collection(db, "Apply"));
                querySnapshot.forEach((doc) => {
                    this.applies.push(doc.data());
                });
                console.log("applies", this.applies);
                this.loading1 = false;
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        },

        // Retrieve notifications data
        async Get_notifications_data() {
            try {
                this.notifications = []; // Initialize notifications array
                this.counter = 0;
                const querySnapshot = await getDocs(
                    query(
                        collection(db, "Apply_notifications"),
                        orderBy("time", "asc")
                    )
                );
                querySnapshot.forEach((doc) => {
                    this.notifications.push(doc.data());
                });
                console.log("notifications", this.notifications);
                this.Get_counter_data();
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        },

        // Retrieve counter data
        async Get_counter_data() {
            const Snapshot = await getDocs(collection(db, "counter"));
            Snapshot.forEach((doc) => {
                this.counter = doc.data();
            });
            console.log("counter", this.counter);
        },

        // Update counter data
        async Update_counter() {
            try {
                this.counter = 0;
                const docRef = doc(db, "counter", "xLGdsLcpA71sNZRNvUmU");
                updateDoc(docRef, {
                    counter: this.counter,
                });
                this.Get_counter_data();
                this.dialog_1 = false;
            } catch (error) {
                console.error("Error updating the Job:", error);
            }
        },

        // Retrieve applies for a job
        async Get_applies(job_apply) {
            this.apply = []; // Clear the array before populating with new data
            try {
                for (const index of job_apply) {
                    const docRef = doc(db, "Apply", index);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        // Document exists, push data to apply array
                        this.apply.push(docSnap.data());
                    } else {
                        console.error("No such document!");
                    }
                }
                console.log("All apply data:", this.apply);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        },

        // Retrieve all job data
        async Get_data() {
            try {
                this.loading1 = true;
                this.Jobs = [];
                const querySnapshot = await getDocs(
                    query(collection(db, "Jobs"), orderBy("time", "asc"))
                );
                querySnapshot.forEach((doc) => {
                    this.Jobs.push(doc.data());
                });
                console.log("this.Jobs", this.Jobs);
                this.loading1 = false;
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },

        // Retrieve limited job data (first 3 jobs)
        async Get_splice() {
            try {
                this.loading1 = true;
                this.Jobs = [];
                const querySnapshot = await getDocs(collection(db, "Jobs"));
                querySnapshot.forEach((doc) => {
                    this.Jobs.push(doc.data());
                });
                this.Jobs = this.Jobs.slice(0, 3);
                console.log("this.Jobs", this.Jobs);
                this.loading1 = false;
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },

        // Delete notification document
        async delete_notifications(notification_Id) {
            try {
                // Log before attempting to delete
                console.log(
                    "Deleting notification from Firestore:",
                    notification_Id
                );

                // Delete the document from Firestore
                await deleteDoc(
                    doc(db, "Apply_notifications", notification_Id)
                );

                // Log after successful deletion
                console.log(
                    "notification deleted from Firestore successfully:",
                    notification_Id
                );

                // Find the index of the notification in the notifications array
                const index = this.notifications.findIndex(
                    (notification) => notification.id === notification_Id
                );

                // If the notification is found in the notifications array, remove it
                if (index !== -1) {
                    this.notifications.splice(index, 1);
                    console.log(
                        "notification deleted successfully from notifications array"
                    );
                } else {
                    console.log(
                        "notification not found in notifications array"
                    );
                }

                // Refresh notifications data
                this.Get_notifications_data();
            } catch (error) {
                console.error("Error deleting notification:", error);
            }
        },

        // Delete job document
        async delete_Job(Job_Id) {
            try {
                // Log before attempting to delete
                console.log("Deleting Job from Firestore:", Job_Id);

                // Delete the document from Firestore
                await deleteDoc(doc(db, "Jobs", Job_Id));

                // Log after successful deletion
                console.log("Job deleted from Firestore successfully:", Job_Id);

                // Find the index of the Job in the Jobs array
                const index = this.Jobs.findIndex((Job) => Job.id === Job_Id);

                // If the Job is found in the Jobs array, remove it
                if (index !== -1) {
                    this.Jobs.splice(index, 1);
                    console.log("Job deleted successfully from Jobs array");
                } else {
                    console.log("Job not found in Jobs array");
                }

                // Refresh jobs data
                this.Get_data();
                this.dialog_3 = false;
            } catch (error) {
                console.error("Error deleting Job:", error);
            }
        },

        // Store job details for displaying in a dialog
        Job_Information(Job) {
            this.name_Information = "";
            this.email_Information = "";
            this.phone_Information = "";
            this.CV_Information = null;
            this.applies_Information = [];
            this.Title_Information = Job.title;
            this.Id_Information = Job.id;
            console.log(Job.id);
            this.Description_Information = Job.description;
            this.applies_Information = Job.applies;
        },

        // Update job details
        async Update_Jobs(JobId) {
            try {
                this.loading = true;
                const currentTime = new Date().toLocaleString();
                const docRef = doc(db, "Jobs", JobId);
                updateDoc(docRef, {
                    title: this.Title_Information,
                    description: this.Description_Information,
                    time: currentTime,
                });
                this.Get_data();
                this.loading = false;
                this.dialog_1 = false;
            } catch (error) {
                console.error("Error updating the Job:", error);
            }
        },
    },
});
