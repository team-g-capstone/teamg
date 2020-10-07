import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { styles } from './styles/style';
import { LinearGradient } from 'expo-linear-gradient';

const Customers = [
  {
    name: 'Customer 1',
    salary: 240,
  },
  {
    name: 'Customer 2',
    salary: 340,
  },
  {
    name: 'Customer 3',
    salary: 440,
  },
];

function item({ name, salary }) {
  return <View></View>;
}
// class UsersList extends React.Component{
//   state = {
//     users: [],
//   }

//   componentDidMount(){

//   }

//   render(){
//     return (
//       <LinearGradient>

//         </LinearGradient>
//     )
//   }
// }
