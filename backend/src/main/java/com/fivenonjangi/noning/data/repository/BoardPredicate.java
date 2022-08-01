//package com.fivenonjangi.noning.data.repository;
//
//import com.fivenonjangi.noning.data.entity.board.QBoard;
//import com.fivenonjangi.noning.data.entity.board.QBoardLike;
//import com.fivenonjangi.noning.data.entity.board.QBoardVote;
//import com.fivenonjangi.noning.data.entity.user.QUser;
//import com.querydsl.core.BooleanBuilder;
//import com.querydsl.core.Tuple;
//import com.querydsl.core.types.Predicate;
//
//public class BoardPredicate {
//    public static Predicate boardCodePredicate(long userId, byte code){ // code: 0(like),1(vote),2(write)
//        BooleanBuilder builder = new BooleanBuilder();
//
//        if(code == 0){
//            QBoardLike boardLike = QBoardLike.boardLike;
//            builder.and(boardLike.user.id.eq(userId));
//        } else if(code == 1){
//            QBoardVote boardVote = QBoardVote.boardVote;
//            builder.and(boardVote.board.id.eq(userId));
//        } else if(code == 2){
//            QBoard board = QBoard.board;
//            builder.and(board.writer.id.eq(userId));
//        }
//
//        return builder;
//    }
//}
