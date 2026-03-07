package com.thegarment.hr.controller;

import com.thegarment.hr.dto.ApiResponse;
import com.thegarment.hr.entity.Group;
import com.thegarment.hr.service.GroupService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hr/groups")
@RequiredArgsConstructor
@Tag(name = "Group", description = "Group lookup")
public class GroupController {

    private final GroupService groupService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Group>>> findAll() {
        return ResponseEntity.ok(ApiResponse.success(groupService.findAll()));
    }
}
