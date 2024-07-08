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
    ref,
    deleteObject,
    ref as storageRef,
    uploadBytesResumable,
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

export const usePhoto_Gallery = defineStore("Photo_Gallery", {
    state: () => ({
        dialog: false,
        File_Name: "",
        type: "",
        Photos: [],
        trip: [],
        party: [],
        news: [],
        tab: null,
        progress: 0,
        Types: ["trip", "party", "news"],
        Photo: {
            image: null,
        },
        random: 0,
        loading: false,
    }),
    actions: {
        handletypes() {
            if (this.type === "trip") {
                this.File_Name = "trip/";
                console.log(this.type);
            } else if (this.type === "party") {
                this.File_Name = "party/";
            } else if (this.type === "news") {
                this.File_Name = "news/";
            }
        },
        async upload_Image(file) {
            this.random = Math.random();
            // Set File_Name to this.type (assuming this.type is defined elsewhere in your code)
            this.File_Name = this.type;

            // Create a storage reference with the file name
            const storageReference = storageRef(
                storage,
                this.File_Name + "/" + this.random + file.name
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
        async Add_Photos() {
            try {
                this.loading = true;
                if (this.Photo.image) {
                    const imageUrl = await this.upload_Image(this.Photo.image);
                    // Get current local time
                    const currentTime = new Date().toLocaleString();
                    const docRef = await addDoc(collection(db, "Photos"), {
                        image: imageUrl,
                        time: currentTime,
                        type: this.type,
                    });
                    this.Photo.image = imageUrl;
                    await updateDoc(docRef, {
                        id: docRef.id,
                    });
                    console.log("Document written with ID: ", docRef.id);
                    this.Get_data();
                    this.loading = false;
                    this.dialog = false;
                } else {
                    console.error("No image selected.");
                    this.loading = false;
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async Get_data() {
            try {
                this.loading = true;
                this.Photos = [];
                const querySnapshot = await getDocs(collection(db, "Photos"));
                querySnapshot.forEach((doc) => {
                    this.Photos.push(doc.data());
                });
                console.log("this.Photos", this.Photos);
                this.loading = false;
                this.Type_Data();
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async delete_photo(image) {
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, image);

            // Delete the file
            deleteObject(desertRef);
        },
        async delete_Photo(PhotoId, image) {
            try {
                // Log before attempting to delete
                console.log("Deleting Photo from Firestore:", PhotoId);
                // Delete the document from Firestore
                await deleteDoc(doc(db, "Photos", PhotoId));
                this.delete_photo(image);
                // Log after successful deletion
                console.log(
                    "Photo deleted from Firestore successfully:",
                    PhotoId
                );
                // Find the index of the Photo in the Photos array
                const index = this.Photos.findIndex(
                    (Photo) => Photo.id === PhotoId
                );

                // If the Photo is found in the Photos array, remove it
                if (index !== -1) {
                    this.Photos.splice(index, 1);
                    console.log("Photo deleted successfully from Photos array");
                } else {
                    console.log("Photo not found in Photos array");
                }
                this.Get_data();
            } catch (error) {
                console.error("Error deleting Photo:", error);
            }
        },
        // Loop through each Photo to extract Type_info
        Type_Data() {
            this.trip = [];
            this.party = [];
            this.news = [];
            this.Photos.forEach((Photo) => {
                if (Photo.type == "trip") {
                    this.trip.push(Photo);
                    console.log("this.trip", this.trip);
                }
                if (Photo.type == "party") {
                    this.party.push(Photo);
                }
                if (Photo.type == "news") {
                    this.news.push(Photo);
                }
            });
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                // Convert file to a URL that can be used as an image source
                this.Photo.image = URL.createObjectURL(file);
            } else {
                this.Photo.image = null;
            }
        },
    },
});
