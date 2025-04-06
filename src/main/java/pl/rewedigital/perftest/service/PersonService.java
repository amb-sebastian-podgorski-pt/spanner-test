package pl.rewedigital.perftest.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.rewedigital.perftest.dto.PersonRequest;
import pl.rewedigital.perftest.dto.PersonResponse;
import pl.rewedigital.perftest.dto.WalletResponse;
import pl.rewedigital.perftest.entity.PersonEntity;
import pl.rewedigital.perftest.exception.ResourceNotFoundException;
import pl.rewedigital.perftest.mappers.PersonMapper;
import pl.rewedigital.perftest.mappers.WalletMapper;
import pl.rewedigital.perftest.repository.PersonRepository;

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

        return personEntity.getWallets().stream().map(WalletMapper::mapToResponse).toList();
    }

    @Transactional
    public PersonResponse createPerson(final PersonRequest personRequest) {
        final PersonEntity person = new PersonEntity();
        person.setFirstName(personRequest.firstName());
        person.setLastName(personRequest.lastName());
        person.setEmail(personRequest.email());

        final PersonEntity personEntity = personRepository.save(person);
        return PersonMapper.mapToResponse(personEntity);
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
}
