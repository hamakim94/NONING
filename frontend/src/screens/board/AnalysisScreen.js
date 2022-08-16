import React, {useState, useEffect, useRef, useContext} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import AnalysisDefault from '../../components/boardDetail/AnalysisDefault';
import AnalysisKeyData from '../../components/boardDetail/AnalysisKeyData';
import AnalysisList from '../../components/boardDetail/AnalysisList';
import DetailContext from '../../components/boardDetail/DetailContext';
import UserContext from '../../util/UserContext';

function AnalysisScreen({board}) {
  const [analysisData, setAnalysisData] = useState([]);
  const {participants} = useContext(DetailContext);
  const [myData, SetMyData] = useState();
  const {userData} = useContext(UserContext);
  useEffect(() => {
    if (userData) {
      setAnalysisData(AnalysisDefault);
      let userAnalysis = [];
      let mbti = '';
      userData.genderCode == 'G0101'
        ? userAnalysis.push('남자')
        : userAnalysis.push('여자');
      switch (userData.ageRangeCode) {
        case 'A0101':
          userAnalysis.push('10대미만');
          break;
        case 'A0102':
          userAnalysis.push('10대');
          break;
        case 'A0103':
          userAnalysis.push('20대');
          break;
        case 'A0104':
          userAnalysis.push('30대');
          break;
        case 'A0105':
          userAnalysis.push('40대');
          break;
        default:
          userAnalysis.push('50대이상');
          break;
      }
      userData.mbti1Code == 'M0101' ? (mbti += 'E') : (mbti += 'I');
      userData.mbti2Code == 'M0201' ? (mbti += 'N') : (mbti += 'S');
      userData.mbti3Code == 'M0301' ? (mbti += 'F') : (mbti += 'T');
      userData.mbti4Code == 'M0401' ? (mbti += 'J') : (mbti += 'P');
      userAnalysis.push(mbti);
      SetMyData(userAnalysis);
    }
  }, []);
  useEffect(() => {
    if (participants) {
      const newArr = JSON.parse(JSON.stringify(AnalysisDefault));
      const keyData = AnalysisKeyData(participants, newArr);
      setAnalysisData(keyData);
    }
  }, [participants]);

  const renderItem = ({item}) => <AnalysisList info={item} myData={myData} />;
  return (
    <View style={styles.scene}>
      {board ? (
        board.userVote > 0 ? (
          <FlatList
            data={analysisData}
            renderItem={renderItem}
            keyExtractor={(info) => info.id}
          />
        ) : (
          <Text>투표를 해야만 분석을 볼 수 있습니다.</Text>
        )
      ) : (
        ''
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: '2%',
    paddingHorizontal: 16,
  },
});

export default AnalysisScreen;
