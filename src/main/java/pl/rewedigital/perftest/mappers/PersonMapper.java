package pl.rewedigital.perftest.mappers;

import lombok.experimental.UtilityClass;
import pl.rewedigital.perftest.dto.PersonResponse;
import pl.rewedigital.perftest.entity.PersonEntity;

@UtilityClass
public class PersonMapper {
    public static PersonResponse mapToResponse(final PersonEntity person) {
        return new PersonResponse(
                person.getId(),
                person.getFirstName(),
                person.getLastName(),
                person.getEmail()
        );
    }
}
