import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchProducts = async () => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, orderBy('id'));
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
    return { products };
  } catch (error) {
    console.error('Firebase error:', error);
    // Return empty array instead of throwing to prevent crashes
    return { products: [] };
  }
};
