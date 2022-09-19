import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert, Image} from 'react-native';
import { useState } from 'react';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);

  const fetchRepository = () => {

    if(!keyword){

      Alert.alert('Enter an ingredient');

    }else{

      fetch('https://themealdb.com/api/json/v1/1/filter.php?i=' + keyword)
        .then(response => response.json())
        .then(data => setData(data.meals))
        .catch(err => Alert.alert('Error', err));

    }


  }

  const listSeparator = () => {

    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  
  };
  

  return (

    <View style={styles.container}>

      <FlatList
        data={data}
        renderItem={({ item }) => 
            <><Text style={styles.text}> {item.strMeal} </Text>
              <Image style={styles.image} source={{ uri: item.strMealThumb }} /></>
        }
        ItemSeparatorComponent={listSeparator}
      />

      <View style={styles.div}>

        <TextInput
          style={styles.textinput}
          placeholder='Ingredient'
          onChangeText={text => setKeyword(text)}
        />

        <Button
          title='Find'
          onPress={fetchRepository}
        />

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  image: {
    width: 70, height: 70
  },
  textinput: {
    fontSize: 15
  },
  div: {
    alignItems: 'center' 
  }

});
