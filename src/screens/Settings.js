import React, { Component,useContext } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TextInput,
    Slider,
    Keyboard
} from "react-native";
import TtsContext from '../../contexts/Tts'
import Tts from "react-native-tts";
type Props = {};
export default class Settings extends React.Component<Props> {
    state = {
        voices: [],
        ttsStatus: "initiliazing",
        selectedVoice: null,
        speechRate: 0.5,
        speechPitch: 1,
        text: "이 목소리로 읽습니다."
    };
    

    constructor(props) {
        super(props);
        Tts.setDefaultRate(this.state.speechRate);
        Tts.setDefaultPitch(this.state.speechPitch);
    }

    setSpeechRate = async rate => {
        await Tts.setDefaultRate(rate);
        this.setState({ speechRate: rate });
    };

    setSpeechPitch = async rate => {
        await Tts.setDefaultPitch(rate);
        this.setState({ speechPitch: rate });
    };
    render() {
        const { dispatch } = useContext(TtsContext);
        const onSubmit = async () => { 
            const info = { rate, pitch };
            try {
              dispatch(info)
              navigation.reset({
                routes: [{ name: "Home" }],
              });
            } catch (e) {
              Alert.alert("로그인에 실패하였습니다.");
            }
          }
        return (
            <View>
                <Slider
                    style={styles.slider}
                    minimumValue={0.2}
                    maximumValue={0.8}
                    value={this.state.speechRate}
                    onSlidingComplete={this.setSpeechRate}
                />

                <View style={styles.sliderContainer}>
                    <Text
                        style={styles.sliderLabel}
                    >{`Pitch: ${this.state.speechPitch.toFixed(2)}`}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0.8}
                        maximumValue={1.7}
                        value={this.state.speechPitch}
                        onSlidingComplete={this.setSpeechPitch}
                    />
                </View>
                <FlatList
                    keyExtractor={item => item.id}
                    renderItem={this.renderVoiceItem}
                    extraData={this.state.selectedVoice}
                    data={this.state.voices}
                />
                <Button title="testContext" onPress={() => { Tts.stop(); Tts.speak(this.state.text) }} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    sliderContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    sliderLabel: {
        textAlign: "center",
        marginRight: 20
    },
    slider: {
        width: 150
    },
})
