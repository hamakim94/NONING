import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

const filterButtons = [
  {name: '전체'},
  {name: '연애'},
  {name: '음식'},
  {name: '게임'},
  {name: '고민'},
  {name: '운동'},
  {name: '직장'},
  {name: '갈등'},
  {name: '싸피'},
];

function FilterButtonTabs({filterName, setFilterName}) {
  // useState, 어떤게 active한지 알려주는 부분
  const [activeButton, setActiveButton] = useState('전체');
  // 이제 버튼 하나씩 올거임
  const FilterButton = ({filterbutton}) => (
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
        style={{borderBottomWidth: 1, height: 40}}>
        {filterButtons.map((filterbutton, index) => (
          <View
            key={index}
            style={{alignItems: 'center', justifyContent: 'center', margin: 5}}>
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
  container: {
    flexDirection: 'row',
    height: 50,
    paddingTop: 10,
    alignItems: 'center',
  },

  isActive: {
    width: 45,
    height: 20,
    backgroundColor: '#FF7171',
    fontSize: 12,
    borderRadius: 20,
    color: '#ffffff',
    paddingHorizontal: 10,
  },

  notActive: {
    width: 45,
    height: 20,
    backgroundColor: '#D9D9D9',
    fontSize: 12,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
