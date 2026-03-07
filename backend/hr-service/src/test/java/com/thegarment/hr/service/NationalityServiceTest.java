package com.thegarment.hr.service;

import com.thegarment.hr.dto.NationalityDto;
import com.thegarment.hr.dto.NationalityRequest;
import com.thegarment.hr.entity.Nationality;
import com.thegarment.hr.repository.NationalityRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NationalityServiceTest {

    @Mock
    private NationalityRepository repository;

    @InjectMocks
    private NationalityService nationalityService;

    private Nationality entity(Long id, String name) {
        return Nationality.builder().id(id).nativeName(name).foreignName(name + " EN").description("desc").build();
    }

    @Test
    void findAll_noSearch_returnsAll() {
        when(repository.findAllOrdered()).thenReturn(List.of(entity(1L, "Cambodia"), entity(2L, "Thailand")));

        List<NationalityDto> result = nationalityService.findAll(null);

        assertThat(result).hasSize(2);
        verify(repository).findAllOrdered();
    }

    @Test
    void findAll_withSearch_usesSearchQuery() {
        when(repository.findByNativeNameContainingIgnoreCaseOrForeignNameContainingIgnoreCase("camb", "camb"))
                .thenReturn(List.of(entity(1L, "Cambodia")));

        List<NationalityDto> result = nationalityService.findAll("camb");

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getNativeName()).isEqualTo("Cambodia");
    }

    @Test
    void findById_found_returnsDto() {
        when(repository.findById(1L)).thenReturn(Optional.of(entity(1L, "Cambodia")));

        NationalityDto dto = nationalityService.findById(1L);

        assertThat(dto.getId()).isEqualTo(1L);
        assertThat(dto.getNativeName()).isEqualTo("Cambodia");
    }

    @Test
    void findById_notFound_throwsEntityNotFoundException() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> nationalityService.findById(99L))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void create_validRequest_savesAndReturnsDto() {
        NationalityRequest request = new NationalityRequest();
        request.setNativeName("Japan");
        request.setForeignName("Japan EN");
        request.setDescription("desc");

        Nationality saved = entity(5L, "Japan");
        when(repository.save(any())).thenReturn(saved);

        NationalityDto dto = nationalityService.create(request);

        assertThat(dto.getId()).isEqualTo(5L);
        verify(repository).save(any(Nationality.class));
    }

    @Test
    void update_found_updatesAndReturnsDto() {
        NationalityRequest request = new NationalityRequest();
        request.setNativeName("Updated");
        request.setForeignName("Updated EN");
        request.setDescription("new desc");

        Nationality existing = entity(3L, "Old");
        when(repository.findById(3L)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(existing);

        NationalityDto dto = nationalityService.update(3L, request);

        assertThat(dto).isNotNull();
        verify(repository).save(existing);
    }

    @Test
    void update_notFound_throwsEntityNotFoundException() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> nationalityService.update(99L, new NationalityRequest()))
                .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void delete_found_deletesSuccessfully() {
        when(repository.existsById(1L)).thenReturn(true);

        nationalityService.delete(1L);

        verify(repository).deleteById(1L);
    }

    @Test
    void delete_notFound_throwsEntityNotFoundException() {
        when(repository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> nationalityService.delete(99L))
                .isInstanceOf(EntityNotFoundException.class);
        verify(repository, never()).deleteById(any());
    }
}
