package com.thegarment.adapter.service.impl;

import com.thegarment.adapter.dto.request.GroupRequest;
import com.thegarment.adapter.entity.GroupEntity;
import com.thegarment.adapter.exception.ResourceNotFoundException;
import com.thegarment.adapter.repository.GroupRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GroupServiceImplTest {

    @Mock
    private GroupRepository groupRepository;

    private GroupServiceImpl groupService;

    @BeforeEach
    void setUp() {
        groupService = new GroupServiceImpl(groupRepository);
    }

    @Test
    void createShouldPersistGroup() {
        GroupRequest request = new GroupRequest("Assembly", "Assembly team");
        GroupEntity saved = GroupEntity.builder()
                .id(4L)
                .groupName("Assembly")
                .description("Assembly team")
                .build();
        when(groupRepository.save(any(GroupEntity.class))).thenReturn(Mono.just(saved));

        StepVerifier.create(groupService.create(request))
                .expectNextMatches(response -> response.id().equals(4L)
                        && response.groupName().equals("Assembly"))
                .verifyComplete();

        ArgumentCaptor<GroupEntity> captor = ArgumentCaptor.forClass(GroupEntity.class);
        verify(groupRepository).save(captor.capture());
        org.assertj.core.api.Assertions.assertThat(captor.getValue().getCreatedAt()).isNotNull();
    }

    @Test
    void findByIdShouldFailWhenGroupDoesNotExist() {
        when(groupRepository.findById(8L)).thenReturn(Mono.empty());

        StepVerifier.create(groupService.findById(8L))
                .expectError(ResourceNotFoundException.class)
                .verify();
    }

    @Test
    void deleteShouldRemoveExistingGroup() {
        GroupEntity existing = GroupEntity.builder().id(5L).groupName("Packing").build();
        when(groupRepository.findById(5L)).thenReturn(Mono.just(existing));
        when(groupRepository.delete(existing)).thenReturn(Mono.empty());

        StepVerifier.create(groupService.delete(5L)).verifyComplete();

        verify(groupRepository).delete(existing);
    }
}
