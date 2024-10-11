import { storage, db } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";

const imgUrls = [];

export const uploadImages = async (Imgs) => {
    try {
        const storageRef = ref(storage, `/products`);
        for (let i = 0; i < Imgs.length; i++) {
            const imgRef = ref(storageRef, Imgs[i].name);
            await uploadBytes(imgRef, Imgs[i]);
            const url = await getDownloadURL(imgRef);
            imgUrls.push(url);
        }
        return imgUrls;
    } 
    catch (error) {
        console.error(error);
    }
}

export const addProduct = async (name,price,desc) => {
    try {
        const productRef = collection(db, 'products');
        await addDoc(productRef, {'Product Name': name, 'Product Price': price, 'Description': desc, 'Images': imgUrls});
    } 
    catch (error) {
        console.error(error);
    }
}

export const getProducts = async () => {
    try {
        const productRef = collection(db, 'products');
        const snapshot = await getDocs(productRef);
        const products = snapshot.docs.map(doc => doc.data());
        return products;
    } 
    catch (error) {
        console.error(error);
    }
}
