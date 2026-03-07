package com.thegarment.hr.service;

import com.thegarment.hr.entity.Group;
import com.thegarment.hr.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository repository;

    public List<Group> findAll() {
        return repository.findAll();
    }
}
