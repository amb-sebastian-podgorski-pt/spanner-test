package pl.rewedigital.perftest.dto;

public record PersonRequest(
    String firstName,
    String lastName,
    String email
) {
}
