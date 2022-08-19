import React, { Component, useEffect, useState, useContext } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Pressable, Linking, Image, Dimensions } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule, LocaleConfig } from 'react-native-calendars';
import testIDs from './testIDs';
import { UserContext } from '../../contexts';
import firestore from '@react-native-firebase/firestore'
import { connectFirestoreEmulator } from 'firebase/firestore';
import Tts from "react-native-tts";

interface State {
  items?: AgendaSchedule;
  result: string[];
}
const winWidth = Dimensions.get('window').width;

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일',],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토',],
  today: "오늘"

};
LocaleConfig.defaultLocale = 'ko';
export default class AgendaScreen extends React.Component<State> {
  state: State = {
    items: { '2000-01-22': [{ name: 'item 1 - any js object' }] }
  };
  render() {
    this.state.result = this.props.route.params.result
    console.log(this.state.result)
    return (<>
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        // items={this.state.items}
        items={this.state.items
        }
        loadItemsForMonth={this.loadItems}
        selected={Date()}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
      // markingType={'period'}
      // markedDates={{
      //    '2017-05-08': {textColor: '#43515c'},
      //    '2017-05-09': {textColor: '#43515c'},
      //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
      //    '2017-05-21': {startingDay: true, color: 'blue'},
      //    '2017-05-22': {endingDay: true, color: 'gray'},
      //    '2017-05-24': {startingDay: true, color: 'gray'},
      //    '2017-05-25': {color: 'gray'},
      //    '2017-05-26': {endingDay: true, color: 'gray'}}}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      // hideExtraDays={false}
      // showOnlySelectedDayItems
      />
      <View style={{ position: 'absolute', top: 0, left: 0, bottom: 10, right: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Pressable onPress={() => this.props.navigation.navigate({
          name: "NewAgenda",
          params: { text: "" },
        })}>
          <View style={[styles.new]}>
            <Image style={{ margin: 10, resizeMode: 'contain', flex: 1 }} source={require('./assets/plus.png')} />
          </View>
        </Pressable>
        <View style={{ height: 100, width: winWidth, bottom: 0 }}>
          <View style={[styles.bottomTap]}>
            <Pressable
              onPress={() => {
                this.props.navigation.pop();
              }}
              onLongPress={() => {
                setLetter("뒤로가기");
                onPressRead()
              }}>
              <Image style={[styles.btImg]} source={require('./assets/back.jpg')} />
            </Pressable >
            <Pressable
              onPress={() => {
                this.props.navigation.popToTop();
              }}
              onLongPress={() => {
                setLetter("홈");
                onPressRead()
              }}>
              <Image style={[styles.btImg]} source={require('./assets/home.png')} />
            </Pressable>
            <Pressable onLongPress={() => {
              setLetter("119");
              onPressRead()
              { Linking.openURL(`tel:119`) }
            }}>
              <Image style={[styles.btImg]} source={require('./assets/119.png')} />
            </Pressable>
            <Pressable onLongPress={() => {
              setLetter("돋보기");
              onPressRead()
            }} onPress={() => this.props.navigation.navigate("Magnify")}>
              <Image style={[styles.btImg]} source={require('./assets/mag.png')} />
            </Pressable>
          </View>
        </View>
      </View>
    </>
    );
  }
  loadItems = (day: DateData) => {
    const items = this.state.items || {};
    var result = this.state.result;


    setTimeout(() => {
      for (let i = -15; i < 30; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
        }
        for (let j = 0; j < result.length; j = j + 2) {
          if (items[strTime].length == 0 && (strTime) == result[j]) {
            console.log(strTime)
            items[strTime].push({
              name: result[j + 1],
              height: 30,
              day: strTime
            })
            break
          }
        }


        //   items[result[j]] = ({
        //     name: result[j + 1],
        //     height: 30,
        //     day: result[j]
        //   });
        // const numItems = Math.floor(Math.random() * 3 + 1);
        // for (let j = 0; j < numItems; j++) {
        // items[strTime].push({
        //   name: 'Item for ' + strTime + ' #' + j,
        //   height: Math.max(50, Math.floor(Math.random() * 150)),
        //   day: strTime
        // });
        //   }
        // }

      }
      // const tim = this.timeToString(Date.parse(result[0]))
      // for(let i=0;i<result.length;i+=2)
      // items[result[i]].push({
      //   name:result[i+1],
      //   height:30,
      //   day:result[i]
      // })
      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems
      });
    }, 2000);
  }

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <Pressable
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: reservation.height }]}
        onPress={() => this.props.navigation.navigate({
          name: "EditAgenda",
          params: { text: reservation.name, date: reservation.day }
        })}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </Pressable>
    );
  }

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>일정이 없습니다.</Text>
      </View>
    );
  }

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  }

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    fontSize: 30
  },
  new: {
    width: 80,
    height: 80,
    backgroundColor: '#ffdcff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'


  },
  bottomTap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopColor: 'black',
    backgroundColor: 'white',
    marginTop: 20
  },
  btImg: {
    height: 50,
    width: 50
  }
});
