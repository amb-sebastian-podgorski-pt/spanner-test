package pl.rewedigital.perftest.dto;

import java.util.UUID;

public record PersonResponse(
    UUID id,
    String firstName,
    String lastName,
    String email
) {
}
