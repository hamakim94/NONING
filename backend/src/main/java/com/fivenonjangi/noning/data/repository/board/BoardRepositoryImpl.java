package com.fivenonjangi.noning.data.repository.board;

import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.entity.board.QBoard;
import com.fivenonjangi.noning.data.entity.board.QBoardData;
import com.fivenonjangi.noning.data.entity.board.QBoardLike;
import com.fivenonjangi.noning.data.entity.board.QBoardVote;
import com.fivenonjangi.noning.data.entity.user.QUser;
import com.fivenonjangi.noning.data.entity.user.QUserData;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class BoardRepositoryImpl implements BoardRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Autowired
    public BoardRepositoryImpl(JPAQueryFactory queryFactory){
        this.queryFactory = queryFactory;
    }

    // Q클래스 이용
    QBoard board = QBoard.board;
    QBoardData boardData = QBoardData.boardData;
    QBoardLike boardLike = QBoardLike.boardLike;
    QBoardVote boardVote = QBoardVote.boardVote;
    QUserData userData = QUserData.userData;
    QUser user = QUser.user;
    @Override
    public List<BoardResponseDTO> findByUserIdAndCateCode(long userId, String categoryCode) {
        List<Tuple> tuples = queryFactory.select(board.id, board.title, board.opt1, board.opt2, board.categoryCode, board.reg, board.isLive, board.liveId, board.writer.id,
                        userData.nickname, userData.img,
                        boardData.id, boardData.opt1Selected, boardData.opt2Selected, boardData.likes,
                        new CaseBuilder()
                                .when(boardLike.user.id.isNotNull())
                                .then(true)
                                .otherwise(false)
                                .as("user_like"),
                        new CaseBuilder()
                                .when(boardVote.vote.isNotNull())
                                .then(boardVote.vote.byteValue())
                                .otherwise((byte) 0)
                                .as("user_vote"))
                        .from(board)
                        .leftJoin(boardData)
                        .on(board.id.eq(boardData.board.id))
                        .leftJoin(userData)
                        .on(board.writer.id.eq(userData.user.id))
                        .leftJoin(boardLike)
                        .on(board.id.eq(boardLike.board.id).and(boardLike.user.id.eq(userId)))
                        .leftJoin(boardVote)
                        .on(board.id.eq(boardVote.board.id).and(boardVote.user.id.eq(userId)))
                        .where(board.isDeleted.eq(false).and(categoryFilter(categoryCode)))
                        .fetch();

        List<BoardResponseDTO> result = new ArrayList<BoardResponseDTO>();

        for (Tuple tuple:tuples){
            BoardResponseDTO boardResponseDTO = BoardResponseDTO.builder()
                                    .boardId(tuple.get(board.id))
                                    .title(tuple.get(board.title))
                                    .opt1(tuple.get(board.opt1))
                                    .opt2(tuple.get(board.opt2))
                                    .categoryCode(tuple.get(board.categoryCode))
                                    .reg(tuple.get(board.reg))
                                    .isLive(tuple.get(board.isLive))
                                    .liveId(tuple.get(board.liveId))
                                    .writerId(tuple.get(board.writer.id))
                                    .writerNickname(tuple.get(userData.nickname))
                                    .writerImg(tuple.get(userData.img))
                                    .boardDataId(tuple.get(boardData.id))
                                    .opt1Selected(tuple.get(boardData.opt1Selected))
                                    .opt2Selected(tuple.get(boardData.opt2Selected))
                                    .likes(tuple.get(boardData.likes))
                                    .userLike(tuple.get(15, Boolean.class))
                                    .userVote(tuple.get(16, Byte.class))
                                    .build();

            result.add(boardResponseDTO);
        }

        return result;
    }

    @Override
    public List<BoardResponseDTO> findByCateCode(String categoryCode) {
        List<Tuple> tuples = queryFactory.select(board.id, board.title, board.opt1, board.opt2, board.categoryCode, board.reg, board.isLive, board.liveId, board.writer.id,
                        userData.nickname, userData.img,
                        boardData.id, boardData.opt1Selected, boardData.opt2Selected, boardData.likes)
                .from(board)
                .leftJoin(boardData)
                .on(board.id.eq(boardData.board.id))
                .leftJoin(userData)
                .on(board.writer.id.eq(userData.user.id))
                .where(board.isDeleted.eq(false).and(categoryFilter(categoryCode)))
                .fetch();

        List<BoardResponseDTO> result = new ArrayList<BoardResponseDTO>();

        for (Tuple tuple:tuples){
            BoardResponseDTO boardResponseDTO = BoardResponseDTO.builder()
                    .boardId(tuple.get(board.id))
                    .title(tuple.get(board.title))
                    .opt1(tuple.get(board.opt1))
                    .opt2(tuple.get(board.opt2))
                    .categoryCode(tuple.get(board.categoryCode))
                    .reg(tuple.get(board.reg))
                    .isLive(tuple.get(board.isLive))
                    .liveId(tuple.get(board.liveId))
                    .writerId(tuple.get(board.writer.id))
                    .writerNickname(tuple.get(userData.nickname))
                    .writerImg(tuple.get(userData.img))
                    .boardDataId(tuple.get(boardData.id))
                    .opt1Selected(tuple.get(boardData.opt1Selected))
                    .opt2Selected(tuple.get(boardData.opt2Selected))
                    .likes(tuple.get(boardData.likes))
                    .build();

            result.add(boardResponseDTO);
        }

        return result;
    }

    @Override
    public BoardResponseDTO findByUserIdAndBoardId(long userId, long boardId) {
        Tuple tuple = queryFactory.select(board.id, board.title, board.opt1, board.opt2, board.categoryCode, board.reg, board.isLive, board.liveId, board.writer.id,
                        userData.nickname, userData.img, // writer 정보
                        boardData.id, boardData.opt1Selected, boardData.opt2Selected, boardData.likes,
                        new CaseBuilder()
                                .when(boardLike.user.id.isNotNull())
                                .then(true)
                                .otherwise(false)
                                .as("user_like"),
                        new CaseBuilder()
                                .when(boardVote.vote.isNotNull())
                                .then(boardVote.vote.byteValue())
                                .otherwise((byte) 0)
                                .as("user_vote"))
                        .from(board)
                        .leftJoin(boardData)
                        .on(board.id.eq(boardData.board.id))
                        .leftJoin(userData)
                        .on(board.writer.id.eq(userData.user.id))
                        .leftJoin(boardLike)
                        .on(board.id.eq(boardLike.board.id).and(boardLike.user.id.eq(userId)))
                        .leftJoin(boardVote)
                        .on(board.id.eq(boardVote.board.id).and(boardVote.user.id.eq(userId)))
                        .where(board.id.eq(boardId))
                        .fetchOne();

        BoardResponseDTO boardResponseDTO = BoardResponseDTO.builder()
                .boardId(tuple.get(board.id))
                .title(tuple.get(board.title))
                .opt1(tuple.get(board.opt1))
                .opt2(tuple.get(board.opt2))
                .categoryCode(tuple.get(board.categoryCode))
                .reg(tuple.get(board.reg))
                .isLive(tuple.get(board.isLive))
                .liveId(tuple.get(board.liveId))
                .writerId(tuple.get(board.writer.id))
                .writerNickname(tuple.get(userData.nickname))
                .writerImg(tuple.get(userData.img))
                .boardDataId(tuple.get(boardData.id))
                .opt1Selected(tuple.get(boardData.opt1Selected))
                .opt2Selected(tuple.get(boardData.opt2Selected))
                .likes(tuple.get(boardData.likes))
                .userLike(tuple.get(15, Boolean.class))
                .userVote(tuple.get(16, Byte.class))
                .build();

        return boardResponseDTO;
    }

    @Override
    public List<BoardResponseDTO> findByUserId(long userId) {
        List<Tuple> tuples = queryFactory.select(board.id, board.title, board.opt1, board.opt2, board.categoryCode, board.reg, board.isLive, board.liveId, board.writer.id,
                    userData.nickname, userData.img,
                    boardData.id, boardData.opt1Selected, boardData.opt2Selected, boardData.likes,
                    new CaseBuilder()
                            .when(boardLike.user.id.isNotNull())
                            .then(true)
                            .otherwise(false)
                            .as("user_like"),
                    new CaseBuilder()
                            .when(boardVote.vote.isNotNull())
                            .then(boardVote.vote.byteValue())
                            .otherwise((byte) 0)
                            .as("user_vote"))
                    .from(board)
                    .leftJoin(boardData)
                    .on(board.id.eq(boardData.board.id))
                    .leftJoin(userData)
                    .on(board.writer.id.eq(userData.user.id))
                    .leftJoin(boardLike)
                    .on(board.id.eq(boardLike.board.id).and(boardLike.user.id.eq(userId)))
                    .leftJoin(boardVote)
                    .on(board.id.eq(boardVote.board.id).and(boardVote.user.id.eq(userId)))
                    .where(board.isDeleted.eq(false).and(boardVote.user.id.eq(userId).or(boardLike.user.id.eq(userId)).or(board.writer.id.eq(userId))))
                    .fetch();

        List<BoardResponseDTO> result = new ArrayList<BoardResponseDTO>();

        for (Tuple tuple:tuples){
            BoardResponseDTO boardResponseDTO = BoardResponseDTO.builder()
                    .boardId(tuple.get(board.id))
                    .title(tuple.get(board.title))
                    .opt1(tuple.get(board.opt1))
                    .opt2(tuple.get(board.opt2))
                    .categoryCode(tuple.get(board.categoryCode))
                    .reg(tuple.get(board.reg))
                    .isLive(tuple.get(board.isLive))
                    .liveId(tuple.get(board.liveId))
                    .writerId(tuple.get(board.writer.id))
                    .writerNickname(tuple.get(userData.nickname))
                    .writerImg(tuple.get(userData.img))
                    .boardDataId(tuple.get(boardData.id))
                    .opt1Selected(tuple.get(boardData.opt1Selected))
                    .opt2Selected(tuple.get(boardData.opt2Selected))
                    .likes(tuple.get(boardData.likes))
                    .userLike(tuple.get(15, Boolean.class))
                    .userVote(tuple.get(16, Byte.class))
                    .build();

            result.add(boardResponseDTO);
        }

        return result;
    }

