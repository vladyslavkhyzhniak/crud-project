import { db } from "../firebase";
import {
    onSnapshot,
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    runTransaction
} from "firebase/firestore";


export const addCampaign = async (campaign) => {

    const newCampaignRef = doc(collection(db, "campaigns"));
    const accountRef = doc(db, "settings", "emeraldAccount");

    await runTransaction(db, async (transaction) => {
        const accountDoc = await transaction.get(accountRef);
        if (!accountDoc.exists()) {
            throw "Konto nie istnieje!";
        }
        const currentBalance = Number(accountDoc.data().balance);
        const cost = Number(campaign.fund);
        if (currentBalance < cost) {
            throw "Niewystarczające środki!";
        }

        const newBalance = currentBalance - cost;
        transaction.update(accountRef, { balance: newBalance });

        transaction.set(newCampaignRef, campaign);
    });

}
export const deleteCampaign = async (id) => {
    const campaignRef = doc(db, "campaigns", id);
    const accountRef = doc(db, "settings", "emeraldAccount");

    await runTransaction(db, async (transaction) => {
        const campaignDoc = await transaction.get(campaignRef);
        if (!campaignDoc.exists()) {
            throw "Kampania nie istnieje!";
        }

        const accountDoc = await transaction.get(accountRef);
        if (!accountDoc.exists()) {
            throw "Błąd: Konto Emerald nie istnieje!";
        }

        const currentBalance = Number(accountDoc.data().balance);
        const campaignFund = Number(campaignDoc.data().fund);

        transaction.update(accountRef, { balance: currentBalance + campaignFund });
        transaction.delete(campaignRef);
    });
}
export const getCampaigns = async () => {
    const query = await getDocs(collection(db, "campaigns"));
    const campaigns = [];
    query.forEach((doc) => {
        campaigns.push({ id: doc.id, ...doc.data() });
    });
    return campaigns;
}

export const getCampaignById = async (id) => {
    const docRef = doc(db, "campaigns", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        throw new Error("Brak kampanii o podanym ID");
    }
}
export const updateCampaign = async (id, updatedCampaign) => {
    const campaignRef = doc(db, "campaigns", id);
    return await updateDoc(campaignRef, updatedCampaign);
}

export const getAccountBalance = (onUpdate) => {
   const docRef = doc(db, "settings", "emeraldAccount");
  const unsubscribe = onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      onUpdate(docSnap.data());
    }
  });
  return unsubscribe;
}
export const getCities = async () => {
    try {
        const docRef = doc(db, "settings", "config");
        const docSnap = await getDoc(docRef);
        return docSnap.data().towns;
    } catch (error) {
        console.error("Błąd pobierania miast:", error);
        return ["Warszawa"];
    }
};