package pl.rewedigital.perftest.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.rewedigital.perftest.dto.PersonRequest;
import pl.rewedigital.perftest.dto.PersonResponse;
import pl.rewedigital.perftest.dto.WalletResponse;
import pl.rewedigital.perftest.entity.PersonEntity;
import pl.rewedigital.perftest.exception.ResourceNotFoundException;
import pl.rewedigital.perftest.mappers.WalletMappers;
import pl.rewedigital.perftest.repository.PersonRepository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PersonService {

    private final PersonRepository personRepository;

    @Transactional(readOnly = true)
    public List<WalletResponse> getWallets(UUID personId) {
        final PersonEntity personEntity = personRepository.findById(personId)
            .orElseThrow(() -> new ResourceNotFoundException("Person not found with id: " + personId));

        return personEntity.getWallets().stream().map(WalletMappers::mapToResponse).toList();
    }

    @Transactional
    public PersonResponse createPerson(final PersonRequest personRequest) {
        final PersonEntity person = new PersonEntity();
        person.setFirstName(personRequest.firstName());
        person.setLastName(personRequest.lastName());
        person.setEmail(personRequest.email());

        final PersonEntity personEntity = personRepository.save(person);
        return mapToResponse(personEntity);
    }

    @Transactional(readOnly = true)
    public PersonEntity getPersonById(final UUID personId) {
        return personRepository.findById(personId)
            .orElseThrow(() -> new ResourceNotFoundException("Person not found with id: " + personId));

    }

    @Transactional
    public PersonEntity update(final PersonEntity updatedPerson) {
        return personRepository.save(updatedPerson);
    }

    private PersonResponse mapToResponse(final PersonEntity person) {
        return new PersonResponse(
            person.getId(),
            person.getFirstName(),
            person.getLastName(),
            person.getEmail()
        );
    }
}
