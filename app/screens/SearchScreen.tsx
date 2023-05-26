import * as React from 'react';
import {ScrollView,StyleSheet,Text} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useState } from 'react';
export default function SearchScreen () {
	const [search,setSearch] = useState("")	
	return(
	
		<ScrollView style={styles.container}>

		</ScrollView>

	)	

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
	flexDirection:'column',
  },
}); 
