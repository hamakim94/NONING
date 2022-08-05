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
  const mounted = useRef(false);
  useEffect(() => {
    setData(AnalysisTestData);
    setAnalysisData(AnalysisDefault);
  }, []);

  useEffect(() => {
    if (!mounted.current) mounted.current = true;
    else {
      const keyData = AnalysisKeyData(data, idx.current, analysisData);
      setAnalysisData(keyData);
      idx.current = data.length;
    }
  }, [data]);

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
