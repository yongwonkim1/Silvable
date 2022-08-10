import React, { useState } from "react";
import { Alert,Text,TouchableOpacity,View } from "react-native";
import { dbService } from "../utils/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { TextInput } from "react-native-gesture-handler";
import { updateDoc } from "firebase/firestore";
import { Button } from "../Components";

export default function MemoContent({memoObj, isOwner}) {

    const [isTrue, setIsTrue] = useState(false);

    const [editing, setEditing] = useState(false);

    const [newMemo, setNewMemo] = useState(memoObj.memoContent);

    const toggleEditing = () => {setEditing(prev=> !prev);}

    const onDelete = async () => {
        await deleteDoc(doc(dbService, 'Memos', memoObj.id));
    }

    const MemoTextRef =doc(dbService, "Memos", `${memoObj.id}`);

    const submitHandler = async () => {
        await updateDoc(MemoTextRef,{ memoContent: newMemo}); setEditing(false);
    }

    return(
        <View>
            {
                editing ? (<>

                <Text>edit memo</Text>
                <TextInput value={newMemo} onChange={(event)=>{setNewMemo(event.nativeEvent.text)}}></TextInput> 
                <Button title="edit" onPress={submitHandler}></Button>
                <Button title="cancel" onPress={toggleEditing}></Button>
                </>
                ): (
                    <>
                        <Text>{memoObj.text}</Text>
            {isOwner && (
            <>
            <Button title="delete" onPress={onDelete}>
            </Button>
            <Button title="edit" onPress={toggleEditing}>
            </Button>
            </>
            )}
                    </>
                )
            }
        </View>
    )
}

{/*<Text>{memoObj.text}</Text>
            {isOwner && (
            <>
            <Button title="delete" onPress={onDelete}>
            </Button>
            <Button title="edit" onPress={toggleEditing}>
            </Button>
            </>
            )} */}
