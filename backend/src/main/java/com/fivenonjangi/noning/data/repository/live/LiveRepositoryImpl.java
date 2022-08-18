package com.fivenonjangi.noning.data.repository.live;

import com.fivenonjangi.noning.data.dto.board.BoardResponseDTO;
import com.fivenonjangi.noning.data.dto.live.LiveResponseDTO;
import com.fivenonjangi.noning.data.entity.board.QBoard;
import com.fivenonjangi.noning.data.entity.board.QBoardData;
import com.fivenonjangi.noning.data.entity.board.QBoardLike;
import com.fivenonjangi.noning.data.entity.board.QBoardVote;
import com.fivenonjangi.noning.data.entity.chat.QChatRoom;
import com.fivenonjangi.noning.data.entity.comment.QComment;
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

import static com.fivenonjangi.noning.data.entity.board.QBoard.board;
import static com.fivenonjangi.noning.data.entity.board.QBoardData.boardData;
import static com.fivenonjangi.noning.data.entity.board.QBoardLike.boardLike;
import static com.fivenonjangi.noning.data.entity.board.QBoardVote.boardVote;
import static com.fivenonjangi.noning.data.entity.chat.QChatRoom.chatRoom;
import static com.fivenonjangi.noning.data.entity.user.QUserData.userData;

@Repository
public class LiveRepositoryImpl implements LiveRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Autowired
    public LiveRepositoryImpl(JPAQueryFactory queryFactory){
        this.queryFactory = queryFactory;
    }

    QBoard board = QBoard.board;
    QBoardData boardData = QBoardData.boardData;
    QBoardLike boardLike = QBoardLike.boardLike;
    QBoardVote boardVote = QBoardVote.boardVote;
    QUserData userData = QUserData.userData;
    QChatRoom chatRoom = QChatRoom.chatRoom;

    @Override
    public List<LiveResponseDTO> findByUserIdAndCateCode(long userId, String categoryCode) {
        List<Tuple> tuples = queryFactory.select(board.id, board.title, board.opt1, board.opt2, board.categoryCode, board.reg, board.isLive, board.liveId, board.writer.id,
                        userData.nickname, userData.img,
                        boardData.id, boardData.opt1Selected, boardData.opt2Selected, boardData.likes,
                        chatRoom.opt1Selected, chatRoom.opt2Selected,
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
                .on(board.id.eq(boardLike.board.id).and(board.isLive.eq(true)).and(boardLike.user.id.eq(userId)))
                .leftJoin(boardVote)
                .on(board.id.eq(boardVote.board.id).and(boardVote.user.id.eq(userId)))
                .leftJoin(chatRoom)
                .on(board.id.eq(chatRoom.board.id))
                .where(board.isDeleted.eq(false).and(board.isLive.eq(true)).and(categoryFilter(categoryCode)))
                .fetch();

        List<LiveResponseDTO> result = new ArrayList<LiveResponseDTO>();

        for (Tuple tuple:tuples){
            LiveResponseDTO liveResponseDTO = LiveResponseDTO.builder()
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
                    .liveOpt1Selected(tuple.get(chatRoom.opt1Selected) == null ? 0 : tuple.get(chatRoom.opt1Selected))
                    .liveOpt2Selected(tuple.get(chatRoom.opt2Selected) == null ? 0 : tuple.get(chatRoom.opt2Selected))
                    .userLike(tuple.get(17, Boolean.class))
                    .userVote(tuple.get(18, Byte.class))
                    .build();

            result.add(liveResponseDTO);
        }

        return result;
    }

    private BooleanExpression categoryFilter(String categoryCode) {
        System.out.println("categoryCode.equals : "+categoryCode.equals("0"));
        return categoryCode.equals("0")? null : board.categoryCode.eq(categoryCode);
    }
}
