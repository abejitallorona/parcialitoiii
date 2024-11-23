
import { appState } from '../store/index';
import  {firebaseConfig} from './firebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore';
let db: any;
let auth: any;
let storage: any;
 
export const getFirebaseInstance = async () =>  {
   if (!db) {
       const  {getFirestore} = await import('firebase/firestore')
       const  {initializeApp} = await import('firebase/app');
       const  {getAuth } = await import('firebase/auth');
	   const { getStorage } = await import('firebase/storage');

       const app = initializeApp(firebaseConfig);
       db = getFirestore(app);
       auth = getAuth(app);
	   storage = getStorage();
   }
   return  {db, auth, storage};
};

export const addEvent = async (post: any) =>  {
  try {
      const { db } = await getFirebaseInstance();
      const { collection, addDoc } = await import('firebase/firestore');

      const where = collection(db, 'events');
      const registerEvent =  {
        etitle: post.albumname,
        location: post.stock,
        image: post.image,
        date: new Date().toISOString(),
        attendees: post.image,

    };

      // Añadir el post y obtener la referencia del documento creado
      const docRef = await addDoc(where, registerEvent);

      console.log('Se añadió con éxito el post con ID:', docRef.id);
      
      // Retorna el ID del documento creado
      return docRef.id;
   
    
      
  } catch (error) {
      console.error('Error al añadir el documento:', error);		
      throw error; 
  }
};

export const getEvents = async () => {
  try {
      const { db } = await getFirebaseInstance();
      const { collection, getDocs, query, orderBy } = await import('firebase/firestore');

      const eventsCollection = collection(db, 'events');

      
      const postsQuery = query(eventsCollection, orderBy('dateadded', 'desc'));
      const querySnapshot = await getDocs(postsQuery);

      const data: any[] = [];
      querySnapshot.forEach((doc) => {
          const postData = doc.data();
          postData.id = doc.id;
          
          data.push(postData);
      });

      return data;
  } catch (error) {
      console.error('Error obteniendo los documentos:', error);
      return [];
  }
};
export const editEvent = async (id: string, updatedFields: any) => {
  try {
    const { db } = await getFirebaseInstance();
    const { doc, updateDoc } = await import('firebase/firestore');

    
    const docRef = doc(db, 'events', id);

    await updateDoc(docRef, updatedFields);

    console.log(`El documento con ID ${id} fue actualizado con éxito.`);
    return true;  
  } catch (error) {
    console.error('Error al actualizar el documento:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const { db } = await getFirebaseInstance();
    const { doc, deleteDoc } = await import('firebase/firestore');

    
    const docRef = doc(db, 'events', id);

    
    await deleteDoc(docRef);

    console.log(`El evento con ID ${id} ha sido eliminado correctamente.`);
  } catch (error) {
    console.error('Error al eliminar el evento de Firebase:', error);
    throw error; 
  }
};
