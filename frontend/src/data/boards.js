export const BOARDS = [
//   {
//     boardDataId: 1,
//     boardId: 1,
//     categoryCode: 'B0101',
//     likes: 2,
//     live: false,
//     liveId: 0,
//     opt1: '옵션1',
//     opt1Selected: 3,
//     opt2: '옵션2',
//     opt2Selected: 4,
//     reg: [2022, 7, 26, 22, 31, 51],
//     title: '제목입니다',
//     userLike: false,
//     userVote: 0,
//     writerId: 1,
//     writerImg: 'img',
//     writerNickname: 'nickname1',
//   },
//   {
//     boardDataId: 2,
//     boardId: 2,
//     categoryCode: 'B0102',
//     likes: 2,
//     live: false,
//     liveId: 0,
//     opt1: 'opt1',
//     opt1Selected: 4,
//     opt2: 'opt2',
//     opt2Selected: 3,
//     reg: [2022, 7, 26, 22, 32, 29],
//     title: '제목',
//     userLike: false,
//     userVote: 0,
//     writerId: 2,
//     writerImg: null,
//     writerNickname: null,
//   },
//   {
//     boardDataId: 3,
//     boardId: 4,
//     categoryCode: 'B0101',
//     likes: 6,
//     live: false,
//     liveId: 0,
//     opt1: 'opt1',
//     opt1Selected: 1,
//     opt2: 'opt2',
//     opt2Selected: 5,
//     reg: [2022, 7, 28, 12, 0, 11],
//     title: '제목이다',
//     userLike: false,
//     userVote: 0,
//     writerId: 3,
//     writerImg: 'img',
//     writerNickname: 'test03',
//   },
// ];
// [
{
    boardId : 1,
    title : `퇴근 후 데이트 가는 길에 조수석에 이성 직장동료가 앉아있다 내가 뒷자리에 앉아서 타야된다면?`,
    opt1 : '뒤에 앉는다',
    opt2 : '싸운다',
    is_live : 0,
    writer : {
        id : 'mgk',
        nickname : '김하마',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 1,
    opt2_selected : 4,
    user_like :0,
    user_vote :0 // 0,1,2 여기서 어떤걸 선택했는지 알 수 있음.
},
{
    boardId : 2,
    title : '나는 천재?',
    opt1 : '아니다',
    opt2 : '맞다',
    is_live : 1,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 45,
    opt2_selected : 500,
    user_like :0,
    user_vote :1
},
{
    boardId : 3,
    title : '연애 첫날 스킨십 끝까지 가능한가?',
    opt1 : '아니다',
    opt2 : '맞다',
    is_live : 1,
    writer : {
        id : 'bnk',
        nickname : '김보나',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 250,
    opt2_selected : 200,
    user_like :0,
    user_vote :0
},
{
    boardId : 4,
    title : '연인의 상태가....',
    opt1 : '너무 안 꾸미는 애인',
    opt2 : '너무 과하게 꾸미는 애인',
    is_live : 1,
    writer : {
        id : '김승연',
        nickname : '과자져아',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 1,
    opt2_selected : 2,
    user_like :1,
    user_vote :0
},
{
    boardId : 5,
    title : '얼마쯤 만나면 부모님한테 소개시켜줌?',
    opt1 : '1개월미만',
    opt2 : '5년이상',
    is_live : 1,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 200,
    opt2_selected : 400,
    user_like :1,
    user_vote :0
},
{
    boardId : 6,
    title : '연인이 바람을 핀걸 틀켰는데...',
    opt1 : '정신적 바람',
    opt2 : '육체적 바람',
    is_live : 0,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 3,
    opt2_selected : 6,
    user_like :0,
    user_vote :2
},
{
    boardId : 7,
    title : `퇴근 후 데이트 가는 길에 조수석에 이성 직장동료가 앉아있다 내가 뒷자리에 앉아서 타야된다면?`,
    opt1 : '뒤에 앉는다',
    opt2 : '싸운다',
    is_live : 0,
    writer : {
        id : 'mgk',
        nickname : '김하마',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 1,
    opt2_selected : 4,
    user_like :0,
    user_vote :0 // 0,1,2 여기서 어떤걸 선택했는지 알 수 있음.
},
{
    boardId : 8,
    title : '나는 천재?',
    opt1 : '아니다',
    opt2 : '맞다',
    is_live : 1,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 45,
    opt2_selected : 500,
    user_like :0,
    user_vote :1
},
{
    boardId : 9,
    title : '연애 첫날 스킨십 끝까지 가능한가?',
    opt1 : '아니다',
    opt2 : '맞다',
    is_live : 1,
    writer : {
        id : 'bnk',
        nickname : '김보나',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 250,
    opt2_selected : 200,
    user_like :0,
    user_vote :0
},
{
    boardId : 10,
    title : '연인의 상태가....',
    opt1 : '너무 안 꾸미는 애인',
    opt2 : '너무 과하게 꾸미는 애인',
    is_live : 1,
    writer : {
        id : '김승연',
        nickname : '과자져아',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 1,
    opt2_selected : 2,
    user_like :1,
    user_vote :0
},
{
    boardId : 11,
    title : '얼마쯤 만나면 부모님한테 소개시켜줌?',
    opt1 : '1개월미만',
    opt2 : '5년이상',
    is_live : 1,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 200,
    opt2_selected : 400,
    user_like :1,
    user_vote :0
},
{
    boardId : 12,
    title : '연인이 바람을 핀걸 틀켰는데...',
    opt1 : '정신적 바람',
    opt2 : '육체적 바람',
    is_live : 0,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 3,
    opt2_selected : 6,
    user_like :0,
    user_vote :2
},
{
    boardId : 13,
    title : `퇴근 후 데이트 가는 길에 조수석에 이성 직장동료가 앉아있다 내가 뒷자리에 앉아서 타야된다면?`,
    opt1 : '뒤에 앉는다',
    opt2 : '싸운다',
    is_live : 0,
    writer : {
        id : 'mgk',
        nickname : '김하마',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 1,
    opt2_selected : 4,
    user_like :0,
    user_vote :0 // 0,1,2 여기서 어떤걸 선택했는지 알 수 있음.
},
{
    boardId : 14,
    title : '나는 천재?',
    opt1 : '아니다',
    opt2 : '맞다',
    is_live : 1,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 45,
    opt2_selected : 500,
    user_like :0,
    user_vote :1
},
{
    boardId : 15,
    title : '연애 첫날 스킨십 끝까지 가능한가?',
    opt1 : '아니다',
    opt2 : '맞다',
    is_live : 1,
    writer : {
        id : 'bnk',
        nickname : '김보나',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 250,
    opt2_selected : 200,
    user_like :0,
    user_vote :0
},
{
    boardId : 16,
    title : '연인의 상태가....',
    opt1 : '너무 안 꾸미는 애인',
    opt2 : '너무 과하게 꾸미는 애인',
    is_live : 1,
    writer : {
        id : '김승연',
        nickname : '과자져아',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 1,
    opt2_selected : 2,
    user_like :1,
    user_vote :0
},
{
    boardId : 17,
    title : '얼마쯤 만나면 부모님한테 소개시켜줌?',
    opt1 : '1개월미만',
    opt2 : '5년이상',
    is_live : 1,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 200,
    opt2_selected : 400,
    user_like :1,
    user_vote :0
},
{
    boardId : 18,
    title : '연인이 바람을 핀걸 틀켰는데...',
    opt1 : '정신적 바람',
    opt2 : '육체적 바람',
    is_live : 0,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 3,
    opt2_selected : 6,
    user_like :0,
    user_vote :2
},
{
    boardId : 19,
    title : `퇴근 후 데이트 가는 길에 조수석에 이성 직장동료가 앉아있다 내가 뒷자리에 앉아서 타야된다면?`,
    opt1 : '뒤에 앉는다',
    opt2 : '싸운다',
    is_live : 0,
    writer : {
        id : 'mgk',
        nickname : '김하마',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 1,
    opt2_selected : 4,
    user_like :0,
    user_vote :0 // 0,1,2 여기서 어떤걸 선택했는지 알 수 있음.
},
{
    boardId : 20,
    title : '20번째',
    opt1 : '아니다',
    opt2 : '맞다',
    is_live : 1,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 45,
    opt2_selected : 500,
    user_like :0,
    user_vote :1
},
{
    boardId : 21,
    title : '연애 첫날 스킨십 끝까지 가능한가?',
    opt1 : '아니다',
    opt2 : '맞다',
    is_live : 1,
    writer : {
        id : 'bnk',
        nickname : '김보나',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 250,
    opt2_selected : 200,
    user_like :0,
    user_vote :0
},
{
    boardId : 22,
    title : '22',
    opt1 : '너무 안 꾸미는 애인',
    opt2 : '너무 과하게 꾸미는 애인',
    is_live : 1,
    writer : {
        id : '김승연',
        nickname : '과자져아',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 1,
    opt2_selected : 2,
    user_like :1,
    user_vote :0
},
{
    boardId : 23,
    title : '23',
    opt1 : '1개월미만',
    opt2 : '5년이상',
    is_live : 1,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 200,
    opt2_selected : 400,
    user_like :1,
    user_vote :0
},
{
    boardId : 24,
    title : '24',
    opt1 : '정신적 바람',
    opt2 : '육체적 바람',
    is_live : 0,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 3,
    opt2_selected : 6,
    user_like :0,
    user_vote :2
},
{
    boardId : 25,
    title : '25',
    opt1 : '아니다',
    opt2 : '맞다',
    is_live : 1,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 45,
    opt2_selected : 500,
    user_like :0,
    user_vote :1
},
{
    boardId : 26,
    title : '26능한가?',
    opt1 : '아니다',
    opt2 : '맞다',
    is_live : 1,
    writer : {
        id : 'bnk',
        nickname : '김보나',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 250,
    opt2_selected : 200,
    user_like :0,
    user_vote :0
},
{
    boardId : 27,
    title : '27.',
    opt1 : '너무 안 꾸미는 애인',
    opt2 : '너무 과하게 꾸미는 애인',
    is_live : 1,
    writer : {
        id : '김승연',
        nickname : '과자져아',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 1,
    opt2_selected : 2,
    user_like :1,
    user_vote :0
},
{
    boardId : 28,
    title : '얼마쯤 만나면 부모님한테 소개시켜줌?',
    opt1 : '1개월미만',
    opt2 : '5년이상',
    is_live : 1,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 200,
    opt2_selected : 400,
    user_like :1,
    user_vote :0
},
{
    boardId : 29,
    title : '연인이 바람을 핀걸 틀켰는데...',
    opt1 : '정신적 바람',
    opt2 : '육체적 바람',
    is_live : 0,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 3,
    opt2_selected : 6,
    user_like :0,
    user_vote :2
},
{
    boardId : 30,
    title : '****30번째****',
    opt1 : '아니다',
    opt2 : '맞다',
    is_live : 1,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 45,
    opt2_selected : 500,
    user_like :0,
    user_vote :1
},
{
    boardId : 31,
    title : '연애 첫날 스킨십 끝까지 가능한가?',
    opt1 : '아니다',
    opt2 : '맞다',
    is_live : 1,
    writer : {
        id : 'bnk',
        nickname : '김보나',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 250,
    opt2_selected : 200,
    user_like :0,
    user_vote :0
},
{
    boardId : 32,
    title : '연인의 상태가....',
    opt1 : '너무 안 꾸미는 애인',
    opt2 : '너무 과하게 꾸미는 애인',
    is_live : 1,
    writer : {
        id : '김승연',
        nickname : '과자져아',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 1,
    opt2_selected : 2,
    user_like :1,
    user_vote :0
},
{
    boardId : 33,
    title : '얼마쯤 만나면 부모님한테 소개시켜줌?',
    opt1 : '1개월미만',
    opt2 : '5년이상',
    is_live : 1,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 200,
    opt2_selected : 400,
    user_like :1,
    user_vote :0
},
{
    boardId : 34,
    title : '연인이 바람을 핀걸 틀켰는데...',
    opt1 : '정신적 바람',
    opt2 : '육체적 바람',
    is_live : 0,
    writer : {
        id : 'mgk',
        nickname : '김쵸킹',
        img : 'https://i.imgur.com/YcP0tik.jpeg'
    },
    opt1_selected : 3,
    opt2_selected : 6,
    user_like :0,
    user_vote :2
},
]
