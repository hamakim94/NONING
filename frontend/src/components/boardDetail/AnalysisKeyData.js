export default function AnalysisKeyData(data, defaultData) {
  let objKey = defaultData;
  for (let i = 0; i < data.length; i++) {
    switch (data[i].vote) {
      case 1:
        switch (data[i].genderCode) {
          case 'G0101':
            objKey[0].opt1 = objKey[0].opt1 + 1;
            objKey[0].total = objKey[0].total + 1;
            break;
          case 'G0102':
            objKey[1].opt1 = objKey[1].opt1 + 1;
            objKey[1].total = objKey[1].total + 1;
            break;
        }

        switch (data[i].ageRangeCode) {
          case 'A0101':
            objKey[2].opt2 = objKey[2].opt2 + 1;
            objKey[2].total = objKey[2].total + 1;
            break;
          case 'A0102':
            objKey[3].opt2 = objKey[3].opt2 + 1;
            objKey[3].total = objKey[3].total + 1;
            break;
          case 'A0103':
            objKey[4].opt2 = objKey[4].opt2 + 1;
            objKey[4].total = objKey[4].total + 1;
            break;
          case 'A0104':
            objKey[5].opt2 = objKey[5].opt2 + 1;
            objKey[5].total = objKey[5].total + 1;
            break;
          case 'A0105':
            objKey[6].opt2 = objKey[6].opt2 + 1;
            objKey[6].total = objKey[6].total + 1;
            break;
          case 'A0106':
            objKey[7].opt1 = objKey[7].opt1 + 1;
            objKey[7].total = objKey[7].total + 1;
            break;
          case 'A0107':
            objKey[7].opt1 = objKey[7].opt1 + 1;
            objKey[7].total = objKey[7].total + 1;
            break;
        }

        switch (data[i].mbti1Code) {
          case 'M0101':
            switch (data[i].mbti2Code) {
              case 'M0201':
                switch (data[i].mbti3Code) {
                  case 'M0301':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[8].opt1 = objKey[8].opt1 + 1;
                        objKey[8].total = objKey[8].total + 1;
                        break;
                      case 'M0402':
                        objKey[9].opt1 = objKey[9].opt1 + 1;
                        objKey[9].total = objKey[9].total + 1;
                        break;
                    }
                    break;
                  case 'M0302':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[10].opt1 = objKey[10].opt1 + 1;
                        objKey[10].total = objKey[10].total + 1;
                        break;
                      case 'M0402':
                        objKey[11].opt1 = objKey[11].opt1 + 1;
                        objKey[11].total = objKey[11].total + 1;
                        break;
                    }
                    break;
                }
                break; //M0201
              case 'M0202':
                switch (data[i].mbti3Code) {
                  case 'M0301':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[12].opt1 = objKey[12].opt1 + 1;
                        objKey[12].total = objKey[12].total + 1;
                        break;
                      case 'M0402':
                        objKey[13].opt1 = objKey[13].opt1 + 1;
                        objKey[13].total = objKey[13].total + 1;
                        break;
                    }
                    break;
                  case 'M0302':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[14].opt1 = objKey[14].opt1 + 1;
                        objKey[14].total = objKey[14].total + 1;
                        break;
                      case 'M0402':
                        objKey[15].opt1 = objKey[15].opt1 + 1;
                        objKey[15].total = objKey[15].total + 1;
                        break;
                    }
                    break;
                }
                break; //M0202
            }
            break; //M0101

          case 'M0102':
            switch (data[i].mbti2Code) {
              case 'M0201':
                switch (data[i].mbti3Code) {
                  case 'M0301':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[16].opt1 = objKey[16].opt1 + 1;
                        objKey[16].total = objKey[16].total + 1;
                        break;
                      case 'M0402':
                        objKey[17].opt1 = objKey[17].opt1 + 1;
                        objKey[17].total = objKey[17].total + 1;
                        break;
                    }
                    break;
                  case 'M0302':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[18].opt1 = objKey[18].opt1 + 1;
                        objKey[18].total = objKey[18].total + 1;
                        break;
                      case 'M0402':
                        objKey[19].opt1 = objKey[19].opt1 + 1;
                        objKey[19].total = objKey[19].total + 1;
                        break;
                    }
                    break;
                }
                break; //M0201
              case 'M0202':
                switch (data[i].mbti3Code) {
                  case 'M0301':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[20].opt1 = objKey[20].opt1 + 1;
                        objKey[20].total = objKey[20].total + 1;
                        break;
                      case 'M0402':
                        objKey[21].opt1 = objKey[21].opt1 + 1;
                        objKey[21].total = objKey[21].total + 1;
                        break;
                    }
                    break;
                  case 'M0302':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[22].opt1 = objKey[22].opt1 + 1;
                        objKey[22].total = objKey[22].total + 1;
                        break;
                      case 'M0402':
                        objKey[23].opt1 = objKey[23].opt1 + 1;
                        objKey[23].total = objKey[23].total + 1;
                        break;
                    }
                    break;
                }
                break; //M0202
            }
            break; //M0102
        }
        break; //case 1
      case 2:
        switch (data[i].genderCode) {
          case 'G0101':
            objKey[0].opt2 = objKey[0].opt2 + 1;
            objKey[0].total = objKey[0].total + 1;
            break;
          case 'G0102':
            objKey[1].opt2 = objKey[1].opt2 + 1;
            objKey[1].total = objKey[1].total + 1;
            break;
        }

        switch (data[i].ageRangeCode) {
          case 'A0101':
            objKey[2].opt2 = objKey[2].opt2 + 1;
            objKey[2].total = objKey[2].total + 1;
            break;
          case 'A0102':
            objKey[3].opt2 = objKey[3].opt2 + 1;
            objKey[3].total = objKey[3].total + 1;
            break;
          case 'A0103':
            objKey[4].opt2 = objKey[4].opt2 + 1;
            objKey[4].total = objKey[4].total + 1;
            break;
          case 'A0104':
            objKey[5].opt2 = objKey[5].opt2 + 1;
            objKey[5].total = objKey[5].total + 1;
            break;
          case 'A0105':
            objKey[6].opt2 = objKey[6].opt2 + 1;
            objKey[6].total = objKey[6].total + 1;
            break;
          case 'A0106':
            objKey[7].opt1 = objKey[7].opt1 + 1;
            objKey[7].total = objKey[7].total + 1;
            break;
          case 'A0107':
            objKey[7].opt1 = objKey[7].opt1 + 1;
            objKey[7].total = objKey[7].total + 1;
            break;
        }

        switch (data[i].mbti1Code) {
          case 'M0101':
            switch (data[i].mbti2Code) {
              case 'M0201':
                switch (data[i].mbti3Code) {
                  case 'M0301':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[8].opt2 = objKey[8].opt2 + 1;
                        objKey[8].total = objKey[8].total + 1;
                        break;
                      case 'M0402':
                        objKey[9].opt2 = objKey[9].opt2 + 1;
                        objKey[9].total = objKey[9].total + 1;
                        break;
                    }
                    break;
                  case 'M0302':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[10].opt2 = objKey[10].opt2 + 1;
                        objKey[10].total = objKey[10].total + 1;
                        break;
                      case 'M0402':
                        objKey[11].opt2 = objKey[11].opt2 + 1;
                        objKey[11].total = objKey[11].total + 1;
                        break;
                    }
                    break;
                }
                break; //M0201
              case 'M0202':
                switch (data[i].mbti3Code) {
                  case 'M0301':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[12].opt2 = objKey[12].opt2 + 1;
                        objKey[12].total = objKey[12].total + 1;
                        break;
                      case 'M0402':
                        objKey[13].opt2 = objKey[13].opt2 + 1;
                        objKey[13].total = objKey[13].total + 1;
                        break;
                    }
                    break;
                  case 'M0302':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[14].opt2 = objKey[14].opt2 + 1;
                        objKey[14].total = objKey[14].total + 1;
                        break;
                      case 'M0402':
                        objKey[15].opt2 = objKey[15].opt2 + 1;
                        objKey[15].total = objKey[15].total + 1;
                        break;
                    }
                    break;
                }
                break; //M0202
            }
            break; //M0101

          case 'M0102':
            switch (data[i].mbti2Code) {
              case 'M0201':
                switch (data[i].mbti3Code) {
                  case 'M0301':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[16].opt2 = objKey[16].opt2 + 1;
                        objKey[16].total = objKey[16].total + 1;
                        break;
                      case 'M0402':
                        objKey[17].opt2 = objKey[17].opt2 + 1;
                        objKey[17].total = objKey[17].total + 1;
                        break;
                    }
                    break;
                  case 'M0302':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[18].opt2 = objKey[18].opt2 + 1;
                        objKey[18].total = objKey[18].total + 1;
                        break;
                      case 'M0402':
                        objKey[19].opt2 = objKey[19].opt2 + 1;
                        objKey[19].total = objKey[19].total + 1;
                        break;
                    }
                    break;
                }
                break; //M0201
              case 'M0202':
                switch (data[i].mbti3Code) {
                  case 'M0301':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[20].opt2 = objKey[20].opt2 + 1;
                        objKey[20].total = objKey[20].total + 1;
                        break;
                      case 'M0402':
                        objKey[21].opt2 = objKey[21].opt2 + 1;
                        objKey[21].total = objKey[21].total + 1;
                        break;
                    }
                    break;
                  case 'M0302':
                    switch (data[i].mbti4Code) {
                      case 'M0401':
                        objKey[22].opt2 = objKey[22].opt2 + 1;
                        objKey[22].total = objKey[22].total + 1;
                        break;
                      case 'M0402':
                        objKey[23].opt2 = objKey[23].opt2 + 1;
                        objKey[23].total = objKey[23].total + 1;
                        break;
                    }
                    break;
                }
                break; //M0202
            }
            break; //M0102
        }
        break; //case 2
    }
  }
  return objKey;
}
