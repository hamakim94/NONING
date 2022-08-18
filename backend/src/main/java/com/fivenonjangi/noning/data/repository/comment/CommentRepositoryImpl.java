package com.fivenonjangi.noning.data.repository.comment;

import com.fivenonjangi.noning.data.dto.comment.CommentResponseDTO;
import com.fivenonjangi.noning.data.entity.board.QBoardVote;
import com.fivenonjangi.noning.data.entity.comment.QComment;
import com.fivenonjangi.noning.data.entity.comment.QCommentData;
import com.fivenonjangi.noning.data.entity.comment.QCommentLike;
import com.fivenonjangi.noning.data.entity.user.QUserData;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class CommentRepositoryImpl implements CommentRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Autowired
    public CommentRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    QComment comment = QComment.comment;
    QCommentData commentData = QCommentData.commentData;
    QUserData userData = QUserData.userData;
    QBoardVote boardVote = QBoardVote.boardVote;
    QCommentLike commentLike = QCommentLike.commentLike;

    @Override
    public List<CommentResponseDTO> findByBoardId(long boardId, long userId) {
        List<Tuple> tuples = queryFactory.select(comment.id, comment.content, comment.reg, comment.writer.id, commentData.likes, commentData.dislikes, commentLike.isLike)
                .from(comment)
                .leftJoin(commentData)
                .on(comment.id.eq(commentData.comment.id))
                .leftJoin(commentLike)
                .on(comment.id.eq(commentLike.comment.id).and(commentLike.user.id.eq(userId)))
                .where(comment.board.id.eq(boardId).and(comment.level.eq((byte)0)).and(comment.isDeleted.eq(false)))
                .orderBy(comment.id.asc())
                .fetch();

        List<CommentResponseDTO> result = new ArrayList<CommentResponseDTO>();

        for(Tuple tuple:tuples){
            CommentResponseDTO commentResponseDTO = CommentResponseDTO.builder()
                    .commentId(tuple.get(comment.id))
                    .content(tuple.get(comment.content))
                    .reg(tuple.get(comment.reg))
                    .writerId(tuple.get(comment.writer.id))
                    .likes(tuple.get(commentData.likes))
                    .dislikes(tuple.get(commentData.dislikes))
                    .userLike(Boolean.TRUE.equals(tuple.get(commentLike.isLike)) ? true : false)
                    .userDislike(Boolean.FALSE.equals(tuple.get(commentLike.isLike)) ? true : false)
                    .build();

            result.add(commentResponseDTO);
        }

        return result;
    }

    @Override
    public List<CommentResponseDTO> findByCommentId(long commentId, long userId) {
        List<Tuple> tuples = queryFactory.select(comment.id, comment.content, comment.reg, comment.writer.id, commentData.likes, commentData.dislikes, commentLike.isLike)
                .from(comment)
                .leftJoin(commentData)
                .on(comment.id.eq(commentData.comment.id))
                .leftJoin(commentLike)
                .on(comment.id.eq(commentLike.comment.id).and(commentLike.user.id.eq(userId)))
                .where(comment.parentId.eq(commentId).and(comment.isDeleted.eq(false)))
                .orderBy(comment.id.asc())
                .fetch();

        List<CommentResponseDTO> result = new ArrayList<CommentResponseDTO>();

        for(Tuple tuple:tuples){
            CommentResponseDTO commentResponseDTO = CommentResponseDTO.builder()
                    .commentId(tuple.get(comment.id))
                    .content(tuple.get(comment.content))
                    .reg(tuple.get(comment.reg))
                    .writerId(tuple.get(comment.writer.id))
                    .likes(tuple.get(commentData.likes))
                    .dislikes(tuple.get(commentData.dislikes))
                    .userLike(Boolean.TRUE.equals(tuple.get(commentLike.isLike)) ? true : false)
                    .userDislike(Boolean.FALSE.equals(tuple.get(commentLike.isLike)) ? true : false)
                    .build();

            result.add(commentResponseDTO);
        }

        return result;
    }


