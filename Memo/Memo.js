import React, { useState, useContext, useEffect } from 'react';
import { View,Text, SafeAreaView, TextInput, Touchable, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { Button } from '../Components';
import { collection, addDoc, query, onSnapshot, getDocs, doc, orderBy,deleteDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { dbService } from '../utils/firebase';
import { UserContext } from "../contexts";

import { useNavigation } from '@react-navigation/native';
import MemoContent from './MemoContent';


export default function Memo() {

    const navigation = useNavigation();

    const [memoContent, setMemoContent] = useState("");
    const [memoTitle, setMemoTitle] = useState("");

    //데이터베이스에 저장된 것
    const [getContent , setGetContent] = useState("");
    const [getContents , setGetContents] = useState([]);
    const [getUid, setGetUid] = useState("");
    const [getEmail, setGetEmail] = useState("");


    //로그인 정보에서 가져온 것
    const userEmail = useContext(UserContext);
    const email = userEmail.user.email;
    const uid = userEmail.user.uid;

    const submitHandler = async ( event ) => {
        await addDoc(collection(dbService,"Memos"),{
            memoContent,
            createdAt:Date.now(),
            creatorId: uid,
        });
        setMemoContent("");
    }

    const getMemos = async() =>{
        const q = query(collection(dbService,'Memos'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
            const memoObj = {
                ...doc.data(),
                id:doc.id,
            }
            setGetContents(prev =>[memoObj, ...prev]);
        })
    }

    const naviGo = () => {
        navigation.navigate("MemoWrite");
    }

    const onDelete = async (event) => {
        const ok = alert("ok?");
        console.log(ok);
       
      // await deleteDoc(doc(dbService, 'Memos', getContent.id));
     };

    /*useEffect(()=>{
        getMemos();
    },[]);*/

    useEffect(() => {
        const q = query(
        collection(dbService, "Memos"),
        orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
        const memoObj = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
        }));
        setGetContents(memoObj);
        });
        }, []);

    
    //{getContents.map(content =><View> <Text> d </Text> </View>) }
    return(
        
        <SafeAreaView>
            <ScrollView>
            <View style={{
                height:30,
            }}></View>
            <Text>
                메모를 작성해보세요.
            </Text>

            <Button title={"메모 작성"} onPress={naviGo}></Button>
            <Text>{memoContent}</Text>

            <React.StrictMode>
                {
                //작성자의 글만 불러오게, 뭔가 연동하게 되면 
                //그 연동한 사람 글까지만 보이게 구현하면 될거같긴한데 연동 어케함 ?
                }
            {getContents.map((content) => uid==content.creatorId ? (<Text><><Text>{content.memoContent}{new Date(content.createdAt).toLocaleString()} </Text><MemoContent key={content.id} memoObj={content} isOwner={content.creatorId === uid}> 
            </MemoContent> </></Text>) : null )}    
            
            </React.StrictMode>
            </ScrollView>
        </SafeAreaView>
        
    )
}    

{/*getContents.map((content) =>   <Text key={content.id}> {content.memoContent} 
{new Date(content.createdAt).toLocaleString()} <><Button title={"delete"} onPress={onDelete}/></>
</Text> )*/}  