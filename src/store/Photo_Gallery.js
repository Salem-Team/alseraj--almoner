import { defineStore } from "pinia";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    orderBy,
    query,
} from "@firebase/firestore";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getStorage,
    ref,
    deleteObject,
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Define Pinia store for managing photo gallery
export const usePhoto_Gallery = defineStore("Photo_Gallery", {
    state: () => ({
        dialog: false,
        dialog_3: false,
        dialog_6: false,
        photos_show: "",
        File_Name: "",
        type: "",
        types: "صورة",
        Photos: [],
        All_photos: [],
        trip: [],
        party: [],
        news: [],
        image: null,
        video: null,
        tab: "all",
        progress: 0,
        Photo_Information: "",
        Id_Information: "",
        Types: ["trip", "party", "news"],
        Photo: {
            image: null,
            video: null,
        },
        random: 0,
        loading: false,
        loading1: false,
    }),
    actions: {
        // Action method to handle setting File_Name based on type
        handletypes() {
            if (this.type === "trip") {
                this.File_Name = "trip/";
            } else if (this.type === "party") {
                this.File_Name = "party/";
            } else if (this.type === "news") {
                this.File_Name = "news/";
            }
        },

        // Action method to upload an image to Firebase Storage
        async upload_Image(file) {
            this.random = Math.random();
            // Create a storage reference with the file name including type and random number
            const storageReference = storageRef(
                storage,
                this.File_Name + this.random + file.name
            );
            // Upload the file bytes to the storage reference and get a snapshot of the upload
            const snapshot = await uploadBytes(storageReference, file);
            // Calculate the progress percentage
            this.progress =
                parseInt(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // Log a message indicating the upload is complete, along with the snapshot details
            console.log("Uploaded a blob or file!", snapshot);

            // Return a promise that resolves with the download URL of the uploaded file
            return getDownloadURL(snapshot.ref);
        },

        // Action method to add a photo to Firestore
        async Add_Photos() {
            try {
                this.loading = true;
                if (this.Photo.image) {
                    // Step 1: Upload the image and get the download URL
                    const imageUrl = await this.upload_Image(this.Photo.image);
                    // Get current local time
                    const currentTime = new Date().toLocaleString();

                    // Step 2: Add a document to the "Photos" collection in Firestore
                    const docRef = await addDoc(collection(db, "Photos"), {
                        image: imageUrl,
                        time: currentTime,
                        type: this.type,
                        File_type: this.types,
                    });

                    // Step 3: Update the newly added document with its own ID
                    await updateDoc(docRef, {
                        id: docRef.id,
                    });

                    console.log("Document written with ID: ", docRef.id);

                    // Step 4: Refresh photo data
                    this.Get_data();

                    this.loading = false;
                    this.dialog = false;
                } else {
                    console.error("No file selected.");
                    this.loading = false;
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        // Action method to add a photo to Firestore
        async Add_Video() {
            try {
                this.loading = true;
                if (this.Photo.video) {
                    // Step 1: Upload the image and get the download URL
                    const videoUrl = await this.upload_Image(this.Photo.video);
                    // Get current local time
                    const currentTime = new Date().toLocaleString();

                    // Step 2: Add a document to the "Photos" collection in Firestore
                    const docRef = await addDoc(collection(db, "Photos"), {
                        video: videoUrl,
                        time: currentTime,
                        type: this.type,
                        File_type: this.types,
                    });

                    // Step 3: Update the newly added document with its own ID
                    await updateDoc(docRef, {
                        id: docRef.id,
                    });

                    console.log("Document written with ID: ", docRef.id);

                    // Step 4: Refresh photo data
                    this.Get_data();

                    this.loading = false;
                    this.dialog = false;
                } else {
                    console.error("No file selected.");
                    this.loading = false;
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        // Action method to retrieve all photos from Firestore
        async Get_data() {
            try {
                this.loading1 = true;
                this.Photos = [];
                const querySnapshot = await getDocs(
                    query(collection(db, "Photos"), orderBy("time", "asc"))
                );
                querySnapshot.forEach((doc) => {
                    this.Photos.push(doc.data());
                });
                console.log("this.Photos", this.Photos);
                this.loading1 = false;
                // Update type-specific data arrays
                this.Type_Data();
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        },

        // Action method to retrieve limited photos from Firestore (first 3)
        async Get_splice() {
            try {
                this.loading1 = true;
                this.Photos = [];
                const querySnapshot = await getDocs(collection(db, "Photos"));
                querySnapshot.forEach((doc) => {
                    this.Photos.push(doc.data());
                });
                this.Photos = this.Photos.slice(0, 6);
                console.log("this.Photos", this.Photos);
                this.loading1 = false;
                // Update type-specific data arrays
                this.Type_Data();
            } catch (error) {
                console.error("Error retrieving data:", error);
            }
        },

        // Action method to delete a photo from Firebase Storage
        async delete_photo(image) {
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, image);

            // Delete the file
            deleteObject(desertRef);
        },

        // Action method to delete a photo from Firestore
        async delete_Photo(PhotoId, image) {
            try {
                // Log before attempting to delete
                console.log("Deleting Photo from Firestore:", PhotoId);

                // Step 1: Delete the document from Firestore
                await deleteDoc(doc(db, "Photos", PhotoId));

                // Step 2: Delete the corresponding image from Firebase Storage
                this.delete_photo(image);

                // Log after successful deletion
                console.log(
                    "Photo deleted from Firestore successfully:",
                    PhotoId
                );

                // Step 3: Find the index of the deleted Photo in the Photos array
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

                // Step 4: Refresh photo data
                this.Get_data();

                this.dialog_3 = false;
            } catch (error) {
                console.error("Error deleting Photo:", error);
            }
        },
        show_Data() {
            if (this.photos_show === "trip" || this.tab === "trip") {
                this.Photos = this.trip;
            } else if (this.photos_show === "party" || this.tab === "party") {
                this.Photos = this.party;
            } else if (this.photos_show === "news" || this.tab === "news") {
                this.Photos = this.news;
            } else {
                this.Get_data();
            }
        },
        // Action method to categorize photos into respective arrays based on type
        Type_Data() {
            this.trip = [];
            this.party = [];
            this.news = [];
            this.Photos.forEach((Photo) => {
                if (Photo.type === "trip") {
                    this.trip.push(Photo);
                } else if (Photo.type === "party") {
                    this.party.push(Photo);
                } else if (Photo.type === "news") {
                    this.news.push(Photo);
                }
            });
        },

        // Action method to handle file change event and set image preview
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                // Convert file to a URL that can be used as an image source
                this.image = URL.createObjectURL(file);
            } else {
                this.image = null;
            }
        },
        // Action method to handle file change event and set image preview
        on_Video_Change(event) {
            const file = event.target.files[0];
            if (file) {
                // Convert file to a URL that can be used as an image source
                this.video = URL.createObjectURL(file);
            } else {
                this.video = null;
            }
        },
        // Store Photo information
        photo_Information(Photo) {
            this.Photo_Information = Photo.image;
            this.Video_Information = Photo.video;
            this.Id_Information = Photo.id;
            console.log(Photo.id);
        },
    },
});
