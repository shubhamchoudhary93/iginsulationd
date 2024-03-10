import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../igin/firebaseConfig";

export default stockAdd = async ({
  name,
  category,
  opening,
  current,
  threshold,
  date,
}) => {
  try {
    const docRef = collection(db, "stocks");
    await addDoc(docRef, {
      name: name,
      category: category,
      opening: opening,
      current: current,
      threshold: threshold,
      dateUpdated: date,
    });
  } catch (e) {
    Alert.alert(e.message);
  }
};
