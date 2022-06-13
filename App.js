import React, {useState, useEffect} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import mySound from './assets/sound.mp3';
var Sound = require('react-native-sound');
Sound.setCategory('Playback');

var ding = new Sound(mySound, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
      ding.getDuration() +
      'number of channels: ' +
      ding.getNumberOfChannels(),
  );
});

function HomeScreen({navigation}) {
  useEffect(() => {
    ding.setVolume(1);
    return () => {
      ding.release();
    };
  }, []);

  const playPause = () => {
    ding.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
      <TouchableOpacity
        style={{padding: 20, backgroundColor: '#0078D7', borderRadius: 4}}
        onPress={playPause}>
        <Text style={{color: 'white'}}>{'Press Me'}</Text>
      </TouchableOpacity>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Button onPress={showDatepicker} title="Date picker" />
          <Text style={{color: 'black'}}>{`${date.getDate()} - ${
            date.getMonth() + 1
          } - ${date.getFullYear()}`}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Button onPress={showTimepicker} title="Time picker" />
          <Text
            style={{
              color: 'black',
            }}>{`${date.getHours()} : ${date.getMinutes()} ${
            date.getHours() > 11 ? 'PM' : 'AM'
          }`}</Text>
        </View>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <View style={{width: '100%'}}>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
