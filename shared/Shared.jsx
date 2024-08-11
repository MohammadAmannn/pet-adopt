import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Config/FirebaseConfig';
import { factory } from 'typescript'; // This import doesn't seem to be used, you can remove it if not needed.

export const GetFavList = async (user) => {
  const docSnap = await getDoc(doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress));
  if (docSnap?.exists()) {
    return docSnap.data();
  } else {
    await setDoc(doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress), {
      email: user?.primaryEmailAddress?.emailAddress,
      favorites: [],
    });
    return { favorites: [] }; // Ensure to return an empty favorites array for consistency.
  }
};

const UpdateFav = async (user, favorites) => {
  const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress); // 'UserFavPet' should match with the collection name used in GetFavList.
  try {
    await updateDoc(docRef, {
      favorites: favorites,
    });
  } catch (error) {
    console.error("Error updating favorite list:", error);
  }
};

export default {
  GetFavList,
  UpdateFav,
};