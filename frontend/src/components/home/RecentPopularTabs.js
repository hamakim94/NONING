import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';

const filterButtons = [
  {name: '최신순'},
  {name: '인기순'},
];

function RecentPopularTabs({setIsPopular}) {
  const [activeButton, setActiveButton] = useState('최신순'); // useState, 어떤게 active한지 알려주는 부분
  
  const FilterButton = ({filterbutton}) => (    // 이제 버튼 하나씩 올거임
    <TouchableOpacity
      onPress={() => [
        setActiveButton(filterbutton.name),
        setIsPopular(filterbutton.name),
      ]}>
      <Text
        style={[
          {textAlign: 'center', textAlignVertical: 'center'},
          activeButton === filterbutton.name
            ? styles.isActive
            : styles.notActive,
        ]}>
        {filterbutton.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <View
        style={{ height: 30,  flexDirection:'row', justifyContent:'flex-end'}}>
        {filterButtons.map((filterbutton, index) => (
          <View
            key={index}
            style={{alignItems: 'center', justifyContent: 'center', margin: 5}}>
            <FilterButton
              key={index}
              filterbutton={filterbutton}></FilterButton>
          </View>
        ))}
      </View>
    </View>
  );
}
export default RecentPopularTabs;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  isActive: {
    width: 60,
    height: 25,
    color: '#FF5F5F',
    fontSize: 15,
    paddingHorizontal:5,
  },

  notActive: {
    width: 60,
    height: 25,
    color: '#D9D9D9',
    fontSize: 15,
    paddingHorizontal: 5,
  },
});
