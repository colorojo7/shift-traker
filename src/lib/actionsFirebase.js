import { db } from './firebaseConfig';
import { collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';



//Firebase fetch
export const fetchDoc = async (collectionPath, docId)=>{
    try{
      const querryDoc = doc(db, ...collectionPath, docId )
      const document = await getDoc(querryDoc)
      const docData = document.data()
      return docData
    }
    catch(e){
      console.log("fetchDoc", e)
    }
  }

export const fetchCollection = async (collectionPath)=>{
    try{
      console.log("haciendo el fetchCollection()");
      const querryColection = collection(db, ...collectionPath )
      const querryFilter = query(querryColection,where("isDeleted","!=",true))
      const collectionData = await getDocs(querryFilter)
      const CollectionArr = collectionData.docs.map( doc => ( {id : doc.id , ...doc.data() }))
      console.log("terminado el fetchCollection()",CollectionArr);
      return CollectionArr
    }catch(e){
      console.log(e);
    }   
}


//userData Actions
const usersCollection = collection(db,"users")
export async function updateUserData (user) {
    try{
        await setDoc(doc(usersCollection, user.uid), user)
        localStorage.setItem(`userData-${user.uid}`, JSON.stringify(user) )
    }catch(e){
        console.log("updateUserData",e);
    }
} 


//Tasks Actions
export async function addTask (user, task){
    const tasksCollection = collection(db, "users", user , "tasks");
    const taskId = `${task.clientId}-${user}`
    try{
        await setDoc(doc(tasksCollection, taskId), task)
    }catch(e){
        console.log("addTask",e);
    }
}

export async function updateTask(user, task, data){
    const taskToUpdate = doc(db,"users", user, "tasks", task )
    try{
        await updateDoc(taskToUpdate, data)
        console.log("updateTask() ejecutado", data);
    }catch(e){
        console.log("updateTask()", e);
    }

}


//shifts Actions
export async function createShift (user, shift) {
  const shiftsCollection = collection(db,"users", user, "shifts")
    try{
        await setDoc(doc(shiftsCollection, shift.id), shift)
    }catch(e){
        console.log("createShift",e);
    }
} 

export const fetchShifts = async (collectionPath, week)=>{
    try{
      console.log("haciendo el fetchShifts()");
      const querryColection = collection(db, ...collectionPath )
      const querryFilter = query(querryColection,
            where("date","in",week),
          
            )
      const collectionData = await getDocs(querryFilter)
      const CollectionArr = collectionData.docs.map( doc => ( {id : doc.id , ...doc.data() }))
      console.log("terminado el fetchShifts()",CollectionArr);
      return CollectionArr
    }catch(e){
      console.log(e);
    }   
}
