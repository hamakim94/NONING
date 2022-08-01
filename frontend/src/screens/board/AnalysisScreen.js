import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import AnalysisTestData from '../../components/boardDetail/AnalysisTestData';
import AnalysisDefault from '../../components/boardDetail/AnalysisDefault';
import AnalysisKeyData from '../../components/boardDetail/AnalysisKeyData';
import AnalysisList from '../../components/boardDetail/AnalysisList';

function AnalysisScreen() {
  const [data, setData] = useState([]);
  const [analysisData, setAnalysisData] = useState([]);
  const idx = useRef(0);

  useEffect(() => {
    const keyData = AnalysisKeyData(data, idx.current, analysisData);
    setAnalysisData(keyData);
    idx.current = data.length;
  }, [data]);

  useEffect(() => {
    setData(AnalysisTestData);
    setAnalysisData(AnalysisDefault);
    console.log('마운트');
  }, []);
  console.log(analysisData);

  const renderItem = ({item}) => <AnalysisList info={item} />;
  return (
    <View style={styles.scene}>
      <FlatList
        data={analysisData}
        renderItem={renderItem}
        keyExtractor={info => info.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AnalysisScreen;
