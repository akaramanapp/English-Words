/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [turkishWord, setTurkishWord] = useState('');
  const [englishWord, setEnglishWord] = useState('');

  const [list, setList] = useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const addWord = () => {
    // object
    const word = {
      key: englishWord,
      value: [turkishWord],
    };

    // Daha once ayni kelime eklenmis mi?
    let item = list.find(item => item.key === word.key)

    // Varsa guncelliyoruz. Yoksa ekliyoruz.
    if(item) {
      updateItem(item)
    } else {
      addItem(word)
    }

    // inputlari temizliyoruz.
    cleanInput();
  };

  function updateItem(newItem) {
    const newList = list.map((item) => {
      if (item === newItem) {
        const updatedItem = {
          ...item,
          value: [...item.value, turkishWord],
        };

        return updatedItem;
      }

      return item;
    });

    setList(newList)
  }

  function addItem(word) {
    const arr = [...list, word];

    setList(arr);
  }

  function cleanInput() {
    setTurkishWord('');
    setEnglishWord('');
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        <Text style={styles.inputHeader}>English</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => setEnglishWord(value)}
          value={englishWord}
        />
      </View>
      <View>
        <Text style={styles.inputHeader}>Turkish</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => {
            setTurkishWord(value);
          }}
          value={turkishWord}
        />
      </View>
      {
        <View>
          {list.map(item => {
            return (
              <Text>
                {item.key} - {JSON.stringify(item.value)}
              </Text>
            );
          })}
        </View>
      }
      <Button title="Add Word" onPress={addWord} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputHeader: {
    marginLeft: 12,
  },
});

export default App;