//    @Override
//    public List<CommentResponseDTO> findByBoardId(long boardId, long userId) {
//        List<Tuple> tuples = queryFactory.select(comment.id, comment.content, comment.reg, comment.writer.id, userData.nickname, userData.img, commentData.likes, commentData.dislikes, boardVote.vote, commentLike.isLike)
//                .from(comment)
//                .leftJoin(commentData)
//                .on(comment.id.eq(commentData.comment.id))
//                .leftJoin(userData)
//                .on(comment.writer.id.eq(userData.user.id))
//                .leftJoin(boardVote)
//                .on(boardVote.board.id.eq(boardId).and(comment.writer.id.eq(boardVote.user.id)))
//                .leftJoin(commentLike)
//                .on(comment.id.eq(commentLike.comment.id).and(commentLike.user.id.eq(userId)))
//                .where(comment.board.id.eq(boardId).and(comment.level.eq((byte)0)).and(comment.isDeleted.eq(false)))
//                .orderBy(comment.id.asc())
//                .fetch();
//
//        List<CommentResponseDTO> result = new ArrayList<CommentResponseDTO>();
//
//        for(Tuple tuple:tuples){
//            CommentResponseDTO commentResponseDTO = CommentResponseDTO.builder()
//                    .commentId(tuple.get(comment.id))
//                    .content(tuple.get(comment.content))
//                    .reg(tuple.get(comment.reg))
//                    .writerId(tuple.get(comment.writer.id))
//                    .writerNickname(tuple.get(userData.nickname))
//                    .writerImg(tuple.get(userData.img))
//                    .likes(tuple.get(commentData.likes))
//                    .dislikes(tuple.get(commentData.dislikes))
//                    .writerVote(tuple.get(boardVote.vote))
//                    .userLike(Boolean.TRUE.equals(tuple.get(commentLike.isLike)) ? true : false)
//                    .userDislike(Boolean.FALSE.equals(tuple.get(commentLike.isLike)) ? true : false)
//                    .build();
//
//            result.add(commentResponseDTO);
//        }
//
//        return result;
//    }
//
//    @Override
//    public List<CommentResponseDTO> findByCommentId(long boardId, long commentId, long userId) {
//        List<Tuple> tuples = queryFactory.select(comment.id, comment.content, comment.reg, comment.writer.id, userData.nickname, userData.img, commentData.likes, commentData.dislikes, boardVote.vote, commentLike.isLike)
//                .from(comment)
//                .leftJoin(commentData)
//                .on(comment.id.eq(commentData.comment.id))
//                .leftJoin(userData)
//                .on(comment.writer.id.eq(userData.user.id))
//                .leftJoin(boardVote)
//                .on(boardVote.board.id.eq(boardId).and(comment.writer.id.eq(boardVote.user.id)))
//                .leftJoin(commentLike)
//                .on(comment.id.eq(commentLike.comment.id).and(commentLike.user.id.eq(userId)))
//                .where(comment.parentId.eq(commentId).and(comment.isDeleted.eq(false)))
//                .orderBy(comment.id.asc())
//                .fetch();
//
//        List<CommentResponseDTO> result = new ArrayList<CommentResponseDTO>();
//
//        for(Tuple tuple:tuples){
//            CommentResponseDTO commentResponseDTO = CommentResponseDTO.builder()
//                    .commentId(tuple.get(comment.id))
//                    .content(tuple.get(comment.content))
//                    .reg(tuple.get(comment.reg))
//                    .writerId(tuple.get(comment.writer.id))
//                    .writerNickname(tuple.get(userData.nickname))
//                    .writerImg(tuple.get(userData.img))
//                    .likes(tuple.get(commentData.likes))
//                    .dislikes(tuple.get(commentData.dislikes))
//                    .writerVote(tuple.get(boardVote.vote))
//                    .userLike(Boolean.TRUE.equals(tuple.get(commentLike.isLike)) ? true : false)
//                    .userDislike(Boolean.FALSE.equals(tuple.get(commentLike.isLike)) ? true : false)
//                    .build();
//
//            result.add(commentResponseDTO);
//        }
//
//        return result;
//    }
}
