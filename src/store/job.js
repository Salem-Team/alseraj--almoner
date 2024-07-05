import { defineStore } from "pinia";
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
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
    uploadBytes,
    getDownloadURL,
    deleteObject,
    ref as storageRef,
} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBdk3sqIHjXvB2C-O-lvkRgMFpg8pemkno",
    authDomain: "alseraj--almoner.firebaseapp.com",
    projectId: "alseraj--almoner",
    storageBucket: "alseraj--almoner.appspot.com",
    messagingSenderId: "462211256149",
    appId: "1:462211256149:web:a03ace3c70b306620169dc",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const useJobs = defineStore("job", {
    state: () => ({
        dialog: false,
        dialog_1: false,
        dialog_2: false,
        name_Information: "",
        email_Information: "",
        phone_Information: "",
        CV_Information: null,
        progress: 0,
        Jobs: [],
        Job: {
            title: "",
            description: "",
        },
        Apply: {
            name: "",
            email: "",
            phone: "",
            CV: null,
        },
        random: 0,
        applies: [],
    }),
    actions: {
        async upload_CV(file) {
            this.random = Math.random();
            const storageReference = storageRef(
                storage,
                "CVs/" + this.random + file.name
            );
            // Upload the file bytes to the storage reference and get a snapshot of the upload
            const snapshot = await uploadBytes(storageReference, file);

            // Calculate the progress percentage
            this.progress =
                parseInt(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("the progress" + this.progress);
            // Log a message indicating the upload is complete, along with the snapshot details
            console.log("Uploaded a blob or file!", snapshot);

            // Return a promise that resolves with the download URL of the uploaded file
            return getDownloadURL(snapshot.ref);
        },
        async delete_CV(CV) {
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, CV);

            // Delete the file
            deleteObject(desertRef);
        },
        async Add_Apply(JobId) {
            try {
                if (this.Apply.CV) {
                    // Step 1: Upload CV and get the download URL
                    const CVUrl = await this.upload_CV(this.Apply.CV);

                    // Step 2: Prepare data to add to the "Apply" collection
                    const applyData = {
                        name: this.Apply.name,
                        email: this.Apply.email,
                        phone: this.Apply.phone,
                        CV: CVUrl,
                    };

                    // Step 3: Add a document to the "Apply" collection
                    const docRef = await addDoc(
                        collection(db, "Apply"),
                        applyData
                    );
                    console.log("Document written with ID: ", docRef.id);
                    // Step 5: Update the Apply document with its own ID (optional)
                    await updateDoc(docRef, {
                        id: docRef.id,
                    });
                    // Step 4: Update the corresponding "Jobs" document with the new apply information
                    const jobRef = doc(db, "Jobs", JobId);
                    await updateDoc(jobRef, {
                        applies: arrayUnion(docRef.id),
                        // Assuming you want to store apply document IDs in the "Jobs" document
                    });
                    console.log("Updated Job document with apply information.");
                    console.log("Apply document updated with ID: ", docRef.id);

                    // Step 6: Refresh data if needed
                    this.Get_Apply_data();

                    // Step 7: Close dialog or perform UI-related operations
                    this.dialog_2 = false;
                } else {
                    console.error("No File selected.");
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async Add_Jobs() {
            try {
                const currentTime = new Date().toLocaleString();
                const docRef = await addDoc(collection(db, "Jobs"), {
                    title: this.Job.title,
                    description: this.Job.description,
                    time: currentTime,
                });
                await updateDoc(docRef, {
                    id: docRef.id,
                });
                console.log("Document written with ID: ", docRef.id);
                this.Get_data();
                this.dialog = false;
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async Get_Apply_data() {
            try {
                this.applies = []; // Initialize applies array

                for (const Job of this.Jobs) {
                    for (const applyId of Job.applies) {
                        const docRef = doc(db, "Apply", applyId);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            const data = docSnap.data();
                            this.applies.push({
                                id: docSnap.id,
                                name: data.name,
                                email: data.email,
                                phone: data.phone,
                                CV: data.CVUrl,
                            });
                            console.log("applies", this.applies);
                        } else {
                            console.log("No such document!");
                        }
                    }
                }
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        },
        async Get_data() {
            try {
                this.Jobs = [];
                const querySnapshot = await getDocs(collection(db, "Jobs"));
                querySnapshot.forEach((doc) => {
                    this.Jobs.push(doc.data());
                });
                console.log("this.Jobs", this.Jobs);
                this.Get_Apply_data();
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async delete_Job(JobId) {
            try {
                // Log before attempting to delete
                console.log("Deleting Job from Firestore:", JobId);
                // Delete the document from Firestore
                await deleteDoc(doc(db, "Jobs", JobId));
                //this.delete_photo(CV);
                // Log after successful deletion
                console.log("Job deleted from Firestore successfully:", JobId);
                // Find the index of the Job in the Jobs array
                const index = this.Jobs.findIndex((Job) => Job.id === JobId);

                // If the Job is found in the Jobs array, remove it
                if (index !== -1) {
                    this.Jobs.splice(index, 1);
                    console.log("Job deleted successfully from Jobs array");
                } else {
                    console.log("Job not found in Jobs array");
                }
                this.Get_data();
            } catch (error) {
                console.error("Error deleting Job:", error);
            }
        },
        //get the data for each Job
        Job_Information(Job) {
            this.Title_Information = Job.title;
            this.Id_Information = Job.id;
            console.log(Job.id);
            this.Description_Information = Job.description;
        },
        async Update_Jobs(JobId) {
            try {
                const currentTime = new Date().toLocaleString();
                const docRef = doc(db, "Jobs", JobId);
                updateDoc(docRef, {
                    title: this.Title_Information,
                    description: this.Description_Information,
                    time: currentTime,
                });
                this.Get_data();
                this.dialog_1 = false;
            } catch (error) {
                console.error("Error updating the Job:", error);
            }
        },
    },
});
