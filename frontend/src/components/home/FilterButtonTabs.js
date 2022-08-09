import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

const filterButtons = [
  {name: '전체', value: 'B01'},
  {name: '연애', value: 'B0101'},
  {name: '병맛', value: 'B0102'},
  {name: '음식', value: 'B0103'},
  {name: '게임', value: 'B0104'},
  {name: '운동', value: 'B0105'},
  {name: '학교', value: 'B0106'},
  {name: '직장', value: 'B0107'},
  {name: '갈등', value: 'B0108'},
  {name: '기타', value: 'B0199'},
];

function FilterButtonTabs({setFilterName}) {
  const [activeButton, setActiveButton] = useState('전체'); // useState, 어떤게 active한지 알려주는 부분
  const FilterButton = (
    {filterbutton}, // 이제 버튼 하나씩 올거임
  ) => (
    <TouchableOpacity
      onPress={() => [
        setActiveButton(filterbutton.name),
        setFilterName(filterbutton.name),
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          borderTopColor : '#A6A6A6',
          borderTopWidth:0.5,
          borderBottomWidth: 0.5,
          borderBottomColor: '#A6A6A6',
          height: 40,
        }}>
        {filterButtons.map((filterbutton, index) => (
          <View
            key={index}
            style={{alignItems: 'center', justifyContent: 'center', marginHorizontal: 5}}>
            <FilterButton
              key={index}
              filterbutton={filterbutton}></FilterButton>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
export default FilterButtonTabs;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  isActive: {
    width: 50,
    height: 25,
    backgroundColor: '#FF5F5F',
    color: 'white',
    fontSize: 13,
    borderRadius: 20,
    paddingHorizontal: 10,
  },

  notActive: {
    width: 50,
    height: 25,
    backgroundColor: '#D9D9D9',
    fontSize: 13,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
