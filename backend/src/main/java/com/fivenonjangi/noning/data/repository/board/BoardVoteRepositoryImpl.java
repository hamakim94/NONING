package com.fivenonjangi.noning.data.repository.board;

import com.fivenonjangi.noning.data.dto.user.VoterResponseDTO;
import com.fivenonjangi.noning.data.entity.board.QBoardVote;
import com.fivenonjangi.noning.data.entity.user.QUserData;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class BoardVoteRepositoryImpl implements BoardVoteRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    QBoardVote boardVote = QBoardVote.boardVote;
    QUserData userData = QUserData.userData;

    @Autowired
    public BoardVoteRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }
    @Override
    public List<VoterResponseDTO> findByBoardId(long boardId) {
        List<Tuple> tuples = queryFactory.select(boardVote.vote, boardVote.user.id, boardVote.user.genderCode, boardVote.user.mbti1Code, boardVote.user.mbti2Code, boardVote.user.mbti3Code, boardVote.user.mbti4Code, boardVote.user.age, boardVote.user.ageRangeCode, userData.img, userData.nickname)
                .from(boardVote)
                .leftJoin(userData)
                .on(boardVote.user.id.eq(userData.user.id))
                .where(boardVote.board.id.eq(boardId))
                .fetch();

        List<VoterResponseDTO> voterResponseDTOList = new ArrayList<>();

        for(Tuple tuple:tuples){
            VoterResponseDTO voterResponseDTO = VoterResponseDTO.builder()
                            .userId(tuple.get(boardVote.user.id))
                            .vote(tuple.get(boardVote.vote))
                            .genderCode(tuple.get(boardVote.user.genderCode))
                            .mbti1Code(tuple.get(boardVote.user.mbti1Code))
                            .mbti2Code(tuple.get(boardVote.user.mbti2Code))
                            .mbti3Code(tuple.get(boardVote.user.mbti3Code))
                            .mbti4Code(tuple.get(boardVote.user.mbti4Code))
                            .ageRangeCode(tuple.get(boardVote.user.ageRangeCode))
                            .age(tuple.get(boardVote.user.age))
                            .img(tuple.get(userData.img))
                            .nickname(tuple.get(userData.nickname))
                            .build();

            voterResponseDTOList.add(voterResponseDTO);
        }

        return voterResponseDTOList;
    }
}
