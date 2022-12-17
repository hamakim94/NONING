// title,
// opt1, opt2,
// host(id, nickname, img),
// opt1_selected (1안투표수), opt2_selected (2안투표수),
// user_like(0/1),
// user_vote(0/1/2)

export const LIVES = [
  {
    boardId: 1,
    title: `퇴근 후 데이트 가는 길에 조수석에 이성 직장동료가 앉아있다 내가 뒷자리에 앉아서 타야된다면?`,
    opt1: '뒤에 앉는다',
    opt2: '싸운다',
    isLive: 1,
    host: {
      id: 'mgk',
      nickname: '김하마',
      img: 'https://i.imgur.com/YcP0tik.jpeg',
    },
    opt1Selected: 1,
    opt2Selected: 4,
    userLike: 0,
    userVote: 0, // 0,1,2 여기서 어떤걸 선택했는지 알 수 있음.
  },
  {
    boardId: 2,
    title: '나는 천재?',
    opt1: '아니다',
    opt2: '맞다',
    isLive: 1,
    host: {
      id: 'mgk',
      nickname: '김쵸킹',
      img: 'https://i.imgur.com/YcP0tik.jpeg',
    },
    opt1Selected: 45,
    opt2Selected: 500,
    userLike: 0,
    userVote: 1,
  },
  {
    boardId: 3,
    title: '연애 첫날 스킨십 끝까지 가능한가?',
    opt1: '아니다',
    opt2: '맞다',
    isLive: 1,
    host: {
      id: 'bnk',
      nickname: '김보나',
      img: 'https://i.imgur.com/YcP0tik.jpeg',
    },
    opt1Selected: 250,
    opt2Selected: 200,
    userLike: 0,
    userVote: 0,
  },
];
