package com.fivenonjangi.noning.service.live;

import com.fivenonjangi.noning.data.dto.live.LiveResponseDTO;
import com.fivenonjangi.noning.data.repository.board.BoardRepository;
import com.fivenonjangi.noning.data.repository.comment.CommentDataRepository;
import com.fivenonjangi.noning.data.repository.comment.CommentLikeRepository;
import com.fivenonjangi.noning.data.repository.comment.CommentRepository;
import com.fivenonjangi.noning.data.repository.comment.CommentRepositoryCustom;
import com.fivenonjangi.noning.data.repository.live.LiveRepositoryCustom;
import com.fivenonjangi.noning.data.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LiveServiceImpl implements LiveService{
    public final LiveRepositoryCustom liveRepositoryCustom;

    @Autowired
    public LiveServiceImpl(LiveRepositoryCustom liveRepositoryCustom) {
        this.liveRepositoryCustom = liveRepositoryCustom;
    }

    @Override
    public List<LiveResponseDTO> getLiveList(long userId, String categoryCode) {
        return liveRepositoryCustom.findByUserIdAndCateCode(userId, categoryCode);
    }
}
