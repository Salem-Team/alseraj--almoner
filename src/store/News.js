import { defineStore } from "pinia";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from "@firebase/firestore";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
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

export const useNews = defineStore("News", {
    state: () => ({
        dialog: false,
        dialog_1: false,
        Title_Information: "",
        Description_Information: "",
        Image_Information: null,
        Time_Condition: "",
        News: [],
        New: {
            title: "",
            image: null,
            description: "",
        },
    }),
    actions: {
        async upload_Image(file) {
            const storageReference = storageRef(storage, "images/" + file.name);
            const snapshot = await uploadBytes(storageReference, file);
            console.log("Uploaded a blob or file!", snapshot);
            return getDownloadURL(snapshot.ref);
        },
        async Add_News() {
            try {
                if (this.New.image) {
                    const imageUrl = await this.upload_Image(this.New.image);
                    // Get current local time
                    const currentTime = new Date().toLocaleString();
                    const docRef = await addDoc(collection(db, "News"), {
                        title: this.New.title,
                        description: this.New.description,
                        image: imageUrl,
                        time: currentTime,
                    });
                    this.New.image = imageUrl;
                    await updateDoc(docRef, {
                        id: docRef.id,
                    });
                    console.log("Document written with ID: ", docRef.id);
                    this.Get_data();
                    this.dialog = false;
                } else {
                    console.error("No image selected.");
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async Get_data() {
            try {
                this.News = [];
                const querySnapshot = await getDocs(collection(db, "News"));
                querySnapshot.forEach((doc) => {
                    this.News.push(doc.data());
                });
                console.log("this.News", this.News);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async delete_New(NewId) {
            try {
                // Log before attempting to delete
                console.log("Deleting New from Firestore:", NewId);

                // Delete the document from Firestore
                await deleteDoc(doc(db, "News", NewId));
                // Log after successful deletion
                console.log("New deleted from Firestore successfully:", NewId);
                // Find the index of the New in the News array
                const index = this.News.findIndex((New) => New.id === NewId);

                // If the New is found in the News array, remove it
                if (index !== -1) {
                    this.News.splice(index, 1);
                    console.log("New deleted successfully from News array");
                } else {
                    console.log("New not found in News array");
                }
                this.Get_data();
            } catch (error) {
                console.error("Error deleting New:", error);
            }
        },
        //get the data for each New
        New_Information(New) {
            this.Title_Information = New.title;
            this.Id_Information = New.id;
            console.log(New.id);
            this.Description_Information = New.description;
            this.Image_Information = New.image;
            this.Time_Condition = New.time;
        },
        async Update_News(NewId) {
            try {
                const currentTime = new Date().toLocaleString();
                const docRef = doc(db, "News", NewId);
                updateDoc(docRef, {
                    title: this.Title_Information,
                    description: this.Description_Information,
                    time: currentTime,
                });
                this.Get_data();
                this.dialog_1 = false;
            } catch (error) {
                console.error("Error updating the New:", error);
            }
        },
    },
});
