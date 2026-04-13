package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.GroupRequest;
import com.thegarment.adapter.dto.response.GroupResponse;
import com.thegarment.adapter.entity.GroupEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.GroupRepository;
import com.thegarment.adapter.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;

    @Override
    public Flux<GroupResponse> findAll() {
        return groupRepository.findAll(Sort.by("id")).map(this::toResponse);
    }

    @Override
    public Mono<GroupResponse> findById(Long id) {
        return groupRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Group", id)))
                .map(this::toResponse);
    }

    @Override
    public Mono<GroupResponse> create(GroupRequest request) {
        GroupEntity entity = GroupEntity.builder()
                .groupName(request.groupName()).description(request.description())
                .createdAt(LocalDateTime.now()).build();
        return groupRepository.save(entity).map(this::toResponse);
    }

    @Override
    public Mono<GroupResponse> update(Long id, GroupRequest request) {
        return groupRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Group", id)))
                .flatMap(e -> {
                    e.setGroupName(request.groupName());
                    e.setDescription(request.description());
                    return groupRepository.save(e);
                })
                .map(this::toResponse);
    }

    @Override
    public Mono<Void> delete(Long id) {
        return groupRepository.findById(id)
                .switchIfEmpty(Mono.error(ResourceNotFoundException.of("Group", id)))
                .flatMap(groupRepository::delete);
    }

    private GroupResponse toResponse(GroupEntity e) {
        return new GroupResponse(e.getId(), e.getGroupName(), e.getDescription(), e.getCreatedAt());
    }
}
