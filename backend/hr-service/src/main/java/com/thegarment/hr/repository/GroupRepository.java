package com.thegarment.hr.repository;

import com.thegarment.hr.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> findAllByOrderByGroupName();
}