//    @Override
//    public Map<String, List<UserResponseDTO>> findByBoardId(long boardId) {
//        List<Tuple> tuples = queryFactory.select(boardVote.id, boardVote.vote, boardVote.user.id, userData.nickname, userData.img, user.genderCode, user.mbti1Code, user.mbti2Code, user.mbti3Code, user.mbti4Code, user.age, user.ageRangeCode)
//                .from(boardVote)
//                .leftJoin(userData)
//                .on(boardVote.user.id.eq(userData.user.id))
//                .leftJoin(user)
//                .on(boardVote.user.id.eq(user.id))
//                .where(boardVote.board.id.eq(boardId))
//                .fetch();
//
//        List<UserResponseDTO> participate1List = new ArrayList<UserResponseDTO>();
//        List<UserResponseDTO> participate2List = new ArrayList<UserResponseDTO>();
//
//        for(Tuple tuple : tuples){
//            if(tuple.get(boardVote.vote) == 1){
//                participate1List.add(UserResponseDTO.builder()
//                        .id(tuple.get(boardVote.user.id))
//                        .nickname(tuple.get(userData.nickname))
//                        .img(tuple.get(userData.img))
//                        .genderCode(tuple.get(user.genderCode))
//                        .mbti1Code(tuple.get(user.mbti1Code))
//                        .mbti2Code(tuple.get(user.mbti2Code))
//                        .mbti3Code(tuple.get(user.mbti3Code))
//                        .mbti4Code(tuple.get(user.mbti4Code))
//                        .age(tuple.get(user.age))
//                        .ageRangeCode(tuple.get(user.ageRangeCode))
//                        .build());
//            } else {
//                participate2List.add(UserResponseDTO.builder()
//                        .id(tuple.get(boardVote.user.id))
//                        .nickname(tuple.get(userData.nickname))
//                        .img(tuple.get(userData.img))
//                        .genderCode(tuple.get(user.genderCode))
//                        .mbti1Code(tuple.get(user.mbti1Code))
//                        .mbti2Code(tuple.get(user.mbti2Code))
//                        .mbti3Code(tuple.get(user.mbti3Code))
//                        .mbti4Code(tuple.get(user.mbti4Code))
//                        .age(tuple.get(user.age))
//                        .ageRangeCode(tuple.get(user.ageRangeCode))
//                        .build());
//            }
//        }
//
//        Map<String, List<UserResponseDTO>> result = new HashMap<>();
//        result.put("participate1List", participate1List);
//        result.put("participate2List", participate2List);
//
//        return result;
//    }

    private BooleanExpression categoryFilter(String categoryCode) {
        System.out.println("categoryCode.equals : "+categoryCode.equals("0"));
        return categoryCode.equals("0")? null : board.categoryCode.eq(categoryCode);
    }
}
