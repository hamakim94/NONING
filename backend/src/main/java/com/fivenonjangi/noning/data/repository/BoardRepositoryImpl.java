package com.fivenonjangi.noning.data.repository;

import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.entity.board.QBoard;
import com.fivenonjangi.noning.data.entity.board.QBoardData;
import com.fivenonjangi.noning.data.entity.board.QBoardLike;
import com.fivenonjangi.noning.data.entity.board.QBoardVote;
import com.fivenonjangi.noning.data.entity.user.QUserData;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
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
    @Override
    public List<BoardResponseDTO> findBoardResponseDTObyUserIdCateCode(long userId, String categoryCode) {
        List<Tuple> tuples = queryFactory.select(board.id, board.title, board.opt1, board.opt2, board.categoryCode, board.reg, board.isLive, board.liveId, board.writer.id,
                        userData.nickname, userData.img,
                        boardData.id, boardData.opt1Selected, boardData.opt2Selected, boardData.like,
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
                        .on(board.writer.id.eq(userData.id))
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
                                    .like(tuple.get(boardData.like))
                                    .userLike(tuple.get(15, Boolean.class))
                                    .userVote(tuple.get(16, Byte.class))
                                    .build();
            result.add(boardResponseDTO);
//            System.out.println(tuple.get(board.categoryCode));
//            System.out.println(tuple.get(userData.nickname));
//            System.out.println(tuple.get(boardData.id));
//            System.out.println(tuple.get(15, Boolean.class));
//            System.out.println(tuple.get(16, Byte.class));
        }

        return result;
    }

    private BooleanExpression categoryFilter(String categoryCode) {
        System.out.println("categoryCode.equals : "+categoryCode.equals("0"));
        return categoryCode.equals("0")? null : board.categoryCode.eq(categoryCode);
    }
}
