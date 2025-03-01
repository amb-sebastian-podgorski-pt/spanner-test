package pl.rewedigital.perftest.dto;

import pl.rewedigital.perftest.entity.TransactionType;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;


public record TransactionResponse(
    UUID id,
    String currency,
    BigDecimal amount,
    TransactionType type,
    Instant createdAt
) {
}